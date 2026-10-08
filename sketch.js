let video;
let videoStream
let maskedSketch
let faceMesh;
let connections;
let faces = [];
let fallingBalls = []
let lines
let g
let options = { maxFaces: 1, refineLandmarks: false, flipped: false };
let maskedStream
let faceSeen = false

async function setup() {
  videoStream = createVideo('cody.mp4')
  videoStream.hide()
  faceMesh = await ml5.faceMesh(options);
  createCanvas(640, 480);
  g = createGraphics(640, 480)
  frameRate(30)
  video = createCapture(VIDEO, { flipped: true });
  video.hide();
 //bodyPose.detectStart(video, gotPoses);
 //faceMesh.detectStart(video, gotFaces);


}

function draw() {
  background(0);
  
  faceMesh.detect(video, gotFaces);
  //use faceMesh to detect
  if(faces.length > 0){
    faceSeen = true
  }else{
    faceSeen = false
  }

  if(faceSeen){
    videoStream.pause()
    updateCameraOutput()
     image(maskedSketch, 0, 0);
     //faceSeen = false;
    // faces = []
  }else{
    videoStream.play()
    maskedStream = createCircularMask(videoStream)
    image(maskedStream,0,0,width,height)
    //faceMesh.detect(video, gotFaces);
  }

  
  
}

function updateCameraOutput(){
g.image(video,0,0,width, height)
  g.stroke('red')
  g.strokeWeight(10)
  g.line(0,0,g.width, g.height)
  maskedSketch = createCircularMask(g)
   image(maskedSketch, 0, 0);

}

function mousePressed() {
  console.log(faces);
}

function gotFaces(results) {
  // Save the output to the faces variable
  faces = results || [];
}


  function  createCircularMask(img) {
     //console.log(img.width)
    let maskedImg = img.get()
    // Create an offscreen graphics buffer for the mask
    let maskBuffer = createGraphics(width,height)
     maskBuffer.circle(width/2,height/2, width*0.75);

    maskedImg.mask(maskBuffer);
  return maskedImg
  }