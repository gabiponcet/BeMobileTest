import React from 'react';
import { useHistory } from 'react-router-dom';
import './styles.css';

function Home() {
  const navigate = useHistory(); //envia para rotas

  function go () {
     navigate.push({ 
         pathname:"/form",
         state: ""
      });
  }  

 return (
    <div className="home">
      {/* <button  onClick={() => navigate.push("/form")}>Ir para formulário de cadastro</button>
      <button onClick={go}>Ir para formulário de cadastro</button>*/}
      <button className="go" onClick={() => go()}>Ir para formulário de cadastro</button> 
    </div>
  );
}

export default Home;