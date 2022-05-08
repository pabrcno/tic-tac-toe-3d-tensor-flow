import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import Board from "./../Board/Board";

type Props = {
  children: React.ReactNode;
};

const Canva = ({ children }: Props) => {
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
      </Canvas>
    </div>
  );
};
export default Canva;
