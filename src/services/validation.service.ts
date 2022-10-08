import Joi from 'joi';
//import {NextFunction, Response, Request} from "express";

class ValidateService {
    public validateSchema = (
        fullName: string,
        password: string,
        email: string,
        confirm_password: string,
        role?: string
    ) => {
        const schema = Joi.object({
            fullName: Joi.string().required(),
            password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
                .min(4)
                .required(),
            email: Joi.string()
                .email({
                    minDomainSegments: 2,
                    tlds: { allow: ['com', 'net'] },
                    allowFullyQualified: true,
                })
                .required(),
            confirm_password: Joi.ref('password'),
            role: Joi.string(),
        });

        return schema.validate(
            {
                email: email,
                fullName,
                password,
                confirm_password,
                role,
            },
            { abortEarly: false }
        );
    };

    public loginValidationSchema = (email: string, password: string) => {
        const loginSchema = Joi.object({
            email: Joi.string()
                .email({
                    allowFullyQualified: true,
                    minDomainSegments: 2,
                    tlds: { allow: ['com', 'net'] },
                })
                .required(),
            password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
                .min(4)
                .required(),
        });

        return loginSchema.validate({ email, password });
    };


}

export default ValidateService;
