export interface ParsedMetrics {
    pain?: number;
    meds?: number;
    updatedAt?: string;
}

export function parseMetricsFromText(text: string): ParsedMetrics {
    const metrics: ParsedMetrics = {};

    // Parse pain - look for patterns like "pain 2/10", "pain 2", "pain level 2"
    const painMatch = text.match(/pain\s+(?:level\s+)?(\d+)\s*(?:\/\s*10)?/i);
    if (painMatch) {
        metrics.pain = parseInt(painMatch[1]);
    }

    // Parse meds - look for patterns like "3/4", "3 of 4", "3 meds", "took 3 meds"
    const medsMatch = text.match(/(?:meds?|medications?)\s*(?:(?:took|taken|completed|confirmed)\s+)?(\d+)\s*(?:\/\s*)?(\d+)?/i);
    if (medsMatch) {
        metrics.meds = parseInt(medsMatch[1]);
    }

    return metrics;
}

export function saveMetricsToStorage(personId: string, metrics: ParsedMetrics): void {
    const storageKey = `metrics_${personId}`;
    const current = JSON.parse(localStorage.getItem(storageKey) || '{}');
    const updated = { ...current, ...metrics, updatedAt: new Date().toISOString() };
    localStorage.setItem(storageKey, JSON.stringify(updated));

    // Dispatch custom event for same-tab updates
    window.dispatchEvent(new CustomEvent('metricsUpdated', { detail: { personId, metrics: updated } }));
}

export function getMetricsFromStorage(personId: string): ParsedMetrics | null {
    const storageKey = `metrics_${personId}`;
    const data = localStorage.getItem(storageKey);
    return data ? JSON.parse(data) : null;
}

export function clearMetricsFromStorage(personId: string): void {
    const storageKey = `metrics_${personId}`;
    localStorage.removeItem(storageKey);
}
