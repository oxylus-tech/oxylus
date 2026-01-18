import { computed } from 'vue'
import { i18n } from './i18n'

/**
 * Public API returned by useHumanize
 */
export interface UseHumanize {
    /**
     * Returns a humanized day representation:
     * - today / yesterday / tomorrow
     * - or a localized date string
     */
    naturalDay(value: Date | string | number): string

    /**
     * Returns a humanized relative time representation:
     * - "3 minutes ago"
     * - "in 2 hours"
     */
    naturalTime(value: Date | string | number): string
}

const DAY_MS = 24 * 60 * 60 * 1000

/**
 * Return functions used to humanize dates and datetimes as human readable
 * function (using `Intl` methods).
 */
export function useHumanize(): UseHumanize {
    const locale = i18n.global.locale

    const rtf = computed(() =>
        new Intl.RelativeTimeFormat(locale.value, { numeric: 'auto' })
    )

    const dateFormatter = computed(() =>
        new Intl.DateTimeFormat(locale.value, { dateStyle: 'medium' })
    )

    function naturalDay(value: Date | string | number): string {
        const date = new Date(value)
        const today = new Date()

        const diffDays = Math.floor(
            (date.setHours(0, 0, 0, 0) - today.setHours(0, 0, 0, 0)) / DAY_MS
        )

        if (Math.abs(diffDays) <= 1) {
            return rtf.value.format(diffDays, 'day')
        }

        return dateFormatter.value.format(date)
    }

    function naturalTime(value: Date | string | number): string {
        const date = new Date(value)
        const now = Date.now()
        const diffSeconds = Math.round((date.getTime() - now) / 1000)
        const abs = Math.abs(diffSeconds)

        if (abs < 60) {
            return rtf.value.format(diffSeconds, 'second')
        }

        if (abs < 3600) {
            return rtf.value.format(Math.round(diffSeconds / 60), 'minute')
        }

        if (abs < 86400) {
            return rtf.value.format(Math.round(diffSeconds / 3600), 'hour')
        }

        return rtf.value.format(Math.round(diffSeconds / 86400), 'day')
    }

    return {
        naturalDay,
        naturalTime,
    }
}
