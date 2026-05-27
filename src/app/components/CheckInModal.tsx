import { useState } from 'react';
import { X, Phone, MessageSquare } from 'lucide-react';
import { parseMetricsFromText, saveMetricsToStorage } from '../../utils/parseMetrics';

interface CheckInModalProps {
  personId: string;
  personName: string;
  onClose: () => void;
  onUpdate: () => void;
}

export function CheckInModal({ personId, personName, onClose, onUpdate }: CheckInModalProps) {
  const [mode, setMode] = useState<'choice' | 'text' | 'voice'>('choice');
  const [textInput, setTextInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleTextSubmit = async () => {
    if (!textInput.trim()) {
      setError('Please enter check-in notes');
      return;
    }

    const parsed = parseMetricsFromText(textInput);
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

  const handleVoiceStart = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch('/api/start-check-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ personId, personName }),
      });

      if (!response.ok) {
        throw new Error('Failed to start voice check-in');
      }

      const data = await response.json();
      
      // Show success and close
      setSuccess('Voice check-in initiated. You will receive a call shortly.');
      
      setTimeout(() => {
        // Check if metrics were extracted from the call
        const savedMetrics = localStorage.getItem(`metrics_${personId}`);
        if (savedMetrics) {
          onUpdate();
        }
        onClose();
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start voice check-in');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end z-50">
      <div className="w-full bg-card rounded-t-2xl p-6 pb-8 shadow-xl border-t border-border/50 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium">Check in with {personName}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {mode === 'choice' && (
          <div className="space-y-3">
            <button
              onClick={() => setMode('voice')}
              className="w-full flex items-start gap-4 p-4 border border-border/70 rounded-lg hover:bg-muted/50 transition-colors text-left"
            >
              <Phone className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-medium mb-1">Voice check-in</h3>
                <p className="text-sm text-muted-foreground">
                  Receive a call to answer quick questions about pain and medications
                </p>
              </div>
            </button>

            <button
              onClick={() => setMode('text')}
              className="w-full flex items-start gap-4 p-4 border border-border/70 rounded-lg hover:bg-muted/50 transition-colors text-left"
            >
              <MessageSquare className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-medium mb-1">Text check-in</h3>
                <p className="text-sm text-muted-foreground">
                  Paste or type notes from today's check-in
                </p>
              </div>
            </button>
          </div>
        )}

        {mode === 'text' && (
          <div>
            <p className="text-sm text-muted-foreground mb-3">
              Paste check-in notes. I'll extract pain and meds values.
            </p>

            <textarea
              value={textInput}
              onChange={(e) => {
                setTextInput(e.target.value);
                setError('');
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
                onClick={() => {
                  setMode('choice');
                  setTextInput('');
                  setError('');
                }}
                className="flex-1 px-4 py-2 text-sm rounded-lg border border-border/70 text-foreground hover:bg-muted transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleTextSubmit}
                className="flex-1 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg shadow-sm hover:shadow-md transition-all"
              >
                Save check-in
              </button>
            </div>
          </div>
        )}

        {mode === 'voice' && (
          <div>
            <p className="text-sm text-muted-foreground mb-6">
              A voice call will be initiated to {personName}. The call will ask about current pain level and medication adherence. Metrics will be automatically extracted and updated.
            </p>

            {error && (
              <p className="text-sm text-red-600 mb-3">{error}</p>
            )}
            {success && (
              <p className="text-sm text-green-600 mb-3">{success}</p>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setMode('choice');
                  setError('');
                }}
                className="flex-1 px-4 py-2 text-sm rounded-lg border border-border/70 text-foreground hover:bg-muted transition-colors disabled:opacity-50"
                disabled={isLoading}
              >
                Back
              </button>
              <button
                onClick={handleVoiceStart}
                disabled={isLoading}
                className="flex-1 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg shadow-sm hover:shadow-md transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <span className="inline-block w-3 h-3 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    Starting...
                  </>
                ) : (
                  <>
                    <Phone className="w-4 h-4" />
                    Start voice call
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
