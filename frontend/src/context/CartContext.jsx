import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Initialisation du panier avec le localStorage
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('volta_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // ── AJOUT DE L'ÉTAT DE RECHERCHE GLOBALE POUR LA BOUTIQUE ──
  const [searchQuery, setSearchQuery] = useState('');

  // Synchronisation automatique du localStorage à chaque modification du panier
  useEffect(() => {
    localStorage.setItem('volta_cart', JSON.stringify(cart));
  }, [cart]);

  // Ajouter un produit au panier
  const addToCart = (product) => {
    setCart(prevItems => {
      // 1. On vérifie si le produit existe déjà
      const isAlreadyInCart = prevItems.some(item => item.id_produit === product.id_produit);
      
      // 2. Si déjà présent, on ne fait rien (évite les doublons)
      if (isAlreadyInCart) {
        return prevItems;
      }
      
      // 3. Sinon, on l'ajoute avec une quantité de 1
      return [...prevItems, {
        id_produit: product.id_produit,
        nom_produit: product.nom_produit,
        prix_unitaire_produit: product.prix_unitaire_produit,
        url_image_principale: product.url_image_principale,
        sous_categorie: product.sous_categorie,
        quantity: 1
      }];
    });
  };

  // Mettre à jour la quantité d'un produit
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(items => items.map(item =>
      item.id_produit === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  // Supprimer un produit spécifique
  const removeFromCart = (id) => {
    setCart(items => items.filter(item => item.id_produit !== id));
  };

  // --- NOUVELLE FONCTION : VIDER LE PANIER COMPLET ---
  const clearCart = () => {
    setCart([]); // Vide l'état React
    localStorage.removeItem('volta_cart'); // Supprime du stockage local
  };

  // Calculs automatiques
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + (item.prix_unitaire_produit * item.quantity), 0);

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      updateQuantity, 
      removeFromCart, 
      clearCart, 
      cartCount, 
      cartTotal,
      // ── EXPORTATION DE LA RECHERCHE ──
      searchQuery,
      setSearchQuery
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personnalisé pour utiliser le panier
export const useCart = () => {
  const context = useContext(CartContext);
  // Sécurité : évite que l'app crash si useCart est appelé hors du Provider
  if (!context) {
    return { 
        cart: [], 
        cartTotal: 0, 
        cartCount: 0, 
        searchQuery: '', // Sécurité pour la recherche
        setSearchQuery: () => {}, // Sécurité pour la recherche
        addToCart: () => {}, 
        clearCart: () => {},
        updateQuantity: () => {},
        removeFromCart: () => {}
    };
  }
  return context;
};