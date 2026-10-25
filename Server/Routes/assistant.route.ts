import express from 'express';
import { chatController, getPublicAssistant } from '../Controllers/assistant.controller.js';

const assistantRouter = express.Router();

assistantRouter.get("/:assistantId/public", getPublicAssistant);
assistantRouter.post("/chat", chatController);

export default assistantRouter;