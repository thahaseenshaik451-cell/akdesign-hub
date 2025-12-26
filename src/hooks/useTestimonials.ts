import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Testimonial {
  id: string;
  client_name: string;
  client_role: string | null;
  client_company: string | null;
  content: string;
  rating: number | null;
  is_featured: boolean | null;
  display_order: number | null;
}

export const useTestimonials = (options?: { featuredOnly?: boolean; limit?: number }) => {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        let query = supabase
          .from('testimonials')
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
        setError(err instanceof Error ? err.message : 'Failed to fetch testimonials');
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, [options?.featuredOnly, options?.limit]);

  return { items, loading, error };
};

