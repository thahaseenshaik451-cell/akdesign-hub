import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface PortfolioItem {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  category: string | null;
  is_featured: boolean | null;
  display_order: number | null;
}

export const usePortfolio = (options?: { featuredOnly?: boolean; limit?: number }) => {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        setLoading(true);
        let query = supabase
          .from('portfolio')
          .select('*')
          .order('display_order', { ascending: true, nullsFirst: false });

        if (options?.featuredOnly) {
          query = query.eq('is_featured', true);
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
        setError(err instanceof Error ? err.message : 'Failed to fetch portfolio');
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [options?.featuredOnly, options?.limit]);

  return { items, loading, error };
};

