class Faceset{
	const BLINK_FRAMES = 2;
	const MOUTH_FRAMES = 4;

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
		this.currentEyeFrame = Number(newFrame);
		updateComposite();
	}


	setCurrentMouthFrame(newFrame){
		this.currentMouthFrame = Number(newFrame);
		updateComposite();
	}


	setDisplayLocation(x, y){
		this.x = x;
		this.y = y;
	}


	setTalkFrequency(amount){
		this.talkFrequency = Number(amount);
	}


	setBlinkFrequency(amount){
		this.blinkFrequency = Number(amount);
	}


	setTalkTime(time){
		this.talkTime = Number(time); 
	}


	updateComposite(){
		this.composite.set('base', _getImageName("base"));
		this.composite.set('eyes', _getImageName("eyes"));
		this.composite.set('mouth', _getImageName("mouth"));
	}


	//Show Faceset Images and start the controller 
	show(){
		this.isShowing = true;

		updateComposite();

		displayImage(this.composite.get('base'));
		displayImage(this.composite.get('eyes'));
		displayImage(this.composite.get('mouth'));

		manageFacialMovements();
	}


	manageFacialMovements(){ 
		let blinkTimer = this.blinkFrequency;
		let talkTimer = this.talkFrequency;

		while(this.isShowing){
			if(blinkTimer <= 0){
				_blink();
				blinkTimer = this.blinkFrequency;
			}

			if(talkTimer <= 0){
				_moveMouth();
				talkTimer = this.talkFrequency;
			}

			waitFrames(1);
			if(talkTime > 0){
				talkTimer -= this._getRandomIncrement();
				this.talkTime--; 
			}
			
			blinkTimer -=  this._getRandomIncrement();
		}
	}


	//Return random value from 1 to 10
	_getRandomIncrement(){ 
		return Math.floor(Math.random() * 10. + 1); 
	}


	//Hide Faceset Images and stop the controller
	hide(){
		this.isShowing = false;

		hideImage(this.composite.get('base'));
		hideImage(this.composite.get('eyes'));
		hideImage(this.composite.get('mouth'));	
	}


	showImage(imageName){
		//TO-DO
	}


	hideImage(imageName){
		//TO-DO
	}


	waitFrames(amount){
		//TO-DO
	}


	//Gets requested layer of the Faceset image
	_getImageName(layer){
		let imageName = this.name + "_" + this.position;

		if(layer == 'eyes'){
			imageName += "_eyes_" + this.expression + this.currentEyeFrame;
		} else if(layer == 'mouth'){
			imageName += "_mouth_" + this.expression + this.currentMouthFrame; 
		}

		return imageName;
	}


	_blink(){
		this._cycleImages(this.composite.get('eyes'), this.BLINK_FRAMES, currentEyeFrame);
	}


	_moveMouth(){
		this._cycleImages(this.composite.get('mouth'), this.MOUTH_FRAMES, currentMouthFrame);
	}


	//Cycles through images from 0 to limit and back (inclusive)
	_cycleImages(name, limit, baseFrame){
		let baseName = _trimTrailingIndex(name);
		let waitTime = 2;

		for(let i = baseFrame; i <= limit; i++){
			hideImage(baseName + i);
			showImage(baseName + i+1);
			waitFrames(waitTime++);
		}

		for(let i = limit; i >= baseFrame; i--){
			hideImage(baseName + i);
			showImage(baseName + i-1);
			waitFrames(waitTime--);
		}
	}

	_cycleImagesBySequence(name, sequence, baseFrame){
		baseName = _trimTrailingIndex(name);
		
		let baseImage = baseName + baseFrame;
		let waitTime = 2;

		hideImage(baseImage);
		
		for(frame in sequence){
			let currentFrame = baseName + frame;
			
			showImage(currentFrame);
			waitFrames(waitTime);
			hideImage(currentFrame);
		}
		
		showImage(baseImage);
	}

	_trimTrailingIndex(name){
		return name.substring(0, name.length - 1);
	}
}