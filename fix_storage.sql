-- First delete all objects in the pdfs bucket
delete from storage.objects where bucket_id = 'pdfs';

-- Then recreate the bucket with proper settings
delete from storage.buckets where id = 'pdfs';

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'pdfs',
  'pdfs',
  true, -- Make it public so we can download files
  26214400, -- 25MB in bytes
  array['application/pdf']
);

-- Update the storage policies
drop policy if exists "Users can upload PDFs" on storage.objects;
drop policy if exists "Users can read PDFs" on storage.objects;
drop policy if exists "Users can delete their own PDFs" on storage.objects;

create policy "Users can upload PDFs"
  on storage.objects for insert
  with check (
    bucket_id = 'pdfs' AND
    auth.role() = 'authenticated'
  );

create policy "Users can read PDFs"
  on storage.objects for select
  using (
    bucket_id = 'pdfs' -- Allow public read access
  );

create policy "Users can delete their own PDFs"
  on storage.objects for delete
  using (
    bucket_id = 'pdfs' AND
    auth.role() = 'authenticated' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );
