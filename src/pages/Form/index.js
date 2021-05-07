import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import * as yup from 'yup';
import InputMask from "react-input-mask";
import './styles.css';

function Form() {
  //const location = useLocation();//recebe algo da rota 
  const [ name, setName ] = useState();
  const [ email, setEmail ] = useState();
  const [ phone, setPhone ] = useState();
  const [ cep, setCEP ] = useState('');
  const [ street, setStreet ] = useState('');
  const [ number, setNumber ] = useState();
  const [ building, setBuilding ] = useState();
  const [ neighborhood, setNeighborhood ] = useState();
  const [ city, setCity ] = useState();
  const [ state, setState ] = useState();

  const [ errors, setErrors ] = useState({ 
    name: false, 
    email: false, 
    phone: false,
    cep: false,
    street: false,
    number: false,
    building: false,
    neighborhood: false,
    city: false,
    state: false,
  });


  useEffect(() => {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    
    const CEP = cep.replace('-', '');

    if(CEP.length === 8) {
      fetch(url)
      .then(result => result.json())
      .then(adress => { 
        setStreet(adress.logradouro)
        setNeighborhood(adress.bairro)
        setCity(adress.localidade)
        setState(adress.uf)
      })
      .catch(e => console.log(e))
    }
    console.log(CEP)
  }, [cep]);

  function handleValidation () {
    const schema = yup.object().shape({
      name: yup
          .string()
          .required('Campo obrigatório'),  
      email: yup
          .string()
          .required('Campo obrigatório')
          .email('Digite um E-mail válido'),
      phone: yup
          .string()
          .min(10, 'O telefone deve conter até 11 dígitos')
          .max(11, 'O telefone deve conter até 11 dígitos'),
      cep: yup
        .string()
        .min(8,'O CEP deve conter 8 digitos')
        .required('Campo obrigatório'),
      street: yup
        .string()
        .required('Digite o nome da Rua'),
      number: yup
        .string()
        .required('Digite o número da Rua'),
      building: yup
        .string()
        .required('Digite o o tipo de complemento'),
      neighborhood: yup
        .string()
        .required('Digite o Bairro'),
      city: yup
        .string()
        .required('Digite a Cidade'),
      state: yup
        .string()
        .required('Digite a UF'),
      });

      schema.validate({ email,name,cep,street, number, building, neighborhood, city, state }, { abortEarly: false })
      .catch(err => {
          if(err instanceof yup.ValidationError) {
              const errorMessages = {}
              err.inner.forEach((error) => {
                errorMessages[error.path] = error.message;
              });
    
              setErrors(errorMessages);
          }
      });
  }
  console.log(errors);
    return (
    <div className="page">
      <div className="form">
        <label className='label'>
          <p className='error'>{errors.name}</p>
          <input 
            className="input"
            onChange={e => setName(e.target.value)} 
            value={name} 
            type="text" 
            name="Nome" 
            placeholder="Nome" 
          />
        </label>
        <label className='label'>
          <p className='error'>{errors.email}</p>
          <input  
            className="input"
            onChange={e => setEmail(e.target.value)} 
            value={email} 
            type="text" 
            name="Email" 
            placeholder="Email"
            />
        </label>
        <label className='label'>
          <p className='error'>{errors.phone}</p>
          <InputMask
            className="input"
            mask="9999999-9999"  
            onChange={e => setPhone(e.target.value)} 
            value={phone} 
            type="text" 
            name="Telefone" 
            placeholder="(53)99999-9999"
            />
        </label>
        <label className='label'>
          <p className='error'>{errors.cep}</p>
          <InputMask
            className="input"
            mask="99999-999"  
            onChange={e => setCEP(e.target.value)}
            value={cep}
            type="text"
            name="cep"
            placeholder="CEP"
          />
        </label>
        <label className='label'>
          <p className='error'>{errors.street}</p>
          <input  
            className="input"
            onChange={e => setStreet(e.target.value)}
            value={street}
            type="text"
            name="street"
            placeholder="Rua"
          />
        </label>
        <label className='label'>
          <p className='error'>{errors.number}</p>
          <input  
            className="input"
            onChange={e => setNumber(e.target.value)} 
            value={number} 
            type="text" 
            name="Número" 
            placeholder="Número"
            />
        </label>
        <label className='label'>
          <p className='error'>{errors.building}</p>
          <input  
          className="input"
          onChange={e => setBuilding(e.target.value)} 
          value={building} 
          type="text" 
          name="Complemento" 
          placeholder="Complemento"
          />
          
        </label>
        <label className='label'>
            <p className='error'>{errors.neighborhood}</p>
            <input  
            className="input"
            onChange={e => setNeighborhood(e.target.value)} 
            value={neighborhood} 
            type="text" 
            name="Bairro" 
            placeholder="Bairro"
            />
        </label>
        <label className='label'>
          <p className='error'>{errors.city}</p>
          <input  
          className="input"
          onChange={e => setCity(e.target.value)} 
          value={city} 
          type="text" 
          name="Cidade" 
          placeholder="Cidade"
          />
        </label>
        <label className='label'>
          <p className='error'>{errors.state}</p>
          <input  
          className="input"
          onChange={e => setState(e.target.value)} 
          value={state} 
          type="text" 
          name="Estado" 
          placeholder="UF"
          />
        </label>
        <button className="button" onClick={handleValidation}>ENVIAR</button>
      </div>
    </div>
  );
}

export default Form;