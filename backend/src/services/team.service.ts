// src/services/team.service.ts
import { TeamMemberEntity } from '../entities/team-member.entity';
import { CustomError } from '../lib/jwt';
import { logger } from '../lib/logger';
import { getRepository } from '../lib/repository';
import * as uploadService from './upload.service';

export async function getTeamMembers() {
  return getRepository(TeamMemberEntity).find({ order: { createdAt: 'DESC' } });
}

export async function getTeamMember(id: string) {
  const member = await getRepository(TeamMemberEntity).findOne({ where: { id: Number(id) } });
  if (!member) throw new CustomError('Team member not found.', 404);
  return member;
}

export async function createTeamMember(
  data: { name: string; title: string; bio: string },
  file: Express.Multer.File,
  userId: string
) {
  const repo = getRepository(TeamMemberEntity);
  const member = repo.create({
    ...data,
    imageUrl: uploadService.buildUploadUrl(file.filename),
  });
  const savedMember = await repo.save(member);
  logger.info({ action: 'team_member_created', memberId: savedMember.id, userId });
  return savedMember;
}

export async function updateTeamMember(
  id: string,
  data: { name?: string; title?: string; bio?: string },
  userId: string,
  file?: Express.Multer.File
) {
  const repo = getRepository(TeamMemberEntity);
  const member = await repo.findOne({ where: { id: Number(id) } });
  if (!member) throw new CustomError('Team member not found.', 404);
  if (file) {
    await uploadService.deleteImage(member.imageUrl);
    member.imageUrl = uploadService.buildUploadUrl(file.filename);
  }
  Object.assign(member, data);
  const savedMember = await repo.save(member);
  logger.info({ action: 'team_member_updated', memberId: id, userId });
  return savedMember;
}

export async function deleteTeamMember(id: string, userId: string) {
  const repo = getRepository(TeamMemberEntity);
  const member = await repo.findOne({ where: { id: Number(id) } });
  if (!member) throw new CustomError('Team member not found.', 404);
  await uploadService.deleteImage(member.imageUrl);
  await repo.remove(member);
  logger.info({ action: 'team_member_deleted', memberId: id, userId });
}
