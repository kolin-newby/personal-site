let cnvs = document.getElementById("homePage");
let ctx = cnvs.getContext("2d");

let hueIncrease = true;
const hueTop = 221;
const hueBottom = 161;

cnvs.width = window.innerWidth;
cnvs.height = window.innerHeight;
let spots = [];
let hue = hueBottom;

const mouse = {
  x: undefined,
  y: undefined,
};

cnvs.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
  for (let i = 0; i < 2; i++) {
    spots.push(new Particle());
  }
});

class Particle {
  constructor() {
    const mobile = window.innerWidth < 1024;
    this.x = mobile ? mouse.x : mouse.x - 150;
    this.y = mobile ? mouse.y - 80 : mouse.y;
    this.size = Math.random() * 2.5 + 0.1;
    this.speedX = Math.random() * 2;
    this.speedY = Math.random() * 2;
    this.color = "hsl(" + hue + ", 100%, 40%)";
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.1) this.size -= 0.008;
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
      spots.splice(i, 1);
      i--;
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, cnvs.width, cnvs.height);
  handleParticle();
  if (hue >= hueTop) hueIncrease = false;
  if (hue <= hueBottom) hueIncrease = true;
  if (hueIncrease) hue++;
  if (!hueIncrease) hue--;
  requestAnimationFrame(animate);
}

window.addEventListener("resize", function () {
  cnvs.width = innerWidth;
  cnvs.height = innerHeight;
});

window.addEventListener("mouseout", function () {
  mouse.x = undefined;
  mouse.y = undefined;
});

animate();
