apiready = function() {

	getWordQuery();
	//这里执行
	register();
};

function getWordQuery() {
	var model = api.require('model');
	var query = api.require('query');
	var deviceNo = api.deviceId;
	var relation = api.require('relation');
	model.config({
		appId : 'A6996809038368',
		appKey : 'E38693FF-889E-DE2F-FF8E-C72871C8731C',
		host : 'https://d.apicloud.com'
	});
	query.createQuery(function(ret, err) {
		var qid = ret.qid;
		query.limit({
			qid : qid,
			value : 200
		});
		query.whereNotContain({
			qid : qid,

			column : 'devices',
			value : 'A' + deviceNo
		});

		var model = api.require('model');
		model.findAll({
			class : 'words',
			qid : qid
		}, function(ret, err) {
			if (ret) {
				if (0 != ret.length) {
					//					alert(ret.length);
					//          alert("err =您太厉害了，库存都被你看完了 " + JSON.stringify(err))
					document.getElementById("container").innerHTML = ret[0].wordContent
					function random(max) {
						return Math.floor(Math.random() * (max + 1));
					}

					var length = ret.length
					var num = random(length - 1);
					document.getElementById("container").innerHTML = ret[num].wordContent

					var appId = "A6996809038368";
					var appKey = "E38693FF-889E-DE2F-FF8E-C72871C8731C";
					var timec = new Date().getTime();
					var appCode = SHA1(appId + "UZ" + appKey + "UZ" + timec) + "." + timec;
					var options = {
						url : "https://d.apicloud.com/mcm/api/words/" + ret[num].id,
						method : "POST",
						headers : {
							"X-APICloud-AppKey" : appCode,
							"X-APICloud-AppId" : appId
						},
						data : {
							"_method" : "PUT",
							"$push" : {
								"devices" : 'A' + deviceNo
							}
						}
					}

					function multipleAjax() {
						$.ajax(options).done(function(d) {
							console.log(d);
						}).fail(function(err) {
							console.log(err);
						})
					}

					multipleAjax();
				} else {
					alert("少侠，数据库累计n篇全部被你看光了，稍等片刻大家的发表^_^");

				}
			}
		});
	});

}

//认证用户数
function register() {
	api.showProgress();

	var model = api.require('model');
	var deviceNo = api.deviceId;
	var username = deviceNo;
	var password = deviceNo;

	var user = api.require('user');
	model.config({
		appId : 'A6996809038368',
		appKey : 'E38693FF-889E-DE2F-FF8E-C72871C8731C',
		host : 'https://d.apicloud.com'
	});
	user.register({
		username : username,
		password : password
	}, function(ret, err) {
		api.hideProgress();
		if (ret) {
			
		} else {
			//            api.toast({msg: err.message, location: "middle"})
		}
	});

}