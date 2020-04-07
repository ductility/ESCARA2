# 마우스/터치패널으로 G-CODE 생성하는 Web APP

## 사용 하드웨어

[DrawBot](https://www.thingiverse.com/thing:3096135/)을 사용했다. 시리얼 통신으로 G-CODE를 전송하여 작동하는 다른 플로터로도 원활히 작동할 것으로 예상된다.

## 사용 소프트웨어

[nodejs](https://nodejs.org/ko/)와 [gcode-cli](https://github.com/hzeller/gcode-cli/)를 사용했다.

## 사용하기
1. [gcode-cli](https://github.com/hzeller/gcode-cli/) 설치하기   

git clone 명령으로 리포지토리를 clone 하고 이동한다.
```bash
$ git clone https://github.com/hzeller/gcode-cli.git
$ cd gcode-cli
```
자신의 장치가 연결된 시리얼 포트를 확인한다.   
* Windows + WSL : 확인한 COM포트 뒤 숫자와 조합한 ttyS(xx)형태   
 ex) ttyS0
* Linux : `$ demesg | grep tty` 입력 후 확인   
ex) ttyACM0

확인한 시리얼 포트에 맞게 main.cc의 36번째 줄을 수정한다.

**`main.cc`**
```cc
const int machine_fd = OpenMachineConnection("/dev/ttyACM0,b115200");
```
여기서 `"/dev/ttyACM0"`부분에 자신이 연결한 장치의 시리얼 포트를 입력해 주면 된다.

수정이 끝나면 make를 해 준다.
```bash
$ make
```
현재 디렉터리 명을 기억해 놓는다.

2. Web App 설치
github에서 clone한다.
```bash
$ git clone https://github.com/ductility/ESCARA2.git
$ cd ESCARA2
```
server.js 파일 첫 줄 에서 `"~/workspace/gcode-cli/gcode-cli"`부분을 자신의 gcode-cli가 위치한 path로 수정한다.    

**server.js**
```javascript
const gcode_cli_path = "~/workspace/gcode-cli/gcode-cli";
```

server.js 파일을 nodejs로 실행한다.
```bash
$ node server.js
```
서버가 열렸다는 log가 뜨면 브라우저에서 http://localhost:8080 으로 접속한다.   

3. 사용

그림을 그리고 그리기 버튼을 누르면 플로터가 그림을 그려준다.

<img src="https://github.com/ductility/ductility.github.io/blob/master/public/images/200407_%EB%A7%88%EC%9A%B0%EC%8A%A4%EA%B7%B8%EB%A6%BC.JPG?raw=true" width="450px">


## 참고 URL

Canvas로 그림 그리는 법   
https://kkk-kkk.tistory.com/entry/%EC%98%88%EC%A0%9C-11-11-%EB%A7%88%EC%9A%B0%EC%8A%A4-%EB%93%9C%EB%9E%98%EA%B9%85%EC%9C%BC%EB%A1%9C-%EC%BA%94%EB%B2%84%EC%8A%A4%EC%97%90-%EA%B7%B8%EB%A6%BC-%EA%B7%B8%EB%A6%AC%EA%B8%B0   
https://nowonbun.tistory.com/636

홈 화면에 추가   
https://choiseokwon.tistory.com/151

문자열 처리   
https://gent.tistory.com/18

Ajax Post 사용법   
https://rlaehdgs12.tistory.com/12