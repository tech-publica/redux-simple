import { Link, Outlet } from "react-router-dom";


const App = () => {
  return (
      <div>
          <header>
            <Link to="/">Adopt Me!</Link>
          </header>
          <Outlet/>
      </div>

  );
};

export default App;
