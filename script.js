let price = 10;
let cid = [
    ["PENNY", 0.01],
    ["NICKEL", 0.05],
    ["DIME", 0.1],
    ["QUARTER", 0.25],
    ["ONE", 1],
    ["FIVE", 5],
    ["TEN", 10],
    ["TWENTY", 20],
    ["ONE HUNDRED", 100]
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
        alert("Customer does not have enough mopney to purchase the item")
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
        exchangeView.innerText = "STATUS: INSUFFICIENT_CASH"
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
        exchangeView.innerText = "STATUS: CLOSED"
        updateDrawerView();
        return;
    }
    // if OPEN
    exchangeView.innerText = "STATUS: OPEN"
    for(let i = 0; i < cid.length; i++)
        cid[i][1]/=100;
    updateDrawerView()
    console.log("idk")
     

}

purchase.addEventListener("click", sellProduct)
updateDrawerView()