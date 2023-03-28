import { shallowRef } from 'vue';

export const BaseFunctions = {
    getScrollContainer: (node?: HTMLElement | null): null | HTMLElement => {
        if (node != null && node instanceof HTMLElement) {
            const { overflow } = getComputedStyle(node);
            if (node.scrollHeight > node.clientHeight && (overflow === 'auto' || overflow === 'scroll')) {
                return node;
            }
            return BaseFunctions.getScrollContainer(node.parentNode as HTMLElement | null);
        }
        return null;
    },
    getIcon: async (iconName: string): Promise<null> => {
        const icon = shallowRef(null);
        // eslint-disable-next-line no-unsanitized/method
        await import(`../../assets/icons/${iconName}Icon.vue`).then((res) => {
            icon.value = res.default;
        });
        return icon.value;
    },
};
