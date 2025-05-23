const canvas = document.getElementById("homePage");
const ctx = canvas.getContext("2d");
const maxParticlesFollowMode = 100;
var followMode = false;
var lum = "0%";
var spots = [];
const mouse = {
    x: undefined,
    y: undefined
}

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
    constructor() {
        //adjust x and y here for offsets from nav-bars and such
        this.x = followMode ? mouse.x : getRandomInt(0, window.innerWidth);
        this.y = followMode ? mouse.y :  getRandomInt(0, window.innerHeight);
        this.size = Math.random() * 2.5;
        this.speedX = Math.random() * 2;
        this.speedY = Math.random() * 2;
        this.color = "hsl(356, 0%, " + lum + ")";
    }
    update() {
        if (followMode) {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.size > 0.1) this.size -= 0.006;
        } else {
            var changeProbX = Math.random();
            var changeProbY = Math.random();
            var directionProbX = Math.random();
            var directionProbY = Math.random();

            var adjustmentX = 0;
            var adjustmentY = 0;

            if (changeProbX > 0.1) {
                adjustmentX = Math.random()/3;
                if (directionProbX > 0.5) adjustmentX = adjustmentX / -1;
            }
            if (changeProbY > 0.1) {
                adjustmentY = Math.random()/3;
                if (directionProbY > 0.5) adjustmentY = adjustmentY / -1;
            }

            var speedX = this.speedX + adjustmentX;
            var speedY = this.speedY + adjustmentY;

            this.x = (this.x + speedX) % window.innerWidth;
            this.y = (this.y + speedY) % window.innerHeight;
        }
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Functions =================================================================================

function mobileEffect (event) {
    for (var i = 0; i < maxParticlesFollowMode; i++) {
        spots.push(new Particle());
    }
}

function getRandomInt(min, max) {
    return Math.random() * (max - min) + min;
}

function handleParticle() {
    for (var i = 0; i < spots.length; i++) {
        spots[i].update();
        spots[i].draw();
        for (var j = i; j < spots.length; j++) {
            const dx = spots[i].x - spots[j].x;
            const dy = spots[i].y - spots[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 90) {
                ctx.beginPath();
                ctx.strokeStyle = spots[i].color;
                ctx.lineWidth = spots[i].size / 10;
                ctx.moveTo(spots[i].x, spots[i].y);
                ctx.lineTo(spots[j].x, spots[j].y);
                ctx.stroke();
            }
        }
        if (spots[i].size <= 0.3) {
            spots.splice(i, 1); i--;
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticle();
    requestAnimationFrame(animate);
}

// Event Listeners ============================================================================

if (followMode) {
    canvas.addEventListener("mousemove", function (event) {
        mouse.x = event.x;
        mouse.y = event.y;
        for (var i = 0; i < 2; i++) {
            spots.push(new Particle());
        }
    });
}

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

window.addEventListener('mouseout', function () {
    mouse.x = undefined;
    mouse.y = undefined;
})

// ============================================================================================

animate();
if (!followMode) mobileEffect();