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
import domready from './domready.js';

// Call LESS processor
import '../less/admin.less';

domready(function () {
    $('.ui.dropdown')
        .dropdown({
            'ignoreCase': true,
            'match': 'text',
            'fullTextSearch': true
        });

    //Newsletter bulk sender
    (function () {
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

            var tick = function() {
                var item = list.shift();
                if(item === undefined) {
                    return;
                }

                item.statusField.text('Zpracovávám…');
                fetch(getEndpointUrl(item.email))
                    .then(function(){
                        item.statusField.text('Hotovo');
                        setTimeout(tick, 500);
                    });
            };

            tick();

        });
    })();
});

