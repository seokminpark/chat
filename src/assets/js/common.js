const {ipcRenderer} = require('electron');

(function () {
    function init() {
        const minButton = document.getElementById('controls-button-min'),
            maxButton = document.getElementById('controls-button-max'),
            restoreButton = document.getElementById('controls-button-restore'),
            closeButton = document.getElementById('controls-button-close');

        minButton.addEventListener('click', () => {
            ipcRenderer.send('app:minimize');
        });

        maxButton.addEventListener('click', () => {
            ipcRenderer.send('app:maximize');

            toggleMaxRestoreButtons(true);
        });

        restoreButton.addEventListener('click', () => {
            ipcRenderer.send('app:unmaximize');

            toggleMaxRestoreButtons(false);
        });

        closeButton.addEventListener('click', () => {
            ipcRenderer.send('app:close');
        });

        let isMaximized = false;
        ipcRenderer.send('app:isMaximized');
        ipcRenderer.on('app:isMaximized', function (event, arg) {
            isMaximized = arg;
        });

        ipcRenderer.on('app:unmaximize', function (event, arg) {
            toggleMaxRestoreButtons(arg);
        });

        ipcRenderer.on('app:maximize', function (event, arg) {
            toggleMaxRestoreButtons(arg);
        });

        toggleMaxRestoreButtons(isMaximized);

        function toggleMaxRestoreButtons(isMax) {
            if (isMax) {
                maxButton.style.display = 'none';
                restoreButton.style.display = 'flex';
            } else {
                restoreButton.style.display = 'none';
                maxButton.style.display = 'flex';
            }
        }
    }

    document.onreadystatechange = () => {
        if (document.readyState === 'complete') {
            init();
        }
    };

    function doSomething(e) {
        if (e.which === 116) {
            return false;
        } else if (e.which === 123) {
            ipcRenderer.send('app:openDevTools');
        }
    }

    window.addEventListener('keyup', doSomething, true);

})();

if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  };
}