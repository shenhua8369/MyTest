var Data = function(){
	this.sceneArr = [3,4]
}

Data.prototype = {
		sceneArr:null,
		ctor:function(){
			sceneArr = [3,4];
		},

		getData:function(){
			sceneArr = [];
			var file = jsb.fileUtils.getStringFromFile(jsonRes.SceneData);
            var data = JSON.parse(file);
			cc.log(data);
			for(var i = 0;i<data["scenes"].length;i++){
				var num = data["scenes"][i];
				cc.log("num",num);
				sceneArr.push(num);
			};
			sceneArr();
		}
}



