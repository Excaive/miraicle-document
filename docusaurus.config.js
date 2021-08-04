// const lightCodeTheme = require('prism-react-renderer/themes/github');
const lightCodeTheme = require('prism-react-renderer/themes/nya');
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
        src: 'img/berry.svg',
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
          label: '指南',
        },
        {
          to: 'docs/api/intro',
          position: 'left',
          activeBasePath: 'docs/api',
          label: 'API',
        },
        {
          to: 'docs/changelog/changelog',
          position: 'right',
          activeBasePath: 'docs/changelog',
          label: '更新日志',
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
            {
              label: 'API',
              to: '/docs/api/intro',
            },
            {
              label: '更新日志',
              to: '/docs/changelog/changelog',
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
            {
              label: 'PyPi',
              href: 'https://pypi.org/project/miraicle',
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
