import { useEffect } from 'react';
import { Particle } from '../canvas/Particle';
import { useAnimation } from '../hooks/useAnimate';
import { useCanvas } from '../hooks/useCanvas';
import { CanvasComponent } from '../types';

/**
 * 
 * TODO: Add position as option.
 * 
 */
export const Galaxy: CanvasComponent = () => {
    const {canvas} = useCanvas();

    const particles: Particle[] = [];
    const total = 1000;

    const colors = [
        '#571D56',
        '#25245D',
        '#195778',
        '#159097',
        '#36A58C',
        '#F9CF92',
    ];

    useEffect(() => {
        if (!canvas) {
            return;
        }

        const canvasHeight = canvas.height + canvas.width;
        const canvasWidth = canvas.width + canvas.height;

        for (let i = 0; i < total; i++) {
            const x = Math.random() * canvasWidth - canvasWidth/2;
            const y = Math.random() * canvasHeight - canvasHeight/2;

            particles.push(new Particle({
                x: x,
                y: y,
                radius: Math.random() * 1,
                color: colors[Math.floor(Math.random() * colors.length)],
            }));                
        }
    });


    let mouseDown = false;
    useEffect(() => {
        addEventListener('mousedown', () => mouseDown = true);
        addEventListener('mouseup', () => mouseDown = false);

        return removeEventListener('mousedown mouseup', () => null); 
    });

    let radians = 0;
    let alpha = 1;

    useAnimation((context, canvas) => {
        context.fillStyle = `rgba(25, 22, 29, ${alpha})`;
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.save();
        context.translate(canvas.width/2, canvas.height/2);
        context.rotate(radians);

        particles.forEach(particle => {
            particle.draw(context);
        });
        
        context.restore();

        radians += (mouseDown) ? 0.001 : 0.0005;

        if (mouseDown && alpha > 0.1) {
            alpha -= 0.05;
        }

        if (!mouseDown && alpha < 1) {
            alpha += 0.005;
        }
    });

    return null;
}