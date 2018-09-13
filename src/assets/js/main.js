import electron from 'electron';
import jQuery from 'jquery';
import io from 'socket.io-client';

const ipcRenderer = electron.ipcRenderer;
const $ = jQuery;

/**
 * socket
 */
const socket = io.connect('http://58.229.185.189:3002', {
    reconnection: false
});

socket.on('connect', function () {
    socket.emit('connected:user', {
        memNo: localStorage.getItem('memNo'),
        memName: localStorage.getItem('memName'),
        memTeam: localStorage.getItem('memTeam')
    });
});

socket.on('connected:user:response', function (res) {
    let users = res['users'];
    let html = '';

    console.log(users);

    // sort
    users.sort(function (a, b) {
        return b['memSort'] - a['memSort'];
    });

    for (let user of users) {
        html += userRenderHtml(user);
    }

    $('.app-side-search-result').empty().append(html);

});

function userRenderHtml(user) {
    return '<li>\n' +
        '<a href="javascript:;" class="app-side-search-result-item">\n' +
        '<div class="app-side-search-result-item-image" style="background-image: url(http://img.insight.co.kr/files/user/small_30/' + user['memNo'] + '_profile.png);"></div>\n' +
        '<div class="app-side-search-result-item-info">\n' +
        '<span class="app-side-search-result-item-info-name">' + user['memName'] + '</span>\n' +
        '<span class="app-side-search-result-item-info-badge' + user['memStatus'] + '"></span>\n' +
        '</div>\n' +
        '</a>\n' +
        '</li>';
}

(function () {

    console.log('test');

    /**
     * ipcRenderer
     */
    ipcRenderer.on('app:blur', function () {
        $('.window-bar').css('background', '#e7eaed');
    });

    ipcRenderer.on('app:focus', () => {
        $('.window-bar').css('background', '#dee1e6');
    });

    /**
     * Search focus, focusout
     */
    $('input[name=query]').on('click', function (e) {
        e.stopPropagation();
        $('.app-side-message').hide();
        $('.app-side-search-result').fadeIn();
    });

    $(document).on('click', function () {
        $('.app-side-search-result').hide();
        $('.app-side-message').show();
    });

    $('.app-side-search-result-item').on('click', function () {
        console.log('aa');
    });

})();