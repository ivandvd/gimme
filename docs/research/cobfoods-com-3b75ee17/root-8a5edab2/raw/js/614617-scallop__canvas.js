"--active")}},
{key:"_bindEvents",value:function(){}},
{key:"_unbindEvents",value:function(){}},
{key:"active",get:function(){return this.el.classList.contains("--active")}}]),e}(c());
const Po=ko;
function Co(t,e){for(var i=0;
i<e.length;
i++){var n=e[i];
n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var To="down",Ao=Te(17.5),Mo=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.el=e,this.canvas=(0,I.$)(".scallop__canvas",this.el),this._ctx=this.canvas.getContext("2d"),this._data={width:null,steps:null,diameter:null,radius:null,x:0,color:this._getColor(),orientation:this.el.classList.contains("--orientation-down")?To:"up",inset:this.el.classList.contains("--inset"),animation:this._getAnimation(),dpr:Oe.devicePixelRatio,counterClockwise:!1},this._started=!1,"up"===this._data.orientation&&(this._data.counterClockwise=!0),this._onResize=this._onResize.bind(this),this.init()}var e,i,n;
return e=t,i=[
{key:"init",value:function(){this._onResize(),this._bindEvents()}},
{key:"destroy",value:function(){this._unbindEvents(),this.el=null,this.canvas=null,this._ctx=null,this._data=null,this._started=null,this._onResize=null}},
{key:"start",value:function(){this._started||(this._started=!0,this.el.classList.add("--js-started"))}},
{key:"stop",value:function(){this._started&&(this.el.classList.remove("--js-started"),this._started=!1)}},
{key:"_bindEvents",value:function(){Di.add(this._onResize)}},
{key:"_unbindEvents",value:function(){Di.remove(this._onResize)}},
{key:"_onResize",value:function(){var t=(0,I.Pc)(this.el).width;
if(t!==this._data.width){var e=this._data.dpr;
this._data.width=t,this._data.steps=this._getSteps(),this._data.diameter=t*e/this._data.steps,this._data.radius=this._data.diameter/2*1.05,this._data.height=Math.ceil(this._data.radius/e),this.canvas.width=this._data.width*e+(this._data.animation?this._data.diameter:0),this.canvas.height=this._data.height*e,this.el.style.height="".concat(this._data.height,"px"),this.el.style.setProperty("--diameter","".concat(this._data.diameter/e,"px")),this._data.animation&&(this.canvas.style.width="".concat(Math.ceil(t+this._data.diameter/e),"px")),this._render()}}},
{key:"_render",value:function(){var t,e=this._data,i=e.width,n=e.height,r=e.color,s=e.dpr,a=e.orientation,o=e.inset,l=e.steps,h=e.diameter,c=e.radius,u=e.x,p=e.counterClockwise,d=e.animation,f=l+(d?1:0);
if(this._ctx.clearRect(0,0,i*s,n*s),this._ctx.fillStyle=r,this._ctx.beginPath(),o){t=a===To?(n+1)*s:-1*s;
for(var m=a===To?0:n*s,v=Ao*(a===To?1:-1),y=0;
y<f;
y++)this._ctx.arc(h*y+h/2+u,t,c,Math.PI+v,-1*v,p);
this._ctx.lineTo(i*s+(d?h:0),m),this._ctx.lineTo(0,m)}else{t=a===To?0:n*s;
for(var g=0;
g<f;
g++)this._ctx.arc(h*g+h/2+u,t,c,0,Math.PI,p)}this._ctx.fill()}},
{key:"_getSteps",value:function(){var t=Oe.width;
return t<768?5:t<992?6:t<1200?5:t<1440?6:t<1680?7:t<1920?8:9}},
{key:"_getAnimation",value:function(){if(!this.el.hasAttribute("data-scallop-animation"))return!1;
switch(this.