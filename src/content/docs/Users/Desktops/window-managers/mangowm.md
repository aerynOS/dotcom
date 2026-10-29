---
title: 'MangoWM'
lastUpdated: 2026-10-02T15:00:00Z
description: "Install and configure the MangoWM Wayland compositor"
sidebar:
  order: 10
license: "CC-BY-SA-4.0"
copyright: "Copyright © 2026 aerynOS Developers"
---

[MangoWM](https://mangowm.github.io/) is a minimal Wayland compositor focused on simplicity and performance.

## Installing MangoWM

Install MangoWM with `moss`:

```bash
sudo moss pkg add mangowm
```

## Starting MangoWM

After installation, select the MangoWM session from your display manager or start it from a [Kmscon TTY](https://github.com/kmscon/kmscon#gui-application).

```bash
kmscon-launch-gui mango
```

## Autostarting MangoWM

aerynOS uses a stateless configuration approach that keeps system-managed defaults separate from user customizations. User-specific Bash or Zsh configuration files should be placed in `~/.bashrc.d/` or `~/.zshrc.d/` respectively, where they are automatically sourced during shell initialization(Therefore, no shebang is required).
These can carry any name, but must end in `.*sh`. Examples: `mango.sh` & `start.bash` or `mango_start.zsh` if you are using Zsh as your login shell. This allows customization's such as starting MangoWM to be maintained independently, without modifying system-wide configuration files or replacing the default shell configuration.

```bash
# mango_start.sh:
# Starts MangoWM after Kmscon TTY login.
# $- and TERM_SESSION_TYPE limit this to only interactive Kmscon sessions.
# Also skips on already existing Wayland sessions and SSH logins.
# pgrep prevents autostarting a second MangoWM instance on another TTY.

if [[ $- == *i* ]] &&
   [ "$TERM_SESSION_TYPE" = "kms" ] &&
   [ "$XDG_SESSION_TYPE" = "tty" ] &&
   [ -z "$WAYLAND_DISPLAY" ] &&
   [ -z "$SSH_CONNECTION" ] &&
   ! pgrep -x mango >/dev/null 2>&1; then
    exec kmscon-launch-gui mango
fi
```

## Configuration

Refer to the official Mango documentation:

- [Quick start](https://mangowm.github.io/docs/quick-start/)
- [Configuration basics](https://mangowm.github.io/docs/configuration/basics/)
