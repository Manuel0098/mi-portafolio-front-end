import { useEffect, useState } from 'react';
import '../../assets/style/pages-style/panel-control.css';
import { useForm } from 'react-hook-form';
import axios  from 'axios';

const projectAdd = async( data )=>{

  const { name_project, name_technology, project_link, project_file } = data;


  // Se utiliza el FormData para crear un para de valor osea que la imagen tenga su
  // llaver y asi la pueda recibir el backend
  const data_project_file = project_file[0];

  // const formData = new FormData();
  const formData = new FormData();
  formData.append('name_project',name_project);
  formData.append('name_technology',name_technology);
  formData.append('project_link',project_link);
  formData.append('file',data_project_file);

  // console.log(data_project_file)

  await axios.post('http://localhost:3001/api/create-project', formData, {

    name_project,
    name_technology,
    project_link,
    project_file,
    // project_file: data_project_file,
  } ).then(()=>{
    alert('Proyecto creado');
  });


}

const projectUpdate = async(  data ,id )=>{

  const { name_project, name_technology, project_link, project_file } = data;


  // Se utiliza el FormData para crear un para de valor osea que la imagen tenga su
  // llaver y asi la pueda recibir el backend
  const data_project_file = project_file[0];

  console.log(data)
  console.log(id)

  // const formData = new FormData();
  const formData = new FormData();
  formData.append('name_project',name_project);
  formData.append('name_technology',name_technology);
  formData.append('project_link',project_link);
  formData.append('file',data_project_file);

  // console.log(data_project_file)

  await axios.put(`http://localhost:3001/api/update-project/${id}`, formData, {

    name_project,
    name_technology,
    project_link,
    project_file,
    // project_file: data_project_file,
  } ).then(()=>{
    alert('Proyecto Actualizado');
  });


}

// const expresionRegular = '[0*a-z]';

let projectId = '';
let project = 0;
let enableButtonUpdate = ''



export const fillInFormField = ( eventClick, projectObj )=>{

  projectId = eventClick.target.id;
  project = projectObj;
  enableButtonUpdate = eventClick.target.className;

  // console.log(idProjectEvent.target.className)
  // console.log(project)
  // const projects = ;


  // for (let i = 0; i < projects.length; i++) {
    
  //   projectToEdit.push(projects[i])
    
  // }

  // console.log(projects)

}

export const PanelControl = ( props ) => {
  // const { id, name_project, name_technology, project_link, project_file } = project;

  // const [name_project, setName_project]= useState('');
  // const [name_technology, setName_technology]= useState('');
  // const [project_link, setProject_link]= useState('');
  // const [project_file, setProject_file]= useState('');


  const [ formState, setFormState ] = useState({
    name_project: project.name_project,
    name_technology: project.name_technology,
    project_link: project.project_link,
  })
  const { register, handleSubmit, formState : { errors } } = useForm();

  console.log()

  const { name_project, name_technology, project_link } = formState;
  

  const [ errorMessage, setErrorMessage ] = useState('error-message-none');

  const onInputChange = ( { target } )=>{

    const { name, value } = target;

    if(project != 0){

      console.log('estoy en el if')
      setFormState({ ...formState, [name] : value});

      return;
    }
 
    console.log(project)
    setFormState({ ...formState, [name] : value})
  }

  // if(project != 0 ){
   
  //   useEffect( ()=>{
  //     // setName_project( project.name_project );
  //     setName_technology( project.name_technology );
  //     setProject_link( project.project_link );
  //     // setProject_file( project.project_file );
  //   }, [])
  // }
  

  return (
    <div className='panel-control-container'>
      <h1 className='panel-control-title'>Agrega tus proyectos</h1> 

      <span className={ errorMessage }>Los campos marcado con * son obligatorios...</span>
      <form className='form' onSubmit={ enableButtonUpdate ? (
           handleSubmit( (e) => projectUpdate( e, projectId ) )
        ): handleSubmit( projectAdd ) }> 

        <div className='label'>
          <label htmlFor="name_project">Nombre del proyecto<span className='asterisk'>*</span></label>
        </div>
        <input 
          type='text' 
          id='name_project' 
          name='name_project' 
          value={name_project}
          // onChange={  e => setName_project( e.target.value ) }
          onChange={ onInputChange }
          placeholder='Escribe el nombre del proyecto...'
          {... register('name_project', {required: true, onChange: onInputChange })}
          />

          {
            //  console.log( errors)
            errors.project_name?.type === 'required' && (
              <span className='error-message'>El nombre del proyecto es obligatorio...</span> 
            )
          }


        <div className='label'>
          <label htmlFor="name_technology">Nombra las tecnologias que utilizaste<span className='asterisk'>*</span></label>
        </div>
        <input type='text' 
          id='name_technology' 
          name='name_technology'
          value={name_technology}
          onChange={ onInputChange }
          placeholder='Escribe las tecnologias usadas...'
          {...register('name_technology', { required: true, onChange: onInputChange } ) }
        />

          {
            errors.technology_name?.type === 'required' && (
              <span className='error-message'>Las tecnologias usadas en el proyecto son obligatorias...</span> 
            )
          }



        <div className='label'>
          <label htmlFor='project_link' type='text' >Link del projecto en gitHub<span className='asterisk'>*</span></label>
        </div>
        <input type='text' 
          id='project_link' 
          name='project_link' 
          value={project_link}
          onChange={ onInputChange }
          placeholder='https://github.com/name1234/project' 
          {...register('project_link', { required: true, onChange: onInputChange } )}
        />

          {
            errors.project_link?.type === 'required' && (
              <span className='error-message'>El link del proyecto es obligatorio...</span>

            )
          }


        <div className='label'>
          <label htmlFor='project_file' type='file'>Imagen del proyecto<span className='asterisk'>*</span></label>
        </div>
        <input type='file' 
          id='project_file' 
          name='project_file'
          accept='.png, .jpg' 
          {...register( 'project_file', { required: true, } )}
        />

        {
          errors.project_file?.type === 'required' && (
            <span className='error-message'>La imagen del proyecto es obligatoria...</span>

          ) 
        }

        {
          enableButtonUpdate ? (
          <button >Actualizar proyecto</button>
          ): <button >Agregar proyecto</button>
        }
        

      </form>
    </div>
  )
}

// export default PanelControl;
