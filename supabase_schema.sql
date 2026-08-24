-- ==========================================
-- SECTORS & INDUSTRIES MASTER TABLES
-- ==========================================

-- Sector lookup table (50 sectors from India Global Expo master file)
create table if not exists sectors (
  id text primary key,                -- e.g. "agriculture"
  sector_num integer not null,        -- 1–50
  name text not null,
  icon text,                          -- lucide-react icon name
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Industry lookup table (~1350 industries, linked to sectors)
create table if not exists industries (
  id text primary key,                -- e.g. "s1-rice-industry"
  sector_id text not null references sectors(id) on delete cascade,
  name text not null,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Indexes for fast lookups
create index if not exists industries_sector_id_idx on industries(sector_id);

-- ==========================================
-- USER PROFILES TABLE
-- ==========================================

-- Create a table for public profiles
create table if not exists profiles (
  id uuid references auth.users not null primary key,
  email text unique,
  name text,
  mobile text,
  plan text default 'free',
  sectors text[] default '{}',
  -- industries stored as JSON: { "agriculture": ["s1-rice-industry", ...], ... }
  -- free users: up to 5 sectors x 5 industries = max 25 industry selections
  industries jsonb default '{}',
  countries text[] default '{}',
  leaders text[] default '{}',
  onboarding_complete boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;

-- Create policies
create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- Trigger to handle updated_at
create or replace function handle_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger on_profiles_updated
  before update on profiles
  for each row execute procedure handle_updated_at();
