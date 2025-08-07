import React, { use, useContext, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import styled from "styled-components";
import { AuthContext } from "../../Provider/AuthContext";
import toast from "react-hot-toast";
import useAxiosSecure from "../../Hooks/UseAxiosSecure";
import { IconBrandGoogle } from "@tabler/icons-react";

const toastOptions = {
  style: {
    borderRadius: "10px",
    background: "white",
    color: "#6b46c1",
    fontWeight: "bold",
  },
  iconTheme: {
    primary: "#6b46c1",
    secondary: "#121212",
  },
};

const Login = () => {
  const { signIn, setUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const [error, setError] = useState("");
  const notifySuccess = (msg = "Welcome!") => toast.success(msg, toastOptions);
  const notifyError = (msg = "Login failed. Check your credentials.") =>
    toast.error(msg, toastOptions);

  // EMAIL/PASSWORD LOGIN
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signIn(email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        notifySuccess("Login successful!");
        navigate(location.state || "/");
      })
      .catch((error) => {
        setError(error.message);
        notifyError(error.message);
      });
  };

  // GOOGLE LOGIN
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      const googleUser = result.user;

      // Save user to DB (if not exists)
      const userInfo = {
        name: googleUser.displayName,
        email: googleUser.email,
        photoURL: googleUser.photoURL,
      };
      await axiosSecure.post("/api/users", userInfo);

      setUser(googleUser);
      notifySuccess("Google sign-up successful!");
      navigate("/");
    } catch (err) {
      setError(err.message);
      navigate("/");
      notifyError(error, "Google sign-up failed.");
    }
  };

  return (
    <StyledWrapper>
      <div className="wrapper">
        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
        <form onSubmit={handleLogin}>
          <p className="form-login">Login</p>
          <div className="input-box">
            {/* email */}
            <input type="email" name="email" placeholder="Email" required />
          </div>
          <div className="input-box">
            <input
              required
              name="password"
              placeholder="Password"
              type="password"
            />
          </div>
          <button className="btn" type="submit">
            Login
          </button>
          <div className="divider">or</div>
          <button
            onClick={handleGoogleLogin}
            className="bg-white w-full cursor-pointer flex items-center text-black justify-center gap-x-2 py-2 px-4 text-2xl"
          >
            <IconBrandGoogle size={24} />
            Google
          </button>
          <div className="register-link">
            <p>Don't have an account?</p>
            <NavLink to="/auth/register">
              <p className="text-blue-500">Register</p>
            </NavLink>
          </div>
        </form>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  margin: 100px auto;
  .wrapper {
    width: 420px;
    background: linear-gradient(
      135deg,
      rgba(10, 10, 10, 0.9),
      rgba(30, 30, 30, 0.85)
    );
    backdrop-filter: blur(10px);
    color: #fff;
    border-radius: 12px;
    padding: 30px 40px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.7);
  }
  .form-login {
    font-size: 36px;
    text-align: center;
    margin-bottom: 20px;
  }
  .wrapper .input-box {
    position: relative;
    width: 100%;
    height: 50px;
    margin: 25px 0;
  }
  .input-box input {
    width: 100%;
    height: 100%;
    background: transparent;
    border: none;
    outline: none;
    border: 2px solid rgba(255, 255, 255, 0.15);
    border-radius: 40px;
    font-size: 16px;
    color: #fff;
    padding: 20px 45px 20px 20px;
    transition: border-color 0.3s ease;
  }
  .input-box input::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
  .input-box input:focus {
    border-color: #6b46c1; /* your primary color */
  }

  .wrapper .remember-forgot {
    display: flex;
    justify-content: space-between;
    font-size: 14.5px;
    margin: -15px 0 15px;
  }
  .remember-forgot label input {
    accent-color: #6b46c1;
    margin-right: 6px;
    cursor: pointer;
  }
  .remember-forgot a {
    color: #6b46c1;
    text-decoration: none;
    font-weight: 600;
    cursor: pointer;
  }
  .remember-forgot a:hover {
    text-decoration: underline;
  }
  .wrapper .btn {
    width: 150px;
    height: 45px;
    background: #6b46c1;
    border: none;
    outline: none;
    border-radius: 40px;
    box-shadow: 0 0 12px #6b46c1;
    cursor: pointer;
    font-size: 16px;
    color: #fff;
    font-weight: 600;
    margin-left: calc(50% - 75px); /* center horizontally */
    margin-top: 15px;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
  }
  .wrapper .btn:hover {
    background: #bf31aa;
    box-shadow: 0 0 20px #bf31aa;
  }
  .wrapper .register-link {
    font-size: 14.5px;
    text-align: center;
    margin: 25px 0 0;
  }
  .register-link p a {
    color: #6b46c1;
    text-decoration: none;
    font-weight: 600;
    cursor: pointer;
  }
  .register-link p a:hover {
    text-decoration: underline;
  }

  /* Responsive */
  @media (max-width: 480px) {
    .wrapper {
      width: 100%;
      padding: 25px 20px;
      border-radius: 8px;
    }
    .form-login {
      font-size: 28px;
    }
    .wrapper .btn {
      width: 100%;
      margin-left: 0;
    }
  }
`;

export default Login;
