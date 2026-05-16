// Compiled context for the AI chatbot system prompt.
// Inlined at build time — no runtime data fetching needed.
// Keep under ~2,000 tokens for fast Gemini Flash responses.

export const resumeContext = `
ABOUT ANANT GOYAL
=================
Name: Anant Goyal
Current role: Masters student in Computer Engineering at the University of Illinois Urbana-Champaign (UIUC), started 2025.
Background: Grew up in Vadodara, India. Moved to Canada in 2010. Completed a BASc in Computer Engineering at the University of British Columbia (UBC), Vancouver, graduating in 2023.
Interests: Distributed systems, backend engineering, networking, reliabile infrastructure, AI-powered systems. Outside work: traveling, scuba diving, sports.
Contact: anantgoyal2000@gmail.com | github.com/anant248 | linkedin.com/in/anant-goyal1

EDUCATION
=========
- M.Eng Computer Engineering — University of Illinois Urbana-Champaign (UIUC), 2025–present
- B.A.Sc. Computer Engineering — University of British Columbia (UBC), Vancouver, 2018–2023

WORK EXPERIENCE
===============
1. Citi — Software Engineer (Full-time)
   Dates: July 2023 – August 2025
   - Built a money market funds trading application for Citi's Institutional Client Group, handling millions of dollars in trades daily.
   - Developed key features such as bulk trade processing and financial controls, reducing trade creation time and error rates.
   - Introduced extensive test coverage and test automation via JUnit and Selenium, surpassing 80% code coverage and reducing developer and QA time by 25%.

2. Picotera Electronics — Software Engineer Intern
   Dates: May 2022 – August 2022
   - Developed embedded firmware in C for smart communication devices used in pedestrian and vehicle safety systems.
   - Built custom Android device management features including kiosk mode and application whitelisting using the Android Management API.

3. NETGEAR — Software Test Engineer Intern
   Dates: January 2021 – August 2021
   - Executed manual and automated testing across multiple LTE router and mobile hotspot product lines.
   - Led early automation efforts for a newly released hotspot device by developing the first Python-based test scripts for validation workflows.

4. IBM — Test Automation Developer Intern
   Dates: May 2020 – December 2020
   - Automated regression testing workflows using Selenium and JavaScript, reducing repetitive manual testing efforts.
   - Expanded internationalization testing coverage across 20+ supported languages and localized environments.

PROJECTS
========
1. Electric Rainbow
   Description: An interactive music visualization system that transforms live guitar audio into synchronized abstract visual art in real time. Built as an engineering capstone at UBC.
   Stack: Electron, Node.js, JavaScript, Python, Raspberry Pi
   GitHub: github.com/anant248/electric-rainbow

2. Hybrid Distributed File System (HyDFS)
   Description: A fault-tolerant distributed file system and stream processing engine with replication and failure recovery mechanisms inspired by Hadoop and Apache Spark.
   Stack: Java, Hadoop, Apache Spark
   GitHub: github.com/anant248/hybrid-dfs

3. InterPrep
   Description: A real-time mock interview platform that analyzes non-verbal communication during behavioral interviews using live webcam input. Uses Google MediaPipe for eye contact and facial expression feedback.
   Stack: Next.js, TypeScript, Google MediaPipe, Computer Vision
   GitHub: github.com/anant248/neurohack | Live: neurohack25.vercel.app

4. XLG Inspector
   Description: A large-scale load generation inspection and benchmarking system for analyzing coordinated omission and latency reporting in modern load generators. Received a top paper nomination.
   Stack: Go, Distributed Systems, Benchmarking, Performance Engineering

5. PokerFace
   Description: An AI-powered multiplayer poker platform featuring autonomous agents capable of reasoning, bluffing, and interacting with human players in real time.
   Stack: Next.js, TypeScript, AI Agents, WebSockets
   Live: sv-frontend-ten.vercel.app

6. Ice Cap Growth
   Description: A computer vision pipeline for stabilizing rotating Earth imagery and segmenting Arctic ice regions using geometric transformations and image processing to analyze ice cap changes over time.
   Stack: Python, OpenCV, Computer Vision, Image Processing
   GitHub: github.com/anant248/ice-cap-growth

7. Personal Portfolio Website
   Description: This portfolio site — featuring interactive UI, animated project showcases, and a globe-based travel timeline.
   Stack: Next.js, TypeScript, Tailwind CSS, Framer Motion

SKILLS
======
Languages: Java (expert), Python (expert), TypeScript/JavaScript (proficient), C/C++ (proficient), SQL (proficient)
Frameworks: React, Next.js, Spring Boot, Node.js, Angular
Tools & Platforms: Git, Jira, Jenkins, Hadoop, Apache Spark, Selenium, OpenCV, Google MediaPipe, Snyk

PLACES LIVED
============
Vadodara, India → Dhaka, Bangladesh (brief) → Calgary, Canada → Vancouver, Canada (UBC) → Toronto, Canada (Citi) → Urbana-Champaign, USA (UIUC, current)
`.trim();
