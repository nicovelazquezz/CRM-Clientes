import { useLoaderData } from "react-router-dom"
import Cliente from "../components/Cliente";
import { obtenerClientes } from "../data/clientes";

export function loader() {
  const clientes = obtenerClientes()
  return clientes

}

const Index = () => {
  // useLoaderData es para obtener lo que retornes en la funcion loader
  const clientes = useLoaderData()  

  return (
    <>
      <h1 className="text-blue-900 font-black text-4xl">Clientes</h1>
      <p className="mt-3">Administra tus Clientes</p>

      {clientes.length > 0 ? 
        <table className="w-full bg-white shadow mt-5 table-auto">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="p-2">Cliente</th>
              <th className="p-2">Contacto</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map( cliente => (
              <Cliente 
                cliente={cliente}
                key={cliente.id}
              />
            ))}
          </tbody>
        </table>
      :
        <p className="text-center mt-10">
            No hay Clientes áun.
        </p>
      }
    </>
  )
}

export default Index