import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ThreeD = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // 创建场景
    const scene = new THREE.Scene();
    
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
    const createBox = (position, color) => {
      // 创建噪声纹理
      const textureLoader = new THREE.TextureLoader();
      const noiseTexture = textureLoader.load('https://cdn.jsdelivr.net/gh/mrdoob/three.js/examples/textures/terrain/grasslight-big.jpg');
      noiseTexture.wrapS = THREE.RepeatWrapping;
      noiseTexture.wrapT = THREE.RepeatWrapping;
      noiseTexture.repeat.set(2, 1);
      
      // 外部长方体
      const boxGeometry = new THREE.BoxGeometry(20, 2, 10);
      const material = new THREE.MeshStandardMaterial({
        color: color,
        transparent: true,
        opacity: 0.3,
        roughness: 1,      // 最大粗糙度
        metalness: 0,      // 无金属感
        map: noiseTexture, // 添加纹理贴图
        bumpMap: noiseTexture, // 使用相同的纹理作为凹凸贴图
        bumpScale: 0.5,    // 凹凸程度
        displacementMap: noiseTexture, // 位移贴图
        displacementScale: 0.2, // 位移程度
        side: THREE.DoubleSide
      });
      
      const box = new THREE.Mesh(boxGeometry, material);
      // 细分几何体以增加更多细节
      box.geometry.attributes.position.needsUpdate = true;
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
      
      return box;
    };

    // 创建5个不同颜色的长方体
    const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xff00ff, 0xffff00];
    const spacing = 2.5; // 你可以调整这个值来控制间距，当前是8
    const boxes = colors.map((color, index) => {
      return createBox(new THREE.Vector3(0, index * spacing, 0), color);
    });
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
    //   mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      style={{ 
        width: '100%', 
        height: '100%',
        position: 'absolute'
      }}
    />
  );
};

export default ThreeD;
