# A11y Toggle

A tiny script (less than 0.6Kb gzipped) to build accessible content toggles. You can try the [live demo which also acts as a documentation](http://edenspiekermann.github.io/a11y-toggle/).

a11y-toggle uses relatively modern JavaScript API (namely `reduce`, `addEventListener`, etc.) therefore will not work in Internet Explorer 8 and below. All the other browsers, including mobile ones should work fine.


## Install

```sh
npm install --save a11y-toggle
```

```sh
bower install a11y-toggle
```


## Tests

[Mocha](https://mochajs.org/) and [expect.js](https://github.com/Automattic/expect.js) are used to run browser tests.

```
npm test
```


## Deploy example

The [example page](http://edenspiekermann.github.io/a11y-toggle/) is deployed through [GitHub Pages](https://pages.github.com/). 

```
npm run deploy
```
