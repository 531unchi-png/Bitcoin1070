console.log("chart.js 読み込み成功");
let assetChart = null;

function drawPortfolioChart(price = {}) {

    console.log("drawPortfolioChart", price);
    const crypto = {
        BTC: holdings.BTC * (price.BTC || 0),
        ETH: holdings.ETH * (price.ETH || 0),
        XRP: holdings.XRP * (price.XRP || 0),
        SOL: holdings.SOL * (price.SOL || 0),
        SUI: holdings.SUI * (price.SUI || 0),
        RENDER: holdings.RENDER * (price.RENDER || 0)
    };

    const labels = [];
    const values = [];

    Object.entries(crypto).forEach(([name,value])=>{

        if(value>0){

            labels.push(name);
            values.push(Math.round(value));

        }

    });

    const ctx=document.getElementById("assetChart");

    if(!ctx) return;

    if(assetChart){

        assetChart.destroy();

    }

    assetChart=new Chart(ctx,{

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
