// ===============================
// Portfolio Manager v1.0
// ===============================

// ===== 保有数量（自分の資産） =====
const holdings = {
  BTC: 0.00774,
  ETH: 0.1,
  XRP: 118.32089,
  SOL: 5.91,
  SUI: 60.8529,
  RENDER: 249.35,

  NVDA: 15,

  MHI: 43,      // 三菱重工
  ADVT: 8,      // アドバンテスト
  FJK: 2,       // フジクラ
  VRAIN: 8      // VRAIN Solution
};

// ===== API =====
const COINGECKO =
"https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple,solana,sui,render-token&vs_currencies=jpy";

// ===== 仮想通貨価格取得 =====
async function loadPortfolioCrypto(){

    try{

        const res = await fetch(COINGECKO);
        const data = await res.json();

        const prices = {

            BTC:data.bitcoin.jpy,
            ETH:data.ethereum.jpy,
            XRP:data.ripple.jpy,
            SOL:data.solana.jpy,
            SUI:data.sui.jpy,
            RENDER:data["render-token"].jpy

        };

        calculatePortfolio(prices);

    }catch(e){

        console.log(e);

    }

}

// ===== 合計計算 =====
function calculatePortfolio(price){

    const totalCrypto =
        holdings.BTC * price.BTC +
        holdings.ETH * price.ETH +
        holdings.XRP * price.XRP +
        holdings.SOL * price.SOL +
        holdings.SUI * price.SUI +
        holdings.RENDER * price.RENDER;

const stock = calculateStockAssets();

const totalStocks =
    stock.NVDA +
    stock.MHI +
    stock.ADVT +
    stock.FJK +
    stock.VRAIN;

const totalAsset =
    totalCrypto +
    totalStocks;

document.getElementById("totalAsset").innerHTML =
    "¥" + Math.round(totalAsset).toLocaleString();
showPortfolio(price);
console.log("グラフ描画開始");
drawPortfolioChart(price);
  
}
loadPortfolioCrypto();
// ===============================
// 保有資産一覧
// ===============================

function showPortfolio(price = {}){

    const coins = [

        {name:"BTC", amount:holdings.BTC, price:price.BTC || 0, unit:"BTC"},
        {name:"ETH", amount:holdings.ETH, price:price.ETH || 0, unit:"ETH"},
        {name:"XRP", amount:holdings.XRP, price:price.XRP || 0, unit:"XRP"},
        {name:"SOL", amount:holdings.SOL, price:price.SOL || 0, unit:"SOL"},
        {name:"SUI", amount:holdings.SUI, price:price.SUI || 0, unit:"SUI"},
        {name:"RENDER", amount:holdings.RENDER, price:price.RENDER || 0, unit:"枚"}

    ];

    let html="";

    html += "<h3>🪙 仮想通貨</h3>";

    coins.forEach(c=>{

        const value = c.amount*c.price;

        html+=`
        <div class="asset">
            <b>${c.name}</b><br>
            保有：${c.amount} ${c.unit}<br>
            現在価格：¥${Math.round(c.price).toLocaleString()}<br>
            評価額：<b>¥${Math.round(value).toLocaleString()}</b>
        </div><br>
        `;

    });

    html+="<hr>";

    const stock = calculateStockAssets();

html += `
<hr>

<h3>🇺🇸 米国株</h3>

<div class="asset">
<b>NVIDIA</b><br>
保有：${holdings.NVDA}株<br>
現在価格：$${stockPrices.NVDA}<br>
評価額：<b>¥${Math.round(stock.NVDA).toLocaleString()}</b>
</div>

<hr>

<h3>🇯🇵 日本株</h3>

<div class="asset">
<b>三菱重工</b><br>
保有：${holdings.MHI}株<br>
現在価格：¥${stockPrices.MHI.toLocaleString()}<br>
評価額：<b>¥${Math.round(stock.MHI).toLocaleString()}</b>
</div><br>

<div class="asset">
<b>アドバンテスト</b><br>
保有：${holdings.ADVT}株<br>
現在価格：¥${stockPrices.ADVT.toLocaleString()}<br>
評価額：<b>¥${Math.round(stock.ADVT).toLocaleString()}</b>
</div><br>

<div class="asset">
<b>フジクラ</b><br>
保有：${holdings.FJK}株<br>
現在価格：¥${stockPrices.FJK.toLocaleString()}<br>
評価額：<b>¥${Math.round(stock.FJK).toLocaleString()}</b>
</div><br>

<div class="asset">
<b>VRAIN</b><br>
保有：${holdings.VRAIN}株<br>
現在価格：¥${stockPrices.VRAIN.toLocaleString()}<br>
評価額：<b>¥${Math.round(stock.VRAIN).toLocaleString()}</b>
</div>

`;

document.getElementById("portfolioList").innerHTML=html;

}

