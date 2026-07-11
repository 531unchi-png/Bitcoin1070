console.log("chart.js 読み込み成功");

let assetChart = null;

function drawPortfolioChart(price = {}) {

    console.log("drawPortfolioChart", price);

    const stock = calculateStockAssets();

    const assets = {

        BTC: holdings.BTC * (price.BTC || 0),
        ETH: holdings.ETH * (price.ETH || 0),
        XRP: holdings.XRP * (price.XRP || 0),
        SOL: holdings.SOL * (price.SOL || 0),
        SUI: holdings.SUI * (price.SUI || 0),
        RENDER: holdings.RENDER * (price.RENDER || 0),

        NVIDIA: stock.NVDA,
        "三菱重工": stock.MHI,
        "アドバンテスト": stock.ADVT,
        "フジクラ": stock.FJK,
        "VRAIN": stock.VRAIN

    };

    const labels = [];
    const values = [];

    Object.entries(assets).forEach(([name,value])=>{

        if(value>0){

            labels.push(name);
            values.push(Math.round(value));

        }

    });

    const ctx = document.getElementById("assetChart");

    if(!ctx) return;

    if(assetChart){

        assetChart.destroy();

    }

    assetChart = new Chart(ctx,{

        type:"doughnut",

        data:{

            labels:labels,

            datasets:[{

                data:values

            }]

        },

        options:{

            responsive:true,

            plugins:{

                legend:{

                    position:"bottom"

                }

            }

        }

    });

}
