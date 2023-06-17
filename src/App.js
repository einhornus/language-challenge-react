import logo from './logo.svg';
import './App.css';
import ChatPage from "./chat_page/ChatPage";
import SelectBoxPage from "./select_bot_page/SelectBotPage";
import TranslationPage from "./translation_page/TranslationPage";
import LinkifyPage from "./linkify_page/LinkifyPage";
import CorrectionPage from "./correction_page/CorrectionPage";
import SettingsPage from "./settings_manager/SettingsPage";
import SignUpPage from "./auth/SignUpPage";
import {SignInPage, signIn} from "./auth/SignInPage";


import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SignUpPage></SignUpPage>}/>
                <Route path="/sign_in" element={<SignInPage></SignInPage>}/>
                <Route path="chat" element={<ChatPage></ChatPage>}/>
                <Route path="select" element={<SelectBoxPage></SelectBoxPage>}/>
                <Route path="translate" element={<TranslationPage></TranslationPage>}/>
                <Route path="linkify" element={<LinkifyPage></LinkifyPage>}/>
                <Route path="correct" element={<CorrectionPage></CorrectionPage>}/>
                <Route path="settings" element={<SettingsPage></SettingsPage>}/>
            </Routes>
        </BrowserRouter>
    );
}


export default App;
