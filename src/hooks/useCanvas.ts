import {useContext} from 'react';
import {CanvasContext, CanvasContextInterface} from '../context/CanvasContext';

export const useCanvas = (): CanvasContextInterface => useContext<CanvasContextInterface>(CanvasContext);
