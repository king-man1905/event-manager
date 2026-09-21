import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EventCategoryStub from './pages/EventCategoryStub';
import WeddingsHub from './pages/WeddingsHub';
import ExperienceDetail from './pages/ExperienceDetail';
import VerticalHub from './pages/VerticalHub';
import VerticalExperienceDetail from './pages/VerticalExperienceDetail';
import RealEventsHub from './pages/RealEventsHub';
import SmartEnquiry from './pages/SmartEnquiry';
import Locations from './pages/Locations';
import ImageCredits from './pages/ImageCredits';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/real-events" element={<RealEventsHub />} />
      <Route path="/enquire" element={<SmartEnquiry />} />
      <Route path="/locations" element={<Locations />} />
      <Route path="/image-credits" element={<ImageCredits />} />
      <Route path="/events/weddings" element={<WeddingsHub />} />
      <Route path="/events/weddings/:layer/:slug" element={<ExperienceDetail />} />
      <Route path="/events/:vertical/:slug" element={<VerticalExperienceDetail />} />
      <Route path="/events/:slug" element={<VerticalHub />} />
      <Route path="*" element={<EventCategoryStub />} />
    </Routes>
  );
}
