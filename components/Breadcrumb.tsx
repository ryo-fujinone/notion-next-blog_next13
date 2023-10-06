"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Breadcrumb = () => {
    const pathname = usePathname();
    let joinedPath = "";
    return (
        <>
            {pathname.split("/").map((path, index) => {
                if (path) {
                    joinedPath += path + "/";
                    return (
                        <Link
                            key={index}
                            href={`/${joinedPath}`}
                            className="text-gray-500 hover:text-gray-600"
                        >
                            <span className="text-gray-500 mx-2">/</span> {path}
                        </Link>
                    );
                }
            })}
        </>
    );
};

export default Breadcrumb;
