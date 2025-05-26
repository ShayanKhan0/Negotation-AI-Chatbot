
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

// Configure your FastAPI backend URL - using Vite environment variables
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export class APIClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  async predictPrice(clientMessages: string, freelancerMessages: string): Promise<[number, number]> {
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
  }

  async analyzeNegotiation(clientMessages: string, freelancerMessages: string): Promise<string> {
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
  }
}

export const apiClient = new APIClient();
