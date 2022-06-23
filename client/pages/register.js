import Layout from '../components/Layout';
import { useState } from 'react';
import axios from 'axios';
import { API } from '../config';

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    setForm({ ...form, buttonText: 'Registering...' });
    console.log('Form data', form);
    try {
      const response = await axios.post(`${API}/register`, {
        name,
        email,
        password,
      });
      console.log('ressss', response);
      response.data.error
        ? setForm({
            ...form,
            error: `${response.data.message} /n /n Error Message: ${response.data.error}`,
            buttonText: 'Register',
          })
        : setForm({
            ...form,
            success: response.data.message,
            buttonText: 'Register',
          });
    } catch (error) {
      console.log(error);
      setForm({
        ...form,
        error: error.data,
        buttonText: 'Register',
      });
    }
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
          required
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
          required
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
          required
        />
      </div>
      <div className='form-group'>
        <button type='submit' className='btn btn-primary btn-block'>
          {buttonText}
        </button>
      </div>
    </form>
  );
  return (
    <Layout>
      <div className='col-md-6 offset-md-3'>
        {error ? <div className='alert alert-danger'>{error}</div> : ''}
        {success ? <div className='alert alert-success'>{success}</div> : ''}
        <br />
        {registerForm()}
      </div>
    </Layout>
  );
};
export default Register;
