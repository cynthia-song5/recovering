import { useState } from 'react';
import { X } from 'lucide-react';
import { parseMetricsFromText, saveMetricsToStorage } from '../../utils/parseMetrics';

interface UpdateMetricsModalProps {
  personId: string;
  personName: string;
  onClose: () => void;
  onUpdate: () => void;
}

export function UpdateMetricsModal({ personId, personName, onClose, onUpdate }: UpdateMetricsModalProps) {
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = () => {
    if (!summary.trim()) {
      setError('Please enter a summary');
      return;
    }

    const parsed = parseMetricsFromText(summary);
    if (Object.keys(parsed).length === 0) {
      setError('No pain or meds values found. Try: "pain 2/10" or "3 meds taken"');
      return;
    }

    saveMetricsToStorage(personId, parsed);
    setSuccess(`Updated: ${Object.keys(parsed).join(', ')}`);
    
    setTimeout(() => {
      onUpdate();
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end z-50">
      <div className="w-full bg-card rounded-t-2xl p-6 pb-8 shadow-xl border-t border-border/50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">Update {personName}'s metrics</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-sm text-muted-foreground mb-4">
          Paste a daily summary. I'll extract pain and meds values.
        </p>

        <textarea
          value={summary}
          onChange={(e) => {
            setSummary(e.target.value);
            setError('');
            setSuccess('');
          }}
          placeholder="E.g., 'Pain 2/10, took 3 of 4 meds this morning...'"
          className="w-full bg-input-background rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 ring-ring/30 transition-all resize-none h-32 mb-4"
        />

        {error && (
          <p className="text-sm text-red-600 mb-3">{error}</p>
        )}
        {success && (
          <p className="text-sm text-green-600 mb-3">{success}</p>
        )}

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-sm rounded-lg border border-border/70 text-foreground hover:bg-muted transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg shadow-sm hover:shadow-md transition-all"
          >
            Update metrics
          </button>
        </div>
      </div>
    </div>
  );
}
