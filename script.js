// ===============================
// Bitcoin1070 PRO
// script.js PART1
// ===============================

const BTC_BOTTOM = new Date("2022-11-21T00:00:00");

const TOTAL_DAYS = 1070;

async function loadBTC(){

try{

const res = await fetch(
"https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=jpy&include_24hr_change=true"
);

const data = await res.json();

const price = Math.round(data.bitcoin.jpy);

const change = data.bitcoin.jpy_24h_change.toFixed(2);

document.getElementById("btcPrice").innerHTML =
"¥"+price.toLocaleString();

const el = document.getElementById("btcChange");

el.innerHTML = change+"%";

if(change>=0){

el.style.color="#00e676";

}else{

el.style.color="#ff5252";

}

}catch(e){

document.getElementById("btcPrice").innerHTML="取得失敗";

}

}

function update1070(){

const now = new Date();

const diff = now - BTC_BOTTOM;

const days = Math.floor(

diff/1000/60/60/24

);

document.getElementById("days").innerHTML=

days+"日";

const pct =

Math.min(

(days/TOTAL_DAYS)*100,

100

);

document.getElementById("progressBar")

.style.width=pct+"%";

}

function aiComment(){

const txt=

document.getElementById("btcChange")

.innerText;

const num=parseFloat(txt);

let msg="";

if(num>=5){

msg="🔥 強い上昇トレンドです。押し目を待つ戦略も検討。";

}else if(num>=2){

msg="📈 強気相場が継続しています。";

}else if(num>-2){

msg="😐 様子見相場です。";

}else{

msg="⚠ 下落中です。長期投資なら積立を検討。";

}

document.getElementById("aiComment").innerHTML=

msg;

}

function start(){

loadBTC().then(()=>{

aiComment();

});

update1070();

}

start();

setInterval(loadBTC,60000);

setInterval(update1070,60000);
// ===============================
// Bitcoin1070 PRO
// script.js PART2
// ===============================

// Fear & Greed Index
async function loadFearGreed(){

    try{

        const res = await fetch(
        "https://api.alternative.me/fng/?limit=1"
        );

        const json = await res.json();

        const value = json.data[0].value;

        let text = value;

        if(value>=75){

            text += " 😎 Extreme Greed";

        }else if(value>=55){

            text += " 🙂 Greed";

        }else if(value>=45){

            text += " 😐 Neutral";

        }else if(value>=25){

            text += " 😟 Fear";

        }else{

            text += " 😱 Extreme Fear";

        }

        document.getElementById("fear").innerHTML=text;

    }catch(e){

        document.getElementById("fear").innerHTML="取得失敗";

    }

}


// 半減期カウント
function updateHalving(){

    const target = new Date("2028-04-20");

    const now = new Date();

    const diff = target-now;

    const days = Math.ceil(

        diff/1000/60/60/24

    );

    document.getElementById("halving").innerHTML=

        days+"日";

}


// TradingView
function createTradingView(){

if(typeof TradingView==="undefined") return;

new TradingView.widget({

"autosize":true,

"symbol":"BINANCE:BTCUSDT",

"interval":"D",

"timezone":"Asia/Tokyo",

"theme":"dark",

"style":"1",

"locale":"ja",

"toolbar_bg":"#111111",

"enable_publishing":false,

"hide_top_toolbar":false,

"allow_symbol_change":true,

"container_id":"tradingview"

});

}


// 初期化追加
loadFearGreed();

updateHalving();

setTimeout(createTradingView,1000);

setInterval(loadFearGreed,300000);

setInterval(updateHalving,3600000);
