Webcam.set({
    width:300,
    height:300,
    image_format:'png',
    png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach('#camera');
function photo(){
Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML='<img id="selfie" src="'+data_uri+'">';
});
}
console.log('ml5.version',ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/qNojN8TlA/model.json',model_loaded);
function model_loaded(){
    console.log("model loaded");
}
Prediction1="";
Prediction2="";
function speak(){
    var synth=window.speechSynthesis;
    speak1="Prediction 1"+Prediction1;
    speak2="Prediction 2"+Prediction2;
    var utterthis=new SpeechSynthesisUtterance(speak1+speak2);
    synth.speak(utterthis);
}
function check(){
    image=document.getElementById("selfie");
    classifier.classify(img,gotresult);
}
function gotresult(result,error){
if(error){
    console.error(error);
} else{
    console.log(result);
    document.getElementById("result_emotion_name").innerHTML=result[0].label;
    document.getElementById("result_emotion_name_2").innerHTML=result[0].label;
    Prediction1=result[0].label;
    Prediction2=result[0].label;
    speak();
    if(result[0].label=="happy"){
        document.getElementById("update_emoji").innerHTML="&#128522;";
    }
    if(result[0].label=="sad"){
        document.getElementById("update_emoji").innerHTML="&#128532;";
    }
    if(result[0].label=="angry"){
        document.getElementById("update_emoji").innerHTML="&#128548;";
    }
    if(result[1].label=="happy"){
        document.getElementById("update_emoji_2").innerHTML="&#128522;";
    }
    if(result[1].label=="sad"){
        document.getElementById("update_emoji_2").innerHTML="&#128532;";
    }
    if(result[1].label=="angry"){
        document.getElementById("update_emoji_2").innerHTML="&#128548;";
    }
}
}