/*
 * Underwear.js 0.1.0
 * (c) 2011 Eric "Doc" Ritezel
 * Undertree is freely distributable under the MIT license.
 * Portions of Undertree are inspired or borrowed from Underscore,
 * especially this sentence. The tree implementation was planted
 * by Arne Andersson.
 *
 * For more information:
 * http://github.com/ohrite/underwear
 */

(function(){var i=this;var b=i._w;var c={};var k={};if(typeof value!=="undefined"&&module.exports){module.exports=k;k._w=k}else{i._w=k}k.VERSION="0.1.0";k.noConflict=function(){i._w=b;return this};function g(m,n){this.level=n||0;this.data=m||null;this.left=null;this.right=null}function a(m,n){if(m===null){return""}if(n===0){return m.data?m.data+m.level.toString():""}return"("+([a(m.left,n-1),a(m,0),a(m.right,n-1)].join("-"))+")"}function d(m){return _.map(m,function(n){return n.data})}function l(m){if(m!==null&&m.left!==null&&m.level==m.left.level){var n=m.left;m.left=n.right;n.right=m;return n}return m}function h(n){if(n!==null&&n.right!==null&&n.right.right!==null&&n.level==n.right.right.level){var m=n.right;n.right=m.left;m.left=n;m.level++;return m}return n}k.insert=function(o,s,n,p){var r=o,m=[],q;n=n||_.identity;if(!o||o===null){return new g(s,1)}while(true){m.push(r);if(n.call(p,s)<n.call(p,r.data)){if(r.left===null){r.left=new g(s,1);break}else{r=r.left}}else{if(r.right===null){r.right=new g(s,1);break}else{r=r.right}}}while(m.length>1){r=m.pop();if(m.length>0){q=m[m.length-1];if(q.left===r){q.left=h(l(q.left))}else{q.right=h(l(q.right))}}}return h(l(o))};k.remove=function(s,u,m,n){var o=s,t=[],r,v;m=m||_.identity;while(true){if(o===null){return s}t.push(o);if(o.data==u){break}if(m.call(n,u)<m.call(n,o.data)){o=o.left}else{o=o.right}}if(o.left===null||o.right===null){t.pop();if(t.length>0){v=t[t.length-1];if(v.left===o){v.left=o.left||o.right}else{v.right=o.left||o.right}}else{s=o.right||o.left}}else{var q=o.left;var p=o;while(q.right!==null){t.push(p=q);q=q.right}o.data=q.data;if(p===o){p.left=q.right}else{p.right=q.right}}while(t.length>0){o=t.pop();if(t.length>0){v=t[t.length-1]}if((o.left&&o.left.level<o.level-1)||(o.right&&o.right.level<o.level-1)){o.level--;if(o.right&&o.right.level>o.level){o.right.level=o.level}o=l(o);o.right=l(o.right);if(o.right){o.right.right=l(o.right.right)}o=h(o);o.right=h(o.right);if(t.length>0){if(v.left===o){v.left=o}else{v.right=o}}else{s=o}}}return s};var j=k.each=k.forEach=function(q,p,o){var n=0,m=[];if(q===null){return}while(m.length>0||q!==null){if(q!==null){m.push(q);q=q.left}else{q=m.pop();if(p.call(o,q.data,n++,q)===c){break}q=q.right}}};var f=k.reverse=function(q,p,o){var n=0,m=[];if(q===null){return}while(m.length>0||q!==null){if(q!==null){m.push(q);q=q.right}else{q=m.pop();if(p.call(o,q.data,n++,q)===c){break}q=q.left}}};k.preorder=function(q,p,o){var n=0,m=[q];if(q===null){return}while(m.length>0){q=m.pop();if(q.right!==null){m.push(q.right)}if(q.left!==null){m.push(q.left)}if(p.call(o,q.data,n++,q)===c){break}}};k.map=function(m,p,o){var n=[];j(m,function(s,r,q){n.push(p.call(o,s,r,q))});return n};k.reduce=k.foldl=k.inject=function(m,q,n,p){var o=n!==void 0;j(m,function(t,s,r){if(!o&&s===0){n=t;o=true}else{n=q.call(p,n,t,s,r)}});if(!o){throw new TypeError("Reduce of empty tree with no initial value")}return n};k.reduceRight=k.foldr=function(m,q,n,p){var o=n!==void 0;f(m,function(t,s,r){if(!o&&s===0){n=t;o=true}else{n=q.call(p,n,t,s,r)}});if(!o){throw new TypeError("Reduce of empty tree with no initial value")}return n};k.find=k.detect=function(n,p,o){var m;e(n,function(s,r,q){if(p.call(o,s,r,q)){m=s;return true}});return m};k.filter=k.select=function(m,p,o){var n=[];if(m===null){return n}j(m,function(s,r,q){if(p.call(o,s,r,q)){n.push(s)}});return n};k.reject=function(m,p,o){var n=[];if(m===null){return n}j(m,function(s,r,q){if(!p.call(o,s,r,q)){n.push(s)}});return n};k.every=k.all=function(n,p,o){p=p||_.identity;var m=true;if(n===null){return m}j(n,function(s,r,q){m=m&&p.call(o,s,r,q);if(!m){return c}});return m};var e=k.some=k.any=function(n,p,o){p=p||_.identity;var m=false;if(n===null){return m}j(n,function(s,r,q){m=p.call(o,s,r,q);if(m){return c}});return m};k.include=k.contains=function(m,o){var n=false;if(o===null){return n}e(m,function(p){n=(p===o);if(n){return true}});return n};k.invoke=function(m,o){var n=Array.prototype.slice.call(arguments,2);return k.map(m,function(p){return(o?p[o]:p).apply(p,n)})};k.pluck=function(m,n){return k.map(m,function(o){return o[n]})};k.max=function(n,p,o){if(!p){return k.last(n)}var m={computed:-Infinity};j(n,function(t,q,s){var r=p.call(o,t,q,s);if(r>=m.computed){m.value=t;m.computed=r}});return m.value};k.min=function(n,p,o){if(!p){return k.first(n)}var m={computed:Infinity};j(n,function(t,q,s){var r=p.call(o,t,q,s);if(r<m.computed){m.value=t;m.computed=r}});return m.value};k.toArray=function(m){if(!m){return[]}return k.values(m)};k.size=function(m){var n=0;if(!m){return n}j(m,function(){n++});return n};k.first=k.head=function(m,q,p){var o=[];if(!m){return o}if(q===undefined||!!p){while(m.left!==null){m=m.left}return m.data}j(m,function(r,n){if(q<=n){return c}o.push(r)});return o};k.last=function(m){if(!m){return null}while(m.right!==null){m=m.right}return m.data};k.rest=k.tail=function(m,r,p){var o=[],q=_.isUndefined(r)||p?1:r;if(!m){return o}if(q===0){return k.toArray(m)}j(m,function(s,n){if(q<=n){o.push(s)}});return o};k.without=function(m){var n=Array.prototype.slice.call(arguments,1);return k.filter(m,function(o){return !_.include(n,o)})};k.indexOf=function(n,o){var m=-1;if(n===null){return m}j(n,function(q,p){if(q==o){m=p;return c}});return m};k.lastIndexOf=function(n,o){var m=-1;if(n===null){return m}f(n,function(q,p){if(q==o){m=p;return c}});return m};k.isEmpty=function(m){return m===null||m.level===0};k.values=function(n){var m=[];if(n===null){return m}j(n,function(o){m.push(o)});return m};k.search=function(m,n,o){if(m===null||!n){return null}while(m.level!==0){var p=n.call(o,m.data);if(p===0){return m.data}else{if(p<0){m=m.left}else{m=m.right}}}return null}})();