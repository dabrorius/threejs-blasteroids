export function translate(position, direction, distance) {
  const deltaX = Math.cos(direction) * distance;
  const deltaY = Math.sin(direction) * distance;

  return { x: position.x + deltaX, y: position.y + deltaY };
}
