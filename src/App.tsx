import { type ChangeEvent, type FormEvent, type ReactNode, useEffect, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Copy,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Menu,
  Phone,
  Plus,
  Terminal,
  Upload,
  X,
} from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  Link,
  Route,
  Router as WouterRouter,
  Switch,
  useLocation,
} from 'wouter';

const queryClient = new QueryClient();

type Project = {
  id: string;
  title: string;
  description: string;
  url?: string;
  tags: string[];
};

/**
 * EDIT CONTENT HERE
 * Keeping the studio's copy in one place makes this portfolio easy to hand off
 * or connect to a project CMS later.
 */
const portfolioContent = {
  person: {
    name: 'Masayekh Ahammed',
    shortName: 'MA',
    role: 'Full-stack developer / student',
    location: 'Dhaka, Bangladesh',
    email: 'masayekhahammed@gmail.com',
    phone: '+880 1764 364 070',
  },
  navigation: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Projects', href: '/projects' },
  ],
  socials: [
    { label: 'GitHub', value: 'github.com/MDMasayekh-Dev', href: 'https://github.com/MDMasayekh-Dev', icon: Github },
    { label: 'LinkedIn', value: 'linkedin.com/in/masayekh-ahammed-akhshad-787a23183', href: 'https://linkedin.com/in/masayekh-ahammed-akhshad-787a23183', icon: Linkedin },
  ],
  services: [
    {
      index: '01',
      title: 'Interface systems',
      description: 'Responsive frontends with a clear point of view, useful motion, and a care for the small screen.',
    },
    {
      index: '02',
      title: 'Full-stack builds',
      description: 'Thoughtful product foundations that connect a calm user experience to dependable logic underneath.',
    },
    {
      index: '03',
      title: 'AI-assisted craft',
      description: 'Fast exploration and sharper execution through intentional prompting, prototyping, and review.',
    },
  ],
  skills: [
    'HTML5',
    'CSS',
    'Bootstrap CSS',
    'Tailwind CSS',
    'JavaScript',
    'React.js',
    'Next.js',
    'AI prompting',
  ],
  timeline: [
    {
      date: 'NOW',
      title: 'Full-Stack Development',
      place: 'CreativeIT institute',
      description: 'Currently deepening the loop from polished UI to APIs, databases, and production-minded web applications.',
      meta: 'Course · In progress',
    },
    {
      date: '2023 — 24',
      title: 'Web development foundation',
      place: 'CreativeIT institute',
      description: 'Built a practical foundation in the browser: semantic markup, responsive systems, JavaScript, and component thinking.',
      meta: 'Institute · Completed',
    },
    {
      date: 'EDUCATION',
      title: 'National University',
      place: 'Bangladesh',
      description: 'A broad academic chapter that continues to shape how I learn, communicate, and approach complex problems.',
      meta: 'Academic journey',
    },
  ],
};

const initialProjects: Project[] = [];

function Reveal({
  children,
  className = '',
  delay = '',
}: {
  children: ReactNode;
  className?: string;
  delay?: string;
}) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || !('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.14 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <div className={`reveal ${visible ? 'is-visible' : ''} ${delay} ${className}`} ref={elementRef}>{children}</div>;
}

function SiteHeader() {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <header className="container-studio site-header">
      <Link href="/" className="brand-mark" data-testid="link-brand">
        <span className="brand-symbol" aria-hidden="true">/ /</span>
        <span className="brand-name"><strong>{portfolioContent.person.shortName}</strong> / digital studio</span>
      </Link>

      <nav className="nav-links" aria-label="Primary navigation">
        {portfolioContent.navigation.map((item) => (
          <Link
            href={item.href}
            className="nav-link"
            aria-current={location === item.href ? 'page' : undefined}
            data-testid={`link-nav-${item.label.toLowerCase()}`}
            key={item.href}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <Link href="/contact" className="header-contact" data-testid="link-header-contact">
        Start a conversation <ArrowUpRight size={14} strokeWidth={1.6} />
      </Link>

      <button
        aria-expanded={menuOpen}
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        className="mobile-menu-button"
        data-testid="button-mobile-menu"
        onClick={() => setMenuOpen((current) => !current)}
        type="button"
      >
        {menuOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      <div className={`mobile-panel ${menuOpen ? 'open' : ''}`}>
        {portfolioContent.navigation.map((item) => (
          <Link
            href={item.href}
            className="nav-link"
            aria-current={location === item.href ? 'page' : undefined}
            data-testid={`link-mobile-nav-${item.label.toLowerCase()}`}
            key={`mobile-${item.href}`}
          >
            {item.label}
          </Link>
        ))}
        <Link href="/contact" className="nav-link" data-testid="link-mobile-nav-contact">
          Contact <ArrowUpRight size={14} />
        </Link>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container-studio footer-inner">
        <span className="footer-copy" data-testid="text-footer-copy">
          © {new Date().getFullYear()} {portfolioContent.person.name} / built in public
        </span>
        <span className="footer-note">available for thoughtful work</span>
      </div>
    </footer>
  );
}

function PageFrame({ children }: { children: ReactNode }) {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  return (
    <div className="studio-shell">
      <SiteHeader />
      <main className="route-fade" key={location}>{children}</main>
      <Footer />
    </div>
  );
}

function Ticker() {
  const items = ['thoughtful interfaces', 'full-stack builds', 'responsive by default', 'curious by nature'];
  return (
    <div className="ticker" aria-label="Studio capabilities">
      <div className="ticker-track">
        {[...items, ...items].map((item, index) => (
          <span key={`${item}-${index}`}>{item} +</span>
        ))}
      </div>
    </div>
  );
}

function OrbitArt() {
  return (
    <div className="orbit-art" aria-label="Abstract MA studio mark" role="img">
      <span className="orbit-dot" />
      <div className="orbit-core">{portfolioContent.person.shortName}</div>
      <span className="orbit-label">ideas → interface</span>
    </div>
  );
}

function HomePage() {
  return (
    <>
      <section className="container-studio hero">
        <div className="hero-grid">
          <div className="hero-copy">
            <Reveal><div className="eyebrow">Independent digital studio · 01 / 04</div></Reveal>
            <Reveal delay="reveal-delay-1">
              <h1 className="display-type hero-title" data-testid="text-home-title">
                Ideas into
                <span className="accent-word">interfaces<span className="outline-word">.</span></span>
              </h1>
            </Reveal>
            <Reveal delay="reveal-delay-2">
              <p className="hero-summary">
                I&apos;m <strong className="name-emphasis">{portfolioContent.person.name}</strong>, a {portfolioContent.person.role.toLowerCase()} making the web feel a little more considered.
              </p>
            </Reveal>
            <Reveal delay="reveal-delay-3">
              <div className="hero-actions">
                <Link href="/projects" className="button-primary" data-testid="link-home-projects">
                  Enter the work <ArrowRight size={15} />
                </Link>
                <Link href="/about" className="button-quiet" data-testid="link-home-about">
                  Read the story <ChevronRight size={15} />
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal className="hero-aside" delay="reveal-delay-2">
            <OrbitArt />
            <div className="eyebrow">Currently exploring</div>
            <p>Where strong systems meet warm, human details. Based in {portfolioContent.person.location}.</p>
          </Reveal>
        </div>
      </section>

      <Ticker />

      <section className="container-studio section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">What I bring</div>
            <h2 className="section-title">A small studio<br />with range.</h2>
          </div>
          <p className="section-note">No templates. No filler. Just useful digital work with a point of view.</p>
        </div>
        <div className="services-grid">
          {portfolioContent.services.map((service, index) => (
            <Reveal delay={`reveal-delay-${index + 1}`} key={service.index}>
              <article className="service-card" data-testid={`card-service-${service.index}`}>
                <span className="service-index">{service.index} / 03</span>
                <ArrowUpRight className="service-arrow" size={19} strokeWidth={1.5} />
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-studio">
        <div className="manifesto">
          <h2>Make it <span>clear.</span><br />Make it last.</h2>
          <p className="manifesto-body">
            The best web experiences don&apos;t ask for attention — they <strong>earn trust</strong>. I care about the structure, the sentence, the loading state, and the quiet moment when everything clicks.
          </p>
        </div>
        <div className="skills-band">
          <div>
            <div className="eyebrow">The toolkit</div>
            <p className="section-note" style={{ marginTop: 16 }}>A growing set of tools for turning a rough thought into a real thing.</p>
          </div>
          <div className="skill-list">
            {portfolioContent.skills.map((skill) => (
              <span className="skill-chip" data-testid={`chip-skill-${skill.toLowerCase().replaceAll(' ', '-')}`} key={skill}>{skill}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="container-studio section" style={{ paddingBottom: 112 }}>
        <div className="section-heading">
          <div>
            <div className="eyebrow">Next step</div>
            <h2 className="section-title">Let&apos;s make<br /><span style={{ color: 'hsl(var(--accent))' }}>something real.</span></h2>
          </div>
          <Link href="/contact" className="button-primary" data-testid="link-home-contact">
            Say hello <ArrowUpRight size={15} />
          </Link>
        </div>
      </section>
    </>
  );
}

function PageIntro({
  label,
  title,
  accent,
  copy,
}: {
  label: string;
  title: string;
  accent?: string;
  copy: string;
}) {
  return (
    <section className="container-studio page-intro">
      <Reveal><div className="eyebrow">{label}</div></Reveal>
      <Reveal delay="reveal-delay-1">
        <h1 className="page-title" data-testid={`text-page-title-${label.toLowerCase().replaceAll(' ', '-')}`}>
          {title} {accent && <span className="accent">{accent}</span>}
        </h1>
      </Reveal>
      <Reveal delay="reveal-delay-2"><p className="page-intro-copy">{copy}</p></Reveal>
    </section>
  );
}

function AboutPage() {
  return (
    <>
      <PageIntro
        label="About the maker · 02 / 04"
        title="Still learning."
        accent="Already building."
        copy="I’m building a practice around curiosity, clarity, and the belief that a student mindset is a professional advantage."
      />
      <section className="container-studio">
        <div className="story-grid">
          <Reveal className="story-side">
            <div className="eyebrow">The throughline</div>
            <h2>Learn wide.<br />Build specific.</h2>
            <p>Every chapter adds a new lens — from academic discipline to visual systems and the mechanics of the modern web.</p>
          </Reveal>
          <div className="timeline" aria-label="Education and experience timeline">
            {portfolioContent.timeline.map((item, index) => (
              <Reveal delay={`reveal-delay-${index + 1}`} key={item.title}>
                <article className="timeline-item" data-testid={`timeline-item-${index}`}>
                  <span className="timeline-date">{item.date}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <div className="timeline-meta">{item.place} · {item.meta}</div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="skills-showcase">
          <div className="section-heading">
            <div>
              <div className="eyebrow">Working knowledge</div>
              <h2 className="section-title">The working<br />vocabulary.</h2>
            </div>
            <p className="section-note">Tools are only useful when they help the idea become more itself.</p>
          </div>
          <div className="skill-matrix">
            {portfolioContent.skills.map((skill, index) => (
              <div className="matrix-item" data-testid={`matrix-skill-${index}`} key={skill}>
                <span>0{index + 1}</span>
                <strong>{skill}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="container-studio section" style={{ paddingBottom: 106 }}>
        <div className="manifesto">
          <h2>Good work is<br /><span>a conversation.</span></h2>
          <p className="manifesto-body">Bring me the question behind the brief. The sharper the question, the more interesting the thing we can make together.</p>
        </div>
      </section>
    </>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card" data-testid={`card-project-${project.id}`}>
      <span className="eyebrow">Project / {project.id.slice(-3)}</span>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="project-tags">
        {project.tags.map((tag) => <span className="project-tag" key={tag}>#{tag}</span>)}
      </div>
      {project.url && (
        <a className="button-quiet" href={project.url} target="_blank" rel="noreferrer" style={{ marginTop: 22 }} data-testid={`link-project-${project.id}`}>
          View project <ExternalLink size={14} />
        </a>
      )}
    </article>
  );
}

function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [adding, setAdding] = useState(false);
  const [status, setStatus] = useState('');
  const [draft, setDraft] = useState({ title: '', description: '', url: '', tags: '' });

  function addProject() {
    if (!draft.title.trim() || !draft.description.trim()) {
      setStatus('A title and a short description are needed.');
      return;
    }
    const project: Project = {
      id: String(Date.now()),
      title: draft.title.trim(),
      description: draft.description.trim(),
      url: draft.url.trim() || undefined,
      tags: draft.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
    };
    setProjects((current) => [...current, project]);
    setDraft({ title: '', description: '', url: '', tags: '' });
    setAdding(false);
    setStatus('Project added to the local vault.');
  }

  function importProjects(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as Project[];
        if (!Array.isArray(parsed)) throw new Error('Invalid project list');
        const validProjects = parsed.filter((project) => project.title && project.description).map((project, index) => ({
          ...project,
          id: project.id || `${Date.now()}-${index}`,
          tags: Array.isArray(project.tags) ? project.tags : [],
        }));
        setProjects((current) => [...current, ...validProjects]);
        setStatus(`${validProjects.length} project${validProjects.length === 1 ? '' : 's'} imported.`);
      } catch {
        setStatus('Could not read that file. Use a JSON array of projects.');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  }

  return (
    <>
      <PageIntro
        label="Selected work · 03 / 04"
        title="The project"
        accent="vault."
        copy="A living shelf for shipped experiments, client work, and ideas that made it past the sketchbook. The first pieces are on their way."
      />
      <section className="container-studio section" style={{ paddingTop: 78 }}>
        <div className="vault-header section-heading" style={{ marginBottom: 28 }}>
          <div>
            <div className="eyebrow">Collection / local</div>
            <h2 className="section-title">Work in progress.</h2>
          </div>
          <span className="vault-count" data-testid="text-project-count">{projects.length.toString().padStart(2, '0')} entries</span>
        </div>

        {projects.length === 0 ? (
          <div className="project-vault" data-testid="empty-project-vault">
            <div className="vault-empty">
              <div className="vault-icon"><Terminal size={19} /></div>
              <h2>The vault is intentionally open.</h2>
              <p>Completed work will live here as it ships. Add a project manually or import a JSON collection when the time is right.</p>
              <div className="hero-actions" style={{ justifyContent: 'center' }}>
                <button className="button-primary" data-testid="button-add-project" onClick={() => setAdding(true)} type="button">
                  <Plus size={15} /> Add a project
                </button>
                <label className="button-quiet" data-testid="label-import-projects">
                  <Upload size={15} /> Import JSON
                  <input accept="application/json,.json" hidden onChange={importProjects} type="file" />
                </label>
              </div>
            </div>
          </div>
        ) : (
          <div className="project-list">
            {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
          </div>
        )}

        {projects.length > 0 && (
          <div className="form-actions">
            <button className="button-primary" data-testid="button-add-another-project" onClick={() => setAdding(true)} type="button">
              <Plus size={15} /> Add another
            </button>
            <label className="button-quiet" data-testid="label-import-more-projects">
              <Upload size={15} /> Import JSON
              <input accept="application/json,.json" hidden onChange={importProjects} type="file" />
            </label>
          </div>
        )}

        {adding && (
          <div className="add-project-form" data-testid="form-add-project">
            <h2>Add to the vault.</h2>
            <p className="form-caption">This is stored in the current browser session only — ready to be replaced by real project data later.</p>
            <div className="project-form-grid">
              <div>
                <label className="field-label" htmlFor="project-title">Project title</label>
                <input className="input-studio" data-testid="input-project-title" id="project-title" onChange={(event) => setDraft({ ...draft, title: event.target.value })} placeholder="A considered web thing" value={draft.title} />
              </div>
              <div>
                <label className="field-label" htmlFor="project-url">Live URL (optional)</label>
                <input className="input-studio" data-testid="input-project-url" id="project-url" onChange={(event) => setDraft({ ...draft, url: event.target.value })} placeholder="https://..." value={draft.url} />
              </div>
            </div>
            <div style={{ marginTop: 14 }}>
              <label className="field-label" htmlFor="project-description">Short description</label>
              <textarea className="textarea-studio" data-testid="input-project-description" id="project-description" onChange={(event) => setDraft({ ...draft, description: event.target.value })} placeholder="What did this make possible?" value={draft.description} />
            </div>
            <div style={{ marginTop: 14 }}>
              <label className="field-label" htmlFor="project-tags">Tags, separated by commas</label>
              <input className="input-studio" data-testid="input-project-tags" id="project-tags" onChange={(event) => setDraft({ ...draft, tags: event.target.value })} placeholder="React, interaction, web" value={draft.tags} />
            </div>
            <div className="form-actions">
              <button className="button-primary" data-testid="button-save-project" onClick={addProject} type="button">Save project <Check size={14} /></button>
              <button className="button-quiet" data-testid="button-cancel-project" onClick={() => { setAdding(false); setStatus(''); }} type="button">Cancel</button>
              {status && <span className="form-status" data-testid="status-project-form">{status}</span>}
            </div>
          </div>
        )}
        {!adding && status && <p className="form-status" data-testid="status-projects" style={{ marginTop: 18 }}>{status}</p>}
      </section>
    </>
  );
}

function CopyEmailButton() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(portfolioContent.person.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button className="button-quiet" data-testid="button-copy-email" onClick={copyEmail} type="button">
      {copied ? <Check size={15} /> : <Copy size={15} />}
      {copied ? 'Email copied' : 'Copy email'}
    </button>
  );
}

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setSent(true);
    const subject = encodeURIComponent(`Hello from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\nReply to: ${form.email}`);
    window.location.href = `mailto:${portfolioContent.person.email}?subject=${subject}&body=${body}`;
  }

  return (
    <>
      <PageIntro
        label="Contact · 04 / 04"
        title="Bring a good"
        accent="question."
        copy="Have an idea that deserves a little room to grow? Tell me what you’re thinking. The reply starts in your own mail app."
      />
      <section className="container-studio section" style={{ paddingTop: 78 }}>
        <div className="contact-grid">
          <Reveal className="contact-form-wrap">
            <div className="eyebrow">Open channel</div>
            <h2>Start with the rough version.</h2>
            <p>No polished brief required. A little context is enough to begin a useful conversation.</p>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div>
                <label className="field-label" htmlFor="contact-name">Your name</label>
                <input className="input-studio" data-testid="input-contact-name" id="contact-name" onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="How should I address you?" required value={form.name} />
              </div>
              <div>
                <label className="field-label" htmlFor="contact-email">Email address</label>
                <input className="input-studio" data-testid="input-contact-email" id="contact-email" onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="you@somewhere.com" required type="email" value={form.email} />
              </div>
              <div>
                <label className="field-label" htmlFor="contact-message">The question</label>
                <textarea className="textarea-studio" data-testid="input-contact-message" id="contact-message" onChange={(event) => setForm({ ...form, message: event.target.value })} placeholder="What are we making, fixing, or figuring out?" required value={form.message} />
              </div>
              <button className="button-primary" data-testid="button-send-message" type="submit">
                {sent ? 'Opening your mail app' : 'Prepare the message'} <ArrowUpRight size={15} />
              </button>
            </form>
          </Reveal>

          <Reveal className="contact-links-wrap" delay="reveal-delay-1">
            <div className="eyebrow">Direct lines</div>
            <h2>Elsewhere on the web.</h2>
            <p>Editable placeholders live in the content object at the top of App.tsx.</p>
            <div className="contact-links">
              <a className="contact-link" data-testid="link-contact-email" href={`mailto:${portfolioContent.person.email}`}>
                <span className="contact-link-main"><Mail size={17} /><span><span className="contact-link-label">Gmail</span><span className="contact-link-value">{portfolioContent.person.email}</span></span></span>
                <ArrowUpRight size={15} />
              </a>
              <a className="contact-link" data-testid="link-contact-phone" href={`tel:${portfolioContent.person.phone.replaceAll(' ', '')}`}>
                <span className="contact-link-main"><Phone size={17} /><span><span className="contact-link-label">Phone</span><span className="contact-link-value">{portfolioContent.person.phone}</span></span></span>
                <ArrowUpRight size={15} />
              </a>
              {portfolioContent.socials.map((social) => {
                const SocialIcon = social.icon;
                return (
                  <a className="contact-link" data-testid={`link-contact-${social.label.toLowerCase()}`} href={social.href} key={social.label} rel="noreferrer" target="_blank">
                    <span className="contact-link-main"><SocialIcon size={17} /><span><span className="contact-link-label">{social.label}</span><span className="contact-link-value">{social.value}</span></span></span>
                    <ArrowUpRight size={15} />
                  </a>
                );
              })}
            </div>
            <div className="form-actions" style={{ marginTop: 25 }}>
              <CopyEmailButton />
              <span className="form-status">Response usually within 2 days.</span>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <PageFrame>
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/projects" component={ProjectsPage} />
          <Route path="/contact" component={ContactPage} />
          <Route component={NotFound} />
        </Switch>
      </PageFrame>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;