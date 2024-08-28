import { Suspense, useEffect, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, Text } from '@react-three/drei';
import { StepData } from '../types';
import Model from './Model';
import Hotspot from './Hotspot';
import * as THREE from 'three';
import { Root } from '@react-three/uikit';

interface StepProps {
  stepData: StepData;
  onStepChange: (nextStepId: string) => void;
  modelUrls: string[];
}

const Step: React.FC<StepProps> = ({ stepData, onStepChange, modelUrls }) => {
  const { scene } = useThree();
  const [hotspotsEnabled, setHotspotsEnabled] = useState(!stepData.hotspot_disabled);

  useEffect(() => {
    if (stepData.step_info.properties.bgColor) {
      scene.background = new THREE.Color(stepData.step_info.properties.bgColor);
    }
    setHotspotsEnabled(!stepData.hotspot_disabled);
  }, [stepData, scene]);

  const { cameraPosX, cameraPosY, cameraPosZ, cameraLookX, cameraLookY, cameraLookZ } = stepData.step_info.control;
  const { maxZoom, minZoom, enablePan, enableZoom, enableRotate, enableDamping } = stepData.step_info.control;

  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={[cameraPosX, cameraPosY, cameraPosZ]}
      />
      <OrbitControls
        maxZoom={maxZoom}
        minZoom={minZoom}
        enablePan={enablePan}
        enableZoom={enableZoom}
        enableRotate={enableRotate}
        enableDamping={enableDamping}
        target={[cameraLookX, cameraLookY, cameraLookZ]}
      />

      {stepData.step_model_url.map((modelData, index) => {
        const modelUrl = modelUrls.find(url => url.includes(modelData.name));
        return modelUrl ? (
          <Suspense key={index} fallback={null}>
            <Model modelData={modelData} modelUrl={modelUrl} />
          </Suspense>
        ) : null;
      })}

      {hotspotsEnabled && stepData.hotspot.map((hotspotData, index) => (
        <Hotspot key={index} hotspotData={hotspotData} onStepChange={onStepChange} />
      ))}


      {stepData.step_model_url
        .filter(model => model.custom_model_type === "3D text")
        .map((textData, index) => {
          const textProperties = textData.mesh_properties.find(prop => prop.name === textData.name)?.properties || {};
          const { position, rotation, scale } = textProperties;
          const color = textProperties.mesh_color || '#ffffff';
          return (
            <Text
              key={index}
              position={[position.x, position.y, position.z]}
              rotation={[rotation.x, rotation.y, rotation.z]}
              scale={[scale.x, scale.y, scale.z]}
              color={color}
            >
              {textData.threedtext}
            </Text>
          );
        })}
    </>
  );
};

export default Step;