# freeworld-code-challenge

## Setup

Install parcel, which we use as an all-in-one dev server, bundler, and installation tool.
`npm i -g parcel-bundler`

You will still need to generate css with tailwind, which you can do with:
`npm run buildCSS`

Then just run:
`parcel src/index.html`

You shouldn't need to do anything else, parcel should handle installation of all dependencies when run and setup the dev server at `http://localhost:1234`.

To deploy to production, follow these steps:
- Run `npm run buildCSSProd`. This will strip out unused css
- Run `parcel build src/index.html --public-url ./freeworld-code-challenge`
- If deploying to github pages, you can deploy the `dist` folder to a `gh-pages` branch in your repo by running: `npm run push-gh-pages`. This will take the `dist` folder on your local machine, and override whatever is on your `gh-pages` branch with it.
