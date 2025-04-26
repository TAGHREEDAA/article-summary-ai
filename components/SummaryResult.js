import styles from '../styles/SummaryResult.module.css';

export default function SummaryResult({ summaryData, loading }) {
    if (loading) {
        return <p>Loading summary...</p>;
    }

    if (!summaryData || (!summaryData.summary && !summaryData.keyPoints.length && !summaryData.suggestedTitle)) {
        return null; // لا تعرض شيء لو مفيش بيانات
    }

    console.log("summaryData inside SummaryResult:", summaryData);

    return (
        <div className={styles.resultContainer}>

            {summaryData.suggestedTitle && (
                <h2 className={styles.title}>
                    Suggested Title: "{typeof summaryData.suggestedTitle === 'string' ? summaryData.suggestedTitle : JSON.stringify(summaryData.suggestedTitle)}"
                </h2>
            )}


            {summaryData.summary && (
                <>
                    <h3 className={styles.heading}>Summary:</h3>
                    <p className={styles.summaryText}>{summaryData.summary}</p>
                </>
            )}

            {summaryData.keyPoints && summaryData.keyPoints.length > 0 && (
                <>
                    <h3 className={styles.heading}>Key Points:</h3>
                    <ul className={styles.keyPointsList}>
                        {summaryData.keyPoints.map((point, index) => (
                            <li key={index} className={styles.keyPointItem}>{point}</li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}
