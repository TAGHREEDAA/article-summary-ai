import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { url } = req.body;

    const { data } = await axios.get(url);

    res.status(200).json({ html: data.slice(0, 1000) }); 
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch the article' });
  }
}
