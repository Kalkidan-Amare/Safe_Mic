import React from "react";
import Navbar from "./component/Navbar/Navbar";
import AllRouting from "./component/AllRouting/AllRouting1";
import ComplaintBlock from "./component/Complaint/Collapsible/ComplaintBlock";
import { Provider } from "react-redux";
import { Button } from "./components/ui/button";
import store from "./store";
import { BrowserRouter, useLocation, useNavigate } from "react-router-dom";
import Auth from "./component/LoginPage/Auth";
import { useState, useEffect } from "react";
import Selector from "./component/ThemeSelector/Selector";
import { createContext } from "react";
import DrawerComp from "./component/Customization/DrawerComp";
import { QueryClient, QueryClientProvider } from "react-query";
import Footer from "./component/Footer/Footer";
import Loading from "./component/Animation/Loading/Loading";


const queryClient = new QueryClient();

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
};

export const themeContext=createContext(null)
const App = () => {
  
  const [theme,setTheme]=useState({
    current:'slate',
    previous:null,
    dark:false
  })

  let themes=['light','rose','violate','slate','dark','darkrose','darkviolate','darkslate']

  useEffect(()=>{
    const root = window.document.documentElement
    if(theme.previous!=null)root.classList.remove(theme.previous)
    root.classList.add(theme.current)
    
  },[theme])

  const changeTheme=(i)=>{
    theme.dark?i=i+4:i
    console.log(i,theme.dark)
      setTheme({current:themes.at(i),
                previous:theme.current,
                dark:theme.dark})
    //themeIndex<3?setThemeIndex(++themeIndex):setThemeIndex(themeIndex=0)
  }
  const darkThemeSwitch=()=>{
    let CurrentIndex=themes.indexOf(theme.current);
    if(theme.dark){
      setTheme({
        current:themes.at(CurrentIndex%4),
        previous:themes.at(CurrentIndex),
        dark:false
      })
    }else{
      setTheme({
        current:themes.at(CurrentIndex+4),
        previous:themes.at(CurrentIndex),
        dark:true
      })
    }
    }
  return (
    <Provider store={store}>
      <BrowserRouter>
          <QueryClientProvider client={queryClient}>

          <Auth/>
          <ScrollToTop/>
          <themeContext.Provider value={{changeTheme,darkThemeSwitch,theme}}>
          <Navbar />
      
          </themeContext.Provider>
          <AllRouting />
          <Footer/>
          </QueryClientProvider>
      </BrowserRouter>
    </Provider>
  );
};
export default App;
