---
title: "Mid Year Update"
date: 2025-06-30T21:37:00Z
authors: [nomadiccore,ermo]
tags: [news]
license: "CC-BY-ND-4.0"
copyright: "Copyright © 2025 aerynOS Developers"
---

As we hit the middle of the year, it's time for another update for those of you following along with AerynOS's development.

Over the last few months, things may have seemed unusually quiet, however rest assured that there has been A LOT going on in the background. As such, we are preparing a short series of blog posts to go over the relevant topics in the coming weeks.

For this blog post, we are going to cover our infrastructure port, along with the process of rebuilding our entire package repository.

**The TL;DR is that:**

- All core AerynOS tooling is now written in Rust
- Every recipe in the repository has been rebuilt (twice!) with many packages then having been updated to newer versions after the rebuilds were completed
- A CDN has been implemented for faster package installation and ISO downloads

## New infrastructure tooling

When delivering a Linux distribution, its infrastructure and associated processes effectively act as the "spine" of the project. But spine surgery can be a delicate affair, particularly when it comes to rehabilitation after successful surgery.

For us, this cycle has been particularly demanding, as we have completed an MVP (Minimum Viable Product) port of our infrastructure tooling code to Rust, meaning that all core AerynOS tooling has now fully transitioned away from DLang.

We have covered the reasons for this transition [previously](https://aerynos.com/blog/2023/09/06/oxidised-moss/), and it's fair to say that we are already feeling the benefits of easy and native reuse of code in our tooling repositories and welcoming more Rust contributors into our community.

### Why now?

Earlier this year, our existing DLang build infrastructure started showing signs of instability and required more and more manual intervention to successfully land packages. 

Given our prior decision to transition our tooling over to Rust, we had already stopped further development of the DLang based infrastructure. Hence, we decided to accelerate our transition timeline for the infrastructure re-write to Rust with tarkah and ermo leading the development activity, which began at the end of March.

Towards the end of May, we put the first infrastructure prototype to the test, and then iteratively fixed bugs and built out missing functionality to the point of being able to put our MVP into production on our build infrastructure.

This MVP will serve as the development base of the code that will be used for all future package builds.

<details>
<summary>What do we mean by infra?</summary>

Our [infra](https://github.com/AerynOS/infra) is comprised of the Summit, Avalanche and Vessel service components:

- **Summit:** Package build-controller, build-orchestrator and build-dashboard, monitors recipes tree and automatically builds new, incoming recipes once they show up
- **Avalanche:** Build agent middleware, takes build orders from Summit and builds them with Boulder on a remote system, sends build logs back in real time to Summit, and reports the build result to summit at the end of the build.
- **Vessel:** Package repository manager. Summit tells Vessel which packages and other build artefacts to expect from a build task that Avalanche has completed, and then Avalanche pushes those packages and build artefacts to Vessel, which then saves them in the appropriate place and re-indexes the repository with the new packages, so users can install/update them.

</details>


We have some cool features planned in AerynOS that we envision will make package maintenance a lot easier to manage through smart use of automation.

Until these features are implemented, however, maintaining the AerynOS repository will remain somewhat human resource intensive. This is the main reason why the repository is consciously being kept "small" for now, with us deliberately focusing on having packages that will help developers and contributors improve AerynOS, while still delivering a nice Daily Driver experience.

Until the new features are implemented, this will necessarily be a balancing act between maintaining the package repository so it doesn't go stale vs. having the development time to implement the new features.

### How did you test it?

Aside from porting the infrastructure code to Rust, proper testing was required to yield confidence that packages were both successfully built on the new infrastructure and that they worked as expected. 

The end goal was to prove that we were able to rebuild the full AerynOS recipes repository (currently at ~950 recipes) from start to finish without infra-related build errors on the new infra.

To enable the rebuild, ermo set up a distributed build cluster of four builders of varying hardware specifications. A separate branch of the 'recipes' repository was created, and was used to test both the Rust infrastructure and to land packages for internal testing without them being seeded to user installs.

In addition, compared to the old infra, we made it simpler to add new avalanche build agents to the build cluster, thus making it very simple to scale out our build cluster as required.

To summarise the infrastructure Rust re-write and testing effort, we have:

- Completed more than 3k recipe builds
- Deployed the new Rust infrastructure on the AerynOS builders and continue to use it on ermo's build cluster
- Validated that the new infrastructure code is more stable and performant at runtime than the previous DLang version

### How did testing add value?

The full rebuild of the recipes repository has also served to ensure ABI sanity for dependencies. Additionally, we can now say that at this point in time, the whole AerynOS repository is known to be buildable and works with all the latest toolchains.

A special thanks goes to Reilly Brogan, who worked diligently with ermo to not only drive the rebuild process, but also to ensure that some longstanding repository issues were corrected as part of the rebuild process. 

During this process, we have delivered updates to our os-tools (Boulder and Moss), toolchains and build systems. A selection of the updates and additions include (but is certainly not limited to):

- Linux 6.14.11 (6.15.x on the way)
- LLVM 20.1.7
- GCC 15.1.1
- Rust 1.88.0
- Golang 1.24.4
- Mesa 25.1.4
- GNOME 48.2
- COSMIC 1.0.0_alpha7
- Sway 1.11
- Firefox 140.0.1
- Thunderbird v139.0.2
- Uutils-coreutils 0.1.0
- Nodejs 22.14.0
- Wine 10.8
- Distrobox added at v1.8.1.2
- Exfatprogs added at v1.2.9
- Fzf added at v0.62.0
- Kitty added at v0.41.1
- Waybar added at v0.12.0

## A New Package Repository

As mentioned earlier, the testing work was [conducted](https://github.com/orgs/AerynOS/discussions/47) on a separate branch of the [recipes repository](https://github.com/AerynOS/recipes). Consequently, those of you on the old `packages.aerynos.com/volatile/` repository, have not received any updates over the last 10-12 weeks.

This was a conscious decision to ensure that the mostly untested packages built during the infrastructure testing process did not reach end users immediately. Even though AerynOS is in Alpha and under continuous development, we still do our best not to break user systems if we can avoid it!

Now that we have a level of testing in place, with this blog post, we are announcing a new rolling `unstable` package repository for users. The old `volatile` package repository has received one final update to Moss that fixes an important bug when transitioning to the new `unstable` repository.

To ease the transition to the new repository for existing users, we are working on a script that can automatically modify the active repository on the system.

Once this script has been sufficiently productized, the next time existing users update their systems, they will notice that every single package will show an update available. 

The exact number will vary from system to system depending on how many other packages are installed from the repository but for context, on a base AerynOS GNOME install, this is around 500 packages.

In the meantime, we have created a manual guide on how to transition existing installs to the new repository in our GitHub Discussions forum [here](https://github.com/orgs/AerynOS/discussions/53). The process is fairly simple, but if you do have any issues transitioning manually, do get in touch via a comment under the GitHub Discussions [post](https://github.com/orgs/AerynOS/discussions/53) or via [Matrix](https://matrix.to/#/#aerynos:matrix.org).

### Content Delivery Network for Packages and ISOs

A common bit of feedback we have been receiving relates to the download speed of our repository, namely that it is not fast or even acceptable, especially if you live outside of Europe. This became more evident for those using the rebuild repository on ermo's rebuild testing server, which felt noticeably faster for people in Europe in particular.

To remedy this, we have implemented CDN caching for our new `cdn.aerynos.dev` hosted assets. This means there will be synced copies of our ISOs and package repository on CDN servers around the world, which should help improve download speeds.

In particular, the new rolling `unstable` package repository mentioned above will be served via this CDN for the benefit of our users.

Please let us know how you get on with AerynOS ISO and package downloads in the coming weeks, as we would love to validate the improvement outside of our own internal testing.

## Future infrastructure development targets

So far, we have only outlined what we have already accomplished since late March.

The next part of this blog post is going to be a brief outline of where we are going from here in terms of infrastructure and repository development.

### Versioned Repositories

With the transition to the new infrastructure and the new `unstable` repository, we have been freed up to begin planning out the necessary steps to be able to deliver versioned repositories and versioned Moss format upgrades.

These topics have been mentioned in a previous blog [post](https://aerynos.com/blog/2025/02/06/hello-2025/#-versioned-repositories).

### How do versioned repositories add value?

Versioned Repositories will enable us to deploy new Boulder and Moss features in a seamless fashion. This will enable us to introduce breaking code and on-disk format changes, that would otherwise cause installed systems to require manual intervention for them to continue to receive updates.

Once versioned repositories are in place, the goal is that users will be able to simply update and sync their system as normal via the `sudo moss sync -u` command.
 
With this:

- Users will be upgraded to the new versions of Moss that uses a new repository format, without having to pay special attention.
- It will enable AerynOS to iteratively expand the capability of Moss and Boulder on existing systems without breaking user systems in the process.

### Additional Opportunities

We consider versioned repositories a pre-requisite for what we call "try-builds" and eventually multi-arch support.

- Automated try-builds denotes the process whereby the infrastructure discovers an update to the upstream source repository of a package, attempts to auto-update the recipe and then attempts to build the updated package recipe in question.
- We think this will be a useful tool for contributors as it will automate some of the packaging tedium related to simple package version updates. It will also help enable automated regression testing and build flag optimisation in a future workstream.
- Included under the multi-arch umbrella is our ability to target ARM, RISC-V, and different x86 architecture levels such as x86-64-v3 or v4.

## Project Status

### Infra

Within the previous 3 month period, we have rebuilt a brand new Rust version of the infrastructure tooling that is robust enough to run in production on AerynOS servers, delivering packages to our contributors and users. This new version has proven to be more stable and performant than the old DLang version we were previously using.

### Packaging

From a day to day perspective, unlocking the infrastructure means that we can get back to reviewing and landing recipe PRs for our [package maintainers](https://github.com/orgs/AerynOS/discussions/52) or accepting new contributors into our AerynOS ecosystem. For those wishing to [contribute](https://aerynos.dev/packaging/workflow/basic-workflow/) to AerynOS, please make sure that you have manually [switched over](https://github.com/orgs/AerynOS/discussions/53) to our new repositories before making submissions to ensure you are using all the latest tooling.

Alternatively, you can wait until the automatic transition script is functional and have it make the change for you.

### Where to get in touch with us

If you want to engage with the team, feel free to drop by our GitHub [Discussions](https://github.com/orgs/AerynOS/discussions), raise issues across our various repositories or if you're interested in contributing, feel free to raise PRs where you think our code can be improved or where you want to submit recipes for our repo.

We also have our matrix space that you can access via this [link](https://matrix.to/#/#aerynos:matrix.org):
- The Development room in particular is a great place for discussions around our code.
- The General room is a great place to drop by and get to know the team.
- The Packaging room is where you want to be if you're interested in building packages for yourself and/or submitting them to the repository.

### What's next?

Concurrently to our work around the infrastructure re-write and repository rebuild, there has been several additional workstreams running in the background.

The team has been refactoring our existing Rust code, mainly focused on our os-tools (Moss and Boulder) and we are working on several additional improvements that we want to get over the finish line before our next ISO release.

We will be sharing details of this work in upcoming blog posts over the next few weeks.
