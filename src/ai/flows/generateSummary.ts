'use server';
/**
 * @fileOverview A flow to generate a professional summary for a resume.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const GenerateSummaryInputSchema = z.object({
  jobTitle: z.string().describe("The user's desired job title."),
  experience: z.string().describe("A brief summary of user's experience or key skills."),
});
export type GenerateSummaryInput = z.infer<typeof GenerateSummaryInputSchema>;

const GenerateSummaryOutputSchema = z.object({
  summary: z.string().describe('A professional summary for a resume, 2-4 sentences long.'),
});
export type GenerateSummaryOutput = z.infer<typeof GenerateSummaryOutputSchema>;

export async function generateSummary(input: GenerateSummaryInput): Promise<GenerateSummaryOutput> {
  return generateSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSummaryPrompt',
  input: {schema: GenerateSummaryInputSchema},
  output: {schema: GenerateSummaryOutputSchema},
  prompt: `You are a professional resume writer and career coach.
Based on the following user-provided information, write a compelling and concise professional summary for a resume.
The summary should be tailored to the job title and highlight the key experience and skills. It should be 2 to 4 sentences long.

Job Title: {{{jobTitle}}}
Experience / Skills: {{{experience}}}

Generate the professional summary.
`,
});

const generateSummaryFlow = ai.defineFlow(
  {
    name: 'generateSummaryFlow',
    inputSchema: GenerateSummaryInputSchema,
    outputSchema: GenerateSummaryOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
