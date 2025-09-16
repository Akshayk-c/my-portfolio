// floating-code-background.js

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
document.body.appendChild(canvas);

// Styling the canvas
canvas.style.position = "fixed";
canvas.style.top = 0;
canvas.style.left = 0;
canvas.style.zIndex = -1;
canvas.style.pointerEvents = "none";
canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Resize support
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Keywords to float
const keywords = [
  "const", "let", "=>", "function", "return", "if", "else", "async", "await", 
  "MongoDB", "Express", "Node", "React", "require", "import", "export",
  "API", "REST", "CRUD", "SQL", "NoSQL", "JWT", "OAuth", "TypeScript", "npm", "yarn", "Promise", "callback", "middleware", "router", "controller", "service", "model", "schema", "dotenv", "bcrypt", "hash", "token", "session", "cookie", "CORS", "fetch", "axios", "async/await", "try/catch", "error", "logger", "debug", "unit test", "Mocha", "Chai", "Jest", "supertest", "Docker", "CI/CD", "Git", "branch", "merge", "pull", "push", "commit", "origin", "main", "master", "dev", "prod", "staging"
];

class FloatingText {
  constructor() {
    this.reset();
  }

  reset() {
    this.text = keywords[Math.floor(Math.random() * keywords.length)];
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.speed = 0.3 + Math.random();
    this.size = 12 + Math.random() * 10;
    this.opacity = 0.3 + Math.random() * 0.7;
  }

  update() {
    this.y -= this.speed;
    if (this.y < -20) this.reset();
  }

  draw(ctx) {
    ctx.font = `${this.size}px monospace`;
    ctx.fillStyle = `rgba(237, 237, 237, ${this.opacity})`;
    ctx.fillText(this.text, this.x, this.y);
  }
}

const floatingTexts = Array.from({ length: 40 }, () => new FloatingText());

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  floatingTexts.forEach(text => {
    text.update();
    text.draw(ctx);
  });

  requestAnimationFrame(animate);
}

animate();
