$(document).ready(function() {
     callme();
     scrollMessedup();	

 });


function callme(){

	   $("#later").on("click",function(){
        	alert("on click me");
        });
}

function scrollMessedup(){

 $(window).scroll(function(){
     	if ($(window).scrollTop() >= 200) {
     		console.log("Scroll is greater than 200")
     	}
       console.log(22);  
    });

}



