import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import { RunnableSequence } from '@langchain/core/runnables';

const llm = new ChatOpenAI({
  temperature: 0.7,
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelName: 'gpt-3.5-turbo',
});

function buildPrompt(types) {
  let tasks = '';

  if (types.includes('simple')) {
    tasks += '- Provide a simple summary.\n';
  }

  if (types.includes('keyPoints')) {
    tasks += '- List the key points.\n';
  }

  if (types.includes('suggestTitle')) {
    tasks += '- Suggest a new title.\n';
  }

  return PromptTemplate.fromTemplate(
      `Please perform the following tasks on the article:\n\n${tasks}\n\nArticle:\n{article}\n\nResults:`
  );
}


export async function summarizeText(articleText, types) {
  console.log('summarizeText');
  const prompt = buildPrompt(types);
  const chain = RunnableSequence.from([prompt, llm]);

  const result = await chain.invoke({ article: articleText });

  return typeof result === 'object' && result.content ? result.content : result;
}
