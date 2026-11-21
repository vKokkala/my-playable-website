uniform vec3 uBaseColor;
uniform vec3 uPeakColor;
uniform vec3 uDeepColor;

varying float vHeight;

void main() {
  vec3 color = mix(uBaseColor, uPeakColor, max(vHeight, 0.0));
  color = mix(color, uDeepColor, max(-vHeight, 0.0));

  gl_FragColor = vec4(color, 1.0);

  #include <colorspace_fragment>
}
