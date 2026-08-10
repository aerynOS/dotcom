---
title: "2025 in retrospect"
date: 2026-01-02T23:00:00Z
authors: [nomadiccore, ermo]
tags: [news]
license: "CC-BY-ND-4.0"
copyright: "Copyright © 2026 aerynOS Developers"
---

2025 has been a year of significant change for the AerynOS project, not just in terms of development itself but also in name and in the staff working on the project.

We know many people will be following along, waiting for our beta and/or stable releases but for now we want to take a look back at 2025 and summarize what we have delivered and how that is positioning us strongly for 2026.

![Camp Fire](Camp-Fire.jpg)

**The TL;DR summary:**

- We changed our name from Serpent OS to AerynOS. Aeryn is a different form of Erin, which means Ireland in Irish Gaelic.
- The project founder, Ikey, stepped away from the project in mid April. A few weeks later, he sent an invitation to project co-founder and co-architect, Rune Morling (ermo), to be his Github account successor.
- After these events, ermo asked the team if they would be interested in carrying on working on the project under his stewardship while waiting for Ikey to potentially make contact, and the team voted unanimously in favour of doing so.
- Since then, the team has continued to deliver per the project roadmap:
  - We completed the transition of all core tooling to Rust.
    - The new Rust-based infra has now delivered thousands of package builds while proving to be much more stable and robust than the previous implementation.
    - Leveraging Rust has enabled us to confidently deliver new tooling solutions like versioned repositories and a system-model approach to declaratively describe system installs.
  - We improved upon the Cosmic DE offering whilst delivering new KDE Plasma and Console-based install options
  - We onboarded several new staff members onto the project over the course of the year with differing strengths and interests
  - We reworked our cloud hosting setup to deliver more build capabilities at lower cost base
  - We renewed our media strategy through increased blog posts and engagement across social media platforms


## What's in a name

The first and biggest change we made this year was changing our name [from Serpent OS to AerynOS](https://aerynos.com/blog/2025/02/14/evolve-this-os/). We are aware that, to some, this move was somewhat controversial. Our stance has been simple: A name takes on the meaning you give it. 

Over time, we have continued to work to deliver on our goals for AerynOS. In return, people have become less focused on the name and more focused on what we are setting out to do, and what we are continuously delivering.

As an aside, we originally utilised AI tooling to create our logo, but this is not something we are overly comfortable with for the long run. We are looking at our options around either iterating on or creating a new "human made" logo where we can feel a lot more confident around licensing and ownership of the artwork itself.

## The project founder steps away

In mid April of this year, Ikey went offline as part of a move, and subsequently never returned.

At the time, the team tried to reach out in multiple ways, however there has sadly been no reciprocation, other than ermo receiving a Github request sent from Ikey's Github account to become Ikey's [account successor](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/repository-access-and-collaboration/maintaining-ownership-continuity-of-your-personal-accounts-repositories) towards the end of the first week of May.

Taking into account Ikey's experiences up until his move, we have made the assumption that his stepping back from the project was related to ongoing personal health problems for him and his family, which were compounded by significant financial strain as we understand it.

Note that, out of respect to Ikey and his family, we will not be elaborating any further on this. Needless to say, we wish him and his family the best and hope that they will have found a way through their travails.

As Ikey has left us with no way to contact him, we cannot share with you how to directly support him financially. All we can say is that you *may* be able to do so via his personal GH sponsors account, [@ikeycode](https://github.com/sponsors/ikeycode), though we stress that we have no way of knowing whether he will actually be receiving any money you decide to send that way.

## Team regroup and reset

To ensure the project would be able to continue in the short and medium term, and on the basis that he felt that the promise of the tech and the underpinnings of AerynOS were too good to be left to languish and wither away, ermo asked the team whether they would like to continue working under his stewardship while we awaited news from Ikey. The team voted unanimously in favour of doing so.

Hence, for the initial couple of months, our focus was to continue delivering as a project, while allowing Ikey the space and the time to return once he'd had a chance to regroup and recover. This included letting all project sponsorship (including Ko-fi sponsorship) flow directly to Ikey.

As time progressed and the likelihood of Ikey getting in contact and returning grew dim, we needed to be in a position to actually have control of project assets and went about gaining said control in order to be able to keep the proverbial lights on.

With the exception of the original AerynOS X account, we have regained access to all relevant accounts, and have continued delivering on the project goals in the meantime.

We have done our best to not let any of this negatively impact our early alpha testers' experience of the project, and feel that we have largely succeeded in doing so. The only real hiccup was a few months of reduced package delivery from mid April to late May, where we worked flat out to restore our ability to deliver package updates via the then under-development Rust infra port, after the old Proof-of-Concept DLang infra broke down completely.

We are now 9 months on from Ikey stepping back, and taking into account that we have not heard from him and that he explicitly designated ermo as his GH account successor, we are in the final stages of offboarding him into an inactive project alumni role.

We would like to stress that, as a project, we hold no ill will towards Ikey, and that we simply wish him the best. There is no hiding that his work was foundational to AerynOS with respect to both the tooling, the distribution itself, and the vision & ethos he promulgated for the project. We simply would not be where we are now as a project without his years of forward-looking engineering efforts.

At the same time, we think the present blog post will serve to outline why, based on our ability to deliver up until now, we are confident in our ability to continue developing AerynOS and its tooling into the future.


## Infrastructure & Tooling development

Late March and April also saw the start of the porting effort of our infrastructure from DLang to Rust. The approach for this porting effort was to develop a so-called "Minimum Viable Product" (MVP) code base that could iteratively be improved.

After several months of development, in late May we started delivering packages to users again, which had all been built from the new Rust based infrastructure code base. This effort included a full rebuild of the whole recipe repo at the time to ensure ABI sanity of the newly built packages.

The development of our infrastructure didn't stop there. Throughout the year, the code has been continually developed and expanded upon to land new features. In the last three months, the team has successfully delivered an MVP of the Versioned Repositories feature and an accompanying system-model feature as two very important examples of this.

### Versioned Repositories

When fully fleshed out, Versioned Repositories will allow the team to seamlessly deliver improvements to our os-tooling (`moss` and `boulder`) in a controlled fashion. This is important as AerynOS is a rolling release distribution, meaning we need to be able to deliver improvements to users' systems without breaking them or requiring complex manual upgrade procedures.

From a user perspective, it will open up the ability to decide which version or "update stream" of our repositories they want to use, for example opening up the capability to "lock" their system to a specific release or point in time, or eventually opening up the capability to use release-candidate or in-testing package builds that wouldn't otherwise make their way into the "standard" AerynOS Repository.

In short, users will be able to use Versioned Repositories to easily choose a more stable and cautious repository or conversely to choose a more bleeding edge repository based on their needs and desires for their systems.

More broadly speaking, Versioned Repositories will also eventually allow for layered repositories for x86_64-v3 and -v4 packages to sit above our baseline x86_64-v2 repository where we see worthwhile improvements in building -v3 and -v4 packages. AerynOS's approach here will not be to rebuild full repositories of -v3 and -v4 packages, but instead to overlay these packages on top of the x86_64-v2 repository only where there are verifiable gains to be found by doing so.

In a similar vein, this development workstream will eventually enable us to build repositories targeting ARM and RISC-V instruction sets. This will be a ways down the road and the team would need to acquire ARM and RISC-V builders at the appropriate time, but we want to foreshadow this to highlight that our current up front planning of our infrastructure development roadmap will enable very flexible use cases down the road.

### system-model

The system-model approach we are currently developing, is at its heart a declarative definition of the packages comprising a system and where they come from. The team has just landed the first iteration of this to users, and this -- along with Versioned Repositories -- will continue being a development focus into 2026. The system-model approach declares the repositories & packages a user wants to sync their system against. This is currently an opt-in solution with `moss` now automagically generating a system-model.kdl file each time a moss transaction successfully completes.

The team has multiple future ideas of how this system-model can be used with a few examples including:

- Sharing your system-model.kdl file for reproducing your system state for issue tracking and resolution
- Using your system-model.kdl file as part of your install to get your system exactly how you want it at first boot
- Changing your system by updating packages and then reverting back to your desired system-model on next sync
- Being able to pin to older Versioned Repositories (for stability's sake) or if issues occur on the latest rolling Versioned Repository until it's fixed

All of these features, particularly where users could potentially face issues with their installs, are complemented by our offline rollback feature, which gives the ability to manually go back to either of 5 earlier states from the bootloader. This will ensure that users have both offline and online protections to help them recover from a misbehaving system.

<div class="aspect-ratio">
  <iframe src="https://exquisite.tube/videos/embed/pQhJ4MkzZFovnYJVWyebiL" width="1280" height="720" frameborder="0"></iframe>
</div>

<style>
.aspect-ratio {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
}

.aspect-ratio iframe {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
</style>


## Team organisation

We kicked off the year with looking for support in 4 key areas:

- Community management
- Documentation
- Translation
- Web development

As the year has gone on, NomadicCore, Jplatte, bhh32 and CookieSource have joined the team bringing with them a vast amount of experience and enthusiasm.

It's fair to say that community management and documentation development have taken significant steps forward. Web development is a work in progress area with plans being formulated for an eventual re-write of our main website, which frankly needs a lot of work. Translation efforts have been paused (or more accurately never started). The team is prioritising building out the core infrastructure and tooling first, with distro polish taking a back step until the tooling is ready for it.

### Website development

The current state of our website leaves a lot to be desired. We are aware that it needs a full refresh, not only for presentation, but also to include important information as a bare minimum.

The team are looking at options such as Zola and Hugo as alternative Static Site Generators however this is a low priority workstream for now. We are open if anyone has experience in website design and would like to work with the team to develop our website into something to be proud of.

## Distro updates

### DE and WM updates

Over the course of 2025, the team have continued to keep Gnome packaging updated whilst improving upon Cosmic through to its latest stable release. In addition, Reilly Brogan was able to get KDE Plasma packaged up, which expanded our recipe repo size by almost 50%.

All three desktop environments have proved to be stable, though it needs to be said that Cosmic overall has a way to go for true maturity.

We also decided to include a terminal-only option in our installer, which can be used to install and tweak e.g. Sway, Niri (and soon MangoWC) based custom Wayland environments almost from scratch.

For now, we don't have any concrete plans to package up additional DEs or WMs for AerynOS. There are "enough" options for early alpha testers and our core team to work from, and any additional options would simply add an extra maintenance burden on the team that would in turn detract from necessary tooling, infra and overall feature and integration work.

In terms of future potential, it's worth mentioning that AerynOS is first and foremost a forward-looking, Wayland-aligned project, which means that Wayland session support is a minimum requirement for any future DE or WM additions to the repository.


### Installer

At the start of this year, Ikey shared initial screenshots of a GUI based installer that would eventually replace our text based installer as the primary installation method. With Ikey stepping back from the project, the development of this GUI installer took a back seat to allow the team to focus on higher-priority items such as delivering working infra.

Recently, one of our new staff members, Bryan Hyland, began working in the background on a new GUI based installer to eventually fill this role. 

To put it simply, the idea is to eventually use the newly developed system-model approach to define the packages that would be installed per DE / WM and also allow users to use their own custom system-model.kdl files as the basis of an installation.


## Sponsorship

With Ikey stepping away earlier this year, for a period of time, it was unclear whether he would be returning or not. As the months passed by, the prospect of his return grew less and less likely. Therefore, as covered earlier in this blog post, we are now in the latter stages of formally retiring Ikey from the project.

As mentioned previously, at the start of this year, the sponsorship was set up in such a way that all funds were sent directly to Ikey in order to enable him to afford to spend time working on the project and its underpinnings.

However, in light of Ikey's continued absence, the team has taken control of the AerynOS Ko-fi account and redirected the funds from it so they can be used to cover ongoing project running costs.

All other references to sponsorship routes have been removed, leaving Ko-fi as our only official sponsorship medium.

Due to the way Ko-fi sponsorships work, at the point of transition, we had to cancel all existing sponsorships. We are not yet at the point where we are at parity in sponsorship income compared to before they were cancelled, however, we are fully covering direct project costs.

Part of this ability to cover direct project costs can be attributed to how we are spending our money and how we are utilizing as much of our own internal resources (such as ermo's machines) for build capacity. We have also been developing our infrastructure code base to make it as flexible as possible in terms of adding new builders and scheduling builds efficiently based on individual builder resources.

Our sponsorship goals in 2026 will be to continue growing our recurring sponsorships to help cover the backlog of historic project costs, and also to build up towards future hardware investments such as an x86_64-v4 capable builder.

If any hardware vendors are interested in sponsoring the project either financially or through hardware sponsorship, this would be warmly received.

Similarly, we are interested in and open to CDN sponsorship as a way of strengthening our package delivery and ISO download capabilities. If you are in a position to help make this happen, we would love to hear from you.

If you wish to discuss sponsorship details, please reach out to us at contact@aerynos.com.

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

## Going into 2026

For now, there is a deliberate, continued focus on our os-tooling and infrastructure code bases, somewhat at the expense of delivering a fully featured Linux distribution for end users.

As time goes on, the goal is for this balance to naturally shift as our code bases become more capable and featureful.

Over time, and as logical consequence of this shift, we hope to be able to onboard more contributors to help us scale out the recipe repo, once the tooling is in a state where it conveniently allows for this.

If any of this has piqued your interest and made you want to contribute, we invite you to join us over at our [Zulip chat platform](https://aerynos.zulipchat.com).

Hope to see you there!
