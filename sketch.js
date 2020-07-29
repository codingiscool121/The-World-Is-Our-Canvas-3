var database

var drawing = [];
var currentPath,button2,title,title2,title3,show,clearButton,erase , hi = 1;
var isDrawing = false;
var sprite = [];


function setup(){
  canvas = createCanvas(400,400);
  canvas.mousePressed(startPath);
  canvas.parent('canvascontainer');
  canvas.mouseReleased(endPath);


  button2 = createButton('get drawing from database');
  button2.position(10,420)

  button2.size(100,50);
  button2.mousePressed(showDrawing,)

  clearButton = createButton('clear');
  clearButton.position(165,420)
  clearButton.size(100,25);
  clearButton.mousePressed(clearDrawing)

  var button1 = createButton('upload to database');
  button1.position(315,420)
  button1.size(100,50);
  button1.mousePressed(saveDrawing)

  var config = {  
    apiKey: "AIzaSyCrruN6IFaAmE-EsJoKMZqNHKCa_zhUVA8",
    authDomain: "the-world-is-our-canvas-ac.firebaseapp.com",
    databaseURL: "https://the-world-is-our-canvas-ac.firebaseio.com",
    projectId: "the-world-is-our-canvas-ac",
    storageBucket: "the-world-is-our-canvas-ac.appspot.com",
    messagingSenderId: "1051861671468",
    appId: "1:1051861671468:web:22595c8d4c08d21a18fb89"
  };
  firebase.initializeApp(config);
  database = firebase.database();  
  

}


function startPath(){
  isDrawing = true;
  currentPath = [];
  drawing.push(currentPath);
}

function endPath(){
  isDrawing = false;
}
var rects = [];
function draw(){

  

  background("white");
  

  if (isDrawing){
    var point = {
      x: mouseX,
      y:mouseY
    }
    currentPath.push(point);
  }




  fill("white");

  strokeWeight(10);
  noFill();
  for(var i = 0; i<drawing.length; i++){
     path = drawing[i];
    beginShape();
    for( j = 0; j<path.length; j++){
      vertex(path[j].x,path[j].y)

      
    }
    endShape();
  }

     

 
  

  title = createElement('h3');
  title.html("Once you have pressed on get drawing from database");
   title2 = createElement('h3');
  title2.html("You dont have to do it again");
   title3 = createElement('h3');
  title3.html("You just have to update the database");
  title.position(10,460);
  title2.position(10,480);
  title3.position(10,500);
  drawSprites();

}



function saveDrawing(){
  
 
  var ref = database.ref('/').set({
    drawing : drawing
  });
 
}



function gotData(data){

  var ref = database.ref('/');
  ref.on('value', gotData, errData)

  var drawings = data.val();
  var keys = Object.keys(drawings);
  for (var i = 0; i< keys.length; i++ ){
    var key = keys[i];
    //console.log(key);
    var li = createElement('li', '');
    var ahref = createButton('#', key);  
    
    ahref.mousePressed(showDrawing);
    ahref.parent(li);     
    li.parent('drawinglist');
  }
}

function errData(err) {
  console.log(err);
}

function showDrawing(){


  var ref = database.ref('/');
  ref.on('value', oneDrawing, errData);

  function oneDrawing(data){
    var dbdrawing = data.val();
    drawing = dbdrawing.drawing                                                                                                                  //.
  }
}

function clearDrawing(){
  drawing = [];
}

function era(){
  hi = 2
}