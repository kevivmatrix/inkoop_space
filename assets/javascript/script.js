function init() {
  var stage = new createjs.Stage("demoCanvas");
  var index = 0;
  while (index < 500) {
    var circle = new createjs.Shape();
    if (index % 2 == 0) {
      var size = 0.5;
    } else {
      var size = 1;
    }
    circle.graphics.beginFill("#ffffff").drawCircle(0, 0, size);
    circle.x = Math.floor((Math.random() * 1600) + 1);
    circle.y = Math.floor((Math.random() * 1000) + 1);
    stage.addChild(circle);
    index++;
  }
  stage.update();
}
