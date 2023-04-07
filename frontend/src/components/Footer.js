import { Route } from "react-router-dom";
function Footer(){
  return(
    <Route exact path='/'>
    <footer className="footer">
      <p className="footer__copyright">&copy; 2022 Логвинов Илья</p>
    </footer>
    </Route>
  )
}
export default Footer;
