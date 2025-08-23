import { beforeEach, describe, it, expect, vi } from 'vitest';

// Make globals available
(global as any).beforeEach = beforeEach;
(global as any).describe = describe;
(global as any).it = it;
(global as any).expect = expect;
(global as any).vi = vi;