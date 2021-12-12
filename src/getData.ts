import { Tensor } from "@tensorflow/tfjs";
import {readdir} from 'fs/promises'


export function getData() {
  try {
    const f = readdir('/data/test/paper');
    console.log(f);
  }
}

export interface Data {
  nextTrainBatch: (size: number) => Batch;
  nextTestBatch: (size: number) => Batch;
}

export type Batch = {
  xs: Tensor
  labels: Tensor
}