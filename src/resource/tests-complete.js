// Generated by Haxe 3.4.4
(function ($hx_exports, $global) { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var BrowserTestsCompleteReporter = $hx_exports["BrowserTestsCompleteReporter"] = function() {
};
BrowserTestsCompleteReporter.__name__ = true;
BrowserTestsCompleteReporter.main = function() {
};
BrowserTestsCompleteReporter.sendReport = function(onData,onError) {
	var httpRequest = new haxe_Http("http://localhost:2000");
	httpRequest.setHeader("munit-clientId","munit-tool-host");
	httpRequest.setHeader("munit-platformId","-");
	httpRequest.setParameter("data","COMPLETE");
	httpRequest.onData = onData;
	httpRequest.onError = onError;
	httpRequest.request(true);
};
BrowserTestsCompleteReporter.prototype = {
	__class__: BrowserTestsCompleteReporter
};
var EReg = function(r,opt) {
	this.r = new RegExp(r,opt.split("u").join(""));
};
EReg.__name__ = true;
EReg.prototype = {
	match: function(s) {
		if(this.r.global) {
			this.r.lastIndex = 0;
		}
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,__class__: EReg
};
var Lambda = function() { };
Lambda.__name__ = true;
Lambda.exists = function(it,f) {
	var x = it.iterator();
	while(x.hasNext()) {
		var x1 = x.next();
		if(f(x1)) {
			return true;
		}
	}
	return false;
};
Lambda.filter = function(it,f) {
	var l = new List();
	var x = it.iterator();
	while(x.hasNext()) {
		var x1 = x.next();
		if(f(x1)) {
			l.add(x1);
		}
	}
	return l;
};
var List = function() {
	this.length = 0;
};
List.__name__ = true;
List.prototype = {
	add: function(item) {
		var x = new _$List_ListNode(item,null);
		if(this.h == null) {
			this.h = x;
		} else {
			this.q.next = x;
		}
		this.q = x;
		this.length++;
	}
	,push: function(item) {
		var x = new _$List_ListNode(item,this.h);
		this.h = x;
		if(this.q == null) {
			this.q = x;
		}
		this.length++;
	}
	,iterator: function() {
		return new _$List_ListIterator(this.h);
	}
	,__class__: List
};
var _$List_ListNode = function(item,next) {
	this.item = item;
	this.next = next;
};
_$List_ListNode.__name__ = true;
_$List_ListNode.prototype = {
	__class__: _$List_ListNode
};
var _$List_ListIterator = function(head) {
	this.head = head;
};
_$List_ListIterator.__name__ = true;
_$List_ListIterator.prototype = {
	hasNext: function() {
		return this.head != null;
	}
	,next: function() {
		var val = this.head.item;
		this.head = this.head.next;
		return val;
	}
	,__class__: _$List_ListIterator
};
Math.__name__ = true;
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
var haxe_IMap = function() { };
haxe_IMap.__name__ = true;
var haxe_Http = function(url) {
	this.url = url;
	this.headers = new List();
	this.params = new List();
	this.async = true;
	this.withCredentials = false;
};
haxe_Http.__name__ = true;
haxe_Http.prototype = {
	setHeader: function(header,value) {
		this.headers = Lambda.filter(this.headers,function(h) {
			return h.header != header;
		});
		this.headers.push({ header : header, value : value});
		return this;
	}
	,setParameter: function(param,value) {
		this.params = Lambda.filter(this.params,function(p) {
			return p.param != param;
		});
		this.params.push({ param : param, value : value});
		return this;
	}
	,setPostData: function(data) {
		this.postData = data;
		return this;
	}
	,request: function(post) {
		var me = this;
		me.responseData = null;
		var r = this.req = js_Browser.createXMLHttpRequest();
		var onreadystatechange = function(_) {
			if(r.readyState != 4) {
				return;
			}
			var s;
			try {
				s = r.status;
			} catch( e ) {
				s = null;
			}
			if(s != null && "undefined" !== typeof window) {
				var protocol = window.location.protocol.toLowerCase();
				var rlocalProtocol = new EReg("^(?:about|app|app-storage|.+-extension|file|res|widget):$","");
				var isLocal = rlocalProtocol.match(protocol);
				if(isLocal) {
					if(r.responseText != null) {
						s = 200;
					} else {
						s = 404;
					}
				}
			}
			if(s == undefined) {
				s = null;
			}
			if(s != null) {
				me.onStatus(s);
			}
			if(s != null && s >= 200 && s < 400) {
				me.req = null;
				me.onData(me.responseData = r.responseText);
			} else if(s == null) {
				me.req = null;
				me.onError("Failed to connect or resolve host");
			} else {
				switch(s) {
				case 12007:
					me.req = null;
					me.onError("Unknown host");
					break;
				case 12029:
					me.req = null;
					me.onError("Failed to connect to host");
					break;
				default:
					me.req = null;
					me.responseData = r.responseText;
					me.onError("Http Error #" + r.status);
				}
			}
		};
		if(this.async) {
			r.onreadystatechange = onreadystatechange;
		}
		var uri = this.postData;
		if(uri != null) {
			post = true;
		} else {
			var _g_head = this.params.h;
			while(_g_head != null) {
				var val = _g_head.item;
				_g_head = _g_head.next;
				var p = val;
				if(uri == null) {
					uri = "";
				} else {
					uri += "&";
				}
				var s1 = p.param;
				var uri1 = encodeURIComponent(s1) + "=";
				var s2 = p.value;
				uri += uri1 + encodeURIComponent(s2);
			}
		}
		try {
			if(post) {
				r.open("POST",this.url,this.async);
			} else if(uri != null) {
				var question = this.url.split("?").length <= 1;
				r.open("GET",this.url + (question ? "?" : "&") + uri,this.async);
				uri = null;
			} else {
				r.open("GET",this.url,this.async);
			}
		} catch( e1 ) {
			if (e1 instanceof js__$Boot_HaxeError) e1 = e1.val;
			me.req = null;
			this.onError(e1.toString());
			return;
		}
		r.withCredentials = this.withCredentials;
		if(!Lambda.exists(this.headers,function(h) {
			return h.header == "Content-Type";
		}) && post && this.postData == null) {
			r.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		}
		var _g_head1 = this.headers.h;
		while(_g_head1 != null) {
			var val1 = _g_head1.item;
			_g_head1 = _g_head1.next;
			var h1 = val1;
			r.setRequestHeader(h1.header,h1.value);
		}
		r.send(uri);
		if(!this.async) {
			onreadystatechange(null);
		}
	}
	,onData: function(data) {
	}
	,onError: function(msg) {
	}
	,onStatus: function(status) {
	}
	,__class__: haxe_Http
};
var haxe_ds_StringMap = function() { };
haxe_ds_StringMap.__name__ = true;
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) {
		Error.captureStackTrace(this,js__$Boot_HaxeError);
	}
};
js__$Boot_HaxeError.__name__ = true;
js__$Boot_HaxeError.wrap = function(val) {
	if((val instanceof Error)) {
		return val;
	} else {
		return new js__$Boot_HaxeError(val);
	}
};
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	__class__: js__$Boot_HaxeError
});
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) {
		return Array;
	} else {
		var cl = o.__class__;
		if(cl != null) {
			return cl;
		}
		var name = js_Boot.__nativeClassName(o);
		if(name != null) {
			return js_Boot.__resolveNativeClass(name);
		}
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) {
		return "null";
	}
	if(s.length >= 5) {
		return "<...>";
	}
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) {
		t = "object";
	}
	switch(t) {
	case "function":
		return "<function>";
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) {
					return o[0];
				}
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) {
						str += "," + js_Boot.__string_rec(o[i],s);
					} else {
						str += js_Boot.__string_rec(o[i],s);
					}
				}
				return str + ")";
			}
			var l = o.length;
			var i1;
			var str1 = "[";
			s += "\t";
			var _g11 = 0;
			var _g2 = l;
			while(_g11 < _g2) {
				var i2 = _g11++;
				str1 += (i2 > 0 ? "," : "") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") {
				return s2;
			}
		}
		var k = null;
		var str2 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str2.length != 2) {
			str2 += ", \n";
		}
		str2 += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str2 += "\n" + s + "}";
		return str2;
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) {
		return false;
	}
	if(cc == cl) {
		return true;
	}
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) {
				return true;
			}
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) {
		return false;
	}
	switch(cl) {
	case Array:
		if((o instanceof Array)) {
			return o.__enum__ == null;
		} else {
			return false;
		}
		break;
	case Bool:
		return typeof(o) == "boolean";
	case Dynamic:
		return true;
	case Float:
		return typeof(o) == "number";
	case Int:
		if(typeof(o) == "number") {
			return (o|0) === o;
		} else {
			return false;
		}
		break;
	case String:
		return typeof(o) == "string";
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) {
					return true;
				}
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) {
					return true;
				}
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) {
					return true;
				}
			}
		} else {
			return false;
		}
		if(cl == Class ? o.__name__ != null : false) {
			return true;
		}
		if(cl == Enum ? o.__ename__ != null : false) {
			return true;
		}
		return o.__enum__ == cl;
	}
};
js_Boot.__cast = function(o,t) {
	if(js_Boot.__instanceof(o,t)) {
		return o;
	} else {
		throw new js__$Boot_HaxeError("Cannot cast " + Std.string(o) + " to " + Std.string(t));
	}
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") {
		return null;
	}
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return $global[name];
};
var js_Browser = function() { };
js_Browser.__name__ = true;
js_Browser.createXMLHttpRequest = function() {
	if(typeof XMLHttpRequest != "undefined") {
		return new XMLHttpRequest();
	}
	if(typeof ActiveXObject != "undefined") {
		return new ActiveXObject("Microsoft.XMLHTTP");
	}
	throw new js__$Boot_HaxeError("Unable to create XMLHttpRequest object.");
};
var massive_haxe_Exception = function(message,info) {
	this.message = message;
	this.info = info;
	this.type = massive_haxe_util_ReflectUtil.here({ fileName : "Exception.hx", lineNumber : 70, className : "massive.haxe.Exception", methodName : "new"}).className;
};
massive_haxe_Exception.__name__ = true;
massive_haxe_Exception.prototype = {
	toString: function() {
		var str = this.type + ": " + this.message;
		if(this.info != null) {
			str += " at " + this.info.className + "#" + this.info.methodName + " (" + this.info.lineNumber + ")";
		}
		return str;
	}
	,__class__: massive_haxe_Exception
};
var massive_haxe_util_ReflectUtil = function() { };
massive_haxe_util_ReflectUtil.__name__ = true;
massive_haxe_util_ReflectUtil.here = function(info) {
	return info;
};
var massive_munit_MUnitException = function(message,info) {
	massive_haxe_Exception.call(this,message,info);
	this.type = massive_haxe_util_ReflectUtil.here({ fileName : "MUnitException.hx", lineNumber : 52, className : "massive.munit.MUnitException", methodName : "new"}).className;
};
massive_munit_MUnitException.__name__ = true;
massive_munit_MUnitException.__super__ = massive_haxe_Exception;
massive_munit_MUnitException.prototype = $extend(massive_haxe_Exception.prototype,{
	__class__: massive_munit_MUnitException
});
var massive_munit_AssertionException = function(msg,info) {
	massive_munit_MUnitException.call(this,msg,info);
	this.type = massive_haxe_util_ReflectUtil.here({ fileName : "AssertionException.hx", lineNumber : 51, className : "massive.munit.AssertionException", methodName : "new"}).className;
};
massive_munit_AssertionException.__name__ = true;
massive_munit_AssertionException.__super__ = massive_munit_MUnitException;
massive_munit_AssertionException.prototype = $extend(massive_munit_MUnitException.prototype,{
	__class__: massive_munit_AssertionException
});
var massive_munit_ITestResultClient = function() { };
massive_munit_ITestResultClient.__name__ = true;
massive_munit_ITestResultClient.prototype = {
	__class__: massive_munit_ITestResultClient
};
var massive_munit_IAdvancedTestResultClient = function() { };
massive_munit_IAdvancedTestResultClient.__name__ = true;
massive_munit_IAdvancedTestResultClient.__interfaces__ = [massive_munit_ITestResultClient];
massive_munit_IAdvancedTestResultClient.prototype = {
	__class__: massive_munit_IAdvancedTestResultClient
};
var massive_munit_ICoverageTestResultClient = function() { };
massive_munit_ICoverageTestResultClient.__name__ = true;
massive_munit_ICoverageTestResultClient.__interfaces__ = [massive_munit_IAdvancedTestResultClient];
massive_munit_ICoverageTestResultClient.prototype = {
	__class__: massive_munit_ICoverageTestResultClient
};
var massive_munit_TestResult = function() {
	this.ignore = false;
	this.async = false;
	this.description = "";
	this.className = "";
	this.name = "";
	this.executionTime = 0.0;
	this.passed = false;
};
massive_munit_TestResult.__name__ = true;
massive_munit_TestResult.prototype = {
	get_location: function() {
		if(this.name == "" && this.className == "") {
			return "";
		} else {
			return this.className + "#" + this.name;
		}
	}
	,get_type: function() {
		if(this.error != null) {
			return "ERROR";
		}
		if(this.failure != null) {
			return "FAIL";
		}
		if(this.ignore) {
			return "IGNORE";
		}
		if(this.passed) {
			return "PASS";
		}
		return "UNKNOWN";
	}
	,__class__: massive_munit_TestResult
};
var massive_munit_client_HTTPClient = function(client,url,queueRequest) {
	if(queueRequest == null) {
		queueRequest = true;
	}
	if(url == null) {
		url = "http://localhost:2000";
	}
	this.id = "HTTPClient";
	this.client = client;
	this.url = url;
	this.queueRequest = queueRequest;
};
massive_munit_client_HTTPClient.__name__ = true;
massive_munit_client_HTTPClient.__interfaces__ = [massive_munit_IAdvancedTestResultClient];
massive_munit_client_HTTPClient.dispatchNextRequest = function() {
	if(massive_munit_client_HTTPClient.responsePending || massive_munit_client_HTTPClient.queue.length == 0) {
		return;
	}
	massive_munit_client_HTTPClient.responsePending = true;
	var request = massive_munit_client_HTTPClient.queue.pop();
	request.send();
};
massive_munit_client_HTTPClient.prototype = {
	get_completionHandler: function() {
		return this.completionHandler;
	}
	,set_completionHandler: function(value) {
		return this.completionHandler = value;
	}
	,setCurrentTestClass: function(className) {
		if(js_Boot.__instanceof(this.client,massive_munit_IAdvancedTestResultClient)) {
			(js_Boot.__cast(this.client , massive_munit_IAdvancedTestResultClient)).setCurrentTestClass(className);
		}
	}
	,addPass: function(result) {
		this.client.addPass(result);
	}
	,addFail: function(result) {
		this.client.addFail(result);
	}
	,addError: function(result) {
		this.client.addError(result);
	}
	,addIgnore: function(result) {
		this.client.addIgnore(result);
	}
	,reportFinalStatistics: function(testCount,passCount,failCount,errorCount,ignoreCount,time) {
		var result = this.client.reportFinalStatistics(testCount,passCount,failCount,errorCount,ignoreCount,time);
		this.sendResult(result);
		return result;
	}
	,sendResult: function(result) {
		this.request = new massive_munit_client_URLRequest(this.url);
		this.request.setHeader("munit-clientId",this.client.id);
		this.request.setHeader("munit-platformId",this.platform());
		this.request.onData = $bind(this,this.onData);
		this.request.onError = $bind(this,this.onError);
		this.request.data = result;
		if(this.queueRequest) {
			massive_munit_client_HTTPClient.queue.unshift(this.request);
			massive_munit_client_HTTPClient.dispatchNextRequest();
		} else {
			this.request.send();
		}
	}
	,platform: function() {
		return "js";
	}
	,onData: function(data) {
		if(this.queueRequest) {
			massive_munit_client_HTTPClient.responsePending = false;
			massive_munit_client_HTTPClient.dispatchNextRequest();
		}
		if(this.get_completionHandler() != null) {
			(this.get_completionHandler())(this);
		}
	}
	,onError: function(msg) {
		if(this.queueRequest) {
			massive_munit_client_HTTPClient.responsePending = false;
			massive_munit_client_HTTPClient.dispatchNextRequest();
		}
		if(this.get_completionHandler() != null) {
			(this.get_completionHandler())(this);
		}
	}
	,__class__: massive_munit_client_HTTPClient
};
var massive_munit_client_URLRequest = function(url) {
	this.url = url;
	this.createClient(url);
	this.setHeader("Content-Type","text/plain");
};
massive_munit_client_URLRequest.__name__ = true;
massive_munit_client_URLRequest.prototype = {
	createClient: function(url) {
		this.client = new haxe_Http(url);
	}
	,setHeader: function(name,value) {
		this.client.setHeader(name,value);
	}
	,send: function() {
		var body = Std.string(this.data);
		this.client.onData = this.onData;
		this.client.onError = this.onError;
		this.client.setPostData(body);
		this.client.request(true);
	}
	,__class__: massive_munit_client_URLRequest
};
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
String.prototype.__class__ = String;
String.__name__ = true;
Array.__name__ = true;
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
var __map_reserved = {};
BrowserTestsCompleteReporter.CLIENT_RUNNER_HOST = "munit-tool-host";
js_Boot.__toStr = ({ }).toString;
massive_munit_client_HTTPClient.queue = [];
massive_munit_client_HTTPClient.responsePending = false;
BrowserTestsCompleteReporter.main();
})(typeof exports != "undefined" ? exports : typeof window != "undefined" ? window : typeof self != "undefined" ? self : this, typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
