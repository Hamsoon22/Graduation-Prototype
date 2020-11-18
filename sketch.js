
  // Classifier Variable
  let classifier;
  // Model URL
  let imageModelURL = 'https://teachablemachine.withgoogle.com/models/P5zCORBn1/';
  
  // Video
  let video;
  let flippedVideo;
  // To store the classification
  let label = "";
  let input, button, greeting;
  let mx = [];
  let my = [];
 // let num = 60;

// circle
 let r = 150;
let angle = 0;
let nameCount = 10;
let step;

  // Load the model first
  function preload() {
    classifier = ml5.imageClassifier(imageModelURL + 'model.json');
  }

  function setup() {
    createCanvas(640, 480);
    // Create the video
    video = createCapture(VIDEO);
    video.size(640, 480);
    video.hide();
    input = createInput();
    input.position(10, 430);
    button = createButton('submit');
    button.position(input.x + input.width, 430);
    button.mousePressed(greet);
    greeting = createElement('h2', 'What do you think?');
    greeting.position(20,10);
    
    
    step = TWO_PI/nameCount;
    
    flippedVideo = ml5.flipImage(video);
    // Start classifying
    classifyVideo();
    for (let i = 0; i < 1; i++) {
    mx.push(i);
    my.push(i);
  }
  }

  function draw() {
    background(0);
    // Draw the video
    //tint(255,0,15)
    image(flippedVideo, 0, 0);

//     fill(255);
//     textSize(16);
//     textAlign(CENTER);
//     text(label, width / 2, height - 4);
//    let index = (which + 1 + i) % num;
    // Draw the label
  }

function greet() {
  const name = input.value();
  
  
  if(name != "" && name != " "){
    greeting.html('My idea is ' + name + '!');
    input.value('');
    let message = createElement('h2', '');
  
    let x = r*sin(angle);
    let y = r*cos(angle);
    message.position(width/2 + x,height/2 + y);
    message.html(name);
    //message.style("transform", "rotate("+ random(-20,20)+"deg)");
    angle += step;
    
  }
                
  // text(name, this.x, this.y);
 // greeting.position(this.x, this.y);
  //  for (let i = 0; i < 10; i++) {
  //   this.x = random(width);
  //   this.y = random(height); 
  //   text(name, this.x, this.y);
  // }
  
  
}

  // Get a prediction for the current video frame
  function classifyVideo() {
    flippedVideo = ml5.flipImage(video)
    classifier.classify(flippedVideo, gotResult);
    flippedVideo.remove();

  }

  // When we get a result
  function gotResult(error, results) {
    // If there is an error
    if (error) {
      console.error(error);
      return;
    }
    // The results are in an array ordered by confidence.
    // console.log(results[0]);
    label = results[0].label;
    // Classifiy again!
    classifyVideo();
  }
</script>