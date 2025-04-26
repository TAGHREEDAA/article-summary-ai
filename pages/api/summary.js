import {fetchArticleText} from '../../services/fetchArticle';
import {summarizeText} from '../../services/summarizeText';

async function generateFakeSummary(types) {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay

    let fakeSummary = '';

    if (types.includes('simple')) {
        fakeSummary += 'This is a simple summary of the article.\<br>';
    }

    if (types.includes('keyPoints')) {
        fakeSummary += 'Key Points: \<br>';
        fakeSummary += '<ul>';
        fakeSummary += '<li>Point 1</li>';
        fakeSummary += '<li>Point 2</li>';
        fakeSummary += '<li>Point 3</li>';
        fakeSummary += '</ul>';
    }

    if (types.includes('suggestTitle')) {
        fakeSummary += 'Suggested Title: "The Future of AI in Tech"\<br>';
    }

    return fakeSummary;
}

async function generateRealSummary(url, types) {
    const articleText = await fetchArticleText(url);
    return await summarizeText(articleText.slice(0, 3000), types);
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

        let summary = process.env.NODE_ENV !== "production" ?
            await generateFakeSummary(types) : await generateRealSummary(url, types);

        res.status(200).json({ "summary": summary });

    } catch (err) {
        console.error("Error:", err.message);
        res.status(500).json({ error: 'Failed to process the article' });
    }
}
