var http = require("http");
var url = require("url");

// サーバー起動処理
function start(route, handle) {
	// リクエスト受信
	function onRequest (request, response) {
		// リクエストパスを取得
		var pathname = url.parse(request.url).pathname;
		console.log("Request for 《" + pathname + "》 received.");
		// ルーターにハンドラーリストとパスを渡す
		route(handle, pathname, response, request);
	}
	
	// サーバー起動
	http.createServer(onRequest).listen(8888);
	console.log("Server has startted.");
}

exports.start = start;