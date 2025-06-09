-- Enable RLS if not already enabled
alter table public.pdfs enable row level security;

-- Policy for insert
create policy "Users can insert their own pdfs"
  on public.pdfs for insert
  with check (auth.uid() = user_id);

-- Policy for select
create policy "Users can view their own pdfs"
  on public.pdfs for select
  using (auth.uid() = user_id);
