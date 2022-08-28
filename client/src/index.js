import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/index.css'
import { UserProvider } from './context/UserContext'
import { NewsProvider } from './context/NewsContext'
import { ChannelProvider } from './context/ChannelContext'
import { SearchProvider } from './context/SearchContext';
import { CollectionProvider } from './context/CollectionContext';
import { SubscriptionProvider } from './context/SubscriptionContext';

import App from './App'
import { CommentProvider } from './context/CommentContext';

ReactDOM.render(
    <UserProvider>
        <NewsProvider>
            <ChannelProvider>
                <SubscriptionProvider>
                    <SearchProvider>
                        <CollectionProvider>
                            <CommentProvider>
                                <App />
                            </CommentProvider>
                        </CollectionProvider>
                    </SearchProvider>
                </SubscriptionProvider>
            </ChannelProvider>
        </NewsProvider>
    </UserProvider>,
    document.getElementById('root')); 