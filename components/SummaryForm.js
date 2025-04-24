import { useState } from 'react';
import styles from '../styles/SummaryForm.module.css';

export default function SummaryForm() {
  const [url, setUrl] = useState('https://www.bbc.com/news/world-65249871');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [lastUrl, setLastUrl] = useState('');
  const [lastSummary, setLastSummary] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    // prevent re-request same url summarized before
    if (url === lastUrl && lastSummary) {
      setSummary(lastSummary);
      return;
    }

    setLoading(true);
    setSummary('');

    try {
      const res = await fetch('/api/summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      setSummary(data.summary);
      setLastUrl(url);
      setLastSummary(data.summary);
    } catch (err) {
      setSummary('Failed to summarize the article.');
    } finally {
      setLoading(false);
    }
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
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? 'Summarizing...' : 'Summarize'}
        </button>
      </form>
      <h2 className={styles.subtitle}>Summary:</h2>
      {loading && <p>Loading summary...</p>}
      {!loading && summary && <p className={styles.summary}>{summary}</p>}
    </div>
  );
}
