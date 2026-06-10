import { HeroRecord } from '@/types/hero';
import { HeroContentRecord } from '@/types/hero-content';
import { Impact } from '@/types/impact';
import { AboutRecord } from '@/types/about';
import { Approach } from '@/types/approach';
import { MethodologyPhase } from '@/types/methodology-phase';
import { MissionStoryRecord } from '@/types/mission-story';
import { Presentation } from '@/types/presentaion';
import { ServiceCard } from '@/types/service-card';
import { Service } from '@/types/service';
import { TeamMember } from '@/types/team';
import { WhyChooseReason } from '@/types/why-choose-reason';
import { BeliefRecord } from '@/types/belief';

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

export async function getHeroContentData() {
  try {
    return await fetchPublic<HeroContentRecord[]>('/hero-content', 0);
  } catch {
    return [];
  }
}

export async function getAboutData() {
  try {
    return await fetchPublic<AboutRecord[]>('/about');
  } catch {
    return [];
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

export async function getApproachesData() {
  try {
    return await fetchPublic<Approach[]>('/approaches');
  } catch {
    return [];
  }
}

export async function getMissionStoriesData() {
  try {
    return await fetchPublic<MissionStoryRecord[]>('/mission-story');
  } catch {
    return [];
  }
}

export async function getBeliefsData() {
  try {
    return await fetchPublic<BeliefRecord[]>('/beliefs');
  } catch {
    return [];
  }
}

export async function getMethodologyPhasesData() {
  try {
    return await fetchPublic<MethodologyPhase[]>('/methodology-phases');
  } catch {
    return [];
  }
}

export async function getServiceCardsData() {
  try {
    return await fetchPublic<ServiceCard[]>('/service-cards');
  } catch {
    return [];
  }
}

export async function getWhyChooseReasonsData() {
  try {
    return await fetchPublic<WhyChooseReason[]>('/why-choose-reasons');
  } catch {
    return [];
  }
}
