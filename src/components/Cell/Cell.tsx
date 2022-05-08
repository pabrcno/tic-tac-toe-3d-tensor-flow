import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";

type Props = {
  rowIndex: number;
  cellIndex: number;
  handleCellClick: (rowIndex: number, cellIndex: number) => void;
};

const Cell = ({ rowIndex, cellIndex, handleCellClick }: Props) => {
  const ref: any = useRef();
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    ref.current!.position.y += Math.sin(t) * 0.001;
    ref.current.rotation.set(
      0.1 + Math.cos(t / 4.5) / 10,
      Math.sin(t / 4) / 4,
      0.1 - (1 + Math.sin(t / 4)) / 8
    );
  });

  return (
    <mesh
      position={[(rowIndex - 1) * 1.6, (cellIndex - 1) * 1.4, 0]}
      ref={ref}
      scale={!hovered ? 1 : 1.1}
      onClick={() => handleCellClick(rowIndex, cellIndex)}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
    >
      <boxGeometry args={[0.9, 0.9, 0.9]} />
      <meshStandardMaterial color="pearl" />
    </mesh>
  );
};

export default Cell;
