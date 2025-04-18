
import React from 'react';
import { Link } from 'react-router-dom';
import { Globe2, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Globe2 className="h-6 w-6 text-primary" />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-primary">YOA AI LAB Investment Analyzer</span>
                <span className="text-sm text-muted-foreground">For Africa</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Plateforme stratégique pour l'installation et la transformation digitale en Afrique.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-sm uppercase tracking-wider text-gray-500 mb-4">
              Navigation
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/#country-analysis" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Analyse Pays
                </Link>
              </li>
              <li>
                <Link to="/#company-assessment" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Diagnostic Entreprise
                </Link>
              </li>
              <li>
                <Link to="/#analysis-dashboard" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Dashboard Analytique
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-sm uppercase tracking-wider text-gray-500 mb-4">
              Contact
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="h-4 w-4" />
                contact@africa-digital-navigator.com
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="h-4 w-4" />
                +33 1 23 45 67 89
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                Paris, France
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6">
          <p className="text-sm text-center text-gray-500">
            © {new Date().getFullYear()} YOA AI LAB Investment Analyzer. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

