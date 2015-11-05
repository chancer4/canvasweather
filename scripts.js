$(document).ready(function($){

	

	$('#weather-search').submit(function(){
		event.preventDefault();
		var input = $('#input-text').val();
		$('#input-text').val('');
	

	// var weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q="+input+"&units=imperial&APPID=8f0750468ce6e555f4d50d5ba536f321";
	var dailyForcastUrl = "http://api.openweathermap.org/data/2.5/forecast/daily?q="+input+"&units=imperial&appid=8f0750468ce6e555f4d50d5ba536f321";					
	console.log(dailyForcastUrl);

	$.getJSON(dailyForcastUrl, function(weatherData){
		console.log(weatherData);
		var cityName = weatherData.city.name;
		var currentTemp = weatherData.list[0].temp.day;
		var tomTemp = weatherData.list[1].temp.day;
		


	
	var canvasCurrent = $('#weather-canvas');
	var context = canvasCurrent[0].getContext('2d');

	// context.beginPath();
	// context.moveTo(0,0);
	// context.arcTo(200,0,200,200,50);
	// context.stroke();

	var lineWidth = 5;
	var outterRadius = 70;
	var innerRadius = outterRadius - lineWidth;
	var outOutterRadius = outterRadius + lineWidth;

	var currPerc = 0;
	var tomPerc = 0;
	var counterClock = false;
	var circ = Math.PI * 2;
	var quart = Math.PI / 2;
	
	function animate(current, tomorrow){

		var shadeColor;

		if(currentTemp < 32){
			shadeColor = '#D4F0FF';
		}else if((currentTemp >= 32) && (currentTemp < 59)){
			shadeColor = '#129793'; 
		}else if ((currentTemp >= 59) && (currentTemp < 75)){
			shadeColor = "#7cfc00";
		}else if((currentTemp >= 75) && (currentTemp < 90)){
			shadeColor = "#FF6600";
		}else{
			shadeColor = '#E3170D';
		}

		var tomShadeColor;

		if(tomTemp < 32){
			tomShadeColor = 'teal';
		}else if((tomTemp >= 32) && (tomTemp < 59)){
			tomShadeColor = 'gray'; 
		}else if ((tomTemp >= 59) && (tomTemp < 75)){
			tomShadeColor = "purple";
		}else if((tomTemp >= 75) && (tomTemp < 90)){
			tomShadeColor = "red";
		}else{
			tomShadeColor = 'purple';
		}

	// Fill with gradient



		context.fillStyle = "#ccc";
		context.beginPath();
		context.arc(155,75,innerRadius,0,2*Math.PI,true);
		context.closePath();
		context.fill();
		// context.strokeStyle = shadeColor;

		context.beginPath();
		context.arc(155,75,outterRadius,-(quart),((circ)*current-quart),false);
		context.strokeStyle = shadeColor;
		context.stroke();

		context.beginPath();
		context.arc(155,75,outOutterRadius,-(quart),((circ)*tomorrow-quart),true);
		// context.closePath();
		context.strokeStyle = tomShadeColor;
		context.stroke();

		context.font = "15px Georgia";
		context.fillStyle= shadeColor;
	    context.textBaseLine = "top";
		context.fillText("Today="+currentTemp,120,87);
		context.font = "20px Georgia";
		context.fillStyle= "Blue";
	    context.textBaseLine = "top";
		context.fillText(cityName,125,67);
		context.font = "15px Georgia";
		context.fillStyle= tomShadeColor;
	    context.textBaseLine = "top";
		context.fillText("Tomrrow="+tomTemp,105,97);
		currPerc++;
		if(currPerc < currentTemp){
			requestAnimationFrame(function(){
			animate(currPerc / 100, 0);

			});
		}
		tomPerc++;
		if(tomPerc < tomTemp){
			requestAnimationFrame(function(){
			animate(currentTemp,tomPerc / 100);
			});
		}
	}

	animate(0,0);
	context.closePath();
	});
});
});