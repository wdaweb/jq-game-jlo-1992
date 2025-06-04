const GAME_TIME = 10;
let score = 0;
let timeLeft = 0;
let timer = 0;
const highScore = { name: "", score: 0 };
let rankings = [
  {
    name: "You-know-who",
    score: 0,
  },
  {
    name: "You-know-who",
    score: 0,
  },
  {
    name: "You-know-who",
    score: 0,
  },
  {
    name: "You-know-who",
    score: 0,
  },
  {
    name: "You-know-who",
    score: 0,
  },
];

if (localStorage.highScore) {
  const data = JSON.parse(localStorage.highScore);
  highScore.score = data;
  $("#high-score").text(data);
}

if (localStorage.rankings) {
  try {
    rankings = JSON.parse(localStorage.rankings);
    renderRankings();
  } catch (error) {
    console.error("發生錯誤", error);
  }
}

// 開始按鈕
$("#start-btn").on("click", function () {
  // 把 player 及 滑鼠綁定事件都刪除，才不會重複綁定造成畫面問題
  resetGame();
  // 綁定球員事件
  playerMove();
  $(this).attr("disabled", true);
  $("#btns").css("display", "none");
  $("#game").css("cursor", "none");
  score = 0;
  $("#score").text(score);
  timeLeft = GAME_TIME;
  $("#time-left").text(timeLeft);

  timer = setInterval(function () {
    timeLeft--;
    $("#time-left").text(timeLeft);

    // 排球隨機出現
    if ($(".ball").length < 10) {
      const gameWidth = $("#game").width();
      const gameHeight = $("#game").height();
      const ball = $('<img src="./images/real-ball.png" class="ball">');
      let topPercent = -Math.round(Math.random() * (130 - 100) + 100);
      let leftPercent = Math.round(Math.random() * (90 - 16) + 16);
      let top = (topPercent * gameHeight) / 100;
      let left = (leftPercent * gameWidth) / 100;
      let vx = (Math.random() < 0.5 ? -1 : 1) * (Math.random() * 20 + 4);
      let vy = 0;
      let gravity = Math.round(Math.random() * (2.5 - 0.9) + 0.9);

      ball.addClass("ball");
      ball.css({ top, left });
      $("#game").append(ball);

      const timeOut = setTimeout(function () {
        ball.fadeOut(400, function () {
          ball.remove();
        });
      }, 400);

      // 每 20 毫秒更新球的移動狀態，讓球移動更流暢
      const interval = setInterval(function () {
        vy += gravity;
        top += vy;
        left += vx;
        if (left < 0 || left > gameWidth - 65) {
          vx *= -1;
        }
        if (top >= gameHeight - 65) {
          top = gameHeight - Math.round(Math.random() * (gameHeight - 65) + 65);
          vy = 0;
          vx = 0;
          clearInterval(interval);
        }
        ball.css({ top, left });
      }, 20);
    }

    // 時間到取消計時器
    if (timeLeft === 0) {
      clearInterval(timer);
      $("#start-btn").attr("disabled", false);
      // $('#levels-btn').css('display', 'block')
      // $('#rankings-btn').css('display', 'block')
      $("#btns").css("display", "block");
      $("#game").empty();
      // 判定最高分

      if (score > highScore.score) {
        Swal.fire({
          title: "You are the best libero ever!",
          text: "please enter your name",
          input: "text",
          allowOutsideClick: false,
          allowEscapeKey: false,
        }).then((result) => {
          const name = result.value || "You-Know-Who";
          highScore.score = score;
          $("#high-score").text(score);
          rankings.push({ name, score });
          rankings.sort((a, b) => b.score - a.score);
          rankings.slice(0, 5);
          renderRankings();
          score = 0;
          $("#score").text(score);

          localStorage.highScore = JSON.stringify(highScore.score);
          localStorage.rankings = JSON.stringify(rankings);
        });
      }
    }
  }, 1000);
});

$(function () {
  renderRankings();
});

function renderRankings() {
  $(".rank-score").each(function (index) {
    $(this).text(rankings[index] ? rankings[index].score : "");
  });
  $(".rank-name").each(function (index) {
    $(this).text(rankings[index] ? rankings[index].name : "");
  });
}
