
import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Globe2, FileBarChart, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <Globe2 className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-primary">Africa Digital Navigator</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Accueil
          </Link>
          <Link to="/#country-analysis" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Analyse Pays
          </Link>
          <Link to="/#company-assessment" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Diagnostic Entreprise
          </Link>
          <Link to="/#analysis-dashboard" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Dashboard
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" className="hidden md:flex">
            <FileBarChart className="mr-2 h-4 w-4" />
            Rapports
          </Button>
          <Button variant="default" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Commencer
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
