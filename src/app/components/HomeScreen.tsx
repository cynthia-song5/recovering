import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router';

const getMetricColor = (metricKey: string, value: any, max: number): string => {
  if (metricKey === 'pain' && typeof value === 'number') {
    return value > 5 ? 'text-yellow-600' : 'text-foreground';
  }
  if (metricKey === 'meds' && typeof value === 'number') {
    return value !== max ? 'text-red-600' : 'text-green-600';
  }
  if (metricKey === 'sleep' && typeof value === 'string') {
    const hours = parseInt(value);
    if (hours >= 7) return 'text-green-600';
    if (hours >= 6) return 'text-yellow-600';
    return 'text-red-600';
  }
  if (metricKey === 'glucose' && typeof value === 'number') {
    if (value <= max * 0.85) return 'text-green-600';
    if (value <= max) return 'text-yellow-600';
    return 'text-red-600';
  }
  if (metricKey === 'peak_flow' && typeof value === 'number') {
    if (value >= max * 0.9) return 'text-green-600';
    if (value >= max * 0.8) return 'text-yellow-600';
    return 'text-red-600';
  }
  return 'text-foreground';
};

const careCircles = [
  {
    id: 'sheila',
    initials: 'SM',
    bgColor: '#f5e6d3',
    textColor: '#8b6f47',
    name: 'Sheila Marsh',
    relation: 'Mom',
    age: 78,
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
    condition: 'Type 2 diabetes · ongoing',
    alert: '1 task unclaimed — pharmacy pickup by 6pm',
    metrics: {
      glucose: { value: 118, max: 140, label: 'GLUCOSE' },
      meds: { value: 4, max: 4, label: 'MEDS' },
      sleep: { value: '6h 45m', label: 'SLEEP' },
    },
    updated: '1h ago',
  },
  {
    id: 'margaret',
    initials: 'MJ',
    bgColor: '#d4e0ed',
    textColor: '#4a6b8a',
    name: 'Margaret Johnson',
    relation: 'Daughter',
    age: 12,
    condition: 'Chronic asthma',
    metrics: {
      peak_flow: { value: 380, max: 400, label: 'PEAK FLOW' },
      meds: { value: 3, max: 3, label: 'MEDS' },
      sleep: { value: '8h 15m', label: 'SLEEP' },
    },
    updated: '3h ago',
  },
];

export function HomeScreen() {
  return (
    <div className="screen-root">
      <div className="screen-frame px-5 pt-12">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h1 className="text-[40px] leading-tight font-light tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
              Good morning,<br />
              <span className="font-medium">Sarah</span>
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
                  </div>
                </div>
              </div>

              <p className="text-sm mb-3 text-foreground/80">{circle.condition}</p>

              {circle.metrics && (
                <div className="surface-subtle p-3 mb-3 flex justify-between gap-4">
                  {Object.entries(circle.metrics).map(([key, metric]) => (
                    <div key={key} className="flex-1">
                      <div className={`text-2xl font-medium mb-0.5 ${getMetricColor(key, metric.value, metric.max)}`}>
                        {metric.value}{metric.max ? `/${metric.max}` : ''}
                      </div>
                      <div className="text-[10px] uppercase tracking-wide text-muted-foreground">
                        {metric.label}
                      </div>
                    </div>
                  ))}
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
