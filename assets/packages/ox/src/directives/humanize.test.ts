// tests/directives/humanize.spec.ts
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { vNaturalTime, vNaturalDay } from './humanize'
import { defineComponent, h } from 'vue'

describe('v-natural-time directive', () => {
    it('renders relative time text', () => {
        const now = new Date()
        const wrapper = mount(
            defineComponent({
                directives: { naturalTime: vNaturalTime },
                template: `<span v-natural-time="time" />`,
                data: () => ({ time: now }),
            })
        )
        const text = wrapper.text()
        expect(text).toMatch(/second|minute|hour|day/i)
    })
})

describe('v-natural-day directive', () => {
    it('renders natural day text', () => {
        const today = new Date()
        const wrapper = mount(
            defineComponent({
                directives: { naturalDay: vNaturalDay },
                template: `<span v-natural-day="day" />`,
                data: () => ({ day: today }),
            })
        )
        const text = wrapper.text()
        expect(text).toMatch(/today|yesterday|tomorrow|Jan|Feb/i)
    })
})
