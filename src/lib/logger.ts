export function sanitizeForLog(input: unknown): string {
  if (typeof input !== 'string') {
    input = String(input);
  }
  return (input as string)
    .replace(/\r?\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t');
}

export const logger = {
  error: (message: string, data?: unknown) => {
    console.error(sanitizeForLog(message), data ? sanitizeForLog(data) : '');
  },
  info: (message: string, data?: unknown) => {
    console.log(sanitizeForLog(message), data ? sanitizeForLog(data) : '');
  }
};