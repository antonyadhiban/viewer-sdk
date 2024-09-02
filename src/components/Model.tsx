import { useGLTF } from '@react-three/drei';
import { ModelData, MeshProperty } from '../types';
import { useEffect } from 'react';
import { Mesh } from 'three';

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
      modelData.mesh_properties?.forEach((meshProp: MeshProperty) => {
        if (typeof meshProp.properties === 'object') {
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
            // @ts-expect-error - material collection type is not correct
            (mesh as Mesh).material.color.setStyle(meshProp.properties.mesh_color);
          }
          if (meshProp.properties.mesh_transparency !== undefined) {
            // @ts-expect-error - material collection type is not correct 
            (mesh as Mesh).material.opacity = 1 - meshProp.properties.mesh_transparency;
            // @ts-expect-error - material collection type is not correct
            (mesh as Mesh).material.transparent = (mesh as Mesh).material.opacity < 1;
          }
        }
      }
      });
    }
  }, [modelData, nodes, scene]);

  
  return <primitive object={scene} />;
};

export default Model;