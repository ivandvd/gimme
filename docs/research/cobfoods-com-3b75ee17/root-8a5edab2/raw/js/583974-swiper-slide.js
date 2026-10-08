&(this.swiper.destroy(),this.swiper=null),this.videoEmitter.removeAllListeners(),this.videoEmitter=null,this.el=null,this.slider=null,this.prevBtn=null,this.nextBtn=null,this.paginationEl=null,this._onSlideChange=null}},
{key:"start",value:function(){}},
{key:"stop",value:function(){this.videoEmitter.emit(Na)}},
{key:"_onSlideChange",value:function(){this.videoEmitter.emit(Na)}}]),t}(),Ga=function(){function t(e,i){var n,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;
Ba(this,t),this.el=e,this.emitter=i,this.index=r,null===(n=this.el.closest(".swiper-slide"))||void 0===n||n.style.setProperty("--index",r),this.previewVideo=(0,I.$)(".pb-row-ugc-content__card__previewVideo",this.el),this.video=(0,I.$)(".pb-row-ugc-content__card__video",this.el),this.playBtn=(0,I.$)(".pb-row-ugc-content__card__playBtn",this.el),this.progress=(0,I.$)(".pb-row-ugc-content__card__progress",this.el),this._rafId=null,this._onPlayClick=this._onPlayClick.bind(this),this._onVideoClick=this._onVideoClick.bind(this),this._onVideoEnded=this._onVideoEnded.bind(this),this._onMouseEnter=this._onMouseEnter.bind(this),this._onMouseLeave=this._onMouseLeave.bind(this),this._onStopAll=this._onStopAll.bind(this),this._tickProgress=this._tickProgress.bind(this)}return Va(t,[
{key:"init",value:function(){this._bindEvents()}},
{key:"destroy",value:function(){this._unbindEvents(),this._onStopAll(),this.el=null,this.previewVideo=null,this.video=null,this.playBtn=null,this.progress=null,this._rafId=null,this._onPlayClick=null,this._onVideoClick=null,this._onVideoEnded=null,this._onMouseEnter=null,this._onMouseLeave=null,this._onStopAll=null}},
{key:"_bindEvents",value:function(){this.playBtn&&O(this.playBtn,"click",this._onPlayClick),this.video&&O(this.video,"click",this._onVideoClick),this.video&&O(this.video,"ended",this._onVideoEnded),De||O(this.el,"mouseenter",this._onMouseEnter),De||O(this.el,"mouseleave",this._onMouseLeave),this.emitter.on(Na,this._onStopAll)}},
{key:"_unbindEvents",value:function(){this.playBtn&&B(this.playBtn,"click",this._onPlayClick),this.video&&B(this.video,"click",this._onVideoClick),this.video&&B(this.video,"ended",this._onVideoEnded),De||B(this.el,"mouseenter",this._onMouseEnter),De||B(this.el,"mouseleave",this._onMouseLeave),this.emitter.off(Na,this._onStopAll)}},
{key:"_onPlayClick",value:function(){this.emitter.emit(Na),this.video&&(this.video.muted=!1,this.el.classList.add("--playing"),this.video.play().catch(function(){}),this._startProgress())}},
{key:"_onVideoClick",value:function(){this.el.classList.contains("--playing")&&this._stopVideo()}},
{key:"_onVideoEnded",value:function(){this._stopVideo()}},
{key:"_onMouseEnter",value:function(){this.el.classList.contains("--playing")||this.previewVideo&&(!this.previewVideo.getAttribute("src")&&this.el.dataset.previewSrc&&(this.previewVideo.src=this.el.dataset.previewSrc),this.el.classList.add("--previewing"),this.previewVideo.play().catch(function(){}))}},
{key:"_onMouseLeave",value:function(){this.el.classList.contains("--playing")||this._stopPreview()}},
{key:"_onStopAll",value:function(){this._stopPreview(),this._stopVideo()}},
{key:"_stopPreview",value:function(){this.previewVideo&&!this.previewVideo.paused&&this.previewVideo.pause(),this.el&&this.el.classList.remove("--previewing")}},
{key:"_startProgress",value:function(){this._rafId&&cancelAnimationFrame(this._rafId),this._rafId=requestAnimationFrame(this._tickProgress)}},
{key:"_stopProgress",value:function(){this._rafId&&(cancelAnimationFrame(this._rafId),this._rafId=null),this.progress&&(this.progress.value=0)}},
{key:"_tickProgress",value:function(){if(this.video&&this.progress){var t=this.video,e=t.currentTime,i=t.duration;
i>0&&(this.progress.value=e/i*100),this._rafId=requestAnimationFrame(this._tickProgress)}}},
{key:"_stopVideo",value:function(){this._stopProgress(),this.video&&(this.video.pause(),this.video.muted=!0,this.video.currentTime=0),this.el&&this.el.classList.remove("--playing")}}]),t}();
const $a=ja;
function Ha(){return JSON.parse(JSON.stringify({credentials:"same-origin",headers:{"X-Requested-With":"XMLHttpRequest","Content-Type":"application/json;
"}}))}function qa(t,e){return fetch(t,e).then(function(t){if(!t.ok)throw t;
return t.json()})}function Wa(){return qa("/cart.js",Ha())}function Ya(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,n=Ha();
return e=e||{},n.method="POST",n.body={line:t,quantity:e.quantity,properties:e.properties},i&&(n.body=Object.assign({},n.body,i)),n.body=JSON.stringify(n.body),qa("/cart/change.js",n)}function Ua(t){return t&&"undefined"!=typeof Symbol&&t.constructor===Symbol?"symbol":typeof t}function Xa(t){if("string"!=typeof t||2!==t.split(":").length)throw new TypeError("Theme Cart: Provided key value is not a string with the format xxx:xxx")}function Ka(t){if(e=t,!(null!=(i=HTMLFormElement)&&"undefined"!=typeof Symbol&&i[Symbol.hasInstance]?i[Symbol.hasInstance](e):e instanceof i))throw new TypeError("Theme Cart: Form must be an instance of HTMLFormElement");
var e,i}function Ja(t){if("object"!==(void 0===t?"undefined":Ua(t)))throw new TypeError("Theme Cart: Options must be an object");
if(void 0===t.quantity&&void 0===t.properties)throw new Error("Theme Cart: You muse define a value for quantity or properties");
void 0!==t.quantity&&function(t){if("number"!=typeof t||isNaN(t))throw new TypeError("Theme Cart: An object which specifies a quantity or properties value is required")}(t.quantity),void 0!==t.properties&&function(t){if("object"!==(void 0===t?"undefined":Ua(t)))throw new TypeError("Theme Cart: Properties must be an object")}(t.properties)}function Za(t){return Xa(t),Wa().then(function(e){var i=-1;
return e.items.forEach(function(e,n){i=e.key===t?n+1:i}),-1===i?Promise.reject(new Error("Theme Cart: Unable to match line item with provided key")):i})}function Qa(t){Ka(t);
var e=new FormData(t);
return function(t){if("number"!=typeof t||isNaN(t))throw new TypeError("Theme Cart: Variant ID must be a number")}(parseInt(e.get("id"),10)),function(t){var e=Ha();
return delete e.headers["Content-Type"],e.method="POST",e.body=t,qa("/cart/add.js",e)}(e)}function to(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;
return Xa(t),Ja(e),Za(t).then(function(t){return Ya(t,e,i)})}function eo(t){return e={note:t},(i=Ha()).method="POST",i.body=JSON.stringify(e),qa("/cart/update.js",i);
var e,i}function io(t,e){(null==e||e>t.length)&&(e=t.length);
for(var i=0,n=new Array(e);
i<e;
i++)n[i]=t[i];
return n}function no(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function ro(t,e){for(var i=0;
i<e.length;
i++){var n=e[i];
n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function so(t,e,i){return e&&ro(t.prototype,e),i&&ro(t,i),t}function ao(t){return function(t){if(Array.isArray(t))return io(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(!t)return;
if("string"==typeof t)return io(t,e);
var i=Object.prototype.toString.call(t).slice(8,-1);
"Object"===i&&t.constructor&&(i=t.constructor.name);
if("Map"===i||"Set"===i)return Array.from(i);
if("Arguments"===i||/^(?:Ui|I)nt(?:8