// Check if THREE.js is loaded
if (typeof THREE === "undefined") {
    console.error("Three.js is not loaded");
  } else {
    // Setup Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a192f);
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('equationContainer').appendChild(renderer.domElement);
  
    // Add window resize handler
    window.addEventListener('resize', onWindowResize, false);
  
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
  
    // Update Spiral Parameters for different screen sizes
    function getResponsiveParameters() {
        const isMobile = window.innerWidth < 768;
        return {
            numCards: 50,
            radius: isMobile ? 4 : 7, // Increased from 3/5 to 4/7
            heightPerLayer: isMobile ? 0.4 : 0.6, // Increased from 0.2/0.3 to 0.4/0.6
            totalRevolutions: isMobile ? 3 : 2,
            verticalOffset: -10
        };
    }
  
    // Update the spiral parameters
    const spiralParams = getResponsiveParameters();
    const numCards = spiralParams.numCards;
    const radius = spiralParams.radius;
    const heightPerLayer = spiralParams.heightPerLayer;
    const totalRevolutions = spiralParams.totalRevolutions;
  
    // Array of equation URLs with higher DPI
    const equations = [{ 
            image: "https://latex.codecogs.com/png.latex?\\dpi{300}%5Csum_%7Bn%3D1%7D%5E%5Cinfty%5Cfrac%7B1%7D%7Bn%5E2%7D",
            name: "Sum of squares" 
        },
        { 
            image: "https://latex.codecogs.com/png.latex?\\dpi{300}%5Cint_%7B0%7D%5E%7B%5Cinfty%7D%5Cfrac%7B%5Csin(nx)%7D%7Bx%5E2+%2B+1%7Ddx",
            name: "Sin Integral" 
        },
        { 
            image: "https://latex.codecogs.com/png.latex?\\dpi{300}e%5E%7Bi%5Cpi%7D+%2B+1+%3D+0",
            name: "Euler's Identity" 
        },
        { 
            image: "https://latex.codecogs.com/png.latex?\\dpi{300}%5C%5Cint%5B%7B0%7D%5E%7B%5Cinfty%7D%5D%20%5Cfrac%7B1%7D%7Bx%5E2%20%2B%201%7D%20dx%20%3D%20%5Cfrac%7B%5Cpi%7D%7B2%7D",
            name: "Arc Length" 
        },
    "https://v5.airtableusercontent.com/v3/u/36/36/1736078400000/AfGN4n_RcNoE6NJbeto1jQ/QdFvGQHWrRudzsUGBeJtfSLXXYTcndTo4qwmdPTuga3lqNekirFgvMlH4HuiaeQ6LUGLdwTA5i_B5hHQbjt4JqIHRBGi2h_tMxi42Bxv3UcFYtXDEjbN82GiM1AyvZt39VlBHQbI6T7sCKHzsruq8XNrjY2GJ9S8OLmO99wMoFs/x-VWVHUEaK0WnRa_1rO7vLZ9e_l64hjw1RoLtYjBvts",
    {"image": "https://v5.airtableusercontent.com/v3/u/36/36/1736078400000/AfGN4n_RcNoE6NJbeto1jQ/QdFvGQHWrRudzsUGBeJtfSLXXYTcndTo4qwmdPTuga3lqNekirFgvMlH4HuiaeQ6LUGLdwTA5i_B5hHQbjt4JqIHRBGi2h_tMxi42Bxv3UcFYtXDEjbN82GiM1AyvZt39VlBHQbI6T7sCKHzsruq8XNrjY2GJ9S8OLmO99wMoFs/x-VWVHUEaK0WnRa_1rO7vLZ9e_l64hjw1RoLtYjBvts", "name": "Rational Pi Integral"},
    {"image": "https://latex.codecogs.com/png.latex?%5C%5Cint%5B%7B0%7D%5E%7B%5Cinfty%7D%5D%20%5Cfrac%7B%5Csin(nx)%7D%7Bx%5E2%20%2B%201%7D%20dx%20%3D%20%5Cfrac%7B%5Cpi%7D%7B2%7D%20%5Ctanh(%5Cfrac%7B%5Cpi%7D%7B2%7Dn)", "name": "Oscillation Rational Hyperbolic Integral"},
    {"image": "https://latex.codecogs.com/png.latex?%5C%5Cint%5B%7B0%7D%5E%7B%5Cinfty%7D%5D%20%5Cfrac%7B%5Csin(nx)%7D%7Bx%5E2%20%2B%201%7D%20dx%20%3D%20%5Cfrac%7B%5Cpi%7D%7B2%7D%20%5Ctanh(%5Cfrac%7B%5Cpi%7D%7B2%7Dn)", "name": "Oscillation Rational Hyperbolic Integral"},
    {"image": "https://latex.codecogs.com/png.latex?%5C%5Cint%5B%7B0%7D%5E%7B%5Cinfty%7D%5D%20%5Cfrac%7B%5Csin(nx)%7D%7Bx%5E2%20%2B%201%7D%20dx%20%3D%20%5Cfrac%7B%5Cpi%7D%7B2%7D%20%5Ctanh(%5Cfrac%7B%5Cpi%7D%7B2%7Dn)", "name": "Oscillation Rational Hyperbolic Integral"},
    {"image": "https://latex.codecogs.com/png.latex?%5C%5Cint%5B%7B0%7D%5E%7B%5Cinfty%7D%5D%20%5Cfrac%7B%5Csin(nx)%7D%7Bx%5E2%20%2B%201%7D%20dx%20%3D%20%5Cfrac%7B%5Cpi%7D%7B2%7D%20%5Ctanh(%5Cfrac%7B%5Cpi%7D%7B2%7Dn)", "name": "Oscillation Rational Hyperbolic Integral"},
    {"image": "https://latex.codecogs.com/png.latex?%5C%5Cint%5B%7B0%7D%5E%7B%5Cinfty%7D%5D%20%5Cfrac%7B%5Csin(nx)%7D%7Bx%5E2%20%2B%201%7D%20dx%20%3D%20%5Cfrac%7B%5Cpi%7D%7B2%7D%20%5Ctanh(%5Cfrac%7B%5Cpi%7D%7B2%7Dn)", "name": "Oscillation Rational Hyperbolic Integral"},
    {"image": "https://latex.codecogs.com/png.latex?%5C%5Cint%5B%7B0%7D%5E%7B%5Cinfty%7D%5D%20%5Cfrac%7B%5Csin(nx)%7D%7Bx%5E2%20%2B%201%7D%20dx%20%3D%20%5Cfrac%7B%5Cpi%7D%7B2%7D%20%5Ctanh(%5Cfrac%7B%5Cpi%7D%7B2%7Dn)", "name": "Oscillation Rational Hyperbolic Integral"},
    {"image": "https://latex.codecogs.com/png.latex?%5C%5Cint%5B%7B0%7D%5E%7B%5Cinfty%7D%5D%20%5Cfrac%7B%5Csin(nx)%7D%7Bx%5E2%20%2B%201%7D%20dx%20%3D%20%5Cfrac%7B%5Cpi%7D%7B2%7D%20%5Ctanh(%5Cfrac%7B%5Cpi%7D%7B2%7Dn)", "name": "Oscillation Rational Hyperbolic Integral"},
    {"image": "https://latex.codecogs.com/png.latex?%5C%5Cint%5B%7B0%7D%5E%7B%5Cinfty%7D%5D%20%5Cfrac%7B%5Csin(nx)%7D%7Bx%5E2%20%2B%201%7D%20dx%20%3D%20%5Cfrac%7B%5Cpi%7D%7B2%7D%20%5Ctanh(%5Cfrac%7B%5Cpi%7D%7B2%7Dn)", "name": "Oscillation Rational Hyperbolic Integral"},
    {"image": "https://latex.codecogs.com/png.latex?%5C%5Cint%5B%7B0%7D%5E%7B%5Cinfty%7D%5D%20%5Cfrac%7B%5Csin(nx)%7D%7Bx%5E2%20%2B%201%7D%20dx%20%3D%20%5Cfrac%7B%5Cpi%7D%7B2%7D%20%5Ctanh(%5Cfrac%7B%5Cpi%7D%7B2%7Dn)", "name": "Oscillation Rational Hyperbolic Integral"},
    {"image": "https://latex.codecogs.com/png.latex?%5C%5Cint%5B%7B0%7D%5E%7B%5Cinfty%7D%5D%20%5Cfrac%7B%5Csin(nx)%7D%7Bx%5E2%20%2B%201%7D%20dx%20%3D%20%5Cfrac%7B%5Cpi%7D%7B2%7D%20%5Ctanh(%5Cfrac%7B%5Cpi%7D%7B2%7Dn)", "name": "Oscillation Rational Hyperbolic Integral"},
    {"image": "https://latex.codecogs.com/png.latex?%5C%5Cint%5B%7B0%7D%5E%7B%5Cinfty%7D%5D%20%5Cfrac%7B%5Csin(nx)%7D%7Bx%5E2%20%2B%201%7D%20dx%20%3D%20%5Cfrac%7B%5Cpi%7D%7B2%7D%20%5Ctanh(%5Cfrac%7B%5Cpi%7D%7B2%7Dn)", "name": "Oscillation Rational Hyperbolic Integral"},
    {"image": "https://latex.codecogs.com/png.latex?%5C%5Cint%5B%7B0%7D%5E%7B%5Cinfty%7D%5D%20%5Cfrac%7B%5Csin(nx)%7D%7Bx%5E2%20%2B%201%7D%20dx%20%3D%20%5Cfrac%7B%5Cpi%7D%7B2%7D%20%5Ctanh(%5Cfrac%7B%5Cpi%7D%7B2%7Dn)", "name": "Oscillation Rational Hyperbolic Integral"},
    {"image": "https://latex.codecogs.com/png.latex?%5C%5Cint%5B%7B0%7D%5E%7B%5Cinfty%7D%5D%20%5Cfrac%7B%5Csin(nx)%7D%7Bx%5E2%20%2B%201%7D%20dx%20%3D%20%5Cfrac%7B%5Cpi%7D%7B2%7D%20%5Ctanh(%5Cfrac%7B%5Cpi%7D%7B2%7Dn)", "name": "Oscillation Rational Hyperbolic Integral"},
    {"image": "https://latex.codecogs.com/png.latex?%5C%5Cint%5B%7B0%7D%5E%7B%5Cinfty%7D%5D%20%5Cfrac%7B%5Csin(nx)%7D%7Bx%5E2%20%2B%201%7D%20dx%20%3D%20%5Cfrac%7B%5Cpi%7D%7B2%7D%20%5Ctanh(%5Cfrac%7B%5Cpi%7D%7B2%7Dn)", "name": "Oscillation Rational Hyperbolic Integral"},
    {"image": "https://latex.codecogs.com/png.latex?%5C%5Cint%5B%7B0%7D%5E%7B%5Cinfty%7D%5D%20%5Cfrac%7B%5Csin(nx)%7D%7Bx%5E2%20%2B%201%7D%20dx%20%3D%20%5Cfrac%7B%5Cpi%7D%7B2%7D%20%5Ctanh(%5Cfrac%7B%5Cpi%7D%7B2%7Dn)", "name": "Oscillation Rational Hyperbolic Integral"},
    {"image": "https://latex.codecogs.com/png.latex?%5C%5Cint%5B%7B0%7D%5E%7B%5Cinfty%7D%5D%20%5Cfrac%7B%5Csin(nx)%7D%7Bx%5E2%20%2B%201%7D%20dx%20%3D%20%5Cfrac%7B%5Cpi%7D%7B2%7D%20%5Ctanh(%5Cfrac%7B%5Cpi%7D%7B2%7Dn)", "name": "Oscillation Rational Hyperbolic Integral"},
    {"image": "https://latex.codecogs.com/png.latex?%5C%5Cint%5B%7B0%7D%5E%7B%5Cinfty%7D%5D%20%5Cfrac%7B%5Csin(nx)%7D%7Bx%5E2%20%2B%201%7D%20dx%20%3D%20%5Cfrac%7B%5Cpi%7D%7B2%7D%20%5Ctanh(%5Cfrac%7B%5Cpi%7D%7B2%7Dn)", "name": "Oscillation Rational Hyperbolic Integral"},
    {"image": "https://latex.codecogs.com/png.latex?%5C%5Cint%5B%7B0%7D%5E%7B%5Cinfty%7D%5D%20%5Cfrac%7B%5Csin(nx)%7D%7Bx%5E2%20%2B%201%7D%20dx%20%3D%20%5Cfrac%7B%5Cpi%7D%7B2%7D%20%5Ctanh(%5Cfrac%7B%5Cpi%7D%7B2%7Dn)", "name": "Oscillation Rational Hyperbolic Integral"},
    {"image": "https://latex.codecogs.com/png.latex?%5C%5Cint%5B%7B0%7D%5E%7B%5Cinfty%7D%5D%20%5Cfrac%7B%5Csin(nx)%7D%7Bx%5E2%20%2B%201%7D%20dx%20%3D%20%5Cfrac%7B%5Cpi%7D%7B2%7D%20%5Ctanh(%5Cfrac%7B%5Cpi%7D%7B2%7Dn)", "name": "Oscillation Rational Hyperbolic Integral"},
    {"image": "https://latex.codecogs.com/png.latex?%5C%5Cint%5B%7B0%7D%5E%7B%5Cinfty%7D%5D%20%5Cfrac%7B%5Csin(nx)%7D%7Bx%5E2%20%2B%201%7D%20dx%20%3D%20%5Cfrac%7B%5Cpi%7D%7B2%7D%20%5Ctanh(%5Cfrac%7B%5Cpi%7D%7B2%7Dn)", "name": "Oscillation Rational Hyperbolic Integral"},
    {"image": "https://latex.codecogs.com/png.latex?%5C%5Cint%5B%7B0%7D%5E%7B%5Cinfty%7D%5D%20%5Cfrac%7B%5Csin(nx)%7D%7Bx%5E2%20%2B%201%7D%20dx%20%3D%20%5Cfrac%7B%5Cpi%7D%7B2%7D%20%5Ctanh(%5Cfrac%7B%5Cpi%7D%7B2%7Dn)", "name": "Oscillation Rational Hyperbolic Integral"},
    {"image": "https://latex.codecogs.com/png.latex?%5C%5Cint%5B%7B0%7D%5E%7B%5Cinfty%7D%5D%20%5Cfrac%7B%5Csin(nx)%7D%7Bx%5E2%20%2B%201%7D%20dx%20%3D%20%5Cfrac%7B%5Cpi%7D%7B2%7D%20%5Ctanh(%5Cfrac%7B%5Cpi%7D%7B2%7Dn)", "name": "Oscillation Rational Hyperbolic Integral"},
    {"image": "https://latex.codecogs.com/png.latex?%5C%5Cint%5B%7B0%7D%5E%7B%5Cinfty%7D%5D%20%5Cfrac%7B%5Csin(nx)%7D%7Bx%5E2%20%2B%201%7D%20dx%20%3D%20%5Cfrac%7B%5Cpi%7D%7B2%7D%20%5Ctanh(%5Cfrac%7B%5Cpi%7D%7B2%7Dn)", "name": "Oscillation Rational Hyperbolic Integral"},
    {"image": "https://latex.codecogs.com/png.latex?%5C%5Cint%5B%7B0%7D%5E%7B%5Cinfty%7D%5D%20%5Cfrac%7B%5Csin(nx)%7D%7Bx%5E2%20%2B%201%7D%20dx%20%3D%20%5Cfrac%7B%5Cpi%7D%7B2%7D%20%5Ctanh(%5Cfrac%7B%5Cpi%7D%7B2%7Dn)", "name": "Oscillation Rational Hyperbolic Integral"},
    {"image": "https://latex.codecogs.com/png.latex?%5C%5Cint%5B%7B0%7D%5E%7B%5Cinfty%7D%5D%20%5Cfrac%7B%5Csin(nx)%7D%7Bx%5E2%20%2B%201%7D%20dx%20%3D%20%5Cfrac%7B%5Cpi%7D%7B2%7D%20%5Ctanh(%5Cfrac%7B%5Cpi%7D%7B2%7Dn)", "name": "Oscillation Rational Hyperbolic Integral"},
    {"image": "https://latex.codecogs.com/png.latex?%5C%5Cint%5B%7B0%7D%5E%7B%5Cinfty%7D%5D%20%5Cfrac%7B%5Csin(nx)%7D%7Bx%5E2%20%2B%201%7D%20dx%20%3D%20%5Cfrac%7B%5Cpi%7D%7B2%7D%20%5Ctanh(%5Cfrac%7B%5Cpi%7D%7B2%7Dn)", "name": "Oscillation Rational Hyperbolic Integral"},
    {"image": "https://latex.codecogs.com/png.latex?%5C%5Cint%5B%7B0%7D%5E%7B%5Cinfty%7D%5D%20%5Cfrac%7B%5Csin(nx)%7D%7Bx%5E2%20%2B%201%7D%20dx%20%3D%20%5Cfrac%7B%5Cpi%7D%7B2%7D%20%5Ctanh(%5Cfrac%7B%5Cpi%7D%7B2%7Dn)", "name": "Oscillation Rational Hyperbolic Integral"},
    {"image": "https://latex.codecogs.com/png.latex?%5C%5Cint%5B%7B0%7D%5E%7B%5Cinfty%7D%5D%20%5Cfrac%7B%5Csin(nx)%7D%7Bx%5E2%20%2B%201%7D%20dx%20%3D%20%5Cfrac%7B%5Cpi%7D%7B2%7D%20%5Ctanh(%5Cfrac%7B%5Cpi%7D%7B2%7Dn)", "name": "Oscillation Rational Hyperbolic Integral"},
    {"image": "https://latex.codecogs.com/png.latex?%5C%5Cint%5B%7B0%7D%5E%7B%5Cinfty%7D%5D%20%5Cfrac%7B%5Csin(nx)%7D%7Bx%5E2%20%2B%201%7D%20dx%20%3D%20%5Cfrac%7B%5Cpi%7D%7B2%7D%20%5Ctanh(%5Cfrac%7B%5Cpi%7D%7B2%7Dn)", "name": "Oscillation Rational Hyperbolic Integral"}];
  
    // Card geometry and material
    const cardGeometry = new THREE.BoxGeometry(1, 1, 1); // Equal dimensions for a cube
    const cardMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xffffff,
        side: THREE.DoubleSide
    });
  
    // Add lighting to see the 3D effect better
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7); // Increased intensity
    scene.add(ambientLight);
  
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8); // Increased intensity
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
  
    // Add second directional light from opposite direction
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight2.position.set(-5, -5, -5);
    scene.add(directionalLight2);
  
    // Add raycaster for click detection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
  
    function createPaddedTexture(originalTexture) {
        // Create a canvas with padding
        const canvas = document.createElement('canvas');
        const size = 512; // Power of 2 for better performance
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');

        // Fill with white background
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, size, size);

        // Calculate scaling to maintain aspect ratio and add padding
        const padding = size * 0.15; // 15% padding
        const maxWidth = size - (padding * 2);
        const maxHeight = size - (padding * 2);
        
        const scale = Math.min(
            maxWidth / originalTexture.image.width,
            maxHeight / originalTexture.image.height
        );

        // Calculate centered position
        const x = (size - (originalTexture.image.width * scale)) / 2;
        const y = (size - (originalTexture.image.height * scale)) / 2;

        // Draw the equation image centered with padding
        ctx.drawImage(
            originalTexture.image,
            x, y,
            originalTexture.image.width * scale,
            originalTexture.image.height * scale
        );

        // Create new texture from canvas
        const paddedTexture = new THREE.Texture(canvas);
        paddedTexture.needsUpdate = true;
        paddedTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        paddedTexture.minFilter = THREE.LinearFilter;
        paddedTexture.magFilter = THREE.LinearFilter;

        return paddedTexture;
    }
  
    // Function to create a card at a specific position in the spiral
    function createCard(index) {
        const theta = index * (2 * Math.PI * totalRevolutions) / numCards;
        const x = radius * Math.cos(theta);
        const y = (heightPerLayer * index) + spiralParams.verticalOffset;
        const z = radius * Math.sin(theta);
  
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load(
            equations[index % equations.length].image,
            (texture) => {
                // Create padded texture
                const paddedTexture = createPaddedTexture(texture);
                
                // Create materials for all six faces using the padded texture
                const materials = [];
                for (let i = 0; i < 6; i++) {
                    materials.push(new THREE.MeshPhongMaterial({
                        color: 0xffffff,
                        map: paddedTexture,
                        side: THREE.DoubleSide
                    }));
                }
                
                const card = new THREE.Mesh(cardGeometry, materials);
                card.position.set(x, y, z);
                card.userData.equationData = equations[index % equations.length];
                card.rotation.y = Math.PI / 4;
                
                scene.add(card);
            },
            undefined,
            (error) => {
                console.error('Error loading texture:', error);
                const materials = [];
                for (let i = 0; i < 6; i++) {
                    materials.push(new THREE.MeshPhongMaterial({
                        color: 0xcccccc,
                        side: THREE.DoubleSide
                    }));
                }
                const card = new THREE.Mesh(cardGeometry, materials);
                card.position.set(x, y, z);
                card.userData.equationData = equations[index % equations.length];
                card.rotation.y = Math.PI / 4;
                scene.add(card);
            }
        );
    }
  
    // Create all the cards
    for (let i = 0; i < numCards; i++) {
      createCard(i);
    }
  
    // Update camera starting position based on screen size
    camera.position.set(0, 0, window.innerWidth < 768 ? 10 : 15); // Set all camera position components
  
    // Update scroll speed based on device
    let scrollSpeed = window.innerWidth < 768 ? 0.05 : 0.1;
  
    // Add scroll variable
    let currentScroll = 0;
  
    // Add wheel event listener for desktop scrolling
    window.addEventListener('wheel', function(event) {
        currentScroll += event.deltaY * scrollSpeed;
        camera.position.z = (window.innerWidth < 768 ? 10 : 15) - currentScroll;
    });
  
    // Update touch handling
    let touchStartY = 0;
    window.addEventListener('touchstart', function(event) {
        touchStartY = event.touches[0].clientY;
    }, false);
  
    window.addEventListener('touchmove', function(event) {
        const touchY = event.touches[0].clientY;
        const deltaY = touchStartY - touchY;
        currentScroll += deltaY * scrollSpeed;
        camera.position.z = (window.innerWidth < 768 ? 10 : 15) - currentScroll;
        touchStartY = touchY;
        event.preventDefault();
    }, { passive: false });
  
    // Render loop
    function animate() {
      requestAnimationFrame(animate);
  
      // Rotate the scene for animation
      scene.rotation.y += 0.0018; // Reduced from 0.0001 to 0.00005
      renderer.render(scene, camera);
    }
  
    animate();
  
    // Add click event listener
    window.addEventListener('click', onClick);
  
    function onClick(event) {
      // Calculate mouse position in normalized device coordinates
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
      // Update the picking ray with the camera and mouse position
      raycaster.setFromCamera(mouse, camera);
  
      // Calculate objects intersecting the picking ray
      const intersects = raycaster.intersectObjects(scene.children);
  
      if (intersects.length > 0) {
        const clickedCard = intersects[0].object;
        showEquationDetails(clickedCard.userData.equationData);
      }
    }
  
    function showEquationDetails(equationData) {
      // Remove existing modal if present
      const existingModal = document.getElementById('equation-modal');
      if (existingModal) {
        existingModal.remove();
      }
  
      // Create modal
      const modal = document.createElement('div');
      modal.id = 'equation-modal';
      modal.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 0 20px rgba(0,0,0,0.3);
        z-index: 1000;
        max-width: 90%;
        width: ${window.innerWidth < 768 ? '95%' : '80%'};
        max-height: 90vh;
        overflow-y: auto;
      `;
  
      // Add content
      modal.innerHTML = `
        <h2>${equationData.name}</h2>
        <img src="${equationData.image}" alt="${equationData.name}" style="max-width: 100%;">
        <button onclick="this.parentElement.remove()" style="
          position: absolute;
          top: 10px;
          right: 10px;
          border: none;
          background: #ff4444;
          color: white;
          padding: 10px 15px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
          min-width: 44px;
          min-height: 44px;
        ">Close</button>
      `;
  
      document.body.appendChild(modal);
    }
  }
  