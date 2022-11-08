import axios from "axios";

export function postPokemon(payload){
    return async()=>{
        const apiInfo= await axios.post('http://localhost:3001/pokemons',payload)
        return apiInfo;
    }
}

export function searchPoke(name){
    return async function (dispatch){
        try{
            var url= await axios.get('http://localhost:3001/pokemons?name='+name)
            return dispatch({
                type: "SEARCH_NAME",
                payload: url.data,
            });  
        }catch{
            return alert("No se encontraron coinsidencias")
        }
    }
}
export function filterPokemonsByType(payload){
    return{
        type: "FILTER_BY_TYPE",
        payload
    }
}

export function Sort(order){
    return{
        type: "SORT",
        payload:order
    }
}


export function filterCreated(payload) {
    return {
    type: "FILTER_CREATED",
    payload
    };
}

export function filterByAttack(payload){
    return{
        type:'FILTER_BY_ATTACK'
    }
}


export const getPokemons=()=>{
    return async(dispatch)=>{
        let pedidoApi=await axios.get('http://localhost:3001/pokemons');
        dispatch({type:"GET_POKEMONS", payload:pedidoApi.data})
    }
}

export function getDetail(id) {
    return async function (dispatch) {
    try{
    var json = await axios.get('http://localhost:3001/pokemons/'+id);
    return dispatch({
        type: "GET_DETAILS",
        payload: json.data
    })

} catch(error) {
console.log(error)
}
}}

export function getType() {
    return async function (dispatch) {
    var api = await axios.get('http:/localhost:3001/pokemons/types');
    return dispatch({
        type: "GET_TYPE",
        payload: api.data
    })
    }
}