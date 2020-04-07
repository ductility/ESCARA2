const gcode_cli_path = "~/workspace/gcode-cli/gcode-cli"; //자신의 gcode-cli파일의 경로에 맞게 수정해야함

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
                var gcode = ("&" + decodeURIComponent(chunk)).replace(/&chunk=/g,"");
                console.log("***************************\ng-code 데이터를 받았습니다.");
                console.log(gcode);
                //console.log(gcode.replaceAll("M","G")); //데이터 받은 것 표시


                fs.writeFile('test.gcode', gcode, 'utf8', function(error){
                    console.log("g-code 파일을 만들었습니다.");

                    const child = exec(gcode_cli_path + " test.gcode", function (error, stdout, stderr) { //gcode-cli 동작
                        // console.log('stdout: ' + stdout);  //exec는 콜백으로 명령이 끝난 후 stdout과 stderr를 한꺼번에 출력
                        // console.log('stderr: ' + stderr);  //실시간 gcode 전송 메세지를 받을 수 없으므로 주석 처리함
                        console.log('\n작업이 종료되었습니다.');
                        if (error !== null) {
                            console.log('exec error: ' + error);
                        }
                    });

                });

            });
        }
    }
}).listen(port, function(){
    console.log("Listen on port " + port);
});