

var points=0;
var miss=0;
var round=0;
var bullets=20;
var higthscore=50000;
var life=80;

var characterInterval;
var currentChar;
var items=[
			{points:15, top:20, left:38},
			{points:20, top:115, left:38},
			{points:10, top:110, left:240},
			{points:0, top:110, left:416},
			{points:0, top:15, left:416},
			{points:0, top:15, left:632},
			{points:0, top:97, left:632}
			];
			


function getRandom(min, max){
	return Math.round(Math.random() * (max-min)+ min);
}

function bulletControl(){
	$('#'+bullets).hide();
	bullets--;
	console.log(bullets+"bullte");
	if (bullets==0) {
		//code
		console.log("termino");
		$('#game-over').show();
	}
}

function missControl(){
	miss++;
	$('.miss').text(miss);
	
}

function lifeControl(){
	$('#'+life).hide();
	life=life-10;
	console.log(life+"life");
	if (life==0) {
		//code
		
		$('#game-over').show();
	}
}



		
			function setCharacter(i)
			{
				var randomChar=getRandom(1,7);
				console.log(randomChar);
			$('#box'+i).addClass('char'+randomChar).sprite({
			fps:12,
			no_of_frames:8,
			on_last_frame: function(obj){
				obj.spStop();
				$(obj).removeClass();
				$(obj).addClass('box');
				obj.destroy();
			},
			on_frame:{
				2: function(obj){
					$(obj).attr('frame', '3');
					obj.spStop();
					setTimeout(function(){
						var status=$(obj).attr('shoot');
						
						console.log("bang!");
						if(randomChar<4 && status!="false"){
							$('#bang').css('marginTop',items[i].top+'px');
							$('#bang').css('marginLeft',items[i].left+'px');
							$('#bang').show();
							lifeControl();
							setTimeout(function(){
								obj.spToggle();
								$('#bang').fadeOut();
							}, 800);
						}else{
							setTimeout(function(){
								obj.spToggle();
							},800);
						}
					}, 2000);
				}
			}
		}).on("click",function(event) {
			
			event.stopPropagation();
			$(this).off('click');
	
			/* Act on the event */
			var fr=$(this).attr('frame');
		//	console.lof(fr);
		points+=items[i].points;
			$('.score').text(points);
			if(fr=="3"){
				$(this).spToggle();
				$(this).attr('shoot', 'false');
			}

			

		});
		
			}

function showCharacter() {
	//code
	var temp=getRandom(1,7);
	while (temp==currentChar) {
		//code
		temp=getRandom(1,7);
	}
	currentChar=temp;
	setCharacter(currentChar);
}

$(document).ready(function(){
	
	for (var i=0;i<5;i++) {
		//code
	}
	amplify.store( "storeExample1", { foo: "bar" } );
	$('#game-over').hide();
	$('#nickname').hide();
	$('#bang').hide();
	$('#highscore').hide();
	setCharacter(getRandom(1,7));
	$('.miss').text(miss);
	$('.top').text(higthscore);
	characterInterval=setInterval(showCharacter,2000);
	
	$('#city').click(function() {
		/* Act on the event */
		console.log('click city');
		bulletControl();
	});
	
	$('#show-hs').click(function(){
		$('#highscore').show();	
	});
	
	$('#highscore .close').click(function(){
		$('#highscore').hide();	
	});
	
	$('#nickname .close').click(function(){
		$('#nickname').hide();	
	});
});