flag=false;
$(document).ready(function(){ 
  $("#textEditor").focus();
  //on-click of bold button make the content bols/unbold
   //on bold click check if bold is already selected or not
  $("#bold").click(function(){
    if($(this).hasClass("selected")){
    $(this).removeClass("selected");   
    }else{
    $(this).addClass("selected");   
    }
    boldIt();
  });
  //End of on click bold 
   //shows the custom tag
  $("#show-custom").click(function(){      
    htmltoBBcode();    
  });
  //shows the html
  $("#show-html").click(function(){      
   $("#hidden").html($('#textEditor').html());
        $('#hidden b').each(function () {
            $(this).text(function () {
                return $(this).text().replace(/\s+/g, ' ').trim();
            }).before(' ').after(' ');
             var b=$("#hidden b").html();
             if(b.replace(/\s|&nbsp;/g, '').length == 0){ 
                    $(this).remove();
                }
        });
         var html=$("#hidden").html();
        html=html.replace(/\<strong\>/,'<b>');
        html=html.replace(/\<\/strong\>/,'</b>');
        html=html.replace(/\<br\>/,'');
        $("#hidden").html(html);
        $("#final-html").text($("#hidden").html().replace(/&nbsp;/gi, ''));
        
  });
  //clears the texteditor,html output and final output
  $("#clear").click(function(){  
    $("#custom-tag").empty();
    $("#final-html").empty();
    $("#textEditor").empty();
    $("#bold").removeClass("selected");
  });
   $("#textEditor").on("mouseup keyup",function(){
        if(document.queryCommandState('Bold')){
      $("#bold").addClass("selected");
      }
      else
      {
      $("#bold").removeClass("selected");
      }
  });
   $(document).keydown(function(e) {  
    if (e.keyCode == 66 && e.ctrlKey) { 
      e.preventDefault();
     $("#textEditor").focus();    
               boldIt();
          } 
          else if(e.keyCode===9){
           e.preventDefault();  // this will prevent us from tabbing out of the editor

        // now insert four non-breaking spaces for the tab key
        var editor = document.getElementById("textEditor");
        var doc = editor.ownerDocument.defaultView;
        var sel = doc.getSelection();
        var range = sel.getRangeAt(0);

        var tabNode = document.createTextNode("\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0");
        range.insertNode(tabNode);

        range.setStartAfter(tabNode);
        range.setEndAfter(tabNode); 
        sel.removeAllRanges();
        sel.addRange(range);
    }
    
  });
});
//wraps the text in bold
function boldIt(){
  var edit = document.getElementById("textEditor");
  edit.focus();
  document.execCommand("bold", false, "");
}
//converts the html code to custom tags
function htmltoBBcode() {
  $("#hidden").html($('#textEditor').html());
        $('#hidden b').each(function () {
            $(this).text(function () {
                return $(this).text().replace(/\s+/g, '').trim();
            }).before('').after('');
            var b=$("#hidden b").html();
            if(b.replace(/\s|&nbsp;/g, '').length == 0){ 
                    $(this).remove();
                }
        });
  var html=$("#hidden").html();
  html=html.replace(/\<strong\>/,'<b>');
  html=html.replace(/\<\/strong\>/,'</b>');
   html=html.replace(/\<br\>/,'');
  html = html.replace(/&nbsp;/g, '');
  html = html.replace(/\</gi, '[');
  html = html.replace(/\>/gi, ']');  
  $("#custom-tag").text(html);    
}

