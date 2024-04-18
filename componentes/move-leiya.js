AFRAME.registerComponent('move-leiya', {
  init: function () {
    this.el.addEventListener('mouseenter', this.enterArea.bind(this));
    this.el.addEventListener('mouseleave', this.leaveArea.bind(this));
    this.leiya = document.getElementById('Leiya');
    this.leiyaObj = this.leiya.object3D;
    this.originalPosition = this.leiya.getAttribute('position');
  },

  enterArea: function () {

    var elPosition = this.el.getAttribute('position');
    var leiyaPosition = this.leiya.getAttribute('position');
    var deltaX = elPosition.x - leiyaPosition.x;
    var deltaY = elPosition.y - leiyaPosition.y;
    var deltaZ = elPosition.z - leiyaPosition.z;

    var position = new THREE.Vector3();
    this.el.object3D.getWorldPosition(position); // Obtén la posición global de 'el'

    console.log(position);
    //Correción de posicion
    console.log('Nieves');
    
    this.leiya.object3D.children.forEach((child) => {
      if (child !== this.leiya.object3D) {
        child.position.set(child.position.x + deltaX, child.position.y + deltaY, child.position.z + deltaZ);
      }
    });
    this.leiya.setAttribute('visible', true);
  },

  
  leaveArea: function () {
    this.leiyaObj.position.set(this.originalPosition.x, this.originalPosition.y, this.originalPosition.z);
    this.leiya.object3D.children.forEach((child) => {
      if (child !== this.leiya.object3D) {
        child.position.set(this.originalPosition.x, this.originalPosition.y,this.originalPosition.z);
      }
    });
    this.leiya.setAttribute('visible', false);
  }
});