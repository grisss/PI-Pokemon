const { Router } = require("express");
const getAllPokemons = require("../controllers/index");
const router = Router();
const { Pokemon, Type } = require("../db");

router.get("/", async (req, res) => {
    let name = req.query.name;
    let pokemonsTotal = await getAllPokemons(); //Guardo mi controlador que trae todos los pokemons en una variable..
    if (name) { //Consulto si me pasan un nombre y lo busco en la variable de arriba
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
    if (id) { //Si me pasan un ID, filtro el que coincida con ese mismo, sino devuelvo texto.
      let pokemonId = allPokemons.filter((el) => el.id == id); 
      pokemonId.length? 
      res.status(200).json(pokemonId): 
      res.status(404).send("Pokemon no encontrado");
    }
  } catch (error) {
    next(error);
  }
});

/* router.post("/create", async (req, res, ) => { //Ruta de creacion del pokemon
  try {
    let { name, image, life, attack, defense, speed, height, weight, types} = req.body //Datos que necesito pedir

    const newPokemon = await Pokemon.create({
      name,
      image,
      life,
      attack,
      defense,
      speed,
      height,
      weight,
    });

    if (!name) return res.json({ info: "El nombre es obligatorio" });

    if(Array.isArray(types) && types.length){ //Consulto si lo que me llega en TYPES, es un arreglo y si tiene algo adentro.
      let dbTypes = await Promise.all( //Armo una variable que dentro tendra una resolucion de promesas
        types.map((e) => { // Agarro la data de types y le hago un map para verificar que cada elemento exista en 
          return Type.findOne({where:{ name: e}}) // nuestra tabla de tipos
        })
      )
     await newPokemon.setTypes(dbTypes) //Una vez que se resuelva la promesa del Pokemon.create, le agrego los tipos

    return res.send("Pokemon creado exitosamente");
    }
  } catch (err) {
    res.status(400).send("Error en data");
  }
}) */


//------------------------------------------------------------------
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
          return res.status(200).send('Pokemon successfully created')
      } else {
          return res.status(404).send('Pokemon was not created');
      }
  } catch (error) {
      console.log(error);    
  }
})


module.exports = router;