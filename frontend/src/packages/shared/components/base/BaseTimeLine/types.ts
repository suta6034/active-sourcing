export type SubTitle = {
    value: string,
    hidden: boolean,
};

export type TimeLineEntry = {
    id: number;
    title?: string | null;
    subTitle?: SubTitle | string | null,
    description?: string | null;
    dateHeading?: string;
};
