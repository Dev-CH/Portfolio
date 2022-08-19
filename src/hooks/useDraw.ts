import { useEffect } from "react"
import { useCanvas } from "./useCanvas";

type DrawCallback = (context: CanvasRenderingContext2D) => void;

export const useDraw = (draw: DrawCallback) => {
    const {context} = useCanvas();

    useEffect(() => {
        if (context) {
            return draw(context);
        }

    }, [context, draw]);
}