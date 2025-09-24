"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  BoolAsString: () => BoolAsString,
  CheckboxAsString: () => CheckboxAsString,
  IntAsString: () => IntAsString,
  NumAsString: () => NumAsString,
  parseForm: () => parseForm,
  parseFormSafe: () => parseFormSafe,
  parseParams: () => parseParams,
  parseParamsSafe: () => parseParamsSafe,
  parseQuery: () => parseQuery,
  parseQuerySafe: () => parseQuerySafe,
  zx: () => zx
});
module.exports = __toCommonJS(src_exports);

// src/parsers.ts
var import_zod = require("zod");

// src/errors.ts
var import_react_router = require("react-router");
var DEFAULT_ERROR_MESSAGE = "Bad Request";
var DEFAULT_ERROR_STATUS = 400;
function createErrorResponse(options = {}) {
  const statusText = (options == null ? void 0 : options.message) || DEFAULT_ERROR_MESSAGE;
  const status = (options == null ? void 0 : options.status) || DEFAULT_ERROR_STATUS;
  return (0, import_react_router.data)(statusText, { status, statusText });
}

// src/parsers.ts
var isZodType = (input) => {
  return typeof input.parse === "function";
};
function parseParams(params, schema, options) {
  try {
    const finalSchema = isZodType(schema) ? schema : import_zod.z.object(schema);
    return finalSchema.parse(params);
  } catch (error) {
    throw createErrorResponse(options);
  }
}
function parseParamsSafe(params, schema) {
  const finalSchema = isZodType(schema) ? schema : import_zod.z.object(schema);
  return finalSchema.safeParse(params);
}
function parseQuery(request, schema, options) {
  try {
    const searchParams = isURLSearchParams(request) ? request : getSearchParamsFromRequest(request);
    const params = parseSearchParams(searchParams, options == null ? void 0 : options.parser);
    const finalSchema = isZodType(schema) ? schema : import_zod.z.object(schema);
    return finalSchema.parse(params);
  } catch (error) {
    throw createErrorResponse(options);
  }
}
function parseQuerySafe(request, schema, options) {
  const searchParams = isURLSearchParams(request) ? request : getSearchParamsFromRequest(request);
  const params = parseSearchParams(searchParams, options == null ? void 0 : options.parser);
  const finalSchema = isZodType(schema) ? schema : import_zod.z.object(schema);
  return finalSchema.safeParse(params);
}
async function parseForm(request, schema, options) {
  try {
    const formData = isFormData(request) ? request : await request.clone().formData();
    const data2 = await parseFormData(formData, options == null ? void 0 : options.parser);
    const finalSchema = isZodType(schema) ? schema : import_zod.z.object(schema);
    return await finalSchema.parseAsync(data2);
  } catch (error) {
    throw createErrorResponse(options);
  }
}
async function parseFormSafe(request, schema, options) {
  const formData = isFormData(request) ? request : await request.clone().formData();
  const data2 = await parseFormData(formData, options == null ? void 0 : options.parser);
  const finalSchema = isZodType(schema) ? schema : import_zod.z.object(schema);
  return finalSchema.safeParseAsync(data2);
}
function isObjectEntry([, value]) {
  return value instanceof Object;
}
function parseFormData(formData, customParser) {
  const objectEntries = [...formData.entries()].filter(isObjectEntry);
  objectEntries.forEach(([key, value]) => {
    formData.set(key, JSON.stringify(value));
  });
  return parseSearchParams(new URLSearchParams(formData), customParser);
}
function parseSearchParams(searchParams, customParser) {
  const parser = customParser || parseSearchParamsDefault;
  return parser(searchParams);
}
var parseSearchParamsDefault = (searchParams) => {
  const values = {};
  for (const [key, value] of searchParams) {
    const currentVal = values[key];
    if (currentVal && Array.isArray(currentVal)) {
      currentVal.push(value);
    } else if (currentVal) {
      values[key] = [currentVal, value];
    } else {
      values[key] = value;
    }
  }
  return values;
};
function getSearchParamsFromRequest(request) {
  const url = new URL(request.url);
  return url.searchParams;
}
function isFormData(value) {
  return getObjectTypeName(value) === "FormData";
}
function isURLSearchParams(value) {
  return getObjectTypeName(value) === "URLSearchParams";
}
function getObjectTypeName(value) {
  return toString.call(value).slice(8, -1);
}

// src/schemas.ts
var import_zod2 = require("zod");
var BoolAsString = import_zod2.z.string().regex(/^(true|false)$/, 'Must be a boolean string ("true" or "false")').transform((value) => value === "true");
var CheckboxAsString = import_zod2.z.literal("on").optional().transform((value) => value === "on");
var IntAsString = import_zod2.z.string().regex(/^-?\d+$/, "Must be an integer string").transform((val) => parseInt(val, 10));
var NumAsString = import_zod2.z.string().regex(/^-?\d*\.?\d+$/, "Must be a number string").transform(Number);

// src/index.ts
var zx = {
  parseParams,
  parseParamsSafe,
  parseQuery,
  parseQuerySafe,
  parseForm,
  parseFormSafe,
  BoolAsString,
  CheckboxAsString,
  IntAsString,
  NumAsString
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BoolAsString,
  CheckboxAsString,
  IntAsString,
  NumAsString,
  parseForm,
  parseFormSafe,
  parseParams,
  parseParamsSafe,
  parseQuery,
  parseQuerySafe,
  zx
});
