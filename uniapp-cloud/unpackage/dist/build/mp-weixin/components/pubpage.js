(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/pubpage"],{"36f3":function(t,n,o){"use strict";o.r(n);var a=o("766d"),e=o("600f");for(var i in e)"default"!==i&&function(t){o.d(n,t,(function(){return e[t]}))}(i);var s,u=o("f0c5"),f=Object(u["a"])(e["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],s);n["default"]=f.exports},"600f":function(t,n,o){"use strict";o.r(n);var a=o("f53e"),e=o.n(a);for(var i in a)"default"!==i&&function(t){o.d(n,t,(function(){return a[t]}))}(i);n["default"]=e.a},"766d":function(t,n,o){"use strict";var a;o.d(n,"b",(function(){return e})),o.d(n,"c",(function(){return i})),o.d(n,"a",(function(){return a}));var e=function(){var t=this,n=t.$createElement;t._self._c},i=[]},f53e:function(t,n,o){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=function(){o.e("components/pubnaviagtionbar").then(function(){return resolve(o("c0fd"))}.bind(null,o)).catch(o.oe)},e={components:{pubnaviagtionbar:a},data:function(){return{paddingTop:0,paddingBottom:0,height:"100%",statusBarHeight:22}},props:{title:{type:String,default:""},showNavigation:{type:Boolean,default:!0},navigationHasBottomLine:{type:Boolean,default:!0},statusBackground:{type:String,default:"#fff"}},computed:{},methods:{autoPaddingTop:function(){return this.showNavigation?44+this.sysInfo.statusBarHeight:this.sysInfo.statusBarHeight},autoPaddingBottom:function(){return this.$slots.tabSection?50+(this.sysInfo.safeArea?34:0):0}},mounted:function(){this.sysInfo=t.getSystemInfoSync(),this.height=this.sysInfo.screenHeight+"px",this.paddingTop=this.autoPaddingTop(),this.paddingBottom=this.autoPaddingBottom(),this.statusBarHeight=this.sysInfo.statusBarHeight}};n.default=e}).call(this,o("543d")["default"])}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/pubpage-create-component',
    {
        'components/pubpage-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("36f3"))
        })
    },
    [['components/pubpage-create-component']]
]);
