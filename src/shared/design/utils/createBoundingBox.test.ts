import { describe, it, expect } from 'vitest';
import { calculateBoundingBox } from './createBoundingBox';

describe('calculateBoundingBox', () => {
  it('주어진 점들에 대해 바운딩 박스를 정확히 계산한다.', () => {
    const points = [
      { x: 100, y: 100 },
      { x: 200, y: 100 },
      { x: 100, y: 300 },
      { x: 200, y: 300 },
    ];
    const result = calculateBoundingBox(points, 90);

    expect(result.x).toBeCloseTo(200);
    expect(result.y).toBeCloseTo(100);
    expect(result.width).toBeCloseTo(200);
    expect(result.height).toBeCloseTo(100);
    expect(result.rotation).toBe(90);
  });
});
