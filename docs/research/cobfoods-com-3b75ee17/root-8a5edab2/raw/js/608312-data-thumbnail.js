Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))return mo(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function Eo(){try{var t=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch(t){}return(Eo=function(){return!!t})()}var ko=function(){function t(e,i){yo(this,t),this.el=e,this.emitter=i,this._scrollToReviews=this._scrollToReviews.bind(this),this._swapImage=this._swapImage.bind(this),this._nextImage=this._nextImage.bind(this),this._prevImage=this._prevImage.bind(this),this._toggleProductList=this._toggleProductList.bind(this),this._openProductList=this._openProductList.bind(this),this._closeProductList=this._closeProductList.bind(this),this._onMediaActivate=this._onMediaActivate.bind(this),this._onOkendoAnalyticsEvent=this._onOkendoAnalyticsEvent.bind(this)}return _o(t,[
{key:"init",value:function(){this.thumbnails=So((0,I.$$)("[data-thumbnail]",this.el)),this.medias=So((0,I.$$)("[data-media]",this.el)).map(function(t){return new xo(t)}),this.imgWrap=(0,I.$)(".product-single__imgWrapWrap",this.el),this.prev=(0,I.$)(".product-single__prev",this.el),this.next=(0,I.$)(".product-single__next",this.el),this.ratings=(0,I.$)(".product-single__ratings",this.el),this.ratingsReviews=(0,I.$)("[data-oke-reviews-product-id]",I.rf),this.productList=(0,I.$)("[data-product-list]",this.el),this.productListControl=(0,I.$)("[data-product-list-control]",this.el),this._bindEvents()}},
{key:"destroy",value:function(){this._unbindEvents(),this.medias&&this.medias.forEach(function(t){return t.destroy()}),this.el=null,this.thumbnails=null,this.medias=null,this.imgWrap=null,this.prev=null,this.next=null,this.productList=null,this.productListControl=null,this._scrollToReviews=null,this._swapImage=null,this._nextImage=null,this._prevImage=null,this._toggleProductList=null,this._openProductList=null,this._closeProductList=null,this._onMediaActivate=null,this._onOkendoAnalyticsEvent=null}},
{key:"start",value:function(){var t=this;
window.okeWidgetApi&&window.okeWidgetApi.initAllWidgets(),setTimeout(function(){t.emitter.emit("SiteScroll.update")},1e3)}},
{key:"stop",value:function(){}},
{key:"_bindEvents",value:function(){var t=this;
this.ratings&&this.ratingsReviews&&O(this.ratings,"click",this._scrollToReviews),this.thumbnails&&O(this.thumbnails,"click",this._swapImage),this.productListControl&&O(this.productListControl,"click",this._toggleProductList),this.imgWrap&&O(this.imgWrap,"click",this._nextImage),this.next&&O(this.next,"click",this._nextImage),this.prev&&O(this.prev,"click",this._prevImage),this.medias&&this.medias.forEach(function(e){e.on("activate",t._onMediaActivate)}),document.addEventListener("oke-analytics-event",this._onOkendoAnalyticsEvent)}},
{key:"_unbindEvents",value:function(){var t=this;
B(window,"click",this._closeProductList),document.removeEventListener("oke-analytics-event",this._onOkendoAnalyticsEvent),this.ratings&&this.ratingsReviews&&B(this.ratings,"click",this._scrollToReviews),this.thumbnails&&B(this.thumbnails,"click",this._swapImage),this.productListControl&&B(this.productListControl,"click",this._toggleProductList),this.imgWrap&&B(this.imgWrap,"click",this._nextImage),this.next&&B(this.next,"click",this._nextImage),this.prev&&B(this.prev,"click",this._prevImage),this.medias&&this.medias.forEach(function(e){e.off("activate",t._onMediaActivate)})}},
{key:"_onOkendoAnalyticsEvent",value:function(t){var e,i=this;
["okendo_reviews_load_more","okendo_filter_toggle_click","okendo_filter_option_click","okendo_review_sort_helpful_desc"].includes(null===(e=t.detail)||void 0===e?void 0:e.event)&&setTimeout(function(){i.emitter.emit("SiteScroll.update")},500)}},
{key:"_scrollToReviews",value:function(){this.emitter.emit("SiteScroll.scrollTo",this.ratingsReviews)}},
{key:"_nextImage",value:function(){var t=this.medias.find(function(t){return t.active}),e=parseInt(t.index)+1;
e>=this.medias.length&&(e=0);
var i=this.thumbnails.find(function(t){return t.getAttribute("data-media-index")==e});
this._swapImage({currentTarget:i})}},
{key:"_prevImage",value:function(){var t=this.medias.find(function(t){return t.active}),e=parseInt(t.index)-1;
e<0&&(e=this.medias.length-1);
var i=this.thumbnails.find(function(t){return t.getAttribute("data-media-index")==e});
this._swapImage({currentTarget:i})}},
{key:"_swapImage",value:function(t){var e=t.currentTarget.getAttribute("data-media-index");
this.medias.find(function(t){return t.index==e}).activate(),this.thumbnails.forEach(function(e){e==t.currentTarget?e.classList.add("--active"):e.classList.remove("--active")})}},
{key:"_onMediaActivate",value:function(t){this.medias.forEach(function(e){t!=e&&e.desactivate()})}},
{key:"_toggleProductList",value:function(){this.productList.classList.contains("--opened")?this._closeProductList():this._openProductList()}},
{key:"_openProductList",value:function(){var t=this;
this.productList.classList.add("--opened"),setTimeout(function(){O(window,"click",t._closeProductList)},10),this.emitter.emit("SiteScroll.update")}},
{key:"_closeProductList",value:function(){B(window,"click",this._closeProductList),this.productList.classList.remove("--opened"),this.emitter.emit("SiteScroll.update")}}]),t}(),xo=function(t){function e(t){var i;
return yo(this,e),(i=vo(this,e)).el=t,i.activate=i.activate.bind(i),i.desactivate=i.desactivate.bind(i),i.init(),i}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");
t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&wo(t,e)}(e,t),_o(e,[
{key:"init",value:function(){this.index=this.el.getAttribute("data-media-index"),this.img=(0,I.$)("img",this.el),this._bindEvents()}},
{key:"destroy",value:function(){this._unbindEvents(),this.el=null,this.index=null,this.activate=null,this.desactivate=null}},
{key:"activate",value:function(){var t=this;
this.el.classList.add("--active"),this.img.classList.remove("d-none"),this.img.complete?(this.el.classList.add("--active"),this.emit("activate",this)):O(this.img,"load",function(){t.el.classList.add("--active"),t.emit("activate",t),B(t.img,"load")})}},
{key:"desactivate",value:function(){this.el.classList.remove(