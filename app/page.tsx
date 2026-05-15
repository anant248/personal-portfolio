import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import RecordPlayer from "@/components/RecordPlayer";
import BackToTop from "@/components/BackToTop";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="relative pt-16">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <RecordPlayer />
      <BackToTop />
    </>
  );
}
