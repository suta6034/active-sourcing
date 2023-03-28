import { mount } from '@vue/test-utils';
import {
    expect,
    it,
    describe,
} from '../../../../../../tests/drivers/vitest/utils';

import BaseFormMultiSelect from '../BaseFormMultiSelect.vue';

const testLabels = {
    name: 'testLabels',
    items: [
        { id: 1, label: 'Entry 1' },
        { id: 2, label: 'Entry 2' },
        { id: 3, label: 'Entry 3' },
        { id: 4, label: 'Entry 4' },
        { id: 5, label: 'Entry 5' },
    ],
};

describe('BaseFormMultiSelect', () => {
    it('should render a list with given entries when opening a dropdown', async () => {
        const wrapper = mount(BaseFormMultiSelect, {
            props: {
                entries: [],
                labels: testLabels,
            },
        });
        const button = wrapper.find('.BaseFormMultiSelectButton');

        expect(button.exists()).toBe(true);
        expect(button.text()).toStrictEqual('');

        await button.trigger('click');
        const listEntries = wrapper.findAll('ul li');

        expect(listEntries.length).toBe(5);

        for (let idx = 0; idx < listEntries.length; idx += 1) {
            expect(listEntries[idx].text()).toStrictEqual(`Entry ${idx + 1}`);
        }
    });
    it('should jump to the first list item when pressing tab on the button'
    + 'and close dropdown by pressing Esc', async () => {
        const wrapper = mount(BaseFormMultiSelect, {
            attachTo: document.body,
            props: {
                entries: [],
                labels: testLabels,
            },
        });
        const button = wrapper.find('.BaseFormMultiSelectButton');

        expect(button.exists()).toBe(true);

        let list = wrapper.find('ul');

        expect(list.exists()).toBe(false);

        await button.trigger('click');
        list = wrapper.find('ul');

        expect(list.exists()).toBe(true);
        expect(document.activeElement).toBe(document.body);

        await button.trigger('keydown', {
            key: 'Tab',
        });

        const firstListElem = list.findAll('li')[0];
        const innerContainerOfFirstListElem = firstListElem.element.firstElementChild;

        expect(innerContainerOfFirstListElem?.classList.contains('focus-within:bg-gray-200')).toBe(true);

        await firstListElem.trigger('keydown', {
            key: 'Escape',
        });
        list = wrapper.find('ul');

        expect(list.exists()).toBe(false);

        wrapper.unmount();
    });
});
