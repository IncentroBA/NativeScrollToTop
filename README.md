## NativeScrollToTop
Option to scroll to the top of the page. Also (optionally) trigger an action on pull down.

## Features
Add your own arrow icon to the widget.
Set a pull down action (optional).
Set a background color for the scroll to top button.

## Usage
A simple container widget containing a ScrollView and the ability to place widgets inside it. This widget is intended to be used at the highest level of the page and all content of the page to be placed inside.

All content inside will be a part of the scrollable to top area and can be pulled down to refresh.

## Development and contribution

1. Install NPM package dependencies by using: `npm install`. If you use NPM v7.x.x, which can be checked by executing `npm -v`, execute: `npm install --legacy-peer-deps`.
1. Run `npm start` to watch for code changes. On every change:
    - the widget will be bundled;
    - the bundle will be included in a `dist` folder in the root directory of the project;
    - the bundle will be included in the `deployment` and `widgets` folder of the Mendix test project.

[specify contribution]
