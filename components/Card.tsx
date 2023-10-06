import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArticleProps } from "@/types/types";
import { getCover, getDate, getMultiSelect, getText } from "@/utils/property";

const Card: FC<ArticleProps> = ({ article }) => {
    return (
        <Link
            href={`/articles/${getText(article.properties.slug.rich_text)}`}
            className="flex justify-center "
        >
            <div className="max-w-sm rounded overflow-hidden shadow-lg w-full my-4 md:my-0 content-between grid">
                {/* image */}
                <div>
                    {" "}
                    <Image
                        className="w-full static w-full h-auto"
                        src={getCover(article.cover)}
                        alt=""
                        style={{ objectFit: "cover" }}
                        width={400}
                        height={225}
                        quality={30}
                    />
                </div>

                {/* title & date*/}
                <div className="px-6 pt-4 ">
                    <h2 className="text-base font-medium mb-3 ">
                        {getText(article.properties.name.title)}
                    </h2>
                    <p className="text-gray-700 text-xs">
                        {getDate(article.properties.published.date)}
                    </p>
                </div>

                {/* tag */}
                <div className="px-6 pb-4 ">
                    {getMultiSelect(article.properties.tags.multi_select).map(
                        (tag, index) => (
                            <span
                                key={index}
                                className="text-sm px-2 py-1 font-normal bg-gray-200 rounded-lg break-words mr-2 mb-2"
                            >
                                {`#${tag}`}
                            </span>
                        )
                    )}
                </div>
            </div>
        </Link>
    );
};

export default Card;
