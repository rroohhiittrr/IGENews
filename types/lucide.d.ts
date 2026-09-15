import React from "react";

export type LucideProps = React.SVGProps<SVGSVGElement> & {
  size?: number | string;
  color?: string;
  strokeWidth?: number | string;
  absoluteStrokeWidth?: boolean;
  className?: string;
};

export type LucideIcon = React.ComponentType<LucideProps>;
