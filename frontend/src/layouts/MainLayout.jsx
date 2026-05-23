import { Outlet } from 'react-router-dom';
import Navbar from '../components/header';
import Footer from '../components/footer';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        {/* C'est ici que le contenu de Home ou Boutique apparaîtra */}
        <Outlet />
      
      </main>
      <Footer />
    </div>
  );
}