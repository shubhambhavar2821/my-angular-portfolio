import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as THREE from 'three';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('threeCanvas', { static: false }) canvasRef?: ElementRef<HTMLCanvasElement>;

  // Typewriter effect state
  roles: string[] = [
    'Full Stack Developer',
    'Frontend Developer',
    'Data Science Graduate',
    'Angular & Node.js Specialist'
  ];
  currentRole = '';
  roleIndex = 0;
  charIndex = 0;
  isDeleting = false;
  typingSpeed = 100;
  private typingTimeout: any;

  // Three.js instances
  private scene?: THREE.Scene;
  private camera?: THREE.PerspectiveCamera;
  private renderer?: THREE.WebGLRenderer;
  private particlesMesh?: THREE.Points;
  private mainObjectGroup?: THREE.Group;
  private animationFrameId?: number;

  private mouseX = 0;
  private mouseY = 0;
  private targetX = 0;
  private targetY = 0;

  ngAfterViewInit(): void {
    this.startTypewriter();
    // Use setTimeout to ensure DOM layout dimensions are fully calculated
    setTimeout(() => {
      this.initThreeJs();
    }, 50);
  }

  ngOnDestroy(): void {
    if (this.typingTimeout) clearTimeout(this.typingTimeout);
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
    if (this.renderer) {
      this.renderer.dispose();
    }
  }

  private startTypewriter(): void {
    const fullText = this.roles[this.roleIndex];
    if (this.isDeleting) {
      this.currentRole = fullText.substring(0, this.charIndex - 1);
      this.charIndex--;
      this.typingSpeed = 50;
    } else {
      this.currentRole = fullText.substring(0, this.charIndex + 1);
      this.charIndex++;
      this.typingSpeed = 100;
    }

    if (!this.isDeleting && this.charIndex === fullText.length) {
      this.isDeleting = true;
      this.typingSpeed = 1800;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.roleIndex = (this.roleIndex + 1) % this.roles.length;
      this.typingSpeed = 400;
    }

    this.typingTimeout = setTimeout(() => this.startTypewriter(), this.typingSpeed);
  }

  private initThreeJs(): void {
    try {
      if (!this.canvasRef || !this.canvasRef.nativeElement) return;
      const canvas = this.canvasRef.nativeElement;
      const width = canvas.parentElement?.clientWidth || window.innerWidth || 800;
      const height = Math.max(canvas.parentElement?.clientHeight || 0, window.innerHeight || 600);

      // 1. Scene setup
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(60, width / Math.max(height, 1), 0.1, 1000);
      this.camera.position.z = 25;

      // 2. Renderer setup
      this.renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

      // 3. Central 3D Developer Objects Group
      this.mainObjectGroup = new THREE.Group();

      // 3A. Cyber Icosahedron (Core Node)
      const icoGeometry = new THREE.IcosahedronGeometry(7, 1);
      const icoMaterial = new THREE.MeshStandardMaterial({
        color: 0x00f0ff,
        wireframe: true,
        transparent: true,
        opacity: 0.45,
        roughness: 0.2,
        metalness: 0.8
      });
      const icoMesh = new THREE.Mesh(icoGeometry, icoMaterial);
      this.mainObjectGroup.add(icoMesh);

      // 3B. Inner Glowing Polyhedron Core
      const innerGeo = new THREE.OctahedronGeometry(4, 0);
      const innerMat = new THREE.MeshBasicMaterial({
        color: 0xa855f7,
        wireframe: true,
        transparent: true,
        opacity: 0.65
      });
      const innerMesh = new THREE.Mesh(innerGeo, innerMat);
      this.mainObjectGroup.add(innerMesh);

      // 3C. Orbiting Torus Rings
      const ringGeo = new THREE.TorusGeometry(10, 0.08, 16, 100);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        transparent: true,
        opacity: 0.35
      });
      const ringMesh1 = new THREE.Mesh(ringGeo, ringMat);
      ringMesh1.rotation.x = Math.PI / 3;
      this.mainObjectGroup.add(ringMesh1);

      const ringMesh2 = new THREE.Mesh(ringGeo, ringMat);
      ringMesh2.rotation.y = Math.PI / 4;
      this.mainObjectGroup.add(ringMesh2);

      if (width < 992) {
        this.mainObjectGroup.position.set(0, 5, -8);
        this.mainObjectGroup.scale.set(0.7, 0.7, 0.7);
      } else {
        this.mainObjectGroup.position.set(11, 0, 0);
        this.mainObjectGroup.scale.set(1, 1, 1);
      }
      this.scene.add(this.mainObjectGroup);

      // 4. Particle Starfield / Constellation
      const particleCount = 600;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      const cyan = new THREE.Color(0x00f0ff);
      const purple = new THREE.Color(0xa855f7);
      const white = new THREE.Color(0xffffff);

      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 80;
        positions[i + 1] = (Math.random() - 0.5) * 60;
        positions[i + 2] = (Math.random() - 0.5) * 50;

        const randomColor = Math.random();
        const chosenColor = randomColor < 0.4 ? cyan : randomColor < 0.7 ? purple : white;
        colors[i] = chosenColor.r;
        colors[i + 1] = chosenColor.g;
        colors[i + 2] = chosenColor.b;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.18,
        vertexColors: true,
        transparent: true,
        opacity: 0.75
      });

      this.particlesMesh = new THREE.Points(geometry, particlesMaterial);
      this.scene.add(this.particlesMesh);

      // 5. Lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
      this.scene.add(ambientLight);

      const pointLight = new THREE.PointLight(0x00f0ff, 2, 50);
      pointLight.position.set(10, 10, 15);
      this.scene.add(pointLight);

      const purplePointLight = new THREE.PointLight(0xa855f7, 2, 50);
      purplePointLight.position.set(-10, -10, 15);
      this.scene.add(purplePointLight);

      // 6. Render Loop
      this.animate();
    } catch (err) {
      console.warn('Three.js 3D canvas initialization warning (fallback active):', err);
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    if (!this.renderer || !this.camera || !this.canvasRef || !this.canvasRef.nativeElement) return;
    const canvas = this.canvasRef.nativeElement;
    const width = canvas.parentElement?.clientWidth || window.innerWidth || 800;
    const height = Math.max(canvas.parentElement?.clientHeight || 0, window.innerHeight || 600);

    this.camera.aspect = width / Math.max(height, 1);
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);

    if (this.mainObjectGroup) {
      if (width < 992) {
        this.mainObjectGroup.position.set(0, 5, -8);
        this.mainObjectGroup.scale.set(0.7, 0.7, 0.7);
      } else {
        this.mainObjectGroup.position.set(11, 0, 0);
        this.mainObjectGroup.scale.set(1, 1, 1);
      }
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;
    this.targetX = (event.clientX - windowHalfX) * 0.0006;
    this.targetY = (event.clientY - windowHalfY) * 0.0006;
  }

  private animate = (): void => {
    this.animationFrameId = requestAnimationFrame(this.animate);

    if (!this.renderer || !this.scene || !this.camera) return;

    this.mouseX += (this.targetX - this.mouseX) * 0.05;
    this.mouseY += (this.targetY - this.mouseY) * 0.05;

    if (this.mainObjectGroup) {
      this.mainObjectGroup.rotation.x += 0.004;
      this.mainObjectGroup.rotation.y += 0.006;
      this.mainObjectGroup.rotation.z += 0.002;
    }

    if (this.particlesMesh) {
      this.particlesMesh.rotation.y += 0.0008;
      this.particlesMesh.rotation.x = this.mouseY * 0.8;
      this.particlesMesh.rotation.y += this.mouseX * 0.8;
    }

    this.renderer.render(this.scene, this.camera);
  };

  downloadResume(): void {
    const resumeUrl = 'assets/resume/Shubham_Bhavar_Resume.pdf';
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Shubham_Bhavar_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
