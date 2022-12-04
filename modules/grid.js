const grid = new gridjs.Grid({
  search: true,
  columns: ['id', 'Descripcion', 'Url', {
    name: 'Editar',
    formatter: (cell, row) => {
      return gridjs.h('button', {
        className: 'py-2 mb-4 px-4 border rounded-md text-white bg-blue-600',
        onClick: async function() {
          let id = row.cells[0].data;
          let descripcion = prompt("Cambiar descripcion:", "Descripcion");

          let headersList = {
            "Content-Type": "application/json"
          }

          let bodyContent = JSON.stringify({
            "id": id,
            "descripcion": descripcion
          });

          let response = await fetch("https://UNSERVER.revis8466.repl.co/editar", {
            method: "PATCH",
            body: bodyContent,
            headers: headersList
          });
          let data = await response.text();
          console.log(data);
        }
      }, 'Editar');
    }
  },{
    name: 'Eliminar',
    formatter: (cell, row) => {
      return gridjs.h('button', {
        className: 'py-2 mb-4 px-4 border rounded-md text-white bg-blue-600',
        onClick: async function() {
          let id = row.cells[0].data;
          let descripcion = prompt("Cambiar descripcion:", "Descripcion");

          let headersList = {
            "Content-Type": "application/json"
          }

          let bodyContent = JSON.stringify({
            "id": id,
            "descripcion": descripcion
          });

          let response = await fetch("https://UNSERVER.revis8466.repl.co/eliminar", {
            method: "DELETE",
            body: bodyContent,
            headers: headersList
          });
          let data = await response.text();
          console.log(data);
        }
      }, 'Eliminar');
    }
  },
  ],
  server: {
    url: 'https://unserver.revis8466.repl.co/allmemes',
    then: data => data.map(meme => [meme.id, meme.descripcion, gridjs.html(`<a href='${meme.url}'>Link Imagen</a>`), null])
  },
  style: {
    td: {
      border: '1px solid #ccc'
    },
    table: {
      'font-size': '15px'
    }
  }
}).render(document.getElementById("wrapper"));


//Video
const grid1 = new gridjs.Grid({
  search: true,
  columns: ['id', 'Descripcion', 'Url', {
    name: 'Editar',
    formatter: (cell, row) => {
      return gridjs.h('button', {
        className: 'py-2 mb-4 px-4 border rounded-md text-white bg-blue-600',
         onClick: async function() {
          let id = row.cells[0].data;
          let descripcion = prompt("Cambiar descripcion:", "Descripcion");

          let headersList = {
            "Content-Type": "application/json"
          }

          let bodyContent = JSON.stringify({
            "id": id,
            "descripcion": descripcion
          });

          let response = await fetch("https://UNSERVER.revis8466.repl.co/editarvideo", {
            method: "PATCH",
            body: bodyContent,
            headers: headersList
          });
          let data = await response.text();
          console.log(data);
        }
      }, 'Editar');
    }
  },{
    name: 'Eliminar',
    formatter: (cell, row) => {
      return gridjs.h('button', {
        className: 'py-2 mb-4 px-4 border rounded-md text-white bg-blue-600',
        onClick: async function() {
          let id = row.cells[0].data;
          let descripcion = prompt("Cambiar descripcion:", "Descripcion");

          let headersList = {
            "Content-Type": "application/json"
          }

          let bodyContent = JSON.stringify({
            "id": id,
            "descripcion": descripcion
          });

          let response = await fetch("https://UNSERVER.revis8466.repl.co/eliminarvideo", {
            method: "DELETE",
            body: bodyContent,
            headers: headersList
          });
          let data = await response.text();
          console.log(data);
        }
      }, 'Eliminar');
    }
  }
  ],
  server: {
    url: 'https://unserver.revis8466.repl.co/allvideomemes',
    then: data => data.map(meme => [meme.id, meme.descripcion, gridjs.html(`<a href='${meme.videourl}'>Link Video</a>`), null])
  },
  style: {
    td: {
      border: '1px solid #ccc'
    },
    table: {
      'font-size': '15px'
    }
  }
}).render(document.getElementById("wrapper1"));