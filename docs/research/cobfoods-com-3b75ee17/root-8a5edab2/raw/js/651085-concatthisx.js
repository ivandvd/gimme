start"),this.el.setAttribute("aria-hidden",!0))}},
{key:"_calculateMousePosition",value:function(t){this.mouseX=t.clientX,this.mouseY=t.clientY}},
{key:"_onRaf",value:function(){var t=this;
this._opened&&(this._raf=requestAnimationFrame(this._onRaf),this.decorationItems.forEach(function(e){return e.update(t.mouseX,t.mouseY)}))}},
{key:"opened",get:function(){return this._opened}}]),t}(),Ll=function(){function t(e){Pl(this,t),this.el=e,this.update=this.update.bind(this),this.init()}return Tl(t,[
{key:"init",value:function(){this.rect=this.el.getBoundingClientRect(),this.x=this.rect.left,this.y=this.rect.top,this.traction=this.el.getAttribute("data-traction")?parseFloat(this.el.getAttribute("data-traction")):.5}},
{key:"destroy",value:function(){this.el=null,this.x=null,this.y=null}},
{key:"update",value:function(t,e){this.x=Ae(this.x,t*this.traction,.1),this.y=Ae(this.y,e*this.traction,.1),this.el.style.transform="translate3d(".concat(this.x,"px,").concat(this.y,"px,0)")}}]),t}();
const Fl=Dl;
function Ol(t,e){(null==e||e>t.length)&&(e=t.length);
for(var i=0,n=new Array(e);
i<e;
i++)n[i]=t[i];
return n}function Bl(t,e){for(var i=0;
i<e.length;
i++){var n=e[i];
n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function Rl(t){return function(t){if(Array.isArray(t))return Ol(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(!t)return;
if("string"==typeof t)return Ol(t,e);
var i=Object.prototype.toString.call(t).s