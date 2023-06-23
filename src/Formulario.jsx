import * as React from 'react';
import { useForm } from 'react-hook-form';
import './style.css';
import axios from "axios";
import convierte from './convierte'
import {useNavigate,useParams} from 'react-router-dom';
function Formulario () {
  

  const navitate = useNavigate()
  const parametro=useParams()
  
  const URI='http://localhost:5000/inscriptos'
  const store=async (data)=>{
    console.log("dentro del store")
    console.log(data)
    
    await axios.post(URI,convierte(data))
   
}
  const {register, formState: { errors }, watch, handleSubmit,} = useForm({
   
    defaultValues: parametro//recupero lo que pasa por parametros

  });

  const onSubmit = (data) => {
    console.log(data);
    alert("Validacion exitosa Señor: "+data.nombres)
    store(data)
    navitate('/')
  };
  const fechaMinima = '1996-04-20';
  const fechaMaxima = '2006-04-20';
  const fechaMinimaT = '1995-12-01';
  const fechaMaximaT= '2006-12-20';
  
  
  const argentinoNativo=watch('argentinoNativo','SI');
  const resideProvincia = watch('resideProvincia', 'SI');
  const nivelEstudio=watch('nivelEstudio','Educacion_Secundaria');
  
//Aca enpieza el react lo anterior es javascript y hooks
  return (
    <div>
      <div className="titulo">
        <h2>{parametro[1]}</h2>
        <h2>{parametro[2]}</h2>
      </div>
      <h1 className="resolucion">
        El dispositivo donde esta realizando el presente no cumple con la
        resolucion de pantalla minima para continuar
      </h1>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="datos-personales">
          <h3 className="encabezados">Datos Personales</h3>{/* ENCABEZADOS*/}
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
            placeholder="Ingrese nro DNI" className="campos"
            {...register('dni', {
              required: true,
              pattern: /^-?\d+(?:,\d+)?(?:[Ee][-+]?\d+)?$/i,
              maxLength: 8,
              minLength: 8,
            })}
          />
          <div>
            {errors.email?.type === 'required' && (
              <span className="aviso">Es un campo requerido!!!</span>
            )}
            {errors.email?.type === 'pattern' && (
              <span className="aviso">
                Debe tener una direccion de correo valida!!!
              </span>
            )}
            <input className="campos"
              type="text"
              placeholder="Email"
              {...register('email', {
                required: true,
                pattern:
                  /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
              })}
            />
          </div>
          {errors.cuil?.type === 'required' && (
            <span className="aviso">Es un campo requerido!!!</span>
          )}
          {errors.cuil?.type === 'pattern' && (
            <span>Formato invalido solo numeros sin . ni - </span>
          )}
          {errors.cuil?.type === 'maxLength' && (
            <span>Formato invalido solo 11 numeros </span>
          )}
          {errors.cuil?.type === 'minLength' && (
            <span>Formato invalido solo 11 numeros </span>
          )}
          <input className="campos"
            type="text"
            placeholder="CUIL"
            {...register('cuil', {
              required: true,
              pattern: /^-?\d+(?:,\d+)?(?:[Ee][-+]?\d+)?$/i,
              maxLength: 11,
              minLength: 11,
            })}
          />
            <div>
            {errors.nombre?.type === 'required' && (
              <span className="aviso">Es un campo requerido!!!</span>
            )}
            {errors.nombre?.type === 'maxLength' && (
              <span className="aviso">
                Debe tener menos de 50 caracteres!!!
              </span>
            )}
            <input className="campos"
              type="text"
              placeholder="Nombres"
              {...register('nombres', {
                required: true,
                maxLength: 50,
              })}
            />
          </div>
          

          <div>
            {errors.apellido?.type === 'required' && (
              <span className="aviso">Es un campo requerido!!!</span>
            )}
            {errors.apellido?.type === 'maxLength' && (
              <span className="aviso">
                Debe tener menos de 12 caracteres!!!
              </span>
            )}
            <input className="campos"
              type="text"
              placeholder="Apellido"
              {...register('apellido', {
                required: true,
                maxLength: 50,
              })}
            />
          </div>
          <div>
            <label>Género</label>
            <br />
          <select
            className="deptos" 
            {...register('genero', {
              required: true,
            })}
          >
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            <option value="X">X</option>
          </select></div>
          
            <div><label>Estado Civil</label>  <br />
          <select
            className="deptos" 
            {...register('estadoCivil', {
              required: true,
            })}
          >
            <option value="Soltero/a">Soltero/a</option>
            <option value="Casado/a">Casado/a</option>
            <option value="Conviviente/Unión Civil">Conviviente/Unión Civil</option>
            <option value="Separado/a o Divorciado/a">Separado/a o Divorciado/a</option>
            <option value="Viudo/a">Soltero/a</option>
           
          </select></div>
          
          <hr />
          <div>
            <label>Fecha de Nacimiento</label>
            {errors.fechaNacimiento?.type === 'required' && (
              <span className="aviso">
                Indique su fecha de nacimiento
              </span>
            )}
            <input
              type="date" className="campos"
              min={fechaMinima}
              max={fechaMaxima}
              {
                ...register('fechaDeNacimiento', {
                  required: true,
                }) 
              }
            />
          </div>
          <label>¿Argentino Nativo?</label>

          <select
            className="posee" 
            {...register('argentinoNativo', {
              required: true,
            })}
          >
            <option value="SI">SI</option>
            <option value="NO">NO</option>
          </select>
          {argentinoNativo==="SI"&&<div>
             <h1 className ="labeles">Povincia de Nacimiento</h1>
              <select className="deptos" {...register('provinciaNacimiento')}>
                
                <option value="01">Buenos Aires	</option>
                <option value="02">Catamarca</option>
                <option value="03">Chaco</option>
                <option value="04">Chubut</option>
                <option value="05">Córdoba</option>
                <option value="06">Corrientes</option>
                <option value="07">Entre Ríos	</option>
                <option value="08">Formosa</option>
                <option value="09">Jujuy</option>
                <option value="10">La Pampa	</option>
                <option value="11">La Rioja	</option>
                <option value="12">Mendoza	</option>
                <option value="13">Misiones</option>
                <option value="14">Neuquén</option>
                <option value="15">Río Negro</option>
                <option value="16">Salta</option>
                <option value="17">San Juan</option>
                <option value="18">San Luis</option>
                <option value="19">Santa Cruz</option>
                <option value="20" selected="selected">Santa Fe</option>
                <option value="21">Santiago del Estero</option>
                <option value="22">Tierra del Fuego, Antártida e Islas del Atlántico Sur</option>
                <option value="23">Tucumán</option>

              </select>
          </div>}
          
          <div>
            {errors.apellido?.type === 'required' && (
              <span className="aviso">Es un campo requerido!!!</span>
            )}
            {errors.apellido?.type === 'maxLength' && (
              <span className="aviso">
                Debe tener menos de 12 caracteres!!!
              </span>
            )}
            <input className="campos"
              type="text"
              placeholder="Lugar de Nacimiento"
              {...register('lugarDeNacimiento', {
                required: true,
                maxLength: 50,
              })}
            />
            <input className="campos"
              type="text"
              placeholder="Apellido y Nombre de su Madre"
              {...register('apellidoNombreMadre', {
                required: true,
                maxLength: 50,
              })}
            />
             <input className="campos"
              type="text"
              placeholder="Apellido y Nombre de su Padre"
              {...register('apellidoNombrePadre', {
                required: true,
                maxLength: 50,
              })}
            />
          </div>
          
        </section>
        <section className="domicilio_y_datos_de_contacto">
          <h3 className="encabezados">Domicilio y datos de Contacto</h3>
          <hr />
          <label>¿Reside en la Provincia?</label>

          <select
            className="posee" 
            {...register('resideProvincia', {
              required: true,
            })}
          >
            <option value="SI">SI</option>
            <option value="NO">NO</option>
          </select>

          {resideProvincia === 'SI' && (
            <div>
              <h1 className ="labeles">Departamento</h1>
              <select className="deptos" {...register('departamento')}>
                <option value="01">La Capital</option>
                <option value="02">Rosario</option>
                <option value="03">Belgrano</option>
                <option value="04">Caseros</option>
                <option value="05">Castellanos</option>
                <option value="06">Constitución</option>
                <option value="07">Garay</option>
                <option value="08">General López</option>
                <option value="09">General Obligado</option>
                <option value="10">Iriondo</option>
                <option value="11">Las Colonias</option>
                <option value="12">Francia</option>
                <option value="13">San Cristóbal</option>
                <option value="14">San Javier</option>
                <option value="15">San Jerónimo</option>
                <option value="16">San Justo</option>
                <option value="17">San Lorenzo</option>
                <option value="18">San Martín</option>
                <option value="19">Vera</option>
              </select>
            </div>
          )}

{resideProvincia === 'NO' && (
             
            <div>
             <h1 className ="labeles">Povincia donde habita fuera de Santa Fe</h1>
              <select className="deptos" {...register('noResideProvincia')}>
                
                <option value="01">Buenos Aires	</option>
                <option value="02">Catamarca</option>
                <option value="03">Chaco</option>
                <option value="04">Chubut</option>
                <option value="05">Córdoba</option>
                <option value="06">Corrientes</option>
                <option value="07">Entre Ríos	</option>
                <option value="08">Formosa</option>
                <option value="09">Jujuy</option>
                <option value="10">La Pampa	</option>
                <option value="11">La Rioja	</option>
                <option value="12">Mendoza	</option>
                <option value="13">Misiones</option>
                <option value="14">Neuquén</option>
                <option value="15">Río Negro</option>
                <option value="16">Salta</option>
                <option value="17">San Juan</option>
                <option value="18">San Luis</option>
                <option value="19">Santa Cruz</option>
                <option disabled hidden="true" value="20">Santa Fe</option>
                <option value="21">Santiago del Estero</option>
                <option value="22">Tierra del Fuego, Antártida e Islas del Atlántico Sur</option>
                <option value="23">Tucumán</option>

              </select>
            </div>
          )}
          <div>
              {errors.domicilio?.type === 'required' && (
                <span className="aviso">Debe colocar una Localidad!</span>
              )}
              <input className="campos"
                type="text"
                placeholder="Localidad"
                {...register('localidad', {
                  required: true
                  
                })}
              />
            </div>
            <div></div>
          <div>
              {errors.domicilio?.type === 'required' && (
                <span className="aviso">Debe colocar un domicilio valido</span>
              )}
              <input className="campos"
                type="text"
                placeholder="domicilio"
                {...register('domicilio', {
                  required: true
                  
                })}
              />
            </div>
            <div>
            {errors.telefono?.type === 'required' && (
              <span className="aviso">Debe colocar un nro de contacto</span>
            )}
            <input
              type="text" className="campos"
              placeholder="Telefono"
              {...register('telefono_1', { required: true })}
            />
            
            <input
              type="text" className="campos"
              placeholder="Telefono Alternativo"
              {...register('telefono_2', { required: false })}
            />
            </div>
            <div>
            {errors.cria?.type === 'required' && (
              <span className="aviso">Debe colocar la comisaria de jursidicción</span>
            )}
            <input
              type="text" className="campos"
              placeholder="Comisaria de Jurisdicción"
              {...register('comisaria', { required: true })}
            />
            </div>
        </section>
        <section className="educacion_formal">
          <h3 className="encabezados">Educación formal (Excluyente)</h3>
          <hr />
          <label>Nivel de educación formal alcanzado</label>  <br />
         

        <select
          className="deptos" 
          {...register('nivelEstudio', {
            required: true,
          })}
        >
          <option value="Educacion_Secundaria">Educación Secundaria</option>
          <option value="Educacion_Terciaria">Educación Terciaria</option>
          <option value="Educacion_Universitaria">Educación Universitaria</option>
         
        </select>
                  
            <div>
            {errors.secundario?.type === 'required' && (
              <span className="aviso">Indique el título secundario </span>
            )}
            <input
              type="text" className="campos"
              placeholder="Titulo Secundario"
              {...register('tituloSecundario', { required: true })}
            />
            </div>
            <div>
            <label>Fecha de Título Secundario</label>
            {errors.fechaTitulo?.type === 'required' && (
              <span className="aviso">
                Indique la fecha de su Titulo
              </span>
            )}
            <input
              type="date" className="campos"
              min={ (fechaMinimaT)}
              max={fechaMaximaT}
              {
                ...register('fechaTituloSecundario', {
                  required: true,
                }) 
              }
            />
          </div>
          {nivelEstudio!=="Educacion_Secundaria" &&(<div>
            {errors.tituloSuperior?.type === 'required' && (
              <span className="aviso">Debe colocar el titulo superior alcanzado</span>
            )}
            <input
              type="text" className="campos"
              placeholder="Titulo Superior"
              {...register('tituloSuperior', { required: true })}
            /> <br />
             <label>Fecha de Título Superior</label>
             {errors.fechaTituloSuperior?.type === 'required' && (
              <span className="aviso">
                Indique la fecha de su Titulo
              </span>
            )}
             <input
              type="date" className="campos"
              min={ (fechaMinimaT)}
              max={fechaMaximaT}
              {
                ...register('fechaTituloSuperior', {
                  required: true,
                }) 
              }
            />
            </div>
            
            )}
                    
        </section>
        <section className="preguntas">
          <h3 className="encabezados"> Ultimos Datos</h3>
          <hr />
          <label>¿Tiene algún cargo de planta permanente en la Administración Pública?</label>
          <select
            className="posee" 
            {...register('pregunta1', {
              required: true,
            })}
          >
            <option value="NO">NO</option>
            <option value="SI">SI</option>
            
          </select>
          <br />
          <label>¿Fue destituido, cesanteado o exonerado en cualquiera de los niveles de la Administración Pública?</label>
          <select
            className="posee" 
            {...register('pregunta2', {
              required: true,
            })}
          >
            
            <option value="NO">NO</option>
            <option value="SI">SI</option>
          </select>
          <br />
          <label>¿Ha sido condenado por la justicia Provincial o Nacional por delitos o contravenciones?</label>
          <select
            className="posee" 
            {...register('pregunta3', {
              required: true,
            })}
          >
            
            <option value="NO">NO</option>
            <option value="SI">SI</option>
          </select>
          <br />
          <label>¿Se encuentra procesado por la justicia Provincial o Nacional?</label>
          <select
            className="posee" 
            {...register('pregunta4', {
              required: true,
            })}
          >
            
            <option value="NO">NO</option>
            <option value="SI">SI</option>
          </select>
          <br />
          


       
           
        </section>
<div className="contenedor-boton" >
        <input type="submit" value="Finalizar"  className="botonEnviar" />
        </div>
      </form>
      <footer>
        <div className="corp">
          <p>DTyD 2023 sistemas@isepsantafe.edu.ar</p>
        </div>
      </footer>
    </div>
  );
};
export default Formulario;
