import { Request, Response } from 'express';
import  analyzeService from '../services/analyze.service';

import { cleanText } from '../utils/cleanText';
import l from '../utils/logger';
import { AnalyzeResponse } from '../types/analyze';

export class Controller {

  public async analyze(req: Request, res: Response): Promise<void> {
    let { title, content } = req.body;

    try {
        l.info('Received analyze request:', req.body);
        title = cleanText(title);
        content = cleanText(content);
        const result: AnalyzeResponse = await analyzeService.analyze(title, content);
        l.info('Sending analysis response:', result);
        res.status(200).json(result);
    } catch (error) {
        l.error('Error handling analyze request:', error);
        res.status(500).json({ error: 'An error occurred during analysis.' });
    }
  }
}

export default new Controller();