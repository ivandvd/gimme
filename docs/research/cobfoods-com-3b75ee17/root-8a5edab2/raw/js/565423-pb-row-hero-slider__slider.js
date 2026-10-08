ng.call(t).slice(8,-1);
"Object"===i&&t.constructor&&(i=t.constructor.name);
if("Map"===i||"Set"===i)return Array.from(i);
if("Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))return ta(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var sa=function(){function t(e,i){ea(this,t),this.el=e,this.emitter=i,this.slider=(0,I.$)(".pb-row-hero-slider__slider",this.el),this.prevBtn=(0,I.$)(".pb-row-hero-slider__prevBtn",this.el),this.nextBtn=(0,I.$)(".pb-row-hero-slider__nextBtn",this.el),this.paginationEl=(0,I.$)(".pb-row-hero-slider__pagination",this.el),this.videos=ra((0,I.$$)(".pb-row-hero-slider__slide__bgVideo",this.slider)).map(function(t){return new aa(t)}),this._autoplayEnabled=!1,this._onBeforeTransitionStart=this._onBeforeTransitionStart.bind(this),this._onSlideChange=this._onSlideChange.bind(this),this._onNextClick=this._onNextClick.bind(this),this._onPrevClick=this._onPrevClick.bind(this),this._onTouchMove=this._onTouchMove.bind(this),this._onScrollCall=this._onScrollCall.bind(this)}return na(t,[
{key:"init",value:function(){if(this.slider){this._autoplayEnabled="true"===this.el.dataset.autoplay;
var t=parseInt(this.el.dataset.autoplaySpeed)||5e3;
this.swiper=new Is(this.slider,{modules:[Fs,Bs,Rs],loop:!1,speed:750,navigation:{nextEl:this.nextBtn,prevEl:this.prevBtn},pagination:{el:this.paginationEl,type:"bullets",clickable:!0},on:{beforeTransitionStart:this._onBeforeTransitionStart,slideChange:this._onSlideChange,init:this._onSlideChange,touchMove:this._onTouchMove},autoplay:!!this._autoplayEnabled&&{delay:t,disableOnInteraction:!1,waitForTransition:!0},virtualTranslate:!0}),this._autoplayEnabled&&this.swiper.autoplay.stop(),this.el.style.setProperty("--swiper-speed","".concat(this.swiper.params.speed,"ms")),this._setDirection("forward"),this._bindEvents()}}},
{key:"start",value:function(){this.videos.forEach(function(t){return t.pause()})}},
{key:"destroy",value:function(){this._unbindEvents(),this.swiper&&(this.swiper.destroy(),this.swiper=null),this.videos.forEach(function(t){return t.destroy()}),this.videos=[],this.el=null,this.emitter=null,this.slider=null,this.prevBtn=null,this.nextBtn=null,this.paginationEl=null,this._autoplayEnabled=null,this._onScrollCall=null}},
{key:"_bindEvents",value:function(){O(this.nextBtn,"click",this._onNextClick),O(this.prevBtn,"click",this._onPrevClick),this.emitter.on("SiteScroll.pb-row-hero-slider",this._onScrollCall)}},
{key:"_unbindEvents",value:function(){B(this.nextBtn,"click",this._onNextClick),B(this.prevBtn,"click",this._onPrevClick),this.emitter.off("SiteScroll.pb-row-hero-slider",this._onScrollCall)}},
{key:"_onScrollCall",value:function(t,e){e.el===this.slider&&this._autoplayEnabled&&this.swiper&&(t===mt?this.swiper.autoplay.start():t===vt&&this.swiper.autoplay.stop())}},
{key:"_onNextClick",value:function(){this._setDirection("forward")}},
{key:"_onPrevClick",value:function(){this._setDirection("backward")}},
{key:"_onTouchMove",value:function(t){var e=t.translate<t.previousTranslate?"forward":"backward";
this._setDirection(e)}},
{key:"_setDirection",value:function(t){this.direction=t,this.el.classList.remove("is-forward","is-backward"),this.el.classList.add("is-".concat(t))}},
{key:"_onSlideChange",value:function(t){this.el.style.setProperty("--module-delay","0ms");
var e,i=t.slides[t.activeIndex],n=null!==(e=(0,I.$)(".pb-row-hero-slider__slide__title",i))&&void 0!==e?e:null;
n&&n.classList.add("is-inview"),ra((0,I.$$)(".pb-row-