
import { profile } from 'console';
import { emit } from 'process';
import { z, ZodType, } from 'zod';

export class UserValidation {
    static readonly CREATE: ZodType = z.object({
        name: z.string().min(3).max(100).optional(),
        username: z.string().min(3).max(100),
        email: z.string().email(),
        password: z.string().min(6).max(100),
    });
    static readonly LOGIN: ZodType = z.object({
        password: z.string().optional(),
        username: z.string(),
    });

    static readonly UPDATE: ZodType = z.object({
        name: z.string().min(3).max(100).optional(),
        email: z.string().min(3).max(100).optional(),
        password: z.string().min(6).max(100).optional(),
        token: z.string().min(2).optional(),
        bio: z.string().min(3).max(100).optional(),
        profilePicture: z.string().optional(),
        backgroundPicture: z.string().optional(),
    })
}