DROP POLICY IF EXISTS "read admin-published docs" ON public.my_documents;
DROP POLICY IF EXISTS "admin deletes docs" ON public.my_documents;
REVOKE SELECT ON public.my_documents FROM anon;
CREATE POLICY "owner reads own docs" ON public.my_documents
FOR SELECT TO authenticated USING (uploaded_by = auth.uid());
CREATE POLICY "admin owner deletes docs" ON public.my_documents
FOR DELETE TO authenticated USING (uploaded_by = auth.uid() AND public.has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "anyone reads my-documents" ON storage.objects;
DROP POLICY IF EXISTS "admin deletes my-documents" ON storage.objects;
CREATE POLICY "owner reads my-documents" ON storage.objects
FOR SELECT TO authenticated USING (bucket_id = 'my-documents' AND owner_id = (select auth.uid()::text));
CREATE POLICY "admin owner deletes my-documents" ON storage.objects
FOR DELETE TO authenticated USING (bucket_id = 'my-documents' AND owner_id = (select auth.uid()::text) AND public.has_role(auth.uid(), 'admin'::app_role));