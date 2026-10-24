import express from 'express';
import { getPublicAssistant } from '../Controllers/assistant.controller.js';

const assistantRouter = express.Router();

assistantRouter.get("/assistant/:assistantId/public", getPublicAssistant);

export default assistantRouter;