class Butterfly {
	constructor(srcButterfly) {
		const calcTraectory = () => {
			this.widthWindow = window.innerWidth;
			this.heightWindow = window.innerHeight;
			const randomWidth = getRandomInt(50, 200);
			const randomX = getRandomInt(0, this.widthWindow - randomWidth);
			const randomY = getRandomInt(0, this.heightWindow - randomWidth);
			this.x = randomX;
			this.y = randomY;
			this.lastX = this.x;
			this.width = randomWidth;
			this.srcButterfly = srcButterfly;
		}
		window.addEventListener('resize', calcTraectory);
		calcTraectory();
		this.draw();
	}

	randomGenerator(time) {
		const randomWidth = getRandomInt(50, 200);
		const randomX = getRandomInt(0, this.widthWindow - randomWidth);
		const randomY = getRandomInt(0, this.heightWindow - randomWidth);
		this.x = randomX;
		this.y = randomY;
		this.width = randomWidth;
	}

	draw() {
		const butterflyHtml = document.createElement('img');
		butterflyHtml.src = this.srcButterfly;
		this.node = butterflyHtml;
		this.node.style.position = 'absolute';
		this.node.style.width = this.width + 'px';
		this.node.style.left = this.x + 'px';
		this.node.style.top = this.y + 'px';
		body.prepend(this.node);
	}

	moveUp() {
		this.y--;
		this.node.style.left = this.x + 'px';
		this.node.style.top = this.y + 'px';
	}

	moveRight() {
		this.x++;
		this.node.style.left = this.x + 'px';
	}

	moveLeft() {
		this.x--;
		this.node.style.left = this.x + 'px';
	}

	moveRandomLeftOrRight() {
		if (!this.moveRandomLeftOrRightCounter)
			this.moveRandomLeftOrRightCounter = {};
		const f = this.moveRandomLeftOrRightCounter;

		if( !f.callCount ) f.callCount = 0;
		if( !f.maxCount ) f.maxCount = getRandomInt(50, 150);
		if ( (this.widthWindow - this.x - this.width > f.maxCount) && this.x > f.maxCount && !f.direction ) {
			f.direction = getRandomInt(0, 1) ? 'Right' : 'Left';
		} else if (this.widthWindow - this.x - this.width > f.maxCount && !f.direction) {
			f.direction = "Right";
		} else if (this.x > f.maxCount && !f.direction) {
			f.direction = "Left";
		}


		if( ++f.callCount >= f.maxCount ) {
			f.maxCount = getRandomInt(50, 150);
			if ( (this.widthWindow - this.x - this.width) > f.maxCount && this.x > f.maxCount) {
				// Если налево и направо есть место, то случайно можно пойти налево и направо
				f.direction = getRandomInt(0, 1) ? 'Right' : 'Left';
			} else if (this.widthWindow - this.x - this.width > f.maxCount) {
				// Иначе если есть место идти направо, то направо
				f.direction = "Right";
			} else if (this.x > f.maxCount) {
				// Иначе если есть место идти налево, то налево
				f.direction = "Left";
			}
			f.callCount = null;
		}

		this[ "move" + f.direction ]();
	}

	move(fpsTime = 60) {
		let fps, fpsInterval, startTime, now, then, elapsed;
		const startAnimate = (fps = 60) => {
			fpsInterval = 1000 / fps;
			then = Date.now();
			startTime = then;
			animate();
		}
		const animate = () => {
			let myReq = reqAnimFrame(animate);
			now = Date.now();
			elapsed = now - then;
		    if (elapsed > fpsInterval) {
		        then = now - (elapsed % fpsInterval);
		        drawAnimate();
		    }
		};
		//////// Тут происходит анимация
		const drawAnimate = () => {
			if (this.y + this.node.scrollHeight < 0) {
				this.randomGenerator(fpsTime);
			}
			this.moveRandomLeftOrRight();
			this.moveUp();
		}
		////// Тут происходит анимация

		startAnimate(fpsTime);
	}
}

function getRandomInt(min, max) {
	const rand = min + Math.random() * (max + 1 - min);
	return Math.floor(rand);
}

const reqAnimFrame = (function() {
    return requestAnimationFrame       ||
           mozRequestAnimationFrame    ||
           webkitRequestAnimationFrame ||
           oRequestAnimationFrame      ||
           msRequestAnimationFrame     ||
    function(callback) {
        setTimeout(callback, 1000 / 60);
    }
})();

const srcBlueButterfly = "blueButterfly.gif";
const srcBrownButterfly = "brownButterfly.gif";


const body = document.querySelector('body');

const brown = new Butterfly(srcBrownButterfly);
brown.move(60);
const brown1 = new Butterfly(srcBrownButterfly);
brown1.move(60);
const brown2 = new Butterfly(srcBrownButterfly);
brown2.move(60);
const blue = new Butterfly(srcBlueButterfly);
blue.move(60);
const blue1 = new Butterfly(srcBlueButterfly);
blue1.move(60);
const blue2 = new Butterfly(srcBlueButterfly);
blue2.move(60);