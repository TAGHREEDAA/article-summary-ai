-- Create the vector extension if not exists
create extension if not exists vector;

-- Create the article_embeddings table
create table if not exists article_embeddings
(
    id uuid primary key default gen_random_uuid(),
    article_url text    not null,
    chunk_index integer not null,
    embedding vector(1536) not null,
    created_at  timestamp with time zone default timezone('utc', now())
);
