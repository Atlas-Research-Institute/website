import { useState } from "react";

/**
 * The hero photograph.
 *
 * Points at /images/hero.jpg, which has not been supplied yet. Until it loads,
 * the frame is a plain mist block with no text: never placeholder copy.
 */
export function HeroImage() {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative overflow-hidden rounded bg-mist aspect-[4/5] max-h-[580px] w-full">
      {!failed && (
        <img
          src="/images/hero.jpg"
          alt="An Atlas fellow at work"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={
            loaded
              ? "absolute inset-0 h-full w-full object-cover"
              : "absolute inset-0 h-full w-full object-cover invisible"
          }
        />
      )}
    </div>
  );
}
