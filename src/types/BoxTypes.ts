// Box component prop types
export interface BoxProps {
  position?: [number, number, number];
  color?: string;
  scale?: number;
}

// Luxury box prop types
export interface LuxuryBoxProps extends BoxProps {
  woodColor?: string;
  interiorColor?: string;
  trimColor?: string;
  gemColor?: string;
}

// Other box types
export interface GlassBoxProps extends BoxProps {}
export interface HolographicBoxProps extends BoxProps {}
export interface WoodenBoxProps extends BoxProps {}
export interface NeonBoxProps extends BoxProps {}
export interface GeometricBoxProps extends BoxProps {}

// Component prop types
export interface Scene3DProps {
  currentProduct: number;
  viewingSustainability: boolean;
  woodColor: string;
  interiorColor: string;
  trimColor: string;
  gemColor: string;
}

export interface ProductInfoProps {
  currentProduct: number;
  setCurrentProduct: (index: number) => void;
  viewingSustainability: boolean;
  setViewingSustainability: (value: boolean) => void;
  woodColor: string;
  setWoodColor: (color: string) => void;
  interiorColor: string;
  setInteriorColor: (color: string) => void;
  trimColor: string;
  setTrimColor: (color: string) => void;
  gemColor: string;
  setGemColor: (color: string) => void;
}
