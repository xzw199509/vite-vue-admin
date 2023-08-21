import * as THREE from "three";
import { CanvasTexture, MeshStandardMaterial } from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
export default class ThreeJs {
  scene: THREE.Scene | null = null;
  camera: THREE.PerspectiveCamera | null = null;
  renderer: THREE.WebGLRenderer | null = null;
  ambientLight: THREE.AmbientLight | null = null;
  mesh: THREE.Mesh | null = null;

  constructor() {
    this.init();
  }

  init(): void {
    // 第一步新建一个场景
    this.scene = new THREE.Scene();

    this.setRenderer();
    this.setCamera();
    this.setCube();
    this.setVue();
    this.setLight()
    this.animate();

  }

  // 新建透视相机
  setCamera(): void {
    // 第二参数就是 长度和宽度比 默认采用浏览器  返回以像素为单位的窗口的内部宽度和高度
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
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
       const directionalLight = new THREE.DirectionalLight(0xff0000, 1);
       // 设置光源的方向：通过光源position属性和目标指向对象的position属性计算
       directionalLight.position.set(20, 20, 20);
       this.scene.add(directionalLight);
    }
  }

  // 创建网格模型
  setCube(): void {
    if (this.scene) {
      const geometry = new THREE.BoxGeometry(3, 3, 3); //创建一个立方体几何对象Geometry
      const material = new THREE.MeshStandardMaterial()
      this.mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
      this.mesh.position.x = 15
      this.scene.add(this.mesh); //网格模型添加到场景中
      this.render();
    }
  }
  setVue(): void {
    if (!this.scene) return
    // 创建一个几何图形，使用顶点定义三角形
    const geometry1 = new THREE.BufferGeometry();
    const geometry2 = new THREE.BufferGeometry();
    // 定义立方体的 8 个顶点坐标
    const vertices = [
      // 前面六个顶点
      new THREE.Vector3(0, -16, 4),
      new THREE.Vector3(19, 16, 4),
      new THREE.Vector3(11, 16, 4),
      new THREE.Vector3(0, -4, 4),
      new THREE.Vector3(-11, 16, 4),
      new THREE.Vector3(-19, 16, 4),

      // 前面六个顶点
      new THREE.Vector3(0, -16, -4),
      new THREE.Vector3(19, 16, -4),
      new THREE.Vector3(11, 16, -4),
      new THREE.Vector3(0, -4, -4),
      new THREE.Vector3(-11, 16, -4),
      new THREE.Vector3(-19, 16, -4)
    ];
    // 定义立方体的面（索引）数据
    const indices = [
      0, 1, 2, 2, 3, 0, 0, 3, 4, 4, 5, 0,// 前面四个三角形
      6, 0, 5, 5, 11, 6,// 右侧两个三角形
      6, 11, 10, 10, 9, 6, 9, 8, 6, 8, 7, 6, // 后面四个三角形
      0, 6, 7, 7, 1, 0,  // 左侧两个三角形
      3, 9, 10, 10, 4, 3, 3, 2, 8, 8, 9, 3, // 内侧四个三角形
      5, 4, 10, 10, 11, 5, 7, 2, 1, 2, 7, 8 // 顶部四个三角形
    ];
    // 定义立方体的 8 个顶点坐标
    const vertices2 = [
      // 前面六个顶点
      new THREE.Vector3(0, -4, 4),
      new THREE.Vector3(10.99, 16, 4),
      new THREE.Vector3(4, 16, 4),
      new THREE.Vector3(0, 7, 4),
      new THREE.Vector3(-4, 16, 4),
      new THREE.Vector3(-10.99, 16, 4),

      // 前面六个顶点
      new THREE.Vector3(0, -4, -4),
      new THREE.Vector3(10.99, 16, -4),
      new THREE.Vector3(4, 16, -4),
      new THREE.Vector3(0, 8, -4),
      new THREE.Vector3(-4, 16, -4),
      new THREE.Vector3(-10.99, 16, -4),
    ];
    // 定义立方体的面（索引）数据
    // const indices2 = [
    //   0, 1, 2, 2, 3, 0, 0, 3, 4, 4, 5, 0,// 前面四个三角形
    //   6, 0, 5, 5, 11, 6,// 右侧两个三角形
    //   6, 11, 10, 10, 9, 6, 9, 8, 6, 8, 7, 6, // 后面四个三角形
    //   0, 6, 7, 7, 1, 0,  // 左侧两个三角形
    //   3, 9, 10, 10, 4, 3, 3, 2, 8, 8, 9, 3, // 内侧四个三角形
    //   5, 4, 10, 10, 11, 5, 7, 2, 1, 2, 7, 8 // 顶部四个三角形
    // ];

    // const indices = [
    //   0, 1, 2, 2, 3, 0, // 前面两个三角形
    //   1, 5, 6, 6, 2, 1, // 右侧两个三角形
    //   5, 4, 7, 7, 6, 5, // 后面两个三角形
    //   4, 0, 3, 3, 7, 4, // 左侧两个三角形
    //   3, 2, 6, 6, 7, 3, // 顶部两个三角形
    //   1, 0, 4, 4, 5, 1  // 底部两个三角形
    // ];

    // 将顶点数据转换为浮点数组
    let verticesArray = new Float32Array(indices.length * 3);
    for (let i = 0; i < indices.length; i++) {
      verticesArray[i * 3] = vertices[indices[i]].x;
      verticesArray[i * 3 + 1] = vertices[indices[i]].y;
      verticesArray[i * 3 + 2] = vertices[indices[i]].z;
    }
    let verticesArray2 = new Float32Array(indices.length * 3);
    for (let i = 0; i < indices.length; i++) {
      verticesArray2[i * 3] = vertices2[indices[i]].x;
      verticesArray2[i * 3 + 1] = vertices2[indices[i]].y;
      verticesArray2[i * 3 + 2] = vertices2[indices[i]].z;
    }
    // console.log('verticesArray', verticesArray);

    const attribue = new THREE.BufferAttribute(verticesArray, 3);
    geometry1.attributes.position = attribue;
    const attribue2 = new THREE.BufferAttribute(verticesArray2, 3);
    geometry2.attributes.position = attribue2;
    // const indexAttribute = new THREE.BufferAttribute(new Uint16Array(indices1), 1);
    // geometry1.setIndex(indexAttribute);
    //设置法向量
    //3个为一组,表示一个顶点的法向量数据

    // 创建一个材质
    const material1 = new THREE.MeshStandardMaterial({
      color: 0x41b883,
    });

    const material2 = new THREE.MeshBasicMaterial({
      color: 0x35495e,
    });
    const normals = []
    for (let i = 0; i < indices.length / 3; i++) {
      // const indexA = indices[i];
      // const indexB = indices[i + 1];
      // const indexC = indices[i + 2];

      const vertexA = new THREE.Vector3(vertices[indices[i * 3]].x, vertices[indices[i * 3]].y, vertices[indices[i * 3]].z);
      const vertexB = new THREE.Vector3(vertices[indices[i * 3 + 1]].x, vertices[indices[i * 3 + 1]].y, vertices[indices[i * 3 + 1]].z);
      const vertexC = new THREE.Vector3(vertices[indices[i * 3 + 2]].x, vertices[indices[i * 3 + 2]].y, vertices[indices[i * 3 + 2]].z);

      const normal = new THREE.Vector3();
      normal.crossVectors(vertexB.clone().sub(vertexA), vertexC.clone().sub(vertexA)).normalize();

      normals.push(normal.x, normal.y, normal.z);
    }
    console.log('normals', normals);
    // geometry1.attributes.normal =  new THREE.BufferAttribute(normals, 3)
    geometry1.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
    // 创建一个网格
    const triangle = new THREE.Mesh(geometry1, material1);
    const triangle2 = new THREE.Mesh(geometry2, material2);
    // triangle2.renderOrder = 1 
    // mesh2.renderOrder = 0 
    this.scene.add(triangle);
    // this.scene.add(triangle2)
  }
  // 渲染
  render(): void {
    if (this.renderer && this.scene && this.camera) {
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