rn this._ready}}])&&ua(e.prototype,i),n&&ua(e,n),t}());
function da(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function fa(t,e){for(var i=0;
i<e.length;
i++){var n=e[i];
n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function ma(t,e,i){return e&&fa(t.prototype,e),i&&fa(t,i),t}var va=1,ya=function(){function t(e,i){da(this,t),this.el=e,this.emitter=i,this.items=null,this._elements=null,this._status=0,this._initChildren=this._initChildren.bind(this)}return ma(t,[
{key:"init",value:function(){var t=this;
De||(this._elements=Array.from((0,I.$$)('.wysiwyg iframe[src*="youtube.com"]',this.el)),this._elements&&0!==this._elements.length&&(this._status=1,pa.load().then(function(){t._status<1||(t._initChildren(),3===t._status&&t.start())})))}},
{key:"destroy",value:function(){this.items&&this.items.forEach(function(t){return t.destroy()}),this.el=null,this.emitter=null,this.items=null,this._elements=null,this._status=0}},
{key:"start",value:function(){this._status=3,this.items&&this.items.forEach(function(t){return t.start()})}},
{key:"stop",value:function(){this.items&&this.items.forEach(function(t){return t.stop()}),this._status=2}},
{key:"add",value:function(t){var e=this;
De||(this._status<1&&(this._status=1),pa.load().then(function(){if(!(e._status<1)){var i=new ga(t);
e.items||(e.items=[]),e.items.push(i),3===e._status&&i.start()}