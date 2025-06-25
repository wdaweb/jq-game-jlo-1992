$("#levels-btn").on("click", function () {
  $("#btns").css("display", "none");
  $("#levels-menu").css("display", "block");
});

// $(".level").each(function (index, level) {
//   $(level).on("click", function () {
//     $("#levels-menu").css("display", "none");
//     $("#btns").css("display", "block");
//   });
// });

$("#rankings-btn").on("click", function () {
  $("#btns").css("display", "none");
  $("#rankings-menu").css("display", "block");
});

$("#close-btn").on("click", function () {
  $("#rankings-menu").css("display", "none");
  $("#btns").css("display", "block");
});
