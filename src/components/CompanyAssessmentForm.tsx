
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { digitalReadinessQuestions, calculateDigitalReadinessScore, calculateCategoryScores } from '@/data/indicators';
import { countriesData } from '@/data/countriesData';

export interface CompanyAssessment {
  companyName: string;
  sector: string;
  size: string;
  countryId: string;
  technologies: string[];
  digitalLevel: string;
  skills: string[];
  objectives: string[];
  infrastructure: Record<string, boolean>;
  challenges: string[];
  additionalInfo: string;
  answers: Record<string, number>;
  readinessScore: number;
  categoryScores: Record<string, number>;
}

interface CompanyAssessmentFormProps {
  onComplete: (assessment: CompanyAssessment) => void;
}

const defaultAssessment: CompanyAssessment = {
  companyName: "",
  sector: "",
  size: "",
  countryId: "",
  technologies: [],
  digitalLevel: "",
  skills: [],
  objectives: [],
  infrastructure: {
    internet: false,
    servers: false,
    database: false
  },
  challenges: [],
  additionalInfo: "",
  answers: {},
  readinessScore: 0,
  categoryScores: {}
};

const sectors = [
  "Agriculture",
  "Banque & Finance",
  "Education",
  "Énergie",
  "Santé",
  "Industrie",
  "Logistique & Transport",
  "Mines & Ressources",
  "Services Professionnels",
  "Commerce de détail",
  "Télécommunications",
  "Tourisme & Hôtellerie",
  "Autre"
];

const companySizes = [
  "Très petite (1-10 employés)",
  "Petite (11-50 employés)",
  "Moyenne (51-250 employés)",
  "Grande (251-1000 employés)",
  "Très grande (1000+ employés)"
];

const availableTechnologies = [
  "ERP (SAP, Odoo...)",
  "CRM (Hubspot, Salesforce...)",
  "Cloud (AWS, Azure, GCP)",
  "Bases de données structurées",
  "Outils d'analytique",
  "IA / Machine Learning",
  "IoT / Capteurs",
  "Applications mobiles",
  "E-commerce"
];

const digitalSkills = [
  "Data Science",
  "Développement logiciel",
  "DevOps",
  "Cloud computing",
  "Cybersécurité",
  "IA / Machine Learning",
  "UX / Design digital",
  "Marketing digital"
];

const digitalObjectives = [
  "Automatiser des processus",
  "Améliorer l'expérience client",
  "Optimiser la chaîne logistique",
  "Développer de nouveaux produits/services",
  "Réduire les coûts opérationnels",
  "Améliorer la prise de décision",
  "Accéder à de nouveaux marchés",
  "Gérer les risques et la conformité"
];

const businessChallenges = [
  "Données manquantes ou non exploitables",
  "Manque d'outils d'analyse",
  "Pas de stratégie IA / digitalisation",
  "Difficulté à recruter les bons profils",
  "Manque de budget",
  "Résistance au changement",
  "Problèmes de cybersécurité",
  "Intégration avec les systèmes existants"
];

const CompanyAssessmentForm: React.FC<CompanyAssessmentFormProps> = ({ onComplete }) => {
  const [assessment, setAssessment] = useState<CompanyAssessment>(defaultAssessment);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const handleTextChange = (field: keyof CompanyAssessment, value: string) => {
    setAssessment(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayToggle = (field: keyof CompanyAssessment, value: string) => {
    setAssessment(prev => {
      const currentArray = [...(prev[field] as string[])];
      const exists = currentArray.includes(value);
      
      if (exists) {
        return { ...prev, [field]: currentArray.filter(item => item !== value) };
      } else {
        return { ...prev, [field]: [...currentArray, value] };
      }
    });
  };

  const handleInfrastructureToggle = (key: string, checked: boolean) => {
    setAssessment(prev => ({
      ...prev,
      infrastructure: {
        ...prev.infrastructure,
        [key]: checked
      }
    }));
  };

  const handleAnswer = (questionId: string, value: number) => {
    setAssessment(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: value
      }
    }));
  };

  const handleSubmit = () => {
    const readinessScore = calculateDigitalReadinessScore(assessment.answers);
    const categoryScores = calculateCategoryScores(assessment.answers);
    
    const finalAssessment = {
      ...assessment,
      readinessScore,
      categoryScores
    };
    
    onComplete(finalAssessment);
  };

  const goToNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Informations Générales</CardTitle>
              <CardDescription>Parlez-nous de votre entreprise</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Nom de votre entreprise</Label>
                <Input 
                  id="companyName" 
                  value={assessment.companyName} 
                  onChange={e => handleTextChange('companyName', e.target.value)} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sector">Secteur d'activité</Label>
                <Select 
                  value={assessment.sector} 
                  onValueChange={value => handleTextChange('sector', value)}
                >
                  <SelectTrigger id="sector">
                    <SelectValue placeholder="Sélectionnez votre secteur" />
                  </SelectTrigger>
                  <SelectContent>
                    {sectors.map(sector => (
                      <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="size">Taille de l'entreprise</Label>
                <Select 
                  value={assessment.size} 
                  onValueChange={value => handleTextChange('size', value)}
                >
                  <SelectTrigger id="size">
                    <SelectValue placeholder="Sélectionnez la taille de votre entreprise" />
                  </SelectTrigger>
                  <SelectContent>
                    {companySizes.map(size => (
                      <SelectItem key={size} value={size}>{size}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="country">Pays ciblé pour installation ou expansion</Label>
                <Select 
                  value={assessment.countryId} 
                  onValueChange={value => handleTextChange('countryId', value)}
                >
                  <SelectTrigger id="country">
                    <SelectValue placeholder="Sélectionnez un pays" />
                  </SelectTrigger>
                  <SelectContent>
                    {countriesData.map(country => (
                      <SelectItem key={country.id} value={country.id}>
                        {country.flag} {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        );
        
      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Situation Technologique Actuelle</CardTitle>
              <CardDescription>Évaluez vos ressources et capacités technologiques</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Quelles technologies utilisez-vous déjà ?</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {availableTechnologies.map(tech => (
                    <div key={tech} className="flex items-center space-x-2">
                      <Checkbox 
                        id={tech} 
                        checked={assessment.technologies.includes(tech)}
                        onCheckedChange={() => handleArrayToggle('technologies', tech)} 
                      />
                      <label 
                        htmlFor={tech}
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {tech}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="digitalLevel">Niveau d'informatisation actuel</Label>
                <RadioGroup 
                  value={assessment.digitalLevel} 
                  onValueChange={value => handleTextChange('digitalLevel', value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Aucun" id="none" />
                    <Label htmlFor="none">Aucun</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Basique" id="basic" />
                    <Label htmlFor="basic">Basique</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Moyen" id="medium" />
                    <Label htmlFor="medium">Moyen</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Élevé" id="high" />
                    <Label htmlFor="high">Élevé</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Avancé" id="advanced" />
                    <Label htmlFor="advanced">Avancé</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label>Votre équipe a-t-elle des compétences internes en :</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {digitalSkills.map(skill => (
                    <div key={skill} className="flex items-center space-x-2">
                      <Checkbox 
                        id={skill} 
                        checked={assessment.skills.includes(skill)}
                        onCheckedChange={() => handleArrayToggle('skills', skill)} 
                      />
                      <label 
                        htmlFor={skill}
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {skill}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Infrastructure disponible :</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="internet" 
                      checked={assessment.infrastructure.internet}
                      onCheckedChange={(checked) => 
                        handleInfrastructureToggle('internet', checked as boolean)
                      } 
                    />
                    <label htmlFor="internet">Réseau internet stable</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="servers" 
                      checked={assessment.infrastructure.servers}
                      onCheckedChange={(checked) => 
                        handleInfrastructureToggle('servers', checked as boolean)
                      } 
                    />
                    <label htmlFor="servers">Serveurs internes ou cloud</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="database" 
                      checked={assessment.infrastructure.database}
                      onCheckedChange={(checked) => 
                        handleInfrastructureToggle('database', checked as boolean)
                      } 
                    />
                    <label htmlFor="database">Base de données structurée</label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
        
      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Objectifs et Défis</CardTitle>
              <CardDescription>Précisez vos objectifs de digitalisation et vos défis actuels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Objectifs principaux de digitalisation :</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {digitalObjectives.map(objective => (
                    <div key={objective} className="flex items-center space-x-2">
                      <Checkbox 
                        id={objective} 
                        checked={assessment.objectives.includes(objective)}
                        onCheckedChange={() => handleArrayToggle('objectives', objective)} 
                      />
                      <label 
                        htmlFor={objective}
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {objective}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Problèmes rencontrés aujourd'hui :</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {businessChallenges.map(challenge => (
                    <div key={challenge} className="flex items-center space-x-2">
                      <Checkbox 
                        id={challenge} 
                        checked={assessment.challenges.includes(challenge)}
                        onCheckedChange={() => handleArrayToggle('challenges', challenge)} 
                      />
                      <label 
                        htmlFor={challenge}
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {challenge}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="additionalInfo">Informations complémentaires</Label>
                <Textarea 
                  id="additionalInfo" 
                  placeholder="Précisez tout besoin ou contexte spécifique..." 
                  value={assessment.additionalInfo}
                  onChange={e => handleTextChange('additionalInfo', e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>
        );
        
      case 4:
        // Divide questions by category
        const questionsByCategory: Record<string, typeof digitalReadinessQuestions> = {};
        digitalReadinessQuestions.forEach(q => {
          if (!questionsByCategory[q.category]) {
            questionsByCategory[q.category] = [];
          }
          questionsByCategory[q.category].push(q);
        });
        
        return (
          <Card>
            <CardHeader>
              <CardTitle>Évaluation Détaillée de Maturité Digitale</CardTitle>
              <CardDescription>Répondez à ces questions pour une analyse précise de votre maturité digitale</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(questionsByCategory).map(([category, questions]) => (
                <div key={category} className="space-y-4">
                  <h3 className="font-medium text-lg">{category}</h3>
                  <div className="space-y-6">
                    {questions.map(question => (
                      <div key={question.id} className="space-y-3">
                        <Label>{question.question}</Label>
                        <RadioGroup 
                          value={assessment.answers[question.id]?.toString() || ""} 
                          onValueChange={value => handleAnswer(question.id, parseInt(value))}
                        >
                          {question.options.map(option => (
                            <div key={option.value} className="flex items-center space-x-2">
                              <RadioGroupItem 
                                value={option.value.toString()} 
                                id={`${question.id}-${option.value}`} 
                              />
                              <Label htmlFor={`${question.id}-${option.value}`}>
                                {option.label}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">Diagnostic de votre entreprise</h2>
          <p className="text-muted-foreground">
            Étape {currentStep} sur {totalSteps}
          </p>
        </div>
        <div className="hidden sm:flex items-center space-x-1.5">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div 
              key={i} 
              className={`h-2 w-16 rounded-full ${
                i + 1 === currentStep 
                  ? 'bg-primary' 
                  : i + 1 < currentStep 
                    ? 'bg-primary/60' 
                    : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>
      
      {renderStep()}
      
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={goToPreviousStep}
          disabled={currentStep === 1}
        >
          Précédent
        </Button>
        <Button 
          onClick={goToNextStep}
        >
          {currentStep === totalSteps ? "Terminer l'évaluation" : "Suivant"}
        </Button>
      </div>
    </div>
  );
};

export default CompanyAssessmentForm;
