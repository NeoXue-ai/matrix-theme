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
  siteName: "NEO XUE",
  tagline: "FOLLOW THE WHITE RABBIT",
  description: "AI Builder & Indie Hacker",
  author: {
    name: "Neo Xue",
    role: "Independent Developer",
    github: "NeoXue-ai",
    twitter: "@Ne0x41",
  },
  navItems: [
    { href: "/", labelKey: "nav.home" },
    { href: "/projects", labelKey: "nav.projects" },
    { href: "/notes", labelKey: "nav.notes" },
  ],
  hero: {
    slogan: "FOLLOW THE WHITE RABBIT",
    status: "STATUS: Building",
    location: "LOCATION: Earth",
    skills: ["TypeScript", "Python", "React", "Next.js", "AI/ML", "Web Scraping"],
    bootSequence: [
      "> INITIALIZING NEURAL INTERFACE...",
      "> LOADING CONSCIOUSNESS MATRIX...",
      "> ESTABLISHING REALITY CONNECTION...",
      "> WAKE UP, NEO...",
    ],
  },
  timeline: [
    { day: 1, eventKey: "timeline.day1", status: "success" },
    { day: 7, eventKey: "timeline.day7", status: "error" },
    { day: 14, eventKey: "timeline.day14", status: "success" },
    { day: 21, eventKey: "timeline.day21", status: "success" },
    { day: 30, eventKey: "timeline.day30", status: "warning" },
  ],
  tools: [
    {
      nameKey: "tools.tool1.name",
      descKey: "tools.tool1.desc",
      status: "active",
      link: "#",
      icon: "🔍",
      stats: { users: "120+", requests: "10k+" },
    },
  ],
  contacts: [
    { label: "Twitter", value: "@Ne0x41", link: "https://x.com/Ne0x41" },
    { label: "GitHub", value: "NeoXue-ai", link: "https://github.com/NeoXue-ai" },
  ],
  about: {
    lines: [
      { key: "name", value: "Neo Xue" },
      { key: "role", value: "Independent Developer" },
      { key: "focus", value: ["AI tools", "Automation", "SaaS experiments"] },
      { key: "mission", value: "Follow the white rabbit." },
      { key: "principle", value: "Ship fast and learn faster." },
    ],
    paragraphs: [
      "I'm an independent developer building AI-powered tools and small SaaS experiments.",
      "I like turning messy information into useful products, shipping quickly, and learning from real users.",
      "Currently exploring AI automation, data scraping, and market demand discovery.",
    ],
  },
  footer: "Built with obsession. Shipped with intent.",
  translations: {
    en: {
      "nav.home": "Home",
      "nav.projects": "Projects",
      "nav.notes": "Notes",
      "hero.status": "STATUS: Building",
      "hero.location": "LOCATION: Earth",
      "skills.title": "About",
      "skills.comment": "// skills.json",
      "timeline.title": "Build in Public",
      "timeline.comment": "// timeline",
      "timeline.day1": "started AI demand tool",
      "timeline.day7": "crawler failed",
      "timeline.day14": "improved filtering and got better signals",
      "timeline.day21": "first real user feedback",
      "timeline.day30": "pivoted based on data",
      "tools.title": "Tools",
      "tools.comment": "// things I built",
      "tools.tool1.name": "AI Demand Finder",
      "tools.tool1.desc": "Input keywords → outputs real user pain points",
      "contact.title": "Contact",
      "contact.comment": "// reach out",
      "contact.cta": "// If you're building something interesting, reach out.",
    },
    zh: {
      "nav.home": "首页",
      "nav.projects": "项目",
      "nav.notes": "笔记",
      "hero.status": "状态: 公开构建中",
      "hero.location": "位置: 地球",
      "skills.title": "技术栈",
      "skills.comment": "// skills.json",
      "timeline.title": "公开构建",
      "timeline.comment": "// 时间线",
      "timeline.day1": "启动 AI 需求分析工具",
      "timeline.day7": "爬虫失败了",
      "timeline.day14": "改进过滤算法，获得更好的信号",
      "timeline.day21": "收到第一个真实用户反馈",
      "timeline.day30": "基于数据进行调整",
      "tools.title": "工具",
      "tools.comment": "// 我构建的东西",
      "tools.tool1.name": "AI 需求发现器",
      "tools.tool1.desc": "输入关键词 → 输出真实用户痛点",
      "contact.title": "联系",
      "contact.comment": "// 联系我",
      "contact.cta": "// 如果你正在做有趣的事，欢迎联系。",
    },
  },
}