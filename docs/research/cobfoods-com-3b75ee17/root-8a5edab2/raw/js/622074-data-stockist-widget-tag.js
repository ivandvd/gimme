er?O(this.contentHover,"transitionend",this._stopAnimPlaying):this._stopAnimPlaying()}},
{key:"_stopAnimPlaying",value:function(t){this.el.classList.remove("--js-anim-playing")}}])&&zo(e.prototype,i),n&&zo(e,n),t}();
function jo(t,e){for(var i=0;
i<e.length;
i++){var n=e[i];
n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var Go=function(){function t(e,i){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.el=e,this.emitter=i,this.container=(0,I.$)("[data-stockist-widget-tag]",this.el),this._onReady=this._onReady.bind(this),this._checkContainerHeight=this._checkContainerHeight.bind(this)}var e,i,n;
return e=t,(i=[
{key:"init",value:function(){this._loadScript(),this._bindEvents()}},
{key:"start",value:function(){this.emitter.emit("SiteScroll.disable")}},
{key:"stop",value:function(){this.emitter.emit("SiteScroll.enable")}},
{key:"destroy",value:function(){this._unbindEvents(),this.el=null,this.container=null,this.emitter=null,this._checkContainerHeight=null}},
{key:"_loadScript",value:function(){if(void 0===window.__stockistInitMap){var t=document.createElement("script");
t.src="https://stockist.co/embed/v1/widget.min.js",t.onload=this._onReady,document.body.appendChild(t)}else this._onReady()}},
{key:"_bindEvents",value:function(){this.interval=setInterval(this._checkContainerHeight,100)}},
{key:"_unbindEvents",value:function(){this.interval&&clearInterval(this.interval)}},
{key:"_onReady",value:function(){this.emitter.emit("SiteScroll.update")}},{ke