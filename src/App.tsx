import React from 'react';
import './App.scss';
import {Route, Routes, Navigate} from 'react-router-dom'
import Converter from "./pages/Converter/Converter";
import Currencies from "./pages/Currencies/Currencies";
import Navigation from "./components/Navigation/Navigation";

function App() {
    return (
        <div className="App">
            <Navigation/>
            <div className={'App__content'}>
                <Routes>
                    <Route path={'/'} element={<Navigate to={'/converter'} replace /> }/>
                    <Route path={'*'} element={<Navigate to={'/converter'} replace /> }/>
                    <Route path={'/converter'} element={<Converter/>}/>
                    <Route path={'/currencies'} element={<Currencies/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
