import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChristPlayer } from './components/ChristPlayer';
import { StudentPlayer } from './components/StudentPlayer';
import { XiaozhanPlayer } from './components/XiaozhanPlayer';
import { SeniorPlayer } from './components/SeniorPlayer';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<StudentPlayer />} />
                <Route path="/student/*" element={<StudentPlayer />} />

                <Route path="/buddhism" element={<SeniorPlayer />} />
                <Route path="/opera" element={<SeniorPlayer />} />
                <Route path="/senior/*" element={<SeniorPlayer />} />

                <Route path="/christ" element={<ChristPlayer />} />
                <Route path="/xiaozhan" element={<XiaozhanPlayer />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
