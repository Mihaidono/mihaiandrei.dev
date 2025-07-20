"use client";

import { useEffect, useRef } from "react";

interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ballsRef = useRef<Ball[]>([]);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createBalls = () => {
      const balls: Ball[] = [];
      const numBalls = Math.floor(window.innerWidth / 150); // Responsive number of balls

      for (let i = 0; i < numBalls; i++) {
        balls.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 50 + 20,
          opacity: Math.random() * 0.3 + 0.1,
        });
      }

      ballsRef.current = balls;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ballsRef.current.forEach((ball) => {
        // Update position
        ball.x += ball.vx;
        ball.y += ball.vy;

        // Bounce off walls
        if (ball.x < -ball.radius || ball.x > canvas.width + ball.radius) {
          ball.vx *= -1;
        }
        if (ball.y < -ball.radius || ball.y > canvas.height + ball.radius) {
          ball.vy *= -1;
        }

        // Keep balls on screen
        ball.x = Math.max(
          -ball.radius,
          Math.min(canvas.width + ball.radius, ball.x)
        );
        ball.y = Math.max(
          -ball.radius,
          Math.min(canvas.height + ball.radius, ball.y)
        );

        // Create gradient
        const gradient = ctx.createRadialGradient(
          ball.x,
          ball.y,
          0,
          ball.x,
          ball.y,
          ball.radius
        );
        gradient.addColorStop(0, `rgba(59, 130, 246, ${ball.opacity})`);
        gradient.addColorStop(0.5, `rgba(251, 146, 60, ${ball.opacity * 0.5})`);
        gradient.addColorStop(1, "rgba(219, 39, 119, 0)");

        // Draw ball
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    createBalls();
    animate();

    const handleResize = () => {
      resizeCanvas();
      createBalls();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
      }}
    />
  );
}
