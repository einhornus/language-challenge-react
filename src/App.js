import logo from './logo.svg';
import './App.css';
import ChatPage from "./chat_page/ChatPage";
import SelectBoxPage from "./select_bot_page/SelectBotPage";
import TranslationPage from "./translation_page/TranslationPage";
import LinkifyPage from "./linkify_page/LinkifyPage";



import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="chat" element={<ChatPage></ChatPage>}/>
                <Route path="" element={<SelectBoxPage></SelectBoxPage>}/>
                <Route path="translate" element={<TranslationPage></TranslationPage>}/>
                <Route path="linkify" element={<LinkifyPage></LinkifyPage>}/>
            </Routes>
        </BrowserRouter>
    );
}


export default App;
