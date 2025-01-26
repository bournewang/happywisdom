import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BuddhismPlayer } from './components/BuddhismPlayer';
import { ChristPlayer } from './components/ChristPlayer';
import { StudentPlayer } from './components/StudentPlayer';
import { XiaozhanPlayer } from './components/XiaozhanPlayer';
import { OperaPlayer } from './components/OperaPlayer';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/buddhism" element={<BuddhismPlayer />} />
                <Route path="/christ" element={<ChristPlayer />} />
                <Route path="/student/*" element={<StudentPlayer />} />
                <Route path="/" element={<StudentPlayer />} />
                <Route path="/xiaozhan" element={<XiaozhanPlayer />} />
                <Route path="/opera" element={<OperaPlayer />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
