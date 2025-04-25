import $ from 'jquery';
import 'nette.ajax.js';
import '@vendor/nette/forms/src/assets/netteForms.js';
import 'happy-inputs';
import 'bootstrap-datepicker';
import './jquery-ui-sortable.js';
import 'ublaboo-datagrid';
import 'bootstrap';
import 'semantic-ui-transition';
import 'semantic-ui-dropdown';
import domready from './utils/domready.mjs';

// Call LESS processor
import '../less/admin.less';

domready(function () {
    initDropdown();
    sendBulkNewsletter();
    cleanUrlParams();
    document.documentElement.classList.add('js');
});

async function initDropdown() {
    $('.ui.dropdown')
        .dropdown({
            'ignoreCase': true,
            'match': 'text',
            'fullTextSearch': true
        })
}

async function sendBulkNewsletter() {
    var button = $('#buldSenderSend');
    if (button.length === 0) {
        return;
    }

    var recipientField = $('#buldSenderRecipients');
    var recipientTable = $('#buldSenderTable');

    var endpointUrlTemplate = button.data('endpoint');
    var getEndpointUrl = function (recipient) {
        return endpointUrlTemplate.replace(encodeURIComponent('{{recipient}}'), encodeURIComponent(recipient));
    };

    button.click(function () {
        var addreses = recipientField.val().split('\n');

        var list = [];

        for (var i in addreses) {
            var status = $('<td>Čeká…</td>');
            var item = {
                email: addreses[i],
                statusField: status,
                row: $('<tr><td>' + addreses[i] + '</td></tr>').append(status),
            };
            list.push(item);
            item.row.appendTo(recipientTable);
        }

        var tick = function () {
            var item = list.shift();
            if (item === undefined) {
                return;
            }

            item.statusField.text('Zpracovávám…');
            fetch(getEndpointUrl(item.email))
                .then(function () {
                    item.statusField.text('Hotovo');
                    setTimeout(tick, 500);
                });
        };

        tick();
    });
}

/**
 * Remove _ugly_ URL parameters (`fbclid`, `gclid`, `utm_*`, `_fid`) which is only used for tracking.
 * This not affects the functionality of the analytics, only removes params from the URL.
 */
async function cleanUrlParams() {
    const url = new URL(window.location.href);
    const params = url.searchParams;
    let changed = false;
    Array.from(params.keys()).forEach((key) => {
        if (key.startsWith('utm_') || key.endsWith('clid') || key === '_fid') {
            params.delete(key);
            changed = true;
        }
    });

    if (changed) {
        setTimeout(() => window.history.replaceState({}, document.title, url.toString()), 1000);
    }
}

