import { ChevronLeft, Send, CheckCheck } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';

type CircleMessage = {
  id: number;
  sender: string;
  initials: string;
  bgColor: string;
  textColor: string;
  message: string;
  time: string;
  type: 'user' | 'assistant' | 'system';
  task?: {
    title: string;
    time: string;
    assignees: string[];
  };
};

export function CircleScreen() {
  const navigate = useNavigate();
  const location = useLocation();

  const initialMessages: CircleMessage[] = [
    {
      id: 1,
      sender: "Sheila's care assistant",
      initials: 'SA',
      bgColor: '#e8e4df',
      textColor: '#757575',
      message: "Good morning circle. Here's today's brief for Sheila.",
      time: '9:02am',
      type: 'assistant',
    },
    {
      id: 2,
      sender: 'James',
      initials: 'JM',
      bgColor: '#d4e8d4',
      textColor: '#4a7c59',
      message: 'Who can drive grandma to PT tomorrow at 9am? I have a 10am call.',
      time: '9:02am',
      type: 'user',
    },
    {
      id: 3,
      sender: "Sheila's care assistant",
      initials: 'SA',
      bgColor: '#e8e4df',
      textColor: '#757575',
      message: 'I added this as a task — Friday PT transport, 9am. Who can take it?',
      time: '9:53am',
      type: 'assistant',
      task: {
        title: 'Drive to PT',
        time: 'Friday 9am · 40 min',
        assignees: ['Sarah', 'James', 'Nina'],
      },
    },
    {
      id: 4,
      sender: 'James',
      initials: 'JM',
      bgColor: '#d4e8d4',
      textColor: '#4a7c59',
      message: "I'll do it — pick her up at 8:30.",
      time: '9:11am',
      type: 'user',
    },
    {
      id: 5,
      sender: 'James',
      initials: 'JM',
      bgColor: '#d4e8d4',
      textColor: '#4a7c59',
      message: 'James claimed · added to tasks · reminder set for 8:00am',
      time: '',
      type: 'system',
    },
  ];

  const [messages, setMessages] = useState<CircleMessage[]>(initialMessages);
  const [draft, setDraft] = useState('');
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const state = location.state as { brief?: string; personName?: string } | null;
    if (state?.brief) {
      const briefMessage: CircleMessage = {
        id: Date.now(),
        sender: 'Sarah',
        initials: 'SC',
        bgColor: '#f5e6d3',
        textColor: '#8b6f47',
        message: state.brief,
        time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }).toLowerCase(),
        type: 'user',
      };
      setMessages((current) => [...current, briefMessage]);
    }
  }, [location.state]);

  const formatTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }).toLowerCase();
  };

  const sendMessage = async () => {
    const text = draft.trim();
    if (!text || isSending) {
      return;
    }

    const userMessage: CircleMessage = {
      id: Date.now(),
      sender: 'Sarah',
      initials: 'SC',
      bgColor: '#f5e6d3',
      textColor: '#8b6f47',
      message: text,
      time: formatTime(),
      type: 'user',
    };

    setMessages((current) => [...current, userMessage]);
    setDraft('');
    setIsSending(true);

    try {
      const response = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });

      const data = await response.json();
      const assistantReply = response.ok
        ? data.reply
        : data.error || 'I could not respond right now. Please try again.';

      const assistantMessage: CircleMessage = {
        id: Date.now() + 1,
        sender: "Sheila's care assistant",
        initials: 'SA',
        bgColor: '#e8e4df',
        textColor: '#757575',
        message: assistantReply,
        time: formatTime(),
        type: 'assistant',
      };

      setMessages((current) => [...current, assistantMessage]);
    } catch {
      const fallbackMessage: CircleMessage = {
        id: Date.now() + 1,
        sender: "Sheila's care assistant",
        initials: 'SA',
        bgColor: '#e8e4df',
        textColor: '#757575',
        message: 'Connection issue. Please try again in a moment.',
        time: formatTime(),
        type: 'assistant',
      };
      setMessages((current) => [...current, fallbackMessage]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="h-screen bg-background flex flex-col">
      <div className="screen-header">
        <button
          onClick={() => navigate(-1)}
          className="back-link mb-3"
        >
          <ChevronLeft className="w-4 h-4" />
          Circles
        </button>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-medium mb-1.5">Sheila's circle</h1>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="flex -space-x-2">
                <div
                  className="initial-badge w-7 h-7 text-[10px] border-2 border-card"
                  style={{ backgroundColor: '#f5e6d3', color: '#8b6f47' }}
                >
                  SC
                </div>
                <div
                  className="initial-badge w-7 h-7 text-[10px] border-2 border-card"
                  style={{ backgroundColor: '#d4e8d4', color: '#4a7c59' }}
                >
                  JM
                </div>
                <div
                  className="initial-badge w-7 h-7 text-[10px] border-2 border-card"
                  style={{ backgroundColor: '#d4e0ed', color: '#4a6b8a' }}
                >
                  NI
                </div>
              </div>
              <span>Sarah · James · Nina · Assistant</span>
            </div>
          </div>
          <button className="w-8 h-8 rounded-full hover:bg-muted/50 flex items-center justify-center transition-colors">
            <span className="text-xl">⋮</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-6 pb-28">
        <div className="max-w-md mx-auto space-y-5">
          <div className="flex justify-center">
            <div className="bg-muted/50 rounded-full px-4 py-2 text-xs text-muted-foreground backdrop-blur-sm">
              Today, 9:02am
            </div>
          </div>

          {messages.map((msg) => {
            if (msg.type === 'system') {
              return (
                <div key={msg.id} className="flex justify-center my-2">
                  <p className="text-xs text-muted-foreground bg-muted/30 px-3 py-1.5 rounded-full">
                    {msg.message}
                  </p>
                </div>
              );
            }

            if (msg.type === 'assistant') {
              return (
                <div key={msg.id} className="flex gap-3">
                  <div
                    className="initial-badge w-8 h-8 text-xs flex-shrink-0"
                    style={{ backgroundColor: msg.bgColor, color: msg.textColor }}
                  >
                    ✦
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2 mb-1.5">
                      <span className="text-xs font-medium text-foreground">
                        Sheila's care assistant
                      </span>
                      <span className="text-xs text-muted-foreground">{msg.time}</span>
                    </div>
                    <div className="bg-gradient-to-br from-accent to-secondary/30 rounded-2xl rounded-tl-md px-4 py-3 shadow-sm border border-border/30">
                      <p className="text-sm leading-relaxed mb-3">{msg.message}</p>
                      {msg.task && (
                        <div className="bg-card/80 backdrop-blur-sm rounded-xl p-3.5 border border-border/40 shadow-sm">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-sm font-medium mb-1">{msg.task.title}</h3>
                              <p className="text-xs text-muted-foreground">{msg.task.time}</p>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {msg.task.assignees.map((assignee, i) => (
                              <button
                                key={i}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                  assignee === 'James'
                                    ? 'bg-[var(--stable)] text-white shadow-sm'
                                    : 'bg-muted text-foreground hover:bg-muted/70'
                                }`}
                              >
                                {assignee === 'James' && <CheckCheck className="w-3 h-3 inline mr-1" />}
                                {assignee}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div key={msg.id} className="flex gap-3">
                <div
                  className="initial-badge w-8 h-8 text-xs flex-shrink-0"
                  style={{ backgroundColor: msg.bgColor, color: msg.textColor }}
                >
                  {msg.initials}
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2 mb-1.5">
                    <span className="text-xs font-medium text-foreground">{msg.sender}</span>
                    <span className="text-xs text-muted-foreground">{msg.time}</span>
                  </div>
                  <div className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground rounded-2xl rounded-tl-md px-4 py-3 inline-block max-w-[85%] shadow-md">
                    <p className="text-sm leading-relaxed">{msg.message}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="fixed bottom-20 left-0 right-0 bg-card/98 backdrop-blur-md border-t border-border/50 px-5 py-4 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
        <div className="max-w-md mx-auto flex gap-3">
          <input
            type="text"
            placeholder="Message Sheila's circle..."
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                void sendMessage();
              }
            }}
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
