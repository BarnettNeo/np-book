(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/books/books"],{"0f4b":function(o,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e=c(t("cc50"));function c(o){return o&&o.__esModule?o:{default:o}}var u=function(){t.e("components/pubpage").then(function(){return resolve(t("36f3"))}.bind(null,t)).catch(t.oe)},a=function(){t.e("components/pub-ui/bookcell").then(function(){return resolve(t("a81b"))}.bind(null,t)).catch(t.oe)},s={components:{pubpage:u,bookcell:a},data:function(){return{books:[],keyword:"",canloadmore:!0,isBooksLen:!1}},onLoad:function(){this.getBooks()},onReachBottom:function(){this.getBooks(this.books[this.books.length-1]._id)},methods:{btnSearch:function(){this.canloadmore=!0,this.getBooks()},getBooks:function(){var o=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;this.isBooksLen=!1,this.canloadmore&&e.default.call({name:"books",data:{action:"listall",start:n,keyword:this.keyword},success:function(t){o.canloadmore=t.result.length>=9,o.books=n?o.books.concat(t.result):t.result,o.books<1?o.isBooksLen=!0:o.isBooksLen=!1}})}}};n.default=s},"3f17":function(o,n,t){"use strict";t.r(n);var e=t("9646"),c=t("8df7");for(var u in c)"default"!==u&&function(o){t.d(n,o,(function(){return c[o]}))}(u);t("c54a");var a,s=t("f0c5"),r=Object(s["a"])(c["default"],e["b"],e["c"],!1,null,"51bbd12d",null,!1,e["a"],a);n["default"]=r.exports},"8df7":function(o,n,t){"use strict";t.r(n);var e=t("0f4b"),c=t.n(e);for(var u in e)"default"!==u&&function(o){t.d(n,o,(function(){return e[o]}))}(u);n["default"]=c.a},9646:function(o,n,t){"use strict";var e;t.d(n,"b",(function(){return c})),t.d(n,"c",(function(){return u})),t.d(n,"a",(function(){return e}));var c=function(){var o=this,n=o.$createElement;o._self._c},u=[]},9822:function(o,n,t){},c54a:function(o,n,t){"use strict";var e=t("9822"),c=t.n(e);c.a},d3c5:function(o,n,t){"use strict";(function(o){t("bcc6");e(t("66fd"));var n=e(t("3f17"));function e(o){return o&&o.__esModule?o:{default:o}}wx.__webpack_require_UNI_MP_PLUGIN__=t,o(n.default)}).call(this,t("543d")["createPage"])}},[["d3c5","common/runtime","common/vendor"]]]);