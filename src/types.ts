export interface CPD {
  steps: { [key: string]: StepData };
  initial_step_id: string;
  modelUrl: string[];
}

export interface StepData {
  step_info: {
    properties: {
      bgColor?: string;
    };
    control: {
      cameraPosX: number;
      cameraPosY: number;
      cameraPosZ: number;
      cameraLookX: number;
      cameraLookY: number;
      cameraLookZ: number;
      maxZoom: number;
      minZoom: number;
      enablePan: boolean;
      enableZoom: boolean;
      enableRotate: boolean;
      enableDamping: boolean;
    };
  };
  hotspot_disabled: boolean;
  step_model_url: ModelData[];
  hotspot: HotspotData[];
}

export interface ModelData {
  name: string;
  custom_model_type?: string;
  threedtext?: string;
  mesh_properties?: MeshProperty[];
}

export interface MeshProperty {
  name: string;
  properties: {
    position: Vector3;
    rotation: Vector3;
    scale: Vector3;
    mesh_color?: string;
    hidden?: boolean;
    mesh_transparency?: number;
  };
}

interface Vector3 {
  x: number;
  y: number;
  z: number;
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
  size?: number;
  api_content?: boolean;
}