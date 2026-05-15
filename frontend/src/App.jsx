import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext'; // Assure-toi que le chemin est correct

import MainLayout from './layouts/MainLayout';
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
    <CartProvider> {/* Le Provider enveloppe tout pour que le panier soit accessible partout */}
      <Router>
        <Routes>
          {/* Routes sans Navbar/Footer (Auth) */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-reset-otp" element={<VerifyResetOtp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          
          {/* Routes avec MainLayout (Navbar + Footer) */}
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
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;