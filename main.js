const scene = new THREE.Scene();
scene.background = new THREE.Color(0xFFF0F5); 

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Luces mejoradas
const ambientLight = new THREE.AmbientLight(0xFFB6C1, 0.9);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xFF69B4, 1.2);
directionalLight.position.set(10, 20, 5);
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xFFB6C1, 0.7, 30);
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
    
    // Pared frontal con puerta
    const frontWall = new THREE.Mesh(
        new THREE.BoxGeometry(30, 15, 0.5),
        wallMaterial
    );
    frontWall.position.z = 15;
    scene.add(frontWall);
    
    // Crear puerta en la pared frontal
    createDoor();
    
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
    
    // Marcos en las paredes
    createWallFrames();
    
    // Lámpara en el techo
    createCeilingLamp();
}

// Crear puerta en la pared frontal con pomo
function createDoor() {
    const doorGroup = new THREE.Group();
    
    // Marco de la puerta
    const doorFrame = new THREE.Mesh(
        new THREE.BoxGeometry(8, 12, 0.6),
        new THREE.MeshLambertMaterial({ color: 0xFF69B4 })
    );
    doorFrame.position.set(0, -1.5, 14.8);
    doorGroup.add(doorFrame);
    
    // Puerta
    const door = new THREE.Mesh(
        new THREE.BoxGeometry(7, 11, 0.3),
        new THREE.MeshLambertMaterial({ color: 0xFF1493 })
    );
    door.position.set(0, -1.5, 14.9);
    doorGroup.add(door);
    
    // Pomo de la puerta (esfera)
    const doorKnob = new THREE.Mesh(
        new THREE.SphereGeometry(0.3, 16, 16),
        new THREE.MeshLambertMaterial({ color: 0xFFE4E1 })
    );
    doorKnob.position.set(3, -1.5, 15.1);
    doorGroup.add(doorKnob);
    
    scene.add(doorGroup);
}

// Crear marcos en las paredes
function createWallFrames() {
    const frameMaterial = new THREE.MeshLambertMaterial({ color: 0xFF69B4 });
    const paintingMaterial = new THREE.MeshLambertMaterial({ color: 0xFFB6C1 });
    
    // Marco en pared trasera izquierda
    const frame1 = new THREE.Group();
    
    const frameBorder1 = new THREE.Mesh(
        new THREE.BoxGeometry(5, 4, 0.2),
        frameMaterial
    );
    frame1.add(frameBorder1);
    
    const painting1 = new THREE.Mesh(
        new THREE.BoxGeometry(4.5, 3.5, 0.1),
        paintingMaterial
    );
    painting1.position.z = 0.05;
    frame1.add(painting1);
    
    frame1.position.set(-8, 0, -14.8);
    scene.add(frame1);
    
    // Marco en pared trasera derecha - MÁS LARGO
    const frame2 = new THREE.Group();
    
    const frameBorder2 = new THREE.Mesh(
        new THREE.BoxGeometry(5, 6, 0.2),
        frameMaterial
    );
    frame2.add(frameBorder2);
    
    const painting2 = new THREE.Mesh(
        new THREE.BoxGeometry(4.5, 5.5, 0.1),
        paintingMaterial
    );
    painting2.position.z = 0.05;
    frame2.add(painting2);
    
    frame2.position.set(8, 1, -14.8);
    scene.add(frame2);
    
    // Marco en pared derecha - MÁS GRANDE (cerca de las flores)
    const frame3 = new THREE.Group();
    
    const frameBorder3 = new THREE.Mesh(
        new THREE.BoxGeometry(7, 5, 0.2),
        frameMaterial
    );
    frame3.add(frameBorder3);
    
    const painting3 = new THREE.Mesh(
        new THREE.BoxGeometry(6.5, 4.5, 0.1),
        paintingMaterial
    );
    painting3.position.z = 0.05;
    frame3.add(painting3);
    
    frame3.position.set(14.8, 1, -5);
    frame3.rotation.y = Math.PI / 2;
    scene.add(frame3);
}

// Crear lámpara en el techo con mejor iluminación
function createCeilingLamp() {
    const lampGroup = new THREE.Group();
    
    // Base de la lámpara en el techo
    const lampBase = new THREE.Mesh(
        new THREE.CylinderGeometry(1.5, 1.5, 0.5, 16),
        new THREE.MeshLambertMaterial({ color: 0xFF69B4 })
    );
    lampBase.position.y = 7.25;
    lampGroup.add(lampBase);
    
    // Cadena de la lámpara
    const lampChain = new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.1, 2, 8),
        new THREE.MeshLambertMaterial({ color: 0xFF69B4 })
    );
    lampChain.position.y = 6;
    lampGroup.add(lampChain);
    
    // Pantalla de la lámpara
    const lampShade = new THREE.Mesh(
        new THREE.ConeGeometry(2, 1.5, 16),
        new THREE.MeshLambertMaterial({ 
            color: 0xFFE4E1,
            transparent: true,
            opacity: 0.8
        })
    );
    lampShade.position.y = 5.5;
    lampShade.rotation.x = Math.PI;
    lampGroup.add(lampShade);
    
    // Luz de la lámpara de techo
    const ceilingLight = new THREE.PointLight(0xFFB6C1, 1.5, 25, 2);
    ceilingLight.position.set(0, 5.5, 0);
    
    const lightHelper = new THREE.PointLightHelper(ceilingLight, 0.5, 0xFFB6C1);
    scene.add(lightHelper);
    
    lampGroup.add(ceilingLight);
    
    scene.add(lampGroup);
}

// Crear muebles 
function createFurniture() {
    // Cama más grande
    const bed = new THREE.Mesh(
        new THREE.BoxGeometry(12, 1.5, 6),
        new THREE.MeshLambertMaterial({ color: 0xFF69B4 }) 
    );
    bed.position.set(-8, -6.25, -5);
    scene.add(bed);
    
    // Cabecero de la cama en la parte superior (cabeza)
    const headboard = new THREE.Mesh(
        new THREE.BoxGeometry(12, 3, 0.5),
        new THREE.MeshLambertMaterial({ color: 0xFF1493 }) 
    );
    headboard.position.set(-8, -4.5, -8);
    scene.add(headboard);
    
    // Almohada en la cabecera
    const headboardPillow = new THREE.Mesh(
        new THREE.BoxGeometry(10, 0.8, 0.8),
        new THREE.MeshLambertMaterial({ color: 0xFFB6C1 }) 
    );
    headboardPillow.position.set(-8, -4, -7.8);
    scene.add(headboardPillow);
    
    // Almohadas en la cama
    const pillow1 = new THREE.Mesh(
        new THREE.BoxGeometry(3, 0.5, 2.5),
        new THREE.MeshLambertMaterial({ color: 0xFF1493 }) 
    );
    pillow1.position.set(-8, -5.5, -6.5);
    scene.add(pillow1);
    
    const pillow2 = new THREE.Mesh(
        new THREE.BoxGeometry(3, 0.5, 2.5),
        new THREE.MeshLambertMaterial({ color: 0xFF1493 }) 
    );
    pillow2.position.set(-5, -5.5, -6.5);
    scene.add(pillow2);
    
    // Armario detrás del florero - CON ROTACIÓN DE 255 GRADOS (210 + 45)
    createWardrobe();
    
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
    
    // Lámpara al lado de la cabecera de la cama - EN POSICIÓN X=0
    createBedsideLamp();
    
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
            new THREE.MeshLambertMaterial({ color: 0x32CD32 })
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

// Crear lámpara de mesa - EN POSICIÓN X=0
function createBedsideLamp() {
    const bedsideLampGroup = new THREE.Group();
    
    // Base de la lámpara
    const lampBase = new THREE.Mesh(
        new THREE.CylinderGeometry(0.8, 0.8, 0.2, 16),
        new THREE.MeshLambertMaterial({ color: 0xFF1493 })
    );
    lampBase.position.set(0, -6.9, -7.5);
    bedsideLampGroup.add(lampBase);
    
    // Poste de la lámpara (más largo)
    const lamp = new THREE.Mesh(
        new THREE.CylinderGeometry(0.15, 0.15, 3.5, 16),
        new THREE.MeshLambertMaterial({ color: 0xFF1493 }) 
    );
    lamp.position.set(0, -5.2, -7.5);
    bedsideLampGroup.add(lamp);
    
    // Pantalla de la lámpara (más grande)
    const lampShade = new THREE.Mesh(
        new THREE.ConeGeometry(1.2, 2, 16),
        new THREE.MeshLambertMaterial({ 
            color: 0xFFE4E1,
            transparent: true,
            opacity: 0.8
        })
    );
    lampShade.position.set(0, -3.5, -7.5);
    bedsideLampGroup.add(lampShade);
    
    // Luz de la lámpara de mesa
    const bedsideLight = new THREE.PointLight(0xFFB6C1, 1.2, 12, 2);
    bedsideLight.position.set(0, -3.5, -7.5);
    
    const bedsideLightHelper = new THREE.PointLightHelper(bedsideLight, 0.3, 0xFFB6C1);
    scene.add(bedsideLightHelper);
    
    bedsideLampGroup.add(bedsideLight);
    
    scene.add(bedsideLampGroup);
}

// Crear armario detrás del florero - CON ROTACIÓN DE 255 GRADOS (210 + 45)
function createWardrobe() {
    const wardrobeGroup = new THREE.Group();
    
    // Cuerpo del armario
    const wardrobeBody = new THREE.Mesh(
        new THREE.BoxGeometry(5, 10, 2),
        new THREE.MeshLambertMaterial({ color: 0xFF69B4 })
    );
    wardrobeBody.position.set(0, 0, 0);
    wardrobeGroup.add(wardrobeBody);
    
    // Puertas del armario
    const door1 = new THREE.Mesh(
        new THREE.BoxGeometry(2.2, 9.5, 0.1),
        new THREE.MeshLambertMaterial({ color: 0xFF1493 })
    );
    door1.position.set(0.5, 0, 1);
    wardrobeGroup.add(door1);
    
    const door2 = new THREE.Mesh(
        new THREE.BoxGeometry(2.2, 9.5, 0.1),
        new THREE.MeshLambertMaterial({ color: 0xFF1493 })
    );
    door2.position.set(-0.5, 0, 1);
    wardrobeGroup.add(door2);
    
    // MANIJAS MEJORADAS
    const handle1 = new THREE.Mesh(
        new THREE.CylinderGeometry(0.15, 0.15, 0.8, 8),
        new THREE.MeshLambertMaterial({ color: 0xFFE4E1 })
    );
    handle1.position.set(1.1, 0, 1);
    handle1.rotation.z = Math.PI / 2;
    wardrobeGroup.add(handle1);
    
    const handle2 = new THREE.Mesh(
        new THREE.CylinderGeometry(0.15, 0.15, 0.8, 8),
        new THREE.MeshLambertMaterial({ color: 0xFFE4E1 })
    );
    handle2.position.set(-1.1, 0, 1);
    handle2.rotation.z = Math.PI / 2;
    wardrobeGroup.add(handle2);
    
    // Base del armario
    const wardrobeBase = new THREE.Mesh(
        new THREE.BoxGeometry(5.2, 0.5, 2.2),
        new THREE.MeshLambertMaterial({ color: 0xFF1493 })
    );
    wardrobeBase.position.set(0, -5, 0);
    wardrobeGroup.add(wardrobeBase);
    
    // APLICAR ROTACIÓN DE 255 GRADOS
    wardrobeGroup.rotation.y = Math.PI + Math.PI/6 + Math.PI/4;
    
    // Posicionar el grupo
    wardrobeGroup.position.set(12, -2, 10);
    
    scene.add(wardrobeGroup);
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
