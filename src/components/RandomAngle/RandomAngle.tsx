import React, {useEffect, useRef, useState} from 'react';
import './RandomAngles.css';
import drawAngle from "../../utils/anglesUtil";

const RandomAngle: React.FC<{counter: number}> = ({ counter }) => {

  const [windowSize, setWindowSize] = useState<{width: number, height: number}>(getCanvasSize());
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      drawAngle(canvasRef.current)
    }
  }, [counter]);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowSize(getCanvasSize())
    })
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
