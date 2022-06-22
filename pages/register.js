import Layout from '../components/Layout';

const Register = () => {
  const registerForm = () => (
    <form>
      <div className='form-group'>
        <input type='text' className='form-control' placeholder='Username' />
      </div>
      <div className='form-group'>
        <input type='email' className='form-control' placeholder='Email' />
      </div>
      <div className='form-group'>
        <input
          type='password'
          className='form-control'
          placeholder='Password'
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
        <h1 className='text-center'>Register</h1>
        <br />
        {registerForm()}
      </div>
    </Layout>
  );
};
export default Register;
