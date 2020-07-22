var data = [];
var m=0,b=0;
var m1,b1;
var total_error;

function setup(){
  createCanvas(window.innerWidth,window.innerHeight);
}

function mousePressed(){
  var x = map(mouseX,0,width - 400,0,1);
  var y = map(mouseY,0,height,1,0);
  if(mouseX < width - 400){
    var point = createVector(x,y);
    data.push(point);
  }
}

function gradientDescent(){
  total_error = 0;
  for(var i =0;i<data.length;i++){
    var x = data[i].x;
    var y = data[i].y;

    var learningRate = 0.01;

    var yguess = m * x + b;

    var error = y - yguess;
    total_error += error;

    m = m + (error * x) * learningRate;
    b = b + error * learningRate;

  }
}

function linearRegression(){
    var xmean=0, ymean=0;
    for (var i = 0;i < data.length; i++) {
      xmean += data[i].x;
      ymean += data[i].y;
    }
    xmean /= data.length;
    ymean /= data.length;

    var num=0, den=0;

    for (var i = 0;i < data.length;i++) {
      var x = data[i].x;
      var y = data[i].y;
      num += (x-xmean)*(y-ymean);
      den += ((x-xmean)*(x-xmean));
    }
    m1 = num/den;
    b1 = ymean - (m1*xmean);
}

function drawLine(){
  var x1=0,x2=1,y1,y2;
  y1 = m*x1+b;
  y2 = m*x2+b;
  x1 = map(x1,0,1,0,width - 400);
  y1 = map(y1,0,1,height,0);
  x2 = map(x2,0,1,0,width - 400);
  y2 = map(y2,0,1,height,0);
  stroke(255,0,0);
  line(x1,y1,x2,y2);

  var x3=0,x4=1,y3,y4;
  y3 = m1*x3+b1;
  y4 = m1*x4+b1;
  x3 = map(x3,0,1,0,width - 400);
  y3 = map(y3,0,1,height,0);
  x4 = map(x4,0,1,0,width - 400);
  y4 = map(y4,0,1,height,0);

  stroke(0,255,0);
  line(x3,y3,x4,y4);
  // console.log("m = "+m+",b = "+b+",m1 = "+m1+",b1 = "+b1);
}

function drawCurve(){
  push();
  translate(width - 200,600);
  beginShape();
  noFill();
  for(var i=-49;i<50;i++){
    curveVertex(i,-(i*i));
  }
  endShape();
  var x = total_error*100;
  var y = -(x * x);
  ellipse(x,y,10,10);
  pop();
  total_error = 0;
}

function draw(){
  background(0);
  line(width-400,0,width-400,height);
  for(var i = 0;i<data.length;i++){
    var x = map(data[i].x,0,1,0,width - 200);
    var y = map(data[i].y,0,1,height,0);
    fill(255);
    stroke(255);
    ellipse(x,y,10,10);
  }
  if(data.length>1){
    gradientDescent();
    linearRegression();
    drawLine();
    stroke(255);
    drawCurve();
  }
}
