# Splaire widget starter kit #
This repository helps you to get up and running to develop a widget for the Splaire.it Narrowcasting platform.

Developing a widget requires to following files:

* index.html
* script.js
* style.scss
* params.json

The workflow is provided by [Gulp](http://gulpjs.com/) and served over HTTP thanks to [Sinatra](http://www.sinatrarb.com/).

## Distribution ##
Are you done developing your awesome widget? Send us an email at [support@splaire.com](mailto:support@splaire.com) and we'll review and publish the widget. Please mention if you want the widget to be added to a specific account or the public library.

The final widget should consist of one HTML file with all assets inlined. External requests for assets that should be static are not allowed.

## Widget requirements ##

### Design ###
A widget should be fully responsive to height and width and width of the zone it is placed in.

Because the players can be used on both 1080p and 720p screens, mediaqueries are a bit complex. The `viewport-helper.js` file helps to build for the correct zone-type.

There are four distinct zone types. The zone types are based on their width/height ratio.

```
Zone      Helper ID     Ratio     WxH @ 720p    WxH @1080p
Full      full          1.00      1280x672      1920x1080
Content   full          1.00      1037x583      1556x875
Side      side          0.23       243x583     	 364x875
Bottom    bottom        5.26      1280x137      1920x205
```


The viewport-helper adds a CSS class to the body element according to the current zone. For example `zone-bottom` if the widget resembles the bottom widget ratio. You can find the current zone in Javascript via `window.currentZone`.

A visual example of the various zones:

```
--------------------      --------------------
|           |      |      |                  |
|  CONTENT  | SIDE |      |                  |
|           |      |      |       FULL       |
--------------------      |                  |
|     BOTTOM       |      |                  |
--------------------      --------------------

```

### Browser features ###
The widget will be run in an Android WebView. This resembles Google Chrome v30. Gulp will autoprefix your SCSS for this version. You will have to take care of the correct polyfills for your Javascript yourself (if applicable).

**Widgets do not support inline video elements. Some none-native players are unable to render these correctly.**

A list of supported features is available upon request. Please send an email to [support@splaire.com](mailto:support@splaire.com).

## Widget API ##
The widget will be rendered as an [ERB](https://en.wikipedia.org/wiki/ERuby) file and is exposed to the Widget API.
At the moment the API only offers one method: `getParam(paramName: string)`. This method will return a value that the user submitted when adding the widget to a playlist.

Some examples on how to use the API:
```scss
// style.scss
$color: unquote('<%= getParam("color") %>');
```

```js
// script.js
var version = '<%= getParam("version") %>';
```

```erb
<!-- index.html -->
<span><%= getParam("version") %></span>
```


### Fixture ###
The `params.json` file is a dummy file that emulates variables passed on by the Splaire server. In the production environment these variables are configurable. This enables a little customization for each widget.

Example JSON file:

```json
{
  "version": "0.0.1",
  "color": "#f60"
}
```

## Workflow ##
A little guide to get you up and running.

### Setup ###
- Install [Ruby](https://www.ruby-lang.org/en/)
- Install [Node](http://nodejs.org/) (Pro-tip: Use [NVM](https://github.com/creationix/nvm))
- Install two gems: sinatra and json. With `gem install sinatra json`
- Run `npm install` in the root directory. This will install the required node modules.
- (optionally) Install the [LiveReload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei) browser plugin to enable automatically reloading the browser after changes.
- Don't forget to run `npm install` after you pull in new commits! Modules might have changed.

### Usage ###
To start working on a widget just issue the command: `gulp develop`  
After that, Gulp will take care of all your file handling and serving your site over HTTP. Open the following URL in your browser: [http://localhost:4567](http://localhost:4567)

Use the url [http://localhost:4567/preview](http://localhost:4567/preview) to open the widget in our "screen emulator". The previewer shows your widget three times in the triple-zone layout. This preview function will be improved in the future for better debugging.

If you just want to build the latest version of the widget, then run: `gulp`

## Todos ##
* Add control to rotate screen in previewer
* Add control to select another layout in previewer
* Add control to change size
