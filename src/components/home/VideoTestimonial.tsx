import { useState } from "react";
import { SectionHeading } from "@/components/site/Container";

/**
 * One fellow on video, mid-page.
 *
 * Set exactly one of `file` or `youtubeId`, then fill in the fellow's name,
 * country and role. While both are null the section renders nothing, so the
 * page never ships an empty player.
 *
 *   file      a path under public/, e.g. "/videos/sevinch.mp4". Keep the
 *             file under ~10MB or the repo and the deploy both suffer.
 *   youtubeId the id only, e.g. "dQw4w9WgXcQ". Use an unlisted upload for
 *             anything larger.
 *   poster    a local thumbnail under public/images/. For YouTube it is the
 *             facade image, so it must be a committed file, never i.ytimg.com:
 *             the point of the facade is that nothing is fetched from YouTube
 *             before the reader asks for it.
 *
 * YOUTUBE LOADS ONLY ON CLICK. Until the play button is pressed the page shows
 * the poster and a button; there is no iframe and no request to YouTube. The
 * click swaps in the youtube-nocookie embed with autoplay=1, which browsers
 * allow because it follows a user gesture (the iframe's `allow` list must keep
 * "autoplay" for that).
 *
 * Every fellow on video needs written permission on file before this goes
 * live. Most of them are minors.
 */
const VIDEO: {
  file: string | null;
  youtubeId: string | null;
  poster: string | null;
  name: string;
  country: string;
  role: string;
  pullQuote: string;
} = {
  file: null,
  youtubeId: "Bmho2wu6ZcA",
  poster: "/images/siddiqa-video.webp",
  name: "Siddiqa",
  country: "Pakistan",
  role: "Lead editor, Summer 2026 Fellowship",
  pullQuote: "We were guided through literally every single thing.",
};

export function VideoTestimonial() {
  const [playing, setPlaying] = useState(false);

  if (!VIDEO.file && !VIDEO.youtubeId) return null;

  return (
    <section
      id="testimonial-video"
      className="mx-auto max-w-[1200px] px-6 pt-[104px] pb-4"
    >
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-center gap-x-[72px] gap-y-10">
        <figure className="m-0 overflow-hidden rounded border border-rule bg-navy">
          {VIDEO.youtubeId ? (
            <div className="relative aspect-video">
              {playing ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${VIDEO.youtubeId}?autoplay=1`}
                  title={`${VIDEO.name}, Atlas fellow`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  aria-label={`Play video: ${VIDEO.name}, Atlas fellow`}
                  className="group absolute inset-0 block h-full w-full cursor-pointer border-0 bg-navy p-0"
                >
                  {VIDEO.poster && (
                    <img
                      src={VIDEO.poster}
                      alt=""
                      width={1280}
                      height={720}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  )}
                  <span
                    aria-hidden
                    className="absolute left-1/2 top-1/2 flex h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-crimson text-white transition-colors group-hover:bg-crimson-hover group-focus-visible:bg-crimson-hover"
                  >
                    <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor" className="ml-1">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </button>
              )}
            </div>
          ) : (
            <video
              controls
              preload="none"
              playsInline
              poster={VIDEO.poster ?? undefined}
              className="block aspect-video h-auto w-full"
            >
              <source src={VIDEO.file ?? undefined} type="video/mp4" />
              Your browser cannot play this video.
            </video>
          )}
        </figure>

        <div>
          <SectionHeading className="m-0 mb-4">
            Fellowship testimonial
          </SectionHeading>
          {VIDEO.pullQuote && (
            <blockquote className="m-0 mb-5 max-w-[26em] text-[21px] italic leading-[1.55]">
              {`“${VIDEO.pullQuote}”`}
            </blockquote>
          )}
          <p className="m-0 text-[17px] text-body-muted">
            <strong className="font-semibold text-navy">{VIDEO.name}</strong>
            {VIDEO.country && `, ${VIDEO.country}.`}
            {VIDEO.role && ` ${VIDEO.role}.`}
          </p>
        </div>
      </div>
    </section>
  );
}
