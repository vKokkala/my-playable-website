uniform vec3 uPointer;

varying float vHeight;

const float WAVE_FREQUENCY = 10.0;

void main() {
  float dist = distance(position, uPointer);

  float height = sin(dist * WAVE_FREQUENCY);

  vec3 displaced = position + normal * height * 0.1;

  vHeight = height;
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
}
