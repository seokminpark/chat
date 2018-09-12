const $ = require('jquery');
const request = require('request');

let options = {
    method: 'post',
    url: 'http://developers.insight.co.kr/electron/member/',
    body: '',
    json: true,
    headers: { 'content-type': 'application/x-www-form-urlencoded' }
};
request(options, function (error, response, body) {
    console.log(body);
    $('.app-random-user-image span').css({
        'background-image': 'url(http://img.insight.co.kr/files/user/large/' + body[0].MemNo + '_profile.jpg.jpg)'
    });

    $('.app-random-user-info-wrapper span').text(body[0].MemName + ' ' + body[0].MemPosName + ' ' + body[0].MemTeamName);
});

let $memId = $('input[name=memId]');
let $memPass = $('input[name=memPass]');

$memId.focus();

$('.app-login-box-form-btn-submit').on('click', function () {
    loginSubmit();
});

$memPass.on('keydown',function (e) {
    if (e.keyCode === 13) {
        loginSubmit();
    }
});

function loginSubmit() {
    $('.app-error').hide();

    $memId.val($memId.val().trim());
    if ($memId.val() === '') {
        appError('.app-error-id', '아이디를 입력해 주세요.');
        $memId.focus();
        return false;
    }

    $memPass.val($memPass.val().trim());
    if ($memPass.val() === '') {
        appError('.app-error-pass', '비밀번호를 입력해 주세요.');
        $memPass.focus();
        return false;
    }

    let data = 'memId=' + $memId.val() + '&memPass=' + $memPass.val();
    let url = 'http://developers.insight.co.kr/electron/login/';
    let options = {
        method: 'post',
        body: data,
        json: true,
        url: url,
        headers: { 'content-type': 'application/x-www-form-urlencoded'}
    };

    request(options, function (error, response, body) {
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);
        console.log('body:', body);

        if (body[0] === 'ERROR_ID')
        {
            $memId.focus();
            appError('.app-error-id', '아이디가 존재하지 않습니다.');
        }
        else if (body[0] === 'ERROR_PASS')
        {
            $memPass.focus();
            appError('.app-error-pass', '비밀번호가 일치하지 않습니다.');
        }
        else if (body[0] === 'SUCCESS')
        {
            localStorage.setItem('memNo', body[2]);
            localStorage.setItem('memName', body[3]);

            location.href = './main.html';
        }
    });
}

function appError(cls, msg) {
    $('.app-error-message').filter(cls).text(msg).css('display', 'block');
    $('.app-error-icon').filter(cls).css('display', 'flex');
}