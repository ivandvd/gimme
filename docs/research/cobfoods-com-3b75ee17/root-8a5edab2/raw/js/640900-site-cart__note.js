art"),this.el.setAttribute("aria-hidden",!0),this.el.classList.remove("--js-anim-playing"))}},
{key:"_onError",value:function(t){var e=this;
this.cartErrorElement.innerHTML=null,t.json().then(function(t){t.description&&(e.cartErrorElement.innerHTML="<p><strong>".concat(t.message," :</strong> ").concat(t.description,"</p>"))})}},
{key:"opened",get:function(){return this._opened}}]),t}(),_l=function(){function t(e,i){dl(this,t),this.el=e,this.emitter=i,this._saveNote=this._saveNote.bind(this),this._onNoteBlur=this._onNoteBlur.bind(this),this.init()}return ml(t,[
{key:"init",value:function(){this.note=(0,I.$)(".site-cart__note",this.el),this.btnSave=(0,I.$)(".site-cart__noteBtn",this.el),this._bindEvents()}},
{key:"destroy",value:function(){this._unbindEvents(),this.el=null,this.emitter=null,this.note=null,this.btnSave=null,this._saveNote=null}},
{key:"_bindEvents",value:function(){this.btnSave&&O(this.btnSave,"click",this._sav