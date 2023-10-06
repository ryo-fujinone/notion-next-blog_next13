import type {
    ListBlockChildrenResponse,
    QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";

export type ResultsType = Pick<QueryDatabaseResponse, "results">["results"][0];

export type PropertyType = {
    name: { title: RichTextType[] };
    author: { rich_text: RichTextType[] };
    slug: { rich_text: RichTextType[] };
    published: { date: { start: string } };
    isPublic: { checkbox: boolean };
    tags: { multi_select: [{ name: string }] };
};

export type FileType = {
    file?: { url: string };
    external?: { url: string };
};

export type ArticleType = Extract<ResultsType, { properties: any }> & {
    properties: PropertyType;
    cover: FileType | null;
};

export type ArticleProps = { article: ArticleType };

export type AnnotationType = {
    bold: boolean;
    code: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    color: string;
};

export type RichTextType = {
    plain_text: string;
    href: string | null;
    annotations: AnnotationType;
};

export type BlockObjectResult = Pick<
    ListBlockChildrenResponse,
    "results"
>["results"][0];

export type BlockObjectResponse = Extract<BlockObjectResult, { type: any }>;
