-- Create the storage bucket if it doesn't exist
-- First, check if bucket exists
do $$
begin
  if not exists (select from storage.buckets where id = 'pdfs') then
    -- Create the storage bucket if it doesn't exist
    insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
    values (
      'pdfs',
      'pdfs',
      false,
      26214400, -- 25MB in bytes
      array['application/pdf']
    );
  end if;
end $$;

-- Make sure the policies are applied
\i storage_policies.sql
