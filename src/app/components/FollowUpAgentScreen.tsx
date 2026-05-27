import { ChevronLeft, Send } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

type FollowUpMessage = {
  id: number;
  role: 'user' | 'assistant';
  text: string;
  time: string;
};

type LocationState = {
  context?: string;
};

const FALLBACK_CONTEXT =
  "Sheila Marsh, day 4 post-op hip replacement. Restful night, PT at 10am with 40ft walker distance, pain 2/10, wound clean this morning, all meds on time, enoxaparin due 6pm. Resting HR has stayed 6-9 bpm above baseline for 4 days.";

export function FollowUpAgentScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state as LocationState | null) || null;

  const context = useMemo(() => state?.context || FALLBACK_CONTEXT, [state]);

  const [messages, setMessages] = useState<FollowUpMessage[]>([
    {
      id: 1,
      role: 'assistant',
      text: "I have Sheila's latest brief loaded. Ask any follow-up and I can summarize risks, suggest next actions, or draft a message for the care circle.",
      time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }).toLowerCase(),
    },
  ]);
  const [draft, setDraft] = useState('');
  const [isSending, setIsSending] = useState(false);

  const formatTime = () =>
    new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }).toLowerCase();

  const sendMessage = async () => {
    const prompt = draft.trim();
    if (!prompt || isSending) {
      return;
    }

    setMessages((current) => [
      ...current,
      { id: Date.now(), role: 'user', text: prompt, time: formatTime() },
    ]);
    setDraft('');
    setIsSending(true);

    try {
      const response = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: prompt, context }),
      });

      const data = await response.json();
      const text = response.ok
        ? data.reply
        : data.error || 'I could not generate a follow-up right now. Please try again.';

      setMessages((current) => [
        ...current,
        { id: Date.now() + 1, role: 'assistant', text, time: formatTime() },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          role: 'assistant',
          text: 'Network issue while reaching the assistant. Please try again.',
          time: formatTime(),
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="h-screen bg-background flex flex-col">
      <div className="screen-header">
        <button onClick={() => navigate(-1)} className="back-link mb-3">
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>

        <div>
          <h1 className="text-xl font-medium mb-1">Follow-up agent</h1>
          <p className="text-xs text-muted-foreground">Case context loaded for Sheila Marsh</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-6 pb-28">
        <div className="max-w-md mx-auto space-y-4">
          <div className="surface-subtle p-3">
            <p className="text-xs text-muted-foreground leading-relaxed">{context}</p>
          </div>

          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[90%] px-4 py-3 rounded-2xl shadow-sm ${
                  message.role === 'user'
                    ? 'bg-gradient-to-br from-primary to-primary/90 text-primary-foreground rounded-tr-md'
                    : 'bg-gradient-to-br from-accent to-secondary/30 rounded-tl-md border border-border/30'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p className={`text-[11px] mt-2 ${message.role === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                  {message.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-20 left-0 right-0 bg-card/98 backdrop-blur-md border-t border-border/50 px-5 py-4 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
        <div className="max-w-md mx-auto flex gap-3">
          <input
            type="text"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                void sendMessage();
              }
            }}
            placeholder="Ask a follow-up..."
            className="flex-1 bg-input-background rounded-full px-5 py-3 text-sm outline-none focus:ring-2 ring-ring/30 transition-all shadow-sm"
          />
          <button
            onClick={() => {
              void sendMessage();
            }}
            disabled={isSending || !draft.trim()}
            className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-primary/90 text-primary-foreground flex items-center justify-center shadow-md hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
