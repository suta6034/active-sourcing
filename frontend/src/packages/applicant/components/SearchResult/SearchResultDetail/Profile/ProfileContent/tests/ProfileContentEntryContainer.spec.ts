import { mount } from '@vue/test-utils';
import {
    describe,
    expect, it,
} from '../../../../../../../../../tests/drivers/vitest/utils';
import ProfileContentEntryContainer from '../ProfileContentEntryContainer.vue';

describe('ProfileContentEntryContainer', () => {
    it('should not render the content in a modal', () => {
        const wrapper = mount(ProfileContentEntryContainer, {
            props: {
                showInModal: false,
                title: 'TITLE',
            },
            slots: {
                default: '<span class="unitTestContent">CONTENT</span>',
            },
        });
        expect(wrapper.find('.ProfileContentEntryContainerModal').exists()).toBe(false);
        expect(wrapper.find('.unitTestContent').exists()).toBe(true);
        expect(wrapper.text()).toStrictEqual('CONTENT');
    });
    it('should render the content inside a modal', async () => {
        const stubs = {
            BaseModal: {
                template: '<div class="BaseModal"><slot/></div>',
            },
        };
        const wrapper = mount(ProfileContentEntryContainer, {
            props: {
                showInModal: true,
                title: 'TITLE',
            },
            slots: {
                default: '<span class="unitTestContent">CONTENT</span>',
            },
            global: {
                stubs,
            },
        });
        const container = wrapper.find('.ProfileContentEntryContainerModal');
        expect(container.exists()).toBe(true);
        const header = container.find('.Header');
        expect(header.exists()).toBe(true);
        expect(header.text()).toStrictEqual('TITLE');
        const closeButton = header.find('.CloseButton');
        expect(closeButton.exists()).toBe(true);
        await closeButton.trigger('click');
        expect(wrapper.emitted().close.length).toBe(1);
    });
});
