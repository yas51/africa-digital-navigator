
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Hero } from '@/components/home/Hero';
import { Features } from '@/components/home/Features';
import { TopCountries } from '@/components/home/TopCountries';
import { MainContent } from '@/components/home/MainContent';
import type { CompanyAssessment } from '@/components/CompanyAssessmentForm';

const Index = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [assessment, setAssessment] = useState<CompanyAssessment | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();
  
  const handleCountrySelect = (countryId: string) => {
    setSelectedCountry(countryId);
    if (activeTab === "overview") {
      setActiveTab("country-analysis");
    }
    toast({
      title: "Pays sélectionné",
      description: `Vous avez choisi d'analyser le pays avec l'ID: ${countryId}`,
    });
  };
  
  const handleAssessmentComplete = (data: CompanyAssessment) => {
    setAssessment(data);
    setActiveTab("analysis-dashboard");
    toast({
      title: "Diagnostic terminé",
      description: `Votre diagnostic pour ${data.companyName} a été complété avec succès.`,
    });
  };
  
  const handleResetAssessment = () => {
    setAssessment(null);
    setActiveTab("company-assessment");
    toast({
      title: "Réinitialisation du diagnostic",
      description: "Vous pouvez recommencer le diagnostic de votre entreprise.",
    });
  };

  const handleDownloadReport = async () => {
    if (assessment) {
      toast({
        title: "Génération du rapport",
        description: "Votre rapport de diagnostic est en cours de préparation...",
      });
      
      try {
        const { default: jsPDF } = await import('jspdf');
        const doc = new jsPDF('p', 'mm', 'a4');
        
        // Page de titre plus détaillée
        doc.setFontSize(22);
        doc.text("Rapport de Diagnostic de Maturité Digitale", 105, 20, { align: 'center' });
        
        doc.setFontSize(16);
        doc.text(`${assessment.companyName}`, 105, 30, { align: 'center' });
        
        // Informations générales
        doc.setFontSize(12);
        let yPos = 50;
        
        const generalInfo = [
          `Date: ${new Date().toLocaleDateString()}`,
          `Secteur: ${assessment.sector}`,
          `Taille: ${assessment.size}`,
          `Score de Maturité Digitale: ${assessment.readinessScore}/100`
        ];
        
        generalInfo.forEach(info => {
          doc.text(info, 20, yPos);
          yPos += 10;
        });
        
        // Section Scores par Catégorie
        yPos += 10;
        doc.setFontSize(16);
        doc.text("Analyse Détaillée par Catégorie", 20, yPos);
        
        yPos += 10;
        doc.setFontSize(12);
        
        Object.entries(assessment.categoryScores).forEach(([category, score]) => {
          doc.text(`${category}: ${score}/100`, 25, yPos);
          yPos += 8;
        });
        
        // Sections Compétences et Technologies
        [
          { title: "Compétences Digitales", items: assessment.skills },
          { title: "Technologies Actuelles", items: assessment.technologies },
          { title: "Objectifs de Digitalisation", items: assessment.objectives },
          { title: "Défis Identifiés", items: assessment.challenges }
        ].forEach(section => {
          yPos += 10;
          doc.setFontSize(16);
          doc.text(section.title, 20, yPos);
          
          yPos += 10;
          doc.setFontSize(12);
          section.items.forEach(item => {
            doc.text(`• ${item}`, 25, yPos);
            yPos += 8;
          });
        });
        
        doc.save(`diagnostic-${assessment.companyName.replace(/\s+/g, '-').toLowerCase()}.pdf`);
        
        toast({
          title: "Rapport généré",
          description: "Votre rapport détaillé a été téléchargé avec succès.",
        });
      } catch (error) {
        console.error("Erreur lors de la génération du rapport :", error);
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de la génération du rapport.",
          variant: "destructive",
        });
      }
    }
  };
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header onTabChange={handleTabChange} />
      
      <main className="flex-1">
        <Hero onTabChange={handleTabChange} />
        <Features onTabChange={handleTabChange} assessment={assessment} />
        <TopCountries setSelectedCountry={setSelectedCountry} setActiveTab={setActiveTab} />
        <MainContent 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          selectedCountry={selectedCountry}
          handleCountrySelect={handleCountrySelect}
          assessment={assessment}
          handleAssessmentComplete={handleAssessmentComplete}
          handleResetAssessment={handleResetAssessment}
          handleDownloadReport={handleDownloadReport}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
