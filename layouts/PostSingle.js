import dateFormat from "@lib/utils/dateFormat";
import { shortcodes } from "@shortcodes/all";
import { MDXRemote } from "next-mdx-remote";
import Image from "next/image";
import Link from "next/link";
import Base from "./Baseof";

const PostSingle = ({ frontmatter, content, mdxContent, nextPrev, slug }) => {
  let { description, title, date, image, categories } = frontmatter;
  description = description ? description : content.slice(0, 120);
  const post = nextPrev.filter((x) => x.slug != slug);

  return (
    <Base title={title} description={description}>
      <section className="section">
        <div className="container mx-auto">
          <div className="rounded-xl bg-gray-100 px-3 pt-14 pb-32 text-center dark:bg-darkmode-theme-dark sm:px-8 md:px-14 md:pb-40 md:pt-20 lg:px-20">
            <div className="mb-6 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
                className="mr-2 h-5 w-5 scale-[0.85] opacity-60"
              >
                <path
                  d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H322.8c-3.1-8.8-3.7-18.4-1.4-27.8l15-60.1c2.8-11.3 8.6-21.5 16.8-29.7l40.3-40.3c-32.1-31-75.7-50.1-123.9-50.1H178.3zm435.5-68.3c-15.6-15.6-40.9-15.6-56.6 0l-29.4 29.4 71 71 29.4-29.4c15.6-15.6 15.6-40.9 0-56.6l-14.4-14.4zM375.9 417c-4.1 4.1-7 9.2-8.4 14.9l-15 60.1c-1.4 5.5 .2 11.2 4.2 15.2s9.7 5.6 15.2 4.2l60.1-15c5.6-1.4 10.8-4.3 14.9-8.4L576.1 358.7l-71-71L375.9 417z"
                  fill="currentColor"
                />
              </svg>
              <span className="inline-block text-base font-normal leading-none opacity-60">
                {dateFormat(date)}
              </span>
            </div>
            <h1 className="text-base font-bold md:text-h1">{title}</h1>
          </div>
          <div className="z-10 mx-auto -mt-20 w-[95%] rounded-md border border-gray-100 bg-white px-3 py-0 dark:border-darkmode-border dark:bg-darkmode-body sm:w-4/5 md:p-10 lg:p-16">
            {image && (
              <Image src={image} height="713" width="950" alt={title} />
            )}
            <div className="content mb-16 text-left">
              <MDXRemote {...mdxContent} components={shortcodes} />
            </div>

            <div className="border-border-default mt-10 hidden border-t pt-10">
              {categories.map((category, i) => (
                <Link
                  key={`category-${i}`}
                  href={`/categories/${category}`}
                  className="mr-4"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>

          <div
            className={
              post.length < 1
                ? "flex justify-center pt-12 text-center"
                : "flex justify-start pt-12 text-center"
            }
          >
            {post.map((v, key) => (
              <Link
                key={v.slug}
                href={`/posts/${v.slug}`}
                className={
                  post.length == 1
                    ? "w-full text-center"
                    : key == 0
                    ? "w-1/2 text-right"
                    : key == 1
                    ? "w-1/2 text-left"
                    : undefined
                }
              >
                <div className="mx-4">
                  {v.button == "Previous Post" ? (
                    <h4
                      className={
                        post.length == 1
                          ? "flex items-center justify-center text-base font-bold"
                          : "flex items-center justify-end text-base font-bold"
                      }
                    >
                      <span className="mr-4">{v.arrow}</span> {v.button}
                    </h4>
                  ) : (
                    <h4
                      className={
                        post.length == 1
                          ? "flex items-center justify-center text-base font-bold"
                          : "flex items-center justify-start text-base font-bold"
                      }
                    >
                      {v.button} <span className="ml-4">{v.arrow}</span>
                    </h4>
                  )}

                  <small className="text-lg font-normal">{v.title}</small>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Base>
  );
};

export default PostSingle;
