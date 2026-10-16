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
sudo moss install mangowm
```

## Starting MangoWM

After installation, select the MangoWM session from your display manager or start it from a [Kmscon TTY](https://github.com/kmscon/kmscon#gui-application).

```bash
kmscon-launch-gui mango
```

## Autostarting MangoWM

Put the following snippet into your `.bash_profile` inside your home directory, to autostart MangoWM as a non display manager user after [Kmscon TTY](https://github.com/kmscon/kmscon#gui-application) login. Make sure bash is configured as your **login shell**.

```bash
# ~/.bash_profile

[ -f ~/.bashrc ] && . ~/.bashrc

if [ -z "$WAYLAND_DISPLAY" ] && [ -z "$SSH_CONNECTION" ]; then
    exec kmscon-launch-gui mango
fi
```

## Configuration

Refer to the official Mango documentation:

- [Quick start](https://mangowm.github.io/docs/quick-start/)
- [Configuration basics](https://mangowm.github.io/docs/configuration/basics/)
