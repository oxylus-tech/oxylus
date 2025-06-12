import { computed, ref } from 'vue';
import { User, Model } from '../models';
/**
 * Create a new action, returning:
 * - processing: ref to boolean indicating wether the action is processing
 * - allowed: computed ref indicating wether the action is allowed
 * - run: async function to call in order to run the method
 */
export function useAction({ props, user, emits = null }) {
    const processing = ref(false);
    const allowed = computed(() => !props.permission || user.can(props.permission, props.item));
    /** Execute the action. */
    const run = async (...args) => {
        if (props.confirm && !confirm(props.confirm))
            return;
        if (props.href)
            return window.open(props.href, '_blank');
        processing.value = true;
        let result = props.run(user, props.item, ...args);
        if (result instanceof Promise)
            result = await result;
        processing.value = false;
        if (emits)
            emits('completed', props.item, ...args);
        return result;
    };
    return { processing, run, allowed };
}
