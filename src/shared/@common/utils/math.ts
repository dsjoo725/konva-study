/**
 * @name radToDeg
 * @description
 * 라디안을 도 단위로 변환합니다.
 * ```typescript
 * radToDeg(
 *   // 변환할 라디안 값
 *   rad: number
 * ): number
 * ```
 * @example
 * radToDeg(Math.PI) // 180
 * radToDeg(Math.PI / 2) // 90
 */
export const radToDeg = (rad: number) => (rad * 180) / Math.PI;

/**
 * @name degToRad
 * @description
 * 도 단위를 라디안으로 변환합니다.
 * ```typescript
 * degToRad(
 *   // 변환할 도 값
 *   deg: number
 * ): number
 * ```
 * @example
 * degToRad(180) // Math.PI
 * degToRad(90) // Math.PI / 2
 */
export const degToRad = (deg: number): number => (deg * Math.PI) / 180;
