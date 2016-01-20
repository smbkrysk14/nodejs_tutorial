var exec = require("child_process").exec;
var querystring = require("querystring");

// fs:ファイル操作のパッケージ
var fs = require("fs"); 
// 受信したフォームデータを解析し、オブジェクトに変換するパッケージ
var formidable = require("formidable");

// 初期化処理
function start (response) {
	console.log("Request handlre 'start' was called.");
	// HTMLを作成
	var body = '<html>' +
		'<head>' +
		'<meta http-equiv="Content-Type" content="text/html; ' +
		'charset="UTF-8" />' +
		'</head>' +
		'<body>' + 
		'<form action="/get" enctype="multipart/form-data" method="POST">' +
		'<input type="text" name="get" multiple="multiple">' +
		'<input type="submit" value="Get file" />' +
		'</form>' +
		'</body>' +
		'</html>';
	/*
	var body = '<html>' +
		'<head>' +
		'<meta http-equiv="Content-Type" content="text/html; ' +
		'charset="UTF-8" />' +
		'</head>' +
		'<body>' + 
		'<form action="/upload" enctype="multipart/form-data" method="POST">' +
		'<input type="file" name="upload" multiple="multiple">' +
		'<input type="submit" value="Upload file" />' +
		'</form>' +
		'</body>' +
		'</html>';
		*/
	
	// ステータス200とHTMLを返す
	response.writeHead(200, {"Content-Type":"text/html"});
	response.write(body);
	response.end();
}

// upload処理
function upload (response, request) {
	console.log("Request handlre 'upload' was called.");
	//  インスタンス化
	var form = new formidable.IncomingForm();
	
	console.log("about to parse");
	// フォームデータの解析
	//  error:エラーオブクジェクト
	//  fieids:フォームデータのキー(inputタグのname属性)と値(value値)
	//  files:uploadされたデータの情報
	form.parse(request, function(error, fields, files) {
		console.log("parsing done");
		// upload.pathには適当な名前が振られているのでtest.pngにrenameする
		fs.rename(files.upload.path, "/tmp/test.png", function (err) {
			if (err) {
				// エラーの場合/tmp/test.pngを削除する
				fs.unlink("/tmp/test.png");
				// もう一度チャレンジ
				fs.rename(files.upload.path, "/tmp/test.png");
			}
		});
	});
	
	response.writeHead(200, {"Content-Type":"text/html"});
	response.write("received image:<br/>");
	response.write("<img src='/show' />");
	response.end();	
}

// 表示処理
function show (response, postData) {
	console.log("Request handler 'show' was called.");
	fs.readFile("/tmp/test.png", "binary", function (error, file) {
		if (error) {
			console.log("Request handler 'show' was err.");
			response.writeHead("Request handler 'show' was called.");
			response.writeHead(500, {"Content-Type":"text/plain"});
			response.write(error + "\n");
			response.end();
		} else {
			console.log("Request handler 'show' was success.");
			response.writeHead(500, {"Content-Type":"image/png"});
			response.write(file, "binary");
			response.end();
		}
	});
}

exports.start = start;
exports.upload = upload;
exports.show = show;