ng.call(t).slice(8,-1);
"Object"===i&&t.constructor&&(i=t.constructor.name);
if("Map"===i||"Set"===i)return Array.from(i);
if("Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))return Sn(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var xn=function(){function t(e,i){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.el=e,this.emitter=i,this.accordions=kn((0,I.$$)(".accordions__accordion",this.el)).map(function(t){var e=(0,I.$)(".accordions__btn",t),i=(0,I.$)(".accordions__content",t);
return new wn(t,e,i)}),this._onAccordionOpen=this._onAccordionOpen.bind(this),this._onAccordionClose=this._onAccordionClose.bind(this)}var e,i,n;
return e=t,(i=[
{key:"init",value:function(){}},
{key:"destroy",value:function(){this.accordions&&this.accordions.forEach(function(t){return t.destroy()}),this.el=null,this.emitter=null,this.accordions=null,this._onAccordionOpen=null,this._onAccordionClose=null}},
{key:"start",value:function(){this._bindEvents()}},
{key:"stop",value:function(){this._unbindEvents()}},
{key:"_bindEvents",value:function(){var t=this;
this.accordions&&this.accordions.forEach(function(e){e.on("open",t._onAccordionOpen),e.on("close",t._onAccordionClose)})}},
{key:"_unbindEvents",value:function(){var t=this;
this.accordions&&this.accordions.forEach(function(e){e.off("open",t._onAccordionOpen),e.off("close",t._onAccordionClose)})}},
{key:"_onAccordionOpen",value:function(t){this.accordions.forEach(function(e){e!=t&&e.close()}),this.emitter.emit("SiteScroll.update")}},
{key:"_onAccordionClose",value:function(){this.emitter.emit("SiteScroll.update")}}])&&En(e.prototype,i),n&&En(e,n),t}();
const Pn=xn;
function Cn(t,e){(null==e||e>t.length)&&(e=t.length);
for(var i=0,n=new Array(e);
i<e;
i++)n[i]=t[i];
return n}function Tn(t,e){for(var i=0;
i<e.length;
i++){var n=e[i];
n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function An(t){return function(t){if(Array.isArray(t))return Cn(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(!t)return;
if("string"==typeof t)return Cn(t,e);
var i=Object.prototype.toString