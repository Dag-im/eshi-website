import { HeroRecord } from '@/types/hero';
import { Impact } from '@/types/impact';
import { Presentation } from '@/types/presentaion';
import { Service } from '@/types/service';
import { TeamMember } from '@/types/team';

const PUBLIC_REVALIDATE_SECONDS = 300;

function getApiBaseUrl() {
  const fromEnv =
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.API_URL ||
    'http://localhost:4000/api';
  return fromEnv.replace(/\/$/, '');
}

async function fetchPublic<T>(path: string, revalidate = PUBLIC_REVALIDATE_SECONDS): Promise<T> {
  const baseUrl = getApiBaseUrl();
  const response = await fetch(`${baseUrl}${path}`, revalidate <= 0 ? { cache: 'no-store' } : { next: { revalidate } });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${path}: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function getHeroData() {
  // Hero edits should appear immediately after admin updates/deletes images.
  // If upstream is temporarily unavailable/rate-limited, fall back gracefully.
  try {
    return await fetchPublic<HeroRecord>('/hero', 0);
  } catch {
    return null;
  }
}

export async function getServicesData() {
  try {
    return await fetchPublic<Service[]>('/services');
  } catch {
    return [];
  }
}

export async function getTeamData() {
  try {
    return await fetchPublic<TeamMember[]>('/team');
  } catch {
    return [];
  }
}

export async function getPresentationsData() {
  try {
    return await fetchPublic<Presentation[]>('/presentation');
  } catch {
    return [];
  }
}

export async function getImpactsData() {
  try {
    return await fetchPublic<Impact[]>('/impact');
  } catch {
    return [];
  }
}
