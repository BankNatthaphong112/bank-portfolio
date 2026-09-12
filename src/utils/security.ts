// Security helper for Owner Authentication with SHA-256
export const TARGET_PASSWORD_HASH =
  '4ac0c6b0aa088a9bca12931f02f2200d3fd7f889e2d1908f8750c59fb1b9e5ab';

const AUTH_STORAGE_KEY = 'bank_portfolio_owner_session';

/**
 * Computes the SHA-256 hash string for an input string using standard Web Crypto API
 */
export async function sha256(plainText: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(plainText);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Verifies if the entered password matches the SHA-256 hash of 'Bank@135792'
 */
export async function verifyOwnerPassword(password: string): Promise<boolean> {
  const inputHash = await sha256(password);
  return inputHash === TARGET_PASSWORD_HASH;
}

/**
 * Checks if owner is currently logged in for this browser session
 */
export function isOwnerAuthenticated(): boolean {
  try {
    return sessionStorage.getItem(AUTH_STORAGE_KEY) === 'authenticated';
  } catch {
    return false;
  }
}

/**
 * Updates owner authentication state
 */
export function setOwnerAuthenticated(status: boolean): void {
  try {
    if (status) {
      sessionStorage.setItem(AUTH_STORAGE_KEY, 'authenticated');
    } else {
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
    }
  } catch (err) {
    console.error('Session storage error:', err);
  }
}
