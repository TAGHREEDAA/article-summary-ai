import {ChatOpenAI} from '@langchain/openai';
import {PromptTemplate} from '@langchain/core/prompts';
import {RunnableSequence} from '@langchain/core/runnables';
import {RecursiveCharacterTextSplitter} from 'langchain/text_splitter';

const llm = new ChatOpenAI({
    temperature: 0.7,
    openAIApiKey: process.env.OPENAI_API_KEY,
    modelName: 'gpt-3.5-turbo',
});

function buildPromptWithMemory(previousSummary, isFirstChunk) {
    if (isFirstChunk)
        return PromptTemplate.fromTemplate(
            `
Summarize the following section within 500 characters:

Section:
{article}

Summary:
`
        );


    return PromptTemplate.fromTemplate(
        `
You have summarized the article so far as:
"{previousSummary}"

Now, continue summarizing the following section, and provide an updated summary within 500 characters:

Section:
{article}

Updated Summary:
`
    );
}

// A prompt for extracting Key Points and Title after summarization
function buildExtractionPrompt(types) {
    let tasks = '';
    let resultJson = [];

    if (types.includes('keyPoints')) {
        tasks += '- List the key points.\n';
        resultJson.push(`"keyPoints": ["...", "...", "..."]`);
    }

    if (types.includes('suggestTitle')) {
        tasks += '- Suggest a new title.\n';
        resultJson.push(`"suggestedTitle": "..."`);
    }

    const jsonFormat = `{${resultJson.join(',\n  ')}}`;


    return PromptTemplate.fromTemplate(
        `
Based on the following summary, please do the following tasks:

${tasks}

Summary:
{summary}

Return the result in JSON format:
{{ 
  ${resultJson.join(',\n  ')} 
}}
`
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

    // Step 2: Summarize each chunk progressively using memory
    let previousSummary = '';
    let finalSummary = '';

    for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        const isFirstChunk = i === 0;

        const prompt = buildPromptWithMemory(previousSummary, isFirstChunk);
        const chain = RunnableSequence.from([prompt, llm]);

        const result = await chain.invoke({
            previousSummary,
            article: chunk.pageContent,
        });

        const content = typeof result === 'object' && result.content ? result.content : result;
        previousSummary = content;
        finalSummary = content;
    }

    // Step 3: Extract Key Points + Suggested Title from the final summary
    const extractionPrompt = buildExtractionPrompt(types);
    const extractChain = RunnableSequence.from([extractionPrompt, llm]);

    const finalResult = await extractChain.invoke({summary: finalSummary});

    let parsedFinal;
    try {
        parsedFinal = JSON.parse(finalResult.content || finalResult);
    } catch (err) {
        console.error("Failed to parse final JSON:", err.message);
        parsedFinal = {};
    }

    return {
        summary: finalSummary.trim(),
        keyPoints: parsedFinal.keyPoints || [],
        suggestedTitle: parsedFinal.suggestedTitle || '',
    };
}
