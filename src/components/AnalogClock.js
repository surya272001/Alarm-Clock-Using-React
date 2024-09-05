import React, { useRef, useEffect, useState } from 'react';

const backgroundImages = [
  '/images/background1.jpg',
  '/images/background2.jpg',
  '/images/background3.jpg'
];

function AnalogClock() {
  const canvasRef = useRef(null);
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    // Select a random background image
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    setBackgroundImage(backgroundImages[randomIndex]);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const radius = canvas.height / 2;
    const center = { x: radius, y: radius };
    const rotation = -Math.PI / 2; // Rotation of -90 degrees (counterclockwise)

    const drawClock = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background image
      const img = new Image();
      img.src = backgroundImage;
      img.onload = () => {
        // Draw the image to cover the entire canvas
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        drawClockFace(); // Ensure this is called after the image is loaded
      };
    };

    const drawClockFace = () => {
      // Draw clock face
      ctx.beginPath();
      ctx.arc(center.x, center.y, radius - 10, 0, 2 * Math.PI);
      ctx.fillStyle = 'rgba(245, 245, 245, 0.8)'; // Slightly transparent background for clock face
      ctx.fill();
      ctx.strokeStyle = '#333'; // Dark gray border
      ctx.stroke();

      // Draw clock markings and numbers
      ctx.strokeStyle = '#333'; // Dark gray markings
      ctx.fillStyle = '#333'; // Color for numbers
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = 'bold 16px Arial';

      for (let i = 0; i < 12; i++) {
        const angle = (i * Math.PI) / 6 + rotation; // Apply rotation
        const x = (radius - 25) * Math.cos(angle) + center.x;
        const y = (radius - 25) * Math.sin(angle) + center.y;

        // Draw the number
        ctx.fillText(i === 0 ? 12 : i, x, y);

        // Draw the marking
        const length = i % 3 === 0 ? 15 : 7;
        const x1 = (radius - length) * Math.cos(angle) + center.x;
        const y1 = (radius - length) * Math.sin(angle) + center.y;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(center.x + (radius - 5) * Math.cos(angle), center.y + (radius - 5) * Math.sin(angle));
        ctx.stroke();
      }

      const now = new Date();
      const seconds = now.getSeconds();
      const minutes = now.getMinutes();
      const hours = now.getHours() % 12;

      // Draw hands
      const secondAngle = (seconds / 60) * 2 * Math.PI + rotation;
      const minuteAngle = (minutes / 60) * 2 * Math.PI + rotation;
      const hourAngle = (hours / 12) * 2 * Math.PI + (minutes / 60) * (Math.PI / 6) + rotation;

      // Second hand
      ctx.beginPath();
      ctx.moveTo(center.x, center.y);
      ctx.lineTo(center.x + 90 * Math.cos(secondAngle), center.y + 90 * Math.sin(secondAngle));
      ctx.strokeStyle = 'red'; // Colorful second hand
      ctx.lineWidth = 2;
      ctx.stroke();

      // Minute hand
      ctx.beginPath();
      ctx.moveTo(center.x, center.y);
      ctx.lineTo(center.x + 75 * Math.cos(minuteAngle), center.y + 75 * Math.sin(minuteAngle));
      ctx.strokeStyle = 'blue'; // Colorful minute hand
      ctx.lineWidth = 4;
      ctx.stroke();

      // Hour hand
      ctx.beginPath();
      ctx.moveTo(center.x, center.y);
      ctx.lineTo(center.x + 50 * Math.cos(hourAngle), center.y + 50 * Math.sin(hourAngle));
      ctx.strokeStyle = 'green'; // Colorful hour hand
      ctx.lineWidth = 6;
      ctx.stroke();
    };

    drawClock();

    const intervalId = setInterval(drawClock, 1000);

    return () => clearInterval(intervalId);
  }, [backgroundImage]);

  return <canvas ref={canvasRef} width={200} height={200} className="analog-clock" />;
}

export default AnalogClock;
