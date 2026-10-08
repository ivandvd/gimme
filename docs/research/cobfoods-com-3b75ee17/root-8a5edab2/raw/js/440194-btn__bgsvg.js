.call(t).slice(8,-1);
"Object"===i&&t.constructor&&(i=t.constructor.name);
if("Map"===i||"Set"===i)return Array.from(i);
if("Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))return Cn(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}const Mn=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.el=e,this.svg=(0,I.$)(".btn__bg svg",this.el),this.path=(0,I.$)("path",this.svg),this.circles=An((0,I.$$)("circle",this.svg)),this._dummy={value:0},this._length=this.path.getTotalLength(),this._step=1/this.circles.length,this._rollover=this._rollover.bind(this),this._rollout=this._rollout.bind(this),this._update=this._update.bind(this),this.init()}var e,i,n;
return e=t,i=[
{key:"init",value:function(){var t=this;
this._tween=Ce({targets:this._dummy,value:1,duration:this._getDuration(),easing:"linear",loop:!0,autoplay:!1,update:function(e){return t._update(.01*e.progress)}}),this._update(0,!0),this._bindEvents()}},
{key:"destroy",value:function(){this._unbindEvents(),this._tween&&this._tween.remove(this._dummy),this.el=null,this.svg=null,this.path=null,this.circles=null,this._dummy=null,this._length=null,this._step=null,this._tween=null,this._rollover=null,this._rollout=null,this._update=null}},
{key:"_bindEvents",value:function(){O(this.el,"mouseenter",this._rollover),O(this.el,"mouseleave",this._rollout),O(this.el,"focus",this._rollover),O(this.el,"blur",this._rollout)}},
{key:"_unbindEvents",value:function(){B(this.el,"mouseenter",this._rollover),B(this.el,"mouseleave",this._rollout),B(this.el,"focus",this._rollover),B(this.el,"blur",this._rollout)}},
{key:"_rollover",value:function(){this._tween.play()}},
{key:"_rollout",value:function(){this._tween.pause()}},
{key:"_update",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,i=arguments.length>1&&void 0!==arguments[1]&&arguments[1];
this.circles.forEach(function(n,r){var s=e+t._step*r;
s>1&&(s-=1);
var a=s*t._length,o=t.path.getPointAtLength(a>=1?a:0);
n.style.transform="translate(".concat(o.x,"px