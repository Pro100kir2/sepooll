/* eslint-disable @typescript-eslint/no-unused-vars */
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import RoomPage from './pages/RoomPage';
import CreateRoomPage from './pages/CreateRoomPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="create" element={<CreateRoomPage />} />
        <Route path="room/:roomId" element={<RoomPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;