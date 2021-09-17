//Create variables here
var dog, happyDog, database, foodS, foodStock;
var dogImg1;

var feed;
var addFood

var fedTime;
var lasFeed;

var foodObj;

function preload() {

  //load images here
  dogImg1 = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  createCanvas(800, 700);
  dog = createSprite(600, 400, 50, 50);
  dog.addImage(dogImg1);
  dog.scale = 0.2;

  foodObj = new Food();
//creating buttons for adding and feeding food to the pet
  feed = createButton("Feed The Dog");
  feed.position(680, 95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);


}


function draw() {
  background(46, 139, 87)
  foodObj.display();
  //add styles here

  // read foodStock from firebase
  fedTime=database.ref('FeedTime');
  fedTime.on('value',function(data){
    lasFeed=data.val();
  })




  drawSprites();
  fill(255,255,254);
  textSize(15);
  if(lasFeed>=12){
    text("Last Feed : "+lasFeed%12 + " PM",350,30);
  }else{
    if(lasFeed==0){
      text("Last Feed : 12 AM",350,30);
    }else{
      text("Last Feed : "+lasFeed +" AM",350,30);
    }
  }
  
}

function readStock(data) {
  foodS = data.val()
  foodObj.updateFoodStock(foodS);
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function feedDog(){
  dog.addImage(happyDog);

  //updating lastFeed and fedTime
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}



