import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      

    
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/reset-password" element={<ResetPassword />} />
  
        
        {/* Le MainLayout contient la Navbar et le Footer */}
        <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/acceuil" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/boutique" element={<Boutique />} />
        <Route path="/produit/" element={<ProduitDetaille />} />
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
        </Route>
      </Routes>
    </Router>
  );
}

export default App;