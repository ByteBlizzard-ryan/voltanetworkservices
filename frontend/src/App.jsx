import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext'; 

import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

// --- IMPORTS ADMIN (Mouga) ---
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

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          
          {/* 🔑 ROUTES DE CONNEXION CLIENT (Sans Navbar/Footer) */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-reset-otp" element={<VerifyResetOtp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          
          {/* 🛒 ROUTES CLIENTS AVEC MAINLAYOUT (Contient Navbar + Footer) */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/acceuil" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/boutique" element={<Boutique />} />
            <Route path="/produit/:id" element={<ProduitDetaille />} />
            <Route path="/panier" element={<Cart />} />
            <Route path="/panier-vide" element={<EmptyCart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/conditions-utilisation" element={<TermsOfService />} />
            <Route path="/a-propos" element={<About />} />
            <Route path="/profil" element={<Profile />} />
            <Route path="/favoris" element={<Favorites />} />
            <Route path="/historique-commandes" element={<OrderHistory />} />
            <Route path="/favoris-vide" element={<FavoritesEmpty />} />
            <Route path="/politique-confidentialite" element={<PrivacyPolicy />} />
            <Route path="/success" element={<Success />} />
          </Route>

          {/* 🔐 PARTIE ADMINISTRATION */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<Gest_client />} />
            <Route path="users/:id_client" element={<ClientDetail />} />

            <Route path="products" element={<Gest_produit />} />
            <Route path="detail_produits/:id_product" element={<ProductDetail />} />

            <Route path="commande" element={<Gest_commande />} />
            <Route path="commande/:id_commande" element={<Detail_com />} />

            <Route path="administrateur" element={<Gest_Admin />} />
            <Route path="administrateur/ajouter_admin" element={<Ajout_Admin />} />
            <Route path="administrateur/:id_admin" element={<AdminDetail />} />

            <Route path="accesadmin" element={<Gest_Acces />} />
            <Route path="profil" element={<Profil />} />
          </Route>

        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;