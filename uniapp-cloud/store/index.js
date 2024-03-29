import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);//vue的插件机制

//Vuex.Store 构造器选项
const store = new Vuex.Store({
	state: {
		token:'',
		userInfo:'',
		isLogin:false,
		folow:'',
		bgImg:'',
		fans:''
	},
    mutations: {
		updateToken(state,newValue){
			state.token = newValue;
		},
		setUserInfo(state, newValue) {
	        state.userInfo = newValue;
			if(newValue && newValue.folow){
				state.folow = newValue.folow;
			}
			if(newValue && newValue.bgImg){
				state.bgImg = newValue.bgImg;
			}
			if(newValue && newValue.fans){
				state.fans = newValue.fans;
			}
		},
		updateFolow(state, newValue){
			state.folow = newValue;
		},
		updateFans(state, newValue){
			state.fans = newValue;
		},
		updateBgImg(state, newValue){
			state.bgImg = newValue;
		}
	},
	getters:{
		isLogin(state){
			return state.userInfo && state.userInfo.nickName && state.userInfo.avatarUrl?state.isLogin=true:state.isLogin=false;
		},
		token(state){
			return state.userInfo?state.userInfo.token:'';
		}
	},
    actions: {
		// setUserInfo(context, value) {
		//   context.commit('setUserInfo', value);
		// },
		setPhone(context, value) {
		  let phone = {
			brand: value.brand,
			model: value.model
		  }
		  context.commit('getPhone', phone);
		},
	},
	modules: {}
})

export default store