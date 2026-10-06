# aerynOS website

## Prerequisites for editing and viewing the site locally

If this is your first encounter with a git-based workflow, we recommend that you study up on what git is and how git (and GitHub) works. One such tutorial is available [here](https://docs.github.com/en/get-started).

## NodeJS install prerequisites

Before attempting to compile and show the website locally, please ensure that:

- NodeJS is installed on your system
- `pnpm` is available and in your path
  - with NodeJS installed, you can run the following from your ${HOME} directory:
    ```
    npm install pnpm@latest-11
    ```
  - Make sure you add `${HOME}/node_modules/.bin` to your shell ${PATH}
- With the above prerequisites satisfied, clone the present repo and cd into the root of it.
- Then run:

``` 
  pnpm install
  ```

## How to build and show the site locally in your browser

After the above import and install operations have completed successfully on your system, run:

  ``` 
  pnpm run dev
  ```

... and follow the instructions shown.

At this point, any time you edit a page, the changes should show up live in your browser.

When you are happy with your edits, commit your changes in your local git repository and create a Pull Request from said local changes.

### Suggested writing style guide

We recommend that you consult the [Solus documentation style guide](https://help.getsol.us/docs/user/contributing/style/) when it comes to how to address your target audience.

### Example github commit message

When describing your changes, [use imperative mood, present tense and an active voice](https://github.com/joelparkerhenderson/git-commit-message/).

Example:

```
packaging: Add goober subsection on frobnicating

- Add up front context that the user needs to know
- Ensure that the structure flows naturally from start to finish
- Simplify the fiddlybob section language to shorter, international english sentences
- Run spellcheck on the changes to ensure they are written in US English.
```

## Licences

 This repository contains multiple types of content, each under its own licence:

| Content | Licence |
|---------|---------|
| Blog posts (src/content/docs/blog/) | [CC BY-ND 4.0](LICENSES/CC-BY-ND-4.0.txt) |
| Documentation (src/content/docs/) | [CC BY-SA 4.0](LICENSES/CC-BY-SA-4.0.txt) |
| Website code (Anything else) | [MIT](LICENSES/MIT.txt) |

### Website Code (MIT)

The website build configuration, templates, and code are licensed under the MIT licence.

### Blog Posts (CC BY-ND 4.0)

Blog articles may be redistributed but not modified under the Creative Commons Attribution-NoDerivatives 4.0 International licence.

### Documentation (CC BY-SA 4.0)

All documentation content may be shared and adapted under the terms of the Creative Commons Attribution-ShareAlike 4.0 International licence.

### Other

Some files might have a different license. See the file's content for details.

## Documentation

### Suggested writing style guide

We recommend that you consult the [Solus documentation style guide](https://help.getsol.us/docs/user/contributing/style/) when it comes to how to address your target audience.

### Example github commit message

When describing your changes, [use imperative mood, present tense and an active voice](https://github.com/joelparkerhenderson/git-commit-message/).

Example:

```
packaging: Add goober subsection on frobnicating

- Add up front context that the user needs to know
- Ensure that the structure flows naturally from start to finish
- Simplify the fiddlybob section language to shorter, international english sentences
- Run spellcheck on the changes to ensure they are written in US English.
```
