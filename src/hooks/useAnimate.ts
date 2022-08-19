import { useEffect } from "react"
import { useCanvas } from "./useCanvas";

type AnimateCallback = (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void;

export const useAnimation = (draw: AnimateCallback) => {
    const {context, canvas, registerAnimation} = useCanvas();

    useEffect(() => {
        if (!context || !canvas || !registerAnimation) {
            return;
        }

        registerAnimation(draw);
    }, [context, canvas]);
}