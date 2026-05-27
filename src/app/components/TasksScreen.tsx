import { ChevronLeft, Droplet, Pill, Camera, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router';

export function TasksScreen() {
  const navigate = useNavigate();

  return (
    <div className="screen-root">
      <div className="screen-frame">
        <div className="screen-header">
          <button
            onClick={() => navigate(-1)}
            className="back-link"
          >
            <ChevronLeft className="w-4 h-4" />
            Circles
          </button>
        </div>

        <div className="screen-content">
          <div className="mb-6">
            <h1 className="text-3xl font-medium mb-1">Tasks</h1>
            <p className="text-sm text-muted-foreground">3 open · 2 done today</p>
          </div>

          <div className="surface-card-strong p-5 mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase tracking-wide text-muted-foreground">
                EOD check-in
              </span>
              <span className="text-xs text-muted-foreground">due 7:00pm</span>
            </div>

            <h2 className="text-xl font-medium mb-6">How was Sheila's day?</h2>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <Droplet className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm">Pain level (0–10)</span>
              </div>

              <div className="flex items-center gap-3">
                <Pill className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm">All evening meds taken?</span>
              </div>

              <div className="flex items-center gap-3">
                <Camera className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm">Upload wound photo</span>
              </div>

              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm">Mood & energy note</span>
              </div>
            </div>

            <button className="w-full bg-gradient-to-br from-primary to-primary/90 text-primary-foreground rounded-xl py-3 font-medium shadow-sm hover:shadow-md transition-shadow">
              Start check-in · voice or text
            </button>
          </div>

          <div className="mb-6">
            <h2 className="section-label mb-3">
              Today
            </h2>

            <div className="space-y-2">
              <div className="surface-card p-4 rounded-xl">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium mb-1">Pick up compression socks</h3>
                    <p className="text-xs text-muted-foreground">by 5pm</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="initial-badge w-7 h-7 text-xs" style={{ backgroundColor: '#d4e8d4', color: '#4a7c59' }}>
                      JM
                    </div>
                    <span className="text-xs text-muted-foreground">James</span>
                  </div>
                </div>
              </div>

              <div className="surface-card p-4 rounded-xl">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium mb-1">Send pain log to care team</h3>
                    <p className="text-xs text-muted-foreground">by 5pm</p>
                  </div>
                  <button className="bg-primary text-primary-foreground rounded-lg px-4 py-1.5 text-xs font-medium shadow-sm">
                    Claim
                  </button>
                </div>
              </div>

              <div className="surface-card p-4 rounded-xl">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-medium">Confirm Friday PT transport</h3>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground uppercase tracking-wide">
                        From agent
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">by tomorrow</p>
                  </div>
                  <button className="bg-primary text-primary-foreground rounded-lg px-4 py-1.5 text-xs font-medium shadow-sm">
                    Claim
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="section-label mb-3">
              Reminder rules
            </h2>

            <div className="surface-card divide-y divide-border/50">
              <div className="p-4">
                <h3 className="text-sm font-medium mb-1">Afternoon meds</h3>
                <p className="text-xs text-muted-foreground">Daily at 2pm</p>
              </div>

              <div className="p-4">
                <h3 className="text-sm font-medium mb-1">PT exercises</h3>
                <p className="text-xs text-muted-foreground">Daily at 10am, 3pm</p>
              </div>

              <div className="p-4">
                <h3 className="text-sm font-medium mb-1">Wound check photo</h3>
                <p className="text-xs text-muted-foreground">Daily at 9am, 6pm</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
