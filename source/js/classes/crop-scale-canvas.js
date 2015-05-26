'use strict';

crop.factory('cropScaleCanvas', ['$window', function($window) {
  return function(canvas) {
    var ctx = canvas.getContext('2d'),
        devicePixelRatio = $window.devicePixelRatio || 1,
        backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
                            ctx.mozBackingStorePixelRatio ||
                            ctx.msBackingStorePixelRatio ||
                            ctx.oBackingStorePixelRatio ||
                            ctx.backingStorePixelRatio || 1,
                            densityRatio = devicePixelRatio / backingStoreRatio;

    if (densityRatio > 1) {
      var oldWidth = canvas.width,
          oldHeight = canvas.height;

      canvas.width = oldWidth * densityRatio;
      canvas.height = oldHeight * densityRatio;

      // canvas.style.width = oldWidth + 'px';
      // canvas.style.height = oldWidth + 'px';

      ctx.scale(densityRatio, densityRatio);
    }
  }
}]);
