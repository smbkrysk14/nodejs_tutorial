// モジュールの取り込み
//  1.server.jsの取り込み
var server = require("./server");
//  2.router.jsの取り込み
var router = require("./router");
//  3.requestHandlers.jsの取り込み
var requestHandlers = require("./requestHandlers");

var getcarpicture = require("./03-getall/getcarpicture");

var handle = {};
// ハンドラーを登録(Key:url相対パス、value:対応するハンドラー)
handle["/"]  = requestHandlers.start;
handle["/start"]  = requestHandlers.start;
handle["/upload"]  = requestHandlers.upload;
handle["/show"] = requestHandlers.show;
handle["/downloadRec"] = getcarpicture.downloadRec;

console.log("index.js : server.start");

// サーバーを起動
server.start(router.route, handle);