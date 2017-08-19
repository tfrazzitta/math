$(document).ready(function(){Get();})

function Get(){
  $.ajax({
        method: "GET",
        url: '/hello'
      }).done(function(data) {
        $("h1").html(data+"'s Collection");

    $.ajax({
          method: "GET",
          url: '/saved'
        }).done(function(data) {

          if(data.length<4){
            $("#back").css("height","970px");
          }
           else{
            $("#back").css("height","auto");
          }
           DisplayItems(data);
        })
    })
}

function DisplayItems(data){
$("#data").empty();
console.log(data)
    
  for(i=0;i<data.length;i++){
    var panel = '<div class="panel-group text-center"><div class="panel panel-default"><div class="panel-heading">'
    var panelBody = '</div><div class="panel-body" id="p-body"><h3>'
    var panelEnd = '"target="_blank">Link</a></div><br>';
    var endTags = '<button class="btn-primary" id="del-btn" data-id="'
    +data[i]._id+'"  email="'+data[i].email+'">Delete</button></div></div>'
    $("#data").append(
        panel 
      + data[i].chapter+ panelBody+data[i].type+'</h3><h4>'+data[i].concept+'</h4><h5>'+ data[i].message
      + '</h5></div><hr><div><a href ="'+data[i].link
      + panelEnd+endTags);
    }

}

$(document).on("click","#del-btn",function(){
 var dataId=  $(this).attr("data-id");
 console.log(dataId)
    $.ajax({
        method: "POST",
        url: '/deleteOne/'+dataId,
      }).done(function(data) {
         DisplayItems(data);
      })
})



$(document).on("click","#deleteAll",function(){
  var answer=  $(".answer").val("");
  $("#modal-message").removeClass("alert alert-danger");
  $("#modal-message").html("Are you sure you want to delete all your files");
  $("#myModal").modal("toggle");

  $('#myModal2').on('show.bs.modal', function(e) {
    $(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));
});

    $.ajax({
        method: "POST",
        url: '/deleteAll/',
      }).done(function(data) {
         DisplayItems(data);
      })
})



