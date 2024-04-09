function init() {
    //var plano = document.getElementById('plano');
    var boton = document.getElementById('boton');
    var audio = document.getElementById('sonido');
    var leiya = document.getElementById('Leiya');
    var imgLeiya = document.getElementById('imgLeiya');
    

    // Si el plano está visible, lo oculta; si no, lo muestra
    //plano.setAttribute('visible', !plano.getAttribute('visible'));
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
    imgLeiya.setAttribute('visible', !imgLeiya.getAttribute('visible'));
  });
  

  }