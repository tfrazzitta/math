
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
function DisplayItems(data){
$("#data").empty();
$("#data1").empty();
$("#mod-body").empty();
console.log(data)

  for(i=0;i<data.length;i++){
    var panel = '<div class="panel-group text-center"><div style="height:314px"; class="panel panel-default"><div class="panel-heading">';
    var panelBody = '</div><div class="panel-body" id="p-body"><h3>';
    var panelEnd = '"target="_blank">Link</a></div><hr>';
    var delHover= '<div class="middle" id="save-btn" data-id="'+data[i]._id+'"><div class="text">Save</div></div></div>';

      if(data[i].link[0]==="<"){
          var panelEnd = '"target="_blank">Videos</a></div><hr>';
          data[i].type="Videos";
          data[i].concept= data[i].chapter + " Videos <br><br>";
          $(".modal-header").html("Videos");
          $("#mod-body").append(data[i].link+ "<br><br><br><br>");
          $("#data").html(
          panel + data[i].chapter+ panelBody+data[i].type
          +'</h3><h4>'+data[i].concept+'</h4><h4>'
          + '</h4></div><div><a  data-target="#myModal2" data-toggle="modal" href =#myModal2"'+ panelEnd);
      }

      else{ 
        $("#data1").append(
          panel+ data[i].chapter+ panelBody+data[i].type
          +'</h3><h4>'+data[i].concept+'</h4><h5>'+ data[i].message
          + '</h5></div><div><a href ="'+data[i].link+ panelEnd+delHover);
      }
  }
}
/////////// END DISPLAY ITEMS//////


/////////// ONCLICK TYPE//////
$(document).on("click","#type",function(){
 var grade=  $(this).attr("value");
 var type=	 $("#type").val();
 console.log(grade)
 console.log(type)
	if(type==="Select By Type" || type===""){
	 	return false;
	}
	else{
 		$.ajax({
        method: "POST",
        url: '/type/'+type,
   		data:{
   		   	grade:grade
   		   }
      }).done(function(data) {
        if(data.length>3 || data[0].video!=""){
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
        $("#back").css("height","970px");
        $("#a").removeClass("col-lg-1")
        $("#b").removeClass("col-lg-10")
        $("#c").removeClass("col-lg-1")
        $("#a").addClass("col-lg-4")
        $("#b").addClass("col-lg-4")
        $("#c").addClass("col-lg-4")
        $("#topic").val("");
         DisplayItems(data);   
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
$(document).on("click","#save-btn",function(){
  var dataId= $(this).attr("data-id")
  console.log(dataId)
    $.ajax({
        method: "POST",
        url: '/saved/'+dataId,
    }).done(function(data) {
       console.log(data)
  })
})
///////////END SAVE AN ITEM//////



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



