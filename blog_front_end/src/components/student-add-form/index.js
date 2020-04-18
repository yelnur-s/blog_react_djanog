import React, {useState} from 'react'

function StudentAddForm(props) {

    const [formData, setFormData] = useState({
        id: ``,
        name: ``,
        age: ``
    })

    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const addStudnet = () => {
        props.addNewStudent(formData)
        setFormData({
            id: ``,
            name: ``,
            age: ``
        })
    }

    return (
        <div>
            <input name="id" value={formData.id} onChange={onChange} placeholder="Enter id"/>
            <input name="name" value={formData.name} onChange={onChange} placeholder="Enter name"/>
            <input name="age" value={formData.age} onChange={onChange} placeholder="Enter age"/>
            <button onClick={addStudnet}>ADD</button>
        </div>
    )
}

export default StudentAddForm;