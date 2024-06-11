import { describe, it, expect } from 'vitest';
import { calculateDistance } from './calculateDistance';

describe('calculateDistance', () => {
  it('(0, 0)와 (3, 4) 사이의 거리를 계산하면 5가 나와야 한다', () => {
    expect(calculateDistance(0, 0, 3, 4)).toBe(5);
  });
});
