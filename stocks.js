// ===============================
// Stock Manager
// ===============================

// 仮データ（あとでAPI取得に変更）
const stockPrices = {

    NVDA: 185,      // USD
    USDJPY: 160,

    MHI: 3650,
    ADVT: 11800,
    FJK: 7200,
    VRAIN: 3950

};

// 円換算評価額
function calculateStockAssets(){

    const stock = {

        NVDA:
            holdings.NVDA *
            stockPrices.NVDA *
            stockPrices.USDJPY,

        MHI:
            holdings.MHI *
            stockPrices.MHI,

        ADVT:
            holdings.ADVT *
            stockPrices.ADVT,

        FJK:
            holdings.FJK *
            stockPrices.FJK,

        VRAIN:
            holdings.VRAIN *
            stockPrices.VRAIN

    };

    return stock;

}
