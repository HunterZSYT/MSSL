export interface AIModel {
  id: string;
  name: string;
  rates: {
    text: number;
    image: number;
    audio: number;
    video: number;
    model3d: number;
  };
}

export const AI_MODELS: AIModel[] = [
  {
    id: 'gemini-pro',
    name: 'Gemini Pro',
    rates: {
      text: 1,
      image: 5,
      audio: 50,
      video: 100,
      model3d: 100,
    },
  },
  {
    id: 'gpt-4',
    name: 'GPT-4',
    rates: {
      text: 2,
      image: 8,
      audio: 60,
      video: 120,
      model3d: 120,
    },
  },
  {
    id: 'llama-2',
    name: 'LLama 2',
    rates: {
      text: 0.5,
      image: 3,
      audio: 40,
      video: 80,
      model3d: 80,
    },
  },
];
