1*e.deltaY,s()):"mousewheel"===t&&(i=e.wheelDeltaY?e.wheelDeltaY:e.wheelDelta,s())}};
return{on:function(){O(document,"mouseWheel",r)},off:function(){B(document,"mouseWheel",r)}}};
function Ko(t,e){for(var i=0;
i<e.length;
i++){var n=e[i];
n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var Jo=.08,Zo="css",Qo="js",tl="scroll",el=function(){function t(e,i){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.el=e,this.emitter=i,this.template=(0,I.$)(".text-ticker__text",this.el),this.texts=[this.template],this._mode=this._getMode(),this._direction=this._getDirection(),this._velocity={target:Jo*this._direction,current:Jo*this._direction},this._progress=0,this._raf=null,this._wheel=null,this._ro=null,this._inView=!1,this._hovering=!1,this._pauseOnHover=this.el.hasAttribute("data-text-ticker-pause-hover"),this._onScroll=this._onScroll.bind(this),this._onRaf=this._onRaf.bind(this),this._onScrollStart=this._onScrollStart.bind(this),this._onScrollStop=this._onScrollStop.bind(this),this._onScrollCall=this._onScrollCall.bind(this),this._onResize=this._onResize.bind(this),this._onRollover=this._onRollover.bind(this),this._onRollout=this._onRollout.bind(this)}var e,i,n;
return e=t,i=[
{key:"init",value:function(){this._onResize(),this._mode===tl&&(this._velocity.target=this._velocity.current=0),this._mode===Qo||this._mode===tl?(this.el.classList.add("--mode-js"),this._wheel=Xo(this._onScroll),this.el.hasAttribute("data-scroll")||(this._inView=!0)):this.el.classList.add("--mode-css"),this._bindEvents()}},
{key:"destroy",value:function(){this._unbindEvents(),this.el=null,this.emitter=null,this.template=null,this.texts=null,this._mode=null,this._direction=null,this._velocity=null,this._progress=null,this._raf=null,this._wheel=null,this._ro=null,this._inView=null,this._hovering=null,this._pauseOnHover=null,this._onScroll=null,this._onRaf=null,this._onScrollStart=null,this._onScrollStop=null,this._onScrollCall=null,this._onResize=null,this._onRollover=null,this._onRollout=null}},
{key:"_bindEvents",value:function(){var t,e,i,n;
Di.add(this._onResize),this._wheel&&(null===(t=this._wheel)||void 0===t||t.on()),(this._mode===Qo||this._mode===tl)&&(null===(e=this.emitter)||void 0===e||e.on("SiteScroll.start",this._onScrollStart),null===(i=this.emitter)||void 0===i||i.on("SiteScroll.stop",this._onScrollStop),null===(n=this.emitter)||void 0===n||n.on("SiteScroll.text-ticker",this._onScrollCall),this._pauseOnHover&&(O(this.el,"mouseenter",this._onRollover),O(this.el,"mouseleave",this._onRollout)),this._raf=requestAnimationFrame(this._onRaf))}},
{key:"_unbindEvents",value:function(){var t,e,i,n;
this._mode!==Qo&&this._mode!==tl||(null===(e=this.emitter)||void 0===e||e.off("SiteScroll.start",this._onScrollStart),null===(i=this.emitter)||void 0===i||i.off("SiteScroll.stop",this._onScrollStop),null===(n=this.emitter)||void 0===n||n.off("SiteScroll.text-ticker",this._onScrollCall),this._pauseOnHover&&(B(this.el,"mouseenter",this._onRollover),B(this.el,"mouseleave",this._onRollout))),Di.remove(this._onResize),this._wheel&&(null===(t=this._wheel)||void 0===t||t.off()),this._raf&&cancelAnimationFrame(this._raf),this._raf=null}},
{key:"_onScroll",value:function(t){this._pauseOnHover&&this._hovering||(this._velocity.target=.005*t,0!==this._direction&&(this._velocity.target=Math.abs(this._velocity.target)*this._direction))}},
{key:"_onRaf",value:function(){var t=this;
this.texts&&(this._raf=requestAnimationFrame(this._onRaf),this._velocity.target*=.9,this._mode!==Qo||this._hovering||(this._velocity.target>0?this._velocity.target=Math.max(Jo,this._velocity.target):this._velocity.target=Math.min(-.08,this._velocity.target)),this._velocity.current=Ae(this._velocity.current,this._velocity.target,.2),this._progress+=this._velocity.current,this._progress<-100?this._progress=this._progress+100:this._progress>0&&(this._progress=this._progress-100),this._inView&&this.texts.forEach(function(e){return e.style.transform="translate3d(".concat(t._progress,"%, 0, 0)")}))}},
{key:"_onScrollStart",value:function(){var t;
null===(t=this._wheel)||void 0===t||t.on(),this._raf=requestAnimationFrame(this._onRaf)}},
{key:"_onScrollStop",value:function(){var t;
null===(t=this._wheel)||void 0===t||t.off(),this._raf&&cancelAnimationFrame(this._raf),this._raf=null}},
{key:"_onScrollCall",value:function(t,e){e.el===this.el&&(this._inView="enter"===t)}},
{key:"_onResize",value:function(){var t=(0,I.Pc)(this.el),e=(0,I.Pc)(this.template);
if(!(t.width<1||e.width<1))for(var i=Math.ceil(t.width/e.width)+1;
this.texts.length<i;
){var n=this.template.cloneNode(!0);
n.setAttribute("aria-hidden",!0),n.style.setProperty("--ticker-index",this.texts.length),this.texts.push(n),this.el.appendChild(n)}}},
{key:"_onRollover",value:function(){this._hovering=!0}},
{key:"_onRollout",value:function(){this._hovering=!1}},
{key:"_getDirection",value:function(){return this.el.classList.contains("--direction-left")?-1:this.el.classList.contains("--direction-both")?0:this.el.classList.contains("--direction-right")?1:void 0}},
{key:"_getMode",value:function(){if(De)return Zo;
switch(this.el.dataset.textTicker){case Zo:return Zo;
case tl:return tl;
default:return Qo}}}],i&&Ko(e.prototype,i),n&&Ko(e,n),t}();
const il=el;
function nl(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function rl(t,e){for(var i=0;
i<e.length;
i++){var n=e[i];
n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function sl(t,e,i){return e&&rl(t.prototype,e),i&&rl(t,i),t}var al=function(){function t(){nl(this,t),this.items=new Map,this.pausedItems=new Map,ut.on("exit",this.reset,this),p.on("SiteScroll.video",this._onScrollCall.bind(this)),p.on("Video.resumeAll",this._onVideoResumeAll.bind(this)),p.on("Video.pauseAll",this._onVideoPauseAll.bind(this)),p.on("Video.destroy",this._onVideoDestroy.bind(this))}return sl(t,[
{key:"add",value:function(t,e){this.items.set(t,e)}},
{key:"remove",value:function(t){this.items.delete(t),this.pausedItems.delete(t)}},
{key:"reset",value:function(){this.items.clear(),this.pausedItems.clear()}},
{key:"_onScrollCall",value:function(t,e){var i=e.el;
this.items.has(i)&&this.items.get(i).video[t===mt?"play":"pause"]()}},
{key:"_onVideoResumeAll",value:function(){this.pausedItems.forEach(function(t){return t.video.play()})}},
{key:"_onVideoPauseAll",value:function(){var t=this;
this.items.forEach(function(e,i){e.video.playing&&t.pausedItems.set(i,e)}),this.pausedItems.forEach(function(t){return t.video.pause()})}},
{key:"_onVideoDestroy",value:function(t){this.items.has(t)&&this.items.get(t).destroy()}}]),t}(),ol=new al;
const ll