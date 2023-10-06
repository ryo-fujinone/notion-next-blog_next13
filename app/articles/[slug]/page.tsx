import { notFound } from "next/navigation";
// import { NotionBlock, Render } from "@9gustin/react-notion-render";
import { getText } from "@/utils/property";
import { fetchBlocksByPageId, fetchPages } from "@/utils/notion";
import NotionBlocks from "./notion-blocks";
import { BlockType } from "notion-block-renderer";
import { ArticleType } from "@/types/types";
import ArticleMeta from "@/components/ArticleMeta";

export const generateStaticParams = async () => {
    const { results } = await fetchPages({});
    return results.map((article: any) => ({
        slug: getText(article.properties.slug.rich_text),
    }));
};

const getArticle = async (slug: string) => {
    try {
        const { results } = await fetchPages({ slug });
        const article = results[0];
        const articleId = article.id;
        const { results: blocks } = await fetchBlocksByPageId(articleId);

        return {
            article,
            blocks,
        };
    } catch (error) {
        return {
            article: null,
            blocks: null,
        };
    }
};

const Article = async ({ params }: { params: { slug: string } }) => {
    const { article, blocks } = await getArticle(params.slug);
    if (!article) {
        notFound();
    }
    return (
        <article className="w-full">
            {/* meta section */}
            <div className="my-12">
                {article && <ArticleMeta article={article as ArticleType} />}
            </div>

            {/* article */}
            <div className="my-12">
                <NotionBlocks
                    blocks={blocks as BlockType[]}
                    isCodeHighlighter={true}
                />

                {/* <Render blocks={blocks as NotionBlock[]} classNames /> */}
            </div>
        </article>
    );
};

export default Article;

export const revalidate = 10;
