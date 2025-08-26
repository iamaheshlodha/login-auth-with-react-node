import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { login } from "../store/slices/auth-slice";
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setApiMessage('');

      try {
        const response = await axios.post('http://localhost:3001/api/v1/auth/login', values);

        if (response.data.statusCode === 200) {
          localStorage.setItem('token', response.data.data.token);
          dispatch(login({ token: response.data.data.token })); 
          setApiMessage('Login successful! Redirecting...');
          navigate('/dashboard', { replace: true });
        } else {
          setApiMessage(response.data.message || 'Invalid credentials');
        }
      } catch (error) {
        setApiMessage(error.response?.data?.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    },
  });

  return (
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={formik.handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="input-field"
          />
          {formik.touched.email && formik.errors.email && (
            <div className="error-text">{formik.errors.email}</div>
          )}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="input-field"
          />
          {formik.touched.password && formik.errors.password && (
            <div className="error-text">{formik.errors.password}</div>
          )}

          {apiMessage && <p className="api-message">{apiMessage}</p>}

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
  );
}
