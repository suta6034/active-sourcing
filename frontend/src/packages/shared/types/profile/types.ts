interface AttributesI {
    id: number;
    title: string;
    institution? : string | null;
    institute?: string | null;
    experienceMonths?: number | null ;
    experienceTypeId?: number | null;
    start?: string | null;
    end?: string | null;
    description?: string | null;
    jobFieldId?: number | null;
    focus?: string | null;
    url?: {
        hidden: boolean;
        value: string;
    } | null;
    year?: string | null;
}

export interface QuickViewTimeLineEntry extends AttributesI{
    type?: 'other' | 'job' | 'project' | 'award',
}

export type ProjectsAndAwardsEntry = {
    type: 'project' | 'award',
    attributes: AttributesI
};

export type ExperiencesEntry = {
    type: 'other' | 'job',
    attributes: AttributesI
};

export type LanguagesEntry = {
    id: number;
    levelId: number;
};

type EducationEntry = {
    id: number;
    description: string | null;
    focus: string | null;
    title: string;
    start: string;
    end: string | null;
    experienceMonths: number;
};

export type ProfileSkills = {
    basic: Array<string>;
    advanced: Array<string>;
    excellent: Array<string>;
};

export type ProfileObjective = {
    employmentTypeIds: Array<number>;
    jobs: Array<string>;
    salary: number | null;
};

export type ProfileData = {
    availabilityId: number;
    furtherEducations: Array<QuickViewTimeLineEntry>;
    preferredWorkplaces: Array<string>;
    profileId: number;
    projectsAndAwards: Array<ProjectsAndAwardsEntry>;
    readyToMove: boolean;
    statement?: string;
    experiences: Array<ExperiencesEntry>;
    languages: Array<LanguagesEntry>;
    educations: Array<EducationEntry>;
    skills: ProfileSkills | null;
    objective: ProfileObjective | null;
    interests: string[];
    aboutMe: string;
};
