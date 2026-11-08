CREATE TABLE public.website_ratings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  rating smallint NOT NULL CHECK (rating BETWEEN 1 AND 5),
  session_id uuid NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.website_ratings TO service_role;
ALTER TABLE public.website_ratings ENABLE ROW LEVEL SECURITY;
-- No direct policies: all access goes through the functions below.

CREATE OR REPLACE FUNCTION public.submit_website_rating(_rating int, _session_id uuid)
RETURNS text LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF _rating IS NULL OR _rating < 1 OR _rating > 5 OR _session_id IS NULL THEN RETURN 'invalid'; END IF;
  INSERT INTO public.website_ratings (rating, session_id) VALUES (_rating, _session_id) ON CONFLICT (session_id) DO NOTHING;
  IF FOUND THEN RETURN 'saved'; END IF;
  RETURN 'duplicate';
END $$;

CREATE OR REPLACE FUNCTION public.website_rating_session_used(_session_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.website_ratings WHERE session_id = _session_id)
$$;

CREATE OR REPLACE FUNCTION public.website_rating_summary()
RETURNS TABLE (total bigint, average numeric) LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT count(*), round(avg(rating)::numeric, 1) FROM public.website_ratings
$$;

CREATE OR REPLACE FUNCTION public.website_rating_admin_stats(_since timestamptz DEFAULT NULL)
RETURNS TABLE (stars int, total bigint) LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin'::app_role) THEN RAISE EXCEPTION 'forbidden' USING ERRCODE = '42501'; END IF;
  RETURN QUERY SELECT s::int, count(r.id) FROM generate_series(1,5) s
    LEFT JOIN public.website_ratings r ON r.rating = s AND (_since IS NULL OR r.created_at >= _since)
    GROUP BY s ORDER BY s;
END $$;

REVOKE ALL ON FUNCTION public.submit_website_rating(int, uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.website_rating_session_used(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.website_rating_summary() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.website_rating_admin_stats(timestamptz) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.submit_website_rating(int, uuid) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.website_rating_session_used(uuid) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.website_rating_summary() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.website_rating_admin_stats(timestamptz) TO authenticated;