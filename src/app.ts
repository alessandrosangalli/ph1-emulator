const plays = {
    "hamlet": {"name": "Hamlet", "type": "tragedy"},
    "as-like": {"name": "As You Like It", "type": "comedy"},
    "othello": {"name": "Othello", "type": "tragedy"}
}

const invoices = {
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

function statament(invoice, plays) {
    let totalAmount : Number = 0;
    let volumeCredits : Number = 0;
    let result : String = `Statament for ${invoice.customer}\n`;
    const format = new Intl.NumberFormat("en-us", {style: "currency", currency: "USD", minimumFractionDigits: 2}).format;

    for (let perf of invoice.performaces) {
        console.log(perf);
    }
}

statament(invoices, plays);