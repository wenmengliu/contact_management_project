import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import ToastContext from "./ToastContext";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const { toast } = useContext(ToastContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   checkUserLoggedIn();
  // }, []);

  // check if the user is logged in.
  // const checkUserLoggedIn = async () => {
  //   try {
  //     const res = await fetch(`http://localhost:3000/api/me`, {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     });
  //     const result = await res.json();
  //     if (!result.error) {
  //       if (location.pathname === "/login") {
  //         setTimeout(() => {
  //           navigate("/", { replace: true });
  //         }, 500);
  //       } else {
  //         navigate(location.pathname ? location.pathname : "/");
  //       }
  //       setUser(result);
  //     } else {
  //       navigate("/login", { replace: true });
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // login request.
  const loginUser = async (userData) => {
    try {
      const res = await fetch(`http://localhost:3000/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...userData }),
      });

      const result = await res.json();

      if (!result.error) {
        localStorage.setItem("token", result.token);
        setUser(result.user);
        toast.success(`Logged in ${result.user.name} successfully`);
        navigate("/", { replace: true });
      } else {
        toast.error(result.error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider value={{ loginUser, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
