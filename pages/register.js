import Layout from '../components/Layout';
import { useState } from 'react';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: '',
    buttonText: 'Register',
  });
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
    setForm({ ...form, buttonText: 'Registering...' });
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
          value={form.email}
          className='form-control'
          placeholder='Type your email'
        />
      </div>
      <div className='form-group'>
        <input
          name='password'
          onChange={handleChange}
          type='password'
          value={form.password}
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
