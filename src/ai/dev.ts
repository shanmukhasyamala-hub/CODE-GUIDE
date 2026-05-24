import { config } from 'dotenv';
config();

import '@/ai/flows/analyze-pull-request-issues.ts';
import '@/ai/flows/understand-code-context.ts';
import '@/ai/flows/generate-actionable-comments.ts';