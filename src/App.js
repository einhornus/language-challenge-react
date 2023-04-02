import logo from './logo.svg';
import './App.css';
import ChatPage from "./chat_page/ChatPage";
import SelectBoxPage from "./select_bot_page/SelectBotPage";

import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="chat" element={<ChatPage></ChatPage>}/>
                <Route path="" element={<SelectBoxPage></SelectBoxPage>}/>
            </Routes>
        </BrowserRouter>
    );
}


export default App;
