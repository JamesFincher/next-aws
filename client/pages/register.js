import Layout from '../components/Layout';
import { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: '',
    buttonText: 'Register',
  });

  const { name, email, password, error, success, buttonText } = form;
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
      error: '',
      success: '',
      buttonText: 'Register',
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data', form);
    axios
      .post(`http://localhost:3005/api/register`, {
        name,
        email,
        password,
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };
  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <input
          name='name'
          type='text'
          onChange={handleChange}
          className='form-control'
          value={form.name}
          placeholder='Give us your name'
        />
      </div>
      <div className='form-group'>
        <input
          name='email'
          onChange={handleChange}
          type='email'
          value={email}
          className='form-control'
          placeholder='Type your email'
        />
      </div>
      <div className='form-group'>
        <input
          name='password'
          onChange={handleChange}
          type='password'
          value={password}
          className='form-control'
          placeholder='A good password'
        />
      </div>
      <div className='form-group'>
        <button type='submit' className='btn btn-primary btn-block'>
          Register
        </button>
      </div>
    </form>
  );
  return (
    <Layout>
      <div className='col-md-6 offset-md-3'>
        <h1 className='text-center'>{form.buttonText}</h1>
        <br />
        {registerForm()}
      </div>
    </Layout>
  );
};
export default Register;
