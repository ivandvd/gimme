}))}},
{key:"remove",value:function(t){if(this._elements&&(this._elements=this._elements.filter(function(e){return e!==t})),this.items){var e=this.items.findIndex(function(e){return e.el===t});
if(e>-1){var i=this.items.splice(e,1)[0];
i.stop(),i.destroy()}}}},
{key:"_initChildren",value:function(){this.items=this._elements.map(function(t){return new ga(t)}),this._elements=null}}]),t}(),ga=function(){function t(e){da(this,t),this.el=e,this.parent=this.el.parentNode,this.udid=this.el.id?this.el.id:null,this.udid||(this.udid="youtube-smooth-scroll--".concat(va++),this.el.id=this.udid);
var i=new URLSearchParams(this.el.src);
this._autoplay="1"===i.get("autoplay"),this._playerReady=!1,this._playerStatus=null,this._onClick=this._onClick.bind(this),this._onReady=this._onReady.bind(this),this._onStateChange=this._onStateChange.bind(this)}return ma(t,[
{key:"destroy",value:function(){this.player&&this.player.destroy(),this.el=null,this.parent=null,this.player=null,this.udid=null,this._autoplay=null,this._playerReady=null,this._playerStatus=null,this._onClick=null,this._onReady=null,this._onStateChange=null}},
{key:"start",value:function(){this._bindEvents(),this._autoplay&&(this._onClick(),this._onStateChange({data:YT.PlayerState.PLAYING}))}},
{key:"stop",value:function(){this._unbindEvents(),this.player&&(this.player.removeEventListener("onReady",this._onReady),this.player.removeEventListener("onStateChange",this._onStateChange))}},
{key:"_bindEvents",value:function(){this.parent&&(this.el.style.pointerEvents="none",this.parent.removeEventListener("click",this._onClick),this.parent.addEventListener("click",this._onClick))}},
{key:"_unbindEvents",value:function(){this.parent&&(this.el.style.pointerEvents="",this.parent.removeEventListener("click",this._onClick))}},
{key:"_onClick",value:function(t){t&&(t.stopPropagation(),t.preventDefault()),this.player?!0===this._playerReady&&this.player.playVideo():(this.player=new YT.Player(this.udid),this.player.addEventListener("onReady",this._onReady),this.player.addEventListener("onStateChange",this._onStateChange))}},
{key:"_onReady",value:function(){this._playerReady=!0,this.player.playVideo(),this._unbindEvents()}},
{key:"_onStateChange",value:function(t){this._playerReady=!0,t.data===YT.PlayerState.PAUSED||t.data===YT.PlayerState.ENDED?this._bindEvents():t.data===YT.PlayerState.PLAYING&&this._unbindEvents()}}]),t}();
const _a=ya;
function ba(t,e){(null==e||e>t.length)&&(e=t.length);
for(var i=0,n=new Array(e);
i<e;
i++)n[i]=t[i];
return n}function wa(t,e,i){return e=Ea(e),function(t,e){if(e&&("object"===function(t){return t&&"undefined"!=typeof Symbol&&t.constructor===Symbol?"symbol":typeof t}(e)||"function"==typeof e))return e;
return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
return t}(t)}(t,Pa()?Reflect.construct(e,i||[],Ea(t).constructor):e.apply(t,i))}function Sa(t,e){for(var i=0;
i<e.length;
i++){var n=e[i];
n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function Ea(t){return Ea=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},Ea(t)}function ka(t,e){return ka=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},ka(t,e)}function xa(t){return function(t){if(Array.isArray(t))return ba(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(!t)return;
if("string"==typeof t)return ba(t,e);
var i=Object.prototype.toString.call(t).slice(8,-1);
"Object"===i&&t.constructor&&(i=t.constructor.name);
if("Map"===i||"Set"===i)return Array.from(i);
if("Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))return ba(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function Pa(){try{var t=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch(t){}return(Pa=function(){return!!t})()}const Ca=function(t){function e(t){var i;
return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),(i=wa(this,e)).el=t,i.buttons=xa((0,I.$$)('[role*="tab"]',i.el)),i._selectedItem=null,i._value=null,i._onClick=i._onClick.bind(i),i.init(),i}var i,n,r;
return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");
t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&ka(t,e)}(e,t),i=e,(n=[
{key:"init",value:function(){this._selectedItem=this.buttons.find(function(t){return"true"===t.getAttribute("aria-selected")}),this._selectedItem&&(this._value=this._selectedItem.getAttribute("aria-controls")),this._bindEvents()}},
{key:"destroy",value:function(){this._unbindEvents(),this.el=null,this.buttons=null,this._selectedItem=null,this._value=null,this._onClick=null}},
{key:"_bindEvents",value:function(){this.buttons&&O(this.buttons,"click",this._onClick)}},
{key:"_unbindEvents",value:function(){this.buttons&&B(this.buttons,"click",this._onClick)}},
{key:"_onClick",value:function(t){t&&(t.preventDefault(),t.stopImmediatePropagation());
var e=t.currentTarget;
if(e!==this._selectedItem){if(this._selectedItem&&this._selectedItem.setAttribute("aria-selected",!1),this._value){var i=(0,I.$)("#".concat(this._value));
i&&i.setAttribute("aria-hidden",!0)}this._selectedItem=e,this._selectedItem.setAttribute("aria-selected",!0),this._value=this._selectedItem.getAttribute("aria-controls");
var n=(0,I.$)("#".concat(this._value));
n&&n.set