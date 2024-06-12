import { describe, it, expect } from 'vitest';
import { radToDeg, degToRad, calculateDistance } from './math';

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

describe('calculateDistance', () => {
  it('(0, 0)와 (3, 4) 사이의 거리를 계산하면 5가 나와야 한다', () => {
    expect(calculateDistance(0, 0, 3, 4)).toBe(5);
  });
});
