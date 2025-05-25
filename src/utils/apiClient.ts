
interface NegotiationRequest {
  client_messages: string;
  freelancer_messages: string;
}

interface PriceRange {
  min_price: number;
  max_price: number;
  confidence: number;
}

interface NegotiationAnalysis {
  gap_analysis: string;
  recommendation: string;
  urgency_level: number;
  complexity_score: number;
}

// Configure your FastAPI backend URL
const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:8000';

export class APIClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  async predictPrice(clientMessages: string, freelancerMessages: string): Promise<[number, number]> {
    try {
      const response = await fetch(`${this.baseURL}/predict-price`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_messages: clientMessages,
          freelancer_messages: freelancerMessages,
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data: PriceRange = await response.json();
      return [data.min_price, data.max_price];
    } catch (error) {
      console.error('Price prediction API error:', error);
      // Fallback to local logic if API fails
      return this.fallbackPricePredict(clientMessages, freelancerMessages);
    }
  }

  async analyzeNegotiation(clientMessages: string, freelancerMessages: string): Promise<string> {
    try {
      const response = await fetch(`${this.baseURL}/analyze-negotiation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_messages: clientMessages,
          freelancer_messages: freelancerMessages,
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data: NegotiationAnalysis = await response.json();
      return data.recommendation;
    } catch (error) {
      console.error('Negotiation analysis API error:', error);
      return 'AI analysis temporarily unavailable. Using local analysis.';
    }
  }

  // Fallback method using existing local logic
  private fallbackPricePredict(clientMessages: string, freelancerMessages: string): [number, number] {
    const allText = (clientMessages + ' ' + freelancerMessages).toLowerCase();
    
    let experienceLevel = 0;
    if (allText.includes('expert') || allText.includes('professional') || allText.includes('experienced')) {
      experienceLevel = 3;
    } else if (allText.includes('intermediate') || allText.includes('skilled')) {
      experienceLevel = 2;
    } else {
      experienceLevel = 1;
    }
    
    const messageLength = allText.length;
    const timeKeywords = (allText.match(/\b(\d+\s*(day|week|month|hour)|urgent|asap|quickly|soon)\b/g) || []).length;
    const urgencyLevel = allText.includes('urgent') || allText.includes('asap') || allText.includes('rush') ? 3 : 1;
    
    const basePrice = 500;
    const experienceMultiplier = experienceLevel * 150;
    const complexityMultiplier = Math.min(messageLength / 100 * 50, 300);
    const urgencyMultiplier = urgencyLevel * 100;
    const timeMultiplier = timeKeywords * 75;
    
    const estimatedPrice = basePrice + experienceMultiplier + complexityMultiplier + urgencyMultiplier + timeMultiplier;
    const variance = estimatedPrice * 0.25;
    const minPrice = Math.max(100, estimatedPrice - variance);
    const maxPrice = estimatedPrice + variance;
    
    return [Math.round(minPrice), Math.round(maxPrice)];
  }
}

export const apiClient = new APIClient();
