
import { supabase } from '@/integrations/supabase/client';

export const setupRealtimeUpdates = () => {
  // Configurer un canal de mise à jour en temps réel
  const channel = supabase
    .channel('countries_realtime')
    .on(
      'postgres_changes', 
      { 
        event: '*', 
        schema: 'public', 
        table: 'countries' 
      },
      (payload) => {
        console.log('Mise à jour en temps réel :', payload);
        // Vous pouvez ajouter une logique pour gérer différents types de changements
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};
