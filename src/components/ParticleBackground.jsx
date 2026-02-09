import React, { useEffect } from "react";

const ParticleBackground = () => {
  useEffect(() => {
    const canvas = document.getElementById("particleCanvas");
    const ctx = canvas.getContext("2d");
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.8 + 0.2;
        this.speedY = Math.random() * 0.8 + 0.2;
        this.color = document.body.classList.contains("light")
          ? "rgba(94,44,165,0.6)"
          : "rgba(175,105,253,0.6)";
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > W) this.x = 0;
        if (this.y > H) this.y = 0;
      }
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    let particles = [];
    for (let i = 0; i < 250; i++) particles.push(new Particle());

    function animate() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    }
    animate();

    // Resize handler
    const handleResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      particles.forEach((p) => p.reset());
    };
    window.addEventListener("resize", handleResize);

    // Theme observer (for dark/light switch)
    const observer = new MutationObserver(() => {
      particles.forEach(
        (p) =>
          (p.color = document.body.classList.contains("light")
            ? "rgba(94,44,165,0.6)"
            : "rgba(175,105,253,0.6)")
      );
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, []);

  return <canvas id="particleCanvas"></canvas>;
};

export default ParticleBackground;
