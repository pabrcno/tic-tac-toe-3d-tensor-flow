import * as tf from "@tensorflow/tfjs";
const aIPlay = async (
  board: Array<Array<-1 | 0 | 1>>
): Promise<Array<Array<-1 | 0 | 1>>> => {
  await tf.ready();

  const modelPath = "model/ttt_model.json";

  const model = await tf.loadLayersModel(modelPath);

  // Three board states
  const boardTensor = tf.tensor<tf.Rank.R1>(board.flat());
  console.log("paststate", board);
  // Stack states into a shape [3, 9]
  const matches = tf.stack<tf.Tensor<tf.Rank.R1>>([boardTensor]);
  const result = model.predict(matches) as tf.Tensor<tf.Rank.R1>;
  // Log the results

  const resultArray = (await result.reshape([3, 3]).array()) as Array<
    Array<number>
  >;
  let max = 0;
  resultArray.forEach((element) => {
    max = Math.max(max, Math.max(...element));
  });
  let index: [number, number] = [0, 0];
  resultArray.forEach((element, i) => {
    element.forEach((e, j) => {
      if (e === max) {
        index = [i, j];
      }
    });
  });
  return board.map((element, i) =>
    element.map((e, j) =>
      i === index[0] && j === index[1] && e !== 1 ? -1 : e
    )
  );
};
export default aIPlay;
