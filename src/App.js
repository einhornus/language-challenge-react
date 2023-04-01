import logo from './logo.svg';
import './App.css';
import ChatPage from "./pages/ChatPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
    return (
            <BrowserRouter>
                <Routes>
                    <Route path="chat" element={<ChatPage></ChatPage>}/>
                </Routes>
            </BrowserRouter>
    );
}


export default App;
