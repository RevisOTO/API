const xp = require("express")
const math = require("math")
const cors = require("cors")
const json = require("json")
const { getLenght, getRandMeme, postNewMeme, getAllMemes, patchMeme, deleteMemes } = require('./modules/db.js')
const path = require('path')
const isImageURL = require('image-url-validator').default


app = xp()

app.use(cors({ origin: "*" }))

app.use(xp.json())
app.use(xp.text())
//Estilos para el index
app.use(xp.static('css'))
app.use(xp.static('modules'))
//Index
app.get('/', function(req, res) {
  res.sendfile("./index.html")
})
//Documentacion
app.get('/docs', function(req, res) {
  res.sendfile("./docs.html")
})
//Subir imagenes
app.get('/post', function(req, res) {
  res.sendfile("./post.html")
})
//Video
app.get('/video', function(req, res) {
  res.sendfile("./video.html")
})
//Update
app.get('/update', function(req, res) {
  res.sendfile("./actualizar.html")
})

app.get('/allmemes', async function(req, res) {
  memes = await getAllMemes("memes")
  res.json(memes)
})

app.get('/allvideomemes', async function(req, res) {
  memes = await getAllMemes()
  res.json(memes)
})

//Validacion de imagen
app.post('/validate', async function(req, res) {
  object = JSON.parse(req.body)

  console.log(object)

  is_Image = await isImageURL(object.url)

  res.send(is_Image)
})
//Subida de imagen
app.post('/post', async function(req, res) {

  if (req.body.descripcion === undefined || req.body.url === undefined) {
    res.send("ERROR")
  }
  console.log(req.body)
  postNewMeme("memes", req.body.descripcion, req.body.url)
  res.send("Imagen subida con exito")
})
//Toma una imagen random
app.get('/momorandom', async function(req, res) {

  let size = await getLenght("memes")
  let rand = Math.floor(Math.random() * size[0].count) + 1;
  console.log(rand)

  let result = await getRandMeme("memes", rand)

  res.json(result[0])
})

app.get('/videomeme', async function(req, res) {

  let size = await getLenght("video")
  let rand = Math.floor(Math.random() * size[0].count) + 1;

  let result = await getRandMeme("video", rand)

  res.json(result[0])
})

app.patch('/editar', async function(req, res) {
  console.log(req.body.descripcion)
  await patchMeme("memes",req.body.descripcion,req.body.id)
  res.send("Se a editado con exitado")
})

app.patch('/editarvideo', async function(req, res) {
  await patchMeme("video",req.body.descripcion,req.body.id)
  res.send("Se a editado con exitado")
})

app.delete('/borrar', async function(req, res) {
  await deleteMemes("memes",req.body.id)
  res.send("Se a eliminado con exitado")
})
app.delete('/borrarvideo', async function(req, res) {
  await deleteMemes("video",req.body.id)
  res.send("Se a eliminado con exitado")
})

app.listen(1234)