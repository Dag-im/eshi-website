export const DEFAULT_TEMP_PASSWORD = 'Admin@123';

// Keep legacy variants so older provisioned users can still log in once and rotate password.
export const LEGACY_TEMP_PASSWORDS = ['ADMIN@123'];

export const ACCEPTED_TEMP_PASSWORDS = [DEFAULT_TEMP_PASSWORD, ...LEGACY_TEMP_PASSWORDS];
