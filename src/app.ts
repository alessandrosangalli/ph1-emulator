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

function statament(invoice : any, plays : any) {
    let totalAmount : Number = 0;
    let volumeCredits : Number = 0;
    let result : String = `Statament for ${invoice.customer}\n`;
    const format = new Intl.NumberFormat("en-us", {style: "currency", currency: "USD", minimumFractionDigits: 2}).format;

    for (let perf of invoice.performaces) {
        const play = plays[perf.playID];
        let thisAmount = 0;
        
        switch(play.type) {
            case "tragedy":
                thisAmount = 4000;
                if (perf.audience > 30) {
                    thisAmount += 1000 * (perf.audience - 30);
                }
            break;
            case "comedy":
            break;
            default:
                throw new Error(`unknow type: ${play.type}`);
            break;
        }
    }
}

statament(invoices, plays);