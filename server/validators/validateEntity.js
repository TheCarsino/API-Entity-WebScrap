import { body, validationResult } from "express-validator";

export const validateHighRiskList = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Name cannot be empty"),

  body("offshoreLeaks")
    .isBoolean()
    .withMessage("offshoreLeaks value must be a boolean.")
    .optional()
    .default(false),

  body("worldBank")
    .isBoolean()
    .withMessage("worldBank value must be a boolean.")
    .optional()
    .default(false),

  body("OFACSanctions")
    .isBoolean()
    .withMessage("OFACSanctions value must be a boolean.")
    .optional()
    .default(false),

  //Valid parameters for body
  (req, res, next) => {
    const allowedFields = [
      "name",
      "offshoreLeaks",
      "worldBank",
      "OFACSanctions",
    ];
    const extraFields = Object.keys(req.body).filter(
      (key) => !allowedFields.includes(key)
    );

    if (extraFields.length > 0) {
      return res.status(400).json({
        status: "Invalid Request",
        errors: extraFields.map((field) => ({
          field: field,
          message: `${field} is not a valid parameter for the API.`,
        })),
      });
    }

    next();
  },

  //Valid values for body
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "Invalid Request",
        errors: errors.array().map((error) => ({
          field: error.param,
          message: error.msg,
        })),
      });
    }
    next();
  },
];
