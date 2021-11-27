import './App.css';
import { Route, Routes } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';

function App() {
    return (
        <Routes>
            <Route path="/login">
                <LoginFormPage />
            </Route>
        </Routes>
    );
}

export default App;
