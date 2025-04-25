export interface AnalyzeResponse {
    summary: string;
    categories: string[]; 
    primaryKeyword: string; 
    secondaryKeywords: string[]; 
    sentiment: string; 
  }