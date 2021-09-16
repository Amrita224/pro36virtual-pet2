class Food {
    constructor() {
        this.image = loadImage("images/Milk.png");
        this.foodStock=0,
        this.lasFeed;

    }

    display(){
     var x=80,y=100;

        imageMode(CENTER);
        image(this.image,290,380,100,100);

        if(this.foodStock !=0){
            for(var i=0;i<this.foodStock;i++){
                if(i%10==0){
                    x=80;
                    y+=50;
                }
                image(this.image,x,y,50,50);
                x+=30;
            }
        }
    }

    getFedTime(lastFeed){
        this.lasFeed=lastFeed;
    }

    getFoodStock() {
       return this.foodStock;
    }

    updateFoodStock(foodStock) {
       this.foodStock=foodStock;

    }

    deductFood() {
        if(this.foodStock>0){
            this.foodStock=this.foodStock-1;
        }
    }
}