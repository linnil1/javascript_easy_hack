// ==UserScript==
// @name		get test answer
// @name:zh		看答案作弊工具
// @namespace	linnil1
// @grant		GM_getValue
// @grant		GM_setValue
// @grant		unsafeWindow
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @description get answer with my greasemonkey        
// @include		http://www.arealme.com/*
// @exclude		
// ==/UserScript==

alert("You use something hack!!");// this use for debug

//add color
var Mystyle = document.createElement('style');
Mystyle.innerHTML = 
"#myBtn:hover,#myBtn:disabled{background-color:#006600;color:red ;font-size:20px;}"+
"#myBtn      {background-color:#66ff66;color:blue;font-size:15px}"+
"#alwBtn {background-color:#027446;color:#027446;position:fixed;left:0;top:0;border-style: hidden;}"+
".WAcolor,.ACcolor{font-size:30px;position:absolute ;right: 102%;}"+
".WAcolor{color:#cc0000;}"+
".ACcolor{color:#113311;}";
document.head.appendChild(Mystyle);


var precounter=0,AlwaysShow=0;

// get click 
$(document).ready(function(){
// i don't know why it can't run QQ
//	$("#myBtn").click( function(){
//		alert("show me answer >/////< ");
//	});
	
	$(document).click( function(){
//		alert("click & click");
		var syncounter = unsafeWindow.counter ;
//		GM_getValue("counter");
		if( isFocus(syncounter) && precounter!=syncounter){
			var mylist = readList(syncounter);
			createBtn(mylist);
			precounter = syncounter;
		}
	});
	
	//init
	console.log('thats hack');//i don't why it call twice
	precounter=AlwaysShow=0;
	var alwBtn = document.createElement("button"); // always see the answer
	alwBtn.appendChild( document.createTextNode("Show Answer") );
	alwBtn.setAttribute("id","alwBtn");
	alwBtn.setAttribute("class","sumome-share-client-animated sumome-share-client-share");
	alwBtn.addEventListener("click",function(){
//		LOCK_TIME=0;//it doesn't work ?
//		GM_setValue("LOCK_TIME",0);
		unsafeWindow.LOCK_TIME=0;
		AlwaysShow=1;
		alert('Do not use something crazyXD');
		this.disabled=true;
	});
	document.body.appendChild(alwBtn);

});

function isFocus(num){
	return document.getElementById("q"+num).style.display == "list-item";
};

function readList(num){
	return document.getElementById("q"+num).firstChild.childNodes;
}

function createBtn(mylist){
	var myBtn = document.createElement("button");
	myBtn.appendChild( document.createTextNode("Show Answer") );
	myBtn.setAttribute("id","myBtn");
	
	myBtn.addEventListener("click",function(){
			createAns(mylist);
			this.disabled=true;

//		alert("show me answer >/////< ");
	});
	
	mylist[0].appendChild(myBtn);
	if(AlwaysShow && myBtn.disabled==false){
		LOCK_TIME=0;//so i put it here ? however it doesn't work
		createAns(mylist);
		myBtn.disabled=true;
	}
}

function findBest(mylist){
	var num=0,themax=0;
	for(var i=1;i<mylist.length;++i){
		var value = mylist[i].getAttribute("value");
		if(value  != "0" )
			if(themax==0||Number(themax) < Number(value) )
				num=i;
				themax = value;
			}
	//i think most problem can be solved only by using number comparsion
	return num;
}

			
function createAns(mylist){
	var num = findBest(mylist);

	for(var i=1;i<mylist.length;++i)
		if(i!=num) //wrong answer
		{
			var wa = document.createElement("div");
			wa.appendChild( document.createTextNode("✖"));
			wa.setAttribute("class","WAcolor");
			mylist[i].style = "background-color:#ffcccc" ;
			mylist[i].insertBefore(wa,mylist[i].firstChild);
		}
		else
		{
			var ac = document.createElement("div");
			ac.appendChild( document.createTextNode("∨"));
			ac.setAttribute("class","ACcolor");
			mylist[i].style = "background-color:#aaff77" ;
			mylist[i].insertBefore(ac,mylist[i].firstChild);
		}
}
