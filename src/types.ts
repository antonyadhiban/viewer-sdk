export interface CPD {
  steps: { [key: string]: StepData };
  initial_step_id: string;
  modelUrl: string[];
}

export interface StepData {
  step_info: {
    control: {
      cameraPosX: number;
      cameraPosY: number;
      cameraPosZ: number;
      // Add other control properties as needed
    };
  };
  step_model_url: ModelData[];
  hotspot: HotspotData[];
}

export interface ModelData {
  name: string;
  mesh_properties: any[]; // Define a more specific type if possible
}

export interface HotspotData {
  xPos: number;
  yPos: number;
  zPos: number;
  title: string;
  bgColor?: string;
  textColor?: string;
  goToStep?: string;
  api_url?: string;
  polling_interval?: number;
}