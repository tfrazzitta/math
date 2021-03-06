function changeClasses(){
  var a = $("#a").attr("class");
  if(a==="col-lg-4"){
    $("#a").removeClass("col-lg-4")
    $("#b").removeClass("col-lg-4")
    $("#c").removeClass("col-lg-4")
    $("#a").addClass("col-lg-1")
    $("#b").addClass("col-lg-10")
    $("#c").addClass("col-lg-1")
  }
}


///if there is no data it spits out a generic error message panel display
function errorMessage(data){
var tag = $("#type").attr("tag")
var panel = '<div class="panel-group text-center"><div class="panel panel-default"><div class="panel-heading">';
var panelBody = '</div><div class="panel-body" id="p-body"><h3>';
var err ="<h4>There are currently no resources for this section.<br>Click on upload to add a resource</h4></div>"  
  if(data.length==0){
        $("#type").val(tag);
        $("#back").css("height","970px");
        $("#a").removeClass("col-lg-1")
        $("#b").removeClass("col-lg-10")
        $("#c").removeClass("col-lg-1")
        $("#a").addClass("col-lg-4")
        $("#b").addClass("col-lg-4")
        $("#c").addClass("col-lg-4")
        $("#data1").append(panel+ "Sorry!"+ panelBody+err)
  }
}



function AutoAPI(){
var grade= $("#type").attr("value");
$.ajax({
        method: "POST",
        url: '/input/'+grade,
        data:{
              grade:grade
             }
      }).done(function(data) {
        console.log(data)
        for(i=0;i<data.length;i++){
          $("#browsers").append('<option value="'+data[i].concept+'">')   
        }
      })
}



function Video(data){
$("#data1").empty();
$("#data").empty();
console.log(data)
errorMessage(data)
  for(i=0;i<data.length;i++){
    ///use delete for ADMINISTRATOR....append to data to delete
   //"<button id='video' data-id='"+data[i]._id+"'>Delete</button>"
    $("#data").append("<div data-id='"+data[i]._id+"'><h3 class='text-center'>"+data[i].link +"</div><br>")
  }
}




function DisplayItems(data,keepLocked){
var tag = $("#type").attr("tag")
$("#data").empty();
$("#data1").empty();
$("#mod-body").empty();

    if(keepLocked==1){
      $("#type").prop("disabled", true);
    }
    else{
      $("#type").prop("disabled", false);
    }

  errorMessage(data)

  for(i=0;i<data.length;i++){
    var panel = '<div class="panel-group text-center"><div style="height:314px"; class="panel panel-default"><div class="panel-heading">';
    var panelBody = '</div><div class="panel-body" id="p-body"><h3>';
    var panelEnd = '"target="_blank">Link</a></div><hr>';
    var delHover= '<div class="middle" id="save-btn" data-id="'+data[i]._id+'"><div class="text">Save</div></div></div>';
    var href='<br><br></h4><h4></h4></div><div><a href ="';
      if(data[i].link[0]==="<"){
          var panelEnd = '"target="_blank">Videos</a></div><hr>';
          data[i].type="Videos";
          data[i].concept= data[i].chapter + " Videos <br><br>";
          $(".modal-header").html("Videos");    
          $("#mod-body").append(data[i].link+ "<br><br><br><br>");
       
          $("#data").html(
          panel + data[i].chapter+ panelBody+data[i].type
          +'</h3><h4>'+data[i].concept+'</h4><h4>'
          + '</h4></div><div><a data-target="#myModal2" data-toggle="modal" href =#myModal2"'+ panelEnd);
      }

      else{ 
        // $("#data1").append(
        //   panel+ data[i].chapter+ panelBody+data[i].type
        //   +'</h3><h4>'+data[i].concept+'</h4><h5>'+ data[i].message
        //   + '</h5></div><div><a href ="'+data[i].link+ panelEnd+delHover);
        $("#data1").append(
          panel
          + data[i].chapter
          + panelBody
          + data[i].type
          +'</h3><h4>'+data[i].concept+href
          +data[i].link+ panelEnd+delHover);
      }
  }
}
/////////// END DISPLAY ITEMS//////



/////////// ONCLICK TYPE//////
$(document).on("click","#type",function(){
 var grade=  $(this).attr("value");
 var type=	 $("#type").val();
 var chapter= $("#chapter").val();
 console.log(grade)
 console.log(type)
	if(type==="Select within your Chapter" || type===""){
	 	return false;
	}
	else{
 		$.ajax({
        method: "POST",
        url: '/type/'+type,
   		data:{
   		   	grade:grade,
          chapter:chapter
   		   }
      }).done(function(data) {
        if(data.length>3){
          $("#back").css("height","auto");
        }
        else{
          $("#back").css("height","970px");
        }

        changeClasses();

        if(type==="Video"){
          $("#back").css("height","auto");
          Video(data)
        }
        else{
          DisplayItems(data);
        }
      })
	}
})



/////////// input TOPIC/////////
// $(document).on("click","#topic-button",function(){
//  var grade=  $(this).attr("value");
//  var topic=	 $("#topic").val();
//  var tag = $("#type").attr("tag")
//  var chapTag = $("#chapter").attr("tag")
//  console.log(grade)
//  console.log(topic)
// 	 	$.ajax({
//         method: "POST",
//         url: '/topic/'+topic,
//    		data:{
//    		   	grade:grade
//    		   }
//       }).done(function(data) {
//         var keepLocked=1;
//         $("#type").val(tag);
//         $("#chapter").val(chapTag);
//         $("#back").css("height","970px");
//         $("#a").removeClass("col-lg-1")
//         $("#b").removeClass("col-lg-10")
//         $("#c").removeClass("col-lg-1")
//         $("#a").addClass("col-lg-4")
//         $("#b").addClass("col-lg-4")
//         $("#c").addClass("col-lg-4")
//         $("#topic").val("");
//          DisplayItems(data,keepLocked);   
//       })
// })


///automatic input information
function onInput() {
    var val = document.getElementById("topic").value;
    var opts = document.getElementById('browsers').childNodes;
    for (var i = 0; i < opts.length; i++) {
      if (opts[i].value === val) {
       var grade=  $("#topic-button").attr("value");
       var topic=   opts[i].value
       var tag = $("#type").attr("tag")
       var chapTag = $("#chapter").attr("tag")
       console.log(grade)
       console.log(topic)
         $.ajax({
              method: "POST",
              url: '/topic/'+topic,
             data:{
                 grade:grade
                }
            }).done(function(data){
              var keepLocked=1;
              $("#type").val(tag);
              $("#chapter").val(chapTag);
              $("#back").css("height","970px");
              $("#a").removeClass("col-lg-1")
              $("#b").removeClass("col-lg-10")
              $("#c").removeClass("col-lg-1")
              $("#a").addClass("col-lg-4")
              $("#b").addClass("col-lg-4")
              $("#c").addClass("col-lg-4")
              $("#topic").val("");
              DisplayItems(data,keepLocked);  
            })
        break;
      }
    }
  }


///////////ONCLICK CHAPTER//////
$(document).on("click","#chapter",function(){
 var grade=  $(this).attr("value");
 var chapter= $("#chapter").val();
 var tag = $("#type").attr("tag")
 var chapTag = $("#chapter").attr("tag")
 console.log(grade)
 console.log(chapter)
 		if(chapter==="Select By Chapter" || chapter===""){
 			return false;
 		}
 		else{
	 	 	$.ajax({
	        method: "POST",
	        url: '/chapter/'+chapter,
	   		data:{
	   		   	grade:grade
	   		   }
	        }).done(function(data) {
            var x =chapter;
            $("#type").val(tag);
            
            if(data.length==0){
              var keepLocked=1;
              $("#chapter").val(chapTag);  
            }      
            if(data.length>3){
              console.log(data.length)
              $("#back").css("height","auto")
            }
            else{
              $("#back").css("height","970px") 
            }
             changeClasses();
	           DisplayItems(data,keepLocked);
	      	})	
     	}
})



///////////SAVE AN ITEM//////
var count =0;
$(document).on("click","#save-btn",function(){
  var dataId= $(this).attr("data-id")
  console.log(dataId)
  count++;
    if(count==1){
      $("#change-color").css("color", "red");
      setTimeout(function(){
        $("#change-color").css("color", "#777");
      }, 5000);
    }

    $.ajax({
          method: "POST",
          url: '/saved/'+dataId,
      }).done(function(data) {
         console.log(data)
    })
})




//=====MODAL SETTINGS====//

////STOPS VIDEO WHEN MODAL CLOSES
$(".modal-backdrop,#myModal2").on("click", function() {
  $("#myModal2 iframe").attr("src", $("#myModal2 iframe").attr("src"));
});

//DOES NOT PAUSE VIDEO WHEN CLICK WITHIN THE MODAL 
$("#myModal2 #mod-body").click(function(e) { e.stopPropagation(); });
$("#myModal2 .modal-footer").click(function(e) { e.stopPropagation(); });
$("#myModal2 .modal-header").click(function(e) { e.stopPropagation(); });

//=============================================//
//CLOSES UPLOAD MODAL WHEN CLICKING THE CONTAINER
$("#container-too-wide").on("click", function() {$('#myModal').modal('toggle');})
$("#container-too-wide .col-lg-6").click(function(e) { e.stopPropagation(); });
// $("#container-too-wide #form-type").click(function(e) { e.stopPropagation(); });
// $("#container-too-wide #form-chapter").click(function(e) { e.stopPropagation(); });
// $("#container-too-wide #form-topic").click(function(e) { e.stopPropagation(); });
// $("#container-too-wide #form-link ").click(function(e) { e.stopPropagation(); });
// $("#container-too-wide #contact-form ").click(function(e) { e.stopPropagation(); });
// $("#container-too-wide #comment").click(function(e) { e.stopPropagation(); });

//=====MODAL SETTINGS====//

AutoAPI();

///=========TESTING LEAVE ALONE==========///////////

///////DELETE A VIDEO ONLY FOR TESTS//////
// $(document).on("click","#video",function(){
//  var dataId=  $(this).attr("data-id");
//  console.log(dataId)
//     $.ajax({
//         method: "POST",
//         url: '/videoDel/'+dataId,
//       }).done(function(data) {
//          DisplayItems(data);
//       })
// })



/////=========END TESTING LEAVE ALONE==========///////////
