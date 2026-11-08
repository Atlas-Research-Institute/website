import { useMemo, type MouseEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Container } from "@/components/site/Container";
import { ResourceCtas } from "@/components/resources/ResourceCtas";
import { YouTubeFacade } from "@/components/resources/YouTubeFacade";
import { findResource, renderMarkdown } from "@/lib/resources";
import { RESOURCE_CATEGORIES, RESOURCES_PATH } from "@/lib/resourceMeta";

/**
 * /resources/:slug, one post.
 *
 *   breadcrumb · title · description · video or cover · body · two CTAs
 *
 * A video post's cover is its YouTube thumbnail, which doubles as the play
 * button's poster, so it is not shown twice.
 *
 * Title, description, Open Graph and Article JSON-LD come from the same
 * frontmatter: written into the prerendered HTML by the build, and by Seo.tsx
 * after in-app navigation.
 */

/**
 * Reading typography for the markdown body: 19px on phones, 20px from the md
 * breakpoint, line height 1.65, in a column up to 820px wide. The cover or
 * video above it spans the full 860px. Links are crimson, the only colour a
 * reader can click.
 */
const BODY = [
  "max-w-[820px] md:text-[20px]",
  "[&_p]:m-0 [&_p]:mt-5",
  "[&_h2]:m-0 [&_h2]:mt-14 [&_h2]:mb-4 [&_h2]:text-[length:clamp(26px,3vw,34px)] [&_h2]:leading-[1.2]",
  "[&_h3]:m-0 [&_h3]:mt-10 [&_h3]:mb-3 [&_h3]:text-[23px] [&_h3]:leading-[1.3]",
  "[&>*:first-child]:mt-0",
  "[&_ul]:m-0 [&_ul]:mt-5 [&_ul]:list-disc [&_ul]:pl-6",
  "[&_ol]:m-0 [&_ol]:mt-5 [&_ol]:list-decimal [&_ol]:pl-6",
  "[&_li]:mt-2.5 [&_li]:pl-1 [&_li>p]:mt-2 [&_li>p:first-child]:mt-0",
  "[&_a]:text-crimson [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-crimson-hover",
  "[&_strong]:font-semibold [&_strong]:text-navy",
  "[&_blockquote]:m-0 [&_blockquote]:mt-6 [&_blockquote]:border-l-2 [&_blockquote]:border-navy [&_blockquote]:pl-5 [&_blockquote]:italic",
  "[&_hr]:my-12 [&_hr]:border-0 [&_hr]:border-t [&_hr]:border-rule",
  // Diagrams: at their drawn width, never stretched.
  "[&_img]:mt-8 [&_img]:block [&_img]:h-auto [&_img]:w-full [&_img]:max-w-[460px] [&_img]:rounded",
  // A collapsed section, such as a lecture's transcript: closed until opened,
  // but in the HTML, so search engines read it. Smaller text inside.
  "[&_details]:mt-14 [&_details]:border-y [&_details]:border-rule [&_details]:text-[17px] [&_details]:leading-[1.6] [&_details]:text-body-muted",
  "[&_summary]:cursor-pointer [&_summary]:py-5 [&_summary]:text-[19px] [&_summary]:font-semibold [&_summary]:text-crimson [&_summary:hover]:text-crimson-hover",
  "[&_details[open]]:pb-8 [&_details_p:first-of-type]:mt-0",
].join(" ");

export function ResourcePost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = slug ? findResource(slug) : undefined;
  const html = useMemo(() => (post ? renderMarkdown(post.body) : ""), [post]);

  if (!post) return <ResourceNotFound />;

  /**
   * Links inside the markdown are plain <a> tags. Same-site ones go through the
   * router, so following one is an in-app page change rather than a full reload.
   */
  const onBodyClick = (event: MouseEvent<HTMLDivElement>) => {
    const anchor = (event.target as HTMLElement).closest("a");
    if (
      !anchor ||
      anchor.target ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }
    const href = anchor.getAttribute("href") ?? "";
    if (href.startsWith("/") && !href.startsWith("//")) {
      event.preventDefault();
      navigate(href);
    }
  };

  const category = RESOURCE_CATEGORIES[post.category];

  return (
    <article className="bg-paper text-ink text-[19px] leading-[1.65]">
      <Container className="max-w-[908px] pt-14 pb-[104px]">
        <nav aria-label="Breadcrumb" className="mb-6 text-[16px] italic text-muted">
          <Link
            to={`${RESOURCES_PATH}?category=${post.category}`}
            className="text-muted underline underline-offset-4 hover:text-crimson"
          >
            {category.plural}
          </Link>
        </nav>

        <h1 className="m-0 mb-5 text-[length:clamp(36px,4.6vw,54px)] leading-[1.1] tracking-[-0.01em]">
          {post.title}
        </h1>
        <p className="m-0 max-w-[36em] text-[21px] text-body-muted">
          {post.description}
        </p>

        <div className="mt-10">
          {post.youtubeId ? (
            <YouTubeFacade
              id={post.youtubeId}
              title={post.videoTitle ?? post.title}
              poster={post.cover}
              alt={post.coverAlt}
            />
          ) : (
            <img
              src={post.cover}
              alt={post.coverAlt}
              width={1280}
              height={720}
              className="block h-auto w-full rounded border border-rule"
            />
          )}
        </div>

        <div
          className={`mt-12 ${BODY}`}
          onClick={onBodyClick}
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <ResourceCtas slug={post.slug} />

        <p className="m-0 mt-12 text-[17px]">
          <Link to={RESOURCES_PATH} className="link">
            <span aria-hidden>←</span> All resources
          </Link>
        </p>
      </Container>
    </article>
  );
}

function ResourceNotFound() {
  return (
    <Container className="max-w-[860px] py-32">
      <h1 className="m-0 text-[length:clamp(36px,4.6vw,54px)] leading-[1.1]">
        That post isn't here.
      </h1>
      <p className="m-0 mt-5 text-[19px] text-body-muted">
        The link may be out of date.
      </p>
      <Link
        to={RESOURCES_PATH}
        className="mt-8 inline-block rounded bg-crimson px-6 py-3 font-semibold text-white no-underline transition-colors hover:bg-crimson-hover"
      >
        All resources
      </Link>
    </Container>
  );
}
