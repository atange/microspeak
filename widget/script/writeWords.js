apiready = function() {
	var header = $api.byId('header');
	$api.fixIos7Bar(header);
	//此段用于监听win的退出，交互
	//	api.addEventListener({
	//		name : 'keyback',
	//	}, function(ret, err) {
	//		alert("a");
	//		api.confirm({
	//			title : '确定退出此次编辑',
	//			msg : 'testmsg',
	//			buttons : ['确定', '取消']
	//		}, function(ret, err) {
	//			if (ret.buttonIndex == 1) {
	//				alert("a");
	//				//api.closeWin();
	//			}
	//		});
	//	})

}
//function checkDatas() {
////	var str = document.getElementById('content1').value;
////	alert(str);
//	var model = api.require('model');
//	var query = api.require('query');
//
//	query.createQuery(function(ret, err) {
//		var qid = ret.qid;
//		query.whereEqual({
//			qid : qid,
//			column : 'wordContent',
//			value : 'qqqqqqqqqqq'
//		});
//
//		var model = api.require('model');
//		model.count({
//			class : 'words',
//			qid : qid
//		}, function(ret, err) {
//			//		alert(JSON.stringify(ret))
//			alert(ret.count)
//			if (ret.count == 0) {
//				postWriteWords();
//			} else {
//				alert("少侠，数据库已存在与您输入一样的数据，请修改后再发布^_^");
//
//			}
//		});
//	});
//}

function postWriteWords() {

	var str = document.getElementById('content1').value;
	//alert(str);
	var str1 = $api.trimAll(str);
	//	alert(str1.length);
	if (10 >= str1.length) {
		alert("少侠，一句话总要超过10个字吧，再输入几个字？");
		//对话框弹出来，确定之后，返回继续编辑，如果大于10个字了则执行下面的语句。

		//	}
		//	else if(  str1 == "12345678900" ){
		//		alert("少侠，您这段话数据库中已存在，请更换哦");//敏感词限制
	} else {
		var model = api.require('model');
		var query = api.require('query');

		query.createQuery(function(ret, err) {
			var qid = ret.qid;
			query.whereEqual({
				qid : qid,
				column : 'wordContent',
				value : str
			});

			var model = api.require('model');
			model.count({
				class : 'words',
				qid : qid
			}, function(ret, err) {
				//		alert(JSON.stringify(ret))
				//alert(ret.count)
				if (ret.count == 0) {
					var wordContent = document.getElementById("content1").value;
					//.innerHTML;
					var words = api.require('words');
					var model = api.require('model');
					model.insert({
						class : 'words',

						value : {
							wordContent : wordContent
						}

					}, function(ret, err) {
						api.hideProgress();
						if (ret) {
							api.alert({
								title : '发表成功',
								msg : '官人，你太棒了，自己发表的内容将会随机出现在您以及其他用户的阅读界面中，一起分享那份微笑！',
								buttons : ['确定']
							}, function(ret, err) {
								if (ret.buttonIndex == 1) {
									if (null != $api.getStorage('inputValue')) {
										$api.rmStorage('inputValue');
									}
									api.closeWin();
								}
							});
						} else {
							api.toast({
								msg : err.message,
								location : "middle"
							})
						}
					});

				} else {
					alert("少侠，数据库已存在与您输入一样的数据，请修改后再发布^_^");

				}
			});
		});
	}
}

