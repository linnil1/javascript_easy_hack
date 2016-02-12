// ==UserScript==
	// @name		get test answer
	// @namespace	my123
	// @description get answer with my greasemonkey        
	// @include		http://www.arealme.com/*
	// @exclude		
// ==/UserScript==

alert(counter+","+iq_value);// this use for debug

//add color
var Mystyle = document.createElement('style');
Mystyle.innerHTML = 
"#myBtn:hover{background-color:#006600;color:red ;font-size:20px;cursor:pointer;}"+
"#myBtn      {background-color:#66ff66;color:blue;font-size:15px}"+
".WAcolor,.ACcolor{font-size:30px;position:absolute ;right: 102%;}"+
".WAcolor{color:#cc0000;}"+
".ACcolor{color:#113311;}";
document.head.appendChild(Mystyle);


//init
var precounter=0,ShowAns=0;

// get click 
$(document).ready(function(){
// i don't know why it can't run QQ
//	$("#myBtn").click( function(){
//		alert("show me answer >/////< ");
//	});
	
	$(document).click( function(){
//		alert("click & click");
		if( isFocus(counter) && precounter!=counter){
			var mylist = readList(counter);
			createBtn(mylist);
			precounter = counter;
			ShowAns=0;
		}
	});

});

function isFocus(num){
	return document.getElementById("q"+num).style.display == "list-item";
};

function readList(num){
	return document.getElementById("q"+num).firstChild.childNodes;
}

function createBtn(mylist){
	var myBtn = document.createElement("buttom");
	myBtn.appendChild( document.createTextNode("Show Answer") );
	myBtn.setAttribute("id","myBtn");
	myBtn.addEventListener("click",function(){
		if( ShowAns == 0 ){
			createAns(mylist);
			ShowAns=1;
		}
			
//		alert("show me answer >/////< ");
	});
	mylist[0].appendChild(myBtn);
}

function findBest(mylist){
	var num=0,themax=0;
	for(var i=1;i<mylist.length;++i)
		if( mylist[i] != "0" )
			if(themax==0||Number(themax) < Number(mylist[i])){
				num=i;
				themax = mylist[i];
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
			mylist[i].insertBefore(wa,mylist[i].firstChild);
		}
		else
		{
			var ac = document.createElement("div");
			ac.appendChild( document.createTextNode("∨"));
			ac.setAttribute("class","ACcolor");
			mylist[i].insertBefore(ac,mylist[i].firstChild);
		}
}
