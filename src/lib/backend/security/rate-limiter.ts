const buckets = new Map<string, { count: number; expiresAt: number }>();

export class RateLimiter {
    /**
     * Checks if the identifier has exceeded the limit. Returns TRUE if allowed.
     */
    static check(identifier: string, limit: number, windowMs: number): boolean {
        const now = Date.now();
        const record = buckets.get(identifier);

        if (!record || record.expiresAt < now) {
            // Bucket reset or initialization
            buckets.set(identifier, { count: 1, expiresAt: now + windowMs });
            return true;
        }

        if (record.count >= limit) {
            return false; // Rate limit exceeded natively
        }

        record.count += 1;
        buckets.set(identifier, record);
        return true;
    }

    /**
     * Cleanup interval mapping for memory optimization avoiding OOM on Map objects structurally.
     */
    static cleanup() {
        const now = Date.now();
        for (const [key, record] of buckets.entries()) {
            if (record.expiresAt < now) {
                buckets.delete(key);
            }
        }
    }
}

// Cleanup interval (runs dynamically if server stays up)
if (typeof setInterval !== 'undefined') {
    const timer = setInterval(() => RateLimiter.cleanup(), 60000);
    if (timer && typeof timer.unref === 'function') {
        timer.unref();
    }
}
