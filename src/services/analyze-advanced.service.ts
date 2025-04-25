import { lcStructuredAnalyze } from '../langchain/structuredAnalyze';
import { AnalyzeResponse } from '../types/analyze';
import l from '../utils/logger';

export class CategorizationService {

  
    async analyze(title: string, content: string): Promise<AnalyzeResponse> {
      try{
        l.info('Starting analysis for title and content...');
        const result = await lcStructuredAnalyze(title, content);
       
        l.info('Analysis completed successfully.');
        return result;
      }  catch(error) {
        l.error('Error during analysis:', error);
        throw error; // Handle this as needed
      }

    }
  }

  export default new CategorizationService();