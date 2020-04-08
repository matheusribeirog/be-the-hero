import React,{useState,useEffect} from 'react';
import logoImg from '../../assets/logo.svg'
import {Link,useHistory} from 'react-router-dom'
import {FiPower} from 'react-icons/fi'
import{FiTrash2} from 'react-icons/fi'

import api from '../../services/api'

import './styles.css'

export default function Profile(){
    const [incidents,setIncidents]=useState([]);
    const history=useHistory();
    const ongName=localStorage.getItem('ongsName');
    const ongId=localStorage.getItem('ongsId');
    
    
    useEffect(()=>{
        api.get('profile',{
            headers:{
                Authorization: ongId,
            }
        }).then(response=>{
            setIncidents(response.data)
        })
    },[ongId])

    function handleLogout(){
        localStorage.clear();
        history.push('');
    }

    async function handleDelete(id){
        try{
            await api.delete(`incidents/${id}`,{
                headers:{
                    Authorization: ongId,
                }
            })
            setIncidents(incidents.filter(incident=>incident.id !== id))
        }catch(err){
            alert("erro ao deletar incidente")
        }
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the hero"/>
                <span> Bem vinda {ongName}</span>
                <Link className="button" to="/incidents/new"> Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#e02041"/>
                </button>
            </header>
            <h1>Casos cadastrados</h1>
            <ul>
                {incidents.map(incident=>(
                    <li key={incident.id}>
                    <strong>Caso:</strong>
                    <p>{incident.title}</p>
                    <strong> Descricao</strong>
                    <p>{incident.description}</p>
                    <strong> VALOR:</strong>
                    <p>{Intl.NumberFormat('pt-br',{style:'currency',currency:'BRL'}).format(incident.value)}</p>
                    <button onClick={()=>handleDelete(incident.id)} type="button">
                        <FiTrash2 size={20} color="#a8a8b3"></FiTrash2>
                    </button>
                </li>
                ))}
                
            </ul>
        </div>
    )
}