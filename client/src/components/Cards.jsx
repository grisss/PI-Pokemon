export const visibilityControl=()=>{
   const handleDelete=()=>{
        alert('limpiando')
    }
    return(
        <div>
            <input type='checkbox'/>
            <button onClick={handleDelete}>Borrar</button>
        </div>
    )
}
export default visibilityControl;