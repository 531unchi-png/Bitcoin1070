// ===============================
// Chart Manager
// ===============================

function drawPortfolioChart(){

    const crypto =
        holdings.BTC +
        holdings.ETH +
        holdings.XRP +
        holdings.SOL +
        holdings.SUI +
        holdings.RENDER;

    const japan =
        holdings.MHI +
        holdings.ADVT +
        holdings.FJK +
        holdings.VRAIN;

    const usa =
        holdings.NVDA;

    console.log("Crypto", crypto);
    console.log("Japan", japan);
    console.log("USA", usa);

}

drawPortfolioChart();
