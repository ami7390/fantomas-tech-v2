create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null default '',
  phone text not null default '',
  subject text not null,
  message text not null,
  status text not null default 'new' check (status in ('new','read','replied','archived')),
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

create policy "Public can send contact messages"
on public.contact_messages for insert to anon, authenticated
with check (char_length(name) > 1 and char_length(message) > 4);

create policy "Admins can view contact messages"
on public.contact_messages for select to authenticated
using (exists (select 1 from public.admin_users where user_id = auth.uid()));

create policy "Admins can update contact messages"
on public.contact_messages for update to authenticated
using (exists (select 1 from public.admin_users where user_id = auth.uid()))
with check (exists (select 1 from public.admin_users where user_id = auth.uid()));

create policy "Admins can delete contact messages"
on public.contact_messages for delete to authenticated
using (exists (select 1 from public.admin_users where user_id = auth.uid()));

grant insert on public.contact_messages to anon, authenticated;
grant select, update, delete on public.contact_messages to authenticated;
