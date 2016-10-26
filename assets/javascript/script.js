function init() {
  var stage = new createjs.Stage("space_canvas");
  var index = 0;
  var screen_width = $(window).width();
  var screen_height = $(window).height();
  var width = screen_width * 3;
  var height = screen_height * 3;
  // var width = screen_width;
  // var height = screen_height;
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

  $("body").on("mousemove", function(e){
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
  
  var rocket_x = -100, rocket_y = -100, velocity = 250;
  var time = 0;
  var theta_in_degree = 0;
  function rocket_fly() {
    var timer = setTimeout(function(){
      var new_rocket_x = Math.floor(Math.random() * screen_width);
      var new_rocket_y = Math.floor(Math.random() * screen_height);
      if(new_rocket_x < 0)
        new_rocket_x = 0;
      if(new_rocket_y < 0)
        new_rocket_y = 0;
      if(new_rocket_x > width - 50)
        new_rocket_x = width - 50;
      if(new_rocket_y > height - 50)
        new_rocket_y = height - 50;
      var distance_x = new_rocket_x - rocket_x;
      var distance_y = new_rocket_y - rocket_y;
      var distance = Math.sqrt( Math.pow(distance_x, 2) + Math.pow(distance_y, 2) );
      var theta_in_radian = Math.asin(Math.abs(new_rocket_y - rocket_y) / distance);
      var new_theta_in_degree = (theta_in_radian * 180) / Math.PI;
      if(new_rocket_x >= rocket_x && new_rocket_y >= rocket_y)
        new_theta_in_degree = (90 + new_theta_in_degree);
      else if(new_rocket_x > rocket_x && new_rocket_y < rocket_y)
        new_theta_in_degree = (90 - new_theta_in_degree);
      else if(new_rocket_x < rocket_x && new_rocket_y < rocket_y)
        new_theta_in_degree = (270 + new_theta_in_degree);
      else if(new_rocket_x < rocket_x && new_rocket_y > rocket_y)
        new_theta_in_degree = (270 - new_theta_in_degree);
      new_theta_in_degree = parseInt(new_theta_in_degree);
      var delta_theta_in_degree = new_theta_in_degree - theta_in_degree;
      var theta_looper = theta_in_degree;
      var rotation_timer = setInterval(function(){
        if (delta_theta_in_degree < 0) {
          theta_looper--;
        } else if (delta_theta_in_degree > 0) {
          theta_looper++;
        } else {
          clearTimeout(rotation_timer);
        }
        $("#rocket").css({
          transform: "rotate(" + theta_looper + "deg)"
        });
        if (theta_looper == new_theta_in_degree){
          clearTimeout(rotation_timer);
          time = Math.floor((distance / velocity) * 1000);
          $("#rocket").animate({ left: new_rocket_x, top: new_rocket_y }, time, function(){
            rocket_x = new_rocket_x;
            rocket_y = new_rocket_y;
            theta_in_degree = new_theta_in_degree;
            rocket_fly();
          });
        }
      }, 10);
    }, 1000);
  }
  rocket_fly();
}
