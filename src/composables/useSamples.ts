import { reactive } from "vue";

export interface Sample {
  name: string;
  file: string;
}

const SAMPLES: Record<string, string> = {
  BrahWiMeSample: "BrahWiMeSample.musicxml",
  BrookeWestSample: "BrookeWestSample.musicxml",
};

export function useSamples() {
  const samples = reactive<Sample[]>(
    Object.entries(SAMPLES).map(([name, file]: [string, string]) => ({
      name,
      file,
    })),
  );

  const getSamplePath = (sampleFile: string): string => {
    return `/${sampleFile}`;
  };

  return {
    samples,
    getSamplePath,
  };
}
