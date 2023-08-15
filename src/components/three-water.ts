import * as THREE from "three";
import { CircleGeometry } from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Reflector } from 'three/examples/jsm/objects/Reflector'
export default class ThreeJs {
  scene: THREE.Scene | null = null;
  camera: THREE.PerspectiveCamera | null = null;
  renderer: THREE.WebGLRenderer | null = null;
  ambientLight: THREE.AmbientLight | null = null;
  mesh: THREE.Mesh | null = null;
  clock: THREE.Clock | null = new THREE.Clock();
  constructor() {
    this.init();
  }

  init(): void {
    this.scene = new THREE.Scene();
    this.setRenderer();
    this.setCamera();
    // this.setPlane();
    this.setReflector()
    this.setCube();
    this.setLight()
    this.animate();

  }

  // 新建透视相机
  setCamera(): void {
    // 第二参数就是 长度和宽度比 默认采用浏览器  返回以像素为单位的窗口的内部宽度和高度
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    // this.camera.position.x = 5;
    this.camera.position.z = 50;
    // 添加相机控制器
    const controls = new OrbitControls(this.camera, this.renderer!.domElement)
  }

  // 设置渲染器
  setRenderer(): void {
    this.renderer = new THREE.WebGLRenderer({ logarithmicDepthBuffer: true });
    this.renderer.setClearColor(0xffffff)
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

      // 平行光
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      // 设置光源的方向：通过光源position属性和目标指向对象的position属性计算
      directionalLight.position.set(15, 15, 15);
      this.scene.add(directionalLight);

    }
  }

  // 创建网格模型
  setCube(): void {
    if (this.scene) {
      const geometry = new THREE.BoxGeometry(3, 3, 3); //创建一个立方体几何对象Geometry
      const material = new THREE.MeshStandardMaterial()
      this.mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
      this.mesh.position.y = 5
      this.scene.add(this.mesh); //网格模型添加到场景中


      this.render();
    }
  }
  setReflector(): void {
    if (!this.scene) return
    const geometry = new THREE.PlaneGeometry(100, 100, 128, 128)
    // const customShader = 
    
    const mirror = new Reflector(geometry, {
      shader:{

        name: 'ReflectorShader',
      
        uniforms: {
      
          'color': {
            value: null
          },
      
          'tDiffuse': {
            value: null
          },
      
          'textureMatrix': {
            value: null
          }
      
        },
      
        vertexShader: /* glsl */`
          uniform mat4 textureMatrix;
          varying vec4 vUv;
      
          #include <common>
          #include <logdepthbuf_pars_vertex>
      
          void main() {
      
            vUv = textureMatrix * vec4( position, 1.0 );
      
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
      
            #include <logdepthbuf_vertex>
      
          }`,
      
        fragmentShader: /* glsl */`
          uniform vec3 color;
          uniform sampler2D tDiffuse;
          varying vec4 vUv;
      
          #include <logdepthbuf_pars_fragment>
      
          float blendOverlay( float base, float blend ) {
      
            return( base < 0.5 ? ( 2.0 * base * blend ) : ( 1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );
      
          }
      
          vec3 blendOverlay( vec3 base, vec3 blend ) {
      
            return vec3( blendOverlay( base.r, blend.r ), blendOverlay( base.g, blend.g ), blendOverlay( base.b, blend.b ) );
      
          }
      
          void main() {
      
            #include <logdepthbuf_fragment>
      
            vec4 base = texture2DProj( tDiffuse, vUv );
            gl_FragColor = vec4( blendOverlay( base.rgb, color ), 1.0 );
      
            #include <tonemapping_fragment>
            #include <colorspace_fragment>
      
          }`
      },
      clipBias: 0.03,
      textureWidth: window.innerWidth * window.devicePixelRatio,
      textureHeight: window.innerHeight * window.devicePixelRatio,
      color: new THREE.Color(0x889999),
    });
    mirror.rotation.x = -0.5 * Math.PI;
  
    this.scene.add(mirror);
  }
  // 创建网格模型
  setPlane(): void {
    if (this.scene) {
      const geometry = new THREE.PlaneGeometry(100, 100, 128, 128); //创建一个立方体几何对象Geometry
      const material = new THREE.MeshStandardMaterial()
      const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
      mesh.rotation.x = -0.5 * Math.PI;
      this.scene.add(mesh); //网格模型添加到场景中
      this.render();
    }
  }
  // 渲染
  render(): void {
    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  // 动画
  animate(): void {
    if (this.mesh && this.clock) {
      requestAnimationFrame(this.animate.bind(this));
      this.mesh.rotation.y += 0.01;
      // this.mesh.position.y = 5 + 10 * Math.sin(this.clock.getDelta())
      this.render();
    }
  }
}