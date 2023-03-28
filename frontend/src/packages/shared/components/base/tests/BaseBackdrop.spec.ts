import { flushPromises, mount } from '@vue/test-utils';
import {
    expect,
    it,
    describe,
} from '../../../../../../tests/drivers/vitest/utils';
import BaseBackdrop from '../BaseBackdrop.vue';

describe('BaseBackdrop', () => {
    it('should show the backdrop as soon as the property "showBackdrop" is set to true', async () => {
        const wrapper = mount(BaseBackdrop, {
            props: {
                showBackdrop: false,
                isPartial: false,
            },
        });
        let backdrop = wrapper.find('.BaseBackdrop');
        expect(backdrop.exists()).toBe(false);
        wrapper.setProps({
            showBackdrop: true,
        });
        await flushPromises();
        backdrop = wrapper.find('.BaseBackdrop');
        expect(backdrop.exists()).toBe(true);
    });
    it('should show the backdrop and close it on click', async () => {
        const wrapper = mount(BaseBackdrop, {
            props: {
                showBackdrop: true,
                isPartial: false,
            },
        });
        let backdrop = wrapper.find('.BaseBackdrop');
        expect(backdrop.exists()).toBe(true);
        await backdrop.trigger('click');
        await flushPromises();
        backdrop = wrapper.find('.BaseBackdrop');
        expect(backdrop.exists()).toBe(false);
        expect(!!wrapper.emitted().activateBackdrop.length).toBe(true);
        expect(wrapper.emitted().activateBackdrop[0]).toStrictEqual([false]);
    });
});
