import type { Meta, Story } from '@storybook/vue3';
import BaseTimeLine from '../../packages/shared/components/base/BaseTimeLine/BaseTimeLine.vue';

export default {
    title: 'Base Components/Time-Line',
    component: BaseTimeLine,
    argTypes: {},
} as Meta;

const Template: Story = (args) => ({
    components: { BaseTimeLine },
    setup() {
        return { args };
    },
    template: '<BaseTimeLine v-bind="args"/>',
});

export const OneEntry: Story = Template.bind({});
OneEntry.args = {
    entries: [{
        id: 1,
        title: 'Title 1',
        subTitle: 'small subtitle',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt'
                    + ' ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et'
                    + 'justo duo dolores et ea',
        dateHeading: 'May 2019 - April 2020',
    }],
};

export const NoDescription: Story = Template.bind({});
NoDescription.args = {
    entries: [{
        id: 1,
        title: 'Title 1',
        subTitle: 'small subtitle',
        description: null,
        dateHeading: 'May 2019 - April 2020',
    }],
};

export const ShortDescription: Story = Template.bind({});
ShortDescription.args = {
    entries: [{
        id: 1,
        title: 'Title 1',
        subTitle: 'small subtitle',
        description: 'Just a short description about the entry',
        dateHeading: 'May 2019 - April 2020',
    }],
};

export const NoSubtitle: Story = Template.bind({});
NoSubtitle.args = {
    entries: [{
        id: 1,
        title: 'Title 1',
        subTitle: null,
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt'
                    + ' ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et'
                    + 'justo duo dolores et ea',
        dateHeading: 'May 2019 - April 2020',
    }],
};

export const LongTitle: Story = Template.bind({});
LongTitle.args = {
    entries: [{
        id: 1,
        title: 'A really long title which probably causes to appear in multiple lines,'
                + ' which is not beautiful but it is what it is',
        subTitle: 'small subtitle',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt'
                    + ' ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et'
                    + 'justo duo dolores et ea',
        dateHeading: 'May 2019 - April 2020',
    }],
};

export const MultipleEntries: Story = Template.bind({});
MultipleEntries.args = {
    entries: [{
        id: 1,
        title: 'Title 1',
        subTitle: 'small subtitle',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt'
                    + ' ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et'
                    + 'justo duo dolores et ea',
        dateHeading: 'May 2019 - April 2020',
    },
    {
        id: 2,
        title: 'Title 2',
        subTitle: 'small subtitle',
        description: 'Short Description',
        dateHeading: 'February 2012 - now',
    },
    {
        id: 3,
        title: 'Title 3',
        subTitle: 'small subtitle',
        description: 'An other description which is not that short but also not that long',
        dateHeading: 'December 1990 - Decempber 1990',
    },
    {
        id: 4,
        title: 'Title 4',
        subTitle: 'small subtitle',
        description: 'And one last description which should be okay',
        dateHeading: 'June 1980 - now',
    }],
};
