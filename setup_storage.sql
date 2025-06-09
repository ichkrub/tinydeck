-- Drop existing bucket policies if they exist
drop policy if exists "Users can upload PDFs" on storage.objects;
drop policy if exists "Users can read PDFs" on storage.objects;

-- Create the storage bucket if it doesn't exist
insert into storage.buckets (id, name, public)
values ('pdfs', 'pdfs', false)
on conflict (id) do nothing;

-- Create storage policies for authenticated users
create policy "Users can upload PDFs"
  on storage.objects for insert
  with check (
    bucket_id = 'pdfs' AND
    auth.role() = 'authenticated'
  );

create policy "Users can read PDFs"
  on storage.objects for select
  using (
    bucket_id = 'pdfs' AND
    auth.role() = 'authenticated'
  );

-- Allow authenticated users to delete their own files
create policy "Users can delete their own PDFs"
  on storage.objects for delete
  using (
    bucket_id = 'pdfs' AND
    auth.role() = 'authenticated' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );
