(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["orderpage/index/index"],{"06ea":function(e,n,t){},"51fe":function(e,n,t){"use strict";t.r(n);var o=t("bda7"),r=t("565c");for(var u in r)"default"!==u&&function(e){t.d(n,e,(function(){return r[e]}))}(u);t("69e7");var i,c=t("f0c5"),s=Object(c["a"])(r["default"],o["b"],o["c"],!1,null,"30e2e6cf",null,!1,o["a"],i);n["default"]=s.exports},"565c":function(e,n,t){"use strict";t.r(n);var o=t("cf30"),r=t.n(o);for(var u in o)"default"!==u&&function(e){t.d(n,e,(function(){return o[e]}))}(u);n["default"]=r.a},"69e7":function(e,n,t){"use strict";var o=t("06ea"),r=t.n(o);r.a},9986:function(e,n,t){"use strict";(function(e){t("8a37"),t("a9ff");o(t("66fd"));var n=o(t("51fe"));function o(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=t,e(n.default)}).call(this,t("543d")["createPage"])},bda7:function(e,n,t){"use strict";t.d(n,"b",(function(){return r})),t.d(n,"c",(function(){return u})),t.d(n,"a",(function(){return o}));var o={uniIcons:function(){return Promise.all([t.e("common/vendor"),t.e("node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons")]).then(t.bind(null,"fea7"))}},r=function(){var e=this,n=e.$createElement;e._self._c},u=[]},cf30:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=r(t("d055"));t("26cb");function r(e){return e&&e.__esModule?e:{default:e}}var u=function(){t.e("components/pubpage").then(function(){return resolve(t("9d31"))}.bind(null,t)).catch(t.oe)},i=function(){t.e("components/pubfolow").then(function(){return resolve(t("aa9b"))}.bind(null,t)).catch(t.oe)},c={components:{pubpage:u,pubfolow:i},data:function(){return{selectList:[{type:"person",text:"书房"},{type:"star",text:"收藏"}],user_id:"",orderUser:null}},computed:{},onLoad:function(e){console.log("onLoad",e),e.id&&(this.user_id=e.id,this.getOrderUesr())},onShow:function(){console.log("页面返回"),this.user_id&&this.$refs.folow.getFolow(this.user_id)},methods:{getOrderUesr:function(){var e=this;o.default.call({name:"getOrderUesr",data:{action:"get",user_id:this.user_id},success:function(n){e.orderUser=n.result}})},loginUserProfile:function(n){switch(console.log(n),n){case"person":e.navigateTo({url:"../orperson/orperson?id="+this.orderUser.openid});break;case"star":e.navigateTo({url:"../orstar/orstar?id="+this.user_id});break}}}};n.default=c}).call(this,t("543d")["default"])}},[["9986","common/runtime","common/vendor"]]]);