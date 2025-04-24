import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function summarizeText(text) {
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'You are a helpful assistant that summarizes articles.' },
      { role: 'user', content: `Please summarize this article: ${text}` },
    ],
    temperature: 0.7,
  });

  return response.choices[0].message.content;
}
