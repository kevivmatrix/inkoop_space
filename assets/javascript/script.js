function init() {
  var stage = new createjs.Stage("space_canvas");
  var index = 0;
  var screen_width = $(window).width();
  var width = screen_width * 3;
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

  var canvas_x, canvas_y;

  $("#space_canvas").on("mousemove", function(e){
    if (canvas_x && canvas_y) {
      window.scrollBy(e.clientX - canvas_x, e.clientY - canvas_y);
    }
    canvas_x = e.clientX;
    canvas_y = e.clientY;
  });
  
  $("#explore").css({
    marginLeft: -(screen_width*3/10)
  });

  $("#explore_button").on("click", function(e){
    $("#explore").fadeOut(400);
  });
  
  var rocket_x = -100, rocket_y = -100, velocity = 500;
  var time = 0;
  function rocket_fly() {
    var timer = setTimeout(function(){
      var new_rocket_x = Math.floor(Math.random() * width);
      var new_rocket_y = Math.floor(Math.random() * height);
      var distance_x = new_rocket_x - rocket_x;
      var distance_y = new_rocket_y - rocket_y;
      var distance = Math.sqrt( Math.pow(distance_x, 2) + Math.pow(distance_y, 2) );
      time = Math.floor((distance / velocity) * 1000) ;
      $("#rocket").animate({ left: new_rocket_x, top: new_rocket_y }, time, rocket_fly);
    }, 1000);
  }
  rocket_fly();
}
