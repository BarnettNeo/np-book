let token;

function call(option){
	return new Promise((resolve,reject)=>{
			// if(!option.token)option.data = {};
			if(token)option.data.token = token;
			uniCloud.callFunction({
				name:option.name,
				data:option.data,
				success:(res)=> {
					if(res.result.token) token = res.result.token;
					if(option.success)option.success(res);
					resolve(res);
				},
				fail:(err)=> {
					if(option.fail)option.fail(err);
					reject(err);
				},
				complete:()=>{
					if(option.complete)option.complete();
				}
				
			})
		
	})
}

module.exports = {
	call:call
}
