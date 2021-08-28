import React , {useState, useEffect} from "react";
import "react-perfect-scrollbar/dist/css/styles.css";
import { useRoutes } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import GlobalStyles from "../src/components/GlobalStyles";
import "../src/mixins/chartjs";
import theme from "../src/theme";
import routes from "../src/routes";
import { AppContext } from "./libs/contextLib";
import { Auth } from "aws-amplify";

const App = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const routing = useRoutes(routes(isAuthenticated));

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch (e) {
      if (e !== "No current user") {
        console.log(e)
      }
    }

    setIsAuthenticating(false);
  }

  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
        <GlobalStyles />
        {routing}
      </AppContext.Provider>
    </ThemeProvider>
  );
};

export default App;
