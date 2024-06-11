import { describe, it, expect } from 'vitest';
import { radToDeg, degToRad } from './math';

describe('radToDeg', () => {
  it('Math.PI 값을 도 단위로 변환하면 180을 반환한다.', () => {
    expect(radToDeg(Math.PI)).toBe(180);
  });
});

describe('degToRad', () => {
  it('180 값을 라디안으로 변환하면 Math.PI를 반환한다.', () => {
    expect(degToRad(180)).toBeCloseTo(Math.PI);
  });
});
