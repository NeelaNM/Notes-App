import ThemeProvider from "./context/ThemeProvider";
import LoginForm from "./components/LoginForm/index.jsx";

function App() { 

  return(
    <ThemeProvider>
      <LoginForm />
    </ThemeProvider>)
}

export default App;



