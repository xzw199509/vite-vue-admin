import * as THREE from "three";

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import vertexShader from './shaders/vertex.glsl';
// import fragmentShader from './shaders/fragment.glsl';
// import vertexPars from './shaders/vertex_pars.glsl';
// import vertexMain from './shaders/vertex_main.glsl';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
export default class ThreeJs {
  scene: THREE.Scene | null = null;
  camera: THREE.PerspectiveCamera | null = null;
  renderer: THREE.WebGLRenderer | null = null;
  ambientLight: THREE.AmbientLight | null = null;
  mesh: THREE.Mesh | null = null;
  mixers: THREE.AnimationMixer[] = [];
  controls: OrbitControls | null = null;
  clock: THREE.Clock = new THREE.Clock();
  // material: THREE.MeshStandardMaterial = new THREE.MeshStandardMaterial();
  material: THREE.RawShaderMaterial = new THREE.RawShaderMaterial();
  constructor() {
    this.init();
  }

  init(): void {
    // 第一步新建一个场景
    this.scene = new THREE.Scene();
    this.setRenderer();
    this.setCamera();
    this.setCube();
    this.setLight()
    this.animate();
  }

  // 新建透视相机
  setCamera(): void {
    // 第二参数就是 长度和宽度比 默认采用浏览器  返回以像素为单位的窗口的内部宽度和高度
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    // this.camera.position.y = 20;
    this.camera.position.z = 5;
    // 添加相机控制器
    this.controls = new OrbitControls(this.camera, this.renderer!.domElement)
  }

  // 设置渲染器
  setRenderer(): void {
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,    // 
      antialias: true //
    });
    // this.renderer.setClearColor(0xffffff)
    // 设置画布的大小
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    //这里 其实就是canvas 画布  renderer.domElement
    document.body.appendChild(this.renderer.domElement);
  }

  // 设置环境光
  setLight(): void {
    if (this.scene) {
      this.ambientLight = new THREE.AmbientLight(0xffffff); // 环境光
      this.scene.add(this.ambientLight);
      // const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
      // hemiLight.color.setHSL(0.6, 1, 0.6);
      // hemiLight.groundColor.setHSL(0.095, 1, 0.75);
      // hemiLight.position.set(0, 50, 0);
      // this.scene.add(hemiLight);

      // const hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 10);
      // this.scene.add(hemiLightHelper);
      const dirLight = new THREE.DirectionalLight('#ffffff', 8.75)
      dirLight.position.set(5, 5, 5)
    }
  }

  // 创建网格模型
  setCube(): void {
    if (this.scene) {
      // abs()
      // min，max
      // mod
      // sin,cos, tan,atan
      // dot, cross
      // cLamp
      // step, smoothstep, fract.
      // cameraPosition
      // viewDirection

      const vertexShader1 = `
        precision mediump float;
        uniform mat4 projectionMatrix;
        uniform mat4 viewMatrix;
        uniform mat4 modelMatrix;
        #define PI 3.1415926535897932384626433832795


        attribute vec3 position;
        varying vec3 vPosition;
        attribute vec3 normal;
        varying vec3 vNormal;
        uniform float uTime;
        attribute vec2 uv;
        varying vec2 vUv;
        varying float vDisplacement;

        // Transform - position, scale,rotation
        // modelMatrix  position, scale, rotation of our model
        // viewMatrix - positon, orientation of our camera
        // projectionMatrix  projects our object onto the screen (aspect ratio & the prespe
        //	Classic Perlin 3D Noise 
        //	by Stefan Gustavson
        //
        vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
        vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
        vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

        float noise(vec3 P){
          vec3 Pi0 = floor(P); // Integer part for indexing
          vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
          Pi0 = mod(Pi0, 289.0);
          Pi1 = mod(Pi1, 289.0);
          vec3 Pf0 = fract(P); // Fractional part for interpolation
          vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
          vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
          vec4 iy = vec4(Pi0.yy, Pi1.yy);
          vec4 iz0 = Pi0.zzzz;
          vec4 iz1 = Pi1.zzzz;

          vec4 ixy = permute(permute(ix) + iy);
          vec4 ixy0 = permute(ixy + iz0);
          vec4 ixy1 = permute(ixy + iz1);

          vec4 gx0 = ixy0 / 7.0;
          vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
          gx0 = fract(gx0);
          vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
          vec4 sz0 = step(gz0, vec4(0.0));
          gx0 -= sz0 * (step(0.0, gx0) - 0.5);
          gy0 -= sz0 * (step(0.0, gy0) - 0.5);

          vec4 gx1 = ixy1 / 7.0;
          vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
          gx1 = fract(gx1);
          vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
          vec4 sz1 = step(gz1, vec4(0.0));
          gx1 -= sz1 * (step(0.0, gx1) - 0.5);
          gy1 -= sz1 * (step(0.0, gy1) - 0.5);

          vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
          vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
          vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
          vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
          vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
          vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
          vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
          vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

          vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
          g000 *= norm0.x;
          g010 *= norm0.y;
          g100 *= norm0.z;
          g110 *= norm0.w;
          vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
          g001 *= norm1.x;
          g011 *= norm1.y;
          g101 *= norm1.z;
          g111 *= norm1.w;

          float n000 = dot(g000, Pf0);
          float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
          float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
          float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
          float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
          float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
          float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
          float n111 = dot(g111, Pf1);

          vec3 fade_xyz = fade(Pf0);
          vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
          vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
          float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
          return 2.2 * n_xyz;
        }
        // 
        float smoothMod(float axis, float amp, float rad){
          float top = cos(PI * (axis / amp)) * sin(PI * (axis / amp));
          float bottom = pow(sin(PI * (axis / amp)), 2.) + pow(rad, 2.0);
          float at = atan(top / bottom);
          return amp * (1. / 2.) - (1. / PI) * at;
        }

        // float fit(float unscaled, float originalMin, float originalMax, float minAllowed, float maxAllowed){
        //   return (maxAllowed - minAllowed) * (unscaled -originalMin) / (originalMax - originalMin) + minAllowed;
        // }
        float fit(float unscaled, float originalMin, float originalMax, float minAllowed, float maxAllowed) {
          // 将 unscaled 从原始范围映射到 [0, 1] 范围
          float normalizedValue = (unscaled - originalMin) / (originalMax - originalMin);
          
          // 将 [0, 1] 范围的值映射到新的范围 [minAllowed, maxAllowed]
          float scaledValue = normalizedValue * (maxAllowed - minAllowed) + minAllowed;
          
          return scaledValue;
        }
        float wave(vec3 position){
          return fit(smoothMod(position.y * 6.0, 1., 1.5), 0.2, 0.7, 0.0, 1.0);
        }
        void main() {

          vec3 coords = normal;
          coords.y += uTime/3.0;
          vec3 noisePattern = vec3(noise(coords));
          float pattern = wave(noisePattern);

          // varyings
          vPosition = position;
          vNormal = normal;
          vUv = uv;
          vDisplacement = pattern;
          // vTime = uTime;
          // MVP

          float displacement = vDisplacement / 1. ;
          vec3 newPosition = position + normal * displacement;
          vec4 modelViewPosition =  modelMatrix * viewMatrix * vec4(newPosition, 1.0);
          gl_Position =projectionMatrix * modelViewPosition;
          vUv = uv;
          vNormal = normal;
        }
        `;
      const fragmentShader1 = `
        precision mediump float;
        varying vec2 vUv;
        #define PI 3.1415926535897932384626433832795
        uniform float uTime;
        // varying vec2 vTime;
        
        varying vec3 vPosition;
        varying vec3 vNormal;
        //	Classic Perlin 3D Noise 
        //	by Stefan Gustavson
        //
        vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
        vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
        vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

        float noise(vec3 P){
          vec3 Pi0 = floor(P); // Integer part for indexing
          vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
          Pi0 = mod(Pi0, 289.0);
          Pi1 = mod(Pi1, 289.0);
          vec3 Pf0 = fract(P); // Fractional part for interpolation
          vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
          vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
          vec4 iy = vec4(Pi0.yy, Pi1.yy);
          vec4 iz0 = Pi0.zzzz;
          vec4 iz1 = Pi1.zzzz;

          vec4 ixy = permute(permute(ix) + iy);
          vec4 ixy0 = permute(ixy + iz0);
          vec4 ixy1 = permute(ixy + iz1);

          vec4 gx0 = ixy0 / 7.0;
          vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
          gx0 = fract(gx0);
          vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
          vec4 sz0 = step(gz0, vec4(0.0));
          gx0 -= sz0 * (step(0.0, gx0) - 0.5);
          gy0 -= sz0 * (step(0.0, gy0) - 0.5);

          vec4 gx1 = ixy1 / 7.0;
          vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
          gx1 = fract(gx1);
          vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
          vec4 sz1 = step(gz1, vec4(0.0));
          gx1 -= sz1 * (step(0.0, gx1) - 0.5);
          gy1 -= sz1 * (step(0.0, gy1) - 0.5);

          vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
          vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
          vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
          vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
          vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
          vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
          vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
          vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

          vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
          g000 *= norm0.x;
          g010 *= norm0.y;
          g100 *= norm0.z;
          g110 *= norm0.w;
          vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
          g001 *= norm1.x;
          g011 *= norm1.y;
          g101 *= norm1.z;
          g111 *= norm1.w;

          float n000 = dot(g000, Pf0);
          float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
          float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
          float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
          float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
          float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
          float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
          float n111 = dot(g111, Pf1);

          vec3 fade_xyz = fade(Pf0);
          vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
          vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
          float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
          return 2.2 * n_xyz;
        }
        // 
        float smoothMod(float axis, float amp, float rad){
          float top = cos(PI * (axis / amp)) * sin(PI * (axis / amp));
          float bottom = pow(sin(PI * (axis / amp)), 2.) + pow(rad, 2.0);
          float at = atan(top / bottom);
          return amp * (1. / 2.) - (1. / PI) * at;
        }

        // float fit(float unscaled, float originalMin, float originalMax, float minAllowed, float maxAllowed){
        //   return (maxAllowed - minAllowed) * (unscaled -originalMin) / (originalMax - originalMin) + minAllowed;
        // }
        float fit(float unscaled, float originalMin, float originalMax, float minAllowed, float maxAllowed) {
          // 将 unscaled 从原始范围映射到 [0, 1] 范围
          float normalizedValue = (unscaled - originalMin) / (originalMax - originalMin);
          
          // 将 [0, 1] 范围的值映射到新的范围 [minAllowed, maxAllowed]
          float scaledValue = normalizedValue * (maxAllowed - minAllowed) + minAllowed;
          
          return scaledValue;
        }
        float wave(vec3 position){
          return fit(smoothMod(position.y * 6.0, 1., 1.5), 0.2, 0.7, 0.0, 1.0);
        }
        void main() {
          vec3 coords = vNormal;
          coords.y += uTime;
          vec3 noisePattern = vec3(noise(coords));

          float pattern = wave(noisePattern);
          gl_FragColor = vec4(vec3(pattern), 1.0);
        }
        `;
      // 创建平面
      const planeGeometry = new THREE.PlaneGeometry(2, 2)
      this.material = new THREE.RawShaderMaterial({
        // const material = new THREE.ShaderMaterial({
          vertexShader: vertexShader1,
          fragmentShader: fragmentShader1
      });
      // this.material = new THREE.MeshStandardMaterial()
      // this.material.onBeforeCompile = (shader) => {
      //   this.material.userData.shader = shader

      //   shader.uniforms.uTime = { value: 0. }
      //   const parsVertexString = /* glsl */`#include <displacementmap_pars_vertex>`
      //   shader.vertexShader = shader.vertexShader.replace(parsVertexString, parsVertexString + vertexPars)
      //   const mainVertexString = /* glsl */`#include<displacementmap_vertex>`
      //   shader.vertexShader = shader.vertexShader.replace(mainVertexString, mainVertexString + vertexPars)
      //   console.log(shader.vertexShader);

      // }
      // onBeforeCompile:(shader) => {
      //   this.material.userData.shader =shader
      //   shader.uniform
      // },
      this.material.uniforms.uTime = {value: 0}
      this.material.uniforms .uRadius = {value: 0.5}
      const plane = new THREE.Mesh(planeGeometry, this.material)
      plane.position.x = -0.5 * Math.PI // 旋转位置
      // this.scene.add(plane);
      //该平板的材质不能是 THREE.MeshBasicMaterial，因为它不受光照的影响
      // const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xFF0000, side: THREE.DoubleSide })
      // const plane = new THREE.Mesh(planeGeometry, planeMaterial)
      // 该平板接收其他物体的投影
      // plane.receiveShadow = true
      // plane.position.x = -0.5 * Math.PI // 旋转位置
      // plane.position.y = -0.1
      // this.scene.add(plane);
      // const geometry = new THREE.SphereGeometry(1, 320,320); //创建一个立方体几何对象Geometry   
      const geometry = new THREE.IcosahedronGeometry(1, 320); //创建一个立方体几何对象Geometry   
      // this.material = new THREE.RawShaderMaterial({
      // // const material = new THREE.ShaderMaterial({
      //   vertexShader: vertexShader,
      //   fragmentShader: fragmentShader
      // }); //然后创建一个phong材质来处理着色，并传递给纹理映射

      this.mesh = new THREE.Mesh(geometry, this.material); //网格模型对象Mesh
      this.scene.add(this.mesh); //网格模型添加到场景中
    }
  }

  // 渲染
  render(): void {
    if (this.renderer && this.scene && this.camera) {
      const delta = this.clock.getDelta();
      const elapsedTime = this.clock.getElapsedTime();
      for (let i = 0; i < this.mixers.length; i++) {
        this.mixers[i].update(delta);
      }
      // this.material.userData.shader.uniforms.uTime.value = elapsedTime;
      this.material.uniforms.uTime.value = elapsedTime;
      this.renderer.render(this.scene, this.camera);
    }
  }

  // 动画
  animate(): void {
    if (this.mesh) {
      requestAnimationFrame(this.animate.bind(this));
      // this.mesh.rotation.x += 0.001;
      // this.mesh.rotation.y += 0.01;
      this.render();
    }
  }
}