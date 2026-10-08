onstructor.name);
if("Map"===i||"Set"===i)return Array.from(i);
if("Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))return tr(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var sr={autoplay:!1,loop:!0,delay:0,renderer:"canvas"},ar=function(){function t(e,i){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.el=e,this.emitter=i,this.wrapper=this.el.closest("[data-lottie-wrapper]"),this._inView=!1,this._instance=null,this._options=null,this._scrollTarget=null,this._onSiteScrollCall=this._onSiteScrollCall.bind(this),this._onInstanceDataReady=this._onInstanceReady.bind(this),this._onInstanceLoop=this._onInstanceLoop.bind(this),this._onMouseEnter=this._onMouseEnter.bind(this),this._onMouseLeave=this._onMouseLeave.bind(this)}var e,i,n;
return e=t,i=[
{key:"init",value:function(){var t=this;
if(this.el.dataset.lottie){var e=JSON.parse(this.el.dataset.lottie);
this._options=nr({},sr,e)}else this._options=nr({},sr);
var i=(0,I.$)("script",this.el);
if(i){var n=i.textContent.trim(),r=JSON.parse(n);
r&&(this._options.animationData=r,this._options.path=null,delete this._options.path)}var s=!0,a=!1,o=void 0;
try{for(var l,h=Object.entries(this._options)[Symbol.iterator]();
!(s=(l=h.next()).done);
s=!0){var c=rr(l.value,2),u=c[0];
null===c[1]&&delete this._options[u]}}catch(t){a=!0,o=t}finally{try{s||null==h.return||h.return()}finally{if(a)throw o}}this._options.hasOwnProperty("container")?this._options.container=(0,I.$)(this._options.container):this._options.container=this.el,this._options.container?(this.el.dataset.scrollTarget&&(this._scrollTarget=this.el.dataset.scrollTarget),this._scrollTarget?this._scrollTarget=(0,I.$)(this._scrollTarget):this._scrollTarget=this.el,Zn(250).then(function(){t._instance=Jn().loadAnimation(t._options),t._instance.addEventListener("DOMLoaded",function(){return t._onInstanceReady()}),t._options.on_rollover&&!De&&t._instance.addEventListener("loopComplete",t._onInstanceLoop)}),this._bindEvents()):console.warn("Lottie will be ignored on ".concat(this.el," because container is not found."),this.el)}},
{key:"destroy",value:function(){this._unbindEvents(),this._instance&&this._instance.destroy(),this.el=null,this.emitter=null,this.wrapper=null,this._instance=null,this._inView=null,this._options=null,this._scrollTarget=null,this._onSiteScrollCall=null,this._onInstanceDataReady=null,this._onInstanceLoop=null,this._onMouseEnter=null,this._onMouseLeave=null}},
{key:"_bindEvents",value:function(){this.emitter&&this.emitter.on("SiteScroll.lottie",this._onSiteScrollCall),this._options.on_rollover&&this.wrapper&&!De&&(O(this.wrapper,"mouseenter",this._onMouseEnter),O(this.wrapper,"mouseleave",this._onMouseLeave))}},
{key:"_unbindEvents",value:function(){this.emitter&&this.emitter.off("SiteScroll.lottie",this._onSiteScrollCall),this._instance&&(this._instance.removeEventListener("data_ready",this._onInstanceDataReady),this._instance.removeEventListener("loopComplete",this._onInstanceLoop)),this._options.on_rollover&&this.wrapper&&!De&&(B(this.wrapper,"mouseenter",this._onMouseEnter),B(this.wrapper,"mouseleave",this._onMouseLeave))}},
{key:"_onInstanceReady",value:function(){var t=this,e=this._calculateDelay();
Ce({targets:[this.el],opacity:{value:[0,1],duration:750,easing:"linear"},scale:{value:[.84,1],duration:750,easing:"easeOutCubic"},translateY:{value:[115,0],duration:750,easing:"easeOutCubic"},complete:function(){t._inView&&!t._options.on_rollover&&t._instance.play()},delay:e>0?e:0})}},
{key:"_onInstanceLoop",value:function(){var t;
this._hovering||null===(t=this._instance)||void 0===t||t.pause()}},
{key:"_onSiteScrollCall",value:function(t,e){var i=this;
if((e.target?e.target:e.targetEl)===this._scrollTarget&&(!this._options.on_rollover||De))if(e.inView&&"enter"===t){var n;
this._inView=!0;
var r=this._calculateDelay();
r>0?Zn(r).then(function(){var t;
return null===(t=i._instance)||void 0===t?void 0:t.play()}):null===(n=this._instance)||void 0===n||n.play()}else{var s;
this._inView=!1,null===(s=this._instance)||void 0===s||s.pause()}}},
{key:"_calculateDelay",value:function(){var t=getComputedStyle(this.el).getPropertyValue("--delay");
return Qn(t)+this._options.delay}},
{key:"_onMouseEnter",value:function(){var t;
this._hovering=!0,null===(t=this._instance)||void 0===t||t.play()}},
{key:"_onMouseLeave",v