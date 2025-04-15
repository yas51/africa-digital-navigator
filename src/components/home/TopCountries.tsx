
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from 'lucide-react'
import { Skeleton } from "@/components/ui/skeleton"
import { useQuery } from '@tanstack/react-query'
import { fetchTopCountriesByScore } from '@/lib/supabase'

interface TopCountriesProps {
  setSelectedCountry: (id: string) => void;
  setActiveTab: (tab: string) => void;
}

export const TopCountries = ({ setSelectedCountry, setActiveTab }: TopCountriesProps) => {
  const { data: topCountries = [], isLoading: isLoadingTopCountries } = useQuery({
    queryKey: ['topCountries'],
    queryFn: () => fetchTopCountriesByScore(5)
  });

  return (
    <section className="py-12">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Top 5 des pays africains pour l'investissement digital</h2>
          <p className="text-muted-foreground mt-2">
            Classement basé sur les infrastructures numériques, la stabilité politique et les opportunités économiques
            <span className="ml-2 text-sm text-green-500 font-medium inline-flex items-center">
              <span className="relative flex h-2 w-2 mr-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Données en temps réel
            </span>
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoadingTopCountries ? (
            Array(5).fill(null).map((_, index) => (
              <Card key={index} className={`card-hover ${index === 0 ? 'md:col-span-2 lg:col-span-1' : ''}`}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <div>
                        <Skeleton className="h-5 w-24" />
                        <Skeleton className="h-4 w-32 mt-1" />
                      </div>
                    </div>
                    <Skeleton className="h-6 w-8 rounded-full" />
                  </div>
                  
                  <div className="space-y-2">
                    {Array(3).fill(null).map((_, j) => (
                      <div key={j} className="flex justify-between">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-12" />
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4">
                    <Skeleton className="h-8 w-32" />
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            topCountries.map((country, index) => (
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
            ))
          )}
        </div>
      </div>
    </section>
  )
}
