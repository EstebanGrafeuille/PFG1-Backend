import LibroService from "../services/libroService";


class LibroController{
    libroService = new LibroService

    getLibrosByName = async(req,res) =>{
        try{
            const name = req.params;
            const data = await this.libroService.getLibrosByName(name);
            res.status(200).send({sucess:true, message: data});
        }catch(error){
            res.status(400).send({sucess:false, message:error.message})
        }
        //test
    }
}
export default LibroController