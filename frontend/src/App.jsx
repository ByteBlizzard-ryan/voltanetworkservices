import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './components/Administrateur/Dashboard/dashboard';
import Gest_client from './components/Administrateur/Gest_Client/Ges_client';
import ClientDetail from './components/Administrateur/Gest_Client/detail_client';

import Gest_produit from './components/Administrateur/Gest_Produit/Ges_produit';
import ProductDetail from './components/Administrateur/Gest_Produit/detail_produit';

import Gest_commande from './components/Administrateur/Gest_Commande/Ges_commande';
import Detail_com from './components/Administrateur/Gest_Commande/detail_com';

import Gest_Admin from './components/Administrateur/Gest_Admin/Ges_Admin';
import Ajout_Admin from './components/Administrateur/Gest_Admin/ajout_admin';
import AdminDetail from './components/Administrateur/Gest_Admin/detail_admin';

import Profil from './components/Administrateur/Profil/Profil';

import Gest_Acces from './components/Administrateur/Ges_droit_Acces/Gest_Acces';
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

          
          {/* 🔐 PARTIE ADMIN */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<Gest_client />} />
            <Route path='users/:id_client' element={<ClientDetail/>}/>

            <Route path='products' element={<Gest_produit/>}/>
            <Route path='detail_produits/:id_product' element={<ProductDetail/>}/>

            <Route path='commande' element={<Gest_commande/>}/>
            <Route path='commande/:id_commande' element={<Detail_com/>}/>

            <Route path='administrateur' element={<Gest_Admin/>}/>
            <Route path='administrateur/ajouter_admin' element={<Ajout_Admin/>}/>
            <Route path='administrateur/:id_admin' element={<AdminDetail/>}/>

            <Route path='accesadmin' element={<Gest_Acces/>}/>
            <Route path='profil' element={<Profil/>}/>
            
            {/* autres pages admin  */}
            {/* <Route path="communication" element={<Communication />} /> */}
            {/* <Route path="gestion" element={<Gestion />} /> */}
          </Route>
        </Routes>
    </Router>
  );
}

export default App;