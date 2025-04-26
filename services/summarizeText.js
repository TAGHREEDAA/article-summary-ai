import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import { RunnableSequence } from '@langchain/core/runnables';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';


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
  console.log('summarizeText article length:', articleText.length);

  // Step 1: Split the text into manageable chunks
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 100,
  });

  const chunks = await splitter.createDocuments([articleText]);

  // Step 2: Prepare the LangChain prompt
  const prompt = buildPrompt(types);
  const chain = RunnableSequence.from([prompt, llm]);

  let summaries = [];

  // Step 3: Summarize each chunk separately
  for (const chunk of chunks) {
    const result = await chain.invoke({ article: chunk.pageContent });
    const content = typeof result === 'object' && result.content ? result.content : result;
    summaries.push(content);
  }

  // Step 4: Combine all summaries
  return summaries.join('\n\n---\n\n');
}
