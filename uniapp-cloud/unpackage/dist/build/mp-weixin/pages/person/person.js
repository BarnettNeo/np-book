(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/person/person"],{"1bbb":function(e,t,n){"use strict";n.r(t);var o=n("d68a"),r=n("7d3d");for(var c in r)"default"!==c&&function(e){n.d(t,e,(function(){return r[e]}))}(c);n("3b50");var u,f=n("f0c5"),a=Object(f["a"])(r["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],u);t["default"]=a.exports},"31fe":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=c(n("abb0")),r=n("26cb");function c(e){return e&&e.__esModule?e:{default:e}}function u(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function f(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?u(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var l=function(){n.e("components/pubpage").then(function(){return resolve(n("00e9"))}.bind(null,n)).catch(n.oe)},i=function(){n.e("components/pub-ui/bookshelfcell").then(function(){return resolve(n("8331"))}.bind(null,n)).catch(n.oe)},s={components:{pubpage:l,bookshelfcell:i},data:function(){return{bookshelfs:[]}},computed:f({},(0,r.mapGetters)(["token"])),onShow:function(){this.getBookshelfs()},methods:{btnCreateBookShelf:function(){e.navigateTo({url:"../createbookshelf/createbookshelf"})},onRemoveHandler:function(){e.showModal({content:"已删除成功，为你刷新页面",showCancel:!1}),this.getBookshelfs()},getBookshelfs:function(){var e=this;o.default.call({name:"bookshelfs",data:{action:"listmy",lastId:0},success:function(t){console.log(t),e.bookshelfs=t.result}})}}};t.default=s}).call(this,n("543d")["default"])},"3b50":function(e,t,n){"use strict";var o=n("798f"),r=n.n(o);r.a},"798f":function(e,t,n){},"7d3d":function(e,t,n){"use strict";n.r(t);var o=n("31fe"),r=n.n(o);for(var c in o)"default"!==c&&function(e){n.d(t,e,(function(){return o[e]}))}(c);t["default"]=r.a},c7f7:function(e,t,n){"use strict";(function(e){n("efbb");o(n("66fd"));var t=o(n("1bbb"));function o(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=n,e(t.default)}).call(this,n("543d")["createPage"])},d68a:function(e,t,n){"use strict";var o;n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return c})),n.d(t,"a",(function(){return o}));var r=function(){var e=this,t=e.$createElement;e._self._c},c=[]}},[["c7f7","common/runtime","common/vendor"]]]);