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
    slug: "offices-mental-health",
    title: "The Mental Health Epidemic: What Can Offices Do to Help?",
    authors: ["Hamaad Mahmood"],
    authorsShort: "Hamaad Mahmood",
    context: "Atlas Research Institute",
    date: "November 2026",
    abstract:
      "Depression costs the United States economy an estimated $210.5 billion a year, and workers report rising loneliness at the same time. Offices are where most people spend most of their waking hours, which makes the office a plausible place to intervene. This paper asks how offices can create community to improve mental health outcomes in the workplace. It is a review of existing research, not a new study: the evidence comes from peer-reviewed work in organizational behavior, occupational health and public health, from government and WHO reports, and from industry research. Three mechanisms recur across that literature. Physical space shapes interaction, though the direction is not obvious: one study of two firms found that moving to open-plan offices cut face-to-face interaction by about 70 percent, a figure drawn from only two companies and not safe to generalize. Informal interaction, from small talk to shared meals, builds the familiarity that formal collaboration does not. Workplace culture, set mostly by managers and by policy, determines whether those relationships are safe to form. The recommendation is that employers treat the three together: design soft spaces while protecting personal space, create recurring occasions for informal interaction, and hold managers accountable for psychological safety through written policy rather than individual goodwill.",
    keywords: [
      "workplace mental health",
      "belonging",
      "office design",
      "informal interaction",
      "psychological safety",
    ],
    pdf: "/papers/offices-mental-health.pdf",
    cover: "/papers/covers/offices-mental-health.webp",
    featured: false,
  },
  {
    slug: "adolescent-social-isolation",
    title:
      "Social Isolation in Adolescence: Its Effects on Relationship Building and Individual Function",
    authors: ["Jingxuan Nie"],
    authorsShort: "Jingxuan Nie",
    context: "Atlas Research Institute",
    date: "November 2026",
    abstract:
      "Social interaction is important during adolescence, as it affects how young people build relationships, regulate emotions, and function in daily life. This paper reviews peer-reviewed psychology and education research to ask how isolation affects those abilities and how the learning environment changes the effect. A lack of interaction may produce negative impacts on mental health, identity formation, and brain development, and poor social relationships are associated with a 29 percent increased risk of heart disease and a 32 percent increased risk of stroke, while around 75 percent of mental disorders begin before age 24. Isolation is divided into involuntary and voluntary forms. Involuntary isolation is driven by misinterpretation of others’ willingness to socialize and by the absence of a relationship strong enough to support self-disclosure, producing a cycle in which rejection reduces future disclosure. Voluntary solitude is associated with feeling less stressed and more self-connected, yet higher unsociability still correlates with peer exclusion, depression, and lower self-esteem. On environment, online learning sustains more emotional engagement than is commonly assumed and can support relationships where teachers facilitate interaction, but in-person learning remains stronger for teamwork and concentration. The paper concludes that in-person institutions should provide more time for students to interact and more extracurricular range. The findings are associational and several sources study college students rather than adolescents.",
    keywords: [
      "adolescence",
      "social isolation",
      "solitude",
      "learning environments",
      "relationship formation",
    ],
    pdf: "/papers/adolescent-social-isolation.pdf",
    cover: "/papers/covers/adolescent-social-isolation.webp",
    featured: false,
  },
  {
    slug: "campus-speech-policy",
    title: "Implementing Speech Restrictions on University Campuses",
    authors: ["Jingxuan Nie"],
    authorsShort: "Jingxuan Nie",
    context: "Atlas Research Institute",
    date: "November 2026",
    abstract:
      "This paper asks how universities should regulate speech given that both restricting and permitting it impose costs. It reviews legal opinion, academic philosophy, medical education research, and institutional reporting. Restrictions carry an educational cost: the United States Court of Appeals for the Eleventh Circuit, in Speech First, Inc. v. Cartwright, found that the chilling of speech harms a student separately from any enforcement action, meaning a policy can do damage without ever being applied. Permitting speech carries a cost as well, since research in Academic Medicine documents students withdrawing from classroom discussion after microaggressions, one reporting being deterred from speaking for fear of being rejected or shot down. Both outcomes are students who stop speaking, produced by opposite policies. Universities also face a financial constraint, because public institutions cannot impose additional security fees on student groups who invite controversial speakers without running afoul of the First Amendment, and past attempts have produced lawsuits costing upwards of $100,000. The paper argues that universities should adopt narrow, content-neutral policies that prohibit true threats, harassment, and incitement of illegal activity while protecting discussion and debate, and should address security costs through external donations and venue restriction. The supporting institutional evidence comes from a single survey at one residential house and does not settle the question.",
    keywords: [
      "campus speech",
      "First Amendment",
      "chilling effect",
      "content neutrality",
      "higher education policy",
    ],
    pdf: "/papers/campus-speech-policy.pdf",
    cover: "/papers/covers/campus-speech-policy.webp",
    featured: false,
  },
  {
    slug: "sustainable-infrastructure-developing-countries",
    title:
      "Utilization of Sustainable Infrastructure for Developing Countries",
    authors: ["Arnav Arora"],
    authorsShort: "Arnav Arora",
    context: "Atlas Research Institute",
    date: "November 2026",
    abstract:
      "This paper asks how developing countries can reliably expand essential infrastructure while keeping environmental consequences in mind. It reviews World Bank research, peer-reviewed urban sustainability work, and institutional cost analyses. Infrastructure is a vital accelerant of economic and social progress: a meta-analysis of 221 studies finds a positive and significant impact of infrastructure on development outcomes. Its environmental costs are equally documented. During the twentieth century roadkill surpassed hunting as the leading direct cause of vertebrate mortality on land, and while pavement covers less than 1 percent of United States land area, the road-effect zone reaches up to 20 percent, with roughly 25 million kilometres of new road projected by 2050. Sustainable infrastructure is presented as the alternative. Nature-based infrastructure in cities is on average 42 percent cheaper than grey infrastructure delivering the same services and generates 36 percent more value for society, though the cost figure holds only when the wider benefits of nature-based systems are counted rather than construction price alone. Sustainable infrastructure outperforms conventional infrastructure by over 20 percent under a net-zero scenario and by roughly 10 percent under limited climate action, against a global infrastructure investment gap of approximately $15 trillion by 2040. Two limitations are acknowledged: the cost research concentrates on particular regions, and sustainable development does not resolve the planning and corruption problems that weak governments face.",
    keywords: [
      "sustainable infrastructure",
      "developing countries",
      "nature-based solutions",
      "road ecology",
      "infrastructure finance",
    ],
    pdf: "/papers/sustainable-infrastructure-developing-countries.pdf",
    cover: "/papers/covers/sustainable-infrastructure-developing-countries.webp",
    featured: false,
  },
  {
    slug: "school-funding-teacher-layoffs",
    title:
      "Beginning of the End of K-12 Education? Funding Cuts, Layoff Policies, and the Widening Gap Between School Districts",
    authors: ["Rithik Ramkumar"],
    authorsShort: "Rithik Ramkumar",
    context: "Atlas Research Institute",
    date: "November 2026",
    abstract:
      "This paper examines how recent funding reductions and policy changes in public education are likely to distribute staffing losses across school districts. After COVID-19, the education system received $189.5 billion through Elementary and Secondary School Emergency Relief (ESSER) funds, which allowed districts to survive. Those funds have now expired. Project 2025 proposed eliminating the federal Department of Education and ending Title I funding over ten years, a change estimated to cost roughly 180,000 teaching positions and affect 2.8 million students. That elimination has not occurred: Congress has not abolished the Department, and the fiscal year 2026 spending package increased its funding, so those estimates describe a scenario rather than an outcome. What has occurred is a loss of about half the Department’s workforce since March 2025 and the transfer of program administration to other federal agencies. Data from the Great Recession indicate how funding instability lands. In Texas, high-poverty districts experienced an inequitable share of funding and staffing cuts, and equalizing funding across the poverty distribution would have cost $9.1 billion, a 16.7 percent increase. Last-in, first-out layoff policies deepen the pattern by dismissing the newest teachers first, who are concentrated in high-poverty schools. The paper recommends incorporating measures of teacher effectiveness into layoff decisions and sustaining federal funding rather than delivering it as expiring emergency aid. The evidence is observational and drawn from a different fiscal shock, so it establishes a pattern rather than a forecast.",
    keywords: [
      "school funding",
      "teacher layoffs",
      "LIFO policies",
      "Title I",
      "educational equity",
    ],
    pdf: "/papers/school-funding-teacher-layoffs.pdf",
    cover: "/papers/covers/school-funding-teacher-layoffs.webp",
    featured: false,
  },
  {
    slug: "religion-loneliness-connection",
    title:
      "When God Is the Only Friend: Belief in a Higher Power as Substitute and Supplement for Human Connection",
    authors: ["Salar Khan"],
    authorsShort: "Salar Khan",
    context: "Atlas Research Institute",
    date: "November 2026",
    abstract:
      "This paper asks whether belief in a higher power functions as a replacement or a supplement for human connection among lonely individuals, and how that affects well-being. It synthesizes survey research, peer-reviewed psychology, and ethnography. Social isolation carries documented health costs, and religion is one of the ways people respond to it. Two mechanisms are identified. The first is communal: frequent religious attendance is associated with more close friends and family available in a crisis, and adults who remain in the faith they were raised in report closer family relationships and lower chronic loneliness than those who leave. The second is relational and does not require a congregation: in three large national datasets, higher religiosity predicts a stronger sense of purpose specifically among adults with weak social ties, and ethnographic work finds that believers who conceive of God as a personal presence derive benefits resembling close friendship. The benefit is conditional on how God is perceived, with a supportive conception associated with better mental health and a punitive one with greater distress. Religion also produces isolation where individuals fall short of community standards or leave the faith. The paper concludes that belief operates as a replacement for the most isolated and a supplement for others, and recommends that loneliness interventions treat inclusive religious communities as social infrastructure while recognising that exclusion within them can deepen the isolation they are meant to address.",
    keywords: [
      "loneliness",
      "religiosity",
      "social connection",
      "purpose in life",
      "religious disaffiliation",
    ],
    pdf: "/papers/religion-loneliness-connection.pdf",
    cover: "/papers/covers/religion-loneliness-connection.webp",
    featured: false,
  },
  {
    slug: "hindsight-bias-false-nostalgia",
    title:
      "The Illusion of Predictability: How Hindsight Bias Shapes False Nostalgia and Distorts Memory of the Past",
    authors: ["Sai Monish Balaji"],
    authorsShort: "Sai Monish Balaji",
    context: "Atlas Research Institute",
    date: "November 2026",
    abstract:
      "This paper asks how hindsight bias contributes to false nostalgia, the belief that an earlier era was better than the present. It synthesizes cognitive psychology, memory research, and cultural commentary. Hindsight bias is the tendency, after learning an outcome, to adjust memory so the outcome appears to have been foreseeable. The RAFT model developed at the Max Planck Institute for Human Development explains the mechanism: feedback updates stored knowledge, and the updated knowledge is then used to reconstruct the original judgement, so the distortion is a by-product of an otherwise efficient memory system rather than a malfunction. Three findings follow. First, the distortion is social: memory is collective, and false recollections spread through social contagion, which allows individual error to become shared historical narrative. Second, the effect is unevenly distributed, varying with age, mood, recall ability, and culture, with one study finding stronger hindsight bias among participants reasoning dialectically than among those reasoning by rule. Third, the consequences cut both ways: hindsight bias reduces regret and supports learning from experience, but in excess produces overconfidence in prediction. The paper recommends decision journals and deliberate exposure to conflicting perspectives. Its evidence is associational, and the cross-cultural finding rests on a single study.",
    keywords: [
      "hindsight bias",
      "false nostalgia",
      "memory distortion",
      "overconfidence",
      "collective memory",
    ],
    pdf: "/papers/hindsight-bias-false-nostalgia.pdf",
    cover: "/papers/covers/hindsight-bias-false-nostalgia.webp",
    featured: false,
  },
  {
    slug: "housing-affordability-homelessness",
    title:
      "Priced Out: How the Shortage of Affordable Housing Drives Homelessness in the United States",
    authors: ["Sai Monish Balaji"],
    authorsShort: "Sai Monish Balaji",
    context: "Atlas Research Institute",
    date: "November 2026",
    abstract:
      "This paper asks how the shortage of affordable housing contributes to homelessness in the United States. It synthesizes federal count data, policy research, and reporting. On a single night in 2024, 771,480 people were experiencing homelessness, an 18 percent increase over 2023 and the highest figure on record. Families with children rose 39 percent, while veteran homelessness fell 8 percent, a divergence indicating that targeted policy can move the number even as the total rises. Three drivers are examined. Economically, roughly 11 million households spend at least half their income on housing, and high construction costs, restrictive zoning, and limited public investment have constrained supply while wages have not kept pace. Structurally, Black Americans are substantially overrepresented among people experiencing homelessness relative to their share of the population, a disparity traceable to redlining and to zoning that concentrates affordable development away from wealthier areas. In policy, the Department of Justice has alleged that major landlords coordinated rent-setting through shared pricing algorithms. The National Low Income Housing Coalition estimates the shortage costs the economy about $2 trillion a year and that growth from 1964 to 2009 would have been 13.5 percent higher with better housing access; that estimate derives from an earlier working-paper version of its underlying study, and the published version frames the effect differently, so it should be read as indicative. The paper recommends zoning reform, sustained rather than episodic federal funding, and enforcement against coordinated rent-setting.",
    keywords: [
      "homelessness",
      "housing affordability",
      "zoning reform",
      "rent algorithms",
      "housing policy",
    ],
    pdf: "/papers/housing-affordability-homelessness.pdf",
    cover: "/papers/covers/housing-affordability-homelessness.webp",
    featured: false,
  },
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
