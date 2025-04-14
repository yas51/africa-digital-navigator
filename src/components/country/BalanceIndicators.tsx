
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDown } from 'lucide-react';
import type { CountryData } from '@/data/countriesData';

interface BalanceIndicatorsProps {
  country: CountryData;
}

const BalanceIndicators = ({ country }: BalanceIndicatorsProps) => {
  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <TrendingDown className="h-5 w-5 text-primary" /> Balances & Indicateurs
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Balance commerciale:</span>
            <span className={`font-medium ${(country.trade_balance || 0) > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {country.trade_balance ? (country.trade_balance > 0 ? '+' : '') + country.trade_balance.toFixed(2) : '?'} mds USD
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Volatilité Taux:</span>
            <span className="font-medium">{country.exchange_rate_volatility?.toFixed(2) || '?'}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Dernière analyse:</span>
            <span className="font-medium text-xs">
              {country.last_real_time_update 
                ? new Date(country.last_real_time_update).toLocaleString() 
                : 'Jamais'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BalanceIndicators;
