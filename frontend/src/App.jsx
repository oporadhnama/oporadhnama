import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import StatsCounter from './components/StatsCounter';
import NewsMarquee from './components/NewsMarquee';
import Contact from './components/Contact';
import About from './components/About';
import AllNews from './components/AllNews';
import NewsArchive from './components/NewsArchive';
import NewsDetail from './components/NewsDetail';
import SubmitInfo from './components/SubmitInfo';
import Graphs from './components/Graphs';
import ProtectedRoute from './components/ProtectedRoute';

// Admin
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import Overview from './admin/Overview';
import AddNews from './admin/AddNews';
import ManageNews from './admin/ManageNews';
import UserReports from './admin/UserReports';
import UserReportDetail from './admin/UserReportDetail';
import Moderators from './admin/Moderators';
import AdminSettings from './admin/Settings';
import ActivityLogs from './admin/ActivityLogs';

function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsCounter />
      <NewsMarquee />
    </>
  );
}

/** Wrapper that renders the public Navbar + content */
function PublicLayout({ children }) {
  return (
    // overflowX: 'clip' মুছে ফেলা হয়েছে এবং ক্লাসে overflow-x-hidden যোগ করা হয়েছে
    <div className="min-h-screen bg-black text-white flex flex-col justify-between overflow-x-hidden">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-start pb-16 w-full max-w-full">
        {children}
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* ─── Public Routes (with Navbar) ─────────────────────────── */}
        <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
        <Route path="/archive" element={<PublicLayout><NewsArchive /></PublicLayout>} />
        <Route path="/all-news" element={<PublicLayout><AllNews /></PublicLayout>} />
        <Route path="/graphs" element={<PublicLayout><Graphs /></PublicLayout>} />
        <Route path="/submit" element={<PublicLayout><SubmitInfo /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
        <Route path="/news/:id" element={<PublicLayout><NewsDetail /></PublicLayout>} />

        {/* ─── Admin Routes (no public Navbar) ─────────────────────── */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Overview />} />
          <Route path="manage-news" element={<ManageNews />} />
          <Route path="user-reports" element={<UserReports />} />
          <Route path="user-reports/:id" element={<UserReportDetail />} />
          <Route path="add-news" element={<AddNews />} />
          <Route path="moderators" element={<Moderators />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="activity-logs" element={<ActivityLogs />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;


