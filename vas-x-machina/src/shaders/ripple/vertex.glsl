uniform vec3 uPointer;
uniform float uTime;
uniform float uClickTime;

varying float vHeight;

const float WAVE_FREQUENCY = 10.0;
const float SPEED = 1.5;
const float DURATION = 3.0;

void main() {
  float dist = distance(position, uPointer);
  float elapsed = uTime - uClickTime;

  float height = 3.0 * sin((dist - elapsed * SPEED) * WAVE_FREQUENCY);

  float waveFront = elapsed * SPEED;
  height *= step(dist, waveFront);

  height *= 1.0 - clamp(elapsed / DURATION, 0.0, 1.0);

  vec3 displaced = position + normal * height * 0.1;

  vHeight = height;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
}
