import { VERTEX_SHADER, FRAGMENT_SHADER } from '../utils/aurora-shader.js';

export const initAuroraBackground = (shaderBg) => {
  if (!shaderBg || !window.THREE) {
    return;
  }

  const getSize = () => ({
    width: shaderBg.clientWidth || window.innerWidth,
    height: shaderBg.clientHeight || window.innerHeight
  });

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio || 1);
  const { width, height } = getSize();
  renderer.setSize(width, height);
  renderer.setClearColor(0x000000, 0);
  shaderBg.appendChild(renderer.domElement);

  const material = new THREE.ShaderMaterial({
    uniforms: {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector2(width, height) }
    },
    vertexShader: VERTEX_SHADER,
    fragmentShader: FRAGMENT_SHADER
  });

  const geometry = new THREE.PlaneGeometry(2, 2);
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  let frameId;
  const animate = () => {
    material.uniforms.iTime.value += 0.016;
    renderer.render(scene, camera);
    frameId = requestAnimationFrame(animate);
  };
  animate();

  const handleResize = () => {
    const next = getSize();
    renderer.setSize(next.width, next.height);
    material.uniforms.iResolution.value.set(next.width, next.height);
  };
  window.addEventListener('resize', handleResize);

  return () => {
    cancelAnimationFrame(frameId);
    window.removeEventListener('resize', handleResize);
    shaderBg.removeChild(renderer.domElement);
    geometry.dispose();
    material.dispose();
    renderer.dispose();
  };
};
