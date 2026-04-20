import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
// Importe tes pages (à créer dans le dossier src/pages)

function App() {
  return (
    <Router>
      <Routes>
        {/* Le MainLayout contient la Navbar et le Footer */}
        <Route path="/" element={<MainLayout />}>
          {/* Les pages s'afficheront ici via l'Outlet du Layout */}
          {/* Ajoute tes autres routes ici : contact, services, etc. */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;