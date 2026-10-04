---
title: "Stage1 Complete"
date: 2020-08-08T15:15:04+01:00
draft: false
authors: [ikey]
tags: [news]
license: "CC-BY-ND-4.0"
copyright: "Copyright © 2020 aerynOS Developers"
---

Short and sweet, stage1 of the bootstrap is complete. As I indicated on the _Lispy Snake_[^1] blog, I'm still in the process of settling into new accommodation. This is going well, but still awaiting proper broadband connectivity. Work has begun, however, and we're now moving onto stage2 of the bootstrap.

This is handled via our [bootstrap-scripts](https://github.com/serpent-os/)[^2] project and can be run by anyone on a relatively modern Linux distribution.

![Validating stage1 cross-compiler](./progress.webp "Validating stage1 cross-compiler")

Next on the list is completing stage2, which we've already started on. This is simply a cross-compiled chroot environment with all the basic bits in place to build stage3, sanitizing and cleansing the toolchain.

Even though it is early days, we can already, automatically produce a working cross-compiler that targets LLVM's `libc++`, the musl `libc.so`, and `x86_64-serpent-linux-musl` host triplet.

Probably a dull update for most, but an update it is.

---
[^1]:  Since this blog post, the Lipsy Snake website no longer exists.
[^2]:  Since this blog post, the bootstrap-scripts project no longer exists.
