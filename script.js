class Shooter {
  constructor(xPos, yPos, straal, speedX, speedY) {
    this.x = xPos;
    this.y = yPos;
    this.s = straal;
    this.speedX = speedX;
    this.speedY = speedY;
  }

  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.s, Math.PI * 2, false);
    context.fillStyle = "red";
    context.fill();
  }
}

class Enemies {
  constructor(xPos, yPos, width, height, speedX, speedY) {
    this.x = xPos;
    this.y = yPos;
    this.w = width;
    this.h = height;
    this.speedX = speedX;
    this.speedY = speedY;
  }

  draw(context) {
    context.fillStyle = "blue";
    context.fillRect(this.x, this.y, this.w, this.h);
  }
}

class Projectiles {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }

  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, Math.PI * 2, false);
    context.fillStyle = this.color;
    context.fill();
  }

  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector("canvas");
  const context = canvas.getContext("2d");
  let shooter = new Shooter(300, 600, 10, 1, 1);
  let enemy = new Enemies(200, 50, 20, 40, 10, 10);
  let shooterSpeed = 0.1;
  let projectiles = [];

  document.addEventListener("mousemove", function (event) {
    let rect = canvas.getBoundingClientRect();
    let mouseX = event.clientX - rect.left;
    let mouseY = event.clientY - rect.top;

    // Calculate the difference between the shooter's current position and the mouse's position
    let dx = mouseX - shooter.s - shooter.x;
    let dy = mouseY - shooter.s - shooter.y;

    shooter.x += (dx * shooterSpeed) / 1.5;
    shooter.y += (dy * shooterSpeed) / 1.5;
  });

  document.addEventListener("click", function (event) {
    let rect = canvas.getBoundingClientRect();
    let mouseX = event.clientX - rect.left;
    let mouseY = event.clientY - rect.top;

    const angle = Math.atan2(mouseY - shooter.y, mouseX - shooter.x);
    const velocity = {
      x: Math.cos(angle) * 20,
      y: Math.sin(angle) * 20,
    };

    const projectile = new Projectiles(
      shooter.x,
      shooter.y,
      5,
      "orange",
      velocity
    );
    projectiles.push(projectile);
  });

  function Animate() {
    //Draw Canvas and Clear Canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);

    //Draw Objects
    shooter.draw(context);
    enemy.draw(context);
    //Only draw enemy if enemy exists
    if (enemy) {
      enemy.draw(context);
    }
    //Draw and Update each projectile
    projectiles.forEach((projectile, index) => {
      projectile.draw(context);
      projectile.update();

      //Remove Projectiles that have gone off screen
      if (
        projectile.x < 0 ||
        projectile.x > canvas.width ||
        projectile.y < 0 ||
        projectile.y > canvas.height
      ) {
        setTimeout(() => {
          projectiles.splice(index, 1);
        }, 0);
      }

      //Collision Detection
      if (
        projectile.x + projectile.radius >= enemy.x &&
        projectile.x - projectile.radius <= enemy.x + enemy.w &&
        projectile.y + projectile.radius >= enemy.y &&
        projectile.y - projectile.radius <= enemy.y + enemy.h
      ) {
        //code here
        projectiles.splice(index, 1);
        enemy = null;
      }
    });

    if (!enemy) {
      const xPos = Math.random() * (canvas.width - 100) + 50;
      const yPos = Math.random() * (canvas.width - 100) + 50;
      enemy = new Enemies(xPos, yPos, 20, 40, 4, 4);
    }
    //Animate
    requestAnimationFrame(Animate);
  }
  Animate();
});
