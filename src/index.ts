import express from 'express';
import "./common/env";
import analyzeRoutes from './routes/analyze.route';
import analyzeAdvancedRoutes from './routes/analyze-advanced.route';

import l from "./utils/logger";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/analyze', analyzeRoutes);
app.use('/analyze-advanced', analyzeAdvancedRoutes);
app.listen(PORT, () => {
    l.info(`Server is running on port ${PORT}`);
});