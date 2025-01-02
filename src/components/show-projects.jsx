import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import '../assets/style/show-projects.css';
import axios  from 'axios';
import { projectDelete } from '../use-case/project-delete';
import { fillInFormField } from './pages/panel-control';



let imagens ='upload-image/';


export const ShowProjects = ()=>{

    const [ projects, setProjects ] = useState([]);

        const getProjects = async( event = null  )=> {

            await axios.get('http://localhost:3001/api/show-projects')
            .then( async(response)=>{

                const arrProjects = await response.data;

                if( event != null ){

                    const dataEvent = event.target.className;

                    if( dataEvent === 'link-icon-delete' ){
                        
                        setProjects( arrProjects );
                        return;
                    }
                    
                    return;
                }  
            
                setProjects( arrProjects );

            }); 
            
        }
        
        useEffect(()=>{ 
            getProjects(); 
        },[]);

        return (
            <div className="container-show-projects"  >
                { 
                    projects.map( (projectValue, key)=>{
                       return <div className='project-container' key={projectValue.id}>
                                <div className='container-img-project'>
                                    <img className='img-project' src={imagens+projectValue.project_file}/>
                                </div>
                                <div className='container-data-project'>
                                    <h4 className='title-project' >{projectValue.name_project}</h4>
                                    <p className='sub-title-project'>Tecnologias: <span className='technology'>{projectValue.name_technology}</span></p>
                                    <a className='link' href={'https://'+projectValue.project_link} target='_blank' rel='noopener noreferrer' >Enlace del proyecto</a>
                                </div>
                                <div className='icons-container'>
                                    <button className='icons-projects icon-update' >
                                        <Link id={ projectValue.id } 
                                            onClick={ (event)=> fillInFormField( event, projectValue ) } 
                                            className='link-icon-update' to='panel-control'> 
                                                p
                                        </Link>
                                    </button>
        
                                    <button className='icons-projects icon-delete' >
                                        <Link id={ projectValue.id } 
                                            onClick={ async( e ) =>  { await projectDelete(e), await getProjects( e ) }} 
                                            className='link-icon-delete' to='/'>
                                                ' 
                                        </Link>
                                    </button>
                                </div>
                        </div> 
                    } )
                }
    
            </div>
      )

//   return (
//         <div className="container-show-projects"  >
//             {   
                
//                 projects.map( (projectValue, key)=>{
//                    return <div className='project-container' key={projectValue.id}>
//                         <img className='img-project' src={imagens+projectValue.project_file}/>
//                         <h4 className='title-project' >{projectValue.name_project}</h4>
//                         <p className='sub-title-project'>Tecnologias: <span className='technology'>{projectValue.name_technology}</span></p>
//                         <a className='link' href={'https://'+projectValue.project_link} target='_blank' rel='noopener noreferrer' >Enlace del proyecto</a>
//                         <div className='icons-container'>
//                             <button className='icons-projects icon-update' >
//                                 <Link id={ projectValue.id } 
//                                     onClick={ (event)=> fillInFormField( event, projectValue ) } 
//                                     className='link-icon-update' to='panel-control'> 
//                                         p
//                                 </Link>
//                             </button>

//                             <button className='icons-projects icon-delete' >
//                                 <Link id={ projectValue.id } 
//                                     onClick={ async( e ) =>  { await projectDelete(e), await getProjects( e ) }} 
//                                     className='link-icon-delete' to='/'>
//                                         ' 
//                                 </Link>
//                             </button>
//                         </div>
//                     </div> 
//                 } )
//             }

//         </div>
//   )
};