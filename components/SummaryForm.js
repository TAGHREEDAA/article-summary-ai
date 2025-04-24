import { useState } from 'react';
import styles from '../styles/SummaryForm.module.css';

export default function SummaryForm() {
  const [url, setUrl] = useState('https://www.bbc.com/news/live/cvg7jnywn5dt');
  const [summary, setSummary] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/summary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });
    const data = await res.json();
    setSummary(data.summary);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>📰 Article Summarizer</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter article URL"
          required
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Summarize</button>
      </form>
      <h2 className={styles.subtitle}>Summary:</h2>
      <p className={styles.summary}>{summary}</p>
    </div>
  );
}
