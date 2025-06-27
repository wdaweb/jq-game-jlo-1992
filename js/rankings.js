let rankings = [
  { name: "NOBODY", score: 0 },
  { name: "NOBODY", score: 0 },
  { name: "NOBODY", score: 0 },
  { name: "NOBODY", score: 0 },
  { name: "NOBODY", score: 0 },
];

function updateChart(newName, newScore) {
  const newEntryIndex = rankings.findIndex(
    (item) => item.name === newName && item.score === newScore
  );
  const rankingsMenu = $("#rankings-menu");
  // 清除舊的資料
  rankingsMenu.find(".ranking-info").remove();
  rankings.forEach((item, index) => {
    const isNew = index === newEntryIndex;
    const rankHTML = `
        <div class="ranking-info ${isNew ? "new-entry" : ""}">
        <span class="rank">${index + 1}</span>
        <span class="rank-name">${item.name}</span>
        <span class="rank-score">${item.score}</span>
      </div>`;
    rankingsMenu.append(rankHTML);
    console.log(rankings);
  });
  gsap.fromTo(
    ".new-entry",
    {
      scale: 1,
      opacity: 1,
    },
    {
      scale: 1.2,
      opacity: 0.5,
      yoyo: true,
      repeat: 3,
      duration: 0.3,
      ease: "power1.inOut",
    }
  );

  if (rankings.length && typeof rankings[0].score === "number") {
    $("#high-score").text(rankings[0].score);
  }
}

function updateRankings() {
  const data = localStorage.getItem("rankings");
  if (data) {
    rankings = JSON.parse(data);
    updateChart();
  }
}
