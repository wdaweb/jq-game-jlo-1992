const WORDS = [
  '<img class="words" src="./images/oops.png">',
  '<img class="words" src="./images/niceup.png">',
];
$("#game").on("mousemove", function (event) {
  $(".ball").each(function () {
    const ball = $(this);
    gameOffset = $("#game").offset();
    mouseX = event.pageX - gameOffset.left;
    mouseY = event.pageY - gameOffset.top;
    ballOffset = ball.position();
    // 球的中心點
    ballX = ballOffset.left + ball.width() / 2;
    ballY = ballOffset.top + ball.width() / 2;
    digX = mouseX - ballX;
    digY = mouseY - ballY;
    dig = Math.sqrt(digX * digX + digY * digY);
    // 感應半徑
    digRange = 100;
    // 如果滑鼠與球的距離小於感應半徑，球就會彈起
    if (dig < digRange && !ball.hasClass("dug")) {
      ball.addClass("dug");
      ball.stop();
      let vy = -30;
      let vx =
        (Math.random() < 0.5 ? -1 : 1) * Math.round(Math.random() * 10 + 1);
      let gravity = 0.8;

      let top = ball.offset().top - gameOffset.top;
      let left = ball.offset().left - gameOffset.left;

      const interval = setInterval(function () {
        vy += gravity;
        top += vy;
        left += vx;
        ball.css({ top: `${top}px`, left: `${left}px` });
      }, 20);

      let digBallWords;
      const ballSrc = ball.attr("src");

      if (
        ballSrc.includes("angrybird.png") ||
        ballSrc.includes("piggy.png") ||
        ballSrc.includes("Minions.png")
      ) {
        score--;
        digBallWords = $(WORDS[0]);
      } else {
        score++;
        digBallWords = $(WORDS[1]);
      }

      digBallWords.css({ top: `${top - 60}px`, left: `${left - 30}px` });
      $("#game").append(digBallWords);
      setTimeout(function () {
        digBallWords.fadeOut(300, function () {
          digBallWords.remove();
        });
      }, 600);

      $("#score").text(score);
      setTimeout(function () {
        ball.remove();
      }, 400);
    }
  });
});
