function init() {
    var plano = document.getElementById('plano');
    var boton = document.getElementById('boton');
    var audio = document.getElementById('vozLeiya');
    var leiya = document.getElementById('Leiya');
    var imgLeiya = document.getElementById('imgLeiya');
    var grafica1 = document.getElementById('grafica1');
    var grafica2 = document.getElementById('grafica2');
    var plataforma1 = document.getElementById('plataforma-1');
    var plataforma2 = document.getElementById('plataforma-2');
    
    

    // Si el plano está visible, lo oculta; si no, lo muestra  
    leiya.setAttribute('visible', !leiya.getAttribute('visible'));

    if (boton) {
        // Eliminar el botón del DOM
        boton.remove();
      }
    
    audio.components.sound.playSound();


  // Escuchar el evento 'sound-ended' del sonido
  audio.addEventListener('sound-ended', function() {
    // Llamar a tu función de inicio una vez que termine el sonido
    leiya.setAttribute('visible', !leiya.getAttribute('visible'));
    plano.setAttribute('visible', !plano.getAttribute('visible'));
    imgLeiya.setAttribute('visible', !imgLeiya.getAttribute('visible'));
    grafica1.setAttribute('visible', !grafica1.getAttribute('visible'));
    grafica2.setAttribute('visible', !grafica2.getAttribute('visible'));
    plataforma1.setAttribute('visible', !plataforma1.getAttribute('visible'));
    plataforma2.setAttribute('visible', !plataforma2.getAttribute('visible')); 
  });
  

  }