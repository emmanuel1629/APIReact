import Producto from '../models/Products'

export const obtenerProductos = async (req,res)=>
{
    const  todosLosProductos = await Producto.find();
    res.json(todosLosProductos)

}
export const createProduct = async (req,res)=>
{
    const{nombre,categoria,precio,imgURL} = req.body
    const nuevoProducto = new Producto({nombre,categoria,precio,imgURL})
    const productoGuardado = await nuevoProducto.save();

    //Codigo de estado 201 un nuevo producto se a creado
    res.status(201).json(productoGuardado)
}
export const obtenerProductoPorId = async (req,res)=>
{
    const productoPorId = await Producto.findById(req.params.idProducto)

    res.status(200).json(productoPorId)

}
export const eliminarProductoPorId = async (req,res)=>
{
    const productoEliminado = await Producto.findByIdAndDelete(req.params.idProducto);

    if(productoEliminado) return res.status(204).json({mensaje:"Producto Eliminado",producto:productoEliminado.nombre})

}
export const actualizarProductoPorId = async (req,res)=>
{
    const productoActualizado = await Producto.findByIdAndUpdate(req.params.idProducto,req.body,{new:true});

    res.status(200).json(productoActualizado)


}