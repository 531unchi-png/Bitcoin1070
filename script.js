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
