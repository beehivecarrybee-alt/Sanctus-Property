import { useEffect, useRef } from "react";

export function GlitterCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (!window.matchMedia("(pointer: fine)").matches) return;

    let particles: Particle[] = [];
    let mouse = { x: 0, y: 0 };
    let isActive = false;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      opacity: number;
      life: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 1.5;
        this.speedY = (Math.random() - 0.5) * 1.5;
        // Warm gold glitter colors
        const colors = ["#C9883A", "#E8B06E", "#FFD700", "#FFFFFF"];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = 1;
        this.life = 1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= 0.015;
        this.opacity = this.life;
      }

      draw() {
        if (!ctx) return;
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        
        // Draw a small diamond/star shape
        ctx.beginPath();
        ctx.moveTo(this.x, this.y - this.size);
        ctx.lineTo(this.x + this.size / 2, this.y);
        ctx.lineTo(this.x, this.y + this.size);
        ctx.lineTo(this.x - this.size / 2, this.y);
        ctx.closePath();
        ctx.fill();
      }
    }

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      isActive = true;
      
      // Emit constant particles
      for (let i = 0; i < 2; i++) {
        particles.push(new Particle(mouse.x, mouse.y));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        
        if (particles[i].life <= 0) {
          particles.splice(i, 1);
          i--;
        }
      }
      
      requestAnimationFrame(animate);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
