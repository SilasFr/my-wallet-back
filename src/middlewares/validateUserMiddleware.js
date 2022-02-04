import joi from "joi";

const signupSchema = joi.object({
  name: joi.string().required().min(3).max(40),
  email: joi.string().required().email(),
  password: joi.string().required().min(3),
});

export default function validateUserScheema(req, res, next) {
  const validation = signupSchema.validate(user);
  if (validation.error) {
    res.status(401).send(validation.error.details[0]);
  }
  next();
}