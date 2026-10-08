s.pause(),this.el=null,this.svg=null}},
{key:"play",value:function(){this.svg&&this.svg.unpauseAnimations()}},
{key:"pause",value:function(){this.svg&&this.svg.pauseAnimations()}}])&&Ho(e.prototype,i),n&&Ho(e,n),t}();
function Wo(t,e){for(var i=0;
i<e.length;
i++){var n=e[i];
n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var Yo=function(){function t(e,i){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.el=e,this.emitter=i,this._onScrollCall=this._onScrollCall.bind(this)}var e,i,n;
return e=t,i=[
{key:"init",value:function(){this.svgAnimated=new qo(this.el)}},
{key:"destroy",value:function(){this.svgAnimated.destroy(),this.el=null,this.emitter=null,this.svgAnimated=null}},
{key:"start",value:function(){this._bindEvents()}},
{key:"stop",value:function(){this._unbindEvents()}},
{key:"_bindEvents",value:function(){this.emitter&&this.emitter.on("SiteScroll.svg-animated",this._onScrollCall)}},
{key:"_unbindEvents",value:function(){this.emitter&&this.emitter.off("SiteScroll.svg-animated",this._onScrollCall)}},
{key:"_onScrollCall",value:function(t,e){e.el===this.el&&(this._inView=t===mt,this._inView?this.svgAnimated.play():this.svgAnimated.pause())}}],i&&Wo(e.prototype,i),n&&Wo(e,n),t}();
const Uo=Yo;
const Xo=function(t){var e,i,n=!1,r=function(t){e=t,n||(requestAnimationFrame(a),n=!0)},s=function(){t(i,e),n=!1},a=function(){if(e){var t=e.type;
"wheel"===t?(i=e.wheelDeltaY||-