---
title: "Solid foundations are leading to expanding horizons"
date: 2026-08-02T21:00:00Z
authors: [nomadiccore, ermo]
tags: [news]
license: "CC-BY-ND-4.0"
copyright: "Copyright © 2026 aerynOS Developers"
---

![A car light trail signifying moving at pace](unsplash.webp)

It's been several months since our last update in May, and a lot has happened around the AerynOS project in the meantime!

First and foremost, we have tested, landed and productised our Versioned Repositories phase 2 feature, which will serve to firm up AerynOS' foundations and help us further develop our vision of how to build a Linux distribution.

On the distribution side, Reilly has landed experimental OpenZFS support for data drives alongside significant systemd packaging efforts bringing it from 257.13 to 261.2.

Community member Christian Bendiksen is continuing his work around his `Gnist` and `Malm` cli tools for conveniently declaring, applying, and sharing Wayland Window Manager themes, and community member lumi has worked on their `aerbox` tool, which natively makes use of moss' system-model concept to quickly create containers gated by access control to network, sound, drives and other hardware.

On the kernel front, we have moved to 7.1.5 for our stable and gaming branches and 6.18.40 for LTS, following a period of elevated vulnerability disclosures in the Linux kernel that required rapid response from the team.

We have also landed NVIDIA driver 610.43.03 in our repositories and have been running a testing programme with community members over the last month that is already yielding positive results.

In our wider project activities, we continue to explore Codeberg as an alternative to GitHub, with our new website built with Hugo using the Hextra theme under active development over there. We are also releasing a new ISO, AerynOS 2026.08.

In terms of our code bases, we have contributors experimenting with improving the moss package search UX, and refactoring some of our shared low-level git and sqlite3 db functionality.

From a development story arc perspective, AerynOS has been deliberately kept under a very tight leash over the last year, as we have focused on strengthening our core tooling and infrastructure code bases. Whilst we are nowhere near "done" with our vision for our tooling, now that our ability to seamlessly deliver updates to our on-disk repository and file formats has been secured, you will see AerynOS deliberately transitioning into a more open and collaborative space for those of you who want to get involved with the project and work on areas that you find fun, interesting and engaging.

This shift in approach has already been evident over the last couple of months, as engagement around the project continues to grow through all of our social media platforms and particularly in our Zulip server.

## What's new in the distro

### Experimental inclusion of OpenZFS

Reilly has worked on adding OpenZFS data drive support in AerynOS. This means that we now support btrfs, bcachefs and OpenZFS drives for user-managed data drives.

Reilly has tested OpenZFS on one of his drives; however we need help from you all, our community of early adopters, to test OpenZFS on your drives and provide feedback that we can then use to iterate.

### Package- and stack-updates

As ever, our intrepid contributors and staff have landed a bunch of updates. Please check the [recipes repository](https://github.com/AerynOS/recipes) for the latest version numbers as these change frequently. Highlights include:

- COSMIC DE 1.5.0
- KDE Plasma 6.7.3
- KDE Oxygen icon/sound/wm theme
- WayVR 26.7.1
  - envision 3.2.0+git.aa84e48e
  - monado 25.1.0+git.983a8a51
- bazaar 0.9.1
- bitwarden 2026.7.0
- bottom 0.14.7
- buildah 1.45.0
- carapace 1.7.3
- cardwire 0.11.1
- croc 11.0.0
- cython 3.2.9
- dankcalendar 0.3.0
- dankmaterialshell 1.5.3
- discord 1.0.151
- dua-cli 2.39.0
- faugus-launcher 2.0.4
- firefox 153.0.1
- fresh 0.4.6
- gnist 0.3.6
- gram 3.2.0
- imagemagick 7.1.2-29
- intel-media-driver & vpl-gpu-rt 26.2.4
- kitty 0.48.2
- linux-gaming/-stable 7.1.5
- linux-lts 6.18.40
- malm 0.4.0
- mangowm 0.15.5
- mesa 26.1.6
- networkmanager 1.58.0
- noctalia 5.0.0-beta7
- nodejs-22 22.23.2
- nodejs-24 24.18.1
- opengamepadui 0.46.0
- otter-launcher 0.7.6
- php 8.5.9
- plezy 2.11.0
- pnpm 11.19.0
- qemu 11.0.3
- ryzenadj 0.19.0
- signal-desktop 8.21.0
- sqlite 3.53.4
- strawberry 1.2.26
- systemd 261.2
- tailscale 1.98.10
- thunderbird 153.0.1
- typescript 6.0.3
- vapoursynth R78
- vscode-bin 1.131.0
- vulkan 1.4.357.0
- walker 2.17.0
- wine 11.14
- youki 0.7.0
- yubico-authenticator 7.4.1
- zed 1.13.1

... along with sundry additions and updates.

## Infrastructure and Tooling Updates

### Versioned Repositories phase 2

![A terminal window showing the transition through Versioned Repositories phase 2](mossvrp2.webp)

The team, spearheaded by efforts from tarkah and ermo, have landed our Versioned Repositories phase 2 development sprint. This feature was included in the Unstable Stream update released on 5 July with users having reported a positive transition experience ever since.

This work involves an upgrade to a new on-disk repository format layout, and a new moss KDL configuration file format. This has been designed to prepare the path for future on-disk format upgrades and package manager capabilities.

Most importantly, this enables moss to upgrade itself seamlessly across what would otherwise be breaking on-disk format changes, with no user interaction required, other than running `sudo moss sync -u` until no new updates are available.

Users simply keep updating their systems and will get new features as part of their normal update workflow. This moves us closer to a true "install once, update forever" model where we can evolve the capabilities of the system over time without leaving users on older moss versions behind.

We have long considered this feature a foundational must-have for what we are trying to achieve with AerynOS on behalf of current testers and future users, as it enables us to deliver incremental tooling innovations and updates as they become ready for wider consumption, in a completely seamless fashion from a user perspective.

### Moss download and CAS reliability fixes

The team received a few reports of issues when trying to verify system states. Upon closer examination, this revealed a small issue in how we look up cached assets in our Content Addressable Store when verifying said store with `sudo moss state verify`.

However, while digging into that issue, tarkah took the opportunity to add a few extra verification checks that, for now, will slightly reduce blitting speeds, and which will give moss more robust guarantees that assets have been downloaded and cached correctly going forward.

We recommend that people who have previously seen spurious errors when running `sudo moss state verify` re-run said command with the now updated moss.

### Moss native reflink format

While working through the CAS fixes, it turned out that we could trivially add support for reflinks in our native hardlink driver with only a few lines of code. Hence, users using XFS will automatically begin using our native reflink driver that is now shipped with moss. Reflinks enables "thin" files with different names, owners and permissions to all point to the same underlying file *content*.

Filesystems which do not support reflinks (such as ext4 and f2fs) will instead fall back on the existing hardlink support. However, we have some good news in the pipeline for ext4 and f2fs users as well.

In addition to the new native reflink format support, we are working towards landing a new, **optional**, read-only EROFS metadata image approach. Apart from being a read-only format, this format will come with the same benefits as the new native reflink format, without the underlying filesystem needing to be reflink capable. Hence, this new format will keep all the benefits our early testers have come to expect from AerynOS.

We will talk more about this in a future blog post when the currently in-development code has been landed and thoroughly vetted.

### Systemd packaging and user-facing changes

![A moss sync command in terminal showing the changes to systemd](systemd.webp)

Reilly reworked our systemd package to ensure that manually enabling or disabling systemd units will no longer be overridden on moss package transactions.

As part of this rework, systemd has been updated incrementally from 257.13, to 258.9, 259.7, 260.4, and finally to 261.2. This represents a significant version jump that brings with it a number of upstream improvements and fixes. Alongside the upstream update, we have restructured how systemd is packaged in AerynOS.

Please note the following important changes:

- **Network interface names will change after the next reboot.** Please ensure that your configurations are using the new names (e.g., `eth0` to `enp12s0`)

- **Systemd sub-packages:** `systemd-boot`, `systemd-coredump`, `systemd-homed`, `systemd-container`, `systemd-oomd`, `systemd-resolved`, `systemd-timesyncd`, `systemd-udev`, and `systemd-userdbd` are now separate packages.

- `systemd-boot`, `systemd-coredump`, `systemd-resolved`, and `systemd-udev` will all be installed automatically if you are using pkgsets (if you don't know what these are you are most likely using them). They will also be installed if a package you are using directly depends on them.

## Wider Project Updates

### Experimenting with Codeberg

The AerynOS team hasn't been impressed with the direction of GitHub for some time now. We talked about this in our [January 2026 blog post](https://aerynos.com/blog/2026/01/31/january-2026-project-update/#github-vs-codeberg) and we have been exploring Codeberg as an alternative git forge in the background.

Over the course of the last few months, the team has moved our new "in development" website branch over to Codeberg in its own [repository](https://codeberg.org/AerynOS/dotcom-hugo). You can follow along with the new website development there including raising new issues and/or submitting your own PRs.

As the new website development continues, we will explore whether Codeberg is a viable alternative to GitHub for our needs. This will allow for better understanding of Codeberg's CI tooling and function as our first public repository shipping "a release-quality product".

After this, the team will be in a better position to investigate the possibility of bringing additional repositories over to Codeberg. If Codeberg is found to be a viable alternative, it still remains to be seen how a transition from Github to Codeberg would occur.

One outstanding challenge with a full transition away from GitHub is the GitHub Discussions forum. There is no equivalent on Codeberg so the team would need to see whether another forum platform would be required (or whether a forum platform even makes sense for AerynOS on top of our Zulip chat platform).

### Website development updates

Website development is now progressing nicely, with design and implementation work happening across Codeberg and in our Zulip [Web Development channel](https://aerynos.zulipchat.com/#narrow/channel/543225-Web-Development).

The new website is being built with [Hugo](https://gohugo.io), a fast and flexible static site generator, and uses the [Hextra theme](https://github.com/imfing/hextra) as its foundation. We have been building upon Hextra to tailor it to AerynOS' needs, and we are pleased with how the site is taking shape.

Rather than over-promising on what AerynOS will deliver (something we feel the current site does today), with the new site, we want to be straightforward with potential users whilst improving our web presence both visually and structurally. The new site unifies our main website and documentation into a single cohesive web presence, which addresses a real issue we have observed: a number of new users joining our Zulip server have been aware of our main site but not the documentation site, and we want to eliminate that gap.

We are taking a deliberate approach of focusing on what we have delivered rather than overhyping what we promise to deliver... No more comments of "blazing fast" anything on the site (even though we know AerynOS is already pretty quick)! The site is coming together piece by piece, and we will share more as concrete milestones are reached rather than offering grand projections.

If you have experience developing websites with Hugo and want to contribute, we welcome PRs on the [Codeberg repository](https://codeberg.org/AerynOS/dotcom-hugo).

![A screenshot of the homepage of the new in progress AerynOS website](hugo-dotcom.webp)

Please note that this is just a placeholder as the current focus is on the design rather than the content.

### Call for NVIDIA testers

We have landed the NVIDIA driver **610.43.03** version in the repos. This driver version has improved DLSS support and several fixes for system sleep and wake-from-suspend issues.

Over the last month, we put out a call for NVIDIA GPU owners to help us test new driver updates, since no-one on the team owns NVIDIA GPUs. The response has been encouraging: several community members have already stepped up and their contributions are positively impacting our testing and validation process on NVIDIA GPU-based systems. Issues that would have gone unnoticed by the team are now being caught and addressed during testing in our volatile stream thanks to this community effort.

That said, more testers are always welcome. The broader the range of NVIDIA hardware we can test against, the more confident we can be in our driver packaging and integration. If you have an NVIDIA GPU, feel free to join us in the [NVIDIA Testing Feedback thread](https://aerynos.zulipchat.com/#narrow/channel/544170-Feedback/topic/NVIDIA.20Testing.20.28volatile.20stream.29.20Q3.2726/with/612944609) on Zulip.

### Kernel updates

AerynOS now ships with Linux **7.1.5** on our stable and gaming branches and Linux **6.18.40** for our LTS branch.

Over the last few months, there were a number of Linux vulnerabilities reported that required quick fixes. The team followed along with the discourse and built each new version of the Linux Kernel and landed them into our Volatile repository.

The vulnerability disclosures have somewhat slowed down but in any case, we will continue to deliver the latest point releases as they land into our volatile stream, from where they will be added to our unstable stream once they have been appropriately tested.

## ISO refresh

In our [last blog post](https://aerynos.com/blog/2026/05/03/a-post-we-never-want-to-have-to-make/#why-have-monthly-isos-anyway) we highlighted that we will be moving away from monthly ISO releases as these had mostly served their purpose.

Given the updates to our os-tooling as part of our Versioned Repositories phase 2 work, it is now an appropriate time to release a new ISO, **AerynOS 2026.08**, incorporating the latest updates without users having to manually update their way through the repository update process.

The new ISO incorporates all the latest updates to date including the latest 7.1 series kernel, updates to GNOME for the live installer and access to Plasma 6.7.3 and Cosmic 1.5.0 as install options thanks to our net installer approach which will always install the latest packages in our unstable repository at the time of installation.

## CDN77 sponsorship

![The cdn77 logo](cdn77.png)

The latest project sponsor for AerynOS is [CDN77](https://www.cdn77.com/), who is providing the project with content delivery and storage hosting services.

We're especially pleased to be working with CDN77 because they're an independent infrastructure provider with a global network spanning 130 countries. Their extensive Points of Presence ensure fast, reliable service for our users worldwide while aligning with AerynOS's increasing commitment to European digital sovereignty. CDN77 has a strong focus on performance and reliability, making them an excellent partner for the project. Working with them also helps us diversify our infrastructure and reduce overreliance on large US providers.

We're currently determining how best to integrate CDN77 into our existing infrastructure setup. We're considering a tiered approach that allows us to leverage their strengths during this evaluation period. We'll share more details as our integration progresses.

## Next Steps

### Upcoming changes to our recipes

The AerynOS team has already adopted KDL for our declarative system-model approach, reflecting our view that it is a much better fit for our use case than YAML. Building on this work, and via our collaboration with [Kat Marchán](https://github.com/zkat), the author of KDL, we are defining a new KDL-based recipe schema to replace our current YAML-based format.

Transitioning our recipe format from YAML to KDL is one of our next major workstreams. Establishing the initial KDL schema will provide the foundation for future enhancements to our core tooling, with new capabilities being introduced through subsequent revisions of the schema.

To support this transition, we have intentionally deferred adding new features to the existing YAML-based recipe format. As the long-term direction has always been to replace it with KDL, continuing to invest in the YAML schema would have meant developing a format we already considered transitional.

The discussions for this are taking place on our [Zulip server](https://aerynos.zulipchat.com/#narrow/channel/543561-Research-.26-Development/topic/KDL.3A.20Serde.20support.20and.20general.20questions/with/597184585) and on a [GitHub issue](https://github.com/AerynOS/os-tools/issues/790).

## Call for Contributors

We're actively seeking contributors across several areas where fresh perspectives would be valuable:

**Technical Areas:**
- **OpenZFS testing** — Help us validate experimental OpenZFS support on real hardware
- **NVIDIA driver testing** — If you own an NVIDIA GPU, help us test our NVIDIA open kernel modules and userspace driver 610.43.03 configuration
- **Adaptable concurrent downloads** — Help us explore how to optimise moss download performance in wildly different scenarios
- **Declarative container configurations** — Help us test and shape KDL-declared container setups
- **Package search UX improvements** — Help us make searching for packages and providers easier for everyone
- **Website development** — Help us build the new AerynOS website; we're looking for contributors with experience using the Hugo static site generator

**How to Get Involved:**
- Join us on [Zulip](https://aerynos.zulipchat.com), particularly the Research & Development channel
- Browse open issues on our [GitHub repositories](https://github.com/AerynOS/)
- Submit PRs to the [recipes repository](https://github.com/AerynOS/recipes)
- Contribute to the [new website on Codeberg](https://codeberg.org/AerynOS/dotcom-hugo)
- Test new ISOs and report feedback

Whether you're interested in package maintenance, UI/UX, documentation, or testing, there's room for you. We've been deliberately opening up the project to collaborative contributions, and we'd love to welcome you aboard.

## Supporting the project

Over the last year, the project has been through a significant period of change. As detailed in our [October 2025 blog post](https://aerynos.com/blog/2025/10/31/#donations), we had to update our sponsorship accounts to receive future sponsorship funds once it became clear our previous project leader had permanently stepped away from the project.

This left us in a position where we had to build up our sponsor income from scratch having lost previous sponsors. We are very grateful that many sponsors (old and new) have joined or stayed with us on this journey and our income is again able to cover our fixed project costs with a little surplus each month.

Since the last blog post, we are now in a net positive position having borne the project costs since April 2025 whilst receiving sponsorship income since October 2025. We are **very** appreciative of all who have ever sponsored the project; we wouldn't be here without your support! ❤️

Ideally we would like to grow our monthly income (and therefore surplus). Doing so would allow us to:

1. Support our staff who currently work on a voluntary basis
2. Scale and/or upgrade infrastructure over time
3. Consider purchasing hardware for compatibility testing
4. Fund future initiatives for the betterment of the project

<div style="display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px 50px">
<a style="font-weight: bold;
          color: white;
          background-color: #626f47ff;
          padding: 10px 20px;
          text-decoration: none;
          text-align:center;
          border-radius: 5px"
   href=/sponsor/>Sponsor AerynOS</a>
</div>

If you wish to discuss other sponsorship opportunities, such as hosting or hardware sponsorship, please reach out to us at contact@aerynos.com.

## Thank You!

We are very grateful for your support, be it financial or via project contributions in the form of carefully written bug reports, code contributions, design contributions, documentation updates, general feedback, package updates and overall enthusiasm around the project.

We hope that you will continue showing enthusiasm for our project, and that you will want to get involved in whichever way, shape, or form works for you!
