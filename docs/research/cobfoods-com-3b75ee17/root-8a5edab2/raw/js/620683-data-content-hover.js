on(t){console.log(t),this._copyPromise=null}},
{key:"_copyCompleted",value:function(){this.copyMessage&&this.copyMessage.setAttribute("aria-hidden",!0),this._copyPromise=null}}])&&Ro(e.prototype,i),n&&Ro(e,n),t}();
function zo(t,e){for(var i=0;
i<e.length;
i++){var n=e[i];
n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}const No=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.el=e,this._mouseEnter=this._mouseEnter.bind(this),this._mouseLeave=this._mouseLeave.bind(this),this._stopAnimPlaying=this._stopAnimPlaying.bind(this)}var e,i,n;
return e=t,(i=[
{key:"init",value:function(){this.contentHover=(0,I.$)("[data-content-hover]",this.el),this._bindEvents()}},
{key:"destroy",value:function(){this._unbindEvents(),this.el=null}},
{key:"start",value:function(){}},
{key:"stop",value:function(){}},
{key:"_bindEvents",value:function(){O(this.el,"mouseenter",this._mouseEnter),O(this.el,"mouseleave",this._mouseLeave)}},
{key:"_unbindEvents",value:function(){B(this.el,"mouseenter",this._mouseEnter),B(this.el,"mouseleave",this._mouseLeave)}},
{key:"_mouseEnter",value:function(t){this.contentHover&&B(this.contentHover,"transitionend",this._stopAnimPlaying),this.el.classList.add("--js-anim-playing")}},
{key:"_mouseLeave",value:function(t){this.contentHov