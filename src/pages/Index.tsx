
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Globe2, Building2, ArrowRight, ExternalLink, Settings } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CountrySelector from '@/components/CountrySelector';
import MacroeconomicDashboard from '@/components/MacroeconomicDashboard';
import CompanyAssessmentForm, { CompanyAssessment } from '@/components/CompanyAssessmentForm';
import AnalysisDashboard from '@/components/AnalysisDashboard';
import { getTopCountriesByScore } from '@/data/countriesData';
import type jsPDF from 'jspdf';
import type html2canvas from 'html2canvas';

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
        description: "Votre rapport de diagnostic est en cours de préparation.",
      });
      
      try {
        const { default: jsPDF } = await import('jspdf');
        const { default: html2canvas } = await import('html2canvas');
        
        const doc = new jsPDF('p', 'mm', 'a4');
        
        doc.setFontSize(22);
        doc.text("Rapport de Diagnostic Entreprise", 105, 20, { align: 'center' });
        
        doc.setFontSize(16);
        doc.text(`${assessment.companyName}`, 105, 30, { align: 'center' });
        
        doc.setFontSize(12);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 40);
        doc.text(`Secteur: ${assessment.sector}`, 20, 50);
        doc.text(`Taille: ${assessment.size}`, 20, 60);
        doc.text(`Score de Maturité Digitale: ${assessment.readinessScore}/100`, 20, 70);
        
        doc.text("Scores par Catégorie:", 20, 85);
        let yPos = 95;
        Object.entries(assessment.categoryScores).forEach(([category, score]) => {
          doc.text(`${category}: ${score}/100`, 25, yPos);
          yPos += 8;
        });
        
        doc.text("Compétences Digitales:", 20, yPos);
        yPos += 10;
        assessment.skills.forEach(skill => {
          doc.text(`- ${skill}`, 25, yPos);
          yPos += 8;
        });
        
        const dashboardElement = document.getElementById('analysis-dashboard');
        if (dashboardElement) {
          try {
            const canvas = await html2canvas(dashboardElement, {
              scale: 0.5,
              useCORS: true,
              logging: false,
            });
            
            doc.addPage();
            doc.text("Tableau de Bord d'Analyse", 105, 20, { align: 'center' });
            
            const imgData = canvas.toDataURL('image/png');
            doc.addImage(imgData, 'PNG', 10, 30, 190, 230);
          } catch (error) {
            console.error("Error capturing dashboard:", error);
          }
        }
        
        doc.save(`diagnostic-${assessment.companyName.replace(/\s+/g, '-').toLowerCase()}.pdf`);
        
        toast({
          title: "Rapport généré",
          description: "Votre rapport de diagnostic a été téléchargé avec succès.",
        });
      } catch (error) {
        console.error("Error generating report:", error);
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de la génération du rapport.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Erreur",
        description: "Veuillez compléter le diagnostic avant de générer un rapport.",
        variant: "destructive",
      });
    }
  };
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const topCountries = getTopCountriesByScore(5);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header onTabChange={handleTabChange} />
      
      <main className="flex-1">
        <section className="hero-gradient text-white py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">
                  Africa Digital Navigator
                </h1>
                <p className="text-lg md:text-xl text-white/90 max-w-[600px]">
                  Plateforme d'analyse décisionnelle pour l'implantation et la transformation digitale en Afrique.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    size="lg" 
                    className="bg-white text-primary hover:bg-white/90" 
                    onClick={() => handleTabChange("country-analysis")}
                  >
                    Explorer les pays
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="bg-transparent border-white text-white hover:bg-white/10"
                    onClick={() => handleTabChange("company-assessment")}
                  >
                    Évaluer votre entreprise
                  </Button>
                </div>
              </div>
              
              <div className="hidden md:flex justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1614093302611-8efc4de20ec0?w=800&auto=format&fit=crop&q=80" 
                  alt="Carte de l'Afrique" 
                  className="rounded-lg shadow-xl max-w-full max-h-[400px] object-cover border-4 border-white/20" 
                />
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-12 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold tracking-tight">Une plateforme complète d'analyse</h2>
              <p className="text-muted-foreground mt-2 max-w-[700px] mx-auto">
                Trois modules puissants pour guider votre stratégie d'implantation et de transformation digitale
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="card-hover">
                <CardContent className="pt-6">
                  <div className="text-center mb-4">
                    <div className="bg-primary/10 inline-flex p-3 rounded-full">
                      <Globe2 className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mt-3 text-lg font-medium">Analyse Macroéconomique</h3>
                  </div>
                  <p className="text-sm text-muted-foreground text-center">
                    Évaluation complète des indicateurs économiques, politiques et sociaux des pays africains.
                  </p>
                  <div className="mt-4 text-center">
                    <Button variant="link" onClick={() => handleTabChange("country-analysis")}>
                      Analyser un pays
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="card-hover">
                <CardContent className="pt-6">
                  <div className="text-center mb-4">
                    <div className="bg-primary/10 inline-flex p-3 rounded-full">
                      <Building2 className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mt-3 text-lg font-medium">Diagnostic Entreprise</h3>
                  </div>
                  <p className="text-sm text-muted-foreground text-center">
                    Évaluation de la maturité digitale de votre entreprise et identification des besoins.
                  </p>
                  <div className="mt-4 text-center">
                    <Button variant="link" onClick={() => handleTabChange("company-assessment")}>
                      Démarrer le diagnostic
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="card-hover">
                <CardContent className="pt-6">
                  <div className="text-center mb-4">
                    <div className="bg-primary/10 inline-flex p-3 rounded-full">
                      <BarChart3 className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mt-3 text-lg font-medium">Dashboard Analytique</h3>
                  </div>
                  <p className="text-sm text-muted-foreground text-center">
                    Tableau de bord personnalisé avec recommandations stratégiques et feuille de route.
                  </p>
                  <div className="mt-4 text-center">
                    <Button variant="link" disabled={!assessment} onClick={() => assessment && setActiveTab("analysis-dashboard")}>
                      Voir le dashboard
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        <section className="py-12">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold tracking-tight">Top 5 des pays africains pour l'investissement digital</h2>
              <p className="text-muted-foreground mt-2">
                Classement basé sur les infrastructures numériques, la stabilité politique et les opportunités économiques
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topCountries.map((country, index) => (
                <Card key={country.id} className={`card-hover ${index === 0 ? 'md:col-span-2 lg:col-span-1 border-primary/20' : ''}`}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-3xl">{country.flag}</span>
                        <div>
                          <h3 className="font-medium">{country.name}</h3>
                          <p className="text-sm text-muted-foreground">{country.region}</p>
                        </div>
                      </div>
                      <div className="bg-primary/10 rounded-full px-2 py-1 text-sm font-medium text-primary">
                        #{index + 1}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Score:</span>
                        <span className="font-medium">{country.opportunityScore}/100</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Croissance PIB:</span>
                        <span className="font-medium">{country.gdpGrowth}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Internet:</span>
                        <span className="font-medium">{country.internetPenetration}%</span>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <Button 
                        variant="link" 
                        className="p-0" 
                        onClick={() => {
                          setSelectedCountry(country.id);
                          setActiveTab("country-analysis");
                        }}
                      >
                        Analyser en détail
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-12 bg-gray-50" id="main-content">
          <div className="container px-4 md:px-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Aperçu</TabsTrigger>
                <TabsTrigger value="country-analysis" id="country-analysis">Analyse Pays</TabsTrigger>
                <TabsTrigger value="company-assessment" id="company-assessment">Diagnostic Entreprise</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                <div className="text-center max-w-2xl mx-auto space-y-4">
                  <h2 className="text-2xl font-bold">Bienvenue sur Africa Digital Navigator</h2>
                  <p className="text-muted-foreground">
                    Choisissez un module pour commencer votre analyse stratégique pour l'implantation 
                    et la transformation digitale en Afrique.
                  </p>
                  
                  <div className="flex justify-center gap-4 pt-4">
                    <Button onClick={() => handleTabChange("country-analysis")}>
                      <Globe2 className="mr-2 h-4 w-4" />
                      Analyse Pays
                    </Button>
                    <Button onClick={() => handleTabChange("company-assessment")}>
                      <Building2 className="mr-2 h-4 w-4" />
                      Diagnostic Entreprise
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="country-analysis" className="space-y-6">
                <CountrySelector onSelect={handleCountrySelect} />
                {selectedCountry && (
                  <MacroeconomicDashboard countryId={selectedCountry} />
                )}
              </TabsContent>
              
              <TabsContent value="company-assessment" className="space-y-6">
                {assessment ? (
                  <div className="space-y-4">
                    <div className="bg-green-50 border border-green-200 rounded-md p-4 flex justify-between items-center">
                      <div>
                        <h3 className="font-medium text-green-800">Diagnostic terminé</h3>
                        <p className="text-sm text-green-700">
                          Votre évaluation pour {assessment.companyName} a été complétée avec succès.
                        </p>
                      </div>
                      <Button variant="outline" onClick={handleResetAssessment}>
                        Recommencer
                      </Button>
                    </div>
                    <div className="flex gap-3">
                      <Button onClick={() => setActiveTab("analysis-dashboard")}>
                        <BarChart3 className="mr-2 h-4 w-4" />
                        Voir le dashboard d'analyse
                      </Button>
                      <Button variant="secondary" onClick={handleDownloadReport}>
                        <Settings className="mr-2 h-4 w-4" />
                        Télécharger le rapport
                      </Button>
                    </div>
                  </div>
                ) : (
                  <CompanyAssessmentForm onComplete={handleAssessmentComplete} />
                )}
              </TabsContent>
              
              <TabsContent value="analysis-dashboard" id="analysis-dashboard" className="space-y-6">
                {assessment ? (
                  <AnalysisDashboard assessment={assessment} />
                ) : (
                  <div className="text-center py-8">
                    <h3 className="text-lg font-medium mb-2">Aucune analyse disponible</h3>
                    <p className="text-muted-foreground mb-4">
                      Vous devez d'abord compléter le diagnostic de votre entreprise.
                    </p>
                    <Button onClick={() => setActiveTab("company-assessment")}>
                      Démarrer le diagnostic
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
