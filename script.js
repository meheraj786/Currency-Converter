
const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

let dropdown= document.querySelectorAll(".dropdown select")
let fromCurr= document.querySelector(".from select")
let toCurr= document.querySelector(".to select")
let result= document.querySelector(".result")
let btn= document.querySelector(".btn")
let swapBtn= document.querySelector(".swap")

for (let select of dropdown){
  for (currCode in countryList){
    let newOption= document.createElement("option");
    newOption.innerText=currCode;
    newOption.value=currCode;
    if(select.name==="from" && currCode==="USD"){
      newOption.selected="selected"
    }else if (select.name==="to" && currCode==="BDT"){
      newOption.selected="selected"
    }
    select.append(newOption)
  }
  select.addEventListener("change", (evt)=>{
    updateFlag(evt.target)
  });
}

const updateExchangeRate= async ()=>{
    let amount=document.querySelector("input")
    let amtVal= amount.value;
    if (amtVal==="" || amtVal<1){
      amtVal=1;
      amount.value="1";
    };
  
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    try {
      let response = await fetch(URL);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      let json = await response.json();
      let rate = json[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
      if (rate) {
        let conAmt = amtVal * rate;
        result.innerText = `${amtVal} ${fromCurr.value} = ${conAmt.toFixed(2)} ${toCurr.value}`;
      } else {
        result.innerText = "Conversion rate not available.";
      }
    } catch (error) {
      console.error("Error fetching currency data:", error);
      result.innerText = "Conversion rate not available.";
    };
  
}
const updateFlag= (element)=>{
  let currCode=element.value;
  let countryCode=countryList[currCode];
  let newSrc= `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img=element.parentElement.querySelector("img")
  img.src= newSrc;
};
const swapCurrencies = () => {
  let temp = fromCurr.value;
  fromCurr.value = toCurr.value;
  toCurr.value = temp;
  updateFlag(fromCurr);
  updateFlag(toCurr);
  updateExchangeRate();
};
swapBtn.addEventListener("click", (evt) => {
  evt.preventDefault();
  swapCurrencies();
});
btn.addEventListener ("click", async (evt)=>{
  evt.preventDefault(); 
  updateExchangeRate()
});
window.addEventListener("load", () => {
  updateExchangeRate();
});