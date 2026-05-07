export const NAV_SECTIONS = ['Experience', 'Education', 'Activities', 'Skills', 'Contact'] as const;

export const experience = [
  {
    title: 'Private Wealth Analyst',
    company: 'CIBC Wood Gundy',
    location: 'Toronto, ON',
    period: 'Sept 2025 – Dec 2025',
    bullets: [
      'Conducted fee standardization analysis across multiple advisory platforms to identify pricing inconsistencies and optimize client cost structures.',
      'Built Excel models to compare tiered fee schedules, optimize fees, and assess revenue impacts of proposed standardization.',
      'Supported rollout of standardized pricing frameworks by preparing data validation templates and assisting in advisor communications.',
    ],
  },
  {
    title: 'Business Analyst',
    company: 'CIBC',
    location: 'Toronto, ON',
    period: 'Jan 2025 – Apr 2025',
    bullets: [
      'Audited business rules and requirements for payment systems of 100+ companies.',
      'Built effective communication skills by adapting and responding quickly in high-stress environments.',
      'Mapped end-to-end payment processing flows and identified and resolved pain points.',
    ],
  },
  {
    title: 'Waterfront Lifeguard',
    company: 'City of Toronto',
    location: 'Toronto, ON',
    period: 'Jun 2021 – Aug 2024',
    bullets: [
      'Responsible for patron safety and surveillance; provided emergency first aid and coordinated with police and emergency services.',
      'Analyzed and reported on weekly attendance and incident data to track trends and improve operational strategies.',
      'Obtained certifications including Bronze Medal/Cross, Standard First Aid, and National Waterfront Lifeguard.',
    ],
  },
] as const;

export const education = [
  {
    school: 'Rowe School of Business, Dalhousie University',
    location: 'Halifax, NS',
    degree: 'Honours Bachelor of Commerce & Co-op',
    details: ['Finance Major', 'GPA: 3.34'],
    period: 'Candidate 2027',
  },
  {
    school: 'Malvern Collegiate Institute',
    location: 'Toronto, ON',
    degree: 'Ontario Secondary School Diploma',
    details: ['Honour Roll', 'Student Council'],
    period: '2019 – 2023',
  },
] as const;

export const activities = [
  {
    title: 'Student Representative',
    org: 'Dalhousie Commerce Society (DCS)',
    location: 'Halifax, NS',
    period: 'Jan 2023 – Sept 2024',
    bullets: [
      'Contacted and built professional relationships with sponsors and businesses to fund DCS events.',
      'Successfully planned and hosted three events for Dalhousie students.',
      'Attended multiple networking events to grow professional network.',
    ],
  },
  {
    title: 'General Member',
    org: 'Dalhousie Investment Society (DALIS)',
    location: 'Halifax, NS',
    period: 'Jan 2023 – Present',
    bullets: [
      'Gained Bloomberg Terminal skills and Bloomberg Market Concepts certification.',
      'Learned portfolio management principles and investment strategies.',
      'Participated in investment research for group portfolios and weekly market news updates.',
    ],
  },
] as const;

export const skills = [
  'Public Speaking',
  'Microsoft Excel',
  'Bloomberg Terminal',
  'Investment Research & Analysis',
] as const;

export const interests = [
  'Personal Investment Portfolio',
  'Travel',
  'Fitness',
  'Outdoor Activities',
] as const;

export const volunteer = [
  'Assistant Coach — Phoenix Volleyball',
  'Delivery Person — Beach Metro',
] as const;
