// @ts-check
import { defineConfig, svgoOptimizer } from "astro/config";
import starlight from '@astrojs/starlight';
import starlightBlog from 'starlight-blog';
import mermaid from "astro-mermaid";
import starlightLinksValidator from "starlight-links-validator";
import starlightScrollToTop from "starlight-scroll-to-top";
import starlightKbd from "starlight-kbd";
import icon from "astro-icon"
import starlightUiTweaks from 'starlight-ui-tweaks'

// https://astro.build/config
export default defineConfig({
  site: 'https://aerynos.com',
  prefetch: true,
  integrations: [
    mermaid({
        enableLog: false,
      }),
    icon(),
    starlight({
      logo: {
        dark: "@/images/logo.svg",
        light: "@/images/logo-light-mode.svg",
        replacesTitle: false,
      },
      title: 'aerynOS',

      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/aerynos',
        },
        {
          icon: 'zulip',
          label: 'Zulip',
          href: 'https://aerynos.zulipchat.com/',
        },
        {
          icon: 'mastodon',
          label: 'Mastodon',
          href: 'https://hachyderm.io/@aerynOS',
        },
        {
          icon: 'blueSky',
          label: 'Bluesky',
          href: 'https://bsky.app/profile/aerynos.com/',
        },
        {
          icon: 'x.com',
          label: 'x.com',
          href: 'https://x.com/AerynOS_Linux',
        },
        {
          icon: 'discourse',
          label: 'Discourse',
          href: 'https://aerynos.discourse.group/',
        },
      ],

      sidebar: [
        {
          label: "aerynOS",
          items: [
            { autogenerate: { directory: 'aerynOS' } }
          ],
        },
        {
          label: "FAQ",
          items: [
            { autogenerate: { directory: 'FAQ' } }
          ],
        },
        {
          label: "Users",
          items: [
            { autogenerate: { directory: 'Users' } }
          ],
        },
        {
          label: "Packaging",
          items: [
            { autogenerate: { directory: 'Packaging' } }
          ],
        },
        {
          label: "Developers",
          items: [
            { autogenerate: { directory: 'Developers' } }
          ],
        },
      ],

      plugins: [
        starlightUiTweaks({
          navbarLinks: [
            { label: "About", href: "/about" },
            { label: "Download", href: "/download" },
            { label: "Privacy", href: "/privacy" },
            { label: "Sponsor", href: "/sponsor" },
            { label: "Tooling", href: "/tooling" },
            { label: "Documentation", href: "/aerynos" },
            { label: "Blog", href: "/blog" },
          ],
          footer: {
            showSocialIcons: false,
            copyright: "aerynOS developers. All rights reserved.",
            firstColumn: {
              title: "aerynOS",
              links: [
                { label: "About", href: "/about" },
                { label: "Download", href: "/download" },
                { label: "Documentation", href: "/aerynos" },
              ],
            },
            secondColumn: {
              title: "Privacy",
              links: [
                { label: "Privacy", href: "/privacy" },
              ],
            },
            thirdColumn: {
              title: "Sponsorship",
              links: [
                { label: "Sponsor", href: "/sponsor" },
              ],
            },
            fourthColumn: {
              title: "Blog",
              links: [
                { label: "Blog", href: "/blog" },
              ],
            },
          },
        }),
        starlightBlog({
          title: 'Blog',
          recentPostCount: 100,
          metrics: {
            readingTime: true,
            words: 'total',
          },
          authors: {
            ikey: {
              name: 'Ikey',
              title: 'Founder: Retired',
              picture: '/images/authors/ikey.webp',
              url: 'https://github.com/ikeycode',
            },
            sunnyflunk: {
              name: 'SunnyFlunk',
              title: 'Distro Engineer: Retired',
              picture: '/images/authors/sunnyflunk.webp',
              url: 'https://github.com/sunnyflunk',
            },
            ermo: {
              name: 'ermo',
              title: 'Co-founder & Project Steward',
              picture: '/images/authors/ermo.webp',
              url: 'https://github.com/ermo',
            },
            nomadiccore: {
              name: 'NomadicCore',
              title: 'Project Comms',
              picture: '/images/authors/khaga87.webp',
              url: 'https://github.com/khaga87',
            },
            khaga87: {
              name: 'khaga87',
              title: 'Project Comms',
              picture: '/images/authors/khaga87.webp',
              url: 'https://github.com/khaga87',
            },
            joebonrichie: {
              name: 'Joey Riches',
              picture: '/images/authors/joey.webp',
              url: 'https://github.com/joebonrichie',
            },
          },
        }),
        starlightLinksValidator(),
        starlightScrollToTop({
          position: "right",
          showTooltip: true,
          smoothScroll: true,
          threshold: 10,
          svgPath: "M12 4L6 10H9V16H15V10H18L12 4M9 16L12 20L15 16",
          svgStrokeWidth: 2,
          borderRadius: "20",
          showProgressRing: true,
          showOnHomepage: true,
          tooltipText: "Back to top",
        }),
        starlightKbd({
          globalPicker: false,
          types: [
            { id: "mac", label: "macOS" },
            { id: "windows", label: "Windows" },
            { id: "linux", label: "Linux", default: true },
          ],
        }),
      ],
      customCss: [
        "@/styles/global.css",
      ],
    }),
  ],
});
