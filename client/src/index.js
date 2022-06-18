import ReactDOM from 'react-dom'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/index.css'
import { UserProvider } from './context/UserContext'


ReactDOM.render(<UserProvider><App /></UserProvider>, document.getElementById('root')); 