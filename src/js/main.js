(function(){
"use strict"


const constraints = {
    audio: true, // mandatory.
    video: true
};
function init(){
    var video =   document.getElementById("video");
    var media = navigator.getUserMedia(constraints, successCallBack, errorCallBack);
    video.setAttribute("height","300px");
    video.setAttribute("weight","300px");
    document.getElementById("play").addEventListener("click",function(){
       if(video.isConnected && video.paused) {
            video.play();
       }
       
    },false)
    
    document.getElementById("pause").addEventListener("click",function(){
        if(video.isConnected && !video.paused){
            video.pause();
        }
        
    },false)

    function successCallBack(stream){
        video.srcObject = stream;
   
     }
          
     
     function errorCallBack(){
         alert("Unable to stream data");
     }
     
    
}

document.addEventListener("DOMContentLoaded", init);
})();