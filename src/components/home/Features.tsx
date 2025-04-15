
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Globe2, Building2, BarChart3 } from 'lucide-react'

interface FeaturesProps {
  onTabChange: (tab: string) => void;
  assessment: any | null;
}

export const Features = ({ onTabChange, assessment }: FeaturesProps) => {
  return (
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
                <Button variant="link" onClick={() => onTabChange("country-analysis")}>
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
                <Button variant="link" onClick={() => onTabChange("company-assessment")}>
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
                <Button variant="link" disabled={!assessment} onClick={() => assessment && onTabChange("analysis-dashboard")}>
                  Voir le dashboard
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
