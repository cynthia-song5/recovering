import { BrowserRouter, Routes, Route } from 'react-router';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/HomeScreen';
import { PersonDetail } from './components/PersonDetail';
import { VitalsScreen } from './components/VitalsScreen';
import { DevicesScreen } from './components/DevicesScreen';
import { CircleScreen } from './components/CircleScreen';
import { TasksScreen } from './components/TasksScreen';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <div className="max-w-md mx-auto relative">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/person/:id" element={<PersonDetail />} />
            <Route path="/vitals" element={<VitalsScreen />} />
            <Route path="/devices" element={<DevicesScreen />} />
            <Route path="/circle" element={<CircleScreen />} />
            <Route path="/tasks" element={<TasksScreen />} />
          </Routes>
          <BottomNav />
        </div>
      </div>
    </BrowserRouter>
  );
}