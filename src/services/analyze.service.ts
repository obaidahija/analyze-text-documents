import { CategorizationTask } from '../tasks/CategorizationTask';
import { PrimaryKeywordTask } from '../tasks/PrimaryKeywordTask';
import { SecondaryKeywordsTask } from '../tasks/SecondaryKeywordsTask';
import { SentimentAnalysisTask } from '../tasks/SentimentAnalysisTask';
import { AnalyzeResponse } from '../types/analyze';
import { SummarizationTask } from '../tasks/SummarizationTask';

import l from '../utils/logger';


export class CategorizationService {
    private categorizationTask: CategorizationTask;
    private primaryKeywordTask: PrimaryKeywordTask;
    private secondaryKeywordsTask: SecondaryKeywordsTask;
    private sentimentTask: SentimentAnalysisTask;
    private summarizationTask = new SummarizationTask();
    constructor() {
        l.info('Initializing Tasks...');
        this.categorizationTask = new CategorizationTask();
        this.primaryKeywordTask = new PrimaryKeywordTask();
        this.secondaryKeywordsTask = new SecondaryKeywordsTask();
        this.sentimentTask = new SentimentAnalysisTask();
        this.summarizationTask = new SummarizationTask();
    }
  
    async analyze(title: string, content: string): Promise<AnalyzeResponse> {
      try{
        l.info('Starting analysis for title and content...');
        const categories = await this.categorizationTask.analyze({ title, content });
        const primaryKeyword = await this.primaryKeywordTask.analyze({ title, content });
        const secondaryKeywords = await this.secondaryKeywordsTask.analyze({ title, content });
        const sentiment = await this.sentimentTask.analyze({ title, content});
        const summary = await this.summarizationTask.analyze({ title, content});

        l.info('Analysis completed successfully.');
        return {categories, primaryKeyword, secondaryKeywords, sentiment, summary};
      }  catch(error) {
        l.error('Error during analysis:', error);
        throw error; // Handle this as needed
      }

    }
  }

  export default new CategorizationService();