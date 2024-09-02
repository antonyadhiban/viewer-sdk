import { useState, useEffect, useRef } from 'react';
import { HotspotData } from '../types';
import {Mesh} from "three";
import { Circle, Html } from '@react-three/drei';
import { ThreeEvent, useFrame, useThree } from '@react-three/fiber';

interface HotspotProps {
  hotspotData: HotspotData;
  onStepChange: (nextStepId: string) => void;
}

const Hotspot: React.FC<HotspotProps> = ({ hotspotData, onStepChange }) => {
  const { camera } = useThree();
  const ref = useRef<Mesh | null>(null);
  const highlightRef = useRef<Mesh | null>(null);
  const [htmlContent, setHtmlContent] = useState<string | null>(null);

  const {bgColor = "white", size = 0.2} = hotspotData; 

  useEffect(() => {
    if (hotspotData.api_content) {
      fetch(hotspotData.api_url as string)
        .then((data) => data.text())
        .then((text) => {
          setHtmlContent(text);
        });
    } else {
      setHtmlContent(hotspotData.title);
    }
  }, [hotspotData])

  useFrame(() => {
    if (ref.current) {
      const hotspotMesh = ref.current;
      // Make hotspotMesh look at camera
      hotspotMesh.lookAt(camera.position);

      // Make hotspotMesh size consistent
      const distance = hotspotMesh.position.distanceTo(camera.position);
      const scale = distance * size * 1/3;
      hotspotMesh.scale.set(scale, scale, scale);
    }
  })

  const onPointerDown = (event: ThreeEvent<PointerEvent>) => {
    console.log(event);
    
    if (hotspotData && hotspotData.goToStep) {
      onStepChange(hotspotData.goToStep);
    }
  }

  const onPointerEnter = () => {
    if(highlightRef.current) highlightRef.current.visible = true;
  }

  const onPointerLeave = () => {
    if(highlightRef.current) highlightRef.current.visible = false;
  }

  return (
    <Circle ref={ref} args={[0.06]} position={[hotspotData.xPos * 5, hotspotData.yPos * 5, hotspotData.zPos * 5]} onPointerDown={onPointerDown} onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave}>
      <meshStandardMaterial color={"gray"} opacity={0.75}></meshStandardMaterial>
      <mesh ref={highlightRef} visible={false}>
        <ringGeometry args={[0.06, 0.07]} />
        <meshStandardMaterial color={"white"} opacity={0.75} />
      </mesh>
      <Circle args={[0.04]} position={[0, 0, 0.1]}>
        <meshStandardMaterial color={bgColor} opacity={1}></meshStandardMaterial>
      </Circle>
      <Html>
        <div className="hotspot" dangerouslySetInnerHTML={{ __html: htmlContent as string }} />
      </Html>
    </Circle>
  )
};

export default Hotspot;