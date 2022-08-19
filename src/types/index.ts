import React from "react";

export interface CanvasComponent<P = {}> extends React.FC<P> {
    (props: P, context?: any): null;
}

export type DrawColour = string | CanvasGradient | CanvasPattern;