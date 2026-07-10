// ===============================
// Portfolio Manager v1.0
// ===============================

// ===== 保有数量（自分の資産） =====
const holdings = {
  BTC: 0.009173847,
  ETH: 0.1,
  XRP: 118.32089,
  SOL: 5.91,
  SUI: 60.8529,
  RENDER: 249.35,

  NVDA: 15,

  MHI: 43,      // 三菱重工
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

    document.getElementById("totalAsset").innerHTML =
        "¥" + Math.round(totalCrypto).toLocaleString();

}
