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
"#alwBtn {position:fixed;left:0;top:0;border-style: hidden;}"+
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
	alwBtn.style.backgroundColor = //hide in the title background
	alwBtn.style.color = $("h1").css("background-color");
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
	var num=[],themax=0,themin=2147483647;
	var nantest=0;
	for(var i=1;i<mylist.length;++i){
		var value = mylist[i].getAttribute("value");
		if(isNaN( Number(value) ) ){
			++nantest;
			continue;
		}
		if(         themax==0||Number(themax) < Number(value) )
			themax = value;
		if(themin==2147483647||Number(themin) >  Number(value) )
			themin = value;
	}
	if(nantest==mylist.length - 1)
		return undefined;
	for(var i=1;i<mylist.length;++i)
		if(      mylist[i].getAttribute("value")==themax )
			num[i]=1;
		else if( mylist[i].getAttribute("value")==themin )
			num[i]=-1;
		else
			num[i]=0;
	//i think most problem can be solved only by using number comparsion
	return num;
}

			
function createAns(mylist){
	var num = findBest(mylist);
	if(num==undefined)//strange value
	{
		alert("I don't know");
		return ;
	}

	for(var i=1;i<mylist.length;++i)
		if(num[i]!=1) //wrong answer
		{
			var wa = document.createElement("div");
			wa.appendChild( document.createTextNode("✖"));
			wa.setAttribute("class","WAcolor");
			if( num[i]==-1 )
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
