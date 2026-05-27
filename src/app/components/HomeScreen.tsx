import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router';

const careCircles = [
  {
    id: 'sheila',
    initials: 'SM',
    bgColor: '#f5e6d3',
    textColor: '#8b6f47',
    name: 'Sheila Marsh',
    relation: 'Grandma',
    age: 78,
    status: 'Needs attention',
    statusColor: 'warning',
    alert: 'Missed evening meds last night · 9:00pm',
    condition: 'Day 4 post-op · Hip replacement',
    metrics: {
      pain: { value: 2, max: 10, label: 'PAIN' },
      meds: { value: 3, max: 4, label: 'MEDS' },
      sleep: { value: '7h 36m', label: 'SLEEP' },
    },
    updated: '8 min ago',
  },
  {
    id: 'robert',
    initials: 'RJ',
    bgColor: '#d4e8d4',
    textColor: '#4a7c59',
    name: 'Robert Johnson',
    relation: 'Dad',
    age: 74,
    status: 'Stable',
    condition: 'Type 2 diabetes · ongoing',
    alert: '1 task unclaimed — pharmacy pickup by 6pm',
    updated: '1h ago',
  },
  {
    id: 'margaret',
    initials: 'MJ',
    bgColor: '#d4e0ed',
    textColor: '#4a6b8a',
    name: 'Margaret Johnson',
    relation: 'Mom',
    age: 62,
    status: 'Stable',
    condition: 'Recovering from knee surgery',
    updated: '3h ago',
  },
];

export function HomeScreen() {
  return (
    <div className="screen-root">
      <div className="screen-frame px-5 pt-12">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h1 className="text-[32px] leading-tight">
              Good morning,<br />
              <span className="italic" style={{ fontFamily: 'Georgia, serif' }}>Sarah</span>
            </h1>
          </div>
          <div className="initial-badge w-10 h-10 bg-muted mt-1">
            <span className="text-sm font-medium">SC</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-8">
          3 circles · all stable
        </p>

        <div className="space-y-1">
          <h2 className="section-label mb-4">
            Your care circles
          </h2>

          {careCircles.map((circle) => (
            <Link
              key={circle.id}
              to={`/person/${circle.id}`}
              className="block surface-card p-4 mb-3 transition-shadow hover:shadow-md"
            >
              <div className="flex items-start gap-3 mb-3">
                <div
                  className="initial-badge w-12 h-12 flex-shrink-0"
                  style={{ backgroundColor: circle.bgColor, color: circle.textColor }}
                >
                  <span className="text-base font-medium">{circle.initials}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-base font-medium mb-0.5">{circle.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {circle.relation} · {circle.age} yrs
                      </p>
                    </div>
                    <span
                      className={`status-pill ${
                        circle.statusColor === 'warning'
                          ? 'status-pill-warning'
                          : 'status-pill-stable'
                      }`}
                    >
                      <span className="status-pill-dot" />
                      {circle.status}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-sm mb-3 text-foreground/80">{circle.condition}</p>

              {circle.metrics && (
                <div className="surface-subtle p-3 mb-3 flex justify-between gap-4">
                  <div className="flex-1">
                    <div className="text-2xl font-medium mb-0.5">
                      {circle.metrics.pain.value}/{circle.metrics.pain.max}
                    </div>
                    <div className="text-[10px] uppercase tracking-wide text-muted-foreground">
                      {circle.metrics.pain.label}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-2xl font-medium mb-0.5">
                      {circle.metrics.meds.value}/{circle.metrics.meds.max}
                    </div>
                    <div className="text-[10px] uppercase tracking-wide text-muted-foreground">
                      {circle.metrics.meds.label}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-2xl font-medium mb-0.5">
                      {circle.metrics.sleep.value}
                    </div>
                    <div className="text-[10px] uppercase tracking-wide text-muted-foreground">
                      {circle.metrics.sleep.label}
                    </div>
                  </div>
                </div>
              )}

              {circle.alert && (
                <div className="bg-[var(--alert-bg)] rounded-lg p-3 mb-3 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--alert)] mt-1.5 flex-shrink-0" />
                  <p className="text-sm text-[var(--alert)] flex-1">{circle.alert}</p>
                </div>
              )}

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Updated {circle.updated}</span>
                <div className="flex items-center gap-1 text-foreground/60">
                  <span>Open</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
