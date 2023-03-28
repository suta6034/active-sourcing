import { ref, type Ref } from 'vue';
import type { ExperiencesEntry, ProfileSkills, QuickViewTimeLineEntry } from '@/packages/shared/types/profile/types';
import { useLang } from '../../../../../../shared/composables/i18n';

const { t } = useLang();

export type Skill = {
    label: string,
    level: number,
    hidden: boolean,
};

const shownContentEntry: Ref<null | number> = ref(null);

const contentEntries = {
    JOBEXPERIENCE: 0,
    OBJECTIVE: 1,
    SKILLS: 2,
    LANGUAGE: 3,
    EDUCATION: 4,
    ABOUTME: 5,
    INTERESTS: 6,
    PERSONALITYTRAITS: 7,
    FURTHEREDUCATIONS: 8,
    PROJECTSANDAWARDS: 9,
};

export const ProfileHelpers = {
    shownContentEntry,
    contentEntries,
    /**
     * Converts the given number of months into a readable string with years and months
     * @param experienceMonths experience of applicant in months
     * @returns a string where the months are converted to years and months
     */
    getExperienceMonthString: (experienceMonths?: number | null): string | null => {
        let str = '';
        if (experienceMonths) {
            const years = Math.trunc(experienceMonths / 12);
            const months = experienceMonths - years * 12;
            if (years === 1) {
                str += (`${years} ${t('label', 'year')}`);
            } else if (years > 1) {
                str += (`${years} ${t('label', 'years')}`);
            }
            if (months >= 1 && str) {
                str += ' ';
            }
            if (months === 1) {
                str += (`${months} ${t('label', 'month')}`);
            } else if (months > 1) {
                str += (`${months} ${t('label', 'months')}`);
            }
            return str;
        }
        return (`0 ${t('label', 'months')}`);
    },

    /**
     * Converts the given date to a string representation
     * @param d date which should be converted to string
     * @returns string representation of given date
     */
    getDateString: (d: Date): string => {
        const month = (`0${d.getMonth() + 1}`).slice(-2);
        return `${month}/${d.getFullYear()}`;
    },

    /**
     * Converts the given timespan to a readable string representation
     * @param startDate start date as string
     * @param endDate end date as string (optional)
     * @returns a string representation of the given timespan
     */
    getDateTitleString: (startDate: string, endDate?: string | null): string => {
        const startString = ProfileHelpers.getDateString(new Date(startDate));
        if (endDate) {
            const endString = ProfileHelpers.getDateString(new Date(endDate));
            return `${startString} ${t('label', 'until')} ${endString}`;
        }
        return `${t('label', 'since')} ${startString}`;
    },

    getDateHeading: (experienceMonths: number | null, startDate: string, endDate?: string | null): string => {
        const dateTitle = ProfileHelpers.getDateTitleString(startDate, endDate);
        if (experienceMonths == null) {
            return dateTitle;
        }
        const experienceMonthString = ProfileHelpers.getExperienceMonthString(experienceMonths);
        return `${dateTitle} • ${experienceMonthString}`;
    },

    layout: {
        /**
         * Calculates the index of the skill after which the other skills should be hidden
         * @param skillElements elements which are shown in skills section
         * @param container container element of skills section
         * @returns returns the index of the last shown skill
         */
        getLastShownIndexOfSkills: (skillElements: Array<HTMLElement>, container?: HTMLElement | null): number => {
            if (skillElements.length && container) {
                const lineHeight = skillElements[0].clientHeight;
                const maxSkillsHeight = lineHeight * 3;
                const containerHeight = container.clientHeight;
                if (containerHeight > maxSkillsHeight) {
                    const maxAllowedBottom = container.getBoundingClientRect().top + maxSkillsHeight;
                    let lastVisibleSkillIdx = -1;
                    for (let idx = 0; idx < skillElements.length; idx += 1) {
                        lastVisibleSkillIdx = idx - 1;
                        if (skillElements[idx].getBoundingClientRect().bottom > maxAllowedBottom) {
                            break;
                        }
                    }
                    return lastVisibleSkillIdx;
                }
                return skillElements.length - 1;
            }
            return 0;
        },
    },

    normalizeExperienceEntries: (targetArray: ExperiencesEntry[]): QuickViewTimeLineEntry[] => {
        const flatEntries:Array<QuickViewTimeLineEntry> = [];

        targetArray.forEach((obj: ExperiencesEntry) => {
            const flatObj = {
                type: obj.type || null,
                ...obj.attributes,
            };
            flatEntries.push(flatObj);
        });

        return flatEntries;
    },

    skillsValid: (skills: ProfileSkills | null | undefined): boolean => {
        if (skills) {
            return !!(skills.advanced.length
            || skills.basic.length
            || skills.excellent.length);
        }
        return false;
    },
};
