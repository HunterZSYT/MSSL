export interface AIModel {
  id: string;
  name: string;
  rates: {
    text?: number;
    image?: number;
    audio?: number;
    video?: number;
    model3d?: number;
  };
  unit: string;
  service: 'text' | 'image' | 'audio' | 'video' | 'model3d';
  description?: string;
}

export const AI_MODELS: AIModel[] = [
  {
    id: 'EleutherAI/gpt-j-6B',
    name: 'EleutherAI/gpt-j-6B',
    rates: { text: 0.10 },
    unit: 'prompt',
    service: 'text',
  },
  {
    id: 'bigscience/bloom-7b1',
    name: 'bigscience/bloom-7b1',
    rates: { text: 0.10 },
    unit: 'prompt',
    service: 'text',
  },
  {
    id: 'meta-llama/Llama-2-7b-chat',
    name: 'meta-llama/Llama-2-7b-chat',
    rates: { text: 0.10 },
    unit: 'prompt',
    service: 'text',
  },
  {
    id: 'google/flan-t5-xl',
    name: 'google/flan-t5-xl',
    rates: { text: 0.10 },
    unit: 'prompt',
    service: 'text',
  },
  {
    id: 'text-davinci-003',
    name: 'text-davinci-003',
    rates: { text: 0.10 },
    unit: 'prompt',
    service: 'text',
  },
  {
    id: 'stabilityai/stable-diffusion-v1-5',
    name: 'stabilityai/stable-diffusion-v1-5',
    rates: { image: 1.17 },
    unit: 'image',
    service: 'image',
  },
  {
    id: 'runwayml/stable-diffusion-xl',
    name: 'runwayml/stable-diffusion-xl',
    rates: { image: 1.17 },
    unit: 'image',
    service: 'image',
  },
  {
    id: 'deepfloyd/IF-I-XL-v1.0',
    name: 'deepfloyd/IF-I-XL-v1.0',
    rates: { image: 1.17 },
    unit: 'image',
    service: 'image',
  },
  {
    id: 'stabilityai/stable-diffusion-2-1',
    name: 'stabilityai/stable-diffusion-2-1',
    rates: { image: 1.17 },
    unit: 'image',
    service: 'image',
  },
  {
    id: 'suno/bark',
    name: 'suno/bark',
    rates: { audio: 0.50 }, // rate of 0.10 for every 5 seconds
    unit: 'clip',
    service: 'audio',
    description: '(up to 5 s)',
  },
  {
    id: 'tts_models/en/ljspeech/vits',
    name: 'tts_models/en/ljspeech/vits',
    rates: { audio: 0.50 },// rate of 0.10 for every 5 seconds
    unit: 'clip',
    service: 'audio',
    description: '(up to 5 s)',
  },
  {
    id: 'facebook/tts_transformer-es-en',
    name: 'facebook/tts_transformer-es-en',
    rates: { audio: 0.50 },// rate of 0.10 for every 5 seconds
    unit: 'clip',
    service: 'audio',
    description: '(up to 5 s)',
  },
  {
    id: 'runwayml/stablevideo-diffusion',
    name: 'runwayml/stablevideo-diffusion',
    rates: { video: 0.18 }, // rate of 0.06 for every 3 seconds
    unit: 'clip',
    service: 'video',
    description: '(up to 3 s)',
  },
  {
    id: 'damo/cogvideo',
    name: 'damo/cogvideo',
    rates: { video: 0.18 }, // rate of 0.06 for every 3 seconds
    unit: 'clip',
    service: 'video',
    description: '(up to 3 s)',
  },
  {
    id: 'CompVis/dreamfusion',
    name: 'CompVis/dreamfusion',
    rates: { model3d: 2.33 },
    unit: 'model',
    service: 'model3d',
  },
  {
    id: 'dreamfusion-3d',
    name: 'dreamfusion-3d',
    rates: { model3d: 2.33 },
    unit: 'model',
    service: 'model3d',
  },
];
