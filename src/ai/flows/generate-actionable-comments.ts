'use server';
/**
 * @fileOverview This file implements a Genkit flow for generating actionable, line-specific review comments for code issues.
 *
 * - generateActionableComments - A function that generates a review comment for a given code issue.
 * - GenerateActionableCommentsInput - The input type for the generateActionableComments function.
 * - GenerateActionableCommentsOutput - The return type for the generateActionableComments function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input Schema
const GenerateActionableCommentsInputSchema = z.object({
  filePath: z.string().describe('The path to the file containing the code issue.'),
  codeSnippet: z.string().describe('The relevant code snippet where the issue is located.'),
  issueDescription: z.string().describe('A description of the identified code issue (e.g., security vulnerability, bug, code smell).'),
  lineStart: z.number().describe('The starting absolute line number of the code issue within the file.'),
  lineEnd: z.number().describe('The ending absolute line number of the code issue within the file.'),
});
export type GenerateActionableCommentsInput = z.infer<typeof GenerateActionableCommentsInputSchema>;

// Output Schema
const GenerateActionableCommentsOutputSchema = z.object({
  comment: z.string().describe('A clear, actionable, and markdown-formatted review comment for the identified issue.'),
  line: z.number().describe('The specific absolute line number in the file where the comment should be anchored.'),
});
export type GenerateActionableCommentsOutput = z.infer<typeof GenerateActionableCommentsOutputSchema>;

// Wrapper function
export async function generateActionableComments(input: GenerateActionableCommentsInput): Promise<GenerateActionableCommentsOutput> {
  return generateActionableCommentsFlow(input);
}

// Prompt definition
const prompt = ai.definePrompt({
  name: 'generateActionableCommentsPrompt',
  input: {schema: GenerateActionableCommentsInputSchema},
  output: {schema: GenerateActionableCommentsOutputSchema},
  prompt: `You are an expert code reviewer assistant. Your task is to provide clear, actionable, and line-specific review comments for identified code issues.

Given the following information about a code issue:
- **File Path**: {{{filePath}}}
- **Code Snippet (Lines {{lineStart}}-{{lineEnd}})**:
\`\`\`
{{{codeSnippet}}}
\`\`\`
- **Issue Description**: {{{issueDescription}}}

Generate a single, markdown-formatted review comment.
The comment should:
1.  Clearly explain the problem or vulnerability.
2.  Suggest a concrete and actionable fix or improvement.
3.  Be concise and directly address the provided code snippet.
4.  Specify the absolute line number in the file (between {{{lineStart}}} and {{{lineEnd}}} inclusive) where this comment should be anchored.

Example Output Format:
\`\`\`json
{
  "comment": "### Potential XSS Vulnerability\nThis input is directly rendered into the DOM without sanitization, which can lead to XSS attacks. Consider using a library like DOMPurify or a framework's built-in sanitization features.\n\n**Suggested fix:**\n\`\`\`javascript\nconst sanitizedInput = DOMPurify.sanitize(userInput);\n// Use sanitizedInput instead\n\`\`\`",
  "line": 15
}
\`\`\`

Now, generate the review comment and the anchor line for the provided issue:`,
});

// Flow definition
const generateActionableCommentsFlow = ai.defineFlow(
  {
    name: 'generateActionableCommentsFlow',
    inputSchema: GenerateActionableCommentsInputSchema,
    outputSchema: GenerateActionableCommentsOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
