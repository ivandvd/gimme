el.appendChild(e)}},
{key:"_onSparkleTransitionEnd",value:function(t){var e=t.currentTarget;
B(e,"animationend",this._onSparkleTransitionEnd),e.classList.remove("--js-animate")}}],i&&zn(e.prototype,i),n&&zn(e,n),t}();
function Hn(t,e){for(var i=0;
i<e.length;
i++){var n=e[i];
n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var qn=function(){function t(e,i){switch(function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.el=e,this.emitter=i,this.style=this.el.dataset.buttons,this.style){case"cta":return De?null:this.btn=new Mn(e);
case"close":case"sharing":return this.btn=new Fn(e);
case"pagination":return this.btn=new Dn(e);
case"tag":return De?null:this.btn=new Bn(e);
case"social":retu