import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GroupProvider } from "./context/GroupContext";

import { QueryClient, QueryClientProvider } 
from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(

   
<QueryClientProvider client={queryClient}>
    <GroupProvider>
        <App />
    </GroupProvider>
</QueryClientProvider>

)
