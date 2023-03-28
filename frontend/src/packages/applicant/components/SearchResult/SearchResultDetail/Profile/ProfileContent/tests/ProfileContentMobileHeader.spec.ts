import { mount } from '@vue/test-utils';
import {
    describe,
    expect, it,
} from '../../../../../../../../../tests/drivers/vitest/utils';
import ProfileContentMobileHeader from '../ProfileContentMobileHeader.vue';

describe('ProfileContentMobileHeader', () => {
    it('should render the mobile header and emit an event on click', async () => {
        const wrapper = mount(ProfileContentMobileHeader, {
            props: {
                title: 'TITLE',
            },
        });
        const container = wrapper.find('.ProfileContentMobileHeader');
        expect(container.exists()).toBe(true);
        const title = container.find('.Title');
        expect(title.exists()).toBe(true);
        expect(title.text()).toStrictEqual('TITLE');
        const arrow = container.find('.ArrowIcon');
        expect(arrow.exists()).toBe(true);
        expect(arrow.element.classList.contains('rotate-90')).toBe(true);
        await container.trigger('click');
        expect(wrapper.emitted().click.length).toBe(1);
    });
});
