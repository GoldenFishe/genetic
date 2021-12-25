const tf = require("@tensorflow/tfjs-node");

const { getTrainDataset, getTestDataset } = require("./getData");

const IMAGE_WIDTH = 300;
const IMAGE_HEIGHT = 300;
const IMAGE_CHANNELS = 3;
const NUM_OUTPUT_CLASSES = 3;
const CLASSES = ["paper", "rock", "scissors"];

function getModel() {
  const model = tf.sequential({
    layers: [
      tf.layers.conv2d({
        inputShape: [IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_CHANNELS],
        kernelSize: 64,
        filters: 8,
        strides: 1,
        activation: "relu",
        kernelInitializer: "varianceScaling"
      }),
      tf.layers.maxPool2d({ poolSize: [2, 2], strides: [2, 2] }),
      tf.layers.conv2d({
        kernelSize: 64,
        filters: 8,
        strides: 1,
        activation: "relu",
        kernelInitializer: "varianceScaling"
      }),
      tf.layers.maxPool2d({ poolSize: [2, 2], strides: [2, 2] }),
      tf.layers.flatten(),
      tf.layers.dense({ units: NUM_OUTPUT_CLASSES, kernelInitializer: "varianceScaling", activation: "softmax" })
    ]
  });

  const optimizer = tf.train.adam();
  model.compile({
    optimizer,
    loss: "categoricalCrossentropy",
    metrics: ["accuracy"]
  });

  return model;
}

async function train(model, trainDataset, testDataset) {
  console.log("start");
  const history = await model.fitDataset(trainDataset, {
    epochs: 5,
    validationData: testDataset,
    callbacks: {
      onEpochEnd: (epoch, logs) => console.log(logs.loss)
    }
  });
  console.log(history);
  console.log("end");
}

async function main() {
  const model = getModel();
  const [trainDataset, testDataset] = await Promise.all([getTrainDataset(), getTestDataset()]);
  await train(model, trainDataset, testDataset);
}

main();