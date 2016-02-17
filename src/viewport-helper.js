( function( window, undefined ) {
  'use strict';

  var zones = [
    {key: 'full', ratio: (1/1)},
    {key: 'side', ratio: (0.19/0.81)},
    {key: 'bottom', ratio: (1/0.19)}
  ];

  window.alert = function () { console.log(arguments); };

  var bodyElem    = window.document.body,
      ratio       = bodyElem.clientWidth/bodyElem.clientHeight,
      currentZone = 'full',
      minDiff     = Infinity;

  for(var i in zones) {
    var z     = zones[i],
        diff  = Math.abs(z.ratio - ratio);

    if ( diff < minDiff ) {
      minDiff     = diff;
      currentZone = z.key;
    }
  }

  window.setZoneScale = function () {
    var scale = ( bodyElem.clientWidth + bodyElem.clientHeight ) / (1920+1080);
    document.body.style.fontSize = scale + 'em';
  };


  bodyElem.classList.add('zone-' + currentZone);
  window.currentZone = currentZone;

} )( window );
