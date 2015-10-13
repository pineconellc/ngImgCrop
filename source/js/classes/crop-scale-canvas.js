'use strict';

crop.factory('cropScaleCanvas', ['$window', function($window) {
  return {
    getDensityRatio: function(ctx) {
      var devicePixelRatio = $window.devicePixelRatio || 1,
          backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
                              ctx.mozBackingStorePixelRatio ||
                              ctx.msBackingStorePixelRatio ||
                              ctx.oBackingStorePixelRatio ||
                              ctx.backingStorePixelRatio || 1;
      return devicePixelRatio / backingStoreRatio;
    },
    resetScale: function(ctx) {
      var densityRatio = this.getDensityRatio(ctx);
      ctx.scale(densityRatio, densityRatio);
    },
    resetDimensions: function(canvas) {
      var ctx = canvas.getContext("2d"),
          densityRatio = this.getDensityRatio(ctx);

      if (densityRatio > 1) {
        var oldWidth = canvas.width,
            oldHeight = canvas.height;
        canvas.width = oldWidth * densityRatio;
        canvas.height = oldHeight * densityRatio;
      }
    }
  }
}]);
