
$("#link2").hide();
$("#change2").hide();
$("#change").hide();
$("#link-input2").val("undefined");
$("#char-1").hide();

function addLink(){
	$("#link2").show();
	$("#link-input2").val("")
	$("#del-link").hide();
}

$(document).on("click",".upload",function(){
 var grade=  $(this).attr("name");
 console.log(grade)
 	$("#modal-message").removeClass("alert alert-danger");
   	$("#modal-message").html("");
	$("#link2").hide();
	$("#link2").val(undefined)
	$("#grade").val(grade)
	$("#myModal").modal("toggle");    
})


$('form').submit(function(event) {
event.preventDefault();
$("#modal-message").removeClass("alert alert-danger");
$("#modal-message").html("");
var type=$("#form-type").val();
var chapter=$("#form-chapter").val();
var topic=$("#form-topic").val();
var link=$("#form-link").val();
console.log(topic.length)	

	 if(topic.length>33){
	 	$("#char-1").html("Please shorten the description of your topic");
	 	$("#char-1").show();
	 	return false;
	 }

    if(type===""||chapter===""||topic===""||link===""){
       $("#modal-message").addClass("alert alert-danger");
   	   $("#modal-message").html("Please Submit all Requirements");
   	   return false;
    }
    else{
		$("#modal-message").addClass("alert alert-success");
		$("#modal-message").append("<h3> Success<img id='appen-img' src='css/img/green.png'/></h3>");
	    var form = this;
	    setTimeout( function () { 
	        form.submit();
	    }, 2000);

	}

}); 

