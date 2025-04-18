import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Globe2, FileBarChart, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import type jsPDF from 'jspdf';
import { useAuth } from "@/components/AuthProvider";
import { useNavigate } from "react-router-dom";
import { supabase } from '@/integrations/supabase/client';

interface HeaderProps {
  onTabChange?: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onTabChange }) => {
  const { toast } = useToast();
  const { session } = useAuth();
  const navigate = useNavigate();

  const handleTabClick = (tab: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (onTabChange) {
      onTabChange(tab);
    }
  };
  
  const handleReportsClick = () => {
    toast({
      title: "Rapports",
      description: "La génération de rapports a été lancée.",
    });
    
    const generatePDF = async () => {
      try {
        const { default: jsPDF } = await import('jspdf');
        const doc = new jsPDF();
        
        doc.setFontSize(22);
        doc.text("YOA DIGITAL ANALYZER - SAAS", 105, 20, { align: 'center' });
        
        doc.setFontSize(16);
        doc.text("Rapport d'analyse", 105, 30, { align: 'center' });
        
        doc.setFontSize(12);
        doc.text("Date: " + new Date().toLocaleDateString(), 20, 50);
        doc.text("Ce rapport présente une analyse des opportunités digitales en Afrique.", 20, 60);
        doc.text("Pour plus de détails, veuillez consulter le tableau de bord complet.", 20, 70);
        
        doc.save("yoa-digital-analyzer-rapport.pdf");
        
        toast({
          title: "Rapport généré",
          description: "Le rapport a été téléchargé avec succès.",
        });
      } catch (error) {
        console.error("Error generating PDF:", error);
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de la génération du rapport.",
          variant: "destructive",
        });
      }
    };
    
    generatePDF();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <Globe2 className="h-6 w-6 text-primary" />
          <div className="flex flex-col">
            <span className="text-xl font-bold text-primary">YOA AI LAB Investment Analyzer</span>
            <span className="text-sm text-muted-foreground">For Africa</span>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <a 
            href="#"
            onClick={handleTabClick("overview")} 
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Accueil
          </a>
          <a 
            href="#"
            onClick={handleTabClick("country-analysis")} 
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Analyse Pays
          </a>
          <a 
            href="#"
            onClick={handleTabClick("company-assessment")} 
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Diagnostic Entreprise
          </a>
          <a 
            href="#"
            onClick={handleTabClick("analysis-dashboard")} 
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Dashboard
          </a>
        </nav>
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="hidden md:flex"
            onClick={handleReportsClick}
          >
            <FileBarChart className="mr-2 h-4 w-4" />
            Rapports
          </Button>
          {session ? (
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Déconnexion
            </Button>
          ) : (
            <Button 
              variant="default" 
              size="sm"
              onClick={() => navigate('/auth')}
            >
              Se connecter
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
