import { ChevronLeft, Droplet, Pill, Activity, Sparkles } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';

export function PersonDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="screen-root">
      <div className="screen-frame">
        <div className="screen-header">
          <button
            onClick={() => navigate('/')}
            className="back-link"
          >
            <ChevronLeft className="w-4 h-4" />
            Circles
          </button>
        </div>

        <div className="screen-content">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl font-medium mb-1">Sheila Marsh</h1>
              <p className="text-sm text-muted-foreground">Day 4 post-op · Hip replacement</p>
            </div>
            <span className="status-pill status-pill-stable">
              <span className="status-pill-dot" />
              Stable
            </span>
          </div>

          <div className="surface-card-strong p-4 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-xs uppercase tracking-wide text-muted-foreground">Daily Brief</span>
              <span className="text-xs text-muted-foreground ml-auto">7:02 AM</span>
            </div>

            <p className="text-sm leading-relaxed">
              Sheila had a <span className="italic">restful night</span>. PT at 10am went well — walked 40ft with the walker, pain held at 2/10. Wound clean per Nina's morning check. All meds on time; enoxaparin due 6pm.
            </p>

            <div className="mt-4 pt-4 border-t border-border/50">
              <div className="flex items-start gap-2 text-xs text-muted-foreground">
                <Activity className="w-3.5 h-3.5 mt-0.5" />
                <p>Resting HR is 6-9 bpm above baseline for 4 days. Flag #9 improvement by 5.</p>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button className="flex-1 bg-primary text-primary-foreground rounded-lg px-4 py-2 text-sm font-medium shadow-sm">
                Share with circle
              </button>
              <button
                onClick={() =>
                  navigate('/agent-follow-up', {
                    state: {
                      context:
                        "Sheila Marsh, day 4 post-op hip replacement. Restful night, PT at 10am with 40ft walker distance, pain 2/10, wound clean this morning, all meds on time, enoxaparin due 6pm. Resting HR has stayed 6-9 bpm above baseline for 4 days.",
                    },
                  })
                }
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm rounded-lg border border-border/70 bg-gradient-to-br from-accent/80 to-card text-foreground shadow-sm hover:shadow-md hover:from-accent hover:to-secondary/40 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-[var(--stable)]" />
                Ask follow-up
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="surface-card p-4 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Droplet className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">PAIN</span>
              </div>
              <div className="text-3xl font-medium mb-1">2<span className="text-lg text-muted-foreground">/10</span></div>
              <div className="text-xs text-muted-foreground">baseline range</div>
            </div>

            <div className="surface-card p-4 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Pill className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">MEDS TODAY</span>
              </div>
              <div className="text-3xl font-medium mb-1">3<span className="text-lg text-muted-foreground">/4</span></div>
              <div className="text-xs text-muted-foreground">1 due 6pm</div>
            </div>

            <div className="surface-card p-4 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">READINESS</span>
              </div>
              <div className="text-3xl font-medium mb-1">74</div>
              <div className="text-xs text-muted-foreground">Oura</div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="section-label mb-3">
              Today's schedule
            </h2>

            <div className="space-y-2">
              <div className="surface-card p-4 rounded-xl flex items-start gap-3">
                <div className="text-sm text-muted-foreground min-w-[60px]">10:00</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-medium">PT session</h3>
                    <span className="status-pill status-pill-stable py-0.5 px-2">
                      Done
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">Walked 40ft with walker</p>
                </div>
              </div>

              <div className="surface-card p-4 rounded-xl flex items-start gap-3">
                <div className="text-sm text-muted-foreground min-w-[60px]">14:00</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-medium">Afternoon meds</h3>
                    <span className="status-pill status-pill-warning py-0.5 px-2">
                      Next
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">Oxycodone 5mg + aspirin</p>
                </div>
              </div>

              <div className="surface-card p-4 rounded-xl flex items-start gap-3">
                <div className="text-sm text-muted-foreground min-w-[60px]">18:00</div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium">Evening wound check</h3>
                  <p className="text-xs text-muted-foreground">Nina's photo + memo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
