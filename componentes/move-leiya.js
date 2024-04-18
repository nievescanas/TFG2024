AFRAME.registerComponent('move-leiya', {
  schema: {
    soundUrl: {type: 'string'}
  },

  init: function () {
    //Control de eventos
    this.el.addEventListener('mouseenter', this.enterArea.bind(this));
    this.el.addEventListener('mouseleave', this.leaveArea.bind(this));
    this.el.addEventListener('click', this.handleClick.bind(this));
    this.el.addEventListener('sound-ended', this.handleSoundEnd.bind(this));
    this.el.addEventListener('loaded', this.setupSound.bind(this));
    // Acceso directo al objeto 3D y posición original
    //this.leiya = document.getElementById('Leiya');
    this.leiya = document.querySelector('[leiya]');
    //this.vozLeiya = leiya.getElementById('vozLeiya');

    this.vozLeiya = this.leiya.querySelector('[data-name="sound"]')
    
    this.leiyaObj = this.leiya.object3D;
    this.originalPosition = this.leiya.getAttribute('position');

    // Inicializar la variable de control, quitar cuando se soluciones el error
    this.control = {
      isPlaying: false,
      isLoaded: false
    };
  },

  enterArea: function () {

    // Crear un nuevo vector para almacenar el punto intermedio
    var midpoint = new THREE.Vector3();
    // Acceder al objeto en A-Frame
    var elobject3D = this.el.object3D;
    // Calcular el bounding box
    var boundingBox = new THREE.Box3().setFromObject(elobject3D);
    // Calcular el punto intermedio
    midpoint.lerpVectors(boundingBox.min, boundingBox.max, 0.5);

    
    if(this.el.getAttribute('visible')){
          // Actualizar posición
    this.leiya.object3D.children.forEach((child) => {
      if (child !== this.leiya.object3D) {
        child.position.set(midpoint.x, midpoint.y + 5 , midpoint.z );
      }
    });

    // Hacer visible a Leiya
    this.leiya.setAttribute('visible', true);

    }

  },

  
  leaveArea: function () {
    //No funciona, mirar
    //if (!this.vozLeiya.components.sound.isPlaying){
    if(!this.control.isPlaying && this.el.getAttribute('visible')){
      this.leiyaObj.position.set(this.originalPosition.x, this.originalPosition.y, this.originalPosition.z);
      this.leiya.object3D.children.forEach((child) => {
        if (child !== this.leiya.object3D) {
          child.position.set(this.originalPosition.x, this.originalPosition.y,this.originalPosition.z);
          console.log(child.id);
        }
      });
      this.leiya.setAttribute('visible', false);
      //Array.from(this.leiya.children).forEach((child, index) => {
      //  console.log(`Hijo ${index + 1}:`, child);
      //  console.log(`Tipo de elemento: ${child.tagName}`);
      //  if (child.id) {
      //      console.log(`ID: ${child.id}`);
      //  }

      //  console.log(`Clase(s): ${child.className}`);
    //});

    }
  },

  handleClick: function() {
    // Hacer visible a Leiya
    this.leiya.setAttribute('visible', true);

    // Reproducir el audio
    console.log(this.vozLeiya);
    if (this.vozLeiya.components.sound) {
      if (this.data.soundUrl){
        this.vozLeiya.setAttribute('src', this.data.soundUrl);
        this.vozLeiya.components.sound.playSound();
        this.control.isPlaying=true;

        this.vozLeiya.components.sound.el.addEventListener('sound-ended', this.handleSoundEnd.bind(this), { once: true });
      } else {
        console.error('Componente de sonido no encontrado en el audio especificado');
      }
    }
  },

  handleSoundEnd: function() {
    // Ocultar a Leiya una vez que el audio termina
    this.leiya.setAttribute('visible', false);
    // Restablecer la posición si es necesario
    this.leiyaObj.position.set(this.originalPosition.x, this.originalPosition.y, this.originalPosition.z);
    this.control.isPlaying=false;
  },

setupSound: function() {
    
    if (this.vozLeiya && this.vozLeiya.components.sound) {
      this.vozLeiya = document.getElementById('vozLeiya');
      console.error('Carga');
    } else {
        console.error('El componente de sonido no está disponible.');
    }
}

  
});