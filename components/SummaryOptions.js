import styles from '../styles/SummaryForm.module.css';

export default function SummaryOptions({selectedOptions, onChange}) {
    return (
        <div className={styles.optionsContainer}>
            <h2>Select Summary Options <span style={{color: 'red'}}>*</span></h2>

            <label>
                <input
                    type="checkbox"
                    name="summaryType"
                    value="simple"
                    checked={selectedOptions.includes('simple')}
                    onChange={onChange}
                />
                Simple Summary
            </label>
            <label>
                <input
                    type="checkbox"
                    name="summaryType"
                    value="keyPoints"
                    checked={selectedOptions.includes('keyPoints')}
                    onChange={onChange}
                />
                Key Points
            </label>
            <label>
                <input
                    type="checkbox"
                    name="summaryType"
                    value="suggestTitle"
                    checked={selectedOptions.includes('suggestTitle')}
                    onChange={onChange}
                />
                Suggest Title
            </label>
        </div>
    );
}
  