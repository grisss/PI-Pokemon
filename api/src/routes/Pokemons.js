const { Router } = require("express");
const getAllPokemons = require("../controllers/index");
const router = Router();
const { Pokemon, Type } = require("../db");

router.get("/", async (req, res) => {
    let name = req.query.name;
    let pokemonsTotal = await getAllPokemons(); 
    if (name) { 
      let pokemonName = await pokemonsTotal.find(el =>el.name.toLowerCase()===name.toLocaleLowerCase()); 
    if(pokemonName=== undefined){
      return res.status(400).send("pokemon no encontrado")
    }else{
      return res.status(200).json(pokemonName)
    }
    } else {
        res.status(200).send(pokemonsTotal); 
    }
});

router.get("/:id", async (req, res) => { 
  try {
    const id = req.params.id;
    const allPokemons = await getAllPokemons();
    if (id) { 
      let pokemonId = allPokemons.filter((el) => el.id == id); 
      pokemonId.length? 
      res.status(200).json(pokemonId): 
      res.status(404).send("Pokemon no encontrado");
    }
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res) => {
  const {name, image, life, attack, defense, speed, height, weight, types, createdInDb} = req.body;
  try {
      if(name) {
          const createdPokemon = await Pokemon.create({
            name,
            image,
            life,
            attack,
            defense,
            speed,
            height,
            weight,
            createdInDb
          });
          const createdDb = await Type.findAll({
              where: {name: types}
          });
          createdPokemon.addType(createdDb);
          return res.status(200).send('¡Pokemon creado exitosamente!')
      } else {
          return res.status(404).send('No se creo el pokemon');
      }
  } catch (error) {
      console.log(error);    
  }
})


module.exports = router;