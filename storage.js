// ===============================
// Storage Manager v1.0
// LocalStorage
// ===============================

const STORAGE_KEY = "bitcoin1070_portfolio";

// 保存
function savePortfolio() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(holdings)
    );

    console.log("保存しました");

}

// 読み込み
function loadPortfolio() {

    const saved =
        localStorage.getItem(STORAGE_KEY);

    if (!saved) return;

    const data = JSON.parse(saved);

    Object.keys(data).forEach(key => {

        if (holdings[key] !== undefined) {

            holdings[key] = data[key];

        }

    });

    console.log("読み込みました");

}

// リセット
function resetPortfolio() {

    localStorage.removeItem(STORAGE_KEY);

    location.reload();

}
