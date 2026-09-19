import React, { useState } from 'react';
import { CATEGORIES } from '../data/categories';
import { CategoryCard } from '../components/cards/CategoryCard';
import { Search, Sparkles } from 'lucide-react';

export const CategoriesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = CATEGORIES.filter(
    (cat) =>
      cat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-orange-100 border border-orange-200 text-orange-800 text-xs font-bold shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-orange-500" />
          <span>10 Distinct Celebration Categories</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-[#450a0a]">
          Explore All <span className="text-orange-gradient font-serif italic">Celebrations</span>
        </h1>
        <p className="text-sm text-[#78350f] font-medium">
          Find the perfect invitation theme for your sacred ceremonies, milestones, and celebrations.
        </p>

        {/* Search Input */}
        <div className="pt-4 max-w-md mx-auto relative">
          <Search className="w-4 h-4 text-orange-500 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search categories (e.g. Wedding, Birthday, Puja)..."
            className="w-full bg-white border border-orange-200 rounded-2xl pl-11 pr-4 py-3 text-sm text-[#450a0a] placeholder-[#b45309] focus:outline-none focus:border-orange-500 transition-colors shadow-md"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((cat) => (
          <CategoryCard key={cat.id} category={cat} />
        ))}
      </div>
    </div>
  );
};
