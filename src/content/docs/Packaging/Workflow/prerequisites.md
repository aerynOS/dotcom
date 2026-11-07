---
title: 'Prerequisites'
lastUpdated: 2026-10-02T15:00:00Z
description: "Prerequisites for building packages on aerynOS"
sidebar:
  order: 3
license: "CC-BY-SA-4.0"
copyright: "Copyright © 2025 aerynOS Developers"
---

To set up a aerynOS system to be able to build package recipes, a few prerequisites need to be installed, and a new directory for storing local build artifacts needs to be set up.


## Installing the `build-essential` package

We maintain a `build-essential` metapackage that should contain the basics for getting started with packaging on aerynOS.

```bash
sudo moss sync -u
sudo moss pad build-essential
```


## Activating the aerynOS helper scripts

The easiest way to create a local repository is to use the helper script distributed with the aerynOS recipe repository in the `tools/` directory.

Start by cloning the recipes/ git repository:

```bash
mkdir -pv Projects/aerynos/
pushd Projects/aerynos
git clone https://github.com/aerynOS/recipes
```

After the recipes/ git repository has been cloned, symlink helpers.bash into `~/.bashrcd.d/`:

```bash
popd
mkdir -pv ~/.bashrc.d/
ln -sv ~/Projects/aerynos/recipes/tools/helpers.bash ~/.bashrc.d/90-aerynos-helpers.bash
```

Finally, execute the following in a new terminal tab:

```bash
cd ~
gotoaosrepo
```

If the helpers script has been correctly loaded, the `gotoaosrepo` command should switch to the directory containing the recipes/ git repository clone.


### Setting up git config, hooks and linters

The `just` command runner should have been installed as part of `build-essential`.

Run the following:

```bash
gotoaosrepo
just init
```

This will setup git hooks that will lint for the most common packaging errors upon git commit, as well as fill out commit message templates for you to edit as appropriate.

It will also setup your repository git config so you can view `git diff`
output for binary `manifest.*.bin` files in both `git diff` and
`git log -p .` invocations. The recipe repo already contains the
`.gitattributes` file that sets up the `moss` diff filter referenced
here.

And it will also add a `git gone` alias to your repository git config,
such that executing `git gone` will remove any local branches that no
longer exist upstream.

See [Using git](/packaging/workflow/using-git/) for how those hooks work, the one-commit-per-package rule, and a reference of the git commands we use.

## Adding /etc/subuid and /etc/subgid entries

Since `boulder` uses user-namespaces to set up isolated build roots, it is necessary to set up a subuid and a subgid file for the relevant users first:

```bash
sudo touch /etc/sub{uid,gid}
sudo usermod --add-subuids 1000000-1065535 --add-subgids 1000000-1065535 root
sudo usermod --add-subuids 1065536-1131071 --add-subgids 1065536-1131071 "$USER"
```

If `/etc/subuid` and `/etc/subgid` already exist, adapt the above as appropriate.
