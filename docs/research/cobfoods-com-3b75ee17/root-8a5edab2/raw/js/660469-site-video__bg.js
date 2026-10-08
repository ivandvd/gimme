r e=t.target,i=(0,I.$)("video",e);
i&&i.play()}},
{key:"_stopVideo",value:function(t){var e=t.target,i=(0,I.$)("video",e);
i&&(i.pause(),i.currentTime=0)}}]),t}();
const Ul=Wl;
function Xl(t,e){for(var i=0;
i<e.length;
i++){var n=e[i];
n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var Kl="--js-animate-in",Jl="--js-animate-out",Zl=function(){function t(e,i){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.el=e,this.emitter=i,this.bg=(0,I.$)(".site-video__bg",this.el),this.video=(0,I.$)(".site-video__video",this.el),this.closeBtn=(0,I.$)(".site-video__close",this.el),this._opened=!1,this._playing=!1,this._onSiteVideoUrlClick=this._onSiteVideoUrlClick.bind(this),this._onPlayReady=this._onPlayReady.bind(this),this._onCloseComplete=this._onCloseComplete.bind(this),this._handleKeyDown=this._handleKeyDown.bind(this),this._playBnd=this.play.bind(this),this._closeBnd=this.close.bind(this)}var e,i,n;
return e=t,(i=[
{key:"name",get:function(){return"SiteVideo"}},
{key:"init",value:function(){this._bindEvents()}},
{key:"stop",value:function(){this._unbindEvents(),this.close()}},
{key:"play",value:function(t){var e=this;
if(this._opened)return this.video.src=t,this.video.load(),void this.video.play();
this._opened=!0,this.emitter.emit("SiteScroll.stop",!0),this.emitter.emit("Video.pauseAll"),B(this.bg,"transitionend",this._onCloseComplete),B(this.closeBtn,"transitionend",this._onPlayReady),this.el.classList.remove(Jl),this.el.setAttribute("aria-hidden",!1),this.video.src=t,this.video.load(),O(this.closeBtn,"transitionend",this._onPlayReady),requestAnimationFrame(function(){return e.el.classList.add(Kl)})}},
{key:"close",value:function(){this._opened&&(this._opened=!1,this.video&&this._playing&&this.video.pause(),this._playing=!1,this.emitter.emit("Video.resumeAll"),this.emitter.emit("SiteScroll.start"),B(this.bg,"transitionend",this._onCloseComplete),B(this.closeBtn,"transitionend",this._onPlayReady),O(this.bg,"transitionend",this._onCloseComplete),this.el.classList.add(Jl))}},
{key:"_bindEvents",value:function(){this.emitter.on("SiteVideo.play",this._playBnd),this.emitter.on("SiteVideo.stop",this._closeBnd),O(window,"keydown",this._handleKeyDown),O(this.closeBtn,"click",this._closeBnd),O("[data-site-video-url]","click",this._onSiteVideoUrlClick)}},
{key:"_unbindEvents",value:function(){this.emitter.off("SiteVideo.play",this._playBnd),this.emitter.off("SiteVideo.stop",this._closeBnd),B(window,"keydown",this._handleKeyDown),B(this.closeBtn,"click",this._closeBnd),B("[data-site-video-url]","click",this._onSiteVideoUrlClick)}},
{key:"_onSiteVideoUrlClick",value:function(t){t&&(t.preventDefault(),t.stopImmediatePropagation());
var e=t.currentTarget.dataset.siteVideoUrl;
e&&this.play(e)}},
{key:"_onPlayReady",value:function(t){t.target===this.closeBtn&&"transform"===t.propertyName&&this._opened&&(B(this.closeBtn,"transitionend",this._onPlayReady),this.video.play(),this._playing=!0)}},
{key:"_onCloseComplete",value:function(t){t.target!==this.bg||"opacity"!==t.propertyName||this._opened||(B(this.bg,"transitionend",this._onCloseComplete),this.el.setAttribute("aria-hidden",!0),this.el.classList.remove(Kl,Jl),this._playing=!1,this.emitter.