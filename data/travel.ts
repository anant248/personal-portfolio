export interface TravelPhoto {
  src: string;     // path under /public, e.g. "/photos/travel/calgary/yyc1.JPG"
  caption: string; // Caveat-font label on the polaroid
  rotate: number;  // rotation in degrees, e.g. -5 to 7
}

export interface TravelLocation {
  id: string;            // unique slug, e.g. "calgary"
  city: string;          // display name, e.g. "Calgary"
  country: string;       // e.g. "Canada"
  flag: string;          // emoji flag
  lat: number;           // decimal latitude
  lng: number;           // decimal longitude
  years?: string;        // e.g. "2022" or "2020–2022"
  caption: string;       // 1–2 sentences shown in modal
  photos: TravelPhoto[]; // actual photos from /public/photos/travel/[id]/
}

export const travelLocations: TravelLocation[] = [
  {
    id: "vadodara",
    city: "Vadodara",
    country: "India",
    flag: "🇮🇳",
    lat: 22.3072,
    lng: 73.1812,
    years: "2000–2010",
    caption: "Where it all started. Grew up here before moving to Canada — this is home away from home.",
    photos: [
      { src: "/photos/travel/vadodara/bdq1.jpeg", caption: "home 🏡",    rotate: -5 },
      { src: "/photos/travel/vadodara/bdq2.jpeg", caption: "best food ever",   rotate:  6 },
      { src: "/photos/travel/vadodara/bdq3.jpeg", caption: "historic",     rotate: -3 },
      { src: "/photos/travel/vadodara/bdq5.jpg",  caption: "memories",   rotate:  4 },
    ],
  },
  {
    id: "dhaka",
    city: "Dhaka",
    country: "Bangladesh",
    flag: "🇧🇩",
    lat: 23.8103,
    lng: 90.4125,
    years: "2007-2009",
    caption: "A short but memorable stay in Bangladesh. Piano lessons, skating classes and Sylhet sunsets.",
    photos: [
      { src: "/photos/travel/dhaka/dhaka1.jpg", caption: "skating 🛼",  rotate: -4 },
      { src: "/photos/travel/dhaka/dhaka2.jpg", caption: "piano performances", rotate:  5 },
      { src: "/photos/travel/dhaka/dhaka3.jpg", caption: "Dhaka days",   rotate: -2 },
    ],
  },
  {
    id: "calgary",
    city: "Calgary",
    country: "Canada",
    flag: "🇨🇦",
    lat: 51.0534,
    lng: -114.0625,
    years: "2010–2018",
    caption: "First stop in Canada. Rocky Mountain views on weekends, cold winters I never fully got used to.",
    photos: [
      { src: "/photos/travel/calgary/yyc1.JPG",  caption: "brrr 🥶", rotate:  5 },
      { src: "/photos/travel/calgary/yyc2.jpeg", caption: "mountains galore ⛰️",    rotate: -3 },
      { src: "/photos/travel/calgary/yyc3.jpg",  caption: "first grad 🎓",      rotate:  6 },
    ],
  },
  {
    id: "vancouver",
    city: "Vancouver",
    country: "Canada",
    flag: "🇨🇦",
    lat: 49.2496,
    lng: -123.1193,
    years: "2018–2023",
    caption: "Five years at UBC — engineering all-nighters, closest friends, and mountains meeting the ocean.",
    photos: [
      { src: "/photos/travel/vancouver/van1.jpg",  caption: "second grad 🎓",    rotate: -6 },
      { src: "/photos/travel/vancouver/van2.jpg",  caption: "kits beach",  rotate:  4 },
      { src: "/photos/travel/vancouver/van3.jpeg", caption: "2773 W 21st", rotate: -2 },
      { src: "/photos/travel/vancouver/van4.jpg",  caption: "cathedral grove, bc",  rotate:  5 },
    ],
  },
  {
    id: "toronto",
    city: "Toronto",
    country: "Canada",
    flag: "🇨🇦",
    lat: 43.6532,
    lng: -79.3832,
    years: "2023–2025",
    caption: "A lot of firsts here — first real job, first big-city apartment, first sports games and first solo trip.",
    photos: [
      { src: "/photos/travel/toronto/to1.jpg",   caption: "views",    rotate:  3 },
      { src: "/photos/travel/toronto/to2.JPG",   caption: "go leafs go 🍁", rotate: -5 },
      { src: "/photos/travel/toronto/to3.jpeg",  caption: "the 6ix", rotate:  6 },
      { src: "/photos/travel/toronto/to4.jpeg",  caption: "jurassic park", rotate: -3 },
    ],
  },
  {
    id: "urbana-champaign",
    city: "Urbana-Champaign",
    country: "USA",
    flag: "🇺🇸",
    lat: 40.1020,
    lng: -88.2272,
    years: "2025–present",
    caption: "Now at UIUC for my Master's in Computer Engineering. Corn fields, the quad in fall, and distributed systems.",
    photos: [
      { src: "/photos/travel/urbana-champaign/uc1.jpeg", caption: "late night study sessions",   rotate: -4 },
      { src: "/photos/travel/urbana-champaign/uc2.jpeg", caption: "fighting illini", rotate:  6 },
      { src: "/photos/travel/urbana-champaign/uc3.jpeg", caption: "homecoming",          rotate: -2 },
    ],
  },
];
