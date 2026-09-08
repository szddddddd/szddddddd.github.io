import * as THREE from "three";

export function createLighthouseVolume(light: THREE.SpotLight) {
  const target = new THREE.WebGLRenderTarget(1, 1, {
    type: THREE.HalfFloatType,
    samples: 4,
    depthTexture: new THREE.DepthTexture(1, 1),
  });
  const uniforms = {
    beauty: { value: target.texture },
    surfaceDepth: { value: target.depthTexture },
    lightDepth: { value: null as THREE.DepthTexture | null },
    inverseProjection: { value: new THREE.Matrix4() },
    cameraWorld: { value: new THREE.Matrix4() },
    lightMatrix: { value: light.shadow.matrix },
    lightPosition: { value: new THREE.Vector3() },
    lightDirection: { value: new THREE.Vector3() },
    lightColor: { value: light.color },
    strength: { value: 0 },
    coneCos: { value: Math.cos(light.angle) },
    innerCos: { value: Math.cos(light.angle * (1 - light.penumbra)) },
  };
  const material = new THREE.ShaderMaterial({
    uniforms,
    depthTest: false,
    depthWrite: false,
    vertexShader: `
      varying vec2 screenUv;
      void main() {
        screenUv = uv;
        gl_Position = vec4(position.xy, 0.0, 1.0);
      }
    `,
    fragmentShader: `
      precision highp sampler2DShadow;
      uniform sampler2D beauty, surfaceDepth;
      uniform sampler2DShadow lightDepth;
      uniform mat4 inverseProjection, cameraWorld, lightMatrix;
      uniform vec3 lightPosition, lightDirection, lightColor;
      uniform float strength, coneCos, innerCos;
      varying vec2 screenUv;
      vec3 worldAt(float depth) {
        vec4 p = inverseProjection * vec4(screenUv * 2.0 - 1.0, depth * 2.0 - 1.0, 1.0);
        return (cameraWorld * vec4(p.xyz / p.w, 1.0)).xyz;
      }
      void main() {
        vec4 base = texture2D(beauty, screenUv);
        vec3 origin = worldAt(0.0);
        vec3 surface = worldAt(texture2D(surfaceDepth, screenUv).r);
        vec3 ray = normalize(worldAt(1.0) - origin);
        // Bound integration to a sphere enclosing the light cone, and stop at visible surfaces.
        vec3 offset = origin - (lightPosition + lightDirection * 20.0);
        float b = dot(offset, ray);
        float discriminant = b * b - dot(offset, offset) + 441.0;
        float scatter = 0.0;
        if (discriminant > 0.0 && strength > 0.001) {
          float start = max(0.0, -b - sqrt(discriminant));
          float end = min(length(surface - origin), -b + sqrt(discriminant));
          float stepSize = max(0.0, end - start) / 80.0;
          for (int i = 0; i < 80; i++) {
            vec3 p = origin + ray * (start + (float(i) + 0.5) * stepSize);
            vec3 delta = p - lightPosition;
            float distanceToLight = length(delta);
            float cone = smoothstep(coneCos, innerCos, dot(delta / max(distanceToLight, 0.001), lightDirection));
            if (cone > 0.0 && distanceToLight > 0.15 && distanceToLight < 40.0) {
              vec4 shadow = lightMatrix * vec4(p, 1.0);
              vec3 coord = shadow.xyz / shadow.w;
              if (all(greaterThanEqual(coord, vec3(0.0))) && all(lessThanEqual(coord, vec3(1.0)))) {
                float visibility = texture(lightDepth, vec3(coord.xy, coord.z - 0.00003));
                float fade = exp(-distanceToLight * 0.065) * (1.0 - smoothstep(28.0, 40.0, distanceToLight));
                scatter += visibility * cone * fade * stepSize;
              }
            }
          }
        }
        // Mild forward scattering brightens the shaft when looking toward its source.
        float phase = 0.65 + 0.35 * pow(max(dot(-ray, lightDirection), 0.0), 3.0);
        gl_FragColor = vec4(base.rgb + lightColor * scatter * strength * phase * 0.12, base.a);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
  });
  const geometry = new THREE.PlaneGeometry(2, 2);
  const composite = new THREE.Scene();
  composite.add(new THREE.Mesh(geometry, material));
  const screenCamera = new THREE.Camera();
  const size = new THREE.Vector2();
  const destination = new THREE.Vector3();
  return {
    render(renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.Camera) {
      renderer.getDrawingBufferSize(size);
      if (target.width !== size.x || target.height !== size.y) target.setSize(size.x, size.y);
      renderer.setRenderTarget(target);
      renderer.render(scene, camera);
      uniforms.lightDepth.value = light.shadow.map!.depthTexture;
      uniforms.inverseProjection.value.copy(camera.projectionMatrixInverse);
      uniforms.cameraWorld.value.copy(camera.matrixWorld);
      light.getWorldPosition(uniforms.lightPosition.value);
      light.target.getWorldPosition(destination);
      uniforms.lightDirection.value.subVectors(destination, uniforms.lightPosition.value).normalize();
      uniforms.strength.value = light.intensity / 650;
      renderer.setRenderTarget(null);
      renderer.render(composite, screenCamera);
    },
    dispose() {
      target.dispose();
      geometry.dispose();
      material.dispose();
    },
  };
}
