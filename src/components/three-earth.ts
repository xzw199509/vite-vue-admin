import * as THREE from "three";
import realEarth from '@/assets/images/realEarth.jpg';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
export default class ThreeJs {
  scene: THREE.Scene | null = null;
  camera: THREE.PerspectiveCamera | null = null;
  renderer: THREE.WebGLRenderer | null = null;
  ambientLight: THREE.AmbientLight | null = null;
  mesh: THREE.Mesh | null = null;
  mixers: THREE.AnimationMixer[] = [];
  controls: OrbitControls | null = null;
  clock: THREE.Clock = new THREE.Clock();
  constructor() {
    this.init();
  }

  init(): void {
    // 第一步新建一个场景
    this.scene = new THREE.Scene();
    this.setRenderer();
    this.setCamera();
    this.setCube();
    this.setGltf();
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
    this.camera.position.y = 20;
    this.camera.position.z = 10;
    // 添加相机控制器
    this.controls = new OrbitControls(this.camera, this.renderer!.domElement)
  }

  // 设置渲染器
  setRenderer(): void {
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,    // 
      antialias: true //
    });
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
      // const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
      // hemiLight.color.setHSL(0.6, 1, 0.6);
      // hemiLight.groundColor.setHSL(0.095, 1, 0.75);
      // hemiLight.position.set(0, 50, 0);
      // this.scene.add(hemiLight);

      // const hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 10);
      // this.scene.add(hemiLightHelper);
    }
  }

  // 创建网格模型
  setCube(): void {
    if (this.scene) {
      const geometry = new THREE.SphereGeometry(10,32,32); //创建一个立方体几何对象Geometry
      // const material = new THREE.MeshBasicMaterial({ color: 0xff3200 }); //材质对象Material
      const texture = new THREE.TextureLoader().load(
        realEarth
        // "../assets/images/realEarth.jpg"
      ); //首先，获取到纹理
      const material = new THREE.MeshBasicMaterial({ map: texture }); //然后创建一个phong材质来处理着色，并传递给纹理映射
      this.mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
      this.scene.add(this.mesh); //网格模型添加到场景中

    }
  }
  // 添加鸟模型
  setGltf(): void {
    if (this.scene) {
      // 创建平面
      // const planeGeometry = new THREE.PlaneGeometry(6, 6)
      // //该平板的材质不能是 THREE.MeshBasicMaterial，因为它不受光照的影响
      // const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xFF0000, side: THREE.DoubleSide })
      // const plane = new THREE.Mesh(planeGeometry, planeMaterial)
      // // 该平板接收其他物体的投影
      // plane.receiveShadow = true
      // plane.position.x = -0.5 * Math.PI // 旋转位置
      // plane.position.y = -0.1
      // this.scene.add(plane);

      const loader = new GLTFLoader();

      loader.load('models/Flamingo.glb', (gltf) => {

        const mesh = gltf.scene.children[0];

        const s = 0.01;
        mesh.scale.set(s, s, s);
        mesh.position.y = 12;
        mesh.position.z = 5;
        mesh.rotation.y = Math.PI ;

        mesh.castShadow = true;
        mesh.receiveShadow = true;

        this.scene?.add(mesh);

        const mixer = new THREE.AnimationMixer(mesh);
        mixer.clipAction(gltf.animations[0]).setDuration(1).play();
        this.mixers.push(mixer);
        this.render();
      });
    }
  }
  // 渲染
  render(): void {
    if (this.renderer && this.scene && this.camera) {
      const delta = this.clock.getDelta();
      for (let i = 0; i < this.mixers.length; i++) {
        this.mixers[i].update(delta);
      }
      this.renderer.render(this.scene, this.camera);
    }
  }

  // 动画
  animate(): void {
    if (this.mesh) {
      requestAnimationFrame(this.animate.bind(this));
      this.mesh.rotation.x += 0.001;
      // this.mesh.rotation.y += 0.01;
      this.render();
    }
  }
}