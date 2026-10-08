me);
if("Map"===i||"Set"===i)return Array.from(i);
if("Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))return Vn(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var jn,Gn=["color-pink","color-yellow","color-green","color-purple"];
const $n=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.el=e,this.sparkles=null,this.colors=Rn(this.el.hasAttribute("data-social-colors")?this.el.getAttribute("data-social-colors").split(" "):Nn(Gn)),this._isHover=!1,this._tick=null,this._rollover=this._rollover.bind(this),this._rollout=this._rollout.bind(this),this._update=this._update.bind(this),this._onSparkleTransitionEnd=this._onSparkleTransitionEnd.bind(this),this.init()}var e,i,n;
return e=t,i=[
{key:"init",value:function(){this._bindEvents()}},
{key:"destroy",value:function(){this._unbindEvents(),this._tick&&clearTimeout(this._tick),this.el=null,this.sparkles=null,this.colors=null,this._isHover=null,this._tick=null,this._rollover=null,this._rollout=null,this._update=null,this._onSparkleTransitionEnd=null}},
{key:"_bindEvents",value:function(){O(this.el,"mouseenter",this._rollover),O(this.el,"mouseleave",this._rollout),O(this.el,"focus",this._rollover),O(this.el,"blur",this._rollout)}},
{key:"_unbindEvents",value:function(){B(this.el,"mouseenter",this._rollover),B(this.el,"mouseleave",this._rollout),B(this.el,"focus",this._rollover),B(this.el,"blur",this._rollout)}},
{key:"_rollover",value:function(){this.sparkles||this._createSparkles(),this._isHover=!0,this._tick||this._update()}},
{key:"_rollout",value:function(){this._isHover=!1}},
{key:"_update",value:function(){if(this._tick=null,this._isHover){var t=this.sparkles.shift();
this.sparkles.push(t),O(t,"animationend",this._onSparkleTransitionEnd),t.classList.add("--js-animate"),this._tick=setTimeout(this._update,750)}}},
{key:"_createSparkles",value:function(){var t=this,e=document.createDocumentFragment();
this.sparkles=Array(4).fill().map(function(i,n){var r=function(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;
return jn||(jn=document.createElement("div")),jn.innerHTML='<div class="sparkle '.concat(t,'" style="--polarity: ').concat(i,";
 left: ").concat(e,'px;
">\n    <svg width="15" height="24" viewBox="0 0 15 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n      <path d="M7.48574 0C7.48574 0 8.15984 9.01785 15 12.2355C15 12.2355 8.49004 14.3464 7.48574 24C6.48202 14.3464 0 12.2355 0 12.2355C6.84073 9.01785 7.48574 0 7.48574 0Z" fill="currentColor"/>\n    </svg>\n  </div>'),jn.firstChild}(t.colors[n%t.colors.length],Math.round(n%2==0?3*Math.random():3*Math.random()+5),Math.random()>.5?1:-1);
return e.appendChild(r),r}),this.