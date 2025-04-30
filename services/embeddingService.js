import { OpenAIEmbeddings } from '@langchain/openai';

import {persistEmbeddings, getSimilarEmbeddings} from './embeddingPersistence';

const embeddingsModel = new OpenAIEmbeddings({
    modelName: 'text-embedding-ada-002',
});

export async function generateEmbedding(text) {
    try {
        const embedding = await embeddingsModel.embedQuery(text);

        if (!embedding) {
            throw new Error('Embedding not found in OpenAI response');
        }

        console.log('Successfully generated embedding:', embedding);
        return embedding;

    } catch (error) {
        console.error('Error generating embedding:', error);
        throw error;
    }
}

export async function saveArticleEmbeddings(articleUrl, embeddingsArray) {
    if (!articleUrl || !Array.isArray(embeddingsArray) || embeddingsArray.length === 0) {
        console.warn('Invalid data passed to saveArticleEmbeddings');
        return;
    }

    try {
        const result = await persistEmbeddings(articleUrl, embeddingsArray);
        console.log(`✅ Saved ${embeddingsArray.length} embeddings for article: ${articleUrl}`);
        return result;
    } catch (error) {
        console.error('❌ Failed to save article embeddings:', error);
        throw error;
    }
}

export async function findSimilarChunks(articleUrl, questionEmbedding) {
    //   TODO:: return await getSimilarEmbeddings(articleUrl, questionEmbedding);
}
