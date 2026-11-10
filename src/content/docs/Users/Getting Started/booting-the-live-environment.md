---
title: 'Booting the Live Environment'
lastUpdated: 2026-10-02T15:00:00Z
description: "Booting into the aerynOS Live Environment"
sidebar:
  order: 5
license: "CC-BY-SA-4.0"
copyright: "Copyright © 2025 aerynOS Developers"
---

## Booting from a USB Drive

:::caution
Currently NVIDIA Drivers are not implemented by the live environment and will fallback to nouveau drivers.
:::

1. Insert the bootable USB drive into your system and boot from the USB drive.
2. Adjust or override your BIOS settings to boot from the USB drive.
3. You should see the aerynOS boot process, and you will be presented with the live environment.
4. **If utilizing Ventoy** select the aerynOS ISO file to boot from.

### Editing kernel command line boot parameters

To edit kernel command boot parameters, hold down the SHIFT key on your keyboard until an UEFI boot menu shows up on your screen.

Press 'e' to edit the kernel command line boot parameters for the entry you have selected.

If you have trouble getting the ISO to boot, we recommend that you edit the kernel command line as follows:

- Remove the `quiet splash` parameters
- Add the `SYSTEMD_SULOGIN_FORCE=1 rd.break rd.shell` parameters.
- If you want to blacklist a certain kernel driver module, add `rd.driver.blacklist=<drivername>[,<drivername>, ...]`

We use `dracut` to generate our live initramfs image. You can see all the supported `dracut` command line parameters in the [`dracut.cmdline` manual page](https://man7.org/linux/man-pages/man7/dracut.cmdline.7.html).

To boot with the new parameters, press the Enter key.

If the fonts are too big on your screen, you can run `setfont ter-vXXn` in the shell you are dropped into. The `XX` parameter is the height of the terminus console font in pixels. The size used by default is 32.

## Testing the Live Environment

:::tip
For a representative experience, you will need to install aerynOS. The live environment will run slower than an installed system due to the limitations of running from a USB drive.
:::

Once you have booted into the live environment, you can test aerynOS without installing it on your system.

- Explore the desktop environment.
- Test the pre-installed applications.
- Check the system performance.
- Verify the hardware compatibility.
- Connect to the internet and browse the web.
