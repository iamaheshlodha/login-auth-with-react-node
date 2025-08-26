import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/slices/auth-slice";

export default function Dashboard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const handleLogout = () => {
      dispatch(logout());
      navigate('/login')
  }
  return (
    <div className="dashboard-container">
      <h1>Welcome to Dashboard</h1>
      <p>You are successfully logged in.</p>
      <button onClick={() => handleLogout()}>Logout</button>
    </div>
  );
}
