import { defineConfig } from 'vitepress';

export default defineConfig({
  lang: 'en-US',
  title: 'Business Tools',
  description: 'CRM and Emoji Generator Tools',

  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'CRM', link: '/crm/' },
      { text: 'Emoji Generator', link: '/emoji/' },
    ],

    sidebar: [
      {
        text: 'CRM',
        items: [
          { text: 'Dashboard', link: '/crm/' },
          { text: 'Contacts', link: '/crm/contacts' },
          { text: 'Deals', link: '/crm/deals' },
        ],
      },
      {
        text: 'Tools',
        items: [
          { text: 'Emoji Generator', link: '/emoji/' },
        ],
      },
    ],
  },
});