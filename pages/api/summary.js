import {fetchArticleText} from '../../services/fetchArticle';
import {summarizeText} from '../../services/summarizeText';

async function generateFakeSummary(types) {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay

    let fakeResult = {
        summary: '',
        keyPoints: [],
        suggestedTitle: ''
    };

    if (types.includes('simple')) {
        fakeResult.summary = 'This is a simple summary of the article.';
    }

    if (types.includes('keyPoints')) {
        fakeResult.keyPoints = [
            'Point 1: Important insight from the article.',
            'Point 2: Another key aspect to consider.',
            'Point 3: Final takeaway from the article.'
        ];
    }

    if (types.includes('suggestTitle')) {
        fakeResult.suggestedTitle = 'The Future of AI in Tech';
    }

    return fakeResult;
}


async function generateRealSummary(url, types) {
    const articleText = await fetchArticleText(url);
    return await summarizeText(url, articleText.slice(0, 3000), types);
}


export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { url, types } = req.body;

        if (!url || !types || !Array.isArray(types) || types.length === 0) {
            return res.status(400).json({ error: 'Invalid request data.' });
        }

        // let summary = await generateRealSummary(url, types);
        let summary = process.env.NODE_ENV !== "production" ?
            await generateFakeSummary(types) : await generateRealSummary(url, types);

        res.status(200).json(summary);

    } catch (err) {
        console.error("Error:", err.message);
        res.status(500).json({ error: 'Failed to process the article' });
    }
}
