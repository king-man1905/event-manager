import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EventCategoryStub from './pages/EventCategoryStub';
import WeddingsHub from './pages/WeddingsHub';
import ExperienceDetail from './pages/ExperienceDetail';
import VerticalHub from './pages/VerticalHub';
import VerticalExperienceDetail from './pages/VerticalExperienceDetail';
import RealEventsHub from './pages/RealEventsHub';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/real-events" element={<RealEventsHub />} />
      <Route path="/events/weddings" element={<WeddingsHub />} />
      <Route path="/events/weddings/:layer/:slug" element={<ExperienceDetail />} />
      <Route path="/events/:vertical/:slug" element={<VerticalExperienceDetail />} />
      <Route path="/events/:slug" element={<VerticalHub />} />
      <Route path="*" element={<EventCategoryStub />} />
    </Routes>
  );
}
