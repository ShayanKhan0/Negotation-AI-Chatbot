
import React from 'react';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
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
    const isWithinRange = offer >= min && offer <= max;
    
    if (role === 'client') {
      if (offer < min) return { status: 'low', icon: TrendingDown, color: 'text-red-500' };
      if (offer > max) return { status: 'high', icon: TrendingUp, color: 'text-green-500' };
      return { status: 'fair', icon: TrendingUp, color: 'text-blue-500' };
    } else {
      if (offer > max) return { status: 'high', icon: TrendingUp, color: 'text-red-500' };
      if (offer < min) return { status: 'low', icon: TrendingDown, color: 'text-orange-500' };
      return { status: 'fair', icon: TrendingUp, color: 'text-green-500' };
    }
  };

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-green-600" />
          Current Offers
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Client Offer */}
        <div className="space-y-2">
          <Label htmlFor="client-offer" className="text-sm font-medium">
            🧑 Client Offer
          </Label>
          <div className="relative">
            <Input
              id="client-offer"
              type="number"
              value={offers.client || ''}
              onChange={(e) => onOfferChange('client', parseFloat(e.target.value) || 0)}
              placeholder="Enter offer amount"
              disabled={disabled}
              className="pl-8"
              min="0"
              step="5"
            />
            <DollarSign className="w-4 h-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          {offers.client > 0 && priceRange && (
            <div className="flex items-center gap-2">
              {(() => {
                const status = getOfferStatus(offers.client, 'client');
                if (!status) return null;
                const Icon = status.icon;
                return (
                  <>
                    <Icon className={`w-4 h-4 ${status.color}`} />
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${status.color.replace('text-', 'border-')}`}
                    >
                      {status.status === 'low' ? 'Below Range' : 
                       status.status === 'high' ? 'Above Range' : 'Fair Offer'}
                    </Badge>
                  </>
                );
              })()}
            </div>
          )}
        </div>

        {/* Freelancer Ask */}
        <div className="space-y-2">
          <Label htmlFor="freelancer-ask" className="text-sm font-medium">
            👨‍💻 Freelancer Ask
          </Label>
          <div className="relative">
            <Input
              id="freelancer-ask"
              type="number"
              value={offers.freelancer || ''}
              onChange={(e) => onOfferChange('freelancer', parseFloat(e.target.value) || 0)}
              placeholder="Enter ask amount"
              disabled={disabled}
              className="pl-8"
              min="0"
              step="5"
            />
            <DollarSign className="w-4 h-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          {offers.freelancer > 0 && priceRange && (
            <div className="flex items-center gap-2">
              {(() => {
                const status = getOfferStatus(offers.freelancer, 'freelancer');
                if (!status) return null;
                const Icon = status.icon;
                return (
                  <>
                    <Icon className={`w-4 h-4 ${status.color}`} />
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${status.color.replace('text-', 'border-')}`}
                    >
                      {status.status === 'high' ? 'Above Range' : 
                       status.status === 'low' ? 'Below Range' : 'Fair Ask'}
                    </Badge>
                  </>
                );
              })()}
            </div>
          )}
        </div>

        {/* Offer Comparison */}
        {offers.client > 0 && offers.freelancer > 0 && (
          <div className="p-3 bg-gray-50 rounded-lg border">
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-600">Gap:</span>
                <span className="font-medium text-orange-600">
                  ${Math.abs(offers.freelancer - offers.client).toFixed(0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Midpoint:</span>
                <span className="font-medium text-blue-600">
                  ${((offers.client + offers.freelancer) / 2).toFixed(0)}
                </span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OfferPanel;
