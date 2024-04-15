# Week 6 - Challenge 5

## API REST Canciones

Crea una API REST que se conecte a un fichero JSON con una sola propiedad de tipo array, donde almacenarán objetos de canciones.
La API REST tendrá los siguientes endpoints:

[GET] /songs -> devuelve el array de cosas que ya sé

[GET] /songs/:idSong -> devuelve una cosa que ya sé

[DELETE] /songs/:idSong -> borra una cosa que ya sé

[POST] /songs -> crea una cosa que ya sé (la recibe en el body)

[PATCH] /songs/:id -> modifica una cosa que ya sé (la recibe en el body)

Usamos express con las capas:

- app
- routers
- controllers
- model (entities)
- repositories

AÑADIMOS un front con ANGULAR testado

- Lista de 'songs'
- Añadir 'song'
- Borrar 'song'
- Editar 'song'

- Página de detalle
