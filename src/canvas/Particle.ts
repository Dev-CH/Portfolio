import { CanvasElement, CanvasElementOptions } from "./CanvasElement";

interface ParticleOptions extends CanvasElementOptions {
    radius: number,
}

class Particle  extends CanvasElement {
    radius: number;
    
    constructor({radius, ...options}: ParticleOptions) {
        super(options);

        this.radius = radius;
    }

    draw(context: CanvasRenderingContext2D) {
        context.beginPath();

        context.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        context.fillStyle = this.color;
        context.shadowColor = this.color;
        context.shadowBlur = this.radius * 3;
    
        context.fill();
        context.closePath();
    }

}

export {Particle};