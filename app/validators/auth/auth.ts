import vine from '@vinejs/vine'

export const authValidator = vine.create({
  email: vine.string().email().trim(),
  password: vine.string().minLength(3).maxLength(255).trim(),
})
