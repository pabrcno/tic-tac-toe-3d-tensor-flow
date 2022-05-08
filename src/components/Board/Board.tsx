import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setCell } from "../../app/boardSlice";
import { aIPlayThunk } from "../../app/thunk";
import { RootState } from "../../app/store";
import O from "../O/O";
import X from "../X/X";
import Cell from "../Cell/Cell";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";

const Board = () => {
  const { board } = useAppSelector((state: RootState) => state.board);
  const dispatch = useAppDispatch();

  const handleCellClick = (rowIndex: number, cellIndex: number) => {
    dispatch(setCell({ rowIndex, cellIndex }));
    dispatch(aIPlayThunk());
  };
  return (
    <div className="mainContainer">
      <Canvas>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
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

        <group>
          {board.map((row, rowIndex) =>
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
        </group>
      </Canvas>
    </div>
  );
};

export default Board;
