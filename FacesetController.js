class Faceset{
	constructor(name){
		this.name = name;
		this.position = null;
		this.expression = null;
		this.x = 0;
		this.y = 0;
		this.composite = new map();
		this.isShowing = false;
		this.talkTime = 0;
		this.talkFrequency = 20;
		this.blinkFrequency = 100;
		this.currentMouthFrame = 0;
		this.currentEyeFrame = 0;
	}


	setPosition(position){
		this.position = position;
		updateComposite();
	}


	setExpression(expression){
		this.expression = expression;
		updateComposite();
	}


	setCurrentEyeFrame(newFrame){
		newFrame = Number(newFrame);
		this.currentEyeFrame = newFrame;
		updateComposite();
	}


	setCurrentMouthFrame(newFrame){
		newFrame = Number(newFrame);
		this.currentMouthFrame = newFrame;
		updateComposite();
	}


	setDisplayLocation(x, y){
		this.x = x;
		this.y = y;
	}


	setTalkFrequency(amount){
		amount = Number(amount);
		this.talkFrequency = amount;
	}


	setBlinkFrequency(amount){
		amount = Number(amount);
		this.blinkFrequency = amount;
	}


	//Updates stored composite information
	updateComposite(){
		this.composite.set('base', getImageName("base"));
		this.composite.set('eyes', getImageName("eyes"));
		this.composite.set('mouth', getImageName("mouth"));
	}


	//Show Faceset Images and start the controller
	show(){
		this.isShowing = true;

		updateComposite();

		displayImage(this.composite.get('base'));
		displayImage(this.composite.get('eyes'));
		displayImage(this.composite.get('mouth'));
	}


	//Main Faceset Controller
	controller(){
		var blinkTimer = this.blinkFrequency;
		var talkTimer = this.talkFrequency;

		while(this.isShowing){
			if(blinkTimer == 0){ // Blink Frequency
				blink();
				blinkTimer = this.blinkFrequency;
			}

			if(talkTimer == 0){ // Mouth Frequency
				mouth();
				talkTimer = this.talkFrequency;
			}

			waitFrames(1);
			if(talkTime > 0){
				talkTimer -= getRandomIncrement();
				talkTime--;
			}
			blinkTimer -=  getRandomIncrement();
		}
	}


	//Return random value from 0 to 10
	getRandomIncrement(){
		return Math.floor(Math.random() * 10);
	}


	//Hide Faceset Images and stop the controller
	hide(){
		this.isShowing = false;

		hideImage(this.composite.get('base'));
		hideImage(this.composite.get('eyes'));
		hideImage(this.composite.get('mouth'));	
	}


	//Displays named image at stored location
	showImage(imageName){
		//TO-DO
	}


	//Hides named image
	hideImage(imageName){
		//TO-DO
	}


	//Waits requested number of frames
	waitFrames(amount){
		//TO-DO
	}


	//Gets requested layer of the Faceset image
	getImageName(layer){
		var imageName = name + "_" + position;

		if(layer == 'eyes'){
			imageName += "_eyes_" + expression + 0;
		} else if(layer == 'mouth'){
			imageName += "_mouth_" + expression + 0;
		}

		return imageName;
	}


	//Talk for requested time
	talk(time){
		time = Number(time);
		this.talkTime = time;
	}


	//Perform a single blink animation
	blink(){
		cycleImages(this.composite.get('eyes'), 2, currentEyeFrame);
	}


	//Perform a single mouth cycle
	mouth(){
		cycleImages(this.composite.get('mouth'), 4, currentMouthFrame);
	}


	//Cycles through images from 0 to limit and back (inclusive)
	cycleImages(name, limit, baseFrame){
		baseName = name.substring(0, name.length - 1);
		limit = Number(limit);
		baseFrame = Number(baseFrame);
		waitTime = 2;

		for(int i = baseFrame; i <= limit;){
			hideImage(baseName + i);
			i++;
			showImage(baseName + i);
			waitFrames(waitTime++);
		}

		for(int i = limit; i >= baseFrame;){
			hideImage(baseName + i);
			i--;
			showImage(baseName + i);
			waitFrames(waitTime--);
		}
	}

	//Cycles through images in the order of the pattern
	cycleImagesPattern(name, pattern, baseFrame){
		baseName = name.substring(0, name.length - 1);
		pattern = pattern.split(",");
		baseFrame = Number(baseFrame);
		waitTime = 2;

		hideImage(baseName + baseFrame);
		for(i in pattern){
			showImage(baseName + i);
			waitFrames(waitTime);
			hideImage(baseName + i);
		}
		showImage(baseName + baseFrame);
	}
}