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
    let totalAmount : any = 0;
    let volumeCredits : any = 0;
    let result : String = `Statament for ${invoice.customer}\n`;
    const format = new Intl.NumberFormat("en-us", {style: "currency", currency: "USD", minimumFractionDigits: 2}).format;

    for (let perf of invoice.performaces) {
        const play = plays[perf.playID];
        let thisAmount = 0;
        
        switch(play.type) {
            case "tragedy":
                thisAmount = 40000;
                if (perf.audience > 30) {
                    thisAmount += 1000 * (perf.audience - 30);
                }
            break;
            case "comedy":
                thisAmount = 30000;
                if (perf.audience > 20) {
                    thisAmount += 10000 + 500 * (perf.audience - 20)
                }

                thisAmount += 300 * perf.audience;

            break;
            default:
                throw new Error(`unknow type: ${play.type}`);
        }

        volumeCredits += Math.max(perf.audience - 30, 0);

        if (play.type === "comedy") {
            volumeCredits += Math.floor(perf.audience / 5);
        }

        result += `  ${play.name} : ${format(thisAmount / 100)} (${perf.audience} seats)\n`;
        totalAmount += thisAmount;
    }

    result += `Amount owed is ${format(totalAmount / 100)}\n`;
    result += `You earned ${volumeCredits} credits\n`;

    return result;
}

console.log(statament(invoices, plays));