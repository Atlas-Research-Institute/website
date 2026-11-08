import { useState } from "react";

/**
 * A YouTube video that loads only when the reader presses play.
 *
 * Same pattern as the homepage testimonial (src/components/home/VideoTestimonial.tsx):
 * until the click, the page shows a local poster and a play button, with no
 * iframe and no request to YouTube. The click swaps in the youtube-nocookie
 * embed with autoplay=1, which browsers allow because it follows a user gesture.
 *
 * `poster` is the post's cover: the video's YouTube thumbnail, downloaded by
 * `npm run covers` into public/images/resources/, never loaded from i.ytimg.com.
 * `alt` describes it, since it is the post's cover image.
 */
export function YouTubeFacade({
  id,
  title,
  poster,
  alt,
}: {
  id: string;
  title: string;
  poster: string;
  alt: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <figure className="m-0 overflow-hidden rounded border border-rule bg-navy">
      <div className="relative aspect-video">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play video: ${title}`}
            className="group absolute inset-0 block h-full w-full cursor-pointer border-0 bg-navy p-0"
          >
            <img
              src={poster}
              alt={alt}
              width={1280}
              height={720}
              className="absolute inset-0 h-full w-full object-cover"
            />
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
    </figure>
  );
}
