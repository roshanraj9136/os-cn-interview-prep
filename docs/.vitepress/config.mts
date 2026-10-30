import { defineConfig } from 'vitepress'

const repo = 'https://github.com/roshanraj9136/os-cn-interview-prep'

export default defineConfig({
  lang: 'en-IN',
  title: 'OS + CN Interview Prep',
  description:
    'Operating System aur Computer Networks interview preparation, simple Hinglish mein. 12-15 LPA placements ke liye most-asked topics, examples, interview answers aur quizzes.',
  cleanUrls: true,
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#4f46e5' }],
  ],
  themeConfig: {
    logo: '/favicon.svg',
    siteTitle: 'OS + CN Prep',
    nav: [
      { text: 'Shuru karo', link: '/start-here' },
      { text: 'Operating System', link: '/os/' },
      { text: 'Computer Networks', link: '/cn/' },
      {
        text: 'Practice',
        items: [
          { text: 'OS Top Questions', link: '/os/top-questions' },
          { text: 'CN Top Questions', link: '/cn/top-questions' },
          { text: 'OS Mock Quiz', link: '/os/quiz' },
          { text: 'CN Mock Quiz', link: '/cn/quiz' },
        ],
      },
      { text: 'Companies', link: '/companies' },
      { text: 'Revision', link: '/revision' },
    ],
    sidebar: [
      {
        text: 'Shuru karo',
        items: [
          { text: 'Yahan se shuru karo', link: '/start-here' },
          { text: '7 din ka study plan', link: '/study-plan' },
          { text: '12-15 LPA companies', link: '/companies' },
        ],
      },
      {
        text: 'Operating System',
        collapsed: false,
        items: [
          { text: 'OS roadmap', link: '/os/' },
          { text: '1. OS basics', link: '/os/basics' },
          { text: '2. Process aur Thread', link: '/os/process-thread' },
          { text: '3. CPU Scheduling', link: '/os/cpu-scheduling' },
          { text: '4. Synchronization', link: '/os/synchronization' },
          { text: '5. Deadlock', link: '/os/deadlock' },
          { text: '6. Memory Management', link: '/os/memory-management' },
          { text: '7. Virtual Memory', link: '/os/virtual-memory' },
          { text: '8. File System aur Disk', link: '/os/file-system-disk' },
          { text: '9. Baaki important topics', link: '/os/misc-topics' },
          { text: 'OS Top Questions', link: '/os/top-questions' },
          { text: 'OS Mock Quiz', link: '/os/quiz' },
        ],
      },
      {
        text: 'Computer Networks',
        collapsed: false,
        items: [
          { text: 'CN roadmap', link: '/cn/' },
          { text: '1. Network basics', link: '/cn/basics' },
          { text: '2. OSI aur TCP/IP model', link: '/cn/osi-tcpip' },
          { text: '3. Data Link layer', link: '/cn/data-link' },
          { text: '4. IP Addressing aur Subnetting', link: '/cn/ip-addressing' },
          { text: '5. Routing', link: '/cn/routing' },
          { text: '6. TCP aur UDP', link: '/cn/tcp-udp' },
          { text: '7. Application layer (HTTP, DNS, DHCP)', link: '/cn/application-layer' },
          { text: '8. Network Security', link: '/cn/security' },
          { text: '9. google.com type karne par kya hota hai', link: '/cn/google-com' },
          { text: 'CN Top Questions', link: '/cn/top-questions' },
          { text: 'CN Mock Quiz', link: '/cn/quiz' },
        ],
      },
      {
        text: 'Revision',
        items: [{ text: 'Last-day cheat sheet', link: '/revision' }],
      },
    ],
    search: { provider: 'local' },
    outline: { level: [2, 3], label: 'Is page par' },
    docFooter: { prev: 'Pichla page', next: 'Agla page' },
    socialLinks: [{ icon: 'github', link: repo }],
    footer: {
      message: 'Free study resource. Padho, samjho, bol ke practice karo.',
      copyright: 'OS + CN Interview Prep',
    },
    returnToTopLabel: 'Upar jao',
    sidebarMenuLabel: 'Menu',
    darkModeSwitchLabel: 'Theme',
    lightModeSwitchTitle: 'Light mode',
    darkModeSwitchTitle: 'Dark mode',
  },
})
