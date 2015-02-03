/*! ngImgCrop v0.3.2 License: MIT */!function(){"use strict";var e=angular.module("ngImgCrop",[]);e.factory("cropAreaCircle",["cropArea",function(e){var t=function(){e.apply(this,arguments),this._boxResizeBaseSize=20,this._boxResizeNormalRatio=.9,this._boxResizeHoverRatio=1.2,this._iconMoveNormalRatio=.9,this._iconMoveHoverRatio=1.2,this._boxResizeNormalSize=this._boxResizeBaseSize*this._boxResizeNormalRatio,this._boxResizeHoverSize=this._boxResizeBaseSize*this._boxResizeHoverRatio,this._posDragStartX=0,this._posDragStartY=0,this._posResizeStartX=0,this._posResizeStartY=0,this._posResizeStartSize=0,this._boxResizeIsHover=!1,this._areaIsHover=!1,this._boxResizeIsDragging=!1,this._areaIsDragging=!1};return t.prototype=new e,t.prototype._calcCirclePerimeterCoords=function(e){var t=this._width/2,i=Math.floor(this._aspect[1]*(this._width/2)/this._aspect[0]),r=e*(Math.PI/180),s=this._x+t*Math.cos(r),a=this._y+i*Math.sin(r);return[s,a]},t.prototype._calcResizeIconCenterCoords=function(){return this._calcCirclePerimeterCoords(-45)},t.prototype._isCoordWithinArea=function(e){return Math.sqrt((e[0]-this._x)*(e[0]-this._x)+(e[1]-this._y)*(e[1]-this._y))<this._width/2},t.prototype._isCoordWithinBoxResize=function(e){var t=this._calcResizeIconCenterCoords(),i=this._boxResizeHoverSize/2;return e[0]>t[0]-i&&e[0]<t[0]+i&&e[1]>t[1]-i&&e[1]<t[1]+i},t.prototype._drawArea=function(e,t,i,r){var s=t[0]-i/2,a=t[1]-r/2,o=.5522848,n=i/2*o,h=r/2*o,c=s+i,g=a+r,u=s+i/2,l=a+r/2;e.beginPath(),e.moveTo(s,l),e.bezierCurveTo(s,l-h,u-n,a,u,a),e.bezierCurveTo(u+n,a,c,l-h,c,l),e.bezierCurveTo(c,l+h,u+n,g,u,g),e.bezierCurveTo(u-n,g,s,l+h,s,l),e.stroke()},t.prototype.draw=function(){e.prototype.draw.apply(this,arguments),this._cropCanvas.drawIconMove([this._x,this._y],this._areaIsHover?this._iconMoveHoverRatio:this._iconMoveNormalRatio),this._cropCanvas.drawIconResizeBoxNESW(this._calcResizeIconCenterCoords(),this._boxResizeBaseSize,this._boxResizeIsHover?this._boxResizeHoverRatio:this._boxResizeNormalRatio)},t.prototype.processMouseMove=function(e,t){var i="default",r=!1,s=this._ctx.canvas.height,a=this._ctx.canvas.width;if(this._boxResizeIsHover=!1,this._areaIsHover=!1,this._areaIsDragging)this._x=e-this._posDragStartX,this._y=t-this._posDragStartY,this._areaIsHover=!0,i="move",r=!0,this._events.trigger("area-move");else if(this._boxResizeIsDragging){i="nesw-resize";var o=e-this._posResizeStartX,n=this._posResizeStartSize+o,h=this._width,c=this._height,g=this.getScale(),u=Math.ceil(g*this._minSize),l=Math.max(u,this._unscaledMinSize,n),d=Math.floor(this._aspect[1]*l/this._aspect[0]);if(a>=l&&s>=d){this._width=l,this._height=d;var f=(this._width-h)/2,p=(this._height-c)/2;this._x+=f,this._y+=-1*p,this._boxResizeIsHover=!0,r=!0,this._events.trigger("area-resize")}}else this._isCoordWithinBoxResize([e,t])?(i="nesw-resize",this._areaIsHover=!1,this._boxResizeIsHover=!0,r=!0):this._isCoordWithinArea([e,t])&&(i="move",this._areaIsHover=!0,r=!0);return this._dontDragOutside(),angular.element(this._ctx.canvas).css({cursor:i}),r},t.prototype.processMouseDown=function(e,t){this._isCoordWithinBoxResize([e,t])?(this._areaIsDragging=!1,this._areaIsHover=!1,this._boxResizeIsDragging=!0,this._boxResizeIsHover=!0,this._posResizeStartX=e,this._posResizeStartY=t,this._posResizeStartSize=this._width,this._events.trigger("area-resize-start")):this._isCoordWithinArea([e,t])&&(this._areaIsDragging=!0,this._areaIsHover=!0,this._boxResizeIsDragging=!1,this._boxResizeIsHover=!1,this._posDragStartX=e-this._x,this._posDragStartY=t-this._y,this._events.trigger("area-move-start"))},t.prototype.processMouseUp=function(){this._areaIsDragging&&(this._areaIsDragging=!1,this._events.trigger("area-move-end")),this._boxResizeIsDragging&&(this._boxResizeIsDragging=!1,this._events.trigger("area-resize-end")),this._areaIsHover=!1,this._boxResizeIsHover=!1,this._posDragStartX=0,this._posDragStartY=0},t}]),e.factory("cropAreaSquare",["cropArea",function(e){var t=function(){e.apply(this,arguments),this._resizeCtrlBaseRadius=10,this._resizeCtrlNormalRatio=.75,this._resizeCtrlHoverRatio=1,this._iconMoveNormalRatio=.9,this._iconMoveHoverRatio=1.2,this._resizeCtrlNormalRadius=this._resizeCtrlBaseRadius*this._resizeCtrlNormalRatio,this._resizeCtrlHoverRadius=this._resizeCtrlBaseRadius*this._resizeCtrlHoverRatio,this._posDragStartX=0,this._posDragStartY=0,this._posResizeStartX=0,this._posResizeStartY=0,this._posResizeStartWidth=0,this._posResizeStartHeight=0,this._resizeCtrlIsHover=-1,this._areaIsHover=!1,this._resizeCtrlIsDragging=-1,this._areaIsDragging=!1};return t.prototype=new e,t.prototype._calcSquareCorners=function(){var e=this._width/2,t=this._height/2;return[[this._x-e,this._y-t],[this._x+e,this._y-t],[this._x-e,this._y+t],[this._x+e,this._y+t]]},t.prototype._calcSquareDimensions=function(){var e=this._width/2,t=this._height/2;return{left:this._x-e,top:this._y-t,right:this._x+e,bottom:this._y+t}},t.prototype._isCoordWithinArea=function(e){var t=this._calcSquareDimensions();return e[0]>=t.left&&e[0]<=t.right&&e[1]>=t.top&&e[1]<=t.bottom},t.prototype._isCoordWithinResizeCtrl=function(e){for(var t=this._calcSquareCorners(),i=-1,r=0,s=t.length;s>r;r++){var a=t[r];if(e[0]>a[0]-this._resizeCtrlHoverRadius&&e[0]<a[0]+this._resizeCtrlHoverRadius&&e[1]>a[1]-this._resizeCtrlHoverRadius&&e[1]<a[1]+this._resizeCtrlHoverRadius){i=r;break}}return i},t.prototype._drawArea=function(e,t,i,r){var s=i/2,a=r/2;e.rect(t[0]-s,t[1]-a,i,r)},t.prototype.draw=function(){e.prototype.draw.apply(this,arguments),this._cropCanvas.drawIconMove([this._x,this._y],this._areaIsHover?this._iconMoveHoverRatio:this._iconMoveNormalRatio);for(var t=this._calcSquareCorners(),i=0,r=t.length;r>i;i++){var s=t[i];this._cropCanvas.drawIconResizeCircle(s,this._resizeCtrlBaseRadius,this._resizeCtrlIsHover===i?this._resizeCtrlHoverRatio:this._resizeCtrlNormalRatio)}},t.prototype.processMouseMove=function(e,t){var i="default",r=!1,s=this._ctx.canvas.height,a=this._ctx.canvas.width;if(this._resizeCtrlIsHover=-1,this._areaIsHover=!1,this._areaIsDragging)this._x=e-this._posDragStartX,this._y=t-this._posDragStartY,this._areaIsHover=!0,i="move",r=!0,this._events.trigger("area-move");else if(this._resizeCtrlIsDragging>-1){var o,n;switch(this._resizeCtrlIsDragging){case 0:o=-1,n=-1,i="nwse-resize";break;case 1:o=1,n=-1,i="nesw-resize";break;case 2:o=-1,n=1,i="nesw-resize";break;case 3:o=1,n=1,i="nwse-resize"}var h=(e-this._posResizeStartX)*o,c=this._posResizeStartWidth+h,g=this._width,u=this._height,l=this.getScale(),d=Math.ceil(l*this._minSize),f=Math.max(d,this._unscaledMinSize,c),p=Math.floor(this._aspect[1]*f/this._aspect[0]);if(a>=f&&s>=p){this._width=f,this._height=p;var _=(this._width-g)/2,v=(this._height-u)/2;this._x+=_*o,this._y+=v*n,this._resizeCtrlIsHover=this._resizeCtrlIsDragging,r=!0,this._events.trigger("area-resize")}}else{var m=this._isCoordWithinResizeCtrl([e,t]);if(m>-1){switch(m){case 0:i="nwse-resize";break;case 1:i="nesw-resize";break;case 2:i="nesw-resize";break;case 3:i="nwse-resize"}this._areaIsHover=!1,this._resizeCtrlIsHover=m,r=!0}else this._isCoordWithinArea([e,t])&&(i="move",this._areaIsHover=!0,r=!0)}return this._dontDragOutside(),angular.element(this._ctx.canvas).css({cursor:i}),r},t.prototype.processMouseDown=function(e,t){var i=this._isCoordWithinResizeCtrl([e,t]);i>-1?(this._areaIsDragging=!1,this._areaIsHover=!1,this._resizeCtrlIsDragging=i,this._resizeCtrlIsHover=i,this._posResizeStartX=e,this._posResizeStartY=t,this._posResizeStartWidth=this._width,this._posResizeStartHeight=this._height,this._events.trigger("area-resize-start")):this._isCoordWithinArea([e,t])&&(this._areaIsDragging=!0,this._areaIsHover=!0,this._resizeCtrlIsDragging=-1,this._resizeCtrlIsHover=-1,this._posDragStartX=e-this._x,this._posDragStartY=t-this._y,this._events.trigger("area-move-start"))},t.prototype.processMouseUp=function(){this._areaIsDragging&&(this._areaIsDragging=!1,this._events.trigger("area-move-end")),this._resizeCtrlIsDragging>-1&&(this._resizeCtrlIsDragging=-1,this._events.trigger("area-resize-end")),this._areaIsHover=!1,this._resizeCtrlIsHover=-1,this._posDragStartX=0,this._posDragStartY=0},t}]),e.factory("cropArea",["cropCanvas",function(e){var t=function(t,i){this._ctx=t,this._events=i,this._minSize=80,this._unscaledMinSize=40,this._cropCanvas=new e(t),this._image=new Image,this._x=0,this._y=0,this._width=200,this._aspect=[1,1],this._height=Math.floor(this._aspect[1]*this._width/this._aspect[0])};return t.prototype.getImage=function(){return this._image},t.prototype.setImage=function(e){this._image=e},t.prototype.getX=function(){return this._x},t.prototype.setX=function(e){this._x=e,this._dontDragOutside()},t.prototype.getY=function(){return this._y},t.prototype.setY=function(e){this._y=e,this._dontDragOutside()},t.prototype.getSize=function(){return this._width},t.prototype.setSize=function(e){var t=this.getScale(),i=Math.round(t*this._minSize);this._width=Math.max(i,this._unscaledMinSize,e),this._height=Math.floor(this._aspect[1]*this._width/this._aspect[0]),this._dontDragOutside()},t.prototype.getWidth=function(){return this._width},t.prototype.setWidth=function(e){this.setSize(e)},t.prototype.getHeight=function(){return this._height},t.prototype.setHeight=function(e){var t=Math.floor(this._aspect[1]*this._minSize/this._aspect[0]),i=Math.max(t,e),r=Math.floor(this._aspect[0]*i/this._aspect[1]);this.setSize(r)},t.prototype.getMinSize=function(){return this._minSize},t.prototype.setMinSize=function(e){this._minSize=e,this._width=Math.max(this._minSize,this._width),this._height=Math.floor(this._aspect[1]*this._width/this._aspect[0]),this._dontDragOutside()},t.prototype.getAspect=function(){return this._aspect},t.prototype.setAspect=function(e,t){this._aspect=[e,t],this._dontDragOutside()},t.prototype.getScale=function(){var e=this._ctx.canvas.width/this._image.width,t=this._ctx.canvas.height/this._image.height;return(isNaN(e)||isNaN(t)||!isFinite(e)||!isFinite(t))&&(e=1,t=1),Math.max(e,t)},t.prototype._dontDragOutside=function(){var e=this._ctx.canvas.height,t=this._ctx.canvas.width;this._width>t&&(this._width=t),this._height>e&&(this._height=e),this._x<this._width/2&&(this._x=this._width/2),this._x>t-this._width/2&&(this._x=t-this._width/2),this._y<this._height/2&&(this._y=this._height/2),this._y>e-this._height/2&&(this._y=e-this._height/2)},t.prototype._drawArea=function(){},t.prototype.draw=function(){this._cropCanvas.drawCropArea(this._image,[this._x,this._y],this._width,this._height,this._drawArea)},t.prototype.processMouseMove=function(){},t.prototype.processMouseDown=function(){},t.prototype.processMouseUp=function(){},t}]),e.factory("cropCanvas",[function(){var e=[[-.5,-2],[-3,-4.5],[-.5,-7],[-7,-7],[-7,-.5],[-4.5,-3],[-2,-.5]],t=[[.5,-2],[3,-4.5],[.5,-7],[7,-7],[7,-.5],[4.5,-3],[2,-.5]],i=[[-.5,2],[-3,4.5],[-.5,7],[-7,7],[-7,.5],[-4.5,3],[-2,.5]],r=[[.5,2],[3,4.5],[.5,7],[7,7],[7,.5],[4.5,3],[2,.5]],s=[[-1.5,-2.5],[-1.5,-6],[-5,-6],[0,-11],[5,-6],[1.5,-6],[1.5,-2.5]],a=[[-2.5,-1.5],[-6,-1.5],[-6,-5],[-11,0],[-6,5],[-6,1.5],[-2.5,1.5]],o=[[-1.5,2.5],[-1.5,6],[-5,6],[0,11],[5,6],[1.5,6],[1.5,2.5]],n=[[2.5,-1.5],[6,-1.5],[6,-5],[11,0],[6,5],[6,1.5],[2.5,1.5]],h={areaOutline:"#fff",resizeBoxStroke:"#fff",resizeBoxFill:"#444",resizeBoxArrowFill:"#fff",resizeCircleStroke:"#fff",resizeCircleFill:"#444",moveIconFill:"#fff"};return function(c){var g=function(e,t,i){return[i*e[0]+t[0],i*e[1]+t[1]]},u=function(e,t,i,r){c.save(),c.fillStyle=t,c.beginPath();var s,a=g(e[0],i,r);c.moveTo(a[0],a[1]);for(var o in e)o>0&&(s=g(e[o],i,r),c.lineTo(s[0],s[1]));c.lineTo(a[0],a[1]),c.fill(),c.closePath(),c.restore()};this.drawIconMove=function(e,t){u(s,h.moveIconFill,e,t),u(a,h.moveIconFill,e,t),u(o,h.moveIconFill,e,t),u(n,h.moveIconFill,e,t)},this.drawIconResizeCircle=function(e,t,i){var r=t*i;c.save(),c.strokeStyle=h.resizeCircleStroke,c.lineWidth=2,c.fillStyle=h.resizeCircleFill,c.beginPath(),c.arc(e[0],e[1],r,0,2*Math.PI),c.fill(),c.stroke(),c.closePath(),c.restore()},this.drawIconResizeBoxBase=function(e,t,i){var r=t*i;c.save(),c.strokeStyle=h.resizeBoxStroke,c.lineWidth=2,c.fillStyle=h.resizeBoxFill,c.fillRect(e[0]-r/2,e[1]-r/2,r,r),c.strokeRect(e[0]-r/2,e[1]-r/2,r,r),c.restore()},this.drawIconResizeBoxNESW=function(e,r,s){this.drawIconResizeBoxBase(e,r,s),u(t,h.resizeBoxArrowFill,e,s),u(i,h.resizeBoxArrowFill,e,s)},this.drawIconResizeBoxNWSE=function(t,i,s){this.drawIconResizeBoxBase(t,i,s),u(e,h.resizeBoxArrowFill,t,s),u(r,h.resizeBoxArrowFill,t,s)},this.drawCropArea=function(e,t,i,r,s){var a=e.width/c.canvas.width,o=e.height/c.canvas.height,n=t[0]-i/2,g=t[1]-r/2;for(c.save(),c.strokeStyle=h.areaOutline,c.lineWidth=2,c.beginPath(),s(c,t,i,r),c.stroke(),c.clip();i*a>e.width;)i--;for(;r*o>e.height;)r--;i>0&&r>0&&c.drawImage(e,n*a,g*o,i*a,r*o,n,g,i,r),c.beginPath(),s(c,t,i,r),c.stroke(),c.clip(),c.restore()}}}]),e.service("cropEXIF",[function(){function e(e){return!!e.exifdata}function t(e,t){t=t||e.match(/^data\:([^\;]+)\;base64,/im)[1]||"",e=e.replace(/^data\:([^\;]+)\;base64,/gim,"");for(var i=atob(e),r=i.length,s=new ArrayBuffer(r),a=new Uint8Array(s),o=0;r>o;o++)a[o]=i.charCodeAt(o);return s}function i(e,t){var i=new XMLHttpRequest;i.open("GET",e,!0),i.responseType="blob",i.onload=function(){(200===this.status||0===this.status)&&t(this.response)},i.send()}function r(e,r){function o(t){var i=s(t),o=a(t);e.exifdata=i||{},e.iptcdata=o||{},r&&r.call(e)}if(e.src)if(/^data\:/i.test(e.src)){var n=t(e.src);o(n)}else if(/^blob\:/i.test(e.src)){var h=new FileReader;h.onload=function(e){o(e.target.result)},i(e.src,function(e){h.readAsArrayBuffer(e)})}else{var c=new XMLHttpRequest;c.onload=function(){if(200!==this.status&&0!==this.status)throw"Could not load image";o(c.response),c=null},c.open("GET",e.src,!0),c.responseType="arraybuffer",c.send(null)}else if(window.FileReader&&(e instanceof window.Blob||e instanceof window.File)){var h=new FileReader;h.onload=function(e){u&&console.log("Got file of length "+e.target.result.byteLength),o(e.target.result)},h.readAsArrayBuffer(e)}}function s(e){var t=new DataView(e);if(u&&console.log("Got file of length "+e.byteLength),255!==t.getUint8(0)||216!==t.getUint8(1))return u&&console.log("Not a valid JPEG"),!1;for(var i,r=2,s=e.byteLength;s>r;){if(255!==t.getUint8(r))return u&&console.log("Not a valid marker at offset "+r+", found: "+t.getUint8(r)),!1;if(i=t.getUint8(r+1),u&&console.log(i),225===i)return u&&console.log("Found 0xFFE1 marker"),g(t,r+4,t.getUint16(r+2)-2);r+=2+t.getUint16(r+2)}}function a(e){var t=new DataView(e);if(u&&console.log("Got file of length "+e.byteLength),255!==t.getUint8(0)||216!==t.getUint8(1))return u&&console.log("Not a valid JPEG"),!1;for(var i=2,r=e.byteLength,s=function(e,t){return 56===e.getUint8(t)&&66===e.getUint8(t+1)&&73===e.getUint8(t+2)&&77===e.getUint8(t+3)&&4===e.getUint8(t+4)&&4===e.getUint8(t+5)};r>i;){if(s(t,i)){var a=t.getUint8(i+7);a%2!==0&&(a+=1),0===a&&(a=4);var n=i+8+a,h=t.getUint16(i+6+a);return o(e,n,h)}i++}}function o(e,t,i){for(var r,s,a,o,n,h=new DataView(e),g={},u=t;t+i>u;)28===h.getUint8(u)&&2===h.getUint8(u+1)&&(o=h.getUint8(u+2),o in _&&(a=h.getInt16(u+3),n=a+5,s=_[o],r=c(h,u+5,a),g.hasOwnProperty(s)?g[s]instanceof Array?g[s].push(r):g[s]=[g[s],r]:g[s]=r)),u++;return g}function n(e,t,i,r,s){var a,o,n,c=e.getUint16(i,!s),g={};for(n=0;c>n;n++)a=i+12*n+2,o=r[e.getUint16(a,!s)],!o&&u&&console.log("Unknown tag: "+e.getUint16(a,!s)),g[o]=h(e,a,t,i,s);return g}function h(e,t,i,r,s){var a,o,n,h,g,u,l=e.getUint16(t+2,!s),d=e.getUint32(t+4,!s),f=e.getUint32(t+8,!s)+i;switch(l){case 1:case 7:if(1===d)return e.getUint8(t+8,!s);for(a=d>4?f:t+8,o=[],h=0;d>h;h++)o[h]=e.getUint8(a+h);return o;case 2:return a=d>4?f:t+8,c(e,a,d-1);case 3:if(1===d)return e.getUint16(t+8,!s);for(a=d>2?f:t+8,o=[],h=0;d>h;h++)o[h]=e.getUint16(a+2*h,!s);return o;case 4:if(1===d)return e.getUint32(t+8,!s);for(o=[],h=0;d>h;h++)o[h]=e.getUint32(f+4*h,!s);return o;case 5:if(1===d)return g=e.getUint32(f,!s),u=e.getUint32(f+4,!s),n=new Number(g/u),n.numerator=g,n.denominator=u,n;for(o=[],h=0;d>h;h++)g=e.getUint32(f+8*h,!s),u=e.getUint32(f+4+8*h,!s),o[h]=new Number(g/u),o[h].numerator=g,o[h].denominator=u;return o;case 9:if(1===d)return e.getInt32(t+8,!s);for(o=[],h=0;d>h;h++)o[h]=e.getInt32(f+4*h,!s);return o;case 10:if(1===d)return e.getInt32(f,!s)/e.getInt32(f+4,!s);for(o=[],h=0;d>h;h++)o[h]=e.getInt32(f+8*h,!s)/e.getInt32(f+4+8*h,!s);return o}}function c(e,t,i){for(var r="",s=t;t+i>s;s++)r+=String.fromCharCode(e.getUint8(s));return r}function g(e,t){if("Exif"!==c(e,t,4))return u&&console.log("Not valid EXIF data! "+c(e,t,4)),!1;var i,r,s,a,o,h=t+6;if(18761===e.getUint16(h))i=!1;else{if(19789!==e.getUint16(h))return u&&console.log("Not valid TIFF data! (no 0x4949 or 0x4D4D)"),!1;i=!0}if(42!==e.getUint16(h+2,!i))return u&&console.log("Not valid TIFF data! (no 0x002A)"),!1;var g=e.getUint32(h+4,!i);if(8>g)return u&&console.log("Not valid TIFF data! (First offset less than 8)",e.getUint32(h+4,!i)),!1;if(r=n(e,h,h+g,d,i),r.ExifIFDPointer){a=n(e,h,h+r.ExifIFDPointer,l,i);for(s in a){switch(s){case"LightSource":case"Flash":case"MeteringMode":case"ExposureProgram":case"SensingMethod":case"SceneCaptureType":case"SceneType":case"CustomRendered":case"WhiteBalance":case"GainControl":case"Contrast":case"Saturation":case"Sharpness":case"SubjectDistanceRange":case"FileSource":a[s]=p[s][a[s]];break;case"ExifVersion":case"FlashpixVersion":a[s]=String.fromCharCode(a[s][0],a[s][1],a[s][2],a[s][3]);break;case"ComponentsConfiguration":a[s]=p.Components[a[s][0]]+p.Components[a[s][1]]+p.Components[a[s][2]]+p.Components[a[s][3]]}r[s]=a[s]}}if(r.GPSInfoIFDPointer){o=n(e,h,h+r.GPSInfoIFDPointer,f,i);for(s in o){switch(s){case"GPSVersionID":o[s]=o[s][0]+"."+o[s][1]+"."+o[s][2]+"."+o[s][3]}r[s]=o[s]}}return r}var u=!1,l=this.Tags={36864:"ExifVersion",40960:"FlashpixVersion",40961:"ColorSpace",40962:"PixelXDimension",40963:"PixelYDimension",37121:"ComponentsConfiguration",37122:"CompressedBitsPerPixel",37500:"MakerNote",37510:"UserComment",40964:"RelatedSoundFile",36867:"DateTimeOriginal",36868:"DateTimeDigitized",37520:"SubsecTime",37521:"SubsecTimeOriginal",37522:"SubsecTimeDigitized",33434:"ExposureTime",33437:"FNumber",34850:"ExposureProgram",34852:"SpectralSensitivity",34855:"ISOSpeedRatings",34856:"OECF",37377:"ShutterSpeedValue",37378:"ApertureValue",37379:"BrightnessValue",37380:"ExposureBias",37381:"MaxApertureValue",37382:"SubjectDistance",37383:"MeteringMode",37384:"LightSource",37385:"Flash",37396:"SubjectArea",37386:"FocalLength",41483:"FlashEnergy",41484:"SpatialFrequencyResponse",41486:"FocalPlaneXResolution",41487:"FocalPlaneYResolution",41488:"FocalPlaneResolutionUnit",41492:"SubjectLocation",41493:"ExposureIndex",41495:"SensingMethod",41728:"FileSource",41729:"SceneType",41730:"CFAPattern",41985:"CustomRendered",41986:"ExposureMode",41987:"WhiteBalance",41988:"DigitalZoomRation",41989:"FocalLengthIn35mmFilm",41990:"SceneCaptureType",41991:"GainControl",41992:"Contrast",41993:"Saturation",41994:"Sharpness",41995:"DeviceSettingDescription",41996:"SubjectDistanceRange",40965:"InteroperabilityIFDPointer",42016:"ImageUniqueID"},d=this.TiffTags={256:"ImageWidth",257:"ImageHeight",34665:"ExifIFDPointer",34853:"GPSInfoIFDPointer",40965:"InteroperabilityIFDPointer",258:"BitsPerSample",259:"Compression",262:"PhotometricInterpretation",274:"Orientation",277:"SamplesPerPixel",284:"PlanarConfiguration",530:"YCbCrSubSampling",531:"YCbCrPositioning",282:"XResolution",283:"YResolution",296:"ResolutionUnit",273:"StripOffsets",278:"RowsPerStrip",279:"StripByteCounts",513:"JPEGInterchangeFormat",514:"JPEGInterchangeFormatLength",301:"TransferFunction",318:"WhitePoint",319:"PrimaryChromaticities",529:"YCbCrCoefficients",532:"ReferenceBlackWhite",306:"DateTime",270:"ImageDescription",271:"Make",272:"Model",305:"Software",315:"Artist",33432:"Copyright"},f=this.GPSTags={0:"GPSVersionID",1:"GPSLatitudeRef",2:"GPSLatitude",3:"GPSLongitudeRef",4:"GPSLongitude",5:"GPSAltitudeRef",6:"GPSAltitude",7:"GPSTimeStamp",8:"GPSSatellites",9:"GPSStatus",10:"GPSMeasureMode",11:"GPSDOP",12:"GPSSpeedRef",13:"GPSSpeed",14:"GPSTrackRef",15:"GPSTrack",16:"GPSImgDirectionRef",17:"GPSImgDirection",18:"GPSMapDatum",19:"GPSDestLatitudeRef",20:"GPSDestLatitude",21:"GPSDestLongitudeRef",22:"GPSDestLongitude",23:"GPSDestBearingRef",24:"GPSDestBearing",25:"GPSDestDistanceRef",26:"GPSDestDistance",27:"GPSProcessingMethod",28:"GPSAreaInformation",29:"GPSDateStamp",30:"GPSDifferential"},p=this.StringValues={ExposureProgram:{0:"Not defined",1:"Manual",2:"Normal program",3:"Aperture priority",4:"Shutter priority",5:"Creative program",6:"Action program",7:"Portrait mode",8:"Landscape mode"},MeteringMode:{0:"Unknown",1:"Average",2:"CenterWeightedAverage",3:"Spot",4:"MultiSpot",5:"Pattern",6:"Partial",255:"Other"},LightSource:{0:"Unknown",1:"Daylight",2:"Fluorescent",3:"Tungsten (incandescent light)",4:"Flash",9:"Fine weather",10:"Cloudy weather",11:"Shade",12:"Daylight fluorescent (D 5700 - 7100K)",13:"Day white fluorescent (N 4600 - 5400K)",14:"Cool white fluorescent (W 3900 - 4500K)",15:"White fluorescent (WW 3200 - 3700K)",17:"Standard light A",18:"Standard light B",19:"Standard light C",20:"D55",21:"D65",22:"D75",23:"D50",24:"ISO studio tungsten",255:"Other"},Flash:{0:"Flash did not fire",1:"Flash fired",5:"Strobe return light not detected",7:"Strobe return light detected",9:"Flash fired, compulsory flash mode",13:"Flash fired, compulsory flash mode, return light not detected",15:"Flash fired, compulsory flash mode, return light detected",16:"Flash did not fire, compulsory flash mode",24:"Flash did not fire, auto mode",25:"Flash fired, auto mode",29:"Flash fired, auto mode, return light not detected",31:"Flash fired, auto mode, return light detected",32:"No flash function",65:"Flash fired, red-eye reduction mode",69:"Flash fired, red-eye reduction mode, return light not detected",71:"Flash fired, red-eye reduction mode, return light detected",73:"Flash fired, compulsory flash mode, red-eye reduction mode",77:"Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",79:"Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",89:"Flash fired, auto mode, red-eye reduction mode",93:"Flash fired, auto mode, return light not detected, red-eye reduction mode",95:"Flash fired, auto mode, return light detected, red-eye reduction mode"},SensingMethod:{1:"Not defined",2:"One-chip color area sensor",3:"Two-chip color area sensor",4:"Three-chip color area sensor",5:"Color sequential area sensor",7:"Trilinear sensor",8:"Color sequential linear sensor"},SceneCaptureType:{0:"Standard",1:"Landscape",2:"Portrait",3:"Night scene"},SceneType:{1:"Directly photographed"},CustomRendered:{0:"Normal process",1:"Custom process"},WhiteBalance:{0:"Auto white balance",1:"Manual white balance"},GainControl:{0:"None",1:"Low gain up",2:"High gain up",3:"Low gain down",4:"High gain down"},Contrast:{0:"Normal",1:"Soft",2:"Hard"},Saturation:{0:"Normal",1:"Low saturation",2:"High saturation"},Sharpness:{0:"Normal",1:"Soft",2:"Hard"},SubjectDistanceRange:{0:"Unknown",1:"Macro",2:"Close view",3:"Distant view"},FileSource:{3:"DSC"},Components:{0:"",1:"Y",2:"Cb",3:"Cr",4:"R",5:"G",6:"B"}},_={120:"caption",110:"credit",25:"keywords",55:"dateCreated",80:"byline",85:"bylineTitle",122:"captionWriter",105:"headline",116:"copyright",15:"category"};this.getData=function(t,i){return(t instanceof Image||t instanceof HTMLImageElement)&&!t.complete?!1:(e(t)?i&&i.call(t):r(t,i),!0)},this.getTag=function(t,i){return e(t)?t.exifdata[i]:void 0},this.getAllTags=function(t){if(!e(t))return{};var i,r=t.exifdata,s={};for(i in r)r.hasOwnProperty(i)&&(s[i]=r[i]);return s},this.pretty=function(t){if(!e(t))return"";var i,r=t.exifdata,s="";for(i in r)r.hasOwnProperty(i)&&(s+="object"==typeof r[i]?r[i]instanceof Number?i+" : "+r[i]+" ["+r[i].numerator+"/"+r[i].denominator+"]\r\n":i+" : ["+r[i].length+" values]\r\n":i+" : "+r[i]+"\r\n");return s},this.readFromBinaryFile=function(e){return s(e)}}]),e.factory("cropHost",["$document","$window","cropAreaCircle","cropAreaSquare","cropEXIF",function(e,t,i,r,s){var a=function(i){var r=i.getBoundingClientRect(),s=e[0].body,a=e[0].documentElement,o=t.pageYOffset||a.scrollTop||s.scrollTop,n=t.pageXOffset||a.scrollLeft||s.scrollLeft,h=a.clientTop||s.clientTop||0,c=a.clientLeft||s.clientLeft||0,g=r.top+o-h,u=r.left+n-c;return{top:Math.round(g),left:Math.round(u)}};return function(t,o,n){function h(){c.clearRect(0,0,c.canvas.width,c.canvas.height),null!==g&&(c.drawImage(g,0,0,c.canvas.width,c.canvas.height),c.save(),c.fillStyle="rgba(0, 0, 0, 0.65)",c.fillRect(0,0,c.canvas.width,c.canvas.height),c.restore(),u.draw())}var c=null,g=null,u=null,l=[100,100],d=[300,300],f=200,p=[1,1],_=f,v=Math.floor(p[1]*_/p[0]),m="image/png",S=null,w=function(e){if(null!==g){u.setImage(g);var i,r,s,a,o=[g.width,g.height],n=g.width/g.height,f=o;if(f[0]>d[0]?(f[0]=d[0],f[1]=f[0]/n):f[0]<l[0]&&(f[0]=l[0],f[1]=f[0]/n),f[1]>d[1]?(f[1]=d[1],f[0]=f[1]*n):f[1]<l[1]&&(f[1]=l[1],f[0]=f[1]*n),t.prop("width",f[0]).prop("height",f[1]).css({"margin-left":-f[0]/2+"px","margin-top":-f[1]/2+"px"}),i=c.canvas.width/2,r=c.canvas.height/2,s=c.canvas.width-1,a=Math.floor(p[1]*s/p[0]),"undefined"!=typeof e&&"undefined"!=typeof e.width&&e.width>0){var _=c.canvas.width/g.width;s=Math.round(e.width*_),s>c.canvas.width&&(s=c.canvas.width-1),a=Math.floor(p[1]*s/p[0]),i=Math.round(e.x*_+s/2),r=Math.round(e.y*_+a/2)}a>c.canvas.height&&(a=c.canvas.height-1,s=Math.floor(p[0]*a/p[1])),i+s/2>c.canvas.width&&(i=Math.floor(c.canvas.width-s/2)),r+a/2>c.canvas.height&&(r=Math.floor(c.canvas.height-a/2)),u.setX(i),u.setY(r),u.setSize(s)}else t.prop("width",0).prop("height",0).css({"margin-top":0});h()},I=function(e){return angular.isDefined(e.changedTouches)?e.changedTouches:e.originalEvent.changedTouches},z=function(e){if(null!==g){var t,i,r=a(c.canvas);"touchmove"===e.type?(t=I(e)[0].pageX,i=I(e)[0].pageY):(t=e.pageX,i=e.pageY),u.processMouseMove(t-r.left,i-r.top),h()}},y=function(e){if(e.preventDefault(),e.stopPropagation(),null!==g){var t,i,r=a(c.canvas);"touchstart"===e.type?(t=I(e)[0].pageX,i=I(e)[0].pageY):(t=e.pageX,i=e.pageY),u.processMouseDown(t-r.left,i-r.top),h()}},C=function(e){if(null!==g){var t,i,r=a(c.canvas);"touchend"===e.type?(t=I(e)[0].pageX,i=I(e)[0].pageY):(t=e.pageX,i=e.pageY),u.processMouseUp(t-r.left,i-r.top),h()}};this.getResultImageDataURI=function(){var e,t;if(t=angular.element("<canvas></canvas>")[0],e=t.getContext("2d"),t.width=_,t.height=v,null!==g){for(var i=u.getWidth(),r=u.getHeight(),s=g.width/c.canvas.width,a=g.height/c.canvas.height,o=u.getX()-i/2,n=u.getY()-r/2;i*s>g.width;)i--;for(;r*a>g.height;)r--;e.drawImage(g,o*s,n*a,i*s,r*a,0,0,_,v)}return null!==S?t.toDataURL(m,S):t.toDataURL(m)},this.setNewImageSource=function(t,i){if(g=null,w(),n.trigger("image-updated"),t){var r=new Image;"http"===t.substring(0,4).toLowerCase()&&(r.crossOrigin="anonymous"),r.onload=function(){n.trigger("load-done"),s.getData(r,function(){var t=s.getTag(r,"Orientation");if([3,6,8].indexOf(t)>-1){var a=e[0].createElement("canvas"),o=a.getContext("2d"),h=r.width,c=r.height,u=0,l=0,d=0;switch(t){case 3:u=-r.width,l=-r.height,d=180;break;case 6:h=r.height,c=r.width,l=-r.height,d=90;break;case 8:h=r.height,c=r.width,u=-r.width,d=270}a.width=h,a.height=c,o.rotate(d*Math.PI/180),o.drawImage(r,u,l),g=new Image,g.src=a.toDataURL("image/png")}else g=r;w(i),n.trigger("image-updated")})},r.onerror=function(){n.trigger("load-error")},n.trigger("load-start"),r.src=t}},this.setMaxDimensions=function(e,i){if(d=[e,i],null!==g){if(t[0].clientHeight>0){var r=c.canvas.width,s=c.canvas.height,a=[g.width,g.height],o=g.width/g.height,n=a;n[0]>d[0]?(n[0]=d[0],n[1]=n[0]/o):n[0]<l[0]&&(n[0]=l[0],n[1]=n[0]/o),n[1]>d[1]?(n[1]=d[1],n[0]=n[1]*o):n[1]<l[1]&&(n[1]=l[1],n[0]=n[1]*o),t.prop("width",n[0]).prop("height",n[1]).css({"margin-left":-n[0]/2+"px","margin-top":-n[1]/2+"px"});var f=c.canvas.width/r,p=c.canvas.height/s,_=Math.min(f,p);u.setX(u.getX()*f),u.setY(u.getY()*p),u.setSize(u.getSize()*_)}}else t.prop("width",0).prop("height",0).css({"margin-top":0});h()},this.setAreaMinSize=function(e){e=parseInt(e,10),isNaN(e)||(u.setMinSize(e),h())},this.setResultImageSize=function(e){e=parseInt(e,10),isNaN(e)||(f=e,_=f,v=Math.floor(p[1]*_/p[0]))},this.setResultImageAspect=function(e,t){if(e=parseInt(e,10),t=parseInt(t,10),!isNaN(e)&&!isNaN(t)){u.setAspect(e,t);var i=u.getWidth();u.setSize(i),p=[e,t],v=Math.floor(p[1]*_/p[0])}},this.setResultImageFormat=function(e){m=e},this.setResultImageQuality=function(e){e=parseFloat(e),!isNaN(e)&&e>=0&&1>=e&&(S=e)},this.setAreaType=function(e){var t=u.getSize(),s=u.getMinSize(),a=u.getX(),o=u.getY(),l=u.getAspect(),d=i;"square"===e&&(d=r),u=new d(c,n),u.setAspect(l[0],l[1]),u.setMinSize(s),u.setSize(t),u.setX(a),u.setY(o),null!==g&&u.setImage(g),h()},this.getArea=function(){return u},this.getCanvas=function(){return c.canvas},this.getImageWidth=function(){return null!==g?g.width:0},this.getImageHeight=function(){return null!==g?g.height:0},c=t[0].getContext("2d"),u=new i(c,n),e.on("mousemove",z),t.on("mousedown",y),e.on("mouseup",C),e.on("touchmove",z),t.on("touchstart",y),e.on("touchend",C),this.destroy=function(){e.off("mousemove",z),t.off("mousedown",y),e.off("mouseup",z),e.off("touchmove",z),t.off("touchstart",y),e.off("touchend",z),t.remove()}}}]),e.factory("cropPubSub",[function(){return function(){var e={};this.on=function(t,i){return t.split(" ").forEach(function(t){e[t]||(e[t]=[]),e[t].push(i)}),this},this.trigger=function(t,i){return angular.forEach(e[t],function(e){e.call(null,i)}),this}}}]),e.directive("imgCrop",["$timeout","cropHost","cropPubSub",function(e,t,i){return{restrict:"E",scope:{image:"=",resultImage:"=",originalData:"=",cropData:"=",changeOnFly:"=",areaType:"@",areaMinSize:"=",resultImageSize:"=",resultImageAspect:"@",resultImageFormat:"@",resultImageQuality:"=",onChange:"&",onLoadBegin:"&",onLoadDone:"&",onLoadError:"&"},template:"<canvas></canvas>",controller:["$scope",function(e){e.events=new i}],link:function(i,r){var s,a=i.events,o=new t(r.find("canvas"),{},a),n=function(e){if(""!==e.image){var t=o.getImageWidth(),i=o.getImageHeight(),r=o.getArea(),a=o.getCanvas(),n=r.getAspect(),h=Math.floor(r.getWidth()*n[1]/n[0]);if(h>a.height&&r.setHeight(a.height),angular.isDefined(e.cropData)&&0!==t){var c=t/a.width;e.cropData={width:Math.round(r.getWidth()*c),height:Math.round(r.getHeight()*c),x:Math.round((r.getX()-r.getWidth()/2)*c),y:Math.round((r.getY()-r.getHeight()/2)*c)}}angular.isDefined(e.originalData)&&0!==t&&0!==i&&(e.originalData={width:t,height:i});var g=o.getResultImageDataURI();s!==g&&(s=g,angular.isDefined(e.resultImage)&&(e.resultImage=g),e.onChange({$dataURI:e.resultImage}))}},h=function(t){return function(){e(function(){i.$apply(function(e){t(e)})})}};a.on("load-start",h(function(e){e.onLoadBegin({})})).on("load-done",h(function(e){e.onLoadDone({})})).on("load-error",h(function(e){e.onLoadError({})})).on("area-move area-resize",h(function(e){e.changeOnFly&&n(e)})).on("area-move-end area-resize-end image-updated",h(function(e){n(e)})),i.$watch("image",function(){var e={};angular.isDefined(i.cropData)&&(e=i.cropData),o.setNewImageSource(i.image,e)}),i.$watch("areaType",function(){o.setAreaType(i.areaType),n(i)}),i.$watch("areaMinSize",function(){o.setAreaMinSize(i.areaMinSize),n(i)}),i.$watch("resultImageSize",function(){o.setResultImageSize(i.resultImageSize),n(i)}),i.$watch("resultImageAspect",function(){if("undefined"!=typeof i.resultImageAspect){var e=i.resultImageAspect.toLowerCase().split("x");2!==e.length||isNaN(parseInt(e[0],10))||isNaN(parseInt(e[1],10))||(o.setResultImageAspect(parseInt(e[0],10),parseInt(e[1],10)),n(i))}}),i.$watch("resultImageFormat",function(){o.setResultImageFormat(i.resultImageFormat),n(i)}),i.$watch("resultImageQuality",function(){o.setResultImageQuality(i.resultImageQuality),n(i)}),i.$watch(function(){return[r[0].clientWidth,r[0].clientHeight]},function(e){o.setMaxDimensions(e[0],e[1]),n(i)
},!0),i.$on("$destroy",function(){o.destroy()})}}}])}();