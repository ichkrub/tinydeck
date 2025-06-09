-- Allow users to upload files
create policy "Users can upload PDFs"
  on storage.objects for insert
  with check (
    bucket_id = 'pdfs' AND
    auth.role() = 'authenticated'
  );

-- Allow users to read files
create policy "Users can read PDFs"
  on storage.objects for select
  using (
    bucket_id = 'pdfs' AND
    auth.role() = 'authenticated'
  );
