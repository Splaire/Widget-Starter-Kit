# Splaire Widget workflow #

A widget requires to following files:

* index.html
* script.js
* style.scss
* params.json

The workflow is provided by [Gulp](http://gulpjs.com/) and served over HTTP thanks to [Sinatra](http://www.sinatrarb.com/).

## Widget requirements ##
A widget should be fully responsive to height and width and width of the zone it is placed in.

Because the players can be used on both 1080p and 720p screens, mediaqueries are a bit complex. The `viewport-helper.js` file helps to build for the correct zone-type.

There are four distinct zone types. The zone types are based on their width/height ratio.

```
Zone      Helper ID     Ratio     WxH @ 720p    WxH @1080p
Full      full          1.00      1280x672      1920x1080
Content   full          1.00      1037x583      1556x875
Side      side          0.23       243x583     	  364x875
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

A list of supported features is available upon request. Please send an email to [support@splaire.com](mailto:support@splaire.com).

### Params.json ###
The `params.json` file is a dummy file that emulates variables passed on by the Splaire server. In the production environment these variables are configurable. This enables a little customization for each widget.

Example JSON file:

```json
{
  "version": "0.0.1",
  "color": "#f60"
}
```

You can use these variables in your code like this:

```scss
// style.scss
$color: unquote('<%= @options[:color] %>');
```

```js
// script.js
var version = '<%= @options[:version] %>';
```

## Development ##
A little guide to get you up and running.

### Setup ###
- Install [Ruby](https://www.ruby-lang.org/en/)
- Install [Node](http://nodejs.org/) (Pro-tip: Use [NVM](https://github.com/creationix/nvm))
- Install two gems: sinatra and json. With `gem install sinatra json`
- Run `npm install` in the root directory. This will install the required node modules.
- Install the [LiveReload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei) browser plugin to enable automatically reloading the browser after changes.
- Don't forget to run `npm install` after you pull in some new commits. Modules might have changed.

### Usage ###
To start working on a widget `cd` into the widget directory and issue the command: `gulp --cwd .`  
After that, Gulp will take care of all your file handling and serving your site over HTTP. Open the following URL in your browser: [http://localhost:4567](http://localhost:4567)

If you just want to build the latest version of a widget, then run: `gulp build --cwd .`
