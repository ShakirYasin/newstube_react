import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/index.css'
import App from './App'
import { UserProvider } from './context/UserContext'
import { NewsProvider } from './context/NewsContext'
import { ChannelProvider } from './context/ChannelContext'
import { SearchProvider } from './context/SearchContext';


ReactDOM.render(
    <UserProvider>
        <NewsProvider>
            <ChannelProvider>
                <SearchProvider>
                    <App />
                </SearchProvider>
            </ChannelProvider>
        </NewsProvider>
    </UserProvider>,
    document.getElementById('root')); 