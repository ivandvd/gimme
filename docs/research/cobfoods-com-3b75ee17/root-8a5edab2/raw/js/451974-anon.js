rn De?null:this.btn=new $n(e)}}var e,i,n;
return e=t,(i=[
{key:"destroy",value:function(){this.btn&&this.btn.destroy(),this.el=null,this.emitter=null,this.style=null}}])&&Hn(e.prototype,i),n&&Hn(e,n),t}();
const Wn=qn;
function Yn(t,e){for(var i=0;
i<e.length;
i++){var n=e[i];
n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var Un=function(){function t(e,i){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.el=e,this.webComponentWidget=(0,I.$)("covet-pics-widget",this.el),this.style=document.createElement("style"),this.emitter=i,this._onReady=this._onReady.bind(this)}var e,i,n;
return e=t,(i=[
{key:"init",value:function(){this._bindEvents()}},
{key:"destroy",value:function(){this._unbindEvents(),this.el=null,this.webComponentWidget=null,this.style=null,this.emitter=null}},
{key:"start",value:function(){}},
{key:"stop",value:function(){}},
{key:"_bindEvents",value:function(){O(document,"galleryReady:covetPics",this._onReady)}},
{key:"_unbindEvents",value:function(){B(document,"galleryReady:covetPics",this._onReady)}},
{key:"_onReady",value:function(){this.webComponentWidget&&(this.style.innerHTML='\n  covet-pics-gallery-item {\n    border-radius: 8px;
\n    margin-right: 10px;
\n  }\n\n  covet-pics-gallery-item .hover, covet-pics-gallery-item .overlay-effect {\n    display: none !important;
\n  }\n\n  covet-pics-gallery-item:nth-child(4n+1) {\n    rotate: .74deg;
\n    transform-origin: right;
\n  }\n\n  covet-pics-gallery-item:nth-child(4n+3) {\n    rotate: -1.42deg;
\n    transform-origin: left;
\n  }\n\n  covet-pics-gallery-item.hover-animation .btn-item-wrap {\n    transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000) !important;
\n    transition-duration: 600ms;
\n  }\n\n  covet-pics-gallery-item.hover-animation .btn-item-wrap:hover .bg {\n    transform: scale(1.1);
\n    transition-duration: 800ms;
\n  }\n\n  @media (min-width: 992px) {\n    covet-pics-gallery-item {\n      border-radius: 8px;
\n      margin-right: 14px !important;
\n    }\n\n    covet-pics-gallery-item:nth-child(4n+1) {\n      rotate: -2.649deg;
\n    }\n\n    covet-pics-gallery-item:nth-child(4n+3) {\n      rotate: 3.374deg;
\n    }\n  }\n  covet-pics-gallery-item .btn {\n    font-family: Obviously;
\n  }\n\n  .swiper {\n    overflow: visible;
\n  }\n\n  @media (max-width: 576px) {\n    .swiper-wrapper {\n      padding-bottom: 30px;
\n    }\n  }\n\n  .swiper-button-next, .swiper-button-prev {\n    width: 51px;
\n    height: 48px;
\n    svg {\n      display: none;
\n    }\n  }\n\n  .swiper-button-next {\n    background-image: url("https://cdn.shopify.com/s/files/1/0618/9439/4028/files/Group_145.svg?v=1712758056");
\n  }\n\n  .swiper-button-next:hover {\n    background-image: url("https://cdn.shopify.com/s/files/1/0618/9439/4028/files/Group_145_3.svg?v=1713291370");
\n  }\n\n  .swiper-button-prev {\n    background-image: url("https://cdn.shopify.com/s/files/1/0618/9439/4028/files/Group_145_1.svg?v=1712758056");
\n  }\n\n  .swiper-button-prev:hover {\n    background-image: url("https://cdn.shopify.com/s/files/1/0618/9439/4028/files/Group_145_4.svg?v=1713291370");
\n  }\n\n  .swiper-pagination-bullets.swiper-pagination-horizontal {\n    margin-top: -10px;
\n  }\n  .swiper-pagination-bullets .swiper-pagination-bullet {\n    background: #EF98C1;
\n    opacity: 1 !important;
\n    transform: scale(1) !important;
\n  }\n  .swiper-pagination-bullets .swiper-pagination-bullet.swiper-pagination-bullet-active {\n    background: #3B0017;
\n  }\n\n  covet-pics-gallery-item .overlay-effect {\n    background: #EF98C1 !important;
\n  }\n',this.webComponentWidget.shadowRoot.appendChild(this.style),this.emitter.emit("SiteScroll.update"))}}])&&Yn(e.prototype,i),n&&Yn(e,n),t}();
const Xn=Un;
var Kn=__webpack_require__("./node_modules/lottie-web/build/player/lottie.js"),Jn=__webpack_require__.n(Kn),Zn=function(t){return new Promise(function(e){return setTimeout(e,t)})};
var Qn=function(t){var e=parseFloat(t)||0;
return t.includes("ms")?e:e||0};
function tr(t,e){(null==e||e>t.length)&&(e=t.length);
for(var i=0,n=new Array(e);
i<e;
i++)n[i]=t[i];
return n}function er(t,e){for(var i=0;
i<e.length;
i++){var n=e[i];
n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function ir(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}function nr(t){for(var e=1;
e<arguments.length;
e++){var i=null!=arguments[e]?arguments[e]:{},n=Object.keys(i);
"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(i).filter(function(t){return Object.getOwnPropertyDescriptor(i,t).enumerable}))),n.forEach(function(e){ir(t,e,i[e])})}return t}function rr(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var i=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];
if(null!=i){var n,r,s=[],a=!0,o=!1;
try{for(i=i.call(t);
!(a=(n=i.next()).done)&&(s.push(n.value),!e||s.length!==e);
a=!0);
}catch(t){o=!0,r=t}finally{try{a||null==i.return||i.return()}finally{if(o)throw r}}return s}}(t,e)||function(t,e){if(!t)return;
if("string"==typeof t)return tr(t,e);
var i=Object.prototype.toString.call(t).slice(8,-1);
"Object"===i&&t.constructor&&(i=t.c