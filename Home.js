$(document).ready(function(){

    // dom variable
    var container = $('.traffic_game_road');
    var car = $('#car');
    var opp_car_1 = $("#opp_car_1");
    var opp_car_2 = $("#opp_car_2");
    var opp_car_3 = $("#opp_car_3");
    var lane_1 = $("#lane1");
    var lane_2 = $("#lane2");
    var lane_3 = $("#lane3");
    var restart_game_div = $("#restart_game");
    var restart_btn = $("#restart");
    var score = $("#score");
    var car_img = $("#car-image");
    var car_img_container = $("#game_container_header");

    //initial setup
    var car_height = parseInt(car.height());
    var car_width = parseInt(car.width());

    var container_height = parseInt(container.height());
    var container_width = parseInt(container.width());

    var container_left = parseInt(container.css('left'));


    // other variable
    var game_over = false;
    var score_counter = 1;
    var speed = 2;
    var line_speed = 5;

    var move_right = false;
    var move_left = false;
    var move_up = false;
    var move_down = false;

    $(document).on('keydown',function(e){
        if(game_over === false){
            var key = e.keyCode;
            if(key === 37 && move_left === false){
                move_left = requestAnimationFrame(left);
            }
            else if(key === 39 && move_right === false){
                move_right = requestAnimationFrame(right);
            }
            else if(key === 38 && move_up === false){
                move_up = requestAnimationFrame(up);
            }
            else if(key === 40 && move_down === false){
                move_down = requestAnimationFrame(down);
            }
        }
    });

    $(document).on('keyup',function(e){
        if(game_over === false){
            var key = e.keyCode;
            if(key === 37){
                cancelAnimationFrame(move_left);
                move_left = false;
            }
            else if(key === 39){
                cancelAnimationFrame(move_right);
                move_right = false;
            }            
            else if(key === 38){
                cancelAnimationFrame(move_up);
                move_up = false;
            }
            else if(key === 40){
                cancelAnimationFrame(move_down);
                move_down = false;
            }
            
        }
    });

    function left(){
        if(game_over === false && parseInt(car.css('left'))>0){
            car.css('left',parseInt(car.css('left'))-5);
            move_left = requestAnimationFrame(left);
        }
    }
    function right(){
        if(game_over === false && parseInt(car.css('left'))< container_width-car_width){
            car.css('left',parseInt(car.css('left'))+5);
            move_right = requestAnimationFrame(right);
        }
    }
    function up(){

        if(game_over === false && parseInt(car.css('top'))>0){
            car.css('top',parseInt(car.css('top'))-5);
            move_up = requestAnimationFrame(up);
        }
    }
    function down(){

        if(game_over === false && parseInt(car.css('top'))<container_height-car_height){
            car.css('top',parseInt(car.css('top'))+5);
            move_down = requestAnimationFrame(down);
        }
    }

    anim_id = requestAnimationFrame(repeat);

    function repeat(){
        if(game_over === false){

            if(collision(car,opp_car_1) || collision(car,opp_car_2)|| collision(car,opp_car_3)){
                stop_the_game();
            }

            score_counter++;
            if(score_counter%20 == 0){
                score.text(parseInt(score.text())+1);
            }
            if(score_counter%500 === 0){
                speed++;
                line_speed++;
            }

            car_down(opp_car_1);
            car_down(opp_car_2);
            car_down(opp_car_3);

            lane_down(lane_1);
            lane_down(lane_2);
            lane_down(lane_3);

            anim_id = requestAnimationFrame(repeat);
        }
    }

    function car_down(opp_car){
        var current_top = parseInt(opp_car.css('top'));
        if(current_top> container_height){
            current_top = -200;
            var car_left = parseInt(Math.random() * (container_width -car_width));
            opp_car.css('left',car_left);
        }
        opp_car.css('top',current_top+speed);
    }

    function lane_down(lane){
        var lane_current_top = parseInt(lane.css('top'));
        if(lane_current_top > container_height){
            lane_current_top = -300;
        }
        lane.css('top',lane_current_top+line_speed);
    }

    function stop_the_game(){
        game_over = true;
        cancelAnimationFrame(anim_id);
        cancelAnimationFrame(move_left);
        cancelAnimationFrame(move_right);
        cancelAnimationFrame(move_up);
        cancelAnimationFrame(move_down);
        
        restart_game_div.slideDown();
        restart_btn.focus();
    }

    restart_btn.click(function(){
        location.reload();
    });

    function collision($div1,$div2){
        var x1 = $div1.offset().left;
        var y1 = $div1.offset().top;

        var h1 = $div1.outerHeight(true);
        var w1 = $div1.outerWidth(true);

        var r1= x1 + w1;
        var b1 = y1 + h1;

        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;

        var h2 = $div2.outerHeight(true);
        var w2 = $div2.outerWidth(true);

        var r2= x2 + w2;
        var b2 = y2 + h2;

        if(b1<y2 || y1>b2 || r1<x2 || x1>r2)return false;
        return true;

    }

    requestAnimationFrame(movingCar);

    function movingCar(){

        if(parseInt(car_img.css("left"))=== 286){
            car_img.css("left",486);
        }
        car_img.css("left",parseInt(car_img.css("left"))-1);
        requestAnimationFrame(movingCar);

    }

});