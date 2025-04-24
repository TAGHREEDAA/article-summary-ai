import axios from 'axios';
import * as cheerio from 'cheerio';

export async function fetchArticleText(url) {
  const { data } = await axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    }
  });

  const $ = cheerio.load(data);
  let text = '';
  $('p').each((i, elem) => {
    text += $(elem).text() + ' ';
  });

  return text;
}
