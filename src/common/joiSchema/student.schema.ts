import * as Joi from 'joi';

export const StudentCreateSchema = Joi.object({
  name: Joi.string().max(5).min(2).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
});
