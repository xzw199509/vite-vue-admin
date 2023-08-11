import * as THREE from "three";
import  realEarth  from '@/assets/images/realEarth.jpg';
import { CanvasTexture, MeshStandardMaterial } from "three";
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
    this.setCamera();
    this.setRenderer();
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
      0.1,
      1000
    );
    // this.camera.position.x = 5;
    this.camera.position.z = 5;
  }

  // 设置渲染器
  setRenderer(): void {
    this.renderer = new THREE.WebGLRenderer();
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
    }
  }

  // 创建网格模型
  setCube(): void {
    if (this.scene) {
      const geometry = new THREE.BoxGeometry(3,3,3); //创建一个立方体几何对象Geometry
      const material = [
        new THREE.MeshBasicMaterial({color:'#FFFFFF'}),
        new THREE.MeshBasicMaterial({color:'#FFFFFF'}),
         new THREE.MeshBasicMaterial({color:'#FFFFFF'}),
         new THREE.MeshBasicMaterial({color:'#FFFFFF'}),
         new THREE.MeshBasicMaterial({color:'#FFFFFF'}),
         new THREE.MeshBasicMaterial({color:'#FFFFFF'}),
      ]
      const text = ['左','右','上','下','前','后']
      text.forEach((item,index)=>{
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        canvas.width = 30
        canvas.height = 30
        context!.font = '8px'
        context?.fillRect(0,0,canvas.width,canvas.height)
        context!.fillStyle = '#FFFFFF'
        context?.fillText(item,10,16)
        const texture = new CanvasTexture(canvas)
        material[index].map = texture
        material[index].needsUpdate = true
        
      })
      this.mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
      this.scene.add(this.mesh); //网格模型添加到场景中


        // 创建一个几何图形，使用顶点定义三角形
        const geometry1 = new THREE.BufferGeometry();
        // 定义立方体的 8 个顶点坐标
        const vertices = [
          // 前面四个顶点
          new THREE.Vector3(-1, -1, 4),
          new THREE.Vector3(1, -1, 4),
          new THREE.Vector3(1, 1, 4),
          new THREE.Vector3(-1, 1, 4),
  
          // 后面四个顶点
          new THREE.Vector3(-1, -1, -4),
          new THREE.Vector3(1, -1, -4),
          new THREE.Vector3(1, 1, -4),
          new THREE.Vector3(-1, 1, -4)
        ];
        // 定义立方体的面（索引）数据
        const indices = [
          0, 1, 2, 2, 3, 0, // 前面两个三角形
          1, 5, 6, 6, 2, 1, // 右侧两个三角形
          5, 4, 7, 7, 6, 5, // 后面两个三角形
          4, 0, 3, 3, 7, 4, // 左侧两个三角形
          3, 2, 6, 6, 7, 3, // 顶部两个三角形
          1, 0, 4, 4, 5, 1  // 底部两个三角形
        ];
  
        // 将顶点数据转换为浮点数组
        const verticesArray = new Float32Array(vertices.length * 3);
        for (let i = 0; i < vertices.length; i++) {
          verticesArray[i * 3] = vertices[i].x;
          verticesArray[i * 3 + 1] = vertices[i].y;
          verticesArray[i * 3 + 2] = vertices[i].z;
        }
  
        const attribue = new THREE.BufferAttribute(verticesArray, 3);
        geometry.attributes.position = attribue;
  
        const indexAttribute = new THREE.BufferAttribute(new Uint16Array(indices), 1);
        geometry.setIndex(indexAttribute);
        //设置法向量
        //3个为一组,表示一个顶点的法向量数据
  
        // 创建一个材质
        const material1 = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
  
        // 创建一个网格
        const triangle = new THREE.Mesh(geometry1, material1);
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
    if (this.mesh) {
      requestAnimationFrame(this.animate.bind(this));
      this.mesh.rotation.x += 0.01;
      // this.mesh.rotation.y += 0.01;
      this.render();
    }
  }
}