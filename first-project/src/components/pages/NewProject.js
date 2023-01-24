import { useNavigate } from 'react-router-dom';

import ProjectForm from '../project/ProjectForm';
import styles from './NewProject.module.css';

function NewProject() {
    const history = useNavigate();

    function createPost(project){
        //initialize cost and services
        project.cost = 0;
        project.services = [];

        fetch('http://localhost:5000/projects', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(project)
        })
        .then((resp) => resp.json())
        .then(() => {
            history('/projects', { state: "Projeto criado com sucesso!" });
        })
        .catch(err => console.log(err));
    }

    return (
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os servicos</p>
            <ProjectForm btnText="Criar Projeto" handleSubmit={createPost} />
        </div>
    )
}

export default NewProject;