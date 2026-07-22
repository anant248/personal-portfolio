export interface Education {
  school: string;
  short?: string;
  degree: string;
  dates: string;
  location?: string;
  bullets: string[];
  photo?: string;
  logo?: string;
  logoClass?: string; // Tailwind height class for the logo (default h-12)
}

export const education: Education[] = [
  {
    school: "University of Illinois Urbana-Champaign",
    short: "chambana winters",
    degree: "M.Eng Computer Engineering",
    dates: "2025 – Present",
    location: "Urbana-Champaign, IL 🇺🇸",
    bullets: [
      "Distributed Systems, Real-World Algorithms for IoT, Communication Networks, Artificial Intelligence, Computer Vision, and more",
      "Technical member of Neurotech @ UIUC",
      "HackIllinois, NeuroHack"
    ],
    photo: "/photos/uiuc.jpg",
    logo: "/photos/education/uiuc-logo.png",
  },
  {
    school: "The University of British Columbia",
    short: "design and innovation day",
    degree: "B.A.Sc. Integrated Engineering",
    dates: "2018 – 2023",
    location: "Vancouver, BC 🇨🇦",
    bullets: [
      "Concentration in Computer Engineering",
      "Software Design, System Software Engineering, AI and Machine Learning Applications",
      "nwHacks, BizTech"
    ],
    photo: "/photos/ubc.jpg",
    logo: "/photos/education/ubc-logo.png",
    logoClass: "h-18",
  },
];
