const axios = require("axios");
const { Pokemon, Type } = require("../db");

//Obtengo la info de la api
const getApiInfo = async () => {
    const api = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=40")
      .then((api) => {
        return api.data.results;
      })
      .then((api) => {
        return Promise.all(api.map((el) => axios.get(el.url))); 
      })
      let arrayPoke = api.map((el) => { 
      return {
        id: el.data.id,
        name: el.data.name,
        types: el.data.types.map((t) => t.type.name), 
        image: el.data.sprites.front_default,
        life: el.data.stats[0].base_stat,
        attack: el.data.stats[3].base_stat,
        defense: el.data.stats[4].base_stat,
        speed: el.data.stats[5].base_stat,
        height: el.data.height,
        weight: el.data.weight,
      }
    });
    return arrayPoke;
  }
  
const getDbInfo = async () => {
    try{
      const result = await Pokemon.findAll({ 
        include:{
        model: Type,
        attributes: ['name'],
        through:{
        attributes: [],
              }
          }
      })
      return result;
  }catch (error){
      console.log(error);
  }
} 


//---------------------------
//// Esta funcion me trae los datos de los pokemons de la db
/* const getDbInfo=()=>{
/* const result= Pokemon.findAll({
    include:{
    model: Type,
    attributes: ['name'],
    through:{
    attributes: [],
  } 
}
})
return result
.catch((err)=>console.error(err))
} */

//Esta funcion concatena los datos de los pokemons de la api con los de la db
  const getAllPokemons = async () => { 
    const apiInfo = await getApiInfo(); 
    const dbInfo = await getDbInfo();   
    const infoTotal = apiInfo.concat(dbInfo); 
    return infoTotal;
  };
module.exports = getAllPokemons;