import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import Step from './components/Step';
import { CPD, StepData } from './types';

interface ViewerProps {
  cpd: CPD;
}

const Viewer: React.FC<ViewerProps> = ({ cpd }) => {
  const [currentStepId, setCurrentStepId] = useState<string>(cpd.initial_step_id);
  const [currentStep, setCurrentStep] = useState<StepData | null>(null);

  useEffect(() => {
    setCurrentStep(cpd.steps[currentStepId]);
  }, [currentStepId, cpd.steps]);

  const handleStepChange = (nextStepId: string) => {
    setCurrentStepId(nextStepId);
  };

  if (!currentStep) return null;

  return (
    <Canvas>
      <ambientLight />
      <Environment preset="city"/>
      <Step
        stepData={currentStep}
        onStepChange={handleStepChange}
        modelUrls={cpd.modelUrl}
      />
    </Canvas>
  );
};

export { Viewer };