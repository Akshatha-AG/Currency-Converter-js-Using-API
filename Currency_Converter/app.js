const BASE_URL="https://2024-03-06.currency-api.pages.dev/v1/currencies";

const dropdowns=document.querySelectorAll(".dropdown select");

const btn = document.querySelector("form button");

const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const msg = document.querySelector(".msg")
let i=0;

for (let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name ==="from" && currCode==="USD"){
            newOption.selected="selected";
        }else if (select.name ==="to" && currCode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let ammountval = amount.value;
    
    if(ammountval ==="" || ammountval<1){
        ammountval = 1;
        amount.value=1;
    }
    //console.log(fromCurrency.value, toCurrency.value);
    //const URK =`https://api.freecurrencyapi.com/v1/latest?apikey=YOUR_KEY&base_currency=${fromCurrency}&currencies=${toCurrency}`;
    const URL = `https://api.frankfurter.app/latest?amount=${ammountval}&from=${fromCurrency.value.toUpperCase()}&to=${toCurrency.value.toUpperCase()}`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.rates[toCurrency.value.toUpperCase()];
    // console.log(rate);
    msg.innerText=`${ammountval} ${fromCurrency.value} = ${rate} ${toCurrency.value}`
})  

