const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'miraicle',
  tagline: '一个基于 mirai-api-http 的轻量级 Python SDK',
  url: 'https://excaive.github.io',
  baseUrl: '/miraicle/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'Excaive', // Usually your GitHub org/user name.
  projectName: 'miraicle', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'miraicle',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        // {
        //   to: 'docs/install',
        //   position: 'left',
        //   routeBasePath: 'docs',
        //   label: '指南',
        // },
        {
          to: 'docs/guides/intro',
          position: 'left',
          activeBasePath: 'docs/guides',
          // routeBasePath: 'docs',
          label: '指南',
        },
        {
          to: 'docs/api/install',
          position: 'left',
          activeBasePath: 'docs/api',
          // routeBasePath: 'docs',
          label: 'API',
        },
        // {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/Excaive/miraicle',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '文档',
          items: [
            {
              label: '指南',
              to: '/docs/guides/intro',
            },
          ],
        },
        {
          title: '社区',
          items: [
            {
              label: 'Github Discussions',
              href: 'https://github.com/Excaive/miraicle/discussions',
            },
            // {
            //   label: 'Discord',
            //   href: 'https://discordapp.com/invite/docusaurus',
            // },
            // {
            //   label: 'Twitter',
            //   href: 'https://twitter.com/docusaurus',
            // },
          ],
        },
        {
          title: '更多',
          items: [
            // {
            //   label: 'Blog',
            //   to: '/blog',
            // },
            {
              label: 'GitHub',
              href: 'https://github.com/Excaive/miraicle',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Excaive. Built with Docusaurus.`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
