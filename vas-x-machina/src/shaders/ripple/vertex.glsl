// Click position in the mesh's local space (same space as `position`)
uniform vec3 uPointer;
uniform float uTime;
// uTime value at the moment of the last click; elapsed time is measured from here
uniform float uClickTime;

// Passed to the fragment shader so it can color by displacement
varying float vHeight;

// Rings per unit of distance (higher = tighter rings)
const float WAVE_FREQUENCY = 10.0;
// How fast the wave front travels outward, in units per second
const float SPEED = 1.5;
// Ripples fade to zero by this distance from the click
const float MAX_DISTANCE = 4.0;
// How far behind the front the trailing rings last before dying out
const float PULSE_WIDTH = 2.5;
// Distance over which the leading ring ramps up to full strength
const float FRONT_RISE = 0.2;

void main() {
  float dist = distance(position, uPointer);
  float elapsed = uTime - uClickTime;
  // Radius of the expanding circle the wave has reached so far
  float waveFront = elapsed * SPEED;

  // Subtracting waveFront shifts the sine outward over time, so rings move away from the click
  float height = 3.0 * sin((dist - waveFront) * WAVE_FREQUENCY);

  // Envelope: quick rise at the front, then a long decaying tail of trailing rings.
  // distanceInsideWave < 0 means the wave hasn't reached this vertex yet, so pulse stays 0.
  float distanceInsideWave = waveFront - dist;
  float pulse = smoothstep(0.0, FRONT_RISE, distanceInsideWave)
              * (1.0 - smoothstep(FRONT_RISE, PULSE_WIDTH, distanceInsideWave));

  // 1 at the click point, fading to 0 at MAX_DISTANCE
  float proximity = 1.0 - smoothstep(0.0, MAX_DISTANCE, dist);

  height *= pulse * proximity;

  // Push the vertex along its normal; 0.1 scales the raw height down to a subtle offset
  vec3 displaced = position + normal * height * 0.1;

  vHeight = height;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
}
