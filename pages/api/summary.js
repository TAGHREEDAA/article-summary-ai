import axios from 'axios';
import * as cheerio from 'cheerio';

export default async function handler(req, res) {
  console.log("API Called");

  if (req.method !== 'POST') {
    console.log("Wrong method:", req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { url } = req.body;
    console.log("URL received:", url);

    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      }
    });
    console.log("HTML fetched successfully");

    const $ = cheerio.load(data);
    let text = '';
    $('p').each((i, elem) => {
      text += $(elem).text() + ' ';
    });
    console.log("Extracted text length:", text.length);

    res.status(200).json({ text: text.slice(0, 1000) }); // تجربة مبدئية

  } catch (err) {
    console.error("Error details:", err.message);
    res.status(500).json({ error: 'Failed to fetch or parse the article' });
  }
}
