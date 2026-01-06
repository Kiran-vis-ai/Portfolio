import DemoOne from "../components/DemoOne";
import { useRef, useState } from "react";

const SKILL_GROUPS = [
  {
    id: "frontend",
    label: "Frontend",
    skills: [
      "React / Vite",
      "Tailwind CSS",
      "TypeScript",
      "Framer Motion",
      "Material UI",
      "Responsive layouts",
      "Bootstrap",
      "JQuery",
      "Embedded JavaScript (EJS)",
    ],
  },
  {
    id: "backend",
    label: "Backend",
    skills: [
      "Node.js / Express",
      "REST APIs",
      "MongoDB",
      "PostgreSQL",
      "Firebase",
      "Caching & rate limits",
    ],
  },
  {
    id: "tooling",
    label: "Tooling",
    skills: [
      "Git & GitHub",
      "CI/CD",
      "AWS (EC2, S3, Lambda)",
      "Postman",
      "Analytics & monitoring",
      "Cloud deploy (Vercel/Render)",
    ],
  },
  {
    id: "core competencies",
    label: "Core Competencies",
    skills: [
      "Data Structures & Algorithms",
      "Object - Oriented Programming (OOPS)",
      "System Design",
      "Agile Development",
    ],
  },
];

export default function HomePage() {
  const [activeSkill, setActiveSkill] = useState(SKILL_GROUPS[0].id);

  return (
    <div className="min-h-screen bg-black text-white">
      <DemoOne />
      <section className="relative w-full py-12">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {SKILL_GROUPS.map((group) => (
                <button
                  key={group.id}
                  onClick={() => setActiveSkill(group.id)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors border ${
                    activeSkill === group.id
                      ? "border-white/60 bg-white/15 text-white"
                      : "border-white/10 bg-white/5 text-white/70 hover:border-white/30 hover:text-white"
                  }`}
                >
                  {group.label}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
            {SKILL_GROUPS.find((g) => g.id === activeSkill)?.skills.map(
              (skill) => (
                <div
                  key={skill}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90 shadow-lg"
                >
                  {skill}
                </div>
              )
            )}
          </div>
        </div>
      </section>
      <section className="relative w-full py-16">
        <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">Projects</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {CARD_CONTENT.map((item) => (
              <TiltCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const CARD_CONTENT = [
  {
    title: "Online Marketplace",
    subtitle: "A curated multi-vendor shopping flow.",
    cta: "Open live site",
    href: "https://online-marketplace-platform.vercel.app",
  },
  {
    title: "Kanban Board",
    subtitle: "Fast drag-and-drop tasks with live sync.",
    cta: "Open live board",
    href: "https://kanban-frontend-qll6.onrender.com/",
  },
  {
    title: "Cold Email Generator",
    subtitle: "AI-personalized outreach with one click.",
    cta: "View on GitHub",
    href: "https://github.com/GSaiKiran15/Cold-Email-Generator",
  },
];

function TiltCard({ title, subtitle, cta, href }) {
  const ref = useRef(null);
  const [transform, setTransform] = useState(
    "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)"
  );

  const handleMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = -((y - centerY) / centerY) * 8;
    const rotateY = ((x - centerX) / centerX) * 8;
    setTransform(
      `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(14px)`
    );
  };

  const handleLeave = () => {
    setTransform(
      "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)"
    );
  };

  return (
    <div className="[perspective:1200px]">
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="relative h-48 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 via-white/10 to-white/5 p-5 shadow-2xl transition-transform duration-150"
        style={{ transform: transform, transformStyle: "preserve-3d" }}
      >
        <div
          className="absolute inset-0 rounded-2xl bg-white/5 blur-xl"
          style={{ transform: "translateZ(-20px)" }}
        />
        <div
          className="relative flex h-full flex-col justify-between"
          style={{ transform: "translateZ(20px)" }}
        >
          <div>
            <h3 className="text-xl font-semibold text-white">{title}</h3>
            <p className="text-sm text-white/70 mt-1">{subtitle}</p>
          </div>
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="self-start rounded-full border border-white/20 px-3 py-1 text-xs font-medium text-white/90 bg-white/10 hover:bg-white/20 transition-colors"
          >
            {cta}
          </a>
        </div>
      </div>
    </div>
  );
}
