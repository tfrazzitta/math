var tag = $("#type").attr("tag")
var chapTag = $("#chapter").attr("tag")

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
///////////DISPLAY VIDEO//////
function Video(data){
  $("#data1").empty();
  $("#data").empty();
  console.log(data)
  for(i=0;i<data.length;i++){
    //+data[i].concept+"</h3>" 
    ///use var delete for ADMINISTRATOR....append to data to delete
   //"<button id='video' data-id='"+data[i]._id+"'>Delete</button>"
    $("#data").append("<div><h3 class='text-center'>"+data[i].link +"</div><br>")
  }
}
/////////// END DISPLAY VIDEO//////

///////////DISPLAY ITEMS//////
function DisplayItems(data,keepLocked){
$("#data").empty();
$("#data1").empty();
$("#mod-body").empty();

    if(keepLocked==1){
      $("#type").prop("disabled", true);
    }
    else{
      $("#type").prop("disabled", false);
    }
var panel = '<div class="panel-group text-center"><div class="panel panel-default"><div class="panel-heading">';
var panelBody = '</div><div class="panel-body" id="p-body"><h3>';
var err ="<h4>There are currently no resources for this section.<br>Click on upload to add a resource</h4></div>"  
  if(data.length==0){
        $("#type").val(tag);
        // $("#chapter").val(chapTag);  
        // $("#type").prop("disabled", true);
        $("#back").css("height","970px");
        $("#a").removeClass("col-lg-1")
        $("#b").removeClass("col-lg-10")
        $("#c").removeClass("col-lg-1")
        $("#a").addClass("col-lg-4")
        $("#b").addClass("col-lg-4")
        $("#c").addClass("col-lg-4")
        $("#data1").append(panel+ "Chapter"+ panelBody+err)
  }

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
/////////// END ONCLICK TYPE//////


/////////// input TOPIC/////////
$(document).on("click","#topic-button",function(){
 var grade=  $(this).attr("value");
 var topic=	 $("#topic").val();
 console.log(grade)
 console.log(topic)
	 	$.ajax({
        method: "POST",
        url: '/topic/'+topic,
   		data:{
   		   	grade:grade
   		   }
      }).done(function(data) {
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
})
/////////// END input TOPIC//////

///////////ONCLICK CHAPTER//////
$(document).on("click","#chapter",function(){
 var grade=  $(this).attr("value");
 var chapter= $("#chapter").val();
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
            $("#type").val(tag);      
            if(data.length>3){
              console.log(data.length)
              $("#back").css("height","auto")
            }
            else{
              $("#back").css("height","970px") 
            }
             changeClasses();
	           DisplayItems(data);
	      	})	
     	}
})
/////////// END ONCLICK CHAPTER//////


///////////SAVE AN ITEM//////
var count =0;
$(document).on("click","#save-btn",function(){
  var dataId= $(this).attr("data-id")
  console.log(dataId)
  count++;
    if(count==1){
        $("#change-color").css("color","red") 
    }
    else{
      $("#change-color").css("color","#777")
    }
    $.ajax({
          method: "POST",
          url: '/saved/'+dataId,
      }).done(function(data) {
         console.log(data)
    })
})
///////////END SAVE AN ITEM//////



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

$("#container-too-wide #form-type").click(function(e) { e.stopPropagation(); });

$("#container-too-wide #form-chapter").click(function(e) { e.stopPropagation(); });

$("#container-too-wide #form-topic").click(function(e) { e.stopPropagation(); });

$("#container-too-wide #form-link ").click(function(e) { e.stopPropagation(); });

$("#container-too-wide #contact-form ").click(function(e) { e.stopPropagation(); });

$("#container-too-wide #comment").click(function(e) { e.stopPropagation(); });

$("#container-too-wide .col-lg-6").click(function(e) { e.stopPropagation(); });
//=====MODAL SETTINGS====//

AutoAPI();

///=========TESTING LEAVE ALONE==========///////////

/////////DELETE A VIDEO ONLY FOR TESTS//////
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



// http://www.trmath.com/auth/google/callback