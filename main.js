Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach("#camera");

function takeSnapshot() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id = 'capturedImage' src = '" + data_uri + "'>"
    });
}

console.log("ml5 version:", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/fm7iwWr2A/model.json", modelLoaded);

function modelLoaded() {
    console.log("Model has been loaded!")
}

function speak() {
    var synth = window.speechSynthesis;

    speak_data_1 = "The prediction is " + prediction_1;

    var utterThis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}

function startPrediction() {
    img = document.getElementById("capturedImage");
    classifier.classify(img, gotResults);
}

function gotResults(error, results) {
    if (error) {
        console.error(error)
    } else {
        console.log(results);

        document.getElementById("prediction").innerHTML = results[0].label;

        prediction_1 = results[0].label;

        speak()

        if (results[0].label == "Peace") {
            document.getElementById("emojiIMAGE").innerHTML = "&#128076;";

        } else if (results[0].label == "Thumbs up") {
            document.getElementById("emojiIMAGE").innerHTML = "&#128077;";

        } else if (results[0].label == "Thumbs down") {
            document.getElementById("emojiIMAGE").innerHTML = "&#128078;";

        } else if (results[0].label == "Rocking") {
            document.getElementById("emojiIMAGE").innerHTML = "&#129304;";
        }
    }
}