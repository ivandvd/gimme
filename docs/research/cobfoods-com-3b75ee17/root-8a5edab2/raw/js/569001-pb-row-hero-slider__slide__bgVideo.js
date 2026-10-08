hero-slider__slide__title",this.slider)).filter(function(t){return t!==n}).forEach(function(t){t.classList.remove("is-inview")})}},
{key:"_onBeforeTransitionStart",value:function(t){var e=t.slides[t.activeIndex],i=(0,I.$)(".pb-row-hero-slider__slide__bgVideo",e),n=this.videos.find(function(t){return t.el===i});
n&&n.play(),this.videos.forEach(function(t){t.el!==i&&t.pause()})}}]),t}(),aa=function(){function t(e){ea(this,t),this.el=e,this.instance=new Qs(this.el)}return na(t,[
{key:"destroy",value:function(){this.instance.destroy(),this.el=null}},
{key:"play",value:function(){this.instance.play()}},
{key:"pause",value:function(){this.instance.pause()}}]),t}();
const oa=sa;
function la(t,e){for(var i=0;
i<e.length;
i++){var n=e[i];
n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writab