//Create variables here
var dog;
var dogHappy, database, foodS, foodStock;
var FoodOBJ;
var feed,foodadd;
var lastFed, fedTime;

 
function preload()
{
 dogSad = loadImage("images/dogImg.png");
 dogHappy = loadImage("images/dogImg1.png");
 
}

function setup() {

	createCanvas(500, 500);

  database = firebase.database();
  database.ref("/").set({Food :20})
  dog  = createSprite(250,350);
  dog.addImage(dogSad);
  dog.scale = 0.3
  FoodOBJ = new Food();

  foodStock = database.ref('Food')
  foodStock.on("value",readStock);

  /*
  console.log(lastFed)*/
  
  feed = createButton("Feed him")
  feed.position(400,420);
  feed.mousePressed(call);

  foodadd = createButton("Add food")
  foodadd.position(80,420)
  foodadd.mousePressed(emergency);
}


function draw() {  
  background(46,139,87)
  FoodOBJ.display();
  fedTime = database.ref('lastFed')
  fedTime.on("value",function (data){lastFed = data.val()});
  //text(lastFed,240,50)
  drawSprites();
  
}

function readStock(data){
  foodS = data.val();
  FoodOBJ.updateFoodStock(foodS);

}
function writeStock(x){
  if(x!=0)
  //x = 0
    x = x-1;
     database.ref('/').update({Food:x})

}


function call(){
  dog.addImage(dogHappy)
  //console.log(frameCount);
  foodS--;
  if(foodS<1)
  foodS = 0;
  database.ref('/').update({
    Food:foodS
  })
  lastFed = hour();
  database.ref('/').update({
    lastFed : lastFed
  })

}
function emergency(){
  foodS++;
  if(foodS>30)
  foodS = 30;
  database.ref('/').update({
    Food: foodS
  });
}