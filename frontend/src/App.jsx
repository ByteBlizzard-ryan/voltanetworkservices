import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { CartProvider } from './context/CartContext'; 
// 🛠️ Import du gestionnaire de contexte pour la Sidebar et les Permissions
import { SidebarProvider } from './pages/Admin/Context_sider';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

// --- IMPORTS ADMIN (Mouga) ---
import Dashboard from './pages/Admin/Dashboard/dashboard';
import Gest_client from './pages/Admin/Gest_Client/Ges_client';
import ClientDetail from './pages/Admin/Gest_Client/detail_client';
import Gest_produit from './pages/Admin/Gest_Produit/Ges_produit';
import ProductDetail from './pages/Admin/Gest_Produit/detail_produit';
import Gest_commande from './pages/Admin/Gest_Commande/Ges_commande';
import Detail_com from './pages/Admin/Gest_Commande/detail_com';
import Gest_Admin from './pages/Admin/Gest_Admin/Ges_Admin';
import Ajout_Admin from './pages/Admin/Gest_Admin/ajout_admin';
import AdminDetail from './pages/Admin/Gest_Admin/detail_admin';
import Profil from './pages/Admin/Profil/Profil';
import Gest_Acces from './pages/Admin/Ges_droit_Acces/Gest_Acces';

// --- IMPORTS CLIENTS (Gaby) ---
import Login from './pages/Client/Connexion';
import Register from './pages/Client/creationCompte';
import VerifyEmail from './pages/Client/verificationEmail';
import ResetPassword from './pages/Client/reinitialisationMotDePasse';
import Home from './pages/Client/pageAcceuil';
import Services from './pages/Client/service';
import Contact from './pages/Client/contact';
import Boutique from './pages/Client/boutique';
import ProduitDetaille from './pages/Client/produitDetaille';
import Cart from './pages/Client/panierUtilisateur';
import EmptyCart from './pages/Client/panierUtilisateurVide';
import Checkout from './pages/Client/checkoutCommande';
import TermsOfService from './pages/Client/conditionUtilisation';
import About from './pages/Client/apropos';
import Profile from './pages/Client/profilUtilisateurInfo';
import Favorites from './pages/Client/favoris';
import OrderHistory from './pages/Client/historiqueCommandes';
import FavoritesEmpty from './pages/Client/favorisVide';
import PrivacyPolicy from './pages/Client/politiqueCondifentialite';
import ForgotPassword from './pages/Client/ForgotPassword';
import VerifyResetOtp from './pages/Client/VerifyResetOtp';
import Success from './pages/Client/Success';

// 🛡️ 1. GUEST GUARD : Uniquement pour les visiteurs NON connectés
// Si un utilisateur connecté tape manuellement /login ou /register, il est chassé vers son espace dédié
function GuestRoute() {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('user_role');

  if (token) {
    return role === 'ADMIN' ? <Navigate to="/admin/dashboard" replace /> : <Navigate to="/profil" replace />;
  }
  return <Outlet />;
}

// 🛡️ 2. ADMIN GUARD : Uniquement pour les ADMINISTRATEURS
// Si un client ou un anonyme tape manuellement /admin/*, rideau noir : redirection /login
function AdminRoute() {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('user_role');

  if (!token || role !== 'ADMIN') {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}

// 🛡️ 3. PRIVATE GUARD (Nouveau) : Pour TOUS les utilisateurs connectés (Clients et Admins)
// Empêche un anonyme d'accéder au profil, à l'historique ou au checkout en tapant l'URL
function PrivateRoute() {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}

function App() {
  return (
    <CartProvider>
      <SidebarProvider>
        <Router>
          <Routes>
            
            {/* 🔑 A. ROUTES D'AUTHENTIFICATION (Interdites aux connectés) */}
            <Route element={<GuestRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/verify-reset-otp" element={<VerifyResetOtp />} />
              <Route path="/reset-password" element={<ResetPassword />} />
            </Route>
            
            {/* 🔐 B. BLOC ESPACE ADMINISTRATION (Totalement hermétique aux clients et anonymes) */}
            <Route path="/admin" element={<AdminRoute />}>
              <Route element={<AdminLayout />}>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                
                <Route path="users" element={<Gest_client />} />
                <Route path="users/:id_client" element={<ClientDetail />} />
                
                <Route path="products" element={<Gest_produit />} />
                <Route path="detail_produits/:id_product" element={<ProductDetail />} />
                
                <Route path="commande" element={<Gest_commande />} />
                <Route path="commande/:id_commande" element={<Detail_com />} />
                
                <Route path="administrateur">
                  <Route index element={<Gest_Admin />} />
                  <Route path="ajouter_admin" element={<Ajout_Admin />} />
                  <Route path=":id_admin" element={<AdminDetail />} />
                </Route>
                
                <Route path="accesadmin" element={<Gest_Acces />} />
                <Route path="profil" element={<Profil />} />
              </Route>
            </Route>

            {/* 🛒 C. BLOC CLIENTS & VITRINE PUBLIC */}
            <Route path="/" element={<MainLayout />}>
              {/* --- Sous-bloc 1 : Pages 100% Publiques (Accessibles à tous) --- */}
              <Route index element={<Home />} />
              <Route path="acceuil" element={<Home />} />
              <Route path="services" element={<Services />} />
              <Route path="contact" element={<Contact />} />
              <Route path="boutique" element={<Boutique />} />
              <Route path="produit/:id" element={<ProduitDetaille />} />
              <Route path="panier" element={<Cart />} />
              <Route path="panier-vide" element={<EmptyCart />} />
              <Route path="conditions-utilisation" element={<TermsOfService />} />
              <Route path="a-propos" element={<About />} />
              <Route path="politique-confidentialite" element={<PrivacyPolicy />} />
              <Route path="success" element={<Success />} />

              {/* --- Sous-bloc 2 : Pages Privées (Connexion obligatoire) --- */}
              {/* Protège le profil et les données sensibles des clients contre les visiteurs anonymes */}
              <Route element={<PrivateRoute />}>
                <Route path="profil" element={<Profile />} />
                <Route path="favoris" element={<Favorites />} />
                <Route path="favoris-vide" element={<FavoritesEmpty />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="historique-commandes" element={<OrderHistory />} />
              </Route>
              
              {/* Redirection fallback propre si Laravel pousse une route mal formatée */}
              <Route path="client/dashboard" element={<Navigate to="/profil" replace />} />
            </Route>

            {/* 🔄 D. REDIRECTION GÉNÉRALE SÉCURITÉ */}
            <Route path="*" element={<Navigate to="/" replace />} />

          </Routes>
        </Router>
      </SidebarProvider>
    </CartProvider>
  );
}

export default App;