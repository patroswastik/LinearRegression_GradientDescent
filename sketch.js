// ArrayList<PVector> data;
// float m1, c1;
// float m2=0, c2=0;
// float total_error;
// boolean show = true;
// int zoom = 0;
//
// void setup() {
//   size(displayWidth,displayHeight);
//   background(0);
//   data = new ArrayList<PVector>();
// }
//
// void mousePressed() {
//   float x, y;
//   x = map(mouseX, 0, width, 0, 10);
//   y = map(mouseY, 0, height, 10, 0);
//   if(mouseX > 15 && mouseX < 45 && mouseY > 15 && mouseY < 45){
//     if(show) show = false;
//     else show = true;
//   }else{
//     if(show == true){
//       PVector point = new PVector(x, y);
//       data.add(point);
//     }
//   }
// }
//
// void mouseDragged(){
//   scale(zoom);
//   zoom += 0.2;
// }
//
// void mouseReleased(){
//   zoom = 0;
// }
//
// void gradientDescent(){
//   float learning_rate = 0.01;
//   total_error = 0;
//   for(PVector d : data){
//     float x = d.x;
//     float y = d.y;
//
//     float pred = m2 * x + c2;
//     float error = y - pred;
//     total_error += error;
//     m2 = m2 + (error  * x) * learning_rate;
//     c2 = c2 + (error) * learning_rate;
//   }
//   println(total_error);
// }
//
// void linearRegression() {
//   float xmean=0, ymean=0;
//   for (PVector d : data) {
//     xmean += d.x;
//     ymean += d.y;
//   }
//   xmean /= data.size();
//   ymean /= data.size();
//
//   float num=0, den=0;
//
//   for (PVector d : data) {
//     float x = d.x;
//     float y = d.y;
//     num += (x-xmean)*(y-ymean);
//     den += ((x-xmean)*(x-xmean));
//   }
//   m1 = num/den;
//   c1 = ymean - (m1*xmean);
// }
//
// void drawLine() {
//   float x1=0, y1, x2=width, y2;
//   y1 = m1*x1+c1;
//   y2 = m1*x2+c1;
//   x1 = map(x1,0,10,0,width);
//   y1 = map(y1,0,10,height,0);
//   x2 = map(x2,0,10,0,width);
//   y2 = map(y2,0,10,height,0);
//   stroke(0,255,255);
//   strokeWeight(2);
//   line(x1,y1,x2,y2);
//
//   float x3=0, y3, x4=width, y4;
//   y3 = m2*x3+c2;
//   y4 = m2*x4+c2;
//   x3 = map(x3,0,10,0,width);
//   y3 = map(y3,0,10,height,0);
//   x4 = map(x4,0,10,0,width);
//   y4 = map(y4,0,10,height,0);
//   stroke(255,0,0);
//   strokeWeight(2);
//   line(x3,y3,x4,y4);
// }
//
// void drawCurve(){
//   pushMatrix();
//   translate(width/2,height/2);
//   beginShape();
//   noFill();
//   for(int i=-49;i<50;i++){
//     curveVertex(i,-(i*i));
//   }
//   endShape();
//   float x = total_error*10;
//   float y = x * x;
//   ellipse(x,-y,10,10);
//   popMatrix();
//   total_error = 0;
// }
//
// void draw() {
//   background(0);
//   fill(255);
//   ellipse(30,30,30,30);
//   if(show == true){
//     for (PVector d : data) {
//       float x, y;
//       x = map(d.x, 0, 10, 0, width);
//       y = map(d.y, 0, 10, height, 0);
//       ellipse(x, y, 10, 10);
//     }
//     if(data.size()>1){
//       gradientDescent();
//       linearRegression();
//       drawLine();
//     }
//   }else{
//     stroke(255);
//     line(width/2,0,width/2,height);
//     line(0,height/2,width,height/2);
//     gradientDescent();
//     drawCurve();
//   }
// }

var data = [];
var m=0,b=0;
var m1,b1;
var total_error;
var show = true;

function setup(){
  createCanvas(window.innerWidth,window.innerHeight);
}

function mousePressed(){
  var x = map(mouseX,0,width,0,1);
  var y = map(mouseY,0,height,1,0);
  if(mouseX > 45 && mouseX < 75 && mouseY > 45 && mouseY < 75){
    if(show) show = false;
    else show = true;
  }else{
    if(show){
      var point = createVector(x,y);
      data.push(point);
    }
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
  x1 = map(x1,0,1,0,width);
  y1 = map(y1,0,1,height,0);
  x2 = map(x2,0,1,0,width);
  y2 = map(y2,0,1,height,0);
  stroke(255,0,0);
  line(x1,y1,x2,y2);

  var x3=0,x4=1,y3,y4;
  y3 = m1*x3+b1;
  y4 = m1*x4+b1;
  x3 = map(x3,0,1,0,width);
  y3 = map(y3,0,1,height,0);
  x4 = map(x4,0,1,0,width);
  y4 = map(y4,0,1,height,0);

  stroke(0,255,0);
  line(x3,y3,x4,y4);
  // console.log("m = "+m+",b = "+b+",m1 = "+m1+",b1 = "+b1);
}

function drawCurve(){
  push();
  translate(width/2,height/2);
  beginShape();
  noFill();
  for(var i=-49;i<50;i++){
    curveVertex(i,-(i*i));
  }
  endShape();
  var x = total_error*100;
  var y = x * x;
  ellipse(x,-y,10,10);
  pop();
  total_error = 0;
}

function draw(){
  background(0);
  ellipse(60,60,30,30);
  if(show){
    for(var i = 0;i<data.length;i++){
      var x = map(data[i].x,0,1,0,width);
      var y = map(data[i].y,0,1,height,0);
      fill(255);
      stroke(255);
      ellipse(x,y,10,10);
    }
    if(data.length>1){
      gradientDescent();
      linearRegression();
      drawLine();
    }
  }else{
    stroke(255);
    line(width/2,0,width/2,height);
    line(0,height/2,width,height/2);
    gradientDescent();
    drawCurve();
  }
}
