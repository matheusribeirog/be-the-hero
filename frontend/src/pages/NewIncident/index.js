import React,{useState} from 'react'



import logoImg from '../../assets/logo.svg'

import {Link,useHistory} from 'react-router-dom'

import {FiArrowLeft} from 'react-icons/fi'

import './styles.css'
import api from '../../services/api'

export default function NewIncident(){

    const [title,setTitle]=useState('');
    const [description,setDescription]=useState('');
    const [value,setValue]=useState('');
    const ongId=localStorage.getItem('ongsId')
    const history=useHistory();

    async function handleNewIncident(e){
        e.preventDefault();
        const data={
            title,description,value
        }
        try{
            await api.post('incidents',data, {
                headers:{
                    Authorization:ongId,
                }
            })
            history.push('/profile')
        }catch(err){
            alert("erro ao cadastrar caso")
        }
    }

    return (
       
        

        <div className="new-incident-container">
            <div className="content">
            <section>
                <img src={logoImg} alt="Be the Hero"/>
                <h1>Cadastrar Novo caso</h1>

                <p>Faça seu cadastro de um caso </p>

                <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#e02041"/>
                        Voltar para a home
                    </Link>
            </section>
            <form onSubmit={handleNewIncident}>
                <input 
                placeholder="Titulo do Caso"
                value={title}
                onChange={e=>setTitle(e.target.value)}
                />
                <textarea 
                placeholder="Descrição"
                value={description}
                onChange={e=>setDescription(e.target.value)}
                />
                <input 
                placeholder="Valor em Reais"
                value={value}
                onChange={e=>setValue(e.target.value)}
                />

                
                <button className="button" type="submit">Cadastrar</button>
            </form>
            </div>
           
        </div>
    );
}