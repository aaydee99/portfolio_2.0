import Shell from "@/components/Shell";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import About from "@/components/About";
import Stack from "@/components/Stack";
import Work from "@/components/Work";
import Experience from "@/components/Experience";
import Terminal from "@/components/Terminal";
import Contact from "@/components/Contact";
import { PROFILE } from "@/lib/data";

export default function Page() {
  return (
    <Shell>
      <Hero />
      <Ticker />
      <About />
      <Stack />
      <Work />
      <Experience />
      <Terminal />
      <Contact />
      <footer>
        <span>© {new Date().getFullYear()} {PROFILE.first} {PROFILE.last} · {PROFILE.location}</span>
        <span>built with Next.js &amp; a little canvas</span>
      </footer>
    </Shell>
  );
}
