'use server';
/**
 * @fileOverview This file implements a Genkit flow for understanding the context of a pull request.
 *
 * - understandCodeContext - A function that processes pull request information to provide a contextual understanding.
 * - UnderstandCodeContextInput - The input type for the understandCodeContext function.
 * - UnderstandCodeContextOutput - The return type for the understandCodeContext function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChangedFileInputSchema = z.object({
  filePath: z.string().describe('The path of the changed file.'),
  fileContentBefore: z.string().describe('The full content of the file before the changes.'),
  fileContentAfter: z.string().describe('The full content of the file after the changes.'),
  fileDiff: z.string().describe('The diff content for this specific file.'),
});

const UnderstandCodeContextInputSchema = z.object({
  pullRequestDescription: z.string().describe('The description provided for the pull request.'),
  repositoryFileStructure: z
    .string()
    .describe(
      'A textual representation of the repository\'s file and directory structure (e.g., from a `tree` command).'
    ),
  diffHistorySummary: z
    .string()
    .describe('A summary of relevant commit messages or diff history leading up to this pull request.'),
  changedFiles: z
    .array(ChangedFileInputSchema)
    .describe('An array of objects, each containing details about a changed file.'),
});
export type UnderstandCodeContextInput = z.infer<typeof UnderstandCodeContextInputSchema>;

const FileSpecificContextOutputSchema = z.object({
  filePath: z.string().describe('The path of the file that was analyzed.'),
  contextualAnalysis: z
    .string()
    .describe(
      'A specific contextual analysis for this file, explaining its role in the repository and how the changes fit into the overall project structure and history.'
    ),
});

const UnderstandCodeContextOutputSchema = z.object({
  overallContextSummary: z
    .string()
    .describe(
      'A comprehensive summary of the pull request\'s context, integrating information from the description, file structure, and diff history.'
    ),
  fileSpecificContexts: z
    .array(FileSpecificContextOutputSchema)
    .describe('An array of contextual analyses for each changed file.'),
});
export type UnderstandCodeContextOutput = z.infer<typeof UnderstandCodeContextOutputSchema>;

const prompt = ai.definePrompt({
  name: 'understandCodeContextPrompt',
  input: {schema: UnderstandCodeContextInputSchema},
  output: {schema: UnderstandCodeContextOutputSchema},
  prompt: `You are an AI assistant specialized in understanding code context for pull requests. Your task is to analyze the provided pull request description, repository file structure, diff history, and individual file changes. Generate a comprehensive summary of the overall context and specific contextual analysis for each changed file, highlighting how the changes relate to the file structure and diff history.\n\nPull Request Description:\n{{{pullRequestDescription}}}\n\nRepository File Structure:\n\`\`\`\n{{{repositoryFileStructure}}}\n\`\`\`\n\nDiff History Summary:\n{{{diffHistorySummary}}}\n\nChanged Files Details:\n{{#each changedFiles}}\n---\nFile Path: {{{filePath}}}\n\nFile Content Before (excerpt/summary if large):\n\`\`\`\n{{{fileContentBefore}}}\n\`\`\`\n\nFile Content After (excerpt/summary if large):\n\`\`\`\n{{{fileContentAfter}}}\n\`\`\`\n\nFile Diff:\n\`\`\`\n{{{fileDiff}}}\n\`\`\`\n{{/each}}\n\nBased on the information above, provide:\n1. A single 'overallContextSummary' that gives a high-level overview of the PR's purpose, its scope within the project, and how it aligns with the diff history and repository structure.\n2. An array of 'fileSpecificContexts', where each entry provides 'contextualAnalysis' for a 'filePath', explaining its role and how the changes in that file contribute to the overall PR goal and interact with other parts of the codebase, considering the provided file structure.\n`,
});

const understandCodeContextFlow = ai.defineFlow(
  {
    name: 'understandCodeContextFlow',
    inputSchema: UnderstandCodeContextInputSchema,
    outputSchema: UnderstandCodeContextOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

export async function understandCodeContext(
  input: UnderstandCodeContextInput
): Promise<UnderstandCodeContextOutput> {
  return understandCodeContextFlow(input);
}
