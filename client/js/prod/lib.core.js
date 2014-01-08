"undefined"!=typeof jQuery&&!function($){var c_init=!1,Class=function(){};Class.extend=function(members){function Class(){c_init||(this._init&&this._init.apply(this,arguments),this._c&&this._c.apply(this,arguments))}var _super=this.prototype;c_init=!0;var proto=new this;c_init=!1;var val,name;for(name in proto)$.isPlainObject(proto[name])&&(val=$.extend({},proto[name]),proto[name]=val);var make_handler=function(nm,fn){return function(){var tmp=this._super;this._super=_super[nm];var ret=fn.apply(this,arguments);return this._super=tmp,ret}};for(name in members)"function"==typeof members[name]&&"function"==typeof _super[name]?proto[name]=make_handler(name,members[name]):(val=members[name],$.isPlainObject(members[name])&&(val=$.extend({},members[name])),proto[name]=val);return Class.prototype=proto,Class.prototype.constructor=Class,Class.extend=this.extend,Class};var Base={base:!1,_parent:null,prefix:"slb",_init:function(){this._set_parent()},_set_parent:function(p){"undefined"!=typeof p&&(this._parent=p),this.util._parent=this},attach:function(member,data,simple){if(simple=void 0===typeof simple?!1:!!simple,"string"===$.type(member)&&$.isPlainObject(data)){var obj={};if(simple)obj[member]=$.extend({},data),$.extend(this,obj);else{data._parent=this;var C=this.Class.extend(data);this[member]=new C}}},get_parent:function(){return this._parent},util:{_base:null,_parent:null,string:"string",bool:"boolean",array:"array",obj:"object",func:"function",num:"number",get_base:function(){if(!this._base){for(var p=this.get_parent(),p_last=null;!p.base&&p_last!==p&&p._parent;)p_last=p,p=p._parent;this._base=p}return this._base},get_parent:function(){return this._parent},get_sep:function(sep){return this.is_string(sep,!1)?sep:"_"},get_prefix:function(){return this.is_string(this.get_parent().prefix)?this.get_parent().prefix:""},has_prefix:function(val,sep){return this.is_string(val)&&0===val.indexOf(this.get_prefix()+this.get_sep(sep))},add_prefix:function(val,sep,once){return this.is_string(val)?(sep=this.get_sep(sep),this.is_bool(once)||(once=!0),once&&this.has_prefix(val,sep)?val:[this.get_prefix(),val].join(sep)):this.get_prefix()},remove_prefix:function(val,sep,once){if(!this.is_string(val,!0))return val;if(sep=this.get_sep(sep),this.is_bool(once)||(once=!0),this.has_prefix(val,sep)){var prfx=this.get_prefix()+sep;do val=val.substr(prfx.length);while(!once&&this.has_prefix(val,sep))}return val},get_attribute:function(val){var sep="-",top="data",pre=[top,this.get_prefix()].join(sep);return this.is_string(val,!1)?(-1===val.indexOf(pre+sep)&&(val=[pre,val].join(sep)),val):pre},get_context:function(){var b=this.get_base();return $.isArray(b.context)||(b.context=[]),b.context},is_context:function(ctx){var ret=!1;return"string"==typeof ctx&&(ctx=[ctx]),$.isArray(ctx)&&this.arr_intersect(this.get_context(),ctx).length&&(ret=!0),ret},is_set:function(value){return"undefined"!==$.type(value)?!0:!1},is_type:function(value,type,nonempty){var ret=!1;if(this.is_set(value)&&null!==value&&this.is_set(type))switch($.type(type)){case this.func:ret=value instanceof type?!0:!1;break;case this.string:ret=$.type(value)===type?!0:!1;break;default:ret=!1}return ret&&($.type(nonempty)!==this.bool||nonempty)&&(ret=!this.is_empty(value)),ret},is_string:function(value,nonempty){return this.is_type(value,this.string,nonempty)},is_array:function(value,nonempty){return this.is_type(value,this.array,nonempty)},is_bool:function(value){return this.is_type(value,this.bool,!1)},is_obj:function(value,nonempty){return this.is_type(value,this.obj,nonempty)},is_func:function(value){return this.is_type(value,this.func,!1)},is_method:function(obj,value){var ret=!1;if(this.is_string(value)&&(value=[value]),this.in_obj(obj,value)){var t=this;$.each(value,function(idx,val){return ret=t.is_func(obj[val])?!0:!1})}return ret},is_num:function(value,nonempty){return this.is_type(value,this.num,nonempty)&&!isNaN(value)},is_int:function(value,nonempty){return this.is_num(value,nonempty)&&Math.floor(value)===value},is_scalar:function(value,nonempty){return this.is_num(value,nonempty)||this.is_string(value,nonempty)||this.is_bool(value,nonempty)},is_empty:function(value,type){var ret=!1;if(this.is_set(value)&&null!==value&&!1!==value)if(this.is_set(type)||(type=$.type(value)),this.is_type(value,type,!1))switch(type){case this.string:case this.array:0===value.length&&(ret=!0);break;case this.obj:ret=$.isPlainObject(value)&&!$.map(value,function(v,key){return key}).length;break;case this.num:ret=0===value}else ret=!0;else ret=!0;return ret},is_promise:function(obj){return this.is_obj(obj)&&this.is_method(obj,["then","done","always","fail","pipe"])},is_deferred:function(obj){return this.is_promise(obj)&&this.is_method(obj,["resolve","reject","promise"])},validate:function(val,def){return this.is_type(val,def,!0)?val:def},format:function(fmt,val){if(!this.is_string(fmt))return"";var params=[],ph="%s";if(arguments.length<2||-1===fmt.indexOf(ph))return fmt;if(params=Array.prototype.slice.call(arguments,1),val=null,1===params.length)fmt=fmt.replace(ph,params[0].toString());else{for(var idx=0,len=params.length,pos=0;(pos=fmt.indexOf(ph))&&len>idx;)fmt=fmt.substr(0,pos)+params[idx].toString()+fmt.substr(pos+ph.length),idx++;fmt=fmt.replace(ph,"")}return fmt},in_obj:function(obj,key,all){this.is_bool(all)||(all=!0),this.is_string(key)&&(key=[key]);var ret=!1;if(this.is_obj(obj)&&this.is_array(key))for(var val,x=0;x<key.length&&(val=key[x],ret=this.is_string(val)&&val in obj?!0:!1,!(!all&&ret||all&&!ret));x++);return ret},arr_intersect:function(arr1,arr2){var ret=[];if(arr1===arr2)return arr2;if(!$.isArray(arr2)||!arr2.length||!arr1.length)return ret;var a1,a2,val;arr1.length<arr2.length?(a1=arr1,a2=arr2):(a1=arr2,a2=arr1);for(var x=0;x<a1.length;x++)val=a1[x],-1!==a2.indexOf(val)&&-1===ret.indexOf(val)&&ret.push(val);return ret}}},SLB_Base=Class.extend(Base),Core={base:!0,context:[],Class:SLB_Base,setup_client:function(){$("html").addClass(this.util.get_prefix())}},SLB_Core=SLB_Base.extend(Core);this.SLB=new SLB_Core,this.SLB.setup_client()}(jQuery);