// tests/useHumanize.spec.ts
import { describe, it, expect, vi } from 'vitest'
import { useI18n } from 'vue-i18n'
import { useHumanize } from './humanize'

vi.mock('vue-i18n', () => ({
    useI18n: () => ({ locale: { value: 'en' }, fallbackLocale: { value: 'en' } }),
}))

describe('useHumanize', () => {
    const { naturalDay, naturalTime } = useHumanize()

    it('naturalDay returns today for current date', () => {
        const today = new Date()
        expect(naturalDay(today)).toMatch(/today|Today/i)
    })

    it('naturalDay returns yesterday for previous date', () => {
        const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000)
        expect(naturalDay(yesterday)).toMatch(/yesterday|Yesterday/i)
    })

    it('naturalTime returns seconds ago for recent date', () => {
        const past = new Date(Date.now() - 5 * 1000)
        const result = naturalTime(past)
        expect(result).toMatch(/second/i)
    })

    it('naturalTime returns minutes ago for 5 minutes ago', () => {
        const past = new Date(Date.now() - 5 * 60 * 1000)
        expect(naturalTime(past)).toMatch(/minute/i)
    })

    it('naturalTime returns hours ago for 3 hours ago', () => {
        const past = new Date(Date.now() - 3 * 60 * 60 * 1000)
        expect(naturalTime(past)).toMatch(/hour/i)
    })

    it('naturalTime returns days ago for 2 days ago', () => {
        const past = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
        expect(naturalTime(past)).toMatch(/day/i)
    })
})
