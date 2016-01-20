
function route(handle, pathname, response, request) {
	console.log("About to route a request for " + pathname);
	// 中身がfunctionか確認する
	if (typeof handle[pathname] === 'function') {
		// 登録されているfunctionにresponseオブジェクト、リクエストオブジェクトを渡す
		return handle[pathname](response, request);
	} else {
		// 中身がfunctionではなかった場合404エラーを返す
		console.log("No request found for" + pathname);
		response.writeHead(404, {"Content-Type":"text/plain"});
		response.write("404 Not found");
		response.end();
	}
}

exports.route = route;