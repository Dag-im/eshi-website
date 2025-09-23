// src/services/team.service.ts
import { CustomError } from '../lib/jwt';
import { logger } from '../lib/logger';
import { TeamMemberModel } from '../models/team.model';
import * as uploadService from './upload.service';

export async function getTeamMembers() {
  return TeamMemberModel.find();
}

export async function getTeamMember(id: string) {
  const member = await TeamMemberModel.findById(id);
  if (!member) throw new CustomError('Team member not found.', 404);
  return member;
}

export async function createTeamMember(
  data: { name: string; title: string; bio: string },
  file: Express.Multer.File,
  userId: string
) {
  const upload = await uploadService.uploadImage(file);
  const member = new TeamMemberModel({
    ...data,
    imageUrl: upload.url,
    imagePublicId: upload.publicId,
  });
  await member.save();
  logger.info({ action: 'team_member_created', memberId: member._id, userId });
  return member;
}

export async function updateTeamMember(
  id: string,
  data: { name?: string; title?: string; bio?: string },
  userId: string,
  file?: Express.Multer.File
) {
  const member = await TeamMemberModel.findById(id);
  if (!member) throw new CustomError('Team member not found.', 404);
  if (file) {
    if (member.imagePublicId) await uploadService.deleteImage(member.imagePublicId);
    const upload = await uploadService.uploadImage(file);
    member.imageUrl = upload.url;
    member.imagePublicId = upload.publicId;
  }
  Object.assign(member, data);
  await member.save();
  logger.info({ action: 'team_member_updated', memberId: id, userId });
  return member;
}

export async function deleteTeamMember(id: string, userId: string) {
  const member = await TeamMemberModel.findById(id);
  if (!member) throw new CustomError('Team member not found.', 404);
  if (member.imagePublicId) await uploadService.deleteImage(member.imagePublicId);
  await member.deleteOne();
  logger.info({ action: 'team_member_deleted', memberId: id, userId });
}
