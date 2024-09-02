
# Fabrik Viewer

Fabrik Viewer is a powerful React component for rendering interactive 3D scenes with hotspots, custom models, and dynamic camera controls.

## Features

- **3D Model Rendering**: Supports GLTF/GLB files for rich, detailed 3D visualizations.
- **Interactive Hotspots**: Customizable appearance and behavior for interactive elements within the scene.
- **Dynamic Camera Controls**: Adjust the camera position, zoom, pan, and rotation for flexible scene navigation.
- **Custom 3D Text Elements**: Integrate 3D text directly into your scenes.
- **Background Color Customization**: Change the background color to fit your application's theme.
- **Responsive Design**: Automatically adjusts to various screen sizes for a consistent user experience.

## Installation

To install the Fabrik Viewer package, run the following command:

```bash
npm install @fabrikspace/viewer
```

## Usage

Here's a basic example of how to use the Fabrik Viewer component in a React application:

```jsx
import React, { useEffect, useState } from 'react';
import { Viewer } from '@fabrikspace/viewer';

function App() {
  const [cpd, setCpd] = useState(null);

  useEffect(() => {
    // Load your CPD (Content Presentation Data) file
    fetch("cpd.json")
      .then((res) => res.json())
      .then((data) => {
        setCpd(data);
      });
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      {cpd && <Viewer cpd={cpd} />}
    </div>
  );
}

export default App;
```

## CPD (Content Presentation Data) Structure

The `Viewer` component requires a `CPD` object with the following structure:

```typescript
interface CPD {
  steps: { [key: string]: StepData };
  initial_step_id: string;
  modelUrl: string[];
}

interface StepData {
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

interface ModelData {
  name: string;
  custom_model_type?: string;
  threedtext?: string;
  mesh_properties?: MeshProperty[];
}

interface MeshProperty {
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

interface HotspotData {
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
```

## Configuration

### Step Configuration

Each step in the `CPD` object can be configured with the following properties:

- **Camera**: Position, look-at point, and control settings (zoom, pan, rotate).
- **Background**: Customizable background color.
- **Hotspots**: Define interactive elements with specific actions, positions, and styles.
- **3D Models**: Load models with specific properties such as position, rotation, scale, color, and visibility.

### Hotspots

Hotspots can trigger step changes or display custom content. They can be configured with:

- Position (x, y, z coordinates)
- Color (background and text)
- Size and behavior (e.g., API calls, polling)

### 3D Models

Models are loaded from URLs specified in the CPD and can have properties like:

- Position, rotation, scale
- Color and transparency
- Visibility settings

## Development

To set up the project for development:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/fabrikspacec/fabrik-viewer.git
    ```
2. **Install dependencies**:
    ```bash
    npm install
    ```
3. **Start the development server**:
    ```bash
    npm run dev
    ```

## Building

To build the project for production:

```bash
npm run build
```

This will create a `dist` folder with the compiled files.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License.

## Support

If you encounter any problems or have any questions, please open an issue on the [GitHub repository](https://github.com/fabrikspace/fabrik-viewer/issues).

