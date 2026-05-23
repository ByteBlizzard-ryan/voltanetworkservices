import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const products = [
  {
    id: 1,
    category: "SÉRIE SURVEILLANCE",
    name: "Sentinel V-Series",
    price: "4990 FCFA",
    image: "https://th.bing.com/th/id/R.03f006ffd30d5d845c10f058ebc9c931?rik=1tilNHcXWKK10A&pid=ImgRaw&r=0", // Remplace par ton image
    tag: "NOUVEAU"
  },
  {
    id: 2,
    category: "ACCÈS BIOMÉTRIQUE",
    name: "Bio-Lock Pro",
    price: "24900 FCFA",
    image: "https://th.bing.com/th/id/R.03f006ffd30d5d845c10f058ebc9c931?rik=1tilNHcXWKK10A&pid=ImgRaw&r=0", // Remplace par ton image
    tag: null
  },
  {
    id: 3,
    category: "SCANNING",
    name: "RFID Reader Plus",
    price: "12900 FCFA",
    image: "https://th.bing.com/th/id/R.03f006ffd30d5d845c10f058ebc9c931?rik=1tilNHcXWKK10A&pid=ImgRaw&r=0", // Remplace par ton image
    tag: null
  },
  {
    id: 4,
    category: "RÉSEAU CRITIQUE",
    name: "Cyber-Wall Firewall",
    price: "899 FCFA",
    image: "https://th.bing.com/th/id/R.03f006ffd30d5d845c10f058ebc9c931?rik=1tilNHcXWKK10A&pid=ImgRaw&r=0", // Remplace par ton image
    tag: null
  }
];

export default function ProductSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header de la section */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <p className="text-[#9ADE7B] font-bold text-[10px] uppercase tracking-[0.4em] mb-2">Catalogue</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-gray-900">Produits populaires</h2>
          </div>
          <Link 
            to="/boutique" 
            className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-[#9ADE7B] transition-colors border-b border-transparent hover:border-[#9ADE7B] pb-1"
          >
            Voir toute la boutique
          </Link>
        </div>

        {/* Grille de produits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="bg-[#1A1D1F] rounded-2xl overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-2xl hover:shadow-[#9ADE7B]/5"
            >
              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden bg-[#242729] m-3 rounded-xl">
                {product.tag && (
                  <span className="absolute top-3 left-3 z-10 bg-[#9ADE7B] text-black text-[9px] font-black px-2 py-1 rounded">
                    {product.tag}
                  </span>
                )}
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
              </div>

              {/* Infos Produit */}
              <div className="p-6 pt-2 flex flex-col flex-grow">
                <p className="text-[#9ADE7B] text-[9px] font-bold tracking-widest uppercase mb-2">
                  {product.category}
                </p>
                <h3 className="text-white font-bold text-lg mb-4 tracking-tight">
                  {product.name}
                </h3>
                
                <div className="mt-auto flex justify-between items-center">
                  <span className="text-white font-black text-xl tracking-tighter">
                    {product.price}
                  </span>
                  <button 
                    className="bg-[#242729] hover:bg-[#9ADE7B] text-[#9ADE7B] hover:text-black p-3 rounded-xl transition-all duration-300 active:scale-90"
                    aria-label="Ajouter au panier"
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}