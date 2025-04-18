import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'

interface HeroProps {
  onTabChange: (tab: string) => void;
}

export const Hero = ({ onTabChange }: HeroProps) => {
  return (
    <section className="hero-gradient text-white py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">
              YOA AI LAB Investment Analyzer
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-[600px]">
              Plateforme d'analyse décisionnelle pour l'implantation et la transformation digitale.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90" 
                onClick={() => onTabChange("country-analysis")}
              >
                Explorer les pays
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-transparent border-white text-white hover:bg-white/10"
                onClick={() => onTabChange("company-assessment")}
              >
                Évaluer votre entreprise
              </Button>
            </div>
          </div>
          
          <div className="hidden md:flex justify-center">
            <img 
              src="https://e7.pngegg.com/pngimages/593/31/png-clipart-africa-map-africa-photography-orange.png" 
              alt="Carte de l'Afrique" 
              className="rounded-lg shadow-xl max-w-full max-h-[400px] object-cover border-4 border-white/20" 
            />
          </div>
        </div>
      </div>
    </section>
  )
}
