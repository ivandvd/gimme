lice(8,-1);
"Object"===i&&t.constructor&&(i=t.constructor.name);
if("Map"===i||"Set"===i)return Array.from(i);
if("Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))return Ol(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var Vl="closed",zl=function(){function t(e,i){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.el=e,this.emitter=i,this.initialized=!1,this._visible=!1,this._handleTriggers=this._handleTriggers.bind(this),this._onScroll=this._onScroll.bind(this),this._saveUserPreference=this._saveUserPreference.bind(this)}var e,i,n;
return e=t,(i=[
{key:"name",get:function(){return"SiteNewsletter"}},
{key:"init",value:function(){var t,e,i;
window.Shopify&&window.Shopify.designMode||this.initialized||(this.initialized=!0,this.el=(0,I.$)(".site-newsletter"),this.el&&(this.triggers=Rl((0,I.$$)('[aria-controls="'.concat(this.el.id,'"]'),this.el)),this.cookieDuration=null===(t=this.el)||void 0===t?void 0:t.dataset.cookieDuration,this.cookieName=null===(e=this.el)||void 0===e?void 0:e.dataset.cookieName,this.minimumScrollDistance=null===(i=this.el)||void 0===i?void 0:i.dataset.minimumScrollDistance,this._bindEvents()))}},
{key:"destroy",value:function(){this._unbindEvents(),this.el=null,this.initialized=!1}},
{key:"_bindEvents",value:function(){this.triggers&&O(this.triggers,"click",this._handleTriggers),this.emitter&&this.emitter.on("SiteScroll.scroll",this._onScroll),this.emitter&&this.emitter.on("SiteNewsletter.saveUserPreference",this._saveUserPreference),this.emitter&&this.emitter.on("SiteNewsletter.close",this._handleTriggers)}},
{key:"_unbindEvents",value:function(){this.triggers&&B(this.triggers,"click",this._handleTriggers),this.emitter&&this.emitter.off("SiteScroll.scroll",this._onScroll),this.emitter&&this.emitter.off("SiteNewsletter.saveUserPreference",this._saveUserPreference),this.emitter&&this.emitter.off("SiteNewsletter.close",this._handleTriggers)}},
{key:"_onScroll",value:function(t){t.y>this.minimumScrollDistance&&this._userPreference()!==Vl&&(this.visible=!0)}},
{key:"_handleTriggers",value:function(){!0===this._visible&&(this.visible=!1,this._saveUserPreference())}},
{key:"_saveUserPreference",value:function(){localStorage.setItem(this.cookieName,JSON.stringify({value:Vl,host:window.location.host}))}},
{key:"_userPreference",value:function(){var t;
return null===(t=JSON.parse(localStorage.getItem(this.cookieName)))||void 0===t?void 0:t.value}},
{key:"visible",get:function(){return"false"===this.el.getAttribute("aria-hidden")},set:function(t){this._visible!==t&&(this._visible=t,this.el.setAttribute("aria-hidden",!0===this._visible?"false":"true"))}}])&&Bl(e.prototype,i),n&&Bl(e,n),t}();
const Nl=zl;
function jl(t,e){(null==e||e>t.length)&&(e=t.length);
for(var i=0,n=new Array(e);
i<e;
i++)n[i]=t[i];
return n}function Gl(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function $l(t,e){for(var i=0;
i<e.length;
i++){var n=e[i];
n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function Hl(t,e,i){return e&&$l(t.prototype,e),i&&$l(t,i),t}function ql(t){return function(t){if(Array.isArray(t))return jl(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(!t)return;
if("string"==typeof t)return jl(t,e);
var i=Object.prototype.toStri