create table public.pdfs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  filename text not null,
  storage_path text not null,
  original_size bigint not null,
  compressed_size bigint not null,
  url text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up RLS
alter table public.pdfs enable row level security;

-- Policy for insert
create policy "Users can insert their own pdfs"
  on public.pdfs for insert
  with check (auth.uid() = user_id);

-- Policy for select
create policy "Users can view their own pdfs"
  on public.pdfs for select
  using (auth.uid() = user_id);

