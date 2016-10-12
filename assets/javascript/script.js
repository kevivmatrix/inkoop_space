function init() {
  var stage = new createjs.Stage("demoCanvas");
  var index = 0;
  var width = $(window).width();
  var height = $(window).height();
  $("#demoCanvas").attr({
    width: width,
    height: height
  });
  var star_constant = 1350;
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
}
