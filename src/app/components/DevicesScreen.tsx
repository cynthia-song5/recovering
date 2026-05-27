import { ChevronLeft, Plus } from 'lucide-react';
import { useNavigate } from 'react-router';
import * as Switch from '@radix-ui/react-switch';

export function DevicesScreen() {
  const navigate = useNavigate();

  const alerts = [
    { label: 'Resting HR above 80', detail: 'sustained for 10 min', enabled: true },
    { label: 'SpO₂ below 94%', detail: 'any reading', enabled: true },
    { label: 'Skin temp spike +1.0°C', detail: 'rolling 1h average', enabled: true },
    { label: 'No movement 6+ hrs daytime', detail: '9am–7pm', enabled: true },
    { label: 'Sleep < 5h', detail: 'shared with care team', enabled: false },
  ];

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
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-medium mb-1">Devices</h1>
              <p className="text-sm text-muted-foreground">Connected sensors & alerts</p>
            </div>
            <button className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center">
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <div className="mb-6">
            <h2 className="text-xs uppercase tracking-wide text-muted-foreground mb-3">
              Connected
            </h2>

            <div className="bg-card rounded-2xl p-4 shadow-sm border border-border/50">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                  <div className="w-6 h-6 rounded-full border-2 border-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <h3 className="text-base font-medium">Oura Ring · Gen 3</h3>
                      <p className="text-sm text-muted-foreground">
                        Sheila's · synced 8:14am · 4 days battery
                      </p>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5 bg-[var(--stable-bg)] text-[var(--stable)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      Live
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {['Heart rate', 'HRV', 'Sleep', 'Skin temp', 'SpO₂', 'Activity'].map((metric) => (
                  <span
                    key={metric}
                    className="text-xs px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground"
                  >
                    {metric}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xs uppercase tracking-wide text-muted-foreground mb-3">
              Threshold alerts
            </h2>

            <div className="bg-card rounded-2xl divide-y divide-border/50 shadow-sm border border-border/50">
              {alerts.map((alert, index) => (
                <div key={index} className="flex items-center justify-between p-4">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium mb-0.5">{alert.label}</h3>
                    <p className="text-xs text-muted-foreground">{alert.detail}</p>
                  </div>
                  <Switch.Root
                    className="w-11 h-6 rounded-full relative bg-[var(--switch-background)] data-[state=checked]:bg-[var(--stable)] transition-colors"
                    defaultChecked={alert.enabled}
                  >
                    <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
                  </Switch.Root>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xs uppercase tracking-wide text-muted-foreground mb-3">
              Available to add
            </h2>

            <div className="bg-card rounded-2xl p-4 shadow-sm border border-border/50">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-medium">A</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-medium">Apple Health</h3>
                  <p className="text-sm text-muted-foreground">Steps, HR, BP</p>
                </div>
                <button className="text-sm font-medium text-primary px-4 py-2 rounded-lg border border-border">
                  Connect
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
