DROP POLICY IF EXISTS "anyone reads docs" ON public.my_documents;
CREATE POLICY "read admin-published docs" ON public.my_documents
FOR SELECT TO anon, authenticated
USING (public.has_role(uploaded_by, 'admin'::app_role));