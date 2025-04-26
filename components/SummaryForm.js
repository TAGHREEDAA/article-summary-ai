import { useState } from 'react';
import SummaryOptions from './SummaryOptions';
import SummaryResult from './SummaryResult';
import styles from '../styles/SummaryForm.module.css';

export default function SummaryForm() {
    const [url, setUrl] = useState('https://www.bbc.com/news/live/c62jldpz9wyt');
    const [loading, setLoading] = useState(false);
    const [lastUrl, setLastUrl] = useState('');
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [lastSelectedOptions, setLastSelectedOptions] = useState([]);
    const [summaryData, setSummaryData] = useState({
        summary: '',
        keyPoints: [],
        suggestedTitle: ''
    });

    const isValidUrl = (string) => {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    };

    const handleOptionChange = (e) => {
        const value = e.target.value;
        setSelectedOptions(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;

        if (!isValidUrl(url)) {
            alert("Please enter a valid URL.");
            return;
        }

        if (selectedOptions.length === 0) {
            alert("Please select at least one summary option.");
            return;
        }

        // prevent re-request same url and options summarized before.
        if (
            url === lastUrl &&
            JSON.stringify(selectedOptions) === JSON.stringify(lastSelectedOptions) &&
            summaryData.summary
        ) {
            return; // Use cached summaryData
        }

        setLoading(true);

        try {
            const res = await fetch('/api/summary', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, types: selectedOptions }),
            });

            const data = await res.json();
            setLastUrl(url);
            setLastSelectedOptions(selectedOptions);
            setSummaryData(data);
        } catch (err) {
            console.error("Error:", err.message);
            setSummaryData({
                summary: 'Failed to summarize the article.',
                keyPoints: [],
                suggestedTitle: ''
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h1>🤖📝 Smart Article Analyzer 🚀</h1>

            <form onSubmit={handleSubmit} className={styles.form}>
                <h2>Article URL <span style={{ color: 'red' }}>*</span></h2>
                <input
                    id="url"
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter article URL"
                    required
                    className={styles.input}
                />

                <SummaryOptions selectedOptions={selectedOptions} onChange={handleOptionChange} />

                <button type="submit" className={styles.button}
                        disabled={loading || !isValidUrl(url) || selectedOptions.length === 0}>
                    {loading ? 'Summarizing...' : 'Summarize'}
                </button>
            </form>

            <SummaryResult summaryData={summaryData} loading={loading} />
        </div>
    );
}
