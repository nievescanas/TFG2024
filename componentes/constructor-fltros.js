AFRAME.registerComponent('constructor-filtros', {

  schema: {
    from: { type: 'string' }, // Definimos el parametro de entrada 'data' como un array
    filtro: { type: 'string' } // Definimos el parámetro de entrada 'filtro' como un string
  },
    init: function () {

      // Cargar el elemento al que se ha aplicado el componente
      var el = this.el;
      // Accedemos a los parámetros pasados al componente
      var from = this.data.from;

      // Sacamos el elemento 
      var dataElement = document.getElementById(from);

      // Definir listado de posibles tipos de carga de datos, por ahora dos 
      var posiblesAtributos = {
        'babia-queryjson': 'json',
        'babia-querycsv': 'csv'
      };

      for (var key in posiblesAtributos) {
        if (dataElement.hasAttribute(key)) {
          atributo = dataElement.getAttribute(key);
          fetch(atributo.url)
            .then(response => {
                // Verifica si la respuesta de la solicitud HTTP es correcta (código de estado 200)
                if (!response.ok) {
                    throw new Error('Ocurrió un error al cargar el archivo JSON: ' + response.status);
                }
                // Devuelve los datos del archivo JSON en formato de objeto
                return response.json();
            })
            .then(data => {
                // Manipula los datos como desees
                var filtros = {};
                data.forEach(function(item) {
                  // Hacer algo con cada elemento 'item'
                  // Verificar si ya existe una etiqueta para este id
                  if (!filtros[item.id]) {
                    // Clonar la etiqueta <a-entity>
                    var filtro = document.createElement('a-entity');
                    // Obtener el padre de la etiqueta original
                    parent = el.parentNode;
                    // Añadir atributos o propiedades según sea necesario
                    filtro.setAttribute('id', item.id);
                    
                    //Modificamos el valor del filtro 
                    var atoFiltro = el.getAttribute('babia-filter');
                    var atoFiltro = el.cloneNode(true);
                    atoFiltro.setAttribute('id', item.id);
                    
                    var filterValue = JSON.stringify({
                      from: 'querierjson',
                      filter: 'id=' + item.id
                    });
                    atoFiltro.setAttribute("babia-filter", filterValue);

                    console.log(atoFiltro);
                    atoFiltro.removeAttribute("constructor-filtros")

                    parent.appendChild(atoFiltro);
                    //Control de repetición
                    filtros[item.id]=true;

                  }
            })
          })
          .catch(error => {
              // Maneja cualquier error que ocurra durante la solicitud HTTP o el procesamiento del archivo JSON
              console.error('Se produjo un error:', error);
          });

        }
      }
    }
});