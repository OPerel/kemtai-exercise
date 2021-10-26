import React, {useEffect, useRef, useState} from 'react';
import './RandomAngles.css';
import drawAngle from "../../utils/anglesUtil";

interface WindowSize {
  width: number,
  height: number
}

const RandomAngle: React.FC<{counter: number}> = ({ counter }) => {

  const [windowSize, setWindowSize] = useState<WindowSize>(getCanvasSize());
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // draw a new angle every time the counter changes
  useEffect(() => {
    if (canvasRef.current) {
      drawAngle(canvasRef.current)
    }
  }, [counter]);

  // add an event listener for screen resize on mount
  useEffect(() => {
    const resizeCallback = () => {
      setWindowSize(getCanvasSize())
    };

    window.addEventListener('resize', resizeCallback);

    return () => {
      window.removeEventListener('resize', resizeCallback);
    }
  }, []);

  const { width, height } = windowSize;

  return (
    <div className="canvas-wrapper">
      <canvas ref={canvasRef} width={`${width}px`} height={`${height}px`} />
    </div>
  )
};

export default RandomAngle;

const getCanvasSize = () => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  return {
    width: w - ((10 / 100) * w),
    height: h - ((15 / 100) * h)
  }
}
