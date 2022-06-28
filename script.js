/* exported setup, draw */
let seed = 12345;

const grassColor = "#56e346";
const skyColor = "#0bdbc0";
const hillColor = "#ffffff";
const treeColor = "#3d1803";
const leaveColor = "#233610";
const petalColor1 = '#e3e01b';
const petalColor2 = '#ff05e6';
const petalColor3 = '#ff0505';
const flowerColor = '#284d34';
const trainColor = '#ff0a0a';
const roadColor = '#bfbfbf';
const tireColor = '#000000';
const woodColor = '#422200';
const airColor = '#001442';
const sunColor = [254,254,254,80]; // with opacity

function preload() {
    // runs before setup 
    // use if you want to load any large files and want to make sure they load before setup()
}

function setup() {
  createCanvas(800, 400);
  createButton("reroll").mousePressed(() => seed++);
}

function draw() {
  randomSeed(seed);

  background(100);

  noStroke();

  fill(skyColor);
  rect(0, 0, width, height / 2);
  
  // An example of making something respond to the mouse
  fill(...sunColor);
  ellipse(0,0,30,30);
  ellipse(0,0,50,50);
  ellipse(0,0,100,100);
  ellipse(0,0,200,200);

  fill(grassColor);
  rect(0, height / 2, width, height / 2);
  fill(roadColor);
  stroke(tireColor);
  rect(-2, 250, 1000, 25);
  stroke(woodColor);
  strokeWeight(5);
  for(let i = -40; i < 40; i++){
    line(mouseX/2 + i* 20, 252, mouseX/2 + 10 + i* 20, 272); 
  }
  strokeWeight(2);
  stroke(airColor);

  // An example of drawing an irregular polygon
  fill(hillColor);
  beginShape();
  vertex(0, height / 2);
  const steps = 10;
  for (let i = 0; i < steps + 1; i++) {
    let x = (width * i) / steps;
    let y =
      height / 2*random() - (random() * random() * random() * height) / 8 - height / 50;
    vertex(x, y);
  }
  vertex(width, height / 2);
  endShape(CLOSE);

  const trees = 5*random();
  for (let i = 0; i < trees; i++) {
    drawLtree();
  }
  noStroke();
  fill(tireColor);
  circle(mouseX + 10, 250, 15);
  circle(mouseX + 111, 250, 15);
  circle(mouseX + 212, 250, 15);
  circle(mouseX + 90, 250, 15);
  circle(mouseX + 191, 250, 15);
  circle(mouseX + 292, 250, 15);
  fill(trainColor);
  rect(mouseX, 200, 100, 50);
  rect(mouseX + 101, 200, 100, 50);
  rect(mouseX + 202, 200, 100, 50);
  ellipse(mouseX + 300, 225, 100, 50);
  fill(hillColor);
  rect(mouseX + 15, 213, 25, 25);
  rect(mouseX + 50, 213, 25, 25);
  rect(mouseX + 116, 213, 25, 25);
  rect(mouseX + 151, 213, 25, 25);
  rect(mouseX + 217, 213, 25, 25);
  rect(mouseX + 252, 213, 25, 25);
  for (let i = 0; i < trees * 2; i++) {
    drawFlower();
  }

  // An example of recursively drawing an L-tree 
  function drawLtree() {
    let x = width * random();
    let y = 200+ height/8 * random();
    let s = width/200 + (y - height/2)/2;
    let jitter = (mouseX - width/2) / width * 2 * Math.PI / 180;
    drawLtreeBranch(x, y, s, (-90 * Math.PI / 180) + jitter, 0, 5); // this angle points north (0 is east)
  }  

  function drawLtreeBranch(x, y, s, angle, max_limit, branch_weight) { // s is length of a segment
    stroke(treeColor);
    strokeWeight(branch_weight);
    let v = p5.Vector.fromAngle(angle, s);
    let vx = v.x;
    let vy = v.y; 
    let x1 = x;
    let y1 = y; 
    let x2 = x1 + vx;
    let y2 = y1 + vy;
    line(x1, y1, x2, y2);
  
    let new_s = s * 0.7;
    let new_max = max_limit + random();
    let new_branch_weight = branch_weight - 1;
    new_branch_weight = max(new_branch_weight, 1);

    if (max_limit < 3) {
        if (random() < 1/3) {
            drawLtreeBranch(x2, y2, new_s, (-35 * Math.PI / 180) + angle, new_max, new_branch_weight);
        } else if (random() > 1/3) {
            drawLtreeBranch(x2, y2, new_s, (35 * Math.PI / 180) + angle, new_max, new_branch_weight);
        } else {
            drawLtreeBranch(x2, y2, new_s, (-35 * Math.PI / 180) + angle, new_max, new_branch_weight);
            drawLtreeBranch(x2, y2, new_s, (35 * Math.PI / 180) + angle, new_max, new_branch_weight);
        }
        drawLtreeBranch(x2, y2, new_s, angle, new_max, new_branch_weight);
    }
    else {
        if (random() < 1/3) {
            drawLeave(x2, y2, new_s, (-35 * Math.PI / 180) + angle);
        } else if (random() > 1/3) {
            drawLeave(x2, y2, new_s, (35 * Math.PI / 180) + angle);
        } else {
            drawLeave(x2, y2, new_s, (-35 * Math.PI / 180) + angle);
            drawLeave(x2, y2, new_s, (35 * Math.PI / 180) + angle);
        }
    }
  }

  function drawLeave(x, y, s, angle) {
    fill(leaveColor);
    noStroke();
    let v = p5.Vector.fromAngle(angle, s);
    let vx = v.x;
    let vy = v.y; 
    let x1 = x;
    let y1 = y; 
    let x2 = x1 + vx;
    let y2 = y1 + vy;
    line(x1, y1, x2, y2);
    circle(x2, y2, 5);
  }

  
  function drawFlower(){
    let x = width * random();
    let y = 300 + height/8 * random();
    let s = width/200 + (y - height/2)/6;
    let jitter = (mouseX - width/2) / width * 2 * Math.PI / 180;
    stroke(flowerColor);
    strokeWeight(4);
    let v = p5.Vector.fromAngle((-90 * Math.PI / 180) + jitter, s);
    let vx = v.x;
    let vy = v.y; 
    let x1 = x;
    let y1 = y; 
    let x2 = x1 + vx;
    let y2 = y1 + vy;
    line(x1, y1, x2, y2);
    if (random() < 1/3) {
      fill(petalColor1);
    } else if (random() > 1/3) {
      fill(petalColor2);
    } else {
      fill(petalColor3);
    }
    
    noStroke();
    line(x1, y1, x2, y2);
    circle(x2, y2, 6);
    circle(x2 - 6, y2, 10);
    circle(x2 + 6, y2, 10);
    circle(x2, y2 + 6, 10);
    circle(x2, y2 - 6, 10);
    stroke(flowerColor);
    strokeWeight(3);

    v = p5.Vector.fromAngle((60), s/2);
    vx = v.x;
    vy = v.y; 
    x1 = x;
    y1 = y; 
    x2 = x1 + vx;
    y2 = y1 + vy;
    line(x1, y1, x2, y2);

    v = p5.Vector.fromAngle((50), s/2);
    vx = v.x;
    vy = v.y; 
    x1 = x;
    y1 = y; 
    x2 = x1 + vx;
    y2 = y1 + vy;
    line(x1, y1, x2, y2);
  }
  
}

