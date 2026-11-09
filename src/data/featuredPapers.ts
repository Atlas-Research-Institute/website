/**
 * Atlas papers: the "Research by Atlas students" section on the homepage AND
 * the paper list on /journal both render from this list. /journal shows every
 * paper; the homepage shows only those with featured: true.
 *
 * This is the one place to add, remove or edit a paper. PDFs live in
 * public/papers/. Titles, abstracts, author lists, dates and keywords are
 * copied word for word from the papers themselves; do not paraphrase them.
 * Newest first. See "Publishing a journal paper" in CLAUDE.md.
 *
 * Separate from the old Sheet-driven journal system (src/data/publications.ts
 * and the /journal/:slug route), which is unused and untouched by this list.
 */

export type FeaturedPaper = {
  slug: string;
  title: string;
  authors: string[];
  /** Short author line for the card, e.g. "Siddiqa Wassan and 6 co-authors". */
  authorsShort: string;
  /** Context line under the authors, e.g. "Summer 2026 Fellowship · Group paper". */
  context: string;
  date: string;
  abstract: string;
  keywords: string[];
  pdf: string;
  /** First page of the PDF, 900x1164, in public/papers/covers/. */
  cover: string;
  /** Shown in the homepage carousel. /journal shows every paper regardless. */
  featured: boolean;
};

export const FEATURED_PAPERS: FeaturedPaper[] = [
  {
    slug: "samarkand-private-tutoring",
    title:
      "Why Students in Samarkand Rely on Extra Classes: School Gaps, Tests, and Money Issues",
    authors: ["Sevinch Jaloliddinova"],
    authorsShort: "Sevinch Jaloliddinova",
    context: "Atlas Research Institute",
    date: "November 2026",
    abstract:
      "This paper investigates why high school students across the Samarkand region rely heavily on private tutoring (repetitor). While students spend 12 expected years in public school, the World Bank’s Human Capital Index identifies a harmonized test score of 474 out of 625, meaning students reach roughly 76 percent of an advanced international benchmark, translating to 9.1 Learning-Adjusted Years of Schooling (LAYS). An analysis of Khaydarov’s (2020) study of 109 graduating students and 24 face-to-face interviews with teachers, principals, and students across two selective academic lyceums in Samarkand shows that 95 percent take private tutoring because regular classrooms do not teach the rapid test-taking techniques and problem banks required by Bilim va Malakalarni Baholash Agentligi (BMBA) university entrance examinations, though this selective sample reflects high-track competition rather than a verified region-wide average. To measure this pressure, the study examines the official BMBA examination format: 90 multiple-choice questions spread across five subjects (three mandatory foundational subjects and two major specialization subjects) to be completed in 180 minutes (three full hours). Based on regional market tuition rates of 1,500,000 UZS per month for three exam subjects (500,000 UZS per subject), private prep acts as a regressive economic burden: it consumes roughly 6.3 percent of an upper-quintile urban household budget (23.95 million UZS), 14.7 percent of an average Samarkand regional household budget (10.20 million UZS), and 29.0 percent of a bottom-quintile rural farming household budget (5.17 million UZS), directly verified against official 2025 income quintiles and regional per capita accounts from the Statistics Agency of Uzbekistan. Drawing on an original directory census of commercial providers, the paper documents an infrastructure-adjusted geographic density gap of roughly 6-to-1 in centers per public secondary school, with 9.9 commercial tutoring centers per 10 schools in Samarkand city (102 centers across 103 public schools) compared to just 1.5 to 1.8 centers per 10 schools in Bulungur district (11 to 13 centers across 71 public schools), with zero commercial centers located in outer villages. Evaluating comparative international evidence from South Korea and Singapore, the paper cautions that private tutoring bans fail and that state-sponsored free broadcast lectures did not eliminate private tutoring expenditures in East Asia. The paper recommends immediate short-term relief through subsidized rural school-based prep clubs funded in partnership with non-profit foundations, drawing on South Korea’s after-school programs and Singapore’s low-fee self-help tutoring, and a national online platform paired with school study spaces, sequenced ahead of long-term structural alignment between BMBA exams and secondary school curricula.",
    keywords: [
      "private tutoring",
      "BMBA examinations",
      "Samarkand",
      "shadow education",
      "educational equity",
    ],
    pdf: "/papers/samarkand-private-tutoring.pdf",
    cover: "/papers/covers/samarkand-private-tutoring.webp",
    featured: true,
  },
  {
    slug: "greenville-teacher-retention",
    title:
      "Teacher Retention and End-of-Course Examination Outcomes: Evidence from Eight Greenville County, South Carolina, High Schools, 2022–23 to 2023–24",
    authors: [
      "Siddiqa Wassan",
      "Abenezer Girma Beyene",
      "Aigerim Amandykova",
      "Mahajabin Chowdhury",
      "Franciszek Grzyb",
      "Anya Penmetsa",
      "Aidana Seitova",
    ],
    authorsShort: "Siddiqa Wassan and 6 co-authors",
    context: "Atlas Research Institute",
    date: "November 2026",
    abstract:
      "This study asks how teacher-return rates and End-of-Course Examination Program (EOCEP) outcomes changed at eight Greenville County, South Carolina, high schools from 2022–23 to 2023–24. It uses school-level English II and Algebra I results from the South Carolina School Report Cards, measured as the percentage of students earning a C or higher, and compares each school’s change with the district and state. Title I status is treated as context rather than a direct measure of poverty. Results varied across schools and subjects. Berea and Southside improved relative to district change in both subjects. Carolina gained 9.8 points in English II but declined 0.3 points in Algebra I. Wade Hampton’s English II rate fell 1.9 points, while its Algebra I rate rose 0.8 points, 8.6 points behind the district’s 9.4-point gain. Teacher-return rates also varied, and the eight-school pattern does not support a simple one-to-one explanation of exam outcomes by retention. Across the eight schools, 2023–24 poverty percentages correlated with pass rates at r = −0.9647 for English II and r = −0.9556 for Algebra I, but because the schools fall into two distinct socioeconomic groups, these figures largely reflect the gap between those groups rather than a stable relationship across schools. The findings are descriptive, not causal. The clearest follow-up priority is a focused, supportive review of Wade Hampton’s Algebra I result, and district leaders should track retention alongside subject-level results rather than use retention as a stand-alone indicator.",
    keywords: [
      "teacher retention",
      "EOCEP",
      "student achievement",
      "Title I",
      "Greenville County",
    ],
    pdf: "/papers/greenville-teacher-retention.pdf",
    cover: "/papers/covers/greenville-teacher-retention.webp",
    featured: true,
  },
  {
    slug: "digital-access-stem-spain",
    title:
      "Digital Technology Access and STEM Learning in Spanish Secondary Education",
    authors: ["Nada Zagmouti"],
    authorsShort: "Nada Zagmouti",
    context: "Atlas Research Institute",
    date: "October 2026",
    abstract:
      "This paper examines how access to digital technology relates to STEM learning and education among secondary-school students in Spain. It combines official household ICT statistics from the Spanish National Statistics Institute (INE), findings from ICILS 2023, and four peer-reviewed studies using Spanish student and school data. In 2025, 97.4% of households with at least one member aged 16–74 had broadband access and 83.8% had some type of computer; these household figures do not guarantee that each student has reliable, individual access for schoolwork. In ICILS 2023, Spain scored 495 points in computer and information literacy, above the international participant average of 476 and the EU average of 493. However, 44.4% of Spanish students did not reach Level 2, and the socioeconomic performance gap was 69 points (below the EU gap of 79 points reported by INEE). Spanish studies also show that relationships between ICT use and outcomes vary by subject, with a positive association reported for science but not statistically significant effects for mathematics or reading in one PISA-based analysis. The evidence suggests that policy should combine equitable access with digital-skills development, meaningful educational use and attention to socioeconomic and regional differences.",
    keywords: [
      "digital divide",
      "digital access",
      "digital competence",
      "STEM education",
      "Spain",
    ],
    pdf: "/papers/digital-access-stem-spain.pdf",
    cover: "/papers/covers/digital-access-stem-spain.webp",
    featured: true,
  },
  {
    slug: "loneliness-after-spousal-loss",
    title: "Gender Differences in Loneliness Response after Spousal Loss",
    authors: ["Rithik Ramkumar"],
    authorsShort: "Rithik Ramkumar",
    context: "Atlas Research Institute",
    date: "May 2026",
    abstract:
      "Widowhood produces a sharp rise in loneliness for both men and women, but the paths diverge afterward. This paper reviews longitudinal, survey, and qualitative studies of older widowed adults in Europe, the United States, and China to ask why that divergence happens and what can be done about it. One year into widowhood, loneliness rises to roughly 40 percent among women and 50 percent among men, and the gap widens with time. The reviewed evidence points to two mechanisms: widows tend to use active, outward-facing coping and hold social ties independent of the marriage, while widowers tend to use avoidant coping and lose the social bridge their wife maintained. One intervention shows promise. A study of about five thousand widowed Chinese adults aged 40 to 60 found that online social participation raised social engagement and self-reported fulfillment among widowed men. That number means less than it looks like: the sample is one country, one age band, and digital literacy falls in exactly the older group whose isolation is deepest. The recommendation is therefore narrow. Bereavement services should treat online social participation as an early, age-targeted option for men in their fifties, not as a general remedy for widowers.",
    keywords: [
      "widowhood",
      "loneliness",
      "social isolation",
      "gender differences",
      "coping strategies",
    ],
    pdf: "/papers/loneliness-after-spousal-loss.pdf",
    cover: "/papers/covers/loneliness-after-spousal-loss.webp",
    featured: false,
  },
  {
    slug: "political-disinformation-polarization",
    title:
      "The Political Disinformation Epidemic: How Algorithms and Cable News Drive U.S. Polarization",
    authors: ["Hamaad Mahmood"],
    authorsShort: "Hamaad Mahmood",
    context: "Atlas Research Institute",
    date: "April 2026",
    abstract:
      "This paper asks how disinformation across different forms of media affects political polarization in the United States. It reviews twelve sources, including four peer-reviewed studies, one systematic review, and survey work from Pew Research Center and Brookings. Two mechanisms carry most of the effect. Social media algorithms rank content by engagement rather than accuracy, which is one reason false claims spread roughly six times faster than true ones on X, and which sorts users into filter bubbles that reinforce the claims they already hold. Cable news reaches the same end deliberately, through identity journalism that ties party to self-image; 64 percent of Americans now say democracy is in crisis, and the news sources the two parties trust barely overlap. The common thread is antidemocratic attitudes and partisan animosity, or AAPA: cross-partisan exposure backfires when the content carries high AAPA and reduces hostility when it does not. The paper recommends prebunking and K-12 digital literacy on the consumption side, and funding transparency for cable news plus algorithmic down-ranking of high-AAPA and bot-amplified content on the spread side. The evidence is correlational and drawn entirely from existing literature, so none of it establishes cause.",
    keywords: [
      "disinformation",
      "political polarization",
      "social media algorithms",
      "identity journalism",
      "digital literacy",
    ],
    pdf: "/papers/political-disinformation-polarization.pdf",
    cover: "/papers/covers/political-disinformation-polarization.webp",
    featured: false,
  },
];
