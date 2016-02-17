/* jshint ignore:start */
// Embed external libraries here
/* jshint ignore:end */

var version = '<%= @options[:version] %>';
var color   = '<%= @options[:color] %>';

console.log('Ahoy tharr!');


window.setZoneScale(); // This sets the root font-size, so everything (that is in css em) will be scaled according to the size of the screen
