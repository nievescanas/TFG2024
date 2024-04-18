AFRAME.registerComponent('leiya', {
    schema: {
      soundUrl: { type: 'string' },  // URL del sonido para hacerlo más reutilizable
    },
  
    init: function() {
      // Configurar animación inicial

      this.el.setAttribute('animation', 'property: position; dir: alternate; loop: true; to: 0 8.5 0; dur: 2000');
      this.el.setAttribute('visible', 'false');
  
      // Crear y configurar el elemento de sonido
      var soundEl = document.createElement('a-sound');
      soundEl.setAttribute('src', this.data.soundUrl);
      soundEl.setAttribute('id', 'vozLeiya');
      soundEl.setAttribute('autoplay', 'false');
      soundEl.setAttribute('loop', 'false');
      soundEl.setAttribute('positional', 'true');
      this.el.appendChild(soundEl);
      this.sound = soundEl;
  
      // Configurar la esfera principal y esferas de aura
      this.setupSpheres();
    },
  
    setupSpheres: function() {
      // Configurar las esferas que forman parte de Leiya
      this.createSphere(0.2, 0.9, 'white', 1); // Esfera principal
      this.createSphere(0.4, 0.3, 'white', 0);
      this.createSphere(0.6, 0.2, 'white', 0);
      this.createSphere(0.8, 0.1, 'white', 0);
    },
  
    createSphere: function(radius, opacity, color, intensity) {
      var sphere = document.createElement('a-sphere');
      sphere.setAttribute('radius', radius);
      sphere.setAttribute('opacity', opacity);
      sphere.setAttribute('material', `color: ${color}; shader: flat; side: double;`);
      if (intensity > 0) {
        sphere.setAttribute('light', `type: point; intensity: ${intensity};`);
      }
      this.el.appendChild(sphere);
    }
  });