Is(this.slider,zs))}},
{key:"destroy",value:function(){this._swiper&&this._swiper.destroy(!0,!1),this.el=null,this.emitter=null,this.slider=null,this._swiper=null}}])&&Vs(e.prototype,i),n&&Vs(e,n),t}();
const js=Ns;
function Gs(t,e){for(var i=0;
i<e.length;
i++){var n=e[i];
n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}const $s=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.el=e,this.title=(0,I.$)(".pb-row-featured-products__title",this.el),this.subtitlePill=(0,I.$)(".pb-row-featured-products__subtitle.pill",this.el)}var e,i,n;
return e=t,(i=[
{key:"init",value:function(){this._bindEvents()}},
{key:"destroy",value:function(){this._unbindEvents(),this.el=null}},
{key:"start",value:function(){this.title&&this.subtitlePill&&this.title.insertBefore(this.subtitlePill,this.title.firstChild)}},
{key:"stop",value:function(){}},
{key:"_bindEvents",value:function(){}},
{key:"_unbindEven