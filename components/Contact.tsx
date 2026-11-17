import { PROFILE } from "@/lib/data";
import { DocIcon, GitHubIcon, LinkedInIcon, MailIcon } from "./Icons";

export default function Contact() {
  const links = [
    { href: `mailto:${PROFILE.email}`, t1: "POST /email", t2: PROFILE.email, icon: <MailIcon />, ext: false, ar: "↗" },
    { href: `https://www.linkedin.com/in/${PROFILE.linkedin}`, t1: "GET /linkedin", t2: PROFILE.linkedin, icon: <LinkedInIcon />, ext: true, ar: "↗" },
    { href: `https://github.com/${PROFILE.github}`, t1: "GET /github", t2: PROFILE.github, icon: <GitHubIcon />, ext: true, ar: "↗" },
    { href: PROFILE.phoneHref, t1: "CALL /phone", t2: PROFILE.phone, icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>, ext: false, ar: "↗" },
  ];
  return (
    <section id="contact">
      <div className="wrap">
        <div className="kick reveal"><span className="f">src / contact.ts</span><span className="n">// 06</span></div>
        <h2 className="reveal">Let&apos;s ship something.</h2>
        <p className="sub reveal">The fastest way to reach me is email. I reply within a day.</p>
        <div className="contact-g">
          <div className="code reveal">
            <div className="code-h"><DocIcon color="#60a5fa" />contact.ts<span className="r">TypeScript</span></div>
            <pre>
              <span className="ln"><span className="k">export const</span> <span className="pr">contact</span> = {"{"}</span>
              <span className="ln">  email: <span className="s">&quot;{PROFILE.email}&quot;</span>,</span>
              <span className="ln">  phone: <span className="s">&quot;{PROFILE.phone}&quot;</span>,</span>
              <span className="ln">  location: <span className="s">&quot;{PROFILE.location}&quot;</span>,</span>
              <span className="ln">  github: <span className="s">&quot;{PROFILE.github}&quot;</span>,</span>
              <span className="ln">  linkedin: <span className="s">&quot;{PROFILE.linkedin}&quot;</span>,</span>
              <span className="ln">{"}"} <span className="k">as const</span>;</span>
            </pre>
            <div className="code-f"><span><span className="ok">●</span> 0 problems</span><span>UTF-8</span></div>
          </div>
          <div className="links reveal">
            {links.map((l) => (
              <a key={l.t1} className="lk" href={l.href} {...(l.ext ? { target: "_blank", rel: "noopener" } : {})}>
                <span className="ic">{l.icon}</span>
                <span><div className="t1">{l.t1}</div><div className="t2">{l.t2}</div></span>
                <span className="ar">{l.ar}</span>
              </a>
            ))}
            <a className="lk" href="/resume.pdf" download="Abdullah_Akhtar_Resume.pdf">
              <span className="ic"><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 3v12m0 0-4-4m4 4 4-4M4 21h16" /></svg></span>
              <span><div className="t1">GET /resume.pdf</div><div className="t2">Download resume</div></span>
              <span className="ar">↓</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
