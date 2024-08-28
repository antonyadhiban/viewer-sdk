import { useState, useEffect } from 'react';
import { Container, Root, Text } from '@react-three/uikit';
import { HotspotData } from '../types';
import {DoubleSide} from "three";
import { Billboard } from '@react-three/drei';

interface HotspotProps {
  hotspotData: HotspotData;
  onStepChange: (nextStepId: string) => void;
}

const Hotspot: React.FC<HotspotProps> = ({ hotspotData, onStepChange }) => {
  const [apiData, setApiData] = useState<string | null>(null);

  useEffect(() => {
    console.log("hotspotData", hotspotData);
    if (hotspotData.api_url) {
      const fetchData = async () => {
        try {
          const response = await fetch(hotspotData.api_url || '');
          const data = await response.text();
          setApiData(data);
        } catch (error) {
          console.error('Error fetching API data:', error);
        }
      };

      fetchData();
      const interval = setInterval(fetchData, (hotspotData.polling_interval || 10) * 1000);

      return () => clearInterval(interval);
    }
  }, [hotspotData.api_url, hotspotData.polling_interval]);

  const handleClick = () => {
    if (hotspotData.goToStep) {
      onStepChange(hotspotData.goToStep);
    }
  };

  return (
    <Billboard
      position={[hotspotData.xPos * 5, hotspotData.yPos * 5, hotspotData.zPos * 5]}
      follow={true}
      lockX={false}
      lockY={false}
      lockZ={false}
    >
      <Root>
      <Container
        onClick={handleClick}
        backgroundColor={hotspotData.bgColor || 'white'}
        padding={10}
        borderRadius={5}
        cursor="pointer"
      >
        {/*  TODO - Match UI with viewer */}
        <Text color={hotspotData.textColor || 'black'} fontSize={16}>
          {hotspotData.title}
        </Text>
        {apiData && (
          // <View>
            <Text fontSize={14}>{apiData}</Text>
          // </View>
        )}
      </Container>
      </Root>
    </Billboard>
  );
};

export default Hotspot;