const fs = require("fs/promises");
const tf = require("@tensorflow/tfjs");

async function getFilenames() {
  try {
    return fs.readdir("./data/test/paper");
  } catch (err) {
    console.log(err);
  }
}

async function getFile(filename) {
  try {
    const file = await fs.readFile(`./data/test/paper/${filename}`);
    const pixelData = { width: 300, height: 300, data: file };
    return tf.browser.fromPixels(pixelData);
  } catch (err) {
    console.error(err);
  }
}

async function getData() {
  const filenames = await getFilenames();
  const data = [];
  for (let filename of filenames) {
    const file = await getFile(filename);
    data.push(file);
  }
  return tf.data.array(data);
}

async function getLabels(size) {
  const labels = [];
  for (let i = 0; i < size; i++) {
    labels.push(tf.tensor(1));
  }
  return tf.data.array(labels);
}

async function getDataset() {
  const data = await getData();
  const labels = await getLabels(data.size);
  return tf.data.zip({ xs: data, ys: labels }).batch(3)
}

module.exports = getDataset;