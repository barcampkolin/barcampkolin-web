$(document).ready(function() {
    $(".ui.dropdown").dropdown({
        ignoreCase: !0,
        match: "text",
        fullTextSearch: !0
    }), function() {
        var e = $("#buldSenderSend");
        if (0 !== e.length) {
            var r = $("#buldSenderRecipients"), a = $("#buldSenderTable"), c = e.data("endpoint");
            e.click(function() {
                var e = r.val().split("\n"), t = [];
                for (var n in e) {
                    var o = $("<td>Čeká…</td>"), d = {
                        email: e[n],
                        statusField: o,
                        row: $("<tr><td>" + e[n] + "</td></tr>").append(o)
                    };
                    t.push(d), d.row.appendTo(a);
                }
                var i = function() {
                    var e = t.shift();
                    void 0 !== e && (e.statusField.text("Zpracovávám…"), fetch(function(e) {
                        return c.replace(encodeURIComponent("{{recipient}}"), encodeURIComponent(e));
                    }(e.email)).then(function() {
                        e.statusField.text("Hotovo"), setTimeout(i, 500);
                    }));
                };
                i();
            });
        }
    }();
});