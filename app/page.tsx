import { fetchPages } from "@/utils/notion";
import { siteConfig } from "@/site.config";
import { ArticleType } from "@/types/types";
import Card from "@/components/Card";

export default async function Home() {
    const { results } = await fetchPages({});

    return (
        <div className="pt-12">
            <h1 className="text-5xl mb-8">{siteConfig.title}</h1>
            <div className="grid md:gap-6 mt-10 md:grid-cols-2 w-full my-12">
                {/* Card */}
                {results.map((article, index) => (
                    <Card key={index} article={article as ArticleType} />
                ))}
            </div>
        </div>
    );
}

export const revalidate = 10;
