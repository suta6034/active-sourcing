import type { Meta, Story } from '@storybook/vue3';

import { useApplicant } from '../../../packages/shared/composables/applicant';
import { allFiltersLabels } from '../../../packages/applicant/repositories/filter-repository';

import ApplicantApprovalInformation from '../../../packages/applicant/components/SearchResult/Approval/Information/ApplicantApprovalInformation.vue';

const {
    applicantApprovalId,
    applicantProfileData,
} = useApplicant();

export default {
    title: 'Applicant Approval/Candidate Information',
    component: ApplicantApprovalInformation,
    argTypes: {},
} as Meta;

const Template: Story = (args) => ({
    components: { ApplicantApprovalInformation },
    setup() {
        return { args };
    },
    template: '<div style="background-color: #f5f7f7"><ApplicantApprovalInformation v-bind="args" style="max-height: 450px"/><div>',
});

applicantApprovalId.value = '12345';
applicantProfileData.value = {
    availabilityId: 1,
    furtherEducations: [],
    preferredWorkplaces: [
        "Salzburg",
        "Mondsee"
      ],
    profileId: 12345,
    projectsAndAwards: [],
    readyToMove: false,
    experiences: [
        {
          "type": "job",
          "attributes": {
            "id": 255589,
            "title": "Senior Graphics Designer",
            "description": "Leitung Grafikabteilung; Kommunikation und Abstimmung mit Agenturen, Tochterunternehmen, externen Partnern und Dienstleistern; Entwicklung, Erstellung und Wartung von Corporate Websites, Newslettern, Social Media Kampagnen, Broschüren, Factsheets, Release News, Messeständen, usw.; Entwurf von User Interfaces; Konzeption und Betreuung von interaktiven Sales-Apps; Einschulung und Ausbildung von Mitarbeitern und Lehrlingen.",
            "experienceMonths": 204,
            "start": "2006-04-01T00:00:00+02:00",
            "end": null,
            "jobFieldId": 3093
          }
        },
        {
          "type": "job",
          "attributes": {
            "id": 2135,
            "title": "Senior  Webdesigner & Producer",
            "description": "Entwurf und Konzeption der Designs für Websites; Konzeption von User Interfaces, Navigationsdesigns, Werbeformen und anderen grafischen Elementen; Entwicklung von Designs für den Printbereich; Programmierung von Websites (vorwiegend ASP, HTML, CSS, JavaScript und TypoScript); Erstellung und Wartung von Websites mit Hilfe von Content Management Systemen (AGENTUR.NET-eigenes, Typo3, Day Communiqué); Systemeinschulung für Kunden (CMS, Typo3, etc.); Kundenbetreuung; Konfiguration des Statistik-Servers \"Webtrends\" (Erstellung neuer Profile, Analysen); Server- / Client- / Drucker- / Netzwerk- Betreuung und Konfiguration (Windows-Infrastruktur, User-Accounts; Backups, etc.)",
            "experienceMonths": 29,
            "start": "2003-11-01T00:00:00+01:00",
            "end": "2006-03-01T00:00:00+01:00",
            "jobFieldId": 2172
          }
        },
        {
          "type": "job",
          "attributes": {
            "id": 2134,
            "title": "Webdesign & Producing",
            "description": "Entwurf und Konzeption der Designs für Websites; Konzeption von User Interfaces, Navigationsdesigns, Werbeformen und anderen grafischen Elementen; Programmierung von Websites (vorwiegend HTML und CSS); Erstellung und Wartung von Websites",
            "experienceMonths": 40,
            "start": "2000-06-01T00:00:00+02:00",
            "end": "2003-09-01T00:00:00+02:00",
            "jobFieldId": 2172
          }
        }
      ],
    languages: [],
    educations: [
        {
          "id": 1750,
          "description": null,
          "experienceMonths": 34,
          "focus": "Technische Informatik",
          "title": "HTBLA, Osternbergerstr. 55, 5280 Braunau am Inn",
          "start": "1996-09-01T00:00:00+02:00",
          "end": "1999-06-01T00:00:00+02:00"
        },
        {
          "id": 1751,
          "description": "Schwerpunkte der Ausbildung sind Wartung, Prüfung und Fertigung von Luftfahrzeugen, Luftfahrtgeräten sowie flugtechnische Bodeneinrichtungen.",
          "experienceMonths": 46,
          "focus": null,
          "title": "BFS für Flugtechnik, 3425 Langenlebarn, Fliegerhorst Brumowski",
          "start": "1992-09-01T00:00:00+02:00",
          "end": "1996-06-01T00:00:00+02:00"
        },
        {
          "id": 214078,
          "description": null,
          "experienceMonths": 47,
          "focus": null,
          "title": "HS Mettmach, Schulstraße 12, 4931 Mettmach",
          "start": "1988-09-01T00:00:00+02:00",
          "end": "1992-07-01T00:00:00+02:00"
        }
      ],
    skills: {
        "basic": [
          "Businessplanung",
          "Blender",
          "Censhare",
          "Social Media Marketing",
          "Hubspot"
        ],
        "advanced": [
          "Adobe Illustrator",
          "CSS",
          "Netzwerktechnik",
          "Projektmanagement",
          "Teamführung",
          "Typo3",
          "UX Management",
          "Windows Server 2003",
          "MemoQ"
        ],
        "excellent": [
          "Druckvorstufe",
          "Grafik Design",
          "HTML",
          "Interaction Design",
          "Marketing",
          "Mobile Design",
          "Präsentation",
          "User Interface Design",
          "Webdesign",
          "Adobe Indesign",
          "Adobe Photoshop"
        ]
      },
    objective: {
        employmentTypeIds: [3960, 3961],
        jobs: [],
        salary: 83845.76,
    },
    interests: [],
    aboutMe: '',
};
allFiltersLabels.value = [{
    name: 'employmentTypes',
    items: [{
        id: 3960,
        label: 'Vollzeit',
    }, {
        id: 3961,
        label: 'Teilzeit',
    }],
}];

export const Default: Story = Template.bind({});
Default.args = {};
