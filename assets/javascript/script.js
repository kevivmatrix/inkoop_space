function init() {
  var stage = new createjs.Stage("space_canvas");
  var index = 0;
  var width = $(window).width() * 3;
  var height = $(window).height() * 3;
  $("#space_canvas").attr({
    width: width,
    height: height
  });
  var star_constant = 450;
  var stars_count = width * height / star_constant;
  while (index < stars_count) {
    var circle = new createjs.Shape();
    if (index % 4 == 0) {
      var size = 1;
    } else {
      var size = 0.5;
    }
    circle.graphics.beginFill("#ffffff").drawCircle(0, 0, size);
    circle.x = Math.floor((Math.random() * width) + 1);
    circle.y = Math.floor((Math.random() * height) + 1);
    stage.addChild(circle);
    index++;
  }
  stage.update();

  var x, y;

  $("#space_canvas").on("mousemove", function(e){
    if (x && y) {
      window.scrollBy(e.clientX - x, e.clientY - y);
    }
    x = e.clientX;
    y = e.clientY;
  });
}
