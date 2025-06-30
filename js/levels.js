const LEVELS = {
  Beginner: {
    maxBalls: 3,
    vxRange: [2, 5],
    gravityRange: [0.5, 1],
    generateBallInterval: 1000,
    ball: '<img src="./images/real-ball.png" class="ball">',
    bomb: '<img src="./images/angrybird.png" class="ball">',
  },
  Intermediate: {
    maxBalls: 6,
    vxRange: [4, 10],
    gravityRange: [0.8, 1.5],
    generateBallInterval: 600,
    ball: '<img src="./images/real-ball.png" class="ball">',
    bomb: '<img src="./images/piggy.png" class="ball">',
  },
  Professional: {
    maxBalls: 10,
    vxRange: [6, 14],
    gravityRange: [1.2, 2.5],
    generateBallInterval: 300,
    ball: '<img src="./images/real-ball.png" class="ball">',
    bomb: '<img src="./images/Minions.png" class="ball">',
  },
};

let currentLevel = "Beginner";
$(".level").on("click", function () {
  currentLevel = $(this).text().trim();
  $("#levels-menu").hide();
  $("#btns").show();
  $("#currentLevel").text(currentLevel);
});

function generateBall() {
  // 排球隨機出現
  if ($(".ball").length < levelSetting.maxBalls) {
    const gameWidth = $("#game").width();
    const gameHeight = $("#game").height();
    // const ball = $('<img src="./images/real-ball.png" class="ball">');
    const random = Math.round(Math.random() * 100);
    let ball;
    if (random > 70) {
      ball = $(levelSetting.ball);
    } else {
      ball = $(levelSetting.bomb);
    }
    let topPercent = -Math.round(Math.random() * (130 - 100) + 100);
    let leftPercent = Math.round(Math.random() * (90 - 16) + 16);
    let top = (topPercent * gameHeight) / 100;
    let left = (leftPercent * gameWidth) / 100;
    // let vx = (Math.random() < 0.5 ? -1 : 1) * (Math.random() * (24 - 4) + 4)
    let vx =
      (Math.random() < 0.5 ? -1 : 1) *
      (Math.random() * (levelSetting.vxRange[1] - levelSetting.vxRange[0]) +
        levelSetting.vxRange[0]);
    let vy = 0;
    // let gravity = Math.round(Math.random() * (2.5 - 0.9) + 0.9)
    let gravity = Math.round(
      Math.random() *
        (levelSetting.gravityRange[1] - levelSetting.gravityRange[0]) +
        levelSetting.gravityRange[0]
    );

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
}
