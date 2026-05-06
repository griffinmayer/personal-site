import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const NAVY = "#1a2744";
const GOLD = "#c9a84c";

const experience = [
  {
    title: "Private Wealth Analyst",
    company: "CIBC Wood Gundy",
    location: "Toronto, ON",
    period: "Sept 2025 – Dec 2025",
    bullets: [
      "Conducted fee standardization analysis across multiple advisory platforms to identify pricing inconsistencies and optimize client cost structures.",
      "Built Excel models to compare tiered fee schedules, optimize fees, and assess revenue impacts of proposed standardization.",
      "Supported rollout of standardized pricing frameworks by preparing data validation templates and assisting in advisor communications.",
    ],
  },
  {
    title: "Business Analyst",
    company: "CIBC",
    location: "Toronto, ON",
    period: "Jan 2025 – Apr 2025",
    bullets: [
      "Audited business rules and requirements for payment systems of 100+ companies.",
      "Built effective communication skills by adapting and responding quickly in high-stress environments.",
      "Mapped end-to-end payment processing flows and identified and resolved pain points.",
    ],
  },
  {
    title: "Waterfront Lifeguard",
    company: "City of Toronto",
    location: "Toronto, ON",
    period: "Jun 2021 – Aug 2024",
    bullets: [
      "Responsible for patron safety and surveillance; provided emergency first aid and coordinated with police and emergency services.",
      "Analyzed and reported on weekly attendance and incident data to track trends and improve operational strategies.",
      "Obtained certifications including Bronze Medal/Cross, Standard First Aid, and National Waterfront Lifeguard.",
    ],
  },
];

const education = [
  {
    school: "Rowe School of Business, Dalhousie University",
    location: "Halifax, NS",
    degree: "Honours Bachelor of Commerce & Co-op",
    details: ["Finance Major", "GPA: 3.34"],
    period: "Candidate 2027",
  },
  {
    school: "Malvern Collegiate Institute",
    location: "Toronto, ON",
    degree: "Ontario Secondary School Diploma",
    details: ["Honour Roll", "Student Council"],
    period: "2019 – 2023",
  },
];

const activities = [
  {
    title: "Student Representative",
    org: "Dalhousie Commerce Society (DCS)",
    location: "Halifax, NS",
    period: "Jan 2023 – Sept 2024",
    bullets: [
      "Contacted and built professional relationships with sponsors and businesses to fund DCS events.",
      "Successfully planned and hosted three events for Dalhousie students.",
      "Attended multiple networking events to grow professional network.",
    ],
  },
  {
    title: "General Member",
    org: "Dalhousie Investment Society (DALIS)",
    location: "Halifax, NS",
    period: "Jan 2023 – Present",
    bullets: [
      "Gained Bloomberg Terminal skills and Bloomberg Market Concepts certification.",
      "Learned portfolio management principles and investment strategies.",
      "Participated in investment research for group portfolios and weekly market news updates.",
    ],
  },
];

const skills = [
  "Public Speaking",
  "Microsoft Excel",
  "Bloomberg Terminal",
  "Investment Research & Analysis",
];
const interests = ["Personal Investment Portfolio", "Travel", "Fitness", "Outdoor Activities"];
const volunteer = ["Assistant Coach — Phoenix Volleyball", "Delivery Person — Beach Metro"];

const NAV_SECTIONS = ["Experience", "Education", "Activities", "Skills", "Contact"];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-16">
          <span className="font-bold text-sm tracking-widest uppercase" style={{ color: NAVY }}>
            Griffin Mayer
          </span>
          <div className="hidden sm:flex items-center gap-1">
            {NAV_SECTIONS.map((s) => (
              <Button key={s} asChild variant="ghost" size="sm">
                <a href={`#${s.toLowerCase()}`}>{s}</a>
              </Button>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="py-28 px-6" style={{ backgroundColor: NAVY }}>
        <div className="max-w-5xl mx-auto">
          <p
            className="text-xs font-bold uppercase tracking-[0.2em] mb-6"
            style={{ color: GOLD }}
          >
            Finance · Business · Investment
          </p>
          <h1 className="text-6xl sm:text-7xl font-bold tracking-tight text-white mb-6">
            Griffin Mayer
          </h1>
          <p className="text-lg leading-relaxed max-w-xl mb-10 text-slate-300">
            Finance student at Dalhousie University with hands-on experience in wealth
            management at CIBC Wood Gundy and business analysis at CIBC. Passionate about
            investment research and financial markets.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              asChild
              className="h-11 px-8 font-semibold hover:opacity-90 transition-opacity"
              style={{ backgroundColor: GOLD, color: NAVY }}
            >
              <a href="#contact">Get in Touch</a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-11 px-8 border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              <a
                href="https://www.linkedin.com/in/griffinrobertmayer"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn ↗
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="py-20 px-6 scroll-mt-16">
        <div className="max-w-5xl mx-auto">
          <SectionHeading>Employment Experience</SectionHeading>
          <div className="mt-10 space-y-5">
            {experience.map((job) => (
              <Card key={job.title + job.company}>
                <CardHeader>
                  <CardTitle className="text-base" style={{ color: NAVY }}>
                    {job.title}
                  </CardTitle>
                  <CardDescription className="font-medium" style={{ color: GOLD }}>
                    {job.company} · {job.location}
                  </CardDescription>
                  <CardAction>
                    <span className="text-xs text-muted-foreground">{job.period}</span>
                  </CardAction>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {job.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex gap-3 text-sm text-muted-foreground leading-relaxed"
                      >
                        <span className="mt-0.5 shrink-0" style={{ color: GOLD }}>
                          —
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" className="py-20 px-6 bg-muted/40 scroll-mt-16">
        <div className="max-w-5xl mx-auto">
          <SectionHeading>Education</SectionHeading>
          <div className="mt-10 grid sm:grid-cols-2 gap-5">
            {education.map((edu) => (
              <Card key={edu.school}>
                <CardHeader>
                  <CardTitle style={{ color: NAVY }}>{edu.school}</CardTitle>
                  <CardDescription className="font-medium" style={{ color: GOLD }}>
                    {edu.degree}
                  </CardDescription>
                  <CardAction>
                    <span className="text-xs text-muted-foreground">{edu.period}</span>
                  </CardAction>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1.5">
                    {edu.details.map((d) => (
                      <li
                        key={d}
                        className="flex gap-2 text-sm text-muted-foreground items-center"
                      >
                        <span style={{ color: GOLD }}>·</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ACTIVITIES */}
      <section id="activities" className="py-20 px-6 scroll-mt-16">
        <div className="max-w-5xl mx-auto">
          <SectionHeading>Extracurricular & Volunteer</SectionHeading>
          <div className="mt-10 space-y-5">
            {activities.map((a) => (
              <Card key={a.title + a.org}>
                <CardHeader>
                  <CardTitle className="text-base" style={{ color: NAVY }}>
                    {a.title}
                  </CardTitle>
                  <CardDescription className="font-medium" style={{ color: GOLD }}>
                    {a.org} · {a.location}
                  </CardDescription>
                  <CardAction>
                    <span className="text-xs text-muted-foreground">{a.period}</span>
                  </CardAction>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {a.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex gap-3 text-sm text-muted-foreground leading-relaxed"
                      >
                        <span className="mt-0.5 shrink-0" style={{ color: GOLD }}>
                          —
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="py-20 px-6 bg-muted/40 scroll-mt-16">
        <div className="max-w-5xl mx-auto">
          <SectionHeading>Skills & Interests</SectionHeading>
          <div className="mt-10 grid sm:grid-cols-3 gap-10">
            <div>
              <p
                className="text-xs font-bold uppercase tracking-widest mb-5"
                style={{ color: NAVY }}
              >
                Skills
              </p>
              <div className="flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span
                    key={s}
                    className="text-xs font-semibold px-3 py-1.5 rounded-full text-white"
                    style={{ backgroundColor: NAVY }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p
                className="text-xs font-bold uppercase tracking-widest mb-5"
                style={{ color: NAVY }}
              >
                Interests
              </p>
              <div className="flex flex-wrap gap-2">
                {interests.map((i) => (
                  <span
                    key={i}
                    className="text-xs font-medium px-3 py-1.5 rounded-full bg-muted text-muted-foreground"
                  >
                    {i}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p
                className="text-xs font-bold uppercase tracking-widest mb-5"
                style={{ color: NAVY }}
              >
                Volunteer
              </p>
              <ul className="space-y-2.5">
                {volunteer.map((v) => (
                  <li
                    key={v}
                    className="text-sm text-muted-foreground flex gap-2 items-start"
                  >
                    <span className="mt-0.5" style={{ color: GOLD }}>
                      ·
                    </span>
                    {v}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 px-6 scroll-mt-16" style={{ backgroundColor: NAVY }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: GOLD }}>
            ——
          </p>
          <h2 className="text-3xl font-bold text-white mb-4">Get in Touch</h2>
          <p className="text-sm leading-relaxed max-w-md mb-12 text-slate-400">
            Open to internship and co-op opportunities. Feel free to reach out directly.
          </p>
          <div className="grid sm:grid-cols-3 gap-8">
            <ContactItem label="Email" value="Griffin.mayer@bell.net" href="mailto:Griffin.mayer@bell.net" />
            <ContactItem label="Phone" value="(647) 782-2025" href="tel:6477822025" />
            <ContactItem
              label="LinkedIn"
              value="griffinrobertmayer"
              href="https://www.linkedin.com/in/griffinrobertmayer"
              external
            />
          </div>
          <p className="mt-20 text-xs text-slate-600">
            References available upon request · Toronto, Ontario
          </p>
        </div>
      </section>
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="w-8 h-0.5 mb-3 rounded-full" style={{ backgroundColor: GOLD }} />
      <h2 className="text-3xl font-bold" style={{ color: NAVY }}>
        {children}
      </h2>
    </div>
  );
}

function ContactItem({
  label,
  value,
  href,
  external,
}: {
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: GOLD }}>
        {label}
      </p>
      <Button
        asChild
        variant="link"
        className="h-auto p-0 text-sm text-white hover:text-white/70 hover:no-underline break-all"
      >
        <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {value}
        </a>
      </Button>
    </div>
  );
}
