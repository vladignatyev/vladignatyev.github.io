/* MIT https://github.com/kenwheeler/cash */
(function(){
'use strict';var e={"class":"className",contenteditable:"contentEditable","for":"htmlFor",readonly:"readOnly",maxlength:"maxLength",tabindex:"tabIndex",colspan:"colSpan",rowspan:"rowSpan",usemap:"useMap"};function g(a,b){try{return a(b)}catch(c){return b}}
var m=document,n=window,p=m.documentElement,r=m.createElement.bind(m),aa=r("div"),t=r("table"),ba=r("tbody"),ca=r("tr"),u=Array.isArray,v=Array.prototype,da=v.concat,w=v.filter,ea=v.indexOf,fa=v.map,ha=v.push,ia=v.slice,x=v.some,ja=v.splice,ka=/^#[\w-]*$/,la=/^\.[\w-]*$/,ma=/<.+>/,na=/^\w+$/;function y(a,b){return a&&(A(b)||B(b))?la.test(a)?b.getElementsByClassName(a.slice(1)):na.test(a)?b.getElementsByTagName(a):b.querySelectorAll(a):[]}
var C=function(){function a(a,c){if(a){if(a instanceof C)return a;var b=a;if(D(a)){if(b=(c instanceof C?c[0]:c)||m,b=ka.test(a)?b.getElementById(a.slice(1)):ma.test(a)?oa(a):y(a,b),!b)return}else if(E(a))return this.ready(a);if(b.nodeType||b===n)b=[b];this.length=b.length;a=0;for(c=this.length;a<c;a++)this[a]=b[a]}}a.prototype.init=function(b,c){return new a(b,c)};return a}(),F=C.prototype,G=F.init;G.fn=G.prototype=F;F.length=0;F.splice=ja;"function"===typeof Symbol&&(F[Symbol.iterator]=v[Symbol.iterator]);
F.map=function(a){return G(da.apply([],fa.call(this,function(b,c){return a.call(b,c,b)})))};F.slice=function(a,b){return G(ia.call(this,a,b))};var pa=/-([a-z])/g;function H(a){return a.replace(pa,function(a,c){return c.toUpperCase()})}function I(a,b,c){if(c)for(c=a.length;c--&&!1!==b.call(a[c],c,a[c]););else{c=0;for(var d=a.length;c<d&&!1!==b.call(a[c],c,a[c]);c++);}return a}G.each=I;F.each=function(a){return I(this,a)};F.removeProp=function(a){return this.each(function(b,c){delete c[e[a]||a]})};
function J(a){for(var b=1;b<arguments.length;b++);b=arguments.length;if(!b)return{};if(1===b)return J(G,a);for(var c=1;c<b;c++)for(var d in arguments[c])a[d]=arguments[c][d];return a}G.extend=J;F.extend=function(a){return J(F,a)};G.guid=1;function qa(a,b){var c=a&&(a.matches||a.webkitMatchesSelector||a.msMatchesSelector);return!!c&&!!b&&c.call(a,b)}function K(a){return!!a&&a===a.window}function A(a){return!!a&&9===a.nodeType}function B(a){return!!a&&1===a.nodeType}
function E(a){return"function"===typeof a}function D(a){return"string"===typeof a}function ra(a){return!isNaN(parseFloat(a))&&isFinite(a)}G.isWindow=K;G.isFunction=E;G.isNumeric=ra;G.isArray=u;F.prop=function(a,b){if(a){if(D(a))return a=e[a]||a,2>arguments.length?this[0]&&this[0][a]:this.each(function(c,h){h[a]=b});for(var c in a)this.prop(c,a[c]);return this}};F.get=function(a){if(void 0===a)return ia.call(this);a=Number(a);return this[0>a?a+this.length:a]};F.eq=function(a){return G(this.get(a))};
F.first=function(){return this.eq(0)};F.last=function(){return this.eq(-1)};function L(a){return D(a)?function(b,c){return qa(c,a)}:E(a)?a:a instanceof C?function(b,c){return a.is(c)}:a?function(b,c){return c===a}:function(){return!1}}F.filter=function(a){var b=L(a);return G(w.call(this,function(a,d){return b.call(a,d,a)}))};function M(a,b){return b?a.filter(b):a}var sa=/\S+/g;function N(a){return D(a)?a.match(sa)||[]:[]}F.hasClass=function(a){return!!a&&x.call(this,function(b){return B(b)&&b.classList.contains(a)})};
F.removeAttr=function(a){var b=N(a);return this.each(function(a,d){B(d)&&I(b,function(a,b){d.removeAttribute(b)})})};F.attr=function(a,b){if(a){if(D(a)){if(2>arguments.length){if(!this[0]||!B(this[0]))return;var c=this[0].getAttribute(a);return null===c?void 0:c}return void 0===b?this:null===b?this.removeAttr(a):this.each(function(c,h){B(h)&&h.setAttribute(a,b)})}for(c in a)this.attr(c,a[c]);return this}};
F.toggleClass=function(a,b){var c=N(a),d=void 0!==b;return this.each(function(a,f){B(f)&&I(c,function(a,c){d?b?f.classList.add(c):f.classList.remove(c):f.classList.toggle(c)})})};F.addClass=function(a){return this.toggleClass(a,!0)};F.removeClass=function(a){return arguments.length?this.toggleClass(a,!1):this.attr("class","")};
function O(a,b,c,d){for(var h=[],f=E(b),k=d&&L(d),q=0,S=a.length;q<S;q++)if(f){var l=b(a[q]);l.length&&ha.apply(h,l)}else for(l=a[q][b];!(null==l||d&&k(-1,l));)h.push(l),l=c?l[b]:null;return h}function P(a){return 1<a.length?w.call(a,function(a,c,d){return ea.call(d,a)===c}):a}G.unique=P;F.add=function(a,b){return G(P(this.get().concat(G(a,b).get())))};function Q(a,b,c){if(B(a))return a=n.getComputedStyle(a,null),c?a.getPropertyValue(b)||void 0:a[b]}function R(a,b){return parseInt(Q(a,b),10)||0}
var T=/^--/,U={},ta=aa.style,ua=["webkit","moz","ms"];function va(a,b){void 0===b&&(b=T.test(a));if(b)return a;if(!U[a]){b=H(a);var c=""+b[0].toUpperCase()+b.slice(1);b=(b+" "+ua.join(c+" ")+c).split(" ");I(b,function(b,c){if(c in ta)return U[a]=c,!1})}return U[a]}
var wa={animationIterationCount:!0,columnCount:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,gridArea:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnStart:!0,gridRow:!0,gridRowEnd:!0,gridRowStart:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0};function xa(a,b,c){void 0===c&&(c=T.test(a));return c||wa[a]||!ra(b)?b:b+"px"}
F.css=function(a,b){if(D(a)){var c=T.test(a);a=va(a,c);if(2>arguments.length)return this[0]&&Q(this[0],a,c);if(!a)return this;b=xa(a,b,c);return this.each(function(d,f){B(f)&&(c?f.style.setProperty(a,b):f.style[a]=b)})}for(var d in a)this.css(d,a[d]);return this};var ya=/^\s+|\s+$/;function za(a,b){a=a.dataset[b]||a.dataset[H(b)];return ya.test(a)?a:g(JSON.parse,a)}
F.data=function(a,b){if(!a){if(!this[0])return;var c={},d;for(d in this[0].dataset)c[d]=za(this[0],d);return c}if(D(a))return 2>arguments.length?this[0]&&za(this[0],a):void 0===b?this:this.each(function(c,d){c=b;c=g(JSON.stringify,c);d.dataset[H(a)]=c});for(d in a)this.data(d,a[d]);return this};function Aa(a,b){var c=a.documentElement;return Math.max(a.body["scroll"+b],c["scroll"+b],a.body["offset"+b],c["offset"+b],c["client"+b])}
function Ba(a,b){return R(a,"border"+(b?"Left":"Top")+"Width")+R(a,"padding"+(b?"Left":"Top"))+R(a,"padding"+(b?"Right":"Bottom"))+R(a,"border"+(b?"Right":"Bottom")+"Width")}
I([!0,!1],function(a,b){I(["Width","Height"],function(a,d){F[(b?"outer":"inner")+d]=function(c){if(this[0])return K(this[0])?b?this[0]["inner"+d]:this[0].document.documentElement["client"+d]:A(this[0])?Aa(this[0],d):this[0][(b?"offset":"client")+d]+(c&&b?R(this[0],"margin"+(a?"Top":"Left"))+R(this[0],"margin"+(a?"Bottom":"Right")):0)}})});
I(["Width","Height"],function(a,b){var c=b.toLowerCase();F[c]=function(d){if(!this[0])return void 0===d?void 0:this;if(!arguments.length)return K(this[0])?this[0].document.documentElement["client"+b]:A(this[0])?Aa(this[0],b):this[0].getBoundingClientRect()[c]-Ba(this[0],!a);var h=parseInt(d,10);return this.each(function(b,d){B(d)&&(b=Q(d,"boxSizing"),d.style[c]=xa(c,h+("border-box"===b?Ba(d,!a):0)))})}});var V={};
F.toggle=function(a){return this.each(function(b,c){if(B(c))if(void 0===a?"none"===Q(c,"display"):a){if(c.style.display=c.___cd||"","none"===Q(c,"display")){b=c.style;c=c.tagName;if(V[c])c=V[c];else{var d=r(c);m.body.insertBefore(d,null);var h=Q(d,"display");m.body.removeChild(d);c=V[c]="none"!==h?h:"block"}b.display=c}}else c.___cd=Q(c,"display"),c.style.display="none"})};F.hide=function(){return this.toggle(!1)};F.show=function(){return this.toggle(!0)};
function Ca(a,b){return!b||!x.call(b,function(b){return 0>a.indexOf(b)})}var W={focus:"focusin",blur:"focusout"},Da={mouseenter:"mouseover",mouseleave:"mouseout"},Ea=/^(mouse|pointer|contextmenu|drag|drop|click|dblclick)/i;function Fa(a,b,c,d,h){var f=a.___ce=a.___ce||{};f[b]=f[b]||[];f[b].push([c,d,h]);a.addEventListener(b,h)}function X(a){a=a.split(".");return[a[0],a.slice(1).sort()]}
function Y(a,b,c,d,h){var f=a.___ce=a.___ce||{};if(b)f[b]&&(f[b]=f[b].filter(function(f){var k=f[0],S=f[1];f=f[2];if(h&&f.guid!==h.guid||!Ca(k,c)||d&&d!==S)return!0;a.removeEventListener(b,f)}));else for(b in f)Y(a,b,c,d,h)}
F.off=function(a,b,c){var d=this;if(void 0===a)this.each(function(a,b){(B(b)||A(b)||K(b))&&Y(b)});else if(D(a))E(b)&&(c=b,b=""),I(N(a),function(a,h){a=X(Da[h]||W[h]||h);var f=a[0],k=a[1];d.each(function(a,d){(B(d)||A(d)||K(d))&&Y(d,f,k,b,c)})});else for(var h in a)this.off(h,a[h]);return this};
F.on=function(a,b,c,d,h){var f=this;if(!D(a)){for(var k in a)this.on(k,b,c,a[k],h);return this}D(b)||(void 0!==b&&null!==b&&(void 0!==c&&(d=c),c=b),b="");E(d)||(d=c,c=void 0);if(!d)return this;I(N(a),function(a,k){a=X(Da[k]||W[k]||k);var l=a[0],q=a[1];l&&f.each(function(a,f){if(B(f)||A(f)||K(f))a=function Ja(a){if(!a.namespace||Ca(q,a.namespace.split("."))){var k=f;if(b){for(var z=a.target;!qa(z,b);){if(z===f)return;z=z.parentNode;if(!z)return}k=z;a.___cd=!0}a.___cd&&Object.defineProperty(a,"currentTarget",
{configurable:!0,get:function(){return k}});Object.defineProperty(a,"data",{configurable:!0,get:function(){return c}});z=d.call(k,a,a.___td);h&&Y(f,l,q,b,Ja);!1===z&&(a.preventDefault(),a.stopPropagation())}},a.guid=d.guid=d.guid||G.guid++,Fa(f,l,q,b,a)})});return this};F.one=function(a,b,c,d){return this.on(a,b,c,d,!0)};F.ready=function(a){function b(){return g(a,G)}"loading"!==m.readyState?b():m.addEventListener("DOMContentLoaded",b);return this};
F.trigger=function(a,b){if(D(a)){var c=X(a),d=c[0];c=c[1];if(!d)return this;var h=Ea.test(d)?"MouseEvents":"HTMLEvents";a=m.createEvent(h);a.initEvent(d,!0,!0);a.namespace=c.join(".")}a.___td=b;var f=a.type in W;return this.each(function(b,c){if(f&&E(c[a.type]))c[a.type]();else c.dispatchEvent(a)})};function Ga(a){return a.multiple&&a.options?O(w.call(a.options,function(a){return a.selected&&!a.disabled&&!a.parentNode.disabled}),"value"):a.value||""}
var Ha=/%20/g,Ia=/\r?\n/g,Ka=/file|reset|submit|button|image/i,La=/radio|checkbox/i;F.serialize=function(){var a="";this.each(function(b,c){I(c.elements||[c],function(b,c){c.disabled||!c.name||"FIELDSET"===c.tagName||Ka.test(c.type)||La.test(c.type)&&!c.checked||(b=Ga(c),void 0!==b&&(b=u(b)?b:[b],I(b,function(b,d){b=a;d="&"+encodeURIComponent(c.name)+"="+encodeURIComponent(d.replace(Ia,"\r\n")).replace(Ha,"+");a=b+d})))})});return a.slice(1)};
F.val=function(a){return arguments.length?this.each(function(b,c){if((b=c.multiple&&c.options)||La.test(c.type)){var d=u(a)?fa.call(a,String):null===a?[]:[String(a)];b?I(c.options,function(a,b){b.selected=0<=d.indexOf(b.value)},!0):c.checked=0<=d.indexOf(c.value)}else c.value=void 0===a||null===a?"":a}):this[0]&&Ga(this[0])};F.clone=function(){return this.map(function(a,b){return b.cloneNode(!0)})};F.detach=function(a){M(this,a).each(function(a,c){c.parentNode&&c.parentNode.removeChild(c)});return this};
var Ma=/^\s*<(\w+)[^>]*>/,Na=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,Oa={"*":aa,tr:ba,td:ca,th:ca,thead:t,tbody:t,tfoot:t};function oa(a){if(!D(a))return[];if(Na.test(a))return[r(RegExp.$1)];var b=Ma.test(a)&&RegExp.$1;b=Oa[b]||Oa["*"];b.innerHTML=a;return G(b.childNodes).detach().get()}G.parseHTML=oa;F.empty=function(){return this.each(function(a,b){for(;b.firstChild;)b.removeChild(b.firstChild)})};
F.html=function(a){return arguments.length?void 0===a?this:this.each(function(b,c){B(c)&&(c.innerHTML=a)}):this[0]&&this[0].innerHTML};F.remove=function(a){M(this,a).detach().off();return this};F.text=function(a){return void 0===a?this[0]?this[0].textContent:"":this.each(function(b,c){B(c)&&(c.textContent=a)})};F.unwrap=function(){this.parent().each(function(a,b){"BODY"!==b.tagName&&(a=G(b),a.replaceWith(a.children()))});return this};
F.offset=function(){var a=this[0];if(a)return a=a.getBoundingClientRect(),{top:a.top+n.pageYOffset,left:a.left+n.pageXOffset}};F.offsetParent=function(){return this.map(function(a,b){for(a=b.offsetParent;a&&"static"===Q(a,"position");)a=a.offsetParent;return a||p})};
F.position=function(){var a=this[0];if(a){var b="fixed"===Q(a,"position"),c=b?a.getBoundingClientRect():this.offset();if(!b){var d=a.ownerDocument;for(b=a.offsetParent||d.documentElement;(b===d.body||b===d.documentElement)&&"static"===Q(b,"position");)b=b.parentNode;b!==a&&B(b)&&(d=G(b).offset(),c.top-=d.top+R(b,"borderTopWidth"),c.left-=d.left+R(b,"borderLeftWidth"))}return{top:c.top-R(a,"marginTop"),left:c.left-R(a,"marginLeft")}}};
F.children=function(a){return M(G(P(O(this,function(a){return a.children}))),a)};F.contents=function(){return G(P(O(this,function(a){return"IFRAME"===a.tagName?[a.contentDocument]:"TEMPLATE"===a.tagName?a.content.childNodes:a.childNodes})))};F.find=function(a){return G(P(O(this,function(b){return y(a,b)})))};var Pa=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,Qa=/^$|^module$|\/(java|ecma)script/i,Ra=["type","src","nonce","noModule"];
function Sa(a,b){a=G(a);a.filter("script").add(a.find("script")).each(function(a,d){if(Qa.test(d.type)&&p.contains(d)){var c=r("script");c.text=d.textContent.replace(Pa,"");I(Ra,function(a,b){d[b]&&(c[b]=d[b])});b.head.insertBefore(c,null);b.head.removeChild(c)}})}
function Z(a,b,c,d,h,f,k,q){I(a,function(a,f){I(G(f),function(a,f){I(G(b),function(b,k){var l=c?k:f;b=c?a:b;k=c?f:k;l=b?l.cloneNode(!0):l;b=!b;h?k.insertBefore(l,d?k.firstChild:null):k.parentNode.insertBefore(l,d?k:k.nextSibling);b&&Sa(l,k.ownerDocument)},q)},k)},f);return b}F.after=function(){return Z(arguments,this,!1,!1,!1,!0,!0)};F.append=function(){return Z(arguments,this,!1,!1,!0)};F.appendTo=function(a){return Z(arguments,this,!0,!1,!0)};F.before=function(){return Z(arguments,this,!1,!0)};
F.insertAfter=function(a){return Z(arguments,this,!0,!1,!1,!1,!1,!0)};F.insertBefore=function(a){return Z(arguments,this,!0,!0)};F.prepend=function(){return Z(arguments,this,!1,!0,!0,!0,!0)};F.prependTo=function(a){return Z(arguments,this,!0,!0,!0,!1,!1,!0)};F.replaceWith=function(a){return this.before(a).remove()};F.replaceAll=function(a){G(a).replaceWith(this);return this};F.wrapAll=function(a){a=G(a);for(var b=a[0];b.children.length;)b=b.firstElementChild;this.first().before(a);return this.appendTo(b)};
F.wrap=function(a){return this.each(function(b,c){var d=G(a)[0];G(c).wrapAll(b?d.cloneNode(!0):d)})};F.wrapInner=function(a){return this.each(function(b,c){b=G(c);c=b.contents();c.length?c.wrapAll(a):b.append(a)})};F.has=function(a){var b=D(a)?function(b,d){return y(a,d).length}:function(b,d){return d.contains(a)};return this.filter(b)};F.is=function(a){var b=L(a);return x.call(this,function(a,d){return b.call(a,d,a)})};F.next=function(a,b,c){return M(G(P(O(this,"nextElementSibling",b,c))),a)};
F.nextAll=function(a){return this.next(a,!0)};F.nextUntil=function(a,b){return this.next(b,!0,a)};F.not=function(a){var b=L(a);return this.filter(function(c,d){return(!D(a)||B(d))&&!b.call(d,c,d)})};F.parent=function(a){return M(G(P(O(this,"parentNode"))),a)};F.index=function(a){var b=a?G(a)[0]:this[0];a=a?this:G(b).parent().children();return ea.call(a,b)};F.closest=function(a){var b=this.filter(a);if(b.length)return b;var c=this.parent();return c.length?c.closest(a):b};
F.parents=function(a,b){return M(G(P(O(this,"parentElement",!0,b))),a)};F.parentsUntil=function(a,b){return this.parents(b,a)};F.prev=function(a,b,c){return M(G(P(O(this,"previousElementSibling",b,c))),a)};F.prevAll=function(a){return this.prev(a,!0)};F.prevUntil=function(a,b){return this.prev(b,!0,a)};F.siblings=function(a){return M(G(P(O(this,function(a){return G(a).parent().children().not(a)}))),a)};"undefined"!==typeof exports?module.exports=G:n.cash=n.$=G;
})();