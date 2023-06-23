import { Form } from 'react-hook-form';
import './App.css';
import Loguin from './Loguin';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Formulario from './Formulario';
const titulo =
    'Pre Inscripción Tecnico Superior en Seguridad Pública y Ciudadana';
  const subTitulo = 'Cohorte 2024-2025';
  const cosa={dni:"30548471",
  email:"neotheoldone@gmail.com",
  cuil:"20305484718",
  nombre:"seba",
  apellido:"Pereyra",
  fechaNacimiento:"1999-01-01",telefono:"3413361678",direccion:"Querandies 852"};
  const parametros=[cosa,titulo,subTitulo]
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Loguin {...parametros}>{console.log("funcionando app rout")}</Loguin>}/>
          <Route path='/new' element={<Formulario />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
