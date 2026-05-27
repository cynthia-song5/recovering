import { ChevronLeft, Send, CheckCheck } from 'lucide-react';
import { useNavigate } from 'react-router';

export function CircleScreen() {
  const navigate = useNavigate();

  const messages = [
    {
      id: 1,
      sender: 'Nina',
      initials: 'NI',
      bgColor: '#f5e6d3',
      textColor: '#8b6f47',
      message: 'Thank you Nina ❤️ Brief looks good this morning.',
      time: '9:02am',
      type: 'user',
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

  return (
    <div className="h-screen bg-background flex flex-col">
      <div className="bg-background/95 backdrop-blur-sm z-10 px-5 py-4 border-b border-border/50">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-muted-foreground mb-3"
        >
          <ChevronLeft className="w-4 h-4" />
          Circles
        </button>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-medium">Sheila's circle</h1>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="flex -space-x-2">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-medium border-2 border-background"
                  style={{ backgroundColor: '#f5e6d3', color: '#8b6f47' }}
                >
                  SC
                </div>
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-medium border-2 border-background"
                  style={{ backgroundColor: '#d4e8d4', color: '#4a7c59' }}
                >
                  JM
                </div>
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-medium border-2 border-background"
                  style={{ backgroundColor: '#d4e0ed', color: '#4a6b8a' }}
                >
                  NI
                </div>
              </div>
              <span>Sarah · James · Nina · Sheila's assistant</span>
            </div>
          </div>
          <button className="text-2xl">⋮</button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 pb-28">
        <div className="max-w-md mx-auto space-y-4">
          <div className="bg-[repeating-linear-gradient(45deg,#e8e4df,#e8e4df_10px,transparent_10px,transparent_20px)] rounded-lg p-4 text-center">
            <p className="text-sm text-muted-foreground">shared · today, 9:02am</p>
          </div>

          {messages.map((msg) => {
            if (msg.type === 'system') {
              return (
                <div key={msg.id} className="flex justify-center">
                  <p className="text-xs text-muted-foreground">{msg.message}</p>
                </div>
              );
            }

            if (msg.type === 'assistant') {
              return (
                <div key={msg.id} className="flex gap-2">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0"
                    style={{ backgroundColor: msg.bgColor, color: msg.textColor }}
                  >
                    {msg.initials}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-xs font-medium text-primary">
                        ⭐ Sheila's care assistant
                      </span>
                      <span className="text-xs text-muted-foreground">{msg.time}</span>
                    </div>
                    <p className="text-sm mb-2">{msg.message}</p>
                    {msg.task && (
                      <div className="bg-accent rounded-lg p-3 border-l-2 border-[var(--warning)]">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-sm font-medium mb-1">{msg.task.title}</h3>
                            <p className="text-xs text-muted-foreground">{msg.task.time}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {msg.task.assignees.map((assignee, i) => (
                            <button
                              key={i}
                              className={`px-3 py-1 rounded-lg text-xs ${
                                assignee === 'James'
                                  ? 'bg-[var(--stable)] text-white'
                                  : 'bg-secondary text-secondary-foreground'
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
              );
            }

            return (
              <div key={msg.id} className="flex gap-2">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0"
                  style={{ backgroundColor: msg.bgColor, color: msg.textColor }}
                >
                  {msg.initials}
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-xs font-medium">{msg.sender}</span>
                    <span className="text-xs text-muted-foreground">{msg.time}</span>
                  </div>
                  <div className="bg-primary text-primary-foreground rounded-2xl rounded-tl-sm px-4 py-2 inline-block max-w-[85%]">
                    <p className="text-sm">{msg.message}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="fixed bottom-20 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border/50 px-5 py-3">
        <div className="max-w-md mx-auto flex gap-2">
          <input
            type="text"
            placeholder="Message Sheila's circle..."
            className="flex-1 bg-input-background rounded-full px-4 py-2 text-sm outline-none focus:ring-2 ring-ring"
          />
          <button className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
