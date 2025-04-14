import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Download, Share2, FileText, BarChart3, Clock, Database, Server, Code } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { 
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';
import { getCountryById } from '@/data/countriesData';
import { getSectorOpportunities } from '@/data/indicators';
import type { CompanyAssessment } from './CompanyAssessmentForm';
import type jsPDF from 'jspdf';
import type html2canvas from 'html2canvas';

interface AnalysisDashboardProps {
  assessment: CompanyAssessment;
}

const AnalysisDashboard: React.FC<AnalysisDashboardProps> = ({ assessment }) => {
  const country = getCountryById(assessment.countryId);
  const { toast } = useToast();
  
  if (!country) {
    return <div className="text-center py-8">Données pays manquantes</div>;
  }
  
  const sectorOpportunities = getSectorOpportunities(country.id);
  
  const getMaturityLevel = (score: number): string => {
    if (score >= 80) return "Avancé";
    if (score >= 60) return "Intermédiaire Supérieur";
    if (score >= 40) return "Intermédiaire";
    if (score >= 20) return "Basique";
    return "Embryonnaire";
  };
  
  const radarData = Object.entries(assessment.categoryScores).map(([key, value]) => ({
    subject: key,
    value: value,
    fullMark: 100,
  }));
  
  const phases = [
    {
      title: "Phase 1: Mise à niveau",
      timeframe: "0-6 mois",
      projects: [
        "Audit complet de l'infrastructure IT",
        "Migration vers des solutions cloud",
        "Formation des équipes aux outils digitaux de base",
        "Mise en place d'une stratégie de collecte de données"
      ],
      priority: assessment.readinessScore < 40 ? "Haute" : "Moyenne"
    },
    {
      title: "Phase 2: Premiers projets IA",
      timeframe: "6-18 mois",
      projects: [
        "Développement d'un tableau de bord analytique",
        "Automatisation des tâches répétitives",
        "Premiers modèles prédictifs simples",
        "Chatbot pour le service client"
      ],
      priority: assessment.readinessScore >= 40 && assessment.readinessScore < 70 ? "Haute" : "Moyenne"
    },
    {
      title: "Phase 3: IA avancée",
      timeframe: "18-36 mois",
      projects: [
        "Systèmes de vision par ordinateur",
        "Traitement du langage naturel avancé",
        "Jumeaux numériques pour les opérations",
        "Personnalisation client en temps réel"
      ],
      priority: assessment.readinessScore >= 70 ? "Haute" : "Basse"
    }
  ];
  
  const gapCategories = [
    {
      name: "Infrastructure",
      currentLevel: assessment.categoryScores["Infrastructure"] || 0,
      targetLevel: 80,
      gap: Math.max(0, 80 - (assessment.categoryScores["Infrastructure"] || 0))
    },
    {
      name: "Données",
      currentLevel: assessment.categoryScores["Données"] || 0,
      targetLevel: 75,
      gap: Math.max(0, 75 - (assessment.categoryScores["Données"] || 0))
    },
    {
      name: "Compétences",
      currentLevel: assessment.categoryScores["Compétences"] || 0,
      targetLevel: 70,
      gap: Math.max(0, 70 - (assessment.categoryScores["Compétences"] || 0))
    },
    {
      name: "Processus",
      currentLevel: assessment.categoryScores["Processus"] || 0,
      targetLevel: 85,
      gap: Math.max(0, 85 - (assessment.categoryScores["Processus"] || 0))
    },
    {
      name: "Stratégie",
      currentLevel: assessment.categoryScores["Stratégie"] || 0,
      targetLevel: 90,
      gap: Math.max(0, 90 - (assessment.categoryScores["Stratégie"] || 0))
    }
  ];
  
  const handleExportPDF = async () => {
    toast({
      title: "Export PDF en cours",
      description: "Préparation du PDF d'analyse...",
    });
    
    try {
      const { default: jsPDF } = await import('jspdf');
      const { default: html2canvas } = await import('html2canvas');
      
      const doc = new jsPDF('p', 'mm', 'a4');
      
      const dashboardElement = document.getElementById('analysis-dashboard-content');
      
      if (!dashboardElement) {
        throw new Error("Dashboard element not found");
      }
      
      doc.setFontSize(22);
      doc.text("Dashboard d'Analyse", 105, 20, { align: 'center' });
      
      doc.setFontSize(16);
      doc.text(`${assessment.companyName} - ${country.name} ${country.flag}`, 105, 30, { align: 'center' });
      
      doc.setFontSize(12);
      doc.text(`Généré le: ${new Date().toLocaleDateString()}`, 15, 40);
      doc.text(`Score de Maturité: ${assessment.readinessScore}/100 (${getMaturityLevel(assessment.readinessScore)})`, 15, 50);
      doc.text(`Secteur: ${assessment.sector}`, 15, 60);
      
      try {
        const radarElement = document.querySelector('.radar-chart-container');
        if (radarElement) {
          const radarCanvas = await html2canvas(radarElement as HTMLElement, {
            scale: 0.7,
            useCORS: true,
          });
          
          const radarImg = radarCanvas.toDataURL('image/png');
          doc.addImage(radarImg, 'PNG', 120, 70, 80, 80);
        }
        
        const gapElement = document.querySelector('.gap-chart-container');
        if (gapElement) {
          const gapCanvas = await html2canvas(gapElement as HTMLElement, {
            scale: 0.7,
            useCORS: true,
          });
          
          const gapImg = gapCanvas.toDataURL('image/png');
          doc.addImage(gapImg, 'PNG', 10, 70, 100, 80);
        }
        
        doc.text("Roadmap de Transformation Digitale", 15, 160);
        let yPos = 170;
        
        phases.forEach(phase => {
          doc.setFontSize(11);
          doc.text(`${phase.title} (${phase.timeframe}) - Priorité: ${phase.priority}`, 20, yPos);
          yPos += 8;
        });
        
        doc.addPage();
        
        doc.setFontSize(16);
        doc.text("Détail des Recommandations", 105, 20, { align: 'center' });
        
        doc.setFontSize(14);
        doc.text("Scores par Catégorie", 15, 40);
        
        doc.setFontSize(11);
        yPos = 50;
        Object.entries(assessment.categoryScores).forEach(([category, score]) => {
          doc.text(`${category}: ${score}/100`, 20, yPos);
          yPos += 8;
        });
        
        doc.setFontSize(14);
        doc.text("Recommandations Prioritaires", 15, yPos + 10);
        
        const recommendations = [
          "Stratégie Données: Développer une stratégie de collecte et gestion des données",
          "Tableau de Bord Analytique: Implémentation d'un tableau de bord d'analyse",
          "Infrastructure Cloud: Migration progressive vers une infrastructure cloud",
          "Formation et Recrutement: Développer un plan de formation pour les équipes"
        ];
        
        doc.setFontSize(11);
        yPos += 20;
        recommendations.forEach(rec => {
          doc.text(`- ${rec}`, 20, yPos);
          yPos += 8;
        });
      } catch (error) {
        console.error("Error capturing sections:", error);
      }
      
      doc.save(`analyse-${assessment.companyName.replace(/\s+/g, '-').toLowerCase()}.pdf`);
      
      toast({
        title: "Export réussi",
        description: "Le PDF d'analyse a été généré et téléchargé avec succès.",
      });
    } catch (error) {
      console.error("Error exporting PDF:", error);
      toast({
        title: "Erreur d'export",
        description: "Une erreur est survenue lors de la génération du PDF.",
        variant: "destructive",
      });
    }
  };
  
  const handleShare = () => {
    toast({
      title: "Partage",
      description: "Fonctionnalité de partage en cours de développement.",
    });
  };
  
  return (
    <div className="space-y-6" id="analysis-dashboard-content">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Rapport d'Analyse</h2>
          <p className="text-muted-foreground">
            {assessment.companyName} - {country.name} ({country.flag})
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handleExportPDF}>
            <Download className="mr-2 h-4 w-4" />
            Exporter PDF
          </Button>
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="mr-2 h-4 w-4" />
            Partager
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="stat-card">
          <div className="flex flex-col space-y-1.5">
            <p className="stat-label">Score de Maturité Digitale</p>
            <div className="flex items-center space-x-2">
              <span className="stat-value">{assessment.readinessScore}</span>
              <span>/100</span>
            </div>
            <Badge variant={
              assessment.readinessScore >= 70 ? "default" : 
              assessment.readinessScore >= 40 ? "secondary" : 
              "outline"
            }>
              {getMaturityLevel(assessment.readinessScore)}
            </Badge>
          </div>
        </Card>
        
        <Card className="stat-card">
          <div className="flex flex-col space-y-1.5">
            <p className="stat-label">Score Opportunité Pays</p>
            <div className="flex items-center space-x-2">
              <span className="stat-value">{country.opportunityScore}</span>
              <span>/100</span>
            </div>
            <Progress value={country.opportunityScore} className="h-2" />
          </div>
        </Card>
        
        <Card className="stat-card">
          <div className="flex flex-col space-y-1.5">
            <p className="stat-label">Secteur</p>
            <p className="stat-value text-xl">{assessment.sector}</p>
            <p className="text-sm text-muted-foreground">
              {assessment.size}
            </p>
          </div>
        </Card>
        
        <Card className="stat-card">
          <div className="flex flex-col space-y-1.5">
            <p className="stat-label">Compétences Digitales</p>
            <p className="stat-value text-xl">{assessment.skills.length}</p>
            <p className="text-sm text-muted-foreground">
              {assessment.skills.length > 0 
                ? `${assessment.skills.slice(0, 2).join(', ')}${assessment.skills.length > 2 ? '...' : ''}` 
                : 'Aucune compétence identifiée'}
            </p>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Analyse des Écarts</CardTitle>
            <CardDescription>Écart entre le niveau actuel et les objectifs stratégiques</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 gap-chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={gapCategories}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="currentLevel" name="Niveau Actuel" fill="#1e40af" />
                  <Bar dataKey="gap" name="Écart" fill="#d1d5db" stackId="a" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Radar de Maturité</CardTitle>
            <CardDescription>Analyse par catégorie</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 radar-chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart outerRadius={90} data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar name="Niveau actuel" dataKey="value" stroke="#1e40af" fill="#1e40af" fillOpacity={0.6} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Roadmap de Transformation Digitale Recommandée</CardTitle>
          <CardDescription>Plan d'implémentation en 3 phases</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {phases.map((phase, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium text-lg">{phase.title}</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-1 h-4 w-4" />
                      {phase.timeframe}
                    </div>
                  </div>
                  <Badge variant={
                    phase.priority === "Haute" ? "default" : 
                    phase.priority === "Moyenne" ? "secondary" : 
                    "outline"
                  }>
                    {phase.priority}
                  </Badge>
                </div>
                <ul className="space-y-2">
                  {phase.projects.map((project, projectIndex) => (
                    <li key={projectIndex} className="flex items-start">
                      <div className="mr-2 mt-0.5">
                        {index === 0 ? (
                          <Database className="h-4 w-4 text-primary" />
                        ) : index === 1 ? (
                          <Server className="h-4 w-4 text-primary" />
                        ) : (
                          <Code className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <span>{project}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Opportunités Sectorielles</CardTitle>
            <CardDescription>Secteurs à fort potentiel digital au {country.name}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sectorOpportunities.slice(0, 3).map((sector) => (
                <div key={sector.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{sector.name}</h3>
                    <Badge variant={
                      sector.overallScore >= 75 ? "default" : 
                      sector.overallScore >= 60 ? "secondary" : 
                      "outline"
                    }>
                      {sector.overallScore}/100
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{sector.description}</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span>Croissance:</span>
                      <span className="font-medium">{sector.growth}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Digital:</span>
                      <span className="font-medium">{sector.digitalReadiness}/100</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recommandations Prioritaires</CardTitle>
            <CardDescription>Actions immédiates à prendre</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <div className="bg-primary/10 rounded-full p-2 mt-1">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Stratégie Données</h3>
                  <p className="text-sm text-muted-foreground">
                    Développer une stratégie de collecte et gestion des données 
                    structurée pour alimenter vos futurs projets d'IA.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <div className="bg-primary/10 rounded-full p-2 mt-1">
                  <BarChart3 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Tableau de Bord Analytique</h3>
                  <p className="text-sm text-muted-foreground">
                    Implémentation d'un tableau de bord d'analyse pour suivre les KPIs 
                    critiques et faciliter la prise de décision.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <div className="bg-primary/10 rounded-full p-2 mt-1">
                  <Server className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Infrastructure Cloud</h3>
                  <p className="text-sm text-muted-foreground">
                    Migration progressive vers une infrastructure cloud adaptée au 
                    contexte local avec considération pour la latence et fiabilité.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <div className="bg-primary/10 rounded-full p-2 mt-1">
                  <Database className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Formation et Recrutement</h3>
                  <p className="text-sm text-muted-foreground">
                    Développer un plan de formation pour les équipes existantes et 
                    identifier les profils clés à recruter pour le digital.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalysisDashboard;
