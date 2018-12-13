(function(){
"use strict"


const constraints = {
    audio: true, // mandatory.
    video: true
};
var recorderChunk = [];
function recordMedia(stream){
    var video =   document.getElementById("video");
    video.srcObject = stream;
    var recorder = null;
    try{
        recorder = new MediaRecorder(stream, {mimetype:"video/webm"});
    }catch(e){
        console.log('fail to record media');
        return;
    }

    recorder.ondataavailable=(event) =>{
       // console.log("Recording the video of chunk size :: "+event.data.size;
        recorderChunk.push(event.data);
    }

    
    recorder.start(100);

}

function init(){
    var video =   document.getElementById("video");
    navigator.mediaDevices.getUserMedia(constraints, successCallBack, errorCallBack).then(recordMedia);
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
            console.log(recorderChunk);
        }
        
    },false)

    function successCallBack(stream){
        video.srcObject = stream;
   
     }
          
     
     function errorCallBack(){
         alert("Unable to stream data");
     }

     function downloadEventHandler(event){
         var blob = new Blob(recorderChunk,{type:'video/webm'});
         var url = window.URL.createObjectURL(blob);
         this.href=url;
         this.target="_blank";
         this.download = "recorded.webm";

     }

     document.getElementById("download").addEventListener('click',downloadEventHandler, false);
     
    
}

document.addEventListener("DOMContentLoaded", init);
})();