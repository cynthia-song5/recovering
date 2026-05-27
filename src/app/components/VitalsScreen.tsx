import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router';

export function VitalsScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-md mx-auto">
        <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-10 px-5 py-4 border-b border-border/50">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <ChevronLeft className="w-4 h-4" />
            Circles
          </button>
        </div>

        <div className="px-5 pt-6">
          <div className="mb-6">
            <h1 className="text-3xl font-medium mb-2" style={{ fontFamily: 'Georgia, serif' }}>
              Vitals
            </h1>
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">via Oura · synced 8:14am · live</p>
              <span className="text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5 bg-[var(--stable-bg)] text-[var(--stable)]">
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                Connected
              </span>
            </div>
          </div>

          <div className="bg-card rounded-2xl p-5 shadow-sm border border-border/50">
            <h3 className="text-xs uppercase tracking-wide text-muted-foreground mb-3">
              Agent insights
            </h3>
            <div className="flex items-start gap-3 p-3 bg-[var(--warning-bg)] rounded-lg">
              <div className="w-8 h-8 rounded-full bg-[var(--warning)] text-white flex items-center justify-center text-xs flex-shrink-0">
                AI
              </div>
              <div className="flex-1">
                <p className="text-sm text-foreground leading-relaxed">
                  Resting HR has been elevated 6-9 bpm for 4 days. This is expected post-surgery but flag improvement by day 5.
                </p>
              </div>
            </div>
          </div>

          <br></br>

          <div className="bg-card rounded-2xl p-6 mb-4 shadow-sm border border-border/50">
            <div className="flex items-center gap-6">
              <div className="relative w-28 h-28">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="52"
                    fill="none"
                    stroke="#e8e4df"
                    strokeWidth="10"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="52"
                    fill="none"
                    stroke="#5a7a68"
                    strokeWidth="10"
                    strokeDasharray={`${(74 / 100) * 2 * Math.PI * 52} ${2 * Math.PI * 52}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-3xl font-medium">74</div>
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">Ready</div>
                </div>
              </div>

              <div className="flex-1">
                <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                  Last night
                </div>
                <h2 className="text-xl font-medium mb-2">Fair recovery</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  HRV slightly suppressed and HR elevated vs baseline — expected on day 4 post-op.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-card rounded-2xl p-5 shadow-sm border border-border/50">
              <h3 className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
                Resting HR
              </h3>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl font-medium">71</span>
                <span className="text-sm text-muted-foreground">bpm</span>
              </div>
              <div className="text-xs text-muted-foreground mb-3">+6 vs baseline</div>
              <div className="flex gap-0.5 h-6">
                {[72, 75, 73, 68, 71, 74].map((val, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-[var(--stable)] rounded-sm opacity-70"
                    style={{ height: `${(val / 80) * 100}%`, alignSelf: 'flex-end' }}
                  />
                ))}
              </div>
            </div>

            <div className="bg-card rounded-2xl p-5 shadow-sm border border-border/50">
              <h3 className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
                HRV
              </h3>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl font-medium">38</span>
                <span className="text-sm text-muted-foreground">ms</span>
              </div>
              <div className="text-xs text-muted-foreground mb-3">-14 vs baseline</div>
              <div className="flex gap-0.5 h-6">
                {[42, 45, 41, 38, 40, 39].map((val, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-[var(--stable)] rounded-sm opacity-70"
                    style={{ height: `${(val / 50) * 100}%`, alignSelf: 'flex-end' }}
                  />
                ))}
              </div>
            </div>

            <div className="bg-card rounded-2xl p-5 shadow-sm border border-border/50">
              <h3 className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
                Skin temp
              </h3>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl font-medium">+0.4</span>
                <span className="text-sm text-muted-foreground">°C</span>
              </div>
              <div className="text-xs text-muted-foreground">normal range</div>
            </div>

            <div className="bg-card rounded-2xl p-5 shadow-sm border border-border/50">
              <h3 className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
                SpO₂
              </h3>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl font-medium">97</span>
                <span className="text-sm text-muted-foreground">%</span>
              </div>
              <div className="text-xs text-muted-foreground">normal range</div>
            </div>
          </div>

                    <div className="bg-card rounded-2xl p-5 mb-4 shadow-sm border border-border/50">
            <div className="flex items-baseline justify-between mb-3">
              <h3 className="text-xs uppercase tracking-wide text-muted-foreground">Sleep</h3>
              <span className="text-xs text-muted-foreground">11:42pm - 7:18am</span>
            </div>
            <div className="text-3xl font-medium mb-4">7h 36m</div>

            <div className="h-8 flex rounded-lg overflow-hidden mb-3">
              <div className="h-full bg-[#3d5a7a]" style={{ width: '27%' }} />
              <div className="h-full bg-[#7891a1]" style={{ width: '36%' }} />
              <div className="h-full bg-[#a8b9c4]" style={{ width: '37%' }} />
            </div>

            <div className="flex gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-[#3d5a7a]" />
                <span className="text-muted-foreground">Deep</span>
                <span className="font-medium">2h 04m</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-[#7891a1]" />
                <span className="text-muted-foreground">REM</span>
                <span className="font-medium">1h 38m</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-[#a8b9c4]" />
                <span className="text-muted-foreground">Light</span>
                <span className="font-medium">3h 54m</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
