
// Mock negotiation logic - replace with your actual ML model calls

export interface Features {
  experienceLevel: number;
  messageLength: number;
  timeKeywords: number;
  budgetMentions: number;
  urgencyLevel: number;
}

export function buildFeatureVector(clientMessages: string, freelancerMessages: string): Features {
  const allText = (clientMessages + ' ' + freelancerMessages).toLowerCase();
  
  // Extract experience level indicators
  let experienceLevel = 0;
  if (allText.includes('expert') || allText.includes('professional') || allText.includes('experienced')) {
    experienceLevel = 3;
  } else if (allText.includes('intermediate') || allText.includes('skilled')) {
    experienceLevel = 2;
  } else {
    experienceLevel = 1;
  }
  
  // Message length indicator
  const messageLength = allText.length;
  
  // Time-related keywords
  const timeKeywords = (allText.match(/\b(\d+\s*(day|week|month|hour)|urgent|asap|quickly|soon)\b/g) || []).length;
  
  // Budget mentions
  const budgetMentions = (allText.match(/\$\d+|\bbud get\b|\bcost\b|\bprice\b|\bmoney\b/g) || []).length;
  
  // Urgency level
  let urgencyLevel = 0;
  if (allText.includes('urgent') || allText.includes('asap') || allText.includes('rush')) {
    urgencyLevel = 3;
  } else if (allText.includes('soon') || allText.includes('quickly')) {
    urgencyLevel = 2;
  } else {
    urgencyLevel = 1;
  }
  
  return {
    experienceLevel,
    messageLength: Math.min(messageLength / 100, 10), // Normalize
    timeKeywords,
    budgetMentions,
    urgencyLevel
  };
}

export function predictPrice(features: Features): [number, number] {
  // Mock Ridge regression prediction
  // Replace this with your actual ML model
  
  const basePrice = 500;
  const experienceMultiplier = features.experienceLevel * 150;
  const complexityMultiplier = Math.min(features.messageLength * 50, 300);
  const urgencyMultiplier = features.urgencyLevel * 100;
  const timeMultiplier = features.timeKeywords * 75;
  
  const estimatedPrice = basePrice + experienceMultiplier + complexityMultiplier + urgencyMultiplier + timeMultiplier;
  
  // Add some variance for range
  const variance = estimatedPrice * 0.25;
  const minPrice = Math.max(100, estimatedPrice - variance);
  const maxPrice = estimatedPrice + variance;
  
  return [Math.round(minPrice), Math.round(maxPrice)];
}

export function suggestMidpoint(clientOffer: number, freelancerAsk: number) {
  const gap = Math.abs(freelancerAsk - clientOffer);
  const midpoint = (clientOffer + freelancerAsk) / 2;
  const range: [number, number] = [
    Math.min(clientOffer, freelancerAsk),
    Math.max(clientOffer, freelancerAsk)
  ];
  
  return {
    gap,
    midpoint,
    range
  };
}

// Utility function to extract numerical values from text
export function extractNumbers(text: string): number[] {
  const matches = text.match(/\$?(\d+(?:,\d{3})*(?:\.\d{2})?)/g);
  return matches ? matches.map(match => parseFloat(match.replace(/[$,]/g, ''))) : [];
}

// Utility function to detect project complexity
export function detectComplexity(text: string): 'simple' | 'medium' | 'complex' {
  const complexKeywords = ['complex', 'advanced', 'sophisticated', 'enterprise', 'custom', 'integration'];
  const mediumKeywords = ['moderate', 'standard', 'typical', 'regular', 'normal'];
  
  const lowerText = text.toLowerCase();
  
  if (complexKeywords.some(keyword => lowerText.includes(keyword))) {
    return 'complex';
  } else if (mediumKeywords.some(keyword => lowerText.includes(keyword))) {
    return 'medium';
  } else {
    return 'simple';
  }
}
