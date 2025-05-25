
import React from 'react';
import { DollarSign, TrendingUp, TrendingDown, Target, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

interface Offers {
  client: number;
  freelancer: number;
}

interface OfferPanelProps {
  offers: Offers;
  onOfferChange: (role: 'client' | 'freelancer', value: number) => void;
  priceRange: [number, number] | null;
  disabled: boolean;
}

const OfferPanel: React.FC<OfferPanelProps> = ({ offers, onOfferChange, priceRange, disabled }) => {
  const getOfferStatus = (offer: number, role: 'client' | 'freelancer') => {
    if (!priceRange || offer === 0) return null;
    
    const [min, max] = priceRange;
    
    if (role === 'client') {
      if (offer < min) return { 
        status: 'below', 
        icon: TrendingDown, 
        color: 'text-red-500',
        bgColor: 'bg-red-50 border-red-200',
        label: '📉 Below Range'
      };
      if (offer > max) return { 
        status: 'above', 
        icon: TrendingUp, 
        color: 'text-blue-500',
        bgColor: 'bg-blue-50 border-blue-200', 
        label: '🚀 Above Range'
      };
      return { 
        status: 'fair', 
        icon: Target, 
        color: 'text-green-500',
        bgColor: 'bg-green-50 border-green-200', 
        label: '🎯 Fair Offer'
      };
    } else {
      if (offer > max) return { 
        status: 'high', 
        icon: TrendingUp, 
        color: 'text-amber-500',
        bgColor: 'bg-amber-50 border-amber-200', 
        label: '💰 Premium Ask'
      };
      if (offer < min) return { 
        status: 'low', 
        icon: TrendingDown, 
        color: 'text-orange-500',
        bgColor: 'bg-orange-50 border-orange-200',
        label: '📉 Below Market'
      };
      return { 
        status: 'fair', 
        icon: Target, 
        color: 'text-emerald-500',
        bgColor: 'bg-emerald-50 border-emerald-200',
        label: '✅ Market Rate'
      };
    }
  };

  return (
    <Card className="shadow-xl border-0 bg-white/60 backdrop-blur-xl">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
            <DollarSign className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold">Live Offers</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Client Offer Section */}
        <div className="space-y-3">
          <Label htmlFor="client-offer" className="text-sm font-bold flex items-center gap-2">
            <div className="p-1 bg-blue-100 rounded">
              <Users className="w-4 h-4 text-blue-600" />
            </div>
            👤 Client Budget Offer
          </Label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
              <DollarSign className="w-5 h-5 text-gray-400" />
            </div>
            <Input
              id="client-offer"
              type="number"
              value={offers.client || ''}
              onChange={(e) => onOfferChange('client', parseFloat(e.target.value) || 0)}
              placeholder="Enter your budget..."
              disabled={disabled}
              className="pl-12 pr-4 py-3 text-lg font-semibold bg-white/80 backdrop-blur-sm border-2 focus:border-blue-500 rounded-xl"
              min="0"
              step="25"
            />
          </div>
          {offers.client > 0 && priceRange && (
            <div className="flex items-center gap-3">
              {(() => {
                const status = getOfferStatus(offers.client, 'client');
                if (!status) return null;
                const Icon = status.icon;
                return (
                  <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 ${status.bgColor}`}>
                    <Icon className={`w-4 h-4 ${status.color}`} />
                    <Badge variant="outline" className={`text-xs font-medium ${status.color} border-0`}>
                      {status.label}
                    </Badge>
                  </div>
                );
              })()}
            </div>
          )}
        </div>

        {/* Freelancer Ask Section */}
        <div className="space-y-3">
          <Label htmlFor="freelancer-ask" className="text-sm font-bold flex items-center gap-2">
            <div className="p-1 bg-emerald-100 rounded">
              <Target className="w-4 h-4 text-emerald-600" />
            </div>
            💼 Freelancer Price Ask
          </Label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
              <DollarSign className="w-5 h-5 text-gray-400" />
            </div>
            <Input
              id="freelancer-ask"
              type="number"
              value={offers.freelancer || ''}
              onChange={(e) => onOfferChange('freelancer', parseFloat(e.target.value) || 0)}
              placeholder="Enter your rate..."
              disabled={disabled}
              className="pl-12 pr-4 py-3 text-lg font-semibold bg-white/80 backdrop-blur-sm border-2 focus:border-emerald-500 rounded-xl"
              min="0"
              step="25"
            />
          </div>
          {offers.freelancer > 0 && priceRange && (
            <div className="flex items-center gap-3">
              {(() => {
                const status = getOfferStatus(offers.freelancer, 'freelancer');
                if (!status) return null;
                const Icon = status.icon;
                return (
                  <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 ${status.bgColor}`}>
                    <Icon className={`w-4 h-4 ${status.color}`} />
                    <Badge variant="outline" className={`text-xs font-medium ${status.color} border-0`}>
                      {status.label}
                    </Badge>
                  </div>
                );
              })()}
            </div>
          )}
        </div>

        {/* Enhanced Offer Comparison */}
        {offers.client > 0 && offers.freelancer > 0 && (
          <div className="p-5 bg-gradient-to-br from-slate-50 via-blue-25 to-purple-50 rounded-xl border-2 border-slate-200/60 backdrop-blur-sm">
            <div className="text-center mb-4">
              <h4 className="font-bold text-gray-800 text-lg">📊 Negotiation Dashboard</h4>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-white/60 rounded-lg backdrop-blur-sm">
                <span className="text-gray-700 font-medium flex items-center gap-2">
                  📏 <span>Price Gap:</span>
                </span>
                <span className="font-bold text-xl text-orange-600">
                  ${Math.abs(offers.freelancer - offers.client).toFixed(0)}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/60 rounded-lg backdrop-blur-sm">
                <span className="text-gray-700 font-medium flex items-center gap-2">
                  🎯 <span>Fair Midpoint:</span>
                </span>
                <span className="font-bold text-xl text-blue-600">
                  ${((offers.client + offers.freelancer) / 2).toFixed(0)}
                </span>
              </div>
              
              {/* Progress Indicator */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-gray-600 mb-2">
                  <span>Client: ${offers.client}</span>
                  <span>Freelancer: ${offers.freelancer}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-emerald-500 h-3 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${Math.min(100, (Math.min(offers.client, offers.freelancer) / Math.max(offers.client, offers.freelancer)) * 100)}%` 
                    }}
                  ></div>
                </div>
                <div className="text-center mt-2">
                  <Badge className={`${
                    Math.abs(offers.freelancer - offers.client) < 100 ? 'bg-green-100 text-green-800' :
                    Math.abs(offers.freelancer - offers.client) < 300 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {Math.abs(offers.freelancer - offers.client) < 100 ? '🎉 Almost aligned!' :
                     Math.abs(offers.freelancer - offers.client) < 300 ? '💪 Making progress' :
                     '🚀 Negotiating...'}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OfferPanel;
