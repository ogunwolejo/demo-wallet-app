import Joi from 'joi';

class ValidateService {
  public validateSchema = (
    fullName: string,
    age: number,
    contact: string,
    email: string,
    password: string,
    bvn: string,
    tax_ref: string
  ) => {
    const schema = Joi.object({
      fullName: Joi.string().required(),
      age: Joi.number().required(),
      contact: Joi.string().required(),
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
      bvn: Joi.string().required(),
      tax_ref: Joi.string().required(),
    });

    return schema.validate(
      {
        email,
        fullName,
        age,
        contact,
        password,
        bvn,
        tax_ref,
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

    return loginSchema.validate({ email, password }, { abortEarly: false });
    };
    

    public withDrawFundsValidationSchema = (account_bank_code: string, account_number: string, amount: number, narration:string) => {
        const schema = Joi.object({
            account_bank_code: Joi.string().required(),
            account_number: Joi.string().required(),
            amount: Joi.number().required(),
            narration: Joi.string().required(),
        });

        return schema.validate({ account_bank_code, account_number, amount, narration }, { abortEarly: false });
    };


    public fundWalletValidationSchema = (wallet_number: string, amount: number, narration: string) => {
        const schema = Joi.object({
            wallet_number: Joi.string().required(),
            amount: Joi.number().required(),
            narration: Joi.string().required(),
        });

        return schema.validate({ wallet_number, amount, narration }, { abortEarly: false });
    };


    public walletToWalletValidationSchema = (merchant_id: string, amount: number, narration: string) => {
        const schema = Joi.object({
            merchant_id: Joi.string().required(),
            amount: Joi.number().required(),
            narration: Joi.string().required(),
        });

        return schema.validate({ merchant_id, amount, narration }, { abortEarly: false });
    };
}

export default ValidateService;
