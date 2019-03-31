//>>built
define("dojox/app/controllers/Transition","require dojo/_base/lang dojo/_base/declare dojo/has dojo/on dojo/Deferred dojo/when dojo/dom-style ../Controller ../utils/constraints".split(" "),function(v,k,w,y,z,A,u,B,x,q){var r;return w("dojox.app.controllers.Transition",x,{proceeding:!1,waitingQueue:[],constructor:function(a,d){this.events={"app-transition":this.transition,"app-domNode":this.onDomNodeChange};v([this.app.transit||"dojox/css3/transit"],function(a){r=a});if(this.app.domNode)this.onDomNodeChange({oldNode:null,
newNode:this.app.domNode})},transition:function(a){var d=a.viewId||"";this.proceedingSaved=this.proceeding;var e=d.split("+"),c;if(0<e.length){for(;1<e.length;)d=e.shift(),c=k.clone(a),c.viewId=d,this.proceeding=!0,this.proceedTransition(c);d=e.shift();e=d.split("-");if(0<e.length)for(d=e.shift();0<e.length;){var g=e.shift();c=k.clone(a);c.viewId=g;this._doTransition(c.viewId,c.opts,c.opts.params,a.opts.data,this.app,!0,c._doResize)}0<d.length&&(this.proceeding=this.proceedingSaved,a.viewId=d,a._doResize=
!0,this.proceedTransition(a))}else a._doResize=!0,this.proceedTransition(a)},onDomNodeChange:function(a){null!=a.oldNode&&this.unbind(a.oldNode,"startTransition");this.bind(a.newNode,"startTransition",k.hitch(this,this.onStartTransition))},onStartTransition:function(a){a.preventDefault&&a.preventDefault();a.cancelBubble=!0;a.stopPropagation&&a.stopPropagation();var d=a.detail.target,e=/#(.+)/;!d&&e.test(a.detail.href)&&(d=a.detail.href.match(e)[1]);this.transition({viewId:d,opts:k.mixin({},a.detail),
data:a.detail.data})},proceedTransition:function(a){if(this.proceeding)this.app.log("in app/controllers/Transition proceedTransition push event",a),this.waitingQueue.push(a),this.processingQueue=!1;else{0<this.waitingQueue.length&&!this.processingQueue&&(this.processingQueue=!0,this.waitingQueue.push(a),a=this.waitingQueue.shift());this.proceeding=!0;this.app.log("in app/controllers/Transition proceedTransition calling trigger load",a);a.opts||(a.opts={});var d=a.params||a.opts.params;this.app.emit("app-load",
{viewId:a.viewId,params:d,callback:k.hitch(this,function(){var e=this._doTransition(a.viewId,a.opts,d,a.opts.data,this.app,!1,a._doResize);u(e,k.hitch(this,function(){this.proceeding=!1;var a=this.waitingQueue.shift();a&&this.proceedTransition(a)}))})})}},_getTransition:function(a,d,e){var c=null;a.views[d]&&(c=a.views[d].transition);c||(c=a.transition);for(d=a.defaultTransition;!c&&a.parent;)a=a.parent,c=a.transition,d||(d=a.defaultTransition);return c||e.transition||d||"none"},_getParamsForView:function(a,
d){var e={},c;for(c in d){var g=d[c];k.isObject(g)?c==a&&(e=k.mixin(e,g)):c&&null!=g&&(e[c]=d[c])}return e},_doTransition:function(a,d,e,c,g,l,s,n){if(!g)throw Error("view parent not found in transition.");this.app.log("in app/controllers/Transition._doTransition transitionTo\x3d[",a,"], removeView \x3d [",l,"] parent.name\x3d[",g.name,"], opts\x3d",d);var h,m,b;h=a?a.split(","):g.defaultView.split(",");a=h.shift();m=h.join(",");b=g.children[g.id+"_"+a];if(!b){if(l){this.app.log("\x3e in Transition._doTransition called with removeView true, but that view is not available to remove");
return}throw Error("child view must be loaded before transition.");}var f=q.getSelectedChild(g,b.constraint);b.params=this._getParamsForView(b.name,e);!m&&b.defaultView&&(m=b.defaultView);if(l){if(b!==f){this.app.log("\x3e in Transition._doTransition called with removeView true, but that view is not available to remove");return}b=null}if(b!==f){h=q.getAllSelectedChildren(f);for(var t=0;t<h.length;t++){var p=h[t];p&&p.beforeDeactivate&&(this.app.log("\x3c in Transition._doTransition calling subChild.beforeDeactivate subChild name\x3d[",
p.name,"], parent.name\x3d[",p.parent.name,"], next!\x3d\x3dcurrent path"),p.beforeDeactivate())}f&&(this.app.log("\x3c in Transition._doTransition calling current.beforeDeactivate current name\x3d[",f.name,"], parent.name\x3d[",f.parent.name,"], next!\x3d\x3dcurrent path"),f.beforeDeactivate(b,c));b&&(this.app.log("\x3e in Transition._doTransition calling next.beforeActivate next name\x3d[",b.name,"], parent.name\x3d[",b.parent.name,"], next!\x3d\x3dcurrent path"),b.beforeActivate(f,c));this.app.log("\x3e in Transition._doTransition calling app.emit layoutView view next");
l||this.app.emit("app-layoutView",{parent:g,view:b});s&&!m&&this.app.emit("app-resize");h=!0;if(r&&(!n||null!=f))n=k.mixin({},d),n=k.mixin({},n,{reverse:n.reverse||-1===n.transitionDir?!0:!1,transition:this._getTransition(g,a,n)}),b&&this.app.log("    \x3e in Transition._doTransition calling transit for current \x3d"+b.name),h=r(f&&f.domNode,b&&b.domNode,n);u(h,k.hitch(this,function(){b&&this.app.log("    \x3c in Transition._doTransition back from transit for next \x3d"+b.name);l&&this.app.emit("app-layoutView",
{parent:g,view:f,removeView:!0});for(var a=q.getAllSelectedChildren(f),k=0;k<a.length;k++){var h=a[k];h&&h.beforeDeactivate&&(this.app.log("  \x3c in Transition._doTransition calling subChild.afterDeactivate subChild name\x3d[",h.name,"], parent.name\x3d[",h.parent.name,"], next!\x3d\x3dcurrent path"),h.afterDeactivate())}f&&(this.app.log("  \x3c in Transition._doTransition calling current.afterDeactivate current name\x3d[",f.name,"], parent.name\x3d[",f.parent.name,"], next!\x3d\x3dcurrent path"),
f.afterDeactivate(b,c));b&&(this.app.log("  \x3e in Transition._doTransition calling next.afterActivate next name\x3d[",b.name,"], parent.name\x3d[",b.parent.name,"], next!\x3d\x3dcurrent path"),b.afterActivate(f,c));m&&this._doTransition(m,d,e,c,b||g,l,s,!0)}));return h}this.app.log("\x3c in Transition._doTransition calling next.beforeDeactivate refresh current view next name\x3d[",b.name,"], parent.name\x3d[",b.parent.name,"], next\x3d\x3dcurrent path");b.beforeDeactivate(f,c);this.app.log("  \x3c in Transition._doTransition calling next.afterDeactivate refresh current view next name\x3d[",
b.name,"], parent.name\x3d[",b.parent.name,"], next\x3d\x3dcurrent path");b.afterDeactivate(f,c);this.app.log("\x3e in Transition._doTransition calling next.beforeActivate next name\x3d[",b.name,"], parent.name\x3d[",b.parent.name,"], next\x3d\x3dcurrent path");b.beforeActivate(f,c);this.app.log("\x3e in Transition._doTransition calling app.triggger layoutView view next name\x3d[",b.name,"], removeView \x3d [",l,"], parent.name\x3d[",b.parent.name,"], next\x3d\x3dcurrent path");this.app.emit("app-layoutView",
{parent:g,view:b,removeView:l});s&&!m&&this.app.emit("app-resize");this.app.log("  \x3e in Transition._doTransition calling next.afterActivate next name\x3d[",b.name,"], parent.name\x3d[",b.parent.name,"], next\x3d\x3dcurrent path");b.afterActivate(f,c);if(m)return this._doTransition(m,d,e,c,b,l)}})});