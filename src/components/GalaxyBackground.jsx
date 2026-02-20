import { useEffect, useRef } from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';

const GalaxyBackground = () => {
  const canvasRef = useRef(null);
  
  // ✅ Move all hooks to the top level of the component
  const bgStart = useColorModeValue('#faf5ff', '#0f111a');
  const bgEnd = useColorModeValue('#f3e8ff', '#1a1f2e');
  const starColor = useColorModeValue('#9333ea', '#a855f7');
  const glowColor = useColorModeValue('rgba(168, 85, 247, 0.3)', 'rgba(168, 85, 247, 0.5)');
  const particleCount = useColorModeValue(150, 250); // ✅ Moved to top level
  const particleOpacity = useColorModeValue(0.4, 0.8); // ✅ Base opacity values
  const glowIntensity = useColorModeValue(5, 15); // ✅ Glow intensity

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();

    // Create particles - now using the values from hooks
    const createParticles = () => {
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.1,
          speedY: (Math.random() - 0.5) * 0.1,
          opacity: Math.random() * particleOpacity + 0.2,
          color: starColor,
        });
      }
    };
    createParticles();

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, bgStart);
      gradient.addColorStop(0.5, bgEnd);
      gradient.addColorStop(1, bgStart);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();

        // Add glow effect
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = glowIntensity;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;

        // Move particles
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      setCanvasSize();
      particles = [];
      createParticles();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [bgStart, bgEnd, starColor, glowColor, particleCount, particleOpacity, glowIntensity]); // ✅ Add all dependencies

  return (
    <Box
      ref={canvasRef}
      as="canvas"
      position="absolute"
      top={0}
      left={0}
      width="100%"
      height="100%"
      zIndex={0}
    />
  );
};

export default GalaxyBackground;