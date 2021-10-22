class BaseModel {

    constructor(_id) {
        this._id = _id;
    }

    static customErrors(errors) {
        for (const err of errors) {
            switch (err.code) {
                case "any.required":
                case "string.empty": err.message = `Missing "${err.local.label}".`;
                    break;
                case "string.base": err.message = `"${err.local.label}" must be a string.`;
                    break;
                case "string.min": err.message = `"${err.local.label}" must be minimum ${err.local.limit} char${err.local.limit > 1 ? "s" : ""}.`;
                    break;
                case "string.max": err.message = `"${err.local.label}" can't exceed ${err.local.limit} chars.`;
                    break;
                case "string.pattern.base": err.message = `"${err.local.label}" don't match the pattern ${err.local.regex}.`;
                    break;
                case "number.base": err.message = `"${err.local.label}" must be a number.`;
                    break;
                case "number.integer": err.message = `"${err.local.label}" must be an integer.`;
                    break;
                case "number.positive": err.message = `"${err.local.label}" must be positive.`;
                    break;
                case "number.min": err.message = `"${err.local.label}" must be minimum ${err.local.limit}.`;
                    break;
                case "number.max": err.message = `"${err.local.label}" can't exceed ${err.local.limit}.`;
                    break;
                case "date.base": err.message = `"${err.local.label}" must be a valid date.`;
                    break;
                case "any.unknown": err.message = `"${err.local.label}" is forbidden.`;
                    break;
                case "custom.spaces": err.message = `"${err.local.label}" can't contain multiple spaces.`;
                    break;
            }
        }
        return errors;
    }
	
    static multipleSpacesValidation(value, helpers) {
        return value.indexOf("  ") === -1 ? value : helpers.error("custom.spaces");
    }
}

module.exports = BaseModel;