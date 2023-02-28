import { useNavigate, Form, useActionData, redirect } from "react-router-dom"
import Formulario from "../components/Formulario"
import Error from "../components/Error"
import { agregarCliente } from "../data/clientes"

export async function action({request}){
  const formData = await request.formData()
  const email = formData.get('email')
  // Tomar datos del formData
  const datos = Object.fromEntries(formData)
  
  // Validar Form - Generalmente no se usa push para no mutar el state pero en este caso no estamos trabajando con un useState
  const errores = []
  if (Object.values(datos).includes('')){
    errores.push('Todos los campos son obligatorios')
  }
  // Validar Email
  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
  if(!regex.test(email)){
    errores.push('El email no es válido')
  }

  // Retornar los datos si hay errores
  if(Object.keys(errores).length){
    return errores
  }
  // await porque no quiero que la siguiente linea se ejecute hasta obtener los datos
  await agregarCliente(datos)
  // la documentación de RRDOM recomienda utilizar redirect para actions y loaders
  return redirect('/')

}

const NuevoCliente = () => {

    const errores = useActionData()

    const navigate = useNavigate()

    return (
      <>
        <h1 className="text-blue-900 font-black text-4xl">Nuevo Cliente</h1>
        <p className="mt-3">LLena todos los campos para registrar un Nuevo Cliente</p>
        <div className='flex justify-end'>
          <button
            className='bg-blue-800 text-white px-3 py-1 font-bold uppercase'
            onClick={() => navigate(-1)}
          >
            Volver
          </button>        
        </div>

        <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-10">

          { errores?.length && errores.map( (error, i) => <Error key={i}>{error}</Error> )}

          <Form
            method="post"
            // Deshabilita la validación de HTML5 para que válidemos nosotros
            noValidate
          >
            <Formulario />

            <input
              type='submit'
              className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg"
              value='Registrar Cliente'
            />            
          </Form>
        </div>
      </>
    )
}

export default NuevoCliente