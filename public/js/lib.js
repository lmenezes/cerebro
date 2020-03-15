/*! jQuery v2.2.4 | (c) jQuery Foundation | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=a.document,e=c.slice,f=c.concat,g=c.push,h=c.indexOf,i={},j=i.toString,k=i.hasOwnProperty,l={},m="2.2.4",n=function(a,b){return new n.fn.init(a,b)},o=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,p=/^-ms-/,q=/-([\da-z])/gi,r=function(a,b){return b.toUpperCase()};n.fn=n.prototype={jquery:m,constructor:n,selector:"",length:0,toArray:function(){return e.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:e.call(this)},pushStack:function(a){var b=n.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a){return n.each(this,a)},map:function(a){return this.pushStack(n.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(e.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor()},push:g,sort:c.sort,splice:c.splice},n.extend=n.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||n.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(a=arguments[h]))for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&(n.isPlainObject(d)||(e=n.isArray(d)))?(e?(e=!1,f=c&&n.isArray(c)?c:[]):f=c&&n.isPlainObject(c)?c:{},g[b]=n.extend(j,f,d)):void 0!==d&&(g[b]=d));return g},n.extend({expando:"jQuery"+(m+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===n.type(a)},isArray:Array.isArray,isWindow:function(a){return null!=a&&a===a.window},isNumeric:function(a){var b=a&&a.toString();return!n.isArray(a)&&b-parseFloat(b)+1>=0},isPlainObject:function(a){var b;if("object"!==n.type(a)||a.nodeType||n.isWindow(a))return!1;if(a.constructor&&!k.call(a,"constructor")&&!k.call(a.constructor.prototype||{},"isPrototypeOf"))return!1;for(b in a);return void 0===b||k.call(a,b)},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?i[j.call(a)]||"object":typeof a},globalEval:function(a){var b,c=eval;a=n.trim(a),a&&(1===a.indexOf("use strict")?(b=d.createElement("script"),b.text=a,d.head.appendChild(b).parentNode.removeChild(b)):c(a))},camelCase:function(a){return a.replace(p,"ms-").replace(q,r)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b){var c,d=0;if(s(a)){for(c=a.length;c>d;d++)if(b.call(a[d],d,a[d])===!1)break}else for(d in a)if(b.call(a[d],d,a[d])===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(o,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(s(Object(a))?n.merge(c,"string"==typeof a?[a]:a):g.call(c,a)),c},inArray:function(a,b,c){return null==b?-1:h.call(b,a,c)},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;c>d;d++)a[e++]=b[d];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,e,g=0,h=[];if(s(a))for(d=a.length;d>g;g++)e=b(a[g],g,c),null!=e&&h.push(e);else for(g in a)e=b(a[g],g,c),null!=e&&h.push(e);return f.apply([],h)},guid:1,proxy:function(a,b){var c,d,f;return"string"==typeof b&&(c=a[b],b=a,a=c),n.isFunction(a)?(d=e.call(arguments,2),f=function(){return a.apply(b||this,d.concat(e.call(arguments)))},f.guid=a.guid=a.guid||n.guid++,f):void 0},now:Date.now,support:l}),"function"==typeof Symbol&&(n.fn[Symbol.iterator]=c[Symbol.iterator]),n.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(a,b){i["[object "+b+"]"]=b.toLowerCase()});function s(a){var b=!!a&&"length"in a&&a.length,c=n.type(a);return"function"===c||n.isWindow(a)?!1:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var t=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+1*new Date,v=a.document,w=0,x=0,y=ga(),z=ga(),A=ga(),B=function(a,b){return a===b&&(l=!0),0},C=1<<31,D={}.hasOwnProperty,E=[],F=E.pop,G=E.push,H=E.push,I=E.slice,J=function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},K="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",L="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",N="\\["+L+"*("+M+")(?:"+L+"*([*^$|!~]?=)"+L+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+M+"))|)"+L+"*\\]",O=":("+M+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+N+")*)|.*)\\)|)",P=new RegExp(L+"+","g"),Q=new RegExp("^"+L+"+|((?:^|[^\\\\])(?:\\\\.)*)"+L+"+$","g"),R=new RegExp("^"+L+"*,"+L+"*"),S=new RegExp("^"+L+"*([>+~]|"+L+")"+L+"*"),T=new RegExp("="+L+"*([^\\]'\"]*?)"+L+"*\\]","g"),U=new RegExp(O),V=new RegExp("^"+M+"$"),W={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),TAG:new RegExp("^("+M+"|[*])"),ATTR:new RegExp("^"+N),PSEUDO:new RegExp("^"+O),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+L+"*(even|odd|(([+-]|)(\\d*)n|)"+L+"*(?:([+-]|)"+L+"*(\\d+)|))"+L+"*\\)|)","i"),bool:new RegExp("^(?:"+K+")$","i"),needsContext:new RegExp("^"+L+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+L+"*((?:-\\d)?\\d*)"+L+"*\\)|)(?=[^-]|$)","i")},X=/^(?:input|select|textarea|button)$/i,Y=/^h\d$/i,Z=/^[^{]+\{\s*\[native \w/,$=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,_=/[+~]/,aa=/'|\\/g,ba=new RegExp("\\\\([\\da-f]{1,6}"+L+"?|("+L+")|.)","ig"),ca=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},da=function(){m()};try{H.apply(E=I.call(v.childNodes),v.childNodes),E[v.childNodes.length].nodeType}catch(ea){H={apply:E.length?function(a,b){G.apply(a,I.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function fa(a,b,d,e){var f,h,j,k,l,o,r,s,w=b&&b.ownerDocument,x=b?b.nodeType:9;if(d=d||[],"string"!=typeof a||!a||1!==x&&9!==x&&11!==x)return d;if(!e&&((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,p)){if(11!==x&&(o=$.exec(a)))if(f=o[1]){if(9===x){if(!(j=b.getElementById(f)))return d;if(j.id===f)return d.push(j),d}else if(w&&(j=w.getElementById(f))&&t(b,j)&&j.id===f)return d.push(j),d}else{if(o[2])return H.apply(d,b.getElementsByTagName(a)),d;if((f=o[3])&&c.getElementsByClassName&&b.getElementsByClassName)return H.apply(d,b.getElementsByClassName(f)),d}if(c.qsa&&!A[a+" "]&&(!q||!q.test(a))){if(1!==x)w=b,s=a;else if("object"!==b.nodeName.toLowerCase()){(k=b.getAttribute("id"))?k=k.replace(aa,"\\$&"):b.setAttribute("id",k=u),r=g(a),h=r.length,l=V.test(k)?"#"+k:"[id='"+k+"']";while(h--)r[h]=l+" "+qa(r[h]);s=r.join(","),w=_.test(a)&&oa(b.parentNode)||b}if(s)try{return H.apply(d,w.querySelectorAll(s)),d}catch(y){}finally{k===u&&b.removeAttribute("id")}}}return i(a.replace(Q,"$1"),b,d,e)}function ga(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ha(a){return a[u]=!0,a}function ia(a){var b=n.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function ja(a,b){var c=a.split("|"),e=c.length;while(e--)d.attrHandle[c[e]]=b}function ka(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||C)-(~a.sourceIndex||C);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function la(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function ma(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function na(a){return ha(function(b){return b=+b,ha(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function oa(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}c=fa.support={},f=fa.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},m=fa.setDocument=function(a){var b,e,g=a?a.ownerDocument||a:v;return g!==n&&9===g.nodeType&&g.documentElement?(n=g,o=n.documentElement,p=!f(n),(e=n.defaultView)&&e.top!==e&&(e.addEventListener?e.addEventListener("unload",da,!1):e.attachEvent&&e.attachEvent("onunload",da)),c.attributes=ia(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ia(function(a){return a.appendChild(n.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=Z.test(n.getElementsByClassName),c.getById=ia(function(a){return o.appendChild(a).id=u,!n.getElementsByName||!n.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c=b.getElementById(a);return c?[c]:[]}},d.filter.ID=function(a){var b=a.replace(ba,ca);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(ba,ca);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return"undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):c.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return"undefined"!=typeof b.getElementsByClassName&&p?b.getElementsByClassName(a):void 0},r=[],q=[],(c.qsa=Z.test(n.querySelectorAll))&&(ia(function(a){o.appendChild(a).innerHTML="<a id='"+u+"'></a><select id='"+u+"-\r\\' msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&q.push("[*^$]="+L+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+L+"*(?:value|"+K+")"),a.querySelectorAll("[id~="+u+"-]").length||q.push("~="),a.querySelectorAll(":checked").length||q.push(":checked"),a.querySelectorAll("a#"+u+"+*").length||q.push(".#.+[+~]")}),ia(function(a){var b=n.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+L+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=Z.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ia(function(a){c.disconnectedMatch=s.call(a,"div"),s.call(a,"[s!='']:x"),r.push("!=",O)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=Z.test(o.compareDocumentPosition),t=b||Z.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===n||a.ownerDocument===v&&t(v,a)?-1:b===n||b.ownerDocument===v&&t(v,b)?1:k?J(k,a)-J(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,e=a.parentNode,f=b.parentNode,g=[a],h=[b];if(!e||!f)return a===n?-1:b===n?1:e?-1:f?1:k?J(k,a)-J(k,b):0;if(e===f)return ka(a,b);c=a;while(c=c.parentNode)g.unshift(c);c=b;while(c=c.parentNode)h.unshift(c);while(g[d]===h[d])d++;return d?ka(g[d],h[d]):g[d]===v?-1:h[d]===v?1:0},n):n},fa.matches=function(a,b){return fa(a,null,null,b)},fa.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(T,"='$1']"),c.matchesSelector&&p&&!A[b+" "]&&(!r||!r.test(b))&&(!q||!q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return fa(b,n,null,[a]).length>0},fa.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},fa.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&D.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},fa.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},fa.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=fa.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=fa.selectors={cacheLength:50,createPseudo:ha,match:W,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(ba,ca),a[3]=(a[3]||a[4]||a[5]||"").replace(ba,ca),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||fa.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&fa.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return W.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&U.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(ba,ca).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+L+")"+a+"("+L+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=fa.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e.replace(P," ")+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h,t=!1;if(q){if(f){while(p){m=b;while(m=m[p])if(h?m.nodeName.toLowerCase()===r:1===m.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){m=q,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n&&j[2],m=n&&q.childNodes[n];while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if(1===m.nodeType&&++t&&m===b){k[a]=[w,n,t];break}}else if(s&&(m=b,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n),t===!1)while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if((h?m.nodeName.toLowerCase()===r:1===m.nodeType)&&++t&&(s&&(l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),k[a]=[w,t]),m===b))break;return t-=e,t===d||t%d===0&&t/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||fa.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?ha(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=J(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:ha(function(a){var b=[],c=[],d=h(a.replace(Q,"$1"));return d[u]?ha(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),b[0]=null,!c.pop()}}),has:ha(function(a){return function(b){return fa(a,b).length>0}}),contains:ha(function(a){return a=a.replace(ba,ca),function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:ha(function(a){return V.test(a||"")||fa.error("unsupported lang: "+a),a=a.replace(ba,ca).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return Y.test(a.nodeName)},input:function(a){return X.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:na(function(){return[0]}),last:na(function(a,b){return[b-1]}),eq:na(function(a,b,c){return[0>c?c+b:c]}),even:na(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:na(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:na(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:na(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=la(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=ma(b);function pa(){}pa.prototype=d.filters=d.pseudos,d.setFilters=new pa,g=fa.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){c&&!(e=R.exec(h))||(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=S.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(Q," ")}),h=h.slice(c.length));for(g in d.filter)!(e=W[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?fa.error(a):z(a,i).slice(0)};function qa(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function ra(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=x++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j,k=[w,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(j=b[u]||(b[u]={}),i=j[b.uniqueID]||(j[b.uniqueID]={}),(h=i[d])&&h[0]===w&&h[1]===f)return k[2]=h[2];if(i[d]=k,k[2]=a(b,c,g))return!0}}}function sa(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function ta(a,b,c){for(var d=0,e=b.length;e>d;d++)fa(a,b[d],c);return c}function ua(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(c&&!c(f,d,e)||(g.push(f),j&&b.push(h)));return g}function va(a,b,c,d,e,f){return d&&!d[u]&&(d=va(d)),e&&!e[u]&&(e=va(e,f)),ha(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||ta(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:ua(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=ua(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?J(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=ua(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):H.apply(g,r)})}function wa(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=ra(function(a){return a===b},h,!0),l=ra(function(a){return J(b,a)>-1},h,!0),m=[function(a,c,d){var e=!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d));return b=null,e}];f>i;i++)if(c=d.relative[a[i].type])m=[ra(sa(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;f>e;e++)if(d.relative[a[e].type])break;return va(i>1&&sa(m),i>1&&qa(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(Q,"$1"),c,e>i&&wa(a.slice(i,e)),f>e&&wa(a=a.slice(e)),f>e&&qa(a))}m.push(c)}return sa(m)}function xa(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,o,q,r=0,s="0",t=f&&[],u=[],v=j,x=f||e&&d.find.TAG("*",k),y=w+=null==v?1:Math.random()||.1,z=x.length;for(k&&(j=g===n||g||k);s!==z&&null!=(l=x[s]);s++){if(e&&l){o=0,g||l.ownerDocument===n||(m(l),h=!p);while(q=a[o++])if(q(l,g||n,h)){i.push(l);break}k&&(w=y)}c&&((l=!q&&l)&&r--,f&&t.push(l))}if(r+=s,c&&s!==r){o=0;while(q=b[o++])q(t,u,g,h);if(f){if(r>0)while(s--)t[s]||u[s]||(u[s]=F.call(i));u=ua(u)}H.apply(i,u),k&&!f&&u.length>0&&r+b.length>1&&fa.uniqueSort(i)}return k&&(w=y,j=v),t};return c?ha(f):f}return h=fa.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=wa(b[c]),f[u]?d.push(f):e.push(f);f=A(a,xa(e,d)),f.selector=a}return f},i=fa.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(ba,ca),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=W.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(ba,ca),_.test(j[0].type)&&oa(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&qa(j),!a)return H.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,!b||_.test(a)&&oa(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ia(function(a){return 1&a.compareDocumentPosition(n.createElement("div"))}),ia(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||ja("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ia(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||ja("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),ia(function(a){return null==a.getAttribute("disabled")})||ja(K,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),fa}(a);n.find=t,n.expr=t.selectors,n.expr[":"]=n.expr.pseudos,n.uniqueSort=n.unique=t.uniqueSort,n.text=t.getText,n.isXMLDoc=t.isXML,n.contains=t.contains;var u=function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&n(a).is(c))break;d.push(a)}return d},v=function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c},w=n.expr.match.needsContext,x=/^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,y=/^.[^:#\[\.,]*$/;function z(a,b,c){if(n.isFunction(b))return n.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return n.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(y.test(b))return n.filter(b,a,c);b=n.filter(b,a)}return n.grep(a,function(a){return h.call(b,a)>-1!==c})}n.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?n.find.matchesSelector(d,a)?[d]:[]:n.find.matches(a,n.grep(b,function(a){return 1===a.nodeType}))},n.fn.extend({find:function(a){var b,c=this.length,d=[],e=this;if("string"!=typeof a)return this.pushStack(n(a).filter(function(){for(b=0;c>b;b++)if(n.contains(e[b],this))return!0}));for(b=0;c>b;b++)n.find(a,e[b],d);return d=this.pushStack(c>1?n.unique(d):d),d.selector=this.selector?this.selector+" "+a:a,d},filter:function(a){return this.pushStack(z(this,a||[],!1))},not:function(a){return this.pushStack(z(this,a||[],!0))},is:function(a){return!!z(this,"string"==typeof a&&w.test(a)?n(a):a||[],!1).length}});var A,B=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,C=n.fn.init=function(a,b,c){var e,f;if(!a)return this;if(c=c||A,"string"==typeof a){if(e="<"===a[0]&&">"===a[a.length-1]&&a.length>=3?[null,a,null]:B.exec(a),!e||!e[1]&&b)return!b||b.jquery?(b||c).find(a):this.constructor(b).find(a);if(e[1]){if(b=b instanceof n?b[0]:b,n.merge(this,n.parseHTML(e[1],b&&b.nodeType?b.ownerDocument||b:d,!0)),x.test(e[1])&&n.isPlainObject(b))for(e in b)n.isFunction(this[e])?this[e](b[e]):this.attr(e,b[e]);return this}return f=d.getElementById(e[2]),f&&f.parentNode&&(this.length=1,this[0]=f),this.context=d,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):n.isFunction(a)?void 0!==c.ready?c.ready(a):a(n):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),n.makeArray(a,this))};C.prototype=n.fn,A=n(d);var D=/^(?:parents|prev(?:Until|All))/,E={children:!0,contents:!0,next:!0,prev:!0};n.fn.extend({has:function(a){var b=n(a,this),c=b.length;return this.filter(function(){for(var a=0;c>a;a++)if(n.contains(this,b[a]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=w.test(a)||"string"!=typeof a?n(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&n.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?n.uniqueSort(f):f)},index:function(a){return a?"string"==typeof a?h.call(n(a),this[0]):h.call(this,a.jquery?a[0]:a):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(n.uniqueSort(n.merge(this.get(),n(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function F(a,b){while((a=a[b])&&1!==a.nodeType);return a}n.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return u(a,"parentNode")},parentsUntil:function(a,b,c){return u(a,"parentNode",c)},next:function(a){return F(a,"nextSibling")},prev:function(a){return F(a,"previousSibling")},nextAll:function(a){return u(a,"nextSibling")},prevAll:function(a){return u(a,"previousSibling")},nextUntil:function(a,b,c){return u(a,"nextSibling",c)},prevUntil:function(a,b,c){return u(a,"previousSibling",c)},siblings:function(a){return v((a.parentNode||{}).firstChild,a)},children:function(a){return v(a.firstChild)},contents:function(a){return a.contentDocument||n.merge([],a.childNodes)}},function(a,b){n.fn[a]=function(c,d){var e=n.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=n.filter(d,e)),this.length>1&&(E[a]||n.uniqueSort(e),D.test(a)&&e.reverse()),this.pushStack(e)}});var G=/\S+/g;function H(a){var b={};return n.each(a.match(G)||[],function(a,c){b[c]=!0}),b}n.Callbacks=function(a){a="string"==typeof a?H(a):n.extend({},a);var b,c,d,e,f=[],g=[],h=-1,i=function(){for(e=a.once,d=b=!0;g.length;h=-1){c=g.shift();while(++h<f.length)f[h].apply(c[0],c[1])===!1&&a.stopOnFalse&&(h=f.length,c=!1)}a.memory||(c=!1),b=!1,e&&(f=c?[]:"")},j={add:function(){return f&&(c&&!b&&(h=f.length-1,g.push(c)),function d(b){n.each(b,function(b,c){n.isFunction(c)?a.unique&&j.has(c)||f.push(c):c&&c.length&&"string"!==n.type(c)&&d(c)})}(arguments),c&&!b&&i()),this},remove:function(){return n.each(arguments,function(a,b){var c;while((c=n.inArray(b,f,c))>-1)f.splice(c,1),h>=c&&h--}),this},has:function(a){return a?n.inArray(a,f)>-1:f.length>0},empty:function(){return f&&(f=[]),this},disable:function(){return e=g=[],f=c="",this},disabled:function(){return!f},lock:function(){return e=g=[],c||(f=c=""),this},locked:function(){return!!e},fireWith:function(a,c){return e||(c=c||[],c=[a,c.slice?c.slice():c],g.push(c),b||i()),this},fire:function(){return j.fireWith(this,arguments),this},fired:function(){return!!d}};return j},n.extend({Deferred:function(a){var b=[["resolve","done",n.Callbacks("once memory"),"resolved"],["reject","fail",n.Callbacks("once memory"),"rejected"],["notify","progress",n.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return n.Deferred(function(c){n.each(b,function(b,f){var g=n.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&n.isFunction(a.promise)?a.promise().progress(c.notify).done(c.resolve).fail(c.reject):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?n.extend(a,d):d}},e={};return d.pipe=d.then,n.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=e.call(arguments),d=c.length,f=1!==d||a&&n.isFunction(a.promise)?d:0,g=1===f?a:n.Deferred(),h=function(a,b,c){return function(d){b[a]=this,c[a]=arguments.length>1?e.call(arguments):d,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(d>1)for(i=new Array(d),j=new Array(d),k=new Array(d);d>b;b++)c[b]&&n.isFunction(c[b].promise)?c[b].promise().progress(h(b,j,i)).done(h(b,k,c)).fail(g.reject):--f;return f||g.resolveWith(k,c),g.promise()}});var I;n.fn.ready=function(a){return n.ready.promise().done(a),this},n.extend({isReady:!1,readyWait:1,holdReady:function(a){a?n.readyWait++:n.ready(!0)},ready:function(a){(a===!0?--n.readyWait:n.isReady)||(n.isReady=!0,a!==!0&&--n.readyWait>0||(I.resolveWith(d,[n]),n.fn.triggerHandler&&(n(d).triggerHandler("ready"),n(d).off("ready"))))}});function J(){d.removeEventListener("DOMContentLoaded",J),a.removeEventListener("load",J),n.ready()}n.ready.promise=function(b){return I||(I=n.Deferred(),"complete"===d.readyState||"loading"!==d.readyState&&!d.documentElement.doScroll?a.setTimeout(n.ready):(d.addEventListener("DOMContentLoaded",J),a.addEventListener("load",J))),I.promise(b)},n.ready.promise();var K=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===n.type(c)){e=!0;for(h in c)K(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,n.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(n(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f},L=function(a){return 1===a.nodeType||9===a.nodeType||!+a.nodeType};function M(){this.expando=n.expando+M.uid++}M.uid=1,M.prototype={register:function(a,b){var c=b||{};return a.nodeType?a[this.expando]=c:Object.defineProperty(a,this.expando,{value:c,writable:!0,configurable:!0}),a[this.expando]},cache:function(a){if(!L(a))return{};var b=a[this.expando];return b||(b={},L(a)&&(a.nodeType?a[this.expando]=b:Object.defineProperty(a,this.expando,{value:b,configurable:!0}))),b},set:function(a,b,c){var d,e=this.cache(a);if("string"==typeof b)e[b]=c;else for(d in b)e[d]=b[d];return e},get:function(a,b){return void 0===b?this.cache(a):a[this.expando]&&a[this.expando][b]},access:function(a,b,c){var d;return void 0===b||b&&"string"==typeof b&&void 0===c?(d=this.get(a,b),void 0!==d?d:this.get(a,n.camelCase(b))):(this.set(a,b,c),void 0!==c?c:b)},remove:function(a,b){var c,d,e,f=a[this.expando];if(void 0!==f){if(void 0===b)this.register(a);else{n.isArray(b)?d=b.concat(b.map(n.camelCase)):(e=n.camelCase(b),b in f?d=[b,e]:(d=e,d=d in f?[d]:d.match(G)||[])),c=d.length;while(c--)delete f[d[c]]}(void 0===b||n.isEmptyObject(f))&&(a.nodeType?a[this.expando]=void 0:delete a[this.expando])}},hasData:function(a){var b=a[this.expando];return void 0!==b&&!n.isEmptyObject(b)}};var N=new M,O=new M,P=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,Q=/[A-Z]/g;function R(a,b,c){var d;if(void 0===c&&1===a.nodeType)if(d="data-"+b.replace(Q,"-$&").toLowerCase(),c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:P.test(c)?n.parseJSON(c):c;
}catch(e){}O.set(a,b,c)}else c=void 0;return c}n.extend({hasData:function(a){return O.hasData(a)||N.hasData(a)},data:function(a,b,c){return O.access(a,b,c)},removeData:function(a,b){O.remove(a,b)},_data:function(a,b,c){return N.access(a,b,c)},_removeData:function(a,b){N.remove(a,b)}}),n.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=O.get(f),1===f.nodeType&&!N.get(f,"hasDataAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=n.camelCase(d.slice(5)),R(f,d,e[d])));N.set(f,"hasDataAttrs",!0)}return e}return"object"==typeof a?this.each(function(){O.set(this,a)}):K(this,function(b){var c,d;if(f&&void 0===b){if(c=O.get(f,a)||O.get(f,a.replace(Q,"-$&").toLowerCase()),void 0!==c)return c;if(d=n.camelCase(a),c=O.get(f,d),void 0!==c)return c;if(c=R(f,d,void 0),void 0!==c)return c}else d=n.camelCase(a),this.each(function(){var c=O.get(this,d);O.set(this,d,b),a.indexOf("-")>-1&&void 0!==c&&O.set(this,a,b)})},null,b,arguments.length>1,null,!0)},removeData:function(a){return this.each(function(){O.remove(this,a)})}}),n.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=N.get(a,b),c&&(!d||n.isArray(c)?d=N.access(a,b,n.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=n.queue(a,b),d=c.length,e=c.shift(),f=n._queueHooks(a,b),g=function(){n.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return N.get(a,c)||N.access(a,c,{empty:n.Callbacks("once memory").add(function(){N.remove(a,[b+"queue",c])})})}}),n.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?n.queue(this[0],a):void 0===b?this:this.each(function(){var c=n.queue(this,a,b);n._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&n.dequeue(this,a)})},dequeue:function(a){return this.each(function(){n.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=n.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=N.get(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var S=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,T=new RegExp("^(?:([+-])=|)("+S+")([a-z%]*)$","i"),U=["Top","Right","Bottom","Left"],V=function(a,b){return a=b||a,"none"===n.css(a,"display")||!n.contains(a.ownerDocument,a)};function W(a,b,c,d){var e,f=1,g=20,h=d?function(){return d.cur()}:function(){return n.css(a,b,"")},i=h(),j=c&&c[3]||(n.cssNumber[b]?"":"px"),k=(n.cssNumber[b]||"px"!==j&&+i)&&T.exec(n.css(a,b));if(k&&k[3]!==j){j=j||k[3],c=c||[],k=+i||1;do f=f||".5",k/=f,n.style(a,b,k+j);while(f!==(f=h()/i)&&1!==f&&--g)}return c&&(k=+k||+i||0,e=c[1]?k+(c[1]+1)*c[2]:+c[2],d&&(d.unit=j,d.start=k,d.end=e)),e}var X=/^(?:checkbox|radio)$/i,Y=/<([\w:-]+)/,Z=/^$|\/(?:java|ecma)script/i,$={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};$.optgroup=$.option,$.tbody=$.tfoot=$.colgroup=$.caption=$.thead,$.th=$.td;function _(a,b){var c="undefined"!=typeof a.getElementsByTagName?a.getElementsByTagName(b||"*"):"undefined"!=typeof a.querySelectorAll?a.querySelectorAll(b||"*"):[];return void 0===b||b&&n.nodeName(a,b)?n.merge([a],c):c}function aa(a,b){for(var c=0,d=a.length;d>c;c++)N.set(a[c],"globalEval",!b||N.get(b[c],"globalEval"))}var ba=/<|&#?\w+;/;function ca(a,b,c,d,e){for(var f,g,h,i,j,k,l=b.createDocumentFragment(),m=[],o=0,p=a.length;p>o;o++)if(f=a[o],f||0===f)if("object"===n.type(f))n.merge(m,f.nodeType?[f]:f);else if(ba.test(f)){g=g||l.appendChild(b.createElement("div")),h=(Y.exec(f)||["",""])[1].toLowerCase(),i=$[h]||$._default,g.innerHTML=i[1]+n.htmlPrefilter(f)+i[2],k=i[0];while(k--)g=g.lastChild;n.merge(m,g.childNodes),g=l.firstChild,g.textContent=""}else m.push(b.createTextNode(f));l.textContent="",o=0;while(f=m[o++])if(d&&n.inArray(f,d)>-1)e&&e.push(f);else if(j=n.contains(f.ownerDocument,f),g=_(l.appendChild(f),"script"),j&&aa(g),c){k=0;while(f=g[k++])Z.test(f.type||"")&&c.push(f)}return l}!function(){var a=d.createDocumentFragment(),b=a.appendChild(d.createElement("div")),c=d.createElement("input");c.setAttribute("type","radio"),c.setAttribute("checked","checked"),c.setAttribute("name","t"),b.appendChild(c),l.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,b.innerHTML="<textarea>x</textarea>",l.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue}();var da=/^key/,ea=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,fa=/^([^.]*)(?:\.(.+)|)/;function ga(){return!0}function ha(){return!1}function ia(){try{return d.activeElement}catch(a){}}function ja(a,b,c,d,e,f){var g,h;if("object"==typeof b){"string"!=typeof c&&(d=d||c,c=void 0);for(h in b)ja(a,h,c,d,b[h],f);return a}if(null==d&&null==e?(e=c,d=c=void 0):null==e&&("string"==typeof c?(e=d,d=void 0):(e=d,d=c,c=void 0)),e===!1)e=ha;else if(!e)return a;return 1===f&&(g=e,e=function(a){return n().off(a),g.apply(this,arguments)},e.guid=g.guid||(g.guid=n.guid++)),a.each(function(){n.event.add(this,b,e,d,c)})}n.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=N.get(a);if(r){c.handler&&(f=c,c=f.handler,e=f.selector),c.guid||(c.guid=n.guid++),(i=r.events)||(i=r.events={}),(g=r.handle)||(g=r.handle=function(b){return"undefined"!=typeof n&&n.event.triggered!==b.type?n.event.dispatch.apply(a,arguments):void 0}),b=(b||"").match(G)||[""],j=b.length;while(j--)h=fa.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o&&(l=n.event.special[o]||{},o=(e?l.delegateType:l.bindType)||o,l=n.event.special[o]||{},k=n.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&n.expr.match.needsContext.test(e),namespace:p.join(".")},f),(m=i[o])||(m=i[o]=[],m.delegateCount=0,l.setup&&l.setup.call(a,d,p,g)!==!1||a.addEventListener&&a.addEventListener(o,g)),l.add&&(l.add.call(a,k),k.handler.guid||(k.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,k):m.push(k),n.event.global[o]=!0)}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=N.hasData(a)&&N.get(a);if(r&&(i=r.events)){b=(b||"").match(G)||[""],j=b.length;while(j--)if(h=fa.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=n.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,m=i[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),g=f=m.length;while(f--)k=m[f],!e&&q!==k.origType||c&&c.guid!==k.guid||h&&!h.test(k.namespace)||d&&d!==k.selector&&("**"!==d||!k.selector)||(m.splice(f,1),k.selector&&m.delegateCount--,l.remove&&l.remove.call(a,k));g&&!m.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||n.removeEvent(a,o,r.handle),delete i[o])}else for(o in i)n.event.remove(a,o+b[j],c,d,!0);n.isEmptyObject(i)&&N.remove(a,"handle events")}},dispatch:function(a){a=n.event.fix(a);var b,c,d,f,g,h=[],i=e.call(arguments),j=(N.get(this,"events")||{})[a.type]||[],k=n.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=n.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,c=0;while((g=f.handlers[c++])&&!a.isImmediatePropagationStopped())a.rnamespace&&!a.rnamespace.test(g.namespace)||(a.handleObj=g,a.data=g.data,d=((n.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==d&&(a.result=d)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&("click"!==a.type||isNaN(a.button)||a.button<1))for(;i!==this;i=i.parentNode||this)if(1===i.nodeType&&(i.disabled!==!0||"click"!==a.type)){for(d=[],c=0;h>c;c++)f=b[c],e=f.selector+" ",void 0===d[e]&&(d[e]=f.needsContext?n(e,this).index(i)>-1:n.find(e,this,null,[i]).length),d[e]&&d.push(f);d.length&&g.push({elem:i,handlers:d})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},props:"altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,e,f,g=b.button;return null==a.pageX&&null!=b.clientX&&(c=a.target.ownerDocument||d,e=c.documentElement,f=c.body,a.pageX=b.clientX+(e&&e.scrollLeft||f&&f.scrollLeft||0)-(e&&e.clientLeft||f&&f.clientLeft||0),a.pageY=b.clientY+(e&&e.scrollTop||f&&f.scrollTop||0)-(e&&e.clientTop||f&&f.clientTop||0)),a.which||void 0===g||(a.which=1&g?1:2&g?3:4&g?2:0),a}},fix:function(a){if(a[n.expando])return a;var b,c,e,f=a.type,g=a,h=this.fixHooks[f];h||(this.fixHooks[f]=h=ea.test(f)?this.mouseHooks:da.test(f)?this.keyHooks:{}),e=h.props?this.props.concat(h.props):this.props,a=new n.Event(g),b=e.length;while(b--)c=e[b],a[c]=g[c];return a.target||(a.target=d),3===a.target.nodeType&&(a.target=a.target.parentNode),h.filter?h.filter(a,g):a},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==ia()&&this.focus?(this.focus(),!1):void 0},delegateType:"focusin"},blur:{trigger:function(){return this===ia()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&n.nodeName(this,"input")?(this.click(),!1):void 0},_default:function(a){return n.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}}},n.removeEvent=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c)},n.Event=function(a,b){return this instanceof n.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?ga:ha):this.type=a,b&&n.extend(this,b),this.timeStamp=a&&a.timeStamp||n.now(),void(this[n.expando]=!0)):new n.Event(a,b)},n.Event.prototype={constructor:n.Event,isDefaultPrevented:ha,isPropagationStopped:ha,isImmediatePropagationStopped:ha,isSimulated:!1,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=ga,a&&!this.isSimulated&&a.preventDefault()},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=ga,a&&!this.isSimulated&&a.stopPropagation()},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=ga,a&&!this.isSimulated&&a.stopImmediatePropagation(),this.stopPropagation()}},n.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){n.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return e&&(e===d||n.contains(d,e))||(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),n.fn.extend({on:function(a,b,c,d){return ja(this,a,b,c,d)},one:function(a,b,c,d){return ja(this,a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,n(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return b!==!1&&"function"!=typeof b||(c=b,b=void 0),c===!1&&(c=ha),this.each(function(){n.event.remove(this,a,c,b)})}});var ka=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,la=/<script|<style|<link/i,ma=/checked\s*(?:[^=]|=\s*.checked.)/i,na=/^true\/(.*)/,oa=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;function pa(a,b){return n.nodeName(a,"table")&&n.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function qa(a){return a.type=(null!==a.getAttribute("type"))+"/"+a.type,a}function ra(a){var b=na.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function sa(a,b){var c,d,e,f,g,h,i,j;if(1===b.nodeType){if(N.hasData(a)&&(f=N.access(a),g=N.set(b,f),j=f.events)){delete g.handle,g.events={};for(e in j)for(c=0,d=j[e].length;d>c;c++)n.event.add(b,e,j[e][c])}O.hasData(a)&&(h=O.access(a),i=n.extend({},h),O.set(b,i))}}function ta(a,b){var c=b.nodeName.toLowerCase();"input"===c&&X.test(a.type)?b.checked=a.checked:"input"!==c&&"textarea"!==c||(b.defaultValue=a.defaultValue)}function ua(a,b,c,d){b=f.apply([],b);var e,g,h,i,j,k,m=0,o=a.length,p=o-1,q=b[0],r=n.isFunction(q);if(r||o>1&&"string"==typeof q&&!l.checkClone&&ma.test(q))return a.each(function(e){var f=a.eq(e);r&&(b[0]=q.call(this,e,f.html())),ua(f,b,c,d)});if(o&&(e=ca(b,a[0].ownerDocument,!1,a,d),g=e.firstChild,1===e.childNodes.length&&(e=g),g||d)){for(h=n.map(_(e,"script"),qa),i=h.length;o>m;m++)j=e,m!==p&&(j=n.clone(j,!0,!0),i&&n.merge(h,_(j,"script"))),c.call(a[m],j,m);if(i)for(k=h[h.length-1].ownerDocument,n.map(h,ra),m=0;i>m;m++)j=h[m],Z.test(j.type||"")&&!N.access(j,"globalEval")&&n.contains(k,j)&&(j.src?n._evalUrl&&n._evalUrl(j.src):n.globalEval(j.textContent.replace(oa,"")))}return a}function va(a,b,c){for(var d,e=b?n.filter(b,a):a,f=0;null!=(d=e[f]);f++)c||1!==d.nodeType||n.cleanData(_(d)),d.parentNode&&(c&&n.contains(d.ownerDocument,d)&&aa(_(d,"script")),d.parentNode.removeChild(d));return a}n.extend({htmlPrefilter:function(a){return a.replace(ka,"<$1></$2>")},clone:function(a,b,c){var d,e,f,g,h=a.cloneNode(!0),i=n.contains(a.ownerDocument,a);if(!(l.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||n.isXMLDoc(a)))for(g=_(h),f=_(a),d=0,e=f.length;e>d;d++)ta(f[d],g[d]);if(b)if(c)for(f=f||_(a),g=g||_(h),d=0,e=f.length;e>d;d++)sa(f[d],g[d]);else sa(a,h);return g=_(h,"script"),g.length>0&&aa(g,!i&&_(a,"script")),h},cleanData:function(a){for(var b,c,d,e=n.event.special,f=0;void 0!==(c=a[f]);f++)if(L(c)){if(b=c[N.expando]){if(b.events)for(d in b.events)e[d]?n.event.remove(c,d):n.removeEvent(c,d,b.handle);c[N.expando]=void 0}c[O.expando]&&(c[O.expando]=void 0)}}}),n.fn.extend({domManip:ua,detach:function(a){return va(this,a,!0)},remove:function(a){return va(this,a)},text:function(a){return K(this,function(a){return void 0===a?n.text(this):this.empty().each(function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=a)})},null,a,arguments.length)},append:function(){return ua(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=pa(this,a);b.appendChild(a)}})},prepend:function(){return ua(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=pa(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return ua(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return ua(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},empty:function(){for(var a,b=0;null!=(a=this[b]);b++)1===a.nodeType&&(n.cleanData(_(a,!1)),a.textContent="");return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return n.clone(this,a,b)})},html:function(a){return K(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a&&1===b.nodeType)return b.innerHTML;if("string"==typeof a&&!la.test(a)&&!$[(Y.exec(a)||["",""])[1].toLowerCase()]){a=n.htmlPrefilter(a);try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(n.cleanData(_(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=[];return ua(this,arguments,function(b){var c=this.parentNode;n.inArray(this,a)<0&&(n.cleanData(_(this)),c&&c.replaceChild(b,this))},a)}}),n.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){n.fn[a]=function(a){for(var c,d=[],e=n(a),f=e.length-1,h=0;f>=h;h++)c=h===f?this:this.clone(!0),n(e[h])[b](c),g.apply(d,c.get());return this.pushStack(d)}});var wa,xa={HTML:"block",BODY:"block"};function ya(a,b){var c=n(b.createElement(a)).appendTo(b.body),d=n.css(c[0],"display");return c.detach(),d}function za(a){var b=d,c=xa[a];return c||(c=ya(a,b),"none"!==c&&c||(wa=(wa||n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=wa[0].contentDocument,b.write(),b.close(),c=ya(a,b),wa.detach()),xa[a]=c),c}var Aa=/^margin/,Ba=new RegExp("^("+S+")(?!px)[a-z%]+$","i"),Ca=function(b){var c=b.ownerDocument.defaultView;return c&&c.opener||(c=a),c.getComputedStyle(b)},Da=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e},Ea=d.documentElement;!function(){var b,c,e,f,g=d.createElement("div"),h=d.createElement("div");if(h.style){h.style.backgroundClip="content-box",h.cloneNode(!0).style.backgroundClip="",l.clearCloneStyle="content-box"===h.style.backgroundClip,g.style.cssText="border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute",g.appendChild(h);function i(){h.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%",h.innerHTML="",Ea.appendChild(g);var d=a.getComputedStyle(h);b="1%"!==d.top,f="2px"===d.marginLeft,c="4px"===d.width,h.style.marginRight="50%",e="4px"===d.marginRight,Ea.removeChild(g)}n.extend(l,{pixelPosition:function(){return i(),b},boxSizingReliable:function(){return null==c&&i(),c},pixelMarginRight:function(){return null==c&&i(),e},reliableMarginLeft:function(){return null==c&&i(),f},reliableMarginRight:function(){var b,c=h.appendChild(d.createElement("div"));return c.style.cssText=h.style.cssText="-webkit-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",c.style.marginRight=c.style.width="0",h.style.width="1px",Ea.appendChild(g),b=!parseFloat(a.getComputedStyle(c).marginRight),Ea.removeChild(g),h.removeChild(c),b}})}}();function Fa(a,b,c){var d,e,f,g,h=a.style;return c=c||Ca(a),g=c?c.getPropertyValue(b)||c[b]:void 0,""!==g&&void 0!==g||n.contains(a.ownerDocument,a)||(g=n.style(a,b)),c&&!l.pixelMarginRight()&&Ba.test(g)&&Aa.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f),void 0!==g?g+"":g}function Ga(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}var Ha=/^(none|table(?!-c[ea]).+)/,Ia={position:"absolute",visibility:"hidden",display:"block"},Ja={letterSpacing:"0",fontWeight:"400"},Ka=["Webkit","O","Moz","ms"],La=d.createElement("div").style;function Ma(a){if(a in La)return a;var b=a[0].toUpperCase()+a.slice(1),c=Ka.length;while(c--)if(a=Ka[c]+b,a in La)return a}function Na(a,b,c){var d=T.exec(b);return d?Math.max(0,d[2]-(c||0))+(d[3]||"px"):b}function Oa(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=n.css(a,c+U[f],!0,e)),d?("content"===c&&(g-=n.css(a,"padding"+U[f],!0,e)),"margin"!==c&&(g-=n.css(a,"border"+U[f]+"Width",!0,e))):(g+=n.css(a,"padding"+U[f],!0,e),"padding"!==c&&(g+=n.css(a,"border"+U[f]+"Width",!0,e)));return g}function Pa(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=Ca(a),g="border-box"===n.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=Fa(a,b,f),(0>e||null==e)&&(e=a.style[b]),Ba.test(e))return e;d=g&&(l.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Oa(a,b,c||(g?"border":"content"),d,f)+"px"}function Qa(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=N.get(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&V(d)&&(f[g]=N.access(d,"olddisplay",za(d.nodeName)))):(e=V(d),"none"===c&&e||N.set(d,"olddisplay",e?c:n.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}n.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=Fa(a,"opacity");return""===c?"1":c}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=n.camelCase(b),i=a.style;return b=n.cssProps[h]||(n.cssProps[h]=Ma(h)||h),g=n.cssHooks[b]||n.cssHooks[h],void 0===c?g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b]:(f=typeof c,"string"===f&&(e=T.exec(c))&&e[1]&&(c=W(a,b,e),f="number"),null!=c&&c===c&&("number"===f&&(c+=e&&e[3]||(n.cssNumber[h]?"":"px")),l.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),g&&"set"in g&&void 0===(c=g.set(a,c,d))||(i[b]=c)),void 0)}},css:function(a,b,c,d){var e,f,g,h=n.camelCase(b);return b=n.cssProps[h]||(n.cssProps[h]=Ma(h)||h),g=n.cssHooks[b]||n.cssHooks[h],g&&"get"in g&&(e=g.get(a,!0,c)),void 0===e&&(e=Fa(a,b,d)),"normal"===e&&b in Ja&&(e=Ja[b]),""===c||c?(f=parseFloat(e),c===!0||isFinite(f)?f||0:e):e}}),n.each(["height","width"],function(a,b){n.cssHooks[b]={get:function(a,c,d){return c?Ha.test(n.css(a,"display"))&&0===a.offsetWidth?Da(a,Ia,function(){return Pa(a,b,d)}):Pa(a,b,d):void 0},set:function(a,c,d){var e,f=d&&Ca(a),g=d&&Oa(a,b,d,"border-box"===n.css(a,"boxSizing",!1,f),f);return g&&(e=T.exec(c))&&"px"!==(e[3]||"px")&&(a.style[b]=c,c=n.css(a,b)),Na(a,c,g)}}}),n.cssHooks.marginLeft=Ga(l.reliableMarginLeft,function(a,b){return b?(parseFloat(Fa(a,"marginLeft"))||a.getBoundingClientRect().left-Da(a,{marginLeft:0},function(){return a.getBoundingClientRect().left}))+"px":void 0}),n.cssHooks.marginRight=Ga(l.reliableMarginRight,function(a,b){return b?Da(a,{display:"inline-block"},Fa,[a,"marginRight"]):void 0}),n.each({margin:"",padding:"",border:"Width"},function(a,b){n.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+U[d]+b]=f[d]||f[d-2]||f[0];return e}},Aa.test(a)||(n.cssHooks[a+b].set=Na)}),n.fn.extend({css:function(a,b){return K(this,function(a,b,c){var d,e,f={},g=0;if(n.isArray(b)){for(d=Ca(a),e=b.length;e>g;g++)f[b[g]]=n.css(a,b[g],!1,d);return f}return void 0!==c?n.style(a,b,c):n.css(a,b)},a,b,arguments.length>1)},show:function(){return Qa(this,!0)},hide:function(){return Qa(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){V(this)?n(this).show():n(this).hide()})}});function Ra(a,b,c,d,e){return new Ra.prototype.init(a,b,c,d,e)}n.Tween=Ra,Ra.prototype={constructor:Ra,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||n.easing._default,this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(n.cssNumber[c]?"":"px")},cur:function(){var a=Ra.propHooks[this.prop];return a&&a.get?a.get(this):Ra.propHooks._default.get(this)},run:function(a){var b,c=Ra.propHooks[this.prop];return this.options.duration?this.pos=b=n.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Ra.propHooks._default.set(this),this}},Ra.prototype.init.prototype=Ra.prototype,Ra.propHooks={_default:{get:function(a){var b;return 1!==a.elem.nodeType||null!=a.elem[a.prop]&&null==a.elem.style[a.prop]?a.elem[a.prop]:(b=n.css(a.elem,a.prop,""),b&&"auto"!==b?b:0)},set:function(a){n.fx.step[a.prop]?n.fx.step[a.prop](a):1!==a.elem.nodeType||null==a.elem.style[n.cssProps[a.prop]]&&!n.cssHooks[a.prop]?a.elem[a.prop]=a.now:n.style(a.elem,a.prop,a.now+a.unit)}}},Ra.propHooks.scrollTop=Ra.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},n.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2},_default:"swing"},n.fx=Ra.prototype.init,n.fx.step={};var Sa,Ta,Ua=/^(?:toggle|show|hide)$/,Va=/queueHooks$/;function Wa(){return a.setTimeout(function(){Sa=void 0}),Sa=n.now()}function Xa(a,b){var c,d=0,e={height:a};for(b=b?1:0;4>d;d+=2-b)c=U[d],e["margin"+c]=e["padding"+c]=a;return b&&(e.opacity=e.width=a),e}function Ya(a,b,c){for(var d,e=(_a.tweeners[b]||[]).concat(_a.tweeners["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function Za(a,b,c){var d,e,f,g,h,i,j,k,l=this,m={},o=a.style,p=a.nodeType&&V(a),q=N.get(a,"fxshow");c.queue||(h=n._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,l.always(function(){l.always(function(){h.unqueued--,n.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[o.overflow,o.overflowX,o.overflowY],j=n.css(a,"display"),k="none"===j?N.get(a,"olddisplay")||za(a.nodeName):j,"inline"===k&&"none"===n.css(a,"float")&&(o.display="inline-block")),c.overflow&&(o.overflow="hidden",l.always(function(){o.overflow=c.overflow[0],o.overflowX=c.overflow[1],o.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],Ua.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(p?"hide":"show")){if("show"!==e||!q||void 0===q[d])continue;p=!0}m[d]=q&&q[d]||n.style(a,d)}else j=void 0;if(n.isEmptyObject(m))"inline"===("none"===j?za(a.nodeName):j)&&(o.display=j);else{q?"hidden"in q&&(p=q.hidden):q=N.access(a,"fxshow",{}),f&&(q.hidden=!p),p?n(a).show():l.done(function(){n(a).hide()}),l.done(function(){var b;N.remove(a,"fxshow");for(b in m)n.style(a,b,m[b])});for(d in m)g=Ya(p?q[d]:0,d,l),d in q||(q[d]=g.start,p&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function $a(a,b){var c,d,e,f,g;for(c in a)if(d=n.camelCase(c),e=b[d],f=a[c],n.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=n.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function _a(a,b,c){var d,e,f=0,g=_a.prefilters.length,h=n.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=Sa||Wa(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:n.extend({},b),opts:n.extend(!0,{specialEasing:{},easing:n.easing._default},c),originalProperties:b,originalOptions:c,startTime:Sa||Wa(),duration:c.duration,tweens:[],createTween:function(b,c){var d=n.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?(h.notifyWith(a,[j,1,0]),h.resolveWith(a,[j,b])):h.rejectWith(a,[j,b]),this}}),k=j.props;for($a(k,j.opts.specialEasing);g>f;f++)if(d=_a.prefilters[f].call(j,a,k,j.opts))return n.isFunction(d.stop)&&(n._queueHooks(j.elem,j.opts.queue).stop=n.proxy(d.stop,d)),d;return n.map(k,Ya,j),n.isFunction(j.opts.start)&&j.opts.start.call(a,j),n.fx.timer(n.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}n.Animation=n.extend(_a,{tweeners:{"*":[function(a,b){var c=this.createTween(a,b);return W(c.elem,a,T.exec(b),c),c}]},tweener:function(a,b){n.isFunction(a)?(b=a,a=["*"]):a=a.match(G);for(var c,d=0,e=a.length;e>d;d++)c=a[d],_a.tweeners[c]=_a.tweeners[c]||[],_a.tweeners[c].unshift(b)},prefilters:[Za],prefilter:function(a,b){b?_a.prefilters.unshift(a):_a.prefilters.push(a)}}),n.speed=function(a,b,c){var d=a&&"object"==typeof a?n.extend({},a):{complete:c||!c&&b||n.isFunction(a)&&a,duration:a,easing:c&&b||b&&!n.isFunction(b)&&b};return d.duration=n.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in n.fx.speeds?n.fx.speeds[d.duration]:n.fx.speeds._default,null!=d.queue&&d.queue!==!0||(d.queue="fx"),d.old=d.complete,d.complete=function(){n.isFunction(d.old)&&d.old.call(this),d.queue&&n.dequeue(this,d.queue)},d},n.fn.extend({fadeTo:function(a,b,c,d){return this.filter(V).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=n.isEmptyObject(a),f=n.speed(b,c,d),g=function(){var b=_a(this,n.extend({},a),f);(e||N.get(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=n.timers,g=N.get(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&Va.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));!b&&c||n.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=N.get(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=n.timers,g=d?d.length:0;for(c.finish=!0,n.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),n.each(["toggle","show","hide"],function(a,b){var c=n.fn[b];n.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(Xa(b,!0),a,d,e)}}),n.each({slideDown:Xa("show"),slideUp:Xa("hide"),slideToggle:Xa("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){n.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),n.timers=[],n.fx.tick=function(){var a,b=0,c=n.timers;for(Sa=n.now();b<c.length;b++)a=c[b],a()||c[b]!==a||c.splice(b--,1);c.length||n.fx.stop(),Sa=void 0},n.fx.timer=function(a){n.timers.push(a),a()?n.fx.start():n.timers.pop()},n.fx.interval=13,n.fx.start=function(){Ta||(Ta=a.setInterval(n.fx.tick,n.fx.interval))},n.fx.stop=function(){a.clearInterval(Ta),Ta=null},n.fx.speeds={slow:600,fast:200,_default:400},n.fn.delay=function(b,c){return b=n.fx?n.fx.speeds[b]||b:b,c=c||"fx",this.queue(c,function(c,d){var e=a.setTimeout(c,b);d.stop=function(){a.clearTimeout(e)}})},function(){var a=d.createElement("input"),b=d.createElement("select"),c=b.appendChild(d.createElement("option"));a.type="checkbox",l.checkOn=""!==a.value,l.optSelected=c.selected,b.disabled=!0,l.optDisabled=!c.disabled,a=d.createElement("input"),a.value="t",a.type="radio",l.radioValue="t"===a.value}();var ab,bb=n.expr.attrHandle;n.fn.extend({attr:function(a,b){return K(this,n.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){n.removeAttr(this,a)})}}),n.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return"undefined"==typeof a.getAttribute?n.prop(a,b,c):(1===f&&n.isXMLDoc(a)||(b=b.toLowerCase(),e=n.attrHooks[b]||(n.expr.match.bool.test(b)?ab:void 0)),void 0!==c?null===c?void n.removeAttr(a,b):e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:(a.setAttribute(b,c+""),c):e&&"get"in e&&null!==(d=e.get(a,b))?d:(d=n.find.attr(a,b),null==d?void 0:d))},attrHooks:{type:{set:function(a,b){if(!l.radioValue&&"radio"===b&&n.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(G);if(f&&1===a.nodeType)while(c=f[e++])d=n.propFix[c]||c,n.expr.match.bool.test(c)&&(a[d]=!1),a.removeAttribute(c)}}),ab={set:function(a,b,c){return b===!1?n.removeAttr(a,c):a.setAttribute(c,c),c}},n.each(n.expr.match.bool.source.match(/\w+/g),function(a,b){var c=bb[b]||n.find.attr;bb[b]=function(a,b,d){var e,f;return d||(f=bb[b],bb[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,bb[b]=f),e}});var cb=/^(?:input|select|textarea|button)$/i,db=/^(?:a|area)$/i;n.fn.extend({prop:function(a,b){return K(this,n.prop,a,b,arguments.length>1)},removeProp:function(a){return this.each(function(){delete this[n.propFix[a]||a]})}}),n.extend({prop:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return 1===f&&n.isXMLDoc(a)||(b=n.propFix[b]||b,e=n.propHooks[b]),
void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){var b=n.find.attr(a,"tabindex");return b?parseInt(b,10):cb.test(a.nodeName)||db.test(a.nodeName)&&a.href?0:-1}}},propFix:{"for":"htmlFor","class":"className"}}),l.optSelected||(n.propHooks.selected={get:function(a){var b=a.parentNode;return b&&b.parentNode&&b.parentNode.selectedIndex,null},set:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex)}}),n.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){n.propFix[this.toLowerCase()]=this});var eb=/[\t\r\n\f]/g;function fb(a){return a.getAttribute&&a.getAttribute("class")||""}n.fn.extend({addClass:function(a){var b,c,d,e,f,g,h,i=0;if(n.isFunction(a))return this.each(function(b){n(this).addClass(a.call(this,b,fb(this)))});if("string"==typeof a&&a){b=a.match(G)||[];while(c=this[i++])if(e=fb(c),d=1===c.nodeType&&(" "+e+" ").replace(eb," ")){g=0;while(f=b[g++])d.indexOf(" "+f+" ")<0&&(d+=f+" ");h=n.trim(d),e!==h&&c.setAttribute("class",h)}}return this},removeClass:function(a){var b,c,d,e,f,g,h,i=0;if(n.isFunction(a))return this.each(function(b){n(this).removeClass(a.call(this,b,fb(this)))});if(!arguments.length)return this.attr("class","");if("string"==typeof a&&a){b=a.match(G)||[];while(c=this[i++])if(e=fb(c),d=1===c.nodeType&&(" "+e+" ").replace(eb," ")){g=0;while(f=b[g++])while(d.indexOf(" "+f+" ")>-1)d=d.replace(" "+f+" "," ");h=n.trim(d),e!==h&&c.setAttribute("class",h)}}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):n.isFunction(a)?this.each(function(c){n(this).toggleClass(a.call(this,c,fb(this),b),b)}):this.each(function(){var b,d,e,f;if("string"===c){d=0,e=n(this),f=a.match(G)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else void 0!==a&&"boolean"!==c||(b=fb(this),b&&N.set(this,"__className__",b),this.setAttribute&&this.setAttribute("class",b||a===!1?"":N.get(this,"__className__")||""))})},hasClass:function(a){var b,c,d=0;b=" "+a+" ";while(c=this[d++])if(1===c.nodeType&&(" "+fb(c)+" ").replace(eb," ").indexOf(b)>-1)return!0;return!1}});var gb=/\r/g,hb=/[\x20\t\r\n\f]+/g;n.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=n.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,n(this).val()):a,null==e?e="":"number"==typeof e?e+="":n.isArray(e)&&(e=n.map(e,function(a){return null==a?"":a+""})),b=n.valHooks[this.type]||n.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=n.valHooks[e.type]||n.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(gb,""):null==c?"":c)}}}),n.extend({valHooks:{option:{get:function(a){var b=n.find.attr(a,"value");return null!=b?b:n.trim(n.text(a)).replace(hb," ")}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],(c.selected||i===e)&&(l.optDisabled?!c.disabled:null===c.getAttribute("disabled"))&&(!c.parentNode.disabled||!n.nodeName(c.parentNode,"optgroup"))){if(b=n(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=n.makeArray(b),g=e.length;while(g--)d=e[g],(d.selected=n.inArray(n.valHooks.option.get(d),f)>-1)&&(c=!0);return c||(a.selectedIndex=-1),f}}}}),n.each(["radio","checkbox"],function(){n.valHooks[this]={set:function(a,b){return n.isArray(b)?a.checked=n.inArray(n(a).val(),b)>-1:void 0}},l.checkOn||(n.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})});var ib=/^(?:focusinfocus|focusoutblur)$/;n.extend(n.event,{trigger:function(b,c,e,f){var g,h,i,j,l,m,o,p=[e||d],q=k.call(b,"type")?b.type:b,r=k.call(b,"namespace")?b.namespace.split("."):[];if(h=i=e=e||d,3!==e.nodeType&&8!==e.nodeType&&!ib.test(q+n.event.triggered)&&(q.indexOf(".")>-1&&(r=q.split("."),q=r.shift(),r.sort()),l=q.indexOf(":")<0&&"on"+q,b=b[n.expando]?b:new n.Event(q,"object"==typeof b&&b),b.isTrigger=f?2:3,b.namespace=r.join("."),b.rnamespace=b.namespace?new RegExp("(^|\\.)"+r.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=e),c=null==c?[b]:n.makeArray(c,[b]),o=n.event.special[q]||{},f||!o.trigger||o.trigger.apply(e,c)!==!1)){if(!f&&!o.noBubble&&!n.isWindow(e)){for(j=o.delegateType||q,ib.test(j+q)||(h=h.parentNode);h;h=h.parentNode)p.push(h),i=h;i===(e.ownerDocument||d)&&p.push(i.defaultView||i.parentWindow||a)}g=0;while((h=p[g++])&&!b.isPropagationStopped())b.type=g>1?j:o.bindType||q,m=(N.get(h,"events")||{})[b.type]&&N.get(h,"handle"),m&&m.apply(h,c),m=l&&h[l],m&&m.apply&&L(h)&&(b.result=m.apply(h,c),b.result===!1&&b.preventDefault());return b.type=q,f||b.isDefaultPrevented()||o._default&&o._default.apply(p.pop(),c)!==!1||!L(e)||l&&n.isFunction(e[q])&&!n.isWindow(e)&&(i=e[l],i&&(e[l]=null),n.event.triggered=q,e[q](),n.event.triggered=void 0,i&&(e[l]=i)),b.result}},simulate:function(a,b,c){var d=n.extend(new n.Event,c,{type:a,isSimulated:!0});n.event.trigger(d,null,b)}}),n.fn.extend({trigger:function(a,b){return this.each(function(){n.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?n.event.trigger(a,b,c,!0):void 0}}),n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){n.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),n.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),l.focusin="onfocusin"in a,l.focusin||n.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){n.event.simulate(b,a.target,n.event.fix(a))};n.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=N.access(d,b);e||d.addEventListener(a,c,!0),N.access(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=N.access(d,b)-1;e?N.access(d,b,e):(d.removeEventListener(a,c,!0),N.remove(d,b))}}});var jb=a.location,kb=n.now(),lb=/\?/;n.parseJSON=function(a){return JSON.parse(a+"")},n.parseXML=function(b){var c;if(!b||"string"!=typeof b)return null;try{c=(new a.DOMParser).parseFromString(b,"text/xml")}catch(d){c=void 0}return c&&!c.getElementsByTagName("parsererror").length||n.error("Invalid XML: "+b),c};var mb=/#.*$/,nb=/([?&])_=[^&]*/,ob=/^(.*?):[ \t]*([^\r\n]*)$/gm,pb=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,qb=/^(?:GET|HEAD)$/,rb=/^\/\//,sb={},tb={},ub="*/".concat("*"),vb=d.createElement("a");vb.href=jb.href;function wb(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(G)||[];if(n.isFunction(c))while(d=f[e++])"+"===d[0]?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function xb(a,b,c,d){var e={},f=a===tb;function g(h){var i;return e[h]=!0,n.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function yb(a,b){var c,d,e=n.ajaxSettings.flatOptions||{};for(c in b)void 0!==b[c]&&((e[c]?a:d||(d={}))[c]=b[c]);return d&&n.extend(!0,a,d),a}function zb(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===d&&(d=a.mimeType||b.getResponseHeader("Content-Type"));if(d)for(e in h)if(h[e]&&h[e].test(d)){i.unshift(e);break}if(i[0]in c)f=i[0];else{for(e in c){if(!i[0]||a.converters[e+" "+i[0]]){f=e;break}g||(g=e)}f=f||g}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function Ab(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}n.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:jb.href,type:"GET",isLocal:pb.test(jb.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":ub,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":n.parseJSON,"text xml":n.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?yb(yb(a,n.ajaxSettings),b):yb(n.ajaxSettings,a)},ajaxPrefilter:wb(sb),ajaxTransport:wb(tb),ajax:function(b,c){"object"==typeof b&&(c=b,b=void 0),c=c||{};var e,f,g,h,i,j,k,l,m=n.ajaxSetup({},c),o=m.context||m,p=m.context&&(o.nodeType||o.jquery)?n(o):n.event,q=n.Deferred(),r=n.Callbacks("once memory"),s=m.statusCode||{},t={},u={},v=0,w="canceled",x={readyState:0,getResponseHeader:function(a){var b;if(2===v){if(!h){h={};while(b=ob.exec(g))h[b[1].toLowerCase()]=b[2]}b=h[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===v?g:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return v||(a=u[c]=u[c]||a,t[a]=b),this},overrideMimeType:function(a){return v||(m.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>v)for(b in a)s[b]=[s[b],a[b]];else x.always(a[x.status]);return this},abort:function(a){var b=a||w;return e&&e.abort(b),z(0,b),this}};if(q.promise(x).complete=r.add,x.success=x.done,x.error=x.fail,m.url=((b||m.url||jb.href)+"").replace(mb,"").replace(rb,jb.protocol+"//"),m.type=c.method||c.type||m.method||m.type,m.dataTypes=n.trim(m.dataType||"*").toLowerCase().match(G)||[""],null==m.crossDomain){j=d.createElement("a");try{j.href=m.url,j.href=j.href,m.crossDomain=vb.protocol+"//"+vb.host!=j.protocol+"//"+j.host}catch(y){m.crossDomain=!0}}if(m.data&&m.processData&&"string"!=typeof m.data&&(m.data=n.param(m.data,m.traditional)),xb(sb,m,c,x),2===v)return x;k=n.event&&m.global,k&&0===n.active++&&n.event.trigger("ajaxStart"),m.type=m.type.toUpperCase(),m.hasContent=!qb.test(m.type),f=m.url,m.hasContent||(m.data&&(f=m.url+=(lb.test(f)?"&":"?")+m.data,delete m.data),m.cache===!1&&(m.url=nb.test(f)?f.replace(nb,"$1_="+kb++):f+(lb.test(f)?"&":"?")+"_="+kb++)),m.ifModified&&(n.lastModified[f]&&x.setRequestHeader("If-Modified-Since",n.lastModified[f]),n.etag[f]&&x.setRequestHeader("If-None-Match",n.etag[f])),(m.data&&m.hasContent&&m.contentType!==!1||c.contentType)&&x.setRequestHeader("Content-Type",m.contentType),x.setRequestHeader("Accept",m.dataTypes[0]&&m.accepts[m.dataTypes[0]]?m.accepts[m.dataTypes[0]]+("*"!==m.dataTypes[0]?", "+ub+"; q=0.01":""):m.accepts["*"]);for(l in m.headers)x.setRequestHeader(l,m.headers[l]);if(m.beforeSend&&(m.beforeSend.call(o,x,m)===!1||2===v))return x.abort();w="abort";for(l in{success:1,error:1,complete:1})x[l](m[l]);if(e=xb(tb,m,c,x)){if(x.readyState=1,k&&p.trigger("ajaxSend",[x,m]),2===v)return x;m.async&&m.timeout>0&&(i=a.setTimeout(function(){x.abort("timeout")},m.timeout));try{v=1,e.send(t,z)}catch(y){if(!(2>v))throw y;z(-1,y)}}else z(-1,"No Transport");function z(b,c,d,h){var j,l,t,u,w,y=c;2!==v&&(v=2,i&&a.clearTimeout(i),e=void 0,g=h||"",x.readyState=b>0?4:0,j=b>=200&&300>b||304===b,d&&(u=zb(m,x,d)),u=Ab(m,u,x,j),j?(m.ifModified&&(w=x.getResponseHeader("Last-Modified"),w&&(n.lastModified[f]=w),w=x.getResponseHeader("etag"),w&&(n.etag[f]=w)),204===b||"HEAD"===m.type?y="nocontent":304===b?y="notmodified":(y=u.state,l=u.data,t=u.error,j=!t)):(t=y,!b&&y||(y="error",0>b&&(b=0))),x.status=b,x.statusText=(c||y)+"",j?q.resolveWith(o,[l,y,x]):q.rejectWith(o,[x,y,t]),x.statusCode(s),s=void 0,k&&p.trigger(j?"ajaxSuccess":"ajaxError",[x,m,j?l:t]),r.fireWith(o,[x,y]),k&&(p.trigger("ajaxComplete",[x,m]),--n.active||n.event.trigger("ajaxStop")))}return x},getJSON:function(a,b,c){return n.get(a,b,c,"json")},getScript:function(a,b){return n.get(a,void 0,b,"script")}}),n.each(["get","post"],function(a,b){n[b]=function(a,c,d,e){return n.isFunction(c)&&(e=e||d,d=c,c=void 0),n.ajax(n.extend({url:a,type:b,dataType:e,data:c,success:d},n.isPlainObject(a)&&a))}}),n._evalUrl=function(a){return n.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},n.fn.extend({wrapAll:function(a){var b;return n.isFunction(a)?this.each(function(b){n(this).wrapAll(a.call(this,b))}):(this[0]&&(b=n(a,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstElementChild)a=a.firstElementChild;return a}).append(this)),this)},wrapInner:function(a){return n.isFunction(a)?this.each(function(b){n(this).wrapInner(a.call(this,b))}):this.each(function(){var b=n(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=n.isFunction(a);return this.each(function(c){n(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){n.nodeName(this,"body")||n(this).replaceWith(this.childNodes)}).end()}}),n.expr.filters.hidden=function(a){return!n.expr.filters.visible(a)},n.expr.filters.visible=function(a){return a.offsetWidth>0||a.offsetHeight>0||a.getClientRects().length>0};var Bb=/%20/g,Cb=/\[\]$/,Db=/\r?\n/g,Eb=/^(?:submit|button|image|reset|file)$/i,Fb=/^(?:input|select|textarea|keygen)/i;function Gb(a,b,c,d){var e;if(n.isArray(b))n.each(b,function(b,e){c||Cb.test(a)?d(a,e):Gb(a+"["+("object"==typeof e&&null!=e?b:"")+"]",e,c,d)});else if(c||"object"!==n.type(b))d(a,b);else for(e in b)Gb(a+"["+e+"]",b[e],c,d)}n.param=function(a,b){var c,d=[],e=function(a,b){b=n.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=n.ajaxSettings&&n.ajaxSettings.traditional),n.isArray(a)||a.jquery&&!n.isPlainObject(a))n.each(a,function(){e(this.name,this.value)});else for(c in a)Gb(c,a[c],b,e);return d.join("&").replace(Bb,"+")},n.fn.extend({serialize:function(){return n.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=n.prop(this,"elements");return a?n.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!n(this).is(":disabled")&&Fb.test(this.nodeName)&&!Eb.test(a)&&(this.checked||!X.test(a))}).map(function(a,b){var c=n(this).val();return null==c?null:n.isArray(c)?n.map(c,function(a){return{name:b.name,value:a.replace(Db,"\r\n")}}):{name:b.name,value:c.replace(Db,"\r\n")}}).get()}}),n.ajaxSettings.xhr=function(){try{return new a.XMLHttpRequest}catch(b){}};var Hb={0:200,1223:204},Ib=n.ajaxSettings.xhr();l.cors=!!Ib&&"withCredentials"in Ib,l.ajax=Ib=!!Ib,n.ajaxTransport(function(b){var c,d;return l.cors||Ib&&!b.crossDomain?{send:function(e,f){var g,h=b.xhr();if(h.open(b.type,b.url,b.async,b.username,b.password),b.xhrFields)for(g in b.xhrFields)h[g]=b.xhrFields[g];b.mimeType&&h.overrideMimeType&&h.overrideMimeType(b.mimeType),b.crossDomain||e["X-Requested-With"]||(e["X-Requested-With"]="XMLHttpRequest");for(g in e)h.setRequestHeader(g,e[g]);c=function(a){return function(){c&&(c=d=h.onload=h.onerror=h.onabort=h.onreadystatechange=null,"abort"===a?h.abort():"error"===a?"number"!=typeof h.status?f(0,"error"):f(h.status,h.statusText):f(Hb[h.status]||h.status,h.statusText,"text"!==(h.responseType||"text")||"string"!=typeof h.responseText?{binary:h.response}:{text:h.responseText},h.getAllResponseHeaders()))}},h.onload=c(),d=h.onerror=c("error"),void 0!==h.onabort?h.onabort=d:h.onreadystatechange=function(){4===h.readyState&&a.setTimeout(function(){c&&d()})},c=c("abort");try{h.send(b.hasContent&&b.data||null)}catch(i){if(c)throw i}},abort:function(){c&&c()}}:void 0}),n.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(a){return n.globalEval(a),a}}}),n.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET")}),n.ajaxTransport("script",function(a){if(a.crossDomain){var b,c;return{send:function(e,f){b=n("<script>").prop({charset:a.scriptCharset,src:a.url}).on("load error",c=function(a){b.remove(),c=null,a&&f("error"===a.type?404:200,a.type)}),d.head.appendChild(b[0])},abort:function(){c&&c()}}}});var Jb=[],Kb=/(=)\?(?=&|$)|\?\?/;n.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=Jb.pop()||n.expando+"_"+kb++;return this[a]=!0,a}}),n.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(Kb.test(b.url)?"url":"string"==typeof b.data&&0===(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&Kb.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=n.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(Kb,"$1"+e):b.jsonp!==!1&&(b.url+=(lb.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||n.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){void 0===f?n(a).removeProp(e):a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,Jb.push(e)),g&&n.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),n.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||d;var e=x.exec(a),f=!c&&[];return e?[b.createElement(e[1])]:(e=ca([a],b,f),f&&f.length&&n(f).remove(),n.merge([],e.childNodes))};var Lb=n.fn.load;n.fn.load=function(a,b,c){if("string"!=typeof a&&Lb)return Lb.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>-1&&(d=n.trim(a.slice(h)),a=a.slice(0,h)),n.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&n.ajax({url:a,type:e||"GET",dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?n("<div>").append(n.parseHTML(a)).find(d):a)}).always(c&&function(a,b){g.each(function(){c.apply(this,f||[a.responseText,b,a])})}),this},n.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){n.fn[b]=function(a){return this.on(b,a)}}),n.expr.filters.animated=function(a){return n.grep(n.timers,function(b){return a===b.elem}).length};function Mb(a){return n.isWindow(a)?a:9===a.nodeType&&a.defaultView}n.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=n.css(a,"position"),l=n(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=n.css(a,"top"),i=n.css(a,"left"),j=("absolute"===k||"fixed"===k)&&(f+i).indexOf("auto")>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),n.isFunction(b)&&(b=b.call(a,c,n.extend({},h))),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},n.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){n.offset.setOffset(this,a,b)});var b,c,d=this[0],e={top:0,left:0},f=d&&d.ownerDocument;if(f)return b=f.documentElement,n.contains(b,d)?(e=d.getBoundingClientRect(),c=Mb(f),{top:e.top+c.pageYOffset-b.clientTop,left:e.left+c.pageXOffset-b.clientLeft}):e},position:function(){if(this[0]){var a,b,c=this[0],d={top:0,left:0};return"fixed"===n.css(c,"position")?b=c.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),n.nodeName(a[0],"html")||(d=a.offset()),d.top+=n.css(a[0],"borderTopWidth",!0),d.left+=n.css(a[0],"borderLeftWidth",!0)),{top:b.top-d.top-n.css(c,"marginTop",!0),left:b.left-d.left-n.css(c,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent;while(a&&"static"===n.css(a,"position"))a=a.offsetParent;return a||Ea})}}),n.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,b){var c="pageYOffset"===b;n.fn[a]=function(d){return K(this,function(a,d,e){var f=Mb(a);return void 0===e?f?f[b]:a[d]:void(f?f.scrollTo(c?f.pageXOffset:e,c?e:f.pageYOffset):a[d]=e)},a,d,arguments.length)}}),n.each(["top","left"],function(a,b){n.cssHooks[b]=Ga(l.pixelPosition,function(a,c){return c?(c=Fa(a,b),Ba.test(c)?n(a).position()[b]+"px":c):void 0})}),n.each({Height:"height",Width:"width"},function(a,b){n.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){n.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return K(this,function(b,c,d){var e;return n.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?n.css(b,c,g):n.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),n.fn.extend({bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)},size:function(){return this.length}}),n.fn.andSelf=n.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return n});var Nb=a.jQuery,Ob=a.$;return n.noConflict=function(b){return a.$===n&&(a.$=Ob),b&&a.jQuery===n&&(a.jQuery=Nb),n},b||(a.jQuery=a.$=n),n});

/*
 AngularJS v1.5.11
 (c) 2010-2017 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(y){'use strict';function G(a,b){b=b||Error;return function(){var d=arguments[0],c;c="["+(a?a+":":"")+d+"] http://errors.angularjs.org/1.5.11/"+(a?a+"/":"")+d;for(d=1;d<arguments.length;d++){c=c+(1==d?"?":"&")+"p"+(d-1)+"=";var f=encodeURIComponent,e;e=arguments[d];e="function"==typeof e?e.toString().replace(/ \{[\s\S]*$/,""):"undefined"==typeof e?"undefined":"string"!=typeof e?JSON.stringify(e):e;c+=f(e)}return new b(c)}}function la(a){if(null==a||Ya(a))return!1;if(I(a)||D(a)||F&&a instanceof
F)return!0;var b="length"in Object(a)&&a.length;return ba(b)&&(0<=b&&(b-1 in a||a instanceof Array)||"function"===typeof a.item)}function q(a,b,d){var c,f;if(a)if(C(a))for(c in a)"prototype"===c||"length"===c||"name"===c||a.hasOwnProperty&&!a.hasOwnProperty(c)||b.call(d,a[c],c,a);else if(I(a)||la(a)){var e="object"!==typeof a;c=0;for(f=a.length;c<f;c++)(e||c in a)&&b.call(d,a[c],c,a)}else if(a.forEach&&a.forEach!==q)a.forEach(b,d,a);else if(xc(a))for(c in a)b.call(d,a[c],c,a);else if("function"===
typeof a.hasOwnProperty)for(c in a)a.hasOwnProperty(c)&&b.call(d,a[c],c,a);else for(c in a)ua.call(a,c)&&b.call(d,a[c],c,a);return a}function yc(a,b,d){for(var c=Object.keys(a).sort(),f=0;f<c.length;f++)b.call(d,a[c[f]],c[f]);return c}function zc(a){return function(b,d){a(d,b)}}function ke(){return++sb}function Rb(a,b,d){for(var c=a.$$hashKey,f=0,e=b.length;f<e;++f){var g=b[f];if(E(g)||C(g))for(var h=Object.keys(g),k=0,l=h.length;k<l;k++){var m=h[k],n=g[m];d&&E(n)?ja(n)?a[m]=new Date(n.valueOf()):
Za(n)?a[m]=new RegExp(n):n.nodeName?a[m]=n.cloneNode(!0):Sb(n)?a[m]=n.clone():(E(a[m])||(a[m]=I(n)?[]:{}),Rb(a[m],[n],!0)):a[m]=n}}c?a.$$hashKey=c:delete a.$$hashKey;return a}function R(a){return Rb(a,va.call(arguments,1),!1)}function le(a){return Rb(a,va.call(arguments,1),!0)}function Z(a){return parseInt(a,10)}function Tb(a,b){return R(Object.create(a),b)}function w(){}function $a(a){return a}function ha(a){return function(){return a}}function Ac(a){return C(a.toString)&&a.toString!==ma}function z(a){return"undefined"===
typeof a}function x(a){return"undefined"!==typeof a}function E(a){return null!==a&&"object"===typeof a}function xc(a){return null!==a&&"object"===typeof a&&!Bc(a)}function D(a){return"string"===typeof a}function ba(a){return"number"===typeof a}function ja(a){return"[object Date]"===ma.call(a)}function C(a){return"function"===typeof a}function Za(a){return"[object RegExp]"===ma.call(a)}function Ya(a){return a&&a.window===a}function ab(a){return a&&a.$evalAsync&&a.$watch}function Ka(a){return"boolean"===
typeof a}function me(a){return a&&ba(a.length)&&ne.test(ma.call(a))}function Sb(a){return!(!a||!(a.nodeName||a.prop&&a.attr&&a.find))}function oe(a){var b={};a=a.split(",");var d;for(d=0;d<a.length;d++)b[a[d]]=!0;return b}function wa(a){return Q(a.nodeName||a[0]&&a[0].nodeName)}function bb(a,b){var d=a.indexOf(b);0<=d&&a.splice(d,1);return d}function sa(a,b){function d(a,b){var d=b.$$hashKey,e;if(I(a)){e=0;for(var f=a.length;e<f;e++)b.push(c(a[e]))}else if(xc(a))for(e in a)b[e]=c(a[e]);else if(a&&
"function"===typeof a.hasOwnProperty)for(e in a)a.hasOwnProperty(e)&&(b[e]=c(a[e]));else for(e in a)ua.call(a,e)&&(b[e]=c(a[e]));d?b.$$hashKey=d:delete b.$$hashKey;return b}function c(a){if(!E(a))return a;var b=e.indexOf(a);if(-1!==b)return g[b];if(Ya(a)||ab(a))throw xa("cpws");var b=!1,c=f(a);void 0===c&&(c=I(a)?[]:Object.create(Bc(a)),b=!0);e.push(a);g.push(c);return b?d(a,c):c}function f(a){switch(ma.call(a)){case "[object Int8Array]":case "[object Int16Array]":case "[object Int32Array]":case "[object Float32Array]":case "[object Float64Array]":case "[object Uint8Array]":case "[object Uint8ClampedArray]":case "[object Uint16Array]":case "[object Uint32Array]":return new a.constructor(c(a.buffer),
a.byteOffset,a.length);case "[object ArrayBuffer]":if(!a.slice){var b=new ArrayBuffer(a.byteLength);(new Uint8Array(b)).set(new Uint8Array(a));return b}return a.slice(0);case "[object Boolean]":case "[object Number]":case "[object String]":case "[object Date]":return new a.constructor(a.valueOf());case "[object RegExp]":return b=new RegExp(a.source,a.toString().match(/[^/]*$/)[0]),b.lastIndex=a.lastIndex,b;case "[object Blob]":return new a.constructor([a],{type:a.type})}if(C(a.cloneNode))return a.cloneNode(!0)}
var e=[],g=[];if(b){if(me(b)||"[object ArrayBuffer]"===ma.call(b))throw xa("cpta");if(a===b)throw xa("cpi");I(b)?b.length=0:q(b,function(a,d){"$$hashKey"!==d&&delete b[d]});e.push(a);g.push(b);return d(a,b)}return c(a)}function na(a,b){if(a===b)return!0;if(null===a||null===b)return!1;if(a!==a&&b!==b)return!0;var d=typeof a,c;if(d===typeof b&&"object"===d)if(I(a)){if(!I(b))return!1;if((d=a.length)===b.length){for(c=0;c<d;c++)if(!na(a[c],b[c]))return!1;return!0}}else{if(ja(a))return ja(b)?na(a.getTime(),
b.getTime()):!1;if(Za(a))return Za(b)?a.toString()===b.toString():!1;if(ab(a)||ab(b)||Ya(a)||Ya(b)||I(b)||ja(b)||Za(b))return!1;d=V();for(c in a)if("$"!==c.charAt(0)&&!C(a[c])){if(!na(a[c],b[c]))return!1;d[c]=!0}for(c in b)if(!(c in d)&&"$"!==c.charAt(0)&&x(b[c])&&!C(b[c]))return!1;return!0}return!1}function cb(a,b,d){return a.concat(va.call(b,d))}function db(a,b){var d=2<arguments.length?va.call(arguments,2):[];return!C(b)||b instanceof RegExp?b:d.length?function(){return arguments.length?b.apply(a,
cb(d,arguments,0)):b.apply(a,d)}:function(){return arguments.length?b.apply(a,arguments):b.call(a)}}function pe(a,b){var d=b;"string"===typeof a&&"$"===a.charAt(0)&&"$"===a.charAt(1)?d=void 0:Ya(b)?d="$WINDOW":b&&y.document===b?d="$DOCUMENT":ab(b)&&(d="$SCOPE");return d}function eb(a,b){if(!z(a))return ba(b)||(b=b?2:null),JSON.stringify(a,pe,b)}function Cc(a){return D(a)?JSON.parse(a):a}function Dc(a,b){a=a.replace(qe,"");var d=Date.parse("Jan 01, 1970 00:00:00 "+a)/6E4;return ia(d)?b:d}function Ub(a,
b,d){d=d?-1:1;var c=a.getTimezoneOffset();b=Dc(b,c);d*=b-c;a=new Date(a.getTime());a.setMinutes(a.getMinutes()+d);return a}function ya(a){a=F(a).clone();try{a.empty()}catch(b){}var d=F("<div>").append(a).html();try{return a[0].nodeType===La?Q(d):d.match(/^(<[^>]+>)/)[1].replace(/^<([\w-]+)/,function(a,b){return"<"+Q(b)})}catch(c){return Q(d)}}function Ec(a){try{return decodeURIComponent(a)}catch(b){}}function Fc(a){var b={};q((a||"").split("&"),function(a){var c,f,e;a&&(f=a=a.replace(/\+/g,"%20"),
c=a.indexOf("="),-1!==c&&(f=a.substring(0,c),e=a.substring(c+1)),f=Ec(f),x(f)&&(e=x(e)?Ec(e):!0,ua.call(b,f)?I(b[f])?b[f].push(e):b[f]=[b[f],e]:b[f]=e))});return b}function Vb(a){var b=[];q(a,function(a,c){I(a)?q(a,function(a){b.push(oa(c,!0)+(!0===a?"":"="+oa(a,!0)))}):b.push(oa(c,!0)+(!0===a?"":"="+oa(a,!0)))});return b.length?b.join("&"):""}function tb(a){return oa(a,!0).replace(/%26/gi,"&").replace(/%3D/gi,"=").replace(/%2B/gi,"+")}function oa(a,b){return encodeURIComponent(a).replace(/%40/gi,
"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%3B/gi,";").replace(/%20/g,b?"%20":"+")}function re(a,b){var d,c,f=Oa.length;for(c=0;c<f;++c)if(d=Oa[c]+b,D(d=a.getAttribute(d)))return d;return null}function se(a,b){var d,c,f={};q(Oa,function(b){b+="app";!d&&a.hasAttribute&&a.hasAttribute(b)&&(d=a,c=a.getAttribute(b))});q(Oa,function(b){b+="app";var f;!d&&(f=a.querySelector("["+b.replace(":","\\:")+"]"))&&(d=f,c=f.getAttribute(b))});d&&(te?(f.strictDi=null!==re(d,"strict-di"),
b(d,c?[c]:[],f)):y.console.error("Angular: disabling automatic bootstrap. <script> protocol indicates an extension, document.location.href does not match."))}function Gc(a,b,d){E(d)||(d={});d=R({strictDi:!1},d);var c=function(){a=F(a);if(a.injector()){var c=a[0]===y.document?"document":ya(a);throw xa("btstrpd",c.replace(/</,"&lt;").replace(/>/,"&gt;"));}b=b||[];b.unshift(["$provide",function(b){b.value("$rootElement",a)}]);d.debugInfoEnabled&&b.push(["$compileProvider",function(a){a.debugInfoEnabled(!0)}]);
b.unshift("ng");c=fb(b,d.strictDi);c.invoke(["$rootScope","$rootElement","$compile","$injector",function(a,b,c,d){a.$apply(function(){b.data("$injector",d);c(b)(a)})}]);return c},f=/^NG_ENABLE_DEBUG_INFO!/,e=/^NG_DEFER_BOOTSTRAP!/;y&&f.test(y.name)&&(d.debugInfoEnabled=!0,y.name=y.name.replace(f,""));if(y&&!e.test(y.name))return c();y.name=y.name.replace(e,"");$.resumeBootstrap=function(a){q(a,function(a){b.push(a)});return c()};C($.resumeDeferredBootstrap)&&$.resumeDeferredBootstrap()}function ue(){y.name=
"NG_ENABLE_DEBUG_INFO!"+y.name;y.location.reload()}function ve(a){a=$.element(a).injector();if(!a)throw xa("test");return a.get("$$testability")}function Hc(a,b){b=b||"_";return a.replace(we,function(a,c){return(c?b:"")+a.toLowerCase()})}function xe(){var a;if(!Ic){var b=ub();(za=z(b)?y.jQuery:b?y[b]:void 0)&&za.fn.on?(F=za,R(za.fn,{scope:Pa.scope,isolateScope:Pa.isolateScope,controller:Pa.controller,injector:Pa.injector,inheritedData:Pa.inheritedData}),a=za.cleanData,za.cleanData=function(b){for(var c,
f=0,e;null!=(e=b[f]);f++)(c=za._data(e,"events"))&&c.$destroy&&za(e).triggerHandler("$destroy");a(b)}):F=W;$.element=F;Ic=!0}}function gb(a,b,d){if(!a)throw xa("areq",b||"?",d||"required");return a}function Qa(a,b,d){d&&I(a)&&(a=a[a.length-1]);gb(C(a),b,"not a function, got "+(a&&"object"===typeof a?a.constructor.name||"Object":typeof a));return a}function Ra(a,b){if("hasOwnProperty"===a)throw xa("badname",b);}function Jc(a,b,d){if(!b)return a;b=b.split(".");for(var c,f=a,e=b.length,g=0;g<e;g++)c=
b[g],a&&(a=(f=a)[c]);return!d&&C(a)?db(f,a):a}function vb(a){for(var b=a[0],d=a[a.length-1],c,f=1;b!==d&&(b=b.nextSibling);f++)if(c||a[f]!==b)c||(c=F(va.call(a,0,f))),c.push(b);return c||a}function V(){return Object.create(null)}function ye(a){function b(a,b,c){return a[b]||(a[b]=c())}var d=G("$injector"),c=G("ng");a=b(a,"angular",Object);a.$$minErr=a.$$minErr||G;return b(a,"module",function(){var a={};return function(e,g,h){if("hasOwnProperty"===e)throw c("badname","module");g&&a.hasOwnProperty(e)&&
(a[e]=null);return b(a,e,function(){function a(b,d,e,f){f||(f=c);return function(){f[e||"push"]([b,d,arguments]);return H}}function b(a,d){return function(b,f){f&&C(f)&&(f.$$moduleName=e);c.push([a,d,arguments]);return H}}if(!g)throw d("nomod",e);var c=[],f=[],r=[],s=a("$injector","invoke","push",f),H={_invokeQueue:c,_configBlocks:f,_runBlocks:r,requires:g,name:e,provider:b("$provide","provider"),factory:b("$provide","factory"),service:b("$provide","service"),value:a("$provide","value"),constant:a("$provide",
"constant","unshift"),decorator:b("$provide","decorator"),animation:b("$animateProvider","register"),filter:b("$filterProvider","register"),controller:b("$controllerProvider","register"),directive:b("$compileProvider","directive"),component:b("$compileProvider","component"),config:s,run:function(a){r.push(a);return this}};h&&s(h);return H})}})}function ka(a,b){if(I(a)){b=b||[];for(var d=0,c=a.length;d<c;d++)b[d]=a[d]}else if(E(a))for(d in b=b||{},a)if("$"!==d.charAt(0)||"$"!==d.charAt(1))b[d]=a[d];
return b||a}function ze(a){R(a,{bootstrap:Gc,copy:sa,extend:R,merge:le,equals:na,element:F,forEach:q,injector:fb,noop:w,bind:db,toJson:eb,fromJson:Cc,identity:$a,isUndefined:z,isDefined:x,isString:D,isFunction:C,isObject:E,isNumber:ba,isElement:Sb,isArray:I,version:Ae,isDate:ja,lowercase:Q,uppercase:wb,callbacks:{$$counter:0},getTestability:ve,$$minErr:G,$$csp:da,reloadWithDebugInfo:ue});Wb=ye(y);Wb("ng",["ngLocale"],["$provide",function(a){a.provider({$$sanitizeUri:Be});a.provider("$compile",Kc).directive({a:Ce,
input:Lc,textarea:Lc,form:De,script:Ee,select:Fe,option:Ge,ngBind:He,ngBindHtml:Ie,ngBindTemplate:Je,ngClass:Ke,ngClassEven:Le,ngClassOdd:Me,ngCloak:Ne,ngController:Oe,ngForm:Pe,ngHide:Qe,ngIf:Re,ngInclude:Se,ngInit:Te,ngNonBindable:Ue,ngPluralize:Ve,ngRepeat:We,ngShow:Xe,ngStyle:Ye,ngSwitch:Ze,ngSwitchWhen:$e,ngSwitchDefault:af,ngOptions:bf,ngTransclude:cf,ngModel:df,ngList:ef,ngChange:ff,pattern:Mc,ngPattern:Mc,required:Nc,ngRequired:Nc,minlength:Oc,ngMinlength:Oc,maxlength:Pc,ngMaxlength:Pc,ngValue:gf,
ngModelOptions:hf}).directive({ngInclude:jf}).directive(xb).directive(Qc);a.provider({$anchorScroll:kf,$animate:lf,$animateCss:mf,$$animateJs:nf,$$animateQueue:of,$$AnimateRunner:pf,$$animateAsyncRun:qf,$browser:rf,$cacheFactory:sf,$controller:tf,$document:uf,$exceptionHandler:vf,$filter:Rc,$$forceReflow:wf,$interpolate:xf,$interval:yf,$http:zf,$httpParamSerializer:Af,$httpParamSerializerJQLike:Bf,$httpBackend:Cf,$xhrFactory:Df,$jsonpCallbacks:Ef,$location:Ff,$log:Gf,$parse:Hf,$rootScope:If,$q:Jf,
$$q:Kf,$sce:Lf,$sceDelegate:Mf,$sniffer:Nf,$templateCache:Of,$templateRequest:Pf,$$testability:Qf,$timeout:Rf,$window:Sf,$$rAF:Tf,$$jqLite:Uf,$$HashMap:Vf,$$cookieReader:Wf})}])}function hb(a){return a.replace(Xf,function(a,d,c,f){return f?c.toUpperCase():c}).replace(Yf,"Moz$1")}function Sc(a){a=a.nodeType;return 1===a||!a||9===a}function Tc(a,b){var d,c,f=b.createDocumentFragment(),e=[];if(Xb.test(a)){d=f.appendChild(b.createElement("div"));c=(Zf.exec(a)||["",""])[1].toLowerCase();c=pa[c]||pa._default;
d.innerHTML=c[1]+a.replace($f,"<$1></$2>")+c[2];for(c=c[0];c--;)d=d.lastChild;e=cb(e,d.childNodes);d=f.firstChild;d.textContent=""}else e.push(b.createTextNode(a));f.textContent="";f.innerHTML="";q(e,function(a){f.appendChild(a)});return f}function Uc(a,b){var d=a.parentNode;d&&d.replaceChild(b,a);b.appendChild(a)}function W(a){if(a instanceof W)return a;var b;D(a)&&(a=Y(a),b=!0);if(!(this instanceof W)){if(b&&"<"!==a.charAt(0))throw Yb("nosel");return new W(a)}if(b){b=y.document;var d;a=(d=ag.exec(a))?
[b.createElement(d[1])]:(d=Tc(a,b))?d.childNodes:[]}Vc(this,a)}function Zb(a){return a.cloneNode(!0)}function yb(a,b){b||ib(a);if(a.querySelectorAll)for(var d=a.querySelectorAll("*"),c=0,f=d.length;c<f;c++)ib(d[c])}function Wc(a,b,d,c){if(x(c))throw Yb("offargs");var f=(c=zb(a))&&c.events,e=c&&c.handle;if(e)if(b){var g=function(b){var c=f[b];x(d)&&bb(c||[],d);x(d)&&c&&0<c.length||(a.removeEventListener(b,e,!1),delete f[b])};q(b.split(" "),function(a){g(a);Ab[a]&&g(Ab[a])})}else for(b in f)"$destroy"!==
b&&a.removeEventListener(b,e,!1),delete f[b]}function ib(a,b){var d=a.ng339,c=d&&jb[d];c&&(b?delete c.data[b]:(c.handle&&(c.events.$destroy&&c.handle({},"$destroy"),Wc(a)),delete jb[d],a.ng339=void 0))}function zb(a,b){var d=a.ng339,d=d&&jb[d];b&&!d&&(a.ng339=d=++bg,d=jb[d]={events:{},data:{},handle:void 0});return d}function $b(a,b,d){if(Sc(a)){var c=x(d),f=!c&&b&&!E(b),e=!b;a=(a=zb(a,!f))&&a.data;if(c)a[b]=d;else{if(e)return a;if(f)return a&&a[b];R(a,b)}}}function Bb(a,b){return a.getAttribute?
-1<(" "+(a.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ").indexOf(" "+b+" "):!1}function Cb(a,b){b&&a.setAttribute&&q(b.split(" "),function(b){a.setAttribute("class",Y((" "+(a.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ").replace(" "+Y(b)+" "," ")))})}function Db(a,b){if(b&&a.setAttribute){var d=(" "+(a.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ");q(b.split(" "),function(a){a=Y(a);-1===d.indexOf(" "+a+" ")&&(d+=a+" ")});a.setAttribute("class",Y(d))}}function Vc(a,b){if(b)if(b.nodeType)a[a.length++]=
b;else{var d=b.length;if("number"===typeof d&&b.window!==b){if(d)for(var c=0;c<d;c++)a[a.length++]=b[c]}else a[a.length++]=b}}function Xc(a,b){return Eb(a,"$"+(b||"ngController")+"Controller")}function Eb(a,b,d){9===a.nodeType&&(a=a.documentElement);for(b=I(b)?b:[b];a;){for(var c=0,f=b.length;c<f;c++)if(x(d=F.data(a,b[c])))return d;a=a.parentNode||11===a.nodeType&&a.host}}function Yc(a){for(yb(a,!0);a.firstChild;)a.removeChild(a.firstChild)}function Fb(a,b){b||yb(a);var d=a.parentNode;d&&d.removeChild(a)}
function cg(a,b){b=b||y;if("complete"===b.document.readyState)b.setTimeout(a);else F(b).on("load",a)}function Zc(a,b){var d=Gb[b.toLowerCase()];return d&&$c[wa(a)]&&d}function dg(a,b){var d=function(c,d){c.isDefaultPrevented=function(){return c.defaultPrevented};var e=b[d||c.type],g=e?e.length:0;if(g){if(z(c.immediatePropagationStopped)){var h=c.stopImmediatePropagation;c.stopImmediatePropagation=function(){c.immediatePropagationStopped=!0;c.stopPropagation&&c.stopPropagation();h&&h.call(c)}}c.isImmediatePropagationStopped=
function(){return!0===c.immediatePropagationStopped};var k=e.specialHandlerWrapper||eg;1<g&&(e=ka(e));for(var l=0;l<g;l++)c.isImmediatePropagationStopped()||k(a,c,e[l])}};d.elem=a;return d}function eg(a,b,d){d.call(a,b)}function fg(a,b,d){var c=b.relatedTarget;c&&(c===a||gg.call(a,c))||d.call(a,b)}function Uf(){this.$get=function(){return R(W,{hasClass:function(a,b){a.attr&&(a=a[0]);return Bb(a,b)},addClass:function(a,b){a.attr&&(a=a[0]);return Db(a,b)},removeClass:function(a,b){a.attr&&(a=a[0]);
return Cb(a,b)}})}}function Aa(a,b){var d=a&&a.$$hashKey;if(d)return"function"===typeof d&&(d=a.$$hashKey()),d;d=typeof a;return d="function"===d||"object"===d&&null!==a?a.$$hashKey=d+":"+(b||ke)():d+":"+a}function Sa(a,b){if(b){var d=0;this.nextUid=function(){return++d}}q(a,this.put,this)}function ad(a){a=(Function.prototype.toString.call(a)+" ").replace(hg,"");return a.match(ig)||a.match(jg)}function kg(a){return(a=ad(a))?"function("+(a[1]||"").replace(/[\s\r\n]+/," ")+")":"fn"}function fb(a,b){function d(a){return function(b,
c){if(E(b))q(b,zc(a));else return a(b,c)}}function c(a,b){Ra(a,"service");if(C(b)||I(b))b=r.instantiate(b);if(!b.$get)throw Ba("pget",a);return n[a+"Provider"]=b}function f(a,b){return function(){var c=u.invoke(b,this);if(z(c))throw Ba("undef",a);return c}}function e(a,b,d){return c(a,{$get:!1!==d?f(a,b):b})}function g(a){gb(z(a)||I(a),"modulesToLoad","not an array");var b=[],c;q(a,function(a){function d(a){var b,c;b=0;for(c=a.length;b<c;b++){var e=a[b],f=r.get(e[0]);f[e[1]].apply(f,e[2])}}if(!m.get(a)){m.put(a,
!0);try{D(a)?(c=Wb(a),b=b.concat(g(c.requires)).concat(c._runBlocks),d(c._invokeQueue),d(c._configBlocks)):C(a)?b.push(r.invoke(a)):I(a)?b.push(r.invoke(a)):Qa(a,"module")}catch(e){throw I(a)&&(a=a[a.length-1]),e.message&&e.stack&&-1===e.stack.indexOf(e.message)&&(e=e.message+"\n"+e.stack),Ba("modulerr",a,e.stack||e.message||e);}}});return b}function h(a,c){function d(b,e){if(a.hasOwnProperty(b)){if(a[b]===k)throw Ba("cdep",b+" <- "+l.join(" <- "));return a[b]}try{return l.unshift(b),a[b]=k,a[b]=
c(b,e),a[b]}catch(f){throw a[b]===k&&delete a[b],f;}finally{l.shift()}}function e(a,c,f){var g=[];a=fb.$$annotate(a,b,f);for(var h=0,k=a.length;h<k;h++){var l=a[h];if("string"!==typeof l)throw Ba("itkn",l);g.push(c&&c.hasOwnProperty(l)?c[l]:d(l,f))}return g}return{invoke:function(a,b,c,d){"string"===typeof c&&(d=c,c=null);c=e(a,c,d);I(a)&&(a=a[a.length-1]);d=11>=Ia?!1:"function"===typeof a&&/^(?:class\b|constructor\()/.test(Function.prototype.toString.call(a)+" ");return d?(c.unshift(null),new (Function.prototype.bind.apply(a,
c))):a.apply(b,c)},instantiate:function(a,b,c){var d=I(a)?a[a.length-1]:a;a=e(a,b,c);a.unshift(null);return new (Function.prototype.bind.apply(d,a))},get:d,annotate:fb.$$annotate,has:function(b){return n.hasOwnProperty(b+"Provider")||a.hasOwnProperty(b)}}}b=!0===b;var k={},l=[],m=new Sa([],!0),n={$provide:{provider:d(c),factory:d(e),service:d(function(a,b){return e(a,["$injector",function(a){return a.instantiate(b)}])}),value:d(function(a,b){return e(a,ha(b),!1)}),constant:d(function(a,b){Ra(a,"constant");
n[a]=b;s[a]=b}),decorator:function(a,b){var c=r.get(a+"Provider"),d=c.$get;c.$get=function(){var a=u.invoke(d,c);return u.invoke(b,null,{$delegate:a})}}}},r=n.$injector=h(n,function(a,b){$.isString(b)&&l.push(b);throw Ba("unpr",l.join(" <- "));}),s={},H=h(s,function(a,b){var c=r.get(a+"Provider",b);return u.invoke(c.$get,c,void 0,a)}),u=H;n.$injectorProvider={$get:ha(H)};var p=g(a),u=H.get("$injector");u.strictDi=b;q(p,function(a){a&&u.invoke(a)});return u}function kf(){var a=!0;this.disableAutoScrolling=
function(){a=!1};this.$get=["$window","$location","$rootScope",function(b,d,c){function f(a){var b=null;Array.prototype.some.call(a,function(a){if("a"===wa(a))return b=a,!0});return b}function e(a){if(a){a.scrollIntoView();var c;c=g.yOffset;C(c)?c=c():Sb(c)?(c=c[0],c="fixed"!==b.getComputedStyle(c).position?0:c.getBoundingClientRect().bottom):ba(c)||(c=0);c&&(a=a.getBoundingClientRect().top,b.scrollBy(0,a-c))}else b.scrollTo(0,0)}function g(a){a=D(a)?a:ba(a)?a.toString():d.hash();var b;a?(b=h.getElementById(a))?
e(b):(b=f(h.getElementsByName(a)))?e(b):"top"===a&&e(null):e(null)}var h=b.document;a&&c.$watch(function(){return d.hash()},function(a,b){a===b&&""===a||cg(function(){c.$evalAsync(g)})});return g}]}function kb(a,b){if(!a&&!b)return"";if(!a)return b;if(!b)return a;I(a)&&(a=a.join(" "));I(b)&&(b=b.join(" "));return a+" "+b}function lg(a){D(a)&&(a=a.split(" "));var b=V();q(a,function(a){a.length&&(b[a]=!0)});return b}function Ca(a){return E(a)?a:{}}function mg(a,b,d,c){function f(a){try{a.apply(null,
va.call(arguments,1))}finally{if(H--,0===H)for(;u.length;)try{u.pop()()}catch(b){d.error(b)}}}function e(){N=null;g();h()}function g(){p=L();p=z(p)?null:p;na(p,J)&&(p=J);J=p}function h(){if(A!==k.url()||K!==p)A=k.url(),K=p,q(O,function(a){a(k.url(),p)})}var k=this,l=a.location,m=a.history,n=a.setTimeout,r=a.clearTimeout,s={};k.isMock=!1;var H=0,u=[];k.$$completeOutstandingRequest=f;k.$$incOutstandingRequestCount=function(){H++};k.notifyWhenNoOutstandingRequests=function(a){0===H?a():u.push(a)};var p,
K,A=l.href,v=b.find("base"),N=null,L=c.history?function(){try{return m.state}catch(a){}}:w;g();K=p;k.url=function(b,d,e){z(e)&&(e=null);l!==a.location&&(l=a.location);m!==a.history&&(m=a.history);if(b){var f=K===e;if(A===b&&(!c.history||f))return k;var h=A&&Ga(A)===Ga(b);A=b;K=e;!c.history||h&&f?(h||(N=b),d?l.replace(b):h?(d=l,e=b.indexOf("#"),e=-1===e?"":b.substr(e),d.hash=e):l.href=b,l.href!==b&&(N=b)):(m[d?"replaceState":"pushState"](e,"",b),g(),K=p);N&&(N=b);return k}return N||l.href.replace(/%27/g,
"'")};k.state=function(){return p};var O=[],M=!1,J=null;k.onUrlChange=function(b){if(!M){if(c.history)F(a).on("popstate",e);F(a).on("hashchange",e);M=!0}O.push(b);return b};k.$$applicationDestroyed=function(){F(a).off("hashchange popstate",e)};k.$$checkUrlChange=h;k.baseHref=function(){var a=v.attr("href");return a?a.replace(/^(https?:)?\/\/[^/]*/,""):""};k.defer=function(a,b){var c;H++;c=n(function(){delete s[c];f(a)},b||0);s[c]=!0;return c};k.defer.cancel=function(a){return s[a]?(delete s[a],r(a),
f(w),!0):!1}}function rf(){this.$get=["$window","$log","$sniffer","$document",function(a,b,d,c){return new mg(a,c,b,d)}]}function sf(){this.$get=function(){function a(a,c){function f(a){a!==n&&(r?r===a&&(r=a.n):r=a,e(a.n,a.p),e(a,n),n=a,n.n=null)}function e(a,b){a!==b&&(a&&(a.p=b),b&&(b.n=a))}if(a in b)throw G("$cacheFactory")("iid",a);var g=0,h=R({},c,{id:a}),k=V(),l=c&&c.capacity||Number.MAX_VALUE,m=V(),n=null,r=null;return b[a]={put:function(a,b){if(!z(b)){if(l<Number.MAX_VALUE){var c=m[a]||(m[a]=
{key:a});f(c)}a in k||g++;k[a]=b;g>l&&this.remove(r.key);return b}},get:function(a){if(l<Number.MAX_VALUE){var b=m[a];if(!b)return;f(b)}return k[a]},remove:function(a){if(l<Number.MAX_VALUE){var b=m[a];if(!b)return;b===n&&(n=b.p);b===r&&(r=b.n);e(b.n,b.p);delete m[a]}a in k&&(delete k[a],g--)},removeAll:function(){k=V();g=0;m=V();n=r=null},destroy:function(){m=h=k=null;delete b[a]},info:function(){return R({},h,{size:g})}}}var b={};a.info=function(){var a={};q(b,function(b,f){a[f]=b.info()});return a};
a.get=function(a){return b[a]};return a}}function Of(){this.$get=["$cacheFactory",function(a){return a("templates")}]}function Kc(a,b){function d(a,b,c){var d=/^\s*([@&<]|=(\*?))(\??)\s*([\w$]*)\s*$/,e=V();q(a,function(a,f){if(a in n)e[f]=n[a];else{var g=a.match(d);if(!g)throw fa("iscp",b,f,a,c?"controller bindings definition":"isolate scope definition");e[f]={mode:g[1][0],collection:"*"===g[2],optional:"?"===g[3],attrName:g[4]||f};g[4]&&(n[a]=e[f])}});return e}function c(a){var b=a.charAt(0);if(!b||
b!==Q(b))throw fa("baddir",a);if(a!==a.trim())throw fa("baddir",a);}function f(a){var b=a.require||a.controller&&a.name;!I(b)&&E(b)&&q(b,function(a,c){var d=a.match(l);a.substring(d[0].length)||(b[c]=d[0]+c)});return b}var e={},g=/^\s*directive:\s*([\w-]+)\s+(.*)$/,h=/(([\w-]+)(?::([^;]+))?;?)/,k=oe("ngSrc,ngSrcset,src,srcset"),l=/^(?:(\^\^?)?(\?)?(\^\^?)?)?/,m=/^(on[a-z]+|formaction)$/,n=V();this.directive=function A(b,d){gb(b,"name");Ra(b,"directive");D(b)?(c(b),gb(d,"directiveFactory"),e.hasOwnProperty(b)||
(e[b]=[],a.factory(b+"Directive",["$injector","$exceptionHandler",function(a,c){var d=[];q(e[b],function(e,g){try{var h=a.invoke(e);C(h)?h={compile:ha(h)}:!h.compile&&h.link&&(h.compile=ha(h.link));h.priority=h.priority||0;h.index=g;h.name=h.name||b;h.require=f(h);var k=h,l=h.restrict;if(l&&(!D(l)||!/[EACM]/.test(l)))throw fa("badrestrict",l,b);k.restrict=l||"EA";h.$$moduleName=e.$$moduleName;d.push(h)}catch(m){c(m)}});return d}])),e[b].push(d)):q(b,zc(A));return this};this.component=function(a,b){function c(a){function e(b){return C(b)||
I(b)?function(c,d){return a.invoke(b,this,{$element:c,$attrs:d})}:b}var f=b.template||b.templateUrl?b.template:"",g={controller:d,controllerAs:ng(b.controller)||b.controllerAs||"$ctrl",template:e(f),templateUrl:e(b.templateUrl),transclude:b.transclude,scope:{},bindToController:b.bindings||{},restrict:"E",require:b.require};q(b,function(a,b){"$"===b.charAt(0)&&(g[b]=a)});return g}var d=b.controller||function(){};q(b,function(a,b){"$"===b.charAt(0)&&(c[b]=a,C(d)&&(d[b]=a))});c.$inject=["$injector"];
return this.directive(a,c)};this.aHrefSanitizationWhitelist=function(a){return x(a)?(b.aHrefSanitizationWhitelist(a),this):b.aHrefSanitizationWhitelist()};this.imgSrcSanitizationWhitelist=function(a){return x(a)?(b.imgSrcSanitizationWhitelist(a),this):b.imgSrcSanitizationWhitelist()};var r=!0;this.debugInfoEnabled=function(a){return x(a)?(r=a,this):r};var s=!0;this.preAssignBindingsEnabled=function(a){return x(a)?(s=a,this):s};var H=10;this.onChangesTtl=function(a){return arguments.length?(H=a,this):
H};var u=!0;this.commentDirectivesEnabled=function(a){return arguments.length?(u=a,this):u};var p=!0;this.cssClassDirectivesEnabled=function(a){return arguments.length?(p=a,this):p};this.$get=["$injector","$interpolate","$exceptionHandler","$templateRequest","$parse","$controller","$rootScope","$sce","$animate","$$sanitizeUri",function(a,b,c,f,n,M,J,B,T,S){function P(){try{if(!--xa)throw da=void 0,fa("infchng",H);J.$apply(function(){for(var a=[],b=0,c=da.length;b<c;++b)try{da[b]()}catch(d){a.push(d)}da=
void 0;if(a.length)throw a;})}finally{xa++}}function t(a,b){if(b){var c=Object.keys(b),d,e,f;d=0;for(e=c.length;d<e;d++)f=c[d],this[f]=b[f]}else this.$attr={};this.$$element=a}function qa(a,b,c){ta.innerHTML="<span "+b+">";b=ta.firstChild.attributes;var d=b[0];b.removeNamedItem(d.name);d.value=c;a.attributes.setNamedItem(d)}function Ja(a,b){try{a.addClass(b)}catch(c){}}function ca(a,b,c,d,e){a instanceof F||(a=F(a));for(var f=/\S+/,g=0,h=a.length;g<h;g++){var k=a[g];k.nodeType===La&&k.nodeValue.match(f)&&
Uc(k,a[g]=y.document.createElement("span"))}var l=Ma(a,b,a,c,d,e);ca.$$addScopeClass(a);var m=null;return function(b,c,d){gb(b,"scope");e&&e.needsNewScope&&(b=b.$parent.$new());d=d||{};var f=d.parentBoundTranscludeFn,g=d.transcludeControllers;d=d.futureParentElement;f&&f.$$boundTransclude&&(f=f.$$boundTransclude);m||(m=(d=d&&d[0])?"foreignobject"!==wa(d)&&ma.call(d).match(/SVG/)?"svg":"html":"html");d="html"!==m?F(ha(m,F("<div>").append(a).html())):c?Pa.clone.call(a):a;if(g)for(var h in g)d.data("$"+
h+"Controller",g[h].instance);ca.$$addScopeInfo(d,b);c&&c(d,b);l&&l(b,d,d,f);return d}}function Ma(a,b,c,d,e,f){function g(a,c,d,e){var f,k,l,m,n,s,A;if(p)for(A=Array(c.length),m=0;m<h.length;m+=3)f=h[m],A[f]=c[f];else A=c;m=0;for(n=h.length;m<n;)k=A[h[m++]],c=h[m++],f=h[m++],c?(c.scope?(l=a.$new(),ca.$$addScopeInfo(F(k),l)):l=a,s=c.transcludeOnThisElement?G(a,c.transclude,e):!c.templateOnThisElement&&e?e:!e&&b?G(a,b):null,c(f,l,k,d,s)):f&&f(a,k.childNodes,void 0,e)}for(var h=[],k,l,m,n,p,s=0;s<a.length;s++){k=
new t;l=cc(a[s],[],k,0===s?d:void 0,e);(f=l.length?W(l,a[s],k,b,c,null,[],[],f):null)&&f.scope&&ca.$$addScopeClass(k.$$element);k=f&&f.terminal||!(m=a[s].childNodes)||!m.length?null:Ma(m,f?(f.transcludeOnThisElement||!f.templateOnThisElement)&&f.transclude:b);if(f||k)h.push(s,f,k),n=!0,p=p||f;f=null}return n?g:null}function G(a,b,c){function d(e,f,g,h,k){e||(e=a.$new(!1,k),e.$$transcluded=!0);return b(e,f,{parentBoundTranscludeFn:c,transcludeControllers:g,futureParentElement:h})}var e=d.$$slots=V(),
f;for(f in b.$$slots)e[f]=b.$$slots[f]?G(a,b.$$slots[f],c):null;return d}function cc(a,b,c,d,e){var f=c.$attr,g;switch(a.nodeType){case 1:g=wa(a);U(b,Da(g),"E",d,e);for(var k,l,m,n,p=a.attributes,s=0,A=p&&p.length;s<A;s++){var r=!1,u=!1;k=p[s];l=k.name;m=Y(k.value);k=Da(l);(n=Ga.test(k))&&(l=l.replace(bd,"").substr(8).replace(/_(.)/g,function(a,b){return b.toUpperCase()}));(k=k.match(Ha))&&Z(k[1])&&(r=l,u=l.substr(0,l.length-5)+"end",l=l.substr(0,l.length-6));k=Da(l.toLowerCase());f[k]=l;if(n||!c.hasOwnProperty(k))c[k]=
m,Zc(a,k)&&(c[k]=!0);pa(a,b,m,k,n);U(b,k,"A",d,e,r,u)}"input"===g&&"hidden"===a.getAttribute("type")&&a.setAttribute("autocomplete","off");if(!Fa)break;f=a.className;E(f)&&(f=f.animVal);if(D(f)&&""!==f)for(;a=h.exec(f);)k=Da(a[2]),U(b,k,"C",d,e)&&(c[k]=Y(a[3])),f=f.substr(a.index+a[0].length);break;case La:if(11===Ia)for(;a.parentNode&&a.nextSibling&&a.nextSibling.nodeType===La;)a.nodeValue+=a.nextSibling.nodeValue,a.parentNode.removeChild(a.nextSibling);ka(b,a.nodeValue);break;case 8:if(!Ea)break;
Ta(a,b,c,d,e)}b.sort(ja);return b}function Ta(a,b,c,d,e){try{var f=g.exec(a.nodeValue);if(f){var h=Da(f[1]);U(b,h,"M",d,e)&&(c[h]=Y(f[2]))}}catch(k){}}function cd(a,b,c){var d=[],e=0;if(b&&a.hasAttribute&&a.hasAttribute(b)){do{if(!a)throw fa("uterdir",b,c);1===a.nodeType&&(a.hasAttribute(b)&&e++,a.hasAttribute(c)&&e--);d.push(a);a=a.nextSibling}while(0<e)}else d.push(a);return F(d)}function dd(a,b,c){return function(d,e,f,g,h){e=cd(e[0],b,c);return a(d,e,f,g,h)}}function dc(a,b,c,d,e,f){var g;return a?
ca(b,c,d,e,f):function(){g||(g=ca(b,c,d,e,f),b=c=f=null);return g.apply(this,arguments)}}function W(a,b,d,e,f,g,h,k,l){function m(a,b,c,d){if(a){c&&(a=dd(a,c,d));a.require=v.require;a.directiveName=S;if(u===v||v.$$isolateScope)a=ra(a,{isolateScope:!0});h.push(a)}if(b){c&&(b=dd(b,c,d));b.require=v.require;b.directiveName=S;if(u===v||v.$$isolateScope)b=ra(b,{isolateScope:!0});k.push(b)}}function n(a,e,f,g,l){function m(a,b,c,d){var e;ab(a)||(d=c,c=b,b=a,a=void 0);H&&(e=J);c||(c=H?P.parent():P);if(d){var f=
l.$$slots[d];if(f)return f(a,b,e,c,qa);if(z(f))throw fa("noslot",d,ya(P));}else return l(a,b,e,c,qa)}var p,v,B,M,T,J,S,P;b===f?(g=d,P=d.$$element):(P=F(f),g=new t(P,d));T=e;u?M=e.$new(!0):A&&(T=e.$parent);l&&(S=m,S.$$boundTransclude=l,S.isSlotFilled=function(a){return!!l.$$slots[a]});r&&(J=ba(P,g,S,r,M,e,u));u&&(ca.$$addScopeInfo(P,M,!0,!(O&&(O===u||O===u.$$originalDirective))),ca.$$addScopeClass(P,!0),M.$$isolateBindings=u.$$isolateBindings,v=la(e,g,M,M.$$isolateBindings,u),v.removeWatches&&M.$on("$destroy",
v.removeWatches));for(p in J){v=r[p];B=J[p];var L=v.$$bindings.bindToController;if(s){B.bindingInfo=L?la(T,g,B.instance,L,v):{};var ac=B();ac!==B.instance&&(B.instance=ac,P.data("$"+v.name+"Controller",ac),B.bindingInfo.removeWatches&&B.bindingInfo.removeWatches(),B.bindingInfo=la(T,g,B.instance,L,v))}else B.instance=B(),P.data("$"+v.name+"Controller",B.instance),B.bindingInfo=la(T,g,B.instance,L,v)}q(r,function(a,b){var c=a.require;a.bindToController&&!I(c)&&E(c)&&R(J[b].instance,X(b,c,P,J))});q(J,
function(a){var b=a.instance;if(C(b.$onChanges))try{b.$onChanges(a.bindingInfo.initialChanges)}catch(d){c(d)}if(C(b.$onInit))try{b.$onInit()}catch(e){c(e)}C(b.$doCheck)&&(T.$watch(function(){b.$doCheck()}),b.$doCheck());C(b.$onDestroy)&&T.$on("$destroy",function(){b.$onDestroy()})});p=0;for(v=h.length;p<v;p++)B=h[p],sa(B,B.isolateScope?M:e,P,g,B.require&&X(B.directiveName,B.require,P,J),S);var qa=e;u&&(u.template||null===u.templateUrl)&&(qa=M);a&&a(qa,f.childNodes,void 0,l);for(p=k.length-1;0<=p;p--)B=
k[p],sa(B,B.isolateScope?M:e,P,g,B.require&&X(B.directiveName,B.require,P,J),S);q(J,function(a){a=a.instance;C(a.$postLink)&&a.$postLink()})}l=l||{};for(var p=-Number.MAX_VALUE,A=l.newScopeDirective,r=l.controllerDirectives,u=l.newIsolateScopeDirective,O=l.templateDirective,M=l.nonTlbTranscludeDirective,T=!1,J=!1,H=l.hasElementTranscludeDirective,B=d.$$element=F(b),v,S,P,L=e,qa,x=!1,Ja=!1,w,y=0,D=a.length;y<D;y++){v=a[y];var Ta=v.$$start,Ma=v.$$end;Ta&&(B=cd(b,Ta,Ma));P=void 0;if(p>v.priority)break;
if(w=v.scope)v.templateUrl||(E(w)?($("new/isolated scope",u||A,v,B),u=v):$("new/isolated scope",u,v,B)),A=A||v;S=v.name;if(!x&&(v.replace&&(v.templateUrl||v.template)||v.transclude&&!v.$$tlb)){for(w=y+1;x=a[w++];)if(x.transclude&&!x.$$tlb||x.replace&&(x.templateUrl||x.template)){Ja=!0;break}x=!0}!v.templateUrl&&v.controller&&(r=r||V(),$("'"+S+"' controller",r[S],v,B),r[S]=v);if(w=v.transclude)if(T=!0,v.$$tlb||($("transclusion",M,v,B),M=v),"element"===w)H=!0,p=v.priority,P=B,B=d.$$element=F(ca.$$createComment(S,
d[S])),b=B[0],ga(f,va.call(P,0),b),P[0].$$parentNode=P[0].parentNode,L=dc(Ja,P,e,p,g&&g.name,{nonTlbTranscludeDirective:M});else{var G=V();P=F(Zb(b)).contents();if(E(w)){P=[];var Q=V(),bc=V();q(w,function(a,b){var c="?"===a.charAt(0);a=c?a.substring(1):a;Q[a]=b;G[b]=null;bc[b]=c});q(B.contents(),function(a){var b=Q[Da(wa(a))];b?(bc[b]=!0,G[b]=G[b]||[],G[b].push(a)):P.push(a)});q(bc,function(a,b){if(!a)throw fa("reqslot",b);});for(var U in G)G[U]&&(G[U]=dc(Ja,G[U],e))}B.empty();L=dc(Ja,P,e,void 0,
void 0,{needsNewScope:v.$$isolateScope||v.$$newScope});L.$$slots=G}if(v.template)if(J=!0,$("template",O,v,B),O=v,w=C(v.template)?v.template(B,d):v.template,w=Ca(w),v.replace){g=v;P=Xb.test(w)?ed(ha(v.templateNamespace,Y(w))):[];b=P[0];if(1!==P.length||1!==b.nodeType)throw fa("tplrt",S,"");ga(f,B,b);D={$attr:{}};w=cc(b,[],D);var og=a.splice(y+1,a.length-(y+1));(u||A)&&aa(w,u,A);a=a.concat(w).concat(og);ea(d,D);D=a.length}else B.html(w);if(v.templateUrl)J=!0,$("template",O,v,B),O=v,v.replace&&(g=v),
n=ia(a.splice(y,a.length-y),B,d,f,T&&L,h,k,{controllerDirectives:r,newScopeDirective:A!==v&&A,newIsolateScopeDirective:u,templateDirective:O,nonTlbTranscludeDirective:M}),D=a.length;else if(v.compile)try{qa=v.compile(B,d,L);var Z=v.$$originalDirective||v;C(qa)?m(null,db(Z,qa),Ta,Ma):qa&&m(db(Z,qa.pre),db(Z,qa.post),Ta,Ma)}catch(da){c(da,ya(B))}v.terminal&&(n.terminal=!0,p=Math.max(p,v.priority))}n.scope=A&&!0===A.scope;n.transcludeOnThisElement=T;n.templateOnThisElement=J;n.transclude=L;l.hasElementTranscludeDirective=
H;return n}function X(a,b,c,d){var e;if(D(b)){var f=b.match(l);b=b.substring(f[0].length);var g=f[1]||f[3],f="?"===f[2];"^^"===g?c=c.parent():e=(e=d&&d[b])&&e.instance;if(!e){var h="$"+b+"Controller";e=g?c.inheritedData(h):c.data(h)}if(!e&&!f)throw fa("ctreq",b,a);}else if(I(b))for(e=[],g=0,f=b.length;g<f;g++)e[g]=X(a,b[g],c,d);else E(b)&&(e={},q(b,function(b,f){e[f]=X(a,b,c,d)}));return e||null}function ba(a,b,c,d,e,f,g){var h=V(),k;for(k in d){var l=d[k],m={$scope:l===g||l.$$isolateScope?e:f,$element:a,
$attrs:b,$transclude:c},n=l.controller;"@"===n&&(n=b[l.name]);m=M(n,m,!0,l.controllerAs);h[l.name]=m;a.data("$"+l.name+"Controller",m.instance)}return h}function aa(a,b,c){for(var d=0,e=a.length;d<e;d++)a[d]=Tb(a[d],{$$isolateScope:b,$$newScope:c})}function U(b,c,f,g,h,k,l){if(c===h)return null;var m=null;if(e.hasOwnProperty(c)){h=a.get(c+"Directive");for(var n=0,p=h.length;n<p;n++)if(c=h[n],(z(g)||g>c.priority)&&-1!==c.restrict.indexOf(f)){k&&(c=Tb(c,{$$start:k,$$end:l}));if(!c.$$bindings){var s=
m=c,r=c.name,v={isolateScope:null,bindToController:null};E(s.scope)&&(!0===s.bindToController?(v.bindToController=d(s.scope,r,!0),v.isolateScope={}):v.isolateScope=d(s.scope,r,!1));E(s.bindToController)&&(v.bindToController=d(s.bindToController,r,!0));if(v.bindToController&&!s.controller)throw fa("noctrl",r);m=m.$$bindings=v;E(m.isolateScope)&&(c.$$isolateBindings=m.isolateScope)}b.push(c);m=c}}return m}function Z(b){if(e.hasOwnProperty(b))for(var c=a.get(b+"Directive"),d=0,f=c.length;d<f;d++)if(b=
c[d],b.multiElement)return!0;return!1}function ea(a,b){var c=b.$attr,d=a.$attr;q(a,function(d,e){"$"!==e.charAt(0)&&(b[e]&&b[e]!==d&&(d+=("style"===e?";":" ")+b[e]),a.$set(e,d,!0,c[e]))});q(b,function(b,e){a.hasOwnProperty(e)||"$"===e.charAt(0)||(a[e]=b,"class"!==e&&"style"!==e&&(d[e]=c[e]))})}function ia(a,b,c,d,e,g,h,k){var l=[],m,n,p=b[0],s=a.shift(),A=Tb(s,{templateUrl:null,transclude:null,replace:null,$$originalDirective:s}),r=C(s.templateUrl)?s.templateUrl(b,c):s.templateUrl,v=s.templateNamespace;
b.empty();f(r).then(function(f){var u,B;f=Ca(f);if(s.replace){f=Xb.test(f)?ed(ha(v,Y(f))):[];u=f[0];if(1!==f.length||1!==u.nodeType)throw fa("tplrt",s.name,r);f={$attr:{}};ga(d,b,u);var O=cc(u,[],f);E(s.scope)&&aa(O,!0);a=O.concat(a);ea(c,f)}else u=p,b.html(f);a.unshift(A);m=W(a,u,c,e,b,s,g,h,k);q(d,function(a,c){a===u&&(d[c]=b[0])});for(n=Ma(b[0].childNodes,e);l.length;){f=l.shift();B=l.shift();var M=l.shift(),T=l.shift(),O=b[0];if(!f.$$destroyed){if(B!==p){var J=B.className;k.hasElementTranscludeDirective&&
s.replace||(O=Zb(u));ga(M,F(B),O);Ja(F(O),J)}B=m.transcludeOnThisElement?G(f,m.transclude,T):T;m(n,f,O,d,B)}}l=null});return function(a,b,c,d,e){a=e;b.$$destroyed||(l?l.push(b,c,d,a):(m.transcludeOnThisElement&&(a=G(b,m.transclude,e)),m(n,b,c,d,a)))}}function ja(a,b){var c=b.priority-a.priority;return 0!==c?c:a.name!==b.name?a.name<b.name?-1:1:a.index-b.index}function $(a,b,c,d){function e(a){return a?" (module: "+a+")":""}if(b)throw fa("multidir",b.name,e(b.$$moduleName),c.name,e(c.$$moduleName),
a,ya(d));}function ka(a,c){var d=b(c,!0);d&&a.push({priority:0,compile:function(a){a=a.parent();var b=!!a.length;b&&ca.$$addBindingClass(a);return function(a,c){var e=c.parent();b||ca.$$addBindingClass(e);ca.$$addBindingInfo(e,d.expressions);a.$watch(d,function(a){c[0].nodeValue=a})}}})}function ha(a,b){a=Q(a||"html");switch(a){case "svg":case "math":var c=y.document.createElement("div");c.innerHTML="<"+a+">"+b+"</"+a+">";return c.childNodes[0].childNodes;default:return b}}function oa(a,b){if("srcdoc"===
b)return B.HTML;var c=wa(a);if("src"===b||"ngSrc"===b){if(-1===["img","video","audio","source","track"].indexOf(c))return B.RESOURCE_URL}else if("xlinkHref"===b||"form"===c&&"action"===b)return B.RESOURCE_URL}function pa(a,c,d,e,f){var g=oa(a,e),h=k[e]||f,l=b(d,!f,g,h);if(l){if("multiple"===e&&"select"===wa(a))throw fa("selmulti",ya(a));c.push({priority:100,compile:function(){return{pre:function(a,c,f){c=f.$$observers||(f.$$observers=V());if(m.test(e))throw fa("nodomevents");var k=f[e];k!==d&&(l=
k&&b(k,!0,g,h),d=k);l&&(f[e]=l(a),(c[e]||(c[e]=[])).$$inter=!0,(f.$$observers&&f.$$observers[e].$$scope||a).$watch(l,function(a,b){"class"===e&&a!==b?f.$updateClass(a,b):f.$set(e,a)}))}}}})}}function ga(a,b,c){var d=b[0],e=b.length,f=d.parentNode,g,h;if(a)for(g=0,h=a.length;g<h;g++)if(a[g]===d){a[g++]=c;h=g+e-1;for(var k=a.length;g<k;g++,h++)h<k?a[g]=a[h]:delete a[g];a.length-=e-1;a.context===d&&(a.context=c);break}f&&f.replaceChild(c,d);a=y.document.createDocumentFragment();for(g=0;g<e;g++)a.appendChild(b[g]);
F.hasData(d)&&(F.data(c,F.data(d)),F(d).off("$destroy"));F.cleanData(a.querySelectorAll("*"));for(g=1;g<e;g++)delete b[g];b[0]=c;b.length=1}function ra(a,b){return R(function(){return a.apply(null,arguments)},a,b)}function sa(a,b,d,e,f,g){try{a(b,d,e,f,g)}catch(h){c(h,ya(d))}}function la(a,c,d,e,f){function g(b,c,e){!C(d.$onChanges)||c===e||c!==c&&e!==e||(da||(a.$$postDigest(P),da=[]),m||(m={},da.push(h)),m[b]&&(e=m[b].previousValue),m[b]=new Hb(e,c))}function h(){d.$onChanges(m);m=void 0}var k=[],
l={},m;q(e,function(e,h){var m=e.attrName,p=e.optional,s,A,r,u;switch(e.mode){case "@":p||ua.call(c,m)||(d[h]=c[m]=void 0);p=c.$observe(m,function(a){if(D(a)||Ka(a))g(h,a,d[h]),d[h]=a});c.$$observers[m].$$scope=a;s=c[m];D(s)?d[h]=b(s)(a):Ka(s)&&(d[h]=s);l[h]=new Hb(ec,d[h]);k.push(p);break;case "=":if(!ua.call(c,m)){if(p)break;c[m]=void 0}if(p&&!c[m])break;A=n(c[m]);u=A.literal?na:function(a,b){return a===b||a!==a&&b!==b};r=A.assign||function(){s=d[h]=A(a);throw fa("nonassign",c[m],m,f.name);};s=
d[h]=A(a);p=function(b){u(b,d[h])||(u(b,s)?r(a,b=d[h]):d[h]=b);return s=b};p.$stateful=!0;p=e.collection?a.$watchCollection(c[m],p):a.$watch(n(c[m],p),null,A.literal);k.push(p);break;case "<":if(!ua.call(c,m)){if(p)break;c[m]=void 0}if(p&&!c[m])break;A=n(c[m]);var B=A.literal,M=d[h]=A(a);l[h]=new Hb(ec,d[h]);p=a.$watch(A,function(a,b){if(b===a){if(b===M||B&&na(b,M))return;b=M}g(h,a,b);d[h]=a},B);k.push(p);break;case "&":A=c.hasOwnProperty(m)?n(c[m]):w;if(A===w&&p)break;d[h]=function(b){return A(a,
b)}}});return{initialChanges:l,removeWatches:k.length&&function(){for(var a=0,b=k.length;a<b;++a)k[a]()}}}var za=/^\w/,ta=y.document.createElement("div"),Ea=u,Fa=p,xa=H,da;t.prototype={$normalize:Da,$addClass:function(a){a&&0<a.length&&T.addClass(this.$$element,a)},$removeClass:function(a){a&&0<a.length&&T.removeClass(this.$$element,a)},$updateClass:function(a,b){var c=fd(a,b);c&&c.length&&T.addClass(this.$$element,c);(c=fd(b,a))&&c.length&&T.removeClass(this.$$element,c)},$set:function(a,b,d,e){var f=
Zc(this.$$element[0],a),g=gd[a],h=a;f?(this.$$element.prop(a,b),e=f):g&&(this[g]=b,h=g);this[a]=b;e?this.$attr[a]=e:(e=this.$attr[a])||(this.$attr[a]=e=Hc(a,"-"));f=wa(this.$$element);if("a"===f&&("href"===a||"xlinkHref"===a)||"img"===f&&"src"===a)this[a]=b=S(b,"src"===a);else if("img"===f&&"srcset"===a&&x(b)){for(var f="",g=Y(b),k=/(\s+\d+x\s*,|\s+\d+w\s*,|\s+,|,\s+)/,k=/\s/.test(g)?k:/(,)/,g=g.split(k),k=Math.floor(g.length/2),l=0;l<k;l++)var m=2*l,f=f+S(Y(g[m]),!0),f=f+(" "+Y(g[m+1]));g=Y(g[2*
l]).split(/\s/);f+=S(Y(g[0]),!0);2===g.length&&(f+=" "+Y(g[1]));this[a]=b=f}!1!==d&&(null===b||z(b)?this.$$element.removeAttr(e):za.test(e)?this.$$element.attr(e,b):qa(this.$$element[0],e,b));(a=this.$$observers)&&q(a[h],function(a){try{a(b)}catch(d){c(d)}})},$observe:function(a,b){var c=this,d=c.$$observers||(c.$$observers=V()),e=d[a]||(d[a]=[]);e.push(b);J.$evalAsync(function(){e.$$inter||!c.hasOwnProperty(a)||z(c[a])||b(c[a])});return function(){bb(e,b)}}};var Aa=b.startSymbol(),Ba=b.endSymbol(),
Ca="{{"===Aa&&"}}"===Ba?$a:function(a){return a.replace(/\{\{/g,Aa).replace(/}}/g,Ba)},Ga=/^ngAttr[A-Z]/,Ha=/^(.+)Start$/;ca.$$addBindingInfo=r?function(a,b){var c=a.data("$binding")||[];I(b)?c=c.concat(b):c.push(b);a.data("$binding",c)}:w;ca.$$addBindingClass=r?function(a){Ja(a,"ng-binding")}:w;ca.$$addScopeInfo=r?function(a,b,c,d){a.data(c?d?"$isolateScopeNoTemplate":"$isolateScope":"$scope",b)}:w;ca.$$addScopeClass=r?function(a,b){Ja(a,b?"ng-isolate-scope":"ng-scope")}:w;ca.$$createComment=function(a,
b){var c="";r&&(c=" "+(a||"")+": ",b&&(c+=b+" "));return y.document.createComment(c)};return ca}]}function Hb(a,b){this.previousValue=a;this.currentValue=b}function Da(a){return hb(a.replace(bd,""))}function fd(a,b){var d="",c=a.split(/\s+/),f=b.split(/\s+/),e=0;a:for(;e<c.length;e++){for(var g=c[e],h=0;h<f.length;h++)if(g===f[h])continue a;d+=(0<d.length?" ":"")+g}return d}function ed(a){a=F(a);var b=a.length;if(1>=b)return a;for(;b--;){var d=a[b];(8===d.nodeType||d.nodeType===La&&""===d.nodeValue.trim())&&
pg.call(a,b,1)}return a}function ng(a,b){if(b&&D(b))return b;if(D(a)){var d=hd.exec(a);if(d)return d[3]}}function tf(){var a={},b=!1;this.has=function(b){return a.hasOwnProperty(b)};this.register=function(b,c){Ra(b,"controller");E(b)?R(a,b):a[b]=c};this.allowGlobals=function(){b=!0};this.$get=["$injector","$window",function(d,c){function f(a,b,c,d){if(!a||!E(a.$scope))throw G("$controller")("noscp",d,b);a.$scope[b]=c}return function(e,g,h,k){var l,m,n;h=!0===h;k&&D(k)&&(n=k);if(D(e)){k=e.match(hd);
if(!k)throw id("ctrlfmt",e);m=k[1];n=n||k[3];e=a.hasOwnProperty(m)?a[m]:Jc(g.$scope,m,!0)||(b?Jc(c,m,!0):void 0);if(!e)throw id("ctrlreg",m);Qa(e,m,!0)}if(h)return h=(I(e)?e[e.length-1]:e).prototype,l=Object.create(h||null),n&&f(g,n,l,m||e.name),R(function(){var a=d.invoke(e,l,g,m);a!==l&&(E(a)||C(a))&&(l=a,n&&f(g,n,l,m||e.name));return l},{instance:l,identifier:n});l=d.instantiate(e,g,m);n&&f(g,n,l,m||e.name);return l}}]}function uf(){this.$get=["$window",function(a){return F(a.document)}]}function vf(){this.$get=
["$log",function(a){return function(b,d){a.error.apply(a,arguments)}}]}function fc(a){return E(a)?ja(a)?a.toISOString():eb(a):a}function Af(){this.$get=function(){return function(a){if(!a)return"";var b=[];yc(a,function(a,c){null===a||z(a)||(I(a)?q(a,function(a){b.push(oa(c)+"="+oa(fc(a)))}):b.push(oa(c)+"="+oa(fc(a))))});return b.join("&")}}}function Bf(){this.$get=function(){return function(a){function b(a,f,e){null===a||z(a)||(I(a)?q(a,function(a,c){b(a,f+"["+(E(a)?c:"")+"]")}):E(a)&&!ja(a)?yc(a,
function(a,c){b(a,f+(e?"":"[")+c+(e?"":"]"))}):d.push(oa(f)+"="+oa(fc(a))))}if(!a)return"";var d=[];b(a,"",!0);return d.join("&")}}}function gc(a,b){if(D(a)){var d=a.replace(qg,"").trim();if(d){var c=b("Content-Type");(c=c&&0===c.indexOf(jd))||(c=(c=d.match(rg))&&sg[c[0]].test(d));c&&(a=Cc(d))}}return a}function kd(a){var b=V(),d;D(a)?q(a.split("\n"),function(a){d=a.indexOf(":");var f=Q(Y(a.substr(0,d)));a=Y(a.substr(d+1));f&&(b[f]=b[f]?b[f]+", "+a:a)}):E(a)&&q(a,function(a,d){var e=Q(d),g=Y(a);e&&
(b[e]=b[e]?b[e]+", "+g:g)});return b}function ld(a){var b;return function(d){b||(b=kd(a));return d?(d=b[Q(d)],void 0===d&&(d=null),d):b}}function md(a,b,d,c){if(C(c))return c(a,b,d);q(c,function(c){a=c(a,b,d)});return a}function zf(){var a=this.defaults={transformResponse:[gc],transformRequest:[function(a){return E(a)&&"[object File]"!==ma.call(a)&&"[object Blob]"!==ma.call(a)&&"[object FormData]"!==ma.call(a)?eb(a):a}],headers:{common:{Accept:"application/json, text/plain, */*"},post:ka(hc),put:ka(hc),
patch:ka(hc)},xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",paramSerializer:"$httpParamSerializer"},b=!1;this.useApplyAsync=function(a){return x(a)?(b=!!a,this):b};var d=!0;this.useLegacyPromiseExtensions=function(a){return x(a)?(d=!!a,this):d};var c=this.interceptors=[];this.$get=["$httpBackend","$$cookieReader","$cacheFactory","$rootScope","$q","$injector",function(f,e,g,h,k,l){function m(b){function c(a,b){for(var d=0,e=b.length;d<e;){var f=b[d++],g=b[d++];a=a.then(f,g)}b.length=0;
return a}function e(a,b){var c,d={};q(a,function(a,e){C(a)?(c=a(b),null!=c&&(d[e]=c)):d[e]=a});return d}function f(a){var b=R({},a);b.data=md(a.data,a.headers,a.status,g.transformResponse);a=a.status;return 200<=a&&300>a?b:k.reject(b)}if(!E(b))throw G("$http")("badreq",b);if(!D(b.url))throw G("$http")("badreq",b.url);var g=R({method:"get",transformRequest:a.transformRequest,transformResponse:a.transformResponse,paramSerializer:a.paramSerializer},b);g.headers=function(b){var c=a.headers,d=R({},b.headers),
f,g,h,c=R({},c.common,c[Q(b.method)]);a:for(f in c){g=Q(f);for(h in d)if(Q(h)===g)continue a;d[f]=c[f]}return e(d,ka(b))}(b);g.method=wb(g.method);g.paramSerializer=D(g.paramSerializer)?l.get(g.paramSerializer):g.paramSerializer;var h=[],m=[],s=k.when(g);q(H,function(a){(a.request||a.requestError)&&h.unshift(a.request,a.requestError);(a.response||a.responseError)&&m.push(a.response,a.responseError)});s=c(s,h);s=s.then(function(b){var c=b.headers,d=md(b.data,ld(c),void 0,b.transformRequest);z(d)&&
q(c,function(a,b){"content-type"===Q(b)&&delete c[b]});z(b.withCredentials)&&!z(a.withCredentials)&&(b.withCredentials=a.withCredentials);return n(b,d).then(f,f)});s=c(s,m);d?(s.success=function(a){Qa(a,"fn");s.then(function(b){a(b.data,b.status,b.headers,g)});return s},s.error=function(a){Qa(a,"fn");s.then(null,function(b){a(b.data,b.status,b.headers,g)});return s}):(s.success=nd("success"),s.error=nd("error"));return s}function n(c,d){function g(a){if(a){var c={};q(a,function(a,d){c[d]=function(c){function d(){a(c)}
b?h.$applyAsync(d):h.$$phase?d():h.$apply(d)}});return c}}function l(a,c,d,e){function f(){n(c,a,d,e)}J&&(200<=a&&300>a?J.put(S,[a,c,kd(d),e]):J.remove(S));b?h.$applyAsync(f):(f(),h.$$phase||h.$apply())}function n(a,b,d,e){b=-1<=b?b:0;(200<=b&&300>b?O.resolve:O.reject)({data:a,status:b,headers:ld(d),config:c,statusText:e})}function H(a){n(a.data,a.status,ka(a.headers()),a.statusText)}function L(){var a=m.pendingRequests.indexOf(c);-1!==a&&m.pendingRequests.splice(a,1)}var O=k.defer(),M=O.promise,
J,B,T=c.headers,S=r(c.url,c.paramSerializer(c.params));m.pendingRequests.push(c);M.then(L,L);!c.cache&&!a.cache||!1===c.cache||"GET"!==c.method&&"JSONP"!==c.method||(J=E(c.cache)?c.cache:E(a.cache)?a.cache:s);J&&(B=J.get(S),x(B)?B&&C(B.then)?B.then(H,H):I(B)?n(B[1],B[0],ka(B[2]),B[3]):n(B,200,{},"OK"):J.put(S,M));z(B)&&((B=od(c.url)?e()[c.xsrfCookieName||a.xsrfCookieName]:void 0)&&(T[c.xsrfHeaderName||a.xsrfHeaderName]=B),f(c.method,S,d,l,T,c.timeout,c.withCredentials,c.responseType,g(c.eventHandlers),
g(c.uploadEventHandlers)));return M}function r(a,b){0<b.length&&(a+=(-1===a.indexOf("?")?"?":"&")+b);return a}var s=g("$http");a.paramSerializer=D(a.paramSerializer)?l.get(a.paramSerializer):a.paramSerializer;var H=[];q(c,function(a){H.unshift(D(a)?l.get(a):l.invoke(a))});m.pendingRequests=[];(function(a){q(arguments,function(a){m[a]=function(b,c){return m(R({},c||{},{method:a,url:b}))}})})("get","delete","head","jsonp");(function(a){q(arguments,function(a){m[a]=function(b,c,d){return m(R({},d||{},
{method:a,url:b,data:c}))}})})("post","put","patch");m.defaults=a;return m}]}function Df(){this.$get=function(){return function(){return new y.XMLHttpRequest}}}function Cf(){this.$get=["$browser","$jsonpCallbacks","$document","$xhrFactory",function(a,b,d,c){return tg(a,c,a.defer,b,d[0])}]}function tg(a,b,d,c,f){function e(a,b,d){a=a.replace("JSON_CALLBACK",b);var e=f.createElement("script"),m=null;e.type="text/javascript";e.src=a;e.async=!0;m=function(a){e.removeEventListener("load",m,!1);e.removeEventListener("error",
m,!1);f.body.removeChild(e);e=null;var g=-1,s="unknown";a&&("load"!==a.type||c.wasCalled(b)||(a={type:"error"}),s=a.type,g="error"===a.type?404:200);d&&d(g,s)};e.addEventListener("load",m,!1);e.addEventListener("error",m,!1);f.body.appendChild(e);return m}return function(f,h,k,l,m,n,r,s,H,u){function p(){v&&v();N&&N.abort()}function K(b,c,e,f,g){x(O)&&d.cancel(O);v=N=null;b(c,e,f,g);a.$$completeOutstandingRequest(w)}a.$$incOutstandingRequestCount();h=h||a.url();if("jsonp"===Q(f))var A=c.createCallback(h),
v=e(h,A,function(a,b){var d=200===a&&c.getResponse(A);K(l,a,d,"",b);c.removeCallback(A)});else{var N=b(f,h);N.open(f,h,!0);q(m,function(a,b){x(a)&&N.setRequestHeader(b,a)});N.onload=function(){var a=N.statusText||"",b="response"in N?N.response:N.responseText,c=1223===N.status?204:N.status;0===c&&(c=b?200:"file"===ta(h).protocol?404:0);K(l,c,b,N.getAllResponseHeaders(),a)};f=function(){K(l,-1,null,null,"")};N.onerror=f;N.onabort=f;N.ontimeout=f;q(H,function(a,b){N.addEventListener(b,a)});q(u,function(a,
b){N.upload.addEventListener(b,a)});r&&(N.withCredentials=!0);if(s)try{N.responseType=s}catch(L){if("json"!==s)throw L;}N.send(z(k)?null:k)}if(0<n)var O=d(p,n);else n&&C(n.then)&&n.then(p)}}function xf(){var a="{{",b="}}";this.startSymbol=function(b){return b?(a=b,this):a};this.endSymbol=function(a){return a?(b=a,this):b};this.$get=["$parse","$exceptionHandler","$sce",function(d,c,f){function e(a){return"\\\\\\"+a}function g(c){return c.replace(n,a).replace(r,b)}function h(a,b,c,d){var e=a.$watch(function(a){e();
return d(a)},b,c);return e}function k(e,k,n,p){function r(a){try{var b=a;a=n?f.getTrusted(n,b):f.valueOf(b);var d;if(p&&!x(a))d=a;else if(null==a)d="";else{switch(typeof a){case "string":break;case "number":a=""+a;break;default:a=eb(a)}d=a}return d}catch(g){c(Ha.interr(e,g))}}if(!e.length||-1===e.indexOf(a)){var A;k||(k=g(e),A=ha(k),A.exp=e,A.expressions=[],A.$$watchDelegate=h);return A}p=!!p;var v,q,L=0,O=[],M=[];A=e.length;for(var J=[],B=[];L<A;)if(-1!==(v=e.indexOf(a,L))&&-1!==(q=e.indexOf(b,v+
l)))L!==v&&J.push(g(e.substring(L,v))),L=e.substring(v+l,q),O.push(L),M.push(d(L,r)),L=q+m,B.push(J.length),J.push("");else{L!==A&&J.push(g(e.substring(L)));break}n&&1<J.length&&Ha.throwNoconcat(e);if(!k||O.length){var T=function(a){for(var b=0,c=O.length;b<c;b++){if(p&&z(a[b]))return;J[B[b]]=a[b]}return J.join("")};return R(function(a){var b=0,d=O.length,f=Array(d);try{for(;b<d;b++)f[b]=M[b](a);return T(f)}catch(g){c(Ha.interr(e,g))}},{exp:e,expressions:O,$$watchDelegate:function(a,b){var c;return a.$watchGroup(M,
function(d,e){var f=T(d);C(b)&&b.call(this,f,d!==e?c:f,a);c=f})}})}}var l=a.length,m=b.length,n=new RegExp(a.replace(/./g,e),"g"),r=new RegExp(b.replace(/./g,e),"g");k.startSymbol=function(){return a};k.endSymbol=function(){return b};return k}]}function yf(){this.$get=["$rootScope","$window","$q","$$q","$browser",function(a,b,d,c,f){function e(e,k,l,m){function n(){r?e.apply(null,s):e(p)}var r=4<arguments.length,s=r?va.call(arguments,4):[],H=b.setInterval,u=b.clearInterval,p=0,K=x(m)&&!m,A=(K?c:d).defer(),
v=A.promise;l=x(l)?l:0;v.$$intervalId=H(function(){K?f.defer(n):a.$evalAsync(n);A.notify(p++);0<l&&p>=l&&(A.resolve(p),u(v.$$intervalId),delete g[v.$$intervalId]);K||a.$apply()},k);g[v.$$intervalId]=A;return v}var g={};e.cancel=function(a){return a&&a.$$intervalId in g?(g[a.$$intervalId].reject("canceled"),b.clearInterval(a.$$intervalId),delete g[a.$$intervalId],!0):!1};return e}]}function ic(a){a=a.split("/");for(var b=a.length;b--;)a[b]=tb(a[b]);return a.join("/")}function pd(a,b){var d=ta(a);b.$$protocol=
d.protocol;b.$$host=d.hostname;b.$$port=Z(d.port)||ug[d.protocol]||null}function qd(a,b){if(vg.test(a))throw lb("badpath",a);var d="/"!==a.charAt(0);d&&(a="/"+a);var c=ta(a);b.$$path=decodeURIComponent(d&&"/"===c.pathname.charAt(0)?c.pathname.substring(1):c.pathname);b.$$search=Fc(c.search);b.$$hash=decodeURIComponent(c.hash);b.$$path&&"/"!==b.$$path.charAt(0)&&(b.$$path="/"+b.$$path)}function ra(a,b){if(b.slice(0,a.length)===a)return b.substr(a.length)}function Ga(a){var b=a.indexOf("#");return-1===
b?a:a.substr(0,b)}function mb(a){return a.replace(/(#.+)|#$/,"$1")}function jc(a,b,d){this.$$html5=!0;d=d||"";pd(a,this);this.$$parse=function(a){var d=ra(b,a);if(!D(d))throw lb("ipthprfx",a,b);qd(d,this);this.$$path||(this.$$path="/");this.$$compose()};this.$$compose=function(){var a=Vb(this.$$search),d=this.$$hash?"#"+tb(this.$$hash):"";this.$$url=ic(this.$$path)+(a?"?"+a:"")+d;this.$$absUrl=b+this.$$url.substr(1)};this.$$parseLinkUrl=function(c,f){if(f&&"#"===f[0])return this.hash(f.slice(1)),
!0;var e,g;x(e=ra(a,c))?(g=e,g=d&&x(e=ra(d,e))?b+(ra("/",e)||e):a+g):x(e=ra(b,c))?g=b+e:b===c+"/"&&(g=b);g&&this.$$parse(g);return!!g}}function kc(a,b,d){pd(a,this);this.$$parse=function(c){var f=ra(a,c)||ra(b,c),e;z(f)||"#"!==f.charAt(0)?this.$$html5?e=f:(e="",z(f)&&(a=c,this.replace())):(e=ra(d,f),z(e)&&(e=f));qd(e,this);c=this.$$path;var f=a,g=/^\/[A-Z]:(\/.*)/;e.slice(0,f.length)===f&&(e=e.replace(f,""));g.exec(e)||(c=(e=g.exec(c))?e[1]:c);this.$$path=c;this.$$compose()};this.$$compose=function(){var b=
Vb(this.$$search),f=this.$$hash?"#"+tb(this.$$hash):"";this.$$url=ic(this.$$path)+(b?"?"+b:"")+f;this.$$absUrl=a+(this.$$url?d+this.$$url:"")};this.$$parseLinkUrl=function(b,d){return Ga(a)===Ga(b)?(this.$$parse(b),!0):!1}}function rd(a,b,d){this.$$html5=!0;kc.apply(this,arguments);this.$$parseLinkUrl=function(c,f){if(f&&"#"===f[0])return this.hash(f.slice(1)),!0;var e,g;a===Ga(c)?e=c:(g=ra(b,c))?e=a+d+g:b===c+"/"&&(e=b);e&&this.$$parse(e);return!!e};this.$$compose=function(){var b=Vb(this.$$search),
f=this.$$hash?"#"+tb(this.$$hash):"";this.$$url=ic(this.$$path)+(b?"?"+b:"")+f;this.$$absUrl=a+d+this.$$url}}function Ib(a){return function(){return this[a]}}function sd(a,b){return function(d){if(z(d))return this[a];this[a]=b(d);this.$$compose();return this}}function Ff(){var a="",b={enabled:!1,requireBase:!0,rewriteLinks:!0};this.hashPrefix=function(b){return x(b)?(a=b,this):a};this.html5Mode=function(a){if(Ka(a))return b.enabled=a,this;if(E(a)){Ka(a.enabled)&&(b.enabled=a.enabled);Ka(a.requireBase)&&
(b.requireBase=a.requireBase);if(Ka(a.rewriteLinks)||D(a.rewriteLinks))b.rewriteLinks=a.rewriteLinks;return this}return b};this.$get=["$rootScope","$browser","$sniffer","$rootElement","$window",function(d,c,f,e,g){function h(a,b,d){var e=l.url(),f=l.$$state;try{c.url(a,b,d),l.$$state=c.state()}catch(g){throw l.url(e),l.$$state=f,g;}}function k(a,b){d.$broadcast("$locationChangeSuccess",l.absUrl(),a,l.$$state,b)}var l,m;m=c.baseHref();var n=c.url(),r;if(b.enabled){if(!m&&b.requireBase)throw lb("nobase");
r=n.substring(0,n.indexOf("/",n.indexOf("//")+2))+(m||"/");m=f.history?jc:rd}else r=Ga(n),m=kc;var s=r.substr(0,Ga(r).lastIndexOf("/")+1);l=new m(r,s,"#"+a);l.$$parseLinkUrl(n,n);l.$$state=c.state();var H=/^\s*(javascript|mailto):/i;e.on("click",function(a){var f=b.rewriteLinks;if(f&&!a.ctrlKey&&!a.metaKey&&!a.shiftKey&&2!==a.which&&2!==a.button){for(var h=F(a.target);"a"!==wa(h[0]);)if(h[0]===e[0]||!(h=h.parent())[0])return;if(!D(f)||!z(h.attr(f))){var f=h.prop("href"),k=h.attr("href")||h.attr("xlink:href");
E(f)&&"[object SVGAnimatedString]"===f.toString()&&(f=ta(f.animVal).href);H.test(f)||!f||h.attr("target")||a.isDefaultPrevented()||!l.$$parseLinkUrl(f,k)||(a.preventDefault(),l.absUrl()!==c.url()&&(d.$apply(),g.angular["ff-684208-preventDefault"]=!0))}}});mb(l.absUrl())!==mb(n)&&c.url(l.absUrl(),!0);var u=!0;c.onUrlChange(function(a,b){z(ra(s,a))?g.location.href=a:(d.$evalAsync(function(){var c=l.absUrl(),e=l.$$state,f;a=mb(a);l.$$parse(a);l.$$state=b;f=d.$broadcast("$locationChangeStart",a,c,b,e).defaultPrevented;
l.absUrl()===a&&(f?(l.$$parse(c),l.$$state=e,h(c,!1,e)):(u=!1,k(c,e)))}),d.$$phase||d.$digest())});d.$watch(function(){var a=mb(c.url()),b=mb(l.absUrl()),e=c.state(),g=l.$$replace,m=a!==b||l.$$html5&&f.history&&e!==l.$$state;if(u||m)u=!1,d.$evalAsync(function(){var b=l.absUrl(),c=d.$broadcast("$locationChangeStart",b,a,l.$$state,e).defaultPrevented;l.absUrl()===b&&(c?(l.$$parse(a),l.$$state=e):(m&&h(b,g,e===l.$$state?null:l.$$state),k(a,e)))});l.$$replace=!1});return l}]}function Gf(){var a=!0,b=
this;this.debugEnabled=function(b){return x(b)?(a=b,this):a};this.$get=["$window",function(d){function c(a){a instanceof Error&&(a.stack?a=a.message&&-1===a.stack.indexOf(a.message)?"Error: "+a.message+"\n"+a.stack:a.stack:a.sourceURL&&(a=a.message+"\n"+a.sourceURL+":"+a.line));return a}function f(a){var b=d.console||{},f=b[a]||b.log||w;a=!1;try{a=!!f.apply}catch(k){}return a?function(){var a=[];q(arguments,function(b){a.push(c(b))});return f.apply(b,a)}:function(a,b){f(a,null==b?"":b)}}return{log:f("log"),
info:f("info"),warn:f("warn"),error:f("error"),debug:function(){var c=f("debug");return function(){a&&c.apply(b,arguments)}}()}}]}function Ua(a,b){if("__defineGetter__"===a||"__defineSetter__"===a||"__lookupGetter__"===a||"__lookupSetter__"===a||"__proto__"===a)throw ea("isecfld",b);return a}function wg(a){return a+""}function Ea(a,b){if(a){if(a.constructor===a)throw ea("isecfn",b);if(a.window===a)throw ea("isecwindow",b);if(a.children&&(a.nodeName||a.prop&&a.attr&&a.find))throw ea("isecdom",b);if(a===
Object)throw ea("isecobj",b);}return a}function td(a,b){if(a){if(a.constructor===a)throw ea("isecfn",b);if(a===xg||a===yg||a===zg)throw ea("isecff",b);}}function Jb(a,b){if(a&&(a===ud||a===vd||a===wd||a===xd||a===yd||a===zd||a===Ag||a===Bg||a===Kb||a===Cg||a===Ad||a===Dg))throw ea("isecaf",b);}function Eg(a,b){return"undefined"!==typeof a?a:b}function Bd(a,b){return"undefined"===typeof a?b:"undefined"===typeof b?a:a+b}function X(a,b){var d,c,f;switch(a.type){case t.Program:d=!0;q(a.body,function(a){X(a.expression,
b);d=d&&a.expression.constant});a.constant=d;break;case t.Literal:a.constant=!0;a.toWatch=[];break;case t.UnaryExpression:X(a.argument,b);a.constant=a.argument.constant;a.toWatch=a.argument.toWatch;break;case t.BinaryExpression:X(a.left,b);X(a.right,b);a.constant=a.left.constant&&a.right.constant;a.toWatch=a.left.toWatch.concat(a.right.toWatch);break;case t.LogicalExpression:X(a.left,b);X(a.right,b);a.constant=a.left.constant&&a.right.constant;a.toWatch=a.constant?[]:[a];break;case t.ConditionalExpression:X(a.test,
b);X(a.alternate,b);X(a.consequent,b);a.constant=a.test.constant&&a.alternate.constant&&a.consequent.constant;a.toWatch=a.constant?[]:[a];break;case t.Identifier:a.constant=!1;a.toWatch=[a];break;case t.MemberExpression:X(a.object,b);a.computed&&X(a.property,b);a.constant=a.object.constant&&(!a.computed||a.property.constant);a.toWatch=[a];break;case t.CallExpression:d=f=a.filter?!b(a.callee.name).$stateful:!1;c=[];q(a.arguments,function(a){X(a,b);d=d&&a.constant;a.constant||c.push.apply(c,a.toWatch)});
a.constant=d;a.toWatch=f?c:[a];break;case t.AssignmentExpression:X(a.left,b);X(a.right,b);a.constant=a.left.constant&&a.right.constant;a.toWatch=[a];break;case t.ArrayExpression:d=!0;c=[];q(a.elements,function(a){X(a,b);d=d&&a.constant;a.constant||c.push.apply(c,a.toWatch)});a.constant=d;a.toWatch=c;break;case t.ObjectExpression:d=!0;c=[];q(a.properties,function(a){X(a.value,b);d=d&&a.value.constant&&!a.computed;a.value.constant||c.push.apply(c,a.value.toWatch)});a.constant=d;a.toWatch=c;break;case t.ThisExpression:a.constant=
!1;a.toWatch=[];break;case t.LocalsExpression:a.constant=!1,a.toWatch=[]}}function Cd(a){if(1===a.length){a=a[0].expression;var b=a.toWatch;return 1!==b.length?b:b[0]!==a?b:void 0}}function Dd(a){return a.type===t.Identifier||a.type===t.MemberExpression}function Ed(a){if(1===a.body.length&&Dd(a.body[0].expression))return{type:t.AssignmentExpression,left:a.body[0].expression,right:{type:t.NGValueParameter},operator:"="}}function Fd(a){return 0===a.body.length||1===a.body.length&&(a.body[0].expression.type===
t.Literal||a.body[0].expression.type===t.ArrayExpression||a.body[0].expression.type===t.ObjectExpression)}function Gd(a,b){this.astBuilder=a;this.$filter=b}function Hd(a,b){this.astBuilder=a;this.$filter=b}function Lb(a){return"constructor"===a}function lc(a){return C(a.valueOf)?a.valueOf():Fg.call(a)}function Hf(){var a=V(),b=V(),d={"true":!0,"false":!1,"null":null,undefined:void 0},c,f;this.addLiteral=function(a,b){d[a]=b};this.setIdentifierFns=function(a,b){c=a;f=b;return this};this.$get=["$filter",
function(e){function g(c,d,f){var g,k,H;f=f||K;switch(typeof c){case "string":H=c=c.trim();var q=f?b:a;g=q[H];if(!g){":"===c.charAt(0)&&":"===c.charAt(1)&&(k=!0,c=c.substring(2));g=f?p:u;var B=new mc(g);g=(new nc(B,e,g)).parse(c);g.constant?g.$$watchDelegate=r:k?g.$$watchDelegate=g.literal?n:m:g.inputs&&(g.$$watchDelegate=l);f&&(g=h(g));q[H]=g}return s(g,d);case "function":return s(c,d);default:return s(w,d)}}function h(a){function b(c,d,e,f){var g=K;K=!0;try{return a(c,d,e,f)}finally{K=g}}if(!a)return a;
b.$$watchDelegate=a.$$watchDelegate;b.assign=h(a.assign);b.constant=a.constant;b.literal=a.literal;for(var c=0;a.inputs&&c<a.inputs.length;++c)a.inputs[c]=h(a.inputs[c]);b.inputs=a.inputs;return b}function k(a,b){return null==a||null==b?a===b:"object"===typeof a&&(a=lc(a),"object"===typeof a)?!1:a===b||a!==a&&b!==b}function l(a,b,c,d,e){var f=d.inputs,g;if(1===f.length){var h=k,f=f[0];return a.$watch(function(a){var b=f(a);k(b,h)||(g=d(a,void 0,void 0,[b]),h=b&&lc(b));return g},b,c,e)}for(var l=[],
m=[],n=0,s=f.length;n<s;n++)l[n]=k,m[n]=null;return a.$watch(function(a){for(var b=!1,c=0,e=f.length;c<e;c++){var h=f[c](a);if(b||(b=!k(h,l[c])))m[c]=h,l[c]=h&&lc(h)}b&&(g=d(a,void 0,void 0,m));return g},b,c,e)}function m(a,b,c,d){var e,f;return e=a.$watch(function(a){return d(a)},function(a,c,d){f=a;C(b)&&b.apply(this,arguments);x(a)&&d.$$postDigest(function(){x(f)&&e()})},c)}function n(a,b,c,d){function e(a){var b=!0;q(a,function(a){x(a)||(b=!1)});return b}var f,g;return f=a.$watch(function(a){return d(a)},
function(a,c,d){g=a;C(b)&&b.call(this,a,c,d);e(a)&&d.$$postDigest(function(){e(g)&&f()})},c)}function r(a,b,c,d){var e=a.$watch(function(a){e();return d(a)},b,c);return e}function s(a,b){if(!b)return a;var c=a.$$watchDelegate,d=!1,c=c!==n&&c!==m?function(c,e,f,g){f=d&&g?g[0]:a(c,e,f,g);return b(f,c,e)}:function(c,d,e,f){e=a(c,d,e,f);c=b(e,c,d);return x(e)?c:e};a.$$watchDelegate&&a.$$watchDelegate!==l?c.$$watchDelegate=a.$$watchDelegate:b.$stateful||(c.$$watchDelegate=l,d=!a.inputs,c.inputs=a.inputs?
a.inputs:[a]);return c}var H=da().noUnsafeEval,u={csp:H,expensiveChecks:!1,literals:sa(d),isIdentifierStart:C(c)&&c,isIdentifierContinue:C(f)&&f},p={csp:H,expensiveChecks:!0,literals:sa(d),isIdentifierStart:C(c)&&c,isIdentifierContinue:C(f)&&f},K=!1;g.$$runningExpensiveChecks=function(){return K};return g}]}function Jf(){this.$get=["$rootScope","$exceptionHandler",function(a,b){return Id(function(b){a.$evalAsync(b)},b)}]}function Kf(){this.$get=["$browser","$exceptionHandler",function(a,b){return Id(function(b){a.defer(b)},
b)}]}function Id(a,b){function d(){var a=new g;a.resolve=f(a,a.resolve);a.reject=f(a,a.reject);a.notify=f(a,a.notify);return a}function c(){this.$$state={status:0}}function f(a,b){return function(c){b.call(a,c)}}function e(c){!c.processScheduled&&c.pending&&(c.processScheduled=!0,a(function(){var a,d,e;e=c.pending;c.processScheduled=!1;c.pending=void 0;for(var f=0,g=e.length;f<g;++f){d=e[f][0];a=e[f][c.status];try{C(a)?d.resolve(a(c.value)):1===c.status?d.resolve(c.value):d.reject(c.value)}catch(h){d.reject(h),
b(h)}}}))}function g(){this.promise=new c}function h(a){var b=new g;b.reject(a);return b.promise}function k(a,b,c){var d=null;try{C(c)&&(d=c())}catch(e){return h(e)}return d&&C(d.then)?d.then(function(){return b(a)},h):b(a)}function l(a,b,c,d){var e=new g;e.resolve(a);return e.promise.then(b,c,d)}function m(a){if(!C(a))throw n("norslvr",a);var b=new g;a(function(a){b.resolve(a)},function(a){b.reject(a)});return b.promise}var n=G("$q",TypeError);R(c.prototype,{then:function(a,b,c){if(z(a)&&z(b)&&z(c))return this;
var d=new g;this.$$state.pending=this.$$state.pending||[];this.$$state.pending.push([d,a,b,c]);0<this.$$state.status&&e(this.$$state);return d.promise},"catch":function(a){return this.then(null,a)},"finally":function(a,b){return this.then(function(b){return k(b,r,a)},function(b){return k(b,h,a)},b)}});R(g.prototype,{resolve:function(a){this.promise.$$state.status||(a===this.promise?this.$$reject(n("qcycle",a)):this.$$resolve(a))},$$resolve:function(a){function c(a){k||(k=!0,h.$$resolve(a))}function d(a){k||
(k=!0,h.$$reject(a))}var g,h=this,k=!1;try{if(E(a)||C(a))g=a&&a.then;C(g)?(this.promise.$$state.status=-1,g.call(a,c,d,f(this,this.notify))):(this.promise.$$state.value=a,this.promise.$$state.status=1,e(this.promise.$$state))}catch(l){d(l),b(l)}},reject:function(a){this.promise.$$state.status||this.$$reject(a)},$$reject:function(a){this.promise.$$state.value=a;this.promise.$$state.status=2;e(this.promise.$$state)},notify:function(c){var d=this.promise.$$state.pending;0>=this.promise.$$state.status&&
d&&d.length&&a(function(){for(var a,e,f=0,g=d.length;f<g;f++){e=d[f][0];a=d[f][3];try{e.notify(C(a)?a(c):c)}catch(h){b(h)}}})}});var r=l;m.prototype=c.prototype;m.defer=d;m.reject=h;m.when=l;m.resolve=r;m.all=function(a){var b=new g,c=0,d=I(a)?[]:{};q(a,function(a,e){c++;l(a).then(function(a){d[e]=a;--c||b.resolve(d)},function(a){b.reject(a)})});0===c&&b.resolve(d);return b.promise};m.race=function(a){var b=d();q(a,function(a){l(a).then(b.resolve,b.reject)});return b.promise};return m}function Tf(){this.$get=
["$window","$timeout",function(a,b){var d=a.requestAnimationFrame||a.webkitRequestAnimationFrame,c=a.cancelAnimationFrame||a.webkitCancelAnimationFrame||a.webkitCancelRequestAnimationFrame,f=!!d,e=f?function(a){var b=d(a);return function(){c(b)}}:function(a){var c=b(a,16.66,!1);return function(){b.cancel(c)}};e.supported=f;return e}]}function If(){function a(a){function b(){this.$$watchers=this.$$nextSibling=this.$$childHead=this.$$childTail=null;this.$$listeners={};this.$$listenerCount={};this.$$watchersCount=
0;this.$id=++sb;this.$$ChildScope=null}b.prototype=a;return b}var b=10,d=G("$rootScope"),c=null,f=null;this.digestTtl=function(a){arguments.length&&(b=a);return b};this.$get=["$exceptionHandler","$parse","$browser",function(e,g,h){function k(a){a.currentScope.$$destroyed=!0}function l(a){9===Ia&&(a.$$childHead&&l(a.$$childHead),a.$$nextSibling&&l(a.$$nextSibling));a.$parent=a.$$nextSibling=a.$$prevSibling=a.$$childHead=a.$$childTail=a.$root=a.$$watchers=null}function m(){this.$id=++sb;this.$$phase=
this.$parent=this.$$watchers=this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=null;this.$root=this;this.$$destroyed=!1;this.$$listeners={};this.$$listenerCount={};this.$$watchersCount=0;this.$$isolateBindings=null}function n(a){if(K.$$phase)throw d("inprog",K.$$phase);K.$$phase=a}function r(a,b){do a.$$watchersCount+=b;while(a=a.$parent)}function s(a,b,c){do a.$$listenerCount[c]-=b,0===a.$$listenerCount[c]&&delete a.$$listenerCount[c];while(a=a.$parent)}function H(){}function u(){for(;t.length;)try{t.shift()()}catch(a){e(a)}f=
null}function p(){null===f&&(f=h.defer(function(){K.$apply(u)}))}m.prototype={constructor:m,$new:function(b,c){var d;c=c||this;b?(d=new m,d.$root=this.$root):(this.$$ChildScope||(this.$$ChildScope=a(this)),d=new this.$$ChildScope);d.$parent=c;d.$$prevSibling=c.$$childTail;c.$$childHead?(c.$$childTail.$$nextSibling=d,c.$$childTail=d):c.$$childHead=c.$$childTail=d;(b||c!==this)&&d.$on("$destroy",k);return d},$watch:function(a,b,d,e){var f=g(a);if(f.$$watchDelegate)return f.$$watchDelegate(this,b,d,
f,a);var h=this,k=h.$$watchers,l={fn:b,last:H,get:f,exp:e||a,eq:!!d};c=null;C(b)||(l.fn=w);k||(k=h.$$watchers=[],k.$$digestWatchIndex=-1);k.unshift(l);k.$$digestWatchIndex++;r(this,1);return function(){var a=bb(k,l);0<=a&&(r(h,-1),a<k.$$digestWatchIndex&&k.$$digestWatchIndex--);c=null}},$watchGroup:function(a,b){function c(){h=!1;k?(k=!1,b(e,e,g)):b(e,d,g)}var d=Array(a.length),e=Array(a.length),f=[],g=this,h=!1,k=!0;if(!a.length){var l=!0;g.$evalAsync(function(){l&&b(e,e,g)});return function(){l=
!1}}if(1===a.length)return this.$watch(a[0],function(a,c,f){e[0]=a;d[0]=c;b(e,a===c?e:d,f)});q(a,function(a,b){var k=g.$watch(a,function(a,f){e[b]=a;d[b]=f;h||(h=!0,g.$evalAsync(c))});f.push(k)});return function(){for(;f.length;)f.shift()()}},$watchCollection:function(a,b){function c(a){e=a;var b,d,g,h;if(!z(e)){if(E(e))if(la(e))for(f!==n&&(f=n,s=f.length=0,l++),a=e.length,s!==a&&(l++,f.length=s=a),b=0;b<a;b++)h=f[b],g=e[b],d=h!==h&&g!==g,d||h===g||(l++,f[b]=g);else{f!==r&&(f=r={},s=0,l++);a=0;for(b in e)ua.call(e,
b)&&(a++,g=e[b],h=f[b],b in f?(d=h!==h&&g!==g,d||h===g||(l++,f[b]=g)):(s++,f[b]=g,l++));if(s>a)for(b in l++,f)ua.call(e,b)||(s--,delete f[b])}else f!==e&&(f=e,l++);return l}}c.$stateful=!0;var d=this,e,f,h,k=1<b.length,l=0,m=g(a,c),n=[],r={},p=!0,s=0;return this.$watch(m,function(){p?(p=!1,b(e,e,d)):b(e,h,d);if(k)if(E(e))if(la(e)){h=Array(e.length);for(var a=0;a<e.length;a++)h[a]=e[a]}else for(a in h={},e)ua.call(e,a)&&(h[a]=e[a]);else h=e})},$digest:function(){var a,g,k,l,m,r,p,s=b,q,t=[],N,x;n("$digest");
h.$$checkUrlChange();this===K&&null!==f&&(h.defer.cancel(f),u());c=null;do{p=!1;q=this;for(r=0;r<A.length;r++){try{x=A[r],x.scope.$eval(x.expression,x.locals)}catch(z){e(z)}c=null}A.length=0;a:do{if(r=q.$$watchers)for(r.$$digestWatchIndex=r.length;r.$$digestWatchIndex--;)try{if(a=r[r.$$digestWatchIndex])if(m=a.get,(g=m(q))!==(k=a.last)&&!(a.eq?na(g,k):ia(g)&&ia(k)))p=!0,c=a,a.last=a.eq?sa(g,null):g,l=a.fn,l(g,k===H?g:k,q),5>s&&(N=4-s,t[N]||(t[N]=[]),t[N].push({msg:C(a.exp)?"fn: "+(a.exp.name||a.exp.toString()):
a.exp,newVal:g,oldVal:k}));else if(a===c){p=!1;break a}}catch(w){e(w)}if(!(r=q.$$watchersCount&&q.$$childHead||q!==this&&q.$$nextSibling))for(;q!==this&&!(r=q.$$nextSibling);)q=q.$parent}while(q=r);if((p||A.length)&&!s--)throw K.$$phase=null,d("infdig",b,t);}while(p||A.length);for(K.$$phase=null;L<v.length;)try{v[L++]()}catch(y){e(y)}v.length=L=0},$destroy:function(){if(!this.$$destroyed){var a=this.$parent;this.$broadcast("$destroy");this.$$destroyed=!0;this===K&&h.$$applicationDestroyed();r(this,
-this.$$watchersCount);for(var b in this.$$listenerCount)s(this,this.$$listenerCount[b],b);a&&a.$$childHead===this&&(a.$$childHead=this.$$nextSibling);a&&a.$$childTail===this&&(a.$$childTail=this.$$prevSibling);this.$$prevSibling&&(this.$$prevSibling.$$nextSibling=this.$$nextSibling);this.$$nextSibling&&(this.$$nextSibling.$$prevSibling=this.$$prevSibling);this.$destroy=this.$digest=this.$apply=this.$evalAsync=this.$applyAsync=w;this.$on=this.$watch=this.$watchGroup=function(){return w};this.$$listeners=
{};this.$$nextSibling=null;l(this)}},$eval:function(a,b){return g(a)(this,b)},$evalAsync:function(a,b){K.$$phase||A.length||h.defer(function(){A.length&&K.$digest()});A.push({scope:this,expression:g(a),locals:b})},$$postDigest:function(a){v.push(a)},$apply:function(a){try{n("$apply");try{return this.$eval(a)}finally{K.$$phase=null}}catch(b){e(b)}finally{try{K.$digest()}catch(c){throw e(c),c;}}},$applyAsync:function(a){function b(){c.$eval(a)}var c=this;a&&t.push(b);a=g(a);p()},$on:function(a,b){var c=
this.$$listeners[a];c||(this.$$listeners[a]=c=[]);c.push(b);var d=this;do d.$$listenerCount[a]||(d.$$listenerCount[a]=0),d.$$listenerCount[a]++;while(d=d.$parent);var e=this;return function(){var d=c.indexOf(b);-1!==d&&(c[d]=null,s(e,1,a))}},$emit:function(a,b){var c=[],d,f=this,g=!1,h={name:a,targetScope:f,stopPropagation:function(){g=!0},preventDefault:function(){h.defaultPrevented=!0},defaultPrevented:!1},k=cb([h],arguments,1),l,m;do{d=f.$$listeners[a]||c;h.currentScope=f;l=0;for(m=d.length;l<
m;l++)if(d[l])try{d[l].apply(null,k)}catch(n){e(n)}else d.splice(l,1),l--,m--;if(g)return h.currentScope=null,h;f=f.$parent}while(f);h.currentScope=null;return h},$broadcast:function(a,b){var c=this,d=this,f={name:a,targetScope:this,preventDefault:function(){f.defaultPrevented=!0},defaultPrevented:!1};if(!this.$$listenerCount[a])return f;for(var g=cb([f],arguments,1),h,k;c=d;){f.currentScope=c;d=c.$$listeners[a]||[];h=0;for(k=d.length;h<k;h++)if(d[h])try{d[h].apply(null,g)}catch(l){e(l)}else d.splice(h,
1),h--,k--;if(!(d=c.$$listenerCount[a]&&c.$$childHead||c!==this&&c.$$nextSibling))for(;c!==this&&!(d=c.$$nextSibling);)c=c.$parent}f.currentScope=null;return f}};var K=new m,A=K.$$asyncQueue=[],v=K.$$postDigestQueue=[],t=K.$$applyAsyncQueue=[],L=0;return K}]}function Be(){var a=/^\s*(https?|ftp|mailto|tel|file):/,b=/^\s*((https?|ftp|file|blob):|data:image\/)/;this.aHrefSanitizationWhitelist=function(b){return x(b)?(a=b,this):a};this.imgSrcSanitizationWhitelist=function(a){return x(a)?(b=a,this):b};
this.$get=function(){return function(d,c){var f=c?b:a,e;e=ta(d).href;return""===e||e.match(f)?d:"unsafe:"+e}}}function Gg(a){if("self"===a)return a;if(D(a)){if(-1<a.indexOf("***"))throw Fa("iwcard",a);a=Jd(a).replace(/\\\*\\\*/g,".*").replace(/\\\*/g,"[^:/.?&;]*");return new RegExp("^"+a+"$")}if(Za(a))return new RegExp("^"+a.source+"$");throw Fa("imatcher");}function Kd(a){var b=[];x(a)&&q(a,function(a){b.push(Gg(a))});return b}function Mf(){this.SCE_CONTEXTS=ga;var a=["self"],b=[];this.resourceUrlWhitelist=
function(b){arguments.length&&(a=Kd(b));return a};this.resourceUrlBlacklist=function(a){arguments.length&&(b=Kd(a));return b};this.$get=["$injector",function(d){function c(a,b){return"self"===a?od(b):!!a.exec(b.href)}function f(a){var b=function(a){this.$$unwrapTrustedValue=function(){return a}};a&&(b.prototype=new a);b.prototype.valueOf=function(){return this.$$unwrapTrustedValue()};b.prototype.toString=function(){return this.$$unwrapTrustedValue().toString()};return b}var e=function(a){throw Fa("unsafe");
};d.has("$sanitize")&&(e=d.get("$sanitize"));var g=f(),h={};h[ga.HTML]=f(g);h[ga.CSS]=f(g);h[ga.URL]=f(g);h[ga.JS]=f(g);h[ga.RESOURCE_URL]=f(h[ga.URL]);return{trustAs:function(a,b){var c=h.hasOwnProperty(a)?h[a]:null;if(!c)throw Fa("icontext",a,b);if(null===b||z(b)||""===b)return b;if("string"!==typeof b)throw Fa("itype",a);return new c(b)},getTrusted:function(d,f){if(null===f||z(f)||""===f)return f;var g=h.hasOwnProperty(d)?h[d]:null;if(g&&f instanceof g)return f.$$unwrapTrustedValue();if(d===ga.RESOURCE_URL){var g=
ta(f.toString()),n,r,s=!1;n=0;for(r=a.length;n<r;n++)if(c(a[n],g)){s=!0;break}if(s)for(n=0,r=b.length;n<r;n++)if(c(b[n],g)){s=!1;break}if(s)return f;throw Fa("insecurl",f.toString());}if(d===ga.HTML)return e(f);throw Fa("unsafe");},valueOf:function(a){return a instanceof g?a.$$unwrapTrustedValue():a}}}]}function Lf(){var a=!0;this.enabled=function(b){arguments.length&&(a=!!b);return a};this.$get=["$parse","$sceDelegate",function(b,d){if(a&&8>Ia)throw Fa("iequirks");var c=ka(ga);c.isEnabled=function(){return a};
c.trustAs=d.trustAs;c.getTrusted=d.getTrusted;c.valueOf=d.valueOf;a||(c.trustAs=c.getTrusted=function(a,b){return b},c.valueOf=$a);c.parseAs=function(a,d){var e=b(d);return e.literal&&e.constant?e:b(d,function(b){return c.getTrusted(a,b)})};var f=c.parseAs,e=c.getTrusted,g=c.trustAs;q(ga,function(a,b){var d=Q(b);c[hb("parse_as_"+d)]=function(b){return f(a,b)};c[hb("get_trusted_"+d)]=function(b){return e(a,b)};c[hb("trust_as_"+d)]=function(b){return g(a,b)}});return c}]}function Nf(){this.$get=["$window",
"$document",function(a,b){var d={},c=!(a.chrome&&(a.chrome.app&&a.chrome.app.runtime||!a.chrome.app&&a.chrome.runtime&&a.chrome.runtime.id))&&a.history&&a.history.pushState,f=Z((/android (\d+)/.exec(Q((a.navigator||{}).userAgent))||[])[1]),e=/Boxee/i.test((a.navigator||{}).userAgent),g=b[0]||{},h,k=/^(Moz|webkit|ms)(?=[A-Z])/,l=g.body&&g.body.style,m=!1,n=!1;if(l){for(var r in l)if(m=k.exec(r)){h=m[0];h=h[0].toUpperCase()+h.substr(1);break}h||(h="WebkitOpacity"in l&&"webkit");m=!!("transition"in l||
h+"Transition"in l);n=!!("animation"in l||h+"Animation"in l);!f||m&&n||(m=D(l.webkitTransition),n=D(l.webkitAnimation))}return{history:!(!c||4>f||e),hasEvent:function(a){if("input"===a&&11>=Ia)return!1;if(z(d[a])){var b=g.createElement("div");d[a]="on"+a in b}return d[a]},csp:da(),vendorPrefix:h,transitions:m,animations:n,android:f}}]}function Pf(){var a;this.httpOptions=function(b){return b?(a=b,this):a};this.$get=["$templateCache","$http","$q","$sce",function(b,d,c,f){function e(g,h){e.totalPendingRequests++;
if(!D(g)||z(b.get(g)))g=f.getTrustedResourceUrl(g);var k=d.defaults&&d.defaults.transformResponse;I(k)?k=k.filter(function(a){return a!==gc}):k===gc&&(k=null);return d.get(g,R({cache:b,transformResponse:k},a))["finally"](function(){e.totalPendingRequests--}).then(function(a){b.put(g,a.data);return a.data},function(a){if(!h)throw Hg("tpload",g,a.status,a.statusText);return c.reject(a)})}e.totalPendingRequests=0;return e}]}function Qf(){this.$get=["$rootScope","$browser","$location",function(a,b,d){return{findBindings:function(a,
b,d){a=a.getElementsByClassName("ng-binding");var g=[];q(a,function(a){var c=$.element(a).data("$binding");c&&q(c,function(c){d?(new RegExp("(^|\\s)"+Jd(b)+"(\\s|\\||$)")).test(c)&&g.push(a):-1!==c.indexOf(b)&&g.push(a)})});return g},findModels:function(a,b,d){for(var g=["ng-","data-ng-","ng\\:"],h=0;h<g.length;++h){var k=a.querySelectorAll("["+g[h]+"model"+(d?"=":"*=")+'"'+b+'"]');if(k.length)return k}},getLocation:function(){return d.url()},setLocation:function(b){b!==d.url()&&(d.url(b),a.$digest())},
whenStable:function(a){b.notifyWhenNoOutstandingRequests(a)}}}]}function Rf(){this.$get=["$rootScope","$browser","$q","$$q","$exceptionHandler",function(a,b,d,c,f){function e(e,k,l){C(e)||(l=k,k=e,e=w);var m=va.call(arguments,3),n=x(l)&&!l,r=(n?c:d).defer(),s=r.promise,q;q=b.defer(function(){try{r.resolve(e.apply(null,m))}catch(b){r.reject(b),f(b)}finally{delete g[s.$$timeoutId]}n||a.$apply()},k);s.$$timeoutId=q;g[q]=r;return s}var g={};e.cancel=function(a){return a&&a.$$timeoutId in g?(g[a.$$timeoutId].reject("canceled"),
delete g[a.$$timeoutId],b.defer.cancel(a.$$timeoutId)):!1};return e}]}function ta(a){Ia&&(aa.setAttribute("href",a),a=aa.href);aa.setAttribute("href",a);return{href:aa.href,protocol:aa.protocol?aa.protocol.replace(/:$/,""):"",host:aa.host,search:aa.search?aa.search.replace(/^\?/,""):"",hash:aa.hash?aa.hash.replace(/^#/,""):"",hostname:aa.hostname,port:aa.port,pathname:"/"===aa.pathname.charAt(0)?aa.pathname:"/"+aa.pathname}}function od(a){a=D(a)?ta(a):a;return a.protocol===Ld.protocol&&a.host===Ld.host}
function Sf(){this.$get=ha(y)}function Md(a){function b(a){try{return decodeURIComponent(a)}catch(b){return a}}var d=a[0]||{},c={},f="";return function(){var a,g,h,k,l;try{a=d.cookie||""}catch(m){a=""}if(a!==f)for(f=a,a=f.split("; "),c={},h=0;h<a.length;h++)g=a[h],k=g.indexOf("="),0<k&&(l=b(g.substring(0,k)),z(c[l])&&(c[l]=b(g.substring(k+1))));return c}}function Wf(){this.$get=Md}function Rc(a){function b(d,c){if(E(d)){var f={};q(d,function(a,c){f[c]=b(c,a)});return f}return a.factory(d+"Filter",
c)}this.register=b;this.$get=["$injector",function(a){return function(b){return a.get(b+"Filter")}}];b("currency",Nd);b("date",Od);b("filter",Ig);b("json",Jg);b("limitTo",Kg);b("lowercase",Lg);b("number",Pd);b("orderBy",Qd);b("uppercase",Mg)}function Ig(){return function(a,b,d,c){if(!la(a)){if(null==a)return a;throw G("filter")("notarray",a);}c=c||"$";var f;switch(oc(b)){case "function":break;case "boolean":case "null":case "number":case "string":f=!0;case "object":b=Ng(b,d,c,f);break;default:return a}return Array.prototype.filter.call(a,
b)}}function Ng(a,b,d,c){var f=E(a)&&d in a;!0===b?b=na:C(b)||(b=function(a,b){if(z(a))return!1;if(null===a||null===b)return a===b;if(E(b)||E(a)&&!Ac(a))return!1;a=Q(""+a);b=Q(""+b);return-1!==a.indexOf(b)});return function(e){return f&&!E(e)?Na(e,a[d],b,d,!1):Na(e,a,b,d,c)}}function Na(a,b,d,c,f,e){var g=oc(a),h=oc(b);if("string"===h&&"!"===b.charAt(0))return!Na(a,b.substring(1),d,c,f);if(I(a))return a.some(function(a){return Na(a,b,d,c,f)});switch(g){case "object":var k;if(f){for(k in a)if("$"!==
k.charAt(0)&&Na(a[k],b,d,c,!0))return!0;return e?!1:Na(a,b,d,c,!1)}if("object"===h){for(k in b)if(e=b[k],!C(e)&&!z(e)&&(g=k===c,!Na(g?a:a[k],e,d,c,g,g)))return!1;return!0}return d(a,b);case "function":return!1;default:return d(a,b)}}function oc(a){return null===a?"null":typeof a}function Nd(a){var b=a.NUMBER_FORMATS;return function(a,c,f){z(c)&&(c=b.CURRENCY_SYM);z(f)&&(f=b.PATTERNS[1].maxFrac);return null==a?a:Rd(a,b.PATTERNS[1],b.GROUP_SEP,b.DECIMAL_SEP,f).replace(/\u00A4/g,c)}}function Pd(a){var b=
a.NUMBER_FORMATS;return function(a,c){return null==a?a:Rd(a,b.PATTERNS[0],b.GROUP_SEP,b.DECIMAL_SEP,c)}}function Og(a){var b=0,d,c,f,e,g;-1<(c=a.indexOf(Sd))&&(a=a.replace(Sd,""));0<(f=a.search(/e/i))?(0>c&&(c=f),c+=+a.slice(f+1),a=a.substring(0,f)):0>c&&(c=a.length);for(f=0;a.charAt(f)===pc;f++);if(f===(g=a.length))d=[0],c=1;else{for(g--;a.charAt(g)===pc;)g--;c-=f;d=[];for(e=0;f<=g;f++,e++)d[e]=+a.charAt(f)}c>Td&&(d=d.splice(0,Td-1),b=c-1,c=1);return{d:d,e:b,i:c}}function Pg(a,b,d,c){var f=a.d,e=
f.length-a.i;b=z(b)?Math.min(Math.max(d,e),c):+b;d=b+a.i;c=f[d];if(0<d){f.splice(Math.max(a.i,d));for(var g=d;g<f.length;g++)f[g]=0}else for(e=Math.max(0,e),a.i=1,f.length=Math.max(1,d=b+1),f[0]=0,g=1;g<d;g++)f[g]=0;if(5<=c)if(0>d-1){for(c=0;c>d;c--)f.unshift(0),a.i++;f.unshift(1);a.i++}else f[d-1]++;for(;e<Math.max(0,b);e++)f.push(0);if(b=f.reduceRight(function(a,b,c,d){b+=a;d[c]=b%10;return Math.floor(b/10)},0))f.unshift(b),a.i++}function Rd(a,b,d,c,f){if(!D(a)&&!ba(a)||isNaN(a))return"";var e=
!isFinite(a),g=!1,h=Math.abs(a)+"",k="";if(e)k="\u221e";else{g=Og(h);Pg(g,f,b.minFrac,b.maxFrac);k=g.d;h=g.i;f=g.e;e=[];for(g=k.reduce(function(a,b){return a&&!b},!0);0>h;)k.unshift(0),h++;0<h?e=k.splice(h,k.length):(e=k,k=[0]);h=[];for(k.length>=b.lgSize&&h.unshift(k.splice(-b.lgSize,k.length).join(""));k.length>b.gSize;)h.unshift(k.splice(-b.gSize,k.length).join(""));k.length&&h.unshift(k.join(""));k=h.join(d);e.length&&(k+=c+e.join(""));f&&(k+="e+"+f)}return 0>a&&!g?b.negPre+k+b.negSuf:b.posPre+
k+b.posSuf}function Mb(a,b,d,c){var f="";if(0>a||c&&0>=a)c?a=-a+1:(a=-a,f="-");for(a=""+a;a.length<b;)a=pc+a;d&&(a=a.substr(a.length-b));return f+a}function U(a,b,d,c,f){d=d||0;return function(e){e=e["get"+a]();if(0<d||e>-d)e+=d;0===e&&-12===d&&(e=12);return Mb(e,b,c,f)}}function nb(a,b,d){return function(c,f){var e=c["get"+a](),g=wb((d?"STANDALONE":"")+(b?"SHORT":"")+a);return f[g][e]}}function Ud(a){var b=(new Date(a,0,1)).getDay();return new Date(a,0,(4>=b?5:12)-b)}function Vd(a){return function(b){var d=
Ud(b.getFullYear());b=+new Date(b.getFullYear(),b.getMonth(),b.getDate()+(4-b.getDay()))-+d;b=1+Math.round(b/6048E5);return Mb(b,a)}}function qc(a,b){return 0>=a.getFullYear()?b.ERAS[0]:b.ERAS[1]}function Od(a){function b(a){var b;if(b=a.match(d)){a=new Date(0);var e=0,g=0,h=b[8]?a.setUTCFullYear:a.setFullYear,k=b[8]?a.setUTCHours:a.setHours;b[9]&&(e=Z(b[9]+b[10]),g=Z(b[9]+b[11]));h.call(a,Z(b[1]),Z(b[2])-1,Z(b[3]));e=Z(b[4]||0)-e;g=Z(b[5]||0)-g;h=Z(b[6]||0);b=Math.round(1E3*parseFloat("0."+(b[7]||
0)));k.call(a,e,g,h,b)}return a}var d=/^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;return function(c,d,e){var g="",h=[],k,l;d=d||"mediumDate";d=a.DATETIME_FORMATS[d]||d;D(c)&&(c=Qg.test(c)?Z(c):b(c));ba(c)&&(c=new Date(c));if(!ja(c)||!isFinite(c.getTime()))return c;for(;d;)(l=Rg.exec(d))?(h=cb(h,l,1),d=h.pop()):(h.push(d),d=null);var m=c.getTimezoneOffset();e&&(m=Dc(e,m),c=Ub(c,e,!0));q(h,function(b){k=Sg[b];g+=k?k(c,a.DATETIME_FORMATS,m):
"''"===b?"'":b.replace(/(^'|'$)/g,"").replace(/''/g,"'")});return g}}function Jg(){return function(a,b){z(b)&&(b=2);return eb(a,b)}}function Kg(){return function(a,b,d){b=Infinity===Math.abs(Number(b))?Number(b):Z(b);if(ia(b))return a;ba(a)&&(a=a.toString());if(!la(a))return a;d=!d||isNaN(d)?0:Z(d);d=0>d?Math.max(0,a.length+d):d;return 0<=b?rc(a,d,d+b):0===d?rc(a,b,a.length):rc(a,Math.max(0,d+b),d)}}function rc(a,b,d){return D(a)?a.slice(b,d):va.call(a,b,d)}function Qd(a){function b(b){return b.map(function(b){var c=
1,d=$a;if(C(b))d=b;else if(D(b)){if("+"===b.charAt(0)||"-"===b.charAt(0))c="-"===b.charAt(0)?-1:1,b=b.substring(1);if(""!==b&&(d=a(b),d.constant))var f=d(),d=function(a){return a[f]}}return{get:d,descending:c}})}function d(a){switch(typeof a){case "number":case "boolean":case "string":return!0;default:return!1}}function c(a,b){var c=0,d=a.type,k=b.type;if(d===k){var k=a.value,l=b.value;"string"===d?(k=k.toLowerCase(),l=l.toLowerCase()):"object"===d&&(E(k)&&(k=a.index),E(l)&&(l=b.index));k!==l&&(c=
k<l?-1:1)}else c=d<k?-1:1;return c}return function(a,e,g,h){if(null==a)return a;if(!la(a))throw G("orderBy")("notarray",a);I(e)||(e=[e]);0===e.length&&(e=["+"]);var k=b(e),l=g?-1:1,m=C(h)?h:c;a=Array.prototype.map.call(a,function(a,b){return{value:a,tieBreaker:{value:b,type:"number",index:b},predicateValues:k.map(function(c){var e=c.get(a);c=typeof e;if(null===e)c="string",e="null";else if("object"===c)a:{if(C(e.valueOf)&&(e=e.valueOf(),d(e)))break a;Ac(e)&&(e=e.toString(),d(e))}return{value:e,type:c,
index:b}})}});a.sort(function(a,b){for(var c=0,d=k.length;c<d;c++){var e=m(a.predicateValues[c],b.predicateValues[c]);if(e)return e*k[c].descending*l}return m(a.tieBreaker,b.tieBreaker)*l});return a=a.map(function(a){return a.value})}}function Va(a){C(a)&&(a={link:a});a.restrict=a.restrict||"AC";return ha(a)}function Wd(a,b,d,c,f){var e=this,g=[];e.$error={};e.$$success={};e.$pending=void 0;e.$name=f(b.name||b.ngForm||"")(d);e.$dirty=!1;e.$pristine=!0;e.$valid=!0;e.$invalid=!1;e.$submitted=!1;e.$$parentForm=
Nb;e.$rollbackViewValue=function(){q(g,function(a){a.$rollbackViewValue()})};e.$commitViewValue=function(){q(g,function(a){a.$commitViewValue()})};e.$addControl=function(a){Ra(a.$name,"input");g.push(a);a.$name&&(e[a.$name]=a);a.$$parentForm=e};e.$$renameControl=function(a,b){var c=a.$name;e[c]===a&&delete e[c];e[b]=a;a.$name=b};e.$removeControl=function(a){a.$name&&e[a.$name]===a&&delete e[a.$name];q(e.$pending,function(b,c){e.$setValidity(c,null,a)});q(e.$error,function(b,c){e.$setValidity(c,null,
a)});q(e.$$success,function(b,c){e.$setValidity(c,null,a)});bb(g,a);a.$$parentForm=Nb};Xd({ctrl:this,$element:a,set:function(a,b,c){var d=a[b];d?-1===d.indexOf(c)&&d.push(c):a[b]=[c]},unset:function(a,b,c){var d=a[b];d&&(bb(d,c),0===d.length&&delete a[b])},$animate:c});e.$setDirty=function(){c.removeClass(a,Wa);c.addClass(a,Ob);e.$dirty=!0;e.$pristine=!1;e.$$parentForm.$setDirty()};e.$setPristine=function(){c.setClass(a,Wa,Ob+" ng-submitted");e.$dirty=!1;e.$pristine=!0;e.$submitted=!1;q(g,function(a){a.$setPristine()})};
e.$setUntouched=function(){q(g,function(a){a.$setUntouched()})};e.$setSubmitted=function(){c.addClass(a,"ng-submitted");e.$submitted=!0;e.$$parentForm.$setSubmitted()}}function sc(a){a.$formatters.push(function(b){return a.$isEmpty(b)?b:b.toString()})}function Xa(a,b,d,c,f,e){var g=Q(b[0].type);if(!f.android){var h=!1;b.on("compositionstart",function(){h=!0});b.on("compositionend",function(){h=!1;l()})}var k,l=function(a){k&&(e.defer.cancel(k),k=null);if(!h){var f=b.val();a=a&&a.type;"password"===
g||d.ngTrim&&"false"===d.ngTrim||(f=Y(f));(c.$viewValue!==f||""===f&&c.$$hasNativeValidators)&&c.$setViewValue(f,a)}};if(f.hasEvent("input"))b.on("input",l);else{var m=function(a,b,c){k||(k=e.defer(function(){k=null;b&&b.value===c||l(a)}))};b.on("keydown",function(a){var b=a.keyCode;91===b||15<b&&19>b||37<=b&&40>=b||m(a,this,this.value)});if(f.hasEvent("paste"))b.on("paste cut",m)}b.on("change",l);if(Yd[g]&&c.$$hasNativeValidators&&g===d.type)b.on("keydown wheel mousedown",function(a){if(!k){var b=
this.validity,c=b.badInput,d=b.typeMismatch;k=e.defer(function(){k=null;b.badInput===c&&b.typeMismatch===d||l(a)})}});c.$render=function(){var a=c.$isEmpty(c.$viewValue)?"":c.$viewValue;b.val()!==a&&b.val(a)}}function Pb(a,b){return function(d,c){var f,e;if(ja(d))return d;if(D(d)){'"'===d.charAt(0)&&'"'===d.charAt(d.length-1)&&(d=d.substring(1,d.length-1));if(Tg.test(d))return new Date(d);a.lastIndex=0;if(f=a.exec(d))return f.shift(),e=c?{yyyy:c.getFullYear(),MM:c.getMonth()+1,dd:c.getDate(),HH:c.getHours(),
mm:c.getMinutes(),ss:c.getSeconds(),sss:c.getMilliseconds()/1E3}:{yyyy:1970,MM:1,dd:1,HH:0,mm:0,ss:0,sss:0},q(f,function(a,c){c<b.length&&(e[b[c]]=+a)}),new Date(e.yyyy,e.MM-1,e.dd,e.HH,e.mm,e.ss||0,1E3*e.sss||0)}return NaN}}function ob(a,b,d,c){return function(f,e,g,h,k,l,m){function n(a){return a&&!(a.getTime&&a.getTime()!==a.getTime())}function r(a){return x(a)&&!ja(a)?d(a)||void 0:a}tc(f,e,g,h);Xa(f,e,g,h,k,l);var s=h&&h.$options&&h.$options.timezone,q;h.$$parserName=a;h.$parsers.push(function(a){if(h.$isEmpty(a))return null;
if(b.test(a))return a=d(a,q),s&&(a=Ub(a,s)),a});h.$formatters.push(function(a){if(a&&!ja(a))throw pb("datefmt",a);if(n(a))return(q=a)&&s&&(q=Ub(q,s,!0)),m("date")(a,c,s);q=null;return""});if(x(g.min)||g.ngMin){var u;h.$validators.min=function(a){return!n(a)||z(u)||d(a)>=u};g.$observe("min",function(a){u=r(a);h.$validate()})}if(x(g.max)||g.ngMax){var p;h.$validators.max=function(a){return!n(a)||z(p)||d(a)<=p};g.$observe("max",function(a){p=r(a);h.$validate()})}}}function tc(a,b,d,c){(c.$$hasNativeValidators=
E(b[0].validity))&&c.$parsers.push(function(a){var c=b.prop("validity")||{};return c.badInput||c.typeMismatch?void 0:a})}function Zd(a){a.$$parserName="number";a.$parsers.push(function(b){if(a.$isEmpty(b))return null;if(Ug.test(b))return parseFloat(b)});a.$formatters.push(function(b){if(!a.$isEmpty(b)){if(!ba(b))throw pb("numfmt",b);b=b.toString()}return b})}function qb(a){x(a)&&!ba(a)&&(a=parseFloat(a));return ia(a)?void 0:a}function uc(a){var b=a.toString(),d=b.indexOf(".");return-1===d?-1<a&&1>
a&&(a=/e-(\d+)$/.exec(b))?Number(a[1]):0:b.length-d-1}function $d(a,b,d,c,f){if(x(c)){a=a(c);if(!a.constant)throw pb("constexpr",d,c);return a(b)}return f}function vc(a,b){a="ngClass"+a;return["$animate",function(d){function c(a,b){var c=[],d=0;a:for(;d<a.length;d++){for(var f=a[d],m=0;m<b.length;m++)if(f===b[m])continue a;c.push(f)}return c}function f(a){var b=[];return I(a)?(q(a,function(a){b=b.concat(f(a))}),b):D(a)?a.split(" "):E(a)?(q(a,function(a,c){a&&(b=b.concat(c.split(" ")))}),b):a}return{restrict:"AC",
link:function(e,g,h){function k(a){a=l(a,1);h.$addClass(a)}function l(a,b){var c=g.data("$classCounts")||V(),d=[];q(a,function(a){if(0<b||c[a])c[a]=(c[a]||0)+b,c[a]===+(0<b)&&d.push(a)});g.data("$classCounts",c);return d.join(" ")}function m(a,b){var e=c(b,a),f=c(a,b),e=l(e,1),f=l(f,-1);e&&e.length&&d.addClass(g,e);f&&f.length&&d.removeClass(g,f)}function n(a){if(!0===b||(e.$index&1)===b){var c=f(a||[]);if(!r)k(c);else if(!na(a,r)){var d=f(r);m(d,c)}}r=I(a)?a.map(function(a){return ka(a)}):ka(a)}
var r;h.$observe("class",function(b){n(e.$eval(h[a]))});"ngClass"!==a&&e.$watch("$index",function(a,c){var d=a&1;if(d!==(c&1)){var e=f(r);d===b?k(e):(d=l(e,-1),h.$removeClass(d))}});e.$watch(h[a],n,!0)}}}]}function Xd(a){function b(a,b){b&&!e[a]?(k.addClass(f,a),e[a]=!0):!b&&e[a]&&(k.removeClass(f,a),e[a]=!1)}function d(a,c){a=a?"-"+Hc(a,"-"):"";b(rb+a,!0===c);b(ae+a,!1===c)}var c=a.ctrl,f=a.$element,e={},g=a.set,h=a.unset,k=a.$animate;e[ae]=!(e[rb]=f.hasClass(rb));c.$setValidity=function(a,e,f){z(e)?
(c.$pending||(c.$pending={}),g(c.$pending,a,f)):(c.$pending&&h(c.$pending,a,f),be(c.$pending)&&(c.$pending=void 0));Ka(e)?e?(h(c.$error,a,f),g(c.$$success,a,f)):(g(c.$error,a,f),h(c.$$success,a,f)):(h(c.$error,a,f),h(c.$$success,a,f));c.$pending?(b(ce,!0),c.$valid=c.$invalid=void 0,d("",null)):(b(ce,!1),c.$valid=be(c.$error),c.$invalid=!c.$valid,d("",c.$valid));e=c.$pending&&c.$pending[a]?void 0:c.$error[a]?!1:c.$$success[a]?!0:null;d(a,e);c.$$parentForm.$setValidity(a,e,c)}}function be(a){if(a)for(var b in a)if(a.hasOwnProperty(b))return!1;
return!0}var Vg=/^\/(.+)\/([a-z]*)$/,ua=Object.prototype.hasOwnProperty,Q=function(a){return D(a)?a.toLowerCase():a},wb=function(a){return D(a)?a.toUpperCase():a},Ia,F,za,va=[].slice,pg=[].splice,Wg=[].push,ma=Object.prototype.toString,Bc=Object.getPrototypeOf,xa=G("ng"),$=y.angular||(y.angular={}),Wb,sb=0;Ia=y.document.documentMode;var ia=Number.isNaN||function(a){return a!==a};w.$inject=[];$a.$inject=[];var I=Array.isArray,ne=/^\[object (?:Uint8|Uint8Clamped|Uint16|Uint32|Int8|Int16|Int32|Float32|Float64)Array]$/,
Y=function(a){return D(a)?a.trim():a},Jd=function(a){return a.replace(/([-()[\]{}+?*.$^|,:#<!\\])/g,"\\$1").replace(/\x08/g,"\\x08")},da=function(){if(!x(da.rules)){var a=y.document.querySelector("[ng-csp]")||y.document.querySelector("[data-ng-csp]");if(a){var b=a.getAttribute("ng-csp")||a.getAttribute("data-ng-csp");da.rules={noUnsafeEval:!b||-1!==b.indexOf("no-unsafe-eval"),noInlineStyle:!b||-1!==b.indexOf("no-inline-style")}}else{a=da;try{new Function(""),b=!1}catch(d){b=!0}a.rules={noUnsafeEval:b,
noInlineStyle:!1}}}return da.rules},ub=function(){if(x(ub.name_))return ub.name_;var a,b,d=Oa.length,c,f;for(b=0;b<d;++b)if(c=Oa[b],a=y.document.querySelector("["+c.replace(":","\\:")+"jq]")){f=a.getAttribute(c+"jq");break}return ub.name_=f},qe=/:/g,Oa=["ng-","data-ng-","ng:","x-ng-"],te=function(a){var b=a.currentScript,b=b&&b.getAttribute("src");if(!b)return!0;var d=a.createElement("a");d.href=b;if(a.location.origin===d.origin)return!0;switch(d.protocol){case "http:":case "https:":case "ftp:":case "blob:":case "file:":case "data:":return!0;
default:return!1}}(y.document),we=/[A-Z]/g,Ic=!1,La=3,Ae={full:"1.5.11",major:1,minor:5,dot:11,codeName:"princely-quest"};W.expando="ng339";var jb=W.cache={},bg=1;W._data=function(a){return this.cache[a[this.expando]]||{}};var Xf=/([:\-_]+(.))/g,Yf=/^moz([A-Z])/,Ab={mouseleave:"mouseout",mouseenter:"mouseover"},Yb=G("jqLite"),ag=/^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,Xb=/<|&#?\w+;/,Zf=/<([\w:-]+)/,$f=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,pa={option:[1,'<select multiple="multiple">',
"</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};pa.optgroup=pa.option;pa.tbody=pa.tfoot=pa.colgroup=pa.caption=pa.thead;pa.th=pa.td;var gg=y.Node.prototype.contains||function(a){return!!(this.compareDocumentPosition(a)&16)},Pa=W.prototype={ready:function(a){function b(){d||(d=!0,a())}var d=!1;"complete"===y.document.readyState?y.setTimeout(b):
(this.on("DOMContentLoaded",b),W(y).on("load",b))},toString:function(){var a=[];q(this,function(b){a.push(""+b)});return"["+a.join(", ")+"]"},eq:function(a){return 0<=a?F(this[a]):F(this[this.length+a])},length:0,push:Wg,sort:[].sort,splice:[].splice},Gb={};q("multiple selected checked disabled readOnly required open".split(" "),function(a){Gb[Q(a)]=a});var $c={};q("input select option textarea button form details".split(" "),function(a){$c[a]=!0});var gd={ngMinlength:"minlength",ngMaxlength:"maxlength",
ngMin:"min",ngMax:"max",ngPattern:"pattern"};q({data:$b,removeData:ib,hasData:function(a){for(var b in jb[a.ng339])return!0;return!1},cleanData:function(a){for(var b=0,d=a.length;b<d;b++)ib(a[b])}},function(a,b){W[b]=a});q({data:$b,inheritedData:Eb,scope:function(a){return F.data(a,"$scope")||Eb(a.parentNode||a,["$isolateScope","$scope"])},isolateScope:function(a){return F.data(a,"$isolateScope")||F.data(a,"$isolateScopeNoTemplate")},controller:Xc,injector:function(a){return Eb(a,"$injector")},removeAttr:function(a,
b){a.removeAttribute(b)},hasClass:Bb,css:function(a,b,d){b=hb(b);if(x(d))a.style[b]=d;else return a.style[b]},attr:function(a,b,d){var c=a.nodeType;if(c!==La&&2!==c&&8!==c)if(c=Q(b),Gb[c])if(x(d))d?(a[b]=!0,a.setAttribute(b,c)):(a[b]=!1,a.removeAttribute(c));else return a[b]||(a.attributes.getNamedItem(b)||w).specified?c:void 0;else if(x(d))a.setAttribute(b,d);else if(a.getAttribute)return a=a.getAttribute(b,2),null===a?void 0:a},prop:function(a,b,d){if(x(d))a[b]=d;else return a[b]},text:function(){function a(a,
d){if(z(d)){var c=a.nodeType;return 1===c||c===La?a.textContent:""}a.textContent=d}a.$dv="";return a}(),val:function(a,b){if(z(b)){if(a.multiple&&"select"===wa(a)){var d=[];q(a.options,function(a){a.selected&&d.push(a.value||a.text)});return 0===d.length?null:d}return a.value}a.value=b},html:function(a,b){if(z(b))return a.innerHTML;yb(a,!0);a.innerHTML=b},empty:Yc},function(a,b){W.prototype[b]=function(b,c){var f,e,g=this.length;if(a!==Yc&&z(2===a.length&&a!==Bb&&a!==Xc?b:c)){if(E(b)){for(f=0;f<g;f++)if(a===
$b)a(this[f],b);else for(e in b)a(this[f],e,b[e]);return this}f=a.$dv;g=z(f)?Math.min(g,1):g;for(e=0;e<g;e++){var h=a(this[e],b,c);f=f?f+h:h}return f}for(f=0;f<g;f++)a(this[f],b,c);return this}});q({removeData:ib,on:function(a,b,d,c){if(x(c))throw Yb("onargs");if(Sc(a)){c=zb(a,!0);var f=c.events,e=c.handle;e||(e=c.handle=dg(a,f));c=0<=b.indexOf(" ")?b.split(" "):[b];for(var g=c.length,h=function(b,c,g){var h=f[b];h||(h=f[b]=[],h.specialHandlerWrapper=c,"$destroy"===b||g||a.addEventListener(b,e,!1));
h.push(d)};g--;)b=c[g],Ab[b]?(h(Ab[b],fg),h(b,void 0,!0)):h(b)}},off:Wc,one:function(a,b,d){a=F(a);a.on(b,function f(){a.off(b,d);a.off(b,f)});a.on(b,d)},replaceWith:function(a,b){var d,c=a.parentNode;yb(a);q(new W(b),function(b){d?c.insertBefore(b,d.nextSibling):c.replaceChild(b,a);d=b})},children:function(a){var b=[];q(a.childNodes,function(a){1===a.nodeType&&b.push(a)});return b},contents:function(a){return a.contentDocument||a.childNodes||[]},append:function(a,b){var d=a.nodeType;if(1===d||11===
d){b=new W(b);for(var d=0,c=b.length;d<c;d++)a.appendChild(b[d])}},prepend:function(a,b){if(1===a.nodeType){var d=a.firstChild;q(new W(b),function(b){a.insertBefore(b,d)})}},wrap:function(a,b){Uc(a,F(b).eq(0).clone()[0])},remove:Fb,detach:function(a){Fb(a,!0)},after:function(a,b){var d=a,c=a.parentNode;if(c){b=new W(b);for(var f=0,e=b.length;f<e;f++){var g=b[f];c.insertBefore(g,d.nextSibling);d=g}}},addClass:Db,removeClass:Cb,toggleClass:function(a,b,d){b&&q(b.split(" "),function(b){var f=d;z(f)&&
(f=!Bb(a,b));(f?Db:Cb)(a,b)})},parent:function(a){return(a=a.parentNode)&&11!==a.nodeType?a:null},next:function(a){return a.nextElementSibling},find:function(a,b){return a.getElementsByTagName?a.getElementsByTagName(b):[]},clone:Zb,triggerHandler:function(a,b,d){var c,f,e=b.type||b,g=zb(a);if(g=(g=g&&g.events)&&g[e])c={preventDefault:function(){this.defaultPrevented=!0},isDefaultPrevented:function(){return!0===this.defaultPrevented},stopImmediatePropagation:function(){this.immediatePropagationStopped=
!0},isImmediatePropagationStopped:function(){return!0===this.immediatePropagationStopped},stopPropagation:w,type:e,target:a},b.type&&(c=R(c,b)),b=ka(g),f=d?[c].concat(d):[c],q(b,function(b){c.isImmediatePropagationStopped()||b.apply(a,f)})}},function(a,b){W.prototype[b]=function(b,c,f){for(var e,g=0,h=this.length;g<h;g++)z(e)?(e=a(this[g],b,c,f),x(e)&&(e=F(e))):Vc(e,a(this[g],b,c,f));return x(e)?e:this}});W.prototype.bind=W.prototype.on;W.prototype.unbind=W.prototype.off;Sa.prototype={put:function(a,
b){this[Aa(a,this.nextUid)]=b},get:function(a){return this[Aa(a,this.nextUid)]},remove:function(a){var b=this[a=Aa(a,this.nextUid)];delete this[a];return b}};var Vf=[function(){this.$get=[function(){return Sa}]}],ig=/^([^(]+?)=>/,jg=/^[^(]*\(\s*([^)]*)\)/m,Xg=/,/,Yg=/^\s*(_?)(\S+?)\1\s*$/,hg=/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg,Ba=G("$injector");fb.$$annotate=function(a,b,d){var c;if("function"===typeof a){if(!(c=a.$inject)){c=[];if(a.length){if(b)throw D(d)&&d||(d=a.name||kg(a)),Ba("strictdi",d);b=
ad(a);q(b[1].split(Xg),function(a){a.replace(Yg,function(a,b,d){c.push(d)})})}a.$inject=c}}else I(a)?(b=a.length-1,Qa(a[b],"fn"),c=a.slice(0,b)):Qa(a,"fn",!0);return c};var de=G("$animate"),nf=function(){this.$get=w},of=function(){var a=new Sa,b=[];this.$get=["$$AnimateRunner","$rootScope",function(d,c){function f(a,b,c){var d=!1;b&&(b=D(b)?b.split(" "):I(b)?b:[],q(b,function(b){b&&(d=!0,a[b]=c)}));return d}function e(){q(b,function(b){var c=a.get(b);if(c){var d=lg(b.attr("class")),e="",f="";q(c,
function(a,b){a!==!!d[b]&&(a?e+=(e.length?" ":"")+b:f+=(f.length?" ":"")+b)});q(b,function(a){e&&Db(a,e);f&&Cb(a,f)});a.remove(b)}});b.length=0}return{enabled:w,on:w,off:w,pin:w,push:function(g,h,k,l){l&&l();k=k||{};k.from&&g.css(k.from);k.to&&g.css(k.to);if(k.addClass||k.removeClass)if(h=k.addClass,l=k.removeClass,k=a.get(g)||{},h=f(k,h,!0),l=f(k,l,!1),h||l)a.put(g,k),b.push(g),1===b.length&&c.$$postDigest(e);g=new d;g.complete();return g}}}]},lf=["$provide",function(a){var b=this;this.$$registeredAnimations=
Object.create(null);this.register=function(d,c){if(d&&"."!==d.charAt(0))throw de("notcsel",d);var f=d+"-animation";b.$$registeredAnimations[d.substr(1)]=f;a.factory(f,c)};this.classNameFilter=function(a){if(1===arguments.length&&(this.$$classNameFilter=a instanceof RegExp?a:null)&&/(\s+|\/)ng-animate(\s+|\/)/.test(this.$$classNameFilter.toString()))throw de("nongcls","ng-animate");return this.$$classNameFilter};this.$get=["$$animateQueue",function(a){function b(a,c,d){if(d){var h;a:{for(h=0;h<d.length;h++){var k=
d[h];if(1===k.nodeType){h=k;break a}}h=void 0}!h||h.parentNode||h.previousElementSibling||(d=null)}d?d.after(a):c.prepend(a)}return{on:a.on,off:a.off,pin:a.pin,enabled:a.enabled,cancel:function(a){a.end&&a.end()},enter:function(f,e,g,h){e=e&&F(e);g=g&&F(g);e=e||g.parent();b(f,e,g);return a.push(f,"enter",Ca(h))},move:function(f,e,g,h){e=e&&F(e);g=g&&F(g);e=e||g.parent();b(f,e,g);return a.push(f,"move",Ca(h))},leave:function(b,c){return a.push(b,"leave",Ca(c),function(){b.remove()})},addClass:function(b,
c,g){g=Ca(g);g.addClass=kb(g.addclass,c);return a.push(b,"addClass",g)},removeClass:function(b,c,g){g=Ca(g);g.removeClass=kb(g.removeClass,c);return a.push(b,"removeClass",g)},setClass:function(b,c,g,h){h=Ca(h);h.addClass=kb(h.addClass,c);h.removeClass=kb(h.removeClass,g);return a.push(b,"setClass",h)},animate:function(b,c,g,h,k){k=Ca(k);k.from=k.from?R(k.from,c):c;k.to=k.to?R(k.to,g):g;k.tempClasses=kb(k.tempClasses,h||"ng-inline-animate");return a.push(b,"animate",k)}}}]}],qf=function(){this.$get=
["$$rAF",function(a){function b(b){d.push(b);1<d.length||a(function(){for(var a=0;a<d.length;a++)d[a]();d=[]})}var d=[];return function(){var a=!1;b(function(){a=!0});return function(d){a?d():b(d)}}}]},pf=function(){this.$get=["$q","$sniffer","$$animateAsyncRun","$document","$timeout",function(a,b,d,c,f){function e(a){this.setHost(a);var b=d();this._doneCallbacks=[];this._tick=function(a){var d=c[0];d&&d.hidden?f(a,0,!1):b(a)};this._state=0}e.chain=function(a,b){function c(){if(d===a.length)b(!0);
else a[d](function(a){!1===a?b(!1):(d++,c())})}var d=0;c()};e.all=function(a,b){function c(f){e=e&&f;++d===a.length&&b(e)}var d=0,e=!0;q(a,function(a){a.done(c)})};e.prototype={setHost:function(a){this.host=a||{}},done:function(a){2===this._state?a():this._doneCallbacks.push(a)},progress:w,getPromise:function(){if(!this.promise){var b=this;this.promise=a(function(a,c){b.done(function(b){!1===b?c():a()})})}return this.promise},then:function(a,b){return this.getPromise().then(a,b)},"catch":function(a){return this.getPromise()["catch"](a)},
"finally":function(a){return this.getPromise()["finally"](a)},pause:function(){this.host.pause&&this.host.pause()},resume:function(){this.host.resume&&this.host.resume()},end:function(){this.host.end&&this.host.end();this._resolve(!0)},cancel:function(){this.host.cancel&&this.host.cancel();this._resolve(!1)},complete:function(a){var b=this;0===b._state&&(b._state=1,b._tick(function(){b._resolve(a)}))},_resolve:function(a){2!==this._state&&(q(this._doneCallbacks,function(b){b(a)}),this._doneCallbacks.length=
0,this._state=2)}};return e}]},mf=function(){this.$get=["$$rAF","$q","$$AnimateRunner",function(a,b,d){return function(b,f){function e(){a(function(){g.addClass&&(b.addClass(g.addClass),g.addClass=null);g.removeClass&&(b.removeClass(g.removeClass),g.removeClass=null);g.to&&(b.css(g.to),g.to=null);h||k.complete();h=!0});return k}var g=f||{};g.$$prepared||(g=sa(g));g.cleanupStyles&&(g.from=g.to=null);g.from&&(b.css(g.from),g.from=null);var h,k=new d;return{start:e,end:e}}}]},fa=G("$compile"),ec=new function(){};
Kc.$inject=["$provide","$$sanitizeUriProvider"];Hb.prototype.isFirstChange=function(){return this.previousValue===ec};var bd=/^((?:x|data)[:\-_])/i,id=G("$controller"),hd=/^(\S+)(\s+as\s+([\w$]+))?$/,wf=function(){this.$get=["$document",function(a){return function(b){b?!b.nodeType&&b instanceof F&&(b=b[0]):b=a[0].body;return b.offsetWidth+1}}]},jd="application/json",hc={"Content-Type":jd+";charset=utf-8"},rg=/^\[|^\{(?!\{)/,sg={"[":/]$/,"{":/}$/},qg=/^\)]\}',?\n/,Zg=G("$http"),nd=function(a){return function(){throw Zg("legacy",
a);}},Ha=$.$interpolateMinErr=G("$interpolate");Ha.throwNoconcat=function(a){throw Ha("noconcat",a);};Ha.interr=function(a,b){return Ha("interr",a,b.toString())};var Ef=function(){this.$get=["$window",function(a){function b(a){var b=function(a){b.data=a;b.called=!0};b.id=a;return b}var d=a.angular.callbacks,c={};return{createCallback:function(a){a="_"+(d.$$counter++).toString(36);var e="angular.callbacks."+a,g=b(a);c[e]=d[a]=g;return e},wasCalled:function(a){return c[a].called},getResponse:function(a){return c[a].data},
removeCallback:function(a){delete d[c[a].id];delete c[a]}}}]},$g=/^([^?#]*)(\?([^#]*))?(#(.*))?$/,ug={http:80,https:443,ftp:21},lb=G("$location"),vg=/^\s*[\\/]{2,}/,ah={$$absUrl:"",$$html5:!1,$$replace:!1,absUrl:Ib("$$absUrl"),url:function(a){if(z(a))return this.$$url;var b=$g.exec(a);(b[1]||""===a)&&this.path(decodeURIComponent(b[1]));(b[2]||b[1]||""===a)&&this.search(b[3]||"");this.hash(b[5]||"");return this},protocol:Ib("$$protocol"),host:Ib("$$host"),port:Ib("$$port"),path:sd("$$path",function(a){a=
null!==a?a.toString():"";return"/"===a.charAt(0)?a:"/"+a}),search:function(a,b){switch(arguments.length){case 0:return this.$$search;case 1:if(D(a)||ba(a))a=a.toString(),this.$$search=Fc(a);else if(E(a))a=sa(a,{}),q(a,function(b,c){null==b&&delete a[c]}),this.$$search=a;else throw lb("isrcharg");break;default:z(b)||null===b?delete this.$$search[a]:this.$$search[a]=b}this.$$compose();return this},hash:sd("$$hash",function(a){return null!==a?a.toString():""}),replace:function(){this.$$replace=!0;return this}};
q([rd,kc,jc],function(a){a.prototype=Object.create(ah);a.prototype.state=function(b){if(!arguments.length)return this.$$state;if(a!==jc||!this.$$html5)throw lb("nostate");this.$$state=z(b)?null:b;return this}});var ea=G("$parse"),ud=[].constructor,vd=(!1).constructor,wd=Function.constructor,xd=(0).constructor,yd={}.constructor,zd="".constructor,Ag=ud.prototype,Bg=vd.prototype,Kb=wd.prototype,Cg=xd.prototype,Ad=yd.prototype,Dg=zd.prototype,xg=Kb.call,yg=Kb.apply,zg=Kb.bind,Fg=Ad.valueOf,Qb=V();q("+ - * / % === !== == != < > <= >= && || ! = |".split(" "),
function(a){Qb[a]=!0});var bh={n:"\n",f:"\f",r:"\r",t:"\t",v:"\v","'":"'",'"':'"'},mc=function(a){this.options=a};mc.prototype={constructor:mc,lex:function(a){this.text=a;this.index=0;for(this.tokens=[];this.index<this.text.length;)if(a=this.text.charAt(this.index),'"'===a||"'"===a)this.readString(a);else if(this.isNumber(a)||"."===a&&this.isNumber(this.peek()))this.readNumber();else if(this.isIdentifierStart(this.peekMultichar()))this.readIdent();else if(this.is(a,"(){}[].,;:?"))this.tokens.push({index:this.index,
text:a}),this.index++;else if(this.isWhitespace(a))this.index++;else{var b=a+this.peek(),d=b+this.peek(2),c=Qb[b],f=Qb[d];Qb[a]||c||f?(a=f?d:c?b:a,this.tokens.push({index:this.index,text:a,operator:!0}),this.index+=a.length):this.throwError("Unexpected next character ",this.index,this.index+1)}return this.tokens},is:function(a,b){return-1!==b.indexOf(a)},peek:function(a){a=a||1;return this.index+a<this.text.length?this.text.charAt(this.index+a):!1},isNumber:function(a){return"0"<=a&&"9">=a&&"string"===
typeof a},isWhitespace:function(a){return" "===a||"\r"===a||"\t"===a||"\n"===a||"\v"===a||"\u00a0"===a},isIdentifierStart:function(a){return this.options.isIdentifierStart?this.options.isIdentifierStart(a,this.codePointAt(a)):this.isValidIdentifierStart(a)},isValidIdentifierStart:function(a){return"a"<=a&&"z">=a||"A"<=a&&"Z">=a||"_"===a||"$"===a},isIdentifierContinue:function(a){return this.options.isIdentifierContinue?this.options.isIdentifierContinue(a,this.codePointAt(a)):this.isValidIdentifierContinue(a)},
isValidIdentifierContinue:function(a,b){return this.isValidIdentifierStart(a,b)||this.isNumber(a)},codePointAt:function(a){return 1===a.length?a.charCodeAt(0):(a.charCodeAt(0)<<10)+a.charCodeAt(1)-56613888},peekMultichar:function(){var a=this.text.charAt(this.index),b=this.peek();if(!b)return a;var d=a.charCodeAt(0),c=b.charCodeAt(0);return 55296<=d&&56319>=d&&56320<=c&&57343>=c?a+b:a},isExpOperator:function(a){return"-"===a||"+"===a||this.isNumber(a)},throwError:function(a,b,d){d=d||this.index;b=
x(b)?"s "+b+"-"+this.index+" ["+this.text.substring(b,d)+"]":" "+d;throw ea("lexerr",a,b,this.text);},readNumber:function(){for(var a="",b=this.index;this.index<this.text.length;){var d=Q(this.text.charAt(this.index));if("."===d||this.isNumber(d))a+=d;else{var c=this.peek();if("e"===d&&this.isExpOperator(c))a+=d;else if(this.isExpOperator(d)&&c&&this.isNumber(c)&&"e"===a.charAt(a.length-1))a+=d;else if(!this.isExpOperator(d)||c&&this.isNumber(c)||"e"!==a.charAt(a.length-1))break;else this.throwError("Invalid exponent")}this.index++}this.tokens.push({index:b,
text:a,constant:!0,value:Number(a)})},readIdent:function(){var a=this.index;for(this.index+=this.peekMultichar().length;this.index<this.text.length;){var b=this.peekMultichar();if(!this.isIdentifierContinue(b))break;this.index+=b.length}this.tokens.push({index:a,text:this.text.slice(a,this.index),identifier:!0})},readString:function(a){var b=this.index;this.index++;for(var d="",c=a,f=!1;this.index<this.text.length;){var e=this.text.charAt(this.index),c=c+e;if(f)"u"===e?(f=this.text.substring(this.index+
1,this.index+5),f.match(/[\da-f]{4}/i)||this.throwError("Invalid unicode escape [\\u"+f+"]"),this.index+=4,d+=String.fromCharCode(parseInt(f,16))):d+=bh[e]||e,f=!1;else if("\\"===e)f=!0;else{if(e===a){this.index++;this.tokens.push({index:b,text:c,constant:!0,value:d});return}d+=e}this.index++}this.throwError("Unterminated quote",b)}};var t=function(a,b){this.lexer=a;this.options=b};t.Program="Program";t.ExpressionStatement="ExpressionStatement";t.AssignmentExpression="AssignmentExpression";t.ConditionalExpression=
"ConditionalExpression";t.LogicalExpression="LogicalExpression";t.BinaryExpression="BinaryExpression";t.UnaryExpression="UnaryExpression";t.CallExpression="CallExpression";t.MemberExpression="MemberExpression";t.Identifier="Identifier";t.Literal="Literal";t.ArrayExpression="ArrayExpression";t.Property="Property";t.ObjectExpression="ObjectExpression";t.ThisExpression="ThisExpression";t.LocalsExpression="LocalsExpression";t.NGValueParameter="NGValueParameter";t.prototype={ast:function(a){this.text=
a;this.tokens=this.lexer.lex(a);a=this.program();0!==this.tokens.length&&this.throwError("is an unexpected token",this.tokens[0]);return a},program:function(){for(var a=[];;)if(0<this.tokens.length&&!this.peek("}",")",";","]")&&a.push(this.expressionStatement()),!this.expect(";"))return{type:t.Program,body:a}},expressionStatement:function(){return{type:t.ExpressionStatement,expression:this.filterChain()}},filterChain:function(){for(var a=this.expression();this.expect("|");)a=this.filter(a);return a},
expression:function(){return this.assignment()},assignment:function(){var a=this.ternary();if(this.expect("=")){if(!Dd(a))throw ea("lval");a={type:t.AssignmentExpression,left:a,right:this.assignment(),operator:"="}}return a},ternary:function(){var a=this.logicalOR(),b,d;return this.expect("?")&&(b=this.expression(),this.consume(":"))?(d=this.expression(),{type:t.ConditionalExpression,test:a,alternate:b,consequent:d}):a},logicalOR:function(){for(var a=this.logicalAND();this.expect("||");)a={type:t.LogicalExpression,
operator:"||",left:a,right:this.logicalAND()};return a},logicalAND:function(){for(var a=this.equality();this.expect("&&");)a={type:t.LogicalExpression,operator:"&&",left:a,right:this.equality()};return a},equality:function(){for(var a=this.relational(),b;b=this.expect("==","!=","===","!==");)a={type:t.BinaryExpression,operator:b.text,left:a,right:this.relational()};return a},relational:function(){for(var a=this.additive(),b;b=this.expect("<",">","<=",">=");)a={type:t.BinaryExpression,operator:b.text,
left:a,right:this.additive()};return a},additive:function(){for(var a=this.multiplicative(),b;b=this.expect("+","-");)a={type:t.BinaryExpression,operator:b.text,left:a,right:this.multiplicative()};return a},multiplicative:function(){for(var a=this.unary(),b;b=this.expect("*","/","%");)a={type:t.BinaryExpression,operator:b.text,left:a,right:this.unary()};return a},unary:function(){var a;return(a=this.expect("+","-","!"))?{type:t.UnaryExpression,operator:a.text,prefix:!0,argument:this.unary()}:this.primary()},
primary:function(){var a;this.expect("(")?(a=this.filterChain(),this.consume(")")):this.expect("[")?a=this.arrayDeclaration():this.expect("{")?a=this.object():this.selfReferential.hasOwnProperty(this.peek().text)?a=sa(this.selfReferential[this.consume().text]):this.options.literals.hasOwnProperty(this.peek().text)?a={type:t.Literal,value:this.options.literals[this.consume().text]}:this.peek().identifier?a=this.identifier():this.peek().constant?a=this.constant():this.throwError("not a primary expression",
this.peek());for(var b;b=this.expect("(","[",".");)"("===b.text?(a={type:t.CallExpression,callee:a,arguments:this.parseArguments()},this.consume(")")):"["===b.text?(a={type:t.MemberExpression,object:a,property:this.expression(),computed:!0},this.consume("]")):"."===b.text?a={type:t.MemberExpression,object:a,property:this.identifier(),computed:!1}:this.throwError("IMPOSSIBLE");return a},filter:function(a){a=[a];for(var b={type:t.CallExpression,callee:this.identifier(),arguments:a,filter:!0};this.expect(":");)a.push(this.expression());
return b},parseArguments:function(){var a=[];if(")"!==this.peekToken().text){do a.push(this.filterChain());while(this.expect(","))}return a},identifier:function(){var a=this.consume();a.identifier||this.throwError("is not a valid identifier",a);return{type:t.Identifier,name:a.text}},constant:function(){return{type:t.Literal,value:this.consume().value}},arrayDeclaration:function(){var a=[];if("]"!==this.peekToken().text){do{if(this.peek("]"))break;a.push(this.expression())}while(this.expect(","))}this.consume("]");
return{type:t.ArrayExpression,elements:a}},object:function(){var a=[],b;if("}"!==this.peekToken().text){do{if(this.peek("}"))break;b={type:t.Property,kind:"init"};this.peek().constant?(b.key=this.constant(),b.computed=!1,this.consume(":"),b.value=this.expression()):this.peek().identifier?(b.key=this.identifier(),b.computed=!1,this.peek(":")?(this.consume(":"),b.value=this.expression()):b.value=b.key):this.peek("[")?(this.consume("["),b.key=this.expression(),this.consume("]"),b.computed=!0,this.consume(":"),
b.value=this.expression()):this.throwError("invalid key",this.peek());a.push(b)}while(this.expect(","))}this.consume("}");return{type:t.ObjectExpression,properties:a}},throwError:function(a,b){throw ea("syntax",b.text,a,b.index+1,this.text,this.text.substring(b.index));},consume:function(a){if(0===this.tokens.length)throw ea("ueoe",this.text);var b=this.expect(a);b||this.throwError("is unexpected, expecting ["+a+"]",this.peek());return b},peekToken:function(){if(0===this.tokens.length)throw ea("ueoe",
this.text);return this.tokens[0]},peek:function(a,b,d,c){return this.peekAhead(0,a,b,d,c)},peekAhead:function(a,b,d,c,f){if(this.tokens.length>a){a=this.tokens[a];var e=a.text;if(e===b||e===d||e===c||e===f||!(b||d||c||f))return a}return!1},expect:function(a,b,d,c){return(a=this.peek(a,b,d,c))?(this.tokens.shift(),a):!1},selfReferential:{"this":{type:t.ThisExpression},$locals:{type:t.LocalsExpression}}};Gd.prototype={compile:function(a,b){var d=this,c=this.astBuilder.ast(a);this.state={nextId:0,filters:{},
expensiveChecks:b,fn:{vars:[],body:[],own:{}},assign:{vars:[],body:[],own:{}},inputs:[]};X(c,d.$filter);var f="",e;this.stage="assign";if(e=Ed(c))this.state.computing="assign",f=this.nextId(),this.recurse(e,f),this.return_(f),f="fn.assign="+this.generateFunction("assign","s,v,l");e=Cd(c.body);d.stage="inputs";q(e,function(a,b){var c="fn"+b;d.state[c]={vars:[],body:[],own:{}};d.state.computing=c;var e=d.nextId();d.recurse(a,e);d.return_(e);d.state.inputs.push(c);a.watchId=b});this.state.computing=
"fn";this.stage="main";this.recurse(c);f='"'+this.USE+" "+this.STRICT+'";\n'+this.filterPrefix()+"var fn="+this.generateFunction("fn","s,l,a,i")+f+this.watchFns()+"return fn;";f=(new Function("$filter","ensureSafeMemberName","ensureSafeObject","ensureSafeFunction","getStringValue","ensureSafeAssignContext","ifDefined","plus","text",f))(this.$filter,Ua,Ea,td,wg,Jb,Eg,Bd,a);this.state=this.stage=void 0;f.literal=Fd(c);f.constant=c.constant;return f},USE:"use",STRICT:"strict",watchFns:function(){var a=
[],b=this.state.inputs,d=this;q(b,function(b){a.push("var "+b+"="+d.generateFunction(b,"s"))});b.length&&a.push("fn.inputs=["+b.join(",")+"];");return a.join("")},generateFunction:function(a,b){return"function("+b+"){"+this.varsPrefix(a)+this.body(a)+"};"},filterPrefix:function(){var a=[],b=this;q(this.state.filters,function(d,c){a.push(d+"=$filter("+b.escape(c)+")")});return a.length?"var "+a.join(",")+";":""},varsPrefix:function(a){return this.state[a].vars.length?"var "+this.state[a].vars.join(",")+
";":""},body:function(a){return this.state[a].body.join("")},recurse:function(a,b,d,c,f,e){var g,h,k=this,l,m,n;c=c||w;if(!e&&x(a.watchId))b=b||this.nextId(),this.if_("i",this.lazyAssign(b,this.computedMember("i",a.watchId)),this.lazyRecurse(a,b,d,c,f,!0));else switch(a.type){case t.Program:q(a.body,function(b,c){k.recurse(b.expression,void 0,void 0,function(a){h=a});c!==a.body.length-1?k.current().body.push(h,";"):k.return_(h)});break;case t.Literal:m=this.escape(a.value);this.assign(b,m);c(m);break;
case t.UnaryExpression:this.recurse(a.argument,void 0,void 0,function(a){h=a});m=a.operator+"("+this.ifDefined(h,0)+")";this.assign(b,m);c(m);break;case t.BinaryExpression:this.recurse(a.left,void 0,void 0,function(a){g=a});this.recurse(a.right,void 0,void 0,function(a){h=a});m="+"===a.operator?this.plus(g,h):"-"===a.operator?this.ifDefined(g,0)+a.operator+this.ifDefined(h,0):"("+g+")"+a.operator+"("+h+")";this.assign(b,m);c(m);break;case t.LogicalExpression:b=b||this.nextId();k.recurse(a.left,b);
k.if_("&&"===a.operator?b:k.not(b),k.lazyRecurse(a.right,b));c(b);break;case t.ConditionalExpression:b=b||this.nextId();k.recurse(a.test,b);k.if_(b,k.lazyRecurse(a.alternate,b),k.lazyRecurse(a.consequent,b));c(b);break;case t.Identifier:b=b||this.nextId();d&&(d.context="inputs"===k.stage?"s":this.assign(this.nextId(),this.getHasOwnProperty("l",a.name)+"?l:s"),d.computed=!1,d.name=a.name);Ua(a.name);k.if_("inputs"===k.stage||k.not(k.getHasOwnProperty("l",a.name)),function(){k.if_("inputs"===k.stage||
"s",function(){f&&1!==f&&k.if_(k.not(k.nonComputedMember("s",a.name)),k.lazyAssign(k.nonComputedMember("s",a.name),"{}"));k.assign(b,k.nonComputedMember("s",a.name))})},b&&k.lazyAssign(b,k.nonComputedMember("l",a.name)));(k.state.expensiveChecks||Lb(a.name))&&k.addEnsureSafeObject(b);c(b);break;case t.MemberExpression:g=d&&(d.context=this.nextId())||this.nextId();b=b||this.nextId();k.recurse(a.object,g,void 0,function(){k.if_(k.notNull(g),function(){f&&1!==f&&k.addEnsureSafeAssignContext(g);if(a.computed)h=
k.nextId(),k.recurse(a.property,h),k.getStringValue(h),k.addEnsureSafeMemberName(h),f&&1!==f&&k.if_(k.not(k.computedMember(g,h)),k.lazyAssign(k.computedMember(g,h),"{}")),m=k.ensureSafeObject(k.computedMember(g,h)),k.assign(b,m),d&&(d.computed=!0,d.name=h);else{Ua(a.property.name);f&&1!==f&&k.if_(k.not(k.nonComputedMember(g,a.property.name)),k.lazyAssign(k.nonComputedMember(g,a.property.name),"{}"));m=k.nonComputedMember(g,a.property.name);if(k.state.expensiveChecks||Lb(a.property.name))m=k.ensureSafeObject(m);
k.assign(b,m);d&&(d.computed=!1,d.name=a.property.name)}},function(){k.assign(b,"undefined")});c(b)},!!f);break;case t.CallExpression:b=b||this.nextId();a.filter?(h=k.filter(a.callee.name),l=[],q(a.arguments,function(a){var b=k.nextId();k.recurse(a,b);l.push(b)}),m=h+"("+l.join(",")+")",k.assign(b,m),c(b)):(h=k.nextId(),g={},l=[],k.recurse(a.callee,h,g,function(){k.if_(k.notNull(h),function(){k.addEnsureSafeFunction(h);q(a.arguments,function(a){k.recurse(a,k.nextId(),void 0,function(a){l.push(k.ensureSafeObject(a))})});
g.name?(k.state.expensiveChecks||k.addEnsureSafeObject(g.context),m=k.member(g.context,g.name,g.computed)+"("+l.join(",")+")"):m=h+"("+l.join(",")+")";m=k.ensureSafeObject(m);k.assign(b,m)},function(){k.assign(b,"undefined")});c(b)}));break;case t.AssignmentExpression:h=this.nextId();g={};this.recurse(a.left,void 0,g,function(){k.if_(k.notNull(g.context),function(){k.recurse(a.right,h);k.addEnsureSafeObject(k.member(g.context,g.name,g.computed));k.addEnsureSafeAssignContext(g.context);m=k.member(g.context,
g.name,g.computed)+a.operator+h;k.assign(b,m);c(b||m)})},1);break;case t.ArrayExpression:l=[];q(a.elements,function(a){k.recurse(a,k.nextId(),void 0,function(a){l.push(a)})});m="["+l.join(",")+"]";this.assign(b,m);c(m);break;case t.ObjectExpression:l=[];n=!1;q(a.properties,function(a){a.computed&&(n=!0)});n?(b=b||this.nextId(),this.assign(b,"{}"),q(a.properties,function(a){a.computed?(g=k.nextId(),k.recurse(a.key,g)):g=a.key.type===t.Identifier?a.key.name:""+a.key.value;h=k.nextId();k.recurse(a.value,
h);k.assign(k.member(b,g,a.computed),h)})):(q(a.properties,function(b){k.recurse(b.value,a.constant?void 0:k.nextId(),void 0,function(a){l.push(k.escape(b.key.type===t.Identifier?b.key.name:""+b.key.value)+":"+a)})}),m="{"+l.join(",")+"}",this.assign(b,m));c(b||m);break;case t.ThisExpression:this.assign(b,"s");c("s");break;case t.LocalsExpression:this.assign(b,"l");c("l");break;case t.NGValueParameter:this.assign(b,"v"),c("v")}},getHasOwnProperty:function(a,b){var d=a+"."+b,c=this.current().own;c.hasOwnProperty(d)||
(c[d]=this.nextId(!1,a+"&&("+this.escape(b)+" in "+a+")"));return c[d]},assign:function(a,b){if(a)return this.current().body.push(a,"=",b,";"),a},filter:function(a){this.state.filters.hasOwnProperty(a)||(this.state.filters[a]=this.nextId(!0));return this.state.filters[a]},ifDefined:function(a,b){return"ifDefined("+a+","+this.escape(b)+")"},plus:function(a,b){return"plus("+a+","+b+")"},return_:function(a){this.current().body.push("return ",a,";")},if_:function(a,b,d){if(!0===a)b();else{var c=this.current().body;
c.push("if(",a,"){");b();c.push("}");d&&(c.push("else{"),d(),c.push("}"))}},not:function(a){return"!("+a+")"},notNull:function(a){return a+"!=null"},nonComputedMember:function(a,b){var d=/[^$_a-zA-Z0-9]/g;return/^[$_a-zA-Z][$_a-zA-Z0-9]*$/.test(b)?a+"."+b:a+'["'+b.replace(d,this.stringEscapeFn)+'"]'},computedMember:function(a,b){return a+"["+b+"]"},member:function(a,b,d){return d?this.computedMember(a,b):this.nonComputedMember(a,b)},addEnsureSafeObject:function(a){this.current().body.push(this.ensureSafeObject(a),
";")},addEnsureSafeMemberName:function(a){this.current().body.push(this.ensureSafeMemberName(a),";")},addEnsureSafeFunction:function(a){this.current().body.push(this.ensureSafeFunction(a),";")},addEnsureSafeAssignContext:function(a){this.current().body.push(this.ensureSafeAssignContext(a),";")},ensureSafeObject:function(a){return"ensureSafeObject("+a+",text)"},ensureSafeMemberName:function(a){return"ensureSafeMemberName("+a+",text)"},ensureSafeFunction:function(a){return"ensureSafeFunction("+a+",text)"},
getStringValue:function(a){this.assign(a,"getStringValue("+a+")")},ensureSafeAssignContext:function(a){return"ensureSafeAssignContext("+a+",text)"},lazyRecurse:function(a,b,d,c,f,e){var g=this;return function(){g.recurse(a,b,d,c,f,e)}},lazyAssign:function(a,b){var d=this;return function(){d.assign(a,b)}},stringEscapeRegex:/[^ a-zA-Z0-9]/g,stringEscapeFn:function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)},escape:function(a){if(D(a))return"'"+a.replace(this.stringEscapeRegex,this.stringEscapeFn)+
"'";if(ba(a))return a.toString();if(!0===a)return"true";if(!1===a)return"false";if(null===a)return"null";if("undefined"===typeof a)return"undefined";throw ea("esc");},nextId:function(a,b){var d="v"+this.state.nextId++;a||this.current().vars.push(d+(b?"="+b:""));return d},current:function(){return this.state[this.state.computing]}};Hd.prototype={compile:function(a,b){var d=this,c=this.astBuilder.ast(a);this.expression=a;this.expensiveChecks=b;X(c,d.$filter);var f,e;if(f=Ed(c))e=this.recurse(f);f=Cd(c.body);
var g;f&&(g=[],q(f,function(a,b){var c=d.recurse(a);a.input=c;g.push(c);a.watchId=b}));var h=[];q(c.body,function(a){h.push(d.recurse(a.expression))});f=0===c.body.length?w:1===c.body.length?h[0]:function(a,b){var c;q(h,function(d){c=d(a,b)});return c};e&&(f.assign=function(a,b,c){return e(a,c,b)});g&&(f.inputs=g);f.literal=Fd(c);f.constant=c.constant;return f},recurse:function(a,b,d){var c,f,e=this,g;if(a.input)return this.inputs(a.input,a.watchId);switch(a.type){case t.Literal:return this.value(a.value,
b);case t.UnaryExpression:return f=this.recurse(a.argument),this["unary"+a.operator](f,b);case t.BinaryExpression:return c=this.recurse(a.left),f=this.recurse(a.right),this["binary"+a.operator](c,f,b);case t.LogicalExpression:return c=this.recurse(a.left),f=this.recurse(a.right),this["binary"+a.operator](c,f,b);case t.ConditionalExpression:return this["ternary?:"](this.recurse(a.test),this.recurse(a.alternate),this.recurse(a.consequent),b);case t.Identifier:return Ua(a.name,e.expression),e.identifier(a.name,
e.expensiveChecks||Lb(a.name),b,d,e.expression);case t.MemberExpression:return c=this.recurse(a.object,!1,!!d),a.computed||(Ua(a.property.name,e.expression),f=a.property.name),a.computed&&(f=this.recurse(a.property)),a.computed?this.computedMember(c,f,b,d,e.expression):this.nonComputedMember(c,f,e.expensiveChecks,b,d,e.expression);case t.CallExpression:return g=[],q(a.arguments,function(a){g.push(e.recurse(a))}),a.filter&&(f=this.$filter(a.callee.name)),a.filter||(f=this.recurse(a.callee,!0)),a.filter?
function(a,c,d,e){for(var n=[],r=0;r<g.length;++r)n.push(g[r](a,c,d,e));a=f.apply(void 0,n,e);return b?{context:void 0,name:void 0,value:a}:a}:function(a,c,d,m){var n=f(a,c,d,m),r;if(null!=n.value){Ea(n.context,e.expression);td(n.value,e.expression);r=[];for(var s=0;s<g.length;++s)r.push(Ea(g[s](a,c,d,m),e.expression));r=Ea(n.value.apply(n.context,r),e.expression)}return b?{value:r}:r};case t.AssignmentExpression:return c=this.recurse(a.left,!0,1),f=this.recurse(a.right),function(a,d,g,m){var n=c(a,
d,g,m);a=f(a,d,g,m);Ea(n.value,e.expression);Jb(n.context);n.context[n.name]=a;return b?{value:a}:a};case t.ArrayExpression:return g=[],q(a.elements,function(a){g.push(e.recurse(a))}),function(a,c,d,e){for(var f=[],r=0;r<g.length;++r)f.push(g[r](a,c,d,e));return b?{value:f}:f};case t.ObjectExpression:return g=[],q(a.properties,function(a){a.computed?g.push({key:e.recurse(a.key),computed:!0,value:e.recurse(a.value)}):g.push({key:a.key.type===t.Identifier?a.key.name:""+a.key.value,computed:!1,value:e.recurse(a.value)})}),
function(a,c,d,e){for(var f={},r=0;r<g.length;++r)g[r].computed?f[g[r].key(a,c,d,e)]=g[r].value(a,c,d,e):f[g[r].key]=g[r].value(a,c,d,e);return b?{value:f}:f};case t.ThisExpression:return function(a){return b?{value:a}:a};case t.LocalsExpression:return function(a,c){return b?{value:c}:c};case t.NGValueParameter:return function(a,c,d){return b?{value:d}:d}}},"unary+":function(a,b){return function(d,c,f,e){d=a(d,c,f,e);d=x(d)?+d:0;return b?{value:d}:d}},"unary-":function(a,b){return function(d,c,f,
e){d=a(d,c,f,e);d=x(d)?-d:0;return b?{value:d}:d}},"unary!":function(a,b){return function(d,c,f,e){d=!a(d,c,f,e);return b?{value:d}:d}},"binary+":function(a,b,d){return function(c,f,e,g){var h=a(c,f,e,g);c=b(c,f,e,g);h=Bd(h,c);return d?{value:h}:h}},"binary-":function(a,b,d){return function(c,f,e,g){var h=a(c,f,e,g);c=b(c,f,e,g);h=(x(h)?h:0)-(x(c)?c:0);return d?{value:h}:h}},"binary*":function(a,b,d){return function(c,f,e,g){c=a(c,f,e,g)*b(c,f,e,g);return d?{value:c}:c}},"binary/":function(a,b,d){return function(c,
f,e,g){c=a(c,f,e,g)/b(c,f,e,g);return d?{value:c}:c}},"binary%":function(a,b,d){return function(c,f,e,g){c=a(c,f,e,g)%b(c,f,e,g);return d?{value:c}:c}},"binary===":function(a,b,d){return function(c,f,e,g){c=a(c,f,e,g)===b(c,f,e,g);return d?{value:c}:c}},"binary!==":function(a,b,d){return function(c,f,e,g){c=a(c,f,e,g)!==b(c,f,e,g);return d?{value:c}:c}},"binary==":function(a,b,d){return function(c,f,e,g){c=a(c,f,e,g)==b(c,f,e,g);return d?{value:c}:c}},"binary!=":function(a,b,d){return function(c,
f,e,g){c=a(c,f,e,g)!=b(c,f,e,g);return d?{value:c}:c}},"binary<":function(a,b,d){return function(c,f,e,g){c=a(c,f,e,g)<b(c,f,e,g);return d?{value:c}:c}},"binary>":function(a,b,d){return function(c,f,e,g){c=a(c,f,e,g)>b(c,f,e,g);return d?{value:c}:c}},"binary<=":function(a,b,d){return function(c,f,e,g){c=a(c,f,e,g)<=b(c,f,e,g);return d?{value:c}:c}},"binary>=":function(a,b,d){return function(c,f,e,g){c=a(c,f,e,g)>=b(c,f,e,g);return d?{value:c}:c}},"binary&&":function(a,b,d){return function(c,f,e,g){c=
a(c,f,e,g)&&b(c,f,e,g);return d?{value:c}:c}},"binary||":function(a,b,d){return function(c,f,e,g){c=a(c,f,e,g)||b(c,f,e,g);return d?{value:c}:c}},"ternary?:":function(a,b,d,c){return function(f,e,g,h){f=a(f,e,g,h)?b(f,e,g,h):d(f,e,g,h);return c?{value:f}:f}},value:function(a,b){return function(){return b?{context:void 0,name:void 0,value:a}:a}},identifier:function(a,b,d,c,f){return function(e,g,h,k){e=g&&a in g?g:e;c&&1!==c&&e&&!e[a]&&(e[a]={});g=e?e[a]:void 0;b&&Ea(g,f);return d?{context:e,name:a,
value:g}:g}},computedMember:function(a,b,d,c,f){return function(e,g,h,k){var l=a(e,g,h,k),m,n;null!=l&&(m=b(e,g,h,k),m+="",Ua(m,f),c&&1!==c&&(Jb(l),l&&!l[m]&&(l[m]={})),n=l[m],Ea(n,f));return d?{context:l,name:m,value:n}:n}},nonComputedMember:function(a,b,d,c,f,e){return function(g,h,k,l){g=a(g,h,k,l);f&&1!==f&&(Jb(g),g&&!g[b]&&(g[b]={}));h=null!=g?g[b]:void 0;(d||Lb(b))&&Ea(h,e);return c?{context:g,name:b,value:h}:h}},inputs:function(a,b){return function(d,c,f,e){return e?e[b]:a(d,c,f)}}};var nc=
function(a,b,d){this.lexer=a;this.$filter=b;this.options=d;this.ast=new t(a,d);this.astCompiler=d.csp?new Hd(this.ast,b):new Gd(this.ast,b)};nc.prototype={constructor:nc,parse:function(a){return this.astCompiler.compile(a,this.options.expensiveChecks)}};var Fa=G("$sce"),ga={HTML:"html",CSS:"css",URL:"url",RESOURCE_URL:"resourceUrl",JS:"js"},Hg=G("$compile"),aa=y.document.createElement("a"),Ld=ta(y.location.href);Md.$inject=["$document"];Rc.$inject=["$provide"];var Td=22,Sd=".",pc="0";Nd.$inject=["$locale"];
Pd.$inject=["$locale"];var Sg={yyyy:U("FullYear",4,0,!1,!0),yy:U("FullYear",2,0,!0,!0),y:U("FullYear",1,0,!1,!0),MMMM:nb("Month"),MMM:nb("Month",!0),MM:U("Month",2,1),M:U("Month",1,1),LLLL:nb("Month",!1,!0),dd:U("Date",2),d:U("Date",1),HH:U("Hours",2),H:U("Hours",1),hh:U("Hours",2,-12),h:U("Hours",1,-12),mm:U("Minutes",2),m:U("Minutes",1),ss:U("Seconds",2),s:U("Seconds",1),sss:U("Milliseconds",3),EEEE:nb("Day"),EEE:nb("Day",!0),a:function(a,b){return 12>a.getHours()?b.AMPMS[0]:b.AMPMS[1]},Z:function(a,
b,d){a=-1*d;return a=(0<=a?"+":"")+(Mb(Math[0<a?"floor":"ceil"](a/60),2)+Mb(Math.abs(a%60),2))},ww:Vd(2),w:Vd(1),G:qc,GG:qc,GGG:qc,GGGG:function(a,b){return 0>=a.getFullYear()?b.ERANAMES[0]:b.ERANAMES[1]}},Rg=/((?:[^yMLdHhmsaZEwG']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|L+|d+|H+|h+|m+|s+|a|Z|G+|w+))(.*)/,Qg=/^-?\d+$/;Od.$inject=["$locale"];var Lg=ha(Q),Mg=ha(wb);Qd.$inject=["$parse"];var Ce=ha({restrict:"E",compile:function(a,b){if(!b.href&&!b.xlinkHref)return function(a,b){if("a"===b[0].nodeName.toLowerCase()){var f=
"[object SVGAnimatedString]"===ma.call(b.prop("href"))?"xlink:href":"href";b.on("click",function(a){b.attr(f)||a.preventDefault()})}}}}),xb={};q(Gb,function(a,b){function d(a,d,f){a.$watch(f[c],function(a){f.$set(b,!!a)})}if("multiple"!==a){var c=Da("ng-"+b),f=d;"checked"===a&&(f=function(a,b,f){f.ngModel!==f[c]&&d(a,b,f)});xb[c]=function(){return{restrict:"A",priority:100,link:f}}}});q(gd,function(a,b){xb[b]=function(){return{priority:100,link:function(a,c,f){if("ngPattern"===b&&"/"===f.ngPattern.charAt(0)&&
(c=f.ngPattern.match(Vg))){f.$set("ngPattern",new RegExp(c[1],c[2]));return}a.$watch(f[b],function(a){f.$set(b,a)})}}}});q(["src","srcset","href"],function(a){var b=Da("ng-"+a);xb[b]=function(){return{priority:99,link:function(d,c,f){var e=a,g=a;"href"===a&&"[object SVGAnimatedString]"===ma.call(c.prop("href"))&&(g="xlinkHref",f.$attr[g]="xlink:href",e=null);f.$observe(b,function(b){b?(f.$set(g,b),Ia&&e&&c.prop(e,f[g])):"href"===a&&f.$set(g,null)})}}}});var Nb={$addControl:w,$$renameControl:function(a,
b){a.$name=b},$removeControl:w,$setValidity:w,$setDirty:w,$setPristine:w,$setSubmitted:w};Wd.$inject=["$element","$attrs","$scope","$animate","$interpolate"];var ee=function(a){return["$timeout","$parse",function(b,d){function c(a){return""===a?d('this[""]').assign:d(a).assign||w}return{name:"form",restrict:a?"EAC":"E",require:["form","^^?form"],controller:Wd,compile:function(d,e){d.addClass(Wa).addClass(rb);var g=e.name?"name":a&&e.ngForm?"ngForm":!1;return{pre:function(a,d,e,f){var n=f[0];if(!("action"in
e)){var r=function(b){a.$apply(function(){n.$commitViewValue();n.$setSubmitted()});b.preventDefault()};d[0].addEventListener("submit",r,!1);d.on("$destroy",function(){b(function(){d[0].removeEventListener("submit",r,!1)},0,!1)})}(f[1]||n.$$parentForm).$addControl(n);var s=g?c(n.$name):w;g&&(s(a,n),e.$observe(g,function(b){n.$name!==b&&(s(a,void 0),n.$$parentForm.$$renameControl(n,b),s=c(n.$name),s(a,n))}));d.on("$destroy",function(){n.$$parentForm.$removeControl(n);s(a,void 0);R(n,Nb)})}}}}}]},De=
ee(),Pe=ee(!0),Tg=/^\d{4,}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+(?:[+-][0-2]\d:[0-5]\d|Z)$/,ch=/^[a-z][a-z\d.+-]*:\/*(?:[^:@]+(?::[^@]+)?@)?(?:[^\s:/?#]+|\[[a-f\d:]+])(?::\d+)?(?:\/[^?#]*)?(?:\?[^#]*)?(?:#.*)?$/i,dh=/^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/,Ug=/^\s*(-|\+)?(\d+|(\d*(\.\d*)))([eE][+-]?\d+)?\s*$/,fe=/^(\d{4,})-(\d{2})-(\d{2})$/,ge=/^(\d{4,})-(\d\d)-(\d\d)T(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,
wc=/^(\d{4,})-W(\d\d)$/,he=/^(\d{4,})-(\d\d)$/,ie=/^(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,Yd=V();q(["date","datetime-local","month","time","week"],function(a){Yd[a]=!0});var je={text:function(a,b,d,c,f,e){Xa(a,b,d,c,f,e);sc(c)},date:ob("date",fe,Pb(fe,["yyyy","MM","dd"]),"yyyy-MM-dd"),"datetime-local":ob("datetimelocal",ge,Pb(ge,"yyyy MM dd HH mm ss sss".split(" ")),"yyyy-MM-ddTHH:mm:ss.sss"),time:ob("time",ie,Pb(ie,["HH","mm","ss","sss"]),"HH:mm:ss.sss"),week:ob("week",wc,function(a,b){if(ja(a))return a;
if(D(a)){wc.lastIndex=0;var d=wc.exec(a);if(d){var c=+d[1],f=+d[2],e=d=0,g=0,h=0,k=Ud(c),f=7*(f-1);b&&(d=b.getHours(),e=b.getMinutes(),g=b.getSeconds(),h=b.getMilliseconds());return new Date(c,0,k.getDate()+f,d,e,g,h)}}return NaN},"yyyy-Www"),month:ob("month",he,Pb(he,["yyyy","MM"]),"yyyy-MM"),number:function(a,b,d,c,f,e){tc(a,b,d,c);Xa(a,b,d,c,f,e);Zd(c);var g,h;if(x(d.min)||d.ngMin)c.$validators.min=function(a){return c.$isEmpty(a)||z(g)||a>=g},d.$observe("min",function(a){g=qb(a);c.$validate()});
if(x(d.max)||d.ngMax)c.$validators.max=function(a){return c.$isEmpty(a)||z(h)||a<=h},d.$observe("max",function(a){h=qb(a);c.$validate()})},url:function(a,b,d,c,f,e){Xa(a,b,d,c,f,e);sc(c);c.$$parserName="url";c.$validators.url=function(a,b){var d=a||b;return c.$isEmpty(d)||ch.test(d)}},email:function(a,b,d,c,f,e){Xa(a,b,d,c,f,e);sc(c);c.$$parserName="email";c.$validators.email=function(a,b){var d=a||b;return c.$isEmpty(d)||dh.test(d)}},radio:function(a,b,d,c){z(d.name)&&b.attr("name",++sb);b.on("click",
function(a){b[0].checked&&c.$setViewValue(d.value,a&&a.type)});c.$render=function(){b[0].checked=d.value==c.$viewValue};d.$observe("value",c.$render)},range:function(a,b,d,c,f,e){function g(a,c){b.attr(a,d[a]);d.$observe(a,c)}function h(a){n=qb(a);ia(c.$modelValue)||(m?(a=b.val(),n>a&&(a=n,b.val(a)),c.$setViewValue(a)):c.$validate())}function k(a){r=qb(a);ia(c.$modelValue)||(m?(a=b.val(),r<a&&(b.val(r),a=r<n?n:r),c.$setViewValue(a)):c.$validate())}function l(a){s=qb(a);ia(c.$modelValue)||(m&&c.$viewValue!==
b.val()?c.$setViewValue(b.val()):c.$validate())}tc(a,b,d,c);Zd(c);Xa(a,b,d,c,f,e);var m=c.$$hasNativeValidators&&"range"===b[0].type,n=m?0:void 0,r=m?100:void 0,s=m?1:void 0,q=b[0].validity;a=x(d.min);f=x(d.max);e=x(d.step);var u=c.$render;c.$render=m&&x(q.rangeUnderflow)&&x(q.rangeOverflow)?function(){u();c.$setViewValue(b.val())}:u;a&&(c.$validators.min=m?function(){return!0}:function(a,b){return c.$isEmpty(b)||z(n)||b>=n},g("min",h));f&&(c.$validators.max=m?function(){return!0}:function(a,b){return c.$isEmpty(b)||
z(r)||b<=r},g("max",k));e&&(c.$validators.step=m?function(){return!q.stepMismatch}:function(a,b){var d;if(!(d=c.$isEmpty(b)||z(s))){d=n||0;var e=s,f=Number(b);if((f|0)!==f||(d|0)!==d||(e|0)!==e){var g=Math.max(uc(f),uc(d),uc(e)),g=Math.pow(10,g),f=f*g;d*=g;e*=g}d=0===(f-d)%e}return d},g("step",l))},checkbox:function(a,b,d,c,f,e,g,h){var k=$d(h,a,"ngTrueValue",d.ngTrueValue,!0),l=$d(h,a,"ngFalseValue",d.ngFalseValue,!1);b.on("click",function(a){c.$setViewValue(b[0].checked,a&&a.type)});c.$render=function(){b[0].checked=
c.$viewValue};c.$isEmpty=function(a){return!1===a};c.$formatters.push(function(a){return na(a,k)});c.$parsers.push(function(a){return a?k:l})},hidden:w,button:w,submit:w,reset:w,file:w},Lc=["$browser","$sniffer","$filter","$parse",function(a,b,d,c){return{restrict:"E",require:["?ngModel"],link:{pre:function(f,e,g,h){if(h[0]){var k=Q(g.type);"range"!==k||g.hasOwnProperty("ngInputRange")||(k="text");(je[k]||je.text)(f,e,g,h[0],b,a,d,c)}}}}}],eh=/^(true|false|\d+)$/,gf=function(){return{restrict:"A",
priority:100,compile:function(a,b){return eh.test(b.ngValue)?function(a,b,f){f.$set("value",a.$eval(f.ngValue))}:function(a,b,f){a.$watch(f.ngValue,function(a){f.$set("value",a)})}}}},He=["$compile",function(a){return{restrict:"AC",compile:function(b){a.$$addBindingClass(b);return function(b,c,f){a.$$addBindingInfo(c,f.ngBind);c=c[0];b.$watch(f.ngBind,function(a){c.textContent=z(a)?"":a})}}}}],Je=["$interpolate","$compile",function(a,b){return{compile:function(d){b.$$addBindingClass(d);return function(c,
d,e){c=a(d.attr(e.$attr.ngBindTemplate));b.$$addBindingInfo(d,c.expressions);d=d[0];e.$observe("ngBindTemplate",function(a){d.textContent=z(a)?"":a})}}}}],Ie=["$sce","$parse","$compile",function(a,b,d){return{restrict:"A",compile:function(c,f){var e=b(f.ngBindHtml),g=b(f.ngBindHtml,function(b){return a.valueOf(b)});d.$$addBindingClass(c);return function(b,c,f){d.$$addBindingInfo(c,f.ngBindHtml);b.$watch(g,function(){var d=e(b);c.html(a.getTrustedHtml(d)||"")})}}}}],ff=ha({restrict:"A",require:"ngModel",
link:function(a,b,d,c){c.$viewChangeListeners.push(function(){a.$eval(d.ngChange)})}}),Ke=vc("",!0),Me=vc("Odd",0),Le=vc("Even",1),Ne=Va({compile:function(a,b){b.$set("ngCloak",void 0);a.removeClass("ng-cloak")}}),Oe=[function(){return{restrict:"A",scope:!0,controller:"@",priority:500}}],Qc={},fh={blur:!0,focus:!0};q("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "),function(a){var b=Da("ng-"+a);
Qc[b]=["$parse","$rootScope",function(d,c){return{restrict:"A",compile:function(f,e){var g=d(e[b],null,!0);return function(b,d){d.on(a,function(d){var e=function(){g(b,{$event:d})};fh[a]&&c.$$phase?b.$evalAsync(e):b.$apply(e)})}}}}]});var Re=["$animate","$compile",function(a,b){return{multiElement:!0,transclude:"element",priority:600,terminal:!0,restrict:"A",$$tlb:!0,link:function(d,c,f,e,g){var h,k,l;d.$watch(f.ngIf,function(d){d?k||g(function(d,e){k=e;d[d.length++]=b.$$createComment("end ngIf",
f.ngIf);h={clone:d};a.enter(d,c.parent(),c)}):(l&&(l.remove(),l=null),k&&(k.$destroy(),k=null),h&&(l=vb(h.clone),a.leave(l).done(function(a){!1!==a&&(l=null)}),h=null))})}}}],Se=["$templateRequest","$anchorScroll","$animate",function(a,b,d){return{restrict:"ECA",priority:400,terminal:!0,transclude:"element",controller:$.noop,compile:function(c,f){var e=f.ngInclude||f.src,g=f.onload||"",h=f.autoscroll;return function(c,f,m,n,r){var q=0,t,u,p,z=function(){u&&(u.remove(),u=null);t&&(t.$destroy(),t=null);
p&&(d.leave(p).done(function(a){!1!==a&&(u=null)}),u=p,p=null)};c.$watch(e,function(e){var m=function(a){!1===a||!x(h)||h&&!c.$eval(h)||b()},u=++q;e?(a(e,!0).then(function(a){if(!c.$$destroyed&&u===q){var b=c.$new();n.template=a;a=r(b,function(a){z();d.enter(a,null,f).done(m)});t=b;p=a;t.$emit("$includeContentLoaded",e);c.$eval(g)}},function(){c.$$destroyed||u!==q||(z(),c.$emit("$includeContentError",e))}),c.$emit("$includeContentRequested",e)):(z(),n.template=null)})}}}}],jf=["$compile",function(a){return{restrict:"ECA",
priority:-400,require:"ngInclude",link:function(b,d,c,f){ma.call(d[0]).match(/SVG/)?(d.empty(),a(Tc(f.template,y.document).childNodes)(b,function(a){d.append(a)},{futureParentElement:d})):(d.html(f.template),a(d.contents())(b))}}}],Te=Va({priority:450,compile:function(){return{pre:function(a,b,d){a.$eval(d.ngInit)}}}}),ef=function(){return{restrict:"A",priority:100,require:"ngModel",link:function(a,b,d,c){var f=b.attr(d.$attr.ngList)||", ",e="false"!==d.ngTrim,g=e?Y(f):f;c.$parsers.push(function(a){if(!z(a)){var b=
[];a&&q(a.split(g),function(a){a&&b.push(e?Y(a):a)});return b}});c.$formatters.push(function(a){if(I(a))return a.join(f)});c.$isEmpty=function(a){return!a||!a.length}}}},rb="ng-valid",ae="ng-invalid",Wa="ng-pristine",Ob="ng-dirty",ce="ng-pending",pb=G("ngModel"),gh=["$scope","$exceptionHandler","$attrs","$element","$parse","$animate","$timeout","$rootScope","$q","$interpolate",function(a,b,d,c,f,e,g,h,k,l){this.$modelValue=this.$viewValue=Number.NaN;this.$$rawModelValue=void 0;this.$validators={};
this.$asyncValidators={};this.$parsers=[];this.$formatters=[];this.$viewChangeListeners=[];this.$untouched=!0;this.$touched=!1;this.$pristine=!0;this.$dirty=!1;this.$valid=!0;this.$invalid=!1;this.$error={};this.$$success={};this.$pending=void 0;this.$name=l(d.name||"",!1)(a);this.$$parentForm=Nb;var m=f(d.ngModel),n=m.assign,r=m,s=n,t=null,u,p=this;this.$$setOptions=function(a){if((p.$options=a)&&a.getterSetter){var b=f(d.ngModel+"()"),e=f(d.ngModel+"($$$p)");r=function(a){var c=m(a);C(c)&&(c=b(a));
return c};s=function(a,b){C(m(a))?e(a,{$$$p:b}):n(a,b)}}else if(!m.assign)throw pb("nonassign",d.ngModel,ya(c));};this.$render=w;this.$isEmpty=function(a){return z(a)||""===a||null===a||a!==a};this.$$updateEmptyClasses=function(a){p.$isEmpty(a)?(e.removeClass(c,"ng-not-empty"),e.addClass(c,"ng-empty")):(e.removeClass(c,"ng-empty"),e.addClass(c,"ng-not-empty"))};var y=0;Xd({ctrl:this,$element:c,set:function(a,b){a[b]=!0},unset:function(a,b){delete a[b]},$animate:e});this.$setPristine=function(){p.$dirty=
!1;p.$pristine=!0;e.removeClass(c,Ob);e.addClass(c,Wa)};this.$setDirty=function(){p.$dirty=!0;p.$pristine=!1;e.removeClass(c,Wa);e.addClass(c,Ob);p.$$parentForm.$setDirty()};this.$setUntouched=function(){p.$touched=!1;p.$untouched=!0;e.setClass(c,"ng-untouched","ng-touched")};this.$setTouched=function(){p.$touched=!0;p.$untouched=!1;e.setClass(c,"ng-touched","ng-untouched")};this.$rollbackViewValue=function(){g.cancel(t);p.$viewValue=p.$$lastCommittedViewValue;p.$render()};this.$validate=function(){if(!ia(p.$modelValue)){var a=
p.$$rawModelValue,b=p.$valid,c=p.$modelValue,d=p.$options&&p.$options.allowInvalid;p.$$runValidators(a,p.$$lastCommittedViewValue,function(e){d||b===e||(p.$modelValue=e?a:void 0,p.$modelValue!==c&&p.$$writeModelToScope())})}};this.$$runValidators=function(a,b,c){function d(){var c=!0;q(p.$validators,function(d,e){var g=d(a,b);c=c&&g;f(e,g)});return c?!0:(q(p.$asyncValidators,function(a,b){f(b,null)}),!1)}function e(){var c=[],d=!0;q(p.$asyncValidators,function(e,g){var h=e(a,b);if(!h||!C(h.then))throw pb("nopromise",
h);f(g,void 0);c.push(h.then(function(){f(g,!0)},function(){d=!1;f(g,!1)}))});c.length?k.all(c).then(function(){g(d)},w):g(!0)}function f(a,b){h===y&&p.$setValidity(a,b)}function g(a){h===y&&c(a)}y++;var h=y;(function(){var a=p.$$parserName||"parse";if(z(u))f(a,null);else return u||(q(p.$validators,function(a,b){f(b,null)}),q(p.$asyncValidators,function(a,b){f(b,null)})),f(a,u),u;return!0})()?d()?e():g(!1):g(!1)};this.$commitViewValue=function(){var a=p.$viewValue;g.cancel(t);if(p.$$lastCommittedViewValue!==
a||""===a&&p.$$hasNativeValidators)p.$$updateEmptyClasses(a),p.$$lastCommittedViewValue=a,p.$pristine&&this.$setDirty(),this.$$parseAndValidate()};this.$$parseAndValidate=function(){var b=p.$$lastCommittedViewValue;if(u=z(b)?void 0:!0)for(var c=0;c<p.$parsers.length;c++)if(b=p.$parsers[c](b),z(b)){u=!1;break}ia(p.$modelValue)&&(p.$modelValue=r(a));var d=p.$modelValue,e=p.$options&&p.$options.allowInvalid;p.$$rawModelValue=b;e&&(p.$modelValue=b,p.$modelValue!==d&&p.$$writeModelToScope());p.$$runValidators(b,
p.$$lastCommittedViewValue,function(a){e||(p.$modelValue=a?b:void 0,p.$modelValue!==d&&p.$$writeModelToScope())})};this.$$writeModelToScope=function(){s(a,p.$modelValue);q(p.$viewChangeListeners,function(a){try{a()}catch(c){b(c)}})};this.$setViewValue=function(a,b){p.$viewValue=a;p.$options&&!p.$options.updateOnDefault||p.$$debounceViewValueCommit(b)};this.$$debounceViewValueCommit=function(b){var c=0,d=p.$options;d&&x(d.debounce)&&(d=d.debounce,ba(d)?c=d:ba(d[b])?c=d[b]:ba(d["default"])&&(c=d["default"]));
g.cancel(t);c?t=g(function(){p.$commitViewValue()},c):h.$$phase?p.$commitViewValue():a.$apply(function(){p.$commitViewValue()})};a.$watch(function(){var b=r(a);if(b!==p.$modelValue&&(p.$modelValue===p.$modelValue||b===b)){p.$modelValue=p.$$rawModelValue=b;u=void 0;for(var c=p.$formatters,d=c.length,e=b;d--;)e=c[d](e);p.$viewValue!==e&&(p.$$updateEmptyClasses(e),p.$viewValue=p.$$lastCommittedViewValue=e,p.$render(),p.$$runValidators(p.$modelValue,p.$viewValue,w))}return b})}],df=["$rootScope",function(a){return{restrict:"A",
require:["ngModel","^?form","^?ngModelOptions"],controller:gh,priority:1,compile:function(b){b.addClass(Wa).addClass("ng-untouched").addClass(rb);return{pre:function(a,b,f,e){var g=e[0];b=e[1]||g.$$parentForm;g.$$setOptions(e[2]&&e[2].$options);b.$addControl(g);f.$observe("name",function(a){g.$name!==a&&g.$$parentForm.$$renameControl(g,a)});a.$on("$destroy",function(){g.$$parentForm.$removeControl(g)})},post:function(b,c,f,e){var g=e[0];if(g.$options&&g.$options.updateOn)c.on(g.$options.updateOn,
function(a){g.$$debounceViewValueCommit(a&&a.type)});c.on("blur",function(){g.$touched||(a.$$phase?b.$evalAsync(g.$setTouched):b.$apply(g.$setTouched))})}}}}}],hh=/(\s+|^)default(\s+|$)/,hf=function(){return{restrict:"A",controller:["$scope","$attrs",function(a,b){var d=this;this.$options=sa(a.$eval(b.ngModelOptions));x(this.$options.updateOn)?(this.$options.updateOnDefault=!1,this.$options.updateOn=Y(this.$options.updateOn.replace(hh,function(){d.$options.updateOnDefault=!0;return" "}))):this.$options.updateOnDefault=
!0}]}},Ue=Va({terminal:!0,priority:1E3}),ih=G("ngOptions"),jh=/^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?(?:\s+disable\s+when\s+([\s\S]+?))?\s+for\s+(?:([$\w][$\w]*)|(?:\(\s*([$\w][$\w]*)\s*,\s*([$\w][$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/,bf=["$compile","$document","$parse",function(a,b,d){function c(a,b,c){function e(a,b,c,d,f){this.selectValue=a;this.viewValue=b;this.label=c;this.group=d;this.disabled=f}function f(a){var b;if(!q&&la(a))b=a;else{b=
[];for(var c in a)a.hasOwnProperty(c)&&"$"!==c.charAt(0)&&b.push(c)}return b}var n=a.match(jh);if(!n)throw ih("iexp",a,ya(b));var r=n[5]||n[7],q=n[6];a=/ as /.test(n[0])&&n[1];var t=n[9];b=d(n[2]?n[1]:r);var u=a&&d(a)||b,p=t&&d(t),x=t?function(a,b){return p(c,b)}:function(a){return Aa(a)},A=function(a,b){return x(a,C(a,b))},v=d(n[2]||n[1]),z=d(n[3]||""),L=d(n[4]||""),w=d(n[8]),y={},C=q?function(a,b){y[q]=b;y[r]=a;return y}:function(a){y[r]=a;return y};return{trackBy:t,getTrackByValue:A,getWatchables:d(w,
function(a){var b=[];a=a||[];for(var d=f(a),e=d.length,g=0;g<e;g++){var h=a===d?g:d[g],l=a[h],h=C(l,h),l=x(l,h);b.push(l);if(n[2]||n[1])l=v(c,h),b.push(l);n[4]&&(h=L(c,h),b.push(h))}return b}),getOptions:function(){for(var a=[],b={},d=w(c)||[],g=f(d),h=g.length,n=0;n<h;n++){var p=d===g?n:g[n],r=C(d[p],p),q=u(c,r),p=x(q,r),s=v(c,r),y=z(c,r),r=L(c,r),q=new e(p,q,s,y,r);a.push(q);b[p]=q}return{items:a,selectValueMap:b,getOptionFromViewValue:function(a){return b[A(a)]},getViewValueFromOption:function(a){return t?
sa(a.viewValue):a.viewValue}}}}}var f=y.document.createElement("option"),e=y.document.createElement("optgroup");return{restrict:"A",terminal:!0,require:["select","ngModel"],link:{pre:function(a,b,c,d){d[0].registerOption=w},post:function(d,h,k,l){function m(a,b){a.element=b;b.disabled=a.disabled;a.label!==b.label&&(b.label=a.label,b.textContent=a.label);b.value=a.selectValue}function n(){var a=w&&r.readValue();if(w)for(var b=w.items.length-1;0<=b;b--){var c=w.items[b];x(c.group)?Fb(c.element.parentNode):
Fb(c.element)}w=C.getOptions();var d={};A&&h.prepend(u);w.items.forEach(function(a){var b;if(x(a.group)){b=d[a.group];b||(b=e.cloneNode(!1),D.appendChild(b),b.label=null===a.group?"null":a.group,d[a.group]=b);var c=f.cloneNode(!1)}else b=D,c=f.cloneNode(!1);b.appendChild(c);m(a,c)});h[0].appendChild(D);s.$render();s.$isEmpty(a)||(b=r.readValue(),(C.trackBy||t?na(a,b):a===b)||(s.$setViewValue(b),s.$render()))}var r=l[0],s=l[1],t=k.multiple,u;l=0;for(var p=h.children(),z=p.length;l<z;l++)if(""===p[l].value){u=
p.eq(l);break}var A=!!u,v=!1,y=F(f.cloneNode(!1));y.val("?");var w,C=c(k.ngOptions,h,d),D=b[0].createDocumentFragment(),E=function(){A?v&&u.removeAttr("selected"):u.remove()};t?(s.$isEmpty=function(a){return!a||0===a.length},r.writeValue=function(a){w.items.forEach(function(a){a.element.selected=!1});a&&a.forEach(function(a){if(a=w.getOptionFromViewValue(a))a.element.selected=!0})},r.readValue=function(){var a=h.val()||[],b=[];q(a,function(a){(a=w.selectValueMap[a])&&!a.disabled&&b.push(w.getViewValueFromOption(a))});
return b},C.trackBy&&d.$watchCollection(function(){if(I(s.$viewValue))return s.$viewValue.map(function(a){return C.getTrackByValue(a)})},function(){s.$render()})):(r.writeValue=function(a){var b=w.selectValueMap[h.val()],c=w.getOptionFromViewValue(a);b&&b.element.removeAttribute("selected");c?(h[0].value!==c.selectValue&&(y.remove(),E(),h[0].value=c.selectValue,c.element.selected=!0),c.element.setAttribute("selected","selected")):null===a||A?(y.remove(),A||h.prepend(u),h.val(""),v&&(u.prop("selected",
!0),u.attr("selected",!0))):(E(),h.prepend(y),h.val("?"),y.prop("selected",!0),y.attr("selected",!0))},r.readValue=function(){var a=w.selectValueMap[h.val()];return a&&!a.disabled?(E(),y.remove(),w.getViewValueFromOption(a)):null},C.trackBy&&d.$watch(function(){return C.getTrackByValue(s.$viewValue)},function(){s.$render()}));A?(u.remove(),a(u)(d),8===u[0].nodeType?(v=!1,r.registerOption=function(a,b){""===b.val()&&(v=!0,u=b,u.removeClass("ng-scope"),s.$render(),b.on("$destroy",function(){u=void 0;
v=!1}))}):(u.removeClass("ng-scope"),v=!0)):u=F(f.cloneNode(!1));h.empty();n();d.$watchCollection(C.getWatchables,n)}}}}],Ve=["$locale","$interpolate","$log",function(a,b,d){var c=/{}/g,f=/^when(Minus)?(.+)$/;return{link:function(e,g,h){function k(a){g.text(a||"")}var l=h.count,m=h.$attr.when&&g.attr(h.$attr.when),n=h.offset||0,r=e.$eval(m)||{},s={},t=b.startSymbol(),u=b.endSymbol(),p=t+l+"-"+n+u,x=$.noop,A;q(h,function(a,b){var c=f.exec(b);c&&(c=(c[1]?"-":"")+Q(c[2]),r[c]=g.attr(h.$attr[b]))});q(r,
function(a,d){s[d]=b(a.replace(c,p))});e.$watch(l,function(b){var c=parseFloat(b),f=ia(c);f||c in r||(c=a.pluralCat(c-n));c===A||f&&ia(A)||(x(),f=s[c],z(f)?(null!=b&&d.debug("ngPluralize: no rule defined for '"+c+"' in "+m),x=w,k()):x=e.$watch(f,k),A=c)})}}}],We=["$parse","$animate","$compile",function(a,b,d){var c=G("ngRepeat"),f=function(a,b,c,d,f,m,n){a[c]=d;f&&(a[f]=m);a.$index=b;a.$first=0===b;a.$last=b===n-1;a.$middle=!(a.$first||a.$last);a.$odd=!(a.$even=0===(b&1))};return{restrict:"A",multiElement:!0,
transclude:"element",priority:1E3,terminal:!0,$$tlb:!0,compile:function(e,g){var h=g.ngRepeat,k=d.$$createComment("end ngRepeat",h),l=h.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);if(!l)throw c("iexp",h);var m=l[1],n=l[2],r=l[3],s=l[4],l=m.match(/^(?:(\s*[$\w]+)|\(\s*([$\w]+)\s*,\s*([$\w]+)\s*\))$/);if(!l)throw c("iidexp",m);var t=l[3]||l[1],u=l[2];if(r&&(!/^[$a-zA-Z_][$a-zA-Z0-9_]*$/.test(r)||/^(null|undefined|this|\$index|\$first|\$middle|\$last|\$even|\$odd|\$parent|\$root|\$id)$/.test(r)))throw c("badident",
r);var p,x,A,v,w={$id:Aa};s?p=a(s):(A=function(a,b){return Aa(b)},v=function(a){return a});return function(a,d,e,g,l){p&&(x=function(b,c,d){u&&(w[u]=b);w[t]=c;w.$index=d;return p(a,w)});var m=V();a.$watchCollection(n,function(e){var g,n,p=d[0],s,w=V(),z,y,C,D,F,E,G;r&&(a[r]=e);if(la(e))F=e,n=x||A;else for(G in n=x||v,F=[],e)ua.call(e,G)&&"$"!==G.charAt(0)&&F.push(G);z=F.length;G=Array(z);for(g=0;g<z;g++)if(y=e===F?g:F[g],C=e[y],D=n(y,C,g),m[D])E=m[D],delete m[D],w[D]=E,G[g]=E;else{if(w[D])throw q(G,
function(a){a&&a.scope&&(m[a.id]=a)}),c("dupes",h,D,C);G[g]={id:D,scope:void 0,clone:void 0};w[D]=!0}for(s in m){E=m[s];D=vb(E.clone);b.leave(D);if(D[0].parentNode)for(g=0,n=D.length;g<n;g++)D[g].$$NG_REMOVED=!0;E.scope.$destroy()}for(g=0;g<z;g++)if(y=e===F?g:F[g],C=e[y],E=G[g],E.scope){s=p;do s=s.nextSibling;while(s&&s.$$NG_REMOVED);E.clone[0]!==s&&b.move(vb(E.clone),null,p);p=E.clone[E.clone.length-1];f(E.scope,g,t,C,u,y,z)}else l(function(a,c){E.scope=c;var d=k.cloneNode(!1);a[a.length++]=d;b.enter(a,
null,p);p=d;E.clone=a;w[E.id]=E;f(E.scope,g,t,C,u,y,z)});m=w})}}}}],Xe=["$animate",function(a){return{restrict:"A",multiElement:!0,link:function(b,d,c){b.$watch(c.ngShow,function(b){a[b?"removeClass":"addClass"](d,"ng-hide",{tempClasses:"ng-hide-animate"})})}}}],Qe=["$animate",function(a){return{restrict:"A",multiElement:!0,link:function(b,d,c){b.$watch(c.ngHide,function(b){a[b?"addClass":"removeClass"](d,"ng-hide",{tempClasses:"ng-hide-animate"})})}}}],Ye=Va(function(a,b,d){a.$watch(d.ngStyle,function(a,
d){d&&a!==d&&q(d,function(a,c){b.css(c,"")});a&&b.css(a)},!0)}),Ze=["$animate","$compile",function(a,b){return{require:"ngSwitch",controller:["$scope",function(){this.cases={}}],link:function(d,c,f,e){var g=[],h=[],k=[],l=[],m=function(a,b){return function(c){!1!==c&&a.splice(b,1)}};d.$watch(f.ngSwitch||f.on,function(c){for(var d,f;k.length;)a.cancel(k.pop());d=0;for(f=l.length;d<f;++d){var t=vb(h[d].clone);l[d].$destroy();(k[d]=a.leave(t)).done(m(k,d))}h.length=0;l.length=0;(g=e.cases["!"+c]||e.cases["?"])&&
q(g,function(c){c.transclude(function(d,e){l.push(e);var f=c.element;d[d.length++]=b.$$createComment("end ngSwitchWhen");h.push({clone:d});a.enter(d,f.parent(),f)})})})}}}],$e=Va({transclude:"element",priority:1200,require:"^ngSwitch",multiElement:!0,link:function(a,b,d,c,f){a=d.ngSwitchWhen.split(d.ngSwitchWhenSeparator).sort().filter(function(a,b,c){return c[b-1]!==a});q(a,function(a){c.cases["!"+a]=c.cases["!"+a]||[];c.cases["!"+a].push({transclude:f,element:b})})}}),af=Va({transclude:"element",
priority:1200,require:"^ngSwitch",multiElement:!0,link:function(a,b,d,c,f){c.cases["?"]=c.cases["?"]||[];c.cases["?"].push({transclude:f,element:b})}}),kh=G("ngTransclude"),cf=["$compile",function(a){return{restrict:"EAC",terminal:!0,compile:function(b){var d=a(b.contents());b.empty();return function(a,b,e,g,h){function k(){d(a,function(a){b.append(a)})}if(!h)throw kh("orphan",ya(b));e.ngTransclude===e.$attr.ngTransclude&&(e.ngTransclude="");e=e.ngTransclude||e.ngTranscludeSlot;h(function(a,c){a.length?
b.append(a):(k(),c.$destroy())},null,e);e&&!h.isSlotFilled(e)&&k()}}}}],Ee=["$templateCache",function(a){return{restrict:"E",terminal:!0,compile:function(b,d){"text/ng-template"===d.type&&a.put(d.id,b[0].text)}}}],lh={$setViewValue:w,$render:w},mh=["$element","$scope",function(a,b){var d=this,c=new Sa;d.ngModelCtrl=lh;d.unknownOption=F(y.document.createElement("option"));d.renderUnknownOption=function(b){b="? "+Aa(b)+" ?";d.unknownOption.val(b);a.prepend(d.unknownOption);a.val(b)};b.$on("$destroy",
function(){d.renderUnknownOption=w});d.removeUnknownOption=function(){d.unknownOption.parent()&&d.unknownOption.remove()};d.readValue=function(){d.removeUnknownOption();return a.val()};d.writeValue=function(b){d.hasOption(b)?(d.removeUnknownOption(),a.val(b),""===b&&d.emptyOption.prop("selected",!0)):null==b&&d.emptyOption?(d.removeUnknownOption(),a.val("")):d.renderUnknownOption(b)};d.addOption=function(a,b){if(8!==b[0].nodeType){Ra(a,'"option value"');""===a&&(d.emptyOption=b);var g=c.get(a)||0;
c.put(a,g+1);d.ngModelCtrl.$render();b[0].hasAttribute("selected")&&(b[0].selected=!0)}};d.removeOption=function(a){var b=c.get(a);b&&(1===b?(c.remove(a),""===a&&(d.emptyOption=void 0)):c.put(a,b-1))};d.hasOption=function(a){return!!c.get(a)};d.registerOption=function(a,b,c,h,k){if(h){var l;c.$observe("value",function(a){x(l)&&d.removeOption(l);l=a;d.addOption(a,b)})}else k?a.$watch(k,function(a,f){c.$set("value",a);f!==a&&d.removeOption(f);d.addOption(a,b)}):d.addOption(c.value,b);b.on("$destroy",
function(){d.removeOption(c.value);d.ngModelCtrl.$render()})}}],Fe=function(){return{restrict:"E",require:["select","?ngModel"],controller:mh,priority:1,link:{pre:function(a,b,d,c){var f=c[1];if(f){var e=c[0];e.ngModelCtrl=f;b.on("change",function(){a.$apply(function(){f.$setViewValue(e.readValue())})});if(d.multiple){e.readValue=function(){var a=[];q(b.find("option"),function(b){b.selected&&a.push(b.value)});return a};e.writeValue=function(a){var c=new Sa(a);q(b.find("option"),function(a){a.selected=
x(c.get(a.value))})};var g,h=NaN;a.$watch(function(){h!==f.$viewValue||na(g,f.$viewValue)||(g=ka(f.$viewValue),f.$render());h=f.$viewValue});f.$isEmpty=function(a){return!a||0===a.length}}}},post:function(a,b,d,c){var f=c[1];if(f){var e=c[0];f.$render=function(){e.writeValue(f.$viewValue)}}}}}},Ge=["$interpolate",function(a){return{restrict:"E",priority:100,compile:function(b,d){var c,f;x(d.ngValue)?c=!0:x(d.value)?c=a(d.value,!0):(f=a(b.text(),!0))||d.$set("value",b.text());return function(a,b,d){var k=
b.parent();(k=k.data("$selectController")||k.parent().data("$selectController"))&&k.registerOption(a,b,d,c,f)}}}}],Nc=function(){return{restrict:"A",require:"?ngModel",link:function(a,b,d,c){c&&(d.required=!0,c.$validators.required=function(a,b){return!d.required||!c.$isEmpty(b)},d.$observe("required",function(){c.$validate()}))}}},Mc=function(){return{restrict:"A",require:"?ngModel",link:function(a,b,d,c){if(c){var f,e=d.ngPattern||d.pattern;d.$observe("pattern",function(a){D(a)&&0<a.length&&(a=
new RegExp("^"+a+"$"));if(a&&!a.test)throw G("ngPattern")("noregexp",e,a,ya(b));f=a||void 0;c.$validate()});c.$validators.pattern=function(a,b){return c.$isEmpty(b)||z(f)||f.test(b)}}}}},Pc=function(){return{restrict:"A",require:"?ngModel",link:function(a,b,d,c){if(c){var f=-1;d.$observe("maxlength",function(a){a=Z(a);f=ia(a)?-1:a;c.$validate()});c.$validators.maxlength=function(a,b){return 0>f||c.$isEmpty(b)||b.length<=f}}}}},Oc=function(){return{restrict:"A",require:"?ngModel",link:function(a,b,
d,c){if(c){var f=0;d.$observe("minlength",function(a){f=Z(a)||0;c.$validate()});c.$validators.minlength=function(a,b){return c.$isEmpty(b)||b.length>=f}}}}};y.angular.bootstrap?y.console&&console.log("WARNING: Tried to load angular more than once."):(xe(),ze($),$.module("ngLocale",[],["$provide",function(a){function b(a){a+="";var b=a.indexOf(".");return-1==b?0:a.length-b-1}a.value("$locale",{DATETIME_FORMATS:{AMPMS:["AM","PM"],DAY:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
ERANAMES:["Before Christ","Anno Domini"],ERAS:["BC","AD"],FIRSTDAYOFWEEK:6,MONTH:"January February March April May June July August September October November December".split(" "),SHORTDAY:"Sun Mon Tue Wed Thu Fri Sat".split(" "),SHORTMONTH:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),STANDALONEMONTH:"January February March April May June July August September October November December".split(" "),WEEKENDRANGE:[5,6],fullDate:"EEEE, MMMM d, y",longDate:"MMMM d, y",medium:"MMM d, y h:mm:ss a",
mediumDate:"MMM d, y",mediumTime:"h:mm:ss a","short":"M/d/yy h:mm a",shortDate:"M/d/yy",shortTime:"h:mm a"},NUMBER_FORMATS:{CURRENCY_SYM:"$",DECIMAL_SEP:".",GROUP_SEP:",",PATTERNS:[{gSize:3,lgSize:3,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,maxFrac:2,minFrac:2,minInt:1,negPre:"-\u00a4",negSuf:"",posPre:"\u00a4",posSuf:""}]},id:"en-us",localeID:"en_US",pluralCat:function(a,c){var f=a|0,e=c;void 0===e&&(e=Math.min(b(a),3));Math.pow(10,e);return 1==f&&0==
e?"one":"other"}})}]),F(y.document).ready(function(){se(y.document,Gc)}))})(window);!window.angular.$$csp().noInlineStyle&&window.angular.element(document.head).prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\\:form{display:block;}.ng-animate-shim{visibility:hidden;}.ng-anchor{position:absolute;}</style>');
//# sourceMappingURL=angular.min.js.map

/*
 AngularJS v1.5.11
 (c) 2010-2017 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(R,B){'use strict';function Da(a,b,c){if(!a)throw Ma("areq",b||"?",c||"required");return a}function Ea(a,b){if(!a&&!b)return"";if(!a)return b;if(!b)return a;X(a)&&(a=a.join(" "));X(b)&&(b=b.join(" "));return a+" "+b}function Na(a){var b={};a&&(a.to||a.from)&&(b.to=a.to,b.from=a.from);return b}function Y(a,b,c){var d="";a=X(a)?a:a&&G(a)&&a.length?a.split(/\s+/):[];s(a,function(a,l){a&&0<a.length&&(d+=0<l?" ":"",d+=c?b+a:a+b)});return d}function Oa(a){if(a instanceof F)switch(a.length){case 0:return a;
case 1:if(1===a[0].nodeType)return a;break;default:return F(ta(a))}if(1===a.nodeType)return F(a)}function ta(a){if(!a[0])return a;for(var b=0;b<a.length;b++){var c=a[b];if(1===c.nodeType)return c}}function Pa(a,b,c){s(b,function(b){a.addClass(b,c)})}function Qa(a,b,c){s(b,function(b){a.removeClass(b,c)})}function Z(a){return function(b,c){c.addClass&&(Pa(a,b,c.addClass),c.addClass=null);c.removeClass&&(Qa(a,b,c.removeClass),c.removeClass=null)}}function oa(a){a=a||{};if(!a.$$prepared){var b=a.domOperation||
P;a.domOperation=function(){a.$$domOperationFired=!0;b();b=P};a.$$prepared=!0}return a}function ha(a,b){Fa(a,b);Ga(a,b)}function Fa(a,b){b.from&&(a.css(b.from),b.from=null)}function Ga(a,b){b.to&&(a.css(b.to),b.to=null)}function V(a,b,c){var d=b.options||{};c=c.options||{};var e=(d.addClass||"")+" "+(c.addClass||""),l=(d.removeClass||"")+" "+(c.removeClass||"");a=Ra(a.attr("class"),e,l);c.preparationClasses&&(d.preparationClasses=$(c.preparationClasses,d.preparationClasses),delete c.preparationClasses);
e=d.domOperation!==P?d.domOperation:null;ua(d,c);e&&(d.domOperation=e);d.addClass=a.addClass?a.addClass:null;d.removeClass=a.removeClass?a.removeClass:null;b.addClass=d.addClass;b.removeClass=d.removeClass;return d}function Ra(a,b,c){function d(a){G(a)&&(a=a.split(" "));var b={};s(a,function(a){a.length&&(b[a]=!0)});return b}var e={};a=d(a);b=d(b);s(b,function(a,b){e[b]=1});c=d(c);s(c,function(a,b){e[b]=1===e[b]?null:-1});var l={addClass:"",removeClass:""};s(e,function(b,c){var d,e;1===b?(d="addClass",
e=!a[c]||a[c+"-remove"]):-1===b&&(d="removeClass",e=a[c]||a[c+"-add"]);e&&(l[d].length&&(l[d]+=" "),l[d]+=c)});return l}function y(a){return a instanceof F?a[0]:a}function Sa(a,b,c){var d="";b&&(d=Y(b,"ng-",!0));c.addClass&&(d=$(d,Y(c.addClass,"-add")));c.removeClass&&(d=$(d,Y(c.removeClass,"-remove")));d.length&&(c.preparationClasses=d,a.addClass(d))}function pa(a,b){var c=b?"-"+b+"s":"";la(a,[ma,c]);return[ma,c]}function va(a,b){var c=b?"paused":"",d=aa+"PlayState";la(a,[d,c]);return[d,c]}function la(a,
b){a.style[b[0]]=b[1]}function $(a,b){return a?b?a+" "+b:a:b}function Ha(a,b,c){var d=Object.create(null),e=a.getComputedStyle(b)||{};s(c,function(a,b){var c=e[a];if(c){var g=c.charAt(0);if("-"===g||"+"===g||0<=g)c=Ta(c);0===c&&(c=null);d[b]=c}});return d}function Ta(a){var b=0;a=a.split(/\s*,\s*/);s(a,function(a){"s"===a.charAt(a.length-1)&&(a=a.substring(0,a.length-1));a=parseFloat(a)||0;b=b?Math.max(a,b):a});return b}function wa(a){return 0===a||null!=a}function Ia(a,b){var c=S,d=a+"s";b?c+="Duration":
d+=" linear all";return[c,d]}function Ja(){var a=Object.create(null);return{flush:function(){a=Object.create(null)},count:function(b){return(b=a[b])?b.total:0},get:function(b){return(b=a[b])&&b.value},put:function(b,c){a[b]?a[b].total++:a[b]={total:1,value:c}}}}function Ka(a,b,c){s(c,function(c){a[c]=xa(a[c])?a[c]:b.style.getPropertyValue(c)})}var S,ya,aa,za;void 0===R.ontransitionend&&void 0!==R.onwebkittransitionend?(S="WebkitTransition",ya="webkitTransitionEnd transitionend"):(S="transition",ya=
"transitionend");void 0===R.onanimationend&&void 0!==R.onwebkitanimationend?(aa="WebkitAnimation",za="webkitAnimationEnd animationend"):(aa="animation",za="animationend");var qa=aa+"Delay",Aa=aa+"Duration",ma=S+"Delay",La=S+"Duration",Ma=B.$$minErr("ng"),Ua={transitionDuration:La,transitionDelay:ma,transitionProperty:S+"Property",animationDuration:Aa,animationDelay:qa,animationIterationCount:aa+"IterationCount"},Va={transitionDuration:La,transitionDelay:ma,animationDuration:Aa,animationDelay:qa},
Ba,ua,s,X,xa,ea,Ca,ba,G,J,F,P;B.module("ngAnimate",[],function(){P=B.noop;Ba=B.copy;ua=B.extend;F=B.element;s=B.forEach;X=B.isArray;G=B.isString;ba=B.isObject;J=B.isUndefined;xa=B.isDefined;Ca=B.isFunction;ea=B.isElement}).directive("ngAnimateSwap",["$animate","$rootScope",function(a,b){return{restrict:"A",transclude:"element",terminal:!0,priority:600,link:function(b,d,e,l,n){var I,g;b.$watchCollection(e.ngAnimateSwap||e["for"],function(e){I&&a.leave(I);g&&(g.$destroy(),g=null);if(e||0===e)g=b.$new(),
n(g,function(b){I=b;a.enter(b,null,d)})})}}}]).directive("ngAnimateChildren",["$interpolate",function(a){return{link:function(b,c,d){function e(a){c.data("$$ngAnimateChildren","on"===a||"true"===a)}var l=d.ngAnimateChildren;G(l)&&0===l.length?c.data("$$ngAnimateChildren",!0):(e(a(l)(b)),d.$observe("ngAnimateChildren",e))}}}]).factory("$$rAFScheduler",["$$rAF",function(a){function b(a){d=d.concat(a);c()}function c(){if(d.length){for(var b=d.shift(),n=0;n<b.length;n++)b[n]();e||a(function(){e||c()})}}
var d,e;d=b.queue=[];b.waitUntilQuiet=function(b){e&&e();e=a(function(){e=null;b();c()})};return b}]).provider("$$animateQueue",["$animateProvider",function(a){function b(a){if(!a)return null;a=a.split(" ");var b=Object.create(null);s(a,function(a){b[a]=!0});return b}function c(a,c){if(a&&c){var d=b(c);return a.split(" ").some(function(a){return d[a]})}}function d(a,b,c,d){return l[a].some(function(a){return a(b,c,d)})}function e(a,b){var c=0<(a.addClass||"").length,d=0<(a.removeClass||"").length;
return b?c&&d:c||d}var l=this.rules={skip:[],cancel:[],join:[]};l.join.push(function(a,b,c){return!b.structural&&e(b)});l.skip.push(function(a,b,c){return!b.structural&&!e(b)});l.skip.push(function(a,b,c){return"leave"===c.event&&b.structural});l.skip.push(function(a,b,c){return c.structural&&2===c.state&&!b.structural});l.cancel.push(function(a,b,c){return c.structural&&b.structural});l.cancel.push(function(a,b,c){return 2===c.state&&b.structural});l.cancel.push(function(a,b,d){if(d.structural)return!1;
a=b.addClass;b=b.removeClass;var e=d.addClass;d=d.removeClass;return J(a)&&J(b)||J(e)&&J(d)?!1:c(a,d)||c(b,e)});this.$get=["$$rAF","$rootScope","$rootElement","$document","$$HashMap","$$animation","$$AnimateRunner","$templateRequest","$$jqLite","$$forceReflow",function(b,c,g,l,C,Wa,Q,t,H,T){function O(){var a=!1;return function(b){a?b():c.$$postDigest(function(){a=!0;b()})}}function x(a,b,c){var f=y(b),d=y(a),N=[];(a=h[c])&&s(a,function(a){w.call(a.node,f)?N.push(a.callback):"leave"===c&&w.call(a.node,
d)&&N.push(a.callback)});return N}function r(a,b,c){var f=ta(b);return a.filter(function(a){return!(a.node===f&&(!c||a.callback===c))})}function p(a,h,v){function r(c,f,d,h){sa(function(){var c=x(T,a,f);c.length?b(function(){s(c,function(b){b(a,d,h)});"close"!==d||a[0].parentNode||ra.off(a)}):"close"!==d||a[0].parentNode||ra.off(a)});c.progress(f,d,h)}function k(b){var c=a,f=m;f.preparationClasses&&(c.removeClass(f.preparationClasses),f.preparationClasses=null);f.activeClasses&&(c.removeClass(f.activeClasses),
f.activeClasses=null);E(a,m);ha(a,m);m.domOperation();A.complete(!b)}var m=Ba(v),p,T;if(a=Oa(a))p=y(a),T=a.parent();var m=oa(m),A=new Q,sa=O();X(m.addClass)&&(m.addClass=m.addClass.join(" "));m.addClass&&!G(m.addClass)&&(m.addClass=null);X(m.removeClass)&&(m.removeClass=m.removeClass.join(" "));m.removeClass&&!G(m.removeClass)&&(m.removeClass=null);m.from&&!ba(m.from)&&(m.from=null);m.to&&!ba(m.to)&&(m.to=null);if(!p)return k(),A;v=[p.className,m.addClass,m.removeClass].join(" ");if(!Xa(v))return k(),
A;var g=0<=["enter","move","leave"].indexOf(h),w=l[0].hidden,t=!f||w||N.get(p);v=!t&&z.get(p)||{};var H=!!v.state;t||H&&1===v.state||(t=!M(a,T,h));if(t)return w&&r(A,h,"start"),k(),w&&r(A,h,"close"),A;g&&K(a);w={structural:g,element:a,event:h,addClass:m.addClass,removeClass:m.removeClass,close:k,options:m,runner:A};if(H){if(d("skip",a,w,v)){if(2===v.state)return k(),A;V(a,v,w);return v.runner}if(d("cancel",a,w,v))if(2===v.state)v.runner.end();else if(v.structural)v.close();else return V(a,v,w),v.runner;
else if(d("join",a,w,v))if(2===v.state)V(a,w,{});else return Sa(a,g?h:null,m),h=w.event=v.event,m=V(a,v,w),v.runner}else V(a,w,{});(H=w.structural)||(H="animate"===w.event&&0<Object.keys(w.options.to||{}).length||e(w));if(!H)return k(),ka(a),A;var C=(v.counter||0)+1;w.counter=C;L(a,1,w);c.$$postDigest(function(){var b=z.get(p),c=!b,b=b||{},f=0<(a.parent()||[]).length&&("animate"===b.event||b.structural||e(b));if(c||b.counter!==C||!f){c&&(E(a,m),ha(a,m));if(c||g&&b.event!==h)m.domOperation(),A.end();
f||ka(a)}else h=!b.structural&&e(b,!0)?"setClass":b.event,L(a,2),b=Wa(a,h,b.options),A.setHost(b),r(A,h,"start",{}),b.done(function(b){k(!b);(b=z.get(p))&&b.counter===C&&ka(y(a));r(A,h,"close",{})})});return A}function K(a){a=y(a).querySelectorAll("[data-ng-animate]");s(a,function(a){var b=parseInt(a.getAttribute("data-ng-animate"),10),c=z.get(a);if(c)switch(b){case 2:c.runner.end();case 1:z.remove(a)}})}function ka(a){a=y(a);a.removeAttribute("data-ng-animate");z.remove(a)}function k(a,b){return y(a)===
y(b)}function M(a,b,c){c=F(l[0].body);var f=k(a,c)||"HTML"===a[0].nodeName,d=k(a,g),h=!1,r,e=N.get(y(a));(a=F.data(a[0],"$ngAnimatePin"))&&(b=a);for(b=y(b);b;){d||(d=k(b,g));if(1!==b.nodeType)break;a=z.get(b)||{};if(!h){var p=N.get(b);if(!0===p&&!1!==e){e=!0;break}else!1===p&&(e=!1);h=a.structural}if(J(r)||!0===r)a=F.data(b,"$$ngAnimateChildren"),xa(a)&&(r=a);if(h&&!1===r)break;f||(f=k(b,c));if(f&&d)break;if(!d&&(a=F.data(b,"$ngAnimatePin"))){b=y(a);continue}b=b.parentNode}return(!h||r)&&!0!==e&&
d&&f}function L(a,b,c){c=c||{};c.state=b;a=y(a);a.setAttribute("data-ng-animate",b);c=(b=z.get(a))?ua(b,c):c;z.put(a,c)}var z=new C,N=new C,f=null,A=c.$watch(function(){return 0===t.totalPendingRequests},function(a){a&&(A(),c.$$postDigest(function(){c.$$postDigest(function(){null===f&&(f=!0)})}))}),h=Object.create(null),sa=a.classNameFilter(),Xa=sa?function(a){return sa.test(a)}:function(){return!0},E=Z(H),w=R.Node.prototype.contains||function(a){return this===a||!!(this.compareDocumentPosition(a)&
16)},ra={on:function(a,b,c){var f=ta(b);h[a]=h[a]||[];h[a].push({node:f,callback:c});F(b).on("$destroy",function(){z.get(f)||ra.off(a,b,c)})},off:function(a,b,c){if(1!==arguments.length||G(arguments[0])){var f=h[a];f&&(h[a]=1===arguments.length?null:r(f,b,c))}else for(f in b=arguments[0],h)h[f]=r(h[f],b)},pin:function(a,b){Da(ea(a),"element","not an element");Da(ea(b),"parentElement","not an element");a.data("$ngAnimatePin",b)},push:function(a,b,c,f){c=c||{};c.domOperation=f;return p(a,b,c)},enabled:function(a,
b){var c=arguments.length;if(0===c)b=!!f;else if(ea(a)){var d=y(a);1===c?b=!N.get(d):N.put(d,!b)}else b=f=!!a;return b}};return ra}]}]).provider("$$animation",["$animateProvider",function(a){var b=this.drivers=[];this.$get=["$$jqLite","$rootScope","$injector","$$AnimateRunner","$$HashMap","$$rAFScheduler",function(a,d,e,l,n,I){function g(a){function b(a){if(a.processed)return a;a.processed=!0;var d=a.domNode,p=d.parentNode;e.put(d,a);for(var K;p;){if(K=e.get(p)){K.processed||(K=b(K));break}p=p.parentNode}(K||
c).children.push(a);return a}var c={children:[]},d,e=new n;for(d=0;d<a.length;d++){var g=a[d];e.put(g.domNode,a[d]={domNode:g.domNode,fn:g.fn,children:[]})}for(d=0;d<a.length;d++)b(a[d]);return function(a){var b=[],c=[],d;for(d=0;d<a.children.length;d++)c.push(a.children[d]);a=c.length;var e=0,k=[];for(d=0;d<c.length;d++){var g=c[d];0>=a&&(a=e,e=0,b.push(k),k=[]);k.push(g.fn);g.children.forEach(function(a){e++;c.push(a)});a--}k.length&&b.push(k);return b}(c)}var u=[],C=Z(a);return function(n,Q,t){function H(a){a=
a.hasAttribute("ng-animate-ref")?[a]:a.querySelectorAll("[ng-animate-ref]");var b=[];s(a,function(a){var c=a.getAttribute("ng-animate-ref");c&&c.length&&b.push(a)});return b}function T(a){var b=[],c={};s(a,function(a,d){var h=y(a.element),e=0<=["enter","move"].indexOf(a.event),h=a.structural?H(h):[];if(h.length){var k=e?"to":"from";s(h,function(a){var b=a.getAttribute("ng-animate-ref");c[b]=c[b]||{};c[b][k]={animationID:d,element:F(a)}})}else b.push(a)});var d={},e={};s(c,function(c,k){var r=c.from,
p=c.to;if(r&&p){var z=a[r.animationID],g=a[p.animationID],A=r.animationID.toString();if(!e[A]){var n=e[A]={structural:!0,beforeStart:function(){z.beforeStart();g.beforeStart()},close:function(){z.close();g.close()},classes:O(z.classes,g.classes),from:z,to:g,anchors:[]};n.classes.length?b.push(n):(b.push(z),b.push(g))}e[A].anchors.push({out:r.element,"in":p.element})}else r=r?r.animationID:p.animationID,p=r.toString(),d[p]||(d[p]=!0,b.push(a[r]))});return b}function O(a,b){a=a.split(" ");b=b.split(" ");
for(var c=[],d=0;d<a.length;d++){var e=a[d];if("ng-"!==e.substring(0,3))for(var r=0;r<b.length;r++)if(e===b[r]){c.push(e);break}}return c.join(" ")}function x(a){for(var c=b.length-1;0<=c;c--){var d=e.get(b[c])(a);if(d)return d}}function r(a,b){function c(a){(a=a.data("$$animationRunner"))&&a.setHost(b)}a.from&&a.to?(c(a.from.element),c(a.to.element)):c(a.element)}function p(){var a=n.data("$$animationRunner");!a||"leave"===Q&&t.$$domOperationFired||a.end()}function K(b){n.off("$destroy",p);n.removeData("$$animationRunner");
C(n,t);ha(n,t);t.domOperation();L&&a.removeClass(n,L);n.removeClass("ng-animate");k.complete(!b)}t=oa(t);var ka=0<=["enter","move","leave"].indexOf(Q),k=new l({end:function(){K()},cancel:function(){K(!0)}});if(!b.length)return K(),k;n.data("$$animationRunner",k);var M=Ea(n.attr("class"),Ea(t.addClass,t.removeClass)),L=t.tempClasses;L&&(M+=" "+L,t.tempClasses=null);var z;ka&&(z="ng-"+Q+"-prepare",a.addClass(n,z));u.push({element:n,classes:M,event:Q,structural:ka,options:t,beforeStart:function(){n.addClass("ng-animate");
L&&a.addClass(n,L);z&&(a.removeClass(n,z),z=null)},close:K});n.on("$destroy",p);if(1<u.length)return k;d.$$postDigest(function(){var a=[];s(u,function(b){b.element.data("$$animationRunner")?a.push(b):b.close()});u.length=0;var b=T(a),c=[];s(b,function(a){c.push({domNode:y(a.from?a.from.element:a.element),fn:function(){a.beforeStart();var b,c=a.close;if((a.anchors?a.from.element||a.to.element:a.element).data("$$animationRunner")){var d=x(a);d&&(b=d.start)}b?(b=b(),b.done(function(a){c(!a)}),r(a,b)):
c()}})});I(g(c))});return k}}]}]).provider("$animateCss",["$animateProvider",function(a){var b=Ja(),c=Ja();this.$get=["$window","$$jqLite","$$AnimateRunner","$timeout","$$forceReflow","$sniffer","$$rAFScheduler","$$animateQueue",function(a,e,l,n,I,g,u,C){function B(a,b){var c=a.parentNode;return(c.$$ngAnimateParentKey||(c.$$ngAnimateParentKey=++O))+"-"+a.getAttribute("class")+"-"+b}function Q(r,p,g,n){var k;0<b.count(g)&&(k=c.get(g),k||(p=Y(p,"-stagger"),e.addClass(r,p),k=Ha(a,r,n),k.animationDuration=
Math.max(k.animationDuration,0),k.transitionDuration=Math.max(k.transitionDuration,0),e.removeClass(r,p),c.put(g,k)));return k||{}}function t(a){x.push(a);u.waitUntilQuiet(function(){b.flush();c.flush();for(var a=I(),d=0;d<x.length;d++)x[d](a);x.length=0})}function H(c,e,g){e=b.get(g);e||(e=Ha(a,c,Ua),"infinite"===e.animationIterationCount&&(e.animationIterationCount=1));b.put(g,e);c=e;g=c.animationDelay;e=c.transitionDelay;c.maxDelay=g&&e?Math.max(g,e):g||e;c.maxDuration=Math.max(c.animationDuration*
c.animationIterationCount,c.transitionDuration);return c}var T=Z(e),O=0,x=[];return function(a,c){function d(){k()}function u(){k(!0)}function k(b){if(!(w||F&&O)){w=!0;O=!1;f.$$skipPreparationClasses||e.removeClass(a,ga);e.removeClass(a,ea);va(h,!1);pa(h,!1);s(x,function(a){h.style[a[0]]=""});T(a,f);ha(a,f);Object.keys(A).length&&s(A,function(a,b){a?h.style.setProperty(b,a):h.style.removeProperty(b)});if(f.onDone)f.onDone();fa&&fa.length&&a.off(fa.join(" "),z);var c=a.data("$$animateCss");c&&(n.cancel(c[0].timer),
a.removeData("$$animateCss"));G&&G.complete(!b)}}function M(a){q.blockTransition&&pa(h,a);q.blockKeyframeAnimation&&va(h,!!a)}function L(){G=new l({end:d,cancel:u});t(P);k();return{$$willAnimate:!1,start:function(){return G},end:d}}function z(a){a.stopPropagation();var b=a.originalEvent||a;a=b.$manualTimeStamp||Date.now();b=parseFloat(b.elapsedTime.toFixed(3));Math.max(a-Z,0)>=R&&b>=m&&(F=!0,k())}function N(){function b(){if(!w){M(!1);s(x,function(a){h.style[a[0]]=a[1]});T(a,f);e.addClass(a,ea);if(q.recalculateTimingStyles){na=
h.className+" "+ga;ia=B(h,na);D=H(h,na,ia);ca=D.maxDelay;J=Math.max(ca,0);m=D.maxDuration;if(0===m){k();return}q.hasTransitions=0<D.transitionDuration;q.hasAnimations=0<D.animationDuration}q.applyAnimationDelay&&(ca="boolean"!==typeof f.delay&&wa(f.delay)?parseFloat(f.delay):ca,J=Math.max(ca,0),D.animationDelay=ca,da=[qa,ca+"s"],x.push(da),h.style[da[0]]=da[1]);R=1E3*J;V=1E3*m;if(f.easing){var d,g=f.easing;q.hasTransitions&&(d=S+"TimingFunction",x.push([d,g]),h.style[d]=g);q.hasAnimations&&(d=aa+
"TimingFunction",x.push([d,g]),h.style[d]=g)}D.transitionDuration&&fa.push(ya);D.animationDuration&&fa.push(za);Z=Date.now();var p=R+1.5*V;d=Z+p;var g=a.data("$$animateCss")||[],N=!0;if(g.length){var l=g[0];(N=d>l.expectedEndTime)?n.cancel(l.timer):g.push(k)}N&&(p=n(c,p,!1),g[0]={timer:p,expectedEndTime:d},g.push(k),a.data("$$animateCss",g));if(fa.length)a.on(fa.join(" "),z);f.to&&(f.cleanupStyles&&Ka(A,h,Object.keys(f.to)),Ga(a,f))}}function c(){var b=a.data("$$animateCss");if(b){for(var d=1;d<b.length;d++)b[d]();
a.removeData("$$animateCss")}}if(!w)if(h.parentNode){var d=function(a){if(F)O&&a&&(O=!1,k());else if(O=!a,D.animationDuration)if(a=va(h,O),O)x.push(a);else{var b=x,c=b.indexOf(a);0<=a&&b.splice(c,1)}},g=0<ba&&(D.transitionDuration&&0===W.transitionDuration||D.animationDuration&&0===W.animationDuration)&&Math.max(W.animationDelay,W.transitionDelay);g?n(b,Math.floor(g*ba*1E3),!1):b();v.resume=function(){d(!0)};v.pause=function(){d(!1)}}else k()}var f=c||{};f.$$prepared||(f=oa(Ba(f)));var A={},h=y(a);
if(!h||!h.parentNode||!C.enabled())return L();var x=[],I=a.attr("class"),E=Na(f),w,O,F,G,v,J,R,m,V,Z,fa=[];if(0===f.duration||!g.animations&&!g.transitions)return L();var ja=f.event&&X(f.event)?f.event.join(" "):f.event,$="",U="";ja&&f.structural?$=Y(ja,"ng-",!0):ja&&($=ja);f.addClass&&(U+=Y(f.addClass,"-add"));f.removeClass&&(U.length&&(U+=" "),U+=Y(f.removeClass,"-remove"));f.applyClassesEarly&&U.length&&T(a,f);var ga=[$,U].join(" ").trim(),na=I+" "+ga,ea=Y(ga,"-active"),I=E.to&&0<Object.keys(E.to).length;
if(!(0<(f.keyframeStyle||"").length||I||ga))return L();var ia,W;0<f.stagger?(E=parseFloat(f.stagger),W={transitionDelay:E,animationDelay:E,transitionDuration:0,animationDuration:0}):(ia=B(h,na),W=Q(h,ga,ia,Va));f.$$skipPreparationClasses||e.addClass(a,ga);f.transitionStyle&&(E=[S,f.transitionStyle],la(h,E),x.push(E));0<=f.duration&&(E=0<h.style[S].length,E=Ia(f.duration,E),la(h,E),x.push(E));f.keyframeStyle&&(E=[aa,f.keyframeStyle],la(h,E),x.push(E));var ba=W?0<=f.staggerIndex?f.staggerIndex:b.count(ia):
0;(ja=0===ba)&&!f.skipBlocking&&pa(h,9999);var D=H(h,na,ia),ca=D.maxDelay;J=Math.max(ca,0);m=D.maxDuration;var q={};q.hasTransitions=0<D.transitionDuration;q.hasAnimations=0<D.animationDuration;q.hasTransitionAll=q.hasTransitions&&"all"===D.transitionProperty;q.applyTransitionDuration=I&&(q.hasTransitions&&!q.hasTransitionAll||q.hasAnimations&&!q.hasTransitions);q.applyAnimationDuration=f.duration&&q.hasAnimations;q.applyTransitionDelay=wa(f.delay)&&(q.applyTransitionDuration||q.hasTransitions);q.applyAnimationDelay=
wa(f.delay)&&q.hasAnimations;q.recalculateTimingStyles=0<U.length;if(q.applyTransitionDuration||q.applyAnimationDuration)m=f.duration?parseFloat(f.duration):m,q.applyTransitionDuration&&(q.hasTransitions=!0,D.transitionDuration=m,E=0<h.style[S+"Property"].length,x.push(Ia(m,E))),q.applyAnimationDuration&&(q.hasAnimations=!0,D.animationDuration=m,x.push([Aa,m+"s"]));if(0===m&&!q.recalculateTimingStyles)return L();if(null!=f.delay){var da;"boolean"!==typeof f.delay&&(da=parseFloat(f.delay),J=Math.max(da,
0));q.applyTransitionDelay&&x.push([ma,da+"s"]);q.applyAnimationDelay&&x.push([qa,da+"s"])}null==f.duration&&0<D.transitionDuration&&(q.recalculateTimingStyles=q.recalculateTimingStyles||ja);R=1E3*J;V=1E3*m;f.skipBlocking||(q.blockTransition=0<D.transitionDuration,q.blockKeyframeAnimation=0<D.animationDuration&&0<W.animationDelay&&0===W.animationDuration);f.from&&(f.cleanupStyles&&Ka(A,h,Object.keys(f.from)),Fa(a,f));q.blockTransition||q.blockKeyframeAnimation?M(m):f.skipBlocking||pa(h,!1);return{$$willAnimate:!0,
end:d,start:function(){if(!w)return v={end:d,cancel:u,resume:null,pause:null},G=new l(v),t(N),G}}}}]}]).provider("$$animateCssDriver",["$$animationProvider",function(a){a.drivers.push("$$animateCssDriver");this.$get=["$animateCss","$rootScope","$$AnimateRunner","$rootElement","$sniffer","$$jqLite","$document",function(a,c,d,e,l,n,I){function g(a){return a.replace(/\bng-\S+\b/g,"")}function u(a,b){G(a)&&(a=a.split(" "));G(b)&&(b=b.split(" "));return a.filter(function(a){return-1===b.indexOf(a)}).join(" ")}
function C(c,e,n){function l(a){var b={},c=y(a).getBoundingClientRect();s(["width","height","top","left"],function(a){var d=c[a];switch(a){case "top":d+=t.scrollTop;break;case "left":d+=t.scrollLeft}b[a]=Math.floor(d)+"px"});return b}function p(){var c=g(n.attr("class")||""),d=u(c,k),c=u(k,c),d=a(C,{to:l(n),addClass:"ng-anchor-in "+d,removeClass:"ng-anchor-out "+c,delay:!0});return d.$$willAnimate?d:null}function I(){C.remove();e.removeClass("ng-animate-shim");n.removeClass("ng-animate-shim")}var C=
F(y(e).cloneNode(!0)),k=g(C.attr("class")||"");e.addClass("ng-animate-shim");n.addClass("ng-animate-shim");C.addClass("ng-anchor");H.append(C);var M;c=function(){var c=a(C,{addClass:"ng-anchor-out",delay:!0,from:l(e)});return c.$$willAnimate?c:null}();if(!c&&(M=p(),!M))return I();var L=c||M;return{start:function(){function a(){c&&c.end()}var b,c=L.start();c.done(function(){c=null;if(!M&&(M=p()))return c=M.start(),c.done(function(){c=null;I();b.complete()}),c;I();b.complete()});return b=new d({end:a,
cancel:a})}}}function B(a,b,c,e){var g=Q(a,P),n=Q(b,P),l=[];s(e,function(a){(a=C(c,a.out,a["in"]))&&l.push(a)});if(g||n||0!==l.length)return{start:function(){function a(){s(b,function(a){a.end()})}var b=[];g&&b.push(g.start());n&&b.push(n.start());s(l,function(a){b.push(a.start())});var c=new d({end:a,cancel:a});d.all(b,function(a){c.complete(a)});return c}}}function Q(c){var d=c.element,e=c.options||{};c.structural&&(e.event=c.event,e.structural=!0,e.applyClassesEarly=!0,"leave"===c.event&&(e.onDone=
e.domOperation));e.preparationClasses&&(e.event=$(e.event,e.preparationClasses));c=a(d,e);return c.$$willAnimate?c:null}if(!l.animations&&!l.transitions)return P;var t=I[0].body;c=y(e);var H=F(c.parentNode&&11===c.parentNode.nodeType||t.contains(c)?c:t);return function(a){return a.from&&a.to?B(a.from,a.to,a.classes,a.anchors):Q(a)}}]}]).provider("$$animateJs",["$animateProvider",function(a){this.$get=["$injector","$$AnimateRunner","$$jqLite",function(b,c,d){function e(c){c=X(c)?c:c.split(" ");for(var d=
[],e={},l=0;l<c.length;l++){var s=c[l],B=a.$$registeredAnimations[s];B&&!e[s]&&(d.push(b.get(B)),e[s]=!0)}return d}var l=Z(d);return function(a,b,d,u){function C(){u.domOperation();l(a,u)}function B(a,b,d,e,f){switch(d){case "animate":b=[b,e.from,e.to,f];break;case "setClass":b=[b,F,G,f];break;case "addClass":b=[b,F,f];break;case "removeClass":b=[b,G,f];break;default:b=[b,f]}b.push(e);if(a=a.apply(a,b))if(Ca(a.start)&&(a=a.start()),a instanceof c)a.done(f);else if(Ca(a))return a;return P}function y(a,
b,d,e,f){var g=[];s(e,function(e){var k=e[f];k&&g.push(function(){var e,f,g=!1,h=function(a){g||(g=!0,(f||P)(a),e.complete(!a))};e=new c({end:function(){h()},cancel:function(){h(!0)}});f=B(k,a,b,d,function(a){h(!1===a)});return e})});return g}function t(a,b,d,e,f){var g=y(a,b,d,e,f);if(0===g.length){var h,k;"beforeSetClass"===f?(h=y(a,"removeClass",d,e,"beforeRemoveClass"),k=y(a,"addClass",d,e,"beforeAddClass")):"setClass"===f&&(h=y(a,"removeClass",d,e,"removeClass"),k=y(a,"addClass",d,e,"addClass"));
h&&(g=g.concat(h));k&&(g=g.concat(k))}if(0!==g.length)return function(a){var b=[];g.length&&s(g,function(a){b.push(a())});b.length?c.all(b,a):a();return function(a){s(b,function(b){a?b.cancel():b.end()})}}}var H=!1;3===arguments.length&&ba(d)&&(u=d,d=null);u=oa(u);d||(d=a.attr("class")||"",u.addClass&&(d+=" "+u.addClass),u.removeClass&&(d+=" "+u.removeClass));var F=u.addClass,G=u.removeClass,x=e(d),r,p;if(x.length){var K,J;"leave"===b?(J="leave",K="afterLeave"):(J="before"+b.charAt(0).toUpperCase()+
b.substr(1),K=b);"enter"!==b&&"move"!==b&&(r=t(a,b,u,x,J));p=t(a,b,u,x,K)}if(r||p){var k;return{$$willAnimate:!0,end:function(){k?k.end():(H=!0,C(),ha(a,u),k=new c,k.complete(!0));return k},start:function(){function b(c){H=!0;C();ha(a,u);k.complete(c)}if(k)return k;k=new c;var d,e=[];r&&e.push(function(a){d=r(a)});e.length?e.push(function(a){C();a(!0)}):C();p&&e.push(function(a){d=p(a)});k.setHost({end:function(){H||((d||P)(void 0),b(void 0))},cancel:function(){H||((d||P)(!0),b(!0))}});c.chain(e,
b);return k}}}}}]}]).provider("$$animateJsDriver",["$$animationProvider",function(a){a.drivers.push("$$animateJsDriver");this.$get=["$$animateJs","$$AnimateRunner",function(a,c){function d(c){return a(c.element,c.event,c.classes,c.options)}return function(a){if(a.from&&a.to){var b=d(a.from),n=d(a.to);if(b||n)return{start:function(){function a(){return function(){s(d,function(a){a.end()})}}var d=[];b&&d.push(b.start());n&&d.push(n.start());c.all(d,function(a){e.complete(a)});var e=new c({end:a(),cancel:a()});
return e}}}else return d(a)}}]}])})(window,window.angular);
//# sourceMappingURL=angular-animate.min.js.map

/*
 AngularJS v1.5.11
 (c) 2010-2017 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(E,d){'use strict';function y(t,l,g){return{restrict:"ECA",terminal:!0,priority:400,transclude:"element",link:function(b,e,a,c,k){function p(){m&&(g.cancel(m),m=null);h&&(h.$destroy(),h=null);n&&(m=g.leave(n),m.done(function(b){!1!==b&&(m=null)}),n=null)}function B(){var a=t.current&&t.current.locals;if(d.isDefined(a&&a.$template)){var a=b.$new(),c=t.current;n=k(a,function(a){g.enter(a,null,n||e).done(function(a){!1===a||!d.isDefined(A)||A&&!b.$eval(A)||l()});p()});h=c.scope=a;h.$emit("$viewContentLoaded");
h.$eval(s)}else p()}var h,n,m,A=a.autoscroll,s=a.onload||"";b.$on("$routeChangeSuccess",B);B()}}}function w(d,l,g){return{restrict:"ECA",priority:-400,link:function(b,e){var a=g.current,c=a.locals;e.html(c.$template);var k=d(e.contents());if(a.controller){c.$scope=b;var p=l(a.controller,c);a.controllerAs&&(b[a.controllerAs]=p);e.data("$ngControllerController",p);e.children().data("$ngControllerController",p)}b[a.resolveAs||"$resolve"]=c;k(b)}}}var x,C,s=d.module("ngRoute",["ng"]).provider("$route",
function(){function t(b,e){return d.extend(Object.create(b),e)}function l(b,d){var a=d.caseInsensitiveMatch,c={originalPath:b,regexp:b},g=c.keys=[];b=b.replace(/([().])/g,"\\$1").replace(/(\/)?:(\w+)(\*\?|[?*])?/g,function(b,a,d,c){b="?"===c||"*?"===c?"?":null;c="*"===c||"*?"===c?"*":null;g.push({name:d,optional:!!b});a=a||"";return""+(b?"":a)+"(?:"+(b?a:"")+(c&&"(.+?)"||"([^/]+)")+(b||"")+")"+(b||"")}).replace(/([/$*])/g,"\\$1");c.regexp=new RegExp("^"+b+"$",a?"i":"");return c}x=d.isArray;C=d.isObject;
var g={};this.when=function(b,e){var a;a=void 0;if(x(e)){a=a||[];for(var c=0,k=e.length;c<k;c++)a[c]=e[c]}else if(C(e))for(c in a=a||{},e)if("$"!==c.charAt(0)||"$"!==c.charAt(1))a[c]=e[c];a=a||e;d.isUndefined(a.reloadOnSearch)&&(a.reloadOnSearch=!0);d.isUndefined(a.caseInsensitiveMatch)&&(a.caseInsensitiveMatch=this.caseInsensitiveMatch);g[b]=d.extend(a,b&&l(b,a));b&&(c="/"===b[b.length-1]?b.substr(0,b.length-1):b+"/",g[c]=d.extend({redirectTo:b},l(c,a)));return this};this.caseInsensitiveMatch=!1;
this.otherwise=function(b){"string"===typeof b&&(b={redirectTo:b});this.when(null,b);return this};this.$get=["$rootScope","$location","$routeParams","$q","$injector","$templateRequest","$sce",function(b,e,a,c,k,p,l){function h(a){var f=v.current;(x=(r=y())&&f&&r.$$route===f.$$route&&d.equals(r.pathParams,f.pathParams)&&!r.reloadOnSearch&&!z)||!f&&!r||b.$broadcast("$routeChangeStart",r,f).defaultPrevented&&a&&a.preventDefault()}function n(){var u=v.current,f=r;if(x)u.params=f.params,d.copy(u.params,
a),b.$broadcast("$routeUpdate",u);else if(f||u)z=!1,(v.current=f)&&f.redirectTo&&(d.isString(f.redirectTo)?e.path(w(f.redirectTo,f.params)).search(f.params).replace():e.url(f.redirectTo(f.pathParams,e.path(),e.search())).replace()),c.when(f).then(m).then(function(c){f===v.current&&(f&&(f.locals=c,d.copy(f.params,a)),b.$broadcast("$routeChangeSuccess",f,u))},function(a){f===v.current&&b.$broadcast("$routeChangeError",f,u,a)})}function m(a){if(a){var b=d.extend({},a.resolve);d.forEach(b,function(a,
c){b[c]=d.isString(a)?k.get(a):k.invoke(a,null,null,c)});a=s(a);d.isDefined(a)&&(b.$template=a);return c.all(b)}}function s(a){var b,c;d.isDefined(b=a.template)?d.isFunction(b)&&(b=b(a.params)):d.isDefined(c=a.templateUrl)&&(d.isFunction(c)&&(c=c(a.params)),d.isDefined(c)&&(a.loadedTemplateUrl=l.valueOf(c),b=p(c)));return b}function y(){var a,b;d.forEach(g,function(c,g){var q;if(q=!b){var h=e.path();q=c.keys;var l={};if(c.regexp)if(h=c.regexp.exec(h)){for(var k=1,p=h.length;k<p;++k){var m=q[k-1],
n=h[k];m&&n&&(l[m.name]=n)}q=l}else q=null;else q=null;q=a=q}q&&(b=t(c,{params:d.extend({},e.search(),a),pathParams:a}),b.$$route=c)});return b||g[null]&&t(g[null],{params:{},pathParams:{}})}function w(a,b){var c=[];d.forEach((a||"").split(":"),function(a,d){if(0===d)c.push(a);else{var e=a.match(/(\w+)(?:[?*])?(.*)/),g=e[1];c.push(b[g]);c.push(e[2]||"");delete b[g]}});return c.join("")}var z=!1,r,x,v={routes:g,reload:function(){z=!0;var a={defaultPrevented:!1,preventDefault:function(){this.defaultPrevented=
!0;z=!1}};b.$evalAsync(function(){h(a);a.defaultPrevented||n()})},updateParams:function(a){if(this.current&&this.current.$$route)a=d.extend({},this.current.params,a),e.path(w(this.current.$$route.originalPath,a)),e.search(a);else throw D("norout");}};b.$on("$locationChangeStart",h);b.$on("$locationChangeSuccess",n);return v}]}),D=d.$$minErr("ngRoute");s.provider("$routeParams",function(){this.$get=function(){return{}}});s.directive("ngView",y);s.directive("ngView",w);y.$inject=["$route","$anchorScroll",
"$animate"];w.$inject=["$compile","$controller","$route"]})(window,window.angular);
//# sourceMappingURL=angular-route.min.js.map

/*!
 * Bootstrap v3.4.1 (https://getbootstrap.com/)
 * Copyright 2011-2019 Twitter, Inc.
 * Licensed under the MIT license
 */
if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");!function(t){"use strict";var e=jQuery.fn.jquery.split(" ")[0].split(".");if(e[0]<2&&e[1]<9||1==e[0]&&9==e[1]&&e[2]<1||3<e[0])throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4")}(),function(n){"use strict";n.fn.emulateTransitionEnd=function(t){var e=!1,i=this;n(this).one("bsTransitionEnd",function(){e=!0});return setTimeout(function(){e||n(i).trigger(n.support.transition.end)},t),this},n(function(){n.support.transition=function o(){var t=document.createElement("bootstrap"),e={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var i in e)if(t.style[i]!==undefined)return{end:e[i]};return!1}(),n.support.transition&&(n.event.special.bsTransitionEnd={bindType:n.support.transition.end,delegateType:n.support.transition.end,handle:function(t){if(n(t.target).is(this))return t.handleObj.handler.apply(this,arguments)}})})}(jQuery),function(s){"use strict";var e='[data-dismiss="alert"]',a=function(t){s(t).on("click",e,this.close)};a.VERSION="3.4.1",a.TRANSITION_DURATION=150,a.prototype.close=function(t){var e=s(this),i=e.attr("data-target");i||(i=(i=e.attr("href"))&&i.replace(/.*(?=#[^\s]*$)/,"")),i="#"===i?[]:i;var o=s(document).find(i);function n(){o.detach().trigger("closed.bs.alert").remove()}t&&t.preventDefault(),o.length||(o=e.closest(".alert")),o.trigger(t=s.Event("close.bs.alert")),t.isDefaultPrevented()||(o.removeClass("in"),s.support.transition&&o.hasClass("fade")?o.one("bsTransitionEnd",n).emulateTransitionEnd(a.TRANSITION_DURATION):n())};var t=s.fn.alert;s.fn.alert=function o(i){return this.each(function(){var t=s(this),e=t.data("bs.alert");e||t.data("bs.alert",e=new a(this)),"string"==typeof i&&e[i].call(t)})},s.fn.alert.Constructor=a,s.fn.alert.noConflict=function(){return s.fn.alert=t,this},s(document).on("click.bs.alert.data-api",e,a.prototype.close)}(jQuery),function(s){"use strict";var n=function(t,e){this.$element=s(t),this.options=s.extend({},n.DEFAULTS,e),this.isLoading=!1};function i(o){return this.each(function(){var t=s(this),e=t.data("bs.button"),i="object"==typeof o&&o;e||t.data("bs.button",e=new n(this,i)),"toggle"==o?e.toggle():o&&e.setState(o)})}n.VERSION="3.4.1",n.DEFAULTS={loadingText:"loading..."},n.prototype.setState=function(t){var e="disabled",i=this.$element,o=i.is("input")?"val":"html",n=i.data();t+="Text",null==n.resetText&&i.data("resetText",i[o]()),setTimeout(s.proxy(function(){i[o](null==n[t]?this.options[t]:n[t]),"loadingText"==t?(this.isLoading=!0,i.addClass(e).attr(e,e).prop(e,!0)):this.isLoading&&(this.isLoading=!1,i.removeClass(e).removeAttr(e).prop(e,!1))},this),0)},n.prototype.toggle=function(){var t=!0,e=this.$element.closest('[data-toggle="buttons"]');if(e.length){var i=this.$element.find("input");"radio"==i.prop("type")?(i.prop("checked")&&(t=!1),e.find(".active").removeClass("active"),this.$element.addClass("active")):"checkbox"==i.prop("type")&&(i.prop("checked")!==this.$element.hasClass("active")&&(t=!1),this.$element.toggleClass("active")),i.prop("checked",this.$element.hasClass("active")),t&&i.trigger("change")}else this.$element.attr("aria-pressed",!this.$element.hasClass("active")),this.$element.toggleClass("active")};var t=s.fn.button;s.fn.button=i,s.fn.button.Constructor=n,s.fn.button.noConflict=function(){return s.fn.button=t,this},s(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(t){var e=s(t.target).closest(".btn");i.call(e,"toggle"),s(t.target).is('input[type="radio"], input[type="checkbox"]')||(t.preventDefault(),e.is("input,button")?e.trigger("focus"):e.find("input:visible,button:visible").first().trigger("focus"))}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(t){s(t.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(t.type))})}(jQuery),function(p){"use strict";var c=function(t,e){this.$element=p(t),this.$indicators=this.$element.find(".carousel-indicators"),this.options=e,this.paused=null,this.sliding=null,this.interval=null,this.$active=null,this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",p.proxy(this.keydown,this)),"hover"==this.options.pause&&!("ontouchstart"in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",p.proxy(this.pause,this)).on("mouseleave.bs.carousel",p.proxy(this.cycle,this))};function r(n){return this.each(function(){var t=p(this),e=t.data("bs.carousel"),i=p.extend({},c.DEFAULTS,t.data(),"object"==typeof n&&n),o="string"==typeof n?n:i.slide;e||t.data("bs.carousel",e=new c(this,i)),"number"==typeof n?e.to(n):o?e[o]():i.interval&&e.pause().cycle()})}c.VERSION="3.4.1",c.TRANSITION_DURATION=600,c.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,keyboard:!0},c.prototype.keydown=function(t){if(!/input|textarea/i.test(t.target.tagName)){switch(t.which){case 37:this.prev();break;case 39:this.next();break;default:return}t.preventDefault()}},c.prototype.cycle=function(t){return t||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(p.proxy(this.next,this),this.options.interval)),this},c.prototype.getItemIndex=function(t){return this.$items=t.parent().children(".item"),this.$items.index(t||this.$active)},c.prototype.getItemForDirection=function(t,e){var i=this.getItemIndex(e);if(("prev"==t&&0===i||"next"==t&&i==this.$items.length-1)&&!this.options.wrap)return e;var o=(i+("prev"==t?-1:1))%this.$items.length;return this.$items.eq(o)},c.prototype.to=function(t){var e=this,i=this.getItemIndex(this.$active=this.$element.find(".item.active"));if(!(t>this.$items.length-1||t<0))return this.sliding?this.$element.one("slid.bs.carousel",function(){e.to(t)}):i==t?this.pause().cycle():this.slide(i<t?"next":"prev",this.$items.eq(t))},c.prototype.pause=function(t){return t||(this.paused=!0),this.$element.find(".next, .prev").length&&p.support.transition&&(this.$element.trigger(p.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},c.prototype.next=function(){if(!this.sliding)return this.slide("next")},c.prototype.prev=function(){if(!this.sliding)return this.slide("prev")},c.prototype.slide=function(t,e){var i=this.$element.find(".item.active"),o=e||this.getItemForDirection(t,i),n=this.interval,s="next"==t?"left":"right",a=this;if(o.hasClass("active"))return this.sliding=!1;var r=o[0],l=p.Event("slide.bs.carousel",{relatedTarget:r,direction:s});if(this.$element.trigger(l),!l.isDefaultPrevented()){if(this.sliding=!0,n&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var h=p(this.$indicators.children()[this.getItemIndex(o)]);h&&h.addClass("active")}var d=p.Event("slid.bs.carousel",{relatedTarget:r,direction:s});return p.support.transition&&this.$element.hasClass("slide")?(o.addClass(t),"object"==typeof o&&o.length&&o[0].offsetWidth,i.addClass(s),o.addClass(s),i.one("bsTransitionEnd",function(){o.removeClass([t,s].join(" ")).addClass("active"),i.removeClass(["active",s].join(" ")),a.sliding=!1,setTimeout(function(){a.$element.trigger(d)},0)}).emulateTransitionEnd(c.TRANSITION_DURATION)):(i.removeClass("active"),o.addClass("active"),this.sliding=!1,this.$element.trigger(d)),n&&this.cycle(),this}};var t=p.fn.carousel;p.fn.carousel=r,p.fn.carousel.Constructor=c,p.fn.carousel.noConflict=function(){return p.fn.carousel=t,this};var e=function(t){var e=p(this),i=e.attr("href");i&&(i=i.replace(/.*(?=#[^\s]+$)/,""));var o=e.attr("data-target")||i,n=p(document).find(o);if(n.hasClass("carousel")){var s=p.extend({},n.data(),e.data()),a=e.attr("data-slide-to");a&&(s.interval=!1),r.call(n,s),a&&n.data("bs.carousel").to(a),t.preventDefault()}};p(document).on("click.bs.carousel.data-api","[data-slide]",e).on("click.bs.carousel.data-api","[data-slide-to]",e),p(window).on("load",function(){p('[data-ride="carousel"]').each(function(){var t=p(this);r.call(t,t.data())})})}(jQuery),function(a){"use strict";var r=function(t,e){this.$element=a(t),this.options=a.extend({},r.DEFAULTS,e),this.$trigger=a('[data-toggle="collapse"][href="#'+t.id+'"],[data-toggle="collapse"][data-target="#'+t.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};function n(t){var e,i=t.attr("data-target")||(e=t.attr("href"))&&e.replace(/.*(?=#[^\s]+$)/,"");return a(document).find(i)}function l(o){return this.each(function(){var t=a(this),e=t.data("bs.collapse"),i=a.extend({},r.DEFAULTS,t.data(),"object"==typeof o&&o);!e&&i.toggle&&/show|hide/.test(o)&&(i.toggle=!1),e||t.data("bs.collapse",e=new r(this,i)),"string"==typeof o&&e[o]()})}r.VERSION="3.4.1",r.TRANSITION_DURATION=350,r.DEFAULTS={toggle:!0},r.prototype.dimension=function(){return this.$element.hasClass("width")?"width":"height"},r.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var t,e=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing");if(!(e&&e.length&&(t=e.data("bs.collapse"))&&t.transitioning)){var i=a.Event("show.bs.collapse");if(this.$element.trigger(i),!i.isDefaultPrevented()){e&&e.length&&(l.call(e,"hide"),t||e.data("bs.collapse",null));var o=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[o](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var n=function(){this.$element.removeClass("collapsing").addClass("collapse in")[o](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return n.call(this);var s=a.camelCase(["scroll",o].join("-"));this.$element.one("bsTransitionEnd",a.proxy(n,this)).emulateTransitionEnd(r.TRANSITION_DURATION)[o](this.$element[0][s])}}}},r.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var t=a.Event("hide.bs.collapse");if(this.$element.trigger(t),!t.isDefaultPrevented()){var e=this.dimension();this.$element[e](this.$element[e]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var i=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};if(!a.support.transition)return i.call(this);this.$element[e](0).one("bsTransitionEnd",a.proxy(i,this)).emulateTransitionEnd(r.TRANSITION_DURATION)}}},r.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},r.prototype.getParent=function(){return a(document).find(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(a.proxy(function(t,e){var i=a(e);this.addAriaAndCollapsedClass(n(i),i)},this)).end()},r.prototype.addAriaAndCollapsedClass=function(t,e){var i=t.hasClass("in");t.attr("aria-expanded",i),e.toggleClass("collapsed",!i).attr("aria-expanded",i)};var t=a.fn.collapse;a.fn.collapse=l,a.fn.collapse.Constructor=r,a.fn.collapse.noConflict=function(){return a.fn.collapse=t,this},a(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(t){var e=a(this);e.attr("data-target")||t.preventDefault();var i=n(e),o=i.data("bs.collapse")?"toggle":e.data();l.call(i,o)})}(jQuery),function(a){"use strict";var r='[data-toggle="dropdown"]',o=function(t){a(t).on("click.bs.dropdown",this.toggle)};function l(t){var e=t.attr("data-target");e||(e=(e=t.attr("href"))&&/#[A-Za-z]/.test(e)&&e.replace(/.*(?=#[^\s]*$)/,""));var i="#"!==e?a(document).find(e):null;return i&&i.length?i:t.parent()}function s(o){o&&3===o.which||(a(".dropdown-backdrop").remove(),a(r).each(function(){var t=a(this),e=l(t),i={relatedTarget:this};e.hasClass("open")&&(o&&"click"==o.type&&/input|textarea/i.test(o.target.tagName)&&a.contains(e[0],o.target)||(e.trigger(o=a.Event("hide.bs.dropdown",i)),o.isDefaultPrevented()||(t.attr("aria-expanded","false"),e.removeClass("open").trigger(a.Event("hidden.bs.dropdown",i)))))}))}o.VERSION="3.4.1",o.prototype.toggle=function(t){var e=a(this);if(!e.is(".disabled, :disabled")){var i=l(e),o=i.hasClass("open");if(s(),!o){"ontouchstart"in document.documentElement&&!i.closest(".navbar-nav").length&&a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click",s);var n={relatedTarget:this};if(i.trigger(t=a.Event("show.bs.dropdown",n)),t.isDefaultPrevented())return;e.trigger("focus").attr("aria-expanded","true"),i.toggleClass("open").trigger(a.Event("shown.bs.dropdown",n))}return!1}},o.prototype.keydown=function(t){if(/(38|40|27|32)/.test(t.which)&&!/input|textarea/i.test(t.target.tagName)){var e=a(this);if(t.preventDefault(),t.stopPropagation(),!e.is(".disabled, :disabled")){var i=l(e),o=i.hasClass("open");if(!o&&27!=t.which||o&&27==t.which)return 27==t.which&&i.find(r).trigger("focus"),e.trigger("click");var n=i.find(".dropdown-menu li:not(.disabled):visible a");if(n.length){var s=n.index(t.target);38==t.which&&0<s&&s--,40==t.which&&s<n.length-1&&s++,~s||(s=0),n.eq(s).trigger("focus")}}}};var t=a.fn.dropdown;a.fn.dropdown=function e(i){return this.each(function(){var t=a(this),e=t.data("bs.dropdown");e||t.data("bs.dropdown",e=new o(this)),"string"==typeof i&&e[i].call(t)})},a.fn.dropdown.Constructor=o,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=t,this},a(document).on("click.bs.dropdown.data-api",s).on("click.bs.dropdown.data-api",".dropdown form",function(t){t.stopPropagation()}).on("click.bs.dropdown.data-api",r,o.prototype.toggle).on("keydown.bs.dropdown.data-api",r,o.prototype.keydown).on("keydown.bs.dropdown.data-api",".dropdown-menu",o.prototype.keydown)}(jQuery),function(a){"use strict";var s=function(t,e){this.options=e,this.$body=a(document.body),this.$element=a(t),this.$dialog=this.$element.find(".modal-dialog"),this.$backdrop=null,this.isShown=null,this.originalBodyPad=null,this.scrollbarWidth=0,this.ignoreBackdropClick=!1,this.fixedContent=".navbar-fixed-top, .navbar-fixed-bottom",this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};function r(o,n){return this.each(function(){var t=a(this),e=t.data("bs.modal"),i=a.extend({},s.DEFAULTS,t.data(),"object"==typeof o&&o);e||t.data("bs.modal",e=new s(this,i)),"string"==typeof o?e[o](n):i.show&&e.show(n)})}s.VERSION="3.4.1",s.TRANSITION_DURATION=300,s.BACKDROP_TRANSITION_DURATION=150,s.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},s.prototype.toggle=function(t){return this.isShown?this.hide():this.show(t)},s.prototype.show=function(i){var o=this,t=a.Event("show.bs.modal",{relatedTarget:i});this.$element.trigger(t),this.isShown||t.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.$dialog.on("mousedown.dismiss.bs.modal",function(){o.$element.one("mouseup.dismiss.bs.modal",function(t){a(t.target).is(o.$element)&&(o.ignoreBackdropClick=!0)})}),this.backdrop(function(){var t=a.support.transition&&o.$element.hasClass("fade");o.$element.parent().length||o.$element.appendTo(o.$body),o.$element.show().scrollTop(0),o.adjustDialog(),t&&o.$element[0].offsetWidth,o.$element.addClass("in"),o.enforceFocus();var e=a.Event("shown.bs.modal",{relatedTarget:i});t?o.$dialog.one("bsTransitionEnd",function(){o.$element.trigger("focus").trigger(e)}).emulateTransitionEnd(s.TRANSITION_DURATION):o.$element.trigger("focus").trigger(e)}))},s.prototype.hide=function(t){t&&t.preventDefault(),t=a.Event("hide.bs.modal"),this.$element.trigger(t),this.isShown&&!t.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),this.$dialog.off("mousedown.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",a.proxy(this.hideModal,this)).emulateTransitionEnd(s.TRANSITION_DURATION):this.hideModal())},s.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(t){document===t.target||this.$element[0]===t.target||this.$element.has(t.target).length||this.$element.trigger("focus")},this))},s.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",a.proxy(function(t){27==t.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},s.prototype.resize=function(){this.isShown?a(window).on("resize.bs.modal",a.proxy(this.handleUpdate,this)):a(window).off("resize.bs.modal")},s.prototype.hideModal=function(){var t=this;this.$element.hide(),this.backdrop(function(){t.$body.removeClass("modal-open"),t.resetAdjustments(),t.resetScrollbar(),t.$element.trigger("hidden.bs.modal")})},s.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},s.prototype.backdrop=function(t){var e=this,i=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var o=a.support.transition&&i;if(this.$backdrop=a(document.createElement("div")).addClass("modal-backdrop "+i).appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",a.proxy(function(t){this.ignoreBackdropClick?this.ignoreBackdropClick=!1:t.target===t.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus():this.hide())},this)),o&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!t)return;o?this.$backdrop.one("bsTransitionEnd",t).emulateTransitionEnd(s.BACKDROP_TRANSITION_DURATION):t()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var n=function(){e.removeBackdrop(),t&&t()};a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",n).emulateTransitionEnd(s.BACKDROP_TRANSITION_DURATION):n()}else t&&t()},s.prototype.handleUpdate=function(){this.adjustDialog()},s.prototype.adjustDialog=function(){var t=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&t?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!t?this.scrollbarWidth:""})},s.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},s.prototype.checkScrollbar=function(){var t=window.innerWidth;if(!t){var e=document.documentElement.getBoundingClientRect();t=e.right-Math.abs(e.left)}this.bodyIsOverflowing=document.body.clientWidth<t,this.scrollbarWidth=this.measureScrollbar()},s.prototype.setScrollbar=function(){var t=parseInt(this.$body.css("padding-right")||0,10);this.originalBodyPad=document.body.style.paddingRight||"";var n=this.scrollbarWidth;this.bodyIsOverflowing&&(this.$body.css("padding-right",t+n),a(this.fixedContent).each(function(t,e){var i=e.style.paddingRight,o=a(e).css("padding-right");a(e).data("padding-right",i).css("padding-right",parseFloat(o)+n+"px")}))},s.prototype.resetScrollbar=function(){this.$body.css("padding-right",this.originalBodyPad),a(this.fixedContent).each(function(t,e){var i=a(e).data("padding-right");a(e).removeData("padding-right"),e.style.paddingRight=i||""})},s.prototype.measureScrollbar=function(){var t=document.createElement("div");t.className="modal-scrollbar-measure",this.$body.append(t);var e=t.offsetWidth-t.clientWidth;return this.$body[0].removeChild(t),e};var t=a.fn.modal;a.fn.modal=r,a.fn.modal.Constructor=s,a.fn.modal.noConflict=function(){return a.fn.modal=t,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(t){var e=a(this),i=e.attr("href"),o=e.attr("data-target")||i&&i.replace(/.*(?=#[^\s]+$)/,""),n=a(document).find(o),s=n.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(i)&&i},n.data(),e.data());e.is("a")&&t.preventDefault(),n.one("show.bs.modal",function(t){t.isDefaultPrevented()||n.one("hidden.bs.modal",function(){e.is(":visible")&&e.trigger("focus")})}),r.call(n,s,this)})}(jQuery),function(g){"use strict";var o=["sanitize","whiteList","sanitizeFn"],a=["background","cite","href","itemtype","longdesc","poster","src","xlink:href"],t={"*":["class","dir","id","lang","role",/^aria-[\w-]*$/i],a:["target","href","title","rel"],area:[],b:[],br:[],col:[],code:[],div:[],em:[],hr:[],h1:[],h2:[],h3:[],h4:[],h5:[],h6:[],i:[],img:["src","alt","title","width","height"],li:[],ol:[],p:[],pre:[],s:[],small:[],span:[],sub:[],sup:[],strong:[],u:[],ul:[]},r=/^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi,l=/^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;function u(t,e){var i=t.nodeName.toLowerCase();if(-1!==g.inArray(i,e))return-1===g.inArray(i,a)||Boolean(t.nodeValue.match(r)||t.nodeValue.match(l));for(var o=g(e).filter(function(t,e){return e instanceof RegExp}),n=0,s=o.length;n<s;n++)if(i.match(o[n]))return!0;return!1}function n(t,e,i){if(0===t.length)return t;if(i&&"function"==typeof i)return i(t);if(!document.implementation||!document.implementation.createHTMLDocument)return t;var o=document.implementation.createHTMLDocument("sanitization");o.body.innerHTML=t;for(var n=g.map(e,function(t,e){return e}),s=g(o.body).find("*"),a=0,r=s.length;a<r;a++){var l=s[a],h=l.nodeName.toLowerCase();if(-1!==g.inArray(h,n))for(var d=g.map(l.attributes,function(t){return t}),p=[].concat(e["*"]||[],e[h]||[]),c=0,f=d.length;c<f;c++)u(d[c],p)||l.removeAttribute(d[c].nodeName);else l.parentNode.removeChild(l)}return o.body.innerHTML}var m=function(t,e){this.type=null,this.options=null,this.enabled=null,this.timeout=null,this.hoverState=null,this.$element=null,this.inState=null,this.init("tooltip",t,e)};m.VERSION="3.4.1",m.TRANSITION_DURATION=150,m.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0},sanitize:!0,sanitizeFn:null,whiteList:t},m.prototype.init=function(t,e,i){if(this.enabled=!0,this.type=t,this.$element=g(e),this.options=this.getOptions(i),this.$viewport=this.options.viewport&&g(document).find(g.isFunction(this.options.viewport)?this.options.viewport.call(this,this.$element):this.options.viewport.selector||this.options.viewport),this.inState={click:!1,hover:!1,focus:!1},this.$element[0]instanceof document.constructor&&!this.options.selector)throw new Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!");for(var o=this.options.trigger.split(" "),n=o.length;n--;){var s=o[n];if("click"==s)this.$element.on("click."+this.type,this.options.selector,g.proxy(this.toggle,this));else if("manual"!=s){var a="hover"==s?"mouseenter":"focusin",r="hover"==s?"mouseleave":"focusout";this.$element.on(a+"."+this.type,this.options.selector,g.proxy(this.enter,this)),this.$element.on(r+"."+this.type,this.options.selector,g.proxy(this.leave,this))}}this.options.selector?this._options=g.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},m.prototype.getDefaults=function(){return m.DEFAULTS},m.prototype.getOptions=function(t){var e=this.$element.data();for(var i in e)e.hasOwnProperty(i)&&-1!==g.inArray(i,o)&&delete e[i];return(t=g.extend({},this.getDefaults(),e,t)).delay&&"number"==typeof t.delay&&(t.delay={show:t.delay,hide:t.delay}),t.sanitize&&(t.template=n(t.template,t.whiteList,t.sanitizeFn)),t},m.prototype.getDelegateOptions=function(){var i={},o=this.getDefaults();return this._options&&g.each(this._options,function(t,e){o[t]!=e&&(i[t]=e)}),i},m.prototype.enter=function(t){var e=t instanceof this.constructor?t:g(t.currentTarget).data("bs."+this.type);if(e||(e=new this.constructor(t.currentTarget,this.getDelegateOptions()),g(t.currentTarget).data("bs."+this.type,e)),t instanceof g.Event&&(e.inState["focusin"==t.type?"focus":"hover"]=!0),e.tip().hasClass("in")||"in"==e.hoverState)e.hoverState="in";else{if(clearTimeout(e.timeout),e.hoverState="in",!e.options.delay||!e.options.delay.show)return e.show();e.timeout=setTimeout(function(){"in"==e.hoverState&&e.show()},e.options.delay.show)}},m.prototype.isInStateTrue=function(){for(var t in this.inState)if(this.inState[t])return!0;return!1},m.prototype.leave=function(t){var e=t instanceof this.constructor?t:g(t.currentTarget).data("bs."+this.type);if(e||(e=new this.constructor(t.currentTarget,this.getDelegateOptions()),g(t.currentTarget).data("bs."+this.type,e)),t instanceof g.Event&&(e.inState["focusout"==t.type?"focus":"hover"]=!1),!e.isInStateTrue()){if(clearTimeout(e.timeout),e.hoverState="out",!e.options.delay||!e.options.delay.hide)return e.hide();e.timeout=setTimeout(function(){"out"==e.hoverState&&e.hide()},e.options.delay.hide)}},m.prototype.show=function(){var t=g.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(t);var e=g.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(t.isDefaultPrevented()||!e)return;var i=this,o=this.tip(),n=this.getUID(this.type);this.setContent(),o.attr("id",n),this.$element.attr("aria-describedby",n),this.options.animation&&o.addClass("fade");var s="function"==typeof this.options.placement?this.options.placement.call(this,o[0],this.$element[0]):this.options.placement,a=/\s?auto?\s?/i,r=a.test(s);r&&(s=s.replace(a,"")||"top"),o.detach().css({top:0,left:0,display:"block"}).addClass(s).data("bs."+this.type,this),this.options.container?o.appendTo(g(document).find(this.options.container)):o.insertAfter(this.$element),this.$element.trigger("inserted.bs."+this.type);var l=this.getPosition(),h=o[0].offsetWidth,d=o[0].offsetHeight;if(r){var p=s,c=this.getPosition(this.$viewport);s="bottom"==s&&l.bottom+d>c.bottom?"top":"top"==s&&l.top-d<c.top?"bottom":"right"==s&&l.right+h>c.width?"left":"left"==s&&l.left-h<c.left?"right":s,o.removeClass(p).addClass(s)}var f=this.getCalculatedOffset(s,l,h,d);this.applyPlacement(f,s);var u=function(){var t=i.hoverState;i.$element.trigger("shown.bs."+i.type),i.hoverState=null,"out"==t&&i.leave(i)};g.support.transition&&this.$tip.hasClass("fade")?o.one("bsTransitionEnd",u).emulateTransitionEnd(m.TRANSITION_DURATION):u()}},m.prototype.applyPlacement=function(t,e){var i=this.tip(),o=i[0].offsetWidth,n=i[0].offsetHeight,s=parseInt(i.css("margin-top"),10),a=parseInt(i.css("margin-left"),10);isNaN(s)&&(s=0),isNaN(a)&&(a=0),t.top+=s,t.left+=a,g.offset.setOffset(i[0],g.extend({using:function(t){i.css({top:Math.round(t.top),left:Math.round(t.left)})}},t),0),i.addClass("in");var r=i[0].offsetWidth,l=i[0].offsetHeight;"top"==e&&l!=n&&(t.top=t.top+n-l);var h=this.getViewportAdjustedDelta(e,t,r,l);h.left?t.left+=h.left:t.top+=h.top;var d=/top|bottom/.test(e),p=d?2*h.left-o+r:2*h.top-n+l,c=d?"offsetWidth":"offsetHeight";i.offset(t),this.replaceArrow(p,i[0][c],d)},m.prototype.replaceArrow=function(t,e,i){this.arrow().css(i?"left":"top",50*(1-t/e)+"%").css(i?"top":"left","")},m.prototype.setContent=function(){var t=this.tip(),e=this.getTitle();this.options.html?(this.options.sanitize&&(e=n(e,this.options.whiteList,this.options.sanitizeFn)),t.find(".tooltip-inner").html(e)):t.find(".tooltip-inner").text(e),t.removeClass("fade in top bottom left right")},m.prototype.hide=function(t){var e=this,i=g(this.$tip),o=g.Event("hide.bs."+this.type);function n(){"in"!=e.hoverState&&i.detach(),e.$element&&e.$element.removeAttr("aria-describedby").trigger("hidden.bs."+e.type),t&&t()}if(this.$element.trigger(o),!o.isDefaultPrevented())return i.removeClass("in"),g.support.transition&&i.hasClass("fade")?i.one("bsTransitionEnd",n).emulateTransitionEnd(m.TRANSITION_DURATION):n(),this.hoverState=null,this},m.prototype.fixTitle=function(){var t=this.$element;(t.attr("title")||"string"!=typeof t.attr("data-original-title"))&&t.attr("data-original-title",t.attr("title")||"").attr("title","")},m.prototype.hasContent=function(){return this.getTitle()},m.prototype.getPosition=function(t){var e=(t=t||this.$element)[0],i="BODY"==e.tagName,o=e.getBoundingClientRect();null==o.width&&(o=g.extend({},o,{width:o.right-o.left,height:o.bottom-o.top}));var n=window.SVGElement&&e instanceof window.SVGElement,s=i?{top:0,left:0}:n?null:t.offset(),a={scroll:i?document.documentElement.scrollTop||document.body.scrollTop:t.scrollTop()},r=i?{width:g(window).width(),height:g(window).height()}:null;return g.extend({},o,a,r,s)},m.prototype.getCalculatedOffset=function(t,e,i,o){return"bottom"==t?{top:e.top+e.height,left:e.left+e.width/2-i/2}:"top"==t?{top:e.top-o,left:e.left+e.width/2-i/2}:"left"==t?{top:e.top+e.height/2-o/2,left:e.left-i}:{top:e.top+e.height/2-o/2,left:e.left+e.width}},m.prototype.getViewportAdjustedDelta=function(t,e,i,o){var n={top:0,left:0};if(!this.$viewport)return n;var s=this.options.viewport&&this.options.viewport.padding||0,a=this.getPosition(this.$viewport);if(/right|left/.test(t)){var r=e.top-s-a.scroll,l=e.top+s-a.scroll+o;r<a.top?n.top=a.top-r:l>a.top+a.height&&(n.top=a.top+a.height-l)}else{var h=e.left-s,d=e.left+s+i;h<a.left?n.left=a.left-h:d>a.right&&(n.left=a.left+a.width-d)}return n},m.prototype.getTitle=function(){var t=this.$element,e=this.options;return t.attr("data-original-title")||("function"==typeof e.title?e.title.call(t[0]):e.title)},m.prototype.getUID=function(t){for(;t+=~~(1e6*Math.random()),document.getElementById(t););return t},m.prototype.tip=function(){if(!this.$tip&&(this.$tip=g(this.options.template),1!=this.$tip.length))throw new Error(this.type+" `template` option must consist of exactly 1 top-level element!");return this.$tip},m.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},m.prototype.enable=function(){this.enabled=!0},m.prototype.disable=function(){this.enabled=!1},m.prototype.toggleEnabled=function(){this.enabled=!this.enabled},m.prototype.toggle=function(t){var e=this;t&&((e=g(t.currentTarget).data("bs."+this.type))||(e=new this.constructor(t.currentTarget,this.getDelegateOptions()),g(t.currentTarget).data("bs."+this.type,e))),t?(e.inState.click=!e.inState.click,e.isInStateTrue()?e.enter(e):e.leave(e)):e.tip().hasClass("in")?e.leave(e):e.enter(e)},m.prototype.destroy=function(){var t=this;clearTimeout(this.timeout),this.hide(function(){t.$element.off("."+t.type).removeData("bs."+t.type),t.$tip&&t.$tip.detach(),t.$tip=null,t.$arrow=null,t.$viewport=null,t.$element=null})},m.prototype.sanitizeHtml=function(t){return n(t,this.options.whiteList,this.options.sanitizeFn)};var e=g.fn.tooltip;g.fn.tooltip=function i(o){return this.each(function(){var t=g(this),e=t.data("bs.tooltip"),i="object"==typeof o&&o;!e&&/destroy|hide/.test(o)||(e||t.data("bs.tooltip",e=new m(this,i)),"string"==typeof o&&e[o]())})},g.fn.tooltip.Constructor=m,g.fn.tooltip.noConflict=function(){return g.fn.tooltip=e,this}}(jQuery),function(n){"use strict";var s=function(t,e){this.init("popover",t,e)};if(!n.fn.tooltip)throw new Error("Popover requires tooltip.js");s.VERSION="3.4.1",s.DEFAULTS=n.extend({},n.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),((s.prototype=n.extend({},n.fn.tooltip.Constructor.prototype)).constructor=s).prototype.getDefaults=function(){return s.DEFAULTS},s.prototype.setContent=function(){var t=this.tip(),e=this.getTitle(),i=this.getContent();if(this.options.html){var o=typeof i;this.options.sanitize&&(e=this.sanitizeHtml(e),"string"===o&&(i=this.sanitizeHtml(i))),t.find(".popover-title").html(e),t.find(".popover-content").children().detach().end()["string"===o?"html":"append"](i)}else t.find(".popover-title").text(e),t.find(".popover-content").children().detach().end().text(i);t.removeClass("fade top bottom left right in"),t.find(".popover-title").html()||t.find(".popover-title").hide()},s.prototype.hasContent=function(){return this.getTitle()||this.getContent()},s.prototype.getContent=function(){var t=this.$element,e=this.options;return t.attr("data-content")||("function"==typeof e.content?e.content.call(t[0]):e.content)},s.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")};var t=n.fn.popover;n.fn.popover=function e(o){return this.each(function(){var t=n(this),e=t.data("bs.popover"),i="object"==typeof o&&o;!e&&/destroy|hide/.test(o)||(e||t.data("bs.popover",e=new s(this,i)),"string"==typeof o&&e[o]())})},n.fn.popover.Constructor=s,n.fn.popover.noConflict=function(){return n.fn.popover=t,this}}(jQuery),function(s){"use strict";function n(t,e){this.$body=s(document.body),this.$scrollElement=s(t).is(document.body)?s(window):s(t),this.options=s.extend({},n.DEFAULTS,e),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",s.proxy(this.process,this)),this.refresh(),this.process()}function e(o){return this.each(function(){var t=s(this),e=t.data("bs.scrollspy"),i="object"==typeof o&&o;e||t.data("bs.scrollspy",e=new n(this,i)),"string"==typeof o&&e[o]()})}n.VERSION="3.4.1",n.DEFAULTS={offset:10},n.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},n.prototype.refresh=function(){var t=this,o="offset",n=0;this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight(),s.isWindow(this.$scrollElement[0])||(o="position",n=this.$scrollElement.scrollTop()),this.$body.find(this.selector).map(function(){var t=s(this),e=t.data("target")||t.attr("href"),i=/^#./.test(e)&&s(e);return i&&i.length&&i.is(":visible")&&[[i[o]().top+n,e]]||null}).sort(function(t,e){return t[0]-e[0]}).each(function(){t.offsets.push(this[0]),t.targets.push(this[1])})},n.prototype.process=function(){var t,e=this.$scrollElement.scrollTop()+this.options.offset,i=this.getScrollHeight(),o=this.options.offset+i-this.$scrollElement.height(),n=this.offsets,s=this.targets,a=this.activeTarget;if(this.scrollHeight!=i&&this.refresh(),o<=e)return a!=(t=s[s.length-1])&&this.activate(t);if(a&&e<n[0])return this.activeTarget=null,this.clear();for(t=n.length;t--;)a!=s[t]&&e>=n[t]&&(n[t+1]===undefined||e<n[t+1])&&this.activate(s[t])},n.prototype.activate=function(t){this.activeTarget=t,this.clear();var e=this.selector+'[data-target="'+t+'"],'+this.selector+'[href="'+t+'"]',i=s(e).parents("li").addClass("active");i.parent(".dropdown-menu").length&&(i=i.closest("li.dropdown").addClass("active")),i.trigger("activate.bs.scrollspy")},n.prototype.clear=function(){s(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};var t=s.fn.scrollspy;s.fn.scrollspy=e,s.fn.scrollspy.Constructor=n,s.fn.scrollspy.noConflict=function(){return s.fn.scrollspy=t,this},s(window).on("load.bs.scrollspy.data-api",function(){s('[data-spy="scroll"]').each(function(){var t=s(this);e.call(t,t.data())})})}(jQuery),function(r){"use strict";var a=function(t){this.element=r(t)};function e(i){return this.each(function(){var t=r(this),e=t.data("bs.tab");e||t.data("bs.tab",e=new a(this)),"string"==typeof i&&e[i]()})}a.VERSION="3.4.1",a.TRANSITION_DURATION=150,a.prototype.show=function(){var t=this.element,e=t.closest("ul:not(.dropdown-menu)"),i=t.data("target");if(i||(i=(i=t.attr("href"))&&i.replace(/.*(?=#[^\s]*$)/,"")),!t.parent("li").hasClass("active")){var o=e.find(".active:last a"),n=r.Event("hide.bs.tab",{relatedTarget:t[0]}),s=r.Event("show.bs.tab",{relatedTarget:o[0]});if(o.trigger(n),t.trigger(s),!s.isDefaultPrevented()&&!n.isDefaultPrevented()){var a=r(document).find(i);this.activate(t.closest("li"),e),this.activate(a,a.parent(),function(){o.trigger({type:"hidden.bs.tab",relatedTarget:t[0]}),t.trigger({type:"shown.bs.tab",relatedTarget:o[0]})})}}},a.prototype.activate=function(t,e,i){var o=e.find("> .active"),n=i&&r.support.transition&&(o.length&&o.hasClass("fade")||!!e.find("> .fade").length);function s(){o.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),t.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),n?(t[0].offsetWidth,t.addClass("in")):t.removeClass("fade"),t.parent(".dropdown-menu").length&&t.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),i&&i()}o.length&&n?o.one("bsTransitionEnd",s).emulateTransitionEnd(a.TRANSITION_DURATION):s(),o.removeClass("in")};var t=r.fn.tab;r.fn.tab=e,r.fn.tab.Constructor=a,r.fn.tab.noConflict=function(){return r.fn.tab=t,this};var i=function(t){t.preventDefault(),e.call(r(this),"show")};r(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',i).on("click.bs.tab.data-api",'[data-toggle="pill"]',i)}(jQuery),function(l){"use strict";var h=function(t,e){this.options=l.extend({},h.DEFAULTS,e);var i=this.options.target===h.DEFAULTS.target?l(this.options.target):l(document).find(this.options.target);this.$target=i.on("scroll.bs.affix.data-api",l.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",l.proxy(this.checkPositionWithEventLoop,this)),this.$element=l(t),this.affixed=null,this.unpin=null,this.pinnedOffset=null,this.checkPosition()};function i(o){return this.each(function(){var t=l(this),e=t.data("bs.affix"),i="object"==typeof o&&o;e||t.data("bs.affix",e=new h(this,i)),"string"==typeof o&&e[o]()})}h.VERSION="3.4.1",h.RESET="affix affix-top affix-bottom",h.DEFAULTS={offset:0,target:window},h.prototype.getState=function(t,e,i,o){var n=this.$target.scrollTop(),s=this.$element.offset(),a=this.$target.height();if(null!=i&&"top"==this.affixed)return n<i&&"top";if("bottom"==this.affixed)return null!=i?!(n+this.unpin<=s.top)&&"bottom":!(n+a<=t-o)&&"bottom";var r=null==this.affixed,l=r?n:s.top;return null!=i&&n<=i?"top":null!=o&&t-o<=l+(r?a:e)&&"bottom"},h.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(h.RESET).addClass("affix");var t=this.$target.scrollTop(),e=this.$element.offset();return this.pinnedOffset=e.top-t},h.prototype.checkPositionWithEventLoop=function(){setTimeout(l.proxy(this.checkPosition,this),1)},h.prototype.checkPosition=function(){if(this.$element.is(":visible")){var t=this.$element.height(),e=this.options.offset,i=e.top,o=e.bottom,n=Math.max(l(document).height(),l(document.body).height());"object"!=typeof e&&(o=i=e),"function"==typeof i&&(i=e.top(this.$element)),"function"==typeof o&&(o=e.bottom(this.$element));var s=this.getState(n,t,i,o);if(this.affixed!=s){null!=this.unpin&&this.$element.css("top","");var a="affix"+(s?"-"+s:""),r=l.Event(a+".bs.affix");if(this.$element.trigger(r),r.isDefaultPrevented())return;this.affixed=s,this.unpin="bottom"==s?this.getPinnedOffset():null,this.$element.removeClass(h.RESET).addClass(a).trigger(a.replace("affix","affixed")+".bs.affix")}"bottom"==s&&this.$element.offset({top:n-t-o})}};var t=l.fn.affix;l.fn.affix=i,l.fn.affix.Constructor=h,l.fn.affix.noConflict=function(){return l.fn.affix=t,this},l(window).on("load",function(){l('[data-spy="affix"]').each(function(){var t=l(this),e=t.data();e.offset=e.offset||{},null!=e.offsetBottom&&(e.offset.bottom=e.offsetBottom),null!=e.offsetTop&&(e.offset.top=e.offsetTop),i.call(t,e)})})}(jQuery);
/*! json-tree - v0.3.0 - 2019-11-17 */

var JSONTree=function(){var n={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","/":"&#x2F;"},t=0,r=0;this.create=function(n,t){return r+=1,'<span class="jstValue">'+u(n,0)+"</span>"},this.click=function(n){if("-"===n.innerHTML){var t=n.parentElement.previousElementSibling.id,r=S(n.parentElement,t+"_end");k(n.parentElement,r),n.innerHTML="+"}else{for(var e=n.parentElement,i=e.nextElementSibling,u=i.children,s=u.length;s>0;s--){var a=u[s-1];e.after(a)}i.remove(),n.innerHTML="-"}};var e=function(){return r+"_"+t++},i=function(t){return t.replace(/[&<>'"]/g,function(t){return n[t]})},u=function(n,t){switch(typeof n){case"boolean":return f(n,t);case"number":return l(n,t);case"string":return o(n,t);default:return null===n?p(t):n instanceof Array?c(n,t):s(n,t)}},s=function(n,t){var r=e(),i=Object.keys(n).map(function(r){var e=j(r,n[r],t+1);return h(t+1)+e}).join(v()+E());return a(b("{",r),i,g("}",r),t)},a=function(n,t,r,e){return[n,'<span>&nbsp;<a href="#" class="jstCollapse" onclick="JSONTree.click(this); return false; ">-</a>&nbsp;</span>',E(),t,E(),h(e),r].join("")},c=function(n,t){var r=e(),i=n.map(function(n){return h(t+1)+u(n,t+1)}).join(v()+E());return a(b("[",r),i,g("]",r),t)},o=function(n,t){var r=i(JSON.stringify(n));return d(r,{class:"jstStr"})},l=function(n,t){return d(n,{class:"jstNum"})},f=function(n,t){return d(n,{class:"jstBool"})},p=function(n){return d("null",{class:"jstNull"})},j=function(n,t,r){var e=i(JSON.stringify(n)),s=d(e,{class:"jstProperty"}),a=u(t,r);return[s+m(),a].join("")},m=function(){return d(": ",{class:"jstColon"})},v=function(){return d(",",{class:"jstComma"})},d=function(n,t){return"<span"+Object.keys(t).map(function(n){return" "+n+'="'+t[n]+'"'}).join("")+">"+n+"</span>"},b=function(n,t){return d(n,{id:"opening_"+t,class:"jstBracket"})},g=function(n,t){return d(n,{id:"opening_"+t+"_end",class:"jstBracket"})},h=function(n){return d(Array(2*n+1).join("&nbsp;"),{})},E=function(){return"<br>"},S=function(n,t){var r=[];for(n=n.nextElementSibling;n&&n.id!=t;)r.push(n),n=n.nextElementSibling;return r},k=function(n,t){var r=document.createElement("div");r.className="jstHiddenBlock",t.forEach(function(n){r.appendChild(n)}),n.after(r)};return this}();
/*
 * angular-ui-bootstrap
 * http://angular-ui.github.io/bootstrap/

 * Version: 2.5.6 - 2017-10-14
 * License: MIT
 */angular.module("ui.bootstrap", ["ui.bootstrap.collapse","ui.bootstrap.tabindex","ui.bootstrap.accordion","ui.bootstrap.alert","ui.bootstrap.buttons","ui.bootstrap.carousel","ui.bootstrap.dateparser","ui.bootstrap.isClass","ui.bootstrap.datepicker","ui.bootstrap.position","ui.bootstrap.datepickerPopup","ui.bootstrap.debounce","ui.bootstrap.multiMap","ui.bootstrap.dropdown","ui.bootstrap.stackedMap","ui.bootstrap.modal","ui.bootstrap.paging","ui.bootstrap.pager","ui.bootstrap.pagination","ui.bootstrap.tooltip","ui.bootstrap.popover","ui.bootstrap.progressbar","ui.bootstrap.rating","ui.bootstrap.tabs","ui.bootstrap.timepicker","ui.bootstrap.typeahead"]);
angular.module('ui.bootstrap.collapse', [])

  .directive('uibCollapse', ['$animate', '$q', '$parse', '$injector', function($animate, $q, $parse, $injector) {
    var $animateCss = $injector.has('$animateCss') ? $injector.get('$animateCss') : null;
    return {
      link: function(scope, element, attrs) {
        var expandingExpr = $parse(attrs.expanding),
          expandedExpr = $parse(attrs.expanded),
          collapsingExpr = $parse(attrs.collapsing),
          collapsedExpr = $parse(attrs.collapsed),
          horizontal = false,
          css = {},
          cssTo = {};

        init();

        function init() {
          horizontal = !!('horizontal' in attrs);
          if (horizontal) {
            css = {
              width: ''
            };
            cssTo = {width: '0'};
          } else {
            css = {
              height: ''
            };
            cssTo = {height: '0'};
          }
          if (!scope.$eval(attrs.uibCollapse)) {
            element.addClass('in')
              .addClass('collapse')
              .attr('aria-expanded', true)
              .attr('aria-hidden', false)
              .css(css);
          }
        }

        function getScrollFromElement(element) {
          if (horizontal) {
            return {width: element.scrollWidth + 'px'};
          }
          return {height: element.scrollHeight + 'px'};
        }

        function expand() {
          if (element.hasClass('collapse') && element.hasClass('in')) {
            return;
          }

          $q.resolve(expandingExpr(scope))
            .then(function() {
              element.removeClass('collapse')
                .addClass('collapsing')
                .attr('aria-expanded', true)
                .attr('aria-hidden', false);

              if ($animateCss) {
                $animateCss(element, {
                  addClass: 'in',
                  easing: 'ease',
                  css: {
                    overflow: 'hidden'
                  },
                  to: getScrollFromElement(element[0])
                }).start()['finally'](expandDone);
              } else {
                $animate.addClass(element, 'in', {
                  css: {
                    overflow: 'hidden'
                  },
                  to: getScrollFromElement(element[0])
                }).then(expandDone);
              }
            }, angular.noop);
        }

        function expandDone() {
          element.removeClass('collapsing')
            .addClass('collapse')
            .css(css);
          expandedExpr(scope);
        }

        function collapse() {
          if (!element.hasClass('collapse') && !element.hasClass('in')) {
            return collapseDone();
          }

          $q.resolve(collapsingExpr(scope))
            .then(function() {
              element
              // IMPORTANT: The width must be set before adding "collapsing" class.
              // Otherwise, the browser attempts to animate from width 0 (in
              // collapsing class) to the given width here.
                .css(getScrollFromElement(element[0]))
                // initially all panel collapse have the collapse class, this removal
                // prevents the animation from jumping to collapsed state
                .removeClass('collapse')
                .addClass('collapsing')
                .attr('aria-expanded', false)
                .attr('aria-hidden', true);

              if ($animateCss) {
                $animateCss(element, {
                  removeClass: 'in',
                  to: cssTo
                }).start()['finally'](collapseDone);
              } else {
                $animate.removeClass(element, 'in', {
                  to: cssTo
                }).then(collapseDone);
              }
            }, angular.noop);
        }

        function collapseDone() {
          element.css(cssTo); // Required so that collapse works when animation is disabled
          element.removeClass('collapsing')
            .addClass('collapse');
          collapsedExpr(scope);
        }

        scope.$watch(attrs.uibCollapse, function(shouldCollapse) {
          if (shouldCollapse) {
            collapse();
          } else {
            expand();
          }
        });
      }
    };
  }]);

angular.module('ui.bootstrap.tabindex', [])

.directive('uibTabindexToggle', function() {
  return {
    restrict: 'A',
    link: function(scope, elem, attrs) {
      attrs.$observe('disabled', function(disabled) {
        attrs.$set('tabindex', disabled ? -1 : null);
      });
    }
  };
});

angular.module('ui.bootstrap.accordion', ['ui.bootstrap.collapse', 'ui.bootstrap.tabindex'])

.constant('uibAccordionConfig', {
  closeOthers: true
})

.controller('UibAccordionController', ['$scope', '$attrs', 'uibAccordionConfig', function($scope, $attrs, accordionConfig) {
  // This array keeps track of the accordion groups
  this.groups = [];

  // Ensure that all the groups in this accordion are closed, unless close-others explicitly says not to
  this.closeOthers = function(openGroup) {
    var closeOthers = angular.isDefined($attrs.closeOthers) ?
      $scope.$eval($attrs.closeOthers) : accordionConfig.closeOthers;
    if (closeOthers) {
      angular.forEach(this.groups, function(group) {
        if (group !== openGroup) {
          group.isOpen = false;
        }
      });
    }
  };

  // This is called from the accordion-group directive to add itself to the accordion
  this.addGroup = function(groupScope) {
    var that = this;
    this.groups.push(groupScope);

    groupScope.$on('$destroy', function(event) {
      that.removeGroup(groupScope);
    });
  };

  // This is called from the accordion-group directive when to remove itself
  this.removeGroup = function(group) {
    var index = this.groups.indexOf(group);
    if (index !== -1) {
      this.groups.splice(index, 1);
    }
  };
}])

// The accordion directive simply sets up the directive controller
// and adds an accordion CSS class to itself element.
.directive('uibAccordion', function() {
  return {
    controller: 'UibAccordionController',
    controllerAs: 'accordion',
    transclude: true,
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'uib/template/accordion/accordion.html';
    }
  };
})

// The accordion-group directive indicates a block of html that will expand and collapse in an accordion
.directive('uibAccordionGroup', function() {
  return {
    require: '^uibAccordion',         // We need this directive to be inside an accordion
    transclude: true,              // It transcludes the contents of the directive into the template
    restrict: 'A',
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'uib/template/accordion/accordion-group.html';
    },
    scope: {
      heading: '@',               // Interpolate the heading attribute onto this scope
      panelClass: '@?',           // Ditto with panelClass
      isOpen: '=?',
      isDisabled: '=?'
    },
    controller: function() {
      this.setHeading = function(element) {
        this.heading = element;
      };
    },
    link: function(scope, element, attrs, accordionCtrl) {
      element.addClass('panel');
      accordionCtrl.addGroup(scope);

      scope.openClass = attrs.openClass || 'panel-open';
      scope.panelClass = attrs.panelClass || 'panel-default';
      scope.$watch('isOpen', function(value) {
        element.toggleClass(scope.openClass, !!value);
        if (value) {
          accordionCtrl.closeOthers(scope);
        }
      });

      scope.toggleOpen = function($event) {
        if (!scope.isDisabled) {
          if (!$event || $event.which === 32) {
            scope.isOpen = !scope.isOpen;
          }
        }
      };

      var id = 'accordiongroup-' + scope.$id + '-' + Math.floor(Math.random() * 10000);
      scope.headingId = id + '-tab';
      scope.panelId = id + '-panel';
    }
  };
})

// Use accordion-heading below an accordion-group to provide a heading containing HTML
.directive('uibAccordionHeading', function() {
  return {
    transclude: true,   // Grab the contents to be used as the heading
    template: '',       // In effect remove this element!
    replace: true,
    require: '^uibAccordionGroup',
    link: function(scope, element, attrs, accordionGroupCtrl, transclude) {
      // Pass the heading to the accordion-group controller
      // so that it can be transcluded into the right place in the template
      // [The second parameter to transclude causes the elements to be cloned so that they work in ng-repeat]
      accordionGroupCtrl.setHeading(transclude(scope, angular.noop));
    }
  };
})

// Use in the accordion-group template to indicate where you want the heading to be transcluded
// You must provide the property on the accordion-group controller that will hold the transcluded element
.directive('uibAccordionTransclude', function() {
  return {
    require: '^uibAccordionGroup',
    link: function(scope, element, attrs, controller) {
      scope.$watch(function() { return controller[attrs.uibAccordionTransclude]; }, function(heading) {
        if (heading) {
          var elem = angular.element(element[0].querySelector(getHeaderSelectors()));
          elem.html('');
          elem.append(heading);
        }
      });
    }
  };

  function getHeaderSelectors() {
      return 'uib-accordion-header,' +
          'data-uib-accordion-header,' +
          'x-uib-accordion-header,' +
          'uib\\:accordion-header,' +
          '[uib-accordion-header],' +
          '[data-uib-accordion-header],' +
          '[x-uib-accordion-header]';
  }
});

angular.module('ui.bootstrap.alert', [])

.controller('UibAlertController', ['$scope', '$element', '$attrs', '$interpolate', '$timeout', function($scope, $element, $attrs, $interpolate, $timeout) {
  $scope.closeable = !!$attrs.close;
  $element.addClass('alert');
  $attrs.$set('role', 'alert');
  if ($scope.closeable) {
    $element.addClass('alert-dismissible');
  }

  var dismissOnTimeout = angular.isDefined($attrs.dismissOnTimeout) ?
    $interpolate($attrs.dismissOnTimeout)($scope.$parent) : null;

  if (dismissOnTimeout) {
    $timeout(function() {
      $scope.close();
    }, parseInt(dismissOnTimeout, 10));
  }
}])

.directive('uibAlert', function() {
  return {
    controller: 'UibAlertController',
    controllerAs: 'alert',
    restrict: 'A',
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'uib/template/alert/alert.html';
    },
    transclude: true,
    scope: {
      close: '&'
    }
  };
});

angular.module('ui.bootstrap.buttons', [])

.constant('uibButtonConfig', {
  activeClass: 'active',
  toggleEvent: 'click'
})

.controller('UibButtonsController', ['uibButtonConfig', function(buttonConfig) {
  this.activeClass = buttonConfig.activeClass || 'active';
  this.toggleEvent = buttonConfig.toggleEvent || 'click';
}])

.directive('uibBtnRadio', ['$parse', function($parse) {
  return {
    require: ['uibBtnRadio', 'ngModel'],
    controller: 'UibButtonsController',
    controllerAs: 'buttons',
    link: function(scope, element, attrs, ctrls) {
      var buttonsCtrl = ctrls[0], ngModelCtrl = ctrls[1];
      var uncheckableExpr = $parse(attrs.uibUncheckable);

      element.find('input').css({display: 'none'});

      //model -> UI
      ngModelCtrl.$render = function() {
        element.toggleClass(buttonsCtrl.activeClass, angular.equals(ngModelCtrl.$modelValue, scope.$eval(attrs.uibBtnRadio)));
      };

      //ui->model
      element.on(buttonsCtrl.toggleEvent, function() {
        if (attrs.disabled) {
          return;
        }

        var isActive = element.hasClass(buttonsCtrl.activeClass);

        if (!isActive || angular.isDefined(attrs.uncheckable)) {
          scope.$apply(function() {
            ngModelCtrl.$setViewValue(isActive ? null : scope.$eval(attrs.uibBtnRadio));
            ngModelCtrl.$render();
          });
        }
      });

      if (attrs.uibUncheckable) {
        scope.$watch(uncheckableExpr, function(uncheckable) {
          attrs.$set('uncheckable', uncheckable ? '' : undefined);
        });
      }
    }
  };
}])

.directive('uibBtnCheckbox', function() {
  return {
    require: ['uibBtnCheckbox', 'ngModel'],
    controller: 'UibButtonsController',
    controllerAs: 'button',
    link: function(scope, element, attrs, ctrls) {
      var buttonsCtrl = ctrls[0], ngModelCtrl = ctrls[1];

      element.find('input').css({display: 'none'});

      function getTrueValue() {
        return getCheckboxValue(attrs.btnCheckboxTrue, true);
      }

      function getFalseValue() {
        return getCheckboxValue(attrs.btnCheckboxFalse, false);
      }

      function getCheckboxValue(attribute, defaultValue) {
        return angular.isDefined(attribute) ? scope.$eval(attribute) : defaultValue;
      }

      //model -> UI
      ngModelCtrl.$render = function() {
        element.toggleClass(buttonsCtrl.activeClass, angular.equals(ngModelCtrl.$modelValue, getTrueValue()));
      };

      //ui->model
      element.on(buttonsCtrl.toggleEvent, function() {
        if (attrs.disabled) {
          return;
        }

        scope.$apply(function() {
          ngModelCtrl.$setViewValue(element.hasClass(buttonsCtrl.activeClass) ? getFalseValue() : getTrueValue());
          ngModelCtrl.$render();
        });
      });
    }
  };
});

angular.module('ui.bootstrap.carousel', [])

.controller('UibCarouselController', ['$scope', '$element', '$interval', '$timeout', '$animate', function($scope, $element, $interval, $timeout, $animate) {
  var self = this,
    slides = self.slides = $scope.slides = [],
    SLIDE_DIRECTION = 'uib-slideDirection',
    currentIndex = $scope.active,
    currentInterval, isPlaying;

  var destroyed = false;
  $element.addClass('carousel');

  self.addSlide = function(slide, element) {
    slides.push({
      slide: slide,
      element: element
    });
    slides.sort(function(a, b) {
      return +a.slide.index - +b.slide.index;
    });
    //if this is the first slide or the slide is set to active, select it
    if (slide.index === $scope.active || slides.length === 1 && !angular.isNumber($scope.active)) {
      if ($scope.$currentTransition) {
        $scope.$currentTransition = null;
      }

      currentIndex = slide.index;
      $scope.active = slide.index;
      setActive(currentIndex);
      self.select(slides[findSlideIndex(slide)]);
      if (slides.length === 1) {
        $scope.play();
      }
    }
  };

  self.getCurrentIndex = function() {
    for (var i = 0; i < slides.length; i++) {
      if (slides[i].slide.index === currentIndex) {
        return i;
      }
    }
  };

  self.next = $scope.next = function() {
    var newIndex = (self.getCurrentIndex() + 1) % slides.length;

    if (newIndex === 0 && $scope.noWrap()) {
      $scope.pause();
      return;
    }

    return self.select(slides[newIndex], 'next');
  };

  self.prev = $scope.prev = function() {
    var newIndex = self.getCurrentIndex() - 1 < 0 ? slides.length - 1 : self.getCurrentIndex() - 1;

    if ($scope.noWrap() && newIndex === slides.length - 1) {
      $scope.pause();
      return;
    }

    return self.select(slides[newIndex], 'prev');
  };

  self.removeSlide = function(slide) {
    var index = findSlideIndex(slide);

    //get the index of the slide inside the carousel
    slides.splice(index, 1);
    if (slides.length > 0 && currentIndex === index) {
      if (index >= slides.length) {
        currentIndex = slides.length - 1;
        $scope.active = currentIndex;
        setActive(currentIndex);
        self.select(slides[slides.length - 1]);
      } else {
        currentIndex = index;
        $scope.active = currentIndex;
        setActive(currentIndex);
        self.select(slides[index]);
      }
    } else if (currentIndex > index) {
      currentIndex--;
      $scope.active = currentIndex;
    }

    //clean the active value when no more slide
    if (slides.length === 0) {
      currentIndex = null;
      $scope.active = null;
    }
  };

  /* direction: "prev" or "next" */
  self.select = $scope.select = function(nextSlide, direction) {
    var nextIndex = findSlideIndex(nextSlide.slide);
    //Decide direction if it's not given
    if (direction === undefined) {
      direction = nextIndex > self.getCurrentIndex() ? 'next' : 'prev';
    }
    //Prevent this user-triggered transition from occurring if there is already one in progress
    if (nextSlide.slide.index !== currentIndex &&
      !$scope.$currentTransition) {
      goNext(nextSlide.slide, nextIndex, direction);
    }
  };

  /* Allow outside people to call indexOf on slides array */
  $scope.indexOfSlide = function(slide) {
    return +slide.slide.index;
  };

  $scope.isActive = function(slide) {
    return $scope.active === slide.slide.index;
  };

  $scope.isPrevDisabled = function() {
    return $scope.active === 0 && $scope.noWrap();
  };

  $scope.isNextDisabled = function() {
    return $scope.active === slides.length - 1 && $scope.noWrap();
  };

  $scope.pause = function() {
    if (!$scope.noPause) {
      isPlaying = false;
      resetTimer();
    }
  };

  $scope.play = function() {
    if (!isPlaying) {
      isPlaying = true;
      restartTimer();
    }
  };

  $element.on('mouseenter', $scope.pause);
  $element.on('mouseleave', $scope.play);

  $scope.$on('$destroy', function() {
    destroyed = true;
    resetTimer();
  });

  $scope.$watch('noTransition', function(noTransition) {
    $animate.enabled($element, !noTransition);
  });

  $scope.$watch('interval', restartTimer);

  $scope.$watchCollection('slides', resetTransition);

  $scope.$watch('active', function(index) {
    if (angular.isNumber(index) && currentIndex !== index) {
      for (var i = 0; i < slides.length; i++) {
        if (slides[i].slide.index === index) {
          index = i;
          break;
        }
      }

      var slide = slides[index];
      if (slide) {
        setActive(index);
        self.select(slides[index]);
        currentIndex = index;
      }
    }
  });

  function getSlideByIndex(index) {
    for (var i = 0, l = slides.length; i < l; ++i) {
      if (slides[i].index === index) {
        return slides[i];
      }
    }
  }

  function setActive(index) {
    for (var i = 0; i < slides.length; i++) {
      slides[i].slide.active = i === index;
    }
  }

  function goNext(slide, index, direction) {
    if (destroyed) {
      return;
    }

    angular.extend(slide, {direction: direction});
    angular.extend(slides[currentIndex].slide || {}, {direction: direction});
    if ($animate.enabled($element) && !$scope.$currentTransition &&
      slides[index].element && self.slides.length > 1) {
      slides[index].element.data(SLIDE_DIRECTION, slide.direction);
      var currentIdx = self.getCurrentIndex();

      if (angular.isNumber(currentIdx) && slides[currentIdx].element) {
        slides[currentIdx].element.data(SLIDE_DIRECTION, slide.direction);
      }

      $scope.$currentTransition = true;
      $animate.on('addClass', slides[index].element, function(element, phase) {
        if (phase === 'close') {
          $scope.$currentTransition = null;
          $animate.off('addClass', element);
        }
      });
    }

    $scope.active = slide.index;
    currentIndex = slide.index;
    setActive(index);

    //every time you change slides, reset the timer
    restartTimer();
  }

  function findSlideIndex(slide) {
    for (var i = 0; i < slides.length; i++) {
      if (slides[i].slide === slide) {
        return i;
      }
    }
  }

  function resetTimer() {
    if (currentInterval) {
      $interval.cancel(currentInterval);
      currentInterval = null;
    }
  }

  function resetTransition(slides) {
    if (!slides.length) {
      $scope.$currentTransition = null;
    }
  }

  function restartTimer() {
    resetTimer();
    var interval = +$scope.interval;
    if (!isNaN(interval) && interval > 0) {
      currentInterval = $interval(timerFn, interval);
    }
  }

  function timerFn() {
    var interval = +$scope.interval;
    if (isPlaying && !isNaN(interval) && interval > 0 && slides.length) {
      $scope.next();
    } else {
      $scope.pause();
    }
  }
}])

.directive('uibCarousel', function() {
  return {
    transclude: true,
    controller: 'UibCarouselController',
    controllerAs: 'carousel',
    restrict: 'A',
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'uib/template/carousel/carousel.html';
    },
    scope: {
      active: '=',
      interval: '=',
      noTransition: '=',
      noPause: '=',
      noWrap: '&'
    }
  };
})

.directive('uibSlide', ['$animate', function($animate) {
  return {
    require: '^uibCarousel',
    restrict: 'A',
    transclude: true,
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'uib/template/carousel/slide.html';
    },
    scope: {
      actual: '=?',
      index: '=?'
    },
    link: function (scope, element, attrs, carouselCtrl) {
      element.addClass('item');
      carouselCtrl.addSlide(scope, element);
      //when the scope is destroyed then remove the slide from the current slides array
      scope.$on('$destroy', function() {
        carouselCtrl.removeSlide(scope);
      });

      scope.$watch('active', function(active) {
        $animate[active ? 'addClass' : 'removeClass'](element, 'active');
      });
    }
  };
}])

.animation('.item', ['$animateCss',
function($animateCss) {
  var SLIDE_DIRECTION = 'uib-slideDirection';

  function removeClass(element, className, callback) {
    element.removeClass(className);
    if (callback) {
      callback();
    }
  }

  return {
    beforeAddClass: function(element, className, done) {
      if (className === 'active') {
        var stopped = false;
        var direction = element.data(SLIDE_DIRECTION);
        var directionClass = direction === 'next' ? 'left' : 'right';
        var removeClassFn = removeClass.bind(this, element,
          directionClass + ' ' + direction, done);
        element.addClass(direction);

        $animateCss(element, {addClass: directionClass})
          .start()
          .done(removeClassFn);

        return function() {
          stopped = true;
        };
      }
      done();
    },
    beforeRemoveClass: function (element, className, done) {
      if (className === 'active') {
        var stopped = false;
        var direction = element.data(SLIDE_DIRECTION);
        var directionClass = direction === 'next' ? 'left' : 'right';
        var removeClassFn = removeClass.bind(this, element, directionClass, done);

        $animateCss(element, {addClass: directionClass})
          .start()
          .done(removeClassFn);

        return function() {
          stopped = true;
        };
      }
      done();
    }
  };
}]);

angular.module('ui.bootstrap.dateparser', [])

.service('uibDateParser', ['$log', '$locale', 'dateFilter', 'orderByFilter', 'filterFilter', function($log, $locale, dateFilter, orderByFilter, filterFilter) {
  // Pulled from https://github.com/mbostock/d3/blob/master/src/format/requote.js
  var SPECIAL_CHARACTERS_REGEXP = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;

  var localeId;
  var formatCodeToRegex;

  this.init = function() {
    localeId = $locale.id;

    this.parsers = {};
    this.formatters = {};

    formatCodeToRegex = [
      {
        key: 'yyyy',
        regex: '\\d{4}',
        apply: function(value) { this.year = +value; },
        formatter: function(date) {
          var _date = new Date();
          _date.setFullYear(Math.abs(date.getFullYear()));
          return dateFilter(_date, 'yyyy');
        }
      },
      {
        key: 'yy',
        regex: '\\d{2}',
        apply: function(value) { value = +value; this.year = value < 69 ? value + 2000 : value + 1900; },
        formatter: function(date) {
          var _date = new Date();
          _date.setFullYear(Math.abs(date.getFullYear()));
          return dateFilter(_date, 'yy');
        }
      },
      {
        key: 'y',
        regex: '\\d{1,4}',
        apply: function(value) { this.year = +value; },
        formatter: function(date) {
          var _date = new Date();
          _date.setFullYear(Math.abs(date.getFullYear()));
          return dateFilter(_date, 'y');
        }
      },
      {
        key: 'M!',
        regex: '0?[1-9]|1[0-2]',
        apply: function(value) { this.month = value - 1; },
        formatter: function(date) {
          var value = date.getMonth();
          if (/^[0-9]$/.test(value)) {
            return dateFilter(date, 'MM');
          }

          return dateFilter(date, 'M');
        }
      },
      {
        key: 'MMMM',
        regex: $locale.DATETIME_FORMATS.MONTH.join('|'),
        apply: function(value) { this.month = $locale.DATETIME_FORMATS.MONTH.indexOf(value); },
        formatter: function(date) { return dateFilter(date, 'MMMM'); }
      },
      {
        key: 'MMM',
        regex: $locale.DATETIME_FORMATS.SHORTMONTH.join('|'),
        apply: function(value) { this.month = $locale.DATETIME_FORMATS.SHORTMONTH.indexOf(value); },
        formatter: function(date) { return dateFilter(date, 'MMM'); }
      },
      {
        key: 'MM',
        regex: '0[1-9]|1[0-2]',
        apply: function(value) { this.month = value - 1; },
        formatter: function(date) { return dateFilter(date, 'MM'); }
      },
      {
        key: 'M',
        regex: '[1-9]|1[0-2]',
        apply: function(value) { this.month = value - 1; },
        formatter: function(date) { return dateFilter(date, 'M'); }
      },
      {
        key: 'd!',
        regex: '[0-2]?[0-9]{1}|3[0-1]{1}',
        apply: function(value) { this.date = +value; },
        formatter: function(date) {
          var value = date.getDate();
          if (/^[1-9]$/.test(value)) {
            return dateFilter(date, 'dd');
          }

          return dateFilter(date, 'd');
        }
      },
      {
        key: 'dd',
        regex: '[0-2][0-9]{1}|3[0-1]{1}',
        apply: function(value) { this.date = +value; },
        formatter: function(date) { return dateFilter(date, 'dd'); }
      },
      {
        key: 'd',
        regex: '[1-2]?[0-9]{1}|3[0-1]{1}',
        apply: function(value) { this.date = +value; },
        formatter: function(date) { return dateFilter(date, 'd'); }
      },
      {
        key: 'EEEE',
        regex: $locale.DATETIME_FORMATS.DAY.join('|'),
        formatter: function(date) { return dateFilter(date, 'EEEE'); }
      },
      {
        key: 'EEE',
        regex: $locale.DATETIME_FORMATS.SHORTDAY.join('|'),
        formatter: function(date) { return dateFilter(date, 'EEE'); }
      },
      {
        key: 'HH',
        regex: '(?:0|1)[0-9]|2[0-3]',
        apply: function(value) { this.hours = +value; },
        formatter: function(date) { return dateFilter(date, 'HH'); }
      },
      {
        key: 'hh',
        regex: '0[0-9]|1[0-2]',
        apply: function(value) { this.hours = +value; },
        formatter: function(date) { return dateFilter(date, 'hh'); }
      },
      {
        key: 'H',
        regex: '1?[0-9]|2[0-3]',
        apply: function(value) { this.hours = +value; },
        formatter: function(date) { return dateFilter(date, 'H'); }
      },
      {
        key: 'h',
        regex: '[0-9]|1[0-2]',
        apply: function(value) { this.hours = +value; },
        formatter: function(date) { return dateFilter(date, 'h'); }
      },
      {
        key: 'mm',
        regex: '[0-5][0-9]',
        apply: function(value) { this.minutes = +value; },
        formatter: function(date) { return dateFilter(date, 'mm'); }
      },
      {
        key: 'm',
        regex: '[0-9]|[1-5][0-9]',
        apply: function(value) { this.minutes = +value; },
        formatter: function(date) { return dateFilter(date, 'm'); }
      },
      {
        key: 'sss',
        regex: '[0-9][0-9][0-9]',
        apply: function(value) { this.milliseconds = +value; },
        formatter: function(date) { return dateFilter(date, 'sss'); }
      },
      {
        key: 'ss',
        regex: '[0-5][0-9]',
        apply: function(value) { this.seconds = +value; },
        formatter: function(date) { return dateFilter(date, 'ss'); }
      },
      {
        key: 's',
        regex: '[0-9]|[1-5][0-9]',
        apply: function(value) { this.seconds = +value; },
        formatter: function(date) { return dateFilter(date, 's'); }
      },
      {
        key: 'a',
        regex: $locale.DATETIME_FORMATS.AMPMS.join('|'),
        apply: function(value) {
          if (this.hours === 12) {
            this.hours = 0;
          }

          if (value === 'PM') {
            this.hours += 12;
          }
        },
        formatter: function(date) { return dateFilter(date, 'a'); }
      },
      {
        key: 'Z',
        regex: '[+-]\\d{4}',
        apply: function(value) {
          var matches = value.match(/([+-])(\d{2})(\d{2})/),
            sign = matches[1],
            hours = matches[2],
            minutes = matches[3];
          this.hours += toInt(sign + hours);
          this.minutes += toInt(sign + minutes);
        },
        formatter: function(date) {
          return dateFilter(date, 'Z');
        }
      },
      {
        key: 'ww',
        regex: '[0-4][0-9]|5[0-3]',
        formatter: function(date) { return dateFilter(date, 'ww'); }
      },
      {
        key: 'w',
        regex: '[0-9]|[1-4][0-9]|5[0-3]',
        formatter: function(date) { return dateFilter(date, 'w'); }
      },
      {
        key: 'GGGG',
        regex: $locale.DATETIME_FORMATS.ERANAMES.join('|').replace(/\s/g, '\\s'),
        formatter: function(date) { return dateFilter(date, 'GGGG'); }
      },
      {
        key: 'GGG',
        regex: $locale.DATETIME_FORMATS.ERAS.join('|'),
        formatter: function(date) { return dateFilter(date, 'GGG'); }
      },
      {
        key: 'GG',
        regex: $locale.DATETIME_FORMATS.ERAS.join('|'),
        formatter: function(date) { return dateFilter(date, 'GG'); }
      },
      {
        key: 'G',
        regex: $locale.DATETIME_FORMATS.ERAS.join('|'),
        formatter: function(date) { return dateFilter(date, 'G'); }
      }
    ];

    if (angular.version.major >= 1 && angular.version.minor > 4) {
      formatCodeToRegex.push({
        key: 'LLLL',
        regex: $locale.DATETIME_FORMATS.STANDALONEMONTH.join('|'),
        apply: function(value) { this.month = $locale.DATETIME_FORMATS.STANDALONEMONTH.indexOf(value); },
        formatter: function(date) { return dateFilter(date, 'LLLL'); }
      });
    }
  };

  this.init();

  function getFormatCodeToRegex(key) {
    return filterFilter(formatCodeToRegex, {key: key}, true)[0];
  }

  this.getParser = function (key) {
    var f = getFormatCodeToRegex(key);
    return f && f.apply || null;
  };

  this.overrideParser = function (key, parser) {
    var f = getFormatCodeToRegex(key);
    if (f && angular.isFunction(parser)) {
      this.parsers = {};
      f.apply = parser;
    }
  }.bind(this);

  function createParser(format) {
    var map = [], regex = format.split('');

    // check for literal values
    var quoteIndex = format.indexOf('\'');
    if (quoteIndex > -1) {
      var inLiteral = false;
      format = format.split('');
      for (var i = quoteIndex; i < format.length; i++) {
        if (inLiteral) {
          if (format[i] === '\'') {
            if (i + 1 < format.length && format[i+1] === '\'') { // escaped single quote
              format[i+1] = '$';
              regex[i+1] = '';
            } else { // end of literal
              regex[i] = '';
              inLiteral = false;
            }
          }
          format[i] = '$';
        } else {
          if (format[i] === '\'') { // start of literal
            format[i] = '$';
            regex[i] = '';
            inLiteral = true;
          }
        }
      }

      format = format.join('');
    }

    angular.forEach(formatCodeToRegex, function(data) {
      var index = format.indexOf(data.key);

      if (index > -1) {
        format = format.split('');

        regex[index] = '(' + data.regex + ')';
        format[index] = '$'; // Custom symbol to define consumed part of format
        for (var i = index + 1, n = index + data.key.length; i < n; i++) {
          regex[i] = '';
          format[i] = '$';
        }
        format = format.join('');

        map.push({
          index: index,
          key: data.key,
          apply: data.apply,
          matcher: data.regex
        });
      }
    });

    return {
      regex: new RegExp('^' + regex.join('') + '$'),
      map: orderByFilter(map, 'index')
    };
  }

  function createFormatter(format) {
    var formatters = [];
    var i = 0;
    var formatter, literalIdx;
    while (i < format.length) {
      if (angular.isNumber(literalIdx)) {
        if (format.charAt(i) === '\'') {
          if (i + 1 >= format.length || format.charAt(i + 1) !== '\'') {
            formatters.push(constructLiteralFormatter(format, literalIdx, i));
            literalIdx = null;
          }
        } else if (i === format.length) {
          while (literalIdx < format.length) {
            formatter = constructFormatterFromIdx(format, literalIdx);
            formatters.push(formatter);
            literalIdx = formatter.endIdx;
          }
        }

        i++;
        continue;
      }

      if (format.charAt(i) === '\'') {
        literalIdx = i;
        i++;
        continue;
      }

      formatter = constructFormatterFromIdx(format, i);

      formatters.push(formatter.parser);
      i = formatter.endIdx;
    }

    return formatters;
  }

  function constructLiteralFormatter(format, literalIdx, endIdx) {
    return function() {
      return format.substr(literalIdx + 1, endIdx - literalIdx - 1);
    };
  }

  function constructFormatterFromIdx(format, i) {
    var currentPosStr = format.substr(i);
    for (var j = 0; j < formatCodeToRegex.length; j++) {
      if (new RegExp('^' + formatCodeToRegex[j].key).test(currentPosStr)) {
        var data = formatCodeToRegex[j];
        return {
          endIdx: i + data.key.length,
          parser: data.formatter
        };
      }
    }

    return {
      endIdx: i + 1,
      parser: function() {
        return currentPosStr.charAt(0);
      }
    };
  }

  this.filter = function(date, format) {
    if (!angular.isDate(date) || isNaN(date) || !format) {
      return '';
    }

    format = $locale.DATETIME_FORMATS[format] || format;

    if ($locale.id !== localeId) {
      this.init();
    }

    if (!this.formatters[format]) {
      this.formatters[format] = createFormatter(format);
    }

    var formatters = this.formatters[format];

    return formatters.reduce(function(str, formatter) {
      return str + formatter(date);
    }, '');
  };

  this.parse = function(input, format, baseDate) {
    if (!angular.isString(input) || !format) {
      return input;
    }

    format = $locale.DATETIME_FORMATS[format] || format;
    format = format.replace(SPECIAL_CHARACTERS_REGEXP, '\\$&');

    if ($locale.id !== localeId) {
      this.init();
    }

    if (!this.parsers[format]) {
      this.parsers[format] = createParser(format, 'apply');
    }

    var parser = this.parsers[format],
        regex = parser.regex,
        map = parser.map,
        results = input.match(regex),
        tzOffset = false;
    if (results && results.length) {
      var fields, dt;
      if (angular.isDate(baseDate) && !isNaN(baseDate.getTime())) {
        fields = {
          year: baseDate.getFullYear(),
          month: baseDate.getMonth(),
          date: baseDate.getDate(),
          hours: baseDate.getHours(),
          minutes: baseDate.getMinutes(),
          seconds: baseDate.getSeconds(),
          milliseconds: baseDate.getMilliseconds()
        };
      } else {
        if (baseDate) {
          $log.warn('dateparser:', 'baseDate is not a valid date');
        }
        fields = { year: 1900, month: 0, date: 1, hours: 0, minutes: 0, seconds: 0, milliseconds: 0 };
      }

      for (var i = 1, n = results.length; i < n; i++) {
        var mapper = map[i - 1];
        if (mapper.matcher === 'Z') {
          tzOffset = true;
        }

        if (mapper.apply) {
          mapper.apply.call(fields, results[i]);
        }
      }

      var datesetter = tzOffset ? Date.prototype.setUTCFullYear :
        Date.prototype.setFullYear;
      var timesetter = tzOffset ? Date.prototype.setUTCHours :
        Date.prototype.setHours;

      if (isValid(fields.year, fields.month, fields.date)) {
        if (angular.isDate(baseDate) && !isNaN(baseDate.getTime()) && !tzOffset) {
          dt = new Date(baseDate);
          datesetter.call(dt, fields.year, fields.month, fields.date);
          timesetter.call(dt, fields.hours, fields.minutes,
            fields.seconds, fields.milliseconds);
        } else {
          dt = new Date(0);
          datesetter.call(dt, fields.year, fields.month, fields.date);
          timesetter.call(dt, fields.hours || 0, fields.minutes || 0,
            fields.seconds || 0, fields.milliseconds || 0);
        }
      }

      return dt;
    }
  };

  // Check if date is valid for specific month (and year for February).
  // Month: 0 = Jan, 1 = Feb, etc
  function isValid(year, month, date) {
    if (date < 1) {
      return false;
    }

    if (month === 1 && date > 28) {
      return date === 29 && (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0);
    }

    if (month === 3 || month === 5 || month === 8 || month === 10) {
      return date < 31;
    }

    return true;
  }

  function toInt(str) {
    return parseInt(str, 10);
  }

  this.toTimezone = toTimezone;
  this.fromTimezone = fromTimezone;
  this.timezoneToOffset = timezoneToOffset;
  this.addDateMinutes = addDateMinutes;
  this.convertTimezoneToLocal = convertTimezoneToLocal;

  function toTimezone(date, timezone) {
    return date && timezone ? convertTimezoneToLocal(date, timezone) : date;
  }

  function fromTimezone(date, timezone) {
    return date && timezone ? convertTimezoneToLocal(date, timezone, true) : date;
  }

  //https://github.com/angular/angular.js/blob/622c42169699ec07fc6daaa19fe6d224e5d2f70e/src/Angular.js#L1207
  function timezoneToOffset(timezone, fallback) {
    timezone = timezone.replace(/:/g, '');
    var requestedTimezoneOffset = Date.parse('Jan 01, 1970 00:00:00 ' + timezone) / 60000;
    return isNaN(requestedTimezoneOffset) ? fallback : requestedTimezoneOffset;
  }

  function addDateMinutes(date, minutes) {
    date = new Date(date.getTime());
    date.setMinutes(date.getMinutes() + minutes);
    return date;
  }

  function convertTimezoneToLocal(date, timezone, reverse) {
    reverse = reverse ? -1 : 1;
    var dateTimezoneOffset = date.getTimezoneOffset();
    var timezoneOffset = timezoneToOffset(timezone, dateTimezoneOffset);
    return addDateMinutes(date, reverse * (timezoneOffset - dateTimezoneOffset));
  }
}]);

// Avoiding use of ng-class as it creates a lot of watchers when a class is to be applied to
// at most one element.
angular.module('ui.bootstrap.isClass', [])
.directive('uibIsClass', [
         '$animate',
function ($animate) {
  //                    11111111          22222222
  var ON_REGEXP = /^\s*([\s\S]+?)\s+on\s+([\s\S]+?)\s*$/;
  //                    11111111           22222222
  var IS_REGEXP = /^\s*([\s\S]+?)\s+for\s+([\s\S]+?)\s*$/;

  var dataPerTracked = {};

  return {
    restrict: 'A',
    compile: function(tElement, tAttrs) {
      var linkedScopes = [];
      var instances = [];
      var expToData = {};
      var lastActivated = null;
      var onExpMatches = tAttrs.uibIsClass.match(ON_REGEXP);
      var onExp = onExpMatches[2];
      var expsStr = onExpMatches[1];
      var exps = expsStr.split(',');

      return linkFn;

      function linkFn(scope, element, attrs) {
        linkedScopes.push(scope);
        instances.push({
          scope: scope,
          element: element
        });

        exps.forEach(function(exp, k) {
          addForExp(exp, scope);
        });

        scope.$on('$destroy', removeScope);
      }

      function addForExp(exp, scope) {
        var matches = exp.match(IS_REGEXP);
        var clazz = scope.$eval(matches[1]);
        var compareWithExp = matches[2];
        var data = expToData[exp];
        if (!data) {
          var watchFn = function(compareWithVal) {
            var newActivated = null;
            instances.some(function(instance) {
              var thisVal = instance.scope.$eval(onExp);
              if (thisVal === compareWithVal) {
                newActivated = instance;
                return true;
              }
            });
            if (data.lastActivated !== newActivated) {
              if (data.lastActivated) {
                $animate.removeClass(data.lastActivated.element, clazz);
              }
              if (newActivated) {
                $animate.addClass(newActivated.element, clazz);
              }
              data.lastActivated = newActivated;
            }
          };
          expToData[exp] = data = {
            lastActivated: null,
            scope: scope,
            watchFn: watchFn,
            compareWithExp: compareWithExp,
            watcher: scope.$watch(compareWithExp, watchFn)
          };
        }
        data.watchFn(scope.$eval(compareWithExp));
      }

      function removeScope(e) {
        var removedScope = e.targetScope;
        var index = linkedScopes.indexOf(removedScope);
        linkedScopes.splice(index, 1);
        instances.splice(index, 1);
        if (linkedScopes.length) {
          var newWatchScope = linkedScopes[0];
          angular.forEach(expToData, function(data) {
            if (data.scope === removedScope) {
              data.watcher = newWatchScope.$watch(data.compareWithExp, data.watchFn);
              data.scope = newWatchScope;
            }
          });
        } else {
          expToData = {};
        }
      }
    }
  };
}]);
angular.module('ui.bootstrap.datepicker', ['ui.bootstrap.dateparser', 'ui.bootstrap.isClass'])

.value('$datepickerSuppressError', false)

.value('$datepickerLiteralWarning', true)

.constant('uibDatepickerConfig', {
  datepickerMode: 'day',
  formatDay: 'dd',
  formatMonth: 'MMMM',
  formatYear: 'yyyy',
  formatDayHeader: 'EEE',
  formatDayTitle: 'MMMM yyyy',
  formatMonthTitle: 'yyyy',
  maxDate: null,
  maxMode: 'year',
  minDate: null,
  minMode: 'day',
  monthColumns: 3,
  ngModelOptions: {},
  shortcutPropagation: false,
  showWeeks: true,
  yearColumns: 5,
  yearRows: 4
})

.controller('UibDatepickerController', ['$scope', '$element', '$attrs', '$parse', '$interpolate', '$locale', '$log', 'dateFilter', 'uibDatepickerConfig', '$datepickerLiteralWarning', '$datepickerSuppressError', 'uibDateParser',
  function($scope, $element, $attrs, $parse, $interpolate, $locale, $log, dateFilter, datepickerConfig, $datepickerLiteralWarning, $datepickerSuppressError, dateParser) {
  var self = this,
      ngModelCtrl = { $setViewValue: angular.noop }, // nullModelCtrl;
      ngModelOptions = {},
      watchListeners = [];

  $element.addClass('uib-datepicker');
  $attrs.$set('role', 'application');

  if (!$scope.datepickerOptions) {
    $scope.datepickerOptions = {};
  }

  // Modes chain
  this.modes = ['day', 'month', 'year'];

  [
    'customClass',
    'dateDisabled',
    'datepickerMode',
    'formatDay',
    'formatDayHeader',
    'formatDayTitle',
    'formatMonth',
    'formatMonthTitle',
    'formatYear',
    'maxDate',
    'maxMode',
    'minDate',
    'minMode',
    'monthColumns',
    'showWeeks',
    'shortcutPropagation',
    'startingDay',
    'yearColumns',
    'yearRows'
  ].forEach(function(key) {
    switch (key) {
      case 'customClass':
      case 'dateDisabled':
        $scope[key] = $scope.datepickerOptions[key] || angular.noop;
        break;
      case 'datepickerMode':
        $scope.datepickerMode = angular.isDefined($scope.datepickerOptions.datepickerMode) ?
          $scope.datepickerOptions.datepickerMode : datepickerConfig.datepickerMode;
        break;
      case 'formatDay':
      case 'formatDayHeader':
      case 'formatDayTitle':
      case 'formatMonth':
      case 'formatMonthTitle':
      case 'formatYear':
        self[key] = angular.isDefined($scope.datepickerOptions[key]) ?
          $interpolate($scope.datepickerOptions[key])($scope.$parent) :
          datepickerConfig[key];
        break;
      case 'monthColumns':
      case 'showWeeks':
      case 'shortcutPropagation':
      case 'yearColumns':
      case 'yearRows':
        self[key] = angular.isDefined($scope.datepickerOptions[key]) ?
          $scope.datepickerOptions[key] : datepickerConfig[key];
        break;
      case 'startingDay':
        if (angular.isDefined($scope.datepickerOptions.startingDay)) {
          self.startingDay = $scope.datepickerOptions.startingDay;
        } else if (angular.isNumber(datepickerConfig.startingDay)) {
          self.startingDay = datepickerConfig.startingDay;
        } else {
          self.startingDay = ($locale.DATETIME_FORMATS.FIRSTDAYOFWEEK + 8) % 7;
        }

        break;
      case 'maxDate':
      case 'minDate':
        $scope.$watch('datepickerOptions.' + key, function(value) {
          if (value) {
            if (angular.isDate(value)) {
              self[key] = dateParser.fromTimezone(new Date(value), ngModelOptions.getOption('timezone'));
            } else {
              if ($datepickerLiteralWarning) {
                $log.warn('Literal date support has been deprecated, please switch to date object usage');
              }

              self[key] = new Date(dateFilter(value, 'medium'));
            }
          } else {
            self[key] = datepickerConfig[key] ?
              dateParser.fromTimezone(new Date(datepickerConfig[key]), ngModelOptions.getOption('timezone')) :
              null;
          }

          self.refreshView();
        });

        break;
      case 'maxMode':
      case 'minMode':
        if ($scope.datepickerOptions[key]) {
          $scope.$watch(function() { return $scope.datepickerOptions[key]; }, function(value) {
            self[key] = $scope[key] = angular.isDefined(value) ? value : $scope.datepickerOptions[key];
            if (key === 'minMode' && self.modes.indexOf($scope.datepickerOptions.datepickerMode) < self.modes.indexOf(self[key]) ||
              key === 'maxMode' && self.modes.indexOf($scope.datepickerOptions.datepickerMode) > self.modes.indexOf(self[key])) {
              $scope.datepickerMode = self[key];
              $scope.datepickerOptions.datepickerMode = self[key];
            }
          });
        } else {
          self[key] = $scope[key] = datepickerConfig[key] || null;
        }

        break;
    }
  });

  $scope.uniqueId = 'datepicker-' + $scope.$id + '-' + Math.floor(Math.random() * 10000);

  $scope.disabled = angular.isDefined($attrs.disabled) || false;
  if (angular.isDefined($attrs.ngDisabled)) {
    watchListeners.push($scope.$parent.$watch($attrs.ngDisabled, function(disabled) {
      $scope.disabled = disabled;
      self.refreshView();
    }));
  }

  $scope.isActive = function(dateObject) {
    if (self.compare(dateObject.date, self.activeDate) === 0) {
      $scope.activeDateId = dateObject.uid;
      return true;
    }
    return false;
  };

  this.init = function(ngModelCtrl_) {
    ngModelCtrl = ngModelCtrl_;
    ngModelOptions = extractOptions(ngModelCtrl);

    if ($scope.datepickerOptions.initDate) {
      self.activeDate = dateParser.fromTimezone($scope.datepickerOptions.initDate, ngModelOptions.getOption('timezone')) || new Date();
      $scope.$watch('datepickerOptions.initDate', function(initDate) {
        if (initDate && (ngModelCtrl.$isEmpty(ngModelCtrl.$modelValue) || ngModelCtrl.$invalid)) {
          self.activeDate = dateParser.fromTimezone(initDate, ngModelOptions.getOption('timezone'));
          self.refreshView();
        }
      });
    } else {
      self.activeDate = new Date();
    }

    var date = ngModelCtrl.$modelValue ? new Date(ngModelCtrl.$modelValue) : new Date();
    this.activeDate = !isNaN(date) ?
      dateParser.fromTimezone(date, ngModelOptions.getOption('timezone')) :
      dateParser.fromTimezone(new Date(), ngModelOptions.getOption('timezone'));

    ngModelCtrl.$render = function() {
      self.render();
    };
  };

  this.render = function() {
    if (ngModelCtrl.$viewValue) {
      var date = new Date(ngModelCtrl.$viewValue),
          isValid = !isNaN(date);

      if (isValid) {
        this.activeDate = dateParser.fromTimezone(date, ngModelOptions.getOption('timezone'));
      } else if (!$datepickerSuppressError) {
        $log.error('Datepicker directive: "ng-model" value must be a Date object');
      }
    }
    this.refreshView();
  };

  this.refreshView = function() {
    if (this.element) {
      $scope.selectedDt = null;
      this._refreshView();
      if ($scope.activeDt) {
        $scope.activeDateId = $scope.activeDt.uid;
      }

      var date = ngModelCtrl.$viewValue ? new Date(ngModelCtrl.$viewValue) : null;
      date = dateParser.fromTimezone(date, ngModelOptions.getOption('timezone'));
      ngModelCtrl.$setValidity('dateDisabled', !date ||
        this.element && !this.isDisabled(date));
    }
  };

  this.createDateObject = function(date, format) {
    var model = ngModelCtrl.$viewValue ? new Date(ngModelCtrl.$viewValue) : null;
    model = dateParser.fromTimezone(model, ngModelOptions.getOption('timezone'));
    var today = new Date();
    today = dateParser.fromTimezone(today, ngModelOptions.getOption('timezone'));
    var time = this.compare(date, today);
    var dt = {
      date: date,
      label: dateParser.filter(date, format),
      selected: model && this.compare(date, model) === 0,
      disabled: this.isDisabled(date),
      past: time < 0,
      current: time === 0,
      future: time > 0,
      customClass: this.customClass(date) || null
    };

    if (model && this.compare(date, model) === 0) {
      $scope.selectedDt = dt;
    }

    if (self.activeDate && this.compare(dt.date, self.activeDate) === 0) {
      $scope.activeDt = dt;
    }

    return dt;
  };

  this.isDisabled = function(date) {
    return $scope.disabled ||
      this.minDate && this.compare(date, this.minDate) < 0 ||
      this.maxDate && this.compare(date, this.maxDate) > 0 ||
      $scope.dateDisabled && $scope.dateDisabled({date: date, mode: $scope.datepickerMode});
  };

  this.customClass = function(date) {
    return $scope.customClass({date: date, mode: $scope.datepickerMode});
  };

  // Split array into smaller arrays
  this.split = function(arr, size) {
    var arrays = [];
    while (arr.length > 0) {
      arrays.push(arr.splice(0, size));
    }
    return arrays;
  };

  $scope.select = function(date) {
    if ($scope.datepickerMode === self.minMode) {
      var dt = ngModelCtrl.$viewValue ? dateParser.fromTimezone(new Date(ngModelCtrl.$viewValue), ngModelOptions.getOption('timezone')) : new Date(0, 0, 0, 0, 0, 0, 0);
      dt.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
      dt = dateParser.toTimezone(dt, ngModelOptions.getOption('timezone'));
      ngModelCtrl.$setViewValue(dt);
      ngModelCtrl.$render();
    } else {
      self.activeDate = date;
      setMode(self.modes[self.modes.indexOf($scope.datepickerMode) - 1]);

      $scope.$emit('uib:datepicker.mode');
    }

    $scope.$broadcast('uib:datepicker.focus');
  };

  $scope.move = function(direction) {
    var year = self.activeDate.getFullYear() + direction * (self.step.years || 0),
        month = self.activeDate.getMonth() + direction * (self.step.months || 0);
    self.activeDate.setFullYear(year, month, 1);
    self.refreshView();
  };

  $scope.toggleMode = function(direction) {
    direction = direction || 1;

    if ($scope.datepickerMode === self.maxMode && direction === 1 ||
      $scope.datepickerMode === self.minMode && direction === -1) {
      return;
    }

    setMode(self.modes[self.modes.indexOf($scope.datepickerMode) + direction]);

    $scope.$emit('uib:datepicker.mode');
  };

  // Key event mapper
  $scope.keys = { 13: 'enter', 32: 'space', 33: 'pageup', 34: 'pagedown', 35: 'end', 36: 'home', 37: 'left', 38: 'up', 39: 'right', 40: 'down' };

  var focusElement = function() {
    self.element[0].focus();
  };

  // Listen for focus requests from popup directive
  $scope.$on('uib:datepicker.focus', focusElement);

  $scope.keydown = function(evt) {
    var key = $scope.keys[evt.which];

    if (!key || evt.shiftKey || evt.altKey || $scope.disabled) {
      return;
    }

    evt.preventDefault();
    if (!self.shortcutPropagation) {
      evt.stopPropagation();
    }

    if (key === 'enter' || key === 'space') {
      if (self.isDisabled(self.activeDate)) {
        return; // do nothing
      }
      $scope.select(self.activeDate);
    } else if (evt.ctrlKey && (key === 'up' || key === 'down')) {
      $scope.toggleMode(key === 'up' ? 1 : -1);
    } else {
      self.handleKeyDown(key, evt);
      self.refreshView();
    }
  };

  $element.on('keydown', function(evt) {
    $scope.$apply(function() {
      $scope.keydown(evt);
    });
  });

  $scope.$on('$destroy', function() {
    //Clear all watch listeners on destroy
    while (watchListeners.length) {
      watchListeners.shift()();
    }
  });

  function setMode(mode) {
    $scope.datepickerMode = mode;
    $scope.datepickerOptions.datepickerMode = mode;
  }

  function extractOptions(ngModelCtrl) {
    var ngModelOptions;

    if (angular.version.minor < 6) { // in angular < 1.6 $options could be missing
      // guarantee a value
      ngModelOptions = ngModelCtrl.$options ||
        $scope.datepickerOptions.ngModelOptions ||
        datepickerConfig.ngModelOptions ||
        {};

      // mimic 1.6+ api
      ngModelOptions.getOption = function (key) {
        return ngModelOptions[key];
      };
    } else { // in angular >=1.6 $options is always present
      // ng-model-options defaults timezone to null; don't let its precedence squash a non-null value
      var timezone = ngModelCtrl.$options.getOption('timezone') ||
        ($scope.datepickerOptions.ngModelOptions ? $scope.datepickerOptions.ngModelOptions.timezone : null) ||
        (datepickerConfig.ngModelOptions ? datepickerConfig.ngModelOptions.timezone : null);

      // values passed to createChild override existing values
      ngModelOptions = ngModelCtrl.$options // start with a ModelOptions instance
        .createChild(datepickerConfig.ngModelOptions) // lowest precedence
        .createChild($scope.datepickerOptions.ngModelOptions)
        .createChild(ngModelCtrl.$options) // highest precedence
        .createChild({timezone: timezone}); // to keep from squashing a non-null value
    }

    return ngModelOptions;
  }
}])

.controller('UibDaypickerController', ['$scope', '$element', 'dateFilter', function(scope, $element, dateFilter) {
  var DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  this.step = { months: 1 };
  this.element = $element;
  function getDaysInMonth(year, month) {
    return month === 1 && year % 4 === 0 &&
      (year % 100 !== 0 || year % 400 === 0) ? 29 : DAYS_IN_MONTH[month];
  }

  this.init = function(ctrl) {
    angular.extend(ctrl, this);
    scope.showWeeks = ctrl.showWeeks;
    ctrl.refreshView();
  };

  this.getDates = function(startDate, n) {
    var dates = new Array(n), current = new Date(startDate), i = 0, date;
    while (i < n) {
      date = new Date(current);
      dates[i++] = date;
      current.setDate(current.getDate() + 1);
    }
    return dates;
  };

  this._refreshView = function() {
    var year = this.activeDate.getFullYear(),
      month = this.activeDate.getMonth(),
      firstDayOfMonth = new Date(this.activeDate);

    firstDayOfMonth.setFullYear(year, month, 1);

    var difference = this.startingDay - firstDayOfMonth.getDay(),
      numDisplayedFromPreviousMonth = difference > 0 ?
        7 - difference : - difference,
      firstDate = new Date(firstDayOfMonth);

    if (numDisplayedFromPreviousMonth > 0) {
      firstDate.setDate(-numDisplayedFromPreviousMonth + 1);
    }

    // 42 is the number of days on a six-week calendar
    var days = this.getDates(firstDate, 42);
    for (var i = 0; i < 42; i ++) {
      days[i] = angular.extend(this.createDateObject(days[i], this.formatDay), {
        secondary: days[i].getMonth() !== month,
        uid: scope.uniqueId + '-' + i
      });
    }

    scope.labels = new Array(7);
    for (var j = 0; j < 7; j++) {
      scope.labels[j] = {
        abbr: dateFilter(days[j].date, this.formatDayHeader),
        full: dateFilter(days[j].date, 'EEEE')
      };
    }

    scope.title = dateFilter(this.activeDate, this.formatDayTitle);
    scope.rows = this.split(days, 7);

    if (scope.showWeeks) {
      scope.weekNumbers = [];
      var thursdayIndex = (4 + 7 - this.startingDay) % 7,
          numWeeks = scope.rows.length;
      for (var curWeek = 0; curWeek < numWeeks; curWeek++) {
        scope.weekNumbers.push(
          getISO8601WeekNumber(scope.rows[curWeek][thursdayIndex].date));
      }
    }
  };

  this.compare = function(date1, date2) {
    var _date1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
    var _date2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
    _date1.setFullYear(date1.getFullYear());
    _date2.setFullYear(date2.getFullYear());
    return _date1 - _date2;
  };

  function getISO8601WeekNumber(date) {
    var checkDate = new Date(date);
    checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7)); // Thursday
    var time = checkDate.getTime();
    checkDate.setMonth(0); // Compare with Jan 1
    checkDate.setDate(1);
    return Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1;
  }

  this.handleKeyDown = function(key, evt) {
    var date = this.activeDate.getDate();

    if (key === 'left') {
      date = date - 1;
    } else if (key === 'up') {
      date = date - 7;
    } else if (key === 'right') {
      date = date + 1;
    } else if (key === 'down') {
      date = date + 7;
    } else if (key === 'pageup' || key === 'pagedown') {
      var month = this.activeDate.getMonth() + (key === 'pageup' ? - 1 : 1);
      this.activeDate.setMonth(month, 1);
      date = Math.min(getDaysInMonth(this.activeDate.getFullYear(), this.activeDate.getMonth()), date);
    } else if (key === 'home') {
      date = 1;
    } else if (key === 'end') {
      date = getDaysInMonth(this.activeDate.getFullYear(), this.activeDate.getMonth());
    }
    this.activeDate.setDate(date);
  };
}])

.controller('UibMonthpickerController', ['$scope', '$element', 'dateFilter', function(scope, $element, dateFilter) {
  this.step = { years: 1 };
  this.element = $element;

  this.init = function(ctrl) {
    angular.extend(ctrl, this);
    ctrl.refreshView();
  };

  this._refreshView = function() {
    var months = new Array(12),
        year = this.activeDate.getFullYear(),
        date;

    for (var i = 0; i < 12; i++) {
      date = new Date(this.activeDate);
      date.setFullYear(year, i, 1);
      months[i] = angular.extend(this.createDateObject(date, this.formatMonth), {
        uid: scope.uniqueId + '-' + i
      });
    }

    scope.title = dateFilter(this.activeDate, this.formatMonthTitle);
    scope.rows = this.split(months, this.monthColumns);
    scope.yearHeaderColspan = this.monthColumns > 3 ? this.monthColumns - 2 : 1;
  };

  this.compare = function(date1, date2) {
    var _date1 = new Date(date1.getFullYear(), date1.getMonth());
    var _date2 = new Date(date2.getFullYear(), date2.getMonth());
    _date1.setFullYear(date1.getFullYear());
    _date2.setFullYear(date2.getFullYear());
    return _date1 - _date2;
  };

  this.handleKeyDown = function(key, evt) {
    var date = this.activeDate.getMonth();

    if (key === 'left') {
      date = date - 1;
    } else if (key === 'up') {
      date = date - this.monthColumns;
    } else if (key === 'right') {
      date = date + 1;
    } else if (key === 'down') {
      date = date + this.monthColumns;
    } else if (key === 'pageup' || key === 'pagedown') {
      var year = this.activeDate.getFullYear() + (key === 'pageup' ? - 1 : 1);
      this.activeDate.setFullYear(year);
    } else if (key === 'home') {
      date = 0;
    } else if (key === 'end') {
      date = 11;
    }
    this.activeDate.setMonth(date);
  };
}])

.controller('UibYearpickerController', ['$scope', '$element', 'dateFilter', function(scope, $element, dateFilter) {
  var columns, range;
  this.element = $element;

  function getStartingYear(year) {
    return parseInt((year - 1) / range, 10) * range + 1;
  }

  this.yearpickerInit = function() {
    columns = this.yearColumns;
    range = this.yearRows * columns;
    this.step = { years: range };
  };

  this._refreshView = function() {
    var years = new Array(range), date;

    for (var i = 0, start = getStartingYear(this.activeDate.getFullYear()); i < range; i++) {
      date = new Date(this.activeDate);
      date.setFullYear(start + i, 0, 1);
      years[i] = angular.extend(this.createDateObject(date, this.formatYear), {
        uid: scope.uniqueId + '-' + i
      });
    }

    scope.title = [years[0].label, years[range - 1].label].join(' - ');
    scope.rows = this.split(years, columns);
    scope.columns = columns;
  };

  this.compare = function(date1, date2) {
    return date1.getFullYear() - date2.getFullYear();
  };

  this.handleKeyDown = function(key, evt) {
    var date = this.activeDate.getFullYear();

    if (key === 'left') {
      date = date - 1;
    } else if (key === 'up') {
      date = date - columns;
    } else if (key === 'right') {
      date = date + 1;
    } else if (key === 'down') {
      date = date + columns;
    } else if (key === 'pageup' || key === 'pagedown') {
      date += (key === 'pageup' ? - 1 : 1) * range;
    } else if (key === 'home') {
      date = getStartingYear(this.activeDate.getFullYear());
    } else if (key === 'end') {
      date = getStartingYear(this.activeDate.getFullYear()) + range - 1;
    }
    this.activeDate.setFullYear(date);
  };
}])

.directive('uibDatepicker', function() {
  return {
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'uib/template/datepicker/datepicker.html';
    },
    scope: {
      datepickerOptions: '=?'
    },
    require: ['uibDatepicker', '^ngModel'],
    restrict: 'A',
    controller: 'UibDatepickerController',
    controllerAs: 'datepicker',
    link: function(scope, element, attrs, ctrls) {
      var datepickerCtrl = ctrls[0], ngModelCtrl = ctrls[1];

      datepickerCtrl.init(ngModelCtrl);
    }
  };
})

.directive('uibDaypicker', function() {
  return {
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'uib/template/datepicker/day.html';
    },
    require: ['^uibDatepicker', 'uibDaypicker'],
    restrict: 'A',
    controller: 'UibDaypickerController',
    link: function(scope, element, attrs, ctrls) {
      var datepickerCtrl = ctrls[0],
        daypickerCtrl = ctrls[1];

      daypickerCtrl.init(datepickerCtrl);
    }
  };
})

.directive('uibMonthpicker', function() {
  return {
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'uib/template/datepicker/month.html';
    },
    require: ['^uibDatepicker', 'uibMonthpicker'],
    restrict: 'A',
    controller: 'UibMonthpickerController',
    link: function(scope, element, attrs, ctrls) {
      var datepickerCtrl = ctrls[0],
        monthpickerCtrl = ctrls[1];

      monthpickerCtrl.init(datepickerCtrl);
    }
  };
})

.directive('uibYearpicker', function() {
  return {
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'uib/template/datepicker/year.html';
    },
    require: ['^uibDatepicker', 'uibYearpicker'],
    restrict: 'A',
    controller: 'UibYearpickerController',
    link: function(scope, element, attrs, ctrls) {
      var ctrl = ctrls[0];
      angular.extend(ctrl, ctrls[1]);
      ctrl.yearpickerInit();

      ctrl.refreshView();
    }
  };
});

angular.module('ui.bootstrap.position', [])

/**
 * A set of utility methods for working with the DOM.
 * It is meant to be used where we need to absolute-position elements in
 * relation to another element (this is the case for tooltips, popovers,
 * typeahead suggestions etc.).
 */
  .factory('$uibPosition', ['$document', '$window', function($document, $window) {
    /**
     * Used by scrollbarWidth() function to cache scrollbar's width.
     * Do not access this variable directly, use scrollbarWidth() instead.
     */
    var SCROLLBAR_WIDTH;
    /**
     * scrollbar on body and html element in IE and Edge overlay
     * content and should be considered 0 width.
     */
    var BODY_SCROLLBAR_WIDTH;
    var OVERFLOW_REGEX = {
      normal: /(auto|scroll)/,
      hidden: /(auto|scroll|hidden)/
    };
    var PLACEMENT_REGEX = {
      auto: /\s?auto?\s?/i,
      primary: /^(top|bottom|left|right)$/,
      secondary: /^(top|bottom|left|right|center)$/,
      vertical: /^(top|bottom)$/
    };
    var BODY_REGEX = /(HTML|BODY)/;

    return {

      /**
       * Provides a raw DOM element from a jQuery/jQLite element.
       *
       * @param {element} elem - The element to convert.
       *
       * @returns {element} A HTML element.
       */
      getRawNode: function(elem) {
        return elem.nodeName ? elem : elem[0] || elem;
      },

      /**
       * Provides a parsed number for a style property.  Strips
       * units and casts invalid numbers to 0.
       *
       * @param {string} value - The style value to parse.
       *
       * @returns {number} A valid number.
       */
      parseStyle: function(value) {
        value = parseFloat(value);
        return isFinite(value) ? value : 0;
      },

      /**
       * Provides the closest positioned ancestor.
       *
       * @param {element} element - The element to get the offest parent for.
       *
       * @returns {element} The closest positioned ancestor.
       */
      offsetParent: function(elem) {
        elem = this.getRawNode(elem);

        var offsetParent = elem.offsetParent || $document[0].documentElement;

        function isStaticPositioned(el) {
          return ($window.getComputedStyle(el).position || 'static') === 'static';
        }

        while (offsetParent && offsetParent !== $document[0].documentElement && isStaticPositioned(offsetParent)) {
          offsetParent = offsetParent.offsetParent;
        }

        return offsetParent || $document[0].documentElement;
      },

      /**
       * Provides the scrollbar width, concept from TWBS measureScrollbar()
       * function in https://github.com/twbs/bootstrap/blob/master/js/modal.js
       * In IE and Edge, scollbar on body and html element overlay and should
       * return a width of 0.
       *
       * @returns {number} The width of the browser scollbar.
       */
      scrollbarWidth: function(isBody) {
        if (isBody) {
          if (angular.isUndefined(BODY_SCROLLBAR_WIDTH)) {
            var bodyElem = $document.find('body');
            bodyElem.addClass('uib-position-body-scrollbar-measure');
            BODY_SCROLLBAR_WIDTH = $window.innerWidth - bodyElem[0].clientWidth;
            BODY_SCROLLBAR_WIDTH = isFinite(BODY_SCROLLBAR_WIDTH) ? BODY_SCROLLBAR_WIDTH : 0;
            bodyElem.removeClass('uib-position-body-scrollbar-measure');
          }
          return BODY_SCROLLBAR_WIDTH;
        }

        if (angular.isUndefined(SCROLLBAR_WIDTH)) {
          var scrollElem = angular.element('<div class="uib-position-scrollbar-measure"></div>');
          $document.find('body').append(scrollElem);
          SCROLLBAR_WIDTH = scrollElem[0].offsetWidth - scrollElem[0].clientWidth;
          SCROLLBAR_WIDTH = isFinite(SCROLLBAR_WIDTH) ? SCROLLBAR_WIDTH : 0;
          scrollElem.remove();
        }

        return SCROLLBAR_WIDTH;
      },

      /**
       * Provides the padding required on an element to replace the scrollbar.
       *
       * @returns {object} An object with the following properties:
       *   <ul>
       *     <li>**scrollbarWidth**: the width of the scrollbar</li>
       *     <li>**widthOverflow**: whether the the width is overflowing</li>
       *     <li>**right**: the amount of right padding on the element needed to replace the scrollbar</li>
       *     <li>**rightOriginal**: the amount of right padding currently on the element</li>
       *     <li>**heightOverflow**: whether the the height is overflowing</li>
       *     <li>**bottom**: the amount of bottom padding on the element needed to replace the scrollbar</li>
       *     <li>**bottomOriginal**: the amount of bottom padding currently on the element</li>
       *   </ul>
       */
      scrollbarPadding: function(elem) {
        elem = this.getRawNode(elem);

        var elemStyle = $window.getComputedStyle(elem);
        var paddingRight = this.parseStyle(elemStyle.paddingRight);
        var paddingBottom = this.parseStyle(elemStyle.paddingBottom);
        var scrollParent = this.scrollParent(elem, false, true);
        var scrollbarWidth = this.scrollbarWidth(BODY_REGEX.test(scrollParent.tagName));

        return {
          scrollbarWidth: scrollbarWidth,
          widthOverflow: scrollParent.scrollWidth > scrollParent.clientWidth,
          right: paddingRight + scrollbarWidth,
          originalRight: paddingRight,
          heightOverflow: scrollParent.scrollHeight > scrollParent.clientHeight,
          bottom: paddingBottom + scrollbarWidth,
          originalBottom: paddingBottom
         };
      },

      /**
       * Checks to see if the element is scrollable.
       *
       * @param {element} elem - The element to check.
       * @param {boolean=} [includeHidden=false] - Should scroll style of 'hidden' be considered,
       *   default is false.
       *
       * @returns {boolean} Whether the element is scrollable.
       */
      isScrollable: function(elem, includeHidden) {
        elem = this.getRawNode(elem);

        var overflowRegex = includeHidden ? OVERFLOW_REGEX.hidden : OVERFLOW_REGEX.normal;
        var elemStyle = $window.getComputedStyle(elem);
        return overflowRegex.test(elemStyle.overflow + elemStyle.overflowY + elemStyle.overflowX);
      },

      /**
       * Provides the closest scrollable ancestor.
       * A port of the jQuery UI scrollParent method:
       * https://github.com/jquery/jquery-ui/blob/master/ui/scroll-parent.js
       *
       * @param {element} elem - The element to find the scroll parent of.
       * @param {boolean=} [includeHidden=false] - Should scroll style of 'hidden' be considered,
       *   default is false.
       * @param {boolean=} [includeSelf=false] - Should the element being passed be
       * included in the scrollable llokup.
       *
       * @returns {element} A HTML element.
       */
      scrollParent: function(elem, includeHidden, includeSelf) {
        elem = this.getRawNode(elem);

        var overflowRegex = includeHidden ? OVERFLOW_REGEX.hidden : OVERFLOW_REGEX.normal;
        var documentEl = $document[0].documentElement;
        var elemStyle = $window.getComputedStyle(elem);
        if (includeSelf && overflowRegex.test(elemStyle.overflow + elemStyle.overflowY + elemStyle.overflowX)) {
          return elem;
        }
        var excludeStatic = elemStyle.position === 'absolute';
        var scrollParent = elem.parentElement || documentEl;

        if (scrollParent === documentEl || elemStyle.position === 'fixed') {
          return documentEl;
        }

        while (scrollParent.parentElement && scrollParent !== documentEl) {
          var spStyle = $window.getComputedStyle(scrollParent);
          if (excludeStatic && spStyle.position !== 'static') {
            excludeStatic = false;
          }

          if (!excludeStatic && overflowRegex.test(spStyle.overflow + spStyle.overflowY + spStyle.overflowX)) {
            break;
          }
          scrollParent = scrollParent.parentElement;
        }

        return scrollParent;
      },

      /**
       * Provides read-only equivalent of jQuery's position function:
       * http://api.jquery.com/position/ - distance to closest positioned
       * ancestor.  Does not account for margins by default like jQuery position.
       *
       * @param {element} elem - The element to caclulate the position on.
       * @param {boolean=} [includeMargins=false] - Should margins be accounted
       * for, default is false.
       *
       * @returns {object} An object with the following properties:
       *   <ul>
       *     <li>**width**: the width of the element</li>
       *     <li>**height**: the height of the element</li>
       *     <li>**top**: distance to top edge of offset parent</li>
       *     <li>**left**: distance to left edge of offset parent</li>
       *   </ul>
       */
      position: function(elem, includeMagins) {
        elem = this.getRawNode(elem);

        var elemOffset = this.offset(elem);
        if (includeMagins) {
          var elemStyle = $window.getComputedStyle(elem);
          elemOffset.top -= this.parseStyle(elemStyle.marginTop);
          elemOffset.left -= this.parseStyle(elemStyle.marginLeft);
        }
        var parent = this.offsetParent(elem);
        var parentOffset = {top: 0, left: 0};

        if (parent !== $document[0].documentElement) {
          parentOffset = this.offset(parent);
          parentOffset.top += parent.clientTop - parent.scrollTop;
          parentOffset.left += parent.clientLeft - parent.scrollLeft;
        }

        return {
          width: Math.round(angular.isNumber(elemOffset.width) ? elemOffset.width : elem.offsetWidth),
          height: Math.round(angular.isNumber(elemOffset.height) ? elemOffset.height : elem.offsetHeight),
          top: Math.round(elemOffset.top - parentOffset.top),
          left: Math.round(elemOffset.left - parentOffset.left)
        };
      },

      /**
       * Provides read-only equivalent of jQuery's offset function:
       * http://api.jquery.com/offset/ - distance to viewport.  Does
       * not account for borders, margins, or padding on the body
       * element.
       *
       * @param {element} elem - The element to calculate the offset on.
       *
       * @returns {object} An object with the following properties:
       *   <ul>
       *     <li>**width**: the width of the element</li>
       *     <li>**height**: the height of the element</li>
       *     <li>**top**: distance to top edge of viewport</li>
       *     <li>**right**: distance to bottom edge of viewport</li>
       *   </ul>
       */
      offset: function(elem) {
        elem = this.getRawNode(elem);

        var elemBCR = elem.getBoundingClientRect();
        return {
          width: Math.round(angular.isNumber(elemBCR.width) ? elemBCR.width : elem.offsetWidth),
          height: Math.round(angular.isNumber(elemBCR.height) ? elemBCR.height : elem.offsetHeight),
          top: Math.round(elemBCR.top + ($window.pageYOffset || $document[0].documentElement.scrollTop)),
          left: Math.round(elemBCR.left + ($window.pageXOffset || $document[0].documentElement.scrollLeft))
        };
      },

      /**
       * Provides offset distance to the closest scrollable ancestor
       * or viewport.  Accounts for border and scrollbar width.
       *
       * Right and bottom dimensions represent the distance to the
       * respective edge of the viewport element.  If the element
       * edge extends beyond the viewport, a negative value will be
       * reported.
       *
       * @param {element} elem - The element to get the viewport offset for.
       * @param {boolean=} [useDocument=false] - Should the viewport be the document element instead
       * of the first scrollable element, default is false.
       * @param {boolean=} [includePadding=true] - Should the padding on the offset parent element
       * be accounted for, default is true.
       *
       * @returns {object} An object with the following properties:
       *   <ul>
       *     <li>**top**: distance to the top content edge of viewport element</li>
       *     <li>**bottom**: distance to the bottom content edge of viewport element</li>
       *     <li>**left**: distance to the left content edge of viewport element</li>
       *     <li>**right**: distance to the right content edge of viewport element</li>
       *   </ul>
       */
      viewportOffset: function(elem, useDocument, includePadding) {
        elem = this.getRawNode(elem);
        includePadding = includePadding !== false ? true : false;

        var elemBCR = elem.getBoundingClientRect();
        var offsetBCR = {top: 0, left: 0, bottom: 0, right: 0};

        var offsetParent = useDocument ? $document[0].documentElement : this.scrollParent(elem);
        var offsetParentBCR = offsetParent.getBoundingClientRect();

        offsetBCR.top = offsetParentBCR.top + offsetParent.clientTop;
        offsetBCR.left = offsetParentBCR.left + offsetParent.clientLeft;
        if (offsetParent === $document[0].documentElement) {
          offsetBCR.top += $window.pageYOffset;
          offsetBCR.left += $window.pageXOffset;
        }
        offsetBCR.bottom = offsetBCR.top + offsetParent.clientHeight;
        offsetBCR.right = offsetBCR.left + offsetParent.clientWidth;

        if (includePadding) {
          var offsetParentStyle = $window.getComputedStyle(offsetParent);
          offsetBCR.top += this.parseStyle(offsetParentStyle.paddingTop);
          offsetBCR.bottom -= this.parseStyle(offsetParentStyle.paddingBottom);
          offsetBCR.left += this.parseStyle(offsetParentStyle.paddingLeft);
          offsetBCR.right -= this.parseStyle(offsetParentStyle.paddingRight);
        }

        return {
          top: Math.round(elemBCR.top - offsetBCR.top),
          bottom: Math.round(offsetBCR.bottom - elemBCR.bottom),
          left: Math.round(elemBCR.left - offsetBCR.left),
          right: Math.round(offsetBCR.right - elemBCR.right)
        };
      },

      /**
       * Provides an array of placement values parsed from a placement string.
       * Along with the 'auto' indicator, supported placement strings are:
       *   <ul>
       *     <li>top: element on top, horizontally centered on host element.</li>
       *     <li>top-left: element on top, left edge aligned with host element left edge.</li>
       *     <li>top-right: element on top, lerightft edge aligned with host element right edge.</li>
       *     <li>bottom: element on bottom, horizontally centered on host element.</li>
       *     <li>bottom-left: element on bottom, left edge aligned with host element left edge.</li>
       *     <li>bottom-right: element on bottom, right edge aligned with host element right edge.</li>
       *     <li>left: element on left, vertically centered on host element.</li>
       *     <li>left-top: element on left, top edge aligned with host element top edge.</li>
       *     <li>left-bottom: element on left, bottom edge aligned with host element bottom edge.</li>
       *     <li>right: element on right, vertically centered on host element.</li>
       *     <li>right-top: element on right, top edge aligned with host element top edge.</li>
       *     <li>right-bottom: element on right, bottom edge aligned with host element bottom edge.</li>
       *   </ul>
       * A placement string with an 'auto' indicator is expected to be
       * space separated from the placement, i.e: 'auto bottom-left'  If
       * the primary and secondary placement values do not match 'top,
       * bottom, left, right' then 'top' will be the primary placement and
       * 'center' will be the secondary placement.  If 'auto' is passed, true
       * will be returned as the 3rd value of the array.
       *
       * @param {string} placement - The placement string to parse.
       *
       * @returns {array} An array with the following values
       * <ul>
       *   <li>**[0]**: The primary placement.</li>
       *   <li>**[1]**: The secondary placement.</li>
       *   <li>**[2]**: If auto is passed: true, else undefined.</li>
       * </ul>
       */
      parsePlacement: function(placement) {
        var autoPlace = PLACEMENT_REGEX.auto.test(placement);
        if (autoPlace) {
          placement = placement.replace(PLACEMENT_REGEX.auto, '');
        }

        placement = placement.split('-');

        placement[0] = placement[0] || 'top';
        if (!PLACEMENT_REGEX.primary.test(placement[0])) {
          placement[0] = 'top';
        }

        placement[1] = placement[1] || 'center';
        if (!PLACEMENT_REGEX.secondary.test(placement[1])) {
          placement[1] = 'center';
        }

        if (autoPlace) {
          placement[2] = true;
        } else {
          placement[2] = false;
        }

        return placement;
      },

      /**
       * Provides coordinates for an element to be positioned relative to
       * another element.  Passing 'auto' as part of the placement parameter
       * will enable smart placement - where the element fits. i.e:
       * 'auto left-top' will check to see if there is enough space to the left
       * of the hostElem to fit the targetElem, if not place right (same for secondary
       * top placement).  Available space is calculated using the viewportOffset
       * function.
       *
       * @param {element} hostElem - The element to position against.
       * @param {element} targetElem - The element to position.
       * @param {string=} [placement=top] - The placement for the targetElem,
       *   default is 'top'. 'center' is assumed as secondary placement for
       *   'top', 'left', 'right', and 'bottom' placements.  Available placements are:
       *   <ul>
       *     <li>top</li>
       *     <li>top-right</li>
       *     <li>top-left</li>
       *     <li>bottom</li>
       *     <li>bottom-left</li>
       *     <li>bottom-right</li>
       *     <li>left</li>
       *     <li>left-top</li>
       *     <li>left-bottom</li>
       *     <li>right</li>
       *     <li>right-top</li>
       *     <li>right-bottom</li>
       *   </ul>
       * @param {boolean=} [appendToBody=false] - Should the top and left values returned
       *   be calculated from the body element, default is false.
       *
       * @returns {object} An object with the following properties:
       *   <ul>
       *     <li>**top**: Value for targetElem top.</li>
       *     <li>**left**: Value for targetElem left.</li>
       *     <li>**placement**: The resolved placement.</li>
       *   </ul>
       */
      positionElements: function(hostElem, targetElem, placement, appendToBody) {
        hostElem = this.getRawNode(hostElem);
        targetElem = this.getRawNode(targetElem);

        // need to read from prop to support tests.
        var targetWidth = angular.isDefined(targetElem.offsetWidth) ? targetElem.offsetWidth : targetElem.prop('offsetWidth');
        var targetHeight = angular.isDefined(targetElem.offsetHeight) ? targetElem.offsetHeight : targetElem.prop('offsetHeight');

        placement = this.parsePlacement(placement);

        var hostElemPos = appendToBody ? this.offset(hostElem) : this.position(hostElem);
        var targetElemPos = {top: 0, left: 0, placement: ''};

        if (placement[2]) {
          var viewportOffset = this.viewportOffset(hostElem, appendToBody);

          var targetElemStyle = $window.getComputedStyle(targetElem);
          var adjustedSize = {
            width: targetWidth + Math.round(Math.abs(this.parseStyle(targetElemStyle.marginLeft) + this.parseStyle(targetElemStyle.marginRight))),
            height: targetHeight + Math.round(Math.abs(this.parseStyle(targetElemStyle.marginTop) + this.parseStyle(targetElemStyle.marginBottom)))
          };

          placement[0] = placement[0] === 'top' && adjustedSize.height > viewportOffset.top && adjustedSize.height <= viewportOffset.bottom ? 'bottom' :
                         placement[0] === 'bottom' && adjustedSize.height > viewportOffset.bottom && adjustedSize.height <= viewportOffset.top ? 'top' :
                         placement[0] === 'left' && adjustedSize.width > viewportOffset.left && adjustedSize.width <= viewportOffset.right ? 'right' :
                         placement[0] === 'right' && adjustedSize.width > viewportOffset.right && adjustedSize.width <= viewportOffset.left ? 'left' :
                         placement[0];

          placement[1] = placement[1] === 'top' && adjustedSize.height - hostElemPos.height > viewportOffset.bottom && adjustedSize.height - hostElemPos.height <= viewportOffset.top ? 'bottom' :
                         placement[1] === 'bottom' && adjustedSize.height - hostElemPos.height > viewportOffset.top && adjustedSize.height - hostElemPos.height <= viewportOffset.bottom ? 'top' :
                         placement[1] === 'left' && adjustedSize.width - hostElemPos.width > viewportOffset.right && adjustedSize.width - hostElemPos.width <= viewportOffset.left ? 'right' :
                         placement[1] === 'right' && adjustedSize.width - hostElemPos.width > viewportOffset.left && adjustedSize.width - hostElemPos.width <= viewportOffset.right ? 'left' :
                         placement[1];

          if (placement[1] === 'center') {
            if (PLACEMENT_REGEX.vertical.test(placement[0])) {
              var xOverflow = hostElemPos.width / 2 - targetWidth / 2;
              if (viewportOffset.left + xOverflow < 0 && adjustedSize.width - hostElemPos.width <= viewportOffset.right) {
                placement[1] = 'left';
              } else if (viewportOffset.right + xOverflow < 0 && adjustedSize.width - hostElemPos.width <= viewportOffset.left) {
                placement[1] = 'right';
              }
            } else {
              var yOverflow = hostElemPos.height / 2 - adjustedSize.height / 2;
              if (viewportOffset.top + yOverflow < 0 && adjustedSize.height - hostElemPos.height <= viewportOffset.bottom) {
                placement[1] = 'top';
              } else if (viewportOffset.bottom + yOverflow < 0 && adjustedSize.height - hostElemPos.height <= viewportOffset.top) {
                placement[1] = 'bottom';
              }
            }
          }
        }

        switch (placement[0]) {
          case 'top':
            targetElemPos.top = hostElemPos.top - targetHeight;
            break;
          case 'bottom':
            targetElemPos.top = hostElemPos.top + hostElemPos.height;
            break;
          case 'left':
            targetElemPos.left = hostElemPos.left - targetWidth;
            break;
          case 'right':
            targetElemPos.left = hostElemPos.left + hostElemPos.width;
            break;
        }

        switch (placement[1]) {
          case 'top':
            targetElemPos.top = hostElemPos.top;
            break;
          case 'bottom':
            targetElemPos.top = hostElemPos.top + hostElemPos.height - targetHeight;
            break;
          case 'left':
            targetElemPos.left = hostElemPos.left;
            break;
          case 'right':
            targetElemPos.left = hostElemPos.left + hostElemPos.width - targetWidth;
            break;
          case 'center':
            if (PLACEMENT_REGEX.vertical.test(placement[0])) {
              targetElemPos.left = hostElemPos.left + hostElemPos.width / 2 - targetWidth / 2;
            } else {
              targetElemPos.top = hostElemPos.top + hostElemPos.height / 2 - targetHeight / 2;
            }
            break;
        }

        targetElemPos.top = Math.round(targetElemPos.top);
        targetElemPos.left = Math.round(targetElemPos.left);
        targetElemPos.placement = placement[1] === 'center' ? placement[0] : placement[0] + '-' + placement[1];

        return targetElemPos;
      },

      /**
       * Provides a way to adjust the top positioning after first
       * render to correctly align element to top after content
       * rendering causes resized element height
       *
       * @param {array} placementClasses - The array of strings of classes
       * element should have.
       * @param {object} containerPosition - The object with container
       * position information
       * @param {number} initialHeight - The initial height for the elem.
       * @param {number} currentHeight - The current height for the elem.
       */
      adjustTop: function(placementClasses, containerPosition, initialHeight, currentHeight) {
        if (placementClasses.indexOf('top') !== -1 && initialHeight !== currentHeight) {
          return {
            top: containerPosition.top - currentHeight + 'px'
          };
        }
      },

      /**
       * Provides a way for positioning tooltip & dropdown
       * arrows when using placement options beyond the standard
       * left, right, top, or bottom.
       *
       * @param {element} elem - The tooltip/dropdown element.
       * @param {string} placement - The placement for the elem.
       */
      positionArrow: function(elem, placement) {
        elem = this.getRawNode(elem);

        var innerElem = elem.querySelector('.tooltip-inner, .popover-inner');
        if (!innerElem) {
          return;
        }

        var isTooltip = angular.element(innerElem).hasClass('tooltip-inner');

        var arrowElem = isTooltip ? elem.querySelector('.tooltip-arrow') : elem.querySelector('.arrow');
        if (!arrowElem) {
          return;
        }

        var arrowCss = {
          top: '',
          bottom: '',
          left: '',
          right: ''
        };

        placement = this.parsePlacement(placement);
        if (placement[1] === 'center') {
          // no adjustment necessary - just reset styles
          angular.element(arrowElem).css(arrowCss);
          return;
        }

        var borderProp = 'border-' + placement[0] + '-width';
        var borderWidth = $window.getComputedStyle(arrowElem)[borderProp];

        var borderRadiusProp = 'border-';
        if (PLACEMENT_REGEX.vertical.test(placement[0])) {
          borderRadiusProp += placement[0] + '-' + placement[1];
        } else {
          borderRadiusProp += placement[1] + '-' + placement[0];
        }
        borderRadiusProp += '-radius';
        var borderRadius = $window.getComputedStyle(isTooltip ? innerElem : elem)[borderRadiusProp];

        switch (placement[0]) {
          case 'top':
            arrowCss.bottom = isTooltip ? '0' : '-' + borderWidth;
            break;
          case 'bottom':
            arrowCss.top = isTooltip ? '0' : '-' + borderWidth;
            break;
          case 'left':
            arrowCss.right = isTooltip ? '0' : '-' + borderWidth;
            break;
          case 'right':
            arrowCss.left = isTooltip ? '0' : '-' + borderWidth;
            break;
        }

        arrowCss[placement[1]] = borderRadius;

        angular.element(arrowElem).css(arrowCss);
      }
    };
  }]);

angular.module('ui.bootstrap.datepickerPopup', ['ui.bootstrap.datepicker', 'ui.bootstrap.position'])

.value('$datepickerPopupLiteralWarning', true)

.constant('uibDatepickerPopupConfig', {
  altInputFormats: [],
  appendToBody: false,
  clearText: 'Clear',
  closeOnDateSelection: true,
  closeText: 'Done',
  currentText: 'Today',
  datepickerPopup: 'yyyy-MM-dd',
  datepickerPopupTemplateUrl: 'uib/template/datepickerPopup/popup.html',
  datepickerTemplateUrl: 'uib/template/datepicker/datepicker.html',
  html5Types: {
    date: 'yyyy-MM-dd',
    'datetime-local': 'yyyy-MM-ddTHH:mm:ss.sss',
    'month': 'yyyy-MM'
  },
  onOpenFocus: true,
  showButtonBar: true,
  placement: 'auto bottom-left'
})

.controller('UibDatepickerPopupController', ['$scope', '$element', '$attrs', '$compile', '$log', '$parse', '$window', '$document', '$rootScope', '$uibPosition', 'dateFilter', 'uibDateParser', 'uibDatepickerPopupConfig', '$timeout', 'uibDatepickerConfig', '$datepickerPopupLiteralWarning',
function($scope, $element, $attrs, $compile, $log, $parse, $window, $document, $rootScope, $position, dateFilter, dateParser, datepickerPopupConfig, $timeout, datepickerConfig, $datepickerPopupLiteralWarning) {
  var cache = {},
    isHtml5DateInput = false;
  var dateFormat, closeOnDateSelection, appendToBody, onOpenFocus,
    datepickerPopupTemplateUrl, datepickerTemplateUrl, popupEl, datepickerEl, scrollParentEl,
    ngModel, ngModelOptions, $popup, altInputFormats, watchListeners = [];

  this.init = function(_ngModel_) {
    ngModel = _ngModel_;
    ngModelOptions = extractOptions(ngModel);
    closeOnDateSelection = angular.isDefined($attrs.closeOnDateSelection) ?
      $scope.$parent.$eval($attrs.closeOnDateSelection) :
      datepickerPopupConfig.closeOnDateSelection;
    appendToBody = angular.isDefined($attrs.datepickerAppendToBody) ?
      $scope.$parent.$eval($attrs.datepickerAppendToBody) :
      datepickerPopupConfig.appendToBody;
    onOpenFocus = angular.isDefined($attrs.onOpenFocus) ?
      $scope.$parent.$eval($attrs.onOpenFocus) : datepickerPopupConfig.onOpenFocus;
    datepickerPopupTemplateUrl = angular.isDefined($attrs.datepickerPopupTemplateUrl) ?
      $attrs.datepickerPopupTemplateUrl :
      datepickerPopupConfig.datepickerPopupTemplateUrl;
    datepickerTemplateUrl = angular.isDefined($attrs.datepickerTemplateUrl) ?
      $attrs.datepickerTemplateUrl : datepickerPopupConfig.datepickerTemplateUrl;
    altInputFormats = angular.isDefined($attrs.altInputFormats) ?
      $scope.$parent.$eval($attrs.altInputFormats) :
      datepickerPopupConfig.altInputFormats;

    $scope.showButtonBar = angular.isDefined($attrs.showButtonBar) ?
      $scope.$parent.$eval($attrs.showButtonBar) :
      datepickerPopupConfig.showButtonBar;

    if (datepickerPopupConfig.html5Types[$attrs.type]) {
      dateFormat = datepickerPopupConfig.html5Types[$attrs.type];
      isHtml5DateInput = true;
    } else {
      dateFormat = $attrs.uibDatepickerPopup || datepickerPopupConfig.datepickerPopup;
      $attrs.$observe('uibDatepickerPopup', function(value, oldValue) {
        var newDateFormat = value || datepickerPopupConfig.datepickerPopup;
        // Invalidate the $modelValue to ensure that formatters re-run
        // FIXME: Refactor when PR is merged: https://github.com/angular/angular.js/pull/10764
        if (newDateFormat !== dateFormat) {
          dateFormat = newDateFormat;
          ngModel.$modelValue = null;

          if (!dateFormat) {
            throw new Error('uibDatepickerPopup must have a date format specified.');
          }
        }
      });
    }

    if (!dateFormat) {
      throw new Error('uibDatepickerPopup must have a date format specified.');
    }

    if (isHtml5DateInput && $attrs.uibDatepickerPopup) {
      throw new Error('HTML5 date input types do not support custom formats.');
    }

    // popup element used to display calendar
    popupEl = angular.element('<div uib-datepicker-popup-wrap><div uib-datepicker></div></div>');

    popupEl.attr({
      'ng-model': 'date',
      'ng-change': 'dateSelection(date)',
      'template-url': datepickerPopupTemplateUrl
    });

    // datepicker element
    datepickerEl = angular.element(popupEl.children()[0]);
    datepickerEl.attr('template-url', datepickerTemplateUrl);

    if (!$scope.datepickerOptions) {
      $scope.datepickerOptions = {};
    }

    if (isHtml5DateInput) {
      if ($attrs.type === 'month') {
        $scope.datepickerOptions.datepickerMode = 'month';
        $scope.datepickerOptions.minMode = 'month';
      }
    }

    datepickerEl.attr('datepicker-options', 'datepickerOptions');

    if (!isHtml5DateInput) {
      // Internal API to maintain the correct ng-invalid-[key] class
      ngModel.$$parserName = 'date';
      ngModel.$validators.date = validator;
      ngModel.$parsers.unshift(parseDate);
      ngModel.$formatters.push(function(value) {
        if (ngModel.$isEmpty(value)) {
          $scope.date = value;
          return value;
        }

        if (angular.isNumber(value)) {
          value = new Date(value);
        }

        $scope.date = dateParser.fromTimezone(value, ngModelOptions.getOption('timezone'));

        return dateParser.filter($scope.date, dateFormat);
      });
    } else {
      ngModel.$formatters.push(function(value) {
        $scope.date = dateParser.fromTimezone(value, ngModelOptions.getOption('timezone'));
        return value;
      });
    }

    // Detect changes in the view from the text box
    ngModel.$viewChangeListeners.push(function() {
      $scope.date = parseDateString(ngModel.$viewValue);
    });

    $element.on('keydown', inputKeydownBind);

    $popup = $compile(popupEl)($scope);
    // Prevent jQuery cache memory leak (template is now redundant after linking)
    popupEl.remove();

    if (appendToBody) {
      $document.find('body').append($popup);
    } else {
      $element.after($popup);
    }

    $scope.$on('$destroy', function() {
      if ($scope.isOpen === true) {
        if (!$rootScope.$$phase) {
          $scope.$apply(function() {
            $scope.isOpen = false;
          });
        }
      }

      $popup.remove();
      $element.off('keydown', inputKeydownBind);
      $document.off('click', documentClickBind);
      if (scrollParentEl) {
        scrollParentEl.off('scroll', positionPopup);
      }
      angular.element($window).off('resize', positionPopup);

      //Clear all watch listeners on destroy
      while (watchListeners.length) {
        watchListeners.shift()();
      }
    });
  };

  $scope.getText = function(key) {
    return $scope[key + 'Text'] || datepickerPopupConfig[key + 'Text'];
  };

  $scope.isDisabled = function(date) {
    if (date === 'today') {
      date = dateParser.fromTimezone(new Date(), ngModelOptions.getOption('timezone'));
    }

    var dates = {};
    angular.forEach(['minDate', 'maxDate'], function(key) {
      if (!$scope.datepickerOptions[key]) {
        dates[key] = null;
      } else if (angular.isDate($scope.datepickerOptions[key])) {
        dates[key] = new Date($scope.datepickerOptions[key]);
      } else {
        if ($datepickerPopupLiteralWarning) {
          $log.warn('Literal date support has been deprecated, please switch to date object usage');
        }

        dates[key] = new Date(dateFilter($scope.datepickerOptions[key], 'medium'));
      }
    });

    return $scope.datepickerOptions &&
      dates.minDate && $scope.compare(date, dates.minDate) < 0 ||
      dates.maxDate && $scope.compare(date, dates.maxDate) > 0;
  };

  $scope.compare = function(date1, date2) {
    return new Date(date1.getFullYear(), date1.getMonth(), date1.getDate()) - new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
  };

  // Inner change
  $scope.dateSelection = function(dt) {
    $scope.date = dt;
    var date = $scope.date ? dateParser.filter($scope.date, dateFormat) : null; // Setting to NULL is necessary for form validators to function
    $element.val(date);
    ngModel.$setViewValue(date);

    if (closeOnDateSelection) {
      $scope.isOpen = false;
      $element[0].focus();
    }
  };

  $scope.keydown = function(evt) {
    if (evt.which === 27) {
      evt.stopPropagation();
      $scope.isOpen = false;
      $element[0].focus();
    }
  };

  $scope.select = function(date, evt) {
    evt.stopPropagation();

    if (date === 'today') {
      var today = new Date();
      if (angular.isDate($scope.date)) {
        date = new Date($scope.date);
        date.setFullYear(today.getFullYear(), today.getMonth(), today.getDate());
      } else {
        date = dateParser.fromTimezone(today, ngModelOptions.getOption('timezone'));
        date.setHours(0, 0, 0, 0);
      }
    }
    $scope.dateSelection(date);
  };

  $scope.close = function(evt) {
    evt.stopPropagation();

    $scope.isOpen = false;
    $element[0].focus();
  };

  $scope.disabled = angular.isDefined($attrs.disabled) || false;
  if ($attrs.ngDisabled) {
    watchListeners.push($scope.$parent.$watch($parse($attrs.ngDisabled), function(disabled) {
      $scope.disabled = disabled;
    }));
  }

  $scope.$watch('isOpen', function(value) {
    if (value) {
      if (!$scope.disabled) {
        $timeout(function() {
          positionPopup();

          if (onOpenFocus) {
            $scope.$broadcast('uib:datepicker.focus');
          }

          $document.on('click', documentClickBind);

          var placement = $attrs.popupPlacement ? $attrs.popupPlacement : datepickerPopupConfig.placement;
          if (appendToBody || $position.parsePlacement(placement)[2]) {
            scrollParentEl = scrollParentEl || angular.element($position.scrollParent($element));
            if (scrollParentEl) {
              scrollParentEl.on('scroll', positionPopup);
            }
          } else {
            scrollParentEl = null;
          }

          angular.element($window).on('resize', positionPopup);
        }, 0, false);
      } else {
        $scope.isOpen = false;
      }
    } else {
      $document.off('click', documentClickBind);
      if (scrollParentEl) {
        scrollParentEl.off('scroll', positionPopup);
      }
      angular.element($window).off('resize', positionPopup);
    }
  });

  function cameltoDash(string) {
    return string.replace(/([A-Z])/g, function($1) { return '-' + $1.toLowerCase(); });
  }

  function parseDateString(viewValue) {
    var date = dateParser.parse(viewValue, dateFormat, $scope.date);
    if (isNaN(date)) {
      for (var i = 0; i < altInputFormats.length; i++) {
        date = dateParser.parse(viewValue, altInputFormats[i], $scope.date);
        if (!isNaN(date)) {
          return date;
        }
      }
    }
    return date;
  }

  function parseDate(viewValue) {
    if (angular.isNumber(viewValue)) {
      // presumably timestamp to date object
      viewValue = new Date(viewValue);
    }

    if (!viewValue) {
      return null;
    }

    if (angular.isDate(viewValue) && !isNaN(viewValue)) {
      return viewValue;
    }

    if (angular.isString(viewValue)) {
      var date = parseDateString(viewValue);
      if (!isNaN(date)) {
        return dateParser.toTimezone(date, ngModelOptions.getOption('timezone'));
      }
    }

    return ngModelOptions.getOption('allowInvalid') ? viewValue : undefined;
  }

  function validator(modelValue, viewValue) {
    var value = modelValue || viewValue;

    if (!$attrs.ngRequired && !value) {
      return true;
    }

    if (angular.isNumber(value)) {
      value = new Date(value);
    }

    if (!value) {
      return true;
    }

    if (angular.isDate(value) && !isNaN(value)) {
      return true;
    }

    if (angular.isString(value)) {
      return !isNaN(parseDateString(value));
    }

    return false;
  }

  function documentClickBind(event) {
    if (!$scope.isOpen && $scope.disabled) {
      return;
    }

    var popup = $popup[0];
    var dpContainsTarget = $element[0].contains(event.target);
    // The popup node may not be an element node
    // In some browsers (IE) only element nodes have the 'contains' function
    var popupContainsTarget = popup.contains !== undefined && popup.contains(event.target);
    if ($scope.isOpen && !(dpContainsTarget || popupContainsTarget)) {
      $scope.$apply(function() {
        $scope.isOpen = false;
      });
    }
  }

  function inputKeydownBind(evt) {
    if (evt.which === 27 && $scope.isOpen) {
      evt.preventDefault();
      evt.stopPropagation();
      $scope.$apply(function() {
        $scope.isOpen = false;
      });
      $element[0].focus();
    } else if (evt.which === 40 && !$scope.isOpen) {
      evt.preventDefault();
      evt.stopPropagation();
      $scope.$apply(function() {
        $scope.isOpen = true;
      });
    }
  }

  function positionPopup() {
    if ($scope.isOpen) {
      var dpElement = angular.element($popup[0].querySelector('.uib-datepicker-popup'));
      var placement = $attrs.popupPlacement ? $attrs.popupPlacement : datepickerPopupConfig.placement;
      var position = $position.positionElements($element, dpElement, placement, appendToBody);
      dpElement.css({top: position.top + 'px', left: position.left + 'px'});
      if (dpElement.hasClass('uib-position-measure')) {
        dpElement.removeClass('uib-position-measure');
      }
    }
  }

  function extractOptions(ngModelCtrl) {
    var ngModelOptions;

    if (angular.version.minor < 6) { // in angular < 1.6 $options could be missing
      // guarantee a value
      ngModelOptions = angular.isObject(ngModelCtrl.$options) ?
        ngModelCtrl.$options :
        {
          timezone: null
        };

      // mimic 1.6+ api
      ngModelOptions.getOption = function (key) {
        return ngModelOptions[key];
      };
    } else { // in angular >=1.6 $options is always present
      ngModelOptions = ngModelCtrl.$options;
    }

    return ngModelOptions;
  }

  $scope.$on('uib:datepicker.mode', function() {
    $timeout(positionPopup, 0, false);
  });
}])

.directive('uibDatepickerPopup', function() {
  return {
    require: ['ngModel', 'uibDatepickerPopup'],
    controller: 'UibDatepickerPopupController',
    scope: {
      datepickerOptions: '=?',
      isOpen: '=?',
      currentText: '@',
      clearText: '@',
      closeText: '@'
    },
    link: function(scope, element, attrs, ctrls) {
      var ngModel = ctrls[0],
        ctrl = ctrls[1];

      ctrl.init(ngModel);
    }
  };
})

.directive('uibDatepickerPopupWrap', function() {
  return {
    restrict: 'A',
    transclude: true,
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'uib/template/datepickerPopup/popup.html';
    }
  };
});

angular.module('ui.bootstrap.debounce', [])
/**
 * A helper, internal service that debounces a function
 */
  .factory('$$debounce', ['$timeout', function($timeout) {
    return function(callback, debounceTime) {
      var timeoutPromise;

      return function() {
        var self = this;
        var args = Array.prototype.slice.call(arguments);
        if (timeoutPromise) {
          $timeout.cancel(timeoutPromise);
        }

        timeoutPromise = $timeout(function() {
          callback.apply(self, args);
        }, debounceTime);
      };
    };
  }]);

angular.module('ui.bootstrap.multiMap', [])
/**
 * A helper, internal data structure that stores all references attached to key
 */
  .factory('$$multiMap', function() {
    return {
      createNew: function() {
        var map = {};

        return {
          entries: function() {
            return Object.keys(map).map(function(key) {
              return {
                key: key,
                value: map[key]
              };
            });
          },
          get: function(key) {
            return map[key];
          },
          hasKey: function(key) {
            return !!map[key];
          },
          keys: function() {
            return Object.keys(map);
          },
          put: function(key, value) {
            if (!map[key]) {
              map[key] = [];
            }

            map[key].push(value);
          },
          remove: function(key, value) {
            var values = map[key];

            if (!values) {
              return;
            }

            var idx = values.indexOf(value);

            if (idx !== -1) {
              values.splice(idx, 1);
            }

            if (!values.length) {
              delete map[key];
            }
          }
        };
      }
    };
  });

angular.module('ui.bootstrap.dropdown', ['ui.bootstrap.multiMap', 'ui.bootstrap.position'])

.constant('uibDropdownConfig', {
  appendToOpenClass: 'uib-dropdown-open',
  openClass: 'open'
})

.service('uibDropdownService', ['$document', '$rootScope', '$$multiMap', function($document, $rootScope, $$multiMap) {
  var openScope = null;
  var openedContainers = $$multiMap.createNew();

  this.isOnlyOpen = function(dropdownScope, appendTo) {
    var openedDropdowns = openedContainers.get(appendTo);
    if (openedDropdowns) {
      var openDropdown = openedDropdowns.reduce(function(toClose, dropdown) {
        if (dropdown.scope === dropdownScope) {
          return dropdown;
        }

        return toClose;
      }, {});
      if (openDropdown) {
        return openedDropdowns.length === 1;
      }
    }

    return false;
  };

  this.open = function(dropdownScope, element, appendTo) {
    if (!openScope) {
      $document.on('click', closeDropdown);
    }

    if (openScope && openScope !== dropdownScope) {
      openScope.isOpen = false;
    }

    openScope = dropdownScope;

    if (!appendTo) {
      return;
    }

    var openedDropdowns = openedContainers.get(appendTo);
    if (openedDropdowns) {
      var openedScopes = openedDropdowns.map(function(dropdown) {
        return dropdown.scope;
      });
      if (openedScopes.indexOf(dropdownScope) === -1) {
        openedContainers.put(appendTo, {
          scope: dropdownScope
        });
      }
    } else {
      openedContainers.put(appendTo, {
        scope: dropdownScope
      });
    }
  };

  this.close = function(dropdownScope, element, appendTo) {
    if (openScope === dropdownScope) {
      $document.off('click', closeDropdown);
      $document.off('keydown', this.keybindFilter);
      openScope = null;
    }

    if (!appendTo) {
      return;
    }

    var openedDropdowns = openedContainers.get(appendTo);
    if (openedDropdowns) {
      var dropdownToClose = openedDropdowns.reduce(function(toClose, dropdown) {
        if (dropdown.scope === dropdownScope) {
          return dropdown;
        }

        return toClose;
      }, {});
      if (dropdownToClose) {
        openedContainers.remove(appendTo, dropdownToClose);
      }
    }
  };

  var closeDropdown = function(evt) {
    // This method may still be called during the same mouse event that
    // unbound this event handler. So check openScope before proceeding.
    if (!openScope || !openScope.isOpen) { return; }

    if (evt && openScope.getAutoClose() === 'disabled') { return; }

    if (evt && evt.which === 3) { return; }

    var toggleElement = openScope.getToggleElement();
    if (evt && toggleElement && toggleElement[0].contains(evt.target)) {
      return;
    }

    var dropdownElement = openScope.getDropdownElement();
    if (evt && openScope.getAutoClose() === 'outsideClick' &&
      dropdownElement && dropdownElement[0].contains(evt.target)) {
      return;
    }

    openScope.focusToggleElement();
    openScope.isOpen = false;

    if (!$rootScope.$$phase) {
      openScope.$apply();
    }
  };

  this.keybindFilter = function(evt) {
    if (!openScope) {
      // see this.close as ESC could have been pressed which kills the scope so we can not proceed
      return;
    }

    var dropdownElement = openScope.getDropdownElement();
    var toggleElement = openScope.getToggleElement();
    var dropdownElementTargeted = dropdownElement && dropdownElement[0].contains(evt.target);
    var toggleElementTargeted = toggleElement && toggleElement[0].contains(evt.target);
    if (evt.which === 27) {
      evt.stopPropagation();
      openScope.focusToggleElement();
      closeDropdown();
    } else if (openScope.isKeynavEnabled() && [38, 40].indexOf(evt.which) !== -1 && openScope.isOpen && (dropdownElementTargeted || toggleElementTargeted)) {
      evt.preventDefault();
      evt.stopPropagation();
      openScope.focusDropdownEntry(evt.which);
    }
  };
}])

.controller('UibDropdownController', ['$scope', '$element', '$attrs', '$parse', 'uibDropdownConfig', 'uibDropdownService', '$animate', '$uibPosition', '$document', '$compile', '$templateRequest', function($scope, $element, $attrs, $parse, dropdownConfig, uibDropdownService, $animate, $position, $document, $compile, $templateRequest) {
  var self = this,
    scope = $scope.$new(), // create a child scope so we are not polluting original one
    templateScope,
    appendToOpenClass = dropdownConfig.appendToOpenClass,
    openClass = dropdownConfig.openClass,
    getIsOpen,
    setIsOpen = angular.noop,
    toggleInvoker = $attrs.onToggle ? $parse($attrs.onToggle) : angular.noop,
    keynavEnabled = false,
    selectedOption = null,
    body = $document.find('body');

  $element.addClass('dropdown');

  this.init = function() {
    if ($attrs.isOpen) {
      getIsOpen = $parse($attrs.isOpen);
      setIsOpen = getIsOpen.assign;

      $scope.$watch(getIsOpen, function(value) {
        scope.isOpen = !!value;
      });
    }

    keynavEnabled = angular.isDefined($attrs.keyboardNav);
  };

  this.toggle = function(open) {
    scope.isOpen = arguments.length ? !!open : !scope.isOpen;
    if (angular.isFunction(setIsOpen)) {
      setIsOpen(scope, scope.isOpen);
    }

    return scope.isOpen;
  };

  // Allow other directives to watch status
  this.isOpen = function() {
    return scope.isOpen;
  };

  scope.getToggleElement = function() {
    return self.toggleElement;
  };

  scope.getAutoClose = function() {
    return $attrs.autoClose || 'always'; //or 'outsideClick' or 'disabled'
  };

  scope.getElement = function() {
    return $element;
  };

  scope.isKeynavEnabled = function() {
    return keynavEnabled;
  };

  scope.focusDropdownEntry = function(keyCode) {
    var elems = self.dropdownMenu ? //If append to body is used.
      angular.element(self.dropdownMenu).find('a') :
      $element.find('ul').eq(0).find('a');

    switch (keyCode) {
      case 40: {
        if (!angular.isNumber(self.selectedOption)) {
          self.selectedOption = 0;
        } else {
          self.selectedOption = self.selectedOption === elems.length - 1 ?
            self.selectedOption :
            self.selectedOption + 1;
        }
        break;
      }
      case 38: {
        if (!angular.isNumber(self.selectedOption)) {
          self.selectedOption = elems.length - 1;
        } else {
          self.selectedOption = self.selectedOption === 0 ?
            0 : self.selectedOption - 1;
        }
        break;
      }
    }
    elems[self.selectedOption].focus();
  };

  scope.getDropdownElement = function() {
    return self.dropdownMenu;
  };

  scope.focusToggleElement = function() {
    if (self.toggleElement) {
      self.toggleElement[0].focus();
    }
  };

  function removeDropdownMenu() {
    $element.append(self.dropdownMenu);
  }

  scope.$watch('isOpen', function(isOpen, wasOpen) {
    var appendTo = null,
      appendToBody = false;

    if (angular.isDefined($attrs.dropdownAppendTo)) {
      var appendToEl = $parse($attrs.dropdownAppendTo)(scope);
      if (appendToEl) {
        appendTo = angular.element(appendToEl);
      }
    }

    if (angular.isDefined($attrs.dropdownAppendToBody)) {
      var appendToBodyValue = $parse($attrs.dropdownAppendToBody)(scope);
      if (appendToBodyValue !== false) {
        appendToBody = true;
      }
    }

    if (appendToBody && !appendTo) {
      appendTo = body;
    }

    if (appendTo && self.dropdownMenu) {
      if (isOpen) {
        appendTo.append(self.dropdownMenu);
        $element.on('$destroy', removeDropdownMenu);
      } else {
        $element.off('$destroy', removeDropdownMenu);
        removeDropdownMenu();
      }
    }

    if (appendTo && self.dropdownMenu) {
      var pos = $position.positionElements($element, self.dropdownMenu, 'bottom-left', true),
        css,
        rightalign,
        scrollbarPadding,
        scrollbarWidth = 0;

      css = {
        top: pos.top + 'px',
        display: isOpen ? 'block' : 'none'
      };

      rightalign = self.dropdownMenu.hasClass('dropdown-menu-right');
      if (!rightalign) {
        css.left = pos.left + 'px';
        css.right = 'auto';
      } else {
        css.left = 'auto';
        scrollbarPadding = $position.scrollbarPadding(appendTo);

        if (scrollbarPadding.heightOverflow && scrollbarPadding.scrollbarWidth) {
          scrollbarWidth = scrollbarPadding.scrollbarWidth;
        }

        css.right = window.innerWidth - scrollbarWidth -
          (pos.left + $element.prop('offsetWidth')) + 'px';
      }

      // Need to adjust our positioning to be relative to the appendTo container
      // if it's not the body element
      if (!appendToBody) {
        var appendOffset = $position.offset(appendTo);

        css.top = pos.top - appendOffset.top + 'px';

        if (!rightalign) {
          css.left = pos.left - appendOffset.left + 'px';
        } else {
          css.right = window.innerWidth -
            (pos.left - appendOffset.left + $element.prop('offsetWidth')) + 'px';
        }
      }

      self.dropdownMenu.css(css);
    }

    var openContainer = appendTo ? appendTo : $element;
    var dropdownOpenClass = appendTo ? appendToOpenClass : openClass;
    var hasOpenClass = openContainer.hasClass(dropdownOpenClass);
    var isOnlyOpen = uibDropdownService.isOnlyOpen($scope, appendTo);

    if (hasOpenClass === !isOpen) {
      var toggleClass;
      if (appendTo) {
        toggleClass = !isOnlyOpen ? 'addClass' : 'removeClass';
      } else {
        toggleClass = isOpen ? 'addClass' : 'removeClass';
      }
      $animate[toggleClass](openContainer, dropdownOpenClass).then(function() {
        if (angular.isDefined(isOpen) && isOpen !== wasOpen) {
          toggleInvoker($scope, { open: !!isOpen });
        }
      });
    }

    if (isOpen) {
      if (self.dropdownMenuTemplateUrl) {
        $templateRequest(self.dropdownMenuTemplateUrl).then(function(tplContent) {
          templateScope = scope.$new();
          $compile(tplContent.trim())(templateScope, function(dropdownElement) {
            var newEl = dropdownElement;
            self.dropdownMenu.replaceWith(newEl);
            self.dropdownMenu = newEl;
            $document.on('keydown', uibDropdownService.keybindFilter);
          });
        });
      } else {
        $document.on('keydown', uibDropdownService.keybindFilter);
      }

      scope.focusToggleElement();
      uibDropdownService.open(scope, $element, appendTo);
    } else {
      uibDropdownService.close(scope, $element, appendTo);
      if (self.dropdownMenuTemplateUrl) {
        if (templateScope) {
          templateScope.$destroy();
        }
        var newEl = angular.element('<ul class="dropdown-menu"></ul>');
        self.dropdownMenu.replaceWith(newEl);
        self.dropdownMenu = newEl;
      }

      self.selectedOption = null;
    }

    if (angular.isFunction(setIsOpen)) {
      setIsOpen($scope, isOpen);
    }
  });
}])

.directive('uibDropdown', function() {
  return {
    controller: 'UibDropdownController',
    link: function(scope, element, attrs, dropdownCtrl) {
      dropdownCtrl.init();
    }
  };
})

.directive('uibDropdownMenu', function() {
  return {
    restrict: 'A',
    require: '?^uibDropdown',
    link: function(scope, element, attrs, dropdownCtrl) {
      if (!dropdownCtrl || angular.isDefined(attrs.dropdownNested)) {
        return;
      }

      element.addClass('dropdown-menu');

      var tplUrl = attrs.templateUrl;
      if (tplUrl) {
        dropdownCtrl.dropdownMenuTemplateUrl = tplUrl;
      }

      if (!dropdownCtrl.dropdownMenu) {
        dropdownCtrl.dropdownMenu = element;
      }
    }
  };
})

.directive('uibDropdownToggle', function() {
  return {
    require: '?^uibDropdown',
    link: function(scope, element, attrs, dropdownCtrl) {
      if (!dropdownCtrl) {
        return;
      }

      element.addClass('dropdown-toggle');

      dropdownCtrl.toggleElement = element;

      var toggleDropdown = function(event) {
        event.preventDefault();

        if (!element.hasClass('disabled') && !attrs.disabled) {
          scope.$apply(function() {
            dropdownCtrl.toggle();
          });
        }
      };

      element.on('click', toggleDropdown);

      // WAI-ARIA
      element.attr({ 'aria-haspopup': true, 'aria-expanded': false });
      scope.$watch(dropdownCtrl.isOpen, function(isOpen) {
        element.attr('aria-expanded', !!isOpen);
      });

      scope.$on('$destroy', function() {
        element.off('click', toggleDropdown);
      });
    }
  };
});

angular.module('ui.bootstrap.stackedMap', [])
/**
 * A helper, internal data structure that acts as a map but also allows getting / removing
 * elements in the LIFO order
 */
  .factory('$$stackedMap', function() {
    return {
      createNew: function() {
        var stack = [];

        return {
          add: function(key, value) {
            stack.push({
              key: key,
              value: value
            });
          },
          get: function(key) {
            for (var i = 0; i < stack.length; i++) {
              if (key === stack[i].key) {
                return stack[i];
              }
            }
          },
          keys: function() {
            var keys = [];
            for (var i = 0; i < stack.length; i++) {
              keys.push(stack[i].key);
            }
            return keys;
          },
          top: function() {
            return stack[stack.length - 1];
          },
          remove: function(key) {
            var idx = -1;
            for (var i = 0; i < stack.length; i++) {
              if (key === stack[i].key) {
                idx = i;
                break;
              }
            }
            return stack.splice(idx, 1)[0];
          },
          removeTop: function() {
            return stack.pop();
          },
          length: function() {
            return stack.length;
          }
        };
      }
    };
  });
angular.module('ui.bootstrap.modal', ['ui.bootstrap.multiMap', 'ui.bootstrap.stackedMap', 'ui.bootstrap.position'])
/**
 * Pluggable resolve mechanism for the modal resolve resolution
 * Supports UI Router's $resolve service
 */
  .provider('$uibResolve', function() {
    var resolve = this;
    this.resolver = null;

    this.setResolver = function(resolver) {
      this.resolver = resolver;
    };

    this.$get = ['$injector', '$q', function($injector, $q) {
      var resolver = resolve.resolver ? $injector.get(resolve.resolver) : null;
      return {
        resolve: function(invocables, locals, parent, self) {
          if (resolver) {
            return resolver.resolve(invocables, locals, parent, self);
          }

          var promises = [];

          angular.forEach(invocables, function(value) {
            if (angular.isFunction(value) || angular.isArray(value)) {
              promises.push($q.resolve($injector.invoke(value)));
            } else if (angular.isString(value)) {
              promises.push($q.resolve($injector.get(value)));
            } else {
              promises.push($q.resolve(value));
            }
          });

          return $q.all(promises).then(function(resolves) {
            var resolveObj = {};
            var resolveIter = 0;
            angular.forEach(invocables, function(value, key) {
              resolveObj[key] = resolves[resolveIter++];
            });

            return resolveObj;
          });
        }
      };
    }];
  })

/**
 * A helper directive for the $modal service. It creates a backdrop element.
 */
  .directive('uibModalBackdrop', ['$animate', '$injector', '$uibModalStack',
  function($animate, $injector, $modalStack) {
    return {
      restrict: 'A',
      compile: function(tElement, tAttrs) {
        tElement.addClass(tAttrs.backdropClass);
        return linkFn;
      }
    };

    function linkFn(scope, element, attrs) {
      if (attrs.modalInClass) {
        $animate.addClass(element, attrs.modalInClass);

        scope.$on($modalStack.NOW_CLOSING_EVENT, function(e, setIsAsync) {
          var done = setIsAsync();
          if (scope.modalOptions.animation) {
            $animate.removeClass(element, attrs.modalInClass).then(done);
          } else {
            done();
          }
        });
      }
    }
  }])

  .directive('uibModalWindow', ['$uibModalStack', '$q', '$animateCss', '$document',
  function($modalStack, $q, $animateCss, $document) {
    return {
      scope: {
        index: '@'
      },
      restrict: 'A',
      transclude: true,
      templateUrl: function(tElement, tAttrs) {
        return tAttrs.templateUrl || 'uib/template/modal/window.html';
      },
      link: function(scope, element, attrs) {
        element.addClass(attrs.windowTopClass || '');
        scope.size = attrs.size;

        scope.close = function(evt) {
          var modal = $modalStack.getTop();
          if (modal && modal.value.backdrop &&
            modal.value.backdrop !== 'static' &&
            evt.target === evt.currentTarget) {
            evt.preventDefault();
            evt.stopPropagation();
            $modalStack.dismiss(modal.key, 'backdrop click');
          }
        };

        // moved from template to fix issue #2280
        element.on('click', scope.close);

        // This property is only added to the scope for the purpose of detecting when this directive is rendered.
        // We can detect that by using this property in the template associated with this directive and then use
        // {@link Attribute#$observe} on it. For more details please see {@link TableColumnResize}.
        scope.$isRendered = true;

        // Deferred object that will be resolved when this modal is rendered.
        var modalRenderDeferObj = $q.defer();
        // Resolve render promise post-digest
        scope.$$postDigest(function() {
          modalRenderDeferObj.resolve();
        });

        modalRenderDeferObj.promise.then(function() {
          var animationPromise = null;

          if (attrs.modalInClass) {
            animationPromise = $animateCss(element, {
              addClass: attrs.modalInClass
            }).start();

            scope.$on($modalStack.NOW_CLOSING_EVENT, function(e, setIsAsync) {
              var done = setIsAsync();
              $animateCss(element, {
                removeClass: attrs.modalInClass
              }).start().then(done);
            });
          }


          $q.when(animationPromise).then(function() {
            // Notify {@link $modalStack} that modal is rendered.
            var modal = $modalStack.getTop();
            if (modal) {
              $modalStack.modalRendered(modal.key);
            }

            /**
             * If something within the freshly-opened modal already has focus (perhaps via a
             * directive that causes focus) then there's no need to try to focus anything.
             */
            if (!($document[0].activeElement && element[0].contains($document[0].activeElement))) {
              var inputWithAutofocus = element[0].querySelector('[autofocus]');
              /**
               * Auto-focusing of a freshly-opened modal element causes any child elements
               * with the autofocus attribute to lose focus. This is an issue on touch
               * based devices which will show and then hide the onscreen keyboard.
               * Attempts to refocus the autofocus element via JavaScript will not reopen
               * the onscreen keyboard. Fixed by updated the focusing logic to only autofocus
               * the modal element if the modal does not contain an autofocus element.
               */
              if (inputWithAutofocus) {
                inputWithAutofocus.focus();
              } else {
                element[0].focus();
              }
            }
          });
        });
      }
    };
  }])

  .directive('uibModalAnimationClass', function() {
    return {
      compile: function(tElement, tAttrs) {
        if (tAttrs.modalAnimation) {
          tElement.addClass(tAttrs.uibModalAnimationClass);
        }
      }
    };
  })

  .directive('uibModalTransclude', ['$animate', function($animate) {
    return {
      link: function(scope, element, attrs, controller, transclude) {
        transclude(scope.$parent, function(clone) {
          element.empty();
          $animate.enter(clone, element);
        });
      }
    };
  }])

  .factory('$uibModalStack', ['$animate', '$animateCss', '$document',
    '$compile', '$rootScope', '$q', '$$multiMap', '$$stackedMap', '$uibPosition',
    function($animate, $animateCss, $document, $compile, $rootScope, $q, $$multiMap, $$stackedMap, $uibPosition) {
      var OPENED_MODAL_CLASS = 'modal-open';

      var backdropDomEl, backdropScope;
      var openedWindows = $$stackedMap.createNew();
      var openedClasses = $$multiMap.createNew();
      var $modalStack = {
        NOW_CLOSING_EVENT: 'modal.stack.now-closing'
      };
      var topModalIndex = 0;
      var previousTopOpenedModal = null;
      var ARIA_HIDDEN_ATTRIBUTE_NAME = 'data-bootstrap-modal-aria-hidden-count';

      //Modal focus behavior
      var tabbableSelector = 'a[href], area[href], input:not([disabled]):not([tabindex=\'-1\']), ' +
        'button:not([disabled]):not([tabindex=\'-1\']),select:not([disabled]):not([tabindex=\'-1\']), textarea:not([disabled]):not([tabindex=\'-1\']), ' +
        'iframe, object, embed, *[tabindex]:not([tabindex=\'-1\']), *[contenteditable=true]';
      var scrollbarPadding;
      var SNAKE_CASE_REGEXP = /[A-Z]/g;

      // TODO: extract into common dependency with tooltip
      function snake_case(name) {
        var separator = '-';
        return name.replace(SNAKE_CASE_REGEXP, function(letter, pos) {
          return (pos ? separator : '') + letter.toLowerCase();
        });
      }

      function isVisible(element) {
        return !!(element.offsetWidth ||
          element.offsetHeight ||
          element.getClientRects().length);
      }

      function backdropIndex() {
        var topBackdropIndex = -1;
        var opened = openedWindows.keys();
        for (var i = 0; i < opened.length; i++) {
          if (openedWindows.get(opened[i]).value.backdrop) {
            topBackdropIndex = i;
          }
        }

        // If any backdrop exist, ensure that it's index is always
        // right below the top modal
        if (topBackdropIndex > -1 && topBackdropIndex < topModalIndex) {
          topBackdropIndex = topModalIndex;
        }
        return topBackdropIndex;
      }

      $rootScope.$watch(backdropIndex, function(newBackdropIndex) {
        if (backdropScope) {
          backdropScope.index = newBackdropIndex;
        }
      });

      function removeModalWindow(modalInstance, elementToReceiveFocus) {
        var modalWindow = openedWindows.get(modalInstance).value;
        var appendToElement = modalWindow.appendTo;

        //clean up the stack
        openedWindows.remove(modalInstance);
        previousTopOpenedModal = openedWindows.top();
        if (previousTopOpenedModal) {
          topModalIndex = parseInt(previousTopOpenedModal.value.modalDomEl.attr('index'), 10);
        }

        removeAfterAnimate(modalWindow.modalDomEl, modalWindow.modalScope, function() {
          var modalBodyClass = modalWindow.openedClass || OPENED_MODAL_CLASS;
          openedClasses.remove(modalBodyClass, modalInstance);
          var areAnyOpen = openedClasses.hasKey(modalBodyClass);
          appendToElement.toggleClass(modalBodyClass, areAnyOpen);
          if (!areAnyOpen && scrollbarPadding && scrollbarPadding.heightOverflow && scrollbarPadding.scrollbarWidth) {
            if (scrollbarPadding.originalRight) {
              appendToElement.css({paddingRight: scrollbarPadding.originalRight + 'px'});
            } else {
              appendToElement.css({paddingRight: ''});
            }
            scrollbarPadding = null;
          }
          toggleTopWindowClass(true);
        }, modalWindow.closedDeferred);
        checkRemoveBackdrop();

        //move focus to specified element if available, or else to body
        if (elementToReceiveFocus && elementToReceiveFocus.focus) {
          elementToReceiveFocus.focus();
        } else if (appendToElement.focus) {
          appendToElement.focus();
        }
      }

      // Add or remove "windowTopClass" from the top window in the stack
      function toggleTopWindowClass(toggleSwitch) {
        var modalWindow;

        if (openedWindows.length() > 0) {
          modalWindow = openedWindows.top().value;
          modalWindow.modalDomEl.toggleClass(modalWindow.windowTopClass || '', toggleSwitch);
        }
      }

      function checkRemoveBackdrop() {
        //remove backdrop if no longer needed
        if (backdropDomEl && backdropIndex() === -1) {
          var backdropScopeRef = backdropScope;
          removeAfterAnimate(backdropDomEl, backdropScope, function() {
            backdropScopeRef = null;
          });
          backdropDomEl = undefined;
          backdropScope = undefined;
        }
      }

      function removeAfterAnimate(domEl, scope, done, closedDeferred) {
        var asyncDeferred;
        var asyncPromise = null;
        var setIsAsync = function() {
          if (!asyncDeferred) {
            asyncDeferred = $q.defer();
            asyncPromise = asyncDeferred.promise;
          }

          return function asyncDone() {
            asyncDeferred.resolve();
          };
        };
        scope.$broadcast($modalStack.NOW_CLOSING_EVENT, setIsAsync);

        // Note that it's intentional that asyncPromise might be null.
        // That's when setIsAsync has not been called during the
        // NOW_CLOSING_EVENT broadcast.
        return $q.when(asyncPromise).then(afterAnimating);

        function afterAnimating() {
          if (afterAnimating.done) {
            return;
          }
          afterAnimating.done = true;

          $animate.leave(domEl).then(function() {
            if (done) {
              done();
            }

            domEl.remove();
            if (closedDeferred) {
              closedDeferred.resolve();
            }
          });

          scope.$destroy();
        }
      }

      $document.on('keydown', keydownListener);

      $rootScope.$on('$destroy', function() {
        $document.off('keydown', keydownListener);
      });

      function keydownListener(evt) {
        if (evt.isDefaultPrevented()) {
          return evt;
        }

        var modal = openedWindows.top();
        if (modal) {
          switch (evt.which) {
            case 27: {
              if (modal.value.keyboard) {
                evt.preventDefault();
                $rootScope.$apply(function() {
                  $modalStack.dismiss(modal.key, 'escape key press');
                });
              }
              break;
            }
            case 9: {
              var list = $modalStack.loadFocusElementList(modal);
              var focusChanged = false;
              if (evt.shiftKey) {
                if ($modalStack.isFocusInFirstItem(evt, list) || $modalStack.isModalFocused(evt, modal)) {
                  focusChanged = $modalStack.focusLastFocusableElement(list);
                }
              } else {
                if ($modalStack.isFocusInLastItem(evt, list)) {
                  focusChanged = $modalStack.focusFirstFocusableElement(list);
                }
              }

              if (focusChanged) {
                evt.preventDefault();
                evt.stopPropagation();
              }

              break;
            }
          }
        }
      }

      $modalStack.open = function(modalInstance, modal) {
        var modalOpener = $document[0].activeElement,
          modalBodyClass = modal.openedClass || OPENED_MODAL_CLASS;

        toggleTopWindowClass(false);

        // Store the current top first, to determine what index we ought to use
        // for the current top modal
        previousTopOpenedModal = openedWindows.top();

        openedWindows.add(modalInstance, {
          deferred: modal.deferred,
          renderDeferred: modal.renderDeferred,
          closedDeferred: modal.closedDeferred,
          modalScope: modal.scope,
          backdrop: modal.backdrop,
          keyboard: modal.keyboard,
          openedClass: modal.openedClass,
          windowTopClass: modal.windowTopClass,
          animation: modal.animation,
          appendTo: modal.appendTo
        });

        openedClasses.put(modalBodyClass, modalInstance);

        var appendToElement = modal.appendTo,
            currBackdropIndex = backdropIndex();

        if (currBackdropIndex >= 0 && !backdropDomEl) {
          backdropScope = $rootScope.$new(true);
          backdropScope.modalOptions = modal;
          backdropScope.index = currBackdropIndex;
          backdropDomEl = angular.element('<div uib-modal-backdrop="modal-backdrop"></div>');
          backdropDomEl.attr({
            'class': 'modal-backdrop',
            'ng-style': '{\'z-index\': 1040 + (index && 1 || 0) + index*10}',
            'uib-modal-animation-class': 'fade',
            'modal-in-class': 'in'
          });
          if (modal.backdropClass) {
            backdropDomEl.addClass(modal.backdropClass);
          }

          if (modal.animation) {
            backdropDomEl.attr('modal-animation', 'true');
          }
          $compile(backdropDomEl)(backdropScope);
          $animate.enter(backdropDomEl, appendToElement);
          if ($uibPosition.isScrollable(appendToElement)) {
            scrollbarPadding = $uibPosition.scrollbarPadding(appendToElement);
            if (scrollbarPadding.heightOverflow && scrollbarPadding.scrollbarWidth) {
              appendToElement.css({paddingRight: scrollbarPadding.right + 'px'});
            }
          }
        }

        var content;
        if (modal.component) {
          content = document.createElement(snake_case(modal.component.name));
          content = angular.element(content);
          content.attr({
            resolve: '$resolve',
            'modal-instance': '$uibModalInstance',
            close: '$close($value)',
            dismiss: '$dismiss($value)'
          });
        } else {
          content = modal.content;
        }

        // Set the top modal index based on the index of the previous top modal
        topModalIndex = previousTopOpenedModal ? parseInt(previousTopOpenedModal.value.modalDomEl.attr('index'), 10) + 1 : 0;
        var angularDomEl = angular.element('<div uib-modal-window="modal-window"></div>');
        angularDomEl.attr({
          'class': 'modal',
          'template-url': modal.windowTemplateUrl,
          'window-top-class': modal.windowTopClass,
          'role': 'dialog',
          'aria-labelledby': modal.ariaLabelledBy,
          'aria-describedby': modal.ariaDescribedBy,
          'size': modal.size,
          'index': topModalIndex,
          'animate': 'animate',
          'ng-style': '{\'z-index\': 1050 + $$topModalIndex*10, display: \'block\'}',
          'tabindex': -1,
          'uib-modal-animation-class': 'fade',
          'modal-in-class': 'in'
        }).append(content);
        if (modal.windowClass) {
          angularDomEl.addClass(modal.windowClass);
        }

        if (modal.animation) {
          angularDomEl.attr('modal-animation', 'true');
        }

        appendToElement.addClass(modalBodyClass);
        if (modal.scope) {
          // we need to explicitly add the modal index to the modal scope
          // because it is needed by ngStyle to compute the zIndex property.
          modal.scope.$$topModalIndex = topModalIndex;
        }
        $animate.enter($compile(angularDomEl)(modal.scope), appendToElement);

        openedWindows.top().value.modalDomEl = angularDomEl;
        openedWindows.top().value.modalOpener = modalOpener;

        applyAriaHidden(angularDomEl);

        function applyAriaHidden(el) {
          if (!el || el[0].tagName === 'BODY') {
            return;
          }

          getSiblings(el).forEach(function(sibling) {
            var elemIsAlreadyHidden = sibling.getAttribute('aria-hidden') === 'true',
              ariaHiddenCount = parseInt(sibling.getAttribute(ARIA_HIDDEN_ATTRIBUTE_NAME), 10);

            if (!ariaHiddenCount) {
              ariaHiddenCount = elemIsAlreadyHidden ? 1 : 0;
            }

            sibling.setAttribute(ARIA_HIDDEN_ATTRIBUTE_NAME, ariaHiddenCount + 1);
            sibling.setAttribute('aria-hidden', 'true');
          });

          return applyAriaHidden(el.parent());

          function getSiblings(el) {
            var children = el.parent() ? el.parent().children() : [];

            return Array.prototype.filter.call(children, function(child) {
              return child !== el[0];
            });
          }
        }
      };

      function broadcastClosing(modalWindow, resultOrReason, closing) {
        return !modalWindow.value.modalScope.$broadcast('modal.closing', resultOrReason, closing).defaultPrevented;
      }

      function unhideBackgroundElements() {
        Array.prototype.forEach.call(
          document.querySelectorAll('[' + ARIA_HIDDEN_ATTRIBUTE_NAME + ']'),
          function(hiddenEl) {
            var ariaHiddenCount = parseInt(hiddenEl.getAttribute(ARIA_HIDDEN_ATTRIBUTE_NAME), 10),
              newHiddenCount = ariaHiddenCount - 1;
            hiddenEl.setAttribute(ARIA_HIDDEN_ATTRIBUTE_NAME, newHiddenCount);

            if (!newHiddenCount) {
              hiddenEl.removeAttribute(ARIA_HIDDEN_ATTRIBUTE_NAME);
              hiddenEl.removeAttribute('aria-hidden');
            }
          }
        );
      }

      $modalStack.close = function(modalInstance, result) {
        var modalWindow = openedWindows.get(modalInstance);
        unhideBackgroundElements();
        if (modalWindow && broadcastClosing(modalWindow, result, true)) {
          modalWindow.value.modalScope.$$uibDestructionScheduled = true;
          modalWindow.value.deferred.resolve(result);
          removeModalWindow(modalInstance, modalWindow.value.modalOpener);
          return true;
        }

        return !modalWindow;
      };

      $modalStack.dismiss = function(modalInstance, reason) {
        var modalWindow = openedWindows.get(modalInstance);
        unhideBackgroundElements();
        if (modalWindow && broadcastClosing(modalWindow, reason, false)) {
          modalWindow.value.modalScope.$$uibDestructionScheduled = true;
          modalWindow.value.deferred.reject(reason);
          removeModalWindow(modalInstance, modalWindow.value.modalOpener);
          return true;
        }
        return !modalWindow;
      };

      $modalStack.dismissAll = function(reason) {
        var topModal = this.getTop();
        while (topModal && this.dismiss(topModal.key, reason)) {
          topModal = this.getTop();
        }
      };

      $modalStack.getTop = function() {
        return openedWindows.top();
      };

      $modalStack.modalRendered = function(modalInstance) {
        var modalWindow = openedWindows.get(modalInstance);
        if (modalWindow) {
          modalWindow.value.renderDeferred.resolve();
        }
      };

      $modalStack.focusFirstFocusableElement = function(list) {
        if (list.length > 0) {
          list[0].focus();
          return true;
        }
        return false;
      };

      $modalStack.focusLastFocusableElement = function(list) {
        if (list.length > 0) {
          list[list.length - 1].focus();
          return true;
        }
        return false;
      };

      $modalStack.isModalFocused = function(evt, modalWindow) {
        if (evt && modalWindow) {
          var modalDomEl = modalWindow.value.modalDomEl;
          if (modalDomEl && modalDomEl.length) {
            return (evt.target || evt.srcElement) === modalDomEl[0];
          }
        }
        return false;
      };

      $modalStack.isFocusInFirstItem = function(evt, list) {
        if (list.length > 0) {
          return (evt.target || evt.srcElement) === list[0];
        }
        return false;
      };

      $modalStack.isFocusInLastItem = function(evt, list) {
        if (list.length > 0) {
          return (evt.target || evt.srcElement) === list[list.length - 1];
        }
        return false;
      };

      $modalStack.loadFocusElementList = function(modalWindow) {
        if (modalWindow) {
          var modalDomE1 = modalWindow.value.modalDomEl;
          if (modalDomE1 && modalDomE1.length) {
            var elements = modalDomE1[0].querySelectorAll(tabbableSelector);
            return elements ?
              Array.prototype.filter.call(elements, function(element) {
                return isVisible(element);
              }) : elements;
          }
        }
      };

      return $modalStack;
    }])

  .provider('$uibModal', function() {
    var $modalProvider = {
      options: {
        animation: true,
        backdrop: true, //can also be false or 'static'
        keyboard: true
      },
      $get: ['$rootScope', '$q', '$document', '$templateRequest', '$controller', '$uibResolve', '$uibModalStack',
        function ($rootScope, $q, $document, $templateRequest, $controller, $uibResolve, $modalStack) {
          var $modal = {};

          function getTemplatePromise(options) {
            return options.template ? $q.when(options.template) :
              $templateRequest(angular.isFunction(options.templateUrl) ?
                options.templateUrl() : options.templateUrl);
          }

          var promiseChain = null;
          $modal.getPromiseChain = function() {
            return promiseChain;
          };

          $modal.open = function(modalOptions) {
            var modalResultDeferred = $q.defer();
            var modalOpenedDeferred = $q.defer();
            var modalClosedDeferred = $q.defer();
            var modalRenderDeferred = $q.defer();

            //prepare an instance of a modal to be injected into controllers and returned to a caller
            var modalInstance = {
              result: modalResultDeferred.promise,
              opened: modalOpenedDeferred.promise,
              closed: modalClosedDeferred.promise,
              rendered: modalRenderDeferred.promise,
              close: function (result) {
                return $modalStack.close(modalInstance, result);
              },
              dismiss: function (reason) {
                return $modalStack.dismiss(modalInstance, reason);
              }
            };

            //merge and clean up options
            modalOptions = angular.extend({}, $modalProvider.options, modalOptions);
            modalOptions.resolve = modalOptions.resolve || {};
            modalOptions.appendTo = modalOptions.appendTo || $document.find('body').eq(0);

            if (!modalOptions.appendTo.length) {
              throw new Error('appendTo element not found. Make sure that the element passed is in DOM.');
            }

            //verify options
            if (!modalOptions.component && !modalOptions.template && !modalOptions.templateUrl) {
              throw new Error('One of component or template or templateUrl options is required.');
            }

            var templateAndResolvePromise;
            if (modalOptions.component) {
              templateAndResolvePromise = $q.when($uibResolve.resolve(modalOptions.resolve, {}, null, null));
            } else {
              templateAndResolvePromise =
                $q.all([getTemplatePromise(modalOptions), $uibResolve.resolve(modalOptions.resolve, {}, null, null)]);
            }

            function resolveWithTemplate() {
              return templateAndResolvePromise;
            }

            // Wait for the resolution of the existing promise chain.
            // Then switch to our own combined promise dependency (regardless of how the previous modal fared).
            // Then add to $modalStack and resolve opened.
            // Finally clean up the chain variable if no subsequent modal has overwritten it.
            var samePromise;
            samePromise = promiseChain = $q.all([promiseChain])
              .then(resolveWithTemplate, resolveWithTemplate)
              .then(function resolveSuccess(tplAndVars) {
                var providedScope = modalOptions.scope || $rootScope;

                var modalScope = providedScope.$new();
                modalScope.$close = modalInstance.close;
                modalScope.$dismiss = modalInstance.dismiss;

                modalScope.$on('$destroy', function() {
                  if (!modalScope.$$uibDestructionScheduled) {
                    modalScope.$dismiss('$uibUnscheduledDestruction');
                  }
                });

                var modal = {
                  scope: modalScope,
                  deferred: modalResultDeferred,
                  renderDeferred: modalRenderDeferred,
                  closedDeferred: modalClosedDeferred,
                  animation: modalOptions.animation,
                  backdrop: modalOptions.backdrop,
                  keyboard: modalOptions.keyboard,
                  backdropClass: modalOptions.backdropClass,
                  windowTopClass: modalOptions.windowTopClass,
                  windowClass: modalOptions.windowClass,
                  windowTemplateUrl: modalOptions.windowTemplateUrl,
                  ariaLabelledBy: modalOptions.ariaLabelledBy,
                  ariaDescribedBy: modalOptions.ariaDescribedBy,
                  size: modalOptions.size,
                  openedClass: modalOptions.openedClass,
                  appendTo: modalOptions.appendTo
                };

                var component = {};
                var ctrlInstance, ctrlInstantiate, ctrlLocals = {};

                if (modalOptions.component) {
                  constructLocals(component, false, true, false);
                  component.name = modalOptions.component;
                  modal.component = component;
                } else if (modalOptions.controller) {
                  constructLocals(ctrlLocals, true, false, true);

                  // the third param will make the controller instantiate later,private api
                  // @see https://github.com/angular/angular.js/blob/master/src/ng/controller.js#L126
                  ctrlInstantiate = $controller(modalOptions.controller, ctrlLocals, true, modalOptions.controllerAs);
                  if (modalOptions.controllerAs && modalOptions.bindToController) {
                    ctrlInstance = ctrlInstantiate.instance;
                    ctrlInstance.$close = modalScope.$close;
                    ctrlInstance.$dismiss = modalScope.$dismiss;
                    angular.extend(ctrlInstance, {
                      $resolve: ctrlLocals.$scope.$resolve
                    }, providedScope);
                  }

                  ctrlInstance = ctrlInstantiate();

                  if (angular.isFunction(ctrlInstance.$onInit)) {
                    ctrlInstance.$onInit();
                  }
                }

                if (!modalOptions.component) {
                  modal.content = tplAndVars[0];
                }

                $modalStack.open(modalInstance, modal);
                modalOpenedDeferred.resolve(true);

                function constructLocals(obj, template, instanceOnScope, injectable) {
                  obj.$scope = modalScope;
                  obj.$scope.$resolve = {};
                  if (instanceOnScope) {
                    obj.$scope.$uibModalInstance = modalInstance;
                  } else {
                    obj.$uibModalInstance = modalInstance;
                  }

                  var resolves = template ? tplAndVars[1] : tplAndVars;
                  angular.forEach(resolves, function(value, key) {
                    if (injectable) {
                      obj[key] = value;
                    }

                    obj.$scope.$resolve[key] = value;
                  });
                }
            }, function resolveError(reason) {
              modalOpenedDeferred.reject(reason);
              modalResultDeferred.reject(reason);
            })['finally'](function() {
              if (promiseChain === samePromise) {
                promiseChain = null;
              }
            });

            return modalInstance;
          };

          return $modal;
        }
      ]
    };

    return $modalProvider;
  });

angular.module('ui.bootstrap.paging', [])
/**
 * Helper internal service for generating common controller code between the
 * pager and pagination components
 */
.factory('uibPaging', ['$parse', function($parse) {
  return {
    create: function(ctrl, $scope, $attrs) {
      ctrl.setNumPages = $attrs.numPages ? $parse($attrs.numPages).assign : angular.noop;
      ctrl.ngModelCtrl = { $setViewValue: angular.noop }; // nullModelCtrl
      ctrl._watchers = [];

      ctrl.init = function(ngModelCtrl, config) {
        ctrl.ngModelCtrl = ngModelCtrl;
        ctrl.config = config;

        ngModelCtrl.$render = function() {
          ctrl.render();
        };

        if ($attrs.itemsPerPage) {
          ctrl._watchers.push($scope.$parent.$watch($attrs.itemsPerPage, function(value) {
            ctrl.itemsPerPage = parseInt(value, 10);
            $scope.totalPages = ctrl.calculateTotalPages();
            ctrl.updatePage();
          }));
        } else {
          ctrl.itemsPerPage = config.itemsPerPage;
        }

        $scope.$watch('totalItems', function(newTotal, oldTotal) {
          if (angular.isDefined(newTotal) || newTotal !== oldTotal) {
            $scope.totalPages = ctrl.calculateTotalPages();
            ctrl.updatePage();
          }
        });
      };

      ctrl.calculateTotalPages = function() {
        var totalPages = ctrl.itemsPerPage < 1 ? 1 : Math.ceil($scope.totalItems / ctrl.itemsPerPage);
        return Math.max(totalPages || 0, 1);
      };

      ctrl.render = function() {
        $scope.page = parseInt(ctrl.ngModelCtrl.$viewValue, 10) || 1;
      };

      $scope.selectPage = function(page, evt) {
        if (evt) {
          evt.preventDefault();
        }

        var clickAllowed = !$scope.ngDisabled || !evt;
        if (clickAllowed && $scope.page !== page && page > 0 && page <= $scope.totalPages) {
          if (evt && evt.target) {
            evt.target.blur();
          }
          ctrl.ngModelCtrl.$setViewValue(page);
          ctrl.ngModelCtrl.$render();
        }
      };

      $scope.getText = function(key) {
        return $scope[key + 'Text'] || ctrl.config[key + 'Text'];
      };

      $scope.noPrevious = function() {
        return $scope.page === 1;
      };

      $scope.noNext = function() {
        return $scope.page === $scope.totalPages;
      };

      ctrl.updatePage = function() {
        ctrl.setNumPages($scope.$parent, $scope.totalPages); // Readonly variable

        if ($scope.page > $scope.totalPages) {
          $scope.selectPage($scope.totalPages);
        } else {
          ctrl.ngModelCtrl.$render();
        }
      };

      $scope.$on('$destroy', function() {
        while (ctrl._watchers.length) {
          ctrl._watchers.shift()();
        }
      });
    }
  };
}]);

angular.module('ui.bootstrap.pager', ['ui.bootstrap.paging', 'ui.bootstrap.tabindex'])

.controller('UibPagerController', ['$scope', '$attrs', 'uibPaging', 'uibPagerConfig', function($scope, $attrs, uibPaging, uibPagerConfig) {
  $scope.align = angular.isDefined($attrs.align) ? $scope.$parent.$eval($attrs.align) : uibPagerConfig.align;

  uibPaging.create(this, $scope, $attrs);
}])

.constant('uibPagerConfig', {
  itemsPerPage: 10,
  previousText: '« Previous',
  nextText: 'Next »',
  align: true
})

.directive('uibPager', ['uibPagerConfig', function(uibPagerConfig) {
  return {
    scope: {
      totalItems: '=',
      previousText: '@',
      nextText: '@',
      ngDisabled: '='
    },
    require: ['uibPager', '?ngModel'],
    restrict: 'A',
    controller: 'UibPagerController',
    controllerAs: 'pager',
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'uib/template/pager/pager.html';
    },
    link: function(scope, element, attrs, ctrls) {
      element.addClass('pager');
      var paginationCtrl = ctrls[0], ngModelCtrl = ctrls[1];

      if (!ngModelCtrl) {
        return; // do nothing if no ng-model
      }

      paginationCtrl.init(ngModelCtrl, uibPagerConfig);
    }
  };
}]);

angular.module('ui.bootstrap.pagination', ['ui.bootstrap.paging', 'ui.bootstrap.tabindex'])
.controller('UibPaginationController', ['$scope', '$attrs', '$parse', 'uibPaging', 'uibPaginationConfig', function($scope, $attrs, $parse, uibPaging, uibPaginationConfig) {
  var ctrl = this;
  // Setup configuration parameters
  var maxSize = angular.isDefined($attrs.maxSize) ? $scope.$parent.$eval($attrs.maxSize) : uibPaginationConfig.maxSize,
    rotate = angular.isDefined($attrs.rotate) ? $scope.$parent.$eval($attrs.rotate) : uibPaginationConfig.rotate,
    forceEllipses = angular.isDefined($attrs.forceEllipses) ? $scope.$parent.$eval($attrs.forceEllipses) : uibPaginationConfig.forceEllipses,
    boundaryLinkNumbers = angular.isDefined($attrs.boundaryLinkNumbers) ? $scope.$parent.$eval($attrs.boundaryLinkNumbers) : uibPaginationConfig.boundaryLinkNumbers,
    pageLabel = angular.isDefined($attrs.pageLabel) ? function(idx) { return $scope.$parent.$eval($attrs.pageLabel, {$page: idx}); } : angular.identity;
  $scope.boundaryLinks = angular.isDefined($attrs.boundaryLinks) ? $scope.$parent.$eval($attrs.boundaryLinks) : uibPaginationConfig.boundaryLinks;
  $scope.directionLinks = angular.isDefined($attrs.directionLinks) ? $scope.$parent.$eval($attrs.directionLinks) : uibPaginationConfig.directionLinks;
  $attrs.$set('role', 'menu');

  uibPaging.create(this, $scope, $attrs);

  if ($attrs.maxSize) {
    ctrl._watchers.push($scope.$parent.$watch($parse($attrs.maxSize), function(value) {
      maxSize = parseInt(value, 10);
      ctrl.render();
    }));
  }

  // Create page object used in template
  function makePage(number, text, isActive) {
    return {
      number: number,
      text: text,
      active: isActive
    };
  }

  function getPages(currentPage, totalPages) {
    var pages = [];

    // Default page limits
    var startPage = 1, endPage = totalPages;
    var isMaxSized = angular.isDefined(maxSize) && maxSize < totalPages;

    // recompute if maxSize
    if (isMaxSized) {
      if (rotate) {
        // Current page is displayed in the middle of the visible ones
        startPage = Math.max(currentPage - Math.floor(maxSize / 2), 1);
        endPage = startPage + maxSize - 1;

        // Adjust if limit is exceeded
        if (endPage > totalPages) {
          endPage = totalPages;
          startPage = endPage - maxSize + 1;
        }
      } else {
        // Visible pages are paginated with maxSize
        startPage = (Math.ceil(currentPage / maxSize) - 1) * maxSize + 1;

        // Adjust last page if limit is exceeded
        endPage = Math.min(startPage + maxSize - 1, totalPages);
      }
    }

    // Add page number links
    for (var number = startPage; number <= endPage; number++) {
      var page = makePage(number, pageLabel(number), number === currentPage);
      pages.push(page);
    }

    // Add links to move between page sets
    if (isMaxSized && maxSize > 0 && (!rotate || forceEllipses || boundaryLinkNumbers)) {
      if (startPage > 1) {
        if (!boundaryLinkNumbers || startPage > 3) { //need ellipsis for all options unless range is too close to beginning
        var previousPageSet = makePage(startPage - 1, '...', false);
        pages.unshift(previousPageSet);
      }
        if (boundaryLinkNumbers) {
          if (startPage === 3) { //need to replace ellipsis when the buttons would be sequential
            var secondPageLink = makePage(2, '2', false);
            pages.unshift(secondPageLink);
          }
          //add the first page
          var firstPageLink = makePage(1, '1', false);
          pages.unshift(firstPageLink);
        }
      }

      if (endPage < totalPages) {
        if (!boundaryLinkNumbers || endPage < totalPages - 2) { //need ellipsis for all options unless range is too close to end
        var nextPageSet = makePage(endPage + 1, '...', false);
        pages.push(nextPageSet);
      }
        if (boundaryLinkNumbers) {
          if (endPage === totalPages - 2) { //need to replace ellipsis when the buttons would be sequential
            var secondToLastPageLink = makePage(totalPages - 1, totalPages - 1, false);
            pages.push(secondToLastPageLink);
          }
          //add the last page
          var lastPageLink = makePage(totalPages, totalPages, false);
          pages.push(lastPageLink);
        }
      }
    }
    return pages;
  }

  var originalRender = this.render;
  this.render = function() {
    originalRender();
    if ($scope.page > 0 && $scope.page <= $scope.totalPages) {
      $scope.pages = getPages($scope.page, $scope.totalPages);
    }
  };
}])

.constant('uibPaginationConfig', {
  itemsPerPage: 10,
  boundaryLinks: false,
  boundaryLinkNumbers: false,
  directionLinks: true,
  firstText: 'First',
  previousText: 'Previous',
  nextText: 'Next',
  lastText: 'Last',
  rotate: true,
  forceEllipses: false
})

.directive('uibPagination', ['$parse', 'uibPaginationConfig', function($parse, uibPaginationConfig) {
  return {
    scope: {
      totalItems: '=',
      firstText: '@',
      previousText: '@',
      nextText: '@',
      lastText: '@',
      ngDisabled:'='
    },
    require: ['uibPagination', '?ngModel'],
    restrict: 'A',
    controller: 'UibPaginationController',
    controllerAs: 'pagination',
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'uib/template/pagination/pagination.html';
    },
    link: function(scope, element, attrs, ctrls) {
      element.addClass('pagination');
      var paginationCtrl = ctrls[0], ngModelCtrl = ctrls[1];

      if (!ngModelCtrl) {
         return; // do nothing if no ng-model
      }

      paginationCtrl.init(ngModelCtrl, uibPaginationConfig);
    }
  };
}]);

/**
 * The following features are still outstanding: animation as a
 * function, placement as a function, inside, support for more triggers than
 * just mouse enter/leave, html tooltips, and selector delegation.
 */
angular.module('ui.bootstrap.tooltip', ['ui.bootstrap.position', 'ui.bootstrap.stackedMap'])

/**
 * The $tooltip service creates tooltip- and popover-like directives as well as
 * houses global options for them.
 */
.provider('$uibTooltip', function() {
  // The default options tooltip and popover.
  var defaultOptions = {
    placement: 'top',
    placementClassPrefix: '',
    animation: true,
    popupDelay: 0,
    popupCloseDelay: 0,
    useContentExp: false
  };

  // Default hide triggers for each show trigger
  var triggerMap = {
    'mouseenter': 'mouseleave',
    'click': 'click',
    'outsideClick': 'outsideClick',
    'focus': 'blur',
    'none': ''
  };

  // The options specified to the provider globally.
  var globalOptions = {};

  /**
   * `options({})` allows global configuration of all tooltips in the
   * application.
   *
   *   var app = angular.module( 'App', ['ui.bootstrap.tooltip'], function( $tooltipProvider ) {
   *     // place tooltips left instead of top by default
   *     $tooltipProvider.options( { placement: 'left' } );
   *   });
   */
	this.options = function(value) {
		angular.extend(globalOptions, value);
	};

  /**
   * This allows you to extend the set of trigger mappings available. E.g.:
   *
   *   $tooltipProvider.setTriggers( { 'openTrigger': 'closeTrigger' } );
   */
  this.setTriggers = function setTriggers(triggers) {
    angular.extend(triggerMap, triggers);
  };

  /**
   * This is a helper function for translating camel-case to snake_case.
   */
  function snake_case(name) {
    var regexp = /[A-Z]/g;
    var separator = '-';
    return name.replace(regexp, function(letter, pos) {
      return (pos ? separator : '') + letter.toLowerCase();
    });
  }

  /**
   * Returns the actual instance of the $tooltip service.
   * TODO support multiple triggers
   */
  this.$get = ['$window', '$compile', '$timeout', '$document', '$uibPosition', '$interpolate', '$rootScope', '$parse', '$$stackedMap', function($window, $compile, $timeout, $document, $position, $interpolate, $rootScope, $parse, $$stackedMap) {
    var openedTooltips = $$stackedMap.createNew();
    $document.on('keyup', keypressListener);

    $rootScope.$on('$destroy', function() {
      $document.off('keyup', keypressListener);
    });

    function keypressListener(e) {
      if (e.which === 27) {
        var last = openedTooltips.top();
        if (last) {
          last.value.close();
          last = null;
        }
      }
    }

    return function $tooltip(ttType, prefix, defaultTriggerShow, options) {
      options = angular.extend({}, defaultOptions, globalOptions, options);

      /**
       * Returns an object of show and hide triggers.
       *
       * If a trigger is supplied,
       * it is used to show the tooltip; otherwise, it will use the `trigger`
       * option passed to the `$tooltipProvider.options` method; else it will
       * default to the trigger supplied to this directive factory.
       *
       * The hide trigger is based on the show trigger. If the `trigger` option
       * was passed to the `$tooltipProvider.options` method, it will use the
       * mapped trigger from `triggerMap` or the passed trigger if the map is
       * undefined; otherwise, it uses the `triggerMap` value of the show
       * trigger; else it will just use the show trigger.
       */
      function getTriggers(trigger) {
        var show = (trigger || options.trigger || defaultTriggerShow).split(' ');
        var hide = show.map(function(trigger) {
          return triggerMap[trigger] || trigger;
        });
        return {
          show: show,
          hide: hide
        };
      }

      var directiveName = snake_case(ttType);

      var startSym = $interpolate.startSymbol();
      var endSym = $interpolate.endSymbol();
      var template =
        '<div '+ directiveName + '-popup ' +
          'uib-title="' + startSym + 'title' + endSym + '" ' +
          (options.useContentExp ?
            'content-exp="contentExp()" ' :
            'content="' + startSym + 'content' + endSym + '" ') +
          'origin-scope="origScope" ' +
          'class="uib-position-measure ' + prefix + '" ' +
          'tooltip-animation-class="fade"' +
          'uib-tooltip-classes ' +
          'ng-class="{ in: isOpen }" ' +
          '>' +
        '</div>';

      return {
        compile: function(tElem, tAttrs) {
          var tooltipLinker = $compile(template);

          return function link(scope, element, attrs, tooltipCtrl) {
            var tooltip;
            var tooltipLinkedScope;
            var transitionTimeout;
            var showTimeout;
            var hideTimeout;
            var positionTimeout;
            var adjustmentTimeout;
            var appendToBody = angular.isDefined(options.appendToBody) ? options.appendToBody : false;
            var triggers = getTriggers(undefined);
            var hasEnableExp = angular.isDefined(attrs[prefix + 'Enable']);
            var ttScope = scope.$new(true);
            var repositionScheduled = false;
            var isOpenParse = angular.isDefined(attrs[prefix + 'IsOpen']) ? $parse(attrs[prefix + 'IsOpen']) : false;
            var contentParse = options.useContentExp ? $parse(attrs[ttType]) : false;
            var observers = [];
            var lastPlacement;

            var positionTooltip = function() {
              // check if tooltip exists and is not empty
              if (!tooltip || !tooltip.html()) { return; }

              if (!positionTimeout) {
                positionTimeout = $timeout(function() {
                  var ttPosition = $position.positionElements(element, tooltip, ttScope.placement, appendToBody);
                  var initialHeight = angular.isDefined(tooltip.offsetHeight) ? tooltip.offsetHeight : tooltip.prop('offsetHeight');
                  var elementPos = appendToBody ? $position.offset(element) : $position.position(element);
                  tooltip.css({ top: ttPosition.top + 'px', left: ttPosition.left + 'px' });
                  var placementClasses = ttPosition.placement.split('-');

                  if (!tooltip.hasClass(placementClasses[0])) {
                    tooltip.removeClass(lastPlacement.split('-')[0]);
                    tooltip.addClass(placementClasses[0]);
                  }

                  if (!tooltip.hasClass(options.placementClassPrefix + ttPosition.placement)) {
                    tooltip.removeClass(options.placementClassPrefix + lastPlacement);
                    tooltip.addClass(options.placementClassPrefix + ttPosition.placement);
                  }

                  adjustmentTimeout = $timeout(function() {
                    var currentHeight = angular.isDefined(tooltip.offsetHeight) ? tooltip.offsetHeight : tooltip.prop('offsetHeight');
                    var adjustment = $position.adjustTop(placementClasses, elementPos, initialHeight, currentHeight);
                    if (adjustment) {
                      tooltip.css(adjustment);
                    }
                    adjustmentTimeout = null;
                  }, 0, false);

                  // first time through tt element will have the
                  // uib-position-measure class or if the placement
                  // has changed we need to position the arrow.
                  if (tooltip.hasClass('uib-position-measure')) {
                    $position.positionArrow(tooltip, ttPosition.placement);
                    tooltip.removeClass('uib-position-measure');
                  } else if (lastPlacement !== ttPosition.placement) {
                    $position.positionArrow(tooltip, ttPosition.placement);
                  }
                  lastPlacement = ttPosition.placement;

                  positionTimeout = null;
                }, 0, false);
              }
            };

            // Set up the correct scope to allow transclusion later
            ttScope.origScope = scope;

            // By default, the tooltip is not open.
            // TODO add ability to start tooltip opened
            ttScope.isOpen = false;

            function toggleTooltipBind() {
              if (!ttScope.isOpen) {
                showTooltipBind();
              } else {
                hideTooltipBind();
              }
            }

            // Show the tooltip with delay if specified, otherwise show it immediately
            function showTooltipBind() {
              if (hasEnableExp && !scope.$eval(attrs[prefix + 'Enable'])) {
                return;
              }

              cancelHide();
              prepareTooltip();

              if (ttScope.popupDelay) {
                // Do nothing if the tooltip was already scheduled to pop-up.
                // This happens if show is triggered multiple times before any hide is triggered.
                if (!showTimeout) {
                  showTimeout = $timeout(show, ttScope.popupDelay, false);
                }
              } else {
                show();
              }
            }

            function hideTooltipBind() {
              cancelShow();

              if (ttScope.popupCloseDelay) {
                if (!hideTimeout) {
                  hideTimeout = $timeout(hide, ttScope.popupCloseDelay, false);
                }
              } else {
                hide();
              }
            }

            // Show the tooltip popup element.
            function show() {
              cancelShow();
              cancelHide();

              // Don't show empty tooltips.
              if (!ttScope.content) {
                return angular.noop;
              }

              createTooltip();

              // And show the tooltip.
              ttScope.$evalAsync(function() {
                ttScope.isOpen = true;
                assignIsOpen(true);
                positionTooltip();
              });
            }

            function cancelShow() {
              if (showTimeout) {
                $timeout.cancel(showTimeout);
                showTimeout = null;
              }

              if (positionTimeout) {
                $timeout.cancel(positionTimeout);
                positionTimeout = null;
              }
            }

            // Hide the tooltip popup element.
            function hide() {
              if (!ttScope) {
                return;
              }

              // First things first: we don't show it anymore.
              ttScope.$evalAsync(function() {
                if (ttScope) {
                  ttScope.isOpen = false;
                  assignIsOpen(false);
                  // And now we remove it from the DOM. However, if we have animation, we
                  // need to wait for it to expire beforehand.
                  // FIXME: this is a placeholder for a port of the transitions library.
                  // The fade transition in TWBS is 150ms.
                  if (ttScope.animation) {
                    if (!transitionTimeout) {
                      transitionTimeout = $timeout(removeTooltip, 150, false);
                    }
                  } else {
                    removeTooltip();
                  }
                }
              });
            }

            function cancelHide() {
              if (hideTimeout) {
                $timeout.cancel(hideTimeout);
                hideTimeout = null;
              }

              if (transitionTimeout) {
                $timeout.cancel(transitionTimeout);
                transitionTimeout = null;
              }
            }

            function createTooltip() {
              // There can only be one tooltip element per directive shown at once.
              if (tooltip) {
                return;
              }

              tooltipLinkedScope = ttScope.$new();
              tooltip = tooltipLinker(tooltipLinkedScope, function(tooltip) {
                if (appendToBody) {
                  $document.find('body').append(tooltip);
                } else {
                  element.after(tooltip);
                }
              });

              openedTooltips.add(ttScope, {
                close: hide
              });

              prepObservers();
            }

            function removeTooltip() {
              cancelShow();
              cancelHide();
              unregisterObservers();

              if (tooltip) {
                tooltip.remove();
                
                tooltip = null;
                if (adjustmentTimeout) {
                  $timeout.cancel(adjustmentTimeout);
                }
              }

              openedTooltips.remove(ttScope);
              
              if (tooltipLinkedScope) {
                tooltipLinkedScope.$destroy();
                tooltipLinkedScope = null;
              }
            }

            /**
             * Set the initial scope values. Once
             * the tooltip is created, the observers
             * will be added to keep things in sync.
             */
            function prepareTooltip() {
              ttScope.title = attrs[prefix + 'Title'];
              if (contentParse) {
                ttScope.content = contentParse(scope);
              } else {
                ttScope.content = attrs[ttType];
              }

              ttScope.popupClass = attrs[prefix + 'Class'];
              ttScope.placement = angular.isDefined(attrs[prefix + 'Placement']) ? attrs[prefix + 'Placement'] : options.placement;
              var placement = $position.parsePlacement(ttScope.placement);
              lastPlacement = placement[1] ? placement[0] + '-' + placement[1] : placement[0];

              var delay = parseInt(attrs[prefix + 'PopupDelay'], 10);
              var closeDelay = parseInt(attrs[prefix + 'PopupCloseDelay'], 10);
              ttScope.popupDelay = !isNaN(delay) ? delay : options.popupDelay;
              ttScope.popupCloseDelay = !isNaN(closeDelay) ? closeDelay : options.popupCloseDelay;
            }

            function assignIsOpen(isOpen) {
              if (isOpenParse && angular.isFunction(isOpenParse.assign)) {
                isOpenParse.assign(scope, isOpen);
              }
            }

            ttScope.contentExp = function() {
              return ttScope.content;
            };

            /**
             * Observe the relevant attributes.
             */
            attrs.$observe('disabled', function(val) {
              if (val) {
                cancelShow();
              }

              if (val && ttScope.isOpen) {
                hide();
              }
            });

            if (isOpenParse) {
              scope.$watch(isOpenParse, function(val) {
                if (ttScope && !val === ttScope.isOpen) {
                  toggleTooltipBind();
                }
              });
            }

            function prepObservers() {
              observers.length = 0;

              if (contentParse) {
                observers.push(
                  scope.$watch(contentParse, function(val) {
                    ttScope.content = val;
                    if (!val && ttScope.isOpen) {
                      hide();
                    }
                  })
                );

                observers.push(
                  tooltipLinkedScope.$watch(function() {
                    if (!repositionScheduled) {
                      repositionScheduled = true;
                      tooltipLinkedScope.$$postDigest(function() {
                        repositionScheduled = false;
                        if (ttScope && ttScope.isOpen) {
                          positionTooltip();
                        }
                      });
                    }
                  })
                );
              } else {
                observers.push(
                  attrs.$observe(ttType, function(val) {
                    ttScope.content = val;
                    if (!val && ttScope.isOpen) {
                      hide();
                    } else {
                      positionTooltip();
                    }
                  })
                );
              }

              observers.push(
                attrs.$observe(prefix + 'Title', function(val) {
                  ttScope.title = val;
                  if (ttScope.isOpen) {
                    positionTooltip();
                  }
                })
              );

              observers.push(
                attrs.$observe(prefix + 'Placement', function(val) {
                  ttScope.placement = val ? val : options.placement;
                  if (ttScope.isOpen) {
                    positionTooltip();
                  }
                })
              );
            }

            function unregisterObservers() {
              if (observers.length) {
                angular.forEach(observers, function(observer) {
                  observer();
                });
                observers.length = 0;
              }
            }

            // hide tooltips/popovers for outsideClick trigger
            function bodyHideTooltipBind(e) {
              if (!ttScope || !ttScope.isOpen || !tooltip) {
                return;
              }
              // make sure the tooltip/popover link or tool tooltip/popover itself were not clicked
              if (!element[0].contains(e.target) && !tooltip[0].contains(e.target)) {
                hideTooltipBind();
              }
            }

            // KeyboardEvent handler to hide the tooltip on Escape key press
            function hideOnEscapeKey(e) {
              if (e.which === 27) {
                hideTooltipBind();
              }
            }

            var unregisterTriggers = function() {
              triggers.show.forEach(function(trigger) {
                if (trigger === 'outsideClick') {
                  element.off('click', toggleTooltipBind);
                } else {
                  element.off(trigger, showTooltipBind);
                  element.off(trigger, toggleTooltipBind);
                }
                element.off('keypress', hideOnEscapeKey);
              });
              triggers.hide.forEach(function(trigger) {
                if (trigger === 'outsideClick') {
                  $document.off('click', bodyHideTooltipBind);
                } else {
                  element.off(trigger, hideTooltipBind);
                }
              });
            };

            function prepTriggers() {
              var showTriggers = [], hideTriggers = [];
              var val = scope.$eval(attrs[prefix + 'Trigger']);
              unregisterTriggers();

              if (angular.isObject(val)) {
                Object.keys(val).forEach(function(key) {
                  showTriggers.push(key);
                  hideTriggers.push(val[key]);
                });
                triggers = {
                  show: showTriggers,
                  hide: hideTriggers
                };
              } else {
                triggers = getTriggers(val);
              }

              if (triggers.show !== 'none') {
                triggers.show.forEach(function(trigger, idx) {
                  if (trigger === 'outsideClick') {
                    element.on('click', toggleTooltipBind);
                    $document.on('click', bodyHideTooltipBind);
                  } else if (trigger === triggers.hide[idx]) {
                    element.on(trigger, toggleTooltipBind);
                  } else if (trigger) {
                    element.on(trigger, showTooltipBind);
                    element.on(triggers.hide[idx], hideTooltipBind);
                  }
                  element.on('keypress', hideOnEscapeKey);
                });
              }
            }

            prepTriggers();

            var animation = scope.$eval(attrs[prefix + 'Animation']);
            ttScope.animation = angular.isDefined(animation) ? !!animation : options.animation;

            var appendToBodyVal;
            var appendKey = prefix + 'AppendToBody';
            if (appendKey in attrs && attrs[appendKey] === undefined) {
              appendToBodyVal = true;
            } else {
              appendToBodyVal = scope.$eval(attrs[appendKey]);
            }

            appendToBody = angular.isDefined(appendToBodyVal) ? appendToBodyVal : appendToBody;

            // Make sure tooltip is destroyed and removed.
            scope.$on('$destroy', function onDestroyTooltip() {
              unregisterTriggers();
              removeTooltip();
              ttScope = null;
            });
          };
        }
      };
    };
  }];
})

// This is mostly ngInclude code but with a custom scope
.directive('uibTooltipTemplateTransclude', [
         '$animate', '$sce', '$compile', '$templateRequest',
function ($animate, $sce, $compile, $templateRequest) {
  return {
    link: function(scope, elem, attrs) {
      var origScope = scope.$eval(attrs.tooltipTemplateTranscludeScope);

      var changeCounter = 0,
        currentScope,
        previousElement,
        currentElement;

      var cleanupLastIncludeContent = function() {
        if (previousElement) {
          previousElement.remove();
          previousElement = null;
        }

        if (currentScope) {
          currentScope.$destroy();
          currentScope = null;
        }

        if (currentElement) {
          $animate.leave(currentElement).then(function() {
            previousElement = null;
          });
          previousElement = currentElement;
          currentElement = null;
        }
      };

      scope.$watch($sce.parseAsResourceUrl(attrs.uibTooltipTemplateTransclude), function(src) {
        var thisChangeId = ++changeCounter;

        if (src) {
          //set the 2nd param to true to ignore the template request error so that the inner
          //contents and scope can be cleaned up.
          $templateRequest(src, true).then(function(response) {
            if (thisChangeId !== changeCounter) { return; }
            var newScope = origScope.$new();
            var template = response;

            var clone = $compile(template)(newScope, function(clone) {
              cleanupLastIncludeContent();
              $animate.enter(clone, elem);
            });

            currentScope = newScope;
            currentElement = clone;

            currentScope.$emit('$includeContentLoaded', src);
          }, function() {
            if (thisChangeId === changeCounter) {
              cleanupLastIncludeContent();
              scope.$emit('$includeContentError', src);
            }
          });
          scope.$emit('$includeContentRequested', src);
        } else {
          cleanupLastIncludeContent();
        }
      });

      scope.$on('$destroy', cleanupLastIncludeContent);
    }
  };
}])

/**
 * Note that it's intentional that these classes are *not* applied through $animate.
 * They must not be animated as they're expected to be present on the tooltip on
 * initialization.
 */
.directive('uibTooltipClasses', ['$uibPosition', function($uibPosition) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      // need to set the primary position so the
      // arrow has space during position measure.
      // tooltip.positionTooltip()
      if (scope.placement) {
        // // There are no top-left etc... classes
        // // in TWBS, so we need the primary position.
        var position = $uibPosition.parsePlacement(scope.placement);
        element.addClass(position[0]);
      }

      if (scope.popupClass) {
        element.addClass(scope.popupClass);
      }

      if (scope.animation) {
        element.addClass(attrs.tooltipAnimationClass);
      }
    }
  };
}])

.directive('uibTooltipPopup', function() {
  return {
    restrict: 'A',
    scope: { content: '@' },
    templateUrl: 'uib/template/tooltip/tooltip-popup.html'
  };
})

.directive('uibTooltip', [ '$uibTooltip', function($uibTooltip) {
  return $uibTooltip('uibTooltip', 'tooltip', 'mouseenter');
}])

.directive('uibTooltipTemplatePopup', function() {
  return {
    restrict: 'A',
    scope: { contentExp: '&', originScope: '&' },
    templateUrl: 'uib/template/tooltip/tooltip-template-popup.html'
  };
})

.directive('uibTooltipTemplate', ['$uibTooltip', function($uibTooltip) {
  return $uibTooltip('uibTooltipTemplate', 'tooltip', 'mouseenter', {
    useContentExp: true
  });
}])

.directive('uibTooltipHtmlPopup', function() {
  return {
    restrict: 'A',
    scope: { contentExp: '&' },
    templateUrl: 'uib/template/tooltip/tooltip-html-popup.html'
  };
})

.directive('uibTooltipHtml', ['$uibTooltip', function($uibTooltip) {
  return $uibTooltip('uibTooltipHtml', 'tooltip', 'mouseenter', {
    useContentExp: true
  });
}]);

/**
 * The following features are still outstanding: popup delay, animation as a
 * function, placement as a function, inside, support for more triggers than
 * just mouse enter/leave, and selector delegatation.
 */
angular.module('ui.bootstrap.popover', ['ui.bootstrap.tooltip'])

.directive('uibPopoverTemplatePopup', function() {
  return {
    restrict: 'A',
    scope: { uibTitle: '@', contentExp: '&', originScope: '&' },
    templateUrl: 'uib/template/popover/popover-template.html'
  };
})

.directive('uibPopoverTemplate', ['$uibTooltip', function($uibTooltip) {
  return $uibTooltip('uibPopoverTemplate', 'popover', 'click', {
    useContentExp: true
  });
}])

.directive('uibPopoverHtmlPopup', function() {
  return {
    restrict: 'A',
    scope: { contentExp: '&', uibTitle: '@' },
    templateUrl: 'uib/template/popover/popover-html.html'
  };
})

.directive('uibPopoverHtml', ['$uibTooltip', function($uibTooltip) {
  return $uibTooltip('uibPopoverHtml', 'popover', 'click', {
    useContentExp: true
  });
}])

.directive('uibPopoverPopup', function() {
  return {
    restrict: 'A',
    scope: { uibTitle: '@', content: '@' },
    templateUrl: 'uib/template/popover/popover.html'
  };
})

.directive('uibPopover', ['$uibTooltip', function($uibTooltip) {
  return $uibTooltip('uibPopover', 'popover', 'click');
}]);

angular.module('ui.bootstrap.progressbar', [])

.constant('uibProgressConfig', {
  animate: true,
  max: 100
})

.controller('UibProgressController', ['$scope', '$attrs', 'uibProgressConfig', function($scope, $attrs, progressConfig) {
  var self = this,
      animate = angular.isDefined($attrs.animate) ? $scope.$parent.$eval($attrs.animate) : progressConfig.animate;

  this.bars = [];
  $scope.max = getMaxOrDefault();

  this.addBar = function(bar, element, attrs) {
    if (!animate) {
      element.css({'transition': 'none'});
    }

    this.bars.push(bar);

    bar.max = getMaxOrDefault();
    bar.title = attrs && angular.isDefined(attrs.title) ? attrs.title : 'progressbar';

    bar.$watch('value', function(value) {
      bar.recalculatePercentage();
    });

    bar.recalculatePercentage = function() {
      var totalPercentage = self.bars.reduce(function(total, bar) {
        bar.percent = +(100 * bar.value / bar.max).toFixed(2);
        return total + bar.percent;
      }, 0);

      if (totalPercentage > 100) {
        bar.percent -= totalPercentage - 100;
      }
    };

    bar.$on('$destroy', function() {
      element = null;
      self.removeBar(bar);
    });
  };

  this.removeBar = function(bar) {
    this.bars.splice(this.bars.indexOf(bar), 1);
    this.bars.forEach(function (bar) {
      bar.recalculatePercentage();
    });
  };

  //$attrs.$observe('maxParam', function(maxParam) {
  $scope.$watch('maxParam', function(maxParam) {
    self.bars.forEach(function(bar) {
      bar.max = getMaxOrDefault();
      bar.recalculatePercentage();
    });
  });

  function getMaxOrDefault () {
    return angular.isDefined($scope.maxParam) ? $scope.maxParam : progressConfig.max;
  }
}])

.directive('uibProgress', function() {
  return {
    replace: true,
    transclude: true,
    controller: 'UibProgressController',
    require: 'uibProgress',
    scope: {
      maxParam: '=?max'
    },
    templateUrl: 'uib/template/progressbar/progress.html'
  };
})

.directive('uibBar', function() {
  return {
    replace: true,
    transclude: true,
    require: '^uibProgress',
    scope: {
      value: '=',
      type: '@'
    },
    templateUrl: 'uib/template/progressbar/bar.html',
    link: function(scope, element, attrs, progressCtrl) {
      progressCtrl.addBar(scope, element, attrs);
    }
  };
})

.directive('uibProgressbar', function() {
  return {
    replace: true,
    transclude: true,
    controller: 'UibProgressController',
    scope: {
      value: '=',
      maxParam: '=?max',
      type: '@'
    },
    templateUrl: 'uib/template/progressbar/progressbar.html',
    link: function(scope, element, attrs, progressCtrl) {
      progressCtrl.addBar(scope, angular.element(element.children()[0]), {title: attrs.title});
    }
  };
});

angular.module('ui.bootstrap.rating', [])

.constant('uibRatingConfig', {
  max: 5,
  stateOn: null,
  stateOff: null,
  enableReset: true,
  titles: ['one', 'two', 'three', 'four', 'five']
})

.controller('UibRatingController', ['$scope', '$attrs', 'uibRatingConfig', function($scope, $attrs, ratingConfig) {
  var ngModelCtrl = { $setViewValue: angular.noop },
    self = this;

  this.init = function(ngModelCtrl_) {
    ngModelCtrl = ngModelCtrl_;
    ngModelCtrl.$render = this.render;

    ngModelCtrl.$formatters.push(function(value) {
      if (angular.isNumber(value) && value << 0 !== value) {
        value = Math.round(value);
      }

      return value;
    });

    this.stateOn = angular.isDefined($attrs.stateOn) ? $scope.$parent.$eval($attrs.stateOn) : ratingConfig.stateOn;
    this.stateOff = angular.isDefined($attrs.stateOff) ? $scope.$parent.$eval($attrs.stateOff) : ratingConfig.stateOff;
    this.enableReset = angular.isDefined($attrs.enableReset) ?
      $scope.$parent.$eval($attrs.enableReset) : ratingConfig.enableReset;
    var tmpTitles = angular.isDefined($attrs.titles) ? $scope.$parent.$eval($attrs.titles) : ratingConfig.titles;
    this.titles = angular.isArray(tmpTitles) && tmpTitles.length > 0 ?
      tmpTitles : ratingConfig.titles;

    var ratingStates = angular.isDefined($attrs.ratingStates) ?
      $scope.$parent.$eval($attrs.ratingStates) :
      new Array(angular.isDefined($attrs.max) ? $scope.$parent.$eval($attrs.max) : ratingConfig.max);
    $scope.range = this.buildTemplateObjects(ratingStates);
  };

  this.buildTemplateObjects = function(states) {
    for (var i = 0, n = states.length; i < n; i++) {
      states[i] = angular.extend({ index: i }, { stateOn: this.stateOn, stateOff: this.stateOff, title: this.getTitle(i) }, states[i]);
    }
    return states;
  };

  this.getTitle = function(index) {
    if (index >= this.titles.length) {
      return index + 1;
    }

    return this.titles[index];
  };

  $scope.rate = function(value) {
    if (!$scope.readonly && value >= 0 && value <= $scope.range.length) {
      var newViewValue = self.enableReset && ngModelCtrl.$viewValue === value ? 0 : value;
      ngModelCtrl.$setViewValue(newViewValue);
      ngModelCtrl.$render();
    }
  };

  $scope.enter = function(value) {
    if (!$scope.readonly) {
      $scope.value = value;
    }
    $scope.onHover({value: value});
  };

  $scope.reset = function() {
    $scope.value = ngModelCtrl.$viewValue;
    $scope.onLeave();
  };

  $scope.onKeydown = function(evt) {
    if (/(37|38|39|40)/.test(evt.which)) {
      evt.preventDefault();
      evt.stopPropagation();
      $scope.rate($scope.value + (evt.which === 38 || evt.which === 39 ? 1 : -1));
    }
  };

  this.render = function() {
    $scope.value = ngModelCtrl.$viewValue;
    $scope.title = self.getTitle($scope.value - 1);
  };
}])

.directive('uibRating', function() {
  return {
    require: ['uibRating', 'ngModel'],
    restrict: 'A',
    scope: {
      readonly: '=?readOnly',
      onHover: '&',
      onLeave: '&'
    },
    controller: 'UibRatingController',
    templateUrl: 'uib/template/rating/rating.html',
    link: function(scope, element, attrs, ctrls) {
      var ratingCtrl = ctrls[0], ngModelCtrl = ctrls[1];
      ratingCtrl.init(ngModelCtrl);
    }
  };
});

angular.module('ui.bootstrap.tabs', [])

.controller('UibTabsetController', ['$scope', function ($scope) {
  var ctrl = this,
    oldIndex;
  ctrl.tabs = [];

  ctrl.select = function(index, evt) {
    if (!destroyed) {
      var previousIndex = findTabIndex(oldIndex);
      var previousSelected = ctrl.tabs[previousIndex];
      if (previousSelected) {
        previousSelected.tab.onDeselect({
          $event: evt,
          $selectedIndex: index
        });
        if (evt && evt.isDefaultPrevented()) {
          return;
        }
        previousSelected.tab.active = false;
      }

      var selected = ctrl.tabs[index];
      if (selected) {
        selected.tab.onSelect({
          $event: evt
        });
        selected.tab.active = true;
        ctrl.active = selected.index;
        oldIndex = selected.index;
      } else if (!selected && angular.isDefined(oldIndex)) {
        ctrl.active = null;
        oldIndex = null;
      }
    }
  };

  ctrl.addTab = function addTab(tab) {
    ctrl.tabs.push({
      tab: tab,
      index: tab.index
    });
    ctrl.tabs.sort(function(t1, t2) {
      if (t1.index > t2.index) {
        return 1;
      }

      if (t1.index < t2.index) {
        return -1;
      }

      return 0;
    });

    if (tab.index === ctrl.active || !angular.isDefined(ctrl.active) && ctrl.tabs.length === 1) {
      var newActiveIndex = findTabIndex(tab.index);
      ctrl.select(newActiveIndex);
    }
  };

  ctrl.removeTab = function removeTab(tab) {
    var index;
    for (var i = 0; i < ctrl.tabs.length; i++) {
      if (ctrl.tabs[i].tab === tab) {
        index = i;
        break;
      }
    }

    if (ctrl.tabs[index].index === ctrl.active) {
      var newActiveTabIndex = index === ctrl.tabs.length - 1 ?
        index - 1 : index + 1 % ctrl.tabs.length;
      ctrl.select(newActiveTabIndex);
    }

    ctrl.tabs.splice(index, 1);
  };

  $scope.$watch('tabset.active', function(val) {
    if (angular.isDefined(val) && val !== oldIndex) {
      ctrl.select(findTabIndex(val));
    }
  });

  var destroyed;
  $scope.$on('$destroy', function() {
    destroyed = true;
  });

  function findTabIndex(index) {
    for (var i = 0; i < ctrl.tabs.length; i++) {
      if (ctrl.tabs[i].index === index) {
        return i;
      }
    }
  }
}])

.directive('uibTabset', function() {
  return {
    transclude: true,
    replace: true,
    scope: {},
    bindToController: {
      active: '=?',
      type: '@'
    },
    controller: 'UibTabsetController',
    controllerAs: 'tabset',
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'uib/template/tabs/tabset.html';
    },
    link: function(scope, element, attrs) {
      scope.vertical = angular.isDefined(attrs.vertical) ?
        scope.$parent.$eval(attrs.vertical) : false;
      scope.justified = angular.isDefined(attrs.justified) ?
        scope.$parent.$eval(attrs.justified) : false;
    }
  };
})

.directive('uibTab', ['$parse', function($parse) {
  return {
    require: '^uibTabset',
    replace: true,
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'uib/template/tabs/tab.html';
    },
    transclude: true,
    scope: {
      heading: '@',
      index: '=?',
      classes: '@?',
      onSelect: '&select', //This callback is called in contentHeadingTransclude
                          //once it inserts the tab's content into the dom
      onDeselect: '&deselect'
    },
    controller: function() {
      //Empty controller so other directives can require being 'under' a tab
    },
    controllerAs: 'tab',
    link: function(scope, elm, attrs, tabsetCtrl, transclude) {
      scope.disabled = false;
      if (attrs.disable) {
        scope.$parent.$watch($parse(attrs.disable), function(value) {
          scope.disabled = !! value;
        });
      }

      if (angular.isUndefined(attrs.index)) {
        if (tabsetCtrl.tabs && tabsetCtrl.tabs.length) {
          scope.index = Math.max.apply(null, tabsetCtrl.tabs.map(function(t) { return t.index; })) + 1;
        } else {
          scope.index = 0;
        }
      }

      if (angular.isUndefined(attrs.classes)) {
        scope.classes = '';
      }

      scope.select = function(evt) {
        if (!scope.disabled) {
          var index;
          for (var i = 0; i < tabsetCtrl.tabs.length; i++) {
            if (tabsetCtrl.tabs[i].tab === scope) {
              index = i;
              break;
            }
          }

          tabsetCtrl.select(index, evt);
        }
      };

      tabsetCtrl.addTab(scope);
      scope.$on('$destroy', function() {
        tabsetCtrl.removeTab(scope);
      });

      //We need to transclude later, once the content container is ready.
      //when this link happens, we're inside a tab heading.
      scope.$transcludeFn = transclude;
    }
  };
}])

.directive('uibTabHeadingTransclude', function() {
  return {
    restrict: 'A',
    require: '^uibTab',
    link: function(scope, elm) {
      scope.$watch('headingElement', function updateHeadingElement(heading) {
        if (heading) {
          elm.html('');
          elm.append(heading);
        }
      });
    }
  };
})

.directive('uibTabContentTransclude', function() {
  return {
    restrict: 'A',
    require: '^uibTabset',
    link: function(scope, elm, attrs) {
      var tab = scope.$eval(attrs.uibTabContentTransclude).tab;

      //Now our tab is ready to be transcluded: both the tab heading area
      //and the tab content area are loaded.  Transclude 'em both.
      tab.$transcludeFn(tab.$parent, function(contents) {
        angular.forEach(contents, function(node) {
          if (isTabHeading(node)) {
            //Let tabHeadingTransclude know.
            tab.headingElement = node;
          } else {
            elm.append(node);
          }
        });
      });
    }
  };

  function isTabHeading(node) {
    return node.tagName && (
      node.hasAttribute('uib-tab-heading') ||
      node.hasAttribute('data-uib-tab-heading') ||
      node.hasAttribute('x-uib-tab-heading') ||
      node.tagName.toLowerCase() === 'uib-tab-heading' ||
      node.tagName.toLowerCase() === 'data-uib-tab-heading' ||
      node.tagName.toLowerCase() === 'x-uib-tab-heading' ||
      node.tagName.toLowerCase() === 'uib:tab-heading'
    );
  }
});

angular.module('ui.bootstrap.timepicker', [])

.constant('uibTimepickerConfig', {
  hourStep: 1,
  minuteStep: 1,
  secondStep: 1,
  showMeridian: true,
  showSeconds: false,
  meridians: null,
  readonlyInput: false,
  mousewheel: true,
  arrowkeys: true,
  showSpinners: true,
  templateUrl: 'uib/template/timepicker/timepicker.html'
})

.controller('UibTimepickerController', ['$scope', '$element', '$attrs', '$parse', '$log', '$locale', 'uibTimepickerConfig', function($scope, $element, $attrs, $parse, $log, $locale, timepickerConfig) {
  var hoursModelCtrl, minutesModelCtrl, secondsModelCtrl;
  var selected = new Date(),
    watchers = [],
    ngModelCtrl = { $setViewValue: angular.noop }, // nullModelCtrl
    meridians = angular.isDefined($attrs.meridians) ? $scope.$parent.$eval($attrs.meridians) : timepickerConfig.meridians || $locale.DATETIME_FORMATS.AMPMS,
    padHours = angular.isDefined($attrs.padHours) ? $scope.$parent.$eval($attrs.padHours) : true;

  $scope.tabindex = angular.isDefined($attrs.tabindex) ? $attrs.tabindex : 0;
  $element.removeAttr('tabindex');

  this.init = function(ngModelCtrl_, inputs) {
    ngModelCtrl = ngModelCtrl_;
    ngModelCtrl.$render = this.render;

    ngModelCtrl.$formatters.unshift(function(modelValue) {
      return modelValue ? new Date(modelValue) : null;
    });

    var hoursInputEl = inputs.eq(0),
        minutesInputEl = inputs.eq(1),
        secondsInputEl = inputs.eq(2);

    hoursModelCtrl = hoursInputEl.controller('ngModel');
    minutesModelCtrl = minutesInputEl.controller('ngModel');
    secondsModelCtrl = secondsInputEl.controller('ngModel');

    var mousewheel = angular.isDefined($attrs.mousewheel) ? $scope.$parent.$eval($attrs.mousewheel) : timepickerConfig.mousewheel;

    if (mousewheel) {
      this.setupMousewheelEvents(hoursInputEl, minutesInputEl, secondsInputEl);
    }

    var arrowkeys = angular.isDefined($attrs.arrowkeys) ? $scope.$parent.$eval($attrs.arrowkeys) : timepickerConfig.arrowkeys;
    if (arrowkeys) {
      this.setupArrowkeyEvents(hoursInputEl, minutesInputEl, secondsInputEl);
    }

    $scope.readonlyInput = angular.isDefined($attrs.readonlyInput) ? $scope.$parent.$eval($attrs.readonlyInput) : timepickerConfig.readonlyInput;
    this.setupInputEvents(hoursInputEl, minutesInputEl, secondsInputEl);
  };

  var hourStep = timepickerConfig.hourStep;
  if ($attrs.hourStep) {
    watchers.push($scope.$parent.$watch($parse($attrs.hourStep), function(value) {
      hourStep = +value;
    }));
  }

  var minuteStep = timepickerConfig.minuteStep;
  if ($attrs.minuteStep) {
    watchers.push($scope.$parent.$watch($parse($attrs.minuteStep), function(value) {
      minuteStep = +value;
    }));
  }

  var min;
  watchers.push($scope.$parent.$watch($parse($attrs.min), function(value) {
    var dt = new Date(value);
    min = isNaN(dt) ? undefined : dt;
  }));

  var max;
  watchers.push($scope.$parent.$watch($parse($attrs.max), function(value) {
    var dt = new Date(value);
    max = isNaN(dt) ? undefined : dt;
  }));

  var disabled = false;
  if ($attrs.ngDisabled) {
    watchers.push($scope.$parent.$watch($parse($attrs.ngDisabled), function(value) {
      disabled = value;
    }));
  }

  $scope.noIncrementHours = function() {
    var incrementedSelected = addMinutes(selected, hourStep * 60);
    return disabled || incrementedSelected > max ||
      incrementedSelected < selected && incrementedSelected < min;
  };

  $scope.noDecrementHours = function() {
    var decrementedSelected = addMinutes(selected, -hourStep * 60);
    return disabled || decrementedSelected < min ||
      decrementedSelected > selected && decrementedSelected > max;
  };

  $scope.noIncrementMinutes = function() {
    var incrementedSelected = addMinutes(selected, minuteStep);
    return disabled || incrementedSelected > max ||
      incrementedSelected < selected && incrementedSelected < min;
  };

  $scope.noDecrementMinutes = function() {
    var decrementedSelected = addMinutes(selected, -minuteStep);
    return disabled || decrementedSelected < min ||
      decrementedSelected > selected && decrementedSelected > max;
  };

  $scope.noIncrementSeconds = function() {
    var incrementedSelected = addSeconds(selected, secondStep);
    return disabled || incrementedSelected > max ||
      incrementedSelected < selected && incrementedSelected < min;
  };

  $scope.noDecrementSeconds = function() {
    var decrementedSelected = addSeconds(selected, -secondStep);
    return disabled || decrementedSelected < min ||
      decrementedSelected > selected && decrementedSelected > max;
  };

  $scope.noToggleMeridian = function() {
    if (selected.getHours() < 12) {
      return disabled || addMinutes(selected, 12 * 60) > max;
    }

    return disabled || addMinutes(selected, -12 * 60) < min;
  };

  var secondStep = timepickerConfig.secondStep;
  if ($attrs.secondStep) {
    watchers.push($scope.$parent.$watch($parse($attrs.secondStep), function(value) {
      secondStep = +value;
    }));
  }

  $scope.showSeconds = timepickerConfig.showSeconds;
  if ($attrs.showSeconds) {
    watchers.push($scope.$parent.$watch($parse($attrs.showSeconds), function(value) {
      $scope.showSeconds = !!value;
    }));
  }

  // 12H / 24H mode
  $scope.showMeridian = timepickerConfig.showMeridian;
  if ($attrs.showMeridian) {
    watchers.push($scope.$parent.$watch($parse($attrs.showMeridian), function(value) {
      $scope.showMeridian = !!value;

      if (ngModelCtrl.$error.time) {
        // Evaluate from template
        var hours = getHoursFromTemplate(), minutes = getMinutesFromTemplate();
        if (angular.isDefined(hours) && angular.isDefined(minutes)) {
          selected.setHours(hours);
          refresh();
        }
      } else {
        updateTemplate();
      }
    }));
  }

  // Get $scope.hours in 24H mode if valid
  function getHoursFromTemplate() {
    var hours = +$scope.hours;
    var valid = $scope.showMeridian ? hours > 0 && hours < 13 :
      hours >= 0 && hours < 24;
    if (!valid || $scope.hours === '') {
      return undefined;
    }

    if ($scope.showMeridian) {
      if (hours === 12) {
        hours = 0;
      }
      if ($scope.meridian === meridians[1]) {
        hours = hours + 12;
      }
    }
    return hours;
  }

  function getMinutesFromTemplate() {
    var minutes = +$scope.minutes;
    var valid = minutes >= 0 && minutes < 60;
    if (!valid || $scope.minutes === '') {
      return undefined;
    }
    return minutes;
  }

  function getSecondsFromTemplate() {
    var seconds = +$scope.seconds;
    return seconds >= 0 && seconds < 60 ? seconds : undefined;
  }

  function pad(value, noPad) {
    if (value === null) {
      return '';
    }

    return angular.isDefined(value) && value.toString().length < 2 && !noPad ?
      '0' + value : value.toString();
  }

  // Respond on mousewheel spin
  this.setupMousewheelEvents = function(hoursInputEl, minutesInputEl, secondsInputEl) {
    var isScrollingUp = function(e) {
      if (e.originalEvent) {
        e = e.originalEvent;
      }
      //pick correct delta variable depending on event
      var delta = e.wheelDelta ? e.wheelDelta : -e.deltaY;
      return e.detail || delta > 0;
    };

    hoursInputEl.on('mousewheel wheel', function(e) {
      if (!disabled) {
        $scope.$apply(isScrollingUp(e) ? $scope.incrementHours() : $scope.decrementHours());
      }
      e.preventDefault();
    });

    minutesInputEl.on('mousewheel wheel', function(e) {
      if (!disabled) {
        $scope.$apply(isScrollingUp(e) ? $scope.incrementMinutes() : $scope.decrementMinutes());
      }
      e.preventDefault();
    });

     secondsInputEl.on('mousewheel wheel', function(e) {
      if (!disabled) {
        $scope.$apply(isScrollingUp(e) ? $scope.incrementSeconds() : $scope.decrementSeconds());
      }
      e.preventDefault();
    });
  };

  // Respond on up/down arrowkeys
  this.setupArrowkeyEvents = function(hoursInputEl, minutesInputEl, secondsInputEl) {
    hoursInputEl.on('keydown', function(e) {
      if (!disabled) {
        if (e.which === 38) { // up
          e.preventDefault();
          $scope.incrementHours();
          $scope.$apply();
        } else if (e.which === 40) { // down
          e.preventDefault();
          $scope.decrementHours();
          $scope.$apply();
        }
      }
    });

    minutesInputEl.on('keydown', function(e) {
      if (!disabled) {
        if (e.which === 38) { // up
          e.preventDefault();
          $scope.incrementMinutes();
          $scope.$apply();
        } else if (e.which === 40) { // down
          e.preventDefault();
          $scope.decrementMinutes();
          $scope.$apply();
        }
      }
    });

    secondsInputEl.on('keydown', function(e) {
      if (!disabled) {
        if (e.which === 38) { // up
          e.preventDefault();
          $scope.incrementSeconds();
          $scope.$apply();
        } else if (e.which === 40) { // down
          e.preventDefault();
          $scope.decrementSeconds();
          $scope.$apply();
        }
      }
    });
  };

  this.setupInputEvents = function(hoursInputEl, minutesInputEl, secondsInputEl) {
    if ($scope.readonlyInput) {
      $scope.updateHours = angular.noop;
      $scope.updateMinutes = angular.noop;
      $scope.updateSeconds = angular.noop;
      return;
    }

    var invalidate = function(invalidHours, invalidMinutes, invalidSeconds) {
      ngModelCtrl.$setViewValue(null);
      ngModelCtrl.$setValidity('time', false);
      if (angular.isDefined(invalidHours)) {
        $scope.invalidHours = invalidHours;
        if (hoursModelCtrl) {
          hoursModelCtrl.$setValidity('hours', false);
        }
      }

      if (angular.isDefined(invalidMinutes)) {
        $scope.invalidMinutes = invalidMinutes;
        if (minutesModelCtrl) {
          minutesModelCtrl.$setValidity('minutes', false);
        }
      }

      if (angular.isDefined(invalidSeconds)) {
        $scope.invalidSeconds = invalidSeconds;
        if (secondsModelCtrl) {
          secondsModelCtrl.$setValidity('seconds', false);
        }
      }
    };

    $scope.updateHours = function() {
      var hours = getHoursFromTemplate(),
        minutes = getMinutesFromTemplate();

      ngModelCtrl.$setDirty();

      if (angular.isDefined(hours) && angular.isDefined(minutes)) {
        selected.setHours(hours);
        selected.setMinutes(minutes);
        if (selected < min || selected > max) {
          invalidate(true);
        } else {
          refresh('h');
        }
      } else {
        invalidate(true);
      }
    };

    hoursInputEl.on('blur', function(e) {
      ngModelCtrl.$setTouched();
      if (modelIsEmpty()) {
        makeValid();
      } else if ($scope.hours === null || $scope.hours === '') {
        invalidate(true);
      } else if (!$scope.invalidHours && $scope.hours < 10) {
        $scope.$apply(function() {
          $scope.hours = pad($scope.hours, !padHours);
        });
      }
    });

    $scope.updateMinutes = function() {
      var minutes = getMinutesFromTemplate(),
        hours = getHoursFromTemplate();

      ngModelCtrl.$setDirty();

      if (angular.isDefined(minutes) && angular.isDefined(hours)) {
        selected.setHours(hours);
        selected.setMinutes(minutes);
        if (selected < min || selected > max) {
          invalidate(undefined, true);
        } else {
          refresh('m');
        }
      } else {
        invalidate(undefined, true);
      }
    };

    minutesInputEl.on('blur', function(e) {
      ngModelCtrl.$setTouched();
      if (modelIsEmpty()) {
        makeValid();
      } else if ($scope.minutes === null) {
        invalidate(undefined, true);
      } else if (!$scope.invalidMinutes && $scope.minutes < 10) {
        $scope.$apply(function() {
          $scope.minutes = pad($scope.minutes);
        });
      }
    });

    $scope.updateSeconds = function() {
      var seconds = getSecondsFromTemplate();

      ngModelCtrl.$setDirty();

      if (angular.isDefined(seconds)) {
        selected.setSeconds(seconds);
        refresh('s');
      } else {
        invalidate(undefined, undefined, true);
      }
    };

    secondsInputEl.on('blur', function(e) {
      if (modelIsEmpty()) {
        makeValid();
      } else if (!$scope.invalidSeconds && $scope.seconds < 10) {
        $scope.$apply( function() {
          $scope.seconds = pad($scope.seconds);
        });
      }
    });

  };

  this.render = function() {
    var date = ngModelCtrl.$viewValue;

    if (isNaN(date)) {
      ngModelCtrl.$setValidity('time', false);
      $log.error('Timepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.');
    } else {
      if (date) {
        selected = date;
      }

      if (selected < min || selected > max) {
        ngModelCtrl.$setValidity('time', false);
        $scope.invalidHours = true;
        $scope.invalidMinutes = true;
      } else {
        makeValid();
      }
      updateTemplate();
    }
  };

  // Call internally when we know that model is valid.
  function refresh(keyboardChange) {
    makeValid();
    ngModelCtrl.$setViewValue(new Date(selected));
    updateTemplate(keyboardChange);
  }

  function makeValid() {
    if (hoursModelCtrl) {
      hoursModelCtrl.$setValidity('hours', true);
    }

    if (minutesModelCtrl) {
      minutesModelCtrl.$setValidity('minutes', true);
    }

    if (secondsModelCtrl) {
      secondsModelCtrl.$setValidity('seconds', true);
    }

    ngModelCtrl.$setValidity('time', true);
    $scope.invalidHours = false;
    $scope.invalidMinutes = false;
    $scope.invalidSeconds = false;
  }

  function updateTemplate(keyboardChange) {
    if (!ngModelCtrl.$modelValue) {
      $scope.hours = null;
      $scope.minutes = null;
      $scope.seconds = null;
      $scope.meridian = meridians[0];
    } else {
      var hours = selected.getHours(),
        minutes = selected.getMinutes(),
        seconds = selected.getSeconds();

      if ($scope.showMeridian) {
        hours = hours === 0 || hours === 12 ? 12 : hours % 12; // Convert 24 to 12 hour system
      }

      $scope.hours = keyboardChange === 'h' ? hours : pad(hours, !padHours);
      if (keyboardChange !== 'm') {
        $scope.minutes = pad(minutes);
      }
      $scope.meridian = selected.getHours() < 12 ? meridians[0] : meridians[1];

      if (keyboardChange !== 's') {
        $scope.seconds = pad(seconds);
      }
      $scope.meridian = selected.getHours() < 12 ? meridians[0] : meridians[1];
    }
  }

  function addSecondsToSelected(seconds) {
    selected = addSeconds(selected, seconds);
    refresh();
  }

  function addMinutes(selected, minutes) {
    return addSeconds(selected, minutes*60);
  }

  function addSeconds(date, seconds) {
    var dt = new Date(date.getTime() + seconds * 1000);
    var newDate = new Date(date);
    newDate.setHours(dt.getHours(), dt.getMinutes(), dt.getSeconds());
    return newDate;
  }

  function modelIsEmpty() {
    return ($scope.hours === null || $scope.hours === '') &&
      ($scope.minutes === null || $scope.minutes === '') &&
      (!$scope.showSeconds || $scope.showSeconds && ($scope.seconds === null || $scope.seconds === ''));
  }

  $scope.showSpinners = angular.isDefined($attrs.showSpinners) ?
    $scope.$parent.$eval($attrs.showSpinners) : timepickerConfig.showSpinners;

  $scope.incrementHours = function() {
    if (!$scope.noIncrementHours()) {
      addSecondsToSelected(hourStep * 60 * 60);
    }
  };

  $scope.decrementHours = function() {
    if (!$scope.noDecrementHours()) {
      addSecondsToSelected(-hourStep * 60 * 60);
    }
  };

  $scope.incrementMinutes = function() {
    if (!$scope.noIncrementMinutes()) {
      addSecondsToSelected(minuteStep * 60);
    }
  };

  $scope.decrementMinutes = function() {
    if (!$scope.noDecrementMinutes()) {
      addSecondsToSelected(-minuteStep * 60);
    }
  };

  $scope.incrementSeconds = function() {
    if (!$scope.noIncrementSeconds()) {
      addSecondsToSelected(secondStep);
    }
  };

  $scope.decrementSeconds = function() {
    if (!$scope.noDecrementSeconds()) {
      addSecondsToSelected(-secondStep);
    }
  };

  $scope.toggleMeridian = function() {
    var minutes = getMinutesFromTemplate(),
        hours = getHoursFromTemplate();

    if (!$scope.noToggleMeridian()) {
      if (angular.isDefined(minutes) && angular.isDefined(hours)) {
        addSecondsToSelected(12 * 60 * (selected.getHours() < 12 ? 60 : -60));
      } else {
        $scope.meridian = $scope.meridian === meridians[0] ? meridians[1] : meridians[0];
      }
    }
  };

  $scope.blur = function() {
    ngModelCtrl.$setTouched();
  };

  $scope.$on('$destroy', function() {
    while (watchers.length) {
      watchers.shift()();
    }
  });
}])

.directive('uibTimepicker', ['uibTimepickerConfig', function(uibTimepickerConfig) {
  return {
    require: ['uibTimepicker', '?^ngModel'],
    restrict: 'A',
    controller: 'UibTimepickerController',
    controllerAs: 'timepicker',
    scope: {},
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || uibTimepickerConfig.templateUrl;
    },
    link: function(scope, element, attrs, ctrls) {
      var timepickerCtrl = ctrls[0], ngModelCtrl = ctrls[1];

      if (ngModelCtrl) {
        timepickerCtrl.init(ngModelCtrl, element.find('input'));
      }
    }
  };
}]);

angular.module('ui.bootstrap.typeahead', ['ui.bootstrap.debounce', 'ui.bootstrap.position'])

/**
 * A helper service that can parse typeahead's syntax (string provided by users)
 * Extracted to a separate service for ease of unit testing
 */
  .factory('uibTypeaheadParser', ['$parse', function($parse) {
    //                      000001111111100000000000002222222200000000000000003333333333333330000000000044444444000
    var TYPEAHEAD_REGEXP = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+([\s\S]+?)$/;
    return {
      parse: function(input) {
        var match = input.match(TYPEAHEAD_REGEXP);
        if (!match) {
          throw new Error(
            'Expected typeahead specification in form of "_modelValue_ (as _label_)? for _item_ in _collection_"' +
              ' but got "' + input + '".');
        }

        return {
          itemName: match[3],
          source: $parse(match[4]),
          viewMapper: $parse(match[2] || match[1]),
          modelMapper: $parse(match[1])
        };
      }
    };
  }])

  .controller('UibTypeaheadController', ['$scope', '$element', '$attrs', '$compile', '$parse', '$q', '$timeout', '$document', '$window', '$rootScope', '$$debounce', '$uibPosition', 'uibTypeaheadParser',
    function(originalScope, element, attrs, $compile, $parse, $q, $timeout, $document, $window, $rootScope, $$debounce, $position, typeaheadParser) {
    var HOT_KEYS = [9, 13, 27, 38, 40];
    var eventDebounceTime = 200;
    var modelCtrl, ngModelOptions;
    //SUPPORTED ATTRIBUTES (OPTIONS)

    //minimal no of characters that needs to be entered before typeahead kicks-in
    var minLength = originalScope.$eval(attrs.typeaheadMinLength);
    if (!minLength && minLength !== 0) {
      minLength = 1;
    }

    originalScope.$watch(attrs.typeaheadMinLength, function (newVal) {
        minLength = !newVal && newVal !== 0 ? 1 : newVal;
    });

    //minimal wait time after last character typed before typeahead kicks-in
    var waitTime = originalScope.$eval(attrs.typeaheadWaitMs) || 0;

    //should it restrict model values to the ones selected from the popup only?
    var isEditable = originalScope.$eval(attrs.typeaheadEditable) !== false;
    originalScope.$watch(attrs.typeaheadEditable, function (newVal) {
      isEditable = newVal !== false;
    });

    //binding to a variable that indicates if matches are being retrieved asynchronously
    var isLoadingSetter = $parse(attrs.typeaheadLoading).assign || angular.noop;

    //a function to determine if an event should cause selection
    var isSelectEvent = attrs.typeaheadShouldSelect ? $parse(attrs.typeaheadShouldSelect) : function(scope, vals) {
      var evt = vals.$event;
      return evt.which === 13 || evt.which === 9;
    };

    //a callback executed when a match is selected
    var onSelectCallback = $parse(attrs.typeaheadOnSelect);

    //should it select highlighted popup value when losing focus?
    var isSelectOnBlur = angular.isDefined(attrs.typeaheadSelectOnBlur) ? originalScope.$eval(attrs.typeaheadSelectOnBlur) : false;

    //binding to a variable that indicates if there were no results after the query is completed
    var isNoResultsSetter = $parse(attrs.typeaheadNoResults).assign || angular.noop;

    var inputFormatter = attrs.typeaheadInputFormatter ? $parse(attrs.typeaheadInputFormatter) : undefined;

    var appendToBody = attrs.typeaheadAppendToBody ? originalScope.$eval(attrs.typeaheadAppendToBody) : false;

    var appendTo = attrs.typeaheadAppendTo ?
      originalScope.$eval(attrs.typeaheadAppendTo) : null;

    var focusFirst = originalScope.$eval(attrs.typeaheadFocusFirst) !== false;

    //If input matches an item of the list exactly, select it automatically
    var selectOnExact = attrs.typeaheadSelectOnExact ? originalScope.$eval(attrs.typeaheadSelectOnExact) : false;

    //binding to a variable that indicates if dropdown is open
    var isOpenSetter = $parse(attrs.typeaheadIsOpen).assign || angular.noop;

    var showHint = originalScope.$eval(attrs.typeaheadShowHint) || false;

    //INTERNAL VARIABLES

    //model setter executed upon match selection
    var parsedModel = $parse(attrs.ngModel);
    var invokeModelSetter = $parse(attrs.ngModel + '($$$p)');
    var $setModelValue = function(scope, newValue) {
      if (angular.isFunction(parsedModel(originalScope)) &&
        ngModelOptions.getOption('getterSetter')) {
        return invokeModelSetter(scope, {$$$p: newValue});
      }

      return parsedModel.assign(scope, newValue);
    };

    //expressions used by typeahead
    var parserResult = typeaheadParser.parse(attrs.uibTypeahead);

    var hasFocus;

    //Used to avoid bug in iOS webview where iOS keyboard does not fire
    //mousedown & mouseup events
    //Issue #3699
    var selected;

    //create a child scope for the typeahead directive so we are not polluting original scope
    //with typeahead-specific data (matches, query etc.)
    var scope = originalScope.$new();
    var offDestroy = originalScope.$on('$destroy', function() {
      scope.$destroy();
    });
    scope.$on('$destroy', offDestroy);

    // WAI-ARIA
    var popupId = 'typeahead-' + scope.$id + '-' + Math.floor(Math.random() * 10000);
    element.attr({
      'aria-autocomplete': 'list',
      'aria-expanded': false,
      'aria-owns': popupId
    });

    var inputsContainer, hintInputElem;
    //add read-only input to show hint
    if (showHint) {
      inputsContainer = angular.element('<div></div>');
      inputsContainer.css('position', 'relative');
      element.after(inputsContainer);
      hintInputElem = element.clone();
      hintInputElem.attr('placeholder', '');
      hintInputElem.attr('tabindex', '-1');
      hintInputElem.val('');
      hintInputElem.css({
        'position': 'absolute',
        'top': '0px',
        'left': '0px',
        'border-color': 'transparent',
        'box-shadow': 'none',
        'opacity': 1,
        'background': 'none 0% 0% / auto repeat scroll padding-box border-box rgb(255, 255, 255)',
        'color': '#999'
      });
      element.css({
        'position': 'relative',
        'vertical-align': 'top',
        'background-color': 'transparent'
      });

      if (hintInputElem.attr('id')) {
        hintInputElem.removeAttr('id'); // remove duplicate id if present.
      }
      inputsContainer.append(hintInputElem);
      hintInputElem.after(element);
    }

    //pop-up element used to display matches
    var popUpEl = angular.element('<div uib-typeahead-popup></div>');
    popUpEl.attr({
      id: popupId,
      matches: 'matches',
      active: 'activeIdx',
      select: 'select(activeIdx, evt)',
      'move-in-progress': 'moveInProgress',
      query: 'query',
      position: 'position',
      'assign-is-open': 'assignIsOpen(isOpen)',
      debounce: 'debounceUpdate'
    });
    //custom item template
    if (angular.isDefined(attrs.typeaheadTemplateUrl)) {
      popUpEl.attr('template-url', attrs.typeaheadTemplateUrl);
    }

    if (angular.isDefined(attrs.typeaheadPopupTemplateUrl)) {
      popUpEl.attr('popup-template-url', attrs.typeaheadPopupTemplateUrl);
    }

    var resetHint = function() {
      if (showHint) {
        hintInputElem.val('');
      }
    };

    var resetMatches = function() {
      scope.matches = [];
      scope.activeIdx = -1;
      element.attr('aria-expanded', false);
      resetHint();
    };

    var getMatchId = function(index) {
      return popupId + '-option-' + index;
    };

    // Indicate that the specified match is the active (pre-selected) item in the list owned by this typeahead.
    // This attribute is added or removed automatically when the `activeIdx` changes.
    scope.$watch('activeIdx', function(index) {
      if (index < 0) {
        element.removeAttr('aria-activedescendant');
      } else {
        element.attr('aria-activedescendant', getMatchId(index));
      }
    });

    var inputIsExactMatch = function(inputValue, index) {
      if (scope.matches.length > index && inputValue) {
        return inputValue.toUpperCase() === scope.matches[index].label.toUpperCase();
      }

      return false;
    };

    var getMatchesAsync = function(inputValue, evt) {
      var locals = {$viewValue: inputValue};
      isLoadingSetter(originalScope, true);
      isNoResultsSetter(originalScope, false);
      $q.when(parserResult.source(originalScope, locals)).then(function(matches) {
        //it might happen that several async queries were in progress if a user were typing fast
        //but we are interested only in responses that correspond to the current view value
        var onCurrentRequest = inputValue === modelCtrl.$viewValue;
        if (onCurrentRequest && hasFocus) {
          if (matches && matches.length > 0) {
            scope.activeIdx = focusFirst ? 0 : -1;
            isNoResultsSetter(originalScope, false);
            scope.matches.length = 0;

            //transform labels
            for (var i = 0; i < matches.length; i++) {
              locals[parserResult.itemName] = matches[i];
              scope.matches.push({
                id: getMatchId(i),
                label: parserResult.viewMapper(scope, locals),
                model: matches[i]
              });
            }

            scope.query = inputValue;
            //position pop-up with matches - we need to re-calculate its position each time we are opening a window
            //with matches as a pop-up might be absolute-positioned and position of an input might have changed on a page
            //due to other elements being rendered
            recalculatePosition();

            element.attr('aria-expanded', true);

            //Select the single remaining option if user input matches
            if (selectOnExact && scope.matches.length === 1 && inputIsExactMatch(inputValue, 0)) {
              if (angular.isNumber(scope.debounceUpdate) || angular.isObject(scope.debounceUpdate)) {
                $$debounce(function() {
                  scope.select(0, evt);
                }, angular.isNumber(scope.debounceUpdate) ? scope.debounceUpdate : scope.debounceUpdate['default']);
              } else {
                scope.select(0, evt);
              }
            }

            if (showHint) {
              var firstLabel = scope.matches[0].label;
              if (angular.isString(inputValue) &&
                inputValue.length > 0 &&
                firstLabel.slice(0, inputValue.length).toUpperCase() === inputValue.toUpperCase()) {
                hintInputElem.val(inputValue + firstLabel.slice(inputValue.length));
              } else {
                hintInputElem.val('');
              }
            }
          } else {
            resetMatches();
            isNoResultsSetter(originalScope, true);
          }
        }
        if (onCurrentRequest) {
          isLoadingSetter(originalScope, false);
        }
      }, function() {
        resetMatches();
        isLoadingSetter(originalScope, false);
        isNoResultsSetter(originalScope, true);
      });
    };

    // bind events only if appendToBody params exist - performance feature
    if (appendToBody) {
      angular.element($window).on('resize', fireRecalculating);
      $document.find('body').on('scroll', fireRecalculating);
    }

    // Declare the debounced function outside recalculating for
    // proper debouncing
    var debouncedRecalculate = $$debounce(function() {
      // if popup is visible
      if (scope.matches.length) {
        recalculatePosition();
      }

      scope.moveInProgress = false;
    }, eventDebounceTime);

    // Default progress type
    scope.moveInProgress = false;

    function fireRecalculating() {
      if (!scope.moveInProgress) {
        scope.moveInProgress = true;
        scope.$digest();
      }

      debouncedRecalculate();
    }

    // recalculate actual position and set new values to scope
    // after digest loop is popup in right position
    function recalculatePosition() {
      scope.position = appendToBody ? $position.offset(element) : $position.position(element);
      scope.position.top += element.prop('offsetHeight');
    }

    //we need to propagate user's query so we can higlight matches
    scope.query = undefined;

    //Declare the timeout promise var outside the function scope so that stacked calls can be cancelled later
    var timeoutPromise;

    var scheduleSearchWithTimeout = function(inputValue) {
      timeoutPromise = $timeout(function() {
        getMatchesAsync(inputValue);
      }, waitTime);
    };

    var cancelPreviousTimeout = function() {
      if (timeoutPromise) {
        $timeout.cancel(timeoutPromise);
      }
    };

    resetMatches();

    scope.assignIsOpen = function (isOpen) {
      isOpenSetter(originalScope, isOpen);
    };

    scope.select = function(activeIdx, evt) {
      //called from within the $digest() cycle
      var locals = {};
      var model, item;

      selected = true;
      locals[parserResult.itemName] = item = scope.matches[activeIdx].model;
      model = parserResult.modelMapper(originalScope, locals);
      $setModelValue(originalScope, model);
      modelCtrl.$setValidity('editable', true);
      modelCtrl.$setValidity('parse', true);

      onSelectCallback(originalScope, {
        $item: item,
        $model: model,
        $label: parserResult.viewMapper(originalScope, locals),
        $event: evt
      });

      resetMatches();

      //return focus to the input element if a match was selected via a mouse click event
      // use timeout to avoid $rootScope:inprog error
      if (scope.$eval(attrs.typeaheadFocusOnSelect) !== false) {
        $timeout(function() { element[0].focus(); }, 0, false);
      }
    };

    //bind keyboard events: arrows up(38) / down(40), enter(13) and tab(9), esc(27)
    element.on('keydown', function(evt) {
      //typeahead is open and an "interesting" key was pressed
      if (scope.matches.length === 0 || HOT_KEYS.indexOf(evt.which) === -1) {
        return;
      }

      var shouldSelect = isSelectEvent(originalScope, {$event: evt});

      /**
       * if there's nothing selected (i.e. focusFirst) and enter or tab is hit
       * or
       * shift + tab is pressed to bring focus to the previous element
       * then clear the results
       */
      if (scope.activeIdx === -1 && shouldSelect || evt.which === 9 && !!evt.shiftKey) {
        resetMatches();
        scope.$digest();
        return;
      }

      evt.preventDefault();
      var target;
      switch (evt.which) {
        case 27: // escape
          evt.stopPropagation();

          resetMatches();
          originalScope.$digest();
          break;
        case 38: // up arrow
          scope.activeIdx = (scope.activeIdx > 0 ? scope.activeIdx : scope.matches.length) - 1;
          scope.$digest();
          target = popUpEl[0].querySelectorAll('.uib-typeahead-match')[scope.activeIdx];
          target.parentNode.scrollTop = target.offsetTop;
          break;
        case 40: // down arrow
          scope.activeIdx = (scope.activeIdx + 1) % scope.matches.length;
          scope.$digest();
          target = popUpEl[0].querySelectorAll('.uib-typeahead-match')[scope.activeIdx];
          target.parentNode.scrollTop = target.offsetTop;
          break;
        default:
          if (shouldSelect) {
            scope.$apply(function() {
              if (angular.isNumber(scope.debounceUpdate) || angular.isObject(scope.debounceUpdate)) {
                $$debounce(function() {
                  scope.select(scope.activeIdx, evt);
                }, angular.isNumber(scope.debounceUpdate) ? scope.debounceUpdate : scope.debounceUpdate['default']);
              } else {
                scope.select(scope.activeIdx, evt);
              }
            });
          }
      }
    });

    element.on('focus', function (evt) {
      hasFocus = true;
      if (minLength === 0 && !modelCtrl.$viewValue) {
        $timeout(function() {
          getMatchesAsync(modelCtrl.$viewValue, evt);
        }, 0);
      }
    });

    element.on('blur', function(evt) {
      if (isSelectOnBlur && scope.matches.length && scope.activeIdx !== -1 && !selected) {
        selected = true;
        scope.$apply(function() {
          if (angular.isObject(scope.debounceUpdate) && angular.isNumber(scope.debounceUpdate.blur)) {
            $$debounce(function() {
              scope.select(scope.activeIdx, evt);
            }, scope.debounceUpdate.blur);
          } else {
            scope.select(scope.activeIdx, evt);
          }
        });
      }
      if (!isEditable && modelCtrl.$error.editable) {
        modelCtrl.$setViewValue();
        scope.$apply(function() {
          // Reset validity as we are clearing
          modelCtrl.$setValidity('editable', true);
          modelCtrl.$setValidity('parse', true);
        });
        element.val('');
      }
      hasFocus = false;
      selected = false;
    });

    // Keep reference to click handler to unbind it.
    var dismissClickHandler = function(evt) {
      // Issue #3973
      // Firefox treats right click as a click on document
      if (element[0] !== evt.target && evt.which !== 3 && scope.matches.length !== 0) {
        resetMatches();
        if (!$rootScope.$$phase) {
          originalScope.$digest();
        }
      }
    };

    $document.on('click', dismissClickHandler);

    originalScope.$on('$destroy', function() {
      $document.off('click', dismissClickHandler);
      if (appendToBody || appendTo) {
        $popup.remove();
      }

      if (appendToBody) {
        angular.element($window).off('resize', fireRecalculating);
        $document.find('body').off('scroll', fireRecalculating);
      }
      // Prevent jQuery cache memory leak
      popUpEl.remove();

      if (showHint) {
          inputsContainer.remove();
      }
    });

    var $popup = $compile(popUpEl)(scope);

    if (appendToBody) {
      $document.find('body').append($popup);
    } else if (appendTo) {
      angular.element(appendTo).eq(0).append($popup);
    } else {
      element.after($popup);
    }

    this.init = function(_modelCtrl) {
      modelCtrl = _modelCtrl;
      ngModelOptions = extractOptions(modelCtrl);

      scope.debounceUpdate = $parse(ngModelOptions.getOption('debounce'))(originalScope);

      //plug into $parsers pipeline to open a typeahead on view changes initiated from DOM
      //$parsers kick-in on all the changes coming from the view as well as manually triggered by $setViewValue
      modelCtrl.$parsers.unshift(function(inputValue) {
        hasFocus = true;

        if (minLength === 0 || inputValue && inputValue.length >= minLength) {
          if (waitTime > 0) {
            cancelPreviousTimeout();
            scheduleSearchWithTimeout(inputValue);
          } else {
            getMatchesAsync(inputValue);
          }
        } else {
          isLoadingSetter(originalScope, false);
          cancelPreviousTimeout();
          resetMatches();
        }

        if (isEditable) {
          return inputValue;
        }

        if (!inputValue) {
          // Reset in case user had typed something previously.
          modelCtrl.$setValidity('editable', true);
          return null;
        }

        modelCtrl.$setValidity('editable', false);
        return undefined;
      });

      modelCtrl.$formatters.push(function(modelValue) {
        var candidateViewValue, emptyViewValue;
        var locals = {};

        // The validity may be set to false via $parsers (see above) if
        // the model is restricted to selected values. If the model
        // is set manually it is considered to be valid.
        if (!isEditable) {
          modelCtrl.$setValidity('editable', true);
        }

        if (inputFormatter) {
          locals.$model = modelValue;
          return inputFormatter(originalScope, locals);
        }

        //it might happen that we don't have enough info to properly render input value
        //we need to check for this situation and simply return model value if we can't apply custom formatting
        locals[parserResult.itemName] = modelValue;
        candidateViewValue = parserResult.viewMapper(originalScope, locals);
        locals[parserResult.itemName] = undefined;
        emptyViewValue = parserResult.viewMapper(originalScope, locals);

        return candidateViewValue !== emptyViewValue ? candidateViewValue : modelValue;
      });
    };

    function extractOptions(ngModelCtrl) {
      var ngModelOptions;

      if (angular.version.minor < 6) { // in angular < 1.6 $options could be missing
        // guarantee a value
        ngModelOptions = ngModelCtrl.$options || {};

        // mimic 1.6+ api
        ngModelOptions.getOption = function (key) {
          return ngModelOptions[key];
        };
      } else { // in angular >=1.6 $options is always present
        ngModelOptions = ngModelCtrl.$options;
      }

      return ngModelOptions;
    }
  }])

  .directive('uibTypeahead', function() {
    return {
      controller: 'UibTypeaheadController',
      require: ['ngModel', 'uibTypeahead'],
      link: function(originalScope, element, attrs, ctrls) {
        ctrls[1].init(ctrls[0]);
      }
    };
  })

  .directive('uibTypeaheadPopup', ['$$debounce', function($$debounce) {
    return {
      scope: {
        matches: '=',
        query: '=',
        active: '=',
        position: '&',
        moveInProgress: '=',
        select: '&',
        assignIsOpen: '&',
        debounce: '&'
      },
      replace: true,
      templateUrl: function(element, attrs) {
        return attrs.popupTemplateUrl || 'uib/template/typeahead/typeahead-popup.html';
      },
      link: function(scope, element, attrs) {
        scope.templateUrl = attrs.templateUrl;

        scope.isOpen = function() {
          var isDropdownOpen = scope.matches.length > 0;
          scope.assignIsOpen({ isOpen: isDropdownOpen });
          return isDropdownOpen;
        };

        scope.isActive = function(matchIdx) {
          return scope.active === matchIdx;
        };

        scope.selectActive = function(matchIdx) {
          scope.active = matchIdx;
        };

        scope.selectMatch = function(activeIdx, evt) {
          var debounce = scope.debounce();
          if (angular.isNumber(debounce) || angular.isObject(debounce)) {
            $$debounce(function() {
              scope.select({activeIdx: activeIdx, evt: evt});
            }, angular.isNumber(debounce) ? debounce : debounce['default']);
          } else {
            scope.select({activeIdx: activeIdx, evt: evt});
          }
        };
      }
    };
  }])

  .directive('uibTypeaheadMatch', ['$templateRequest', '$compile', '$parse', function($templateRequest, $compile, $parse) {
    return {
      scope: {
        index: '=',
        match: '=',
        query: '='
      },
      link: function(scope, element, attrs) {
        var tplUrl = $parse(attrs.templateUrl)(scope.$parent) || 'uib/template/typeahead/typeahead-match.html';
        $templateRequest(tplUrl).then(function(tplContent) {
          var tplEl = angular.element(tplContent.trim());
          element.replaceWith(tplEl);
          $compile(tplEl)(scope);
        });
      }
    };
  }])

  .filter('uibTypeaheadHighlight', ['$sce', '$injector', '$log', function($sce, $injector, $log) {
    var isSanitizePresent;
    isSanitizePresent = $injector.has('$sanitize');

    function escapeRegexp(queryToEscape) {
      // Regex: capture the whole query string and replace it with the string that will be used to match
      // the results, for example if the capture is "a" the result will be \a
      return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
    }

    function containsHtml(matchItem) {
      return /<.*>/g.test(matchItem);
    }

    return function(matchItem, query) {
      if (!isSanitizePresent && containsHtml(matchItem)) {
        $log.warn('Unsafe use of typeahead please use ngSanitize'); // Warn the user about the danger
      }
      matchItem = query ? ('' + matchItem).replace(new RegExp(escapeRegexp(query), 'gi'), '<strong>$&</strong>') : matchItem; // Replaces the capture string with a the same string inside of a "strong" tag
      if (!isSanitizePresent) {
        matchItem = $sce.trustAsHtml(matchItem); // If $sanitize is not present we pack the string in a $sce object for the ng-bind-html directive
      }
      return matchItem;
    };
  }]);
angular.module('ui.bootstrap.carousel').run(function() {!angular.$$csp().noInlineStyle && !angular.$$uibCarouselCss && angular.element(document).find('head').prepend('<style type="text/css">.ng-animate.item:not(.left):not(.right){-webkit-transition:0s ease-in-out left;transition:0s ease-in-out left}</style>'); angular.$$uibCarouselCss = true; });
angular.module('ui.bootstrap.datepicker').run(function() {!angular.$$csp().noInlineStyle && !angular.$$uibDatepickerCss && angular.element(document).find('head').prepend('<style type="text/css">.uib-datepicker .uib-title{width:100%;}.uib-day button,.uib-month button,.uib-year button{min-width:100%;}.uib-left,.uib-right{width:100%}</style>'); angular.$$uibDatepickerCss = true; });
angular.module('ui.bootstrap.position').run(function() {!angular.$$csp().noInlineStyle && !angular.$$uibPositionCss && angular.element(document).find('head').prepend('<style type="text/css">.uib-position-measure{display:block !important;visibility:hidden !important;position:absolute !important;top:-9999px !important;left:-9999px !important;}.uib-position-scrollbar-measure{position:absolute !important;top:-9999px !important;width:50px !important;height:50px !important;overflow:scroll !important;}.uib-position-body-scrollbar-measure{overflow:scroll !important;}</style>'); angular.$$uibPositionCss = true; });
angular.module('ui.bootstrap.datepickerPopup').run(function() {!angular.$$csp().noInlineStyle && !angular.$$uibDatepickerpopupCss && angular.element(document).find('head').prepend('<style type="text/css">.uib-datepicker-popup.dropdown-menu{display:block;float:none;margin:0;}.uib-button-bar{padding:10px 9px 2px;}</style>'); angular.$$uibDatepickerpopupCss = true; });
angular.module('ui.bootstrap.tooltip').run(function() {!angular.$$csp().noInlineStyle && !angular.$$uibTooltipCss && angular.element(document).find('head').prepend('<style type="text/css">[uib-tooltip-popup].tooltip.top-left > .tooltip-arrow,[uib-tooltip-popup].tooltip.top-right > .tooltip-arrow,[uib-tooltip-popup].tooltip.bottom-left > .tooltip-arrow,[uib-tooltip-popup].tooltip.bottom-right > .tooltip-arrow,[uib-tooltip-popup].tooltip.left-top > .tooltip-arrow,[uib-tooltip-popup].tooltip.left-bottom > .tooltip-arrow,[uib-tooltip-popup].tooltip.right-top > .tooltip-arrow,[uib-tooltip-popup].tooltip.right-bottom > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.top-left > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.top-right > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.bottom-left > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.bottom-right > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.left-top > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.left-bottom > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.right-top > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.right-bottom > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.top-left > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.top-right > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.bottom-left > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.bottom-right > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.left-top > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.left-bottom > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.right-top > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.right-bottom > .tooltip-arrow,[uib-popover-popup].popover.top-left > .arrow,[uib-popover-popup].popover.top-right > .arrow,[uib-popover-popup].popover.bottom-left > .arrow,[uib-popover-popup].popover.bottom-right > .arrow,[uib-popover-popup].popover.left-top > .arrow,[uib-popover-popup].popover.left-bottom > .arrow,[uib-popover-popup].popover.right-top > .arrow,[uib-popover-popup].popover.right-bottom > .arrow,[uib-popover-html-popup].popover.top-left > .arrow,[uib-popover-html-popup].popover.top-right > .arrow,[uib-popover-html-popup].popover.bottom-left > .arrow,[uib-popover-html-popup].popover.bottom-right > .arrow,[uib-popover-html-popup].popover.left-top > .arrow,[uib-popover-html-popup].popover.left-bottom > .arrow,[uib-popover-html-popup].popover.right-top > .arrow,[uib-popover-html-popup].popover.right-bottom > .arrow,[uib-popover-template-popup].popover.top-left > .arrow,[uib-popover-template-popup].popover.top-right > .arrow,[uib-popover-template-popup].popover.bottom-left > .arrow,[uib-popover-template-popup].popover.bottom-right > .arrow,[uib-popover-template-popup].popover.left-top > .arrow,[uib-popover-template-popup].popover.left-bottom > .arrow,[uib-popover-template-popup].popover.right-top > .arrow,[uib-popover-template-popup].popover.right-bottom > .arrow{top:auto;bottom:auto;left:auto;right:auto;margin:0;}[uib-popover-popup].popover,[uib-popover-html-popup].popover,[uib-popover-template-popup].popover{display:block !important;}</style>'); angular.$$uibTooltipCss = true; });
angular.module('ui.bootstrap.timepicker').run(function() {!angular.$$csp().noInlineStyle && !angular.$$uibTimepickerCss && angular.element(document).find('head').prepend('<style type="text/css">.uib-time input{width:50px;}</style>'); angular.$$uibTimepickerCss = true; });
angular.module('ui.bootstrap.typeahead').run(function() {!angular.$$csp().noInlineStyle && !angular.$$uibTypeaheadCss && angular.element(document).find('head').prepend('<style type="text/css">[uib-typeahead-popup].dropdown-menu{display:block;}</style>'); angular.$$uibTypeaheadCss = true; });
(function(){function o(n){var i=e;n&&(e[n]||(e[n]={}),i=e[n]);if(!i.define||!i.define.packaged)t.original=i.define,i.define=t,i.define.packaged=!0;if(!i.require||!i.require.packaged)r.original=i.require,i.require=r,i.require.packaged=!0}var ACE_NAMESPACE="",e=function(){return this}();!e&&typeof window!="undefined"&&(e=window);if(!ACE_NAMESPACE&&typeof requirejs!="undefined")return;var t=function(e,n,r){if(typeof e!="string"){t.original?t.original.apply(this,arguments):(console.error("dropping module because define wasn't a string."),console.trace());return}arguments.length==2&&(r=n),t.modules[e]||(t.payloads[e]=r,t.modules[e]=null)};t.modules={},t.payloads={};var n=function(e,t,n){if(typeof t=="string"){var i=s(e,t);if(i!=undefined)return n&&n(),i}else if(Object.prototype.toString.call(t)==="[object Array]"){var o=[];for(var u=0,a=t.length;u<a;++u){var f=s(e,t[u]);if(f==undefined&&r.original)return;o.push(f)}return n&&n.apply(null,o)||!0}},r=function(e,t){var i=n("",e,t);return i==undefined&&r.original?r.original.apply(this,arguments):i},i=function(e,t){if(t.indexOf("!")!==-1){var n=t.split("!");return i(e,n[0])+"!"+i(e,n[1])}if(t.charAt(0)=="."){var r=e.split("/").slice(0,-1).join("/");t=r+"/"+t;while(t.indexOf(".")!==-1&&s!=t){var s=t;t=t.replace(/\/\.\//,"/").replace(/[^\/]+\/\.\.\//,"")}}return t},s=function(e,r){r=i(e,r);var s=t.modules[r];if(!s){s=t.payloads[r];if(typeof s=="function"){var o={},u={id:r,uri:"",exports:o,packaged:!0},a=function(e,t){return n(r,e,t)},f=s(a,o,u);o=f||u.exports,t.modules[r]=o,delete t.payloads[r]}s=t.modules[r]=o||s}return s};o(ACE_NAMESPACE)})(),define("ace/lib/regexp",["require","exports","module"],function(e,t,n){"use strict";function o(e){return(e.global?"g":"")+(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.extended?"x":"")+(e.sticky?"y":"")}function u(e,t,n){if(Array.prototype.indexOf)return e.indexOf(t,n);for(var r=n||0;r<e.length;r++)if(e[r]===t)return r;return-1}var r={exec:RegExp.prototype.exec,test:RegExp.prototype.test,match:String.prototype.match,replace:String.prototype.replace,split:String.prototype.split},i=r.exec.call(/()??/,"")[1]===undefined,s=function(){var e=/^/g;return r.test.call(e,""),!e.lastIndex}();if(s&&i)return;RegExp.prototype.exec=function(e){var t=r.exec.apply(this,arguments),n,a;if(typeof e=="string"&&t){!i&&t.length>1&&u(t,"")>-1&&(a=RegExp(this.source,r.replace.call(o(this),"g","")),r.replace.call(e.slice(t.index),a,function(){for(var e=1;e<arguments.length-2;e++)arguments[e]===undefined&&(t[e]=undefined)}));if(this._xregexp&&this._xregexp.captureNames)for(var f=1;f<t.length;f++)n=this._xregexp.captureNames[f-1],n&&(t[n]=t[f]);!s&&this.global&&!t[0].length&&this.lastIndex>t.index&&this.lastIndex--}return t},s||(RegExp.prototype.test=function(e){var t=r.exec.call(this,e);return t&&this.global&&!t[0].length&&this.lastIndex>t.index&&this.lastIndex--,!!t})}),define("ace/lib/es5-shim",["require","exports","module"],function(e,t,n){function r(){}function w(e){try{return Object.defineProperty(e,"sentinel",{}),"sentinel"in e}catch(t){}}function H(e){return e=+e,e!==e?e=0:e!==0&&e!==1/0&&e!==-1/0&&(e=(e>0||-1)*Math.floor(Math.abs(e))),e}function B(e){var t=typeof e;return e===null||t==="undefined"||t==="boolean"||t==="number"||t==="string"}function j(e){var t,n,r;if(B(e))return e;n=e.valueOf;if(typeof n=="function"){t=n.call(e);if(B(t))return t}r=e.toString;if(typeof r=="function"){t=r.call(e);if(B(t))return t}throw new TypeError}Function.prototype.bind||(Function.prototype.bind=function(t){var n=this;if(typeof n!="function")throw new TypeError("Function.prototype.bind called on incompatible "+n);var i=u.call(arguments,1),s=function(){if(this instanceof s){var e=n.apply(this,i.concat(u.call(arguments)));return Object(e)===e?e:this}return n.apply(t,i.concat(u.call(arguments)))};return n.prototype&&(r.prototype=n.prototype,s.prototype=new r,r.prototype=null),s});var i=Function.prototype.call,s=Array.prototype,o=Object.prototype,u=s.slice,a=i.bind(o.toString),f=i.bind(o.hasOwnProperty),l,c,h,p,d;if(d=f(o,"__defineGetter__"))l=i.bind(o.__defineGetter__),c=i.bind(o.__defineSetter__),h=i.bind(o.__lookupGetter__),p=i.bind(o.__lookupSetter__);if([1,2].splice(0).length!=2)if(!function(){function e(e){var t=new Array(e+2);return t[0]=t[1]=0,t}var t=[],n;t.splice.apply(t,e(20)),t.splice.apply(t,e(26)),n=t.length,t.splice(5,0,"XXX"),n+1==t.length;if(n+1==t.length)return!0}())Array.prototype.splice=function(e,t){var n=this.length;e>0?e>n&&(e=n):e==void 0?e=0:e<0&&(e=Math.max(n+e,0)),e+t<n||(t=n-e);var r=this.slice(e,e+t),i=u.call(arguments,2),s=i.length;if(e===n)s&&this.push.apply(this,i);else{var o=Math.min(t,n-e),a=e+o,f=a+s-o,l=n-a,c=n-o;if(f<a)for(var h=0;h<l;++h)this[f+h]=this[a+h];else if(f>a)for(h=l;h--;)this[f+h]=this[a+h];if(s&&e===c)this.length=c,this.push.apply(this,i);else{this.length=c+s;for(h=0;h<s;++h)this[e+h]=i[h]}}return r};else{var v=Array.prototype.splice;Array.prototype.splice=function(e,t){return arguments.length?v.apply(this,[e===void 0?0:e,t===void 0?this.length-e:t].concat(u.call(arguments,2))):[]}}Array.isArray||(Array.isArray=function(t){return a(t)=="[object Array]"});var m=Object("a"),g=m[0]!="a"||!(0 in m);Array.prototype.forEach||(Array.prototype.forEach=function(t){var n=F(this),r=g&&a(this)=="[object String]"?this.split(""):n,i=arguments[1],s=-1,o=r.length>>>0;if(a(t)!="[object Function]")throw new TypeError;while(++s<o)s in r&&t.call(i,r[s],s,n)}),Array.prototype.map||(Array.prototype.map=function(t){var n=F(this),r=g&&a(this)=="[object String]"?this.split(""):n,i=r.length>>>0,s=Array(i),o=arguments[1];if(a(t)!="[object Function]")throw new TypeError(t+" is not a function");for(var u=0;u<i;u++)u in r&&(s[u]=t.call(o,r[u],u,n));return s}),Array.prototype.filter||(Array.prototype.filter=function(t){var n=F(this),r=g&&a(this)=="[object String]"?this.split(""):n,i=r.length>>>0,s=[],o,u=arguments[1];if(a(t)!="[object Function]")throw new TypeError(t+" is not a function");for(var f=0;f<i;f++)f in r&&(o=r[f],t.call(u,o,f,n)&&s.push(o));return s}),Array.prototype.every||(Array.prototype.every=function(t){var n=F(this),r=g&&a(this)=="[object String]"?this.split(""):n,i=r.length>>>0,s=arguments[1];if(a(t)!="[object Function]")throw new TypeError(t+" is not a function");for(var o=0;o<i;o++)if(o in r&&!t.call(s,r[o],o,n))return!1;return!0}),Array.prototype.some||(Array.prototype.some=function(t){var n=F(this),r=g&&a(this)=="[object String]"?this.split(""):n,i=r.length>>>0,s=arguments[1];if(a(t)!="[object Function]")throw new TypeError(t+" is not a function");for(var o=0;o<i;o++)if(o in r&&t.call(s,r[o],o,n))return!0;return!1}),Array.prototype.reduce||(Array.prototype.reduce=function(t){var n=F(this),r=g&&a(this)=="[object String]"?this.split(""):n,i=r.length>>>0;if(a(t)!="[object Function]")throw new TypeError(t+" is not a function");if(!i&&arguments.length==1)throw new TypeError("reduce of empty array with no initial value");var s=0,o;if(arguments.length>=2)o=arguments[1];else do{if(s in r){o=r[s++];break}if(++s>=i)throw new TypeError("reduce of empty array with no initial value")}while(!0);for(;s<i;s++)s in r&&(o=t.call(void 0,o,r[s],s,n));return o}),Array.prototype.reduceRight||(Array.prototype.reduceRight=function(t){var n=F(this),r=g&&a(this)=="[object String]"?this.split(""):n,i=r.length>>>0;if(a(t)!="[object Function]")throw new TypeError(t+" is not a function");if(!i&&arguments.length==1)throw new TypeError("reduceRight of empty array with no initial value");var s,o=i-1;if(arguments.length>=2)s=arguments[1];else do{if(o in r){s=r[o--];break}if(--o<0)throw new TypeError("reduceRight of empty array with no initial value")}while(!0);do o in this&&(s=t.call(void 0,s,r[o],o,n));while(o--);return s});if(!Array.prototype.indexOf||[0,1].indexOf(1,2)!=-1)Array.prototype.indexOf=function(t){var n=g&&a(this)=="[object String]"?this.split(""):F(this),r=n.length>>>0;if(!r)return-1;var i=0;arguments.length>1&&(i=H(arguments[1])),i=i>=0?i:Math.max(0,r+i);for(;i<r;i++)if(i in n&&n[i]===t)return i;return-1};if(!Array.prototype.lastIndexOf||[0,1].lastIndexOf(0,-3)!=-1)Array.prototype.lastIndexOf=function(t){var n=g&&a(this)=="[object String]"?this.split(""):F(this),r=n.length>>>0;if(!r)return-1;var i=r-1;arguments.length>1&&(i=Math.min(i,H(arguments[1]))),i=i>=0?i:r-Math.abs(i);for(;i>=0;i--)if(i in n&&t===n[i])return i;return-1};Object.getPrototypeOf||(Object.getPrototypeOf=function(t){return t.__proto__||(t.constructor?t.constructor.prototype:o)});if(!Object.getOwnPropertyDescriptor){var y="Object.getOwnPropertyDescriptor called on a non-object: ";Object.getOwnPropertyDescriptor=function(t,n){if(typeof t!="object"&&typeof t!="function"||t===null)throw new TypeError(y+t);if(!f(t,n))return;var r,i,s;r={enumerable:!0,configurable:!0};if(d){var u=t.__proto__;t.__proto__=o;var i=h(t,n),s=p(t,n);t.__proto__=u;if(i||s)return i&&(r.get=i),s&&(r.set=s),r}return r.value=t[n],r}}Object.getOwnPropertyNames||(Object.getOwnPropertyNames=function(t){return Object.keys(t)});if(!Object.create){var b;Object.prototype.__proto__===null?b=function(){return{__proto__:null}}:b=function(){var e={};for(var t in e)e[t]=null;return e.constructor=e.hasOwnProperty=e.propertyIsEnumerable=e.isPrototypeOf=e.toLocaleString=e.toString=e.valueOf=e.__proto__=null,e},Object.create=function(t,n){var r;if(t===null)r=b();else{if(typeof t!="object")throw new TypeError("typeof prototype["+typeof t+"] != 'object'");var i=function(){};i.prototype=t,r=new i,r.__proto__=t}return n!==void 0&&Object.defineProperties(r,n),r}}if(Object.defineProperty){var E=w({}),S=typeof document=="undefined"||w(document.createElement("div"));if(!E||!S)var x=Object.defineProperty}if(!Object.defineProperty||x){var T="Property description must be an object: ",N="Object.defineProperty called on non-object: ",C="getters & setters can not be defined on this javascript engine";Object.defineProperty=function(t,n,r){if(typeof t!="object"&&typeof t!="function"||t===null)throw new TypeError(N+t);if(typeof r!="object"&&typeof r!="function"||r===null)throw new TypeError(T+r);if(x)try{return x.call(Object,t,n,r)}catch(i){}if(f(r,"value"))if(d&&(h(t,n)||p(t,n))){var s=t.__proto__;t.__proto__=o,delete t[n],t[n]=r.value,t.__proto__=s}else t[n]=r.value;else{if(!d)throw new TypeError(C);f(r,"get")&&l(t,n,r.get),f(r,"set")&&c(t,n,r.set)}return t}}Object.defineProperties||(Object.defineProperties=function(t,n){for(var r in n)f(n,r)&&Object.defineProperty(t,r,n[r]);return t}),Object.seal||(Object.seal=function(t){return t}),Object.freeze||(Object.freeze=function(t){return t});try{Object.freeze(function(){})}catch(k){Object.freeze=function(t){return function(n){return typeof n=="function"?n:t(n)}}(Object.freeze)}Object.preventExtensions||(Object.preventExtensions=function(t){return t}),Object.isSealed||(Object.isSealed=function(t){return!1}),Object.isFrozen||(Object.isFrozen=function(t){return!1}),Object.isExtensible||(Object.isExtensible=function(t){if(Object(t)===t)throw new TypeError;var n="";while(f(t,n))n+="?";t[n]=!0;var r=f(t,n);return delete t[n],r});if(!Object.keys){var L=!0,A=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],O=A.length;for(var M in{toString:null})L=!1;Object.keys=function I(e){if(typeof e!="object"&&typeof e!="function"||e===null)throw new TypeError("Object.keys called on a non-object");var I=[];for(var t in e)f(e,t)&&I.push(t);if(L)for(var n=0,r=O;n<r;n++){var i=A[n];f(e,i)&&I.push(i)}return I}}Date.now||(Date.now=function(){return(new Date).getTime()});var _="	\n\x0b\f\r \u00a0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029\ufeff";if(!String.prototype.trim){_="["+_+"]";var D=new RegExp("^"+_+_+"*"),P=new RegExp(_+_+"*$");String.prototype.trim=function(){return String(this).replace(D,"").replace(P,"")}}var F=function(e){if(e==null)throw new TypeError("can't convert "+e+" to object");return Object(e)}}),define("ace/lib/fixoldbrowsers",["require","exports","module","ace/lib/regexp","ace/lib/es5-shim"],function(e,t,n){"use strict";e("./regexp"),e("./es5-shim"),typeof Element!="undefined"&&!Element.prototype.remove&&Object.defineProperty(Element.prototype,"remove",{enumerable:!1,writable:!0,configurable:!0,value:function(){this.parentNode&&this.parentNode.removeChild(this)}})}),define("ace/lib/useragent",["require","exports","module"],function(e,t,n){"use strict";t.OS={LINUX:"LINUX",MAC:"MAC",WINDOWS:"WINDOWS"},t.getOS=function(){return t.isMac?t.OS.MAC:t.isLinux?t.OS.LINUX:t.OS.WINDOWS};var r=typeof navigator=="object"?navigator:{},i=(/mac|win|linux/i.exec(r.platform)||["other"])[0].toLowerCase(),s=r.userAgent||"",o=r.appName||"";t.isWin=i=="win",t.isMac=i=="mac",t.isLinux=i=="linux",t.isIE=o=="Microsoft Internet Explorer"||o.indexOf("MSAppHost")>=0?parseFloat((s.match(/(?:MSIE |Trident\/[0-9]+[\.0-9]+;.*rv:)([0-9]+[\.0-9]+)/)||[])[1]):parseFloat((s.match(/(?:Trident\/[0-9]+[\.0-9]+;.*rv:)([0-9]+[\.0-9]+)/)||[])[1]),t.isOldIE=t.isIE&&t.isIE<9,t.isGecko=t.isMozilla=s.match(/ Gecko\/\d+/),t.isOpera=typeof opera=="object"&&Object.prototype.toString.call(window.opera)=="[object Opera]",t.isWebKit=parseFloat(s.split("WebKit/")[1])||undefined,t.isChrome=parseFloat(s.split(" Chrome/")[1])||undefined,t.isEdge=parseFloat(s.split(" Edge/")[1])||undefined,t.isAIR=s.indexOf("AdobeAIR")>=0,t.isAndroid=s.indexOf("Android")>=0,t.isChromeOS=s.indexOf(" CrOS ")>=0,t.isIOS=/iPad|iPhone|iPod/.test(s)&&!window.MSStream,t.isIOS&&(t.isMac=!0),t.isMobile=t.isIOS||t.isAndroid}),define("ace/lib/dom",["require","exports","module","ace/lib/useragent"],function(e,t,n){"use strict";var r=e("./useragent"),i="http://www.w3.org/1999/xhtml";t.buildDom=function o(e,t,n){if(typeof e=="string"&&e){var r=document.createTextNode(e);return t&&t.appendChild(r),r}if(!Array.isArray(e))return e;if(typeof e[0]!="string"||!e[0]){var i=[];for(var s=0;s<e.length;s++){var u=o(e[s],t,n);u&&i.push(u)}return i}var a=document.createElement(e[0]),f=e[1],l=1;f&&typeof f=="object"&&!Array.isArray(f)&&(l=2);for(var s=l;s<e.length;s++)o(e[s],a,n);return l==2&&Object.keys(f).forEach(function(e){var t=f[e];e==="class"?a.className=Array.isArray(t)?t.join(" "):t:typeof t=="function"||e=="value"?a[e]=t:e==="ref"?n&&(n[t]=a):t!=null&&a.setAttribute(e,t)}),t&&t.appendChild(a),a},t.getDocumentHead=function(e){return e||(e=document),e.head||e.getElementsByTagName("head")[0]||e.documentElement},t.createElement=function(e,t){return document.createElementNS?document.createElementNS(t||i,e):document.createElement(e)},t.removeChildren=function(e){e.innerHTML=""},t.createTextNode=function(e,t){var n=t?t.ownerDocument:document;return n.createTextNode(e)},t.createFragment=function(e){var t=e?e.ownerDocument:document;return t.createDocumentFragment()},t.hasCssClass=function(e,t){var n=(e.className+"").split(/\s+/g);return n.indexOf(t)!==-1},t.addCssClass=function(e,n){t.hasCssClass(e,n)||(e.className+=" "+n)},t.removeCssClass=function(e,t){var n=e.className.split(/\s+/g);for(;;){var r=n.indexOf(t);if(r==-1)break;n.splice(r,1)}e.className=n.join(" ")},t.toggleCssClass=function(e,t){var n=e.className.split(/\s+/g),r=!0;for(;;){var i=n.indexOf(t);if(i==-1)break;r=!1,n.splice(i,1)}return r&&n.push(t),e.className=n.join(" "),r},t.setCssClass=function(e,n,r){r?t.addCssClass(e,n):t.removeCssClass(e,n)},t.hasCssString=function(e,t){var n=0,r;t=t||document;if(r=t.querySelectorAll("style"))while(n<r.length)if(r[n++].id===e)return!0},t.importCssString=function(n,r,i){var s=i;if(!i||!i.getRootNode)s=document;else{s=i.getRootNode();if(!s||s==i)s=document}var o=s.ownerDocument||s;if(r&&t.hasCssString(r,s))return null;r&&(n+="\n/*# sourceURL=ace/css/"+r+" */");var u=t.createElement("style");u.appendChild(o.createTextNode(n)),r&&(u.id=r),s==o&&(s=t.getDocumentHead(o)),s.insertBefore(u,s.firstChild)},t.importCssStylsheet=function(e,n){t.buildDom(["link",{rel:"stylesheet",href:e}],t.getDocumentHead(n))},t.scrollbarWidth=function(e){var n=t.createElement("ace_inner");n.style.width="100%",n.style.minWidth="0px",n.style.height="200px",n.style.display="block";var r=t.createElement("ace_outer"),i=r.style;i.position="absolute",i.left="-10000px",i.overflow="hidden",i.width="200px",i.minWidth="0px",i.height="150px",i.display="block",r.appendChild(n);var s=e.documentElement;s.appendChild(r);var o=n.offsetWidth;i.overflow="scroll";var u=n.offsetWidth;return o==u&&(u=r.clientWidth),s.removeChild(r),o-u},typeof document=="undefined"&&(t.importCssString=function(){}),t.computedStyle=function(e,t){return window.getComputedStyle(e,"")||{}},t.setStyle=function(e,t,n){e[t]!==n&&(e[t]=n)},t.HAS_CSS_ANIMATION=!1,t.HAS_CSS_TRANSFORMS=!1,t.HI_DPI=r.isWin?typeof window!="undefined"&&window.devicePixelRatio>=1.5:!0;if(typeof document!="undefined"){var s=document.createElement("div");t.HI_DPI&&s.style.transform!==undefined&&(t.HAS_CSS_TRANSFORMS=!0),!r.isEdge&&typeof s.style.animationName!="undefined"&&(t.HAS_CSS_ANIMATION=!0),s=null}t.HAS_CSS_TRANSFORMS?t.translate=function(e,t,n){e.style.transform="translate("+Math.round(t)+"px, "+Math.round(n)+"px)"}:t.translate=function(e,t,n){e.style.top=Math.round(n)+"px",e.style.left=Math.round(t)+"px"}}),define("ace/lib/oop",["require","exports","module"],function(e,t,n){"use strict";t.inherits=function(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})},t.mixin=function(e,t){for(var n in t)e[n]=t[n];return e},t.implement=function(e,n){t.mixin(e,n)}}),define("ace/lib/keys",["require","exports","module","ace/lib/oop"],function(e,t,n){"use strict";var r=e("./oop"),i=function(){var e={MODIFIER_KEYS:{16:"Shift",17:"Ctrl",18:"Alt",224:"Meta",91:"MetaLeft",92:"MetaRight",93:"ContextMenu"},KEY_MODS:{ctrl:1,alt:2,option:2,shift:4,"super":8,meta:8,command:8,cmd:8},FUNCTION_KEYS:{8:"Backspace",9:"Tab",13:"Return",19:"Pause",27:"Esc",32:"Space",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"Left",38:"Up",39:"Right",40:"Down",44:"Print",45:"Insert",46:"Delete",96:"Numpad0",97:"Numpad1",98:"Numpad2",99:"Numpad3",100:"Numpad4",101:"Numpad5",102:"Numpad6",103:"Numpad7",104:"Numpad8",105:"Numpad9","-13":"NumpadEnter",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"Numlock",145:"Scrolllock"},PRINTABLE_KEYS:{32:" ",48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",59:";",61:"=",65:"a",66:"b",67:"c",68:"d",69:"e",70:"f",71:"g",72:"h",73:"i",74:"j",75:"k",76:"l",77:"m",78:"n",79:"o",80:"p",81:"q",82:"r",83:"s",84:"t",85:"u",86:"v",87:"w",88:"x",89:"y",90:"z",107:"+",109:"-",110:".",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'",111:"/",106:"*"}},t,n;for(n in e.FUNCTION_KEYS)t=e.FUNCTION_KEYS[n].toLowerCase(),e[t]=parseInt(n,10);for(n in e.PRINTABLE_KEYS)t=e.PRINTABLE_KEYS[n].toLowerCase(),e[t]=parseInt(n,10);return r.mixin(e,e.MODIFIER_KEYS),r.mixin(e,e.PRINTABLE_KEYS),r.mixin(e,e.FUNCTION_KEYS),e.enter=e["return"],e.escape=e.esc,e.del=e["delete"],e[173]="-",function(){var t=["cmd","ctrl","alt","shift"];for(var n=Math.pow(2,t.length);n--;)e.KEY_MODS[n]=t.filter(function(t){return n&e.KEY_MODS[t]}).join("-")+"-"}(),e.KEY_MODS[0]="",e.KEY_MODS[-1]="input-",e}();r.mixin(t,i),t.keyCodeToString=function(e){var t=i[e];return typeof t!="string"&&(t=String.fromCharCode(e)),t.toLowerCase()}}),define("ace/lib/event",["require","exports","module","ace/lib/keys","ace/lib/useragent"],function(e,t,n){"use strict";function a(){u=!1;try{document.createComment("").addEventListener("test",function(){},{get passive(){u={passive:!1}}})}catch(e){}}function f(){return u==undefined&&a(),u}function c(e,t,n){var u=l(t);if(!i.isMac&&s){t.getModifierState&&(t.getModifierState("OS")||t.getModifierState("Win"))&&(u|=8);if(s.altGr){if((3&u)==3)return;s.altGr=0}if(n===18||n===17){var a="location"in t?t.location:t.keyLocation;if(n===17&&a===1)s[n]==1&&(o=t.timeStamp);else if(n===18&&u===3&&a===2){var f=t.timeStamp-o;f<50&&(s.altGr=!0)}}}n in r.MODIFIER_KEYS&&(n=-1);if(!u&&n===13){var a="location"in t?t.location:t.keyLocation;if(a===3){e(t,u,-n);if(t.defaultPrevented)return}}if(i.isChromeOS&&u&8){e(t,u,n);if(t.defaultPrevented)return;u&=-9}return!!u||n in r.FUNCTION_KEYS||n in r.PRINTABLE_KEYS?e(t,u,n):!1}function h(){s=Object.create(null)}var r=e("./keys"),i=e("./useragent"),s=null,o=0,u;t.addListener=function(e,t,n){return e.addEventListener(t,n,f())},t.removeListener=function(e,t,n){return e.removeEventListener(t,n,f())},t.stopEvent=function(e){return t.stopPropagation(e),t.preventDefault(e),!1},t.stopPropagation=function(e){e.stopPropagation&&e.stopPropagation()},t.preventDefault=function(e){e.preventDefault&&e.preventDefault()},t.getButton=function(e){return e.type=="dblclick"?0:e.type=="contextmenu"||i.isMac&&e.ctrlKey&&!e.altKey&&!e.shiftKey?2:e.button},t.capture=function(e,n,r){function i(e){n&&n(e),r&&r(e),t.removeListener(document,"mousemove",n,!0),t.removeListener(document,"mouseup",i,!0),t.removeListener(document,"dragstart",i,!0)}return t.addListener(document,"mousemove",n,!0),t.addListener(document,"mouseup",i,!0),t.addListener(document,"dragstart",i,!0),i},t.addMouseWheelListener=function(e,n){"onmousewheel"in e?t.addListener(e,"mousewheel",function(e){var t=8;e.wheelDeltaX!==undefined?(e.wheelX=-e.wheelDeltaX/t,e.wheelY=-e.wheelDeltaY/t):(e.wheelX=0,e.wheelY=-e.wheelDelta/t),n(e)}):"onwheel"in e?t.addListener(e,"wheel",function(e){var t=.35;switch(e.deltaMode){case e.DOM_DELTA_PIXEL:e.wheelX=e.deltaX*t||0,e.wheelY=e.deltaY*t||0;break;case e.DOM_DELTA_LINE:case e.DOM_DELTA_PAGE:e.wheelX=(e.deltaX||0)*5,e.wheelY=(e.deltaY||0)*5}n(e)}):t.addListener(e,"DOMMouseScroll",function(e){e.axis&&e.axis==e.HORIZONTAL_AXIS?(e.wheelX=(e.detail||0)*5,e.wheelY=0):(e.wheelX=0,e.wheelY=(e.detail||0)*5),n(e)})},t.addMultiMouseDownListener=function(e,n,r,s){function c(e){t.getButton(e)!==0?o=0:e.detail>1?(o++,o>4&&(o=1)):o=1;if(i.isIE){var c=Math.abs(e.clientX-u)>5||Math.abs(e.clientY-a)>5;if(!f||c)o=1;f&&clearTimeout(f),f=setTimeout(function(){f=null},n[o-1]||600),o==1&&(u=e.clientX,a=e.clientY)}e._clicks=o,r[s]("mousedown",e);if(o>4)o=0;else if(o>1)return r[s](l[o],e)}var o=0,u,a,f,l={2:"dblclick",3:"tripleclick",4:"quadclick"};Array.isArray(e)||(e=[e]),e.forEach(function(e){t.addListener(e,"mousedown",c)})};var l=function(e){return 0|(e.ctrlKey?1:0)|(e.altKey?2:0)|(e.shiftKey?4:0)|(e.metaKey?8:0)};t.getModifierString=function(e){return r.KEY_MODS[l(e)]},t.addCommandKeyListener=function(e,n){var r=t.addListener;if(i.isOldGecko||i.isOpera&&!("KeyboardEvent"in window)){var o=null;r(e,"keydown",function(e){o=e.keyCode}),r(e,"keypress",function(e){return c(n,e,o)})}else{var u=null;r(e,"keydown",function(e){s[e.keyCode]=(s[e.keyCode]||0)+1;var t=c(n,e,e.keyCode);return u=e.defaultPrevented,t}),r(e,"keypress",function(e){u&&(e.ctrlKey||e.altKey||e.shiftKey||e.metaKey)&&(t.stopEvent(e),u=null)}),r(e,"keyup",function(e){s[e.keyCode]=null}),s||(h(),r(window,"focus",h))}};if(typeof window=="object"&&window.postMessage&&!i.isOldIE){var p=1;t.nextTick=function(e,n){n=n||window;var r="zero-timeout-message-"+p++,i=function(s){s.data==r&&(t.stopPropagation(s),t.removeListener(n,"message",i),e())};t.addListener(n,"message",i),n.postMessage(r,"*")}}t.$idleBlocked=!1,t.onIdle=function(e,n){return setTimeout(function r(){t.$idleBlocked?setTimeout(r,100):e()},n)},t.$idleBlockId=null,t.blockIdle=function(e){t.$idleBlockId&&clearTimeout(t.$idleBlockId),t.$idleBlocked=!0,t.$idleBlockId=setTimeout(function(){t.$idleBlocked=!1},e||100)},t.nextFrame=typeof window=="object"&&(window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame||window.oRequestAnimationFrame),t.nextFrame?t.nextFrame=t.nextFrame.bind(window):t.nextFrame=function(e){setTimeout(e,17)}}),define("ace/range",["require","exports","module"],function(e,t,n){"use strict";var r=function(e,t){return e.row-t.row||e.column-t.column},i=function(e,t,n,r){this.start={row:e,column:t},this.end={row:n,column:r}};(function(){this.isEqual=function(e){return this.start.row===e.start.row&&this.end.row===e.end.row&&this.start.column===e.start.column&&this.end.column===e.end.column},this.toString=function(){return"Range: ["+this.start.row+"/"+this.start.column+"] -> ["+this.end.row+"/"+this.end.column+"]"},this.contains=function(e,t){return this.compare(e,t)==0},this.compareRange=function(e){var t,n=e.end,r=e.start;return t=this.compare(n.row,n.column),t==1?(t=this.compare(r.row,r.column),t==1?2:t==0?1:0):t==-1?-2:(t=this.compare(r.row,r.column),t==-1?-1:t==1?42:0)},this.comparePoint=function(e){return this.compare(e.row,e.column)},this.containsRange=function(e){return this.comparePoint(e.start)==0&&this.comparePoint(e.end)==0},this.intersects=function(e){var t=this.compareRange(e);return t==-1||t==0||t==1},this.isEnd=function(e,t){return this.end.row==e&&this.end.column==t},this.isStart=function(e,t){return this.start.row==e&&this.start.column==t},this.setStart=function(e,t){typeof e=="object"?(this.start.column=e.column,this.start.row=e.row):(this.start.row=e,this.start.column=t)},this.setEnd=function(e,t){typeof e=="object"?(this.end.column=e.column,this.end.row=e.row):(this.end.row=e,this.end.column=t)},this.inside=function(e,t){return this.compare(e,t)==0?this.isEnd(e,t)||this.isStart(e,t)?!1:!0:!1},this.insideStart=function(e,t){return this.compare(e,t)==0?this.isEnd(e,t)?!1:!0:!1},this.insideEnd=function(e,t){return this.compare(e,t)==0?this.isStart(e,t)?!1:!0:!1},this.compare=function(e,t){return!this.isMultiLine()&&e===this.start.row?t<this.start.column?-1:t>this.end.column?1:0:e<this.start.row?-1:e>this.end.row?1:this.start.row===e?t>=this.start.column?0:-1:this.end.row===e?t<=this.end.column?0:1:0},this.compareStart=function(e,t){return this.start.row==e&&this.start.column==t?-1:this.compare(e,t)},this.compareEnd=function(e,t){return this.end.row==e&&this.end.column==t?1:this.compare(e,t)},this.compareInside=function(e,t){return this.end.row==e&&this.end.column==t?1:this.start.row==e&&this.start.column==t?-1:this.compare(e,t)},this.clipRows=function(e,t){if(this.end.row>t)var n={row:t+1,column:0};else if(this.end.row<e)var n={row:e,column:0};if(this.start.row>t)var r={row:t+1,column:0};else if(this.start.row<e)var r={row:e,column:0};return i.fromPoints(r||this.start,n||this.end)},this.extend=function(e,t){var n=this.compare(e,t);if(n==0)return this;if(n==-1)var r={row:e,column:t};else var s={row:e,column:t};return i.fromPoints(r||this.start,s||this.end)},this.isEmpty=function(){return this.start.row===this.end.row&&this.start.column===this.end.column},this.isMultiLine=function(){return this.start.row!==this.end.row},this.clone=function(){return i.fromPoints(this.start,this.end)},this.collapseRows=function(){return this.end.column==0?new i(this.start.row,0,Math.max(this.start.row,this.end.row-1),0):new i(this.start.row,0,this.end.row,0)},this.toScreenRange=function(e){var t=e.documentToScreenPosition(this.start),n=e.documentToScreenPosition(this.end);return new i(t.row,t.column,n.row,n.column)},this.moveBy=function(e,t){this.start.row+=e,this.start.column+=t,this.end.row+=e,this.end.column+=t}}).call(i.prototype),i.fromPoints=function(e,t){return new i(e.row,e.column,t.row,t.column)},i.comparePoints=r,i.comparePoints=function(e,t){return e.row-t.row||e.column-t.column},t.Range=i}),define("ace/lib/lang",["require","exports","module"],function(e,t,n){"use strict";t.last=function(e){return e[e.length-1]},t.stringReverse=function(e){return e.split("").reverse().join("")},t.stringRepeat=function(e,t){var n="";while(t>0){t&1&&(n+=e);if(t>>=1)e+=e}return n};var r=/^\s\s*/,i=/\s\s*$/;t.stringTrimLeft=function(e){return e.replace(r,"")},t.stringTrimRight=function(e){return e.replace(i,"")},t.copyObject=function(e){var t={};for(var n in e)t[n]=e[n];return t},t.copyArray=function(e){var t=[];for(var n=0,r=e.length;n<r;n++)e[n]&&typeof e[n]=="object"?t[n]=this.copyObject(e[n]):t[n]=e[n];return t},t.deepCopy=function s(e){if(typeof e!="object"||!e)return e;var t;if(Array.isArray(e)){t=[];for(var n=0;n<e.length;n++)t[n]=s(e[n]);return t}if(Object.prototype.toString.call(e)!=="[object Object]")return e;t={};for(var n in e)t[n]=s(e[n]);return t},t.arrayToMap=function(e){var t={};for(var n=0;n<e.length;n++)t[e[n]]=1;return t},t.createMap=function(e){var t=Object.create(null);for(var n in e)t[n]=e[n];return t},t.arrayRemove=function(e,t){for(var n=0;n<=e.length;n++)t===e[n]&&e.splice(n,1)},t.escapeRegExp=function(e){return e.replace(/([.*+?^${}()|[\]\/\\])/g,"\\$1")},t.escapeHTML=function(e){return(""+e).replace(/&/g,"&#38;").replace(/"/g,"&#34;").replace(/'/g,"&#39;").replace(/</g,"&#60;")},t.getMatchOffsets=function(e,t){var n=[];return e.replace(t,function(e){n.push({offset:arguments[arguments.length-2],length:e.length})}),n},t.deferredCall=function(e){var t=null,n=function(){t=null,e()},r=function(e){return r.cancel(),t=setTimeout(n,e||0),r};return r.schedule=r,r.call=function(){return this.cancel(),e(),r},r.cancel=function(){return clearTimeout(t),t=null,r},r.isPending=function(){return t},r},t.delayedCall=function(e,t){var n=null,r=function(){n=null,e()},i=function(e){n==null&&(n=setTimeout(r,e||t))};return i.delay=function(e){n&&clearTimeout(n),n=setTimeout(r,e||t)},i.schedule=i,i.call=function(){this.cancel(),e()},i.cancel=function(){n&&clearTimeout(n),n=null},i.isPending=function(){return n},i}}),define("ace/clipboard",["require","exports","module"],function(e,t,n){"use strict";var r;n.exports={lineMode:!1,pasteCancelled:function(){return r&&r>Date.now()-50?!0:r=!1},cancel:function(){r=Date.now()}}}),define("ace/keyboard/textinput",["require","exports","module","ace/lib/event","ace/lib/useragent","ace/lib/dom","ace/lib/lang","ace/clipboard","ace/lib/keys"],function(e,t,n){"use strict";var r=e("../lib/event"),i=e("../lib/useragent"),s=e("../lib/dom"),o=e("../lib/lang"),u=e("../clipboard"),a=i.isChrome<18,f=i.isIE,l=i.isChrome>63,c=400,h=e("../lib/keys"),p=h.KEY_MODS,d=i.isIOS,v=d?/\s/:/\n/,m=function(e,t){function W(){S=!0,n.blur(),n.focus(),S=!1}function V(e){e.keyCode==27&&n.value.length<n.selectionStart&&(y||(x=n.value),T=N=-1,A()),X()}function J(){clearTimeout($),$=setTimeout(function(){w&&(n.style.cssText=w,w=""),t.renderer.$isMousePressed=!1,t.renderer.$keepTextAreaAtCursor&&t.renderer.$moveTextAreaToCursor()},0)}function Q(e,t,n){var r=null,i=!1;n.addEventListener("keydown",function(e){r&&clearTimeout(r),i=!0},!0),n.addEventListener("keyup",function(e){r=setTimeout(function(){i=!1},100)},!0);var s=function(e){if(document.activeElement!==n)return;if(i||y||t.$mouseHandler.isMousePressed)return;if(m)return;var r=n.selectionStart,s=n.selectionEnd,o=null,u=0;if(r==0)o=h.up;else if(r==1)o=h.home;else if(s>N&&x[s]=="\n")o=h.end;else if(r<T&&x[r-1]==" ")o=h.left,u=p.option;else if(r<T||r==T&&N!=T&&r==s)o=h.left;else if(s>N&&x.slice(0,s).split("\n").length>2)o=h.down;else if(s>N&&x[s-1]==" ")o=h.right,u=p.option;else if(s>N||s==N&&N!=T&&r==s)o=h.right;r!==s&&(u|=p.shift);if(o){var a=t.onCommandKey({},u,o);if(!a&&t.commands){o=h.keyCodeToString(o);var f=t.commands.findKeyCommand(u,o);f&&t.execCommand(f)}T=r,N=s,A("")}};document.addEventListener("selectionchange",s),t.on("destroy",function(){document.removeEventListener("selectionchange",s)})}var n=s.createElement("textarea");n.className="ace_text-input",n.setAttribute("wrap","off"),n.setAttribute("autocorrect","off"),n.setAttribute("autocapitalize","off"),n.setAttribute("spellcheck",!1),n.style.opacity="0",e.insertBefore(n,e.firstChild);var m=!1,g=!1,y=!1,b=!1,w="";i.isMobile||(n.style.fontSize="1px");var E=!1,S=!1,x="",T=0,N=0,C=0;try{var k=document.activeElement===n}catch(L){}r.addListener(n,"blur",function(e){if(S)return;t.onBlur(e),k=!1}),r.addListener(n,"focus",function(e){if(S)return;k=!0;if(i.isEdge)try{if(!document.hasFocus())return}catch(e){}t.onFocus(e),i.isEdge?setTimeout(A):A()}),this.$focusScroll=!1,this.focus=function(){if(w||l||this.$focusScroll=="browser")return n.focus({preventScroll:!0});var e=n.style.top;n.style.position="fixed",n.style.top="0px";try{var t=n.getBoundingClientRect().top!=0}catch(r){return}var i=[];if(t){var s=n.parentElement;while(s&&s.nodeType==1)i.push(s),s.setAttribute("ace_nocontext",!0),!s.parentElement&&s.getRootNode?s=s.getRootNode().host:s=s.parentElement}n.focus({preventScroll:!0}),t&&i.forEach(function(e){e.removeAttribute("ace_nocontext")}),setTimeout(function(){n.style.position="",n.style.top=="0px"&&(n.style.top=e)},0)},this.blur=function(){n.blur()},this.isFocused=function(){return k},t.on("beforeEndOperation",function(){if(t.curOp&&t.curOp.command.name=="insertstring")return;y&&(x=n.value="",z()),A()});var A=d?function(e){if(!k||m&&!e||b)return;e||(e="");var r="\n ab"+e+"cde fg\n";r!=n.value&&(n.value=x=r);var i=4,s=4+(e.length||(t.selection.isEmpty()?0:1));(T!=i||N!=s)&&n.setSelectionRange(i,s),T=i,N=s}:function(){if(y||b)return;if(!k&&!D)return;y=!0;var e=t.selection,r=e.getRange(),i=e.cursor.row,s=r.start.column,o=r.end.column,u=t.session.getLine(i);if(r.start.row!=i){var a=t.session.getLine(i-1);s=r.start.row<i-1?0:s,o+=a.length+1,u=a+"\n"+u}else if(r.end.row!=i){var f=t.session.getLine(i+1);o=r.end.row>i+1?f.length:o,o+=u.length+1,u=u+"\n"+f}u.length>c&&(s<c&&o<c?u=u.slice(0,c):(u="\n",s=0,o=1));var l=u+"\n\n";l!=x&&(n.value=x=l,T=N=l.length),D&&(T=n.selectionStart,N=n.selectionEnd);if(N!=o||T!=s||n.selectionEnd!=N)try{n.setSelectionRange(s,o),T=s,N=o}catch(h){}y=!1};k&&t.onFocus();var O=function(e){return e.selectionStart===0&&e.selectionEnd>=x.length&&e.value===x&&x&&e.selectionEnd!==N},M=function(e){if(y)return;m?m=!1:O(n)&&(t.selectAll(),A())},_=null;this.setInputHandler=function(e){_=e},this.getInputHandler=function(){return _};var D=!1,P=function(e,r){D&&(D=!1);if(g)return A(),e&&t.onPaste(e),g=!1,"";var i=n.selectionStart,s=n.selectionEnd,o=T,u=x.length-N,a=e,f=e.length-i,l=e.length-s,c=0;while(o>0&&x[c]==e[c])c++,o--;a=a.slice(c),c=1;while(u>0&&x.length-c>T-1&&x[x.length-c]==e[e.length-c])c++,u--;f-=c-1,l-=c-1;var h=a.length-c+1;return h<0&&(o=-h,h=0),a=a.slice(0,h),!r&&!a&&!f&&!o&&!u&&!l?"":(b=!0,a&&!o&&!u&&!f&&!l||E?t.onTextInput(a):t.onTextInput(a,{extendLeft:o,extendRight:u,restoreStart:f,restoreEnd:l}),b=!1,x=e,T=i,N=s,C=l,a)},H=function(e){if(y)return U();if(e&&e.inputType){if(e.inputType=="historyUndo")return t.execCommand("undo");if(e.inputType=="historyRedo")return t.execCommand("redo")}var r=n.value,i=P(r,!0);(r.length>c+100||v.test(i))&&A()},B=function(e,t,n){var r=e.clipboardData||window.clipboardData;if(!r||a)return;var i=f||n?"Text":"text/plain";try{return t?r.setData(i,t)!==!1:r.getData(i)}catch(e){if(!n)return B(e,t,!0)}},j=function(e,i){var s=t.getCopyText();if(!s)return r.preventDefault(e);B(e,s)?(d&&(A(s),m=s,setTimeout(function(){m=!1},10)),i?t.onCut():t.onCopy(),r.preventDefault(e)):(m=!0,n.value=s,n.select(),setTimeout(function(){m=!1,A(),i?t.onCut():t.onCopy()}))},F=function(e){j(e,!0)},I=function(e){j(e,!1)},q=function(e){var s=B(e);if(u.pasteCancelled())return;typeof s=="string"?(s&&t.onPaste(s,e),i.isIE&&setTimeout(A),r.preventDefault(e)):(n.value="",g=!0)};r.addCommandKeyListener(n,t.onCommandKey.bind(t)),r.addListener(n,"select",M),r.addListener(n,"input",H),r.addListener(n,"cut",F),r.addListener(n,"copy",I),r.addListener(n,"paste",q),(!("oncut"in n)||!("oncopy"in n)||!("onpaste"in n))&&r.addListener(e,"keydown",function(e){if(i.isMac&&!e.metaKey||!e.ctrlKey)return;switch(e.keyCode){case 67:I(e);break;case 86:q(e);break;case 88:F(e)}});var R=function(e){if(y||!t.onCompositionStart||t.$readOnly)return;y={};if(E)return;setTimeout(U,0),t.on("mousedown",W);var r=t.getSelectionRange();r.end.row=r.start.row,r.end.column=r.start.column,y.markerRange=r,y.selectionStart=T,t.onCompositionStart(y),y.useTextareaForIME?(n.value="",x="",T=0,N=0):(n.msGetInputContext&&(y.context=n.msGetInputContext()),n.getInputContext&&(y.context=n.getInputContext()))},U=function(){if(!y||!t.onCompositionUpdate||t.$readOnly)return;if(E)return W();if(y.useTextareaForIME)t.onCompositionUpdate(n.value);else{var e=n.value;P(e),y.markerRange&&(y.context&&(y.markerRange.start.column=y.selectionStart=y.context.compositionStartOffset),y.markerRange.end.column=y.markerRange.start.column+N-y.selectionStart+C)}},z=function(e){if(!t.onCompositionEnd||t.$readOnly)return;y=!1,t.onCompositionEnd(),t.off("mousedown",W),e&&H()},X=o.delayedCall(U,50).schedule.bind(null,null);r.addListener(n,"compositionstart",R),r.addListener(n,"compositionupdate",U),r.addListener(n,"keyup",V),r.addListener(n,"keydown",X),r.addListener(n,"compositionend",z),this.getElement=function(){return n},this.setCommandMode=function(e){E=e,n.readOnly=!1},this.setReadOnly=function(e){E||(n.readOnly=e)},this.setCopyWithEmptySelection=function(e){},this.onContextMenu=function(e){D=!0,A(),t._emit("nativecontextmenu",{target:t,domEvent:e}),this.moveToMouse(e,!0)},this.moveToMouse=function(e,o){w||(w=n.style.cssText),n.style.cssText=(o?"z-index:100000;":"")+(i.isIE?"opacity:0.1;":"")+"text-indent: -"+(T+N)*t.renderer.characterWidth*.5+"px;";var u=t.container.getBoundingClientRect(),a=s.computedStyle(t.container),f=u.top+(parseInt(a.borderTopWidth)||0),l=u.left+(parseInt(u.borderLeftWidth)||0),c=u.bottom-f-n.clientHeight-2,h=function(e){s.translate(n,e.clientX-l-2,Math.min(e.clientY-f-2,c))};h(e);if(e.type!="mousedown")return;t.renderer.$isMousePressed=!0,clearTimeout($),i.isWin&&r.capture(t.container,h,J)},this.onContextMenuClose=J;var $,K=function(e){t.textInput.onContextMenu(e),J()};r.addListener(n,"mouseup",K),r.addListener(n,"mousedown",function(e){e.preventDefault(),J()}),r.addListener(t.renderer.scroller,"contextmenu",K),r.addListener(n,"contextmenu",K),d&&Q(e,t,n)};t.TextInput=m}),define("ace/mouse/default_handlers",["require","exports","module","ace/lib/useragent"],function(e,t,n){"use strict";function o(e){e.$clickSelection=null;var t=e.editor;t.setDefaultHandler("mousedown",this.onMouseDown.bind(e)),t.setDefaultHandler("dblclick",this.onDoubleClick.bind(e)),t.setDefaultHandler("tripleclick",this.onTripleClick.bind(e)),t.setDefaultHandler("quadclick",this.onQuadClick.bind(e)),t.setDefaultHandler("mousewheel",this.onMouseWheel.bind(e));var n=["select","startSelect","selectEnd","selectAllEnd","selectByWordsEnd","selectByLinesEnd","dragWait","dragWaitEnd","focusWait"];n.forEach(function(t){e[t]=this[t]},this),e.selectByLines=this.extendSelectionBy.bind(e,"getLineRange"),e.selectByWords=this.extendSelectionBy.bind(e,"getWordRange")}function u(e,t,n,r){return Math.sqrt(Math.pow(n-e,2)+Math.pow(r-t,2))}function a(e,t){if(e.start.row==e.end.row)var n=2*t.column-e.start.column-e.end.column;else if(e.start.row==e.end.row-1&&!e.start.column&&!e.end.column)var n=t.column-4;else var n=2*t.row-e.start.row-e.end.row;return n<0?{cursor:e.start,anchor:e.end}:{cursor:e.end,anchor:e.start}}var r=e("../lib/useragent"),i=0,s=550;(function(){this.onMouseDown=function(e){var t=e.inSelection(),n=e.getDocumentPosition();this.mousedownEvent=e;var i=this.editor,s=e.getButton();if(s!==0){var o=i.getSelectionRange(),u=o.isEmpty();(u||s==1)&&i.selection.moveToPosition(n),s==2&&(i.textInput.onContextMenu(e.domEvent),r.isMozilla||e.preventDefault());return}this.mousedownEvent.time=Date.now();if(t&&!i.isFocused()){i.focus();if(this.$focusTimeout&&!this.$clickSelection&&!i.inMultiSelectMode){this.setState("focusWait"),this.captureMouse(e);return}}return this.captureMouse(e),this.startSelect(n,e.domEvent._clicks>1),e.preventDefault()},this.startSelect=function(e,t){e=e||this.editor.renderer.screenToTextCoordinates(this.x,this.y);var n=this.editor;if(!this.mousedownEvent)return;this.mousedownEvent.getShiftKey()?n.selection.selectToPosition(e):t||n.selection.moveToPosition(e),t||this.select(),n.renderer.scroller.setCapture&&n.renderer.scroller.setCapture(),n.setStyle("ace_selecting"),this.setState("select")},this.select=function(){var e,t=this.editor,n=t.renderer.screenToTextCoordinates(this.x,this.y);if(this.$clickSelection){var r=this.$clickSelection.comparePoint(n);if(r==-1)e=this.$clickSelection.end;else if(r==1)e=this.$clickSelection.start;else{var i=a(this.$clickSelection,n);n=i.cursor,e=i.anchor}t.selection.setSelectionAnchor(e.row,e.column)}t.selection.selectToPosition(n),t.renderer.scrollCursorIntoView()},this.extendSelectionBy=function(e){var t,n=this.editor,r=n.renderer.screenToTextCoordinates(this.x,this.y),i=n.selection[e](r.row,r.column);if(this.$clickSelection){var s=this.$clickSelection.comparePoint(i.start),o=this.$clickSelection.comparePoint(i.end);if(s==-1&&o<=0){t=this.$clickSelection.end;if(i.end.row!=r.row||i.end.column!=r.column)r=i.start}else if(o==1&&s>=0){t=this.$clickSelection.start;if(i.start.row!=r.row||i.start.column!=r.column)r=i.end}else if(s==-1&&o==1)r=i.end,t=i.start;else{var u=a(this.$clickSelection,r);r=u.cursor,t=u.anchor}n.selection.setSelectionAnchor(t.row,t.column)}n.selection.selectToPosition(r),n.renderer.scrollCursorIntoView()},this.selectEnd=this.selectAllEnd=this.selectByWordsEnd=this.selectByLinesEnd=function(){this.$clickSelection=null,this.editor.unsetStyle("ace_selecting"),this.editor.renderer.scroller.releaseCapture&&this.editor.renderer.scroller.releaseCapture()},this.focusWait=function(){var e=u(this.mousedownEvent.x,this.mousedownEvent.y,this.x,this.y),t=Date.now();(e>i||t-this.mousedownEvent.time>this.$focusTimeout)&&this.startSelect(this.mousedownEvent.getDocumentPosition())},this.onDoubleClick=function(e){var t=e.getDocumentPosition(),n=this.editor,r=n.session,i=r.getBracketRange(t);i?(i.isEmpty()&&(i.start.column--,i.end.column++),this.setState("select")):(i=n.selection.getWordRange(t.row,t.column),this.setState("selectByWords")),this.$clickSelection=i,this.select()},this.onTripleClick=function(e){var t=e.getDocumentPosition(),n=this.editor;this.setState("selectByLines");var r=n.getSelectionRange();r.isMultiLine()&&r.contains(t.row,t.column)?(this.$clickSelection=n.selection.getLineRange(r.start.row),this.$clickSelection.end=n.selection.getLineRange(r.end.row).end):this.$clickSelection=n.selection.getLineRange(t.row),this.select()},this.onQuadClick=function(e){var t=this.editor;t.selectAll(),this.$clickSelection=t.getSelectionRange(),this.setState("selectAll")},this.onMouseWheel=function(e){if(e.getAccelKey())return;e.getShiftKey()&&e.wheelY&&!e.wheelX&&(e.wheelX=e.wheelY,e.wheelY=0);var t=this.editor;this.$lastScroll||(this.$lastScroll={t:0,vx:0,vy:0,allowed:0});var n=this.$lastScroll,r=e.domEvent.timeStamp,i=r-n.t,o=i?e.wheelX/i:n.vx,u=i?e.wheelY/i:n.vy;i<s&&(o=(o+n.vx)/2,u=(u+n.vy)/2);var a=Math.abs(o/u),f=!1;a>=1&&t.renderer.isScrollableBy(e.wheelX*e.speed,0)&&(f=!0),a<=1&&t.renderer.isScrollableBy(0,e.wheelY*e.speed)&&(f=!0);if(f)n.allowed=r;else if(r-n.allowed<s){var l=Math.abs(o)<=1.5*Math.abs(n.vx)&&Math.abs(u)<=1.5*Math.abs(n.vy);l?(f=!0,n.allowed=r):n.allowed=0}n.t=r,n.vx=o,n.vy=u;if(f)return t.renderer.scrollBy(e.wheelX*e.speed,e.wheelY*e.speed),e.stop()}}).call(o.prototype),t.DefaultHandlers=o}),define("ace/tooltip",["require","exports","module","ace/lib/oop","ace/lib/dom"],function(e,t,n){"use strict";function s(e){this.isOpen=!1,this.$element=null,this.$parentNode=e}var r=e("./lib/oop"),i=e("./lib/dom");(function(){this.$init=function(){return this.$element=i.createElement("div"),this.$element.className="ace_tooltip",this.$element.style.display="none",this.$parentNode.appendChild(this.$element),this.$element},this.getElement=function(){return this.$element||this.$init()},this.setText=function(e){this.getElement().textContent=e},this.setHtml=function(e){this.getElement().innerHTML=e},this.setPosition=function(e,t){this.getElement().style.left=e+"px",this.getElement().style.top=t+"px"},this.setClassName=function(e){i.addCssClass(this.getElement(),e)},this.show=function(e,t,n){e!=null&&this.setText(e),t!=null&&n!=null&&this.setPosition(t,n),this.isOpen||(this.getElement().style.display="block",this.isOpen=!0)},this.hide=function(){this.isOpen&&(this.getElement().style.display="none",this.isOpen=!1)},this.getHeight=function(){return this.getElement().offsetHeight},this.getWidth=function(){return this.getElement().offsetWidth},this.destroy=function(){this.isOpen=!1,this.$element&&this.$element.parentNode&&this.$element.parentNode.removeChild(this.$element)}}).call(s.prototype),t.Tooltip=s}),define("ace/mouse/default_gutter_handler",["require","exports","module","ace/lib/dom","ace/lib/oop","ace/lib/event","ace/tooltip"],function(e,t,n){"use strict";function u(e){function l(){var r=u.getDocumentPosition().row,s=n.$annotations[r];if(!s)return c();var o=t.session.getLength();if(r==o){var a=t.renderer.pixelToScreenCoordinates(0,u.y).row,l=u.$pos;if(a>t.session.documentToScreenRow(l.row,l.column))return c()}if(f==s)return;f=s.text.join("<br/>"),i.setHtml(f),i.show(),t._signal("showGutterTooltip",i),t.on("mousewheel",c);if(e.$tooltipFollowsMouse)h(u);else{var p=u.domEvent.target,d=p.getBoundingClientRect(),v=i.getElement().style;v.left=d.right+"px",v.top=d.bottom+"px"}}function c(){o&&(o=clearTimeout(o)),f&&(i.hide(),f=null,t._signal("hideGutterTooltip",i),t.removeEventListener("mousewheel",c))}function h(e){i.setPosition(e.x,e.y)}var t=e.editor,n=t.renderer.$gutterLayer,i=new a(t.container);e.editor.setDefaultHandler("guttermousedown",function(r){if(!t.isFocused()||r.getButton()!=0)return;var i=n.getRegion(r);if(i=="foldWidgets")return;var s=r.getDocumentPosition().row,o=t.session.selection;if(r.getShiftKey())o.selectTo(s,0);else{if(r.domEvent.detail==2)return t.selectAll(),r.preventDefault();e.$clickSelection=t.selection.getLineRange(s)}return e.setState("selectByLines"),e.captureMouse(r),r.preventDefault()});var o,u,f;e.editor.setDefaultHandler("guttermousemove",function(t){var n=t.domEvent.target||t.domEvent.srcElement;if(r.hasCssClass(n,"ace_fold-widget"))return c();f&&e.$tooltipFollowsMouse&&h(t),u=t;if(o)return;o=setTimeout(function(){o=null,u&&!e.isMousePressed?l():c()},50)}),s.addListener(t.renderer.$gutter,"mouseout",function(e){u=null;if(!f||o)return;o=setTimeout(function(){o=null,c()},50)}),t.on("changeSession",c)}function a(e){o.call(this,e)}var r=e("../lib/dom"),i=e("../lib/oop"),s=e("../lib/event"),o=e("../tooltip").Tooltip;i.inherits(a,o),function(){this.setPosition=function(e,t){var n=window.innerWidth||document.documentElement.clientWidth,r=window.innerHeight||document.documentElement.clientHeight,i=this.getWidth(),s=this.getHeight();e+=15,t+=15,e+i>n&&(e-=e+i-n),t+s>r&&(t-=20+s),o.prototype.setPosition.call(this,e,t)}}.call(a.prototype),t.GutterHandler=u}),define("ace/mouse/mouse_event",["require","exports","module","ace/lib/event","ace/lib/useragent"],function(e,t,n){"use strict";var r=e("../lib/event"),i=e("../lib/useragent"),s=t.MouseEvent=function(e,t){this.domEvent=e,this.editor=t,this.x=this.clientX=e.clientX,this.y=this.clientY=e.clientY,this.$pos=null,this.$inSelection=null,this.propagationStopped=!1,this.defaultPrevented=!1};(function(){this.stopPropagation=function(){r.stopPropagation(this.domEvent),this.propagationStopped=!0},this.preventDefault=function(){r.preventDefault(this.domEvent),this.defaultPrevented=!0},this.stop=function(){this.stopPropagation(),this.preventDefault()},this.getDocumentPosition=function(){return this.$pos?this.$pos:(this.$pos=this.editor.renderer.screenToTextCoordinates(this.clientX,this.clientY),this.$pos)},this.inSelection=function(){if(this.$inSelection!==null)return this.$inSelection;var e=this.editor,t=e.getSelectionRange();if(t.isEmpty())this.$inSelection=!1;else{var n=this.getDocumentPosition();this.$inSelection=t.contains(n.row,n.column)}return this.$inSelection},this.getButton=function(){return r.getButton(this.domEvent)},this.getShiftKey=function(){return this.domEvent.shiftKey},this.getAccelKey=i.isMac?function(){return this.domEvent.metaKey}:function(){return this.domEvent.ctrlKey}}).call(s.prototype)}),define("ace/mouse/dragdrop_handler",["require","exports","module","ace/lib/dom","ace/lib/event","ace/lib/useragent"],function(e,t,n){"use strict";function f(e){function T(e,n){var r=Date.now(),i=!n||e.row!=n.row,s=!n||e.column!=n.column;if(!S||i||s)t.moveCursorToPosition(e),S=r,x={x:p,y:d};else{var o=l(x.x,x.y,p,d);o>a?S=null:r-S>=u&&(t.renderer.scrollCursorIntoView(),S=null)}}function N(e,n){var r=Date.now(),i=t.renderer.layerConfig.lineHeight,s=t.renderer.layerConfig.characterWidth,u=t.renderer.scroller.getBoundingClientRect(),a={x:{left:p-u.left,right:u.right-p},y:{top:d-u.top,bottom:u.bottom-d}},f=Math.min(a.x.left,a.x.right),l=Math.min(a.y.top,a.y.bottom),c={row:e.row,column:e.column};f/s<=2&&(c.column+=a.x.left<a.x.right?-3:2),l/i<=1&&(c.row+=a.y.top<a.y.bottom?-1:1);var h=e.row!=c.row,v=e.column!=c.column,m=!n||e.row!=n.row;h||v&&!m?E?r-E>=o&&t.renderer.scrollCursorIntoView(c):E=r:E=null}function C(){var e=g;g=t.renderer.screenToTextCoordinates(p,d),T(g,e),N(g,e)}function k(){m=t.selection.toOrientedRange(),h=t.session.addMarker(m,"ace_selection",t.getSelectionStyle()),t.clearSelection(),t.isFocused()&&t.renderer.$cursorLayer.setBlinking(!1),clearInterval(v),C(),v=setInterval(C,20),y=0,i.addListener(document,"mousemove",O)}function L(){clearInterval(v),t.session.removeMarker(h),h=null,t.selection.fromOrientedRange(m),t.isFocused()&&!w&&t.$resetCursorStyle(),m=null,g=null,y=0,E=null,S=null,i.removeListener(document,"mousemove",O)}function O(){A==null&&(A=setTimeout(function(){A!=null&&h&&L()},20))}function M(e){var t=e.types;return!t||Array.prototype.some.call(t,function(e){return e=="text/plain"||e=="Text"})}function _(e){var t=["copy","copymove","all","uninitialized"],n=["move","copymove","linkmove","all","uninitialized"],r=s.isMac?e.altKey:e.ctrlKey,i="uninitialized";try{i=e.dataTransfer.effectAllowed.toLowerCase()}catch(e){}var o="none";return r&&t.indexOf(i)>=0?o="copy":n.indexOf(i)>=0?o="move":t.indexOf(i)>=0&&(o="copy"),o}var t=e.editor,n=r.createElement("img");n.src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",s.isOpera&&(n.style.cssText="width:1px;height:1px;position:fixed;top:0;left:0;z-index:2147483647;opacity:0;");var f=["dragWait","dragWaitEnd","startDrag","dragReadyEnd","onMouseDrag"];f.forEach(function(t){e[t]=this[t]},this),t.addEventListener("mousedown",this.onMouseDown.bind(e));var c=t.container,h,p,d,v,m,g,y=0,b,w,E,S,x;this.onDragStart=function(e){if(this.cancelDrag||!c.draggable){var r=this;return setTimeout(function(){r.startSelect(),r.captureMouse(e)},0),e.preventDefault()}m=t.getSelectionRange();var i=e.dataTransfer;i.effectAllowed=t.getReadOnly()?"copy":"copyMove",s.isOpera&&(t.container.appendChild(n),n.scrollTop=0),i.setDragImage&&i.setDragImage(n,0,0),s.isOpera&&t.container.removeChild(n),i.clearData(),i.setData("Text",t.session.getTextRange()),w=!0,this.setState("drag")},this.onDragEnd=function(e){c.draggable=!1,w=!1,this.setState(null);if(!t.getReadOnly()){var n=e.dataTransfer.dropEffect;!b&&n=="move"&&t.session.remove(t.getSelectionRange()),t.$resetCursorStyle()}this.editor.unsetStyle("ace_dragging"),this.editor.renderer.setCursorStyle("")},this.onDragEnter=function(e){if(t.getReadOnly()||!M(e.dataTransfer))return;return p=e.clientX,d=e.clientY,h||k(),y++,e.dataTransfer.dropEffect=b=_(e),i.preventDefault(e)},this.onDragOver=function(e){if(t.getReadOnly()||!M(e.dataTransfer))return;return p=e.clientX,d=e.clientY,h||(k(),y++),A!==null&&(A=null),e.dataTransfer.dropEffect=b=_(e),i.preventDefault(e)},this.onDragLeave=function(e){y--;if(y<=0&&h)return L(),b=null,i.preventDefault(e)},this.onDrop=function(e){if(!g)return;var n=e.dataTransfer;if(w)switch(b){case"move":m.contains(g.row,g.column)?m={start:g,end:g}:m=t.moveText(m,g);break;case"copy":m=t.moveText(m,g,!0)}else{var r=n.getData("Text");m={start:g,end:t.session.insert(g,r)},t.focus(),b=null}return L(),i.preventDefault(e)},i.addListener(c,"dragstart",this.onDragStart.bind(e)),i.addListener(c,"dragend",this.onDragEnd.bind(e)),i.addListener(c,"dragenter",this.onDragEnter.bind(e)),i.addListener(c,"dragover",this.onDragOver.bind(e)),i.addListener(c,"dragleave",this.onDragLeave.bind(e)),i.addListener(c,"drop",this.onDrop.bind(e));var A=null}function l(e,t,n,r){return Math.sqrt(Math.pow(n-e,2)+Math.pow(r-t,2))}var r=e("../lib/dom"),i=e("../lib/event"),s=e("../lib/useragent"),o=200,u=200,a=5;(function(){this.dragWait=function(){var e=Date.now()-this.mousedownEvent.time;e>this.editor.getDragDelay()&&this.startDrag()},this.dragWaitEnd=function(){var e=this.editor.container;e.draggable=!1,this.startSelect(this.mousedownEvent.getDocumentPosition()),this.selectEnd()},this.dragReadyEnd=function(e){this.editor.$resetCursorStyle(),this.editor.unsetStyle("ace_dragging"),this.editor.renderer.setCursorStyle(""),this.dragWaitEnd()},this.startDrag=function(){this.cancelDrag=!1;var e=this.editor,t=e.container;t.draggable=!0,e.renderer.$cursorLayer.setBlinking(!1),e.setStyle("ace_dragging");var n=s.isWin?"default":"move";e.renderer.setCursorStyle(n),this.setState("dragReady")},this.onMouseDrag=function(e){var t=this.editor.container;if(s.isIE&&this.state=="dragReady"){var n=l(this.mousedownEvent.x,this.mousedownEvent.y,this.x,this.y);n>3&&t.dragDrop()}if(this.state==="dragWait"){var n=l(this.mousedownEvent.x,this.mousedownEvent.y,this.x,this.y);n>0&&(t.draggable=!1,this.startSelect(this.mousedownEvent.getDocumentPosition()))}},this.onMouseDown=function(e){if(!this.$dragEnabled)return;this.mousedownEvent=e;var t=this.editor,n=e.inSelection(),r=e.getButton(),i=e.domEvent.detail||1;if(i===1&&r===0&&n){if(e.editor.inMultiSelectMode&&(e.getAccelKey()||e.getShiftKey()))return;this.mousedownEvent.time=Date.now();var o=e.domEvent.target||e.domEvent.srcElement;"unselectable"in o&&(o.unselectable="on");if(t.getDragDelay()){if(s.isWebKit){this.cancelDrag=!0;var u=t.container;u.draggable=!0}this.setState("dragWait")}else this.startDrag();this.captureMouse(e,this.onMouseDrag.bind(this)),e.defaultPrevented=!0}}}).call(f.prototype),t.DragdropHandler=f}),define("ace/mouse/touch_handler",["require","exports","module","ace/mouse/mouse_event","ace/lib/event","ace/lib/dom"],function(e,t,n){"use strict";var r=e("./mouse_event").MouseEvent,i=e("../lib/event"),s=e("../lib/dom");t.addTouchListeners=function(e,t){function b(){var e=window.navigator&&window.navigator.clipboard,r=!1,i=function(){var n=t.getCopyText(),i=t.session.getUndoManager().hasUndo();y.replaceChild(s.buildDom(r?["span",!n&&["span",{"class":"ace_mobile-button",action:"selectall"},"Select All"],n&&["span",{"class":"ace_mobile-button",action:"copy"},"Copy"],n&&["span",{"class":"ace_mobile-button",action:"cut"},"Cut"],e&&["span",{"class":"ace_mobile-button",action:"paste"},"Paste"],i&&["span",{"class":"ace_mobile-button",action:"undo"},"Undo"],["span",{"class":"ace_mobile-button",action:"find"},"Find"],["span",{"class":"ace_mobile-button",action:"openCommandPallete"},"Pallete"]]:["span"]),y.firstChild)},o=function(n){var s=n.target.getAttribute("action");if(s=="more"||!r)return r=!r,i();if(s=="paste")e.readText().then(function(e){t.execCommand(s,e)});else if(s){if(s=="cut"||s=="copy")e?e.writeText(t.getCopyText()):document.execCommand("copy");t.execCommand(s)}y.firstChild.style.display="none",r=!1,s!="openCommandPallete"&&t.focus()};y=s.buildDom(["div",{"class":"ace_mobile-menu",ontouchstart:function(e){n="menu",e.stopPropagation(),e.preventDefault(),t.textInput.focus()},ontouchend:function(e){e.stopPropagation(),e.preventDefault(),o(e)},onclick:o},["span"],["span",{"class":"ace_mobile-button",action:"more"},"..."]],t.container)}function w(){y||b();var e=t.selection.cursor,n=t.renderer.textToScreenCoordinates(e.row,e.column),r=t.container.getBoundingClientRect();y.style.top=n.pageY-r.top-3+"px",y.style.right="10px",y.style.display="",y.firstChild.style.display="none",t.on("input",E)}function E(e){y&&(y.style.display="none"),t.off("input",E)}function S(){l=null,clearTimeout(l);var e=t.selection.getRange(),r=e.contains(p.row,p.column);if(e.isEmpty()||!r)t.selection.moveToPosition(p),t.selection.selectWord();n="wait",w()}function x(){l=null,clearTimeout(l),t.selection.moveToPosition(p);var e=d>=2?t.selection.getLineRange(p.row):t.session.getBracketRange(p);e&&!e.isEmpty()?t.selection.setRange(e):t.selection.selectWord(),n="wait"}function T(){h+=60,c=setInterval(function(){h--<=0&&(clearInterval(c),c=null),Math.abs(v)<.01&&(v=0),Math.abs(m)<.01&&(m=0),h<20&&(v=.9*v),h<20&&(m=.9*m);var e=t.session.getScrollTop();t.renderer.scrollBy(10*v,10*m),e==t.session.getScrollTop()&&(h=0)},10)}var n="scroll",o,u,a,f,l,c,h=0,p,d=0,v=0,m=0,g,y;i.addListener(e,"contextmenu",function(e){if(!g)return;var n=t.textInput.getElement();n.focus()}),i.addListener(e,"touchstart",function(e){var i=e.touches;if(l||i.length>1){clearTimeout(l),l=null,a=-1,n="zoom";return}g=t.$mouseHandler.isMousePressed=!0;var s=t.renderer.layerConfig.lineHeight,c=t.renderer.layerConfig.lineHeight,y=e.timeStamp;f=y;var b=i[0],w=b.clientX,E=b.clientY;Math.abs(o-w)+Math.abs(u-E)>s&&(a=-1),o=e.clientX=w,u=e.clientY=E,v=m=0;var T=new r(e,t);p=T.getDocumentPosition();if(y-a<500&&i.length==1&&!h)d++,e.preventDefault(),e.button=0,x();else{d=0;var N=t.selection.cursor,C=t.selection.isEmpty()?N:t.selection.anchor,k=t.renderer.$cursorLayer.getPixelPosition(N,!0),L=t.renderer.$cursorLayer.getPixelPosition(C,!0),A=t.renderer.scroller.getBoundingClientRect(),O=function(e,t){return e/=c,t=t/s-.75,e*e+t*t};if(e.clientX<A.left){n="zoom";return}var M=O(e.clientX-A.left-k.left,e.clientY-A.top-k.top),_=O(e.clientX-A.left-L.left,e.clientY-A.top-L.top);M<3.5&&_<3.5&&(n=M>_?"cursor":"anchor"),_<3.5?n="anchor":M<3.5?n="cursor":n="scroll",l=setTimeout(S,450)}a=y}),i.addListener(e,"touchend",function(e){g=t.$mouseHandler.isMousePressed=!1,c&&clearInterval(c),n=="zoom"?(n="",h=0):l?(t.selection.moveToPosition(p),h=0,w()):n=="scroll"?(T(),e.preventDefault(),E()):w(),clearTimeout(l),l=null}),i.addListener(e,"touchmove",function(e){l&&(clearTimeout(l),l=null);var i=e.touches;if(i.length>1||n=="zoom")return;var s=i[0],a=o-s.clientX,c=u-s.clientY;if(n=="wait"){if(!(a*a+c*c>4))return e.preventDefault();n="cursor"}o=s.clientX,u=s.clientY,e.clientX=s.clientX,e.clientY=s.clientY;var h=e.timeStamp,p=h-f;f=h;if(n=="scroll"){var d=new r(e,t);d.speed=1,d.wheelX=a,d.wheelY=c,10*Math.abs(a)<Math.abs(c)&&(a=0),10*Math.abs(c)<Math.abs(a)&&(c=0),p!=0&&(v=a/p,m=c/p),t._emit("mousewheel",d),d.propagationStopped||(v=m=0)}else{var g=new r(e,t),y=g.getDocumentPosition();n=="cursor"?t.selection.moveCursorToPosition(y):n=="anchor"&&t.selection.setSelectionAnchor(y.row,y.column),t.renderer.scrollCursorIntoView(y),e.preventDefault()}})}}),define("ace/lib/net",["require","exports","module","ace/lib/dom"],function(e,t,n){"use strict";var r=e("./dom");t.get=function(e,t){var n=new XMLHttpRequest;n.open("GET",e,!0),n.onreadystatechange=function(){n.readyState===4&&t(n.responseText)},n.send(null)},t.loadScript=function(e,t){var n=r.getDocumentHead(),i=document.createElement("script");i.src=e,n.appendChild(i),i.onload=i.onreadystatechange=function(e,n){if(n||!i.readyState||i.readyState=="loaded"||i.readyState=="complete")i=i.onload=i.onreadystatechange=null,n||t()}},t.qualifyURL=function(e){var t=document.createElement("a");return t.href=e,t.href}}),define("ace/lib/event_emitter",["require","exports","module"],function(e,t,n){"use strict";var r={},i=function(){this.propagationStopped=!0},s=function(){this.defaultPrevented=!0};r._emit=r._dispatchEvent=function(e,t){this._eventRegistry||(this._eventRegistry={}),this._defaultHandlers||(this._defaultHandlers={});var n=this._eventRegistry[e]||[],r=this._defaultHandlers[e];if(!n.length&&!r)return;if(typeof t!="object"||!t)t={};t.type||(t.type=e),t.stopPropagation||(t.stopPropagation=i),t.preventDefault||(t.preventDefault=s),n=n.slice();for(var o=0;o<n.length;o++){n[o](t,this);if(t.propagationStopped)break}if(r&&!t.defaultPrevented)return r(t,this)},r._signal=function(e,t){var n=(this._eventRegistry||{})[e];if(!n)return;n=n.slice();for(var r=0;r<n.length;r++)n[r](t,this)},r.once=function(e,t){var n=this;this.addEventListener(e,function r(){n.removeEventListener(e,r),t.apply(null,arguments)});if(!t)return new Promise(function(e){t=e})},r.setDefaultHandler=function(e,t){var n=this._defaultHandlers;n||(n=this._defaultHandlers={_disabled_:{}});if(n[e]){var r=n[e],i=n._disabled_[e];i||(n._disabled_[e]=i=[]),i.push(r);var s=i.indexOf(t);s!=-1&&i.splice(s,1)}n[e]=t},r.removeDefaultHandler=function(e,t){var n=this._defaultHandlers;if(!n)return;var r=n._disabled_[e];if(n[e]==t)r&&this.setDefaultHandler(e,r.pop());else if(r){var i=r.indexOf(t);i!=-1&&r.splice(i,1)}},r.on=r.addEventListener=function(e,t,n){this._eventRegistry=this._eventRegistry||{};var r=this._eventRegistry[e];return r||(r=this._eventRegistry[e]=[]),r.indexOf(t)==-1&&r[n?"unshift":"push"](t),t},r.off=r.removeListener=r.removeEventListener=function(e,t){this._eventRegistry=this._eventRegistry||{};var n=this._eventRegistry[e];if(!n)return;var r=n.indexOf(t);r!==-1&&n.splice(r,1)},r.removeAllListeners=function(e){this._eventRegistry&&(this._eventRegistry[e]=[])},t.EventEmitter=r}),define("ace/lib/app_config",["require","exports","module","ace/lib/oop","ace/lib/event_emitter"],function(e,t,n){"no use strict";function o(e){typeof console!="undefined"&&console.warn&&console.warn.apply(console,arguments)}function u(e,t){var n=new Error(e);n.data=t,typeof console=="object"&&console.error&&console.error(n),setTimeout(function(){throw n})}var r=e("./oop"),i=e("./event_emitter").EventEmitter,s={setOptions:function(e){Object.keys(e).forEach(function(t){this.setOption(t,e[t])},this)},getOptions:function(e){var t={};if(!e){var n=this.$options;e=Object.keys(n).filter(function(e){return!n[e].hidden})}else Array.isArray(e)||(t=e,e=Object.keys(t));return e.forEach(function(e){t[e]=this.getOption(e)},this),t},setOption:function(e,t){if(this["$"+e]===t)return;var n=this.$options[e];if(!n)return o('misspelled option "'+e+'"');if(n.forwardTo)return this[n.forwardTo]&&this[n.forwardTo].setOption(e,t);n.handlesSet||(this["$"+e]=t),n&&n.set&&n.set.call(this,t)},getOption:function(e){var t=this.$options[e];return t?t.forwardTo?this[t.forwardTo]&&this[t.forwardTo].getOption(e):t&&t.get?t.get.call(this):this["$"+e]:o('misspelled option "'+e+'"')}},a=function(){this.$defaultOptions={}};(function(){r.implement(this,i),this.defineOptions=function(e,t,n){return e.$options||(this.$defaultOptions[t]=e.$options={}),Object.keys(n).forEach(function(t){var r=n[t];typeof r=="string"&&(r={forwardTo:r}),r.name||(r.name=t),e.$options[r.name]=r,"initialValue"in r&&(e["$"+r.name]=r.initialValue)}),r.implement(e,s),this},this.resetOptions=function(e){Object.keys(e.$options).forEach(function(t){var n=e.$options[t];"value"in n&&e.setOption(t,n.value)})},this.setDefaultValue=function(e,t,n){if(!e){for(e in this.$defaultOptions)if(this.$defaultOptions[e][t])break;if(!this.$defaultOptions[e][t])return!1}var r=this.$defaultOptions[e]||(this.$defaultOptions[e]={});r[t]&&(r.forwardTo?this.setDefaultValue(r.forwardTo,t,n):r[t].value=n)},this.setDefaultValues=function(e,t){Object.keys(t).forEach(function(n){this.setDefaultValue(e,n,t[n])},this)},this.warn=o,this.reportError=u}).call(a.prototype),t.AppConfig=a}),define("ace/config",["require","exports","module","ace/lib/lang","ace/lib/oop","ace/lib/net","ace/lib/app_config"],function(e,t,n){"no use strict";function l(r){if(!u||!u.document)return;a.packaged=r||e.packaged||n.packaged||u.define&&define.packaged;var i={},s="",o=document.currentScript||document._currentScript,f=o&&o.ownerDocument||document,l=f.getElementsByTagName("script");for(var h=0;h<l.length;h++){var p=l[h],d=p.src||p.getAttribute("src");if(!d)continue;var v=p.attributes;for(var m=0,g=v.length;m<g;m++){var y=v[m];y.name.indexOf("data-ace-")===0&&(i[c(y.name.replace(/^data-ace-/,""))]=y.value)}var b=d.match(/^(.*)\/ace(\-\w+)?\.js(\?|$)/);b&&(s=b[1])}s&&(i.base=i.base||s,i.packaged=!0),i.basePath=i.base,i.workerPath=i.workerPath||i.base,i.modePath=i.modePath||i.base,i.themePath=i.themePath||i.base,delete i.base;for(var w in i)typeof i[w]!="undefined"&&t.set(w,i[w])}function c(e){return e.replace(/-(.)/g,function(e,t){return t.toUpperCase()})}var r=e("./lib/lang"),i=e("./lib/oop"),s=e("./lib/net"),o=e("./lib/app_config").AppConfig;n.exports=t=new o;var u=function(){return this||typeof window!="undefined"&&window}(),a={packaged:!1,workerPath:null,modePath:null,themePath:null,basePath:"",suffix:".js",$moduleUrls:{},loadWorkerFromBlob:!0,sharedPopups:!1};t.get=function(e){if(!a.hasOwnProperty(e))throw new Error("Unknown config key: "+e);return a[e]},t.set=function(e,t){if(a.hasOwnProperty(e))a[e]=t;else if(this.setDefaultValue("",e,t)==0)throw new Error("Unknown config key: "+e)},t.all=function(){return r.copyObject(a)},t.$modes={},t.moduleUrl=function(e,t){if(a.$moduleUrls[e])return a.$moduleUrls[e];var n=e.split("/");t=t||n[n.length-2]||"";var r=t=="snippets"?"/":"-",i=n[n.length-1];if(t=="worker"&&r=="-"){var s=new RegExp("^"+t+"[\\-_]|[\\-_]"+t+"$","g");i=i.replace(s,"")}(!i||i==t)&&n.length>1&&(i=n[n.length-2]);var o=a[t+"Path"];return o==null?o=a.basePath:r=="/"&&(t=r=""),o&&o.slice(-1)!="/"&&(o+="/"),o+t+r+i+this.get("suffix")},t.setModuleUrl=function(e,t){return a.$moduleUrls[e]=t},t.$loading={},t.loadModule=function(n,r){var i,o;Array.isArray(n)&&(o=n[0],n=n[1]);try{i=e(n)}catch(u){}if(i&&!t.$loading[n])return r&&r(i);t.$loading[n]||(t.$loading[n]=[]),t.$loading[n].push(r);if(t.$loading[n].length>1)return;var a=function(){e([n],function(e){t._emit("load.module",{name:n,module:e});var r=t.$loading[n];t.$loading[n]=null,r.forEach(function(t){t&&t(e)})})};if(!t.get("packaged"))return a();s.loadScript(t.moduleUrl(n,o),a),f()};var f=function(){!a.basePath&&!a.workerPath&&!a.modePath&&!a.themePath&&!Object.keys(a.$moduleUrls).length&&(console.error("Unable to infer path to ace from script src,","use ace.config.set('basePath', 'path') to enable dynamic loading of modes and themes","or with webpack use ace/webpack-resolver"),f=function(){})};t.init=l,t.version="1.4.8"}),define("ace/mouse/mouse_handler",["require","exports","module","ace/lib/event","ace/lib/useragent","ace/mouse/default_handlers","ace/mouse/default_gutter_handler","ace/mouse/mouse_event","ace/mouse/dragdrop_handler","ace/mouse/touch_handler","ace/config"],function(e,t,n){"use strict";var r=e("../lib/event"),i=e("../lib/useragent"),s=e("./default_handlers").DefaultHandlers,o=e("./default_gutter_handler").GutterHandler,u=e("./mouse_event").MouseEvent,a=e("./dragdrop_handler").DragdropHandler,f=e("./touch_handler").addTouchListeners,l=e("../config"),c=function(e){var t=this;this.editor=e,new s(this),new o(this),new a(this);var n=function(t){var n=!document.hasFocus||!document.hasFocus()||!e.isFocused()&&document.activeElement==(e.textInput&&e.textInput.getElement());n&&window.focus(),e.focus()},u=e.renderer.getMouseEventTarget();r.addListener(u,"click",this.onMouseEvent.bind(this,"click")),r.addListener(u,"mousemove",this.onMouseMove.bind(this,"mousemove")),r.addMultiMouseDownListener([u,e.renderer.scrollBarV&&e.renderer.scrollBarV.inner,e.renderer.scrollBarH&&e.renderer.scrollBarH.inner,e.textInput&&e.textInput.getElement()].filter(Boolean),[400,300,250],this,"onMouseEvent"),r.addMouseWheelListener(e.container,this.onMouseWheel.bind(this,"mousewheel")),f(e.container,e);var l=e.renderer.$gutter;r.addListener(l,"mousedown",this.onMouseEvent.bind(this,"guttermousedown")),r.addListener(l,"click",this.onMouseEvent.bind(this,"gutterclick")),r.addListener(l,"dblclick",this.onMouseEvent.bind(this,"gutterdblclick")),r.addListener(l,"mousemove",this.onMouseEvent.bind(this,"guttermousemove")),r.addListener(u,"mousedown",n),r.addListener(l,"mousedown",n),i.isIE&&e.renderer.scrollBarV&&(r.addListener(e.renderer.scrollBarV.element,"mousedown",n),r.addListener(e.renderer.scrollBarH.element,"mousedown",n)),e.on("mousemove",function(n){if(t.state||t.$dragDelay||!t.$dragEnabled)return;var r=e.renderer.screenToTextCoordinates(n.x,n.y),i=e.session.selection.getRange(),s=e.renderer;!i.isEmpty()&&i.insideStart(r.row,r.column)?s.setCursorStyle("default"):s.setCursorStyle("")})};(function(){this.onMouseEvent=function(e,t){this.editor._emit(e,new u(t,this.editor))},this.onMouseMove=function(e,t){var n=this.editor._eventRegistry&&this.editor._eventRegistry.mousemove;if(!n||!n.length)return;this.editor._emit(e,new u(t,this.editor))},this.onMouseWheel=function(e,t){var n=new u(t,this.editor);n.speed=this.$scrollSpeed*2,n.wheelX=t.wheelX,n.wheelY=t.wheelY,this.editor._emit(e,n)},this.setState=function(e){this.state=e},this.captureMouse=function(e,t){this.x=e.x,this.y=e.y,this.isMousePressed=!0;var n=this.editor,s=this.editor.renderer;s.$isMousePressed=!0;var o=this,a=function(e){if(!e)return;if(i.isWebKit&&!e.which&&o.releaseMouse)return o.releaseMouse();o.x=e.clientX,o.y=e.clientY,t&&t(e),o.mouseEvent=new u(e,o.editor),o.$mouseMoved=!0},f=function(e){n.off("beforeEndOperation",c),clearInterval(h),l(),o[o.state+"End"]&&o[o.state+"End"](e),o.state="",o.isMousePressed=s.$isMousePressed=!1,s.$keepTextAreaAtCursor&&s.$moveTextAreaToCursor(),o.$onCaptureMouseMove=o.releaseMouse=null,e&&o.onMouseEvent("mouseup",e),n.endOperation()},l=function(){o[o.state]&&o[o.state](),o.$mouseMoved=!1};if(i.isOldIE&&e.domEvent.type=="dblclick")return setTimeout(function(){f(e)});var c=function(e){if(!o.releaseMouse)return;n.curOp.command.name&&n.curOp.selectionChanged&&(o[o.state+"End"]&&o[o.state+"End"](),o.state="",o.releaseMouse())};n.on("beforeEndOperation",c),n.startOperation({command:{name:"mouse"}}),o.$onCaptureMouseMove=a,o.releaseMouse=r.capture(this.editor.container,a,f);var h=setInterval(l,20)},this.releaseMouse=null,this.cancelContextMenu=function(){var e=function(t){if(t&&t.domEvent&&t.domEvent.type!="contextmenu")return;this.editor.off("nativecontextmenu",e),t&&t.domEvent&&r.stopEvent(t.domEvent)}.bind(this);setTimeout(e,10),this.editor.on("nativecontextmenu",e)}}).call(c.prototype),l.defineOptions(c.prototype,"mouseHandler",{scrollSpeed:{initialValue:2},dragDelay:{initialValue:i.isMac?150:0},dragEnabled:{initialValue:!0},focusTimeout:{initialValue:0},tooltipFollowsMouse:{initialValue:!0}}),t.MouseHandler=c}),define("ace/mouse/fold_handler",["require","exports","module","ace/lib/dom"],function(e,t,n){"use strict";function i(e){e.on("click",function(t){var n=t.getDocumentPosition(),i=e.session,s=i.getFoldAt(n.row,n.column,1);s&&(t.getAccelKey()?i.removeFold(s):i.expandFold(s),t.stop());var o=t.domEvent&&t.domEvent.target;o&&r.hasCssClass(o,"ace_inline_button")&&r.hasCssClass(o,"ace_toggle_wrap")&&(i.setOption("wrap",!i.getUseWrapMode()),e.renderer.scrollCursorIntoView())}),e.on("gutterclick",function(t){var n=e.renderer.$gutterLayer.getRegion(t);if(n=="foldWidgets"){var r=t.getDocumentPosition().row,i=e.session;i.foldWidgets&&i.foldWidgets[r]&&e.session.onFoldWidgetClick(r,t),e.isFocused()||e.focus(),t.stop()}}),e.on("gutterdblclick",function(t){var n=e.renderer.$gutterLayer.getRegion(t);if(n=="foldWidgets"){var r=t.getDocumentPosition().row,i=e.session,s=i.getParentFoldRangeData(r,!0),o=s.range||s.firstRange;if(o){r=o.start.row;var u=i.getFoldAt(r,i.getLine(r).length,1);u?i.removeFold(u):(i.addFold("...",o),e.renderer.scrollCursorIntoView({row:o.start.row,column:0}))}t.stop()}})}var r=e("../lib/dom");t.FoldHandler=i}),define("ace/keyboard/keybinding",["require","exports","module","ace/lib/keys","ace/lib/event"],function(e,t,n){"use strict";var r=e("../lib/keys"),i=e("../lib/event"),s=function(e){this.$editor=e,this.$data={editor:e},this.$handlers=[],this.setDefaultHandler(e.commands)};(function(){this.setDefaultHandler=function(e){this.removeKeyboardHandler(this.$defaultHandler),this.$defaultHandler=e,this.addKeyboardHandler(e,0)},this.setKeyboardHandler=function(e){var t=this.$handlers;if(t[t.length-1]==e)return;while(t[t.length-1]&&t[t.length-1]!=this.$defaultHandler)this.removeKeyboardHandler(t[t.length-1]);this.addKeyboardHandler(e,1)},this.addKeyboardHandler=function(e,t){if(!e)return;typeof e=="function"&&!e.handleKeyboard&&(e.handleKeyboard=e);var n=this.$handlers.indexOf(e);n!=-1&&this.$handlers.splice(n,1),t==undefined?this.$handlers.push(e):this.$handlers.splice(t,0,e),n==-1&&e.attach&&e.attach(this.$editor)},this.removeKeyboardHandler=function(e){var t=this.$handlers.indexOf(e);return t==-1?!1:(this.$handlers.splice(t,1),e.detach&&e.detach(this.$editor),!0)},this.getKeyboardHandler=function(){return this.$handlers[this.$handlers.length-1]},this.getStatusText=function(){var e=this.$data,t=e.editor;return this.$handlers.map(function(n){return n.getStatusText&&n.getStatusText(t,e)||""}).filter(Boolean).join(" ")},this.$callKeyboardHandlers=function(e,t,n,r){var s,o=!1,u=this.$editor.commands;for(var a=this.$handlers.length;a--;){s=this.$handlers[a].handleKeyboard(this.$data,e,t,n,r);if(!s||!s.command)continue;s.command=="null"?o=!0:o=u.exec(s.command,this.$editor,s.args,r),o&&r&&e!=-1&&s.passEvent!=1&&s.command.passEvent!=1&&i.stopEvent(r);if(o)break}return!o&&e==-1&&(s={command:"insertstring"},o=u.exec("insertstring",this.$editor,t)),o&&this.$editor._signal&&this.$editor._signal("keyboardActivity",s),o},this.onCommandKey=function(e,t,n){var i=r.keyCodeToString(n);return this.$callKeyboardHandlers(t,i,n,e)},this.onTextInput=function(e){return this.$callKeyboardHandlers(-1,e)}}).call(s.prototype),t.KeyBinding=s}),define("ace/lib/bidiutil",["require","exports","module"],function(e,t,n){"use strict";function F(e,t,n,r){var i=s?d:p,c=null,h=null,v=null,m=0,g=null,y=null,b=-1,w=null,E=null,T=[];if(!r)for(w=0,r=[];w<n;w++)r[w]=R(e[w]);o=s,u=!1,a=!1,f=!1,l=!1;for(E=0;E<n;E++){c=m,T[E]=h=q(e,r,T,E),m=i[c][h],g=m&240,m&=15,t[E]=v=i[m][5];if(g>0)if(g==16){for(w=b;w<E;w++)t[w]=1;b=-1}else b=-1;y=i[m][6];if(y)b==-1&&(b=E);else if(b>-1){for(w=b;w<E;w++)t[w]=v;b=-1}r[E]==S&&(t[E]=0),o|=v}if(l)for(w=0;w<n;w++)if(r[w]==x){t[w]=s;for(var C=w-1;C>=0;C--){if(r[C]!=N)break;t[C]=s}}}function I(e,t,n){if(o<e)return;if(e==1&&s==m&&!f){n.reverse();return}var r=n.length,i=0,u,a,l,c;while(i<r){if(t[i]>=e){u=i+1;while(u<r&&t[u]>=e)u++;for(a=i,l=u-1;a<l;a++,l--)c=n[a],n[a]=n[l],n[l]=c;i=u}i++}}function q(e,t,n,r){var i=t[r],o,c,h,p;switch(i){case g:case y:u=!1;case E:case w:return i;case b:return u?w:b;case T:return u=!0,a=!0,y;case N:return E;case C:if(r<1||r+1>=t.length||(o=n[r-1])!=b&&o!=w||(c=t[r+1])!=b&&c!=w)return E;return u&&(c=w),c==o?c:E;case k:o=r>0?n[r-1]:S;if(o==b&&r+1<t.length&&t[r+1]==b)return b;return E;case L:if(r>0&&n[r-1]==b)return b;if(u)return E;p=r+1,h=t.length;while(p<h&&t[p]==L)p++;if(p<h&&t[p]==b)return b;return E;case A:h=t.length,p=r+1;while(p<h&&t[p]==A)p++;if(p<h){var d=e[r],v=d>=1425&&d<=2303||d==64286;o=t[p];if(v&&(o==y||o==T))return y}if(r<1||(o=t[r-1])==S)return E;return n[r-1];case S:return u=!1,f=!0,s;case x:return l=!0,E;case O:case M:case D:case P:case _:u=!1;case H:return E}}function R(e){var t=e.charCodeAt(0),n=t>>8;return n==0?t>191?g:B[t]:n==5?/[\u0591-\u05f4]/.test(e)?y:g:n==6?/[\u0610-\u061a\u064b-\u065f\u06d6-\u06e4\u06e7-\u06ed]/.test(e)?A:/[\u0660-\u0669\u066b-\u066c]/.test(e)?w:t==1642?L:/[\u06f0-\u06f9]/.test(e)?b:T:n==32&&t<=8287?j[t&255]:n==254?t>=65136?T:E:E}function U(e){return e>="\u064b"&&e<="\u0655"}var r=["\u0621","\u0641"],i=["\u063a","\u064a"],s=0,o=0,u=!1,a=!1,f=!1,l=!1,c=!1,h=!1,p=[[0,3,0,1,0,0,0],[0,3,0,1,2,2,0],[0,3,0,17,2,0,1],[0,3,5,5,4,1,0],[0,3,21,21,4,0,1],[0,3,5,5,4,2,0]],d=[[2,0,1,1,0,1,0],[2,0,1,1,0,2,0],[2,0,2,1,3,2,0],[2,0,2,33,3,1,1]],v=0,m=1,g=0,y=1,b=2,w=3,E=4,S=5,x=6,T=7,N=8,C=9,k=10,L=11,A=12,O=13,M=14,_=15,D=16,P=17,H=18,B=[H,H,H,H,H,H,H,H,H,x,S,x,N,S,H,H,H,H,H,H,H,H,H,H,H,H,H,H,S,S,S,x,N,E,E,L,L,L,E,E,E,E,E,k,C,k,C,C,b,b,b,b,b,b,b,b,b,b,C,E,E,E,E,E,E,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,E,E,E,E,E,E,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,g,E,E,E,E,H,H,H,H,H,H,S,H,H,H,H,H,H,H,H,H,H,H,H,H,H,H,H,H,H,H,H,H,H,H,H,H,H,C,E,L,L,L,L,E,E,E,E,g,E,E,H,E,E,L,L,b,b,E,g,E,E,E,b,g,E,E,E,E,E],j=[N,N,N,N,N,N,N,N,N,N,N,H,H,H,g,y,E,E,E,E,E,E,E,E,E,E,E,E,E,E,E,E,E,E,E,E,E,E,E,E,N,S,O,M,_,D,P,C,L,L,L,L,L,E,E,E,E,E,E,E,E,E,E,E,E,E,E,E,C,E,E,E,E,E,E,E,E,E,E,E,E,E,E,E,E,E,E,E,E,E,E,E,E,E,E,N];t.L=g,t.R=y,t.EN=b,t.ON_R=3,t.AN=4,t.R_H=5,t.B=6,t.RLE=7,t.DOT="\u00b7",t.doBidiReorder=function(e,n,r){if(e.length<2)return{};var i=e.split(""),o=new Array(i.length),u=new Array(i.length),a=[];s=r?m:v,F(i,a,i.length,n);for(var f=0;f<o.length;o[f]=f,f++);I(2,a,o),I(1,a,o);for(var f=0;f<o.length-1;f++)n[f]===w?a[f]=t.AN:a[f]===y&&(n[f]>T&&n[f]<O||n[f]===E||n[f]===H)?a[f]=t.ON_R:f>0&&i[f-1]==="\u0644"&&/\u0622|\u0623|\u0625|\u0627/.test(i[f])&&(a[f-1]=a[f]=t.R_H,f++);i[i.length-1]===t.DOT&&(a[i.length-1]=t.B),i[0]==="\u202b"&&(a[0]=t.RLE);for(var f=0;f<o.length;f++)u[f]=a[o[f]];return{logicalFromVisual:o,bidiLevels:u}},t.hasBidiCharacters=function(e,t){var n=!1;for(var r=0;r<e.length;r++)t[r]=R(e.charAt(r)),!n&&(t[r]==y||t[r]==T||t[r]==w)&&(n=!0);return n},t.getVisualFromLogicalIdx=function(e,t){for(var n=0;n<t.logicalFromVisual.length;n++)if(t.logicalFromVisual[n]==e)return n;return 0}}),define("ace/bidihandler",["require","exports","module","ace/lib/bidiutil","ace/lib/lang"],function(e,t,n){"use strict";var r=e("./lib/bidiutil"),i=e("./lib/lang"),s=/[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac\u202B]/,o=function(e){this.session=e,this.bidiMap={},this.currentRow=null,this.bidiUtil=r,this.charWidths=[],this.EOL="\u00ac",this.showInvisibles=!0,this.isRtlDir=!1,this.$isRtl=!1,this.line="",this.wrapIndent=0,this.EOF="\u00b6",this.RLE="\u202b",this.contentWidth=0,this.fontMetrics=null,this.rtlLineOffset=0,this.wrapOffset=0,this.isMoveLeftOperation=!1,this.seenBidi=s.test(e.getValue())};(function(){this.isBidiRow=function(e,t,n){return this.seenBidi?(e!==this.currentRow&&(this.currentRow=e,this.updateRowLine(t,n),this.updateBidiMap()),this.bidiMap.bidiLevels):!1},this.onChange=function(e){this.seenBidi?this.currentRow=null:e.action=="insert"&&s.test(e.lines.join("\n"))&&(this.seenBidi=!0,this.currentRow=null)},this.getDocumentRow=function(){var e=0,t=this.session.$screenRowCache;if(t.length){var n=this.session.$getRowCacheIndex(t,this.currentRow);n>=0&&(e=this.session.$docRowCache[n])}return e},this.getSplitIndex=function(){var e=0,t=this.session.$screenRowCache;if(t.length){var n,r=this.session.$getRowCacheIndex(t,this.currentRow);while(this.currentRow-e>0){n=this.session.$getRowCacheIndex(t,this.currentRow-e-1);if(n!==r)break;r=n,e++}}else e=this.currentRow;return e},this.updateRowLine=function(e,t){e===undefined&&(e=this.getDocumentRow());var n=e===this.session.getLength()-1,s=n?this.EOF:this.EOL;this.wrapIndent=0,this.line=this.session.getLine(e),this.isRtlDir=this.$isRtl||this.line.charAt(0)===this.RLE;if(this.session.$useWrapMode){var o=this.session.$wrapData[e];o&&(t===undefined&&(t=this.getSplitIndex()),t>0&&o.length?(this.wrapIndent=o.indent,this.wrapOffset=this.wrapIndent*this.charWidths[r.L],this.line=t<o.length?this.line.substring(o[t-1],o[t]):this.line.substring(o[o.length-1])):this.line=this.line.substring(0,o[t])),t==o.length&&(this.line+=this.showInvisibles?s:r.DOT)}else this.line+=this.showInvisibles?s:r.DOT;var u=this.session,a=0,f;this.line=this.line.replace(/\t|[\u1100-\u2029, \u202F-\uFFE6]/g,function(e,t){return e==="	"||u.isFullWidth(e.charCodeAt(0))?(f=e==="	"?u.getScreenTabSize(t+a):2,a+=f-1,i.stringRepeat(r.DOT,f)):e}),this.isRtlDir&&(this.fontMetrics.$main.textContent=this.line.charAt(this.line.length-1)==r.DOT?this.line.substr(0,this.line.length-1):this.line,this.rtlLineOffset=this.contentWidth-this.fontMetrics.$main.getBoundingClientRect().width)},this.updateBidiMap=function(){var e=[];r.hasBidiCharacters(this.line,e)||this.isRtlDir?this.bidiMap=r.doBidiReorder(this.line,e,this.isRtlDir):this.bidiMap={}},this.markAsDirty=function(){this.currentRow=null},this.updateCharacterWidths=function(e){if(this.characterWidth===e.$characterSize.width)return;this.fontMetrics=e;var t=this.characterWidth=e.$characterSize.width,n=e.$measureCharWidth("\u05d4");this.charWidths[r.L]=this.charWidths[r.EN]=this.charWidths[r.ON_R]=t,this.charWidths[r.R]=this.charWidths[r.AN]=n,this.charWidths[r.R_H]=n*.45,this.charWidths[r.B]=this.charWidths[r.RLE]=0,this.currentRow=null},this.setShowInvisibles=function(e){this.showInvisibles=e,this.currentRow=null},this.setEolChar=function(e){this.EOL=e},this.setContentWidth=function(e){this.contentWidth=e},this.isRtlLine=function(e){return this.$isRtl?!0:e!=undefined?this.session.getLine(e).charAt(0)==this.RLE:this.isRtlDir},this.setRtlDirection=function(e,t){var n=e.getCursorPosition();for(var r=e.selection.getSelectionAnchor().row;r<=n.row;r++)!t&&e.session.getLine(r).charAt(0)===e.session.$bidiHandler.RLE?e.session.doc.removeInLine(r,0,1):t&&e.session.getLine(r).charAt(0)!==e.session.$bidiHandler.RLE&&e.session.doc.insert({column:0,row:r},e.session.$bidiHandler.RLE)},this.getPosLeft=function(e){e-=this.wrapIndent;var t=this.line.charAt(0)===this.RLE?1:0,n=e>t?this.session.getOverwrite()?e:e-1:t,i=r.getVisualFromLogicalIdx(n,this.bidiMap),s=this.bidiMap.bidiLevels,o=0;!this.session.getOverwrite()&&e<=t&&s[i]%2!==0&&i++;for(var u=0;u<i;u++)o+=this.charWidths[s[u]];return!this.session.getOverwrite()&&e>t&&s[i]%2===0&&(o+=this.charWidths[s[i]]),this.wrapIndent&&(o+=this.isRtlDir?-1*this.wrapOffset:this.wrapOffset),this.isRtlDir&&(o+=this.rtlLineOffset),o},this.getSelections=function(e,t){var n=this.bidiMap,r=n.bidiLevels,i,s=[],o=0,u=Math.min(e,t)-this.wrapIndent,a=Math.max(e,t)-this.wrapIndent,f=!1,l=!1,c=0;this.wrapIndent&&(o+=this.isRtlDir?-1*this.wrapOffset:this.wrapOffset);for(var h,p=0;p<r.length;p++)h=n.logicalFromVisual[p],i=r[p],f=h>=u&&h<a,f&&!l?c=o:!f&&l&&s.push({left:c,width:o-c}),o+=this.charWidths[i],l=f;f&&p===r.length&&s.push({left:c,width:o-c});if(this.isRtlDir)for(var d=0;d<s.length;d++)s[d].left+=this.rtlLineOffset;return s},this.offsetToCol=function(e){this.isRtlDir&&(e-=this.rtlLineOffset);var t=0,e=Math.max(e,0),n=0,r=0,i=this.bidiMap.bidiLevels,s=this.charWidths[i[r]];this.wrapIndent&&(e-=this.isRtlDir?-1*this.wrapOffset:this.wrapOffset);while(e>n+s/2){n+=s;if(r===i.length-1){s=0;break}s=this.charWidths[i[++r]]}return r>0&&i[r-1]%2!==0&&i[r]%2===0?(e<n&&r--,t=this.bidiMap.logicalFromVisual[r]):r>0&&i[r-1]%2===0&&i[r]%2!==0?t=1+(e>n?this.bidiMap.logicalFromVisual[r]:this.bidiMap.logicalFromVisual[r-1]):this.isRtlDir&&r===i.length-1&&s===0&&i[r-1]%2===0||!this.isRtlDir&&r===0&&i[r]%2!==0?t=1+this.bidiMap.logicalFromVisual[r]:(r>0&&i[r-1]%2!==0&&s!==0&&r--,t=this.bidiMap.logicalFromVisual[r]),t===0&&this.isRtlDir&&t++,t+this.wrapIndent}}).call(o.prototype),t.BidiHandler=o}),define("ace/selection",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/lib/event_emitter","ace/range"],function(e,t,n){"use strict";var r=e("./lib/oop"),i=e("./lib/lang"),s=e("./lib/event_emitter").EventEmitter,o=e("./range").Range,u=function(e){this.session=e,this.doc=e.getDocument(),this.clearSelection(),this.cursor=this.lead=this.doc.createAnchor(0,0),this.anchor=this.doc.createAnchor(0,0),this.$silent=!1;var t=this;this.cursor.on("change",function(e){t.$cursorChanged=!0,t.$silent||t._emit("changeCursor"),!t.$isEmpty&&!t.$silent&&t._emit("changeSelection"),!t.$keepDesiredColumnOnChange&&e.old.column!=e.value.column&&(t.$desiredColumn=null)}),this.anchor.on("change",function(){t.$anchorChanged=!0,!t.$isEmpty&&!t.$silent&&t._emit("changeSelection")})};(function(){r.implement(this,s),this.isEmpty=function(){return this.$isEmpty||this.anchor.row==this.lead.row&&this.anchor.column==this.lead.column},this.isMultiLine=function(){return!this.$isEmpty&&this.anchor.row!=this.cursor.row},this.getCursor=function(){return this.lead.getPosition()},this.setSelectionAnchor=function(e,t){this.$isEmpty=!1,this.anchor.setPosition(e,t)},this.getAnchor=this.getSelectionAnchor=function(){return this.$isEmpty?this.getSelectionLead():this.anchor.getPosition()},this.getSelectionLead=function(){return this.lead.getPosition()},this.isBackwards=function(){var e=this.anchor,t=this.lead;return e.row>t.row||e.row==t.row&&e.column>t.column},this.getRange=function(){var e=this.anchor,t=this.lead;return this.$isEmpty?o.fromPoints(t,t):this.isBackwards()?o.fromPoints(t,e):o.fromPoints(e,t)},this.clearSelection=function(){this.$isEmpty||(this.$isEmpty=!0,this._emit("changeSelection"))},this.selectAll=function(){this.$setSelection(0,0,Number.MAX_VALUE,Number.MAX_VALUE)},this.setRange=this.setSelectionRange=function(e,t){var n=t?e.end:e.start,r=t?e.start:e.end;this.$setSelection(n.row,n.column,r.row,r.column)},this.$setSelection=function(e,t,n,r){if(this.$silent)return;var i=this.$isEmpty,s=this.inMultiSelectMode;this.$silent=!0,this.$cursorChanged=this.$anchorChanged=!1,this.anchor.setPosition(e,t),this.cursor.setPosition(n,r),this.$isEmpty=!o.comparePoints(this.anchor,this.cursor),this.$silent=!1,this.$cursorChanged&&this._emit("changeCursor"),(this.$cursorChanged||this.$anchorChanged||i!=this.$isEmpty||s)&&this._emit("changeSelection")},this.$moveSelection=function(e){var t=this.lead;this.$isEmpty&&this.setSelectionAnchor(t.row,t.column),e.call(this)},this.selectTo=function(e,t){this.$moveSelection(function(){this.moveCursorTo(e,t)})},this.selectToPosition=function(e){this.$moveSelection(function(){this.moveCursorToPosition(e)})},this.moveTo=function(e,t){this.clearSelection(),this.moveCursorTo(e,t)},this.moveToPosition=function(e){this.clearSelection(),this.moveCursorToPosition(e)},this.selectUp=function(){this.$moveSelection(this.moveCursorUp)},this.selectDown=function(){this.$moveSelection(this.moveCursorDown)},this.selectRight=function(){this.$moveSelection(this.moveCursorRight)},this.selectLeft=function(){this.$moveSelection(this.moveCursorLeft)},this.selectLineStart=function(){this.$moveSelection(this.moveCursorLineStart)},this.selectLineEnd=function(){this.$moveSelection(this.moveCursorLineEnd)},this.selectFileEnd=function(){this.$moveSelection(this.moveCursorFileEnd)},this.selectFileStart=function(){this.$moveSelection(this.moveCursorFileStart)},this.selectWordRight=function(){this.$moveSelection(this.moveCursorWordRight)},this.selectWordLeft=function(){this.$moveSelection(this.moveCursorWordLeft)},this.getWordRange=function(e,t){if(typeof t=="undefined"){var n=e||this.lead;e=n.row,t=n.column}return this.session.getWordRange(e,t)},this.selectWord=function(){this.setSelectionRange(this.getWordRange())},this.selectAWord=function(){var e=this.getCursor(),t=this.session.getAWordRange(e.row,e.column);this.setSelectionRange(t)},this.getLineRange=function(e,t){var n=typeof e=="number"?e:this.lead.row,r,i=this.session.getFoldLine(n);return i?(n=i.start.row,r=i.end.row):r=n,t===!0?new o(n,0,r,this.session.getLine(r).length):new o(n,0,r+1,0)},this.selectLine=function(){this.setSelectionRange(this.getLineRange())},this.moveCursorUp=function(){this.moveCursorBy(-1,0)},this.moveCursorDown=function(){this.moveCursorBy(1,0)},this.wouldMoveIntoSoftTab=function(e,t,n){var r=e.column,i=e.column+t;return n<0&&(r=e.column-t,i=e.column),this.session.isTabStop(e)&&this.doc.getLine(e.row).slice(r,i).split(" ").length-1==t},this.moveCursorLeft=function(){var e=this.lead.getPosition(),t;if(t=this.session.getFoldAt(e.row,e.column,-1))this.moveCursorTo(t.start.row,t.start.column);else if(e.column===0)e.row>0&&this.moveCursorTo(e.row-1,this.doc.getLine(e.row-1).length);else{var n=this.session.getTabSize();this.wouldMoveIntoSoftTab(e,n,-1)&&!this.session.getNavigateWithinSoftTabs()?this.moveCursorBy(0,-n):this.moveCursorBy(0,-1)}},this.moveCursorRight=function(){var e=this.lead.getPosition(),t;if(t=this.session.getFoldAt(e.row,e.column,1))this.moveCursorTo(t.end.row,t.end.column);else if(this.lead.column==this.doc.getLine(this.lead.row).length)this.lead.row<this.doc.getLength()-1&&this.moveCursorTo(this.lead.row+1,0);else{var n=this.session.getTabSize(),e=this.lead;this.wouldMoveIntoSoftTab(e,n,1)&&!this.session.getNavigateWithinSoftTabs()?this.moveCursorBy(0,n):this.moveCursorBy(0,1)}},this.moveCursorLineStart=function(){var e=this.lead.row,t=this.lead.column,n=this.session.documentToScreenRow(e,t),r=this.session.screenToDocumentPosition(n,0),i=this.session.getDisplayLine(e,null,r.row,r.column),s=i.match(/^\s*/);s[0].length!=t&&!this.session.$useEmacsStyleLineStart&&(r.column+=s[0].length),this.moveCursorToPosition(r)},this.moveCursorLineEnd=function(){var e=this.lead,t=this.session.getDocumentLastRowColumnPosition(e.row,e.column);if(this.lead.column==t.column){var n=this.session.getLine(t.row);if(t.column==n.length){var r=n.search(/\s+$/);r>0&&(t.column=r)}}this.moveCursorTo(t.row,t.column)},this.moveCursorFileEnd=function(){var e=this.doc.getLength()-1,t=this.doc.getLine(e).length;this.moveCursorTo(e,t)},this.moveCursorFileStart=function(){this.moveCursorTo(0,0)},this.moveCursorLongWordRight=function(){var e=this.lead.row,t=this.lead.column,n=this.doc.getLine(e),r=n.substring(t);this.session.nonTokenRe.lastIndex=0,this.session.tokenRe.lastIndex=0;var i=this.session.getFoldAt(e,t,1);if(i){this.moveCursorTo(i.end.row,i.end.column);return}this.session.nonTokenRe.exec(r)&&(t+=this.session.nonTokenRe.lastIndex,this.session.nonTokenRe.lastIndex=0,r=n.substring(t));if(t>=n.length){this.moveCursorTo(e,n.length),this.moveCursorRight(),e<this.doc.getLength()-1&&this.moveCursorWordRight();return}this.session.tokenRe.exec(r)&&(t+=this.session.tokenRe.lastIndex,this.session.tokenRe.lastIndex=0),this.moveCursorTo(e,t)},this.moveCursorLongWordLeft=function(){var e=this.lead.row,t=this.lead.column,n;if(n=this.session.getFoldAt(e,t,-1)){this.moveCursorTo(n.start.row,n.start.column);return}var r=this.session.getFoldStringAt(e,t,-1);r==null&&(r=this.doc.getLine(e).substring(0,t));var s=i.stringReverse(r);this.session.nonTokenRe.lastIndex=0,this.session.tokenRe.lastIndex=0,this.session.nonTokenRe.exec(s)&&(t-=this.session.nonTokenRe.lastIndex,s=s.slice(this.session.nonTokenRe.lastIndex),this.session.nonTokenRe.lastIndex=0);if(t<=0){this.moveCursorTo(e,0),this.moveCursorLeft(),e>0&&this.moveCursorWordLeft();return}this.session.tokenRe.exec(s)&&(t-=this.session.tokenRe.lastIndex,this.session.tokenRe.lastIndex=0),this.moveCursorTo(e,t)},this.$shortWordEndIndex=function(e){var t=0,n,r=/\s/,i=this.session.tokenRe;i.lastIndex=0;if(this.session.tokenRe.exec(e))t=this.session.tokenRe.lastIndex;else{while((n=e[t])&&r.test(n))t++;if(t<1){i.lastIndex=0;while((n=e[t])&&!i.test(n)){i.lastIndex=0,t++;if(r.test(n)){if(t>2){t--;break}while((n=e[t])&&r.test(n))t++;if(t>2)break}}}}return i.lastIndex=0,t},this.moveCursorShortWordRight=function(){var e=this.lead.row,t=this.lead.column,n=this.doc.getLine(e),r=n.substring(t),i=this.session.getFoldAt(e,t,1);if(i)return this.moveCursorTo(i.end.row,i.end.column);if(t==n.length){var s=this.doc.getLength();do e++,r=this.doc.getLine(e);while(e<s&&/^\s*$/.test(r));/^\s+/.test(r)||(r=""),t=0}var o=this.$shortWordEndIndex(r);this.moveCursorTo(e,t+o)},this.moveCursorShortWordLeft=function(){var e=this.lead.row,t=this.lead.column,n;if(n=this.session.getFoldAt(e,t,-1))return this.moveCursorTo(n.start.row,n.start.column);var r=this.session.getLine(e).substring(0,t);if(t===0){do e--,r=this.doc.getLine(e);while(e>0&&/^\s*$/.test(r));t=r.length,/\s+$/.test(r)||(r="")}var s=i.stringReverse(r),o=this.$shortWordEndIndex(s);return this.moveCursorTo(e,t-o)},this.moveCursorWordRight=function(){this.session.$selectLongWords?this.moveCursorLongWordRight():this.moveCursorShortWordRight()},this.moveCursorWordLeft=function(){this.session.$selectLongWords?this.moveCursorLongWordLeft():this.moveCursorShortWordLeft()},this.moveCursorBy=function(e,t){var n=this.session.documentToScreenPosition(this.lead.row,this.lead.column),r;t===0&&(e!==0&&(this.session.$bidiHandler.isBidiRow(n.row,this.lead.row)?(r=this.session.$bidiHandler.getPosLeft(n.column),n.column=Math.round(r/this.session.$bidiHandler.charWidths[0])):r=n.column*this.session.$bidiHandler.charWidths[0]),this.$desiredColumn?n.column=this.$desiredColumn:this.$desiredColumn=n.column);if(e!=0&&this.session.lineWidgets&&this.session.lineWidgets[this.lead.row]){var i=this.session.lineWidgets[this.lead.row];e<0?e-=i.rowsAbove||0:e>0&&(e+=i.rowCount-(i.rowsAbove||0))}var s=this.session.screenToDocumentPosition(n.row+e,n.column,r);e!==0&&t===0&&s.row===this.lead.row&&s.column===this.lead.column,this.moveCursorTo(s.row,s.column+t,t===0)},this.moveCursorToPosition=function(e){this.moveCursorTo(e.row,e.column)},this.moveCursorTo=function(e,t,n){var r=this.session.getFoldAt(e,t,1);r&&(e=r.start.row,t=r.start.column),this.$keepDesiredColumnOnChange=!0;var i=this.session.getLine(e);/[\uDC00-\uDFFF]/.test(i.charAt(t))&&i.charAt(t-1)&&(this.lead.row==e&&this.lead.column==t+1?t-=1:t+=1),this.lead.setPosition(e,t),this.$keepDesiredColumnOnChange=!1,n||(this.$desiredColumn=null)},this.moveCursorToScreen=function(e,t,n){var r=this.session.screenToDocumentPosition(e,t);this.moveCursorTo(r.row,r.column,n)},this.detach=function(){this.lead.detach(),this.anchor.detach(),this.session=this.doc=null},this.fromOrientedRange=function(e){this.setSelectionRange(e,e.cursor==e.start),this.$desiredColumn=e.desiredColumn||this.$desiredColumn},this.toOrientedRange=function(e){var t=this.getRange();return e?(e.start.column=t.start.column,e.start.row=t.start.row,e.end.column=t.end.column,e.end.row=t.end.row):e=t,e.cursor=this.isBackwards()?e.start:e.end,e.desiredColumn=this.$desiredColumn,e},this.getRangeOfMovements=function(e){var t=this.getCursor();try{e(this);var n=this.getCursor();return o.fromPoints(t,n)}catch(r){return o.fromPoints(t,t)}finally{this.moveCursorToPosition(t)}},this.toJSON=function(){if(this.rangeCount)var e=this.ranges.map(function(e){var t=e.clone();return t.isBackwards=e.cursor==e.start,t});else{var e=this.getRange();e.isBackwards=this.isBackwards()}return e},this.fromJSON=function(e){if(e.start==undefined){if(this.rangeList&&e.length>1){this.toSingleRange(e[0]);for(var t=e.length;t--;){var n=o.fromPoints(e[t].start,e[t].end);e[t].isBackwards&&(n.cursor=n.start),this.addRange(n,!0)}return}e=e[0]}this.rangeList&&this.toSingleRange(e),this.setSelectionRange(e,e.isBackwards)},this.isEqual=function(e){if((e.length||this.rangeCount)&&e.length!=this.rangeCount)return!1;if(!e.length||!this.ranges)return this.getRange().isEqual(e);for(var t=this.ranges.length;t--;)if(!this.ranges[t].isEqual(e[t]))return!1;return!0}}).call(u.prototype),t.Selection=u}),define("ace/tokenizer",["require","exports","module","ace/config"],function(e,t,n){"use strict";var r=e("./config"),i=2e3,s=function(e){this.states=e,this.regExps={},this.matchMappings={};for(var t in this.states){var n=this.states[t],r=[],i=0,s=this.matchMappings[t]={defaultToken:"text"},o="g",u=[];for(var a=0;a<n.length;a++){var f=n[a];f.defaultToken&&(s.defaultToken=f.defaultToken),f.caseInsensitive&&(o="gi");if(f.regex==null)continue;f.regex instanceof RegExp&&(f.regex=f.regex.toString().slice(1,-1));var l=f.regex,c=(new RegExp("(?:("+l+")|(.))")).exec("a").length-2;Array.isArray(f.token)?f.token.length==1||c==1?f.token=f.token[0]:c-1!=f.token.length?(this.reportError("number of classes and regexp groups doesn't match",{rule:f,groupCount:c-1}),f.token=f.token[0]):(f.tokenArray=f.token,f.token=null,f.onMatch=this.$arrayTokens):typeof f.token=="function"&&!f.onMatch&&(c>1?f.onMatch=this.$applyToken:f.onMatch=f.token),c>1&&(/\\\d/.test(f.regex)?l=f.regex.replace(/\\([0-9]+)/g,function(e,t){return"\\"+(parseInt(t,10)+i+1)}):(c=1,l=this.removeCapturingGroups(f.regex)),!f.splitRegex&&typeof f.token!="string"&&u.push(f)),s[i]=a,i+=c,r.push(l),f.onMatch||(f.onMatch=null)}r.length||(s[0]=0,r.push("$")),u.forEach(function(e){e.splitRegex=this.createSplitterRegexp(e.regex,o)},this),this.regExps[t]=new RegExp("("+r.join(")|(")+")|($)",o)}};(function(){this.$setMaxTokenCount=function(e){i=e|0},this.$applyToken=function(e){var t=this.splitRegex.exec(e).slice(1),n=this.token.apply(this,t);if(typeof n=="string")return[{type:n,value:e}];var r=[];for(var i=0,s=n.length;i<s;i++)t[i]&&(r[r.length]={type:n[i],value:t[i]});return r},this.$arrayTokens=function(e){if(!e)return[];var t=this.splitRegex.exec(e);if(!t)return"text";var n=[],r=this.tokenArray;for(var i=0,s=r.length;i<s;i++)t[i+1]&&(n[n.length]={type:r[i],value:t[i+1]});return n},this.removeCapturingGroups=function(e){var t=e.replace(/\\.|\[(?:\\.|[^\\\]])*|\(\?[:=!]|(\()/g,function(e,t){return t?"(?:":e});return t},this.createSplitterRegexp=function(e,t){if(e.indexOf("(?=")!=-1){var n=0,r=!1,i={};e.replace(/(\\.)|(\((?:\?[=!])?)|(\))|([\[\]])/g,function(e,t,s,o,u,a){return r?r=u!="]":u?r=!0:o?(n==i.stack&&(i.end=a+1,i.stack=-1),n--):s&&(n++,s.length!=1&&(i.stack=n,i.start=a)),e}),i.end!=null&&/^\)*$/.test(e.substr(i.end))&&(e=e.substring(0,i.start)+e.substr(i.end))}return e.charAt(0)!="^"&&(e="^"+e),e.charAt(e.length-1)!="$"&&(e+="$"),new RegExp(e,(t||"").replace("g",""))},this.getLineTokens=function(e,t){if(t&&typeof t!="string"){var n=t.slice(0);t=n[0],t==="#tmp"&&(n.shift(),t=n.shift())}else var n=[];var r=t||"start",s=this.states[r];s||(r="start",s=this.states[r]);var o=this.matchMappings[r],u=this.regExps[r];u.lastIndex=0;var a,f=[],l=0,c=0,h={type:null,value:""};while(a=u.exec(e)){var p=o.defaultToken,d=null,v=a[0],m=u.lastIndex;if(m-v.length>l){var g=e.substring(l,m-v.length);h.type==p?h.value+=g:(h.type&&f.push(h),h={type:p,value:g})}for(var y=0;y<a.length-2;y++){if(a[y+1]===undefined)continue;d=s[o[y]],d.onMatch?p=d.onMatch(v,r,n,e):p=d.token,d.next&&(typeof d.next=="string"?r=d.next:r=d.next(r,n),s=this.states[r],s||(this.reportError("state doesn't exist",r),r="start",s=this.states[r]),o=this.matchMappings[r],l=m,u=this.regExps[r],u.lastIndex=m),d.consumeLineEnd&&(l=m);break}if(v)if(typeof p=="string")!!d&&d.merge===!1||h.type!==p?(h.type&&f.push(h),h={type:p,value:v}):h.value+=v;else if(p){h.type&&f.push(h),h={type:null,value:""};for(var y=0;y<p.length;y++)f.push(p[y])}if(l==e.length)break;l=m;if(c++>i){c>2*e.length&&this.reportError("infinite loop with in ace tokenizer",{startState:t,line:e});while(l<e.length)h.type&&f.push(h),h={value:e.substring(l,l+=500),type:"overflow"};r="start",n=[];break}}return h.type&&f.push(h),n.length>1&&n[0]!==r&&n.unshift("#tmp",r),{tokens:f,state:n.length?n:r}},this.reportError=r.reportError}).call(s.prototype),t.Tokenizer=s}),define("ace/mode/text_highlight_rules",["require","exports","module","ace/lib/lang"],function(e,t,n){"use strict";var r=e("../lib/lang"),i=function(){this.$rules={start:[{token:"empty_line",regex:"^$"},{defaultToken:"text"}]}};(function(){this.addRules=function(e,t){if(!t){for(var n in e)this.$rules[n]=e[n];return}for(var n in e){var r=e[n];for(var i=0;i<r.length;i++){var s=r[i];if(s.next||s.onMatch)typeof s.next=="string"&&s.next.indexOf(t)!==0&&(s.next=t+s.next),s.nextState&&s.nextState.indexOf(t)!==0&&(s.nextState=t+s.nextState)}this.$rules[t+n]=r}},this.getRules=function(){return this.$rules},this.embedRules=function(e,t,n,i,s){var o=typeof e=="function"?(new e).getRules():e;if(i)for(var u=0;u<i.length;u++)i[u]=t+i[u];else{i=[];for(var a in o)i.push(t+a)}this.addRules(o,t);if(n){var f=Array.prototype[s?"push":"unshift"];for(var u=0;u<i.length;u++)f.apply(this.$rules[i[u]],r.deepCopy(n))}this.$embeds||(this.$embeds=[]),this.$embeds.push(t)},this.getEmbeds=function(){return this.$embeds};var e=function(e,t){return(e!="start"||t.length)&&t.unshift(this.nextState,e),this.nextState},t=function(e,t){return t.shift(),t.shift()||"start"};this.normalizeRules=function(){function i(s){var o=r[s];o.processed=!0;for(var u=0;u<o.length;u++){var a=o[u],f=null;Array.isArray(a)&&(f=a,a={}),!a.regex&&a.start&&(a.regex=a.start,a.next||(a.next=[]),a.next.push({defaultToken:a.token},{token:a.token+".end",regex:a.end||a.start,next:"pop"}),a.token=a.token+".start",a.push=!0);var l=a.next||a.push;if(l&&Array.isArray(l)){var c=a.stateName;c||(c=a.token,typeof c!="string"&&(c=c[0]||""),r[c]&&(c+=n++)),r[c]=l,a.next=c,i(c)}else l=="pop"&&(a.next=t);a.push&&(a.nextState=a.next||a.push,a.next=e,delete a.push);if(a.rules)for(var h in a.rules)r[h]?r[h].push&&r[h].push.apply(r[h],a.rules[h]):r[h]=a.rules[h];var p=typeof a=="string"?a:a.include;p&&(Array.isArray(p)?f=p.map(function(e){return r[e]}):f=r[p]);if(f){var d=[u,1].concat(f);a.noEscape&&(d=d.filter(function(e){return!e.next})),o.splice.apply(o,d),u--}a.keywordMap&&(a.token=this.createKeywordMapper(a.keywordMap,a.defaultToken||"text",a.caseInsensitive),delete a.defaultToken)}}var n=0,r=this.$rules;Object.keys(r).forEach(i,this)},this.createKeywordMapper=function(e,t,n,r){var i=Object.create(null);return Object.keys(e).forEach(function(t){var s=e[t];n&&(s=s.toLowerCase());var o=s.split(r||"|");for(var u=o.length;u--;)i[o[u]]=t}),Object.getPrototypeOf(i)&&(i.__proto__=null),this.$keywordList=Object.keys(i),e=null,n?function(e){return i[e.toLowerCase()]||t}:function(e){return i[e]||t}},this.getKeywords=function(){return this.$keywords}}).call(i.prototype),t.TextHighlightRules=i}),define("ace/mode/behaviour",["require","exports","module"],function(e,t,n){"use strict";var r=function(){this.$behaviours={}};(function(){this.add=function(e,t,n){switch(undefined){case this.$behaviours:this.$behaviours={};case this.$behaviours[e]:this.$behaviours[e]={}}this.$behaviours[e][t]=n},this.addBehaviours=function(e){for(var t in e)for(var n in e[t])this.add(t,n,e[t][n])},this.remove=function(e){this.$behaviours&&this.$behaviours[e]&&delete this.$behaviours[e]},this.inherit=function(e,t){if(typeof e=="function")var n=(new e).getBehaviours(t);else var n=e.getBehaviours(t);this.addBehaviours(n)},this.getBehaviours=function(e){if(!e)return this.$behaviours;var t={};for(var n=0;n<e.length;n++)this.$behaviours[e[n]]&&(t[e[n]]=this.$behaviours[e[n]]);return t}}).call(r.prototype),t.Behaviour=r}),define("ace/token_iterator",["require","exports","module","ace/range"],function(e,t,n){"use strict";var r=e("./range").Range,i=function(e,t,n){this.$session=e,this.$row=t,this.$rowTokens=e.getTokens(t);var r=e.getTokenAt(t,n);this.$tokenIndex=r?r.index:-1};(function(){this.stepBackward=function(){this.$tokenIndex-=1;while(this.$tokenIndex<0){this.$row-=1;if(this.$row<0)return this.$row=0,null;this.$rowTokens=this.$session.getTokens(this.$row),this.$tokenIndex=this.$rowTokens.length-1}return this.$rowTokens[this.$tokenIndex]},this.stepForward=function(){this.$tokenIndex+=1;var e;while(this.$tokenIndex>=this.$rowTokens.length){this.$row+=1,e||(e=this.$session.getLength());if(this.$row>=e)return this.$row=e-1,null;this.$rowTokens=this.$session.getTokens(this.$row),this.$tokenIndex=0}return this.$rowTokens[this.$tokenIndex]},this.getCurrentToken=function(){return this.$rowTokens[this.$tokenIndex]},this.getCurrentTokenRow=function(){return this.$row},this.getCurrentTokenColumn=function(){var e=this.$rowTokens,t=this.$tokenIndex,n=e[t].start;if(n!==undefined)return n;n=0;while(t>0)t-=1,n+=e[t].value.length;return n},this.getCurrentTokenPosition=function(){return{row:this.$row,column:this.getCurrentTokenColumn()}},this.getCurrentTokenRange=function(){var e=this.$rowTokens[this.$tokenIndex],t=this.getCurrentTokenColumn();return new r(this.$row,t,this.$row,t+e.value.length)}}).call(i.prototype),t.TokenIterator=i}),define("ace/mode/behaviour/cstyle",["require","exports","module","ace/lib/oop","ace/mode/behaviour","ace/token_iterator","ace/lib/lang"],function(e,t,n){"use strict";var r=e("../../lib/oop"),i=e("../behaviour").Behaviour,s=e("../../token_iterator").TokenIterator,o=e("../../lib/lang"),u=["text","paren.rparen","rparen","paren","punctuation.operator"],a=["text","paren.rparen","rparen","paren","punctuation.operator","comment"],f,l={},c={'"':'"',"'":"'"},h=function(e){var t=-1;e.multiSelect&&(t=e.selection.index,l.rangeCount!=e.multiSelect.rangeCount&&(l={rangeCount:e.multiSelect.rangeCount}));if(l[t])return f=l[t];f=l[t]={autoInsertedBrackets:0,autoInsertedRow:-1,autoInsertedLineEnd:"",maybeInsertedBrackets:0,maybeInsertedRow:-1,maybeInsertedLineStart:"",maybeInsertedLineEnd:""}},p=function(e,t,n,r){var i=e.end.row-e.start.row;return{text:n+t+r,selection:[0,e.start.column+1,i,e.end.column+(i?0:1)]}},d=function(e){this.add("braces","insertion",function(t,n,r,i,s){var u=r.getCursorPosition(),a=i.doc.getLine(u.row);if(s=="{"){h(r);var l=r.getSelectionRange(),c=i.doc.getTextRange(l);if(c!==""&&c!=="{"&&r.getWrapBehavioursEnabled())return p(l,c,"{","}");if(d.isSaneInsertion(r,i))return/[\]\}\)]/.test(a[u.column])||r.inMultiSelectMode||e&&e.braces?(d.recordAutoInsert(r,i,"}"),{text:"{}",selection:[1,1]}):(d.recordMaybeInsert(r,i,"{"),{text:"{",selection:[1,1]})}else if(s=="}"){h(r);var v=a.substring(u.column,u.column+1);if(v=="}"){var m=i.$findOpeningBracket("}",{column:u.column+1,row:u.row});if(m!==null&&d.isAutoInsertedClosing(u,a,s))return d.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}else{if(s=="\n"||s=="\r\n"){h(r);var g="";d.isMaybeInsertedClosing(u,a)&&(g=o.stringRepeat("}",f.maybeInsertedBrackets),d.clearMaybeInsertedClosing());var v=a.substring(u.column,u.column+1);if(v==="}"){var y=i.findMatchingBracket({row:u.row,column:u.column+1},"}");if(!y)return null;var b=this.$getIndent(i.getLine(y.row))}else{if(!g){d.clearMaybeInsertedClosing();return}var b=this.$getIndent(a)}var w=b+i.getTabString();return{text:"\n"+w+"\n"+b+g,selection:[1,w.length,1,w.length]}}d.clearMaybeInsertedClosing()}}),this.add("braces","deletion",function(e,t,n,r,i){var s=r.doc.getTextRange(i);if(!i.isMultiLine()&&s=="{"){h(n);var o=r.doc.getLine(i.start.row),u=o.substring(i.end.column,i.end.column+1);if(u=="}")return i.end.column++,i;f.maybeInsertedBrackets--}}),this.add("parens","insertion",function(e,t,n,r,i){if(i=="("){h(n);var s=n.getSelectionRange(),o=r.doc.getTextRange(s);if(o!==""&&n.getWrapBehavioursEnabled())return p(s,o,"(",")");if(d.isSaneInsertion(n,r))return d.recordAutoInsert(n,r,")"),{text:"()",selection:[1,1]}}else if(i==")"){h(n);var u=n.getCursorPosition(),a=r.doc.getLine(u.row),f=a.substring(u.column,u.column+1);if(f==")"){var l=r.$findOpeningBracket(")",{column:u.column+1,row:u.row});if(l!==null&&d.isAutoInsertedClosing(u,a,i))return d.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}}),this.add("parens","deletion",function(e,t,n,r,i){var s=r.doc.getTextRange(i);if(!i.isMultiLine()&&s=="("){h(n);var o=r.doc.getLine(i.start.row),u=o.substring(i.start.column+1,i.start.column+2);if(u==")")return i.end.column++,i}}),this.add("brackets","insertion",function(e,t,n,r,i){if(i=="["){h(n);var s=n.getSelectionRange(),o=r.doc.getTextRange(s);if(o!==""&&n.getWrapBehavioursEnabled())return p(s,o,"[","]");if(d.isSaneInsertion(n,r))return d.recordAutoInsert(n,r,"]"),{text:"[]",selection:[1,1]}}else if(i=="]"){h(n);var u=n.getCursorPosition(),a=r.doc.getLine(u.row),f=a.substring(u.column,u.column+1);if(f=="]"){var l=r.$findOpeningBracket("]",{column:u.column+1,row:u.row});if(l!==null&&d.isAutoInsertedClosing(u,a,i))return d.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}}),this.add("brackets","deletion",function(e,t,n,r,i){var s=r.doc.getTextRange(i);if(!i.isMultiLine()&&s=="["){h(n);var o=r.doc.getLine(i.start.row),u=o.substring(i.start.column+1,i.start.column+2);if(u=="]")return i.end.column++,i}}),this.add("string_dquotes","insertion",function(e,t,n,r,i){var s=r.$mode.$quotes||c;if(i.length==1&&s[i]){if(this.lineCommentStart&&this.lineCommentStart.indexOf(i)!=-1)return;h(n);var o=i,u=n.getSelectionRange(),a=r.doc.getTextRange(u);if(a!==""&&(a.length!=1||!s[a])&&n.getWrapBehavioursEnabled())return p(u,a,o,o);if(!a){var f=n.getCursorPosition(),l=r.doc.getLine(f.row),d=l.substring(f.column-1,f.column),v=l.substring(f.column,f.column+1),m=r.getTokenAt(f.row,f.column),g=r.getTokenAt(f.row,f.column+1);if(d=="\\"&&m&&/escape/.test(m.type))return null;var y=m&&/string|escape/.test(m.type),b=!g||/string|escape/.test(g.type),w;if(v==o)w=y!==b,w&&/string\.end/.test(g.type)&&(w=!1);else{if(y&&!b)return null;if(y&&b)return null;var E=r.$mode.tokenRe;E.lastIndex=0;var S=E.test(d);E.lastIndex=0;var x=E.test(d);if(S||x)return null;if(v&&!/[\s;,.})\]\\]/.test(v))return null;var T=l[f.column-2];if(!(d!=o||T!=o&&!E.test(T)))return null;w=!0}return{text:w?o+o:"",selection:[1,1]}}}}),this.add("string_dquotes","deletion",function(e,t,n,r,i){var s=r.$mode.$quotes||c,o=r.doc.getTextRange(i);if(!i.isMultiLine()&&s.hasOwnProperty(o)){h(n);var u=r.doc.getLine(i.start.row),a=u.substring(i.start.column+1,i.start.column+2);if(a==o)return i.end.column++,i}})};d.isSaneInsertion=function(e,t){var n=e.getCursorPosition(),r=new s(t,n.row,n.column);if(!this.$matchTokenType(r.getCurrentToken()||"text",u)){if(/[)}\]]/.test(e.session.getLine(n.row)[n.column]))return!0;var i=new s(t,n.row,n.column+1);if(!this.$matchTokenType(i.getCurrentToken()||"text",u))return!1}return r.stepForward(),r.getCurrentTokenRow()!==n.row||this.$matchTokenType(r.getCurrentToken()||"text",a)},d.$matchTokenType=function(e,t){return t.indexOf(e.type||e)>-1},d.recordAutoInsert=function(e,t,n){var r=e.getCursorPosition(),i=t.doc.getLine(r.row);this.isAutoInsertedClosing(r,i,f.autoInsertedLineEnd[0])||(f.autoInsertedBrackets=0),f.autoInsertedRow=r.row,f.autoInsertedLineEnd=n+i.substr(r.column),f.autoInsertedBrackets++},d.recordMaybeInsert=function(e,t,n){var r=e.getCursorPosition(),i=t.doc.getLine(r.row);this.isMaybeInsertedClosing(r,i)||(f.maybeInsertedBrackets=0),f.maybeInsertedRow=r.row,f.maybeInsertedLineStart=i.substr(0,r.column)+n,f.maybeInsertedLineEnd=i.substr(r.column),f.maybeInsertedBrackets++},d.isAutoInsertedClosing=function(e,t,n){return f.autoInsertedBrackets>0&&e.row===f.autoInsertedRow&&n===f.autoInsertedLineEnd[0]&&t.substr(e.column)===f.autoInsertedLineEnd},d.isMaybeInsertedClosing=function(e,t){return f.maybeInsertedBrackets>0&&e.row===f.maybeInsertedRow&&t.substr(e.column)===f.maybeInsertedLineEnd&&t.substr(0,e.column)==f.maybeInsertedLineStart},d.popAutoInsertedClosing=function(){f.autoInsertedLineEnd=f.autoInsertedLineEnd.substr(1),f.autoInsertedBrackets--},d.clearMaybeInsertedClosing=function(){f&&(f.maybeInsertedBrackets=0,f.maybeInsertedRow=-1)},r.inherits(d,i),t.CstyleBehaviour=d}),define("ace/unicode",["require","exports","module"],function(e,t,n){"use strict";var r=[48,9,8,25,5,0,2,25,48,0,11,0,5,0,6,22,2,30,2,457,5,11,15,4,8,0,2,0,18,116,2,1,3,3,9,0,2,2,2,0,2,19,2,82,2,138,2,4,3,155,12,37,3,0,8,38,10,44,2,0,2,1,2,1,2,0,9,26,6,2,30,10,7,61,2,9,5,101,2,7,3,9,2,18,3,0,17,58,3,100,15,53,5,0,6,45,211,57,3,18,2,5,3,11,3,9,2,1,7,6,2,2,2,7,3,1,3,21,2,6,2,0,4,3,3,8,3,1,3,3,9,0,5,1,2,4,3,11,16,2,2,5,5,1,3,21,2,6,2,1,2,1,2,1,3,0,2,4,5,1,3,2,4,0,8,3,2,0,8,15,12,2,2,8,2,2,2,21,2,6,2,1,2,4,3,9,2,2,2,2,3,0,16,3,3,9,18,2,2,7,3,1,3,21,2,6,2,1,2,4,3,8,3,1,3,2,9,1,5,1,2,4,3,9,2,0,17,1,2,5,4,2,2,3,4,1,2,0,2,1,4,1,4,2,4,11,5,4,4,2,2,3,3,0,7,0,15,9,18,2,2,7,2,2,2,22,2,9,2,4,4,7,2,2,2,3,8,1,2,1,7,3,3,9,19,1,2,7,2,2,2,22,2,9,2,4,3,8,2,2,2,3,8,1,8,0,2,3,3,9,19,1,2,7,2,2,2,22,2,15,4,7,2,2,2,3,10,0,9,3,3,9,11,5,3,1,2,17,4,23,2,8,2,0,3,6,4,0,5,5,2,0,2,7,19,1,14,57,6,14,2,9,40,1,2,0,3,1,2,0,3,0,7,3,2,6,2,2,2,0,2,0,3,1,2,12,2,2,3,4,2,0,2,5,3,9,3,1,35,0,24,1,7,9,12,0,2,0,2,0,5,9,2,35,5,19,2,5,5,7,2,35,10,0,58,73,7,77,3,37,11,42,2,0,4,328,2,3,3,6,2,0,2,3,3,40,2,3,3,32,2,3,3,6,2,0,2,3,3,14,2,56,2,3,3,66,5,0,33,15,17,84,13,619,3,16,2,25,6,74,22,12,2,6,12,20,12,19,13,12,2,2,2,1,13,51,3,29,4,0,5,1,3,9,34,2,3,9,7,87,9,42,6,69,11,28,4,11,5,11,11,39,3,4,12,43,5,25,7,10,38,27,5,62,2,28,3,10,7,9,14,0,89,75,5,9,18,8,13,42,4,11,71,55,9,9,4,48,83,2,2,30,14,230,23,280,3,5,3,37,3,5,3,7,2,0,2,0,2,0,2,30,3,52,2,6,2,0,4,2,2,6,4,3,3,5,5,12,6,2,2,6,67,1,20,0,29,0,14,0,17,4,60,12,5,0,4,11,18,0,5,0,3,9,2,0,4,4,7,0,2,0,2,0,2,3,2,10,3,3,6,4,5,0,53,1,2684,46,2,46,2,132,7,6,15,37,11,53,10,0,17,22,10,6,2,6,2,6,2,6,2,6,2,6,2,6,2,6,2,31,48,0,470,1,36,5,2,4,6,1,5,85,3,1,3,2,2,89,2,3,6,40,4,93,18,23,57,15,513,6581,75,20939,53,1164,68,45,3,268,4,27,21,31,3,13,13,1,2,24,9,69,11,1,38,8,3,102,3,1,111,44,25,51,13,68,12,9,7,23,4,0,5,45,3,35,13,28,4,64,15,10,39,54,10,13,3,9,7,22,4,1,5,66,25,2,227,42,2,1,3,9,7,11171,13,22,5,48,8453,301,3,61,3,105,39,6,13,4,6,11,2,12,2,4,2,0,2,1,2,1,2,107,34,362,19,63,3,53,41,11,5,15,17,6,13,1,25,2,33,4,2,134,20,9,8,25,5,0,2,25,12,88,4,5,3,5,3,5,3,2],i=0,s=[];for(var o=0;o<r.length;o+=2)s.push(i+=r[o]),r[o+1]&&s.push(45,i+=r[o+1]);t.wordChars=String.fromCharCode.apply(null,s)}),define("ace/mode/text",["require","exports","module","ace/config","ace/tokenizer","ace/mode/text_highlight_rules","ace/mode/behaviour/cstyle","ace/unicode","ace/lib/lang","ace/token_iterator","ace/range"],function(e,t,n){"use strict";var r=e("../config"),i=e("../tokenizer").Tokenizer,s=e("./text_highlight_rules").TextHighlightRules,o=e("./behaviour/cstyle").CstyleBehaviour,u=e("../unicode"),a=e("../lib/lang"),f=e("../token_iterator").TokenIterator,l=e("../range").Range,c=function(){this.HighlightRules=s};(function(){this.$defaultBehaviour=new o,this.tokenRe=new RegExp("^["+u.wordChars+"\\$_]+","g"),this.nonTokenRe=new RegExp("^(?:[^"+u.wordChars+"\\$_]|\\s])+","g"),this.getTokenizer=function(){return this.$tokenizer||(this.$highlightRules=this.$highlightRules||new this.HighlightRules(this.$highlightRuleConfig),this.$tokenizer=new i(this.$highlightRules.getRules())),this.$tokenizer},this.lineCommentStart="",this.blockComment="",this.toggleCommentLines=function(e,t,n,r){function w(e){for(var t=n;t<=r;t++)e(i.getLine(t),t)}var i=t.doc,s=!0,o=!0,u=Infinity,f=t.getTabSize(),l=!1;if(!this.lineCommentStart){if(!this.blockComment)return!1;var c=this.blockComment.start,h=this.blockComment.end,p=new RegExp("^(\\s*)(?:"+a.escapeRegExp(c)+")"),d=new RegExp("(?:"+a.escapeRegExp(h)+")\\s*$"),v=function(e,t){if(g(e,t))return;if(!s||/\S/.test(e))i.insertInLine({row:t,column:e.length},h),i.insertInLine({row:t,column:u},c)},m=function(e,t){var n;(n=e.match(d))&&i.removeInLine(t,e.length-n[0].length,e.length),(n=e.match(p))&&i.removeInLine(t,n[1].length,n[0].length)},g=function(e,n){if(p.test(e))return!0;var r=t.getTokens(n);for(var i=0;i<r.length;i++)if(r[i].type==="comment")return!0}}else{if(Array.isArray(this.lineCommentStart))var p=this.lineCommentStart.map(a.escapeRegExp).join("|"),c=this.lineCommentStart[0];else var p=a.escapeRegExp(this.lineCommentStart),c=this.lineCommentStart;p=new RegExp("^(\\s*)(?:"+p+") ?"),l=t.getUseSoftTabs();var m=function(e,t){var n=e.match(p);if(!n)return;var r=n[1].length,s=n[0].length;!b(e,r,s)&&n[0][s-1]==" "&&s--,i.removeInLine(t,r,s)},y=c+" ",v=function(e,t){if(!s||/\S/.test(e))b(e,u,u)?i.insertInLine({row:t,column:u},y):i.insertInLine({row:t,column:u},c)},g=function(e,t){return p.test(e)},b=function(e,t,n){var r=0;while(t--&&e.charAt(t)==" ")r++;if(r%f!=0)return!1;var r=0;while(e.charAt(n++)==" ")r++;return f>2?r%f!=f-1:r%f==0}}var E=Infinity;w(function(e,t){var n=e.search(/\S/);n!==-1?(n<u&&(u=n),o&&!g(e,t)&&(o=!1)):E>e.length&&(E=e.length)}),u==Infinity&&(u=E,s=!1,o=!1),l&&u%f!=0&&(u=Math.floor(u/f)*f),w(o?m:v)},this.toggleBlockComment=function(e,t,n,r){var i=this.blockComment;if(!i)return;!i.start&&i[0]&&(i=i[0]);var s=new f(t,r.row,r.column),o=s.getCurrentToken(),u=t.selection,a=t.selection.toOrientedRange(),c,h;if(o&&/comment/.test(o.type)){var p,d;while(o&&/comment/.test(o.type)){var v=o.value.indexOf(i.start);if(v!=-1){var m=s.getCurrentTokenRow(),g=s.getCurrentTokenColumn()+v;p=new l(m,g,m,g+i.start.length);break}o=s.stepBackward()}var s=new f(t,r.row,r.column),o=s.getCurrentToken();while(o&&/comment/.test(o.type)){var v=o.value.indexOf(i.end);if(v!=-1){var m=s.getCurrentTokenRow(),g=s.getCurrentTokenColumn()+v;d=new l(m,g,m,g+i.end.length);break}o=s.stepForward()}d&&t.remove(d),p&&(t.remove(p),c=p.start.row,h=-i.start.length)}else h=i.start.length,c=n.start.row,t.insert(n.end,i.end),t.insert(n.start,i.start);a.start.row==c&&(a.start.column+=h),a.end.row==c&&(a.end.column+=h),t.selection.fromOrientedRange(a)},this.getNextLineIndent=function(e,t,n){return this.$getIndent(t)},this.checkOutdent=function(e,t,n){return!1},this.autoOutdent=function(e,t,n){},this.$getIndent=function(e){return e.match(/^\s*/)[0]},this.createWorker=function(e){return null},this.createModeDelegates=function(e){this.$embeds=[],this.$modes={};for(var t in e)if(e[t]){var n=e[t],i=n.prototype.$id,s=r.$modes[i];s||(r.$modes[i]=s=new n),r.$modes[t]||(r.$modes[t]=s),this.$embeds.push(t),this.$modes[t]=s}var o=["toggleBlockComment","toggleCommentLines","getNextLineIndent","checkOutdent","autoOutdent","transformAction","getCompletions"];for(var t=0;t<o.length;t++)(function(e){var n=o[t],r=e[n];e[o[t]]=function(){return this.$delegator(n,arguments,r)}})(this)},this.$delegator=function(e,t,n){var r=t[0]||"start";if(typeof r!="string"){if(Array.isArray(r[2])){var i=r[2][r[2].length-1],s=this.$modes[i];if(s)return s[e].apply(s,[r[1]].concat([].slice.call(t,1)))}r=r[0]||"start"}for(var o=0;o<this.$embeds.length;o++){if(!this.$modes[this.$embeds[o]])continue;var u=r.split(this.$embeds[o]);if(!u[0]&&u[1]){t[0]=u[1];var s=this.$modes[this.$embeds[o]];return s[e].apply(s,t)}}var a=n.apply(this,t);return n?a:undefined},this.transformAction=function(e,t,n,r,i){if(this.$behaviour){var s=this.$behaviour.getBehaviours();for(var o in s)if(s[o][t]){var u=s[o][t].apply(this,arguments);if(u)return u}}},this.getKeywords=function(e){if(!this.completionKeywords){var t=this.$tokenizer.rules,n=[];for(var r in t){var i=t[r];for(var s=0,o=i.length;s<o;s++)if(typeof i[s].token=="string")/keyword|support|storage/.test(i[s].token)&&n.push(i[s].regex);else if(typeof i[s].token=="object")for(var u=0,a=i[s].token.length;u<a;u++)if(/keyword|support|storage/.test(i[s].token[u])){var r=i[s].regex.match(/\(.+?\)/g)[u];n.push(r.substr(1,r.length-2))}}this.completionKeywords=n}return e?n.concat(this.$keywordList||[]):this.$keywordList},this.$createKeywordList=function(){return this.$highlightRules||this.getTokenizer(),this.$keywordList=this.$highlightRules.$keywordList||[]},this.getCompletions=function(e,t,n,r){var i=this.$keywordList||this.$createKeywordList();return i.map(function(e){return{name:e,value:e,score:0,meta:"keyword"}})},this.$id="ace/mode/text"}).call(c.prototype),t.Mode=c}),define("ace/apply_delta",["require","exports","module"],function(e,t,n){"use strict";function r(e,t){throw console.log("Invalid Delta:",e),"Invalid Delta: "+t}function i(e,t){return t.row>=0&&t.row<e.length&&t.column>=0&&t.column<=e[t.row].length}function s(e,t){t.action!="insert"&&t.action!="remove"&&r(t,"delta.action must be 'insert' or 'remove'"),t.lines instanceof Array||r(t,"delta.lines must be an Array"),(!t.start||!t.end)&&r(t,"delta.start/end must be an present");var n=t.start;i(e,t.start)||r(t,"delta.start must be contained in document");var s=t.end;t.action=="remove"&&!i(e,s)&&r(t,"delta.end must contained in document for 'remove' actions");var o=s.row-n.row,u=s.column-(o==0?n.column:0);(o!=t.lines.length-1||t.lines[o].length!=u)&&r(t,"delta.range must match delta lines")}t.applyDelta=function(e,t,n){var r=t.start.row,i=t.start.column,s=e[r]||"";switch(t.action){case"insert":var o=t.lines;if(o.length===1)e[r]=s.substring(0,i)+t.lines[0]+s.substring(i);else{var u=[r,1].concat(t.lines);e.splice.apply(e,u),e[r]=s.substring(0,i)+e[r],e[r+t.lines.length-1]+=s.substring(i)}break;case"remove":var a=t.end.column,f=t.end.row;r===f?e[r]=s.substring(0,i)+s.substring(a):e.splice(r,f-r+1,s.substring(0,i)+e[f].substring(a))}}}),define("ace/anchor",["require","exports","module","ace/lib/oop","ace/lib/event_emitter"],function(e,t,n){"use strict";var r=e("./lib/oop"),i=e("./lib/event_emitter").EventEmitter,s=t.Anchor=function(e,t,n){this.$onChange=this.onChange.bind(this),this.attach(e),typeof n=="undefined"?this.setPosition(t.row,t.column):this.setPosition(t,n)};(function(){function e(e,t,n){var r=n?e.column<=t.column:e.column<t.column;return e.row<t.row||e.row==t.row&&r}function t(t,n,r){var i=t.action=="insert",s=(i?1:-1)*(t.end.row-t.start.row),o=(i?1:-1)*(t.end.column-t.start.column),u=t.start,a=i?u:t.end;return e(n,u,r)?{row:n.row,column:n.column}:e(a,n,!r)?{row:n.row+s,column:n.column+(n.row==a.row?o:0)}:{row:u.row,column:u.column}}r.implement(this,i),this.getPosition=function(){return this.$clipPositionToDocument(this.row,this.column)},this.getDocument=function(){return this.document},this.$insertRight=!1,this.onChange=function(e){if(e.start.row==e.end.row&&e.start.row!=this.row)return;if(e.start.row>this.row)return;var n=t(e,{row:this.row,column:this.column},this.$insertRight);this.setPosition(n.row,n.column,!0)},this.setPosition=function(e,t,n){var r;n?r={row:e,column:t}:r=this.$clipPositionToDocument(e,t);if(this.row==r.row&&this.column==r.column)return;var i={row:this.row,column:this.column};this.row=r.row,this.column=r.column,this._signal("change",{old:i,value:r})},this.detach=function(){this.document.removeEventListener("change",this.$onChange)},this.attach=function(e){this.document=e||this.document,this.document.on("change",this.$onChange)},this.$clipPositionToDocument=function(e,t){var n={};return e>=this.document.getLength()?(n.row=Math.max(0,this.document.getLength()-1),n.column=this.document.getLine(n.row).length):e<0?(n.row=0,n.column=0):(n.row=e,n.column=Math.min(this.document.getLine(n.row).length,Math.max(0,t))),t<0&&(n.column=0),n}}).call(s.prototype)}),define("ace/document",["require","exports","module","ace/lib/oop","ace/apply_delta","ace/lib/event_emitter","ace/range","ace/anchor"],function(e,t,n){"use strict";var r=e("./lib/oop"),i=e("./apply_delta").applyDelta,s=e("./lib/event_emitter").EventEmitter,o=e("./range").Range,u=e("./anchor").Anchor,a=function(e){this.$lines=[""],e.length===0?this.$lines=[""]:Array.isArray(e)?this.insertMergedLines({row:0,column:0},e):this.insert({row:0,column:0},e)};(function(){r.implement(this,s),this.setValue=function(e){var t=this.getLength()-1;this.remove(new o(0,0,t,this.getLine(t).length)),this.insert({row:0,column:0},e)},this.getValue=function(){return this.getAllLines().join(this.getNewLineCharacter())},this.createAnchor=function(e,t){return new u(this,e,t)},"aaa".split(/a/).length===0?this.$split=function(e){return e.replace(/\r\n|\r/g,"\n").split("\n")}:this.$split=function(e){return e.split(/\r\n|\r|\n/)},this.$detectNewLine=function(e){var t=e.match(/^.*?(\r\n|\r|\n)/m);this.$autoNewLine=t?t[1]:"\n",this._signal("changeNewLineMode")},this.getNewLineCharacter=function(){switch(this.$newLineMode){case"windows":return"\r\n";case"unix":return"\n";default:return this.$autoNewLine||"\n"}},this.$autoNewLine="",this.$newLineMode="auto",this.setNewLineMode=function(e){if(this.$newLineMode===e)return;this.$newLineMode=e,this._signal("changeNewLineMode")},this.getNewLineMode=function(){return this.$newLineMode},this.isNewLine=function(e){return e=="\r\n"||e=="\r"||e=="\n"},this.getLine=function(e){return this.$lines[e]||""},this.getLines=function(e,t){return this.$lines.slice(e,t+1)},this.getAllLines=function(){return this.getLines(0,this.getLength())},this.getLength=function(){return this.$lines.length},this.getTextRange=function(e){return this.getLinesForRange(e).join(this.getNewLineCharacter())},this.getLinesForRange=function(e){var t;if(e.start.row===e.end.row)t=[this.getLine(e.start.row).substring(e.start.column,e.end.column)];else{t=this.getLines(e.start.row,e.end.row),t[0]=(t[0]||"").substring(e.start.column);var n=t.length-1;e.end.row-e.start.row==n&&(t[n]=t[n].substring(0,e.end.column))}return t},this.insertLines=function(e,t){return console.warn("Use of document.insertLines is deprecated. Use the insertFullLines method instead."),this.insertFullLines(e,t)},this.removeLines=function(e,t){return console.warn("Use of document.removeLines is deprecated. Use the removeFullLines method instead."),this.removeFullLines(e,t)},this.insertNewLine=function(e){return console.warn("Use of document.insertNewLine is deprecated. Use insertMergedLines(position, ['', '']) instead."),this.insertMergedLines(e,["",""])},this.insert=function(e,t){return this.getLength()<=1&&this.$detectNewLine(t),this.insertMergedLines(e,this.$split(t))},this.insertInLine=function(e,t){var n=this.clippedPos(e.row,e.column),r=this.pos(e.row,e.column+t.length);return this.applyDelta({start:n,end:r,action:"insert",lines:[t]},!0),this.clonePos(r)},this.clippedPos=function(e,t){var n=this.getLength();e===undefined?e=n:e<0?e=0:e>=n&&(e=n-1,t=undefined);var r=this.getLine(e);return t==undefined&&(t=r.length),t=Math.min(Math.max(t,0),r.length),{row:e,column:t}},this.clonePos=function(e){return{row:e.row,column:e.column}},this.pos=function(e,t){return{row:e,column:t}},this.$clipPosition=function(e){var t=this.getLength();return e.row>=t?(e.row=Math.max(0,t-1),e.column=this.getLine(t-1).length):(e.row=Math.max(0,e.row),e.column=Math.min(Math.max(e.column,0),this.getLine(e.row).length)),e},this.insertFullLines=function(e,t){e=Math.min(Math.max(e,0),this.getLength());var n=0;e<this.getLength()?(t=t.concat([""]),n=0):(t=[""].concat(t),e--,n=this.$lines[e].length),this.insertMergedLines({row:e,column:n},t)},this.insertMergedLines=function(e,t){var n=this.clippedPos(e.row,e.column),r={row:n.row+t.length-1,column:(t.length==1?n.column:0)+t[t.length-1].length};return this.applyDelta({start:n,end:r,action:"insert",lines:t}),this.clonePos(r)},this.remove=function(e){var t=this.clippedPos(e.start.row,e.start.column),n=this.clippedPos(e.end.row,e.end.column);return this.applyDelta({start:t,end:n,action:"remove",lines:this.getLinesForRange({start:t,end:n})}),this.clonePos(t)},this.removeInLine=function(e,t,n){var r=this.clippedPos(e,t),i=this.clippedPos(e,n);return this.applyDelta({start:r,end:i,action:"remove",lines:this.getLinesForRange({start:r,end:i})},!0),this.clonePos(r)},this.removeFullLines=function(e,t){e=Math.min(Math.max(0,e),this.getLength()-1),t=Math.min(Math.max(0,t),this.getLength()-1);var n=t==this.getLength()-1&&e>0,r=t<this.getLength()-1,i=n?e-1:e,s=n?this.getLine(i).length:0,u=r?t+1:t,a=r?0:this.getLine(u).length,f=new o(i,s,u,a),l=this.$lines.slice(e,t+1);return this.applyDelta({start:f.start,end:f.end,action:"remove",lines:this.getLinesForRange(f)}),l},this.removeNewLine=function(e){e<this.getLength()-1&&e>=0&&this.applyDelta({start:this.pos(e,this.getLine(e).length),end:this.pos(e+1,0),action:"remove",lines:["",""]})},this.replace=function(e,t){e instanceof o||(e=o.fromPoints(e.start,e.end));if(t.length===0&&e.isEmpty())return e.start;if(t==this.getTextRange(e))return e.end;this.remove(e);var n;return t?n=this.insert(e.start,t):n=e.start,n},this.applyDeltas=function(e){for(var t=0;t<e.length;t++)this.applyDelta(e[t])},this.revertDeltas=function(e){for(var t=e.length-1;t>=0;t--)this.revertDelta(e[t])},this.applyDelta=function(e,t){var n=e.action=="insert";if(n?e.lines.length<=1&&!e.lines[0]:!o.comparePoints(e.start,e.end))return;n&&e.lines.length>2e4?this.$splitAndapplyLargeDelta(e,2e4):(i(this.$lines,e,t),this._signal("change",e))},this.$splitAndapplyLargeDelta=function(e,t){var n=e.lines,r=n.length-t+1,i=e.start.row,s=e.start.column;for(var o=0,u=0;o<r;o=u){u+=t-1;var a=n.slice(o,u);a.push(""),this.applyDelta({start:this.pos(i+o,s),end:this.pos(i+u,s=0),action:e.action,lines:a},!0)}e.lines=n.slice(o),e.start.row=i+o,e.start.column=s,this.applyDelta(e,!0)},this.revertDelta=function(e){this.applyDelta({start:this.clonePos(e.start),end:this.clonePos(e.end),action:e.action=="insert"?"remove":"insert",lines:e.lines.slice()})},this.indexToPosition=function(e,t){var n=this.$lines||this.getAllLines(),r=this.getNewLineCharacter().length;for(var i=t||0,s=n.length;i<s;i++){e-=n[i].length+r;if(e<0)return{row:i,column:e+n[i].length+r}}return{row:s-1,column:e+n[s-1].length+r}},this.positionToIndex=function(e,t){var n=this.$lines||this.getAllLines(),r=this.getNewLineCharacter().length,i=0,s=Math.min(e.row,n.length);for(var o=t||0;o<s;++o)i+=n[o].length+r;return i+e.column}}).call(a.prototype),t.Document=a}),define("ace/background_tokenizer",["require","exports","module","ace/lib/oop","ace/lib/event_emitter"],function(e,t,n){"use strict";var r=e("./lib/oop"),i=e("./lib/event_emitter").EventEmitter,s=function(e,t){this.running=!1,this.lines=[],this.states=[],this.currentLine=0,this.tokenizer=e;var n=this;this.$worker=function(){if(!n.running)return;var e=new Date,t=n.currentLine,r=-1,i=n.doc,s=t;while(n.lines[t])t++;var o=i.getLength(),u=0;n.running=!1;while(t<o){n.$tokenizeRow(t),r=t;do t++;while(n.lines[t]);u++;if(u%5===0&&new Date-e>20){n.running=setTimeout(n.$worker,20);break}}n.currentLine=t,r==-1&&(r=t),s<=r&&n.fireUpdateEvent(s,r)}};(function(){r.implement(this,i),this.setTokenizer=function(e){this.tokenizer=e,this.lines=[],this.states=[],this.start(0)},this.setDocument=function(e){this.doc=e,this.lines=[],this.states=[],this.stop()},this.fireUpdateEvent=function(e,t){var n={first:e,last:t};this._signal("update",{data:n})},this.start=function(e){this.currentLine=Math.min(e||0,this.currentLine,this.doc.getLength()),this.lines.splice(this.currentLine,this.lines.length),this.states.splice(this.currentLine,this.states.length),this.stop(),this.running=setTimeout(this.$worker,700)},this.scheduleStart=function(){this.running||(this.running=setTimeout(this.$worker,700))},this.$updateOnChange=function(e){var t=e.start.row,n=e.end.row-t;if(n===0)this.lines[t]=null;else if(e.action=="remove")this.lines.splice(t,n+1,null),this.states.splice(t,n+1,null);else{var r=Array(n+1);r.unshift(t,1),this.lines.splice.apply(this.lines,r),this.states.splice.apply(this.states,r)}this.currentLine=Math.min(t,this.currentLine,this.doc.getLength()),this.stop()},this.stop=function(){this.running&&clearTimeout(this.running),this.running=!1},this.getTokens=function(e){return this.lines[e]||this.$tokenizeRow(e)},this.getState=function(e){return this.currentLine==e&&this.$tokenizeRow(e),this.states[e]||"start"},this.$tokenizeRow=function(e){var t=this.doc.getLine(e),n=this.states[e-1],r=this.tokenizer.getLineTokens(t,n,e);return this.states[e]+""!=r.state+""?(this.states[e]=r.state,this.lines[e+1]=null,this.currentLine>e+1&&(this.currentLine=e+1)):this.currentLine==e&&(this.currentLine=e+1),this.lines[e]=r.tokens}}).call(s.prototype),t.BackgroundTokenizer=s}),define("ace/search_highlight",["require","exports","module","ace/lib/lang","ace/lib/oop","ace/range"],function(e,t,n){"use strict";var r=e("./lib/lang"),i=e("./lib/oop"),s=e("./range").Range,o=function(e,t,n){this.setRegexp(e),this.clazz=t,this.type=n||"text"};(function(){this.MAX_RANGES=500,this.setRegexp=function(e){if(this.regExp+""==e+"")return;this.regExp=e,this.cache=[]},this.update=function(e,t,n,i){if(!this.regExp)return;var o=i.firstRow,u=i.lastRow;for(var a=o;a<=u;a++){var f=this.cache[a];f==null&&(f=r.getMatchOffsets(n.getLine(a),this.regExp),f.length>this.MAX_RANGES&&(f=f.slice(0,this.MAX_RANGES)),f=f.map(function(e){return new s(a,e.offset,a,e.offset+e.length)}),this.cache[a]=f.length?f:"");for(var l=f.length;l--;)t.drawSingleLineMarker(e,f[l].toScreenRange(n),this.clazz,i)}}}).call(o.prototype),t.SearchHighlight=o}),define("ace/edit_session/fold_line",["require","exports","module","ace/range"],function(e,t,n){"use strict";function i(e,t){this.foldData=e,Array.isArray(t)?this.folds=t:t=this.folds=[t];var n=t[t.length-1];this.range=new r(t[0].start.row,t[0].start.column,n.end.row,n.end.column),this.start=this.range.start,this.end=this.range.end,this.folds.forEach(function(e){e.setFoldLine(this)},this)}var r=e("../range").Range;(function(){this.shiftRow=function(e){this.start.row+=e,this.end.row+=e,this.folds.forEach(function(t){t.start.row+=e,t.end.row+=e})},this.addFold=function(e){if(e.sameRow){if(e.start.row<this.startRow||e.endRow>this.endRow)throw new Error("Can't add a fold to this FoldLine as it has no connection");this.folds.push(e),this.folds.sort(function(e,t){return-e.range.compareEnd(t.start.row,t.start.column)}),this.range.compareEnd(e.start.row,e.start.column)>0?(this.end.row=e.end.row,this.end.column=e.end.column):this.range.compareStart(e.end.row,e.end.column)<0&&(this.start.row=e.start.row,this.start.column=e.start.column)}else if(e.start.row==this.end.row)this.folds.push(e),this.end.row=e.end.row,this.end.column=e.end.column;else{if(e.end.row!=this.start.row)throw new Error("Trying to add fold to FoldRow that doesn't have a matching row");this.folds.unshift(e),this.start.row=e.start.row,this.start.column=e.start.column}e.foldLine=this},this.containsRow=function(e){return e>=this.start.row&&e<=this.end.row},this.walk=function(e,t,n){var r=0,i=this.folds,s,o,u,a=!0;t==null&&(t=this.end.row,n=this.end.column);for(var f=0;f<i.length;f++){s=i[f],o=s.range.compareStart(t,n);if(o==-1){e(null,t,n,r,a);return}u=e(null,s.start.row,s.start.column,r,a),u=!u&&e(s.placeholder,s.start.row,s.start.column,r);if(u||o===0)return;a=!s.sameRow,r=s.end.column}e(null,t,n,r,a)},this.getNextFoldTo=function(e,t){var n,r;for(var i=0;i<this.folds.length;i++){n=this.folds[i],r=n.range.compareEnd(e,t);if(r==-1)return{fold:n,kind:"after"};if(r===0)return{fold:n,kind:"inside"}}return null},this.addRemoveChars=function(e,t,n){var r=this.getNextFoldTo(e,t),i,s;if(r){i=r.fold;if(r.kind=="inside"&&i.start.column!=t&&i.start.row!=e)window.console&&window.console.log(e,t,i);else if(i.start.row==e){s=this.folds;var o=s.indexOf(i);o===0&&(this.start.column+=n);for(o;o<s.length;o++){i=s[o],i.start.column+=n;if(!i.sameRow)return;i.end.column+=n}this.end.column+=n}}},this.split=function(e,t){var n=this.getNextFoldTo(e,t);if(!n||n.kind=="inside")return null;var r=n.fold,s=this.folds,o=this.foldData,u=s.indexOf(r),a=s[u-1];this.end.row=a.end.row,this.end.column=a.end.column,s=s.splice(u,s.length-u);var f=new i(o,s);return o.splice(o.indexOf(this)+1,0,f),f},this.merge=function(e){var t=e.folds;for(var n=0;n<t.length;n++)this.addFold(t[n]);var r=this.foldData;r.splice(r.indexOf(e),1)},this.toString=function(){var e=[this.range.toString()+": ["];return this.folds.forEach(function(t){e.push("  "+t.toString())}),e.push("]"),e.join("\n")},this.idxToPosition=function(e){var t=0;for(var n=0;n<this.folds.length;n++){var r=this.folds[n];e-=r.start.column-t;if(e<0)return{row:r.start.row,column:r.start.column+e};e-=r.placeholder.length;if(e<0)return r.start;t=r.end.column}return{row:this.end.row,column:this.end.column+e}}}).call(i.prototype),t.FoldLine=i}),define("ace/range_list",["require","exports","module","ace/range"],function(e,t,n){"use strict";var r=e("./range").Range,i=r.comparePoints,s=function(){this.ranges=[],this.$bias=1};(function(){this.comparePoints=i,this.pointIndex=function(e,t,n){var r=this.ranges;for(var s=n||0;s<r.length;s++){var o=r[s],u=i(e,o.end);if(u>0)continue;var a=i(e,o.start);return u===0?t&&a!==0?-s-2:s:a>0||a===0&&!t?s:-s-1}return-s-1},this.add=function(e){var t=!e.isEmpty(),n=this.pointIndex(e.start,t);n<0&&(n=-n-1);var r=this.pointIndex(e.end,t,n);return r<0?r=-r-1:r++,this.ranges.splice(n,r-n,e)},this.addList=function(e){var t=[];for(var n=e.length;n--;)t.push.apply(t,this.add(e[n]));return t},this.substractPoint=function(e){var t=this.pointIndex(e);if(t>=0)return this.ranges.splice(t,1)},this.merge=function(){var e=[],t=this.ranges;t=t.sort(function(e,t){return i(e.start,t.start)});var n=t[0],r;for(var s=1;s<t.length;s++){r=n,n=t[s];var o=i(r.end,n.start);if(o<0)continue;if(o==0&&!r.isEmpty()&&!n.isEmpty())continue;i(r.end,n.end)<0&&(r.end.row=n.end.row,r.end.column=n.end.column),t.splice(s,1),e.push(n),n=r,s--}return this.ranges=t,e},this.contains=function(e,t){return this.pointIndex({row:e,column:t})>=0},this.containsPoint=function(e){return this.pointIndex(e)>=0},this.rangeAtPoint=function(e){var t=this.pointIndex(e);if(t>=0)return this.ranges[t]},this.clipRows=function(e,t){var n=this.ranges;if(n[0].start.row>t||n[n.length-1].start.row<e)return[];var r=this.pointIndex({row:e,column:0});r<0&&(r=-r-1);var i=this.pointIndex({row:t,column:0},r);i<0&&(i=-i-1);var s=[];for(var o=r;o<i;o++)s.push(n[o]);return s},this.removeAll=function(){return this.ranges.splice(0,this.ranges.length)},this.attach=function(e){this.session&&this.detach(),this.session=e,this.onChange=this.$onChange.bind(this),this.session.on("change",this.onChange)},this.detach=function(){if(!this.session)return;this.session.removeListener("change",this.onChange),this.session=null},this.$onChange=function(e){var t=e.start,n=e.end,r=t.row,i=n.row,s=this.ranges;for(var o=0,u=s.length;o<u;o++){var a=s[o];if(a.end.row>=r)break}if(e.action=="insert"){var f=i-r,l=-t.column+n.column;for(;o<u;o++){var a=s[o];if(a.start.row>r)break;a.start.row==r&&a.start.column>=t.column&&(a.start.column==t.column&&this.$bias<=0||(a.start.column+=l,a.start.row+=f));if(a.end.row==r&&a.end.column>=t.column){if(a.end.column==t.column&&this.$bias<0)continue;a.end.column==t.column&&l>0&&o<u-1&&a.end.column>a.start.column&&a.end.column==s[o+1].start.column&&(a.end.column-=l),a.end.column+=l,a.end.row+=f}}}else{var f=r-i,l=t.column-n.column;for(;o<u;o++){var a=s[o];if(a.start.row>i)break;if(a.end.row<i&&(r<a.end.row||r==a.end.row&&t.column<a.end.column))a.end.row=r,a.end.column=t.column;else if(a.end.row==i)if(a.end.column<=n.column){if(f||a.end.column>t.column)a.end.column=t.column,a.end.row=t.row}else a.end.column+=l,a.end.row+=f;else a.end.row>i&&(a.end.row+=f);if(a.start.row<i&&(r<a.start.row||r==a.start.row&&t.column<a.start.column))a.start.row=r,a.start.column=t.column;else if(a.start.row==i)if(a.start.column<=n.column){if(f||a.start.column>t.column)a.start.column=t.column,a.start.row=t.row}else a.start.column+=l,a.start.row+=f;else a.start.row>i&&(a.start.row+=f)}}if(f!=0&&o<u)for(;o<u;o++){var a=s[o];a.start.row+=f,a.end.row+=f}}}).call(s.prototype),t.RangeList=s}),define("ace/edit_session/fold",["require","exports","module","ace/range_list","ace/lib/oop"],function(e,t,n){"use strict";function o(e,t){e.row-=t.row,e.row==0&&(e.column-=t.column)}function u(e,t){o(e.start,t),o(e.end,t)}function a(e,t){e.row==0&&(e.column+=t.column),e.row+=t.row}function f(e,t){a(e.start,t),a(e.end,t)}var r=e("../range_list").RangeList,i=e("../lib/oop"),s=t.Fold=function(e,t){this.foldLine=null,this.placeholder=t,this.range=e,this.start=e.start,this.end=e.end,this.sameRow=e.start.row==e.end.row,this.subFolds=this.ranges=[]};i.inherits(s,r),function(){this.toString=function(){return'"'+this.placeholder+'" '+this.range.toString()},this.setFoldLine=function(e){this.foldLine=e,this.subFolds.forEach(function(t){t.setFoldLine(e)})},this.clone=function(){var e=this.range.clone(),t=new s(e,this.placeholder);return this.subFolds.forEach(function(e){t.subFolds.push(e.clone())}),t.collapseChildren=this.collapseChildren,t},this.addSubFold=function(e){if(this.range.isEqual(e))return;u(e,this.start);var t=e.start.row,n=e.start.column;for(var r=0,i=-1;r<this.subFolds.length;r++){i=this.subFolds[r].range.compare(t,n);if(i!=1)break}var s=this.subFolds[r],o=0;if(i==0){if(s.range.containsRange(e))return s.addSubFold(e);o=1}var t=e.range.end.row,n=e.range.end.column;for(var a=r,i=-1;a<this.subFolds.length;a++){i=this.subFolds[a].range.compare(t,n);if(i!=1)break}i==0&&a++;var f=this.subFolds.splice(r,a-r,e),l=i==0?f.length-1:f.length;for(var c=o;c<l;c++)e.addSubFold(f[c]);return e.setFoldLine(this.foldLine),e},this.restoreRange=function(e){return f(e,this.start)}}.call(s.prototype)}),define("ace/edit_session/folding",["require","exports","module","ace/range","ace/edit_session/fold_line","ace/edit_session/fold","ace/token_iterator"],function(e,t,n){"use strict";function u(){this.getFoldAt=function(e,t,n){var r=this.getFoldLine(e);if(!r)return null;var i=r.folds;for(var s=0;s<i.length;s++){var o=i[s].range;if(o.contains(e,t)){if(n==1&&o.isEnd(e,t)&&!o.isEmpty())continue;if(n==-1&&o.isStart(e,t)&&!o.isEmpty())continue;return i[s]}}},this.getFoldsInRange=function(e){var t=e.start,n=e.end,r=this.$foldData,i=[];t.column+=1,n.column-=1;for(var s=0;s<r.length;s++){var o=r[s].range.compareRange(e);if(o==2)continue;if(o==-2)break;var u=r[s].folds;for(var a=0;a<u.length;a++){var f=u[a];o=f.range.compareRange(e);if(o==-2)break;if(o==2)continue;if(o==42)break;i.push(f)}}return t.column-=1,n.column+=1,i},this.getFoldsInRangeList=function(e){if(Array.isArray(e)){var t=[];e.forEach(function(e){t=t.concat(this.getFoldsInRange(e))},this)}else var t=this.getFoldsInRange(e);return t},this.getAllFolds=function(){var e=[],t=this.$foldData;for(var n=0;n<t.length;n++)for(var r=0;r<t[n].folds.length;r++)e.push(t[n].folds[r]);return e},this.getFoldStringAt=function(e,t,n,r){r=r||this.getFoldLine(e);if(!r)return null;var i={end:{column:0}},s,o;for(var u=0;u<r.folds.length;u++){o=r.folds[u];var a=o.range.compareEnd(e,t);if(a==-1){s=this.getLine(o.start.row).substring(i.end.column,o.start.column);break}if(a===0)return null;i=o}return s||(s=this.getLine(o.start.row).substring(i.end.column)),n==-1?s.substring(0,t-i.end.column):n==1?s.substring(t-i.end.column):s},this.getFoldLine=function(e,t){var n=this.$foldData,r=0;t&&(r=n.indexOf(t)),r==-1&&(r=0);for(r;r<n.length;r++){var i=n[r];if(i.start.row<=e&&i.end.row>=e)return i;if(i.end.row>e)return null}return null},this.getNextFoldLine=function(e,t){var n=this.$foldData,r=0;t&&(r=n.indexOf(t)),r==-1&&(r=0);for(r;r<n.length;r++){var i=n[r];if(i.end.row>=e)return i}return null},this.getFoldedRowCount=function(e,t){var n=this.$foldData,r=t-e+1;for(var i=0;i<n.length;i++){var s=n[i],o=s.end.row,u=s.start.row;if(o>=t){u<t&&(u>=e?r-=t-u:r=0);break}o>=e&&(u>=e?r-=o-u:r-=o-e+1)}return r},this.$addFoldLine=function(e){return this.$foldData.push(e),this.$foldData.sort(function(e,t){return e.start.row-t.start.row}),e},this.addFold=function(e,t){var n=this.$foldData,r=!1,o;e instanceof s?o=e:(o=new s(t,e),o.collapseChildren=t.collapseChildren),this.$clipRangeToDocument(o.range);var u=o.start.row,a=o.start.column,f=o.end.row,l=o.end.column,c=this.getFoldAt(u,a,1),h=this.getFoldAt(f,l,-1);if(c&&h==c)return c.addSubFold(o);c&&!c.range.isStart(u,a)&&this.removeFold(c),h&&!h.range.isEnd(f,l)&&this.removeFold(h);var p=this.getFoldsInRange(o.range);p.length>0&&(this.removeFolds(p),p.forEach(function(e){o.addSubFold(e)}));for(var d=0;d<n.length;d++){var v=n[d];if(f==v.start.row){v.addFold(o),r=!0;break}if(u==v.end.row){v.addFold(o),r=!0;if(!o.sameRow){var m=n[d+1];if(m&&m.start.row==f){v.merge(m);break}}break}if(f<=v.start.row)break}return r||(v=this.$addFoldLine(new i(this.$foldData,o))),this.$useWrapMode?this.$updateWrapData(v.start.row,v.start.row):this.$updateRowLengthCache(v.start.row,v.start.row),this.$modified=!0,this._signal("changeFold",{data:o,action:"add"}),o},this.addFolds=function(e){e.forEach(function(e){this.addFold(e)},this)},this.removeFold=function(e){var t=e.foldLine,n=t.start.row,r=t.end.row,i=this.$foldData,s=t.folds;if(s.length==1)i.splice(i.indexOf(t),1);else if(t.range.isEnd(e.end.row,e.end.column))s.pop(),t.end.row=s[s.length-1].end.row,t.end.column=s[s.length-1].end.column;else if(t.range.isStart(e.start.row,e.start.column))s.shift(),t.start.row=s[0].start.row,t.start.column=s[0].start.column;else if(e.sameRow)s.splice(s.indexOf(e),1);else{var o=t.split(e.start.row,e.start.column);s=o.folds,s.shift(),o.start.row=s[0].start.row,o.start.column=s[0].start.column}this.$updating||(this.$useWrapMode?this.$updateWrapData(n,r):this.$updateRowLengthCache(n,r)),this.$modified=!0,this._signal("changeFold",{data:e,action:"remove"})},this.removeFolds=function(e){var t=[];for(var n=0;n<e.length;n++)t.push(e[n]);t.forEach(function(e){this.removeFold(e)},this),this.$modified=!0},this.expandFold=function(e){this.removeFold(e),e.subFolds.forEach(function(t){e.restoreRange(t),this.addFold(t)},this),e.collapseChildren>0&&this.foldAll(e.start.row+1,e.end.row,e.collapseChildren-1),e.subFolds=[]},this.expandFolds=function(e){e.forEach(function(e){this.expandFold(e)},this)},this.unfold=function(e,t){var n,i;e==null?(n=new r(0,0,this.getLength(),0),t=!0):typeof e=="number"?n=new r(e,0,e,this.getLine(e).length):"row"in e?n=r.fromPoints(e,e):n=e,i=this.getFoldsInRangeList(n);if(t)this.removeFolds(i);else{var s=i;while(s.length)this.expandFolds(s),s=this.getFoldsInRangeList(n)}if(i.length)return i},this.isRowFolded=function(e,t){return!!this.getFoldLine(e,t)},this.getRowFoldEnd=function(e,t){var n=this.getFoldLine(e,t);return n?n.end.row:e},this.getRowFoldStart=function(e,t){var n=this.getFoldLine(e,t);return n?n.start.row:e},this.getFoldDisplayLine=function(e,t,n,r,i){r==null&&(r=e.start.row),i==null&&(i=0),t==null&&(t=e.end.row),n==null&&(n=this.getLine(t).length);var s=this.doc,o="";return e.walk(function(e,t,n,u){if(t<r)return;if(t==r){if(n<i)return;u=Math.max(i,u)}e!=null?o+=e:o+=s.getLine(t).substring(u,n)},t,n),o},this.getDisplayLine=function(e,t,n,r){var i=this.getFoldLine(e);if(!i){var s;return s=this.doc.getLine(e),s.substring(r||0,t||s.length)}return this.getFoldDisplayLine(i,e,t,n,r)},this.$cloneFoldData=function(){var e=[];return e=this.$foldData.map(function(t){var n=t.folds.map(function(e){return e.clone()});return new i(e,n)}),e},this.toggleFold=function(e){var t=this.selection,n=t.getRange(),r,i;if(n.isEmpty()){var s=n.start;r=this.getFoldAt(s.row,s.column);if(r){this.expandFold(r);return}(i=this.findMatchingBracket(s))?n.comparePoint(i)==1?n.end=i:(n.start=i,n.start.column++,n.end.column--):(i=this.findMatchingBracket({row:s.row,column:s.column+1}))?(n.comparePoint(i)==1?n.end=i:n.start=i,n.start.column++):n=this.getCommentFoldRange(s.row,s.column)||n}else{var o=this.getFoldsInRange(n);if(e&&o.length){this.expandFolds(o);return}o.length==1&&(r=o[0])}r||(r=this.getFoldAt(n.start.row,n.start.column));if(r&&r.range.toString()==n.toString()){this.expandFold(r);return}var u="...";if(!n.isMultiLine()){u=this.getTextRange(n);if(u.length<4)return;u=u.trim().substring(0,2)+".."}this.addFold(u,n)},this.getCommentFoldRange=function(e,t,n){var i=new o(this,e,t),s=i.getCurrentToken(),u=s.type;if(s&&/^comment|string/.test(u)){u=u.match(/comment|string/)[0],u=="comment"&&(u+="|doc-start");var a=new RegExp(u),f=new r;if(n!=1){do s=i.stepBackward();while(s&&a.test(s.type));i.stepForward()}f.start.row=i.getCurrentTokenRow(),f.start.column=i.getCurrentTokenColumn()+2,i=new o(this,e,t);if(n!=-1){var l=-1;do{s=i.stepForward();if(l==-1){var c=this.getState(i.$row);a.test(c)||(l=i.$row)}else if(i.$row>l)break}while(s&&a.test(s.type));s=i.stepBackward()}else s=i.getCurrentToken();return f.end.row=i.getCurrentTokenRow(),f.end.column=i.getCurrentTokenColumn()+s.value.length-2,f}},this.foldAll=function(e,t,n){n==undefined&&(n=1e5);var r=this.foldWidgets;if(!r)return;t=t||this.getLength(),e=e||0;for(var i=e;i<t;i++){r[i]==null&&(r[i]=this.getFoldWidget(i));if(r[i]!="start")continue;var s=this.getFoldWidgetRange(i);if(s&&s.isMultiLine()&&s.end.row<=t&&s.start.row>=e){i=s.end.row;try{var o=this.addFold("...",s);o&&(o.collapseChildren=n)}catch(u){}}}},this.$foldStyles={manual:1,markbegin:1,markbeginend:1},this.$foldStyle="markbegin",this.setFoldStyle=function(e){if(!this.$foldStyles[e])throw new Error("invalid fold style: "+e+"["+Object.keys(this.$foldStyles).join(", ")+"]");if(this.$foldStyle==e)return;this.$foldStyle=e,e=="manual"&&this.unfold();var t=this.$foldMode;this.$setFolding(null),this.$setFolding(t)},this.$setFolding=function(e){if(this.$foldMode==e)return;this.$foldMode=e,this.off("change",this.$updateFoldWidgets),this.off("tokenizerUpdate",this.$tokenizerUpdateFoldWidgets),this._signal("changeAnnotation");if(!e||this.$foldStyle=="manual"){this.foldWidgets=null;return}this.foldWidgets=[],this.getFoldWidget=e.getFoldWidget.bind(e,this,this.$foldStyle),this.getFoldWidgetRange=e.getFoldWidgetRange.bind(e,this,this.$foldStyle),this.$updateFoldWidgets=this.updateFoldWidgets.bind(this),this.$tokenizerUpdateFoldWidgets=this.tokenizerUpdateFoldWidgets.bind(this),this.on("change",this.$updateFoldWidgets),this.on("tokenizerUpdate",this.$tokenizerUpdateFoldWidgets)},this.getParentFoldRangeData=function(e,t){var n=this.foldWidgets;if(!n||t&&n[e])return{};var r=e-1,i;while(r>=0){var s=n[r];s==null&&(s=n[r]=this.getFoldWidget(r));if(s=="start"){var o=this.getFoldWidgetRange(r);i||(i=o);if(o&&o.end.row>=e)break}r--}return{range:r!==-1&&o,firstRange:i}},this.onFoldWidgetClick=function(e,t){t=t.domEvent;var n={children:t.shiftKey,all:t.ctrlKey||t.metaKey,siblings:t.altKey},r=this.$toggleFoldWidget(e,n);if(!r){var i=t.target||t.srcElement;i&&/ace_fold-widget/.test(i.className)&&(i.className+=" ace_invalid")}},this.$toggleFoldWidget=function(e,t){if(!this.getFoldWidget)return;var n=this.getFoldWidget(e),r=this.getLine(e),i=n==="end"?-1:1,s=this.getFoldAt(e,i===-1?0:r.length,i);if(s)return t.children||t.all?this.removeFold(s):this.expandFold(s),s;var o=this.getFoldWidgetRange(e,!0);if(o&&!o.isMultiLine()){s=this.getFoldAt(o.start.row,o.start.column,1);if(s&&o.isEqual(s.range))return this.removeFold(s),s}if(t.siblings){var u=this.getParentFoldRangeData(e);if(u.range)var a=u.range.start.row+1,f=u.range.end.row;this.foldAll(a,f,t.all?1e4:0)}else t.children?(f=o?o.end.row:this.getLength(),this.foldAll(e+1,f,t.all?1e4:0)):o&&(t.all&&(o.collapseChildren=1e4),this.addFold("...",o));return o},this.toggleFoldWidget=function(e){var t=this.selection.getCursor().row;t=this.getRowFoldStart(t);var n=this.$toggleFoldWidget(t,{});if(n)return;var r=this.getParentFoldRangeData(t,!0);n=r.range||r.firstRange;if(n){t=n.start.row;var i=this.getFoldAt(t,this.getLine(t).length,1);i?this.removeFold(i):this.addFold("...",n)}},this.updateFoldWidgets=function(e){var t=e.start.row,n=e.end.row-t;if(n===0)this.foldWidgets[t]=null;else if(e.action=="remove")this.foldWidgets.splice(t,n+1,null);else{var r=Array(n+1);r.unshift(t,1),this.foldWidgets.splice.apply(this.foldWidgets,r)}},this.tokenizerUpdateFoldWidgets=function(e){var t=e.data;t.first!=t.last&&this.foldWidgets.length>t.first&&this.foldWidgets.splice(t.first,this.foldWidgets.length)}}var r=e("../range").Range,i=e("./fold_line").FoldLine,s=e("./fold").Fold,o=e("../token_iterator").TokenIterator;t.Folding=u}),define("ace/edit_session/bracket_match",["require","exports","module","ace/token_iterator","ace/range"],function(e,t,n){"use strict";function s(){this.findMatchingBracket=function(e,t){if(e.column==0)return null;var n=t||this.getLine(e.row).charAt(e.column-1);if(n=="")return null;var r=n.match(/([\(\[\{])|([\)\]\}])/);return r?r[1]?this.$findClosingBracket(r[1],e):this.$findOpeningBracket(r[2],e):null},this.getBracketRange=function(e){var t=this.getLine(e.row),n=!0,r,s=t.charAt(e.column-1),o=s&&s.match(/([\(\[\{])|([\)\]\}])/);o||(s=t.charAt(e.column),e={row:e.row,column:e.column+1},o=s&&s.match(/([\(\[\{])|([\)\]\}])/),n=!1);if(!o)return null;if(o[1]){var u=this.$findClosingBracket(o[1],e);if(!u)return null;r=i.fromPoints(e,u),n||(r.end.column++,r.start.column--),r.cursor=r.end}else{var u=this.$findOpeningBracket(o[2],e);if(!u)return null;r=i.fromPoints(u,e),n||(r.start.column++,r.end.column--),r.cursor=r.start}return r},this.getMatchingBracketRanges=function(e){var t=this.getLine(e.row),n=t.charAt(e.column-1),r=n&&n.match(/([\(\[\{])|([\)\]\}])/);r||(n=t.charAt(e.column),e={row:e.row,column:e.column+1},r=n&&n.match(/([\(\[\{])|([\)\]\}])/));if(!r)return null;var s=new i(e.row,e.column-1,e.row,e.column),o=r[1]?this.$findClosingBracket(r[1],e):this.$findOpeningBracket(r[2],e);if(!o)return[s];var u=new i(o.row,o.column,o.row,o.column+1);return[s,u]},this.$brackets={")":"(","(":")","]":"[","[":"]","{":"}","}":"{","<":">",">":"<"},this.$findOpeningBracket=function(e,t,n){var i=this.$brackets[e],s=1,o=new r(this,t.row,t.column),u=o.getCurrentToken();u||(u=o.stepForward());if(!u)return;n||(n=new RegExp("(\\.?"+u.type.replace(".","\\.").replace("rparen",".paren").replace(/\b(?:end)\b/,"(?:start|begin|end)")+")+"));var a=t.column-o.getCurrentTokenColumn()-2,f=u.value;for(;;){while(a>=0){var l=f.charAt(a);if(l==i){s-=1;if(s==0)return{row:o.getCurrentTokenRow(),column:a+o.getCurrentTokenColumn()}}else l==e&&(s+=1);a-=1}do u=o.stepBackward();while(u&&!n.test(u.type));if(u==null)break;f=u.value,a=f.length-1}return null},this.$findClosingBracket=function(e,t,n){var i=this.$brackets[e],s=1,o=new r(this,t.row,t.column),u=o.getCurrentToken();u||(u=o.stepForward());if(!u)return;n||(n=new RegExp("(\\.?"+u.type.replace(".","\\.").replace("lparen",".paren").replace(/\b(?:start|begin)\b/,"(?:start|begin|end)")+")+"));var a=t.column-o.getCurrentTokenColumn();for(;;){var f=u.value,l=f.length;while(a<l){var c=f.charAt(a);if(c==i){s-=1;if(s==0)return{row:o.getCurrentTokenRow(),column:a+o.getCurrentTokenColumn()}}else c==e&&(s+=1);a+=1}do u=o.stepForward();while(u&&!n.test(u.type));if(u==null)break;a=0}return null}}var r=e("../token_iterator").TokenIterator,i=e("../range").Range;t.BracketMatch=s}),define("ace/edit_session",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/bidihandler","ace/config","ace/lib/event_emitter","ace/selection","ace/mode/text","ace/range","ace/document","ace/background_tokenizer","ace/search_highlight","ace/edit_session/folding","ace/edit_session/bracket_match"],function(e,t,n){"use strict";var r=e("./lib/oop"),i=e("./lib/lang"),s=e("./bidihandler").BidiHandler,o=e("./config"),u=e("./lib/event_emitter").EventEmitter,a=e("./selection").Selection,f=e("./mode/text").Mode,l=e("./range").Range,c=e("./document").Document,h=e("./background_tokenizer").BackgroundTokenizer,p=e("./search_highlight").SearchHighlight,d=function(e,t){this.$breakpoints=[],this.$decorations=[],this.$frontMarkers={},this.$backMarkers={},this.$markerId=1,this.$undoSelect=!0,this.$foldData=[],this.id="session"+ ++d.$uid,this.$foldData.toString=function(){return this.join("\n")},this.on("changeFold",this.onChangeFold.bind(this)),this.$onChange=this.onChange.bind(this);if(typeof e!="object"||!e.getLine)e=new c(e);this.setDocument(e),this.selection=new a(this),this.$bidiHandler=new s(this),o.resetOptions(this),this.setMode(t),o._signal("session",this)};d.$uid=0,function(){function m(e){return e<4352?!1:e>=4352&&e<=4447||e>=4515&&e<=4519||e>=4602&&e<=4607||e>=9001&&e<=9002||e>=11904&&e<=11929||e>=11931&&e<=12019||e>=12032&&e<=12245||e>=12272&&e<=12283||e>=12288&&e<=12350||e>=12353&&e<=12438||e>=12441&&e<=12543||e>=12549&&e<=12589||e>=12593&&e<=12686||e>=12688&&e<=12730||e>=12736&&e<=12771||e>=12784&&e<=12830||e>=12832&&e<=12871||e>=12880&&e<=13054||e>=13056&&e<=19903||e>=19968&&e<=42124||e>=42128&&e<=42182||e>=43360&&e<=43388||e>=44032&&e<=55203||e>=55216&&e<=55238||e>=55243&&e<=55291||e>=63744&&e<=64255||e>=65040&&e<=65049||e>=65072&&e<=65106||e>=65108&&e<=65126||e>=65128&&e<=65131||e>=65281&&e<=65376||e>=65504&&e<=65510}r.implement(this,u),this.setDocument=function(e){this.doc&&this.doc.removeListener("change",this.$onChange),this.doc=e,e.on("change",this.$onChange),this.bgTokenizer&&this.bgTokenizer.setDocument(this.getDocument()),this.resetCaches()},this.getDocument=function(){return this.doc},this.$resetRowCache=function(e){if(!e){this.$docRowCache=[],this.$screenRowCache=[];return}var t=this.$docRowCache.length,n=this.$getRowCacheIndex(this.$docRowCache,e)+1;t>n&&(this.$docRowCache.splice(n,t),this.$screenRowCache.splice(n,t))},this.$getRowCacheIndex=function(e,t){var n=0,r=e.length-1;while(n<=r){var i=n+r>>1,s=e[i];if(t>s)n=i+1;else{if(!(t<s))return i;r=i-1}}return n-1},this.resetCaches=function(){this.$modified=!0,this.$wrapData=[],this.$rowLengthCache=[],this.$resetRowCache(0),this.bgTokenizer&&this.bgTokenizer.start(0)},this.onChangeFold=function(e){var t=e.data;this.$resetRowCache(t.start.row)},this.onChange=function(e){this.$modified=!0,this.$bidiHandler.onChange(e),this.$resetRowCache(e.start.row);var t=this.$updateInternalDataOnChange(e);!this.$fromUndo&&this.$undoManager&&(t&&t.length&&(this.$undoManager.add({action:"removeFolds",folds:t},this.mergeUndoDeltas),this.mergeUndoDeltas=!0),this.$undoManager.add(e,this.mergeUndoDeltas),this.mergeUndoDeltas=!0,this.$informUndoManager.schedule()),this.bgTokenizer&&this.bgTokenizer.$updateOnChange(e),this._signal("change",e)},this.setValue=function(e){this.doc.setValue(e),this.selection.moveTo(0,0),this.$resetRowCache(0),this.setUndoManager(this.$undoManager),this.getUndoManager().reset()},this.getValue=this.toString=function(){return this.doc.getValue()},this.getSelection=function(){return this.selection},this.getState=function(e){return this.bgTokenizer.getState(e)},this.getTokens=function(e){return this.bgTokenizer.getTokens(e)},this.getTokenAt=function(e,t){var n=this.bgTokenizer.getTokens(e),r,i=0;if(t==null){var s=n.length-1;i=this.getLine(e).length}else for(var s=0;s<n.length;s++){i+=n[s].value.length;if(i>=t)break}return r=n[s],r?(r.index=s,r.start=i-r.value.length,r):null},this.setUndoManager=function(e){this.$undoManager=e,this.$informUndoManager&&this.$informUndoManager.cancel();if(e){var t=this;e.addSession(this),this.$syncInformUndoManager=function(){t.$informUndoManager.cancel(),t.mergeUndoDeltas=!1},this.$informUndoManager=i.delayedCall(this.$syncInformUndoManager)}else this.$syncInformUndoManager=function(){}},this.markUndoGroup=function(){this.$syncInformUndoManager&&this.$syncInformUndoManager()},this.$defaultUndoManager={undo:function(){},redo:function(){},hasUndo:function(){},hasRedo:function(){},reset:function(){},add:function(){},addSelection:function(){},startNewGroup:function(){},addSession:function(){}},this.getUndoManager=function(){return this.$undoManager||this.$defaultUndoManager},this.getTabString=function(){return this.getUseSoftTabs()?i.stringRepeat(" ",this.getTabSize()):"	"},this.setUseSoftTabs=function(e){this.setOption("useSoftTabs",e)},this.getUseSoftTabs=function(){return this.$useSoftTabs&&!this.$mode.$indentWithTabs},this.setTabSize=function(e){this.setOption("tabSize",e)},this.getTabSize=function(){return this.$tabSize},this.isTabStop=function(e){return this.$useSoftTabs&&e.column%this.$tabSize===0},this.setNavigateWithinSoftTabs=function(e){this.setOption("navigateWithinSoftTabs",e)},this.getNavigateWithinSoftTabs=function(){return this.$navigateWithinSoftTabs},this.$overwrite=!1,this.setOverwrite=function(e){this.setOption("overwrite",e)},this.getOverwrite=function(){return this.$overwrite},this.toggleOverwrite=function(){this.setOverwrite(!this.$overwrite)},this.addGutterDecoration=function(e,t){this.$decorations[e]||(this.$decorations[e]=""),this.$decorations[e]+=" "+t,this._signal("changeBreakpoint",{})},this.removeGutterDecoration=function(e,t){this.$decorations[e]=(this.$decorations[e]||"").replace(" "+t,""),this._signal("changeBreakpoint",{})},this.getBreakpoints=function(){return this.$breakpoints},this.setBreakpoints=function(e){this.$breakpoints=[];for(var t=0;t<e.length;t++)this.$breakpoints[e[t]]="ace_breakpoint";this._signal("changeBreakpoint",{})},this.clearBreakpoints=function(){this.$breakpoints=[],this._signal("changeBreakpoint",{})},this.setBreakpoint=function(e,t){t===undefined&&(t="ace_breakpoint"),t?this.$breakpoints[e]=t:delete this.$breakpoints[e],this._signal("changeBreakpoint",{})},this.clearBreakpoint=function(e){delete this.$breakpoints[e],this._signal("changeBreakpoint",{})},this.addMarker=function(e,t,n,r){var i=this.$markerId++,s={range:e,type:n||"line",renderer:typeof n=="function"?n:null,clazz:t,inFront:!!r,id:i};return r?(this.$frontMarkers[i]=s,this._signal("changeFrontMarker")):(this.$backMarkers[i]=s,this._signal("changeBackMarker")),i},this.addDynamicMarker=function(e,t){if(!e.update)return;var n=this.$markerId++;return e.id=n,e.inFront=!!t,t?(this.$frontMarkers[n]=e,this._signal("changeFrontMarker")):(this.$backMarkers[n]=e,this._signal("changeBackMarker")),e},this.removeMarker=function(e){var t=this.$frontMarkers[e]||this.$backMarkers[e];if(!t)return;var n=t.inFront?this.$frontMarkers:this.$backMarkers;delete n[e],this._signal(t.inFront?"changeFrontMarker":"changeBackMarker")},this.getMarkers=function(e){return e?this.$frontMarkers:this.$backMarkers},this.highlight=function(e){if(!this.$searchHighlight){var t=new p(null,"ace_selected-word","text");this.$searchHighlight=this.addDynamicMarker(t)}this.$searchHighlight.setRegexp(e)},this.highlightLines=function(e,t,n,r){typeof t!="number"&&(n=t,t=e),n||(n="ace_step");var i=new l(e,0,t,Infinity);return i.id=this.addMarker(i,n,"fullLine",r),i},this.setAnnotations=function(e){this.$annotations=e,this._signal("changeAnnotation",{})},this.getAnnotations=function(){return this.$annotations||[]},this.clearAnnotations=function(){this.setAnnotations([])},this.$detectNewLine=function(e){var t=e.match(/^.*?(\r?\n)/m);t?this.$autoNewLine=t[1]:this.$autoNewLine="\n"},this.getWordRange=function(e,t){var n=this.getLine(e),r=!1;t>0&&(r=!!n.charAt(t-1).match(this.tokenRe)),r||(r=!!n.charAt(t).match(this.tokenRe));if(r)var i=this.tokenRe;else if(/^\s+$/.test(n.slice(t-1,t+1)))var i=/\s/;else var i=this.nonTokenRe;var s=t;if(s>0){do s--;while(s>=0&&n.charAt(s).match(i));s++}var o=t;while(o<n.length&&n.charAt(o).match(i))o++;return new l(e,s,e,o)},this.getAWordRange=function(e,t){var n=this.getWordRange(e,t),r=this.getLine(n.end.row);while(r.charAt(n.end.column).match(/[ \t]/))n.end.column+=1;return n},this.setNewLineMode=function(e){this.doc.setNewLineMode(e)},this.getNewLineMode=function(){return this.doc.getNewLineMode()},this.setUseWorker=function(e){this.setOption("useWorker",e)},this.getUseWorker=function(){return this.$useWorker},this.onReloadTokenizer=function(e){var t=e.data;this.bgTokenizer.start(t.first),this._signal("tokenizerUpdate",e)},this.$modes=o.$modes,this.$mode=null,this.$modeId=null,this.setMode=function(e,t){if(e&&typeof e=="object"){if(e.getTokenizer)return this.$onChangeMode(e);var n=e,r=n.path}else r=e||"ace/mode/text";this.$modes["ace/mode/text"]||(this.$modes["ace/mode/text"]=new f);if(this.$modes[r]&&!n){this.$onChangeMode(this.$modes[r]),t&&t();return}this.$modeId=r,o.loadModule(["mode",r],function(e){if(this.$modeId!==r)return t&&t();this.$modes[r]&&!n?this.$onChangeMode(this.$modes[r]):e&&e.Mode&&(e=new e.Mode(n),n||(this.$modes[r]=e,e.$id=r),this.$onChangeMode(e)),t&&t()}.bind(this)),this.$mode||this.$onChangeMode(this.$modes["ace/mode/text"],!0)},this.$onChangeMode=function(e,t){t||(this.$modeId=e.$id);if(this.$mode===e)return;this.$mode=e,this.$stopWorker(),this.$useWorker&&this.$startWorker();var n=e.getTokenizer();if(n.addEventListener!==undefined){var r=this.onReloadTokenizer.bind(this);n.addEventListener("update",r)}if(!this.bgTokenizer){this.bgTokenizer=new h(n);var i=this;this.bgTokenizer.addEventListener("update",function(e){i._signal("tokenizerUpdate",e)})}else this.bgTokenizer.setTokenizer(n);this.bgTokenizer.setDocument(this.getDocument()),this.tokenRe=e.tokenRe,this.nonTokenRe=e.nonTokenRe,t||(e.attachToSession&&e.attachToSession(this),this.$options.wrapMethod.set.call(this,this.$wrapMethod),this.$setFolding(e.foldingRules),this.bgTokenizer.start(0),this._emit("changeMode"))},this.$stopWorker=function(){this.$worker&&(this.$worker.terminate(),this.$worker=null)},this.$startWorker=function(){try{this.$worker=this.$mode.createWorker(this)}catch(e){o.warn("Could not load worker",e),this.$worker=null}},this.getMode=function(){return this.$mode},this.$scrollTop=0,this.setScrollTop=function(e){if(this.$scrollTop===e||isNaN(e))return;this.$scrollTop=e,this._signal("changeScrollTop",e)},this.getScrollTop=function(){return this.$scrollTop},this.$scrollLeft=0,this.setScrollLeft=function(e){if(this.$scrollLeft===e||isNaN(e))return;this.$scrollLeft=e,this._signal("changeScrollLeft",e)},this.getScrollLeft=function(){return this.$scrollLeft},this.getScreenWidth=function(){return this.$computeWidth(),this.lineWidgets?Math.max(this.getLineWidgetMaxWidth(),this.screenWidth):this.screenWidth},this.getLineWidgetMaxWidth=function(){if(this.lineWidgetsWidth!=null)return this.lineWidgetsWidth;var e=0;return this.lineWidgets.forEach(function(t){t&&t.screenWidth>e&&(e=t.screenWidth)}),this.lineWidgetWidth=e},this.$computeWidth=function(e){if(this.$modified||e){this.$modified=!1;if(this.$useWrapMode)return this.screenWidth=this.$wrapLimit;var t=this.doc.getAllLines(),n=this.$rowLengthCache,r=0,i=0,s=this.$foldData[i],o=s?s.start.row:Infinity,u=t.length;for(var a=0;a<u;a++){if(a>o){a=s.end.row+1;if(a>=u)break;s=this.$foldData[i++],o=s?s.start.row:Infinity}n[a]==null&&(n[a]=this.$getStringScreenWidth(t[a])[0]),n[a]>r&&(r=n[a])}this.screenWidth=r}},this.getLine=function(e){return this.doc.getLine(e)},this.getLines=function(e,t){return this.doc.getLines(e,t)},this.getLength=function(){return this.doc.getLength()},this.getTextRange=function(e){return this.doc.getTextRange(e||this.selection.getRange())},this.insert=function(e,t){return this.doc.insert(e,t)},this.remove=function(e){return this.doc.remove(e)},this.removeFullLines=function(e,t){return this.doc.removeFullLines(e,t)},this.undoChanges=function(e,t){if(!e.length)return;this.$fromUndo=!0;for(var n=e.length-1;n!=-1;n--){var r=e[n];r.action=="insert"||r.action=="remove"?this.doc.revertDelta(r):r.folds&&this.addFolds(r.folds)}!t&&this.$undoSelect&&(e.selectionBefore?this.selection.fromJSON(e.selectionBefore):this.selection.setRange(this.$getUndoSelection(e,!0))),this.$fromUndo=!1},this.redoChanges=function(e,t){if(!e.length)return;this.$fromUndo=!0;for(var n=0;n<e.length;n++){var r=e[n];(r.action=="insert"||r.action=="remove")&&this.doc.applyDelta(r)}!t&&this.$undoSelect&&(e.selectionAfter?this.selection.fromJSON(e.selectionAfter):this.selection.setRange(this.$getUndoSelection(e,!1))),this.$fromUndo=!1},this.setUndoSelect=function(e){this.$undoSelect=e},this.$getUndoSelection=function(e,t){function n(e){return t?e.action!=="insert":e.action==="insert"}var r,i,s;for(var o=0;o<e.length;o++){var u=e[o];if(!u.start)continue;if(!r){n(u)?(r=l.fromPoints(u.start,u.end),s=!0):(r=l.fromPoints(u.start,u.start),s=!1);continue}n(u)?(i=u.start,r.compare(i.row,i.column)==-1&&r.setStart(i),i=u.end,r.compare(i.row,i.column)==1&&r.setEnd(i),s=!0):(i=u.start,r.compare(i.row,i.column)==-1&&(r=l.fromPoints(u.start,u.start)),s=!1)}return r},this.replace=function(e,t){return this.doc.replace(e,t)},this.moveText=function(e,t,n){var r=this.getTextRange(e),i=this.getFoldsInRange(e),s=l.fromPoints(t,t);if(!n){this.remove(e);var o=e.start.row-e.end.row,u=o?-e.end.column:e.start.column-e.end.column;u&&(s.start.row==e.end.row&&s.start.column>e.end.column&&(s.start.column+=u),s.end.row==e.end.row&&s.end.column>e.end.column&&(s.end.column+=u)),o&&s.start.row>=e.end.row&&(s.start.row+=o,s.end.row+=o)}s.end=this.insert(s.start,r);if(i.length){var a=e.start,f=s.start,o=f.row-a.row,u=f.column-a.column;this.addFolds(i.map(function(e){return e=e.clone(),e.start.row==a.row&&(e.start.column+=u),e.end.row==a.row&&(e.end.column+=u),e.start.row+=o,e.end.row+=o,e}))}return s},this.indentRows=function(e,t,n){n=n.replace(/\t/g,this.getTabString());for(var r=e;r<=t;r++)this.doc.insertInLine({row:r,column:0},n)},this.outdentRows=function(e){var t=e.collapseRows(),n=new l(0,0,0,0),r=this.getTabSize();for(var i=t.start.row;i<=t.end.row;++i){var s=this.getLine(i);n.start.row=i,n.end.row=i;for(var o=0;o<r;++o)if(s.charAt(o)!=" ")break;o<r&&s.charAt(o)=="	"?(n.start.column=o,n.end.column=o+1):(n.start.column=0,n.end.column=o),this.remove(n)}},this.$moveLines=function(e,t,n){e=this.getRowFoldStart(e),t=this.getRowFoldEnd(t);if(n<0){var r=this.getRowFoldStart(e+n);if(r<0)return 0;var i=r-e}else if(n>0){var r=this.getRowFoldEnd(t+n);if(r>this.doc.getLength()-1)return 0;var i=r-t}else{e=this.$clipRowToDocument(e),t=this.$clipRowToDocument(t);var i=t-e+1}var s=new l(e,0,t,Number.MAX_VALUE),o=this.getFoldsInRange(s).map(function(e){return e=e.clone(),e.start.row+=i,e.end.row+=i,e}),u=n==0?this.doc.getLines(e,t):this.doc.removeFullLines(e,t);return this.doc.insertFullLines(e+i,u),o.length&&this.addFolds(o),i},this.moveLinesUp=function(e,t){return this.$moveLines(e,t,-1)},this.moveLinesDown=function(e,t){return this.$moveLines(e,t,1)},this.duplicateLines=function(e,t){return this.$moveLines(e,t,0)},this.$clipRowToDocument=function(e){return Math.max(0,Math.min(e,this.doc.getLength()-1))},this.$clipColumnToRow=function(e,t){return t<0?0:Math.min(this.doc.getLine(e).length,t)},this.$clipPositionToDocument=function(e,t){t=Math.max(0,t);if(e<0)e=0,t=0;else{var n=this.doc.getLength();e>=n?(e=n-1,t=this.doc.getLine(n-1).length):t=Math.min(this.doc.getLine(e).length,t)}return{row:e,column:t}},this.$clipRangeToDocument=function(e){e.start.row<0?(e.start.row=0,e.start.column=0):e.start.column=this.$clipColumnToRow(e.start.row,e.start.column);var t=this.doc.getLength()-1;return e.end.row>t?(e.end.row=t,e.end.column=this.doc.getLine(t).length):e.end.column=this.$clipColumnToRow(e.end.row,e.end.column),e},this.$wrapLimit=80,this.$useWrapMode=!1,this.$wrapLimitRange={min:null,max:null},this.setUseWrapMode=function(e){if(e!=this.$useWrapMode){this.$useWrapMode=e,this.$modified=!0,this.$resetRowCache(0);if(e){var t=this.getLength();this.$wrapData=Array(t),this.$updateWrapData(0,t-1)}this._signal("changeWrapMode")}},this.getUseWrapMode=function(){return this.$useWrapMode},this.setWrapLimitRange=function(e,t){if(this.$wrapLimitRange.min!==e||this.$wrapLimitRange.max!==t)this.$wrapLimitRange={min:e,max:t},this.$modified=!0,this.$bidiHandler.markAsDirty(),this.$useWrapMode&&this._signal("changeWrapMode")},this.adjustWrapLimit=function(e,t){var n=this.$wrapLimitRange;n.max<0&&(n={min:t,max:t});var r=this.$constrainWrapLimit(e,n.min,n.max);return r!=this.$wrapLimit&&r>1?(this.$wrapLimit=r,this.$modified=!0,this.$useWrapMode&&(this.$updateWrapData(0,this.getLength()-1),this.$resetRowCache(0),this._signal("changeWrapLimit")),!0):!1},this.$constrainWrapLimit=function(e,t,n){return t&&(e=Math.max(t,e)),n&&(e=Math.min(n,e)),e},this.getWrapLimit=function(){return this.$wrapLimit},this.setWrapLimit=function(e){this.setWrapLimitRange(e,e)},this.getWrapLimitRange=function(){return{min:this.$wrapLimitRange.min,max:this.$wrapLimitRange.max}},this.$updateInternalDataOnChange=function(e){var t=this.$useWrapMode,n=e.action,r=e.start,i=e.end,s=r.row,o=i.row,u=o-s,a=null;this.$updating=!0;if(u!=0)if(n==="remove"){this[t?"$wrapData":"$rowLengthCache"].splice(s,u);var f=this.$foldData;a=this.getFoldsInRange(e),this.removeFolds(a);var l=this.getFoldLine(i.row),c=0;if(l){l.addRemoveChars(i.row,i.column,r.column-i.column),l.shiftRow(-u);var h=this.getFoldLine(s);h&&h!==l&&(h.merge(l),l=h),c=f.indexOf(l)+1}for(c;c<f.length;c++){var l=f[c];l.start.row>=i.row&&l.shiftRow(-u)}o=s}else{var p=Array(u);p.unshift(s,0);var d=t?this.$wrapData:this.$rowLengthCache;d.splice.apply(d,p);var f=this.$foldData,l=this.getFoldLine(s),c=0;if(l){var v=l.range.compareInside(r.row,r.column);v==0?(l=l.split(r.row,r.column),l&&(l.shiftRow(u),l.addRemoveChars(o,0,i.column-r.column))):v==-1&&(l.addRemoveChars(s,0,i.column-r.column),l.shiftRow(u)),c=f.indexOf(l)+1}for(c;c<f.length;c++){var l=f[c];l.start.row>=s&&l.shiftRow(u)}}else{u=Math.abs(e.start.column-e.end.column),n==="remove"&&(a=this.getFoldsInRange(e),this.removeFolds(a),u=-u);var l=this.getFoldLine(s);l&&l.addRemoveChars(s,r.column,u)}return t&&this.$wrapData.length!=this.doc.getLength()&&console.error("doc.getLength() and $wrapData.length have to be the same!"),this.$updating=!1,t?this.$updateWrapData(s,o):this.$updateRowLengthCache(s,o),a},this.$updateRowLengthCache=function(e,t,n){this.$rowLengthCache[e]=null,this.$rowLengthCache[t]=null},this.$updateWrapData=function(e,t){var r=this.doc.getAllLines(),i=this.getTabSize(),o=this.$wrapData,u=this.$wrapLimit,a,f,l=e;t=Math.min(t,r.length-1);while(l<=t)f=this.getFoldLine(l,f),f?(a=[],f.walk(function(e,t,i,o){var u;if(e!=null){u=this.$getDisplayTokens(e,a.length),u[0]=n;for(var f=1;f<u.length;f++)u[f]=s}else u=this.$getDisplayTokens(r[t].substring(o,i),a.length);a=a.concat(u)}.bind(this),f.end.row,r[f.end.row].length+1),o[f.start.row]=this.$computeWrapSplits(a,u,i),l=f.end.row+1):(a=this.$getDisplayTokens(r[l]),o[l]=this.$computeWrapSplits(a,u,i),l++)};var e=1,t=2,n=3,s=4,a=9,c=10,d=11,v=12;this.$computeWrapSplits=function(e,r,i){function g(){var t=0;if(m===0)return t;if(p)for(var n=0;n<e.length;n++){var r=e[n];if(r==c)t+=1;else{if(r!=d){if(r==v)continue;break}t+=i}}return h&&p!==!1&&(t+=i),Math.min(t,m)}function y(t){var n=t-f;for(var r=f;r<t;r++){var i=e[r];if(i===12||i===2)n-=1}o.length||(b=g(),o.indent=b),l+=n,o.push(l),f=t}if(e.length==0)return[];var o=[],u=e.length,f=0,l=0,h=this.$wrapAsCode,p=this.$indentedSoftWrap,m=r<=Math.max(2*i,8)||p===!1?0:Math.floor(r/2),b=0;while(u-f>r-b){var w=f+r-b;if(e[w-1]>=c&&e[w]>=c){y(w);continue}if(e[w]==n||e[w]==s){for(w;w!=f-1;w--)if(e[w]==n)break;if(w>f){y(w);continue}w=f+r;for(w;w<e.length;w++)if(e[w]!=s)break;if(w==e.length)break;y(w);continue}var E=Math.max(w-(r-(r>>2)),f-1);while(w>E&&e[w]<n)w--;if(h){while(w>E&&e[w]<n)w--;while(w>E&&e[w]==a)w--}else while(w>E&&e[w]<c)w--;if(w>E){y(++w);continue}w=f+r,e[w]==t&&w--,y(w-b)}return o},this.$getDisplayTokens=function(n,r){var i=[],s;r=r||0;for(var o=0;o<n.length;o++){var u=n.charCodeAt(o);if(u==9){s=this.getScreenTabSize(i.length+r),i.push(d);for(var f=1;f<s;f++)i.push(v)}else u==32?i.push(c):u>39&&u<48||u>57&&u<64?i.push(a):u>=4352&&m(u)?i.push(e,t):i.push(e)}return i},this.$getStringScreenWidth=function(e,t,n){if(t==0)return[0,0];t==null&&(t=Infinity),n=n||0;var r,i;for(i=0;i<e.length;i++){r=e.charCodeAt(i),r==9?n+=this.getScreenTabSize(n):r>=4352&&m(r)?n+=2:n+=1;if(n>t)break}return[n,i]},this.lineWidgets=null,this.getRowLength=function(e){var t=1;return this.lineWidgets&&(t+=this.lineWidgets[e]&&this.lineWidgets[e].rowCount||0),!this.$useWrapMode||!this.$wrapData[e]?t:this.$wrapData[e].length+t},this.getRowLineCount=function(e){return!this.$useWrapMode||!this.$wrapData[e]?1:this.$wrapData[e].length+1},this.getRowWrapIndent=function(e){if(this.$useWrapMode){var t=this.screenToDocumentPosition(e,Number.MAX_VALUE),n=this.$wrapData[t.row];return n.length&&n[0]<t.column?n.indent:0}return 0},this.getScreenLastRowColumn=function(e){var t=this.screenToDocumentPosition(e,Number.MAX_VALUE);return this.documentToScreenColumn(t.row,t.column)},this.getDocumentLastRowColumn=function(e,t){var n=this.documentToScreenRow(e,t);return this.getScreenLastRowColumn(n)},this.getDocumentLastRowColumnPosition=function(e,t){var n=this.documentToScreenRow(e,t);return this.screenToDocumentPosition(n,Number.MAX_VALUE/10)},this.getRowSplitData=function(e){return this.$useWrapMode?this.$wrapData[e]:undefined},this.getScreenTabSize=function(e){return this.$tabSize-(e%this.$tabSize|0)},this.screenToDocumentRow=function(e,t){return this.screenToDocumentPosition(e,t).row},this.screenToDocumentColumn=function(e,t){return this.screenToDocumentPosition(e,t).column},this.screenToDocumentPosition=function(e,t,n){if(e<0)return{row:0,column:0};var r,i=0,s=0,o,u=0,a=0,f=this.$screenRowCache,l=this.$getRowCacheIndex(f,e),c=f.length;if(c&&l>=0)var u=f[l],i=this.$docRowCache[l],h=e>f[c-1];else var h=!c;var p=this.getLength()-1,d=this.getNextFoldLine(i),v=d?d.start.row:Infinity;while(u<=e){a=this.getRowLength(i);if(u+a>e||i>=p)break;u+=a,i++,i>v&&(i=d.end.row+1,d=this.getNextFoldLine(i,d),v=d?d.start.row:Infinity),h&&(this.$docRowCache.push(i),this.$screenRowCache.push(u))}if(d&&d.start.row<=i)r=this.getFoldDisplayLine(d),i=d.start.row;else{if(u+a<=e||i>p)return{row:p,column:this.getLine(p).length};r=this.getLine(i),d=null}var m=0,g=Math.floor(e-u);if(this.$useWrapMode){var y=this.$wrapData[i];y&&(o=y[g],g>0&&y.length&&(m=y.indent,s=y[g-1]||y[y.length-1],r=r.substring(s)))}return n!==undefined&&this.$bidiHandler.isBidiRow(u+g,i,g)&&(t=this.$bidiHandler.offsetToCol(n)),s+=this.$getStringScreenWidth(r,t-m)[1],this.$useWrapMode&&s>=o&&(s=o-1),d?d.idxToPosition(s):{row:i,column:s}},this.documentToScreenPosition=function(e,t){if(typeof t=="undefined")var n=this.$clipPositionToDocument(e.row,e.column);else n=this.$clipPositionToDocument(e,t);e=n.row,t=n.column;var r=0,i=null,s=null;s=this.getFoldAt(e,t,1),s&&(e=s.start.row,t=s.start.column);var o,u=0,a=this.$docRowCache,f=this.$getRowCacheIndex(a,e),l=a.length;if(l&&f>=0)var u=a[f],r=this.$screenRowCache[f],c=e>a[l-1];else var c=!l;var h=this.getNextFoldLine(u),p=h?h.start.row:Infinity;while(u<e){if(u>=p){o=h.end.row+1;if(o>e)break;h=this.getNextFoldLine(o,h),p=h?h.start.row:Infinity}else o=u+1;r+=this.getRowLength(u),u=o,c&&(this.$docRowCache.push(u),this.$screenRowCache.push(r))}var d="";h&&u>=p?(d=this.getFoldDisplayLine(h,e,t),i=h.start.row):(d=this.getLine(e).substring(0,t),i=e);var v=0;if(this.$useWrapMode){var m=this.$wrapData[i];if(m){var g=0;while(d.length>=m[g])r++,g++;d=d.substring(m[g-1]||0,d.length),v=g>0?m.indent:0}}return this.lineWidgets&&this.lineWidgets[u]&&this.lineWidgets[u].rowsAbove&&(r+=this.lineWidgets[u].rowsAbove),{row:r,column:v+this.$getStringScreenWidth(d)[0]}},this.documentToScreenColumn=function(e,t){return this.documentToScreenPosition(e,t).column},this.documentToScreenRow=function(e,t){return this.documentToScreenPosition(e,t).row},this.getScreenLength=function(){var e=0,t=null;if(!this.$useWrapMode){e=this.getLength();var n=this.$foldData;for(var r=0;r<n.length;r++)t=n[r],e-=t.end.row-t.start.row}else{var i=this.$wrapData.length,s=0,r=0,t=this.$foldData[r++],o=t?t.start.row:Infinity;while(s<i){var u=this.$wrapData[s];e+=u?u.length+1:1,s++,s>o&&(s=t.end.row+1,t=this.$foldData[r++],o=t?t.start.row:Infinity)}}return this.lineWidgets&&(e+=this.$getWidgetScreenLength()),e},this.$setFontMetrics=function(e){if(!this.$enableVarChar)return;this.$getStringScreenWidth=function(t,n,r){if(n===0)return[0,0];n||(n=Infinity),r=r||0;var i,s;for(s=0;s<t.length;s++){i=t.charAt(s),i==="	"?r+=this.getScreenTabSize(r):r+=e.getCharacterWidth(i);if(r>n)break}return[r,s]}},this.destroy=function(){this.bgTokenizer&&(this.bgTokenizer.setDocument(null),this.bgTokenizer=null),this.$stopWorker()},this.isFullWidth=m}.call(d.prototype),e("./edit_session/folding").Folding.call(d.prototype),e("./edit_session/bracket_match").BracketMatch.call(d.prototype),o.defineOptions(d.prototype,"session",{wrap:{set:function(e){!e||e=="off"?e=!1:e=="free"?e=!0:e=="printMargin"?e=-1:typeof e=="string"&&(e=parseInt(e,10)||!1);if(this.$wrap==e)return;this.$wrap=e;if(!e)this.setUseWrapMode(!1);else{var t=typeof e=="number"?e:null;this.setWrapLimitRange(t,t),this.setUseWrapMode(!0)}},get:function(){return this.getUseWrapMode()?this.$wrap==-1?"printMargin":this.getWrapLimitRange().min?this.$wrap:"free":"off"},handlesSet:!0},wrapMethod:{set:function(e){e=e=="auto"?this.$mode.type!="text":e!="text",e!=this.$wrapAsCode&&(this.$wrapAsCode=e,this.$useWrapMode&&(this.$useWrapMode=!1,this.setUseWrapMode(!0)))},initialValue:"auto"},indentedSoftWrap:{set:function(){this.$useWrapMode&&(this.$useWrapMode=!1,this.setUseWrapMode(!0))},initialValue:!0},firstLineNumber:{set:function(){this._signal("changeBreakpoint")},initialValue:1},useWorker:{set:function(e){this.$useWorker=e,this.$stopWorker(),e&&this.$startWorker()},initialValue:!0},useSoftTabs:{initialValue:!0},tabSize:{set:function(e){e=parseInt(e),e>0&&this.$tabSize!==e&&(this.$modified=!0,this.$rowLengthCache=[],this.$tabSize=e,this._signal("changeTabSize"))},initialValue:4,handlesSet:!0},navigateWithinSoftTabs:{initialValue:!1},foldStyle:{set:function(e){this.setFoldStyle(e)},handlesSet:!0},overwrite:{set:function(e){this._signal("changeOverwrite")},initialValue:!1},newLineMode:{set:function(e){this.doc.setNewLineMode(e)},get:function(){return this.doc.getNewLineMode()},handlesSet:!0},mode:{set:function(e){this.setMode(e)},get:function(){return this.$modeId},handlesSet:!0}}),t.EditSession=d}),define("ace/search",["require","exports","module","ace/lib/lang","ace/lib/oop","ace/range"],function(e,t,n){"use strict";function u(e,t){function n(e){return/\w/.test(e)||t.regExp?"\\b":""}return n(e[0])+e+n(e[e.length-1])}var r=e("./lib/lang"),i=e("./lib/oop"),s=e("./range").Range,o=function(){this.$options={}};(function(){this.set=function(e){return i.mixin(this.$options,e),this},this.getOptions=function(){return r.copyObject(this.$options)},this.setOptions=function(e){this.$options=e},this.find=function(e){var t=this.$options,n=this.$matchIterator(e,t);if(!n)return!1;var r=null;return n.forEach(function(e,n,i,o){return r=new s(e,n,i,o),n==o&&t.start&&t.start.start&&t.skipCurrent!=0&&r.isEqual(t.start)?(r=null,!1):!0}),r},this.findAll=function(e){var t=this.$options;if(!t.needle)return[];this.$assembleRegExp(t);var n=t.range,i=n?e.getLines(n.start.row,n.end.row):e.doc.getAllLines(),o=[],u=t.re;if(t.$isMultiLine){var a=u.length,f=i.length-a,l;e:for(var c=u.offset||0;c<=f;c++){for(var h=0;h<a;h++)if(i[c+h].search(u[h])==-1)continue e;var p=i[c],d=i[c+a-1],v=p.length-p.match(u[0])[0].length,m=d.match(u[a-1])[0].length;if(l&&l.end.row===c&&l.end.column>v)continue;o.push(l=new s(c,v,c+a-1,m)),a>2&&(c=c+a-2)}}else for(var g=0;g<i.length;g++){var y=r.getMatchOffsets(i[g],u);for(var h=0;h<y.length;h++){var b=y[h];o.push(new s(g,b.offset,g,b.offset+b.length))}}if(n){var w=n.start.column,E=n.start.column,g=0,h=o.length-1;while(g<h&&o[g].start.column<w&&o[g].start.row==n.start.row)g++;while(g<h&&o[h].end.column>E&&o[h].end.row==n.end.row)h--;o=o.slice(g,h+1);for(g=0,h=o.length;g<h;g++)o[g].start.row+=n.start.row,o[g].end.row+=n.start.row}return o},this.replace=function(e,t){var n=this.$options,r=this.$assembleRegExp(n);if(n.$isMultiLine)return t;if(!r)return;var i=r.exec(e);if(!i||i[0].length!=e.length)return null;t=e.replace(r,t);if(n.preserveCase){t=t.split("");for(var s=Math.min(e.length,e.length);s--;){var o=e[s];o&&o.toLowerCase()!=o?t[s]=t[s].toUpperCase():t[s]=t[s].toLowerCase()}t=t.join("")}return t},this.$assembleRegExp=function(e,t){if(e.needle instanceof RegExp)return e.re=e.needle;var n=e.needle;if(!e.needle)return e.re=!1;e.regExp||(n=r.escapeRegExp(n)),e.wholeWord&&(n=u(n,e));var i=e.caseSensitive?"gm":"gmi";e.$isMultiLine=!t&&/[\n\r]/.test(n);if(e.$isMultiLine)return e.re=this.$assembleMultilineRegExp(n,i);try{var s=new RegExp(n,i)}catch(o){s=!1}return e.re=s},this.$assembleMultilineRegExp=function(e,t){var n=e.replace(/\r\n|\r|\n/g,"$\n^").split("\n"),r=[];for(var i=0;i<n.length;i++)try{r.push(new RegExp(n[i],t))}catch(s){return!1}return r},this.$matchIterator=function(e,t){var n=this.$assembleRegExp(t);if(!n)return!1;var r=t.backwards==1,i=t.skipCurrent!=0,s=t.range,o=t.start;o||(o=s?s[r?"end":"start"]:e.selection.getRange()),o.start&&(o=o[i!=r?"end":"start"]);var u=s?s.start.row:0,a=s?s.end.row:e.getLength()-1;if(r)var f=function(e){var n=o.row;if(c(n,o.column,e))return;for(n--;n>=u;n--)if(c(n,Number.MAX_VALUE,e))return;if(t.wrap==0)return;for(n=a,u=o.row;n>=u;n--)if(c(n,Number.MAX_VALUE,e))return};else var f=function(e){var n=o.row;if(c(n,o.column,e))return;for(n+=1;n<=a;n++)if(c(n,0,e))return;if(t.wrap==0)return;for(n=u,a=o.row;n<=a;n++)if(c(n,0,e))return};if(t.$isMultiLine)var l=n.length,c=function(t,i,s){var o=r?t-l+1:t;if(o<0)return;var u=e.getLine(o),a=u.search(n[0]);if(!r&&a<i||a===-1)return;for(var f=1;f<l;f++){u=e.getLine(o+f);if(u.search(n[f])==-1)return}var c=u.match(n[l-1])[0].length;if(r&&c>i)return;if(s(o,a,o+l-1,c))return!0};else if(r)var c=function(t,r,i){var s=e.getLine(t),o=[],u,a=0;n.lastIndex=0;while(u=n.exec(s)){var f=u[0].length;a=u.index;if(!f){if(a>=s.length)break;n.lastIndex=a+=1}if(u.index+f>r)break;o.push(u.index,f)}for(var l=o.length-1;l>=0;l-=2){var c=o[l-1],f=o[l];if(i(t,c,t,c+f))return!0}};else var c=function(t,r,i){var s=e.getLine(t),o,u;n.lastIndex=r;while(u=n.exec(s)){var a=u[0].length;o=u.index;if(i(t,o,t,o+a))return!0;if(!a){n.lastIndex=o+=1;if(o>=s.length)return!1}}};return{forEach:f}}}).call(o.prototype),t.Search=o}),define("ace/keyboard/hash_handler",["require","exports","module","ace/lib/keys","ace/lib/useragent"],function(e,t,n){"use strict";function o(e,t){this.platform=t||(i.isMac?"mac":"win"),this.commands={},this.commandKeyBinding={},this.addCommands(e),this.$singleCommand=!0}function u(e,t){o.call(this,e,t),this.$singleCommand=!1}var r=e("../lib/keys"),i=e("../lib/useragent"),s=r.KEY_MODS;u.prototype=o.prototype,function(){function e(e){return typeof e=="object"&&e.bindKey&&e.bindKey.position||(e.isDefault?-100:0)}this.addCommand=function(e){this.commands[e.name]&&this.removeCommand(e),this.commands[e.name]=e,e.bindKey&&this._buildKeyHash(e)},this.removeCommand=function(e,t){var n=e&&(typeof e=="string"?e:e.name);e=this.commands[n],t||delete this.commands[n];var r=this.commandKeyBinding;for(var i in r){var s=r[i];if(s==e)delete r[i];else if(Array.isArray(s)){var o=s.indexOf(e);o!=-1&&(s.splice(o,1),s.length==1&&(r[i]=s[0]))}}},this.bindKey=function(e,t,n){typeof e=="object"&&e&&(n==undefined&&(n=e.position),e=e[this.platform]);if(!e)return;if(typeof t=="function")return this.addCommand({exec:t,bindKey:e,name:t.name||e});e.split("|").forEach(function(e){var r="";if(e.indexOf(" ")!=-1){var i=e.split(/\s+/);e=i.pop(),i.forEach(function(e){var t=this.parseKeys(e),n=s[t.hashId]+t.key;r+=(r?" ":"")+n,this._addCommandToBinding(r,"chainKeys")},this),r+=" "}var o=this.parseKeys(e),u=s[o.hashId]+o.key;this._addCommandToBinding(r+u,t,n)},this)},this._addCommandToBinding=function(t,n,r){var i=this.commandKeyBinding,s;if(!n)delete i[t];else if(!i[t]||this.$singleCommand)i[t]=n;else{Array.isArray(i[t])?(s=i[t].indexOf(n))!=-1&&i[t].splice(s,1):i[t]=[i[t]],typeof r!="number"&&(r=e(n));var o=i[t];for(s=0;s<o.length;s++){var u=o[s],a=e(u);if(a>r)break}o.splice(s,0,n)}},this.addCommands=function(e){e&&Object.keys(e).forEach(function(t){var n=e[t];if(!n)return;if(typeof n=="string")return this.bindKey(n,t);typeof n=="function"&&(n={exec:n});if(typeof n!="object")return;n.name||(n.name=t),this.addCommand(n)},this)},this.removeCommands=function(e){Object.keys(e).forEach(function(t){this.removeCommand(e[t])},this)},this.bindKeys=function(e){Object.keys(e).forEach(function(t){this.bindKey(t,e[t])},this)},this._buildKeyHash=function(e){this.bindKey(e.bindKey,e)},this.parseKeys=function(e){var t=e.toLowerCase().split(/[\-\+]([\-\+])?/).filter(function(e){return e}),n=t.pop(),i=r[n];if(r.FUNCTION_KEYS[i])n=r.FUNCTION_KEYS[i].toLowerCase();else{if(!t.length)return{key:n,hashId:-1};if(t.length==1&&t[0]=="shift")return{key:n.toUpperCase(),hashId:-1}}var s=0;for(var o=t.length;o--;){var u=r.KEY_MODS[t[o]];if(u==null)return typeof console!="undefined"&&console.error("invalid modifier "+t[o]+" in "+e),!1;s|=u}return{key:n,hashId:s}},this.findKeyCommand=function(t,n){var r=s[t]+n;return this.commandKeyBinding[r]},this.handleKeyboard=function(e,t,n,r){if(r<0)return;var i=s[t]+n,o=this.commandKeyBinding[i];e.$keyChain&&(e.$keyChain+=" "+i,o=this.commandKeyBinding[e.$keyChain]||o);if(o)if(o=="chainKeys"||o[o.length-1]=="chainKeys")return e.$keyChain=e.$keyChain||i,{command:"null"};if(e.$keyChain)if(!!t&&t!=4||n.length!=1){if(t==-1||r>0)e.$keyChain=""}else e.$keyChain=e.$keyChain.slice(0,-i.length-1);return{command:o}},this.getStatusText=function(e,t){return t.$keyChain||""}}.call(o.prototype),t.HashHandler=o,t.MultiHashHandler=u}),define("ace/commands/command_manager",["require","exports","module","ace/lib/oop","ace/keyboard/hash_handler","ace/lib/event_emitter"],function(e,t,n){"use strict";var r=e("../lib/oop"),i=e("../keyboard/hash_handler").MultiHashHandler,s=e("../lib/event_emitter").EventEmitter,o=function(e,t){i.call(this,t,e),this.byName=this.commands,this.setDefaultHandler("exec",function(e){return e.command.exec(e.editor,e.args||{})})};r.inherits(o,i),function(){r.implement(this,s),this.exec=function(e,t,n){if(Array.isArray(e)){for(var r=e.length;r--;)if(this.exec(e[r],t,n))return!0;return!1}typeof e=="string"&&(e=this.commands[e]);if(!e)return!1;if(t&&t.$readOnly&&!e.readOnly)return!1;if(this.$checkCommandState!=0&&e.isAvailable&&!e.isAvailable(t))return!1;var i={editor:t,command:e,args:n};return i.returnValue=this._emit("exec",i),this._signal("afterExec",i),i.returnValue===!1?!1:!0},this.toggleRecording=function(e){if(this.$inReplay)return;return e&&e._emit("changeStatus"),this.recording?(this.macro.pop(),this.removeEventListener("exec",this.$addCommandToMacro),this.macro.length||(this.macro=this.oldMacro),this.recording=!1):(this.$addCommandToMacro||(this.$addCommandToMacro=function(e){this.macro.push([e.command,e.args])}.bind(this)),this.oldMacro=this.macro,this.macro=[],this.on("exec",this.$addCommandToMacro),this.recording=!0)},this.replay=function(e){if(this.$inReplay||!this.macro)return;if(this.recording)return this.toggleRecording(e);try{this.$inReplay=!0,this.macro.forEach(function(t){typeof t=="string"?this.exec(t,e):this.exec(t[0],e,t[1])},this)}finally{this.$inReplay=!1}},this.trimMacro=function(e){return e.map(function(e){return typeof e[0]!="string"&&(e[0]=e[0].name),e[1]||(e=e[0]),e})}}.call(o.prototype),t.CommandManager=o}),define("ace/commands/default_commands",["require","exports","module","ace/lib/lang","ace/config","ace/range"],function(e,t,n){"use strict";function o(e,t){return{win:e,mac:t}}var r=e("../lib/lang"),i=e("../config"),s=e("../range").Range;t.commands=[{name:"showSettingsMenu",bindKey:o("Ctrl-,","Command-,"),exec:function(e){i.loadModule("ace/ext/settings_menu",function(t){t.init(e),e.showSettingsMenu()})},readOnly:!0},{name:"goToNextError",bindKey:o("Alt-E","F4"),exec:function(e){i.loadModule("./ext/error_marker",function(t){t.showErrorMarker(e,1)})},scrollIntoView:"animate",readOnly:!0},{name:"goToPreviousError",bindKey:o("Alt-Shift-E","Shift-F4"),exec:function(e){i.loadModule("./ext/error_marker",function(t){t.showErrorMarker(e,-1)})},scrollIntoView:"animate",readOnly:!0},{name:"selectall",description:"Select all",bindKey:o("Ctrl-A","Command-A"),exec:function(e){e.selectAll()},readOnly:!0},{name:"centerselection",description:"Center selection",bindKey:o(null,"Ctrl-L"),exec:function(e){e.centerSelection()},readOnly:!0},{name:"gotoline",description:"Go to line...",bindKey:o("Ctrl-L","Command-L"),exec:function(e,t){typeof t=="number"&&!isNaN(t)&&e.gotoLine(t),e.prompt({$type:"gotoLine"})},readOnly:!0},{name:"fold",bindKey:o("Alt-L|Ctrl-F1","Command-Alt-L|Command-F1"),exec:function(e){e.session.toggleFold(!1)},multiSelectAction:"forEach",scrollIntoView:"center",readOnly:!0},{name:"unfold",bindKey:o("Alt-Shift-L|Ctrl-Shift-F1","Command-Alt-Shift-L|Command-Shift-F1"),exec:function(e){e.session.toggleFold(!0)},multiSelectAction:"forEach",scrollIntoView:"center",readOnly:!0},{name:"toggleFoldWidget",bindKey:o("F2","F2"),exec:function(e){e.session.toggleFoldWidget()},multiSelectAction:"forEach",scrollIntoView:"center",readOnly:!0},{name:"toggleParentFoldWidget",bindKey:o("Alt-F2","Alt-F2"),exec:function(e){e.session.toggleFoldWidget(!0)},multiSelectAction:"forEach",scrollIntoView:"center",readOnly:!0},{name:"foldall",description:"Fold all",bindKey:o(null,"Ctrl-Command-Option-0"),exec:function(e){e.session.foldAll()},scrollIntoView:"center",readOnly:!0},{name:"foldOther",description:"Fold other",bindKey:o("Alt-0","Command-Option-0"),exec:function(e){e.session.foldAll(),e.session.unfold(e.selection.getAllRanges())},scrollIntoView:"center",readOnly:!0},{name:"unfoldall",description:"Unfold all",bindKey:o("Alt-Shift-0","Command-Option-Shift-0"),exec:function(e){e.session.unfold()},scrollIntoView:"center",readOnly:!0},{name:"findnext",description:"Find next",bindKey:o("Ctrl-K","Command-G"),exec:function(e){e.findNext()},multiSelectAction:"forEach",scrollIntoView:"center",readOnly:!0},{name:"findprevious",description:"Find previous",bindKey:o("Ctrl-Shift-K","Command-Shift-G"),exec:function(e){e.findPrevious()},multiSelectAction:"forEach",scrollIntoView:"center",readOnly:!0},{name:"selectOrFindNext",description:"Select or find next",bindKey:o("Alt-K","Ctrl-G"),exec:function(e){e.selection.isEmpty()?e.selection.selectWord():e.findNext()},readOnly:!0},{name:"selectOrFindPrevious",description:"Select or find previous",bindKey:o("Alt-Shift-K","Ctrl-Shift-G"),exec:function(e){e.selection.isEmpty()?e.selection.selectWord():e.findPrevious()},readOnly:!0},{name:"find",description:"Find",bindKey:o("Ctrl-F","Command-F"),exec:function(e){i.loadModule("ace/ext/searchbox",function(t){t.Search(e)})},readOnly:!0},{name:"overwrite",description:"Overwrite",bindKey:"Insert",exec:function(e){e.toggleOverwrite()},readOnly:!0},{name:"selecttostart",description:"Select to start",bindKey:o("Ctrl-Shift-Home","Command-Shift-Home|Command-Shift-Up"),exec:function(e){e.getSelection().selectFileStart()},multiSelectAction:"forEach",readOnly:!0,scrollIntoView:"animate",aceCommandGroup:"fileJump"},{name:"gotostart",description:"Go to start",bindKey:o("Ctrl-Home","Command-Home|Command-Up"),exec:function(e){e.navigateFileStart()},multiSelectAction:"forEach",readOnly:!0,scrollIntoView:"animate",aceCommandGroup:"fileJump"},{name:"selectup",description:"Select up",bindKey:o("Shift-Up","Shift-Up|Ctrl-Shift-P"),exec:function(e){e.getSelection().selectUp()},multiSelectAction:"forEach",scrollIntoView:"cursor",readOnly:!0},{name:"golineup",description:"Go line up",bindKey:o("Up","Up|Ctrl-P"),exec:function(e,t){e.navigateUp(t.times)},multiSelectAction:"forEach",scrollIntoView:"cursor",readOnly:!0},{name:"selecttoend",description:"Select to end",bindKey:o("Ctrl-Shift-End","Command-Shift-End|Command-Shift-Down"),exec:function(e){e.getSelection().selectFileEnd()},multiSelectAction:"forEach",readOnly:!0,scrollIntoView:"animate",aceCommandGroup:"fileJump"},{name:"gotoend",description:"Go to end",bindKey:o("Ctrl-End","Command-End|Command-Down"),exec:function(e){e.navigateFileEnd()},multiSelectAction:"forEach",readOnly:!0,scrollIntoView:"animate",aceCommandGroup:"fileJump"},{name:"selectdown",description:"Select down",bindKey:o("Shift-Down","Shift-Down|Ctrl-Shift-N"),exec:function(e){e.getSelection().selectDown()},multiSelectAction:"forEach",scrollIntoView:"cursor",readOnly:!0},{name:"golinedown",description:"Go line down",bindKey:o("Down","Down|Ctrl-N"),exec:function(e,t){e.navigateDown(t.times)},multiSelectAction:"forEach",scrollIntoView:"cursor",readOnly:!0},{name:"selectwordleft",description:"Select word left",bindKey:o("Ctrl-Shift-Left","Option-Shift-Left"),exec:function(e){e.getSelection().selectWordLeft()},multiSelectAction:"forEach",scrollIntoView:"cursor",readOnly:!0},{name:"gotowordleft",description:"Go to word left",bindKey:o("Ctrl-Left","Option-Left"),exec:function(e){e.navigateWordLeft()},multiSelectAction:"forEach",scrollIntoView:"cursor",readOnly:!0},{name:"selecttolinestart",description:"Select to line start",bindKey:o("Alt-Shift-Left","Command-Shift-Left|Ctrl-Shift-A"),exec:function(e){e.getSelection().selectLineStart()},multiSelectAction:"forEach",scrollIntoView:"cursor",readOnly:!0},{name:"gotolinestart",description:"Go to line start",bindKey:o("Alt-Left|Home","Command-Left|Home|Ctrl-A"),exec:function(e){e.navigateLineStart()},multiSelectAction:"forEach",scrollIntoView:"cursor",readOnly:!0},{name:"selectleft",description:"Select left",bindKey:o("Shift-Left","Shift-Left|Ctrl-Shift-B"),exec:function(e){e.getSelection().selectLeft()},multiSelectAction:"forEach",scrollIntoView:"cursor",readOnly:!0},{name:"gotoleft",description:"Go to left",bindKey:o("Left","Left|Ctrl-B"),exec:function(e,t){e.navigateLeft(t.times)},multiSelectAction:"forEach",scrollIntoView:"cursor",readOnly:!0},{name:"selectwordright",description:"Select word right",bindKey:o("Ctrl-Shift-Right","Option-Shift-Right"),exec:function(e){e.getSelection().selectWordRight()},multiSelectAction:"forEach",scrollIntoView:"cursor",readOnly:!0},{name:"gotowordright",description:"Go to word right",bindKey:o("Ctrl-Right","Option-Right"),exec:function(e){e.navigateWordRight()},multiSelectAction:"forEach",scrollIntoView:"cursor",readOnly:!0},{name:"selecttolineend",description:"Select to line end",bindKey:o("Alt-Shift-Right","Command-Shift-Right|Shift-End|Ctrl-Shift-E"),exec:function(e){e.getSelection().selectLineEnd()},multiSelectAction:"forEach",scrollIntoView:"cursor",readOnly:!0},{name:"gotolineend",description:"Go to line end",bindKey:o("Alt-Right|End","Command-Right|End|Ctrl-E"),exec:function(e){e.navigateLineEnd()},multiSelectAction:"forEach",scrollIntoView:"cursor",readOnly:!0},{name:"selectright",description:"Select right",bindKey:o("Shift-Right","Shift-Right"),exec:function(e){e.getSelection().selectRight()},multiSelectAction:"forEach",scrollIntoView:"cursor",readOnly:!0},{name:"gotoright",description:"Go to right",bindKey:o("Right","Right|Ctrl-F"),exec:function(e,t){e.navigateRight(t.times)},multiSelectAction:"forEach",scrollIntoView:"cursor",readOnly:!0},{name:"selectpagedown",description:"Select page down",bindKey:"Shift-PageDown",exec:function(e){e.selectPageDown()},readOnly:!0},{name:"pagedown",description:"Page down",bindKey:o(null,"Option-PageDown"),exec:function(e){e.scrollPageDown()},readOnly:!0},{name:"gotopagedown",description:"Go to page down",bindKey:o("PageDown","PageDown|Ctrl-V"),exec:function(e){e.gotoPageDown()},readOnly:!0},{name:"selectpageup",description:"Select page up",bindKey:"Shift-PageUp",exec:function(e){e.selectPageUp()},readOnly:!0},{name:"pageup",description:"Page up",bindKey:o(null,"Option-PageUp"),exec:function(e){e.scrollPageUp()},readOnly:!0},{name:"gotopageup",description:"Go to page up",bindKey:"PageUp",exec:function(e){e.gotoPageUp()},readOnly:!0},{name:"scrollup",description:"Scroll up",bindKey:o("Ctrl-Up",null),exec:function(e){e.renderer.scrollBy(0,-2*e.renderer.layerConfig.lineHeight)},readOnly:!0},{name:"scrolldown",description:"Scroll down",bindKey:o("Ctrl-Down",null),exec:function(e){e.renderer.scrollBy(0,2*e.renderer.layerConfig.lineHeight)},readOnly:!0},{name:"selectlinestart",description:"Select line start",bindKey:"Shift-Home",exec:function(e){e.getSelection().selectLineStart()},multiSelectAction:"forEach",scrollIntoView:"cursor",readOnly:!0},{name:"selectlineend",description:"Select line end",bindKey:"Shift-End",exec:function(e){e.getSelection().selectLineEnd()},multiSelectAction:"forEach",scrollIntoView:"cursor",readOnly:!0},{name:"togglerecording",description:"Toggle recording",bindKey:o("Ctrl-Alt-E","Command-Option-E"),exec:function(e){e.commands.toggleRecording(e)},readOnly:!0},{name:"replaymacro",description:"Replay macro",bindKey:o("Ctrl-Shift-E","Command-Shift-E"),exec:function(e){e.commands.replay(e)},readOnly:!0},{name:"jumptomatching",description:"Jump to matching",bindKey:o("Ctrl-\\|Ctrl-P","Command-\\"),exec:function(e){e.jumpToMatching()},multiSelectAction:"forEach",scrollIntoView:"animate",readOnly:!0},{name:"selecttomatching",description:"Select to matching",bindKey:o("Ctrl-Shift-\\|Ctrl-Shift-P","Command-Shift-\\"),exec:function(e){e.jumpToMatching(!0)},multiSelectAction:"forEach",scrollIntoView:"animate",readOnly:!0},{name:"expandToMatching",description:"Expand to matching",bindKey:o("Ctrl-Shift-M","Ctrl-Shift-M"),exec:function(e){e.jumpToMatching(!0,!0)},multiSelectAction:"forEach",scrollIntoView:"animate",readOnly:!0},{name:"passKeysToBrowser",description:"Pass keys to browser",bindKey:o(null,null),exec:function(){},passEvent:!0,readOnly:!0},{name:"copy",description:"Copy",exec:function(e){},readOnly:!0},{name:"cut",description:"Cut",exec:function(e){var t=e.$copyWithEmptySelection&&e.selection.isEmpty(),n=t?e.selection.getLineRange():e.selection.getRange();e._emit("cut",n),n.isEmpty()||e.session.remove(n),e.clearSelection()},scrollIntoView:"cursor",multiSelectAction:"forEach"},{name:"paste",description:"Paste",exec:function(e,t){e.$handlePaste(t)},scrollIntoView:"cursor"},{name:"removeline",description:"Remove line",bindKey:o("Ctrl-D","Command-D"),exec:function(e){e.removeLines()},scrollIntoView:"cursor",multiSelectAction:"forEachLine"},{name:"duplicateSelection",description:"Duplicate selection",bindKey:o("Ctrl-Shift-D","Command-Shift-D"),exec:function(e){e.duplicateSelection()},scrollIntoView:"cursor",multiSelectAction:"forEach"},{name:"sortlines",description:"Sort lines",bindKey:o("Ctrl-Alt-S","Command-Alt-S"),exec:function(e){e.sortLines()},scrollIntoView:"selection",multiSelectAction:"forEachLine"},{name:"togglecomment",description:"Toggle comment",bindKey:o("Ctrl-/","Command-/"),exec:function(e){e.toggleCommentLines()},multiSelectAction:"forEachLine",scrollIntoView:"selectionPart"},{name:"toggleBlockComment",description:"Toggle block comment",bindKey:o("Ctrl-Shift-/","Command-Shift-/"),exec:function(e){e.toggleBlockComment()},multiSelectAction:"forEach",scrollIntoView:"selectionPart"},{name:"modifyNumberUp",description:"Modify number up",bindKey:o("Ctrl-Shift-Up","Alt-Shift-Up"),exec:function(e){e.modifyNumber(1)},scrollIntoView:"cursor",multiSelectAction:"forEach"},{name:"modifyNumberDown",description:"Modify number down",bindKey:o("Ctrl-Shift-Down","Alt-Shift-Down"),exec:function(e){e.modifyNumber(-1)},scrollIntoView:"cursor",multiSelectAction:"forEach"},{name:"replace",description:"Replace",bindKey:o("Ctrl-H","Command-Option-F"),exec:function(e){i.loadModule("ace/ext/searchbox",function(t){t.Search(e,!0)})}},{name:"undo",description:"Undo",bindKey:o("Ctrl-Z","Command-Z"),exec:function(e){e.undo()}},{name:"redo",description:"Redo",bindKey:o("Ctrl-Shift-Z|Ctrl-Y","Command-Shift-Z|Command-Y"),exec:function(e){e.redo()}},{name:"copylinesup",description:"Copy lines up",bindKey:o("Alt-Shift-Up","Command-Option-Up"),exec:function(e){e.copyLinesUp()},scrollIntoView:"cursor"},{name:"movelinesup",description:"Move lines up",bindKey:o("Alt-Up","Option-Up"),exec:function(e){e.moveLinesUp()},scrollIntoView:"cursor"},{name:"copylinesdown",description:"Copy lines down",bindKey:o("Alt-Shift-Down","Command-Option-Down"),exec:function(e){e.copyLinesDown()},scrollIntoView:"cursor"},{name:"movelinesdown",description:"Move lines down",bindKey:o("Alt-Down","Option-Down"),exec:function(e){e.moveLinesDown()},scrollIntoView:"cursor"},{name:"del",description:"Delete",bindKey:o("Delete","Delete|Ctrl-D|Shift-Delete"),exec:function(e){e.remove("right")},multiSelectAction:"forEach",scrollIntoView:"cursor"},{name:"backspace",description:"Backspace",bindKey:o("Shift-Backspace|Backspace","Ctrl-Backspace|Shift-Backspace|Backspace|Ctrl-H"),exec:function(e){e.remove("left")},multiSelectAction:"forEach",scrollIntoView:"cursor"},{name:"cut_or_delete",description:"Cut or delete",bindKey:o("Shift-Delete",null),exec:function(e){if(!e.selection.isEmpty())return!1;e.remove("left")},multiSelectAction:"forEach",scrollIntoView:"cursor"},{name:"removetolinestart",description:"Remove to line start",bindKey:o("Alt-Backspace","Command-Backspace"),exec:function(e){e.removeToLineStart()},multiSelectAction:"forEach",scrollIntoView:"cursor"},{name:"removetolineend",description:"Remove to line end",bindKey:o("Alt-Delete","Ctrl-K|Command-Delete"),exec:function(e){e.removeToLineEnd()},multiSelectAction:"forEach",scrollIntoView:"cursor"},{name:"removetolinestarthard",description:"Remove to line start hard",bindKey:o("Ctrl-Shift-Backspace",null),exec:function(e){var t=e.selection.getRange();t.start.column=0,e.session.remove(t)},multiSelectAction:"forEach",scrollIntoView:"cursor"},{name:"removetolineendhard",description:"Remove to line end hard",bindKey:o("Ctrl-Shift-Delete",null),exec:function(e){var t=e.selection.getRange();t.end.column=Number.MAX_VALUE,e.session.remove(t)},multiSelectAction:"forEach",scrollIntoView:"cursor"},{name:"removewordleft",description:"Remove word left",bindKey:o("Ctrl-Backspace","Alt-Backspace|Ctrl-Alt-Backspace"),exec:function(e){e.removeWordLeft()},multiSelectAction:"forEach",scrollIntoView:"cursor"},{name:"removewordright",description:"Remove word right",bindKey:o("Ctrl-Delete","Alt-Delete"),exec:function(e){e.removeWordRight()},multiSelectAction:"forEach",scrollIntoView:"cursor"},{name:"outdent",description:"Outdent",bindKey:o("Shift-Tab","Shift-Tab"),exec:function(e){e.blockOutdent()},multiSelectAction:"forEach",scrollIntoView:"selectionPart"},{name:"indent",description:"Indent",bindKey:o("Tab","Tab"),exec:function(e){e.indent()},multiSelectAction:"forEach",scrollIntoView:"selectionPart"},{name:"blockoutdent",description:"Block outdent",bindKey:o("Ctrl-[","Ctrl-["),exec:function(e){e.blockOutdent()},multiSelectAction:"forEachLine",scrollIntoView:"selectionPart"},{name:"blockindent",description:"Block indent",bindKey:o("Ctrl-]","Ctrl-]"),exec:function(e){e.blockIndent()},multiSelectAction:"forEachLine",scrollIntoView:"selectionPart"},{name:"insertstring",description:"Insert string",exec:function(e,t){e.insert(t)},multiSelectAction:"forEach",scrollIntoView:"cursor"},{name:"inserttext",description:"Insert text",exec:function(e,t){e.insert(r.stringRepeat(t.text||"",t.times||1))},multiSelectAction:"forEach",scrollIntoView:"cursor"},{name:"splitline",description:"Split line",bindKey:o(null,"Ctrl-O"),exec:function(e){e.splitLine()},multiSelectAction:"forEach",scrollIntoView:"cursor"},{name:"transposeletters",description:"Transpose letters",bindKey:o("Alt-Shift-X","Ctrl-T"),exec:function(e){e.transposeLetters()},multiSelectAction:function(e){e.transposeSelections(1)},scrollIntoView:"cursor"},{name:"touppercase",description:"To uppercase",bindKey:o("Ctrl-U","Ctrl-U"),exec:function(e){e.toUpperCase()},multiSelectAction:"forEach",scrollIntoView:"cursor"},{name:"tolowercase",description:"To lowercase",bindKey:o("Ctrl-Shift-U","Ctrl-Shift-U"),exec:function(e){e.toLowerCase()},multiSelectAction:"forEach",scrollIntoView:"cursor"},{name:"expandtoline",description:"Expand to line",bindKey:o("Ctrl-Shift-L","Command-Shift-L"),exec:function(e){var t=e.selection.getRange();t.start.column=t.end.column=0,t.end.row++,e.selection.setRange(t,!1)},multiSelectAction:"forEach",scrollIntoView:"cursor",readOnly:!0},{name:"joinlines",description:"Join lines",bindKey:o(null,null),exec:function(e){var t=e.selection.isBackwards(),n=t?e.selection.getSelectionLead():e.selection.getSelectionAnchor(),i=t?e.selection.getSelectionAnchor():e.selection.getSelectionLead(),o=e.session.doc.getLine(n.row).length,u=e.session.doc.getTextRange(e.selection.getRange()),a=u.replace(/\n\s*/," ").length,f=e.session.doc.getLine(n.row);for(var l=n.row+1;l<=i.row+1;l++){var c=r.stringTrimLeft(r.stringTrimRight(e.session.doc.getLine(l)));c.length!==0&&(c=" "+c),f+=c}i.row+1<e.session.doc.getLength()-1&&(f+=e.session.doc.getNewLineCharacter()),e.clearSelection(),e.session.doc.replace(new s(n.row,0,i.row+2,0),f),a>0?(e.selection.moveCursorTo(n.row,n.column),e.selection.selectTo(n.row,n.column+a)):(o=e.session.doc.getLine(n.row).length>o?o+1:o,e.selection.moveCursorTo(n.row,o))},multiSelectAction:"forEach",readOnly:!0},{name:"invertSelection",description:"Invert selection",bindKey:o(null,null),exec:function(e){var t=e.session.doc.getLength()-1,n=e.session.doc.getLine(t).length,r=e.selection.rangeList.ranges,i=[];r.length<1&&(r=[e.selection.getRange()]);for(var o=0;o<r.length;o++)o==r.length-1&&(r[o].end.row!==t||r[o].end.column!==n)&&i.push(new s(r[o].end.row,r[o].end.column,t,n)),o===0?(r[o].start.row!==0||r[o].start.column!==0)&&i.push(new s(0,0,r[o].start.row,r[o].start.column)):i.push(new s(r[o-1].end.row,r[o-1].end.column,r[o].start.row,r[o].start.column));e.exitMultiSelectMode(),e.clearSelection();for(var o=0;o<i.length;o++)e.selection.addRange(i[o],!1)},readOnly:!0,scrollIntoView:"none"},{name:"addLineAfter",exec:function(e){e.selection.clearSelection(),e.navigateLineEnd(),e.insert("\n")},multiSelectAction:"forEach",scrollIntoView:"cursor"},{name:"addLineBefore",exec:function(e){e.selection.clearSelection();var t=e.getCursorPosition();e.selection.moveTo(t.row-1,Number.MAX_VALUE),e.insert("\n"),t.row===0&&e.navigateUp()},multiSelectAction:"forEach",scrollIntoView:"cursor"},{name:"openCommandPallete",description:"Open command pallete",bindKey:o("F1","F1"),exec:function(e){e.prompt({$type:"commands"})},readOnly:!0},{name:"modeSelect",description:"Change language mode...",bindKey:o(null,null),exec:function(e){e.prompt({$type:"modes"})},readOnly:!0}]}),define("ace/editor",["require","exports","module","ace/lib/fixoldbrowsers","ace/lib/oop","ace/lib/dom","ace/lib/lang","ace/lib/useragent","ace/keyboard/textinput","ace/mouse/mouse_handler","ace/mouse/fold_handler","ace/keyboard/keybinding","ace/edit_session","ace/search","ace/range","ace/lib/event_emitter","ace/commands/command_manager","ace/commands/default_commands","ace/config","ace/token_iterator","ace/clipboard"],function(e,t,n){"use strict";e("./lib/fixoldbrowsers");var r=e("./lib/oop"),i=e("./lib/dom"),s=e("./lib/lang"),o=e("./lib/useragent"),u=e("./keyboard/textinput").TextInput,a=e("./mouse/mouse_handler").MouseHandler,f=e("./mouse/fold_handler").FoldHandler,l=e("./keyboard/keybinding").KeyBinding,c=e("./edit_session").EditSession,h=e("./search").Search,p=e("./range").Range,d=e("./lib/event_emitter").EventEmitter,v=e("./commands/command_manager").CommandManager,m=e("./commands/default_commands").commands,g=e("./config"),y=e("./token_iterator").TokenIterator,b=e("./clipboard"),w=function(e,t,n){var r=e.getContainerElement();this.container=r,this.renderer=e,this.id="editor"+ ++w.$uid,this.commands=new v(o.isMac?"mac":"win",m),typeof document=="object"&&(this.textInput=new u(e.getTextAreaContainer(),this),this.renderer.textarea=this.textInput.getElement(),this.$mouseHandler=new a(this),new f(this)),this.keyBinding=new l(this),this.$search=(new h).set({wrap:!0}),this.$historyTracker=this.$historyTracker.bind(this),this.commands.on("exec",this.$historyTracker),this.$initOperationListeners(),this._$emitInputEvent=s.delayedCall(function(){this._signal("input",{}),this.session&&this.session.bgTokenizer&&this.session.bgTokenizer.scheduleStart()}.bind(this)),this.on("change",function(e,t){t._$emitInputEvent.schedule(31)}),this.setSession(t||n&&n.session||new c("")),g.resetOptions(this),n&&this.setOptions(n),g._signal("editor",this)};w.$uid=0,function(){r.implement(this,d),this.$initOperationListeners=function(){this.commands.on("exec",this.startOperation.bind(this),!0),this.commands.on("afterExec",this.endOperation.bind(this),!0),this.$opResetTimer=s.delayedCall(this.endOperation.bind(this,!0)),this.on("change",function(){this.curOp||(this.startOperation(),this.curOp.selectionBefore=this.$lastSel),this.curOp.docChanged=!0}.bind(this),!0),this.on("changeSelection",function(){this.curOp||(this.startOperation(),this.curOp.selectionBefore=this.$lastSel),this.curOp.selectionChanged=!0}.bind(this),!0)},this.curOp=null,this.prevOp={},this.startOperation=function(e){if(this.curOp){if(!e||this.curOp.command)return;this.prevOp=this.curOp}e||(this.previousCommand=null,e={}),this.$opResetTimer.schedule(),this.curOp=this.session.curOp={command:e.command||{},args:e.args,scrollTop:this.renderer.scrollTop},this.curOp.selectionBefore=this.selection.toJSON()},this.endOperation=function(e){if(this.curOp){if(e&&e.returnValue===!1)return this.curOp=null;if(e==1&&this.curOp.command&&this.curOp.command.name=="mouse")return;this._signal("beforeEndOperation");if(!this.curOp)return;var t=this.curOp.command,n=t&&t.scrollIntoView;if(n){switch(n){case"center-animate":n="animate";case"center":this.renderer.scrollCursorIntoView(null,.5);break;case"animate":case"cursor":this.renderer.scrollCursorIntoView();break;case"selectionPart":var r=this.selection.getRange(),i=this.renderer.layerConfig;(r.start.row>=i.lastRow||r.end.row<=i.firstRow)&&this.renderer.scrollSelectionIntoView(this.selection.anchor,this.selection.lead);break;default:}n=="animate"&&this.renderer.animateScrolling(this.curOp.scrollTop)}var s=this.selection.toJSON();this.curOp.selectionAfter=s,this.$lastSel=this.selection.toJSON(),this.session.getUndoManager().addSelection(s),this.prevOp=this.curOp,this.curOp=null}},this.$mergeableCommands=["backspace","del","insertstring"],this.$historyTracker=function(e){if(!this.$mergeUndoDeltas)return;var t=this.prevOp,n=this.$mergeableCommands,r=t.command&&e.command.name==t.command.name;if(e.command.name=="insertstring"){var i=e.args;this.mergeNextCommand===undefined&&(this.mergeNextCommand=!0),r=r&&this.mergeNextCommand&&(!/\s/.test(i)||/\s/.test(t.args)),this.mergeNextCommand=!0}else r=r&&n.indexOf(e.command.name)!==-1;this.$mergeUndoDeltas!="always"&&Date.now()-this.sequenceStartTime>2e3&&(r=!1),r?this.session.mergeUndoDeltas=!0:n.indexOf(e.command.name)!==-1&&(this.sequenceStartTime=Date.now())},this.setKeyboardHandler=function(e,t){if(e&&typeof e=="string"&&e!="ace"){this.$keybindingId=e;var n=this;g.loadModule(["keybinding",e],function(r){n.$keybindingId==e&&n.keyBinding.setKeyboardHandler(r&&r.handler),t&&t()})}else this.$keybindingId=null,this.keyBinding.setKeyboardHandler(e),t&&t()},this.getKeyboardHandler=function(){return this.keyBinding.getKeyboardHandler()},this.setSession=function(e){if(this.session==e)return;this.curOp&&this.endOperation(),this.curOp={};var t=this.session;if(t){this.session.off("change",this.$onDocumentChange),this.session.off("changeMode",this.$onChangeMode),this.session.off("tokenizerUpdate",this.$onTokenizerUpdate),this.session.off("changeTabSize",this.$onChangeTabSize),this.session.off("changeWrapLimit",this.$onChangeWrapLimit),this.session.off("changeWrapMode",this.$onChangeWrapMode),this.session.off("changeFold",this.$onChangeFold),this.session.off("changeFrontMarker",this.$onChangeFrontMarker),this.session.off("changeBackMarker",this.$onChangeBackMarker),this.session.off("changeBreakpoint",this.$onChangeBreakpoint),this.session.off("changeAnnotation",this.$onChangeAnnotation),this.session.off("changeOverwrite",this.$onCursorChange),this.session.off("changeScrollTop",this.$onScrollTopChange),this.session.off("changeScrollLeft",this.$onScrollLeftChange);var n=this.session.getSelection();n.off("changeCursor",this.$onCursorChange),n.off("changeSelection",this.$onSelectionChange)}this.session=e,e?(this.$onDocumentChange=this.onDocumentChange.bind(this),e.on("change",this.$onDocumentChange),this.renderer.setSession(e),this.$onChangeMode=this.onChangeMode.bind(this),e.on("changeMode",this.$onChangeMode),this.$onTokenizerUpdate=this.onTokenizerUpdate.bind(this),e.on("tokenizerUpdate",this.$onTokenizerUpdate),this.$onChangeTabSize=this.renderer.onChangeTabSize.bind(this.renderer),e.on("changeTabSize",this.$onChangeTabSize),this.$onChangeWrapLimit=this.onChangeWrapLimit.bind(this),e.on("changeWrapLimit",this.$onChangeWrapLimit),this.$onChangeWrapMode=this.onChangeWrapMode.bind(this),e.on("changeWrapMode",this.$onChangeWrapMode),this.$onChangeFold=this.onChangeFold.bind(this),e.on("changeFold",this.$onChangeFold),this.$onChangeFrontMarker=this.onChangeFrontMarker.bind(this),this.session.on("changeFrontMarker",this.$onChangeFrontMarker),this.$onChangeBackMarker=this.onChangeBackMarker.bind(this),this.session.on("changeBackMarker",this.$onChangeBackMarker),this.$onChangeBreakpoint=this.onChangeBreakpoint.bind(this),this.session.on("changeBreakpoint",this.$onChangeBreakpoint),this.$onChangeAnnotation=this.onChangeAnnotation.bind(this),this.session.on("changeAnnotation",this.$onChangeAnnotation),this.$onCursorChange=this.onCursorChange.bind(this),this.session.on("changeOverwrite",this.$onCursorChange),this.$onScrollTopChange=this.onScrollTopChange.bind(this),this.session.on("changeScrollTop",this.$onScrollTopChange),this.$onScrollLeftChange=this.onScrollLeftChange.bind(this),this.session.on("changeScrollLeft",this.$onScrollLeftChange),this.selection=e.getSelection(),this.selection.on("changeCursor",this.$onCursorChange),this.$onSelectionChange=this.onSelectionChange.bind(this),this.selection.on("changeSelection",this.$onSelectionChange),this.onChangeMode(),this.onCursorChange(),this.onScrollTopChange(),this.onScrollLeftChange(),this.onSelectionChange(),this.onChangeFrontMarker(),this.onChangeBackMarker(),this.onChangeBreakpoint(),this.onChangeAnnotation(),this.session.getUseWrapMode()&&this.renderer.adjustWrapLimit(),this.renderer.updateFull()):(this.selection=null,this.renderer.setSession(e)),this._signal("changeSession",{session:e,oldSession:t}),this.curOp=null,t&&t._signal("changeEditor",{oldEditor:this}),e&&e._signal("changeEditor",{editor:this}),e&&e.bgTokenizer&&e.bgTokenizer.scheduleStart()},this.getSession=function(){return this.session},this.setValue=function(e,t){return this.session.doc.setValue(e),t?t==1?this.navigateFileEnd():t==-1&&this.navigateFileStart():this.selectAll(),e},this.getValue=function(){return this.session.getValue()},this.getSelection=function(){return this.selection},this.resize=function(e){this.renderer.onResize(e)},this.setTheme=function(e,t){this.renderer.setTheme(e,t)},this.getTheme=function(){return this.renderer.getTheme()},this.setStyle=function(e){this.renderer.setStyle(e)},this.unsetStyle=function(e){this.renderer.unsetStyle(e)},this.getFontSize=function(){return this.getOption("fontSize")||i.computedStyle(this.container).fontSize},this.setFontSize=function(e){this.setOption("fontSize",e)},this.$highlightBrackets=function(){if(this.$highlightPending)return;var e=this;this.$highlightPending=!0,setTimeout(function(){e.$highlightPending=!1;var t=e.session;if(!t||!t.bgTokenizer)return;t.$bracketHighlight&&(t.$bracketHighlight.markerIds.forEach(function(e){t.removeMarker(e)}),t.$bracketHighlight=null);var n=t.getMatchingBracketRanges(e.getCursorPosition());!n&&t.$mode.getMatching&&(n=t.$mode.getMatching(e.session));if(!n)return;var r="ace_bracket";Array.isArray(n)?n.length==1&&(r="ace_error_bracket"):n=[n],n.length==2&&(p.comparePoints(n[0].end,n[1].start)==0?n=[p.fromPoints(n[0].start,n[1].end)]:p.comparePoints(n[0].start,n[1].end)==0&&(n=[p.fromPoints(n[1].start,n[0].end)])),t.$bracketHighlight={ranges:n,markerIds:n.map(function(e){return t.addMarker(e,r,"text")})}},50)},this.$highlightTags=function(){if(this.$highlightTagPending)return;var e=this;this.$highlightTagPending=!0,setTimeout(function(){e.$highlightTagPending=!1;var t=e.session;if(!t||!t.bgTokenizer)return;var n=e.getCursorPosition(),r=new y(e.session,n.row,n.column),i=r.getCurrentToken();if(!i||!/\b(?:tag-open|tag-name)/.test(i.type)){t.removeMarker(t.$tagHighlight),t.$tagHighlight=null;return}if(i.type.indexOf("tag-open")!=-1){i=r.stepForward();if(!i)return}var s=i.value,o=0,u=r.stepBackward();if(u.value=="<"){do u=i,i=r.stepForward(),i&&i.value===s&&i.type.indexOf("tag-name")!==-1&&(u.value==="<"?o++:u.value==="</"&&o--);while(i&&o>=0)}else{do i=u,u=r.stepBackward(),i&&i.value===s&&i.type.indexOf("tag-name")!==-1&&(u.value==="<"?o++:u.value==="</"&&o--);while(u&&o<=0);r.stepForward()}if(!i){t.removeMarker(t.$tagHighlight),t.$tagHighlight=null;return}var a=r.getCurrentTokenRow(),f=r.getCurrentTokenColumn(),l=new p(a,f,a,f+i.value.length),c=t.$backMarkers[t.$tagHighlight];t.$tagHighlight&&c!=undefined&&l.compareRange(c.range)!==0&&(t.removeMarker(t.$tagHighlight),t.$tagHighlight=null),t.$tagHighlight||(t.$tagHighlight=t.addMarker(l,"ace_bracket","text"))},50)},this.focus=function(){var e=this;setTimeout(function(){e.isFocused()||e.textInput.focus()}),this.textInput.focus()},this.isFocused=function(){return this.textInput.isFocused()},this.blur=function(){this.textInput.blur()},this.onFocus=function(e){if(this.$isFocused)return;this.$isFocused=!0,this.renderer.showCursor(),this.renderer.visualizeFocus(),this._emit("focus",e)},this.onBlur=function(e){if(!this.$isFocused)return;this.$isFocused=!1,this.renderer.hideCursor(),this.renderer.visualizeBlur(),this._emit("blur",e)},this.$cursorChange=function(){this.renderer.updateCursor()},this.onDocumentChange=function(e){var t=this.session.$useWrapMode,n=e.start.row==e.end.row?e.end.row:Infinity;this.renderer.updateLines(e.start.row,n,t),this._signal("change",e),this.$cursorChange(),this.$updateHighlightActiveLine()},this.onTokenizerUpdate=function(e){var t=e.data;this.renderer.updateLines(t.first,t.last)},this.onScrollTopChange=function(){this.renderer.scrollToY(this.session.getScrollTop())},this.onScrollLeftChange=function(){this.renderer.scrollToX(this.session.getScrollLeft())},this.onCursorChange=function(){this.$cursorChange(),this.$highlightBrackets(),this.$highlightTags(),this.$updateHighlightActiveLine(),this._signal("changeSelection")},this.$updateHighlightActiveLine=function(){var e=this.getSession(),t;if(this.$highlightActiveLine){if(this.$selectionStyle!="line"||!this.selection.isMultiLine())t=this.getCursorPosition();this.renderer.theme&&this.renderer.theme.$selectionColorConflict&&!this.selection.isEmpty()&&(t=!1),this.renderer.$maxLines&&this.session.getLength()===1&&!(this.renderer.$minLines>1)&&(t=!1)}if(e.$highlightLineMarker&&!t)e.removeMarker(e.$highlightLineMarker.id),e.$highlightLineMarker=null;else if(!e.$highlightLineMarker&&t){var n=new p(t.row,t.column,t.row,Infinity);n.id=e.addMarker(n,"ace_active-line","screenLine"),e.$highlightLineMarker=n}else t&&(e.$highlightLineMarker.start.row=t.row,e.$highlightLineMarker.end.row=t.row,e.$highlightLineMarker.start.column=t.column,e._signal("changeBackMarker"))},this.onSelectionChange=function(e){var t=this.session;t.$selectionMarker&&t.removeMarker(t.$selectionMarker),t.$selectionMarker=null;if(!this.selection.isEmpty()){var n=this.selection.getRange(),r=this.getSelectionStyle();t.$selectionMarker=t.addMarker(n,"ace_selection",r)}else this.$updateHighlightActiveLine();var i=this.$highlightSelectedWord&&this.$getSelectionHighLightRegexp();this.session.highlight(i),this._signal("changeSelection")},this.$getSelectionHighLightRegexp=function(){var e=this.session,t=this.getSelectionRange();if(t.isEmpty()||t.isMultiLine())return;var n=t.start.column,r=t.end.column,i=e.getLine(t.start.row),s=i.substring(n,r);if(s.length>5e3||!/[\w\d]/.test(s))return;var o=this.$search.$assembleRegExp({wholeWord:!0,caseSensitive:!0,needle:s}),u=i.substring(n-1,r+1);if(!o.test(u))return;return o},this.onChangeFrontMarker=function(){this.renderer.updateFrontMarkers()},this.onChangeBackMarker=function(){this.renderer.updateBackMarkers()},this.onChangeBreakpoint=function(){this.renderer.updateBreakpoints()},this.onChangeAnnotation=function(){this.renderer.setAnnotations(this.session.getAnnotations())},this.onChangeMode=function(e){this.renderer.updateText(),this._emit("changeMode",e)},this.onChangeWrapLimit=function(){this.renderer.updateFull()},this.onChangeWrapMode=function(){this.renderer.onResize(!0)},this.onChangeFold=function(){this.$updateHighlightActiveLine(),this.renderer.updateFull()},this.getSelectedText=function(){return this.session.getTextRange(this.getSelectionRange())},this.getCopyText=function(){var e=this.getSelectedText(),t=this.session.doc.getNewLineCharacter(),n=!1;if(!e&&this.$copyWithEmptySelection){n=!0;var r=this.selection.getAllRanges();for(var i=0;i<r.length;i++){var s=r[i];if(i&&r[i-1].start.row==s.start.row)continue;e+=this.session.getLine(s.start.row)+t}}var o={text:e};return this._signal("copy",o),b.lineMode=n?o.text:"",o.text},this.onCopy=function(){this.commands.exec("copy",this)},this.onCut=function(){this.commands.exec("cut",this)},this.onPaste=function(e,t){var n={text:e,event:t};this.commands.exec("paste",this,n)},this.$handlePaste=function(e){typeof e=="string"&&(e={text:e}),this._signal("paste",e);var t=e.text,n=t==b.lineMode,r=this.session;if(!this.inMultiSelectMode||this.inVirtualSelectionMode)n?r.insert({row:this.selection.lead.row,column:0},t):this.insert(t);else if(n)this.selection.rangeList.ranges.forEach(function(e){r.insert({row:e.start.row,column:0},t)});else{var i=t.split(/\r\n|\r|\n/),s=this.selection.rangeList.ranges,o=i.length==2&&(!i[0]||!i[1]);if(i.length!=s.length||o)return this.commands.exec("insertstring",this,t);for(var u=s.length;u--;){var a=s[u];a.isEmpty()||r.remove(a),r.insert(a.start,i[u])}}},this.execCommand=function(e,t){return this.commands.exec(e,this,t)},this.insert=function(e,t){var n=this.session,r=n.getMode(),i=this.getCursorPosition();if(this.getBehavioursEnabled()&&!t){var s=r.transformAction(n.getState(i.row),"insertion",this,n,e);s&&(e!==s.text&&(this.inVirtualSelectionMode||(this.session.mergeUndoDeltas=!1,this.mergeNextCommand=!1)),e=s.text)}e=="	"&&(e=this.session.getTabString());if(!this.selection.isEmpty()){var o=this.getSelectionRange();i=this.session.remove(o),this.clearSelection()}else if(this.session.getOverwrite()&&e.indexOf("\n")==-1){var o=new p.fromPoints(i,i);o.end.column+=e.length,this.session.remove(o)}if(e=="\n"||e=="\r\n"){var u=n.getLine(i.row);if(i.column>u.search(/\S|$/)){var a=u.substr(i.column).search(/\S|$/);n.doc.removeInLine(i.row,i.column,i.column+a)}}this.clearSelection();var f=i.column,l=n.getState(i.row),u=n.getLine(i.row),c=r.checkOutdent(l,u,e);n.insert(i,e),s&&s.selection&&(s.selection.length==2?this.selection.setSelectionRange(new p(i.row,f+s.selection[0],i.row,f+s.selection[1])):this.selection.setSelectionRange(new p(i.row+s.selection[0],s.selection[1],i.row+s.selection[2],s.selection[3])));if(n.getDocument().isNewLine(e)){var h=r.getNextLineIndent(l,u.slice(0,i.column),n.getTabString());n.insert({row:i.row+1,column:0},h)}c&&r.autoOutdent(l,n,i.row)},this.onTextInput=function(e,t){if(!t)return this.keyBinding.onTextInput(e);this.startOperation({command:{name:"insertstring"}});var n=this.applyComposition.bind(this,e,t);this.selection.rangeCount?this.forEachSelection(n):n(),this.endOperation()},this.applyComposition=function(e,t){if(t.extendLeft||t.extendRight){var n=this.selection.getRange();n.start.column-=t.extendLeft,n.end.column+=t.extendRight,this.selection.setRange(n),!e&&!n.isEmpty()&&this.remove()}(e||!this.selection.isEmpty())&&this.insert(e,!0);if(t.restoreStart||t.restoreEnd){var n=this.selection.getRange();n.start.column-=t.restoreStart,n.end.column-=t.restoreEnd,this.selection.setRange(n)}},this.onCommandKey=function(e,t,n){return this.keyBinding.onCommandKey(e,t,n)},this.setOverwrite=function(e){this.session.setOverwrite(e)},this.getOverwrite=function(){return this.session.getOverwrite()},this.toggleOverwrite=function(){this.session.toggleOverwrite()},this.setScrollSpeed=function(e){this.setOption("scrollSpeed",e)},this.getScrollSpeed=function(){return this.getOption("scrollSpeed")},this.setDragDelay=function(e){this.setOption("dragDelay",e)},this.getDragDelay=function(){return this.getOption("dragDelay")},this.setSelectionStyle=function(e){this.setOption("selectionStyle",e)},this.getSelectionStyle=function(){return this.getOption("selectionStyle")},this.setHighlightActiveLine=function(e){this.setOption("highlightActiveLine",e)},this.getHighlightActiveLine=function(){return this.getOption("highlightActiveLine")},this.setHighlightGutterLine=function(e){this.setOption("highlightGutterLine",e)},this.getHighlightGutterLine=function(){return this.getOption("highlightGutterLine")},this.setHighlightSelectedWord=function(e){this.setOption("highlightSelectedWord",e)},this.getHighlightSelectedWord=function(){return this.$highlightSelectedWord},this.setAnimatedScroll=function(e){this.renderer.setAnimatedScroll(e)},this.getAnimatedScroll=function(){return this.renderer.getAnimatedScroll()},this.setShowInvisibles=function(e){this.renderer.setShowInvisibles(e)},this.getShowInvisibles=function(){return this.renderer.getShowInvisibles()},this.setDisplayIndentGuides=function(e){this.renderer.setDisplayIndentGuides(e)},this.getDisplayIndentGuides=function(){return this.renderer.getDisplayIndentGuides()},this.setShowPrintMargin=function(e){this.renderer.setShowPrintMargin(e)},this.getShowPrintMargin=function(){return this.renderer.getShowPrintMargin()},this.setPrintMarginColumn=function(e){this.renderer.setPrintMarginColumn(e)},this.getPrintMarginColumn=function(){return this.renderer.getPrintMarginColumn()},this.setReadOnly=function(e){this.setOption("readOnly",e)},this.getReadOnly=function(){return this.getOption("readOnly")},this.setBehavioursEnabled=function(e){this.setOption("behavioursEnabled",e)},this.getBehavioursEnabled=function(){return this.getOption("behavioursEnabled")},this.setWrapBehavioursEnabled=function(e){this.setOption("wrapBehavioursEnabled",e)},this.getWrapBehavioursEnabled=function(){return this.getOption("wrapBehavioursEnabled")},this.setShowFoldWidgets=function(e){this.setOption("showFoldWidgets",e)},this.getShowFoldWidgets=function(){return this.getOption("showFoldWidgets")},this.setFadeFoldWidgets=function(e){this.setOption("fadeFoldWidgets",e)},this.getFadeFoldWidgets=function(){return this.getOption("fadeFoldWidgets")},this.remove=function(e){this.selection.isEmpty()&&(e=="left"?this.selection.selectLeft():this.selection.selectRight());var t=this.getSelectionRange();if(this.getBehavioursEnabled()){var n=this.session,r=n.getState(t.start.row),i=n.getMode().transformAction(r,"deletion",this,n,t);if(t.end.column===0){var s=n.getTextRange(t);if(s[s.length-1]=="\n"){var o=n.getLine(t.end.row);/^\s+$/.test(o)&&(t.end.column=o.length)}}i&&(t=i)}this.session.remove(t),this.clearSelection()},this.removeWordRight=function(){this.selection.isEmpty()&&this.selection.selectWordRight(),this.session.remove(this.getSelectionRange()),this.clearSelection()},this.removeWordLeft=function(){this.selection.isEmpty()&&this.selection.selectWordLeft(),this.session.remove(this.getSelectionRange()),this.clearSelection()},this.removeToLineStart=function(){this.selection.isEmpty()&&this.selection.selectLineStart(),this.selection.isEmpty()&&this.selection.selectLeft(),this.session.remove(this.getSelectionRange()),this.clearSelection()},this.removeToLineEnd=function(){this.selection.isEmpty()&&this.selection.selectLineEnd();var e=this.getSelectionRange();e.start.column==e.end.column&&e.start.row==e.end.row&&(e.end.column=0,e.end.row++),this.session.remove(e),this.clearSelection()},this.splitLine=function(){this.selection.isEmpty()||(this.session.remove(this.getSelectionRange()),this.clearSelection());var e=this.getCursorPosition();this.insert("\n"),this.moveCursorToPosition(e)},this.transposeLetters=function(){if(!this.selection.isEmpty())return;var e=this.getCursorPosition(),t=e.column;if(t===0)return;var n=this.session.getLine(e.row),r,i;t<n.length?(r=n.charAt(t)+n.charAt(t-1),i=new p(e.row,t-1,e.row,t+1)):(r=n.charAt(t-1)+n.charAt(t-2),i=new p(e.row,t-2,e.row,t)),this.session.replace(i,r),this.session.selection.moveToPosition(i.end)},this.toLowerCase=function(){var e=this.getSelectionRange();this.selection.isEmpty()&&this.selection.selectWord();var t=this.getSelectionRange(),n=this.session.getTextRange(t);this.session.replace(t,n.toLowerCase()),this.selection.setSelectionRange(e)},this.toUpperCase=function(){var e=this.getSelectionRange();this.selection.isEmpty()&&this.selection.selectWord();var t=this.getSelectionRange(),n=this.session.getTextRange(t);this.session.replace(t,n.toUpperCase()),this.selection.setSelectionRange(e)},this.indent=function(){var e=this.session,t=this.getSelectionRange();if(t.start.row<t.end.row){var n=this.$getSelectedRows();e.indentRows(n.first,n.last,"	");return}if(t.start.column<t.end.column){var r=e.getTextRange(t);if(!/^\s+$/.test(r)){var n=this.$getSelectedRows();e.indentRows(n.first,n.last,"	");return}}var i=e.getLine(t.start.row),o=t.start,u=e.getTabSize(),a=e.documentToScreenColumn(o.row,o.column);if(this.session.getUseSoftTabs())var f=u-a%u,l=s.stringRepeat(" ",f);else{var f=a%u;while(i[t.start.column-1]==" "&&f)t.start.column--,f--;this.selection.setSelectionRange(t),l="	"}return this.insert(l)},this.blockIndent=function(){var e=this.$getSelectedRows();this.session.indentRows(e.first,e.last,"	")},this.blockOutdent=function(){var e=this.session.getSelection();this.session.outdentRows(e.getRange())},this.sortLines=function(){var e=this.$getSelectedRows(),t=this.session,n=[];for(var r=e.first;r<=e.last;r++)n.push(t.getLine(r));n.sort(function(e,t){return e.toLowerCase()<t.toLowerCase()?-1:e.toLowerCase()>t.toLowerCase()?1:0});var i=new p(0,0,0,0);for(var r=e.first;r<=e.last;r++){var s=t.getLine(r);i.start.row=r,i.end.row=r,i.end.column=s.length,t.replace(i,n[r-e.first])}},this.toggleCommentLines=function(){var e=this.session.getState(this.getCursorPosition().row),t=this.$getSelectedRows();this.session.getMode().toggleCommentLines(e,this.session,t.first,t.last)},this.toggleBlockComment=function(){var e=this.getCursorPosition(),t=this.session.getState(e.row),n=this.getSelectionRange();this.session.getMode().toggleBlockComment(t,this.session,n,e)},this.getNumberAt=function(e,t){var n=/[\-]?[0-9]+(?:\.[0-9]+)?/g;n.lastIndex=0;var r=this.session.getLine(e);while(n.lastIndex<t){var i=n.exec(r);if(i.index<=t&&i.index+i[0].length>=t){var s={value:i[0],start:i.index,end:i.index+i[0].length};return s}}return null},this.modifyNumber=function(e){var t=this.selection.getCursor().row,n=this.selection.getCursor().column,r=new p(t,n-1,t,n),i=this.session.getTextRange(r);if(!isNaN(parseFloat(i))&&isFinite(i)){var s=this.getNumberAt(t,n);if(s){var o=s.value.indexOf(".")>=0?s.start+s.value.indexOf(".")+1:s.end,u=s.start+s.value.length-o,a=parseFloat(s.value);a*=Math.pow(10,u),o!==s.end&&n<o?e*=Math.pow(10,s.end-n-1):e*=Math.pow(10,s.end-n),a+=e,a/=Math.pow(10,u);var f=a.toFixed(u),l=new p(t,s.start,t,s.end);this.session.replace(l,f),this.moveCursorTo(t,Math.max(s.start+1,n+f.length-s.value.length))}}else this.toggleWord()},this.$toggleWordPairs=[["first","last"],["true","false"],["yes","no"],["width","height"],["top","bottom"],["right","left"],["on","off"],["x","y"],["get","set"],["max","min"],["horizontal","vertical"],["show","hide"],["add","remove"],["up","down"],["before","after"],["even","odd"],["in","out"],["inside","outside"],["next","previous"],["increase","decrease"],["attach","detach"],["&&","||"],["==","!="]],this.toggleWord=function(){var e=this.selection.getCursor().row,t=this.selection.getCursor().column;this.selection.selectWord();var n=this.getSelectedText(),r=this.selection.getWordRange().start.column,i=n.replace(/([a-z]+|[A-Z]+)(?=[A-Z_]|$)/g,"$1 ").split(/\s/),o=t-r-1;o<0&&(o=0);var u=0,a=0,f=this;n.match(/[A-Za-z0-9_]+/)&&i.forEach(function(t,i){a=u+t.length,o>=u&&o<=a&&(n=t,f.selection.clearSelection(),f.moveCursorTo(e,u+r),f.selection.selectTo(e,a+r)),u=a});var l=this.$toggleWordPairs,c;for(var h=0;h<l.length;h++){var p=l[h];for(var d=0;d<=1;d++){var v=+!d,m=n.match(new RegExp("^\\s?_?("+s.escapeRegExp(p[d])+")\\s?$","i"));if(m){var g=n.match(new RegExp("([_]|^|\\s)("+s.escapeRegExp(m[1])+")($|\\s)","g"));g&&(c=n.replace(new RegExp(s.escapeRegExp(p[d]),"i"),function(e){var t=p[v];return e.toUpperCase()==e?t=t.toUpperCase():e.charAt(0).toUpperCase()==e.charAt(0)&&(t=t.substr(0,0)+p[v].charAt(0).toUpperCase()+t.substr(1)),t}),this.insert(c),c="")}}}},this.removeLines=function(){var e=this.$getSelectedRows();this.session.removeFullLines(e.first,e.last),this.clearSelection()},this.duplicateSelection=function(){var e=this.selection,t=this.session,n=e.getRange(),r=e.isBackwards();if(n.isEmpty()){var i=n.start.row;t.duplicateLines(i,i)}else{var s=r?n.start:n.end,o=t.insert(s,t.getTextRange(n),!1);n.start=s,n.end=o,e.setSelectionRange(n,r)}},this.moveLinesDown=function(){this.$moveLines(1,!1)},this.moveLinesUp=function(){this.$moveLines(-1,!1)},this.moveText=function(e,t,n){return this.session.moveText(e,t,n)},this.copyLinesUp=function(){this.$moveLines(-1,!0)},this.copyLinesDown=function(){this.$moveLines(1,!0)},this.$moveLines=function(e,t){var n,r,i=this.selection;if(!i.inMultiSelectMode||this.inVirtualSelectionMode){var s=i.toOrientedRange();n=this.$getSelectedRows(s),r=this.session.$moveLines(n.first,n.last,t?0:e),t&&e==-1&&(r=0),s.moveBy(r,0),i.fromOrientedRange(s)}else{var o=i.rangeList.ranges;i.rangeList.detach(this.session),this.inVirtualSelectionMode=!0;var u=0,a=0,f=o.length;for(var l=0;l<f;l++){var c=l;o[l].moveBy(u,0),n=this.$getSelectedRows(o[l]);var h=n.first,p=n.last;while(++l<f){a&&o[l].moveBy(a,0);var d=this.$getSelectedRows(o[l]);if(t&&d.first!=p)break;if(!t&&d.first>p+1)break;p=d.last}l--,u=this.session.$moveLines(h,p,t?0:e),t&&e==-1&&(c=l+1);while(c<=l)o[c].moveBy(u,0),c++;t||(u=0),a+=u}i.fromOrientedRange(i.ranges[0]),i.rangeList.attach(this.session),this.inVirtualSelectionMode=!1}},this.$getSelectedRows=function(e){return e=(e||this.getSelectionRange()).collapseRows(),{first:this.session.getRowFoldStart(e.start.row),last:this.session.getRowFoldEnd(e.end.row)}},this.onCompositionStart=function(e){this.renderer.showComposition(e)},this.onCompositionUpdate=function(e){this.renderer.setCompositionText(e)},this.onCompositionEnd=function(){this.renderer.hideComposition()},this.getFirstVisibleRow=function(){return this.renderer.getFirstVisibleRow()},this.getLastVisibleRow=function(){return this.renderer.getLastVisibleRow()},this.isRowVisible=function(e){return e>=this.getFirstVisibleRow()&&e<=this.getLastVisibleRow()},this.isRowFullyVisible=function(e){return e>=this.renderer.getFirstFullyVisibleRow()&&e<=this.renderer.getLastFullyVisibleRow()},this.$getVisibleRowCount=function(){return this.renderer.getScrollBottomRow()-this.renderer.getScrollTopRow()+1},this.$moveByPage=function(e,t){var n=this.renderer,r=this.renderer.layerConfig,i=e*Math.floor(r.height/r.lineHeight);t===!0?this.selection.$moveSelection(function(){this.moveCursorBy(i,0)}):t===!1&&(this.selection.moveCursorBy(i,0),this.selection.clearSelection());var s=n.scrollTop;n.scrollBy(0,i*r.lineHeight),t!=null&&n.scrollCursorIntoView(null,.5),n.animateScrolling(s)},this.selectPageDown=function(){this.$moveByPage(1,!0)},this.selectPageUp=function(){this.$moveByPage(-1,!0)},this.gotoPageDown=function(){this.$moveByPage(1,!1)},this.gotoPageUp=function(){this.$moveByPage(-1,!1)},this.scrollPageDown=function(){this.$moveByPage(1)},this.scrollPageUp=function(){this.$moveByPage(-1)},this.scrollToRow=function(e){this.renderer.scrollToRow(e)},this.scrollToLine=function(e,t,n,r){this.renderer.scrollToLine(e,t,n,r)},this.centerSelection=function(){var e=this.getSelectionRange(),t={row:Math.floor(e.start.row+(e.end.row-e.start.row)/2),column:Math.floor(e.start.column+(e.end.column-e.start.column)/2)};this.renderer.alignCursor(t,.5)},this.getCursorPosition=function(){return this.selection.getCursor()},this.getCursorPositionScreen=function(){return this.session.documentToScreenPosition(this.getCursorPosition())},this.getSelectionRange=function(){return this.selection.getRange()},this.selectAll=function(){this.selection.selectAll()},this.clearSelection=function(){this.selection.clearSelection()},this.moveCursorTo=function(e,t){this.selection.moveCursorTo(e,t)},this.moveCursorToPosition=function(e){this.selection.moveCursorToPosition(e)},this.jumpToMatching=function(e,t){var n=this.getCursorPosition(),r=new y(this.session,n.row,n.column),i=r.getCurrentToken(),s=i||r.stepForward();if(!s)return;var o,u=!1,a={},f=n.column-s.start,l,c={")":"(","(":"(","]":"[","[":"[","{":"{","}":"{"};do{if(s.value.match(/[{}()\[\]]/g))for(;f<s.value.length&&!u;f++){if(!c[s.value[f]])continue;l=c[s.value[f]]+"."+s.type.replace("rparen","lparen"),isNaN(a[l])&&(a[l]=0);switch(s.value[f]){case"(":case"[":case"{":a[l]++;break;case")":case"]":case"}":a[l]--,a[l]===-1&&(o="bracket",u=!0)}}else s.type.indexOf("tag-name")!==-1&&(isNaN(a[s.value])&&(a[s.value]=0),i.value==="<"?a[s.value]++:i.value==="</"&&a[s.value]--,a[s.value]===-1&&(o="tag",u=!0));u||(i=s,s=r.stepForward(),f=0)}while(s&&!u);if(!o)return;var h,d;if(o==="bracket"){h=this.session.getBracketRange(n);if(!h){h=new p(r.getCurrentTokenRow(),r.getCurrentTokenColumn()+f-1,r.getCurrentTokenRow(),r.getCurrentTokenColumn()+f-1),d=h.start;if(t||d.row===n.row&&Math.abs(d.column-n.column)<2)h=this.session.getBracketRange(d)}}else if(o==="tag"){if(!s||s.type.indexOf("tag-name")===-1)return;var v=s.value;h=new p(r.getCurrentTokenRow(),r.getCurrentTokenColumn()-2,r.getCurrentTokenRow(),r.getCurrentTokenColumn()-2);if(h.compare(n.row,n.column)===0){u=!1;do s=i,i=r.stepBackward(),i&&(i.type.indexOf("tag-close")!==-1&&h.setEnd(r.getCurrentTokenRow(),r.getCurrentTokenColumn()+1),s.value===v&&s.type.indexOf("tag-name")!==-1&&(i.value==="<"?a[v]++:i.value==="</"&&a[v]--,a[v]===0&&(u=!0)));while(i&&!u)}s&&s.type.indexOf("tag-name")&&(d=h.start,d.row==n.row&&Math.abs(d.column-n.column)<2&&(d=h.end))}d=h&&h.cursor||d,d&&(e?h&&t?this.selection.setRange(h):h&&h.isEqual(this.getSelectionRange())?this.clearSelection():this.selection.selectTo(d.row,d.column):this.selection.moveTo(d.row,d.column))},this.gotoLine=function(e,t,n){this.selection.clearSelection(),this.session.unfold({row:e-1,column:t||0}),this.exitMultiSelectMode&&this.exitMultiSelectMode(),this.moveCursorTo(e-1,t||0),this.isRowFullyVisible(e-1)||this.scrollToLine(e-1,!0,n)},this.navigateTo=function(e,t){this.selection.moveTo(e,t)},this.navigateUp=function(e){if(this.selection.isMultiLine()&&!this.selection.isBackwards()){var t=this.selection.anchor.getPosition();return this.moveCursorToPosition(t)}this.selection.clearSelection(),this.selection.moveCursorBy(-e||-1,0)},this.navigateDown=function(e){if(this.selection.isMultiLine()&&this.selection.isBackwards()){var t=this.selection.anchor.getPosition();return this.moveCursorToPosition(t)}this.selection.clearSelection(),this.selection.moveCursorBy(e||1,0)},this.navigateLeft=function(e){if(!this.selection.isEmpty()){var t=this.getSelectionRange().start;this.moveCursorToPosition(t)}else{e=e||1;while(e--)this.selection.moveCursorLeft()}this.clearSelection()},this.navigateRight=function(e){if(!this.selection.isEmpty()){var t=this.getSelectionRange().end;this.moveCursorToPosition(t)}else{e=e||1;while(e--)this.selection.moveCursorRight()}this.clearSelection()},this.navigateLineStart=function(){this.selection.moveCursorLineStart(),this.clearSelection()},this.navigateLineEnd=function(){this.selection.moveCursorLineEnd(),this.clearSelection()},this.navigateFileEnd=function(){this.selection.moveCursorFileEnd(),this.clearSelection()},this.navigateFileStart=function(){this.selection.moveCursorFileStart(),this.clearSelection()},this.navigateWordRight=function(){this.selection.moveCursorWordRight(),this.clearSelection()},this.navigateWordLeft=function(){this.selection.moveCursorWordLeft(),this.clearSelection()},this.replace=function(e,t){t&&this.$search.set(t);var n=this.$search.find(this.session),r=0;return n?(this.$tryReplace(n,e)&&(r=1),this.selection.setSelectionRange(n),this.renderer.scrollSelectionIntoView(n.start,n.end),r):r},this.replaceAll=function(e,t){t&&this.$search.set(t);var n=this.$search.findAll(this.session),r=0;if(!n.length)return r;var i=this.getSelectionRange();this.selection.moveTo(0,0);for(var s=n.length-1;s>=0;--s)this.$tryReplace(n[s],e)&&r++;return this.selection.setSelectionRange(i),r},this.$tryReplace=function(e,t){var n=this.session.getTextRange(e);return t=this.$search.replace(n,t),t!==null?(e.end=this.session.replace(e,t),e):null},this.getLastSearchOptions=function(){return this.$search.getOptions()},this.find=function(e,t,n){t||(t={}),typeof e=="string"||e instanceof RegExp?t.needle=e:typeof e=="object"&&r.mixin(t,e);var i=this.selection.getRange();t.needle==null&&(e=this.session.getTextRange(i)||this.$search.$options.needle,e||(i=this.session.getWordRange(i.start.row,i.start.column),e=this.session.getTextRange(i)),this.$search.set({needle:e})),this.$search.set(t),t.start||this.$search.set({start:i});var s=this.$search.find(this.session);if(t.preventScroll)return s;if(s)return this.revealRange(s,n),s;t.backwards?i.start=i.end:i.end=i.start,this.selection.setRange(i)},this.findNext=function(e,t){this.find({skipCurrent:!0,backwards:!1},e,t)},this.findPrevious=function(e,t){this.find(e,{skipCurrent:!0,backwards:!0},t)},this.revealRange=function(e,t){this.session.unfold(e),this.selection.setSelectionRange(e);var n=this.renderer.scrollTop;this.renderer.scrollSelectionIntoView(e.start,e.end,.5),t!==!1&&this.renderer.animateScrolling(n)},this.undo=function(){this.session.getUndoManager().undo(this.session),this.renderer.scrollCursorIntoView(null,.5)},this.redo=function(){this.session.getUndoManager().redo(this.session),this.renderer.scrollCursorIntoView(null,.5)},this.destroy=function(){this.renderer.destroy(),this._signal("destroy",this),this.session&&this.session.destroy(),this._$emitInputEvent&&this._$emitInputEvent.cancel(),this.session=null},this.setAutoScrollEditorIntoView=function(e){if(!e)return;var t,n=this,r=!1;this.$scrollAnchor||(this.$scrollAnchor=document.createElement("div"));var i=this.$scrollAnchor;i.style.cssText="position:absolute",this.container.insertBefore(i,this.container.firstChild);var s=this.on("changeSelection",function(){r=!0}),o=this.renderer.on("beforeRender",function(){r&&(t=n.renderer.container.getBoundingClientRect())}),u=this.renderer.on("afterRender",function(){if(r&&t&&(n.isFocused()||n.searchBox&&n.searchBox.isFocused())){var e=n.renderer,s=e.$cursorLayer.$pixelPos,o=e.layerConfig,u=s.top-o.offset;s.top>=0&&u+t.top<0?r=!0:s.top<o.height&&s.top+t.top+o.lineHeight>window.innerHeight?r=!1:r=null,r!=null&&(i.style.top=u+"px",i.style.left=s.left+"px",i.style.height=o.lineHeight+"px",i.scrollIntoView(r)),r=t=null}});this.setAutoScrollEditorIntoView=function(e){if(e)return;delete this.setAutoScrollEditorIntoView,this.off("changeSelection",s),this.renderer.off("afterRender",u),this.renderer.off("beforeRender",o)}},this.$resetCursorStyle=function(){var e=this.$cursorStyle||"ace",t=this.renderer.$cursorLayer;if(!t)return;t.setSmoothBlinking(/smooth/.test(e)),t.isBlinking=!this.$readOnly&&e!="wide",i.setCssClass(t.element,"ace_slim-cursors",/slim/.test(e))},this.prompt=function(e,t,n){var r=this;g.loadModule("./ext/prompt",function(i){i.prompt(r,e,t,n)})}}.call(w.prototype),g.defineOptions(w.prototype,"editor",{selectionStyle:{set:function(e){this.onSelectionChange(),this._signal("changeSelectionStyle",{data:e})},initialValue:"line"},highlightActiveLine:{set:function(){this.$updateHighlightActiveLine()},initialValue:!0},highlightSelectedWord:{set:function(e){this.$onSelectionChange()},initialValue:!0},readOnly:{set:function(e){this.textInput.setReadOnly(e),this.$resetCursorStyle()},initialValue:!1},copyWithEmptySelection:{set:function(e){this.textInput.setCopyWithEmptySelection(e)},initialValue:!1},cursorStyle:{set:function(e){this.$resetCursorStyle()},values:["ace","slim","smooth","wide"],initialValue:"ace"},mergeUndoDeltas:{values:[!1,!0,"always"],initialValue:!0},behavioursEnabled:{initialValue:!0},wrapBehavioursEnabled:{initialValue:!0},autoScrollEditorIntoView:{set:function(e){this.setAutoScrollEditorIntoView(e)}},keyboardHandler:{set:function(e){this.setKeyboardHandler(e)},get:function(){return this.$keybindingId},handlesSet:!0},value:{set:function(e){this.session.setValue(e)},get:function(){return this.getValue()},handlesSet:!0,hidden:!0},session:{set:function(e){this.setSession(e)},get:function(){return this.session},handlesSet:!0,hidden:!0},showLineNumbers:{set:function(e){this.renderer.$gutterLayer.setShowLineNumbers(e),this.renderer.$loop.schedule(this.renderer.CHANGE_GUTTER),e&&this.$relativeLineNumbers?E.attach(this):E.detach(this)},initialValue:!0},relativeLineNumbers:{set:function(e){this.$showLineNumbers&&e?E.attach(this):E.detach(this)}},placeholder:{set:function(e){this.$updatePlaceholder||(this.$updatePlaceholder=function(){var e=this.renderer.$composition||this.getValue();if(e&&this.renderer.placeholderNode)this.renderer.off("afterRender",this.$updatePlaceholder),i.removeCssClass(this.container,"ace_hasPlaceholder"),this.renderer.placeholderNode.remove(),this.renderer.placeholderNode=null;else if(!e&&!this.renderer.placeholderNode){this.renderer.on("afterRender",this.$updatePlaceholder),i.addCssClass(this.container,"ace_hasPlaceholder");var t=i.createElement("div");t.className="ace_placeholder",t.textContent=this.$placeholder||"",this.renderer.placeholderNode=t,this.renderer.content.appendChild(this.renderer.placeholderNode)}}.bind(this),this.on("input",this.$updatePlaceholder)),this.$updatePlaceholder()}},hScrollBarAlwaysVisible:"renderer",vScrollBarAlwaysVisible:"renderer",highlightGutterLine:"renderer",animatedScroll:"renderer",showInvisibles:"renderer",showPrintMargin:"renderer",printMarginColumn:"renderer",printMargin:"renderer",fadeFoldWidgets:"renderer",showFoldWidgets:"renderer",displayIndentGuides:"renderer",showGutter:"renderer",fontSize:"renderer",fontFamily:"renderer",maxLines:"renderer",minLines:"renderer",scrollPastEnd:"renderer",fixedWidthGutter:"renderer",theme:"renderer",hasCssTransforms:"renderer",maxPixelHeight:"renderer",useTextareaForIME:"renderer",scrollSpeed:"$mouseHandler",dragDelay:"$mouseHandler",dragEnabled:"$mouseHandler",focusTimeout:"$mouseHandler",tooltipFollowsMouse:"$mouseHandler",firstLineNumber:"session",overwrite:"session",newLineMode:"session",useWorker:"session",useSoftTabs:"session",navigateWithinSoftTabs:"session",tabSize:"session",wrap:"session",indentedSoftWrap:"session",foldStyle:"session",mode:"session"});var E={getText:function(e,t){return(Math.abs(e.selection.lead.row-t)||t+1+(t<9?"\u00b7":""))+""},getWidth:function(e,t,n){return Math.max(t.toString().length,(n.lastRow+1).toString().length,2)*n.characterWidth},update:function(e,t){t.renderer.$loop.schedule(t.renderer.CHANGE_GUTTER)},attach:function(e){e.renderer.$gutterLayer.$renderer=this,e.on("changeSelection",this.update),this.update(null,e)},detach:function(e){e.renderer.$gutterLayer.$renderer==this&&(e.renderer.$gutterLayer.$renderer=null),e.off("changeSelection",this.update),this.update(null,e)}};t.Editor=w}),define("ace/undomanager",["require","exports","module","ace/range"],function(e,t,n){"use strict";function i(e,t){for(var n=t;n--;){var r=e[n];if(r&&!r[0].ignore){while(n<t-1){var i=d(e[n],e[n+1]);e[n]=i[0],e[n+1]=i[1],n++}return!0}}}function a(e){var t=e.action=="insert",n=e.start,r=e.end,i=(r.row-n.row)*(t?1:-1),s=(r.column-n.column)*(t?1:-1);t&&(r=n);for(var o in this.marks){var a=this.marks[o],f=u(a,n);if(f<0)continue;if(f===0&&t){if(a.bias!=1){a.bias==-1;continue}f=1}var l=t?f:u(a,r);if(l>0){a.row+=i,a.column+=a.row==r.row?s:0;continue}!t&&l<=0&&(a.row=n.row,a.column=n.column,l===0&&(a.bias=1))}}function f(e){return{row:e.row,column:e.column}}function l(e){return{start:f(e.start),end:f(e.end),action:e.action,lines:e.lines.slice()}}function c(e){e=e||this;if(Array.isArray(e))return e.map(c).join("\n");var t="";e.action?(t=e.action=="insert"?"+":"-",t+="["+e.lines+"]"):e.value&&(Array.isArray(e.value)?t=e.value.map(h).join("\n"):t=h(e.value)),e.start&&(t+=h(e));if(e.id||e.rev)t+="	("+(e.id||e.rev)+")";return t}function h(e){return e.start.row+":"+e.start.column+"=>"+e.end.row+":"+e.end.column}function p(e,t){var n=e.action=="insert",r=t.action=="insert";if(n&&r)if(o(t.start,e.end)>=0)m(t,e,-1);else{if(!(o(t.start,e.start)<=0))return null;m(e,t,1)}else if(n&&!r)if(o(t.start,e.end)>=0)m(t,e,-1);else{if(!(o(t.end,e.start)<=0))return null;m(e,t,-1)}else if(!n&&r)if(o(t.start,e.start)>=0)m(t,e,1);else{if(!(o(t.start,e.start)<=0))return null;m(e,t,1)}else if(!n&&!r)if(o(t.start,e.start)>=0)m(t,e,1);else{if(!(o(t.end,e.start)<=0))return null;m(e,t,-1)}return[t,e]}function d(e,t){for(var n=e.length;n--;)for(var r=0;r<t.length;r++)if(!p(e[n],t[r])){while(n<e.length){while(r--)p(t[r],e[n]);r=t.length,n++}return[e,t]}return e.selectionBefore=t.selectionBefore=e.selectionAfter=t.selectionAfter=null,[t,e]}function v(e,t){var n=e.action=="insert",r=t.action=="insert";if(n&&r)o(e.start,t.start)<0?m(t,e,1):m(e,t,1);else if(n&&!r)o(e.start,t.end)>=0?m(e,t,-1):o(e.start,t.start)<=0?m(t,e,1):(m(e,s.fromPoints(t.start,e.start),-1),m(t,e,1));else if(!n&&r)o(t.start,e.end)>=0?m(t,e,-1):o(t.start,e.start)<=0?m(e,t,1):(m(t,s.fromPoints(e.start,t.start),-1),m(e,t,1));else if(!n&&!r)if(o(t.start,e.end)>=0)m(t,e,-1);else{if(!(o(t.end,e.start)<=0)){var i,u;return o(e.start,t.start)<0&&(i=e,e=y(e,t.start)),o(e.end,t.end)>0&&(u=y(e,t.end)),g(t.end,e.start,e.end,-1),u&&!i&&(e.lines=u.lines,e.start=u.start,e.end=u.end,u=e),[t,i,u].filter(Boolean)}m(e,t,-1)}return[t,e]}function m(e,t,n){g(e.start,t.start,t.end,n),g(e.end,t.start,t.end,n)}function g(e,t,n,r){e.row==(r==1?t:n).row&&(e.column+=r*(n.column-t.column)),e.row+=r*(n.row-t.row)}function y(e,t){var n=e.lines,r=e.end;e.end=f(t);var i=e.end.row-e.start.row,s=n.splice(i,n.length),o=i?t.column:t.column-e.start.column;n.push(s[0].substring(0,o)),s[0]=s[0].substr(o);var u={start:f(t),end:r,lines:s,action:e.action};return u}function b(e,t){t=l(t);for(var n=e.length;n--;){var r=e[n];for(var i=0;i<r.length;i++){var s=r[i],o=v(s,t);t=o[0],o.length!=2&&(o[2]?(r.splice(i+1,1,o[1],o[2]),i++):o[1]||(r.splice(i,1),i--))}r.length||e.splice(n,1)}return e}function w(e,t){for(var n=0;n<t.length;n++){var r=t[n];for(var i=0;i<r.length;i++)b(e,r[i])}}var r=function(){this.$maxRev=0,this.$fromUndo=!1,this.reset()};(function(){this.addSession=function(e){this.$session=e},this.add=function(e,t,n){if(this.$fromUndo)return;if(e==this.$lastDelta)return;this.$keepRedoStack||(this.$redoStack.length=0);if(t===!1||!this.lastDeltas)this.lastDeltas=[],this.$undoStack.push(this.lastDeltas),e.id=this.$rev=++this.$maxRev;if(e.action=="remove"||e.action=="insert")this.$lastDelta=e;this.lastDeltas.push(e)},this.addSelection=function(e,t){this.selections.push({value:e,rev:t||this.$rev})},this.startNewGroup=function(){return this.lastDeltas=null,this.$rev},this.markIgnored=function(e,t){t==null&&(t=this.$rev+1);var n=this.$undoStack;for(var r=n.length;r--;){var i=n[r][0];if(i.id<=e)break;i.id<t&&(i.ignore=!0)}this.lastDeltas=null},this.getSelection=function(e,t){var n=this.selections;for(var r=n.length;r--;){var i=n[r];if(i.rev<e)return t&&(i=n[r+1]),i}},this.getRevision=function(){return this.$rev},this.getDeltas=function(e,t){t==null&&(t=this.$rev+1);var n=this.$undoStack,r=null,i=0;for(var s=n.length;s--;){var o=n[s][0];o.id<t&&!r&&(r=s+1);if(o.id<=e){i=s+1;break}}return n.slice(i,r)},this.getChangedRanges=function(e,t){t==null&&(t=this.$rev+1)},this.getChangedLines=function(e,t){t==null&&(t=this.$rev+1)},this.validateDeltaBoundaries=function(e,t,n){return e?e.every(function(e){var r=e.action;n&&e.action==="insert"&&(r="remove"),n&&e.action==="remove"&&(r="insert");switch(r){case"insert":return e.start.row<=t;case"remove":return e.start.row<t&&e.end.row<t;default:return!0}}):!1},this.undo=function(e,t){this.lastDeltas=null;var n=this.$undoStack;if(!i(n,n.length))return;e||(e=this.$session),this.$redoStackBaseRev!==this.$rev&&this.$redoStack.length&&(this.$redoStack=[]),this.$fromUndo=!0;var r=n.pop(),s=null;return this.validateDeltaBoundaries(r,e.getLength(),!0)&&(s=e.undoChanges(r,t),this.$redoStack.push(r),this.$syncRev()),this.$fromUndo=!1,s},this.redo=function(e,t){this.lastDeltas=null,e||(e=this.$session),this.$fromUndo=!0;if(this.$redoStackBaseRev!=this.$rev){var n=this.getDeltas(this.$redoStackBaseRev,this.$rev+1);w(this.$redoStack,n),this.$redoStackBaseRev=this.$rev,this.$redoStack.forEach(function(e){e[0].id=++this.$maxRev},this)}var r=this.$redoStack.pop(),i=null;return this.validateDeltaBoundaries(r,e.getLength(),!1)&&(i=e.redoChanges(r,t),this.$undoStack.push(r),this.$syncRev()),this.$fromUndo=!1,i},this.$syncRev=function(){var e=this.$undoStack,t=e[e.length-1],n=t&&t[0].id||0;this.$redoStackBaseRev=n,this.$rev=n},this.reset=function(){this.lastDeltas=null,this.$lastDelta=null,this.$undoStack=[],this.$redoStack=[],this.$rev=0,this.mark=0,this.$redoStackBaseRev=this.$rev,this.selections=[]},this.canUndo=function(){return this.$undoStack.length>0},this.canRedo=function(){return this.$redoStack.length>0},this.bookmark=function(e){e==undefined&&(e=this.$rev),this.mark=e},this.isAtBookmark=function(){return this.$rev===this.mark},this.toJSON=function(){},this.fromJSON=function(){},this.hasUndo=this.canUndo,this.hasRedo=this.canRedo,this.isClean=this.isAtBookmark,this.markClean=this.bookmark,this.$prettyPrint=function(e){return e?c(e):c(this.$undoStack)+"\n---\n"+c(this.$redoStack)}}).call(r.prototype);var s=e("./range").Range,o=s.comparePoints,u=s.comparePoints;t.UndoManager=r}),define("ace/layer/lines",["require","exports","module","ace/lib/dom"],function(e,t,n){"use strict";var r=e("../lib/dom"),i=function(e,t){this.element=e,this.canvasHeight=t||5e5,this.element.style.height=this.canvasHeight*2+"px",this.cells=[],this.cellCache=[],this.$offsetCoefficient=0};(function(){this.moveContainer=function(e){r.translate(this.element,0,-(e.firstRowScreen*e.lineHeight%this.canvasHeight)-e.offset*this.$offsetCoefficient)},this.pageChanged=function(e,t){return Math.floor(e.firstRowScreen*e.lineHeight/this.canvasHeight)!==Math.floor(t.firstRowScreen*t.lineHeight/this.canvasHeight)},this.computeLineTop=function(e,t,n){var r=t.firstRowScreen*t.lineHeight,i=Math.floor(r/this.canvasHeight),s=n.documentToScreenRow(e,0)*t.lineHeight;return s-i*this.canvasHeight},this.computeLineHeight=function(e,t,n){return t.lineHeight*n.getRowLineCount(e)},this.getLength=function(){return this.cells.length},this.get=function(e){return this.cells[e]},this.shift=function(){this.$cacheCell(this.cells.shift())},this.pop=function(){this.$cacheCell(this.cells.pop())},this.push=function(e){if(Array.isArray(e)){this.cells.push.apply(this.cells,e);var t=r.createFragment(this.element);for(var n=0;n<e.length;n++)t.appendChild(e[n].element);this.element.appendChild(t)}else this.cells.push(e),this.element.appendChild(e.element)},this.unshift=function(e){if(Array.isArray(e)){this.cells.unshift.apply(this.cells,e);var t=r.createFragment(this.element);for(var n=0;n<e.length;n++)t.appendChild(e[n].element);this.element.firstChild?this.element.insertBefore(t,this.element.firstChild):this.element.appendChild(t)}else this.cells.unshift(e),this.element.insertAdjacentElement("afterbegin",e.element)},this.last=function(){return this.cells.length?this.cells[this.cells.length-1]:null},this.$cacheCell=function(e){if(!e)return;e.element.remove(),this.cellCache.push(e)},this.createCell=function(e,t,n,i){var s=this.cellCache.pop();if(!s){var o=r.createElement("div");i&&i(o),this.element.appendChild(o),s={element:o,text:"",row:e}}return s.row=e,s}}).call(i.prototype),t.Lines=i}),define("ace/layer/gutter",["require","exports","module","ace/lib/dom","ace/lib/oop","ace/lib/lang","ace/lib/event_emitter","ace/layer/lines"],function(e,t,n){"use strict";function f(e){var t=document.createTextNode("");e.appendChild(t);var n=r.createElement("span");return e.appendChild(n),e}var r=e("../lib/dom"),i=e("../lib/oop"),s=e("../lib/lang"),o=e("../lib/event_emitter").EventEmitter,u=e("./lines").Lines,a=function(e){this.element=r.createElement("div"),this.element.className="ace_layer ace_gutter-layer",e.appendChild(this.element),this.setShowFoldWidgets(this.$showFoldWidgets),this.gutterWidth=0,this.$annotations=[],this.$updateAnnotations=this.$updateAnnotations.bind(this),this.$lines=new u(this.element),this.$lines.$offsetCoefficient=1};(function(){i.implement(this,o),this.setSession=function(e){this.session&&this.session.removeEventListener("change",this.$updateAnnotations),this.session=e,e&&e.on("change",this.$updateAnnotations)},this.addGutterDecoration=function(e,t){window.console&&console.warn&&console.warn("deprecated use session.addGutterDecoration"),this.session.addGutterDecoration(e,t)},this.removeGutterDecoration=function(e,t){window.console&&console.warn&&console.warn("deprecated use session.removeGutterDecoration"),this.session.removeGutterDecoration(e,t)},this.setAnnotations=function(e){this.$annotations=[];for(var t=0;t<e.length;t++){var n=e[t],r=n.row,i=this.$annotations[r];i||(i=this.$annotations[r]={text:[]});var o=n.text;o=o?s.escapeHTML(o):n.html||"",i.text.indexOf(o)===-1&&i.text.push(o);var u=n.type;u=="error"?i.className=" ace_error":u=="warning"&&i.className!=" ace_error"?i.className=" ace_warning":u=="info"&&!i.className&&(i.className=" ace_info")}},this.$updateAnnotations=function(e){if(!this.$annotations.length)return;var t=e.start.row,n=e.end.row-t;if(n!==0)if(e.action=="remove")this.$annotations.splice(t,n+1,null);else{var r=new Array(n+1);r.unshift(t,1),this.$annotations.splice.apply(this.$annotations,r)}},this.update=function(e){this.config=e;var t=this.session,n=e.firstRow,r=Math.min(e.lastRow+e.gutterOffset,t.getLength()-1);this.oldLastRow=r,this.config=e,this.$lines.moveContainer(e),this.$updateCursorRow();var i=t.getNextFoldLine(n),s=i?i.start.row:Infinity,o=null,u=-1,a=n;for(;;){a>s&&(a=i.end.row+1,i=t.getNextFoldLine(a,i),s=i?i.start.row:Infinity);if(a>r){while(this.$lines.getLength()>u+1)this.$lines.pop();break}o=this.$lines.get(++u),o?o.row=a:(o=this.$lines.createCell(a,e,this.session,f),this.$lines.push(o)),this.$renderCell(o,e,i,a),a++}this._signal("afterRender"),this.$updateGutterWidth(e)},this.$updateGutterWidth=function(e){var t=this.session,n=t.gutterRenderer||this.$renderer,r=t.$firstLineNumber,i=this.$lines.last()?this.$lines.last().text:"";if(this.$fixedWidth||t.$useWrapMode)i=t.getLength()+r-1;var s=n?n.getWidth(t,i,e):i.toString().length*e.characterWidth,o=this.$padding||this.$computePadding();s+=o.left+o.right,s!==this.gutterWidth&&!isNaN(s)&&(this.gutterWidth=s,this.element.parentNode.style.width=this.element.style.width=Math.ceil(this.gutterWidth)+"px",this._signal("changeGutterWidth",s))},this.$updateCursorRow=function(){if(!this.$highlightGutterLine)return;var e=this.session.selection.getCursor();if(this.$cursorRow===e.row)return;this.$cursorRow=e.row},this.updateLineHighlight=function(){if(!this.$highlightGutterLine)return;var e=this.session.selection.cursor.row;this.$cursorRow=e;if(this.$cursorCell&&this.$cursorCell.row==e)return;this.$cursorCell&&(this.$cursorCell.element.className=this.$cursorCell.element.className.replace("ace_gutter-active-line ",""));var t=this.$lines.cells;this.$cursorCell=null;for(var n=0;n<t.length;n++){var r=t[n];if(r.row>=this.$cursorRow){if(r.row>this.$cursorRow){var i=this.session.getFoldLine(this.$cursorRow);if(!(n>0&&i&&i.start.row==t[n-1].row))break;r=t[n-1]}r.element.className="ace_gutter-active-line "+r.element.className,this.$cursorCell=r;break}}},this.scrollLines=function(e){var t=this.config;this.config=e,this.$updateCursorRow();if(this.$lines.pageChanged(t,e))return this.update(e);this.$lines.moveContainer(e);var n=Math.min(e.lastRow+e.gutterOffset,this.session.getLength()-1),r=this.oldLastRow;this.oldLastRow=n;if(!t||r<e.firstRow)return this.update(e);if(n<t.firstRow)return this.update(e);if(t.firstRow<e.firstRow)for(var i=this.session.getFoldedRowCount(t.firstRow,e.firstRow-1);i>0;i--)this.$lines.shift();if(r>n)for(var i=this.session.getFoldedRowCount(n+1,r);i>0;i--)this.$lines.pop();e.firstRow<t.firstRow&&this.$lines.unshift(this.$renderLines(e,e.firstRow,t.firstRow-1)),n>r&&this.$lines.push(this.$renderLines(e,r+1,n)),this.updateLineHighlight(),this._signal("afterRender"),this.$updateGutterWidth(e)},this.$renderLines=function(e,t,n){var r=[],i=t,s=this.session.getNextFoldLine(i),o=s?s.start.row:Infinity;for(;;){i>o&&(i=s.end.row+1,s=this.session.getNextFoldLine(i,s),o=s?s.start.row:Infinity);if(i>n)break;var u=this.$lines.createCell(i,e,this.session,f);this.$renderCell(u,e,s,i),r.push(u),i++}return r},this.$renderCell=function(e,t,n,i){var s=e.element,o=this.session,u=s.childNodes[0],a=s.childNodes[1],f=o.$firstLineNumber,l=o.$breakpoints,c=o.$decorations,h=o.gutterRenderer||this.$renderer,p=this.$showFoldWidgets&&o.foldWidgets,d=n?n.start.row:Number.MAX_VALUE,v="ace_gutter-cell ";this.$highlightGutterLine&&(i==this.$cursorRow||n&&i<this.$cursorRow&&i>=d&&this.$cursorRow<=n.end.row)&&(v+="ace_gutter-active-line ",this.$cursorCell!=e&&(this.$cursorCell&&(this.$cursorCell.element.className=this.$cursorCell.element.className.replace("ace_gutter-active-line ","")),this.$cursorCell=e)),l[i]&&(v+=l[i]),c[i]&&(v+=c[i]),this.$annotations[i]&&(v+=this.$annotations[i].className),s.className!=v&&(s.className=v);if(p){var m=p[i];m==null&&(m=p[i]=o.getFoldWidget(i))}if(m){var v="ace_fold-widget ace_"+m;m=="start"&&i==d&&i<n.end.row?v+=" ace_closed":v+=" ace_open",a.className!=v&&(a.className=v);var g=t.lineHeight+"px";r.setStyle(a.style,"height",g),r.setStyle(a.style,"display","inline-block")}else a&&r.setStyle(a.style,"display","none");var y=(h?h.getText(o,i):i+f).toString();return y!==u.data&&(u.data=y),r.setStyle(e.element.style,"height",this.$lines.computeLineHeight(i,t,o)+"px"),r.setStyle(e.element.style,"top",this.$lines.computeLineTop(i,t,o)+"px"),e.text=y,e},this.$fixedWidth=!1,this.$highlightGutterLine=!0,this.$renderer="",this.setHighlightGutterLine=function(e){this.$highlightGutterLine=e},this.$showLineNumbers=!0,this.$renderer="",this.setShowLineNumbers=function(e){this.$renderer=!e&&{getWidth:function(){return 0},getText:function(){return""}}},this.getShowLineNumbers=function(){return this.$showLineNumbers},this.$showFoldWidgets=!0,this.setShowFoldWidgets=function(e){e?r.addCssClass(this.element,"ace_folding-enabled"):r.removeCssClass(this.element,"ace_folding-enabled"),this.$showFoldWidgets=e,this.$padding=null},this.getShowFoldWidgets=function(){return this.$showFoldWidgets},this.$computePadding=function(){if(!this.element.firstChild)return{left:0,right:0};var e=r.computedStyle(this.element.firstChild);return this.$padding={},this.$padding.left=(parseInt(e.borderLeftWidth)||0)+(parseInt(e.paddingLeft)||0)+1,this.$padding.right=(parseInt(e.borderRightWidth)||0)+(parseInt(e.paddingRight)||0),this.$padding},this.getRegion=function(e){var t=this.$padding||this.$computePadding(),n=this.element.getBoundingClientRect();if(e.x<t.left+n.left)return"markers";if(this.$showFoldWidgets&&e.x>n.right-t.right)return"foldWidgets"}}).call(a.prototype),t.Gutter=a}),define("ace/layer/marker",["require","exports","module","ace/range","ace/lib/dom"],function(e,t,n){"use strict";var r=e("../range").Range,i=e("../lib/dom"),s=function(e){this.element=i.createElement("div"),this.element.className="ace_layer ace_marker-layer",e.appendChild(this.element)};(function(){function e(e,t,n,r){return(e?1:0)|(t?2:0)|(n?4:0)|(r?8:0)}this.$padding=0,this.setPadding=function(e){this.$padding=e},this.setSession=function(e){this.session=e},this.setMarkers=function(e){this.markers=e},this.elt=function(e,t){var n=this.i!=-1&&this.element.childNodes[this.i];n?this.i++:(n=document.createElement("div"),this.element.appendChild(n),this.i=-1),n.style.cssText=t,n.className=e},this.update=function(e){if(!e)return;this.config=e,this.i=0;var t;for(var n in this.markers){var r=this.markers[n];if(!r.range){r.update(t,this,this.session,e);continue}var i=r.range.clipRows(e.firstRow,e.lastRow);if(i.isEmpty())continue;i=i.toScreenRange(this.session);if(r.renderer){var s=this.$getTop(i.start.row,e),o=this.$padding+i.start.column*e.characterWidth;r.renderer(t,i,o,s,e)}else r.type=="fullLine"?this.drawFullLineMarker(t,i,r.clazz,e):r.type=="screenLine"?this.drawScreenLineMarker(t,i,r.clazz,e):i.isMultiLine()?r.type=="text"?this.drawTextMarker(t,i,r.clazz,e):this.drawMultiLineMarker(t,i,r.clazz,e):this.drawSingleLineMarker(t,i,r.clazz+" ace_start"+" ace_br15",e)}if(this.i!=-1)while(this.i<this.element.childElementCount)this.element.removeChild(this.element.lastChild)},this.$getTop=function(e,t){return(e-t.firstRowScreen)*t.lineHeight},this.drawTextMarker=function(t,n,i,s,o){var u=this.session,a=n.start.row,f=n.end.row,l=a,c=0,h=0,p=u.getScreenLastRowColumn(l),d=new r(l,n.start.column,l,h);for(;l<=f;l++)d.start.row=d.end.row=l,d.start.column=l==a?n.start.column:u.getRowWrapIndent(l),d.end.column=p,c=h,h=p,p=l+1<f?u.getScreenLastRowColumn(l+1):l==f?0:n.end.column,this.drawSingleLineMarker(t,d,i+(l==a?" ace_start":"")+" ace_br"+e(l==a||l==a+1&&n.start.column,c<h,h>p,l==f),s,l==f?0:1,o)},this.drawMultiLineMarker=function(e,t,n,r,i){var s=this.$padding,o=r.lineHeight,u=this.$getTop(t.start.row,r),a=s+t.start.column*r.characterWidth;i=i||"";if(this.session.$bidiHandler.isBidiRow(t.start.row)){var f=t.clone();f.end.row=f.start.row,f.end.column=this.session.getLine(f.start.row).length,this.drawBidiSingleLineMarker(e,f,n+" ace_br1 ace_start",r,null,i)}else this.elt(n+" ace_br1 ace_start","height:"+o+"px;"+"right:0;"+"top:"+u+"px;left:"+a+"px;"+(i||""));if(this.session.$bidiHandler.isBidiRow(t.end.row)){var f=t.clone();f.start.row=f.end.row,f.start.column=0,this.drawBidiSingleLineMarker(e,f,n+" ace_br12",r,null,i)}else{u=this.$getTop(t.end.row,r);var l=t.end.column*r.characterWidth;this.elt(n+" ace_br12","height:"+o+"px;"+"width:"+l+"px;"+"top:"+u+"px;"+"left:"+s+"px;"+(i||""))}o=(t.end.row-t.start.row-1)*r.lineHeight;if(o<=0)return;u=this.$getTop(t.start.row+1,r);var c=(t.start.column?1:0)|(t.end.column?0:8);this.elt(n+(c?" ace_br"+c:""),"height:"+o+"px;"+"right:0;"+"top:"+u+"px;"+"left:"+s+"px;"+(i||""))},this.drawSingleLineMarker=function(e,t,n,r,i,s){if(this.session.$bidiHandler.isBidiRow(t.start.row))return this.drawBidiSingleLineMarker(e,t,n,r,i,s);var o=r.lineHeight,u=(t.end.column+(i||0)-t.start.column)*r.characterWidth,a=this.$getTop(t.start.row,r),f=this.$padding+t.start.column*r.characterWidth;this.elt(n,"height:"+o+"px;"+"width:"+u+"px;"+"top:"+a+"px;"+"left:"+f+"px;"+(s||""))},this.drawBidiSingleLineMarker=function(e,t,n,r,i,s){var o=r.lineHeight,u=this.$getTop(t.start.row,r),a=this.$padding,f=this.session.$bidiHandler.getSelections(t.start.column,t.end.column);f.forEach(function(e){this.elt(n,"height:"+o+"px;"+"width:"+e.width+(i||0)+"px;"+"top:"+u+"px;"+"left:"+(a+e.left)+"px;"+(s||""))},this)},this.drawFullLineMarker=function(e,t,n,r,i){var s=this.$getTop(t.start.row,r),o=r.lineHeight;t.start.row!=t.end.row&&(o+=this.$getTop(t.end.row,r)-s),this.elt(n,"height:"+o+"px;"+"top:"+s+"px;"+"left:0;right:0;"+(i||""))},this.drawScreenLineMarker=function(e,t,n,r,i){var s=this.$getTop(t.start.row,r),o=r.lineHeight;this.elt(n,"height:"+o+"px;"+"top:"+s+"px;"+"left:0;right:0;"+(i||""))}}).call(s.prototype),t.Marker=s}),define("ace/layer/text",["require","exports","module","ace/lib/oop","ace/lib/dom","ace/lib/lang","ace/layer/lines","ace/lib/event_emitter"],function(e,t,n){"use strict";var r=e("../lib/oop"),i=e("../lib/dom"),s=e("../lib/lang"),o=e("./lines").Lines,u=e("../lib/event_emitter").EventEmitter,a=function(e){this.dom=i,this.element=this.dom.createElement("div"),this.element.className="ace_layer ace_text-layer",e.appendChild(this.element),this.$updateEolChar=this.$updateEolChar.bind(this),this.$lines=new o(this.element)};(function(){r.implement(this,u),this.EOF_CHAR="\u00b6",this.EOL_CHAR_LF="\u00ac",this.EOL_CHAR_CRLF="\u00a4",this.EOL_CHAR=this.EOL_CHAR_LF,this.TAB_CHAR="\u2014",this.SPACE_CHAR="\u00b7",this.$padding=0,this.MAX_LINE_LENGTH=1e4,this.$updateEolChar=function(){var e=this.session.doc,t=e.getNewLineCharacter()=="\n"&&e.getNewLineMode()!="windows",n=t?this.EOL_CHAR_LF:this.EOL_CHAR_CRLF;if(this.EOL_CHAR!=n)return this.EOL_CHAR=n,!0},this.setPadding=function(e){this.$padding=e,this.element.style.margin="0 "+e+"px"},this.getLineHeight=function(){return this.$fontMetrics.$characterSize.height||0},this.getCharacterWidth=function(){return this.$fontMetrics.$characterSize.width||0},this.$setFontMetrics=function(e){this.$fontMetrics=e,this.$fontMetrics.on("changeCharacterSize",function(e){this._signal("changeCharacterSize",e)}.bind(this)),this.$pollSizeChanges()},this.checkForSizeChanges=function(){this.$fontMetrics.checkForSizeChanges()},this.$pollSizeChanges=function(){return this.$pollSizeChangesTimer=this.$fontMetrics.$pollSizeChanges()},this.setSession=function(e){this.session=e,e&&this.$computeTabString()},this.showInvisibles=!1,this.setShowInvisibles=function(e){return this.showInvisibles==e?!1:(this.showInvisibles=e,this.$computeTabString(),!0)},this.displayIndentGuides=!0,this.setDisplayIndentGuides=function(e){return this.displayIndentGuides==e?!1:(this.displayIndentGuides=e,this.$computeTabString(),!0)},this.$tabStrings=[],this.onChangeTabSize=this.$computeTabString=function(){var e=this.session.getTabSize();this.tabSize=e;var t=this.$tabStrings=[0];for(var n=1;n<e+1;n++)if(this.showInvisibles){var r=this.dom.createElement("span");r.className="ace_invisible ace_invisible_tab",r.textContent=s.stringRepeat(this.TAB_CHAR,n),t.push(r)}else t.push(this.dom.createTextNode(s.stringRepeat(" ",n),this.element));if(this.displayIndentGuides){this.$indentGuideRe=/\s\S| \t|\t |\s$/;var i="ace_indent-guide",o="",u="";if(this.showInvisibles){i+=" ace_invisible",o=" ace_invisible_space",u=" ace_invisible_tab";var a=s.stringRepeat(this.SPACE_CHAR,this.tabSize),f=s.stringRepeat(this.TAB_CHAR,this.tabSize)}else var a=s.stringRepeat(" ",this.tabSize),f=a;var r=this.dom.createElement("span");r.className=i+o,r.textContent=a,this.$tabStrings[" "]=r;var r=this.dom.createElement("span");r.className=i+u,r.textContent=f,this.$tabStrings["	"]=r}},this.updateLines=function(e,t,n){if(this.config.lastRow!=e.lastRow||this.config.firstRow!=e.firstRow)return this.update(e);this.config=e;var r=Math.max(t,e.firstRow),i=Math.min(n,e.lastRow),s=this.element.childNodes,o=0;for(var u=e.firstRow;u<r;u++){var a=this.session.getFoldLine(u);if(a){if(a.containsRow(r)){r=a.start.row;break}u=a.end.row}o++}var f=!1,u=r,a=this.session.getNextFoldLine(u),l=a?a.start.row:Infinity;for(;;){u>l&&(u=a.end.row+1,a=this.session.getNextFoldLine(u,a),l=a?a.start.row:Infinity);if(u>i)break;var c=s[o++];if(c){this.dom.removeChildren(c),this.$renderLine(c,u,u==l?a:!1),f&&(c.style.top=this.$lines.computeLineTop(u,e,this.session)+"px");var h=e.lineHeight*this.session.getRowLength(u)+"px";c.style.height!=h&&(f=!0,c.style.height=h)}u++}if(f)while(o<this.$lines.cells.length){var p=this.$lines.cells[o++];p.element.style.top=this.$lines.computeLineTop(p.row,e,this.session)+"px"}},this.scrollLines=function(e){var t=this.config;this.config=e;if(this.$lines.pageChanged(t,e))return this.update(e);this.$lines.moveContainer(e);var n=e.lastRow,r=t?t.lastRow:-1;if(!t||r<e.firstRow)return this.update(e);if(n<t.firstRow)return this.update(e);if(!t||t.lastRow<e.firstRow)return this.update(e);if(e.lastRow<t.firstRow)return this.update(e);if(t.firstRow<e.firstRow)for(var i=this.session.getFoldedRowCount(t.firstRow,e.firstRow-1);i>0;i--)this.$lines.shift();if(t.lastRow>e.lastRow)for(var i=this.session.getFoldedRowCount(e.lastRow+1,t.lastRow);i>0;i--)this.$lines.pop();e.firstRow<t.firstRow&&this.$lines.unshift(this.$renderLinesFragment(e,e.firstRow,t.firstRow-1)),e.lastRow>t.lastRow&&this.$lines.push(this.$renderLinesFragment(e,t.lastRow+1,e.lastRow))},this.$renderLinesFragment=function(e,t,n){var r=[],s=t,o=this.session.getNextFoldLine(s),u=o?o.start.row:Infinity;for(;;){s>u&&(s=o.end.row+1,o=this.session.getNextFoldLine(s,o),u=o?o.start.row:Infinity);if(s>n)break;var a=this.$lines.createCell(s,e,this.session),f=a.element;this.dom.removeChildren(f),i.setStyle(f.style,"height",this.$lines.computeLineHeight(s,e,this.session)+"px"),i.setStyle(f.style,"top",this.$lines.computeLineTop(s,e,this.session)+"px"),this.$renderLine(f,s,s==u?o:!1),this.$useLineGroups()?f.className="ace_line_group":f.className="ace_line",r.push(a),s++}return r},this.update=function(e){this.$lines.moveContainer(e),this.config=e;var t=e.firstRow,n=e.lastRow,r=this.$lines;while(r.getLength())r.pop();r.push(this.$renderLinesFragment(e,t,n))},this.$textToken={text:!0,rparen:!0,lparen:!0},this.$renderToken=function(e,t,n,r){var i=this,o=/(\t)|( +)|([\x00-\x1f\x80-\xa0\xad\u1680\u180E\u2000-\u200f\u2028\u2029\u202F\u205F\uFEFF\uFFF9-\uFFFC]+)|(\u3000)|([\u1100-\u115F\u11A3-\u11A7\u11FA-\u11FF\u2329-\u232A\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFB\u3001-\u303E\u3041-\u3096\u3099-\u30FF\u3105-\u312D\u3131-\u318E\u3190-\u31BA\u31C0-\u31E3\u31F0-\u321E\u3220-\u3247\u3250-\u32FE\u3300-\u4DBF\u4E00-\uA48C\uA490-\uA4C6\uA960-\uA97C\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFAFF\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE66\uFE68-\uFE6B\uFF01-\uFF60\uFFE0-\uFFE6]|[\uD800-\uDBFF][\uDC00-\uDFFF])/g,u=this.dom.createFragment(this.element),a,f=0;while(a=o.exec(r)){var l=a[1],c=a[2],h=a[3],p=a[4],d=a[5];if(!i.showInvisibles&&c)continue;var v=f!=a.index?r.slice(f,a.index):"";f=a.index+a[0].length,v&&u.appendChild(this.dom.createTextNode(v,this.element));if(l){var m=i.session.getScreenTabSize(t+a.index);u.appendChild(i.$tabStrings[m].cloneNode(!0)),t+=m-1}else if(c)if(i.showInvisibles){var g=this.dom.createElement("span");g.className="ace_invisible ace_invisible_space",g.textContent=s.stringRepeat(i.SPACE_CHAR,c.length),u.appendChild(g)}else u.appendChild(this.com.createTextNode(c,this.element));else if(h){var g=this.dom.createElement("span");g.className="ace_invisible ace_invisible_space ace_invalid",g.textContent=s.stringRepeat(i.SPACE_CHAR,h.length),u.appendChild(g)}else if(p){t+=1;var g=this.dom.createElement("span");g.style.width=i.config.characterWidth*2+"px",g.className=i.showInvisibles?"ace_cjk ace_invisible ace_invisible_space":"ace_cjk",g.textContent=i.showInvisibles?i.SPACE_CHAR:p,u.appendChild(g)}else if(d){t+=1;var g=this.dom.createElement("span");g.style.width=i.config.characterWidth*2+"px",g.className="ace_cjk",g.textContent=d,u.appendChild(g)}}u.appendChild(this.dom.createTextNode(f?r.slice(f):r,this.element));if(!this.$textToken[n.type]){var y="ace_"+n.type.replace(/\./g," ace_"),g=this.dom.createElement("span");n.type=="fold"&&(g.style.width=n.value.length*this.config.characterWidth+"px"),g.className=y,g.appendChild(u),e.appendChild(g)}else e.appendChild(u);return t+r.length},this.renderIndentGuide=function(e,t,n){var r=t.search(this.$indentGuideRe);if(r<=0||r>=n)return t;if(t[0]==" "){r-=r%this.tabSize;var i=r/this.tabSize;for(var s=0;s<i;s++)e.appendChild(this.$tabStrings[" "].cloneNode(!0));return t.substr(r)}if(t[0]=="	"){for(var s=0;s<r;s++)e.appendChild(this.$tabStrings["	"].cloneNode(!0));return t.substr(r)}return t},this.$createLineElement=function(e){var t=this.dom.createElement("div");return t.className="ace_line",t.style.height=this.config.lineHeight+"px",t},this.$renderWrappedLine=function(e,t,n){var r=0,i=0,o=n[0],u=0,a=this.$createLineElement();e.appendChild(a);for(var f=0;f<t.length;f++){var l=t[f],c=l.value;if(f==0&&this.displayIndentGuides){r=c.length,c=this.renderIndentGuide(a,c,o);if(!c)continue;r-=c.length}if(r+c.length<o)u=this.$renderToken(a,u,l,c),r+=c.length;else{while(r+c.length>=o)u=this.$renderToken(a,u,l,c.substring(0,o-r)),c=c.substring(o-r),r=o,a=this.$createLineElement(),e.appendChild(a),a.appendChild(this.dom.createTextNode(s.stringRepeat("\u00a0",n.indent),this.element)),i++,u=0,o=n[i]||Number.MAX_VALUE;c.length!=0&&(r+=c.length,u=this.$renderToken(a,u,l,c))}}n[n.length-1]>this.MAX_LINE_LENGTH&&this.$renderOverflowMessage(a,u,null,"",!0)},this.$renderSimpleLine=function(e,t){var n=0,r=t[0],i=r.value;this.displayIndentGuides&&(i=this.renderIndentGuide(e,i)),i&&(n=this.$renderToken(e,n,r,i));for(var s=1;s<t.length;s++){r=t[s],i=r.value;if(n+i.length>this.MAX_LINE_LENGTH)return this.$renderOverflowMessage(e,n,r,i);n=this.$renderToken(e,n,r,i)}},this.$renderOverflowMessage=function(e,t,n,r,i){n&&this.$renderToken(e,t,n,r.slice(0,this.MAX_LINE_LENGTH-t));var s=this.dom.createElement("span");s.className="ace_inline_button ace_keyword ace_toggle_wrap",s.textContent=i?"<hide>":"<click to see more...>",e.appendChild(s)},this.$renderLine=function(e,t,n){!n&&n!=0&&(n=this.session.getFoldLine(t));if(n)var r=this.$getFoldLineTokens(t,n);else var r=this.session.getTokens(t);var i=e;if(r.length){var s=this.session.getRowSplitData(t);if(s&&s.length){this.$renderWrappedLine(e,r,s);var i=e.lastChild}else{var i=e;this.$useLineGroups()&&(i=this.$createLineElement(),e.appendChild(i)),this.$renderSimpleLine(i,r)}}else this.$useLineGroups()&&(i=this.$createLineElement(),e.appendChild(i));if(this.showInvisibles&&i){n&&(t=n.end.row);var o=this.dom.createElement("span");o.className="ace_invisible ace_invisible_eol",o.textContent=t==this.session.getLength()-1?this.EOF_CHAR:this.EOL_CHAR,i.appendChild(o)}},this.$getFoldLineTokens=function(e,t){function i(e,t,n){var i=0,s=0;while(s+e[i].value.length<t){s+=e[i].value.length,i++;if(i==e.length)return}if(s!=t){var o=e[i].value.substring(t-s);o.length>n-t&&(o=o.substring(0,n-t)),r.push({type:e[i].type,value:o}),s=t+o.length,i+=1}while(s<n&&i<e.length){var o=e[i].value;o.length+s>n?r.push({type:e[i].type,value:o.substring(0,n-s)}):r.push(e[i]),s+=o.length,i+=1}}var n=this.session,r=[],s=n.getTokens(e);return t.walk(function(e,t,o,u,a){e!=null?r.push({type:"fold",value:e}):(a&&(s=n.getTokens(t)),s.length&&i(s,u,o))},t.end.row,this.session.getLine(t.end.row).length),r},this.$useLineGroups=function(){return this.session.getUseWrapMode()},this.destroy=function(){}}).call(a.prototype),t.Text=a}),define("ace/layer/cursor",["require","exports","module","ace/lib/dom"],function(e,t,n){"use strict";var r=e("../lib/dom"),i=function(e){this.element=r.createElement("div"),this.element.className="ace_layer ace_cursor-layer",e.appendChild(this.element),this.isVisible=!1,this.isBlinking=!0,this.blinkInterval=1e3,this.smoothBlinking=!1,this.cursors=[],this.cursor=this.addCursor(),r.addCssClass(this.element,"ace_hidden-cursors"),this.$updateCursors=this.$updateOpacity.bind(this)};(function(){this.$updateOpacity=function(e){var t=this.cursors;for(var n=t.length;n--;)r.setStyle(t[n].style,"opacity",e?"":"0")},this.$startCssAnimation=function(){var e=this.cursors;for(var t=e.length;t--;)e[t].style.animationDuration=this.blinkInterval+"ms";setTimeout(function(){r.addCssClass(this.element,"ace_animate-blinking")}.bind(this))},this.$stopCssAnimation=function(){r.removeCssClass(this.element,"ace_animate-blinking")},this.$padding=0,this.setPadding=function(e){this.$padding=e},this.setSession=function(e){this.session=e},this.setBlinking=function(e){e!=this.isBlinking&&(this.isBlinking=e,this.restartTimer())},this.setBlinkInterval=function(e){e!=this.blinkInterval&&(this.blinkInterval=e,this.restartTimer())},this.setSmoothBlinking=function(e){e!=this.smoothBlinking&&(this.smoothBlinking=e,r.setCssClass(this.element,"ace_smooth-blinking",e),this.$updateCursors(!0),this.restartTimer())},this.addCursor=function(){var e=r.createElement("div");return e.className="ace_cursor",this.element.appendChild(e),this.cursors.push(e),e},this.removeCursor=function(){if(this.cursors.length>1){var e=this.cursors.pop();return e.parentNode.removeChild(e),e}},this.hideCursor=function(){this.isVisible=!1,r.addCssClass(this.element,"ace_hidden-cursors"),this.restartTimer()},this.showCursor=function(){this.isVisible=!0,r.removeCssClass(this.element,"ace_hidden-cursors"),this.restartTimer()},this.restartTimer=function(){var e=this.$updateCursors;clearInterval(this.intervalId),clearTimeout(this.timeoutId),this.$stopCssAnimation(),this.smoothBlinking&&r.removeCssClass(this.element,"ace_smooth-blinking"),e(!0);if(!this.isBlinking||!this.blinkInterval||!this.isVisible){this.$stopCssAnimation();return}this.smoothBlinking&&setTimeout(function(){r.addCssClass(this.element,"ace_smooth-blinking")}.bind(this));if(r.HAS_CSS_ANIMATION)this.$startCssAnimation();else{var t=function(){this.timeoutId=setTimeout(function(){e(!1)},.6*this.blinkInterval)}.bind(this);this.intervalId=setInterval(function(){e(!0),t()},this.blinkInterval),t()}},this.getPixelPosition=function(e,t){if(!this.config||!this.session)return{left:0,top:0};e||(e=this.session.selection.getCursor());var n=this.session.documentToScreenPosition(e),r=this.$padding+(this.session.$bidiHandler.isBidiRow(n.row,e.row)?this.session.$bidiHandler.getPosLeft(n.column):n.column*this.config.characterWidth),i=(n.row-(t?this.config.firstRowScreen:0))*this.config.lineHeight;return{left:r,top:i}},this.isCursorInView=function(e,t){return e.top>=0&&e.top<t.maxHeight},this.update=function(e){this.config=e;var t=this.session.$selectionMarkers,n=0,i=0;if(t===undefined||t.length===0)t=[{cursor:null}];for(var n=0,s=t.length;n<s;n++){var o=this.getPixelPosition(t[n].cursor,!0);if((o.top>e.height+e.offset||o.top<0)&&n>1)continue;var u=this.cursors[i++]||this.addCursor(),a=u.style;this.drawCursor?this.drawCursor(u,o,e,t[n],this.session):this.isCursorInView(o,e)?(r.setStyle(a,"display","block"),r.translate(u,o.left,o.top),r.setStyle(a,"width",Math.round(e.characterWidth)+"px"),r.setStyle(a,"height",e.lineHeight+"px")):r.setStyle(a,"display","none")}while(this.cursors.length>i)this.removeCursor();var f=this.session.getOverwrite();this.$setOverwrite(f),this.$pixelPos=o,this.restartTimer()},this.drawCursor=null,this.$setOverwrite=function(e){e!=this.overwrite&&(this.overwrite=e,e?r.addCssClass(this.element,"ace_overwrite-cursors"):r.removeCssClass(this.element,"ace_overwrite-cursors"))},this.destroy=function(){clearInterval(this.intervalId),clearTimeout(this.timeoutId)}}).call(i.prototype),t.Cursor=i}),define("ace/scrollbar",["require","exports","module","ace/lib/oop","ace/lib/dom","ace/lib/event","ace/lib/event_emitter"],function(e,t,n){"use strict";var r=e("./lib/oop"),i=e("./lib/dom"),s=e("./lib/event"),o=e("./lib/event_emitter").EventEmitter,u=32768,a=function(e){this.element=i.createElement("div"),this.element.className="ace_scrollbar ace_scrollbar"+this.classSuffix,this.inner=i.createElement("div"),this.inner.className="ace_scrollbar-inner",this.inner.textContent="\u00a0",this.element.appendChild(this.inner),e.appendChild(this.element),this.setVisible(!1),this.skipEvent=!1,s.addListener(this.element,"scroll",this.onScroll.bind(this)),s.addListener(this.element,"mousedown",s.preventDefault)};(function(){r.implement(this,o),this.setVisible=function(e){this.element.style.display=e?"":"none",this.isVisible=e,this.coeff=1}}).call(a.prototype);var f=function(e,t){a.call(this,e),this.scrollTop=0,this.scrollHeight=0,t.$scrollbarWidth=this.width=i.scrollbarWidth(e.ownerDocument),this.inner.style.width=this.element.style.width=(this.width||15)+5+"px",this.$minWidth=0};r.inherits(f,a),function(){this.classSuffix="-v",this.onScroll=function(){if(!this.skipEvent){this.scrollTop=this.element.scrollTop;if(this.coeff!=1){var e=this.element.clientHeight/this.scrollHeight;this.scrollTop=this.scrollTop*(1-e)/(this.coeff-e)}this._emit("scroll",{data:this.scrollTop})}this.skipEvent=!1},this.getWidth=function(){return Math.max(this.isVisible?this.width:0,this.$minWidth||0)},this.setHeight=function(e){this.element.style.height=e+"px"},this.setInnerHeight=this.setScrollHeight=function(e){this.scrollHeight=e,e>u?(this.coeff=u/e,e=u):this.coeff!=1&&(this.coeff=1),this.inner.style.height=e+"px"},this.setScrollTop=function(e){this.scrollTop!=e&&(this.skipEvent=!0,this.scrollTop=e,this.element.scrollTop=e*this.coeff)}}.call(f.prototype);var l=function(e,t){a.call(this,e),this.scrollLeft=0,this.height=t.$scrollbarWidth,this.inner.style.height=this.element.style.height=(this.height||15)+5+"px"};r.inherits(l,a),function(){this.classSuffix="-h",this.onScroll=function(){this.skipEvent||(this.scrollLeft=this.element.scrollLeft,this._emit("scroll",{data:this.scrollLeft})),this.skipEvent=!1},this.getHeight=function(){return this.isVisible?this.height:0},this.setWidth=function(e){this.element.style.width=e+"px"},this.setInnerWidth=function(e){this.inner.style.width=e+"px"},this.setScrollWidth=function(e){this.inner.style.width=e+"px"},this.setScrollLeft=function(e){this.scrollLeft!=e&&(this.skipEvent=!0,this.scrollLeft=this.element.scrollLeft=e)}}.call(l.prototype),t.ScrollBar=f,t.ScrollBarV=f,t.ScrollBarH=l,t.VScrollBar=f,t.HScrollBar=l}),define("ace/renderloop",["require","exports","module","ace/lib/event"],function(e,t,n){"use strict";var r=e("./lib/event"),i=function(e,t){this.onRender=e,this.pending=!1,this.changes=0,this.$recursionLimit=2,this.window=t||window;var n=this;this._flush=function(e){n.pending=!1;var t=n.changes;t&&(r.blockIdle(100),n.changes=0,n.onRender(t));if(n.changes){if(n.$recursionLimit--<0)return;n.schedule()}else n.$recursionLimit=2}};(function(){this.schedule=function(e){this.changes=this.changes|e,this.changes&&!this.pending&&(r.nextFrame(this._flush),this.pending=!0)},this.clear=function(e){var t=this.changes;return this.changes=0,t}}).call(i.prototype),t.RenderLoop=i}),define("ace/layer/font_metrics",["require","exports","module","ace/lib/oop","ace/lib/dom","ace/lib/lang","ace/lib/event","ace/lib/useragent","ace/lib/event_emitter"],function(e,t,n){var r=e("../lib/oop"),i=e("../lib/dom"),s=e("../lib/lang"),o=e("../lib/event"),u=e("../lib/useragent"),a=e("../lib/event_emitter").EventEmitter,f=256,l=typeof ResizeObserver=="function",c=200,h=t.FontMetrics=function(e){this.el=i.createElement("div"),this.$setMeasureNodeStyles(this.el.style,!0),this.$main=i.createElement("div"),this.$setMeasureNodeStyles(this.$main.style),this.$measureNode=i.createElement("div"),this.$setMeasureNodeStyles(this.$measureNode.style),this.el.appendChild(this.$main),this.el.appendChild(this.$measureNode),e.appendChild(this.el),this.$measureNode.innerHTML=s.stringRepeat("X",f),this.$characterSize={width:0,height:0},l?this.$addObserver():this.checkForSizeChanges()};(function(){r.implement(this,a),this.$characterSize={width:0,height:0},this.$setMeasureNodeStyles=function(e,t){e.width=e.height="auto",e.left=e.top="0px",e.visibility="hidden",e.position="absolute",e.whiteSpace="pre",u.isIE<8?e["font-family"]="inherit":e.font="inherit",e.overflow=t?"hidden":"visible"},this.checkForSizeChanges=function(e){e===undefined&&(e=this.$measureSizes());if(e&&(this.$characterSize.width!==e.width||this.$characterSize.height!==e.height)){this.$measureNode.style.fontWeight="bold";var t=this.$measureSizes();this.$measureNode.style.fontWeight="",this.$characterSize=e,this.charSizes=Object.create(null),this.allowBoldFonts=t&&t.width===e.width&&t.height===e.height,this._emit("changeCharacterSize",{data:e})}},this.$addObserver=function(){var e=this;this.$observer=new window.ResizeObserver(function(t){var n=t[0].contentRect;e.checkForSizeChanges({height:n.height,width:n.width/f})}),this.$observer.observe(this.$measureNode)},this.$pollSizeChanges=function(){if(this.$pollSizeChangesTimer||this.$observer)return this.$pollSizeChangesTimer;var e=this;return this.$pollSizeChangesTimer=o.onIdle(function t(){e.checkForSizeChanges(),o.onIdle(t,500)},500)},this.setPolling=function(e){e?this.$pollSizeChanges():this.$pollSizeChangesTimer&&(clearInterval(this.$pollSizeChangesTimer),this.$pollSizeChangesTimer=0)},this.$measureSizes=function(e){var t={height:(e||this.$measureNode).clientHeight,width:(e||this.$measureNode).clientWidth/f};return t.width===0||t.height===0?null:t},this.$measureCharWidth=function(e){this.$main.innerHTML=s.stringRepeat(e,f);var t=this.$main.getBoundingClientRect();return t.width/f},this.getCharacterWidth=function(e){var t=this.charSizes[e];return t===undefined&&(t=this.charSizes[e]=this.$measureCharWidth(e)/this.$characterSize.width),t},this.destroy=function(){clearInterval(this.$pollSizeChangesTimer),this.$observer&&this.$observer.disconnect(),this.el&&this.el.parentNode&&this.el.parentNode.removeChild(this.el)},this.$getZoom=function e(t){return t?(window.getComputedStyle(t).zoom||1)*e(t.parentElement):1},this.$initTransformMeasureNodes=function(){var e=function(e,t){return["div",{style:"position: absolute;top:"+e+"px;left:"+t+"px;"}]};this.els=i.buildDom([e(0,0),e(c,0),e(0,c),e(c,c)],this.el)},this.transformCoordinates=function(e,t){function r(e,t,n){var r=e[1]*t[0]-e[0]*t[1];return[(-t[1]*n[0]+t[0]*n[1])/r,(+e[1]*n[0]-e[0]*n[1])/r]}function i(e,t){return[e[0]-t[0],e[1]-t[1]]}function s(e,t){return[e[0]+t[0],e[1]+t[1]]}function o(e,t){return[e*t[0],e*t[1]]}function u(e){var t=e.getBoundingClientRect();return[t.left,t.top]}if(e){var n=this.$getZoom(this.el);e=o(1/n,e)}this.els||this.$initTransformMeasureNodes();var a=u(this.els[0]),f=u(this.els[1]),l=u(this.els[2]),h=u(this.els[3]),p=r(i(h,f),i(h,l),i(s(f,l),s(h,a))),d=o(1+p[0],i(f,a)),v=o(1+p[1],i(l,a));if(t){var m=t,g=p[0]*m[0]/c+p[1]*m[1]/c+1,y=s(o(m[0],d),o(m[1],v));return s(o(1/g/c,y),a)}var b=i(e,a),w=r(i(d,o(p[0],b)),i(v,o(p[1],b)),b);return o(c,w)}}).call(h.prototype)}),define("ace/virtual_renderer",["require","exports","module","ace/lib/oop","ace/lib/dom","ace/config","ace/layer/gutter","ace/layer/marker","ace/layer/text","ace/layer/cursor","ace/scrollbar","ace/scrollbar","ace/renderloop","ace/layer/font_metrics","ace/lib/event_emitter","ace/lib/useragent"],function(e,t,n){"use strict";var r=e("./lib/oop"),i=e("./lib/dom"),s=e("./config"),o=e("./layer/gutter").Gutter,u=e("./layer/marker").Marker,a=e("./layer/text").Text,f=e("./layer/cursor").Cursor,l=e("./scrollbar").HScrollBar,c=e("./scrollbar").VScrollBar,h=e("./renderloop").RenderLoop,p=e("./layer/font_metrics").FontMetrics,d=e("./lib/event_emitter").EventEmitter,v='.ace_br1 {border-top-left-radius    : 3px;}.ace_br2 {border-top-right-radius   : 3px;}.ace_br3 {border-top-left-radius    : 3px; border-top-right-radius:    3px;}.ace_br4 {border-bottom-right-radius: 3px;}.ace_br5 {border-top-left-radius    : 3px; border-bottom-right-radius: 3px;}.ace_br6 {border-top-right-radius   : 3px; border-bottom-right-radius: 3px;}.ace_br7 {border-top-left-radius    : 3px; border-top-right-radius:    3px; border-bottom-right-radius: 3px;}.ace_br8 {border-bottom-left-radius : 3px;}.ace_br9 {border-top-left-radius    : 3px; border-bottom-left-radius:  3px;}.ace_br10{border-top-right-radius   : 3px; border-bottom-left-radius:  3px;}.ace_br11{border-top-left-radius    : 3px; border-top-right-radius:    3px; border-bottom-left-radius:  3px;}.ace_br12{border-bottom-right-radius: 3px; border-bottom-left-radius:  3px;}.ace_br13{border-top-left-radius    : 3px; border-bottom-right-radius: 3px; border-bottom-left-radius:  3px;}.ace_br14{border-top-right-radius   : 3px; border-bottom-right-radius: 3px; border-bottom-left-radius:  3px;}.ace_br15{border-top-left-radius    : 3px; border-top-right-radius:    3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px;}.ace_editor {position: relative;overflow: hidden;font: 12px/normal \'Monaco\', \'Menlo\', \'Ubuntu Mono\', \'Consolas\', \'source-code-pro\', monospace;direction: ltr;text-align: left;-webkit-tap-highlight-color: rgba(0, 0, 0, 0);}.ace_scroller {position: absolute;overflow: hidden;top: 0;bottom: 0;background-color: inherit;-ms-user-select: none;-moz-user-select: none;-webkit-user-select: none;user-select: none;cursor: text;}.ace_content {position: absolute;box-sizing: border-box;min-width: 100%;contain: style size layout;font-variant-ligatures: no-common-ligatures;}.ace_dragging .ace_scroller:before{position: absolute;top: 0;left: 0;right: 0;bottom: 0;content: \'\';background: rgba(250, 250, 250, 0.01);z-index: 1000;}.ace_dragging.ace_dark .ace_scroller:before{background: rgba(0, 0, 0, 0.01);}.ace_selecting, .ace_selecting * {cursor: text !important;}.ace_gutter {position: absolute;overflow : hidden;width: auto;top: 0;bottom: 0;left: 0;cursor: default;z-index: 4;-ms-user-select: none;-moz-user-select: none;-webkit-user-select: none;user-select: none;contain: style size layout;}.ace_gutter-active-line {position: absolute;left: 0;right: 0;}.ace_scroller.ace_scroll-left {box-shadow: 17px 0 16px -16px rgba(0, 0, 0, 0.4) inset;}.ace_gutter-cell {position: absolute;top: 0;left: 0;right: 0;padding-left: 19px;padding-right: 6px;background-repeat: no-repeat;}.ace_gutter-cell.ace_error {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABOFBMVEX/////////QRswFAb/Ui4wFAYwFAYwFAaWGAfDRymzOSH/PxswFAb/SiUwFAYwFAbUPRvjQiDllog5HhHdRybsTi3/Tyv9Tir+Syj/UC3////XurebMBIwFAb/RSHbPx/gUzfdwL3kzMivKBAwFAbbvbnhPx66NhowFAYwFAaZJg8wFAaxKBDZurf/RB6mMxb/SCMwFAYwFAbxQB3+RB4wFAb/Qhy4Oh+4QifbNRcwFAYwFAYwFAb/QRzdNhgwFAYwFAbav7v/Uy7oaE68MBK5LxLewr/r2NXewLswFAaxJw4wFAbkPRy2PyYwFAaxKhLm1tMwFAazPiQwFAaUGAb/QBrfOx3bvrv/VC/maE4wFAbRPBq6MRO8Qynew8Dp2tjfwb0wFAbx6eju5+by6uns4uH9/f36+vr/GkHjAAAAYnRSTlMAGt+64rnWu/bo8eAA4InH3+DwoN7j4eLi4xP99Nfg4+b+/u9B/eDs1MD1mO7+4PHg2MXa347g7vDizMLN4eG+Pv7i5evs/v79yu7S3/DV7/498Yv24eH+4ufQ3Ozu/v7+y13sRqwAAADLSURBVHjaZc/XDsFgGIBhtDrshlitmk2IrbHFqL2pvXf/+78DPokj7+Fz9qpU/9UXJIlhmPaTaQ6QPaz0mm+5gwkgovcV6GZzd5JtCQwgsxoHOvJO15kleRLAnMgHFIESUEPmawB9ngmelTtipwwfASilxOLyiV5UVUyVAfbG0cCPHig+GBkzAENHS0AstVF6bacZIOzgLmxsHbt2OecNgJC83JERmePUYq8ARGkJx6XtFsdddBQgZE2nPR6CICZhawjA4Fb/chv+399kfR+MMMDGOQAAAABJRU5ErkJggg==");background-repeat: no-repeat;background-position: 2px center;}.ace_gutter-cell.ace_warning {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAmVBMVEX///8AAAD///8AAAAAAABPSzb/5sAAAAB/blH/73z/ulkAAAAAAAD85pkAAAAAAAACAgP/vGz/rkDerGbGrV7/pkQICAf////e0IsAAAD/oED/qTvhrnUAAAD/yHD/njcAAADuv2r/nz//oTj/p064oGf/zHAAAAA9Nir/tFIAAAD/tlTiuWf/tkIAAACynXEAAAAAAAAtIRW7zBpBAAAAM3RSTlMAABR1m7RXO8Ln31Z36zT+neXe5OzooRDfn+TZ4p3h2hTf4t3k3ucyrN1K5+Xaks52Sfs9CXgrAAAAjklEQVR42o3PbQ+CIBQFYEwboPhSYgoYunIqqLn6/z8uYdH8Vmdnu9vz4WwXgN/xTPRD2+sgOcZjsge/whXZgUaYYvT8QnuJaUrjrHUQreGczuEafQCO/SJTufTbroWsPgsllVhq3wJEk2jUSzX3CUEDJC84707djRc5MTAQxoLgupWRwW6UB5fS++NV8AbOZgnsC7BpEAAAAABJRU5ErkJggg==");background-position: 2px center;}.ace_gutter-cell.ace_info {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAAAAAA6mKC9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAJ0Uk5TAAB2k804AAAAPklEQVQY02NgIB68QuO3tiLznjAwpKTgNyDbMegwisCHZUETUZV0ZqOquBpXj2rtnpSJT1AEnnRmL2OgGgAAIKkRQap2htgAAAAASUVORK5CYII=");background-position: 2px center;}.ace_dark .ace_gutter-cell.ace_info {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAJFBMVEUAAAChoaGAgIAqKiq+vr6tra1ZWVmUlJSbm5s8PDxubm56enrdgzg3AAAAAXRSTlMAQObYZgAAAClJREFUeNpjYMAPdsMYHegyJZFQBlsUlMFVCWUYKkAZMxZAGdxlDMQBAG+TBP4B6RyJAAAAAElFTkSuQmCC");}.ace_scrollbar {contain: strict;position: absolute;right: 0;bottom: 0;z-index: 6;}.ace_scrollbar-inner {position: absolute;cursor: text;left: 0;top: 0;}.ace_scrollbar-v{overflow-x: hidden;overflow-y: scroll;top: 0;}.ace_scrollbar-h {overflow-x: scroll;overflow-y: hidden;left: 0;}.ace_print-margin {position: absolute;height: 100%;}.ace_text-input {position: absolute;z-index: 0;width: 0.5em;height: 1em;opacity: 0;background: transparent;-moz-appearance: none;appearance: none;border: none;resize: none;outline: none;overflow: hidden;font: inherit;padding: 0 1px;margin: 0 -1px;contain: strict;-ms-user-select: text;-moz-user-select: text;-webkit-user-select: text;user-select: text;white-space: pre!important;}.ace_text-input.ace_composition {background: transparent;color: inherit;z-index: 1000;opacity: 1;}.ace_composition_placeholder { color: transparent }.ace_composition_marker { border-bottom: 1px solid;position: absolute;border-radius: 0;margin-top: 1px;}[ace_nocontext=true] {transform: none!important;filter: none!important;clip-path: none!important;mask : none!important;contain: none!important;perspective: none!important;mix-blend-mode: initial!important;z-index: auto;}.ace_layer {z-index: 1;position: absolute;overflow: hidden;word-wrap: normal;white-space: pre;height: 100%;width: 100%;box-sizing: border-box;pointer-events: none;}.ace_gutter-layer {position: relative;width: auto;text-align: right;pointer-events: auto;height: 1000000px;contain: style size layout;}.ace_text-layer {font: inherit !important;position: absolute;height: 1000000px;width: 1000000px;contain: style size layout;}.ace_text-layer > .ace_line, .ace_text-layer > .ace_line_group {contain: style size layout;position: absolute;top: 0;left: 0;right: 0;}.ace_hidpi .ace_text-layer,.ace_hidpi .ace_gutter-layer,.ace_hidpi .ace_content,.ace_hidpi .ace_gutter {contain: strict;will-change: transform;}.ace_hidpi .ace_text-layer > .ace_line, .ace_hidpi .ace_text-layer > .ace_line_group {contain: strict;}.ace_cjk {display: inline-block;text-align: center;}.ace_cursor-layer {z-index: 4;}.ace_cursor {z-index: 4;position: absolute;box-sizing: border-box;border-left: 2px solid;transform: translatez(0);}.ace_multiselect .ace_cursor {border-left-width: 1px;}.ace_slim-cursors .ace_cursor {border-left-width: 1px;}.ace_overwrite-cursors .ace_cursor {border-left-width: 0;border-bottom: 1px solid;}.ace_hidden-cursors .ace_cursor {opacity: 0.2;}.ace_hasPlaceholder .ace_hidden-cursors .ace_cursor {opacity: 0;}.ace_smooth-blinking .ace_cursor {transition: opacity 0.18s;}.ace_animate-blinking .ace_cursor {animation-duration: 1000ms;animation-timing-function: step-end;animation-name: blink-ace-animate;animation-iteration-count: infinite;}.ace_animate-blinking.ace_smooth-blinking .ace_cursor {animation-duration: 1000ms;animation-timing-function: ease-in-out;animation-name: blink-ace-animate-smooth;}@keyframes blink-ace-animate {from, to { opacity: 1; }60% { opacity: 0; }}@keyframes blink-ace-animate-smooth {from, to { opacity: 1; }45% { opacity: 1; }60% { opacity: 0; }85% { opacity: 0; }}.ace_marker-layer .ace_step, .ace_marker-layer .ace_stack {position: absolute;z-index: 3;}.ace_marker-layer .ace_selection {position: absolute;z-index: 5;}.ace_marker-layer .ace_bracket {position: absolute;z-index: 6;}.ace_marker-layer .ace_error_bracket {position: absolute;border-bottom: 1px solid #DE5555;border-radius: 0;}.ace_marker-layer .ace_active-line {position: absolute;z-index: 2;}.ace_marker-layer .ace_selected-word {position: absolute;z-index: 4;box-sizing: border-box;}.ace_line .ace_fold {box-sizing: border-box;display: inline-block;height: 11px;margin-top: -2px;vertical-align: middle;background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAJCAYAAADU6McMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJpJREFUeNpi/P//PwOlgAXGYGRklAVSokD8GmjwY1wasKljQpYACtpCFeADcHVQfQyMQAwzwAZI3wJKvCLkfKBaMSClBlR7BOQikCFGQEErIH0VqkabiGCAqwUadAzZJRxQr/0gwiXIal8zQQPnNVTgJ1TdawL0T5gBIP1MUJNhBv2HKoQHHjqNrA4WO4zY0glyNKLT2KIfIMAAQsdgGiXvgnYAAAAASUVORK5CYII="),url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAA3CAYAAADNNiA5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACJJREFUeNpi+P//fxgTAwPDBxDxD078RSX+YeEyDFMCIMAAI3INmXiwf2YAAAAASUVORK5CYII=");background-repeat: no-repeat, repeat-x;background-position: center center, top left;color: transparent;border: 1px solid black;border-radius: 2px;cursor: pointer;pointer-events: auto;}.ace_dark .ace_fold {}.ace_fold:hover{background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAJCAYAAADU6McMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJpJREFUeNpi/P//PwOlgAXGYGRklAVSokD8GmjwY1wasKljQpYACtpCFeADcHVQfQyMQAwzwAZI3wJKvCLkfKBaMSClBlR7BOQikCFGQEErIH0VqkabiGCAqwUadAzZJRxQr/0gwiXIal8zQQPnNVTgJ1TdawL0T5gBIP1MUJNhBv2HKoQHHjqNrA4WO4zY0glyNKLT2KIfIMAAQsdgGiXvgnYAAAAASUVORK5CYII="),url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAA3CAYAAADNNiA5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACBJREFUeNpi+P//fz4TAwPDZxDxD5X4i5fLMEwJgAADAEPVDbjNw87ZAAAAAElFTkSuQmCC");}.ace_tooltip {background-color: #FFF;background-image: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.1));border: 1px solid gray;border-radius: 1px;box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);color: black;max-width: 100%;padding: 3px 4px;position: fixed;z-index: 999999;box-sizing: border-box;cursor: default;white-space: pre;word-wrap: break-word;line-height: normal;font-style: normal;font-weight: normal;letter-spacing: normal;pointer-events: none;}.ace_folding-enabled > .ace_gutter-cell {padding-right: 13px;}.ace_fold-widget {box-sizing: border-box;margin: 0 -12px 0 1px;display: none;width: 11px;vertical-align: top;background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAANElEQVR42mWKsQ0AMAzC8ixLlrzQjzmBiEjp0A6WwBCSPgKAXoLkqSot7nN3yMwR7pZ32NzpKkVoDBUxKAAAAABJRU5ErkJggg==");background-repeat: no-repeat;background-position: center;border-radius: 3px;border: 1px solid transparent;cursor: pointer;}.ace_folding-enabled .ace_fold-widget {display: inline-block;   }.ace_fold-widget.ace_end {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAANElEQVR42m3HwQkAMAhD0YzsRchFKI7sAikeWkrxwScEB0nh5e7KTPWimZki4tYfVbX+MNl4pyZXejUO1QAAAABJRU5ErkJggg==");}.ace_fold-widget.ace_closed {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAGCAYAAAAG5SQMAAAAOUlEQVR42jXKwQkAMAgDwKwqKD4EwQ26sSOkVWjgIIHAzPiCgaqiqnJHZnKICBERHN194O5b9vbLuAVRL+l0YWnZAAAAAElFTkSuQmCCXA==");}.ace_fold-widget:hover {border: 1px solid rgba(0, 0, 0, 0.3);background-color: rgba(255, 255, 255, 0.2);box-shadow: 0 1px 1px rgba(255, 255, 255, 0.7);}.ace_fold-widget:active {border: 1px solid rgba(0, 0, 0, 0.4);background-color: rgba(0, 0, 0, 0.05);box-shadow: 0 1px 1px rgba(255, 255, 255, 0.8);}.ace_dark .ace_fold-widget {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHklEQVQIW2P4//8/AzoGEQ7oGCaLLAhWiSwB146BAQCSTPYocqT0AAAAAElFTkSuQmCC");}.ace_dark .ace_fold-widget.ace_end {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAH0lEQVQIW2P4//8/AxQ7wNjIAjDMgC4AxjCVKBirIAAF0kz2rlhxpAAAAABJRU5ErkJggg==");}.ace_dark .ace_fold-widget.ace_closed {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAHElEQVQIW2P4//+/AxAzgDADlOOAznHAKgPWAwARji8UIDTfQQAAAABJRU5ErkJggg==");}.ace_dark .ace_fold-widget:hover {box-shadow: 0 1px 1px rgba(255, 255, 255, 0.2);background-color: rgba(255, 255, 255, 0.1);}.ace_dark .ace_fold-widget:active {box-shadow: 0 1px 1px rgba(255, 255, 255, 0.2);}.ace_inline_button {border: 1px solid lightgray;display: inline-block;margin: -1px 8px;padding: 0 5px;pointer-events: auto;cursor: pointer;}.ace_inline_button:hover {border-color: gray;background: rgba(200,200,200,0.2);display: inline-block;pointer-events: auto;}.ace_fold-widget.ace_invalid {background-color: #FFB4B4;border-color: #DE5555;}.ace_fade-fold-widgets .ace_fold-widget {transition: opacity 0.4s ease 0.05s;opacity: 0;}.ace_fade-fold-widgets:hover .ace_fold-widget {transition: opacity 0.05s ease 0.05s;opacity:1;}.ace_underline {text-decoration: underline;}.ace_bold {font-weight: bold;}.ace_nobold .ace_bold {font-weight: normal;}.ace_italic {font-style: italic;}.ace_error-marker {background-color: rgba(255, 0, 0,0.2);position: absolute;z-index: 9;}.ace_highlight-marker {background-color: rgba(255, 255, 0,0.2);position: absolute;z-index: 8;}.ace_mobile-menu {position: absolute;line-height: 1.5;border-radius: 4px;-ms-user-select: none;-moz-user-select: none;-webkit-user-select: none;user-select: none;background: white;box-shadow: 1px 3px 2px grey;border: 1px solid #dcdcdc;color: black;}.ace_dark > .ace_mobile-menu {background: #333;color: #ccc;box-shadow: 1px 3px 2px grey;border: 1px solid #444;}.ace_mobile-button {padding: 2px;cursor: pointer;overflow: hidden;}.ace_mobile-button:hover {background-color: #eee;opacity:1;}.ace_mobile-button:active {background-color: #ddd;}.ace_placeholder {font-family: arial;transform: scale(0.9);transform-origin: left;white-space: pre;opacity: 0.7;margin: 0 10px;}',m=e("./lib/useragent"),g=m.isIE;i.importCssString(v,"ace_editor.css");var y=function(e,t){var n=this;this.container=e||i.createElement("div"),i.addCssClass(this.container,"ace_editor"),i.HI_DPI&&i.addCssClass(this.container,"ace_hidpi"),this.setTheme(t),this.$gutter=i.createElement("div"),this.$gutter.className="ace_gutter",this.container.appendChild(this.$gutter),this.$gutter.setAttribute("aria-hidden",!0),this.scroller=i.createElement("div"),this.scroller.className="ace_scroller",this.container.appendChild(this.scroller),this.content=i.createElement("div"),this.content.className="ace_content",this.scroller.appendChild(this.content),this.$gutterLayer=new o(this.$gutter),this.$gutterLayer.on("changeGutterWidth",this.onGutterResize.bind(this)),this.$markerBack=new u(this.content);var r=this.$textLayer=new a(this.content);this.canvas=r.element,this.$markerFront=new u(this.content),this.$cursorLayer=new f(this.content),this.$horizScroll=!1,this.$vScroll=!1,this.scrollBar=this.scrollBarV=new c(this.container,this),this.scrollBarH=new l(this.container,this),this.scrollBarV.addEventListener("scroll",function(e){n.$scrollAnimation||n.session.setScrollTop(e.data-n.scrollMargin.top)}),this.scrollBarH.addEventListener("scroll",function(e){n.$scrollAnimation||n.session.setScrollLeft(e.data-n.scrollMargin.left)}),this.scrollTop=0,this.scrollLeft=0,this.cursorPos={row:0,column:0},this.$fontMetrics=new p(this.container),this.$textLayer.$setFontMetrics(this.$fontMetrics),this.$textLayer.addEventListener("changeCharacterSize",function(e){n.updateCharacterSize(),n.onResize(!0,n.gutterWidth,n.$size.width,n.$size.height),n._signal("changeCharacterSize",e)}),this.$size={width:0,height:0,scrollerHeight:0,scrollerWidth:0,$dirty:!0},this.layerConfig={width:1,padding:0,firstRow:0,firstRowScreen:0,lastRow:0,lineHeight:0,characterWidth:0,minHeight:1,maxHeight:1,offset:0,height:1,gutterOffset:1},this.scrollMargin={left:0,right:0,top:0,bottom:0,v:0,h:0},this.margin={left:0,right:0,top:0,bottom:0,v:0,h:0},this.$keepTextAreaAtCursor=!m.isIOS,this.$loop=new h(this.$renderChanges.bind(this),this.container.ownerDocument.defaultView),this.$loop.schedule(this.CHANGE_FULL),this.updateCharacterSize(),this.setPadding(4),s.resetOptions(this),s._signal("renderer",this)};(function(){this.CHANGE_CURSOR=1,this.CHANGE_MARKER=2,this.CHANGE_GUTTER=4,this.CHANGE_SCROLL=8,this.CHANGE_LINES=16,this.CHANGE_TEXT=32,this.CHANGE_SIZE=64,this.CHANGE_MARKER_BACK=128,this.CHANGE_MARKER_FRONT=256,this.CHANGE_FULL=512,this.CHANGE_H_SCROLL=1024,r.implement(this,d),this.updateCharacterSize=function(){this.$textLayer.allowBoldFonts!=this.$allowBoldFonts&&(this.$allowBoldFonts=this.$textLayer.allowBoldFonts,this.setStyle("ace_nobold",!this.$allowBoldFonts)),this.layerConfig.characterWidth=this.characterWidth=this.$textLayer.getCharacterWidth(),this.layerConfig.lineHeight=this.lineHeight=this.$textLayer.getLineHeight(),this.$updatePrintMargin(),i.setStyle(this.scroller.style,"line-height",this.lineHeight+"px")},this.setSession=function(e){this.session&&this.session.doc.off("changeNewLineMode",this.onChangeNewLineMode),this.session=e,e&&this.scrollMargin.top&&e.getScrollTop()<=0&&e.setScrollTop(-this.scrollMargin.top),this.$cursorLayer.setSession(e),this.$markerBack.setSession(e),this.$markerFront.setSession(e),this.$gutterLayer.setSession(e),this.$textLayer.setSession(e);if(!e)return;this.$loop.schedule(this.CHANGE_FULL),this.session.$setFontMetrics(this.$fontMetrics),this.scrollBarH.scrollLeft=this.scrollBarV.scrollTop=null,this.onChangeNewLineMode=this.onChangeNewLineMode.bind(this),this.onChangeNewLineMode(),this.session.doc.on("changeNewLineMode",this.onChangeNewLineMode)},this.updateLines=function(e,t,n){t===undefined&&(t=Infinity),this.$changedLines?(this.$changedLines.firstRow>e&&(this.$changedLines.firstRow=e),this.$changedLines.lastRow<t&&(this.$changedLines.lastRow=t)):this.$changedLines={firstRow:e,lastRow:t};if(this.$changedLines.lastRow<this.layerConfig.firstRow){if(!n)return;this.$changedLines.lastRow=this.layerConfig.lastRow}if(this.$changedLines.firstRow>this.layerConfig.lastRow)return;this.$loop.schedule(this.CHANGE_LINES)},this.onChangeNewLineMode=function(){this.$loop.schedule(this.CHANGE_TEXT),this.$textLayer.$updateEolChar(),this.session.$bidiHandler.setEolChar(this.$textLayer.EOL_CHAR)},this.onChangeTabSize=function(){this.$loop.schedule(this.CHANGE_TEXT|this.CHANGE_MARKER),this.$textLayer.onChangeTabSize()},this.updateText=function(){this.$loop.schedule(this.CHANGE_TEXT)},this.updateFull=function(e){e?this.$renderChanges(this.CHANGE_FULL,!0):this.$loop.schedule(this.CHANGE_FULL)},this.updateFontSize=function(){this.$textLayer.checkForSizeChanges()},this.$changes=0,this.$updateSizeAsync=function(){this.$loop.pending?this.$size.$dirty=!0:this.onResize()},this.onResize=function(e,t,n,r){if(this.resizing>2)return;this.resizing>0?this.resizing++:this.resizing=e?1:0;var i=this.container;r||(r=i.clientHeight||i.scrollHeight),n||(n=i.clientWidth||i.scrollWidth);var s=this.$updateCachedSize(e,t,n,r);if(!this.$size.scrollerHeight||!n&&!r)return this.resizing=0;e&&(this.$gutterLayer.$padding=null),e?this.$renderChanges(s|this.$changes,!0):this.$loop.schedule(s|this.$changes),this.resizing&&(this.resizing=0),this.scrollBarV.scrollLeft=this.scrollBarV.scrollTop=null},this.$updateCachedSize=function(e,t,n,r){r-=this.$extraHeight||0;var s=0,o=this.$size,u={width:o.width,height:o.height,scrollerHeight:o.scrollerHeight,scrollerWidth:o.scrollerWidth};r&&(e||o.height!=r)&&(o.height=r,s|=this.CHANGE_SIZE,o.scrollerHeight=o.height,this.$horizScroll&&(o.scrollerHeight-=this.scrollBarH.getHeight()),this.scrollBarV.element.style.bottom=this.scrollBarH.getHeight()+"px",s|=this.CHANGE_SCROLL);if(n&&(e||o.width!=n)){s|=this.CHANGE_SIZE,o.width=n,t==null&&(t=this.$showGutter?this.$gutter.offsetWidth:0),this.gutterWidth=t,i.setStyle(this.scrollBarH.element.style,"left",t+"px"),i.setStyle(this.scroller.style,"left",t+this.margin.left+"px"),o.scrollerWidth=Math.max(0,n-t-this.scrollBarV.getWidth()-this.margin.h),i.setStyle(this.$gutter.style,"left",this.margin.left+"px");var a=this.scrollBarV.getWidth()+"px";i.setStyle(this.scrollBarH.element.style,"right",a),i.setStyle(this.scroller.style,"right",a),i.setStyle(this.scroller.style,"bottom",this.scrollBarH.getHeight());if(this.session&&this.session.getUseWrapMode()&&this.adjustWrapLimit()||e)s|=this.CHANGE_FULL}return o.$dirty=!n||!r,s&&this._signal("resize",u),s},this.onGutterResize=function(e){var t=this.$showGutter?e:0;t!=this.gutterWidth&&(this.$changes|=this.$updateCachedSize(!0,t,this.$size.width,this.$size.height)),this.session.getUseWrapMode()&&this.adjustWrapLimit()?this.$loop.schedule(this.CHANGE_FULL):this.$size.$dirty?this.$loop.schedule(this.CHANGE_FULL):this.$computeLayerConfig()},this.adjustWrapLimit=function(){var e=this.$size.scrollerWidth-this.$padding*2,t=Math.floor(e/this.characterWidth);return this.session.adjustWrapLimit(t,this.$showPrintMargin&&this.$printMarginColumn)},this.setAnimatedScroll=function(e){this.setOption("animatedScroll",e)},this.getAnimatedScroll=function(){return this.$animatedScroll},this.setShowInvisibles=function(e){this.setOption("showInvisibles",e),this.session.$bidiHandler.setShowInvisibles(e)},this.getShowInvisibles=function(){return this.getOption("showInvisibles")},this.getDisplayIndentGuides=function(){return this.getOption("displayIndentGuides")},this.setDisplayIndentGuides=function(e){this.setOption("displayIndentGuides",e)},this.setShowPrintMargin=function(e){this.setOption("showPrintMargin",e)},this.getShowPrintMargin=function(){return this.getOption("showPrintMargin")},this.setPrintMarginColumn=function(e){this.setOption("printMarginColumn",e)},this.getPrintMarginColumn=function(){return this.getOption("printMarginColumn")},this.getShowGutter=function(){return this.getOption("showGutter")},this.setShowGutter=function(e){return this.setOption("showGutter",e)},this.getFadeFoldWidgets=function(){return this.getOption("fadeFoldWidgets")},this.setFadeFoldWidgets=function(e){this.setOption("fadeFoldWidgets",e)},this.setHighlightGutterLine=function(e){this.setOption("highlightGutterLine",e)},this.getHighlightGutterLine=function(){return this.getOption("highlightGutterLine")},this.$updatePrintMargin=function(){if(!this.$showPrintMargin&&!this.$printMarginEl)return;if(!this.$printMarginEl){var e=i.createElement("div");e.className="ace_layer ace_print-margin-layer",this.$printMarginEl=i.createElement("div"),this.$printMarginEl.className="ace_print-margin",e.appendChild(this.$printMarginEl),this.content.insertBefore(e,this.content.firstChild)}var t=this.$printMarginEl.style;t.left=Math.round(this.characterWidth*this.$printMarginColumn+this.$padding)+"px",t.visibility=this.$showPrintMargin?"visible":"hidden",this.session&&this.session.$wrap==-1&&this.adjustWrapLimit()},this.getContainerElement=function(){return this.container},this.getMouseEventTarget=function(){return this.scroller},this.getTextAreaContainer=function(){return this.container},this.$moveTextAreaToCursor=function(){if(this.$isMousePressed)return;var e=this.textarea.style,t=this.$composition;if(!this.$keepTextAreaAtCursor&&!t){i.translate(this.textarea,-100,0);return}var n=this.$cursorLayer.$pixelPos;if(!n)return;t&&t.markerRange&&(n=this.$cursorLayer.getPixelPosition(t.markerRange.start,!0));var r=this.layerConfig,s=n.top,o=n.left;s-=r.offset;var u=t&&t.useTextareaForIME?this.lineHeight:g?0:1;if(s<0||s>r.height-u){i.translate(this.textarea,0,0);return}var a=1,f=this.$size.height-u;if(!t)s+=this.lineHeight;else if(t.useTextareaForIME){var l=this.textarea.value;a=this.characterWidth*this.session.$getStringScreenWidth(l)[0]}else s+=this.lineHeight+2;o-=this.scrollLeft,o>this.$size.scrollerWidth-a&&(o=this.$size.scrollerWidth-a),o+=this.gutterWidth+this.margin.left,i.setStyle(e,"height",u+"px"),i.setStyle(e,"width",a+"px"),i.translate(this.textarea,Math.min(o,this.$size.scrollerWidth-a),Math.min(s,f))},this.getFirstVisibleRow=function(){return this.layerConfig.firstRow},this.getFirstFullyVisibleRow=function(){return this.layerConfig.firstRow+(this.layerConfig.offset===0?0:1)},this.getLastFullyVisibleRow=function(){var e=this.layerConfig,t=e.lastRow,n=this.session.documentToScreenRow(t,0)*e.lineHeight;return n-this.session.getScrollTop()>e.height-e.lineHeight?t-1:t},this.getLastVisibleRow=function(){return this.layerConfig.lastRow},this.$padding=null,this.setPadding=function(e){this.$padding=e,this.$textLayer.setPadding(e),this.$cursorLayer.setPadding(e),this.$markerFront.setPadding(e),this.$markerBack.setPadding(e),this.$loop.schedule(this.CHANGE_FULL),this.$updatePrintMargin()},this.setScrollMargin=function(e,t,n,r){var i=this.scrollMargin;i.top=e|0,i.bottom=t|0,i.right=r|0,i.left=n|0,i.v=i.top+i.bottom,i.h=i.left+i.right,i.top&&this.scrollTop<=0&&this.session&&this.session.setScrollTop(-i.top),this.updateFull()},this.setMargin=function(e,t,n,r){var i=this.margin;i.top=e|0,i.bottom=t|0,i.right=r|0,i.left=n|0,i.v=i.top+i.bottom,i.h=i.left+i.right,this.$updateCachedSize(!0,this.gutterWidth,this.$size.width,this.$size.height),this.updateFull()},this.getHScrollBarAlwaysVisible=function(){return this.$hScrollBarAlwaysVisible},this.setHScrollBarAlwaysVisible=function(e){this.setOption("hScrollBarAlwaysVisible",e)},this.getVScrollBarAlwaysVisible=function(){return this.$vScrollBarAlwaysVisible},this.setVScrollBarAlwaysVisible=function(e){this.setOption("vScrollBarAlwaysVisible",e)},this.$updateScrollBarV=function(){var e=this.layerConfig.maxHeight,t=this.$size.scrollerHeight;!this.$maxLines&&this.$scrollPastEnd&&(e-=(t-this.lineHeight)*this.$scrollPastEnd,this.scrollTop>e-t&&(e=this.scrollTop+t,this.scrollBarV.scrollTop=null)),this.scrollBarV.setScrollHeight(e+this.scrollMargin.v),this.scrollBarV.setScrollTop(this.scrollTop+this.scrollMargin.top)},this.$updateScrollBarH=function(){this.scrollBarH.setScrollWidth(this.layerConfig.width+2*this.$padding+this.scrollMargin.h),this.scrollBarH.setScrollLeft(this.scrollLeft+this.scrollMargin.left)},this.$frozen=!1,this.freeze=function(){this.$frozen=!0},this.unfreeze=function(){this.$frozen=!1},this.$renderChanges=function(e,t){this.$changes&&(e|=this.$changes,this.$changes=0);if(!this.session||!this.container.offsetWidth||this.$frozen||!e&&!t){this.$changes|=e;return}if(this.$size.$dirty)return this.$changes|=e,this.onResize(!0);this.lineHeight||this.$textLayer.checkForSizeChanges(),this._signal("beforeRender",e),this.session&&this.session.$bidiHandler&&this.session.$bidiHandler.updateCharacterWidths(this.$fontMetrics);var n=this.layerConfig;if(e&this.CHANGE_FULL||e&this.CHANGE_SIZE||e&this.CHANGE_TEXT||e&this.CHANGE_LINES||e&this.CHANGE_SCROLL||e&this.CHANGE_H_SCROLL){e|=this.$computeLayerConfig()|this.$loop.clear();if(n.firstRow!=this.layerConfig.firstRow&&n.firstRowScreen==this.layerConfig.firstRowScreen){var r=this.scrollTop+(n.firstRow-this.layerConfig.firstRow)*this.lineHeight;r>0&&(this.scrollTop=r,e|=this.CHANGE_SCROLL,e|=this.$computeLayerConfig()|this.$loop.clear())}n=this.layerConfig,this.$updateScrollBarV(),e&this.CHANGE_H_SCROLL&&this.$updateScrollBarH(),i.translate(this.content,-this.scrollLeft,-n.offset);var s=n.width+2*this.$padding+"px",o=n.minHeight+"px";i.setStyle(this.content.style,"width",s),i.setStyle(this.content.style,"height",o)}e&this.CHANGE_H_SCROLL&&(i.translate(this.content,-this.scrollLeft,-n.offset),this.scroller.className=this.scrollLeft<=0?"ace_scroller":"ace_scroller ace_scroll-left");if(e&this.CHANGE_FULL){this.$changedLines=null,this.$textLayer.update(n),this.$showGutter&&this.$gutterLayer.update(n),this.$markerBack.update(n),this.$markerFront.update(n),this.$cursorLayer.update(n),this.$moveTextAreaToCursor(),this._signal("afterRender",e);return}if(e&this.CHANGE_SCROLL){this.$changedLines=null,e&this.CHANGE_TEXT||e&this.CHANGE_LINES?this.$textLayer.update(n):this.$textLayer.scrollLines(n),this.$showGutter&&(e&this.CHANGE_GUTTER||e&this.CHANGE_LINES?this.$gutterLayer.update(n):this.$gutterLayer.scrollLines(n)),this.$markerBack.update(n),this.$markerFront.update(n),this.$cursorLayer.update(n),this.$moveTextAreaToCursor(),this._signal("afterRender",e);return}e&this.CHANGE_TEXT?(this.$changedLines=null,this.$textLayer.update(n),this.$showGutter&&this.$gutterLayer.update(n)):e&this.CHANGE_LINES?(this.$updateLines()||e&this.CHANGE_GUTTER&&this.$showGutter)&&this.$gutterLayer.update(n):e&this.CHANGE_TEXT||e&this.CHANGE_GUTTER?this.$showGutter&&this.$gutterLayer.update(n):e&this.CHANGE_CURSOR&&this.$highlightGutterLine&&this.$gutterLayer.updateLineHighlight(n),e&this.CHANGE_CURSOR&&(this.$cursorLayer.update(n),this.$moveTextAreaToCursor()),e&(this.CHANGE_MARKER|this.CHANGE_MARKER_FRONT)&&this.$markerFront.update(n),e&(this.CHANGE_MARKER|this.CHANGE_MARKER_BACK)&&this.$markerBack.update(n),this._signal("afterRender",e)},this.$autosize=function(){var e=this.session.getScreenLength()*this.lineHeight,t=this.$maxLines*this.lineHeight,n=Math.min(t,Math.max((this.$minLines||1)*this.lineHeight,e))+this.scrollMargin.v+(this.$extraHeight||0);this.$horizScroll&&(n+=this.scrollBarH.getHeight()),this.$maxPixelHeight&&n>this.$maxPixelHeight&&(n=this.$maxPixelHeight);var r=n<=2*this.lineHeight,i=!r&&e>t;if(n!=this.desiredHeight||this.$size.height!=this.desiredHeight||i!=this.$vScroll){i!=this.$vScroll&&(this.$vScroll=i,this.scrollBarV.setVisible(i));var s=this.container.clientWidth;this.container.style.height=n+"px",this.$updateCachedSize(!0,this.$gutterWidth,s,n),this.desiredHeight=n,this._signal("autosize")}},this.$computeLayerConfig=function(){var e=this.session,t=this.$size,n=t.height<=2*this.lineHeight,r=this.session.getScreenLength(),i=r*this.lineHeight,s=this.$getLongestLine(),o=!n&&(this.$hScrollBarAlwaysVisible||t.scrollerWidth-s-2*this.$padding<0),u=this.$horizScroll!==o;u&&(this.$horizScroll=o,this.scrollBarH.setVisible(o));var a=this.$vScroll;this.$maxLines&&this.lineHeight>1&&this.$autosize();var f=t.scrollerHeight+this.lineHeight,l=!this.$maxLines&&this.$scrollPastEnd?(t.scrollerHeight-this.lineHeight)*this.$scrollPastEnd:0;i+=l;var c=this.scrollMargin;this.session.setScrollTop(Math.max(-c.top,Math.min(this.scrollTop,i-t.scrollerHeight+c.bottom))),this.session.setScrollLeft(Math.max(-c.left,Math.min(this.scrollLeft,s+2*this.$padding-t.scrollerWidth+c.right)));var h=!n&&(this.$vScrollBarAlwaysVisible||t.scrollerHeight-i+l<0||this.scrollTop>c.top),p=a!==h;p&&(this.$vScroll=h,this.scrollBarV.setVisible(h));var d=this.scrollTop%this.lineHeight,v=Math.ceil(f/this.lineHeight)-1,m=Math.max(0,Math.round((this.scrollTop-d)/this.lineHeight)),g=m+v,y,b,w=this.lineHeight;m=e.screenToDocumentRow(m,0);var E=e.getFoldLine(m);E&&(m=E.start.row),y=e.documentToScreenRow(m,0),b=e.getRowLength(m)*w,g=Math.min(e.screenToDocumentRow(g,0),e.getLength()-1),f=t.scrollerHeight+e.getRowLength(g)*w+b,d=this.scrollTop-y*w;var S=0;if(this.layerConfig.width!=s||u)S=this.CHANGE_H_SCROLL;if(u||p)S|=this.$updateCachedSize(!0,this.gutterWidth,t.width,t.height),this._signal("scrollbarVisibilityChanged"),p&&(s=this.$getLongestLine());return this.layerConfig={width:s,padding:this.$padding,firstRow:m,firstRowScreen:y,lastRow:g,lineHeight:w,characterWidth:this.characterWidth,minHeight:f,maxHeight:i,offset:d,gutterOffset:w?Math.max(0,Math.ceil((d+t.height-t.scrollerHeight)/w)):0,height:this.$size.scrollerHeight},this.session.$bidiHandler&&this.session.$bidiHandler.setContentWidth(s-this.$padding),S},this.$updateLines=function(){if(!this.$changedLines)return;var e=this.$changedLines.firstRow,t=this.$changedLines.lastRow;this.$changedLines=null;var n=this.layerConfig;if(e>n.lastRow+1)return;if(t<n.firstRow)return;if(t===Infinity){this.$showGutter&&this.$gutterLayer.update(n),this.$textLayer.update(n);return}return this.$textLayer.updateLines(n,e,t),!0},this.$getLongestLine=function(){var e=this.session.getScreenWidth();return this.showInvisibles&&!this.session.$useWrapMode&&(e+=1),this.$textLayer&&e>this.$textLayer.MAX_LINE_LENGTH&&(e=this.$textLayer.MAX_LINE_LENGTH+30),Math.max(this.$size.scrollerWidth-2*this.$padding,Math.round(e*this.characterWidth))},this.updateFrontMarkers=function(){this.$markerFront.setMarkers(this.session.getMarkers(!0)),this.$loop.schedule(this.CHANGE_MARKER_FRONT)},this.updateBackMarkers=function(){this.$markerBack.setMarkers(this.session.getMarkers()),this.$loop.schedule(this.CHANGE_MARKER_BACK)},this.addGutterDecoration=function(e,t){this.$gutterLayer.addGutterDecoration(e,t)},this.removeGutterDecoration=function(e,t){this.$gutterLayer.removeGutterDecoration(e,t)},this.updateBreakpoints=function(e){this.$loop.schedule(this.CHANGE_GUTTER)},this.setAnnotations=function(e){this.$gutterLayer.setAnnotations(e),this.$loop.schedule(this.CHANGE_GUTTER)},this.updateCursor=function(){this.$loop.schedule(this.CHANGE_CURSOR)},this.hideCursor=function(){this.$cursorLayer.hideCursor()},this.showCursor=function(){this.$cursorLayer.showCursor()},this.scrollSelectionIntoView=function(e,t,n){this.scrollCursorIntoView(e,n),this.scrollCursorIntoView(t,n)},this.scrollCursorIntoView=function(e,t,n){if(this.$size.scrollerHeight===0)return;var r=this.$cursorLayer.getPixelPosition(e),i=r.left,s=r.top,o=n&&n.top||0,u=n&&n.bottom||0,a=this.$scrollAnimation?this.session.getScrollTop():this.scrollTop;a+o>s?(t&&a+o>s+this.lineHeight&&(s-=t*this.$size.scrollerHeight),s===0&&(s=-this.scrollMargin.top),this.session.setScrollTop(s)):a+this.$size.scrollerHeight-u<s+this.lineHeight&&(t&&a+this.$size.scrollerHeight-u<s-this.lineHeight&&(s+=t*this.$size.scrollerHeight),this.session.setScrollTop(s+this.lineHeight+u-this.$size.scrollerHeight));var f=this.scrollLeft;f>i?(i<this.$padding+2*this.layerConfig.characterWidth&&(i=-this.scrollMargin.left),this.session.setScrollLeft(i)):f+this.$size.scrollerWidth<i+this.characterWidth?this.session.setScrollLeft(Math.round(i+this.characterWidth-this.$size.scrollerWidth)):f<=this.$padding&&i-f<this.characterWidth&&this.session.setScrollLeft(0)},this.getScrollTop=function(){return this.session.getScrollTop()},this.getScrollLeft=function(){return this.session.getScrollLeft()},this.getScrollTopRow=function(){return this.scrollTop/this.lineHeight},this.getScrollBottomRow=function(){return Math.max(0,Math.floor((this.scrollTop+this.$size.scrollerHeight)/this.lineHeight)-1)},this.scrollToRow=function(e){this.session.setScrollTop(e*this.lineHeight)},this.alignCursor=function(e,t){typeof e=="number"&&(e={row:e,column:0});var n=this.$cursorLayer.getPixelPosition(e),r=this.$size.scrollerHeight-this.lineHeight,i=n.top-r*(t||0);return this.session.setScrollTop(i),i},this.STEPS=8,this.$calcSteps=function(e,t){var n=0,r=this.STEPS,i=[],s=function(e,t,n){return n*(Math.pow(e-1,3)+1)+t};for(n=0;n<r;++n)i.push(s(n/this.STEPS,e,t-e));return i},this.scrollToLine=function(e,t,n,r){var i=this.$cursorLayer.getPixelPosition({row:e,column:0}),s=i.top;t&&(s-=this.$size.scrollerHeight/2);var o=this.scrollTop;this.session.setScrollTop(s),n!==!1&&this.animateScrolling(o,r)},this.animateScrolling=function(e,t){var n=this.scrollTop;if(!this.$animatedScroll)return;var r=this;if(e==n)return;if(this.$scrollAnimation){var i=this.$scrollAnimation.steps;if(i.length){e=i[0];if(e==n)return}}var s=r.$calcSteps(e,n);this.$scrollAnimation={from:e,to:n,steps:s},clearInterval(this.$timer),r.session.setScrollTop(s.shift()),r.session.$scrollTop=n,this.$timer=setInterval(function(){s.length?(r.session.setScrollTop(s.shift()),r.session.$scrollTop=n):n!=null?(r.session.$scrollTop=-1,r.session.setScrollTop(n),n=null):(r.$timer=clearInterval(r.$timer),r.$scrollAnimation=null,t&&t())},10)},this.scrollToY=function(e){this.scrollTop!==e&&(this.$loop.schedule(this.CHANGE_SCROLL),this.scrollTop=e)},this.scrollToX=function(e){this.scrollLeft!==e&&(this.scrollLeft=e),this.$loop.schedule(this.CHANGE_H_SCROLL)},this.scrollTo=function(e,t){this.session.setScrollTop(t),this.session.setScrollLeft(t)},this.scrollBy=function(e,t){t&&this.session.setScrollTop(this.session.getScrollTop()+t),e&&this.session.setScrollLeft(this.session.getScrollLeft()+e)},this.isScrollableBy=function(e,t){if(t<0&&this.session.getScrollTop()>=1-this.scrollMargin.top)return!0;if(t>0&&this.session.getScrollTop()+this.$size.scrollerHeight-this.layerConfig.maxHeight<-1+this.scrollMargin.bottom)return!0;if(e<0&&this.session.getScrollLeft()>=1-this.scrollMargin.left)return!0;if(e>0&&this.session.getScrollLeft()+this.$size.scrollerWidth-this.layerConfig.width<-1+this.scrollMargin.right)return!0},this.pixelToScreenCoordinates=function(e,t){var n;if(this.$hasCssTransforms){n={top:0,left:0};var r=this.$fontMetrics.transformCoordinates([e,t]);e=r[1]-this.gutterWidth-this.margin.left,t=r[0]}else n=this.scroller.getBoundingClientRect();var i=e+this.scrollLeft-n.left-this.$padding,s=i/this.characterWidth,o=Math.floor((t+this.scrollTop-n.top)/this.lineHeight),u=this.$blockCursor?Math.floor(s):Math.round(s);return{row:o,column:u,side:s-u>0?1:-1,offsetX:i}},this.screenToTextCoordinates=function(e,t){var n;if(this.$hasCssTransforms){n={top:0,left:0};var r=this.$fontMetrics.transformCoordinates([e,t]);e=r[1]-this.gutterWidth-this.margin.left,t=r[0]}else n=this.scroller.getBoundingClientRect();var i=e+this.scrollLeft-n.left-this.$padding,s=i/this.characterWidth,o=this.$blockCursor?Math.floor(s):Math.round(s),u=Math.floor((t+this.scrollTop-n.top)/this.lineHeight);return this.session.screenToDocumentPosition(u,Math.max(o,0),i)},this.textToScreenCoordinates=function(e,t){var n=this.scroller.getBoundingClientRect(),r=this.session.documentToScreenPosition(e,t),i=this.$padding+(this.session.$bidiHandler.isBidiRow(r.row,e)?this.session.$bidiHandler.getPosLeft(r.column):Math.round(r.column*this.characterWidth)),s=r.row*this.lineHeight;return{pageX:n.left+i-this.scrollLeft,pageY:n.top+s-this.scrollTop}},this.visualizeFocus=function(){i.addCssClass(this.container,"ace_focus")},this.visualizeBlur=function(){i.removeCssClass(this.container,"ace_focus")},this.showComposition=function(e){this.$composition=e,e.cssText||(e.cssText=this.textarea.style.cssText),e.useTextareaForIME=this.$useTextareaForIME,this.$useTextareaForIME?(i.addCssClass(this.textarea,"ace_composition"),this.textarea.style.cssText="",this.$moveTextAreaToCursor(),this.$cursorLayer.element.style.display="none"):e.markerId=this.session.addMarker(e.markerRange,"ace_composition_marker","text")},this.setCompositionText=function(e){var t=this.session.selection.cursor;this.addToken(e,"composition_placeholder",t.row,t.column),this.$moveTextAreaToCursor()},this.hideComposition=function(){if(!this.$composition)return;this.$composition.markerId&&this.session.removeMarker(this.$composition.markerId),i.removeCssClass(this.textarea,"ace_composition"),this.textarea.style.cssText=this.$composition.cssText,this.$composition=null,this.$cursorLayer.element.style.display=""},this.addToken=function(e,t,n,r){var i=this.session;i.bgTokenizer.lines[n]=null;var s={type:t,value:e},o=i.getTokens(n);if(r==null)o.push(s);else{var u=0;for(var a=0;a<o.length;a++){var f=o[a];u+=f.value.length;if(r<=u){var l=f.value.length-(u-r),c=f.value.slice(0,l),h=f.value.slice(l);o.splice(a,1,{type:f.type,value:c},s,{type:f.type,value:h});break}}}this.updateLines(n,n)},this.setTheme=function(e,t){function o(r){if(n.$themeId!=e)return t&&t();if(!r||!r.cssClass)throw new Error("couldn't load module "+e+" or it didn't call define");r.$id&&(n.$themeId=r.$id),i.importCssString(r.cssText,r.cssClass,n.container),n.theme&&i.removeCssClass(n.container,n.theme.cssClass);var s="padding"in r?r.padding:"padding"in(n.theme||{})?4:n.$padding;n.$padding&&s!=n.$padding&&n.setPadding(s),n.$theme=r.cssClass,n.theme=r,i.addCssClass(n.container,r.cssClass),i.setCssClass(n.container,"ace_dark",r.isDark),n.$size&&(n.$size.width=0,n.$updateSizeAsync()),n._dispatchEvent("themeLoaded",{theme:r}),t&&t()}var n=this;this.$themeId=e,n._dispatchEvent("themeChange",{theme:e});if(!e||typeof e=="string"){var r=e||this.$options.theme.initialValue;s.loadModule(["theme",r],o)}else o(e)},this.getTheme=function(){return this.$themeId},this.setStyle=function(e,t){i.setCssClass(this.container,e,t!==!1)},this.unsetStyle=function(e){i.removeCssClass(this.container,e)},this.setCursorStyle=function(e){i.setStyle(this.scroller.style,"cursor",e)},this.setMouseCursor=function(e){i.setStyle(this.scroller.style,"cursor",e)},this.attachToShadowRoot=function(){i.importCssString(v,"ace_editor.css",this.container)},this.destroy=function(){this.freeze(),this.$fontMetrics.destroy(),this.$cursorLayer.destroy()}}).call(y.prototype),s.defineOptions(y.prototype,"renderer",{animatedScroll:{initialValue:!1},showInvisibles:{set:function(e){this.$textLayer.setShowInvisibles(e)&&this.$loop.schedule(this.CHANGE_TEXT)},initialValue:!1},showPrintMargin:{set:function(){this.$updatePrintMargin()},initialValue:!0},printMarginColumn:{set:function(){this.$updatePrintMargin()},initialValue:80},printMargin:{set:function(e){typeof e=="number"&&(this.$printMarginColumn=e),this.$showPrintMargin=!!e,this.$updatePrintMargin()},get:function(){return this.$showPrintMargin&&this.$printMarginColumn}},showGutter:{set:function(e){this.$gutter.style.display=e?"block":"none",this.$loop.schedule(this.CHANGE_FULL),this.onGutterResize()},initialValue:!0},fadeFoldWidgets:{set:function(e){i.setCssClass(this.$gutter,"ace_fade-fold-widgets",e)},initialValue:!1},showFoldWidgets:{set:function(e){this.$gutterLayer.setShowFoldWidgets(e),this.$loop.schedule(this.CHANGE_GUTTER)},initialValue:!0},displayIndentGuides:{set:function(e){this.$textLayer.setDisplayIndentGuides(e)&&this.$loop.schedule(this.CHANGE_TEXT)},initialValue:!0},highlightGutterLine:{set:function(e){this.$gutterLayer.setHighlightGutterLine(e),this.$loop.schedule(this.CHANGE_GUTTER)},initialValue:!0},hScrollBarAlwaysVisible:{set:function(e){(!this.$hScrollBarAlwaysVisible||!this.$horizScroll)&&this.$loop.schedule(this.CHANGE_SCROLL)},initialValue:!1},vScrollBarAlwaysVisible:{set:function(e){(!this.$vScrollBarAlwaysVisible||!this.$vScroll)&&this.$loop.schedule(this.CHANGE_SCROLL)},initialValue:!1},fontSize:{set:function(e){typeof e=="number"&&(e+="px"),this.container.style.fontSize=e,this.updateFontSize()},initialValue:12},fontFamily:{set:function(e){this.container.style.fontFamily=e,this.updateFontSize()}},maxLines:{set:function(e){this.updateFull()}},minLines:{set:function(e){this.$minLines<562949953421311||(this.$minLines=0),this.updateFull()}},maxPixelHeight:{set:function(e){this.updateFull()},initialValue:0},scrollPastEnd:{set:function(e){e=+e||0;if(this.$scrollPastEnd==e)return;this.$scrollPastEnd=e,this.$loop.schedule(this.CHANGE_SCROLL)},initialValue:0,handlesSet:!0},fixedWidthGutter:{set:function(e){this.$gutterLayer.$fixedWidth=!!e,this.$loop.schedule(this.CHANGE_GUTTER)}},theme:{set:function(e){this.setTheme(e)},get:function(){return this.$themeId||this.theme},initialValue:"./theme/textmate",handlesSet:!0},hasCssTransforms:{},useTextareaForIME:{initialValue:!m.isMobile&&!m.isIE}}),t.VirtualRenderer=y}),define("ace/worker/worker_client",["require","exports","module","ace/lib/oop","ace/lib/net","ace/lib/event_emitter","ace/config"],function(e,t,n){"use strict";function u(e){var t="importScripts('"+i.qualifyURL(e)+"');";try{return new Blob([t],{type:"application/javascript"})}catch(n){var r=window.BlobBuilder||window.WebKitBlobBuilder||window.MozBlobBuilder,s=new r;return s.append(t),s.getBlob("application/javascript")}}function a(e){if(typeof Worker=="undefined")return{postMessage:function(){},terminate:function(){}};if(o.get("loadWorkerFromBlob")){var t=u(e),n=window.URL||window.webkitURL,r=n.createObjectURL(t);return new Worker(r)}return new Worker(e)}var r=e("../lib/oop"),i=e("../lib/net"),s=e("../lib/event_emitter").EventEmitter,o=e("../config"),f=function(e){e.postMessage||(e=this.$createWorkerFromOldConfig.apply(this,arguments)),this.$worker=e,this.$sendDeltaQueue=this.$sendDeltaQueue.bind(this),this.changeListener=this.changeListener.bind(this),this.onMessage=this.onMessage.bind(this),this.callbackId=1,this.callbacks={},this.$worker.onmessage=this.onMessage};(function(){r.implement(this,s),this.$createWorkerFromOldConfig=function(t,n,r,i,s){e.nameToUrl&&!e.toUrl&&(e.toUrl=e.nameToUrl);if(o.get("packaged")||!e.toUrl)i=i||o.moduleUrl(n,"worker");else{var u=this.$normalizePath;i=i||u(e.toUrl("ace/worker/worker.js",null,"_"));var f={};t.forEach(function(t){f[t]=u(e.toUrl(t,null,"_").replace(/(\.js)?(\?.*)?$/,""))})}return this.$worker=a(i),s&&this.send("importScripts",s),this.$worker.postMessage({init:!0,tlns:f,module:n,classname:r}),this.$worker},this.onMessage=function(e){var t=e.data;switch(t.type){case"event":this._signal(t.name,{data:t.data});break;case"call":var n=this.callbacks[t.id];n&&(n(t.data),delete this.callbacks[t.id]);break;case"error":this.reportError(t.data);break;case"log":window.console&&console.log&&console.log.apply(console,t.data)}},this.reportError=function(e){window.console&&console.error&&console.error(e)},this.$normalizePath=function(e){return i.qualifyURL(e)},this.terminate=function(){this._signal("terminate",{}),this.deltaQueue=null,this.$worker.terminate(),this.$worker=null,this.$doc&&this.$doc.off("change",this.changeListener),this.$doc=null},this.send=function(e,t){this.$worker.postMessage({command:e,args:t})},this.call=function(e,t,n){if(n){var r=this.callbackId++;this.callbacks[r]=n,t.push(r)}this.send(e,t)},this.emit=function(e,t){try{t.data&&t.data.err&&(t.data.err={message:t.data.err.message,stack:t.data.err.stack,code:t.data.err.code}),this.$worker.postMessage({event:e,data:{data:t.data}})}catch(n){console.error(n.stack)}},this.attachToDocument=function(e){this.$doc&&this.terminate(),this.$doc=e,this.call("setValue",[e.getValue()]),e.on("change",this.changeListener)},this.changeListener=function(e){this.deltaQueue||(this.deltaQueue=[],setTimeout(this.$sendDeltaQueue,0)),e.action=="insert"?this.deltaQueue.push(e.start,e.lines):this.deltaQueue.push(e.start,e.end)},this.$sendDeltaQueue=function(){var e=this.deltaQueue;if(!e)return;this.deltaQueue=null,e.length>50&&e.length>this.$doc.getLength()>>1?this.call("setValue",[this.$doc.getValue()]):this.emit("change",{data:e})}}).call(f.prototype);var l=function(e,t,n){var r=null,i=!1,u=Object.create(s),a=[],l=new f({messageBuffer:a,terminate:function(){},postMessage:function(e){a.push(e);if(!r)return;i?setTimeout(c):c()}});l.setEmitSync=function(e){i=e};var c=function(){var e=a.shift();e.command?r[e.command].apply(r,e.args):e.event&&u._signal(e.event,e.data)};return u.postMessage=function(e){l.onMessage({data:e})},u.callback=function(e,t){this.postMessage({type:"call",id:t,data:e})},u.emit=function(e,t){this.postMessage({type:"event",name:e,data:t})},o.loadModule(["worker",t],function(e){r=new e[n](u);while(a.length)c()}),l};t.UIWorkerClient=l,t.WorkerClient=f,t.createWorker=a}),define("ace/placeholder",["require","exports","module","ace/range","ace/lib/event_emitter","ace/lib/oop"],function(e,t,n){"use strict";var r=e("./range").Range,i=e("./lib/event_emitter").EventEmitter,s=e("./lib/oop"),o=function(e,t,n,r,i,s){var o=this;this.length=t,this.session=e,this.doc=e.getDocument(),this.mainClass=i,this.othersClass=s,this.$onUpdate=this.onUpdate.bind(this),this.doc.on("change",this.$onUpdate),this.$others=r,this.$onCursorChange=function(){setTimeout(function(){o.onCursorChange()})},this.$pos=n;var u=e.getUndoManager().$undoStack||e.getUndoManager().$undostack||{length:-1};this.$undoStackDepth=u.length,this.setup(),e.selection.on("changeCursor",this.$onCursorChange)};(function(){s.implement(this,i),this.setup=function(){var e=this,t=this.doc,n=this.session;this.selectionBefore=n.selection.toJSON(),n.selection.inMultiSelectMode&&n.selection.toSingleRange(),this.pos=t.createAnchor(this.$pos.row,this.$pos.column);var i=this.pos;i.$insertRight=!0,i.detach(),i.markerId=n.addMarker(new r(i.row,i.column,i.row,i.column+this.length),this.mainClass,null,!1),this.others=[],this.$others.forEach(function(n){var r=t.createAnchor(n.row,n.column);r.$insertRight=!0,r.detach(),e.others.push(r)}),n.setUndoSelect(!1)},this.showOtherMarkers=function(){if(this.othersActive)return;var e=this.session,t=this;this.othersActive=!0,this.others.forEach(function(n){n.markerId=e.addMarker(new r(n.row,n.column,n.row,n.column+t.length),t.othersClass,null,!1)})},this.hideOtherMarkers=function(){if(!this.othersActive)return;this.othersActive=!1;for(var e=0;e<this.others.length;e++)this.session.removeMarker(this.others[e].markerId)},this.onUpdate=function(e){if(this.$updating)return this.updateAnchors(e);var t=e;if(t.start.row!==t.end.row)return;if(t.start.row!==this.pos.row)return;this.$updating=!0;var n=e.action==="insert"?t.end.column-t.start.column:t.start.column-t.end.column,i=t.start.column>=this.pos.column&&t.start.column<=this.pos.column+this.length+1,s=t.start.column-this.pos.column;this.updateAnchors(e),i&&(this.length+=n);if(i&&!this.session.$fromUndo)if(e.action==="insert")for(var o=this.others.length-1;o>=0;o--){var u=this.others[o],a={row:u.row,column:u.column+s};this.doc.insertMergedLines(a,e.lines)}else if(e.action==="remove")for(var o=this.others.length-1;o>=0;o--){var u=this.others[o],a={row:u.row,column:u.column+s};this.doc.remove(new r(a.row,a.column,a.row,a.column-n))}this.$updating=!1,this.updateMarkers()},this.updateAnchors=function(e){this.pos.onChange(e);for(var t=this.others.length;t--;)this.others[t].onChange(e);this.updateMarkers()},this.updateMarkers=function(){if(this.$updating)return;var e=this,t=this.session,n=function(n,i){t.removeMarker(n.markerId),n.markerId=t.addMarker(new r(n.row,n.column,n.row,n.column+e.length),i,null,!1)};n(this.pos,this.mainClass);for(var i=this.others.length;i--;)n(this.others[i],this.othersClass)},this.onCursorChange=function(e){if(this.$updating||!this.session)return;var t=this.session.selection.getCursor();t.row===this.pos.row&&t.column>=this.pos.column&&t.column<=this.pos.column+this.length?(this.showOtherMarkers(),this._emit("cursorEnter",e)):(this.hideOtherMarkers(),this._emit("cursorLeave",e))},this.detach=function(){this.session.removeMarker(this.pos&&this.pos.markerId),this.hideOtherMarkers(),this.doc.removeEventListener("change",this.$onUpdate),this.session.selection.removeEventListener("changeCursor",this.$onCursorChange),this.session.setUndoSelect(!0),this.session=null},this.cancel=function(){if(this.$undoStackDepth===-1)return;var e=this.session.getUndoManager(),t=(e.$undoStack||e.$undostack).length-this.$undoStackDepth;for(var n=0;n<t;n++)e.undo(this.session,!0);this.selectionBefore&&this.session.selection.fromJSON(this.selectionBefore)}}).call(o.prototype),t.PlaceHolder=o}),define("ace/mouse/multi_select_handler",["require","exports","module","ace/lib/event","ace/lib/useragent"],function(e,t,n){function s(e,t){return e.row==t.row&&e.column==t.column}function o(e){var t=e.domEvent,n=t.altKey,o=t.shiftKey,u=t.ctrlKey,a=e.getAccelKey(),f=e.getButton();u&&i.isMac&&(f=t.button);if(e.editor.inMultiSelectMode&&f==2){e.editor.textInput.onContextMenu(e.domEvent);return}if(!u&&!n&&!a){f===0&&e.editor.inMultiSelectMode&&e.editor.exitMultiSelectMode();return}if(f!==0)return;var l=e.editor,c=l.selection,h=l.inMultiSelectMode,p=e.getDocumentPosition(),d=c.getCursor(),v=e.inSelection()||c.isEmpty()&&s(p,d),m=e.x,g=e.y,y=function(e){m=e.clientX,g=e.clientY},b=l.session,w=l.renderer.pixelToScreenCoordinates(m,g),E=w,S;if(l.$mouseHandler.$enableJumpToDef)u&&n||a&&n?S=o?"block":"add":n&&l.$blockSelectEnabled&&(S="block");else if(a&&!n){S="add";if(!h&&o)return}else n&&l.$blockSelectEnabled&&(S="block");S&&i.isMac&&t.ctrlKey&&l.$mouseHandler.cancelContextMenu();if(S=="add"){if(!h&&v)return;if(!h){var x=c.toOrientedRange();l.addSelectionMarker(x)}var T=c.rangeList.rangeAtPoint(p);l.inVirtualSelectionMode=!0,o&&(T=null,x=c.ranges[0]||x,l.removeSelectionMarker(x)),l.once("mouseup",function(){var e=c.toOrientedRange();T&&e.isEmpty()&&s(T.cursor,e.cursor)?c.substractPoint(e.cursor):(o?c.substractPoint(x.cursor):x&&(l.removeSelectionMarker(x),c.addRange(x)),c.addRange(e)),l.inVirtualSelectionMode=!1})}else if(S=="block"){e.stop(),l.inVirtualSelectionMode=!0;var N,C=[],k=function(){var e=l.renderer.pixelToScreenCoordinates(m,g),t=b.screenToDocumentPosition(e.row,e.column,e.offsetX);if(s(E,e)&&s(t,c.lead))return;E=e,l.selection.moveToPosition(t),l.renderer.scrollCursorIntoView(),l.removeSelectionMarkers(C),C=c.rectangularRangeBlock(E,w),l.$mouseHandler.$clickSelection&&C.length==1&&C[0].isEmpty()&&(C[0]=l.$mouseHandler.$clickSelection.clone()),C.forEach(l.addSelectionMarker,l),l.updateSelectionMarkers()};h&&!a?c.toSingleRange():!h&&a&&(N=c.toOrientedRange(),l.addSelectionMarker(N)),o?w=b.documentToScreenPosition(c.lead):c.moveToPosition(p),E={row:-1,column:-1};var L=function(e){k(),clearInterval(O),l.removeSelectionMarkers(C),C.length||(C=[c.toOrientedRange()]),N&&(l.removeSelectionMarker(N),c.toSingleRange(N));for(var t=0;t<C.length;t++)c.addRange(C[t]);l.inVirtualSelectionMode=!1,l.$mouseHandler.$clickSelection=null},A=k;r.capture(l.container,y,L);var O=setInterval(function(){A()},20);return e.preventDefault()}}var r=e("../lib/event"),i=e("../lib/useragent");t.onMouseDown=o}),define("ace/commands/multi_select_commands",["require","exports","module","ace/keyboard/hash_handler"],function(e,t,n){t.defaultCommands=[{name:"addCursorAbove",description:"Add cursor above",exec:function(e){e.selectMoreLines(-1)},bindKey:{win:"Ctrl-Alt-Up",mac:"Ctrl-Alt-Up"},scrollIntoView:"cursor",readOnly:!0},{name:"addCursorBelow",description:"Add cursor below",exec:function(e){e.selectMoreLines(1)},bindKey:{win:"Ctrl-Alt-Down",mac:"Ctrl-Alt-Down"},scrollIntoView:"cursor",readOnly:!0},{name:"addCursorAboveSkipCurrent",description:"Add cursor above (skip current)",exec:function(e){e.selectMoreLines(-1,!0)},bindKey:{win:"Ctrl-Alt-Shift-Up",mac:"Ctrl-Alt-Shift-Up"},scrollIntoView:"cursor",readOnly:!0},{name:"addCursorBelowSkipCurrent",description:"Add cursor below (skip current)",exec:function(e){e.selectMoreLines(1,!0)},bindKey:{win:"Ctrl-Alt-Shift-Down",mac:"Ctrl-Alt-Shift-Down"},scrollIntoView:"cursor",readOnly:!0},{name:"selectMoreBefore",description:"Select more before",exec:function(e){e.selectMore(-1)},bindKey:{win:"Ctrl-Alt-Left",mac:"Ctrl-Alt-Left"},scrollIntoView:"cursor",readOnly:!0},{name:"selectMoreAfter",description:"Select more after",exec:function(e){e.selectMore(1)},bindKey:{win:"Ctrl-Alt-Right",mac:"Ctrl-Alt-Right"},scrollIntoView:"cursor",readOnly:!0},{name:"selectNextBefore",description:"Select next before",exec:function(e){e.selectMore(-1,!0)},bindKey:{win:"Ctrl-Alt-Shift-Left",mac:"Ctrl-Alt-Shift-Left"},scrollIntoView:"cursor",readOnly:!0},{name:"selectNextAfter",description:"Select next after",exec:function(e){e.selectMore(1,!0)},bindKey:{win:"Ctrl-Alt-Shift-Right",mac:"Ctrl-Alt-Shift-Right"},scrollIntoView:"cursor",readOnly:!0},{name:"toggleSplitSelectionIntoLines",description:"Split into lines",exec:function(e){e.multiSelect.rangeCount>1?e.multiSelect.joinSelections():e.multiSelect.splitIntoLines()},bindKey:{win:"Ctrl-Alt-L",mac:"Ctrl-Alt-L"},readOnly:!0},{name:"splitSelectionIntoLines",description:"Split into lines",exec:function(e){e.multiSelect.splitIntoLines()},readOnly:!0},{name:"alignCursors",description:"Align cursors",exec:function(e){e.alignCursors()},bindKey:{win:"Ctrl-Alt-A",mac:"Ctrl-Alt-A"},scrollIntoView:"cursor"},{name:"findAll",description:"Find all",exec:function(e){e.findAll()},bindKey:{win:"Ctrl-Alt-K",mac:"Ctrl-Alt-G"},scrollIntoView:"cursor",readOnly:!0}],t.multiSelectCommands=[{name:"singleSelection",description:"Single selection",bindKey:"esc",exec:function(e){e.exitMultiSelectMode()},scrollIntoView:"cursor",readOnly:!0,isAvailable:function(e){return e&&e.inMultiSelectMode}}];var r=e("../keyboard/hash_handler").HashHandler;t.keyboardHandler=new r(t.multiSelectCommands)}),define("ace/multi_select",["require","exports","module","ace/range_list","ace/range","ace/selection","ace/mouse/multi_select_handler","ace/lib/event","ace/lib/lang","ace/commands/multi_select_commands","ace/search","ace/edit_session","ace/editor","ace/config"],function(e,t,n){function h(e,t,n){return c.$options.wrap=!0,c.$options.needle=t,c.$options.backwards=n==-1,c.find(e)}function v(e,t){return e.row==t.row&&e.column==t.column}function m(e){if(e.$multiselectOnSessionChange)return;e.$onAddRange=e.$onAddRange.bind(e),e.$onRemoveRange=e.$onRemoveRange.bind(e),e.$onMultiSelect=e.$onMultiSelect.bind(e),e.$onSingleSelect=e.$onSingleSelect.bind(e),e.$multiselectOnSessionChange=t.onSessionChange.bind(e),e.$checkMultiselectChange=e.$checkMultiselectChange.bind(e),e.$multiselectOnSessionChange(e),e.on("changeSession",e.$multiselectOnSessionChange),e.on("mousedown",o),e.commands.addCommands(f.defaultCommands),g(e)}function g(e){function r(t){n&&(e.renderer.setMouseCursor(""),n=!1)}if(!e.textInput)return;var t=e.textInput.getElement(),n=!1;u.addListener(t,"keydown",function(t){var i=t.keyCode==18&&!(t.ctrlKey||t.shiftKey||t.metaKey);e.$blockSelectEnabled&&i?n||(e.renderer.setMouseCursor("crosshair"),n=!0):n&&r()}),u.addListener(t,"keyup",r),u.addListener(t,"blur",r)}var r=e("./range_list").RangeList,i=e("./range").Range,s=e("./selection").Selection,o=e("./mouse/multi_select_handler").onMouseDown,u=e("./lib/event"),a=e("./lib/lang"),f=e("./commands/multi_select_commands");t.commands=f.defaultCommands.concat(f.multiSelectCommands);var l=e("./search").Search,c=new l,p=e("./edit_session").EditSession;(function(){this.getSelectionMarkers=function(){return this.$selectionMarkers}}).call(p.prototype),function(){this.ranges=null,this.rangeList=null,this.addRange=function(e,t){if(!e)return;if(!this.inMultiSelectMode&&this.rangeCount===0){var n=this.toOrientedRange();this.rangeList.add(n),this.rangeList.add(e);if(this.rangeList.ranges.length!=2)return this.rangeList.removeAll(),t||this.fromOrientedRange(e);this.rangeList.removeAll(),this.rangeList.add(n),this.$onAddRange(n)}e.cursor||(e.cursor=e.end);var r=this.rangeList.add(e);return this.$onAddRange(e),r.length&&this.$onRemoveRange(r),this.rangeCount>1&&!this.inMultiSelectMode&&(this._signal("multiSelect"),this.inMultiSelectMode=!0,this.session.$undoSelect=!1,this.rangeList.attach(this.session)),t||this.fromOrientedRange(e)},this.toSingleRange=function(e){e=e||this.ranges[0];var t=this.rangeList.removeAll();t.length&&this.$onRemoveRange(t),e&&this.fromOrientedRange(e)},this.substractPoint=function(e){var t=this.rangeList.substractPoint(e);if(t)return this.$onRemoveRange(t),t[0]},this.mergeOverlappingRanges=function(){var e=this.rangeList.merge();e.length&&this.$onRemoveRange(e)},this.$onAddRange=function(e){this.rangeCount=this.rangeList.ranges.length,this.ranges.unshift(e),this._signal("addRange",{range:e})},this.$onRemoveRange=function(e){this.rangeCount=this.rangeList.ranges.length;if(this.rangeCount==1&&this.inMultiSelectMode){var t=this.rangeList.ranges.pop();e.push(t),this.rangeCount=0}for(var n=e.length;n--;){var r=this.ranges.indexOf(e[n]);this.ranges.splice(r,1)}this._signal("removeRange",{ranges:e}),this.rangeCount===0&&this.inMultiSelectMode&&(this.inMultiSelectMode=!1,this._signal("singleSelect"),this.session.$undoSelect=!0,this.rangeList.detach(this.session)),t=t||this.ranges[0],t&&!t.isEqual(this.getRange())&&this.fromOrientedRange(t)},this.$initRangeList=function(){if(this.rangeList)return;this.rangeList=new r,this.ranges=[],this.rangeCount=0},this.getAllRanges=function(){return this.rangeCount?this.rangeList.ranges.concat():[this.getRange()]},this.splitIntoLines=function(){var e=this.ranges.length?this.ranges:[this.getRange()],t=[];for(var n=0;n<e.length;n++){var r=e[n],s=r.start.row,o=r.end.row;if(s===o)t.push(r.clone());else{t.push(new i(s,r.start.column,s,this.session.getLine(s).length));while(++s<o)t.push(this.getLineRange(s,!0));t.push(new i(o,0,o,r.end.column))}n==0&&!this.isBackwards()&&(t=t.reverse())}this.toSingleRange();for(var n=t.length;n--;)this.addRange(t[n])},this.joinSelections=function(){var e=this.rangeList.ranges,t=e[e.length-1],n=i.fromPoints(e[0].start,t.end);this.toSingleRange(),this.setSelectionRange(n,t.cursor==t.start)},this.toggleBlockSelection=function(){if(this.rangeCount>1){var e=this.rangeList.ranges,t=e[e.length-1],n=i.fromPoints(e[0].start,t.end);this.toSingleRange(),this.setSelectionRange(n,t.cursor==t.start)}else{var r=this.session.documentToScreenPosition(this.cursor),s=this.session.documentToScreenPosition(this.anchor),o=this.rectangularRangeBlock(r,s);o.forEach(this.addRange,this)}},this.rectangularRangeBlock=function(e,t,n){var r=[],s=e.column<t.column;if(s)var o=e.column,u=t.column,a=e.offsetX,f=t.offsetX;else var o=t.column,u=e.column,a=t.offsetX,f=e.offsetX;var l=e.row<t.row;if(l)var c=e.row,h=t.row;else var c=t.row,h=e.row;o<0&&(o=0),c<0&&(c=0),c==h&&(n=!0);var p;for(var d=c;d<=h;d++){var m=i.fromPoints(this.session.screenToDocumentPosition(d,o,a),this.session.screenToDocumentPosition(d,u,f));if(m.isEmpty()){if(p&&v(m.end,p))break;p=m.end}m.cursor=s?m.start:m.end,r.push(m)}l&&r.reverse();if(!n){var g=r.length-1;while(r[g].isEmpty()&&g>0)g--;if(g>0){var y=0;while(r[y].isEmpty())y++}for(var b=g;b>=y;b--)r[b].isEmpty()&&r.splice(b,1)}return r}}.call(s.prototype);var d=e("./editor").Editor;(function(){this.updateSelectionMarkers=function(){this.renderer.updateCursor(),this.renderer.updateBackMarkers()},this.addSelectionMarker=function(e){e.cursor||(e.cursor=e.end);var t=this.getSelectionStyle();return e.marker=this.session.addMarker(e,"ace_selection",t),this.session.$selectionMarkers.push(e),this.session.selectionMarkerCount=this.session.$selectionMarkers.length,e},this.removeSelectionMarker=function(e){if(!e.marker)return;this.session.removeMarker(e.marker);var t=this.session.$selectionMarkers.indexOf(e);t!=-1&&this.session.$selectionMarkers.splice(t,1),this.session.selectionMarkerCount=this.session.$selectionMarkers.length},this.removeSelectionMarkers=function(e){var t=this.session.$selectionMarkers;for(var n=e.length;n--;){var r=e[n];if(!r.marker)continue;this.session.removeMarker(r.marker);var i=t.indexOf(r);i!=-1&&t.splice(i,1)}this.session.selectionMarkerCount=t.length},this.$onAddRange=function(e){this.addSelectionMarker(e.range),this.renderer.updateCursor(),this.renderer.updateBackMarkers()},this.$onRemoveRange=function(e){this.removeSelectionMarkers(e.ranges),this.renderer.updateCursor(),this.renderer.updateBackMarkers()},this.$onMultiSelect=function(e){if(this.inMultiSelectMode)return;this.inMultiSelectMode=!0,this.setStyle("ace_multiselect"),this.keyBinding.addKeyboardHandler(f.keyboardHandler),this.commands.setDefaultHandler("exec",this.$onMultiSelectExec),this.renderer.updateCursor(),this.renderer.updateBackMarkers()},this.$onSingleSelect=function(e){if(this.session.multiSelect.inVirtualMode)return;this.inMultiSelectMode=!1,this.unsetStyle("ace_multiselect"),this.keyBinding.removeKeyboardHandler(f.keyboardHandler),this.commands.removeDefaultHandler("exec",this.$onMultiSelectExec),this.renderer.updateCursor(),this.renderer.updateBackMarkers(),this._emit("changeSelection")},this.$onMultiSelectExec=function(e){var t=e.command,n=e.editor;if(!n.multiSelect)return;if(!t.multiSelectAction){var r=t.exec(n,e.args||{});n.multiSelect.addRange(n.multiSelect.toOrientedRange()),n.multiSelect.mergeOverlappingRanges()}else t.multiSelectAction=="forEach"?r=n.forEachSelection(t,e.args):t.multiSelectAction=="forEachLine"?r=n.forEachSelection(t,e.args,!0):t.multiSelectAction=="single"?(n.exitMultiSelectMode(),r=t.exec(n,e.args||{})):r=t.multiSelectAction(n,e.args||{});return r},this.forEachSelection=function(e,t,n){if(this.inVirtualSelectionMode)return;var r=n&&n.keepOrder,i=n==1||n&&n.$byLines,o=this.session,u=this.selection,a=u.rangeList,f=(r?u:a).ranges,l;if(!f.length)return e.exec?e.exec(this,t||{}):e(this,t||{});var c=u._eventRegistry;u._eventRegistry={};var h=new s(o);this.inVirtualSelectionMode=!0;for(var p=f.length;p--;){if(i)while(p>0&&f[p].start.row==f[p-1].end.row)p--;h.fromOrientedRange(f[p]),h.index=p,this.selection=o.selection=h;var d=e.exec?e.exec(this,t||{}):e(this,t||{});!l&&d!==undefined&&(l=d),h.toOrientedRange(f[p])}h.detach(),this.selection=o.selection=u,this.inVirtualSelectionMode=!1,u._eventRegistry=c,u.mergeOverlappingRanges(),u.ranges[0]&&u.fromOrientedRange(u.ranges[0]);var v=this.renderer.$scrollAnimation;return this.onCursorChange(),this.onSelectionChange(),v&&v.from==v.to&&this.renderer.animateScrolling(v.from),l},this.exitMultiSelectMode=function(){if(!this.inMultiSelectMode||this.inVirtualSelectionMode)return;this.multiSelect.toSingleRange()},this.getSelectedText=function(){var e="";if(this.inMultiSelectMode&&!this.inVirtualSelectionMode){var t=this.multiSelect.rangeList.ranges,n=[];for(var r=0;r<t.length;r++)n.push(this.session.getTextRange(t[r]));var i=this.session.getDocument().getNewLineCharacter();e=n.join(i),e.length==(n.length-1)*i.length&&(e="")}else this.selection.isEmpty()||(e=this.session.getTextRange(this.getSelectionRange()));return e},this.$checkMultiselectChange=function(e,t){if(this.inMultiSelectMode&&!this.inVirtualSelectionMode){var n=this.multiSelect.ranges[0];if(this.multiSelect.isEmpty()&&t==this.multiSelect.anchor)return;var r=t==this.multiSelect.anchor?n.cursor==n.start?n.end:n.start:n.cursor;r.row!=t.row||this.session.$clipPositionToDocument(r.row,r.column).column!=t.column?this.multiSelect.toSingleRange(this.multiSelect.toOrientedRange()):this.multiSelect.mergeOverlappingRanges()}},this.findAll=function(e,t,n){t=t||{},t.needle=e||t.needle;if(t.needle==undefined){var r=this.selection.isEmpty()?this.selection.getWordRange():this.selection.getRange();t.needle=this.session.getTextRange(r)}this.$search.set(t);var i=this.$search.findAll(this.session);if(!i.length)return 0;var s=this.multiSelect;n||s.toSingleRange(i[0]);for(var o=i.length;o--;)s.addRange(i[o],!0);return r&&s.rangeList.rangeAtPoint(r.start)&&s.addRange(r,!0),i.length},this.selectMoreLines=function(e,t){var n=this.selection.toOrientedRange(),r=n.cursor==n.end,s=this.session.documentToScreenPosition(n.cursor);this.selection.$desiredColumn&&(s.column=this.selection.$desiredColumn);var o=this.session.screenToDocumentPosition(s.row+e,s.column);if(!n.isEmpty())var u=this.session.documentToScreenPosition(r?n.end:n.start),a=this.session.screenToDocumentPosition(u.row+e,u.column);else var a=o;if(r){var f=i.fromPoints(o,a);f.cursor=f.start}else{var f=i.fromPoints(a,o);f.cursor=f.end}f.desiredColumn=s.column;if(!this.selection.inMultiSelectMode)this.selection.addRange(n);else if(t)var l=n.cursor;this.selection.addRange(f),l&&this.selection.substractPoint(l)},this.transposeSelections=function(e){var t=this.session,n=t.multiSelect,r=n.ranges;for(var i=r.length;i--;){var s=r[i];if(s.isEmpty()){var o=t.getWordRange(s.start.row,s.start.column);s.start.row=o.start.row,s.start.column=o.start.column,s.end.row=o.end.row,s.end.column=o.end.column}}n.mergeOverlappingRanges();var u=[];for(var i=r.length;i--;){var s=r[i];u.unshift(t.getTextRange(s))}e<0?u.unshift(u.pop()):u.push(u.shift());for(var i=r.length;i--;){var s=r[i],o=s.clone();t.replace(s,u[i]),s.start.row=o.start.row,s.start.column=o.start.column}n.fromOrientedRange(n.ranges[0])},this.selectMore=function(e,t,n){var r=this.session,i=r.multiSelect,s=i.toOrientedRange();if(s.isEmpty()){s=r.getWordRange(s.start.row,s.start.column),s.cursor=e==-1?s.start:s.end,this.multiSelect.addRange(s);if(n)return}var o=r.getTextRange(s),u=h(r,o,e);u&&(u.cursor=e==-1?u.start:u.end,this.session.unfold(u),this.multiSelect.addRange(u),this.renderer.scrollCursorIntoView(null,.5)),t&&this.multiSelect.substractPoint(s.cursor)},this.alignCursors=function(){var e=this.session,t=e.multiSelect,n=t.ranges,r=-1,s=n.filter(function(e){if(e.cursor.row==r)return!0;r=e.cursor.row});if(!n.length||s.length==n.length-1){var o=this.selection.getRange(),u=o.start.row,f=o.end.row,l=u==f;if(l){var c=this.session.getLength(),h;do h=this.session.getLine(f);while(/[=:]/.test(h)&&++f<c);do h=this.session.getLine(u);while(/[=:]/.test(h)&&--u>0);u<0&&(u=0),f>=c&&(f=c-1)}var p=this.session.removeFullLines(u,f);p=this.$reAlignText(p,l),this.session.insert({row:u,column:0},p.join("\n")+"\n"),l||(o.start.column=0,o.end.column=p[p.length-1].length),this.selection.setRange(o)}else{s.forEach(function(e){t.substractPoint(e.cursor)});var d=0,v=Infinity,m=n.map(function(t){var n=t.cursor,r=e.getLine(n.row),i=r.substr(n.column).search(/\S/g);return i==-1&&(i=0),n.column>d&&(d=n.column),i<v&&(v=i),i});n.forEach(function(t,n){var r=t.cursor,s=d-r.column,o=m[n]-v;s>o?e.insert(r,a.stringRepeat(" ",s-o)):e.remove(new i(r.row,r.column,r.row,r.column-s+o)),t.start.column=t.end.column=d,t.start.row=t.end.row=r.row,t.cursor=t.end}),t.fromOrientedRange(n[0]),this.renderer.updateCursor(),this.renderer.updateBackMarkers()}},this.$reAlignText=function(e,t){function u(e){return a.stringRepeat(" ",e)}function f(e){return e[2]?u(i)+e[2]+u(s-e[2].length+o)+e[4].replace(/^([=:])\s+/,"$1 "):e[0]}function l(e){return e[2]?u(i+s-e[2].length)+e[2]+u(o)+e[4].replace(/^([=:])\s+/,"$1 "):e[0]}function c(e){return e[2]?u(i)+e[2]+u(o)+e[4].replace(/^([=:])\s+/,"$1 "):e[0]}var n=!0,r=!0,i,s,o;return e.map(function(e){var t=e.match(/(\s*)(.*?)(\s*)([=:].*)/);return t?i==null?(i=t[1].length,s=t[2].length,o=t[3].length,t):(i+s+o!=t[1].length+t[2].length+t[3].length&&(r=!1),i!=t[1].length&&(n=!1),i>t[1].length&&(i=t[1].length),s<t[2].length&&(s=t[2].length),o>t[3].length&&(o=t[3].length),t):[e]}).map(t?f:n?r?l:f:c)}}).call(d.prototype),t.onSessionChange=function(e){var t=e.session;t&&!t.multiSelect&&(t.$selectionMarkers=[],t.selection.$initRangeList(),t.multiSelect=t.selection),this.multiSelect=t&&t.multiSelect;var n=e.oldSession;n&&(n.multiSelect.off("addRange",this.$onAddRange),n.multiSelect.off("removeRange",this.$onRemoveRange),n.multiSelect.off("multiSelect",this.$onMultiSelect),n.multiSelect.off("singleSelect",this.$onSingleSelect),n.multiSelect.lead.off("change",this.$checkMultiselectChange),n.multiSelect.anchor.off("change",this.$checkMultiselectChange)),t&&(t.multiSelect.on("addRange",this.$onAddRange),t.multiSelect.on("removeRange",this.$onRemoveRange),t.multiSelect.on("multiSelect",this.$onMultiSelect),t.multiSelect.on("singleSelect",this.$onSingleSelect),t.multiSelect.lead.on("change",this.$checkMultiselectChange),t.multiSelect.anchor.on("change",this.$checkMultiselectChange)),t&&this.inMultiSelectMode!=t.selection.inMultiSelectMode&&(t.selection.inMultiSelectMode?this.$onMultiSelect():this.$onSingleSelect())},t.MultiSelect=m,e("./config").defineOptions(d.prototype,"editor",{enableMultiselect:{set:function(e){m(this),e?(this.on("changeSession",this.$multiselectOnSessionChange),this.on("mousedown",o)):(this.off("changeSession",this.$multiselectOnSessionChange),this.off("mousedown",o))},value:!0},enableBlockSelect:{set:function(e){this.$blockSelectEnabled=e},value:!0}})}),define("ace/mode/folding/fold_mode",["require","exports","module","ace/range"],function(e,t,n){"use strict";var r=e("../../range").Range,i=t.FoldMode=function(){};(function(){this.foldingStartMarker=null,this.foldingStopMarker=null,this.getFoldWidget=function(e,t,n){var r=e.getLine(n);return this.foldingStartMarker.test(r)?"start":t=="markbeginend"&&this.foldingStopMarker&&this.foldingStopMarker.test(r)?"end":""},this.getFoldWidgetRange=function(e,t,n){return null},this.indentationBlock=function(e,t,n){var i=/\S/,s=e.getLine(t),o=s.search(i);if(o==-1)return;var u=n||s.length,a=e.getLength(),f=t,l=t;while(++t<a){var c=e.getLine(t).search(i);if(c==-1)continue;if(c<=o){var h=e.getTokenAt(t,0);if(!h||h.type!=="string")break}l=t}if(l>f){var p=e.getLine(l).length;return new r(f,u,l,p)}},this.openingBracketBlock=function(e,t,n,i,s){var o={row:n,column:i+1},u=e.$findClosingBracket(t,o,s);if(!u)return;var a=e.foldWidgets[u.row];return a==null&&(a=e.getFoldWidget(u.row)),a=="start"&&u.row>o.row&&(u.row--,u.column=e.getLine(u.row).length),r.fromPoints(o,u)},this.closingBracketBlock=function(e,t,n,i,s){var o={row:n,column:i},u=e.$findOpeningBracket(t,o);if(!u)return;return u.column++,o.column--,r.fromPoints(u,o)}}).call(i.prototype)}),define("ace/theme/textmate",["require","exports","module","ace/lib/dom"],function(e,t,n){"use strict";t.isDark=!1,t.cssClass="ace-tm",t.cssText='.ace-tm .ace_gutter {background: #f0f0f0;color: #333;}.ace-tm .ace_print-margin {width: 1px;background: #e8e8e8;}.ace-tm .ace_fold {background-color: #6B72E6;}.ace-tm {background-color: #FFFFFF;color: black;}.ace-tm .ace_cursor {color: black;}.ace-tm .ace_invisible {color: rgb(191, 191, 191);}.ace-tm .ace_storage,.ace-tm .ace_keyword {color: blue;}.ace-tm .ace_constant {color: rgb(197, 6, 11);}.ace-tm .ace_constant.ace_buildin {color: rgb(88, 72, 246);}.ace-tm .ace_constant.ace_language {color: rgb(88, 92, 246);}.ace-tm .ace_constant.ace_library {color: rgb(6, 150, 14);}.ace-tm .ace_invalid {background-color: rgba(255, 0, 0, 0.1);color: red;}.ace-tm .ace_support.ace_function {color: rgb(60, 76, 114);}.ace-tm .ace_support.ace_constant {color: rgb(6, 150, 14);}.ace-tm .ace_support.ace_type,.ace-tm .ace_support.ace_class {color: rgb(109, 121, 222);}.ace-tm .ace_keyword.ace_operator {color: rgb(104, 118, 135);}.ace-tm .ace_string {color: rgb(3, 106, 7);}.ace-tm .ace_comment {color: rgb(76, 136, 107);}.ace-tm .ace_comment.ace_doc {color: rgb(0, 102, 255);}.ace-tm .ace_comment.ace_doc.ace_tag {color: rgb(128, 159, 191);}.ace-tm .ace_constant.ace_numeric {color: rgb(0, 0, 205);}.ace-tm .ace_variable {color: rgb(49, 132, 149);}.ace-tm .ace_xml-pe {color: rgb(104, 104, 91);}.ace-tm .ace_entity.ace_name.ace_function {color: #0000A2;}.ace-tm .ace_heading {color: rgb(12, 7, 255);}.ace-tm .ace_list {color:rgb(185, 6, 144);}.ace-tm .ace_meta.ace_tag {color:rgb(0, 22, 142);}.ace-tm .ace_string.ace_regex {color: rgb(255, 0, 0)}.ace-tm .ace_marker-layer .ace_selection {background: rgb(181, 213, 255);}.ace-tm.ace_multiselect .ace_selection.ace_start {box-shadow: 0 0 3px 0px white;}.ace-tm .ace_marker-layer .ace_step {background: rgb(252, 255, 0);}.ace-tm .ace_marker-layer .ace_stack {background: rgb(164, 229, 101);}.ace-tm .ace_marker-layer .ace_bracket {margin: -1px 0 0 -1px;border: 1px solid rgb(192, 192, 192);}.ace-tm .ace_marker-layer .ace_active-line {background: rgba(0, 0, 0, 0.07);}.ace-tm .ace_gutter-active-line {background-color : #dcdcdc;}.ace-tm .ace_marker-layer .ace_selected-word {background: rgb(250, 250, 255);border: 1px solid rgb(200, 200, 250);}.ace-tm .ace_indent-guide {background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bLly//BwAmVgd1/w11/gAAAABJRU5ErkJggg==") right repeat-y;}',t.$id="ace/theme/textmate";var r=e("../lib/dom");r.importCssString(t.cssText,t.cssClass)}),define("ace/line_widgets",["require","exports","module","ace/lib/dom"],function(e,t,n){"use strict";function i(e){this.session=e,this.session.widgetManager=this,this.session.getRowLength=this.getRowLength,this.session.$getWidgetScreenLength=this.$getWidgetScreenLength,this.updateOnChange=this.updateOnChange.bind(this),this.renderWidgets=this.renderWidgets.bind(this),this.measureWidgets=this.measureWidgets.bind(this),this.session._changedWidgets=[],this.$onChangeEditor=this.$onChangeEditor.bind(this),this.session.on("change",this.updateOnChange),this.session.on("changeFold",this.updateOnFold),this.session.on("changeEditor",this.$onChangeEditor)}var r=e("./lib/dom");(function(){this.getRowLength=function(e){var t;return this.lineWidgets?t=this.lineWidgets[e]&&this.lineWidgets[e].rowCount||0:t=0,!this.$useWrapMode||!this.$wrapData[e]?1+t:this.$wrapData[e].length+1+t},this.$getWidgetScreenLength=function(){var e=0;return this.lineWidgets.forEach(function(t){t&&t.rowCount&&!t.hidden&&(e+=t.rowCount)}),e},this.$onChangeEditor=function(e){this.attach(e.editor)},this.attach=function(e){e&&e.widgetManager&&e.widgetManager!=this&&e.widgetManager.detach();if(this.editor==e)return;this.detach(),this.editor=e,e&&(e.widgetManager=this,e.renderer.on("beforeRender",this.measureWidgets),e.renderer.on("afterRender",this.renderWidgets))},this.detach=function(e){var t=this.editor;if(!t)return;this.editor=null,t.widgetManager=null,t.renderer.off("beforeRender",this.measureWidgets),t.renderer.off("afterRender",this.renderWidgets);var n=this.session.lineWidgets;n&&n.forEach(function(e){e&&e.el&&e.el.parentNode&&(e._inDocument=!1,e.el.parentNode.removeChild(e.el))})},this.updateOnFold=function(e,t){var n=t.lineWidgets;if(!n||!e.action)return;var r=e.data,i=r.start.row,s=r.end.row,o=e.action=="add";for(var u=i+1;u<s;u++)n[u]&&(n[u].hidden=o);n[s]&&(o?n[i]?n[s].hidden=o:n[i]=n[s]:(n[i]==n[s]&&(n[i]=undefined),n[s].hidden=o))},this.updateOnChange=function(e){var t=this.session.lineWidgets;if(!t)return;var n=e.start.row,r=e.end.row-n;if(r!==0)if(e.action=="remove"){var i=t.splice(n+1,r);!t[n]&&i[i.length-1]&&(t[n]=i.pop()),i.forEach(function(e){e&&this.removeLineWidget(e)},this),this.$updateRows()}else{var s=new Array(r);t[n]&&t[n].column!=null&&e.start.column>t[n].column&&n++,s.unshift(n,0),t.splice.apply(t,s),this.$updateRows()}},this.$updateRows=function(){var e=this.session.lineWidgets;if(!e)return;var t=!0;e.forEach(function(e,n){if(e){t=!1,e.row=n;while(e.$oldWidget)e.$oldWidget.row=n,e=e.$oldWidget}}),t&&(this.session.lineWidgets=null)},this.$registerLineWidget=function(e){this.session.lineWidgets||(this.session.lineWidgets=new Array(this.session.getLength()));var t=this.session.lineWidgets[e.row];return t&&(e.$oldWidget=t,t.el&&t.el.parentNode&&(t.el.parentNode.removeChild(t.el),t._inDocument=!1)),this.session.lineWidgets[e.row]=e,e},this.addLineWidget=function(e){this.$registerLineWidget(e),e.session=this.session;if(!this.editor)return e;var t=this.editor.renderer;e.html&&!e.el&&(e.el=r.createElement("div"),e.el.innerHTML=e.html),e.el&&(r.addCssClass(e.el,"ace_lineWidgetContainer"),e.el.style.position="absolute",e.el.style.zIndex=5,t.container.appendChild(e.el),e._inDocument=!0,e.coverGutter||(e.el.style.zIndex=3),e.pixelHeight==null&&(e.pixelHeight=e.el.offsetHeight)),e.rowCount==null&&(e.rowCount=e.pixelHeight/t.layerConfig.lineHeight);var n=this.session.getFoldAt(e.row,0);e.$fold=n;if(n){var i=this.session.lineWidgets;e.row==n.end.row&&!i[n.start.row]?i[n.start.row]=e:e.hidden=!0}return this.session._emit("changeFold",{data:{start:{row:e.row}}}),this.$updateRows(),this.renderWidgets(null,t),this.onWidgetChanged(e),e},this.removeLineWidget=function(e){e._inDocument=!1,e.session=null,e.el&&e.el.parentNode&&e.el.parentNode.removeChild(e.el);if(e.editor&&e.editor.destroy)try{e.editor.destroy()}catch(t){}if(this.session.lineWidgets){var n=this.session.lineWidgets[e.row];if(n==e)this.session.lineWidgets[e.row]=e.$oldWidget,e.$oldWidget&&this.onWidgetChanged(e.$oldWidget);else while(n){if(n.$oldWidget==e){n.$oldWidget=e.$oldWidget;break}n=n.$oldWidget}}this.session._emit("changeFold",{data:{start:{row:e.row}}}),this.$updateRows()},this.getWidgetsAtRow=function(e){var t=this.session.lineWidgets,n=t&&t[e],r=[];while(n)r.push(n),n=n.$oldWidget;return r},this.onWidgetChanged=function(e){this.session._changedWidgets.push(e),this.editor&&this.editor.renderer.updateFull()},this.measureWidgets=function(e,t){var n=this.session._changedWidgets,r=t.layerConfig;if(!n||!n.length)return;var i=Infinity;for(var s=0;s<n.length;s++){var o=n[s];if(!o||!o.el)continue;if(o.session!=this.session)continue;if(!o._inDocument){if(this.session.lineWidgets[o.row]!=o)continue;o._inDocument=!0,t.container.appendChild(o.el)}o.h=o.el.offsetHeight,o.fixedWidth||(o.w=o.el.offsetWidth,o.screenWidth=Math.ceil(o.w/r.characterWidth));var u=o.h/r.lineHeight;o.coverLine&&(u-=this.session.getRowLineCount(o.row),u<0&&(u=0)),o.rowCount!=u&&(o.rowCount=u,o.row<i&&(i=o.row))}i!=Infinity&&(this.session._emit("changeFold",{data:{start:{row:i}}}),this.session.lineWidgetWidth=null),this.session._changedWidgets=[]},this.renderWidgets=function(e,t){var n=t.layerConfig,r=this.session.lineWidgets;if(!r)return;var i=Math.min(this.firstRow,n.firstRow),s=Math.max(this.lastRow,n.lastRow,r.length);while(i>0&&!r[i])i--;this.firstRow=n.firstRow,this.lastRow=n.lastRow,t.$cursorLayer.config=n;for(var o=i;o<=s;o++){var u=r[o];if(!u||!u.el)continue;if(u.hidden){u.el.style.top=-100-(u.pixelHeight||0)+"px";continue}u._inDocument||(u._inDocument=!0,t.container.appendChild(u.el));var a=t.$cursorLayer.getPixelPosition({row:o,column:0},!0).top;u.coverLine||(a+=n.lineHeight*this.session.getRowLineCount(u.row)),u.el.style.top=a-n.offset+"px";var f=u.coverGutter?0:t.gutterWidth;u.fixedWidth||(f-=t.scrollLeft),u.el.style.left=f+"px",u.fullWidth&&u.screenWidth&&(u.el.style.minWidth=n.width+2*n.padding+"px"),u.fixedWidth?u.el.style.right=t.scrollBar.getWidth()+"px":u.el.style.right=""}}}).call(i.prototype),t.LineWidgets=i}),define("ace/ext/error_marker",["require","exports","module","ace/line_widgets","ace/lib/dom","ace/range"],function(e,t,n){"use strict";function o(e,t,n){var r=0,i=e.length-1;while(r<=i){var s=r+i>>1,o=n(t,e[s]);if(o>0)r=s+1;else{if(!(o<0))return s;i=s-1}}return-(r+1)}function u(e,t,n){var r=e.getAnnotations().sort(s.comparePoints);if(!r.length)return;var i=o(r,{row:t,column:-1},s.comparePoints);i<0&&(i=-i-1),i>=r.length?i=n>0?0:r.length-1:i===0&&n<0&&(i=r.length-1);var u=r[i];if(!u||!n)return;if(u.row===t){do u=r[i+=n];while(u&&u.row===t);if(!u)return r.slice()}var a=[];t=u.row;do a[n<0?"unshift":"push"](u),u=r[i+=n];while(u&&u.row==t);return a.length&&a}var r=e("../line_widgets").LineWidgets,i=e("../lib/dom"),s=e("../range").Range;t.showErrorMarker=function(e,t){var n=e.session;n.widgetManager||(n.widgetManager=new r(n),n.widgetManager.attach(e));var s=e.getCursorPosition(),o=s.row,a=n.widgetManager.getWidgetsAtRow(o).filter(function(e){return e.type=="errorMarker"})[0];a?a.destroy():o-=t;var f=u(n,o,t),l;if(f){var c=f[0];s.column=(c.pos&&typeof c.column!="number"?c.pos.sc:c.column)||0,s.row=c.row,l=e.renderer.$gutterLayer.$annotations[s.row]}else{if(a)return;l={text:["Looks good!"],className:"ace_ok"}}e.session.unfold(s.row),e.selection.moveToPosition(s);var h={row:s.row,fixedWidth:!0,coverGutter:!0,el:i.createElement("div"),type:"errorMarker"},p=h.el.appendChild(i.createElement("div")),d=h.el.appendChild(i.createElement("div"));d.className="error_widget_arrow "+l.className;var v=e.renderer.$cursorLayer.getPixelPosition(s).left;d.style.left=v+e.renderer.gutterWidth-5+"px",h.el.className="error_widget_wrapper",p.className="error_widget "+l.className,p.innerHTML=l.text.join("<br>"),p.appendChild(i.createElement("div"));var m=function(e,t,n){if(t===0&&(n==="esc"||n==="return"))return h.destroy(),{command:"null"}};h.destroy=function(){if(e.$mouseHandler.isMousePressed)return;e.keyBinding.removeKeyboardHandler(m),n.widgetManager.removeLineWidget(h),e.off("changeSelection",h.destroy),e.off("changeSession",h.destroy),e.off("mouseup",h.destroy),e.off("change",h.destroy)},e.keyBinding.addKeyboardHandler(m),e.on("changeSelection",h.destroy),e.on("changeSession",h.destroy),e.on("mouseup",h.destroy),e.on("change",h.destroy),e.session.widgetManager.addLineWidget(h),h.el.onmousedown=e.focus.bind(e),e.renderer.scrollCursorIntoView(null,.5,{bottom:h.el.offsetHeight})},i.importCssString("    .error_widget_wrapper {        background: inherit;        color: inherit;        border:none    }    .error_widget {        border-top: solid 2px;        border-bottom: solid 2px;        margin: 5px 0;        padding: 10px 40px;        white-space: pre-wrap;    }    .error_widget.ace_error, .error_widget_arrow.ace_error{        border-color: #ff5a5a    }    .error_widget.ace_warning, .error_widget_arrow.ace_warning{        border-color: #F1D817    }    .error_widget.ace_info, .error_widget_arrow.ace_info{        border-color: #5a5a5a    }    .error_widget.ace_ok, .error_widget_arrow.ace_ok{        border-color: #5aaa5a    }    .error_widget_arrow {        position: absolute;        border: solid 5px;        border-top-color: transparent!important;        border-right-color: transparent!important;        border-left-color: transparent!important;        top: -5px;    }","")}),define("ace/ace",["require","exports","module","ace/lib/fixoldbrowsers","ace/lib/dom","ace/lib/event","ace/range","ace/editor","ace/edit_session","ace/undomanager","ace/virtual_renderer","ace/worker/worker_client","ace/keyboard/hash_handler","ace/placeholder","ace/multi_select","ace/mode/folding/fold_mode","ace/theme/textmate","ace/ext/error_marker","ace/config"],function(e,t,n){"use strict";e("./lib/fixoldbrowsers");var r=e("./lib/dom"),i=e("./lib/event"),s=e("./range").Range,o=e("./editor").Editor,u=e("./edit_session").EditSession,a=e("./undomanager").UndoManager,f=e("./virtual_renderer").VirtualRenderer;e("./worker/worker_client"),e("./keyboard/hash_handler"),e("./placeholder"),e("./multi_select"),e("./mode/folding/fold_mode"),e("./theme/textmate"),e("./ext/error_marker"),t.config=e("./config"),t.require=e,typeof define=="function"&&(t.define=define),t.edit=function(e,n){if(typeof e=="string"){var s=e;e=document.getElementById(s);if(!e)throw new Error("ace.edit can't find div #"+s)}if(e&&e.env&&e.env.editor instanceof o)return e.env.editor;var u="";if(e&&/input|textarea/i.test(e.tagName)){var a=e;u=a.value,e=r.createElement("pre"),a.parentNode.replaceChild(e,a)}else e&&(u=e.textContent,e.innerHTML="");var l=t.createEditSession(u),c=new o(new f(e),l,n),h={document:l,editor:c,onResize:c.resize.bind(c,null)};return a&&(h.textarea=a),i.addListener(window,"resize",h.onResize),c.on("destroy",function(){i.removeListener(window,"resize",h.onResize),h.editor.container.env=null}),c.container.env=c.env=h,c},t.createEditSession=function(e,t){var n=new u(e,t);return n.setUndoManager(new a),n},t.Range=s,t.Editor=o,t.EditSession=u,t.UndoManager=a,t.VirtualRenderer=f,t.version=t.config.version});            (function() {
                window.require(["ace/ace"], function(a) {
                    if (a) {
                        a.config.init(true);
                        a.define = window.define;
                    }
                    if (!window.ace)
                        window.ace = a;
                    for (var key in a) if (a.hasOwnProperty(key))
                        window.ace[key] = a[key];
                    window.ace["default"] = window.ace;
                    if (typeof module == "object" && typeof exports == "object" && module) {
                        module.exports = window.ace;
                    }
                });
            })();
        
