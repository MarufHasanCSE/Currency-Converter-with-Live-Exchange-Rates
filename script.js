const fromSelect = document.getElementById('from-currency');
const toSelect = document.getElementById('to-currency');
const amountInput = document.getElementById('amount');
const resultInput = document.getElementById('result-val');
const rateText = document.getElementById('rate-text');

const currencies = ['USD','BDT', 'EUR', 'GBP', 'INR', 'JPY', 'CAD', 'AUD'];


currencies.forEach(currency => {
    const option1 = new Option(currency, currency);
    const option2 = new Option(currency, currency);
    fromSelect.add(option1);
    toSelect.add(option2);
});


fromSelect.value = "USD";
toSelect.value = "EUR";

async function convert() {
    const from = fromSelect.value;
    const to = toSelect.value;
    const amount = amountInput.value;

    
    const res = await fetch(`https://open.er-api.com/v6/latest/${from}`);
    const data = await res.json();
    
    const rate = data.rates[to];
    const total = (amount * rate).toFixed(2);

    resultInput.value = total;
    rateText.innerText = `1 ${from} = ${rate.toFixed(4)} ${to}`;
}


[amountInput, fromSelect, toSelect].forEach(el => {
    el.addEventListener('input', convert);
});

convert();