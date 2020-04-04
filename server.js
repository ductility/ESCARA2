const port = 8080;
const http = require('http');
const url = require('url');
const fs = require('fs');
const exec = require('child_process').exec;

http.createServer((request, response) => {
    const path = url.parse(request.url, true).pathname; // url에서 path 추출
    if (request.method === 'GET') { // GET 요청이면
        if (path === '/') { // 주소가 /이면
            response.writeHead(200,{'Content-Type':'text/html'});
            fs.readFile(__dirname + '/main.html', (err, data) => {
                if (err) {
                    return console.error(err);
                }
                response.end(data, 'utf-8');
            });
        }
        else { // 매칭되는 주소가 없으면
            response.statusCode = 404; // 404 상태 코드
            response.end('404 NOT FOUND', 'utf-8');
        }
    } else if (request.method == 'POST') {
        if (path === '/send_gcode') { // 주소가 /이면
            request.on('data', function(chunk) {
                console.log("************************\ng-code 데이터를 받았습니다.\n************************");
                console.log(chunk.toString());
                fs.writeFile('test.gcode', chunk.toString(), 'utf8', function(error){
                    console.log("g-code 파일을 만들었습니다.");

                    const child = exec("~/workspace/gcode-cli/gcode-cli test.gcode", function (error, stdout, stderr) { //쉘스크립트 동작
                        console.log('stdout: ' + stdout);
                        console.log('stderr: ' + stderr);
                        if (error !== null) {
                            console.log('exec error: ' + error);
                        }
                    });

                })
            });
        }
    }
}).listen(port, function(){
    console.log("Listen on port " + port);
});