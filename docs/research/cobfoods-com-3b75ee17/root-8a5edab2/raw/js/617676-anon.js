el.dataset.scallopAnimation){case"left":return"left";
case"right":return"right"}return!1}},
{key:"_getColor",value:function(){return getComputedStyle(this.el).color}}],i&&Co(e.prototype,i),n&&Co(e,n),t}();
const Io=Mo;
function Do(t,e){for(var i=0;
i<e.length;
i++){var n=e[i];
n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var Lo=function(){function t(e,i){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.el=e,this.emitter=i,this._onScrollCall=this._onScrollCall.bind(this)}var e,i,n;
return e=t,i=[
{key:"init",value:function(){this.scallop=new Io(this.el)}},
{key:"destroy",value:function(){this.scallop.destroy(),this.el=null,this.emitter=null,this.scallop=null}},
{key:"start",value:function(){this._bindEvents()}},
{key:"stop",value:function(){this._unbindEvents()}},
{key:"_bindEvents",value:function(){this.emitter&&this.emitter.on("SiteScroll.scallop",this._onScrollCall)}},
{key:"_unbindEvents",value:function(){this.emitter&&this.emitter.off("SiteScroll.scallop",this._onScrollCall)}},
{key:"_onScrollCall",value:function(t,e){e.el===this.el&&(this._inView