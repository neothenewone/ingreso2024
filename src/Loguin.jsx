import { useState } from 'react';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import {useNavigate,useParams} from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
import './loguin.css';
const cookies=new Cookies();

const URI='http://localhost:5000/inscriptos/'

function Loguin(datosHeredados) {
    const navitate = useNavigate()
  const parametro=datosHeredados[0];
 const [datos,setDatos]=useState();
 const[consul,setConsulta]=useState();
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm({});

  const getUsuarioById=async (cosa)=>{ 
    try {const res= await axios.get(URI+cosa.dni)
      console.log(res)
      
    } catch (error) {
      console.log("error al cargar")
    }
    
}
  
  const onSubmit = (dataS) => {
    
   
    /*if (parametro.dni != data.dni) {
      alert('entre porque los dni no coiciden');

      navitate('/new')
      
    } else {
      alert('entre los dni ');

      navitate('/new')
*/
console.log("funcionando")
getUsuarioById(dataS)
  };
  return (
    <div className='contenedor-loguin'>
      
      <form onSubmit={handleSubmit(onSubmit)} className='contenedor-loguin'>
        <section className="">
          <h3 className="encabezados">Ingrese su DNI y correo Electrónico</h3>
          <hr />
          {errors.dni?.type === 'required' && (
            <span className="aviso">Es un campo requerido!!!</span>
          )}
          {errors.dni?.type === 'pattern' && (
            <span className="aviso">
              Formato invalido solo numeros sin . ni -{' '}
            </span>
          )}
          {errors.dni?.type === 'maxLength' && (
            <span className="aviso">Formato invalido solo 8 numeros </span>
          )}
          {errors.dni?.type === 'minLength' && (
            <span className="aviso">Formato invalido solo 8 numeros </span>
          )}
          <input
            type="text"
            placeholder="DNI"
            className="campos"
            {...register('dni', {
              required: true,
              pattern: /^-?\d+(?:,\d+)?(?:[Ee][-+]?\d+)?$/i,
              maxLength: 8,
              minLength: 8,
            })}
          />

          <div className="Loguin-Form-Open">
            {errors.email?.type === 'required' && (
              <span className="aviso">Es un campo requerido!!!</span>
            )}
            {errors.email?.type === 'pattern' && (
              <span className="aviso">
                Debe tener una direccion de correo valida!!!
              </span>
            )}
            <input
              className="campos-loguin"
              type="text"
              placeholder="Email"
              {...register('email', {
                required: true,
                pattern:
                  /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
              })}
            />
          </div>
        </section>
        <div className="contenedor-boton">
          <input type="submit" value="Ingresar" className="botonEnviar-loguin" />
        </div>
      </form>

      <footer>
        <div className="corp">
          <p>DTyD 2023 sistemas@isepsantafe.edu.ar</p>
        </div>
      </footer>
    </div>
  );
}
export default Loguin;
