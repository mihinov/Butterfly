class Butterfly {
	constructor(srcButterfly) {
		const calcTraectory = () => {
			this.widthWindow = window.innerWidth;
			this.heightWindow = window.innerHeight;
			this.randomGenerator();
		}
		this.srcButterfly = srcButterfly;
		window.addEventListener('resize', calcTraectory);
		calcTraectory();
		this.draw();
	}

	randomGenerator() {
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

	moveUp(factor) {
		this.y = this.y - factor;
		this.node.style.left = this.x + 'px';
		this.node.style.top = this.y + 'px';
	}

	moveRight(factor) {
		this.x = this.x + factor;
		this.node.style.left = this.x + 'px';
	}

	moveLeft(factor) {
		this.x = this.x - factor;
		this.node.style.left = this.x + 'px';
	}

	moveRandomLeftOrRight(factor) {
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

		this[ "move" + f.direction ](factor);
	}

	move(factor = 1) {
		const animate = () => {
			if (this.y + this.node.scrollHeight < 0) {
				this.randomGenerator();
			}
			this.moveRandomLeftOrRight(factor);
			this.moveUp(factor);
			reqAnimFrame(animate);
		}
		reqAnimFrame(animate);
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
brown.move();
const brown1 = new Butterfly(srcBrownButterfly);
brown1.move();
const brown2 = new Butterfly(srcBrownButterfly);
brown2.move();
const blue = new Butterfly(srcBlueButterfly);
blue.move();
const blue1 = new Butterfly(srcBlueButterfly);
blue1.move();
const blue2 = new Butterfly(srcBlueButterfly);
blue2.move();