const scene = new THREE.Scene();
scene.background = new THREE.Color(0xFFF0F5); 

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Luces 
const ambientLight = new THREE.AmbientLight(0xFFB6C1, 0.7); 
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xFF69B4, 0.8); 
directionalLight.position.set(10, 20, 5);
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xFF1493, 0.5, 100); 
pointLight.position.set(0, 5, 0);
scene.add(pointLight);

// Crear habitación 
function createRoom() {
    // Paredes
    const wallMaterial = new THREE.MeshLambertMaterial({ color: 0xF8C8DC }); 
    
    // Pared trasera
    const backWall = new THREE.Mesh(
        new THREE.BoxGeometry(30, 15, 0.5),
        wallMaterial
    );
    backWall.position.z = -15;
    scene.add(backWall);
    
    // Pared izquierda
    const leftWall = new THREE.Mesh(
        new THREE.BoxGeometry(30, 15, 0.5),
        wallMaterial
    );
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.x = -15;
    scene.add(leftWall);
    
    // Pared derecha
    const rightWall = new THREE.Mesh(
        new THREE.BoxGeometry(30, 15, 0.5),
        wallMaterial
    );
    rightWall.rotation.y = Math.PI / 2;
    rightWall.position.x = 15;
    scene.add(rightWall);
    
    // Piso
    const floor = new THREE.Mesh(
        new THREE.BoxGeometry(30, 0.5, 30),
        new THREE.MeshLambertMaterial({ color: 0xDB7093 })
    );
    floor.position.y = -7.5;
    scene.add(floor);
    
    // Techo
    const ceiling = new THREE.Mesh(
        new THREE.BoxGeometry(30, 0.5, 30),
        new THREE.MeshLambertMaterial({ color: 0xFFE4E1 }) 
    );
    ceiling.position.y = 7.5;
    scene.add(ceiling);
}

// Crear muebles 
function createFurniture() {
    // Cama
    const bed = new THREE.Mesh(
        new THREE.BoxGeometry(8, 1, 4),
        new THREE.MeshLambertMaterial({ color: 0xFF69B4 }) 
    );
    bed.position.set(-10, -6.5, -10);
    scene.add(bed);
    
    // Almohadas
    const pillow1 = new THREE.Mesh(
        new THREE.BoxGeometry(2, 0.5, 1.5),
        new THREE.MeshLambertMaterial({ color: 0xFF1493 }) 
    );
    pillow1.position.set(-10, -6, -8.5);
    scene.add(pillow1);
    
    const pillow2 = new THREE.Mesh(
        new THREE.BoxGeometry(2, 0.5, 1.5),
        new THREE.MeshLambertMaterial({ color: 0xFF1493 }) 
    );
    pillow2.position.set(-8, -6, -8.5);
    scene.add(pillow2);
    
    // Mesa
    const table = new THREE.Mesh(
        new THREE.BoxGeometry(6, 0.5, 3),
        new THREE.MeshLambertMaterial({ color: 0xFFB6C1 }) 
    );
    table.position.set(10, -4.5, 5);
    scene.add(table);
    
    // Silla
    const chair = new THREE.Mesh(
        new THREE.BoxGeometry(2, 3, 2),
        new THREE.MeshLambertMaterial({ color: 0xFF69B4 }) 
    );
    chair.position.set(10, -5, 5);
    scene.add(chair);
    
    // Lámpara al lado de la cama
    const lamp = new THREE.Mesh(
        new THREE.CylinderGeometry(0.3, 0.3, 2, 16),
        new THREE.MeshLambertMaterial({ color: 0xFF1493 }) 
    );
    lamp.position.set(-5, -6, -10); // Al lado derecho de la cama
    scene.add(lamp);
    
    const lampShade = new THREE.Mesh(
        new THREE.ConeGeometry(1, 1.5, 16),
        new THREE.MeshLambertMaterial({ color: 0xFFE4E1 }) 
    );
    lampShade.position.set(-5, -5, -10);
    scene.add(lampShade);
    
    // Tapete 
    const rugPattern = new THREE.Mesh(
        new THREE.RingGeometry(3, 4.5, 32), 
        new THREE.MeshLambertMaterial({ color: 0xFF1493 }) 
    );
    rugPattern.position.set(0, -7.2, 0);
    rugPattern.rotation.x = -Math.PI / 2;
    scene.add(rugPattern);
    
    // Patrón decorativo del tapete
    const rugPattern2 = new THREE.Mesh(
        new THREE.RingGeometry(1, 2, 32),
        new THREE.MeshLambertMaterial({ color: 0xFFB6C1 }) 
    );
    rugPattern2.position.set(0, -7.1, 0);
    rugPattern2.rotation.x = -Math.PI / 2;
    scene.add(rugPattern2);
    
    // Ventana
    const windowFrame = new THREE.Mesh(
        new THREE.BoxGeometry(6, 4, 0.2),
        new THREE.MeshLambertMaterial({ color: 0xFF1493 }) 
    );
    windowFrame.position.set(15, 0, 0);
    windowFrame.rotation.y = Math.PI / 2;
    scene.add(windowFrame);
    
    const windowGlass = new THREE.Mesh(
        new THREE.PlaneGeometry(5.5, 3.5),
        new THREE.MeshLambertMaterial({ 
            color: 0xFFB6C1,
            transparent: true,
            opacity: 0.7
        })
    );
    windowGlass.position.set(14.9, 0, 0);
    windowGlass.rotation.y = Math.PI / 2;
    scene.add(windowGlass);
    
    // Florero
    const vase = new THREE.Mesh(
        new THREE.CylinderGeometry(0.8, 0.5, 2, 16),
        new THREE.MeshLambertMaterial({ color: 0xFF1493 }) 
    );
    vase.position.set(10, -3.5, 5);
    scene.add(vase);
    
    // Flores
    for (let i = 0; i < 5; i++) {
        const flowerStem = new THREE.Mesh(
            new THREE.CylinderGeometry(0.05, 0.05, 1, 8),
            new THREE.MeshLambertMaterial({ color: 0x32CD32 }) // tallos
        );
        flowerStem.position.set(10 + (i * 0.2 - 0.4), -2.5, 5);
        scene.add(flowerStem);
        
        const flower = new THREE.Mesh(
            new THREE.SphereGeometry(0.3, 8, 8),
            new THREE.MeshLambertMaterial({ color: 0xFF69B4 }) 
        );
        flower.position.set(10 + (i * 0.2 - 0.4), -2, 5);
        scene.add(flower);
    }
}

// Crear objetos
createRoom();
createFurniture();

camera.position.set(0, 0, 10);

// Controles - solo arrastrar para mirar
let isDragging = false;
let previousMousePosition = {
    x: 0,
    y: 0
};

// Eventos del ratón
renderer.domElement.addEventListener('mousedown', (e) => {
    isDragging = true;
    previousMousePosition = {
        x: e.clientX,
        y: e.clientY
    };
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - previousMousePosition.x;
    const deltaY = e.clientY - previousMousePosition.y;
    
    camera.rotation.y += deltaX * 0.01;
    camera.rotation.x += deltaY * 0.01;
    
    // Limitar rotación vertical
    camera.rotation.x = Math.max(-Math.PI/2, Math.min(Math.PI/2, camera.rotation.x));
    
    previousMousePosition = {
        x: e.clientX,
        y: e.clientY
    };
});

// Función de animación
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

// Manejar redimensionado de ventana
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Iniciar animación
animate();