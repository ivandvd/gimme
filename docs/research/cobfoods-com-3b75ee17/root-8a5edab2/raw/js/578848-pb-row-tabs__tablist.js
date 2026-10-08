Attribute("aria-hidden",!1),this.emit("change",this._value)}}},
{key:"selectedItem",get:function(){return this._selectedItem}},
{key:"value",get:function(){return this._value}}])&&Sa(i.prototype,n),r&&Sa(i,r),e}(c());
function Ta(t,e){for(var i=0;
i<e.length;
i++){var n=e[i];
n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var Aa=function(){function t(e,i){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.el=e,this.emitter=i,this.tablist=(0,I.$)(".pb-row-tabs__tablist",this.el),this._onTabListChange=this._onTabListChange.bind(this)}var e,i,n;
return e=t,(i=[
{key:"init",value:function(){this.tablist&&(this.tablist=new Ca(this.tablist))}},
{key:"destroy",value:function(){this.tablist&&this.tablist.destroy(),this.el=null,this.emitter=null,this.tablist=null,this._onTabListChange=null}},
{key:"start",value:function(){this._bindEvents()}},
{key:"stop",value:function(){this._unbindEvents()}},
{key:"_bindEvents",value:function(){this.tabs&&this.tabs.on("change",this._onTabListChange)}},
{key:"_unbindEvents",value:function(){this.tabs&&this.tabs.on("change",this._onTabListChange)}},
{key:"_onTabListChange",value:function(){this.emitter.emit("SiteScroll.update")}}])&&Ta(e.prototype,i),n&&Ta(e,n),