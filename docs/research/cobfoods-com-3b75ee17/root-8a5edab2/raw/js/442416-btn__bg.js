, ").concat(o.y,"px)"),i&&(n.removeAttribute("cx"),n.removeAttribute("cy"))})}},
{key:"_getDuration",value:function(){return this.el.classList.contains("--cta-oval")?1e4:3e4}}],i&&Tn(e.prototype,i),n&&Tn(e,n),t}();
function In(t,e){for(var i=0;
i<e.length;
i++){var n=e[i];
n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}const Dn=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.el=e,this.bg=(0,I.$)(".btn__bg",this.el),this._hovering=!1,this._rotation=0,this._target=0,this._velocity=0,this._raf=null,this._rollover=this._rollover.bind(this),this._rollout=this._rollout.bind(this),this._update=this._update.bind(this),this.init()}var e,i,n;
return e=t,(i=[
{key:"init",value:function(){this._bindEvents()}},
{key:"destroy",value:function(){this._unbindEvents(),this._raf&&cancelAnimationFrame(this._raf),this.el=null,this.bg=null,this._hovering=null,this._rotation=null,this._target=null,this._velocity=null,this._raf=null,this._rollover=null,this._rollout=null,this._update=null}},
{key:"_bindEvents",value:function(){O(this.el,"mouseenter",this._rollover),O(this.el,"mouseleave",this._rollout),O(this.el,"focus",this._rollover),O(this.el,"blur",this._rollout)}},
{key:"_unbindEvents",value:function(){B(this.el,"mouseenter",this._rollover),B(this.el,"mouseleave",this._rollout),B(this.el,"focus",this._rollover),B(this.el,"blur",this._rollout)}},
{key:"_rollover",value:function(){this.el.classList.contains("--pagination-selected")&&(this._hovering=!0,this._raf||this._update())}},
{key:"_rollout",value:function(){if(this.el.classList.contains("--pagination-selected")){var t=60-this._rotation%60;
this._target=Math.round(this._rotation+t),this._hovering=!1}}},
{key:"_update",value:function(){if(this.bg){var t=!0;
if(this._hovering)this._velocity=Math.min(Math.max(1.1*this._velocity,.1),1),this._rotation+=this._velocity;
else{var e=this._target-this._rotation,i=Math.min(.05*e,this._velocity);
this._rotation+=i,this._targe