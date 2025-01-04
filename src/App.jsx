import { useState } from "react";
import Header from "./assets/Components/Header/Header";
import Home from "./assets/Components/Pages/Home/Home";
import Footer from "./assets/Components/Footer/Footer";
import Login from "./assets/Components/Pages/Login/Login";

export default function App() {
  const [isLoginOpen, setLoginOpen] = useState(false);

  const toggleLoginModal = () => setLoginOpen(!isLoginOpen);

  return (
    <div className={isLoginOpen ? "dim-background" : ""}>
      <Header onLoginClick={toggleLoginModal} />
      <Home />
      <Footer />
      {isLoginOpen && <Login onClose={toggleLoginModal} />}
    </div>
  );
}
