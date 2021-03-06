const fs = require("fs/promises");
const tf = require("@tensorflow/tfjs-node");

async function getFilenames(type, dataType) {
  try {
    return fs.readdir(`${__dirname}/data/${dataType}/${type}`);
  } catch (err) {
    console.log(err);
  }
}

async function getFile(type, filename, dataType) {
  try {
    const file = await fs.readFile(`${__dirname}/data/${dataType}/${type}/${filename}`);
    const pixelData = { width: 300, height: 300, data: file };
    return tf.browser.fromPixels(pixelData);
  } catch (err) {
    console.error(err);
  }
}

async function getData(type, dataType) {
  const filenames = await getFilenames(type, dataType);
  const data = [];
  for (let filename of filenames) {
    const file = await getFile(type, filename, dataType);
    data.push(file);
  }
  return data;
}

async function getLabels(size, label) {
  const labels = [];
  for (let i = 0; i < size; i++) {
    labels.push(tf.tensor(label));
  }
  return labels;
}

async function getTrainDataset() {
  const paperData = await getData("paper", "train");
  const rockData = await getData("rock", "train");
  const scissorsData = await getData("scissors", "train");

  const paperLabels = await getLabels(paperData.length, 1);
  const rockLabels = await getLabels(rockData.length, 2);
  const scissorsLabels = await getLabels(scissorsData.length, 3);

  // const data = paperData.concatenate(rockData).concatenate(scissorsData).map(item => {
  //   return item.div(255);
  // });
  // const labels = paperLabels.concatenate(rockLabels).concatenate(scissorsLabels);
  // const dataset = tf.data.zip({ xs: data, ys: labels });
  // console.log(dataset.size);
  // return dataset;
  return { xs: [...paperData, ...rockData, ...scissorsData], ys: [...paperLabels, ...rockLabels, ...scissorsLabels] };
}

async function getTestDataset() {
  const paperData = await getData("paper", "test");
  const rockData = await getData("rock", "test");
  const scissorsData = await getData("scissors", "test");

  const paperLabels = await getLabels(paperData.length, 1);
  const rockLabels = await getLabels(rockData.length, 2);
  const scissorsLabels = await getLabels(scissorsData.length, 3);

  // const data = paperData.concatenate(rockData).concatenate(scissorsData);
  // const labels = paperLabels.concatenate(rockLabels).concatenate(scissorsLabels);
  // return tf.data.zip({ xs: data, ys: labels });
  return { xs: [...paperData, ...rockData, ...scissorsData], ys: [...paperLabels, ...rockLabels, ...scissorsLabels] };
}

module.exports = {
  getTrainDataset,
  getTestDataset
};