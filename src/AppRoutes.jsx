import { Routes, Route } from 'react-router-dom';
import EventCategoryStub from './pages/EventCategoryStub';

function HomePlaceholder() {
  return <div className="px-6 py-24 text-center">Homepage — arriving in Task 12.</div>;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePlaceholder />} />
      <Route path="/events/:slug" element={<EventCategoryStub />} />
      <Route path="*" element={<EventCategoryStub />} />
    </Routes>
  );
}
