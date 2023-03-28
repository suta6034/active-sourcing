import { mount } from '@vue/test-utils';
import {
    expect,
    it,
    describe,
} from '../../../../../../tests/drivers/vitest/utils';
import BaseFormSingleSelect from '../BaseFormSingleSelect.vue';

const testEntries = [
    { id: 1, label: 'Entry 1' },
    { id: 2, label: 'Entry 2' },
    { id: 3, label: 'Entry 3' },
    { id: 4, label: 'Entry 4' },
    { id: 5, label: 'Entry 5' },
];

describe('BaseFormSingleSelect', () => {
    it('should not render a list, when no entries are set', async () => {
        const wrapper = mount(BaseFormSingleSelect, {
            props: {
                label: 'LABEL',
                formLabel: 'FORMLABEL',
            },
        });
        const button = wrapper.find('.BaseFormSingleSelectButton');
        const formLabel = wrapper.find('.BaseFormLabel');
        expect(button.exists()).toBe(true);
        expect(button.text()).toStrictEqual('LABEL');
        expect(formLabel.exists()).toBe(true);
        expect(formLabel.text()).toStrictEqual('FORMLABEL');
        await button.trigger('click');
        const list = wrapper.find('ul');
        expect(list.exists()).toBe(false);
    });
    it('should render a list with given entries when opening a dropdown', async () => {
        const wrapper = mount(BaseFormSingleSelect, {
            props: {
                entries: testEntries,
            },
        });
        const button = wrapper.find('.BaseFormSingleSelectButton');
        expect(button.exists()).toBe(true);
        expect(button.text()).toStrictEqual('');
        await button.trigger('click');
        const listEntries = wrapper.findAll('ul li');
        expect(listEntries.length).toBe(5);
        for (let idx = 0; idx < listEntries.length; idx += 1) {
            expect(listEntries[idx].text()).toStrictEqual(`Entry ${idx + 1}`);
        }
    });
    it('should jump to the first list item when pressing arrow down on the button', async () => {
        const wrapper = mount(BaseFormSingleSelect, {
            attachTo: document.body,
            props: {
                entries: testEntries,
            },
        });
        const button = wrapper.find('.BaseFormSingleSelectButton');
        expect(button.exists()).toBe(true);
        let list = wrapper.find('ul');
        expect(list.exists()).toBe(false);
        await button.trigger('click');
        list = wrapper.find('ul');
        expect(list.exists()).toBe(true);
        expect(document.activeElement).toBe(document.body);
        await button.trigger('keydown', {
            key: 'ArrowDown',
        });
        const firstListElem = list.findAll('li')[0];
        expect(document.activeElement).toBe(firstListElem.element);
        expect(firstListElem.element.tabIndex).toBe(0);
        await firstListElem.trigger('keydown', {
            key: 'Escape',
        });
        list = wrapper.find('ul');
        expect(list.exists()).toBe(false);
        wrapper.unmount();
    });
    it('should be able to navigate through the dropdown list by using the keyboard', async () => {
        const wrapper = mount(BaseFormSingleSelect, {
            attachTo: document.body,
            props: {
                entries: testEntries,
            },
        });
        const button = wrapper.find('.BaseFormSingleSelectButton');
        expect(button.exists()).toBe(true);
        let list = wrapper.find('ul');
        expect(list.exists()).toBe(false);
        await button.trigger('click');
        list = wrapper.find('ul');
        expect(list.exists()).toBe(true);
        const listEntries = list.findAll('li');
        expect(listEntries.length).toBe(5);
        await button.trigger('keydown', {
            key: 'ArrowDown',
        });
        expect(listEntries[0].element.tabIndex).toBe(0);
        await listEntries[0].trigger('keydown', {
            key: 'ArrowDown',
        });
        expect(listEntries[1].element.tabIndex).toBe(0);
        expect(listEntries[0].element.tabIndex).toBe(-1);
        await listEntries[1].trigger('keydown', {
            key: 'ArrowUp',
        });
        expect(listEntries[0].element.tabIndex).toBe(0);
        expect(listEntries[1].element.tabIndex).toBe(-1);
        await listEntries[0].trigger('keydown', {
            key: 'End',
        });
        expect(listEntries[4].element.tabIndex).toBe(0);
        expect(listEntries[0].element.tabIndex).toBe(-1);
        await listEntries[4].trigger('keydown', {
            key: 'Home',
        });
        expect(listEntries[0].element.tabIndex).toBe(0);
        expect(listEntries[4].element.tabIndex).toBe(-1);
    });
});
