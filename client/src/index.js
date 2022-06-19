import ReactDOM from 'react-dom'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/index.css'
import { UserProvider } from './context/UserContext'
import { NewsProvider } from './context/NewsContext'


ReactDOM.render(
    <UserProvider>
        <NewsProvider>
            <App />
        </NewsProvider>
    </UserProvider>,
    document.getElementById('root')); 