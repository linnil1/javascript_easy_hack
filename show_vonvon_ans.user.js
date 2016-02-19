// ==UserScript==
// @name		get vonvon test answer
// @name:zh		看答案作弊工具1
// @namespace	linnil1
// @author 		linnil1
// @grant		GM_getValue
// @grant		GM_setValue
// @grant		unsafeWindow
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @description get answer with my greasemonkey        
// @include		http://tw.vonvon.me/mequiz/*
// @exclude		
// ==/UserScript==

//alert("You use something hack!!");// this use for debug


var counter=0,AlwaysShow=0;
var angscope;

function creatalwBtn(){
	//always show button
	var $alwBtn= 
		$('<input type="button" id="alwBtn" value="Show Answer" />');
		
	var hideColor = $("#header").css("background-color");
	$alwBtn.css("background-color",hideColor);
	$alwBtn.css("color",hideColor);
	
	$alwBtn.click( function(){ 
		alert("Don't use something bad!! XDDD");
		AlwaysShow=1;
		$("#myBtn").click();
	});
	
	$alwBtn.prependTo("#header");
}


window.addEventListener ("load", mymain, false);
function mymain(){
	if (window.top != window.self)
		return ;

	//add color
	var Mystyle = document.createElement('style');
	Mystyle.innerHTML = 
	"#myBtn:hover,#myBtn:disabled{background-color:#006600;color:red ;font-size:20px;}"+
	"#myBtn      {background-color:#66ff66;color:blue;font-size:15px}"+
	"#alwBtn {position:absolute;left:0;top:0;border-style: hidden;}";
	document.head.appendChild(Mystyle);

	
	//init
	console.log('thats hack');
	counter=AlwaysShow=0;

	setInterval( function(){
		if(counter==0){
	    	if($(".current").length == 0)// game not start yet
				return; 
			else{
				angscope = unsafeWindow.angular.element(".answers").scope() ;
				counter=0.5;
				creatalwBtn();
			}
		}
		if( questionChange() ){
			counter = angscope.questionNo;
			putAnsBtn();
			if(AlwaysShow){
				$("#myBtn").click();
				$("#choice_"+showAns()).click();
			}
		}
	},300);

};


function questionChange(){
	return ( counter < angscope.questionNo);
}

function putAnsBtn(){
	var $myBtn= 
		$('<input type="button" id="myBtn" value="Show Answer" />');
	$myBtn.click( function(){
		showAns();
		$(this).prop("disabled",true);
	});
    $myBtn.appendTo($(".question"));
}

function showAns(){
	var cho = angscope.questions[angscope.questionNo].choiceMappings;
	var i;
	for( i in cho )
		if(cho[i])
			break;
	$("#choice_"+i).addClass("correct");
	return i;
}
