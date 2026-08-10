---
title: "Development update: os-tools"
date: 2025-07-11T12:18:00Z
authors: [nomadiccore,ermo]
tags: [news]
license: "CC-BY-ND-4.0"
copyright: "Copyright © 2025 aerynOS Developers"
---

In our recent mid-year blog post, we mentioned that it would be the first in a short series of posts providing updates on the various work streams we have been actively progressing during the last few months. Whilst that post focused primarily on our infrastructure, in this one, we will shift our focus towards the work we have been doing around our [os-tools](https://github.com/AerynOS/os-tools).

## Short overview

To recap, our os-tools consist of [Moss](https://aerynos.com/blog/2023/12/19/end-of-year-summary/#moss) and [Boulder](https://aerynos.com/blog/2023/12/19/end-of-year-summary/#boulder). Whilst also originally written in DLang, initial ports of these were built in Rust during the latter half of 2023. Though we made the odd improvement here and there during 2024, through Q2 2025 we set out to review the code, develop an improvement plan and then put that into action.

The **TL;DR** is:

- **Moss:** Existing PRs reviewed, refined and merged (including a PR enabling faster package installation via parallel blitting). The code received various bug fixes and refactors for correctness and maintainability.
- **Boulder:** Similarly, existing PRs reviewed, refined and merged including a few smaller features and packaging macros being added. Since Boulder uses the `moss` crate, it now builds packages slightly quicker due to faster buildroot creation. The odd bugfix was also made.
- **User Experience:** Improved error reporting features were added to both Moss and Boulder to improve the troubleshooting experience for users and packagers. More to be done on this front.

We will be continuing our os-tools work over the coming months with a specific focus on tidying up the code, improving documentation, and ensuring better error handling and status reporting throughout the codebase. This will come in particularly handy when we do the feature work to make us able to produce JSON output as the final part of the alpha2 os-tools milestone.

Overall, this work will help users when they come across unexpected errors and also be beneficial when onboarding new developers.

The JSON output feature, in contrast, is largely targeted at convenient machine parsing of structured output for automation and integration purposes, which we are banking on will come in handy for future development work currently in the planning stages.


## Introducing NomadicCore

Before going any further, you may have noticed my name as one of the authors of our mid-year update blog post. If you hang around our Matrix rooms, you will likely already know me but I thought it prudent to provide a formal introduction.

I first became aware of SerpentOS about three years ago but only joined the Matrix chat rooms in September 2023. I'm not actually a developer or have any coding experience, however, I am interested in open source projects and Linux distributions that can help me get the most out of my hardware. I liked what I saw with SerpentOS and over the course of 2024, started getting involved, trying to help out where I could.

Earlier this year, I ended up formally joining the team, around the time of the AerynOS rebrand, taking more of a support/communications role and providing feedback from an "average user" perspective of what I think might be important.

My focus will mainly be around working on our documentation, writing blog posts and engaging on our various social media platforms and Matrix rooms. I'm looking forward to getting stuck in and helping support a Linux distribution I want to use on my various devices.


## A deeper dive into our os-tools work

Since their port to Rust, our os-tools have been working well enough. However, we are self-aware enough to know that our initial porting efforts left room for improvement, both in code quality and performance.

The following subsections outline some of the os-tools work we have been doing throughout Q2.


### Refactor work

Both [tarkah](https://aerynos.com/blog/2023/12/19/end-of-year-summary/#introducing-tarkah) and new contributor, [Jonas Platte](https://github.com/jplatte), have been working on refactoring our existing codebase. To increase the available insight and diagnostic information, we have decided to align around the use of the `tracing` crate given that important parts of our code base are asynchronous, for which `tracing` is particularly suited.

For error handling, Jonas suggested that we move away from `thiserror` towards `snafu`. Whilst `thiserror` suited our requirements during our initial porting work, `snafu` offers some nice quality of life features and forces us to be more explicit about handling different types of errors, which we hope will yield better longer term maintainability. Moving over to `snafu` requires a little more upfront work to get high quality error output, but we believe that the reward will be worth it once the transition is completed across all of our code base.

Along with this refactor work, tarkah, Jonas and ermo are also improving the documentation within the codebase itself. With the infrastructure code having been ported to Rust, there is now greater scope to reuse and consolidate code between the various tooling crates.

#### Keeping our dependencies up to date

One aspect of managing our tooling is ensuring that our codebase remains up to date. Part of this effort is also to ensure that we are updating our code's dependencies to their own respective latest versions to benefit from bug fixes and performance improvements. Whilst this is an on-going task, some of our dependencies had been allowed to get a little stale. Through multiple commits, Jonas has systematically been updating the dependencies in our os-tools repo.

Part of this upgrade work also involved being able to [lock dependencies](https://github.com/AerynOS/os-tools/pull/504) for Rust packages as a way to ensure robustness of the Moss and Boulder builds we use in production.


### Moss: Parallel blitting

Long-time contributor Joey Riches identified a parallelization improvement in Moss's [blitting](https://aerynos.com/blog/2021/08/10/a-rolling-boulder-gathers-no-moss/#blitting) process which was merged after several months of local testing.

In our testing, the code showed significant speedups across all three of our supported file systems (XFS, ext4 and F2FS). The previous single-threaded blitting made using ext4 and F2FS particularly slow, to the point that we did not recommend users use either filesystem as the basis of an AerynOS install.

However, blitting speeds with the new parallel approach -- particularly with a "cold" kernel VFS cache -- have significantly improved. Whilst ext4 and F2FS are still not as performant as XFS for our use case, they are at least more serviceable as the basis of an AerynOS install than they used to be. By way of an example, I saw a ~2x blitting speed improvement on my Gen4 NVMe SSD using XFS with the new parallel blitting code.

It's worth restating that, to our knowledge, the moss approach to [atomic updates](https://aerynos.com/blog/2025/03/29/aerynos-the-os-as-infrastructure/#%EF%B8%8F-atomic-updates), is the only one of its kind (at least in the Linux space) where users do not have to rely on containerization or A/B system swaps to deliver package updates. Eliminating download speeds as a variable, Moss is capable of atomically installing/updating hundreds of packages on your system in a matter of seconds to tens of seconds on SSD drives, and the installed/upgraded applications are ready to use next time the application is opened. No reboots and no messing with container permissions necessary.

Given that boulder also needs to blit files when it creates buildroots, the code has also had a positive impact on reducing package build times. This will be more evident on larger package builds and will have a cumulative impact, the more package work you end up doing.

### Moss: Sync available before installed packages

As we were testing the upgrade path from our old `packages.aerynos.com/volatile` repository to our new, CDN-backed `cdn.aerynos.dev/unstable` repository, we ran into some unexpected small niggles related to how packages are resolved.

While tarkah's [fix](https://github.com/AerynOS/os-tools/pull/514) to Moss was relatively small in terms of code, it served to ensure that updates would install properly on the first go when syncing to the new repo.

Consequently, we synced this bug-fix to the Moss version in the old repository to ensure that users will be able to seamlessly upgrade to the new rolling `unstable` repository.


### Moss: Add index output directory option

As we were preparing the process for syncing the packages in our `volatile` build-server repository to our new downstream rolling `unstable` repository on our public-facing server, we ran into an issue with the existing `moss index` code path.

Before this issue was fixed, the `stone.index` file would be unconditionally written next to the actual package `.stone` files. This was useful when indexing local repos, but not as useful when indexing actual stone [pool/](https://cdn.aerynos.dev/pool/) directories and sub-directories.

In the end, this was another small [feature](https://github.com/AerynOS/os-tools/pull/523) with somewhat large consequences, in that this enabled us to do the actual manual indexing in a way that is identical to how our infrastructure organizes things when indexing.

This in turns made it possible to make sure that the new rolling `unstable` repo presents with the same URI "pattern" as our volatile build repo:

    ❯ moss lr
     - oldrepo = https://packages.aerynos.com/volatile/x86_64/stone.index [0]
     - unstable = https://cdn.aerynos.dev/unstable/x86_64/stone.index [5]
     - volatile = https://build.aerynos.dev/volatile/x86_64/stone.index [10]
     - local = file:///home/ermo/.cache/local_repo/x86_64/stone.index [100]


### Boulder: Fix up phase timing in end-of-build report

When Boulder successfully completes a package build, it emits a report detailing how long each phase of the build process took.

ermo noticed that the output was wrong when the time exceeded an hour. For example `136m` would be formatted as a rather silly-looking `1h76m` instead of `2h16m`. He fixed this in the following [commit](https://github.com/AerynOS/os-tools/pull/502).


### Boulder: Improve cache hit rates when updating packages

Boulder is designed to cache files and hash them as part of its build process. By hashing files, it uniquely identifies each file and stores this for later utilization. When a package is updated from one version to the next, where the package has files that have not changed, we have the opportunity to reuse the cache from a prior build (as long as the cache has not been purged for space saving).

Given the way boulder previously cached files, in named directories based on the package source names, there was a high likelihood that new caches would have to be built because the source file names contain version numbers, which by design will always change.

Reilly [implemented](https://github.com/AerynOS/os-tools/pull/483) a change to boulder so that our ccache entries will persist over version number updates improving the hit rate and therefore performance on boulder package builds.


### Boulder: Tweak how we use sh-compatible shells

For user-facing recipes, our recipe snippets are now always interpreted by bash.

However, testing with `hyperfine` has previously shown that dash is ~20% faster to start up during `./configure` runs when compared to bash.

To reap the benefits of faster dash process startup times, ermo and Reilly [implemented](https://github.com/AerynOS/os-tools/pull/477) a change to our GNU autotools macros to use dash as the default shell.

Having said that, there are certain packages that just expect and/or are hardcoded to require bash. So to cater to that use case, we have also added autotools macros that packagers can use to make Boulder execute GNU autotools with bash on a per-package basis.

This gives our tooling the "dash as /bin/sh" `./configure` speed improvements by default, yet allows packagers to still successfully invoke `./configure` _et al._ with bash, where doing so is necessary for the build to complete.


### Boulder: Update build macros

On reviewing Boulder's build macros, we found some low hanging fruit improvements to make to our cmake, ninja, and meson macros, which we [landed](https://github.com/AerynOS/os-tools/pull/451) back in April. Implementing and improving the various build macros available in AerynOS makes it easier and more convenient for packagers to package up applications with Boulder; either for their own personal use or for submission into the official repositories.


### Boulder: Use bsdtar-static for unpacking

At Reilly's initiative, we moved our decompression solution away from GNU tar to bsdtar-static. This [change](https://github.com/AerynOS/os-tools/pull/500) reduces the likelihood of compatibility issues and ensures Boulder package creation doesn't rely on a dynamically linked system library, thus making it more of a reliable solution.

With this move, we have also [added](https://github.com/AerynOS/os-tools/pull/535) the ability to decompress tgz based source packages as part of the boulder build process.


## Other notable work

Some of the work we have done has been aimed more at how we use our os-tools rather than the os-tools themselves.


### Update build triple and fix up ARM AArch targets

With our recent transition from SerpentOS to AerynOS, we needed to update our build triple accordingly. This step has been [completed](https://github.com/AerynOS/os-tools/pull/450) in the background whilst allowing for seamless updates from older SerpentOS systems onto AerynOS based systems. This is part of a wider rebranding effort that is still on-going through our documentation site, repo READMEs and anywhere else we have an official presence.

In this same area, whilst AerynOS currently only supports `x86_64` based devices, there is a desire to be able to target other system types longer term. One of our contributors has been experimenting with RISC-V so we have added [preliminary support](https://github.com/AerynOS/os-tools/pull/448) for this to aid their testing. Don't expect to see AerynOS on RISC-V any time soon, but it's great to see our distro becoming a sandbox for fun and experimenting on alternative systems.


### Emul32 ELF Machine type migration

During the port of boulder from DLang over to Rust, there was a change in how we expressed the ISA for packages built for the x86 emul32 architecture target. The old DLang version of Boulder expressed it as `x86` where the Rust `elf` crate expresses it as `386` (`EM_386` for those of you familiar with ELF parsing internals).

Reilly took point in [implementing](https://github.com/AerynOS/os-tools/pull/493) a series of changes that retained full compatibility between packages originally built on the old DLang infrastructure, and newer packages built on the Rust infrastructure.

The end goal was to flush out the packages containing references to the `x86` Emul32 ISA through the recent rebuild of our whole recipes repository. This was accomplished by first ensuring that all packages exposed _both_ `x86` and `386` provider patterns, and then subsequently dropping the code that wrote the `x86` provider patterns during the second full repo rebuild, ensuring that packages only contained the `386` provider patterns.

In the end, this worked out nicely for us.


## Current and near-future os-tools focus

We reviewed the open issues in our various GitHub repositories and the plethora of ideas we have for our tooling, and developed a high level set of milestones for our os-tools. For this milestone (os-tools alpha2), we want to focus on:

- Adding structured logging for better insight and reporting
- Improving error handling
- Ensuring we deliver more helpful message output
- Adding JSON output for the above, for nicer parsing of structured output across process barriers
- Adding low hanging fruit features and fixing misfeatures as we review the code

As our readers may have surmised, we have slowly accumulated bits of technical debt here and there over the course of development. The os-tools alpha2 milestone is our chance to address that and make our code crisp, clean and ready for already-planned future development work, while we stabilize our new infra code in parallel to this effort.

A special thank you goes to Jonas for the work he has already done in terms of this sort of refactor work.

## How to join in the fun

As already covered in this blog, we have been reviewing all open issues and PRs in our os-tools repository on GitHub for prioritization and to set internal milestones.

We are open to and actively looking for contributors who might be interested in looking through our code and providing feedback.

If you would like to try your hand at contributing, look out for issues marked "good first issue" and get in touch on [Matrix](https://matrix.to/#/#aerynos:matrix.org).

We hope to see you there!
