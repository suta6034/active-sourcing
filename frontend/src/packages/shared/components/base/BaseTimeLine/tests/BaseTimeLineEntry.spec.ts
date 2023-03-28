import { mount } from '@vue/test-utils';

import {
    expect,
    it,
    describe,
    type GenericWrapper,
} from '../../../../../../../tests/drivers/vitest/utils';

import BaseTimeLineEntry from '../BaseTimeLineEntry.vue';

import type { TimeLineEntry } from '../types';

describe('empty time line entry', () => {
    it('should not render anything', () => {
        const wrapper = mount(BaseTimeLineEntry, {
            props: {},
        });
        expect(wrapper.find('.BaseTimeLineEntry').exists()).toBe(false);
    });
    it('should render an empty time line entry', () => {
        const wrapper = mount(BaseTimeLineEntry, {
            props: {
                entry: { id: 1 } as TimeLineEntry,
            },
        });
        const entry = wrapper.find('.BaseTimeLineEntry');
        expect(entry.exists()).toBe(true);
        expect(entry.find('.timeLineEntryDateHeading').exists()).toBe(false);
        expect(entry.find('.timeLineEntryTitle').exists()).toBe(false);
        expect(entry.find('.timeLineEntrySubTitleText').exists()).toBe(false);
        expect(entry.find('.timeLineEntryDescription').exists()).toBe(false);
        expect(entry.find('.timeLineEntryMoreButton').exists()).toBe(false);
    });
});
describe('show more button in time line entry', () => {
    it('should not render a description with the button to show details', async () => {
        const wrapper = mount(BaseTimeLineEntry, {
            props: {
                entry: {
                    id: 1,
                    dateHeading: 'Date Heading',
                    title: 'Title',
                    subTitle: 'Subtitle',
                    description: undefined,
                },
            },
        });
        const entry = wrapper.find('.BaseTimeLineEntry');
        expect(entry.exists()).toBe(true);
        const description = entry.find('.timeLineEntryDescription');
        expect(description.exists()).toBe(false);
        expect(entry.find('.timeLineEntryShowDetails').exists()).toBe(false);
    });
    it('should render a description with the button to show details', async () => {
        const wrapper = mount(BaseTimeLineEntry, {
            props: {
                entry: {
                    id: 1,
                    dateHeading: 'Date Heading',
                    title: 'Title',
                    subTitle: 'Subtitle',
                    description: 'Description',
                },
            },
        });
        const entry = wrapper.find('.BaseTimeLineEntry');
        expect(entry.exists()).toBe(true);
        let description = entry.find('.timeLineEntryDescription');
        expect(description.exists()).toBe(false);
        const showMoreButton = entry.find('.timeLineEntryShowDetails');
        expect(showMoreButton.exists()).toBe(true);
        expect(showMoreButton.text()).toStrictEqual('Details anzeigen…');
        await showMoreButton.trigger('click');
        description = entry.find('.timeLineEntryDescription');
        expect(description.exists()).toBe(true);
        expect(description.text()).toStrictEqual('Description');
        expect(showMoreButton.text()).toStrictEqual('Details ausblenden…');
    });
});
describe('subTitle is wrapped by anchor tag', () => {
    it('should be an anchor tag which has a href attribute with http protocol', async () => {
        const wrapper: GenericWrapper<Partial<{
            linkWithProtocol: (url: string) => string,
        }>> = mount(BaseTimeLineEntry, {
            props: {
                entry: {
                    id: 1,
                    dateHeading: 'Date Heading',
                    title: 'Title',
                    subTitle: {
                        value: 'www.test.test',
                        hidden: false,
                    },
                    description: 'Description',
                },
            },
        });
        const entry = wrapper.find('.BaseTimeLineEntry');
        expect(entry.exists()).toBe(true);
        const timeLineEntrySubTitleLink = entry.find('.timeLineEntrySubTitleLink');
        expect(timeLineEntrySubTitleLink.exists()).toBe(true);
        expect(timeLineEntrySubTitleLink.text()).toStrictEqual('www.test.test');
        expect(timeLineEntrySubTitleLink.element.getAttribute('href')).toStrictEqual('http://www.test.test');

        // Check any expected link to be formatted properly
        const expectedLinksMap = [
            { givenLink: 'karriere.at', withProtocol: 'http://karriere.at' },
            { givenLink: 'www.karriere.at', withProtocol: 'http://www.karriere.at' },
            { givenLink: 'https://karriere.at', withProtocol: 'https://karriere.at' },
            { givenLink: 'http://karriere.at', withProtocol: 'http://karriere.at' },
            { givenLink: 'random', withProtocol: 'http://random' },
        ];
        expectedLinksMap.forEach(({ givenLink, withProtocol }) => {
            expect(wrapper.vm.linkWithProtocol?.(givenLink)).toStrictEqual(withProtocol);
        });
    });
});
