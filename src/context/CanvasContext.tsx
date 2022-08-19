import React, {PropsWithChildren, useRef, useEffect, useState} from 'react';

export interface CanvasContextInterface {
    canvas: HTMLCanvasElement|null,
    context: CanvasRenderingContext2D|null,
    registerAnimation?: (animation: AnimateCallback) => void,
}

const defaultContext = {
    canvas: null,
    context: null,
};

export const CanvasContext = React.createContext<CanvasContextInterface>(defaultContext);

interface CanvasProps extends PropsWithChildren {
    animate?: boolean,
    width?: number,
    height?: number,
}

type AnimateCallback = (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void;

export const CanvasProvider: React.FC<CanvasProps> = ({
    children,
    height,
    width,
    animate = true,
}) => {
    const canvasRef = useRef<HTMLCanvasElement|null>(null);
    const [contextValues, setContextValues] = useState<CanvasContextInterface>(defaultContext);
    const [renderSwitch, setRenderSwitch] = useState(false); // State update to force fresh init.
    const [animation, setAnimation] = useState<AnimateCallback[]>();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) {
            return;
        }

        setContextValues({
            canvas: canvasRef.current,
            context: canvasRef.current?.getContext('2d') ?? null,
        });

        canvas.height = height ?? window.innerHeight;
        canvas.width = width ?? window.innerWidth;

        addEventListener('resize', () => {
            canvas.height = height ?? window.innerHeight;
            canvas.width = width ?? window.innerWidth;
            setRenderSwitch(!renderSwitch);
        });

        return removeEventListener('resize', () => null);
    }, [canvasRef]);

    // Animation loop.
    useEffect(() => {
        if (!contextValues.context || !contextValues.canvas || !animation) {
            return;
        }

        let id = 0;
        const update = () => {
            animation.forEach((anim) => {
                anim.call(this, contextValues.context!, contextValues.canvas!);
            });

            id = requestAnimationFrame(update);
        }
        
        if (!animate) {
            return () => {
                cancelAnimationFrame(id);
            }    
        }

        update();

        return () => {
            cancelAnimationFrame(id);
        }
    }, [animation, animate]);

    return (
        <CanvasContext.Provider
            value={{
                ...contextValues,
                registerAnimation: (animation: AnimateCallback) => setAnimation([animation]),
            }}
        >
            <canvas ref={canvasRef}>
                {children}
            </canvas>
        </CanvasContext.Provider>
    )
}