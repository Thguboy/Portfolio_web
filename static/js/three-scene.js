import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js";

const canvas = document.getElementById("bg-canvas");
if (!canvas) return;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 1.2, 5.5);

const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x000000, 0);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.1;

scene.add(new THREE.AmbientLight(0xffffff, 0.45));
const keyLight = new THREE.DirectionalLight(0x818cf8, 1.4);
keyLight.position.set(4, 6, 5);
scene.add(keyLight);
const rimLight = new THREE.DirectionalLight(0xec4899, 0.6);
rimLight.position.set(-5, 2, -3);
scene.add(rimLight);
const fillLight = new THREE.PointLight(0x6366f1, 0.8, 20);
fillLight.position.set(0, 3, 2);
scene.add(fillLight);

let laptopGroup = new THREE.Group();
scene.add(laptopGroup);

let screenMesh = null;
let scrollProgress = 0;
let autoRotation = 0;

function createScreenTexture() {
    const texCanvas = document.createElement("canvas");
    texCanvas.width = 1024;
    texCanvas.height = 640;
    const ctx = texCanvas.getContext("2d");

  function drawScreen() {
        const heroEl = document.querySelector(".hero-content");
        const captureEl = document.getElementById("hero-capture");

        if (captureEl) {
            htmlToCanvas(captureEl, texCanvas, ctx);
            return;
        }

        const grad = ctx.createLinearGradient(0, 0, texCanvas.width, texCanvas.height);
        grad.addColorStop(0, "#0a0a0f");
        grad.addColorStop(0.5, "#1a1035");
        grad.addColorStop(1, "#0f0a1a");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, texCanvas.width, texCanvas.height);

        ctx.fillStyle = "rgba(99, 102, 241, 0.15)";
        ctx.beginPath();
        ctx.ellipse(512, 200, 400, 200, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#818cf8";
        ctx.font = "500 28px Inter, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("Salom, men", 512, 180);

        const nameGrad = ctx.createLinearGradient(300, 220, 724, 280);
        nameGrad.addColorStop(0, "#6366f1");
        nameGrad.addColorStop(0.5, "#a855f7");
        nameGrad.addColorStop(1, "#ec4899");
        ctx.fillStyle = nameGrad;
        ctx.font = "800 52px Inter, sans-serif";
        ctx.fillText("Saidaxmatov Saidaziz", 512, 260);

        ctx.fillStyle = "#8b8b9e";
        ctx.font = "500 26px Inter, sans-serif";
        ctx.fillText("Frontend & Backend Dasturchi", 512, 320);

        ctx.fillStyle = "rgba(255,255,255,0.06)";
        ctx.fillRect(80, 380, 864, 2);

        const projects = ["FLAME BURGER", "CyberDojo", "NexLMS AI", "SmartRealEstate", "Kanban Board"];
        ctx.font = "600 18px JetBrains Mono, monospace";
        projects.forEach((p, i) => {
            const x = 120 + (i % 3) * 280;
            const y = 430 + Math.floor(i / 3) * 50;
            ctx.fillStyle = "rgba(129, 140, 248, 0.9)";
            ctx.fillText(`< ${p} />`, x, y);
        });

        ctx.fillStyle = "#6366f1";
        ctx.font = "700 20px Inter, sans-serif";
        ctx.fillText("Portfolio 2026", 512, 580);
    }

    drawScreen();

    const texture = new THREE.CanvasTexture(texCanvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    return { texture, texCanvas, redraw: drawScreen };
}

function htmlToCanvas(source, texCanvas, ctx) {
    const rect = source.getBoundingClientRect();
    const scale = Math.min(texCanvas.width / rect.width, texCanvas.height / rect.height) * 0.85;

    ctx.fillStyle = "#0a0a0f";
    ctx.fillRect(0, 0, texCanvas.width, texCanvas.height);

    const grad = ctx.createRadialGradient(512, 200, 0, 512, 200, 500);
    grad.addColorStop(0, "rgba(99, 102, 241, 0.2)");
    grad.addColorStop(1, "transparent");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, texCanvas.width, texCanvas.height);

    ctx.save();
    ctx.translate(texCanvas.width / 2, texCanvas.height / 2);
    ctx.scale(scale, scale);
    ctx.translate(-rect.width / 2, -rect.height / 2);

    const greeting = source.querySelector(".hero-greeting");
    const name = source.querySelector(".hero-name");
    const role = source.querySelector(".hero-role");

    if (greeting) {
        ctx.fillStyle = "#818cf8";
        ctx.font = "500 22px Inter, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(greeting.textContent, rect.width / 2, 60);
    }
    if (name) {
        const nameGrad = ctx.createLinearGradient(0, 80, rect.width, 120);
        nameGrad.addColorStop(0, "#6366f1");
        nameGrad.addColorStop(0.5, "#a855f7");
        nameGrad.addColorStop(1, "#ec4899");
        ctx.fillStyle = nameGrad;
        ctx.font = "800 42px Inter, sans-serif";
        ctx.fillText(name.textContent.replace(/\s+/g, " ").trim(), rect.width / 2, 110);
    }
    if (role) {
        ctx.fillStyle = "#8b8b9e";
        ctx.font = "500 20px Inter, sans-serif";
        ctx.fillText(role.textContent, rect.width / 2, 150);
    }

    ctx.restore();
}

const screenData = createScreenTexture();

function buildProceduralLaptop(texture) {
    const group = new THREE.Group();

    const bodyMat = new THREE.MeshStandardMaterial({
        color: 0x1c1c28,
        metalness: 0.85,
        roughness: 0.25,
    });

    const base = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.1, 2.3), bodyMat);
    base.position.y = -0.05;
    base.castShadow = true;
    group.add(base);

    const keyboard = new THREE.Mesh(
        new THREE.BoxGeometry(3.0, 0.02, 1.8),
        new THREE.MeshStandardMaterial({ color: 0x111118, metalness: 0.5, roughness: 0.6 })
    );
    keyboard.position.set(0, 0.06, 0.1);
    group.add(keyboard);

    const hinge = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, 3.2, 16),
        bodyMat
    );
    hinge.rotation.z = Math.PI / 2;
    hinge.position.set(0, 0.05, -1.05);
    group.add(hinge);

    const lidGroup = new THREE.Group();
    lidGroup.position.set(0, 0.05, -1.05);

    const lid = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.08, 2.3), bodyMat);
    lid.position.set(0, 1.15, 1.05);
    lid.castShadow = true;
    lidGroup.add(lid);

    const bezel = new THREE.Mesh(
        new THREE.BoxGeometry(3.1, 0.04, 1.95),
        new THREE.MeshStandardMaterial({ color: 0x0a0a0f, metalness: 0.3, roughness: 0.8 })
    );
    bezel.position.set(0, 1.15, 1.18);
    lidGroup.add(bezel);

    const display = new THREE.Mesh(
        new THREE.PlaneGeometry(2.85, 1.75),
        new THREE.MeshBasicMaterial({ map: texture, toneMapped: false })
    );
    display.position.set(0, 1.15, 1.21);
    lidGroup.add(display);
    screenMesh = display;

    lidGroup.rotation.x = -Math.PI * 0.42;
    group.add(lidGroup);

    const logo = new THREE.Mesh(
        new THREE.CircleGeometry(0.06, 16),
        new THREE.MeshStandardMaterial({ color: 0x6366f1, emissive: 0x6366f1, emissiveIntensity: 0.5 })
    );
    logo.position.set(0, 0.07, -1.0);
    logo.rotation.x = -Math.PI / 2;
    group.add(logo);

    return group;
}

function applyScreenTexture(texture) {
    if (screenMesh) {
        screenMesh.material.map = texture;
        screenMesh.material.needsUpdate = true;
    }
}

function loadExternalModel(texture) {
    const loader = new GLTFLoader();
    loader.load(
        "/static/models/laptop.glb",
        (gltf) => {
            laptopGroup.clear();
            const model = gltf.scene;
            model.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                    if (child.name.toLowerCase().includes("screen") || child.name.toLowerCase().includes("display")) {
                        child.material = new THREE.MeshBasicMaterial({ map: texture, toneMapped: false });
                        screenMesh = child;
                    }
                }
            });
            model.scale.set(1.5, 1.5, 1.5);
            model.position.y = -0.5;
            laptopGroup.add(model);
        },
        undefined,
        () => {
            laptopGroup.add(buildProceduralLaptop(texture));
        }
    );
}

loadExternalModel(screenData.texture);

laptopGroup.position.set(1.5, -0.3, 0);
laptopGroup.scale.set(0.9, 0.9, 0.9);

function onScroll() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
}

window.addEventListener("scroll", onScroll, { passive: true });

function animate() {
    requestAnimationFrame(animate);
    autoRotation += 0.006;

    const scrollY = window.scrollY;
    const heroHeight = window.innerHeight;

    laptopGroup.rotation.y = autoRotation + scrollProgress * Math.PI * 2;
    laptopGroup.rotation.x = Math.sin(autoRotation * 0.5) * 0.08 + scrollProgress * 0.3;
    laptopGroup.position.y = -0.3 + Math.sin(autoRotation * 0.7) * 0.15 - scrollProgress * 0.8;
    laptopGroup.position.x = 1.5 - scrollProgress * 1.0;

    const heroFade = Math.min(scrollY / heroHeight, 1);
    laptopGroup.scale.setScalar(0.9 - heroFade * 0.15);
    canvas.style.opacity = String(1 - heroFade * 0.35);

    if (scrollY > 50 && screenData.texCanvas) {
        screenData.redraw();
        screenData.texture.needsUpdate = true;
    }

    camera.position.z = 5.5 + scrollProgress * 1.5;
    camera.position.y = 1.2 - scrollProgress * 0.5;
    camera.lookAt(0, 0.5 - scrollProgress * 0.3, 0);

    renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

setTimeout(() => {
    screenData.redraw();
    screenData.texture.needsUpdate = true;
    applyScreenTexture(screenData.texture);
}, 500);

animate();

export { screenData };
