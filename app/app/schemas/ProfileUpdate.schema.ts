import { z } from 'zod'
export const ProfileUpdateSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().refine((val) => val.length > 8 || val === '', {
    message: 'Password must be further than 8 char',
  }),
})
