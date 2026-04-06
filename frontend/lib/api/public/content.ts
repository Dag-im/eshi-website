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
  const response = await fetch(`${baseUrl}${path}`, {
    next: { revalidate },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${path}: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function getHeroData() {
  return fetchPublic<HeroRecord>('/hero');
}

export async function getServicesData() {
  return fetchPublic<Service[]>('/services');
}

export async function getTeamData() {
  return fetchPublic<TeamMember[]>('/team');
}

export async function getPresentationsData() {
  return fetchPublic<Presentation[]>('/presentation');
}

export async function getImpactsData() {
  return fetchPublic<Impact[]>('/impact');
}
