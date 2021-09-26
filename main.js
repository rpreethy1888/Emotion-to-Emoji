
Prediction_1 = "";
Prediction_2 = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'jpeg',
    jpeg_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera')

function Take_Snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("snapshot").innerHTML = '<img id="captured_image" src="' + data_uri + '">'
    })
}

console.log("ml5 version:", ml5.version)

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/fOV6oic4G/model.json", modelLoaded)

function modelLoaded() {
    console.log("model loaded!")
}

function Speak() {
    var synth = window.speechSynthesis;
    speak_data1 = "The First Prediction Is " + Prediction_1;
    speak_data2 = "and The Second Prediction Is " + Prediction_2;
    utterthis = new SpeechSynthesisUtterance(speak_data1 + speak_data2)
    synth.speak(utterthis)
}


function Check() {
    img=document.getElementById("captured_image")
    classifier.classify(img,Got_Result);

}

function Got_Result(error,results) {
    if(error){
        console.log(error)
    }else{
        console.log(results);
        Prediction_1=results[0].label;
        Prediction_2=results[1].label;
        Speak()
    }
    if(Prediction_1=="Happy"){
        document.getElementById("updateEmoji").innerHTML="&#128522";
    }
    if(Prediction_1=="Sad"){
        document.getElementById("updateEmoji").innerHTML="&#128532";
    }

    if(Prediction_1=="Angry"){
        document.getElementById("updateEmoji").innerHTML="&#128545";
    }

    if(Prediction_1=="Scared"){
        document.getElementById("updateEmoji").innerHTML="😱";
    }


    if(Prediction_2=="Happy"){
        document.getElementById("updateEmoji2").innerHTML="&#128522";
    }
    if(Prediction_2=="Sad"){
        document.getElementById("updateEmoji2").innerHTML="&#128532";
    }

    if(Prediction_2=="Angry"){
        document.getElementById("updateEmoji2").innerHTML="&#128545";
    }

    if(Prediction_2=="Scared"){
        document.getElementById("updateEmoji2").innerHTML="😱";
    }
    

}