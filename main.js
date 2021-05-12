leftWristX=0
leftWristY=0
rightWristX=0
rightWristY=0
song1status=''
song2status=''
song1=""
song2=""
leftwristscore=0
rightwristscore=0
function preload(){
song1=loadSound("song1.mp3")
song2=loadSound("song2.mp3")
}
function setup(){
canvas=createCanvas(500,500)
canvas.center()
video=createCapture(VIDEO)
video.hide()
video.size(500,500)
poseNet=ml5.poseNet(video,model_loaded)
poseNet.on("pose",gotPoses)
}
function draw(){
    image(video,0,0,600,500)
    song1status=song1.isPlaying()
    song2status=song2.isPlaying()
    fill("red")
    stroke("black")
    if (rightwristscore>0.2) {
        circle(rightWristX,rightWristY,20)
        song1.stop()
        if (song2status==false) {
            song2.play()
            document.getElementById("song").innerHTML="Song-2 Is Playing"
        }
    }
    if (leftwristscore>0.2) {
        circle(leftWristX,leftWristY,20)
        song2.stop()
        if (song1status==false) {
            song1.play()
            document.getElementById("song").innerHTML="Song-1 Is Playing"
        }
    }
}
function model_loaded() {
    console.log("Model Loaded")
}

function gotPoses(results){
    if (results.length>0) {
        console.log(results)
        leftWristX=results[0].pose.leftWrist.x
        leftWristY=results[0].pose.leftWrist.y
        console.log("leftWristX= "+leftWristX)
        console.log("leftWristY= "+leftWristY)
        rightWristX=results[0].pose.rightWrist.x
        rightWristY=results[0].pose.rightWrist.y
        console.log("rightWristX= "+rightWristX)
        console.log("rightWristY= "+rightWristY)
        leftwristscore=results[0].pose.keypoints[9].score
        rightwristscore=results[0].pose.keypoints[10].score
    }
}