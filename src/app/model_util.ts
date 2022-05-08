import * as tf from "@tensorflow/tfjs";
const aIPlay = async (
  table: Array<Array<-1 | 0 | 1>>
): Promise<Array<Array<-1 | 0 | 1>>> => {
  await tf.ready();

  const modelPath = "model/ttt_model.json";

  const model = await tf.loadLayersModel(modelPath);

  // Three board states
  const tableTensor = tf.tensor<tf.Rank.R1>(table.flat());
  console.log("paststate", table);
  // Stack states into a shape [3, 9]
  const matches = tf.stack<tf.Tensor<tf.Rank.R1>>([tableTensor]);
  const result = model.predict(matches) as tf.Tensor<tf.Rank.R1>;
  // Log the results
  console.log("max", result.max().dataSync());

  const position = Array.from(result.reshape([3, 3]).argMax().dataSync());

  console.log("position", position);
  console.log(
    "futurestate",
    table.map((row, i) =>
      row.map((col, j) => (i === position[1] && j === position[2] ? -1 : col))
    )
  );
  return table.map((row, i) =>
    row.map((col, j) => (i === position[1] && j === position[2] ? -1 : col))
  );
};
export default aIPlay;
