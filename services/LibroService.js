import libro from "models/libro.js"
import http, { get } from 'http'
import { Error } from "mongoose"

class LibroService{

    getLibrosByName = async(busqueda)=> {
        try{
            const response = await fetch('https://www.googleapis.com/books/v1/volumes?q=' + busqueda)
            
            if (!response.ok){
                throw new Error("error HTTP :" + response.status)
            }

            const data = await response.json
            return data
        }catch{

        }
        
    }
}

export default LibroService