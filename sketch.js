var storyBg, warBg, battlefieldMediumBg, battlefieldLongBg, battlefieldLongerBg, endBg;
var redButtonImg, greenButtonImg, yellowButtonImg;
var easyPreview, mediumPreview, hardPreview;
var helicopterImg, packageImg;
var fireballImg, lightningImg, boosterImg;
var keySound, clickSound;
var startSong, chooseSong, breakFreeSong, happySong, endSong;
var helicopter, packageObj;
var fireballsGroup, lightningGroup, boostersGroup;
var easyInvisible, hardInvisible, mediumInvisible;
var fireball, lightning, booster;
var distance;

var gameState = "start";
var term = 0;
var energy = 100;
var num = 12;

function preload () {

	storyBg = loadImage("images/story_bg.png");
	warBg = loadImage("images/war_bg.jpeg");
	battlefieldMediumBg = loadImage("images/battlefield_medium_bg.png");
	battlefieldLongBg = loadImage("images/battlefield_long_bg.png");
	battlefieldLongerBg = loadImage("images/battlefield_longer_bg.png");
	endBg = loadImage("images/end_bg.jpeg");
	
	redButtonImg = loadImage("images/red_button.png");
	greenButtonImg = loadImage("images/green_button.png");
	yellowButtonImg = loadImage("images/yellow_button.png");
	
	easyPreview = loadImage("images/easy_preview.png");
	mediumPreview = loadImage("images/medium_preview.png");
	hardPreview = loadImage("images/hard_preview.png");

	helicopterImg = loadImage("images/helicopter.png");
	packageImg = loadImage("images/package.png");
	
	fireballImg = loadImage("images/fireball_img.png");
	lightningImg = loadImage("images/lightning_img.png");
	boosterImg = loadImage("images/booster.png");

	keySound = loadSound("sounds/key_sound.mp3");
	clickSound = loadSound("sounds/click_sound.mp3");

	startSong = loadSound("sounds/start_music.mp3");
	chooseSong = loadSound("sounds/break_free_song.mp3");
	breakFreeSong = loadSound("sounds/choose_song.mp3");
	happySong = loadSound("sounds/happy_song.mp3");
	endSong = loadSound("sounds/end_song.mp3");
	
}

function setup () {

	createCanvas(1400,800);
	
	helicopter = createSprite(200,200);
	helicopter.addImage(helicopterImg);
	helicopter.scale = 0.85;

	packageObj = createSprite();
	packageObj.addImage(packageImg);
	packageObj.scale = 0.25;

	fireballsGroup = createGroup();
	lightningGroup = createGroup();
	boostersGroup = createGroup();

	startSong.play();

}

function draw() {

  if(gameState === "start"){
	
	background(storyBg);

	if(keyDown("space")){
		startSong.stop();
		clickSound.play();
		gameState = "choose";
		chooseSong.play();
	}

	textFont("Georgia");
	textSize(67);
	fill(255);
	stroke(random(0,255),random(0,255),random(0,255));
	strokeWeight(7);
	text("A Battle Above the Field",10,100);

  }

  if(gameState === "choose"){

	  background(warBg);

	  textFont("Georgia");
	  textSize(67);
	  fill(255);
	  stroke(random(0,255),random(0,255),random(0,255));
  	  strokeWeight(7);
	  text("Choose the level of difficulty:",250,200);
	  
	  image(greenButtonImg,150,300,250,250);
	  textFont("Georgia");
	  textSize(42);
	  fill("lightgreen");
	  stroke("darkgreen");
	  strokeWeight(10);
	  text("Easy",230,425);

	  image(yellowButtonImg,550,300,250,250);
	  textFont("Georgia");
	  textSize(42);
	  fill("yellow");
	  stroke("orange");
	  strokeWeight(10);
	  text("Medium",597.5,425);

	  image(redButtonImg,950,300,250,250);
	  textFont("Georgia");
	  textSize(42);
	  fill("lightpink");
	  stroke("maroon");
	  strokeWeight(10);
	  text("Hard",1025,425);

	  if(mouseX <= 375 && mouseX >= 175 && mouseY >= 315 && mouseY <= 515){
		image(easyPreview,130,530,300,250);
		easyInvisible = createSprite(275,410,150,150);
		easyInvisible.visible = false;
		if(mousePressedOver(easyInvisible)){
			chooseSong.stop();
			clickSound.play();
			gameState = "easyPlay";
			breakFreeSong.play();
		}
	  }

	  if(mouseX >= 575 && mouseX <= 775 && mouseY >= 315 && mouseY <= 515){
		image(mediumPreview,520,530,300,250);
		mediumInvisible = createSprite(675,410,150,150);
		mediumInvisible.visible = false;
		if(mousePressedOver(mediumInvisible)){
			chooseSong.stop();
			clickSound.play();
			gameState = "mediumPlay";
			breakFreeSong.play();
		}
	  }

	  if(mouseX >= 975 && mouseX <= 1175 && mouseY >= 315 && mouseY <= 515){
		image(hardPreview,920,530,300,250);
		hardInvisible = createSprite(1075,410,150,150);
		hardInvisible.visible = false;
		if(mousePressedOver(hardInvisible)){
			chooseSong.stop();
			clickSound.play();
			gameState = "hardPlay";
			breakFreeSong.play();
		}
	  }
	  
  }

  if(gameState === "easyPlay"){
	
	background(235,235,235);

	image(battlefieldMediumBg,-500,0,10000,800);
	
	drawSprites();

	helicopter.visible = true;

	camera.position.x = helicopter.x;

	var distance = Math.round(9350-helicopter.x);
	if(distance <= 0){
		distance = 0;
	}

	textFont("Georgia");
	textSize(40);
	fill(0);
	stroke(0);
	strokeWeight(3);
	text("Energy Level: "+energy+"%",helicopter.x-680,50);
	text("Distance Remaining: "+distance,helicopter.x-680,95);

	if(helicopter.x < 9350){

		num = num+0.0075;
		helicopter.velocityX = num;

		packageObj.visible = false;
		packageObj.x = helicopter.x+10;
		packageObj.y = helicopter.y+10;

		spawnLightningEasy();
		spawnFireballsEasy();
		spawnBoosters();

		if(keyDown(UP_ARROW) && helicopter.y >= 80){
			helicopter.y-=10;
		}

		if(keyDown(DOWN_ARROW) && helicopter.y <= height-80){
			helicopter.y+=10;
		}

		if(fireballsGroup.isTouching(helicopter)||lightningGroup.isTouching(helicopter)){
			energy-= 0.5;
		}

		if(boostersGroup.isTouching(helicopter)){
			energy+=0.5;
		}

		if(energy <= 0){
			breakFreeSong.stop();
			gameState = "end";
			endSong.play();
		}

		textFont("Georgia");
		textSize(20);
		fill("gold");
		stroke(0);
		strokeWeight(5);
		text("Use the right and left arrow keys to move in the respective direction.",helicopter.x-690,650);
		text("Touching fire and lightning will decrease your energy level.",helicopter.x-690,675);
		text("Touching purple energy boosters will increase your energy level.",helicopter.x-690,700);
		text("Keep an eye on your energy level and the distance remaining above.",helicopter.x-690,725);
		text("The speed of the helicopter will increase as it travels deeper into the battlefield.",helicopter.x-690,750);
		text("Be careful and have fun!",helicopter.x-690,775);

	} 
	
	else {
		
		helicopter.velocityX = 0;

		packageObj.visible = true;

		textFont("Georgia");
		textSize(65);
		fill("lightgreen");
		strokeWeight(7);
		stroke("green");
		text("Press 1 to deliver",9540,200);
		text("the package!",9590,275);
		
		if(keyWentDown("1") && term === 0){
			breakFreeSong.stop();
			term += 1;
			happySong.play();
		}
		
		if(term === 1){

			if(packageObj.y < 750){
				packageObj.velocityY = 20;
			} else {
				packageObj.velocityY = 0;
			}
			
			textFont("Georgia");
			textSize(80);
			fill("lightblue");
			strokeWeight(7);
			stroke("blue");
			text("Mission",helicopter.x+300,400);
			text("accomplished!",helicopter.x+180,480);

			textFont("Georgia");
			textSize(60);
			fill("violet");
			strokeWeight(7);
			stroke("purple");
			text("Press the spacebar",helicopter.x+180,610);
			text("to play again!",helicopter.x+250,680);

			if(keyDown("space")){

				happySong.stop();
				chooseSong.play();

				energy = 100;
				term = 0;
				helicopter.x = 200;
				num = 12;

				fireballsGroup.destroyEach();
				lightningGroup.destroyEach();
				boostersGroup.destroyEach();

				packageObj.x = helicopter.x+10;
		        packageObj.y = helicopter.y+10;
				camera.position.x = width/2;

				gameState = "choose";

			}

		}

	}

  }

  if(gameState === "mediumPlay"){

	background(235,235,235);

	image(battlefieldLongBg,-500,0,20000,800);
	
	drawSprites();

	helicopter.visible = true;

	camera.position.x = helicopter.x;

	var distance = Math.round(19350-helicopter.x);
	if(distance <= 0){
		distance = 0;
	}

	textFont("Georgia");
	textSize(40);
	fill(0);
	stroke(0);
	strokeWeight(3);
	text("Energy Level: "+energy+"%",helicopter.x-680,50);
	text("Distance Remaining: "+distance,helicopter.x-680,95);

	textFont("Georgia");
	textSize(40);
	fill(0);
	stroke(0);
	strokeWeight(3);
	text("Energy Level: "+energy+"%",helicopter.x-680,50);

	if(helicopter.x < 19350){

		num = num+0.0075;
		helicopter.velocityX = num;

		packageObj.visible = false;
		packageObj.x = helicopter.x+10;
		packageObj.y = helicopter.y+10;

		spawnLightningMedium();
		spawnFireballsMedium();
		spawnBoosters();

		if(keyDown(UP_ARROW) && helicopter.y >= 80){
			helicopter.y-=10;
		}

		if(keyDown(DOWN_ARROW) && helicopter.y <= height-80){
			helicopter.y+=10;
		}

		if(fireballsGroup.isTouching(helicopter)||lightningGroup.isTouching(helicopter)){
			energy-= 0.5;
		}

		if(boostersGroup.isTouching(helicopter)){
			energy+=0.5;
		}

		if(energy <= 0){
			breakFreeSong.stop();
			gameState = "end";
			endSong.play();
		}

		textFont("Georgia");
		textSize(20);
		fill("gold");
		stroke(0);
		strokeWeight(5);
		text("Use the right and left arrow keys to move in the respective direction.",helicopter.x-690,650);
		text("Touching fire and lightning will decrease your energy level.",helicopter.x-690,675);
		text("Touching purple energy boosters will increase your energy level.",helicopter.x-690,700);
		text("Keep an eye on your energy level and the distance remaining above.",helicopter.x-690,725);
		text("The speed of the helicopter will increase as it travels deeper into the battlefield.",helicopter.x-690,750);
		text("Be careful and have fun!",helicopter.x-690,775);
		
	} else {
		
		helicopter.velocityX = 0;

		packageObj.visible = true;

		textFont("Georgia");
		textSize(65);
		fill("lightgreen");
		strokeWeight(7);
		stroke("green");
		text("Press 1 to deliver",19540,200);
		text("the package!",19590,275);
		
		if(keyWentDown("1") && term === 0){
			breakFreeSong.stop();
			term += 1;
			happySong.play();
		}
		
		if(term === 1){

			if(packageObj.y < 750){
				packageObj.velocityY = 20;
			} else {
				packageObj.velocityY = 0;
			}
			
			textFont("Georgia");
			textSize(80);
			fill("lightblue");
			strokeWeight(7);
			stroke("blue");
			text("Mission",helicopter.x+300,400);
			text("accomplished!",helicopter.x+180,480);

			textFont("Georgia");
			textSize(60);
			fill("violet");
			strokeWeight(7);
			stroke("purple");
			text("Press the spacebar",helicopter.x+180,610);
			text("to play again!",helicopter.x+250,680);

			if(keyDown("space")){

				happySong.stop();
				chooseSong.play();

				energy = 100;
				term = 0;
				helicopter.x = 200;
				num = 12;

				fireballsGroup.destroyEach();
				lightningGroup.destroyEach();
				boostersGroup.destroyEach();
		
				packageObj.x = helicopter.x+10;
		        packageObj.y = helicopter.y+10;
				camera.position.x = width/2;

				gameState = "choose";

			}

		}

	}

  }

  if(gameState === "hardPlay"){

	background(235,235,235);

	image(battlefieldLongerBg,-500,0,40000,800);
	
	drawSprites();

	helicopter.visible = true;

	camera.position.x = helicopter.x;

	var distance = Math.round(39350-helicopter.x);
	if(distance <= 0){
		distance = 0;
	}

	textFont("Georgia");
	textSize(40);
	fill(0);
	stroke(0);
	strokeWeight(3);
	text("Energy Level: "+energy+"%",helicopter.x-680,50);
	text("Distance Remaining: "+distance,helicopter.x-680,95);

	textFont("Georgia");
	textSize(40);
	fill(0);
	stroke(0);
	strokeWeight(3);
	text("Energy Level: "+energy+"%",helicopter.x-680,50);

	if(helicopter.x < 39350){

		num = num+0.0075;
		helicopter.velocityX = num;

		packageObj.visible = false;
		packageObj.x = helicopter.x+10;
		packageObj.y = helicopter.y+10;

		spawnLightningHard();
		spawnFireballsHard();
		spawnBoosters();

		if(keyDown(UP_ARROW) && helicopter.y >= 80){
			helicopter.y-=10;
		}

		if(keyDown(DOWN_ARROW) && helicopter.y <= height-80){
			helicopter.y+=10;
		}

		if(fireballsGroup.isTouching(helicopter)||lightningGroup.isTouching(helicopter)){
			energy-= 0.5;
		}

		if(boostersGroup.isTouching(helicopter)){
			energy+=0.5;
		}

		if(energy <= 0){
			gameState = "end";
			breakFreeSong.stop();
			endSong.play();
		}

		textFont("Georgia");
		textSize(20);
		fill("gold");
		stroke(0);
		strokeWeight(5);
		text("Use the right and left arrow keys to move in the respective direction.",helicopter.x-690,650);
		text("Touching fire and lightning will decrease your energy level.",helicopter.x-690,675);
		text("Touching purple energy boosters will increase your energy level.",helicopter.x-690,700);
		text("Keep an eye on your energy level and the distance remaining above.",helicopter.x-690,725);
		text("The speed of the helicopter will increase as it travels deeper into the battlefield.",helicopter.x-690,750);
		text("Be careful and have fun!",helicopter.x-690,775);
		
	} else {
		
		helicopter.velocityX = 0;

		packageObj.visible = true;

		textFont("Georgia");
		textSize(65);
		fill("lightgreen");
		strokeWeight(7);
		stroke("green");
		text("Press 1 to deliver",39540,200);
		text("the package!",39590,275);
		
		if(keyWentDown("1") && term === 0){
			breakFreeSong.stop();
			term += 1;
			happySong.play();
		}
		
		if(term === 1){

			if(packageObj.y < height-50){
				packageObj.velocityY = 20;
			} else {
				packageObj.velocityY = 0;
			}
			
			textFont("Georgia");
			textSize(80);
			fill("lightblue");
			strokeWeight(7);
			stroke("blue");
			text("Mission",helicopter.x+300,400);
			text("accomplished!",helicopter.x+180,480);

			textFont("Georgia");
			textSize(60);
			fill("violet");
			strokeWeight(7);
			stroke("purple");
			text("Press the spacebar",helicopter.x+180,610);
			text("to play again!",helicopter.x+250,680);

			if(keyDown("space")){

				happySong.stop();
				chooseSong.play();

				energy = 100;
				term = 0;
				helicopter.x = 200;
				num = 12;

				fireballsGroup.destroyEach();
				lightningGroup.destroyEach();
				boostersGroup.destroyEach();
		
				packageObj.x = helicopter.x+10;
		        packageObj.y = helicopter.y+10;
				camera.position.x = width/2;

				gameState = "choose";

			}

		}

	}

  }

  if(gameState === "end"){

	  background(endBg);

	  energy = 100;
	  term = 0;
	  helicopter.y = 200;
	  helicopter.x = 200;
	  num = 12;

	  fireballsGroup.destroyEach();
	  lightningGroup.destroyEach();

	  boostersGroup.destroyEach();
	  
	  packageObj.x = helicopter.x+10;
	  packageObj.y = helicopter.y+10;

	  camera.position.x = 700;

	  if(keyDown("r")){
		  endSong.stop();
		  gameState = "choose";
		  chooseSong.play();
	  }

	  textFont("Impact");
	  textSize(75);
	  fill(255);
	  noStroke();
	  text("Press r to play again...",400,700);

  }

}

function spawnFireballsEasy(){
	if(frameCount % 40 === 0 && helicopter.x <= 8400){
		fireball = createSprite(helicopter.x+700,random(250,800));
		fireball.addImage(fireballImg);
		fireball.lifetime = width/helicopter.velocityX;
		fireball.scale = 0.3;
		fireballsGroup.add(fireball);
	}
}

function spawnLightningEasy(){
	if(frameCount % 80 === 0 && helicopter.x <= 8400){
		lightning = createSprite(helicopter.x+700,150);
		lightning.addImage(lightningImg);
		lightning.lifetime = width/helicopter.velocityX;
		lightning.scale = random(1,1.5);
		lightningGroup.add(lightning);
	}
}

function spawnFireballsMedium(){
	if(frameCount % 35 === 0 && helicopter.x <= 18400){
		fireball = createSprite(helicopter.x+700,random(250,800));
		fireball.addImage(fireballImg);
		fireball.lifetime = width/helicopter.velocityX;
		fireball.scale = 0.35;
		fireballsGroup.add(fireball);
	}
}

function spawnLightningMedium(){
	if(frameCount % 75 === 0 && helicopter.x <= 18400){
		lightning = createSprite(helicopter.x+700,150);
		lightning.addImage(lightningImg);
		lightning.lifetime = width/helicopter.velocityX;
		lightning.scale = random(1.25,1.5);
		lightningGroup.add(lightning);
	}
}

function spawnFireballsHard(){
	if(frameCount % 30 === 0 && helicopter.x <= 38400){
		fireball = createSprite(helicopter.x+700,random(250,800));
		fireball.addImage(fireballImg);
		fireball.lifetime = width/helicopter.velocityX;
		fireball.scale = 0.375;
		fireballsGroup.add(fireball);
	}
}

function spawnLightningHard(){
	if(frameCount % 70 === 0 && helicopter.x <= 38400){
		lightning = createSprite(helicopter.x+700,150);
		lightning.addImage(lightningImg);
		lightning.lifetime = width/helicopter.velocityX;
		lightning.scale = random(1.3,1.5);
		lightningGroup.add(lightning);
	}
}

function spawnBoosters(){
	if(frameCount % 200 === 0 && helicopter.x <= 38400){
		booster = createSprite(helicopter.x+700,random(350,750));
		booster.addImage(boosterImg);
		booster.lifetime = width/helicopter.velocityX;
		booster.scale = 0.25;
		boostersGroup.add(booster);
	}
}