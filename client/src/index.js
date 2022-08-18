import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/index.css'
import App from './App'
import { UserProvider } from './context/UserContext'
import { NewsProvider } from './context/NewsContext'
import { ChannelProvider } from './context/ChannelContext'
import { SearchProvider } from './context/SearchContext';
import { CollectionProvider } from './context/CollectionContext';
import { SubscriptionProvider } from './context/SubscriptionContext';


ReactDOM.render(
    <UserProvider>
        <NewsProvider>
            <ChannelProvider>
                <SubscriptionProvider>
                    <SearchProvider>
                        <CollectionProvider>
                            <App />
                        </CollectionProvider>
                    </SearchProvider>
                </SubscriptionProvider>
            </ChannelProvider>
        </NewsProvider>
    </UserProvider>,
    document.getElementById('root')); 