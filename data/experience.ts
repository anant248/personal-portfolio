export interface Experience {
  company: string;
  role: string;
  dates: string;
  bullets: string[];
  photo?: string;
}

export const experience: Experience[] = [
  {
    company: "Citi",
    role: "Software Engineer",
    dates: "July 2023 – Aug 2025",
    bullets: [
      "Built a money market funds trading application for Citi's Institutional Client Group, handling millions of dollars in trades daily.",
      "Developed key features such as bulk trade processing and financial controls reducing trade creation time and error rates. ",
      "Introduced extensive test coverage and test automation via JUnit and Selenium, surpassing 80% code coverage and directly reducing developer and QA time by 25%.",
    ],
    photo: "/photos/citi.jpg",
  },
  {
    company: "Picotera Electronics",
    role: "Software Engineer Intern",
    dates: "May 2022 – Aug 2022",
    bullets: [
      "Developed embedded firmware in C for smart communication devices used in pedestrian and vehicle safety systems, improving device reliability and emergency alert functionality.",
      "Built custom Android device management features including kiosk mode and application whitelisting using the Android Management API for customer-deployed devices.",
    ],
    photo: "/photos/exp2.jpg",
  },
  {
    company: "NETGEAR",
    role: "Software Test Engineer Intern",
    dates: "Jan 2021 – Aug 2021",
    bullets: [
      "Executed manual and automated testing across multiple LTE router and mobile hotspot product lines.",
      "Led early automation efforts for a newly released hotspot device by developing the first Python-based test scripts for validation workflows.",
    ],
    photo: "/photos/exp3.jpg",
  },
  {
    company: "IBM",
    role: "Test Automation Developer Intern",
    dates: "May 2020 – Dec 2020",
    bullets: [
      "Automated regression testing workflows using Selenium and JavaScript, significantly reducing repetitive manual testing efforts.",
      "Developed tooling to expand internationalization testing coverage across 20+ supported languages and localized environments.",
    ],
    photo: "/photos/exp4.jpg",
  },
];
