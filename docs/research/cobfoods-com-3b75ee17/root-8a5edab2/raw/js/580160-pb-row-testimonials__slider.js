t}();
const Ma=Aa;
function Ia(t,e){for(var i=0;
i<e.length;
i++){var n=e[i];
n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var Da={modules:[Bs],centeredSlides:!1,freeMode:!1,loop:!0,slidesPerView:"auto",slidesOffsetAfter:16,slidesOffsetBefore:16,pagination:{el:".swiper-pagination",type:"bullets"},spaceBetween:16,speed:450},La=function(){function t(e,i){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.el=e,this.emitter=i,this.initialized=!1,this._onResize=this._onResize.bind(this),this.init()}var e,i,n;
return e=t,(i=[
{key:"init",value:function(){this.initialized||(this.slider=(0,I.$)(".pb-row-testimonials__slider",this.el),this._onResize(),this._bindEvents(),this.initialized=!0)}},
{key:"destroy",value:function(){this._unbindEvents(),this.swiper&&this.swiper.destroy(),this.slider=null,this.swiper=null,this.columns=null,this.el=null,this.emitter=null,this._onResize=null}},
{key:"start",value:function(){}},
{key:"stop",value:function(){}},
{key:"_bindEvents",value:function(){Di.add(this._onResize)}},
{key:"_unbindEvents",value:function(){Di.remove(this._onResize)}},
{key:"_onResize",value:function(){Oe.width<768?this._createSlider():this._deleteSlider()}},
{key:"_createSlider",value:function(){!this.swiper&&this.slider&&(this.swiper=new Is(this.slider,Da))}},
{key:"_deleteSlider",value:function(){this.swiper&&(this.swiper.destroy(),this.swiper=null)}}])&&Ia(e.prototype,i),n&&Ia(e,n),t}();
const Fa=La;
function Oa(t,e){(null==e||e>t.length)&&(e=t.length);
for(var i=0,n=new Array(e);
i<e;
i++)n[i]=t[i];
return n}function Ba(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function Ra(t,e){for(var i=0;
i<e.length;
i++){var n=e[i];
n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function Va(t,e,i){return e&&Ra(t.prototype,e),i&&Ra(t,i),t}function za(t){return function(t){if(Array.isArray(t))return Oa(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(!t)return;
if("string"==typeof t)return Oa(t,e);
var i=Object.prototype.toString.call(t).slice(8,-1);
