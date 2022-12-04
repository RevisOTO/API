const postgres = require("postgres")

const sql = postgres('postgres://mfgernis:GJaBN817B9TQeWZFdeYH0ntpklXtk67E@peanut.db.elephantsql.com:5432/mfgernis', {
  host: 'peanut.db.elephantsql.com',// Postgres ip address[s] or domain name[s]
  port: 5432,          // Postgres server port[s]
  database: 'mfgernis',            // Name of database to connect to
  username: 'mfgernis',            // Username of database user
  password: 'GJaBN817B9TQeWZFdeYH0ntpklXtk67E',  // Password of database user}) 
})

async function getAllMemes(table) {
  if (table == "memes") {
    memes = await sql`
      select
        *
      from memes
      order by id
    `
  }
  else {
    memes = await sql`
      select
        *
      from videomeme
      order by id
    `
  }

  return memes
}

async function getRandMeme(table, id) {
  if (table == "memes") {
    meme = await sql`
      select
        url
      from memes
      where id = ${id}
    `
  }
  else {
    meme = await sql`
      select
        videourl
      from videomeme
      where id = ${id}
    `
  }
  return meme
}

async function postNewMeme(table, desc, url) {
  if (table == "memes") {
    xs = await sql`
    insert into memes (
      "descripcion", url
    ) values (
      ${desc},${url}
    )
    returning *`
  }
  else {
    xs = await sql`
    insert into videomeme (
      descripcion, videourl
    ) values (
      ${desc},${url}
    )
    returning *`
  }

  return xs
}

async function getLenght(table) {
  if (table == "memes") {
    lenght = await sql`
    select
      count("descripcion")
    from memes
  `
  }
  else {
    lenght = await sql`
    select
      count("descripcion")
    from videomeme
  `
  }
  return lenght
}

async function patchMeme(table, desc, id) {
    const user = {
      id: id,
      descripcion: desc
    }
  
  if (table == "memes") { 
    await sql`
      update memes set ${
        sql(user,'descripcion')
      }
      where id = ${ user.id }
    `
  }
  else {
    await sql`
      update videomeme set ${
        sql(user,'descripcion')
      }
      where id = ${ user.id }
    `
  }
  return
}

async function deleteMeme(table,id) {
  
  if (table == "memes") { 
    await sql`
      delete from memes 
      where id = ${ id }
    `
  }
  else {
    await sql`
      delete from videomeme 
      where id = ${ id }
    `
  }
  return
}

module.exports.sql = sql
module.exports = { getLenght, getRandMeme, postNewMeme, getAllMemes, patchMeme, deleteMeme }