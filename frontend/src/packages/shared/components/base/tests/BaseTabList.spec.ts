import { flushPromises, mount } from '@vue/test-utils';
import {
    expect,
    it,
    describe,
} from '../../../../../../tests/drivers/vitest/utils';
import BaseTabList from '../BaseTabList.vue';

const tabs = [
    {
        label: 'Label 1',
        id: 1,
        active: false,
        disabled: false,
    },
    {
        label: 'Label 2',
        id: 2,
        active: true,
        disabled: false,
    },
    {
        label: 'Label 3',
        id: 3,
        active: false,
        disabled: true,
    },
    {
        label: 'Label 4',
        id: 4,
        active: false,
        disabled: false,
    },
];

describe('BaseTabList', () => {
    it('should render an empty tab list', async () => {
        const wrapper = mount(BaseTabList, {
            props: {},
        });
        await flushPromises();
        const tabList = wrapper.find('.BaseTabList');
        expect(tabList.exists()).toBe(false);
        const tabListEntries = wrapper.findAll('.BaseTabListEntry');
        expect(tabListEntries.length).toBe(0);
    });
    it('should render the tab list and handle clicking on the tabs', async () => {
        const wrapper = mount(BaseTabList, {
            props: {
                tabs,
            },
        });
        await flushPromises();
        const tabList = wrapper.find('.BaseTabList');
        expect(tabList.exists()).toBe(true);
        const tabListEntries = wrapper.findAll('.BaseTabListEntry');
        expect(tabListEntries.length).toBe(4);

        // check if active and disabled tab list entries are correct
        expect(tabListEntries[1].element.classList.contains('Active')).toBe(true);
        expect(tabListEntries[3].element.classList.contains('Inactive')).toBe(true);

        // click on first tab list entry and then check if active and disabled entries
        // are still set correctly
        await tabListEntries[0].trigger('click');
        expect(tabListEntries[0].element.classList.contains('Active')).toBe(true);
        expect(tabListEntries[1].element.classList.contains('Active')).toBe(false);
        expect(tabListEntries[3].element.classList.contains('Inactive')).toBe(true);

        // click on inactivated entry - the target should get activated
        await tabListEntries[3].trigger('click');
        expect(tabListEntries[3].element.classList.contains('Active')).toBe(true);
        expect(tabListEntries[0].element.classList.contains('Active')).toBe(false);

        // click on disabled entry[2] - nothing should happen
        // keep entry[3] active
        await tabListEntries[2].trigger('click');
        expect(tabListEntries[2].element.classList.contains('Disabled')).toBe(true);
        expect(tabListEntries[3].element.classList.contains('Active')).toBe(true);

        // check if labels of the tab list entries are correct
        expect(tabListEntries[0].text()).toStrictEqual('Label 1');
        expect(tabListEntries[1].text()).toStrictEqual('Label 2');
        expect(tabListEntries[2].text()).toStrictEqual('Label 3');
        expect(tabListEntries[3].text()).toStrictEqual('Label 4');
    });
});
