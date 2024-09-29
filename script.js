let price = 19.5;
let cid = [
    ["PENNY", 0.5], 
    ["NICKEL", 0], 
    ["DIME", 0], 
    ["QUARTER", 0], 
    ["ONE", 0], 
    ["FIVE", 0], 
    ["TEN", 0], 
    ["TWENTY", 0], 
    ["ONE HUNDRED", 0]
]


let values = [
    ["PENNY", 1],
    ["NICKEL", 5],
    ["DIME", 10],
    ["QUARTER", 25],
    ["ONE", 100],
    ["FIVE", 500],
    ["TEN", 1000],
    ["TWENTY", 2000],
    ["ONE HUNDRED", 10000]
]

const cashInput = document.getElementById("cash")
const exchangeView = document.getElementById("change-due")
const drawerView = document.getElementById("drawer")
const purchase = document.getElementById("purchase-btn")

function updateDrawerView(){
    drawerView.innerHTML = ""
    for(const [k, v] of cid){
        const newLi = document.createElement("li");
        newLi.innerText = `${k}: ${v}`;
        drawerView.append(newLi);
    }
}
function sellProduct(){
    let priceReformated = Math.round(price*100);

    // if cash === ""
    if(cashInput.value === ""){
        alert("insert a value")
        return
    }
    
    let cash = (cashInput.value*100);
    console.log(cash)
    cash = Math.round(cash)
    console.log(cash)

    // if cash < price
    if(cash < priceReformated){
        alert("Customer does not have enough money to purchase the item")
        return
    }   
    // if cash === price
    if(cash === priceReformated){
        exchangeView.innerText = "No change due - customer paid with exact cash"
        return
    }
    const exchange = [];
    cash -= priceReformated
    for(let i = values.length-1; i >= 0; i--){
        exchange.push([values[i][0], 0])
        cid[i][1]*=100;
        while(cid[i][1] >= values[i][1] && cash >= values[i][1]){
            cid[i][1] -= values[i][1];
            cash -= values[i][1];
            exchange[exchange.length-1][1] += values[i][1];
        }
        if(exchange[exchange.length-1][1] === 0)exchange.pop();
    }

    // if INSUFFICIENT_CASH
    if(cash !== 0){
        console.log(cid)
        exchangeView.innerText = "Status: INSUFFICIENT_FUNDS"
        for(let i = 0; i < exchange.length; i++){
            for(let j = 0; j < cid.length; j++){
                if(exchange[i][0] === cid[j][0]){
                    cid[j][1] += exchange[i][1];
                    break;
                }
            }
        }
        for(let i = 0; i < cid.length; i++){
            cid[i][1] /= 100;
        }
        return;
     }
    // if CLOSED (cid === 0)
    let isEmpty = true;
    for(let i = 0; i < cid.length; i++){
        if(cid[i][1] !== 0){
            isEmpty = false;
            break;
        }
    }
    if(isEmpty){
        exchangeView.innerText = "Status: CLOSED"
        for(const [k, v] of exchange){
            let li = document.createElement("li")
            li.innerText = `${k}: \$${v/100}`
            exchangeView.append(li)
        }
    
        updateDrawerView();
        return;
    }
    // if OPEN
    exchangeView.innerText = "Status: OPEN"
    for(const [k, v] of exchange){
        let li = document.createElement("li")
        li.innerText = `${k}: \$${v/100}`
        exchangeView.append(li)
    }
    for(let i = 0; i < cid.length; i++)
        cid[i][1]/=100;
    updateDrawerView()

    

}

purchase.addEventListener("click", sellProduct)
updateDrawerView()