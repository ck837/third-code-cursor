import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import pic1 from '../assets/pic1.jpg';
import pic2 from '../assets/pic2.jpg';
import pic3 from '../assets/pic3.jpg';
import pic4 from '../assets/pic4.jpg';
import pic5 from '../assets/pic5.jpg';
import pic6 from '../assets/pic6.jpg';
import back from '../assets/back1.png'; // 确保路径正确


const textures = [pic1, pic2, pic3, pic4, pic5, pic6];

const ThreeD = () => {3
  const mountRef = useRef(null);

  useEffect(() => {
    // 清空之前的内容，防止重复挂载
    if (mountRef.current) {
      mountRef.current.innerHTML = '';
    }
    // 创建场景
    const scene = new THREE.Scene();


      // 加载背景纹理
  const textureLoader = new THREE.TextureLoader();
  textureLoader.load(back, texture => {
    scene.background = texture; // 设置背景纹理
  });
    
    // 创建相机
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 15;
    camera.position.y = 5;
    
    // 创建渲染器
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setClearColor(0xffffff);
    mountRef.current.appendChild(renderer.domElement);
    
    // 添加轨道控制
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // 创建5个长方体的函数
    const createBox = () => {
      // 创建噪声纹理
      const textureLoader = new THREE.TextureLoader();
      const loadedTextures = textures.map(texture => textureLoader.load(texture));
      const noiseTexture = textureLoader.load('https://cdn.jsdelivr.net/gh/mrdoob/three.js/examples/textures/terrain/grasslight-big.jpg');
      noiseTexture.wrapS = THREE.RepeatWrapping;
      noiseTexture.wrapT = THREE.RepeatWrapping;
      noiseTexture.repeat.set(2, 1);
      
      // 外部长方体
      const boxGeometry = new THREE.BoxGeometry(30, 2, 10);
      const boxes = [];

      for (let i = 0; i < 6; i++) {
        const material = new THREE.MeshBasicMaterial({
          map: loadedTextures[i], // 使用加载的纹理
          transparent: true,
          opacity: 0.7, // 设置透明度
        });
    
        const box = new THREE.Mesh(boxGeometry, material);
        box.position.x = i * 3 - 7.5; // 每个长方体沿 x 轴排列，间隔 3
        box.position.y = i * 20; // 保持 y 轴位置不变  
        scene.add(box);
        boxes.push(box);

        

          // 细分几何体以增加更多细节
        box.geometry.attributes.position.needsUpdate = true;

        const position = new THREE.Vector3(0,i * 2.2, 0) ;
        box.position.copy(position);
        
        // 左侧内部小长方体 - 减小高度到0.5 (原来是1)
        const smallBox1 = new THREE.Mesh(
          new THREE.BoxGeometry(1, 0.5, 1),
          new THREE.MeshPhongMaterial({ color: 0x666666 })
        );
        smallBox1.position.x = -1.5; // 调整位置以适应新的宽度
        box.add(smallBox1);
        
        // 右侧内部小长方体 - 减小高度到0.5 (原来是1)
        const smallBox2 = new THREE.Mesh(
          new THREE.BoxGeometry(1, 0.5, 1),
          new THREE.MeshPhongMaterial({ color: 0x666666 })
        );
        smallBox2.position.x = 1.5; // 调整位置以适应新的宽度
        box.add(smallBox2);
      
      }
      

      return boxes;
    };

    // 创建5个不同颜色的长方体
    const spacing = 2.5; // 你可以调整这个值来控制间距，当前是8
    const boxes = createBox();
    boxes.forEach(box => scene.add(box));

    // 添加光源
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // 动画循环
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // 处理窗口大小变化
    const handleResize = () => {
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // 清理函数
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      style={{
        position: 'relative', // 确保伪元素定位正确
        padding: '20px', // 添加内边距
        backgroundColor: '#0e1a2b', // 深色背景
        // borderRadius: '10px', // 圆角边框
        overflow: 'hidden', // 防止内容溢出
  
        width: '100%',
        height: '100%',
      }}
    >
    {/* 蓝色四角边框 */}
    <div 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none', // 防止边框影响内部交互
      }}
    >
      {/* 左上角 */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '20px',
          height: '20px',
          borderTop: '2px solid #00ffff', // 蓝色边框
          borderLeft: '2px solid #00ffff',
        }}
      />
      {/* 右上角 */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '20px',
          height: '20px',
          borderTop: '2px solid #00ffff',
          borderRight: '2px solid #00ffff',
        }}
      />
      {/* 左下角 */}
      <div 
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '20px',
          height: '20px',
          borderBottom: '2px solid #00ffff',
          borderLeft: '2px solid #00ffff',
        }}
      />
      {/* 右下角 */}
      <div 
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '20px',
          height: '20px',
          borderBottom: '2px solid #00ffff',
          borderRight: '2px solid #00ffff',
        }}
      />
    </div>
      {/* 3D 渲染区域 */}
      <div 
        ref={mountRef} 
        style={{ 
          width: '100%',
          height: '100%',
          backgroundColor: '#0e1a2b', // 深色背景
          border: '1px solid #3a4a5f', // 内部边框
          boxShadow: '0 0 20px rgba(0, 255, 255, 0.2)', // 外发光效果
          borderRadius: '10px', // 圆角边框
          overflow: 'hidden', // 防止内容溢出
        }}
      />
    </div>
  );
};

export default ThreeD;
