
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Building2, BarChart3, Globe2, Settings } from 'lucide-react'
import CountrySelector from '@/components/CountrySelector'
import MacroeconomicDashboard from '@/components/MacroeconomicDashboard'
import CompanyAssessmentForm from '@/components/CompanyAssessmentForm'
import AnalysisDashboard from '@/components/AnalysisDashboard'
import type { CompanyAssessment } from '@/components/CompanyAssessmentForm'

interface MainContentProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedCountry: string;
  handleCountrySelect: (countryId: string) => void;
  assessment: CompanyAssessment | null;
  handleAssessmentComplete: (data: CompanyAssessment) => void;
  handleResetAssessment: () => void;
  handleDownloadReport: () => void;
}

export const MainContent = ({
  activeTab,
  setActiveTab,
  selectedCountry,
  handleCountrySelect,
  assessment,
  handleAssessmentComplete,
  handleResetAssessment,
  handleDownloadReport
}: MainContentProps) => {
  return (
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
              <h2 className="text-2xl font-bold">Bienvenue sur YOA for Digital & AI Analyzer - SAAS</h2>
              <p className="text-muted-foreground">
                Choisissez un module pour commencer votre analyse stratégique pour l'implantation 
                et la transformation digitale en Afrique.
              </p>
              
              <div className="flex justify-center gap-4 pt-4">
                <Button onClick={() => setActiveTab("country-analysis")}>
                  <Globe2 className="mr-2 h-4 w-4" />
                  Analyse Pays
                </Button>
                <Button onClick={() => setActiveTab("company-assessment")}>
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
  )
}
