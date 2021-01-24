MathsProject

---
id: installation
title: Installation
---

Docusaurus is essentially a set of npm [packages](https://github.com/facebook/docusaurus/tree/master/packages) that can be installed over npm.

:::tip

Use **[new.docusaurus.io](https://new.docusaurus.io)** to test Docusaurus immediately in CodeSandbox.

:::

## Requirements

- [Node.js](https://nodejs.org/en/download/) version >= 10.15.1 or above (which can be checked by running `node -v`). You can use [nvm](https://github.com/nvm-sh/nvm) for managing multiple Node versions on a single machine installed
- [Yarn](https://yarnpkg.com/en/) version >= 1.5 (which can be checked by running `yarn version`). Yarn is a performant package manager for JavaScript and replaces the `npm` client. It is not strictly necessary but highly encouraged.

## Project structure

Assuming you chose the classic template and named your site `my-website`, you will see the following files generated under a new directory `my-website/`:

```sh
my-website
├── blog
│   ├── 2019-05-28-hola.md
│   ├── 2019-05-29-hello-world.md
│   └── 2020-05-30-welcome.md
├── docs
│   ├── doc1.md
│   ├── doc2.md
│   ├── doc3.md
│   └── mdx.md
├── src
│   ├── css
│   │   └── custom.css
│   └── pages
│       ├── styles.module.css
│       └── index.js
├── static
│   └── img
├── docusaurus.config.js
├── package.json
├── README.md
├── sidebars.js
└── yarn.lock
```

### Project structure rundown

- `/blog/` - Contains the blog Markdown files. You can delete the directory if you do not want/need a blog. More details can be found in the [blog guide](blog.md).
- `/docs/` - Contains the Markdown files for the docs. Customize the order of the docs sidebar in `sidebars.js`. More details can be found in the [docs guide](./guides/docs/docs-markdown-features.mdx).
- `/src/` - Non-documentation files like pages or custom React components. You don't have to strictly put your non-documentation files in here but putting them under a centralized directory makes it easier to specify in case you need to do some sort of linting/processing
  - `/src/pages` - Any files within this directory will be converted into a website page. More details can be found in the [pages guide](guides/creating-pages.md).
- `/static/` - Static directory. Any contents inside here will be copied into the root of the final `build` directory.
- `/docusaurus.config.js` - A config file containing the site configuration. This is the equivalent of `siteConfig.js` in Docusaurus 1.
- `/package.json` - A Docusaurus website is a React app. You can install and use any npm packages you like in them.
- `/sidebar.js` - Used by the documentation to specify the order of documents in the sidebar.

## Running the development server

To preview your changes as you edit the files, you can run a local development server that will serve your website and it will reflect the latest changes.

```bash npm2yarn
cd my-website
npm run start
```

By default, a browser window will open at http://localhost:3000.

Congratulations! You have just created your first Docusaurus site! Browse around the site to see what's available.

## Build

Docusaurus is a modern static website generator so we need to build the website into a directory of static contents and put it on a web server so that it can be viewed. To build the website:

```bash npm2yarn
npm run build
```

and contents will be generated within the `/build` directory, which can be copied to any static file hosting service like [GitHub pages](https://pages.github.com/), [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/). Check out the docs on [deployment](deployment.mdx)) for more details.