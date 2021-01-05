// cli방식이 아니라 api를 이용하는 방식을 사용 합니다.
// cli를 사용하려면 cmd에서 "parcel index.html --global srokApp" 방식으로 실행하면 됩니다.

const {createProxyMiddleware} = require('http-proxy-middleware');
const Bundler = require('parcel-bundler');
const express = require('express');

const options = {
    outDir: './dist', //결과가 저장될 디렉토리 입니다.(나중에 서버 프로젝트 경로로 해도 좋을 듯)
    publicUrl: '/',  //서버상의 위치 입니다.
    watch: true, // 파일 변경을 감지해서 변경시 다시 빌드할지에 대한 여부 입니다.
    cache: true, // 캐시를 여부 입니다.
    https: false, // 파일을 https로 서빙할지 http로 할지 여부 입니다.
    hmr: false, // 자동으로 파일변경되면 웹 브라우저가 스스로 리로딩 되는 것을 설정 합니다. true, false
    global: 'parcelApp' // 파셀에서 만든 글로벌 변수 이름 입니다.
}

const app = express();
let bundler;


async function runBundle() {
  bundler = new Bundler('src/*/**', options)  //2뎁스까지 빌드
}

new Promise((succ, fail) => {
    try {
        runBundle()
        succ(true);
    } catch (e) {
        console.log(e)
        succ(false);
    }
}).then(() => { // 아래와 같은 방법으로 프록시를 설정 할 수 있습니다.
    app.use('/api', createProxyMiddleware({
        target: 'http://127.0.0.1:8181/',
        changeOrigin: true
    }));

    app.use('/image', createProxyMiddleware({
        target: 'http://127.0.0.1:8181/',
        changeOrigin: true
    }));

    app.use(bundler.middleware());
    app.listen(1234); // 1234포트에서 동작하게 합니다.
}).catch(() => {
    console.log('error')
})