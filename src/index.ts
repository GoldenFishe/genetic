import * as tf from "@tensorflow/tfjs";
// import * as tfvis from "@tensorflow/tfjs-vis";

// import img from './data/test/paper/testpaper01-00.png'

// import { Data, getData } from "./getData";
// import { Tensor } from "@tensorflow/tfjs";
//
// const IMAGE_WIDTH = 300;
// const IMAGE_HEIGHT = 300;
// const IMAGE_CHANNELS = 3;
// const NUM_OUTPUT_CLASSES = 3;
// const CLASSES = ["paper", "rock", "scissors"];
//
// function getModel() {
//   const model = tf.sequential();
//   const inputLayer = tf.layers.conv2d({
//     inputShape: [IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_CHANNELS],
//     kernelSize: 5,
//     filters: 8,
//     strides: 1,
//     activation: "relu",
//     kernelInitializer: "varianceScaling"
//   });
//   const hiddenLayer1 = tf.layers.maxPool2d({ poolSize: [2, 2], strides: [2, 2] });
//   const hiddenLayer2 = tf.layers.conv2d({
//     kernelSize: 5,
//     filters: 16,
//     strides: 1,
//     activation: "relu",
//     kernelInitializer: "varianceScaling"
//   });
//   const hiddenLayer3 = tf.layers.maxPool2d({ poolSize: [2, 2], strides: [2, 2] });
//   const hiddenLayer4 = tf.layers.flatten();
//   const outputLayer = tf.layers.dense({
//     units: NUM_OUTPUT_CLASSES,
//     kernelInitializer: "varianceScaling",
//     activation: "softmax"
//   });
//
//   model.add(inputLayer);
//   model.add(hiddenLayer1);
//   model.add(hiddenLayer2);
//   model.add(hiddenLayer3);
//   model.add(hiddenLayer4);
//   model.add(outputLayer);
//
//   const optimizer = tf.train.adam();
//   model.compile({
//     optimizer,
//     loss: "categoricalCrossentropy",
//     metrics: ["accuracy"]
//   });
//
//   return model;
// }
//
// async function train(model: tf.Sequential, data: Data) {
//   const metrics = ["loss", "val_loss", "acc", "val_acc"];
//   const container = { name: "Model Training", tab: "Model", styles: { height: "1000px" } };
//   const fitCallback = tfvis.show.fitCallbacks(container, metrics);
//
//   const BATCH_SIZE = 512;
//   const TRAIN_DATA_SIZE = 5500;
//   const TEST_DATA_SIZE = 1000;
//
//   const [trainXs, trainYs] = tf.tidy(() => {
//     const d = data.nextTrainBatch(TRAIN_DATA_SIZE);
//     return [
//       d.xs.reshape([TRAIN_DATA_SIZE, IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_CHANNELS]),
//       d.labels
//     ];
//   });
//
//   const [testXs, testYs] = tf.tidy(() => {
//     const d = data.nextTestBatch(TEST_DATA_SIZE);
//     return [
//       d.xs.reshape([TEST_DATA_SIZE, IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_CHANNELS]),
//       d.labels
//     ];
//   });
//
//   return model.fit(trainXs, trainYs, {
//     batchSize: BATCH_SIZE,
//     validationData: [testXs, testYs],
//     epochs: 10,
//     shuffle: true,
//     callbacks: fitCallback
//   });
// }
//
// function doPrediction(model: tf.Sequential, data: Data, testDataSize = 500) {
//   const testData = data.nextTestBatch(testDataSize);
//   const testxs = testData.xs.reshape([testDataSize, IMAGE_WIDTH, IMAGE_HEIGHT, 1]);
//   const labels = testData.labels.argMax(-1);
//   const preds = (model.predict(testxs) as Tensor).argMax(-1);
//
//   testxs.dispose();
//   return [preds, labels];
// }
//
// async function showAccuracy(model: tf.Sequential, data: Data) {
//   const [preds, labels] = doPrediction(model, data);
//   const classAccuracy = await tfvis.metrics.perClassAccuracy(labels, preds);
//   const container = {name: 'Accuracy', tab: 'Evaluation'};
//   tfvis.show.perClassAccuracy(container, classAccuracy, CLASSES);
//
//   labels.dispose();
// }
//
// async function showConfusion(model: tf.Sequential, data: Data) {
//   const [preds, labels] = doPrediction(model, data);
//   const confusionMatrix = await tfvis.metrics.confusionMatrix(labels, preds);
//   const container = {name: 'Confusion Matrix', tab: 'Evaluation'};
//   tfvis.render.confusionMatrix(container, {values: confusionMatrix, tickLabels: CLASSES});
//
//   labels.dispose();
// }
//
// async function main() {
//   const model = getModel();
//   const data = getData();
//   tfvis.show.modelSummary({ name: "Model Architecture", tab: "Model" }, model);
//   await train(model, data);
//
//   await showAccuracy(model, data);
//   await showConfusion(model, data);
// }
//
// main();

fetch('http://prod.knowyourdata-tfds-catalog-frontend.big-picture-knowyourdata-tfds-catalog-frontend.lu.borg.google.com/#dataset=rock_paper_scissors&tab=ITEM&select=kyd%2Frock_paper_scissors%2Flabel&item=test%5B45%25%3A47%25%5D_7').then(res => {
  console.log(res);
})

const img = './data/test/paper/testpaper01-00.png'

const image = new Image(300, 300);
image.src = img
image.onload = e => {
  console.log(e);
  tf.browser.fromPixels(image).print();
}