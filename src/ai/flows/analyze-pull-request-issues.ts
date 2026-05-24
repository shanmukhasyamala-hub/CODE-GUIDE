'use server';
/**
 * @fileOverview A Genkit flow for analyzing pull request diffs to identify potential bugs, security vulnerabilities, performance bottlenecks, and code smells.
 *
 * - analyzePullRequestIssues - A function that handles the analysis process.
 * - AnalyzePullRequestIssuesInput - The input type for the analyzePullRequestIssues function.
 * - AnalyzePullRequestIssuesOutput - The return type for the analyzePullRequestIssues function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input Schema
const AnalyzePullRequestIssuesInputSchema = z.object({
  prDiff: z
    .string()
    .describe('The diff of the pull request to analyze, as a string.'),
});
export type AnalyzePullRequestIssuesInput = z.infer<
  typeof AnalyzePullRequestIssuesInputSchema
>;

// Output Schema
const IssueSchema = z.object({
  type: z
    .enum(['bug', 'security', 'performance', 'code_smell'])
    .describe('The type of issue identified (bug, security, performance, or code_smell).'),
  description: z
    .string()
    .describe('A detailed description of the identified issue.'),
  filePath: z
    .string()
    .optional()
    .describe('The file path where the issue is located (if applicable).'),
  lineNumber: z
    .number()
    .optional()
    .describe('The line number in the diff where the issue starts (if applicable).'),
  severity: z
    .enum(['low', 'medium', 'high', 'critical'])
    .describe('The severity of the issue.'),
});

const AnalyzePullRequestIssuesOutputSchema = z.object({
  issues: z.array(IssueSchema).describe('An array of identified issues.'),
});
export type AnalyzePullRequestIssuesOutput = z.infer<
  typeof AnalyzePullRequestIssuesOutputSchema
>;

export async function analyzePullRequestIssues(
  input: AnalyzePullRequestIssuesInput
): Promise<AnalyzePullRequestIssuesOutput> {
  return analyzePullRequestIssuesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzePullRequestIssuesPrompt',
  input: {schema: AnalyzePullRequestIssuesInputSchema},
  output: {schema: AnalyzePullRequestIssuesOutputSchema},
  prompt: `You are an expert AI code reviewer. Your task is to analyze the provided pull request diff for potential issues.\nIdentify and list all instances of:\n- Bugs (e.g., logical errors, incorrect calculations, off-by-one errors)\n- Security vulnerabilities (e.g., injection flaws, insecure deserialization, cross-site scripting, improper access controls)\n- Performance bottlenecks (e.g., inefficient algorithms, excessive database queries, large object allocations in loops)\n- Code smells (e.g., duplicated code, long methods, complex conditionals, magic numbers, poor naming conventions)\n\nFor each identified issue, provide:\n1.  A 'type' (must be one of 'bug', 'security', 'performance', 'code_smell').\n2.  A clear and concise 'description' of the issue.\n3.  The 'filePath' where the issue is located.\n4.  The approximate 'lineNumber' within the diff where the issue begins (if applicable, otherwise omit).\n5.  A 'severity' rating (must be one of 'low', 'medium', 'high', 'critical').\n\nThe output MUST be a JSON object conforming to the AnalyzePullRequestIssuesOutputSchema.\nFocus only on the diff provided. Do not hallucinate or provide suggestions outside the scope of the diff.\n\nPull Request Diff:\n{{{prDiff}}}`,
});

const analyzePullRequestIssuesFlow = ai.defineFlow(
  {
    name: 'analyzePullRequestIssuesFlow',
    inputSchema: AnalyzePullRequestIssuesInputSchema,
    outputSchema: AnalyzePullRequestIssuesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
