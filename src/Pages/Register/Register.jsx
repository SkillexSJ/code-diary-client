import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router";
import styled from "styled-components";
import { AuthContext } from "../../Provider/AuthContext";
import useAxiosSecure from "../../Hooks/UseAxiosSecure";
import toast from "react-hot-toast";

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

const Register = () => {
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const { createUser, updateUser, setUser } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();

  const notifySuccess = (msg) => toast.success(msg, toastOptions);
  const notifyError = (msg) => toast.error(msg, toastOptions);

  // Upload image to imgbb
  const uploadImageToImgbb = async (file) => {
    const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
    const formData = new FormData();
    formData.append("image", file);
    const loadingToast = toast.loading("Uploading image...", toastOptions);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      toast.dismiss(loadingToast);
      if (!data.success) {
        notifyError("Image upload failed");
        throw new Error("Image upload failed");
      }

      notifySuccess("Image uploaded successfully!");
      return data.data.url;
    } catch (err) {
      notifyError("Image upload failed. Try again.");
      throw err;
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    const imageFile = formData.get("photoURL");

    // Validation
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      notifyError("Passwords do not match!");

      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      notifyError("Password must be at least 6 characters.");

      return;
    }
    if (!/[A-Z]/.test(password)) {
      notifyError("Password must contain at least one uppercase letter.");

      return;
    }
    if (!/[a-z]/.test(password)) {
      notifyError("Password must contain at least one lowercase letter.");

      return;
    }

    let photoURL = "";
    if (imageFile && imageFile.size > 0) {
      try {
        photoURL = await uploadImageToImgbb(imageFile);
      } catch (err) {
        return;
      }
    }

    try {
      const userCredential = await createUser(email, password);
      const user = userCredential.user;

      await updateUser({ displayName: name, photoURL });
      setUser({ ...user, displayName: name, photoURL });

      const userInfo = {
        name,
        email,
        photoURL,
        created_at: new Date().toISOString(),
      };

      await axiosSecure.post("/api/users", userInfo);
      notifySuccess("Registration successful! Welcome.");

      navigate(location.state || "/");
    } catch (err) {
      setError(err.message);
      notifyError(err.message);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  return (
    <StyledWrapper>
      <div className="wrapper">
        <form onSubmit={handleRegister}>
          <p className="form-login">Register</p>

          {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

          <div className="input-box">
            <input type="text" name="name" placeholder="Full Name" required />
          </div>

          <div className="input-box">
            <input type="email" name="email" placeholder="Email" required />
          </div>

          <div className="input-box">
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
            />
          </div>

          <div className="input-box">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              required
            />
          </div>

          <div className="input-box">
            <input
              type="file"
              name="photoURL"
              accept="image/*"
              onChange={handleImageChange}
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-20 h-20 object-cover rounded-full mt-2 mx-auto"
              />
            )}
          </div>

          <button className="btn" type="submit">
            Register
          </button>

          <div className="register-link">
            <p>
              Already have an account? <a href="/auth/login">Login</a>
            </p>
          </div>
        </form>
      </div>
    </StyledWrapper>
  );
};

export default Register;

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
