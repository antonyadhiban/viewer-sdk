import { Box, useGLTF } from '@react-three/drei';
import { ModelData } from '../types';
import { useEffect } from 'react';

interface ModelProps {
  modelUrl: string;
  modelData: ModelData;
}

const Model: React.FC<ModelProps> = ({ modelUrl, modelData }) => {
  // const { scene } = useGLTF(modelUrl);
  // const { position, rotation, scale } = modelProperties;
  const { scene, nodes } = useGLTF(modelUrl);


  useEffect(() => {
    if (scene) {
      modelData.mesh_properties.forEach(meshProp => {
        if (typeof meshProp.properties === 'object') {
          console.log(meshProp.properties);
        const mesh = scene.getObjectByName(meshProp.name);
        if (mesh) {
          const { position, rotation, scale } = meshProp.properties;
          if (position) mesh.position.set(position.x, position.y, position.z);
          if (rotation) mesh.rotation.set(rotation.x, rotation.y, rotation.z);
          if (scale) mesh.scale.set(scale.x, scale.y, scale.z);
          
          if (meshProp.properties.hidden !== undefined) {
            mesh.visible = !meshProp.properties.hidden;
          }
          if (meshProp.properties.mesh_color) {
            mesh.material.color.setStyle(meshProp.properties.mesh_color);
          }
          if (meshProp.properties.mesh_transparency !== undefined) {
            mesh.material.opacity = 1 - meshProp.properties.mesh_transparency;
            mesh.material.transparent = mesh.material.opacity < 1;
          }
        }
      }
      });
    }
  }, [modelData, nodes]);

  
  return <primitive object={scene} />;
};

export default Model;