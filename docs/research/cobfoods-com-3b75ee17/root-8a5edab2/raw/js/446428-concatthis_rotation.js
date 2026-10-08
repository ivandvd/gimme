t-this._rotation<.1&&(t=!1,this._rotation=this._target)}this.bg.style.transform="rotate(".concat(this._rotation,"deg)"),this._raf=t?requestAnimationFrame(this._update):null}}}])&&Ln(e.prototype,i),n&&Ln(e,n),t}();
function On(t,e){for(var i=0;
i<e.length;
i++){var n=e[i];
n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}const Bn=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.el=e,this.label=(0,I.$)(".btn__label",this.el),this.init()}var e,i,n;
return e=t,(i=[
{key:"init",value:function(){var t=Ri()({target:this.label,by:"chars"})[0].chars,e=t.length,i=(e-1)/2;
t.forEach(function(t,n){var r=(n-i)/e;
t.style.setProperty("--translateX","".concat(20*r,"px")),t.style.setProperty("--deg","".concat(25*r,"deg"))}),this.duplicate=this.label.cloneNode(!0),this.duplicate.classList.add("btn__labelDuplicate"),this.el.classList.add("--js-rollover"),this.label.appendChild(this.duplicate)}},
{key:"destroy",value:function(){this.el=null,this.label=null}}])&&On(e.prototype,i),n&&On(e,n),t}();
var Rn=function(t){return t.map(function(t){return[Math.random(),t]}).sort(function(t,e){return t[0]-e[0]}).map(function(t){return t[1]})};
function Vn(t,e){(null==e||e>t.length)&&(e=t.length);
for(var i=0,n=new Array(e);
i<e;
i++)n[i]=t[i];
return n}function zn(t,e){for(var i=0;
i<e.length;
i++){var n=e[i];
n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function Nn(t){return function(t){if(Array.isArray(t))return Vn(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(!t)return;
if("string"==typeof t)return Vn(t,e);
var i=Object.prototype.toString.call(t).slice(8,-1);
"Object"===i&&t.constructor&&(i=t.constructor.na