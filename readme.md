# Gulp Chestnut

*Not a Gulp module!* This is just a boilerplate project template with a few commonly-used Gulp modules and pipelines for SCSS and Javascript compilation.

My goal with this is to build a versatile, easy-to-use precompilation tooling environment that I can re-use when doing frontend development using *Gulp* and *Bower*.

To use this, you need an understanding of `npm`, `bower`, `gulp` and `sass`,

## Prerequisites

- *[Node Package Manager](https://www.npmjs.com/get-npm)* - for installing all of those Node packages, the foundation of a good development diet.
- *[Bower](https://bower.io/)* - Similar to Node, but used mostly for frontend plugins included in the completed code, rather than build tools.
- *[Gulp](https://gulpjs.com/)* - The engine that takes all your code and compiles it into.

## Getting Started

### Quick Version

1. `npm install` - to install the right stuff under the hood.
2. `bower install` - to get some stuff from Bower.
3. Configure Gulp - change the Gulp tasks to your liking to use the libraries you require for the project.
4. `gulp build` - to compile Javascript libraries into one file.
5. `gulp watch` - to watch the working files to compile them into minified versions.
6. Happy coding!

### Not-So-Quick Version

1. *Install Node and Node Package Manager* - Node is the Javascript server technology that powers Node Package Manager, a great tool to manage dependencies.
2. *Install Node Packages* - Using NPM, install the dependencies for this boilerplate by running `npm install` in the console.
3. *Install Bower Packages* - `bower install` to install front-end code for the demo environment and libraries for your product.
4. *Configure Gulpfile* - Add the libraries that you installed in Bower to the library compilation tasks as required.
5. *Compile libraries* - `gulp build` - to compile Javascript libraries into one file.
6.
7. `gulp watch` - to watch the working files to compile them into minified versions.
8. You're all set.

### Folder Structure

- `/_source` - _contains all dev code which is compiled into production code._ This folder is intended for all the code in the plugin or product being developed.
  - `/js` - _Javascript Source._ Compiled into single files, as well as a single minified library that includes all the code, saved into `dist/js`.
  - `/scss` - _Sass Source._ Compiled into single files, as well as a single minified library that includes all the code, saved into `dist/css`.
- `/demo` - A folder where you can create a preview for the code product you're building.
  - `/source` - _contains dev code for the demo environment._ Similar to the main proudct _source_, but for the demo area.
    - `/js` - _Javascript Source for demo environment._ Compiled to `demo/js`.
    - `/scss` - _SCSS Source for demo environment._ Compiled to `demo/css`.
  - `/css`
  - `/images`
  - `/js`
  - `index.html` - Home page for the demo environment. Also a good place to use for dev purposes.
- `/dist` - The folder where your completed production code is saved.
  - `/css`
  - `/js`
- `package.json` - contains `npm` development dependencies. Change as needed.
- `bower.json` - contains frontend code dependencies. Change as needed.

## Authors

* **Quintin Schnehage** - *Initial work*

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
