&&o[1]<r[3])){s.label=o[1];
break}if(6===o[0]&&s.label<r[1]){s.label=r[1],r=o;
break}if(r&&s.label<r[2]){s.label=r[2],s.ops.push(o);
break}r[2]&&s.ops.pop(),s.trys.pop();
continue}o=e.call(t,s)}catch(t){o=[6,t],n=0}finally{i=r=0}if(5&o[0])throw o[1];
return{value:o[0]?o[1]:void 0,done:!0}}([o,l])}}}var gr="api-form",_r="--submitting",br="--validation-reported",wr="--success",Sr="--error",Er=function(){function t(e,i){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.el=e,this.emitter=i,this.form=(0,I.$)("form",this.el),this.responseData=null,this.messageElement=(0,I.$)(".".concat(gr,"__message"),this.el),this.errorElement=(0,I.$)(".".concat(gr,"__error"),this.el),this.btn=(0,I.$)(".".concat(gr,"__submit"),this.el),this.optinInput=(0,I.$)('input[name="accept_marketing"]',this.form),this.message=this.messageElement?this.messageElement.dataset.message:null,this.errorMessage=this.errorElement?this.errorElement.dataset.message:null,this._waiting=!1,this._timer=null,this._topic=null,this._onSubmit=this._onSubmit.bind(this),this._onSubmitSuccess=this._onSubmitSuccess.bind(this),this._onSubmitError=this._onSubmitError.bind(this),this._subscribe=this._subscribe.bind(this),this._onReset=this._onReset.bind(this),this._send=this._send.bind(this),this._removeOutputMessage=this._removeOutputMessage.bind(this)}var e,i,n;
return e=t,i=[
{key:"name",get:function(){return"APIForm"}},
{key:"start",value:function(){this._bindEvents()}},
{key:"stop",value:function(){this._unbindEvents()}},
{key:"destroy",value:function(){this.form=null}},
{key:"_bindEvents",value:function(){O(this.form,"submit",this._onSubmit)}},
{key:"_unbindEvents",value:function(){B(this.form,"submit",this._onSubmit)}},
{key:"_onSubmitSuccess",value:function(t){var e=t.success,i=t.error;
e&&(this.form.classList.remove(Sr),this.form.classList.remove(br),this.form.classList.add(wr),this.form.reset(),this._showSuccessMessage()),i&&(this.form.classList.add(Sr),this._showErrorMessage()),this.form.classList.remove(_r),this.btn&&this.btn.removeAttribute("disabled"),this._waiting=!1}},
{key:"_onSubmitError",value:function(){this._showErrorMessage(),this.form.classList.add(Sr),this.form.classList.remove(br),this.form.classList.remove(_r),this.btn&&this.btn.removeAttribute("disabled"),this._waiting=!1}},
{key:"_showSuccessMessage",value:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];
this.messageElement&&(this.messageElement.innerHTML=this.message,t&&(this._timer=setTimeout(this._removeOutputMessage,5e3)),this.emitter.emit("SiteScroll.update"),this.emitter.emit("SiteScroll.scrollTo",this.el),this.emitter.emit("DataLayer.form_submit",this._topic))}},
{key:"_showErrorMessage",value:function(){this.errorElement&&(this.errorElement.innerHTML=this.errorMessage)}},
{key:"_removeOutputMessage",value:function(){this._timer&&clearTimeout(this._timer),this._timer=null,this._topic=null,this.form&&this.form.classList.remove(wr),this.messageElement&&(this.messageElement.innerHTML="")}},
{key:"_onReset",value:function(){}},
{key:"_onSubmit",value:function(t){return t&&t.preventDefault(),this.form.classList.contains(wr)||this.form.classList.remove(wr),this.form.classList.contains(wr)||this.form.classList.remove(wr),this.form.classList.contains(br)||this.form.classList.add(br),!(this.form.reportValidity&&!this.form.reportValidity())&&!0!==this._waiting&&(this._waiting=!0,this._timer&&clearTimeout(this._timer),this._timer=null,this.btn&&this.btn.setAttribute("disabled",!0),this.messageElement&&(this.messageElement.innerHTML=""),this.errorElement&&(this.errorElement.innerHTML=""),void this._send())}},
{key:"_send",value:function(){var t;
if(this._waiting=!0,this.form.classList.add(_r),this._topic=null===(t=this.el.dataset)||void 0===t?void 0:t.formTopic,this._topic){var e=hr()(this.form);
fetch("https://cob-api.mill3.dev/api/email/",{method:"POST",headers:{"x-email-topic":"contact","Content-Type":"application/x-www-form-urlencoded;
charset=UTF-8"},body:e}).then(function(t){return t.json()}).then(this._subscribe(e)).then(this._onSubmitSuccess).catch(this._onSubmitError)}}},
{key:"_subscribe",value:function(){return(t=function(){var t,e,i,n,r,s,a;
return yr(this,function(o){switch(o.label){case 0:return this.optinInput&&!this.optinInput.checked?[2]:(t=new FormData(this.form),e=t.get("email"),i=t.get("firstname"),n=t.get("lastname"),r=t.get("listid"),(s=new FormData).append("email",e),s.append("first_name",i),s.append("last_name",n),s.append("listid",r||"YburhJ"),a=new URLSearchParams(s).toString(),[4,fetch("https://cob-api.mill3.dev/api/newsletter/",{method:"POST",headers:{"x-email-topic":"newsletter","Content-Type":"application/x-www-form-urlencoded;
charset=UTF-8"},body:a}).then(function(t){return t.json()}).then(function(){return!0})]);
case 1:return o.sent(),[2]}})},function(){var e=this,i=arguments;
return new Promise(function(