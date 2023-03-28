import { flushPromises, mount } from '@vue/test-utils';
import { allFiltersLabels } from '../../../../../../repositories/filter-repository';
import {
    describe,
    expect, it,
} from '../../../../../../../../../tests/drivers/vitest/utils';
import ProfileContentTimeLine from '../ProfileContentTimeLine.vue';
import type { QuickViewTimeLineEntry } from '../../../../../../../shared/types/profile/types';

allFiltersLabels.value = [
    {
        name: 'jobFields',
        items: [
            {
                id: 3085,
                label: 'Assistenz, Verwaltung',
            },
            {
                id: 3090,
                label: 'Beratung, Consulting',
            },
        ],
    },
    {
        name: 'experienceTypes',
        items: [
            {
                id: 2,
                label: 'Elternzeit',
            },
        ],
    },
];

describe.each([[undefined], [[]]])('empty ProfileContentTimeLine view', (entries) => {
    it(`should render an empty ProfileContentTimeLine view when entries is set with '${entries}'`, () => {
        const wrapper = mount(ProfileContentTimeLine, {
            props: {
                entries,
                timeLineTitle: 'Berufserfahrung',
            },
        });
        const baseTimeLine = wrapper.find('.BaseTimeLine');
        expect(baseTimeLine.exists()).toBe(true);
        const baseTimeLineEntries = wrapper.findAll('.BaseTimeLineEntry');
        expect(baseTimeLineEntries.length).toBe(0);
    });
});
it('should render a ProfileContentTimeLine view with other experience type data', async () => {
    const entries = [{
        id: 1,
        title: 'Test Entry',
        institution: 'Test Institution',
        description: null,
        jobFieldId: null,
        experienceMonths: 10,
        experienceTypeId: 2,
        start: '2022-01-01T00:00:00+01:00',
        end: null,
    }];
    const wrapper = mount(ProfileContentTimeLine, {
        props: {
            entries,
            timeLineTitle: 'Berufserfahrung',
        },
    });
    await flushPromises();
    const timeLineEntries = wrapper.findAll('.BaseTimeLineEntry');
    expect(timeLineEntries.length).toBe(1);
    const entry = timeLineEntries[0];
    expect(entry.exists()).toBe(true);

    const dateHeading = entry.find('.timeLineEntryDateHeading');
    expect(dateHeading.exists()).toBe(true);
    expect(dateHeading.text()).toStrictEqual('seit 01/2022 • 10 Monate');

    const title = entry.find('.timeLineEntryTitle');
    expect(title.exists()).toBe(true);
    expect(title.text()).toStrictEqual('Test Entry');

    const subTitle = entry.find('.timeLineEntrySubTitleText');
    expect(subTitle.exists()).toBe(true);
    expect(subTitle.text()).toStrictEqual('Elternzeit, Test Institution');

    const description = entry.find('.timeLineEntryDescription');
    expect(description.exists()).toBe(false);

    const moreButton = entry.find('.timeLineEntrymoreButton');
    expect(moreButton.exists()).toBe(false);
});
it('should render a ProfileContentTimeLine view with one entry without description and no end set', async () => {
    const entries = [{
        id: 1,
        title: 'Test Entry',
        description: null,
        jobFieldId: 3085,
        experienceMonths: 10,
        start: '2016-03-01T00:00:00+01:00',
        end: null,
    }];
    const wrapper = mount(ProfileContentTimeLine, {
        props: {
            entries,
            timeLineTitle: 'Berufserfahrung',
        },
    });
    await flushPromises();
    const timeLineEntries = wrapper.findAll('.BaseTimeLineEntry');
    expect(timeLineEntries.length).toBe(1);
    const entry = timeLineEntries[0];
    expect(entry.exists()).toBe(true);

    const dateHeading = entry.find('.timeLineEntryDateHeading');
    expect(dateHeading.exists()).toBe(true);
    expect(dateHeading.text()).toStrictEqual('seit 03/2016 • 10 Monate');

    const title = entry.find('.timeLineEntryTitle');
    expect(title.exists()).toBe(true);
    expect(title.text()).toStrictEqual('Test Entry');

    const subTitle = entry.find('.timeLineEntrySubTitleText');
    expect(subTitle.exists()).toBe(true);
    expect(subTitle.text()).toStrictEqual('Assistenz, Verwaltung');

    const description = entry.find('.timeLineEntryDescription');
    expect(description.exists()).toBe(false);

    const moreButton = entry.find('.timeLineEntrymoreButton');
    expect(moreButton.exists()).toBe(false);
});
it(
    'should render a ProfileContentTimeLine view with one entry without description and experienceMonths is not shown',
    async () => {
        const entries = [{
            id: 1,
            title: 'Test Entry',
            description: null,
            jobFieldId: 3085,
            start: '2016-03-01T00:00:00+01:00',
            end: null,
        }];
        const wrapper = mount(ProfileContentTimeLine, {
            props: {
                entries,
                timeLineTitle: 'Berufserfahrung',
            },
        });
        await flushPromises();
        const entry = wrapper.find('.BaseTimeLineEntry');
        expect(entry.exists()).toBe(true);

        const description = entry.find('.timeLineEntryDescription');
        expect(description.exists()).toBe(false);

        const dateHeading = entry.find('.timeLineEntryDateHeading');
        expect(dateHeading.exists()).toBe(true);
        expect(dateHeading.text()).toStrictEqual('seit 03/2016');
    },
);
it(
    'should render a ProfileContentTimeLine view with one entry without description and experienceMonths is 0',
    async () => {
        const entries = [{
            id: 1,
            title: 'Test Entry',
            description: null,
            jobFieldId: 3085,
            experienceMonths: 0,
            start: '2016-03-01T00:00:00+01:00',
            end: null,
        }];
        const wrapper = mount(ProfileContentTimeLine, {
            props: {
                entries,
                timeLineTitle: 'Berufserfahrung',
            },
        });
        await flushPromises();
        const entry = wrapper.find('.BaseTimeLineEntry');
        expect(entry.exists()).toBe(true);

        const description = entry.find('.timeLineEntryDescription');
        expect(description.exists()).toBe(false);

        const dateHeading = entry.find('.timeLineEntryDateHeading');
        expect(dateHeading.exists()).toBe(true);
        expect(dateHeading.text()).toStrictEqual('seit 03/2016 • 0 Monate');
    },
);
it(
    'should render a ProfileContentTimeLine view with one entry where end is also set and experienceMonths is 1',
    async () => {
        const entries = [{
            id: 1,
            title: 'Test Entry',
            description: null,
            jobFieldId: 3085,
            experienceMonths: 1,
            start: '2016-03-01T00:00:00+01:00',
            end: '2021-02-01T01:00:00+01:00',
        }];
        const wrapper = mount(ProfileContentTimeLine, {
            props: {
                entries,
                timeLineTitle: 'Berufserfahrung',
            },
        });
        await flushPromises();
        const entry = wrapper.find('.BaseTimeLineEntry');
        expect(entry.exists()).toBe(true);

        const description = entry.find('.timeLineEntryDescription');
        expect(description.exists()).toBe(false);

        const dateHeading = entry.find('.timeLineEntryDateHeading');
        expect(dateHeading.exists()).toBe(true);
        expect(dateHeading.text()).toStrictEqual('03/2016 bis 02/2021 • 1 Monat');
    },
);
it('should render a ProfileContentTimeLine view with one entry where experienceMonths is 12', async () => {
    const entries = [{
        id: 1,
        title: 'Test Entry',
        description: null,
        jobFieldId: 3085,
        experienceMonths: 12,
        start: '2016-03-01T00:00:00+01:00',
        end: '2021-02-01T01:00:00+01:00',
    }];
    const wrapper = mount(ProfileContentTimeLine, {
        props: {
            entries,
            timeLineTitle: 'Berufserfahrung',
        },
    });
    await flushPromises();
    const entry = wrapper.find('.BaseTimeLineEntry');
    expect(entry.exists()).toBe(true);

    const description = entry.find('.timeLineEntryDescription');
    expect(description.exists()).toBe(false);

    const dateHeading = entry.find('.timeLineEntryDateHeading');
    expect(dateHeading.exists()).toBe(true);
    expect(dateHeading.text()).toStrictEqual('03/2016 bis 02/2021 • 1 Jahr');
});
it('should render a ProfileContentTimeLine view with one entry where experienceMonths is 42', async () => {
    const entries = [{
        id: 1,
        title: 'Test Entry',
        description: null,
        jobFieldId: 3085,
        experienceMonths: 42,
        start: '2016-03-01T00:00:00+01:00',
        end: '2021-02-01T01:00:00+01:00',
    }];
    const wrapper = mount(ProfileContentTimeLine, {
        props: {
            entries,
            timeLineTitle: 'Berufserfahrung',
        },
    });
    await flushPromises();
    const entry = wrapper.find('.BaseTimeLineEntry');
    expect(entry.exists()).toBe(true);

    const description = entry.find('.timeLineEntryDescription');
    expect(description.exists()).toBe(false);

    const dateHeading = entry.find('.timeLineEntryDateHeading');
    expect(dateHeading.exists()).toBe(true);
    expect(dateHeading.text()).toStrictEqual('03/2016 bis 02/2021 • 3 Jahre 6 Monate');
});
it('should render a ProfileContentTimeLine view with one entry where experienceMonths is 13', async () => {
    const entries = [{
        id: 1,
        title: 'Test Entry',
        description: null,
        jobFieldId: 3085,
        experienceMonths: 13,
        start: '2016-03-01T00:00:00+01:00',
        end: '2021-02-01T01:00:00+01:00',
    }];
    const wrapper = mount(ProfileContentTimeLine, {
        props: {
            entries,
            timeLineTitle: 'Berufserfahrung',
        },
    });
    await flushPromises();
    const entry = wrapper.find('.BaseTimeLineEntry');
    expect(entry.exists()).toBe(true);

    const description = entry.find('.timeLineEntryDescription');
    expect(description.exists()).toBe(false);

    const dateHeading = entry.find('.timeLineEntryDateHeading');
    expect(dateHeading.exists()).toBe(true);
    expect(dateHeading.text()).toStrictEqual('03/2016 bis 02/2021 • 1 Jahr 1 Monat');
});
it('should render a ProfileContentTimeLine view with one entry where has only a fixed year', async () => {
    const entries: Array<QuickViewTimeLineEntry> = [{
        id: 1,
        title: 'Test Entry',
        description: null,
        year: '2017',
    }];
    const wrapper = mount(ProfileContentTimeLine, {
        props: {
            entries,
            timeLineTitle: 'Award',
        },
    });
    await flushPromises();
    const entry = wrapper.find('.BaseTimeLineEntry');
    expect(entry.exists()).toBe(true);

    const description = entry.find('.timeLineEntryDescription');
    expect(description.exists()).toBe(false);

    const dateHeading = entry.find('.timeLineEntryDateHeading');
    expect(dateHeading.exists()).toBe(true);
    expect(dateHeading.text()).toStrictEqual('2017');
});
it('should render a ProfileContentTimeLine view with one entry where sub title is hidden', async () => {
    const entries: Array<QuickViewTimeLineEntry> = [{
        id: 1,
        title: 'Test Entry',
        description: null,
        year: '2017',
        url: {
            value: 'test/url',
            hidden: true,
        },
    }];
    const wrapper = mount(ProfileContentTimeLine, {
        props: {
            entries,
            timeLineTitle: 'Project',
        },
    });
    await flushPromises();
    const entry = wrapper.find('.BaseTimeLineEntry');
    expect(entry.exists()).toBe(true);

    const hiddenSubTitle = entry.find('.timeLineEntrySubTitleLinkHidden');
    expect(hiddenSubTitle.exists()).toBe(true);
    expect(hiddenSubTitle.text()).toStrictEqual('Link verdeckt');
});
it('should render a ProfileContentTimeLine view with one entry where sub title is not hidden', async () => {
    const entries: Array<QuickViewTimeLineEntry> = [{
        id: 1,
        title: 'Test Entry',
        description: null,
        year: '2017',
        url: {
            value: 'test/url',
            hidden: false,
        },
    }];
    const wrapper = mount(ProfileContentTimeLine, {
        props: {
            entries,
            timeLineTitle: 'Project',
        },
    });
    await flushPromises();
    const entry = wrapper.find('.BaseTimeLineEntry');
    expect(entry.exists()).toBe(true);

    const hiddenSubTitle = entry.find('.timeLineEntrySubTitleLinkHidden');
    expect(hiddenSubTitle.exists()).toBe(false);

    const subTitle = entry.find('.timeLineEntrySubTitleLink');
    expect(subTitle.exists()).toBe(true);
});
it('should render a ProfileContentTimeLine view with one entry where a description is set', async () => {
    const entries = [{
        id: 1,
        title: 'Test Entry',
        description: 'Entry Description',
        jobFieldId: 3085,
        experienceMonths: 13,
        start: '2016-03-01T00:00:00+01:00',
        end: '2021-02-01T01:00:00+01:00',
    }];
    const wrapper = mount(ProfileContentTimeLine, {
        props: {
            entries,
            timeLineTitle: 'Berufserfahrung',
        },
    });
    await flushPromises();
    const entry = wrapper.find('.BaseTimeLineEntry');
    expect(entry.exists()).toBe(true);

    let description = entry.find('.timeLineEntryDescription');
    expect(description.exists()).toBe(false);
    const showDescriptionButton = entry.find('.timeLineEntryShowDetails');
    expect(showDescriptionButton.exists()).toBe(true);
    expect(showDescriptionButton.text()).toStrictEqual('Details anzeigen…');

    await showDescriptionButton.trigger('click');

    description = entry.find('.timeLineEntryDescription');
    expect(description.exists()).toBe(true);
    expect(description.text()).toStrictEqual('Entry Description');
    expect(showDescriptionButton.text()).toStrictEqual('Details ausblenden…');
});
