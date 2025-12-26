import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Service {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;
  features: string[] | null;
  is_active: boolean | null;
  display_order: number | null;
}

export const useServices = (options?: { activeOnly?: boolean; limit?: number }) => {
  const [items, setItems] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        let query = supabase
          .from('services')
          .select('*')
          .order('display_order', { ascending: true, nullsFirst: false });

        if (options?.activeOnly) {
          query = query.eq('is_active', true);
        }

        if (options?.limit) {
          query = query.limit(options.limit);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) {
          setError(fetchError.message);
        } else {
          setItems(data || []);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch services');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [options?.activeOnly, options?.limit]);

  return { items, loading, error };
};

