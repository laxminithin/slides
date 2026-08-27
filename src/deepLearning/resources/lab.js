/** BCA701 IPCC practical component — kept separate from theory lecture slides. */
export const LAB_EXPERIMENTS = [
  {
    title: 'Generate word embeddings from a corpus',
    goal: 'Build dense vector representations that capture distributional similarity between words.',
    focus: 'Tokenization → training window → embedding space inspection',
  },
  {
    title: 'Demonstrate a deep neural network classifier',
    goal: 'Train a multilayer network on a labeled classification task and report accuracy.',
    focus: 'Architecture choice → loss → train/validation split',
  },
  {
    title: 'Build a CNN for image classification',
    goal: 'Apply convolution and pooling to classify images with shared local filters.',
    focus: 'Kernel design → feature maps → classifier head',
  },
  {
    title: 'Build an autoencoder for image compression',
    goal: 'Learn a compact latent representation that reconstructs the input.',
    focus: 'Encoder → bottleneck → decoder reconstruction error',
  },
  {
    title: 'Classify textual documents',
    goal: 'Map documents to class labels using a deep text model.',
    focus: 'Representation → network → evaluation metrics',
  },
  {
    title: 'Forecast time-series data using a deep learning network',
    goal: 'Predict future values from ordered historical observations.',
    focus: 'Sequence windows → recurrent/dense model → forecast horizon',
  },
  {
    title: 'Use pretrained models for image classification',
    goal: 'Transfer a pretrained vision backbone to a target image task.',
    focus: 'Frozen features vs fine-tuning → adaptation head',
  },
  {
    title: 'Classify reviews as positive or negative',
    goal: 'Perform sentiment classification on review text.',
    focus: 'Text encoding → sequence/classifier model → polarity decision',
  },
]
