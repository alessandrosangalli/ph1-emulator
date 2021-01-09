var plays = {
    "hamlet": { "name": "Hamlet", "type": "tragedy" },
    "as-like": { "name": "As You Like It", "type": "comedy" },
    "othello": { "name": "Othello", "type": "tragedy" }
};
var invoices = [
    {
        "customer": "BigCo",
        "performaces": [
            {
                "playID": "hamlet",
                "audience": 55
            },
            {
                "playID": "as-like",
                "audience": 35
            },
            {
                "playID": "othello",
                "audience": 40
            }
        ]
    }
];
function statament(invoice, plays) {
    var totalAmount = 0;
    var volumeCredits = 0;
    var result = "Statament for " + invoice.customer + "\n";
    var format = new Intl.NumberFormat("en-us", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format;
    for (var _i = 0, _a = invoice.performaces; _i < _a.length; _i++) {
        var perf = _a[_i];
        console.log(perf);
    }
}
statament(invoices, plays);
