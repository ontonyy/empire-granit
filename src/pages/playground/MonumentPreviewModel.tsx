import { useId } from 'react';
import {
  getMaterialPalette,
  normalizeFinish,
  normalizeMaterial,
  normalizeShape,
  type ShapeKind
} from './normalize';

interface MonumentPreviewModelProps {
  shapeValue: string;
  materialValue: string;
  finishValue: string;
  viewAngle: number;
}

export function MonumentPreviewModel({
  shapeValue,
  materialValue,
  finishValue,
  viewAngle
}: MonumentPreviewModelProps) {
  const shape = normalizeShape(shapeValue);
  const material = normalizeMaterial(materialValue);
  const finish = normalizeFinish(finishValue);
  const palette = getMaterialPalette(material);
  const id = useId();

  const depthX = 22 + Math.round((viewAngle - 8) * 1.3);
  const depthY = Math.round(depthX * 0.45);

  const topByShape: Record<ShapeKind, { leftY: number; rightY: number; frontPath: string }> = {
    straight: {
      leftY: 92,
      rightY: 92,
      frontPath: 'M200 264 L200 92 L320 92 L320 264 Z'
    },
    arch: {
      leftY: 146,
      rightY: 146,
      frontPath: 'M200 264 L200 146 Q260 72 320 146 L320 264 Z'
    },
    wave: {
      leftY: 154,
      rightY: 120,
      frontPath: 'M200 264 L200 154 Q232 108 260 132 Q292 160 320 120 L320 264 Z'
    }
  };

  const top = topByShape[shape];

  const topPath = `M200 ${top.leftY} L320 ${top.rightY} L${320 + depthX} ${
    top.rightY - depthY
  } L${200 + depthX} ${top.leftY - depthY} Z`;
  const sidePath = `M320 264 L320 ${top.rightY} L${320 + depthX} ${
    top.rightY - depthY
  } L${320 + depthX} ${264 - depthY} Z`;

  const baseFront = 'M164 284 L360 284 L360 308 L164 308 Z';
  const baseTop = `M164 284 L360 284 L${360 + depthX} ${284 - depthY} L${164 + depthX} ${
    284 - depthY
  } Z`;
  const baseSide = `M360 308 L360 284 L${360 + depthX} ${284 - depthY} L${360 + depthX} ${
    308 - depthY
  } Z`;

  const sheenOpacity = finish === 'polished' ? 0.26 : finish === 'mixed' ? 0.16 : 0.04;
  const matteNoiseOpacity = finish === 'matte' ? 0.22 : finish === 'mixed' ? 0.1 : 0;

  return (
    <svg className="model-canvas" viewBox="0 0 520 340" role="img" aria-label="Monument preview">
      <defs>
        <pattern id={`grain-${id}`} width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="1.2" cy="2.3" r="0.8" fill="#fff" opacity="0.24" />
          <circle cx="5.6" cy="6.1" r="0.7" fill="#000" opacity="0.18" />
        </pattern>
        <pattern id={`marble-${id}`} width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M0 14 C10 8 22 18 34 11 C42 6 48 10 52 7" stroke="#d1c7ba" strokeWidth="2" fill="none" />
          <path d="M-4 31 C8 24 20 36 33 30 C42 26 50 30 56 27" stroke="#c6b9aa" strokeWidth="1.6" fill="none" />
        </pattern>
        <clipPath id={`front-clip-${id}`}>
          <path d={top.frontPath} />
        </clipPath>
      </defs>

      <rect x="100" y="304" width="340" height="16" rx="8" fill="#cab9a6" opacity="0.8" />

      <path d={baseTop} fill="#978a7b" />
      <path d={baseSide} fill="#7b7064" />
      <path d={baseFront} fill={palette.base} />

      <path d={topPath} fill={palette.top} />
      <path d={sidePath} fill={palette.side} />
      <path d={top.frontPath} fill={palette.front} />

      {material === 'marble' ? (
        <path d={top.frontPath} fill={`url(#marble-${id})`} opacity="0.65" />
      ) : null}

      <g clipPath={`url(#front-clip-${id})`}>
        <rect x="180" y="100" width="36" height="210" fill="#ffffff" opacity={sheenOpacity} />
        <rect x="230" y="90" width="18" height="230" fill="#ffffff" opacity={sheenOpacity * 0.8} />
        <rect x="198" y="88" width="130" height="186" fill={`url(#grain-${id})`} opacity={matteNoiseOpacity} />
      </g>

      <text x="262" y="188" textAnchor="middle" fill="#f0e9df" fontFamily="serif" fontSize="20" opacity="0.82">
        E G
      </text>
      <text x="262" y="210" textAnchor="middle" fill="#f0e9df" fontFamily="sans-serif" fontSize="9" opacity="0.72">
        Empire Granit
      </text>
    </svg>
  );
}
