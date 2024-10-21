
const canvas = document.getElementById("homePage");
const ctx = canvas.getContext("2d");
const maxParticlesFollowMode = 200;

let followMode = false;
let lum = "0%";

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let spots = [];

const mouse = {
    x: undefined,
    y: undefined
}

canvas.addEventListener("mousemove", function (event) {
    if (!followMode) return;
    mouse.x = event.x;
    mouse.y = event.y;
    for (let i = 0; i < 2; i++) {
        spots.push(new Particle());
    }
});

function mobileEffect (event) {
    if (followMode) return;
    for (let i = 0; i < maxParticlesFollowMode; i++) {
        spots.push(new Particle());
    }
}


function getRandomInt(min, max) {
    return Math.random() * (max - min) + min;
}

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
            let changeProbX = Math.random();
            let changeProbY = Math.random();
            let directionProbX = Math.random();
            let directionProbY = Math.random();

            let adjustmentX = 0;
            let adjustmentY = 0;

            if (changeProbX > 0.1) {
                adjustmentX = Math.random()/3;
                if (directionProbX > 0.5) adjustmentX = adjustmentX / -1;
            }
            if (changeProbY > 0.1) {
                adjustmentY = Math.random()/3;
                if (directionProbY > 0.5) adjustmentY = adjustmentY / -1;
            }

            let speedX = this.speedX + adjustmentX;
            let speedY = this.speedY + adjustmentY;

            this.x = (this.x + speedX) % window.innerWidth;
            this.y = (this.y + speedY) % window.innerHeight;
            // if (this.size > 0.1) this.size -= 0.006;
        }
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function handleParticle() {
    for (let i = 0; i < spots.length; i++) {
        spots[i].update();
        spots[i].draw();
        for (let j = i; j < spots.length; j++) {
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

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

window.addEventListener('mouseout', function () {
    mouse.x = undefined;
    mouse.y = undefined;
})

animate();
mobileEffect();
