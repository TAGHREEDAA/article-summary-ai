import { fetchArticleText } from '../../services/fetchArticle';
import { summarizeText } from '../../services/summarizeText';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { url } = req.body;

    const articleText = await fetchArticleText(url);

    const summary = await summarizeText(articleText.slice(0, 3000));

    res.status(200).json({ summary });

  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ error: 'Failed to process the article' });
  }
}
