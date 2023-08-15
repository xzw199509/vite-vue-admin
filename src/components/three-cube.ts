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
    this.setPlan()
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


      const bulbLight = new THREE.PointLight( 0xff0000, 1, 100, 2 );


				bulbLight.position.set( 10, 12,10 );
				bulbLight.castShadow = true;
				this.scene.add( bulbLight );
      // 平行光
      // const directionalLight = new THREE.DirectionalLight(0xff0000, 1);
      // // 设置光源的方向：通过光源position属性和目标指向对象的position属性计算
      // directionalLight.position.set(50, 50, 50);
      // this.scene.add(directionalLight);
      const hemiLight = new THREE.HemisphereLight( 0xff0000, 0xff0000, 0.6 );
      // hemiLight.color.setHSL( 0.6, 1, 0.6 );
      // hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
      hemiLight.position.set( 0, 50, 0 );
      this.scene.add( hemiLight );

      const hemiLightHelper = new THREE.HemisphereLightHelper( hemiLight, 10 );
      this.scene.add( hemiLightHelper );
    }
  }

  // 创建网格模型
  setCube(): void {
    if (this.scene) {
      const geometry1 = new THREE.BoxGeometry(3, 3, 3); //创建一个立方体几何对象Geometry
      const material1 = new THREE.MeshStandardMaterial()
      this.mesh = new THREE.Mesh(geometry1, material1); //网格模型对象Mesh
      this.mesh.position.x = 10
      this.scene.add(this.mesh)

      // 创建一个BufferGeometry
      const geometry = new THREE.BufferGeometry();

      // 定义立方体的顶点坐标
      const vertices = [
        // 前面的四个顶点
        -3, -3, 3,
        3, -3, 3,
        3, 3, 3,
        -3, 3, 3,

        // 后面的四个顶点
        -3, -3, -3,
        3, -3, -3,
        3, 3, -3,
        -3, 3, -3
      ];

      // 定义立方体的面（索引）数据
      const indices = [
        0, 1, 2, 2, 3, 0, // 前面两个三角形
        6, 5, 4, 4, 7, 6, // 后面两个三角形
        1, 5, 6, 6, 2, 1, // 右侧两个三角形
        4, 0, 3, 3, 7, 4, // 左侧两个三角形
        3, 2, 6, 6, 7, 3, // 顶部两个三角形
        5, 1, 0, 0, 4, 5  // 底部两个三角形
      ];

      // 计算顶点法向量
      const normals = [];
      for (let i = 0; i < indices.length; i += 3) {
        const indexA = indices[i];
        const indexB = indices[i + 1];
        const indexC = indices[i + 2];

        const vertexA = new THREE.Vector3(vertices[indexA * 3], vertices[indexA * 3 + 1], vertices[indexA * 3 + 2]);
        const vertexB = new THREE.Vector3(vertices[indexB * 3], vertices[indexB * 3 + 1], vertices[indexB * 3 + 2]);
        const vertexC = new THREE.Vector3(vertices[indexC * 3], vertices[indexC * 3 + 1], vertices[indexC * 3 + 2]);

        const normal = new THREE.Vector3();
        normal.crossVectors(vertexB.clone().sub(vertexA), vertexC.clone().sub(vertexA)).normalize();

        normals.push(normal.x, normal.y, normal.z);
      }
      console.log('normals',normals);
      
      // 将顶点坐标和法向量数据创建为BufferAttribute
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
      geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
      geometry.setIndex(indices);
      geometry.computeVertexNormals() //

      // 创建一个Mesh
      const material = new THREE.MeshStandardMaterial(); // 使用法线材质以便观察法向量效果
      const mesh = new THREE.Mesh(geometry, material);

      // 将Mesh添加到场景中
      this.scene.add(mesh);

      // this.render();
    }
  }
  setPlan():void{
    if(this.scene){
       // 创建一个BufferGeometry
       const geometry = new THREE.BufferGeometry();

       // 定义立方体的顶点坐标
       const vertices = [
         // 前面的四个顶点
         -3, -3, 3,
         3, -3, 3,
         3, 3, 3,
         -3, 3, 3,
       ];
 
       // 定义立方体的面（索引）数据
       const indices = [
         0, 1, 2, 2, 3, 0, // 前面两个三角形
       ];
 
       // 计算顶点法向量
       const normals = [];
       for (let i = 0; i < indices.length; i += 3) {
         const indexA = indices[i];
         const indexB = indices[i + 1];
         const indexC = indices[i + 2];
 
         const vertexA = new THREE.Vector3(vertices[indexA * 3], vertices[indexA * 3 + 1], vertices[indexA * 3 + 2]);
         const vertexB = new THREE.Vector3(vertices[indexB * 3], vertices[indexB * 3 + 1], vertices[indexB * 3 + 2]);
         const vertexC = new THREE.Vector3(vertices[indexC * 3], vertices[indexC * 3 + 1], vertices[indexC * 3 + 2]);
 
         const normal = new THREE.Vector3();
         normal.crossVectors(vertexB.clone().sub(vertexA), vertexC.clone().sub(vertexA)).normalize();
 
         normals.push(normal.x, normal.y, normal.z);
       }
       console.log('normals',normals);
       
       // 将顶点坐标和法向量数据创建为BufferAttribute
       geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
       geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
       geometry.setIndex(indices);
       geometry.computeVertexNormals() //
 
       // 创建一个Mesh
       const material = new THREE.MeshStandardMaterial(); // 使用法线材质以便观察法向量效果
       const mesh = new THREE.Mesh(geometry, material);
       mesh.position.y = 10
       // 将Mesh添加到场景中
       this.scene.add(mesh);
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
      // this.mesh.rotation.x += 0.001;
      this.mesh.rotation.y += 0.01;
      this.render();
    }
  }
}