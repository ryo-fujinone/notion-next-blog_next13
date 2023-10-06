import { notFound } from "next/navigation";
import { fetchPages } from "@/utils/notion";
import { getMultiSelect } from "@/utils/property";
import { ArticleType } from "@/types/types";
import Card from "@/components/Card";

export const generateStaticParams = async () => {
    const { results }: { results: Record<string, any>[] } = await fetchPages(
        {}
    );

    const pathSet: Set<string> = new Set();
    for (const article of results) {
        for (const tag of getMultiSelect(
            article.properties.tags.multi_select
        )) {
            pathSet.add(tag);
        }
    }

    return Array.from(pathSet).map((tag) => {
        return {
            tag,
        };
    });
};

const Tag = async ({ params }: { params: { tag: string } }) => {
    const { results } = await fetchPages(params);
    if (results.length === 0) {
        notFound();
    }

    return (
        <div className="pt-12">
            <h1 className="text-5xl mb-8">{`#${params.tag}`}</h1>
            <div className="grid md:gap-6 mt-10 md:grid-cols-2 w-full my-12">
                {/* Card */}
                {results.map((article, index) => (
                    <Card key={index} article={article as ArticleType} />
                ))}
            </div>
        </div>
    );
};

export default Tag;

export const revalidate = 10;
