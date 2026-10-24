export interface User {
  _id: string;
  name: string;
  email: string;
  assistantName: string;
  plan: string;
  isSetupComplete: boolean;
  geminiStatus: string;
}