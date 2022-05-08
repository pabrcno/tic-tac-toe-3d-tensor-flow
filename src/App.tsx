import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import "./App.css";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import {
  MeshReflectorMaterial,
  OrbitControls,
  TorusKnot,
  Stars,
  Torus,
} from "@react-three/drei";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { setCell, setIsIAPlay } from "./app/tableSlice";
import { aIPlayThunk } from "./app/thunk";
import { useEffect } from "react";

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
      position={[(rowIndex - 1) * 1.6, (cellIndex - 1) * 1.3, 0]}
      ref={ref}
      scale={!hovered ? 1 : 1.1}
      onClick={() => handleCellClick(rowIndex, cellIndex)}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="pearl" />
    </mesh>
  );
};

type Props2 = {
  rowIndex: number;
  cellIndex: number;
};

const O = ({ rowIndex, cellIndex }: Props2) => {
  const ref: any = useRef();
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
    <Torus
      ref={ref}
      args={[0.4, 0.2, 32, 32]}
      position={[(rowIndex - 1) * 1.6, (cellIndex - 1) * 1.3, 0]}
    >
      <MeshReflectorMaterial
        blur={[0, 0]} // Blur ground reflections (width, heigt), 0 skips blur
        mixBlur={0} // How much blur mixes with surface roughness (default = 1)
        mixStrength={0} // Strength of the reflections
        mixContrast={0.2} // Contrast of the reflections
        resolution={256} // Off-buffer resolution, lower=faster, higher=better quality, slower
        mirror={0} // Mirror environment, 0 = texture colors, 1 = pick up env colors
        depthScale={0} // Scale the depth factor (0 = no depth, default = 0)
        minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
        maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
        depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
        reflectorOffset={0.2} // Offsets the virtual camera that projects the reflection. Useful when the reflective surface is some distance from the object's origin (default = 0)
        color="pink"
      />
    </Torus>
  );
};

const X = ({ rowIndex, cellIndex }: Props2) => {
  const ref: any = useRef();
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
    <TorusKnot
      ref={ref}
      args={[0.3, 0.2, 100, 32]}
      position={[(rowIndex - 1) * 1.6, (cellIndex - 1) * 1.3, 0]}
    >
      <MeshReflectorMaterial
        blur={[0, 0]} // Blur ground reflections (width, heigt), 0 skips blur
        mixBlur={0} // How much blur mixes with surface roughness (default = 1)
        mixStrength={0} // Strength of the reflections
        mixContrast={0.2} // Contrast of the reflections
        resolution={256} // Off-buffer resolution, lower=faster, higher=better quality, slower
        mirror={0} // Mirror environment, 0 = texture colors, 1 = pick up env colors
        depthScale={0} // Scale the depth factor (0 = no depth, default = 0)
        minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
        maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
        depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
        reflectorOffset={0.2} // Offsets the virtual camera that projects the reflection. Useful when the reflective surface is some distance from the object's origin (default = 0)
        color="lightBlue"
      />
    </TorusKnot>
  );
};

function App() {
  const { table } = useAppSelector((state: RootState) => state.table);
  const dispatch = useAppDispatch();

  const handleCellClick = (rowIndex: number, cellIndex: number) => {
    dispatch(setCell({ rowIndex, cellIndex }));

    dispatch(aIPlayThunk());
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "#000010",
      }}
    >
      <Canvas>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        {table.map((row, rowIndex) =>
          row.map((cell, cellIndex) =>
            cell === -1 ? (
              <O
                key={`${rowIndex}-${cellIndex}`}
                rowIndex={rowIndex}
                cellIndex={cellIndex}
              />
            ) : cell === 1 ? (
              <X
                key={`${rowIndex}-${cellIndex}`}
                rowIndex={rowIndex}
                cellIndex={cellIndex}
              />
            ) : (
              <Cell
                key={`${rowIndex}-${cellIndex}`}
                rowIndex={rowIndex}
                cellIndex={cellIndex}
                handleCellClick={handleCellClick}
              />
            )
          )
        )}
        <OrbitControls />
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
      </Canvas>
    </div>
  );
}

export default App;
