let playerCreated = false;
let mouseMove = false;

function playerMove() {
  // 確認每次重新開始遊戲，前一次的 player 已經移除，才再創建一個新的 player
  if (!playerCreated) {
    $("#player").remove();
    $("#game").append('<img src="./images/koga.png" id="player">');
    playerCreated = true;
  }
  if (!mouseMove) {
    // 限制 player 只能在遊戲區間
    $("#game").on("mousemove", function (event) {
      const gameOffset = $("#game").offset();
      const left = event.pageX - gameOffset.left - 35;
      const top = event.pageY - gameOffset.top - 50;
      $("#player").css({
        left: left + "px",
        top: top + "px",
      });

      // 根據滑鼠位置控制旋轉角度
      const gameWidth = $("#game").width();
      if (left < gameWidth / 2) {
        $("#player").css({
          transform: "rotateY(0deg)",
        });
      } else if (left > gameWidth / 2) {
        $("#player").css({
          transform: "rotateY(180deg)",
          left: left - 140 + "px",
        });
      }
    });

    // } else {
    // $('#player').css({
    // transform: 'rotateZ(0deg)',
    // WebkitTransform: 'rotateZ(0deg)',
    //   });
    // }

    mouseMove = true;
  }
}
