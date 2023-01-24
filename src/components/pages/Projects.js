import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import styles from './Projects.module.css'

import Message from "../layout/Message"
import Container from "../layout/Container"
import LinkButton from "../layout/LinkButton"
import ProjectCard from "../project/ProjectCard"
import Loading from "../layout/Loading"

function Projects() {
    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const [projectMessage, setProjectMessage] = useState('')

    const location = useLocation()
    let message = ''
    if (location.state) {
        message = location.state
    }

    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:5000/projects', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    setProjects(data)
                    setRemoveLoading(true)
                })
                .catch(err => console.log(err))
        }, 300)
    }, [])

    function removeProject(project_id) {
        fetch(`http://localhost:5000/projects/${project_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(() => {
                setProjects(projects.filter(project => project.id !== project_id))
                setProjectMessage('Projeto removido com sucesso')
            })
            .catch(err => console.log(err))
    }

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/newproject" text="Criar Projeto" />
            </div>
            {message && <Message type="success" msg={message} />}
            {projectMessage && <Message type="success" msg={projectMessage} />}
            <Container customClass="start">
                {
                    projects.length > 0 &&
                    projects.map((project) => (
                        <ProjectCard
                            name={project.name}
                            budget={project.budget}
                            category={project.category.name}
                            key={project.id}
                            id={project.id}
                            handleRemove={removeProject}
                        />
                    ))
                }
                {!removeLoading && <Loading />}
                {
                    removeLoading &&
                    projects.length === 0 &&
                    <Message type="info" msg="Nenhum projeto encontrado" />
                }
            </Container>
        </div>
    )
}

export default Projects;