type AnimateCallback<T> = (self: T) => void;

export interface CanvasElementOptions {
    x: number,
    y: number,
    color: string,
}

export class CanvasElement {
    x: number;
    y: number;
    color: string;

    constructor({
        x,
        y,
        color,
    }: CanvasElementOptions) {
        this.x = x;
        this.y = y;
        this.color = color;
    }
    
    draw(context: CanvasRenderingContext2D): void {
        throw new Error('Implementation missing.');
    };

    animate(context: CanvasRenderingContext2D, callback: AnimateCallback<typeof this>) {
        callback(this);
        this.draw(context);
    }
}