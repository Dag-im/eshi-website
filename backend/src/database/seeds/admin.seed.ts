import bcrypt from 'bcryptjs';
import { UserEntity } from '../../entities/user.entity';
import { config } from '../../lib/config';
import { getRepository } from '../../lib/repository';
import { Seed } from './types';

export class AdminSeed implements Seed {
  async run() {
    // SEED UPDATED: to match new entity schema
    const repo = getRepository(UserEntity);
    const email = config.SEED_ADMIN_EMAIL;
    const existing = await repo.findOne({ where: { email } });
    const passwordHash = await bcrypt.hash(config.SEED_ADMIN_PASSWORD, 12);

    if (existing) {
      existing.name = existing.name || 'Admin User';
      existing.passwordHash = passwordHash;
      existing.role = 'admin';
      existing.isActive = true;
      existing.mustChangePassword = false;
      existing.refreshTokenHash = null;
      await repo.save(existing);
      return;
    }

    await repo.save(
      repo.create({
        email,
        name: 'Admin User',
        passwordHash,
        role: 'admin',
        isActive: true,
        refreshTokenHash: null,
        mustChangePassword: false,
      })
    );
  }
}
