import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { LuxuryBox } from "./boxes/LuxuryBox";

// Color options for each customizable part
const woodOptions = {
  Mahogany: "#5C0000",
  Walnut: "#8B4513",
  Ebony: "#3D2B1F",
  Oak: "#D4A76A",
  Cherry: "#990000",
};

const interiorOptions = {
  Burgundy: "#800020",
  Emerald: "#046307",
  Navy: "#000080",
  Purple: "#4B0082",
  Black: "#121212",
};

const trimOptions = {
  Gold: "#FFD700",
  Silver: "#C0C0C0",
  "Rose Gold": "#B76E79",
  Bronze: "#CD7F32",
  Platinum: "#E5E4E2",
};

const gemOptions = {
  Ruby: "#ff0000",
  Emerald: "#50C878",
  Sapphire: "#0F52BA",
  Amethyst: "#9966CC",
  Diamond: "#B9F2FF",
};

export default function ColorSelectorDemo() {
  // State for each color choice
  const [woodColor, setWoodColor] = useState("#8B4513");
  const [interiorColor, setInteriorColor] = useState("#800020");
  const [trimColor, setTrimColor] = useState("#FFD700");
  const [gemColor, setGemColor] = useState("#ff0000");

  // Create color selector UI
  const ColorSelector = ({ title, options, currentColor, onChange }) => (
    <div className="mb-4">
      <h3 className="text-sm font-medium mb-2">{title}</h3>
      <div className="flex space-x-2">
        {Object.entries(options).map(([name, color]) => (
          <button
            key={name}
            className={`w-8 h-8 rounded-full ${
              currentColor === color ? "ring-2 ring-white ring-offset-2" : ""
            }`}
            style={{ backgroundColor: color }}
            onClick={() => onChange(color)}
            title={name}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full h-screen flex">
      {/* 3D Canvas - takes 70% of the width */}
      <div className="w-3/4 h-full">
        <Canvas camera={{ position: [0, 2, 5] }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />

          <LuxuryBox
            woodColor={woodColor}
            interiorColor={interiorColor}
            trimColor={trimColor}
            gemColor={gemColor}
          />

          <OrbitControls />
          <Environment preset="city" />
        </Canvas>
      </div>

      {/* Color Selection Panel - takes 30% of the width */}
      <div className="w-1/4 p-6 bg-gray-800 text-white">
        <h2 className="text-xl font-bold mb-6">Customize Your Luxury Box</h2>

        <ColorSelector
          title="Wood Type"
          options={woodOptions}
          currentColor={woodColor}
          onChange={setWoodColor}
        />

        <ColorSelector
          title="Interior Fabric"
          options={interiorOptions}
          currentColor={interiorColor}
          onChange={setInteriorColor}
        />

        <ColorSelector
          title="Trim Metal"
          options={trimOptions}
          currentColor={trimColor}
          onChange={setTrimColor}
        />

        <ColorSelector
          title="Gemstone"
          options={gemOptions}
          currentColor={gemColor}
          onChange={setGemColor}
        />

        <div className="mt-6">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
}
