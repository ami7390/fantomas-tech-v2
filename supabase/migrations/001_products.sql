create extension if not exists pgcrypto;

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  category text not null default 'Autres',
  price integer not null default 0 check (price >= 0),
  image_url text not null default '',
  availability text not null default 'Disponible',
  description text not null default '',
  featured boolean not null default false,
  active boolean not null default true,
  sort_order integer not null default 100,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.products enable row level security;
alter table public.admin_users enable row level security;

create policy "Public can read active products" on public.products for select to anon, authenticated using (active = true or exists(select 1 from public.admin_users a where a.user_id = auth.uid()));
create policy "Admins can insert products" on public.products for insert to authenticated with check (exists(select 1 from public.admin_users a where a.user_id = auth.uid()));
create policy "Admins can update products" on public.products for update to authenticated using (exists(select 1 from public.admin_users a where a.user_id = auth.uid())) with check (exists(select 1 from public.admin_users a where a.user_id = auth.uid()));
create policy "Admins can delete products" on public.products for delete to authenticated using (exists(select 1 from public.admin_users a where a.user_id = auth.uid()));
create policy "Admin can read own authorization" on public.admin_users for select to authenticated using (user_id = auth.uid());

grant select on public.products to anon, authenticated;
grant insert, update, delete on public.products to authenticated;
grant select on public.admin_users to authenticated;

create or replace function public.set_updated_at() returns trigger language plpgsql as $$ begin new.updated_at=now();return new;end $$;
drop trigger if exists products_updated_at on public.products;
create trigger products_updated_at before update on public.products for each row execute function public.set_updated_at();

insert into storage.buckets(id,name,public) values('product-images','product-images',true) on conflict(id) do update set public=true;
create policy "Public product images" on storage.objects for select to public using (bucket_id='product-images');
create policy "Admins upload product images" on storage.objects for insert to authenticated with check (bucket_id='product-images' and exists(select 1 from public.admin_users a where a.user_id=auth.uid()));
create policy "Admins update product images" on storage.objects for update to authenticated using (bucket_id='product-images' and exists(select 1 from public.admin_users a where a.user_id=auth.uid()));
create policy "Admins delete product images" on storage.objects for delete to authenticated using (bucket_id='product-images' and exists(select 1 from public.admin_users a where a.user_id=auth.uid()));

-- Après avoir créé votre utilisateur dans Authentication > Users,
-- remplacez l'adresse ci-dessous puis exécutez uniquement cette ligne :
-- insert into public.admin_users(user_id) select id from auth.users where email='votre@email.com';
