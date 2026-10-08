eturn{dispose:function(){s=!0,i=null,r=null},on:function(){r.forEach(function(t){return t.addListener(n)})},off:function(){r.forEach(function(t){return t.removeListener(n)})},run:a}};
function Js(t,e){for(var i=0;
i<e.length;
i++){var n=e[i];
n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var Zs=["(min-width: 768px)"];
const Qs=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.el=e,this._src=this.el.dataset.src,this._src_mobile=this.el.dataset.srcMobile,this._onBreakpointChange=this._onBreakpointChange.bind(this),this._src&&this._src_mobile&&(this._bp=new Ks(Zs,this._onBreakpointChange)),this.init()}var e,i,n;
return e=t,i=[
{key:"init",value:function(){this._bp?this._bp.run():this._src&&this._onBreakpointChange()}},
{key:"destroy",value:function(){this._unbindEvents(),this._bp&&this._bp.dispose(),this.el=null,this._action=null,this._playPromise=null,this._src=null,this._src_mobile=null,this._bp=null,this._onBreakpointChange=null}},
{key:"play",value:function(){var t,e=this,i=arguments.length>0&&void 0!==arguments[0]&&arguments[0];
this.el&&("play"===this._action&&!1===i||(this._action="play",this._playPromise||(this._playPromise=null===(t=this.el)||void 0===t?void 0:t.play().finally(function(){e._playPromise=null}))))}},
{key:"pause",value:function(){var t,e=this;
this.el&&"pause"!==this._action&&(this._action="pause",this._playPromise?this._playPromise.then(function(){var t;
return null===(t=e.el)||void 0===t?void 0:t.pause()}):null===(t=this.el)||void 0===t||t.pause())}},
{key:"_bindEvents",value:function(){var t;
null===(t=this._bp)||void 0===t||t.on()}},
{key:"_unbindEvents",value:function(){var t;
null===(t=this._bp)||void 0===t||t.off()}},
{key:"_onBreakpointChange",value:function(){this.el.setAttribute("src",this.src),"play"===this._action&&this.play(!0)}},
{key:"playing",get:function(){return"play"===this._action}},
{key:"src",get:function(){return this._src_mobile&&Oe.width<768?this._src_mobile:this._src}}],i&&Js(e.prototype,i),n&&Js(e,n),t}();
function ta(t,e){(null==e||e>t.length)&&(e=t.length);
for(var i=0,n=new Array(e);
i<e;
i++)n[i]=t[i];
return n}function ea(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function ia(t,e){for(var i=0;
i<e.length;
i++){var n=e[i];
n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function na(t,e,i){return e&&ia(t.prototype,e),i&&ia(t,i),t}function ra(t){return function(t){if(Array.isArray(t))return ta(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(!t)return;
if("string"==typeof t)return ta(t,e);
var i=Object.prototype.toStri