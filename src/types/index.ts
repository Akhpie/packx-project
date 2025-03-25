// Generic component prop types
export interface ChildrenProps {
  children: React.ReactNode;
}

// Navigation types
export interface NavItem {
  name: string;
  path: string;
}

// Box component types
export interface BoxProps {
  position?: [number, number, number];
  color?: string;
  scale?: number;
}

// Packaging solution types
export interface PackagingSolution {
  id: string;
  name: string;
  component: React.ComponentType<BoxProps>;
  color?: string;
  description: string;
  features: string[];
  sustainability: number;
  caseStudy: string;
  industry: string;
}

// Packaging data for the innovation lab
export interface PackagingData {
  id: string;
  name: string;
  component: React.ComponentType<BoxProps>;
  color?: string;
  description: string;
  sustainability: number;
  industries: string[];
}

// Animation properties
export interface AnimationProps {
  initial?: any;
  animate?: any;
  exit?: any;
  transition?: any;
  variants?: any;
}

// Route configuration
export interface RouteConfig {
  path: string;
  element: React.ReactNode;
  children?: RouteConfig[];
}
