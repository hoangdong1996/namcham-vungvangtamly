CREATE TABLE public.public_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  storage_path text NOT NULL UNIQUE,
  mime_type text NOT NULL DEFAULT '',
  kind text NOT NULL DEFAULT 'other',
  size_bytes bigint NOT NULL DEFAULT 0,
  uploaded_by uuid NOT NULL DEFAULT auth.uid(),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.public_documents TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.public_documents TO authenticated;
GRANT ALL ON public.public_documents TO service_role;
ALTER TABLE public.public_documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public library readable" ON public.public_documents FOR SELECT TO anon, authenticated USING (public.has_role(uploaded_by, 'admin'::app_role));
CREATE POLICY "admin adds public docs" ON public.public_documents FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role) AND uploaded_by = auth.uid());
CREATE POLICY "admin edits public docs" ON public.public_documents FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "admin removes public docs" ON public.public_documents FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role));

INSERT INTO public.public_documents (name, storage_path, mime_type, kind, size_bytes, uploaded_by, created_at)
SELECT name, storage_path, mime_type, kind, size_bytes, uploaded_by, created_at FROM public.my_documents;

CREATE POLICY "public library files readable" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'public-library' AND EXISTS (SELECT 1 FROM public.public_documents d WHERE d.storage_path = name));
CREATE POLICY "admin manages public library files" ON storage.objects FOR ALL TO authenticated USING (bucket_id = 'public-library' AND public.has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (bucket_id = 'public-library' AND public.has_role(auth.uid(), 'admin'::app_role));

-- Private area: every signed-in user owns their files; admins read via server-checked role
DROP POLICY IF EXISTS "admin inserts docs" ON public.my_documents;
DROP POLICY IF EXISTS "admin owner deletes docs" ON public.my_documents;
CREATE POLICY "owner adds own docs" ON public.my_documents FOR INSERT TO authenticated WITH CHECK (uploaded_by = auth.uid());
CREATE POLICY "owner edits own docs" ON public.my_documents FOR UPDATE TO authenticated USING (uploaded_by = auth.uid()) WITH CHECK (uploaded_by = auth.uid());
CREATE POLICY "owner deletes own docs" ON public.my_documents FOR DELETE TO authenticated USING (uploaded_by = auth.uid());
CREATE POLICY "admin reads all private docs" ON public.my_documents FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "admin uploads my-documents" ON storage.objects;
DROP POLICY IF EXISTS "admin owner deletes my-documents" ON storage.objects;
CREATE POLICY "owner uploads my-documents" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'my-documents' AND (storage.foldername(name))[1] = (select auth.uid()::text));
CREATE POLICY "owner deletes my-documents" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'my-documents' AND owner_id = (select auth.uid()::text));
CREATE POLICY "admin reads my-documents" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'my-documents' AND public.has_role(auth.uid(), 'admin'::app_role));