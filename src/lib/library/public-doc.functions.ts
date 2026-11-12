import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// Issues a short-lived signed URL for a published library document.
// Storage has no anon read policy; the server verifies the document is published first.
export const getPublicDocUrl = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: doc } = await supabaseAdmin
      .from("public_documents").select("storage_path, uploaded_by").eq("id", data.id).maybeSingle();
    if (!doc) return { url: null };
    const { data: role } = await supabaseAdmin
      .from("user_roles").select("user_id").eq("user_id", doc.uploaded_by).eq("role", "admin").maybeSingle();
    if (!role) return { url: null };
    const { data: s } = await supabaseAdmin.storage.from("public-library").createSignedUrl(doc.storage_path, 300);
    return { url: s?.signedUrl ?? null };
  });
