import { Router } from 'express';
import { getBedTypes, getLookups, getStats } from './lookups.controller.js';
const lookupsRouter = Router();
lookupsRouter.get('/', getLookups);
lookupsRouter.get('/stats', getStats);
lookupsRouter.get('/bedtypes', getBedTypes);
export default lookupsRouter;