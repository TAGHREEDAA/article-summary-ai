import { supabase } from '../utils/supabaseClient';

export async function persistEmbeddings(articleUrl, embeddingsArray) {
    const records = embeddingsArray.map(({ chunkIndex, embedding }) => ({
        article_url: articleUrl,
        chunk_index: chunkIndex,
        embedding,
    }));

    const { data, error } = await supabase
        .from('article_embeddings')
        .insert(records);

    if (error) {
        console.error('Error saving embeddings:', error);
        throw error;
    }

    return data;
}

export async function getSimilarEmbeddings(articleUrl, questionEmbedding) {
    // (placeholder) later نعمل similarity search
}
