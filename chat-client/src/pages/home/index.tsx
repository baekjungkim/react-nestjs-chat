import { useState } from 'react';
import './index.css';

const Home = (props: any) => {
  const [id, setId] = useState<string>('');
  const [name, setName] = useState();
  
  const onLoginHandler = () => {
    window.localStorage.setItem('userId', id);
    props.history.push('/chats');
  }

  return (
    <form className="loginForm" id="home">
      <h2>Login</h2>
      <div className="idForm">
        <input type="text" className="id" placeholder="id" value={id} onChange={ (e: any) => setId(e.target.value)}/>
      </div>
      <div className="passForm">
        <input type="password" className="pw" placeholder="name" value={name} onChange={ (e: any) => setName(e.target.value)}/>
      </div>
      <button type="button" className="btn" onClick={ onLoginHandler }>
        JOIN
      </button>

      <div className="bottomText">
        Don't you have ID? sign up
      </div>
    </form>
  );
};

export default Home;
