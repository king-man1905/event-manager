import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EventCategoryStub from './pages/EventCategoryStub';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/events/:slug" element={<EventCategoryStub />} />
      <Route path="*" element={<EventCategoryStub />} />
    </Routes>
  );
}
