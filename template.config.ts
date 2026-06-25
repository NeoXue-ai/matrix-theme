export interface TemplateConfig {
  siteName: string
  tagline: string
  description: string
  author: {
    name: string
    role: string
    email?: string
    github?: string
    twitter?: string
  }
  navItems: { href: string; labelKey: string }[]
  hero: {
    slogan: string
    status: string
    location: string
    skills: string[]
    bootSequence: string[]
  }
  timeline: { day: number; eventKey: string; status: string }[]
  tools: {
    nameKey: string
    descKey: string
    status: string
    link: string
    icon: string
    stats: Record<string, string>
  }[]
  contacts: { label: string; value: string; link: string }[]
  about: {
    lines: { key: string; value: string | string[] }[]
    paragraphs: string[]
  }
  footer: string
  translations: Record<string, Record<string, string>>
}

export const defaultConfig: TemplateConfig = {
  siteName: "YOUR NAME",
  tagline: "BUILD IN PUBLIC",
  description: "Full-Stack Developer & Builder",
  author: {
    name: "Your Name",
    role: "Full-Stack Developer",
    github: "your-github",
    twitter: "@your-twitter",
  },
  navItems: [
    { href: "/", labelKey: "nav.home" },
    { href: "/projects", labelKey: "nav.projects" },
    { href: "/notes", labelKey: "nav.notes" },
  ],
  hero: {
    slogan: "BUILD IN PUBLIC",
    status: "STATUS: Available",
    location: "LOCATION: Remote",
    skills: ["TypeScript", "React", "Next.js", "Node.js", "Python", "PostgreSQL"],
    bootSequence: [
      "> INITIALIZING SYSTEM...",
      "> LOADING PROFILE DATA...",
      "> ESTABLISHING CONNECTION...",
      "> WELCOME, VISITOR...",
    ],
  },
  timeline: [
    { day: 1, eventKey: "timeline.day1", status: "success" },
    { day: 7, eventKey: "timeline.day7", status: "success" },
    { day: 14, eventKey: "timeline.day14", status: "success" },
    { day: 21, eventKey: "timeline.day21", status: "success" },
    { day: 30, eventKey: "timeline.day30", status: "success" },
  ],
  tools: [
    {
      nameKey: "tools.tool1.name",
      descKey: "tools.tool1.desc",
      status: "active",
      link: "#",
      icon: "🚀",
      stats: { users: "100+", stars: "50+" },
    },
  ],
  contacts: [
    { label: "Twitter", value: "@your-twitter", link: "https://x.com/your-twitter" },
    { label: "GitHub", value: "your-github", link: "https://github.com/your-github" },
    { label: "Email", value: "hello@example.com", link: "mailto:hello@example.com" },
  ],
  about: {
    lines: [
      { key: "name", value: "Your Name" },
      { key: "role", value: "Full-Stack Developer" },
      { key: "focus", value: ["Web Apps", "SaaS", "Open Source"] },
      { key: "mission", value: "Build cool stuff." },
      { key: "principle", value: "Ship fast, learn faster." },
    ],
    paragraphs: [
      "I build things for the web and share what I learn along the way.",
      "I enjoy turning ideas into products, shipping quickly, and learning from real users.",
      "Currently exploring new technologies and building in public.",
    ],
  },
  footer: "Built with Next.js & Tailwind CSS. Deployed on GitHub Pages.",
  translations: {
    en: {
      "nav.home": "Home",
      "nav.projects": "Projects",
      "nav.notes": "Notes",
      "hero.status": "STATUS: Available",
      "hero.location": "LOCATION: Remote",
      "skills.title": "About",
      "skills.comment": "// about.json",
      "timeline.title": "Timeline",
      "timeline.comment": "// journey",
      "timeline.day1": "started building in public",
      "timeline.day7": "shipped first version",
      "timeline.day14": "got first user feedback",
      "timeline.day21": "iterated based on feedback",
      "timeline.day30": "growing and improving",
      "tools.title": "Tools",
      "tools.comment": "// things I built",
      "tools.tool1.name": "My Project",
      "tools.tool1.desc": "A tool that helps you build faster",
      "contact.title": "Contact",
      "contact.comment": "// reach out",
      "contact.cta": "// Let's connect. Drop me a message anytime.",
    },
    zh: {
      "nav.home": "首页",
      "nav.projects": "项目",
      "nav.notes": "笔记",
      "hero.status": "状态: 可合作",
      "hero.location": "位置: 远程",
      "skills.title": "关于我",
      "skills.comment": "// about.json",
      "timeline.title": "时间线",
      "timeline.comment": "// 旅程",
      "timeline.day1": "开始公开构建",
      "timeline.day7": "发布第一个版本",
      "timeline.day14": "收到第一个用户反馈",
      "timeline.day21": "根据反馈迭代",
      "timeline.day30": "持续成长和改进",
      "tools.title": "工具",
      "tools.comment": "// 我构建的东西",
      "tools.tool1.name": "我的项目",
      "tools.tool1.desc": "一个帮助你更快构建的工具",
      "contact.title": "联系",
      "contact.comment": "// 联系我",
      "contact.cta": "// 保持联系，随时给我发消息。",
    },
  },
}
