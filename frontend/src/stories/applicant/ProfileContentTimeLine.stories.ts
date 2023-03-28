import type { Meta, Story } from '@storybook/vue3';

import { allFiltersLabels } from '../../packages/applicant/repositories/filter-repository';

import ProfileContentTimeLine
    from '../../packages/applicant/components/SearchResult/SearchResultDetail/Profile/ProfileContent/ProfileContentTimeLine.vue';
    
export default {
    title: 'Applicant Info/Profile Timeline',
    component: ProfileContentTimeLine,
    argTypes: {},
} as Meta;

const Template: Story = (args) => ({
    components: { ProfileContentTimeLine },
    setup() {
        return { args };
    },
    template: '<ProfileContentTimeLine v-bind="args"/>',
});

allFiltersLabels.value = [{
    name: 'jobFields',
    items: [
        {
            id: 3095,
            label: 'Coaching, Training',
        },
        {
            id: 3091,
            label: 'Führung, Management',
        },
        {
            id: 2172,
            label: 'IT, EDV',
        },
        {
            id: 3089,
            label: 'Marketing, PR',
        },
        {
            id: 3099,
            label: 'Personalwesen',
        },
    ],
}];

const jobExperienceEntries = [{
    id: 1971370,
    title: 'Head of IT',
    description: null,
    jobFieldId: 2172,
    experienceMonths: 0,
    start: '2022-01-01T01:00:00+01:00',
    end: null,
},
{
    id: 1214405,
    title: 'Group IT Program Management & Enterprise Solution Architect',
    description: 'Senior Projekt Management für die Implementierung von konzern-/gruppenweiten Enterprise Systemen.',
    jobFieldId: 3091,
    experienceMonths: 59,
    start: '2017-12-01T01:00:00+01:00',
    end: null,
},
{
    id: 860872,
    title: 'Lektor',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut '
                + 'labore et dolore magna aliquyam erat, sed diam voluptua. '
                + 'At vero eos et accusam et justo duo dolores et ea rebum.',
    jobFieldId: null,
    experienceMonths: 47,
    start: '2017-01-01T00:00:00+01:00',
    end: '2020-12-01T01:00:00+01:00',
},
{
    id: 924353,
    title: 'Journalist/Autor',
    description: 'Motorrad Reisen, Abenteuer und Rallye',
    jobFieldId: 3089,
    experienceMonths: 72,
    start: '2016-11-01T00:00:00+01:00',
    end: null,
},
{
    id: 860871,
    title: 'Lektor',
    description: 'Betriebliche Informationswirtschaft mit Schwerpunkt auf xRM Geschäftsprozesse und Systeme.',
    jobFieldId: 3095,
    experienceMonths: 59,
    start: '2016-03-01T00:00:00+01:00',
    end: '2021-02-01T01:00:00+01:00',
},
];

const educationEntries = [
    {
        "id": 177605,
        "description": null,
        "experienceMonths": 11,
        "focus": "Heizung Meister",
        "title": "Wifi Innsbruck",
        "start": "2004-01-01T00:00:00+01:00",
        "end": "2004-12-01T00:00:00+01:00"
    },
    {
        "id": 177606,
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut '
            + 'labore et dolore magna aliquyam erat, sed diam voluptua. '
            + 'At vero eos et accusam et justo duo dolores et ea rebum.',
        "experienceMonths": 5,
        "focus": "Gas Befähigung Meister",
        "title": "Wifi Innsbruck",
        "start": "2003-01-01T00:00:00+01:00",
        "end": "2003-06-01T00:00:00+02:00"
    },
    {
        "id": 177607,
        "description": null,
        "experienceMonths": 11,
        "focus": "Sanitär Befähigungsprüfung",
        "title": "Wifi Innsbruck",
        "start": "2002-01-01T00:00:00+01:00",
        "end": "2002-12-01T00:00:00+01:00"
    },
    {
        "id": 177608,
        "description": null,
        "experienceMonths": 4,
        "focus": "Lehrlingsausbilder",
        "title": "Wifi Innsbruck",
        "start": "2002-01-01T00:00:00+01:00",
        "end": "2002-05-01T00:00:00+02:00"
    },
    {
        "id": 177610,
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut '
            + 'labore et dolore magna aliquyam erat, sed diam voluptua. '
            + 'At vero eos et accusam et justo duo dolores et ea rebum.',
        "experienceMonths": 11,
        "focus": "Schlosser",
        "title": "",
        "start": "1987-01-01T00:00:00+01:00",
        "end": "1987-12-01T00:00:00+01:00"
    },
    {
        "id": 177604,
        "description": null,
        "experienceMonths": 60,
        "focus": null,
        "title": "Hauptschule Telfs",
        "start": "1976-01-01T00:00:00+01:00",
        "end": "1981-01-01T00:00:00+01:00"
    },
    {
        "id": 177603,
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut '
            + 'labore et dolore magna aliquyam erat, sed diam voluptua. '
            + 'At vero eos et accusam et justo duo dolores et ea rebum.',
        "experienceMonths": 48,
        "focus": null,
        "title": "Volksschule Telfs",
        "start": "1972-01-01T00:00:00+01:00",
        "end": "1976-01-01T00:00:00+01:00"
    }
];

const projectsAndAwardsEntry = [
    {
        "id": 177605,
        "description": "project..description1..",
        "title": "Project-UX/UI-link shown",
        "start": "2004-01-01T00:00:00+01:00",
        "end": "2004-12-01T00:00:00+01:00",
        url: {
            value: 'http://link.project',
            hidden: false,
        },
    },
    {
        "id": 177606,
        "description": "project..description2..",
        "title": "Project-UX/UI-link hidden",
        "start": "2004-01-01T00:00:00+01:00",
        "end": "2004-12-01T00:00:00+01:00",
        url: {
            value: 'http://link.project',
            hidden: true,
        },
    },
    {
        "id": 177607,
        "title": "Award-link exists and show",
        year: 2017,
        url: {
            value: 'http://link.award',
            hidden: false,
        },
    },
    {
        "id": 177608,
        "title": "Award-link exists and hidden",
        year: 2017,
        url: {
            value: 'http://link.award',
            hidden: true,
        },
    },
    {
        "id": 177608,
        "title": "Award-link does not exists",
        year: 2017,
        url: null,
    },
]

const furtherEducationEntry = [
    {
        "id": 177605,
        "title": "Further Education1",
        year: 2017,
        institute: 'karriere.at group',
    },
    {
        "id": 177606,
        "title": "Further Education2",
        year: 2020,
        institute: 'google group',
    },
]

export const JobExperience: Story = Template.bind({});
JobExperience.args = {
    timeLineTitle: 'JobExperience',
    entries: jobExperienceEntries,
};

export const Education: Story = Template.bind({});
Education.args = {
    timeLineTitle: 'Education',
    entries: educationEntries,
};

export const furtherEducation: Story = Template.bind({});
furtherEducation.args = {
    timeLineTitle: 'FurtherEducation',
    entries: furtherEducationEntry,
};

export const ProjectsAndAwards: Story = Template.bind({});
ProjectsAndAwards.args = {
    timeLineTitle: 'ProjectsAndAwards',
    entries: projectsAndAwardsEntry,
};
