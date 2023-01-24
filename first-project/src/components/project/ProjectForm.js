import { useState, useEffect } from 'react';

import Input from '../form/Input';
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';
import styles from './ProjectForm.module.css';

function ProjectForm({ btnText, handleSubmit, projectData }) {
    const [categories, setCategories] = useState([]);
    const [project, setProject] = useState(projectData || {});

    useEffect(() => {
        fetch('http://localhost:5000/categories', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then((resp) => resp.json())
            .then((data) => (
                setCategories(data)
            ))
            .catch((err) => console.log(err));
    }, [])

    const submit = (e) => {
        e.preventDefault();
        handleSubmit(project);
    }

    function handleChange(e) {
        setProject({ ...project, [e.target.name]: e.target.value });
    }

    function handleCategory(e) {
        setProject({
            ...project,
            category: {
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text
            }
        });
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <div>
                <Input
                    type="text"
                    text="Nome do projeto"
                    name="name"
                    placeholder="Nome do projeto"
                    handleOnChange={handleChange}
                    value={project.name}
                />
            </div>
            <div>
                <Input
                    type="number"
                    text="Orcamento do projeto"
                    name="budget"
                    placeholder="Orcamento total"
                    handleOnChange={handleChange}
                    value={project.budget}
                />
            </div>
            <div>
                <Select
                    name="category_id"
                    text="Selecione a categoria"
                    options={categories}
                    handleOnChange={handleCategory}
                    value={project.category ? project.category.id : ''}
                />
            </div>
            <div>
                <SubmitButton text={btnText} />
            </div>
        </form>
    )
}

export default ProjectForm;