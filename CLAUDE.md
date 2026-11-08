# Atlas website

## Publishing a journal paper

- Drop folder: `public/papers/`. Only final PDFs go here, never .docx files or drafts.
- Data file: `src/data/featuredPapers.ts`. Both the homepage carousel ("Research by Atlas students") and the paper list on /journal render from it.
- Covers: `public/papers/covers/`, one per paper.

When I say "add the new paper":

1. Find PDFs in `public/papers/` whose path (`/papers/<file>.pdf`) is not the `pdf` of any entry in `featuredPapers.ts`. If a file there is not a PDF, tell me and leave it alone.
2. Read each new PDF. Extract the title, authors, date, abstract and keywords from the paper itself, word for word. Do not paraphrase, shorten or fill in anything the paper does not say. If something is missing, ask me.
3. Make a cover image from page 1 at `public/papers/covers/<slug>.webp`, matching the existing covers: WebP, 900x1164 px. The slug is the PDF's filename without `.pdf`.
4. Add an entry to `FEATURED_PAPERS`, newest first, with every field filled the way the existing entries are: `slug`, `title`, `authors`, `authorsShort` ("First Author and N co-authors" when there are more than one), `context`, `date` (e.g. "November 2026"), `abstract`, `keywords`, `pdf`, `cover`, `featured`. New papers default to `featured: false` (shown on /journal, not in the homepage carousel) unless I say otherwise. If the `context` line (fellowship, group or individual paper) is not clear from the PDF, ask me.
5. Add a sitemap entry for the paper's page, `https://atlas-research.org/journal/papers/<slug>`, to `public/sitemap.xml` next to the other paper pages. The page itself and its SEO come from the data entry; no other file needs to change.
6. Show me the diff. Do not commit, push or deploy until I say so.

The homepage lays the featured papers out three across on desktop, so a fourth featured paper wraps to a new row there. If that happens, tell me.
