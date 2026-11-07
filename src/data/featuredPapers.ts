/**
 * Papers shown in the "Research by Atlas students" section on the homepage.
 *
 * This is the one place to add, remove or edit a featured paper. PDFs live
 * in public/papers/. Abstracts and author lists are copied word for word
 * from the papers themselves; do not paraphrase them.
 *
 * Separate from the Atlas Journal (src/data/publications.ts), which is
 * untouched by this list.
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
};

export const FEATURED_PAPERS: FeaturedPaper[] = [
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
      "Anaya Penmetsa",
      "Aidana Seitova",
    ],
    authorsShort: "Siddiqa Wassan and 6 co-authors",
    context: "Summer 2026 Fellowship · Group paper",
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
  },
  {
    slug: "digital-access-stem-spain",
    title:
      "Digital Technology Access and STEM Learning in Spanish Secondary Education",
    authors: ["Nada Zagmouti"],
    authorsShort: "Nada Zagmouti",
    context: "Summer 2026 Fellowship · Individual paper",
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
  },
];
