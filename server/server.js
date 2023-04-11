const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()
const usersRoutes = require('./routes/accountRoutes');
// const routes = require('./routes/searchRoutes');

const app = express();
app.use(express.json())
app.use(cors())
let PORT = process.env.PORT || 0305

mongoose.connect(process.env.MONGO_DB)

app.get("/", (req,res) => {
  res.json("You've made it!")
})

app.get('/search', async (req, res) => {
  const searchTerm = req.query.q;
  const response = await axios.get('https://www.rijksmuseum.nl/api/en/collection?', {
    params: {
      q: searchTerm,
      key: process.env.RIJKSMUSEUM_API,
      format: 'json',
      ps: 15, // Number of results to return 
      showImage: true,
    },
  });
  console.log(response.data)

  const artObjects = response.data.artObjects.map((artObject) => ({
    id: artObject.id,
    title: artObject.title,
    imageUrl: artObject.webImage?.url,
  }));

  res.send(artObjects);
});

app.use('/api/users', usersRoutes);



app.listen(PORT, () => {console.log(`─=≡Σ((( つ◕ل͜◕)つ The server is running on PORT ${PORT} ─=≡Σ((( つ◕ل͜◕)つ`)})