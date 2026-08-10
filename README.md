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

    pnpm run dev

... and follow the instructions shown.

At this point, any time you edit a page, the changes should show up live in your browser.

## Licences

 This repository contains multiple types of content, each under its own licence:

| Content | Licence |
|---------|---------|
| Blog posts (src/content/docs/blog/) | [CC BY-ND 4.0](LICENSES/CC-BY-ND-4.0.txt) |
| Website code (Anything else) | [MIT](LICENSES/MIT.txt) |

### Website Code (MIT)

The website build configuration, templates, and code are licensed under the MIT licence.

### Blog Posts (CC BY-ND 4.0)

Blog articles may be redistributed but not modified under the Creative Commons Attribution-NoDerivatives 4.0 International licence.

### Other

Some files might have a different license. See the file's content for details.
