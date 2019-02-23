function ajaxRequest(url, method, bodyParam, callBack) {
	var common_url = 'https://d.apicloud.com/mcm/api';
	var appId = 'A6996809038368';
	var key = 'E38693FF-889E-DE2F-FF8E-C72871C8731C';
	var now = Date.now();
	var appKey = SHA1(appId + "UZ" + key + "UZ" + now) + "." + now;
	api.ajax({
		url : common_url + url,
		method : method,
		cache : false,
		timeout : 20,
		headers : {
			"Content-type" : "application/json;charset=UTF-8",
			"X-APICloud-AppId" : appId,
			"X-APICloud-AppKey" : appKey
		},
		data : {
			body : bodyParam
		}
	}, function(ret, err) {
		callBack(ret, err);
	});
}

function checkData() {
	var getTabBarActivityUrl = '/words?filter=';
	var urlParam = {
		'where' : {
			'wordContent' : str
		},
		'filter' : ['id', 'wordContet'],
		'limit' : 1
	};
	ajaxRequest(getTabBarActivityUrl + JSON.stringify(urlParam), 'GET', '', function(ret, err) {
		if (ret) {
			if (ret.length == 0) {
				charu();
			} else { 不插入
			}
		} else {
			api.alert({
				msg : err.msg
			});
		}

	})
}
