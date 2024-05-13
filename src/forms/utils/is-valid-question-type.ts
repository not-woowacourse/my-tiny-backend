import { QuestionTypeEnum } from '@/schemas/enums/quesion-type.enum';

export const isValidQuestionType = (
  type: QuestionTypeEnum,
  value: any,
): boolean => {
  switch (type) {
    case QuestionTypeEnum.Text:
      return isValidText(value);
    case QuestionTypeEnum.Integer:
      return isValidInteger(value);
    case QuestionTypeEnum.Double:
      return isValidDouble(value);
    case QuestionTypeEnum.Boolean:
      return isValidBoolean(value);
    case QuestionTypeEnum.Email:
      return isValidEmail(value);
    case QuestionTypeEnum.Telephone:
      return isValidTelephone(value);
    case QuestionTypeEnum.Url:
      return isValidUrl(value);
    case QuestionTypeEnum.Color:
      return isValidColor(value);
    case QuestionTypeEnum.Date:
      return isValidDate(value);
    case QuestionTypeEnum.Datetime:
      return isValidDatetime(value);
    case QuestionTypeEnum.Json:
      return isValidJson(value);
    default:
      throw new Error('지원하지 않는 질문 타입입니다.');
  }
};

const isValidText = (value: any): boolean => {
  return typeof value === 'string';
};

const isValidInteger = (value: any): boolean => {
  return Number.isInteger(value);
};

const isValidDouble = (value: any): boolean => {
  return typeof value === 'number';
};

const isValidBoolean = (value: any): boolean => {
  return typeof value === 'boolean';
};

/**
 * 아래 region의 정규식은 zod 라이브러리의 소스 코드를 기준으로 제작하였습니다.
 * @reference https://github.com/colinhacks/zod/blob/ca42965df46b2f7e2747db29c40a26bcb32a51d5/src/types.ts#L576
 */

// start-region: regex
const emailRegex =
  /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;

// simple
// const dateRegexSource = `\\d{4}-\\d{2}-\\d{2}`;
// no leap year validation
// const dateRegexSource = `\\d{4}-((0[13578]|10|12)-31|(0[13-9]|1[0-2])-30|(0[1-9]|1[0-2])-(0[1-9]|1\\d|2\\d))`;
// with leap year validation
const dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
const dateRegex = new RegExp(`^${dateRegexSource}$`);

const timeRegexSource = (args: { precision?: number | null }) => {
  // let regex = `\\d{2}:\\d{2}:\\d{2}`;
  let regex = `([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d`;

  if (args.precision) {
    regex = `${regex}\\.\\d{${args.precision}}`;
  } else if (args.precision == null) {
    regex = `${regex}(\\.\\d+)?`;
  }
  return regex;
};

// const timeRegex = (args: {
//   offset?: boolean;
//   local?: boolean;
//   precision?: number | null;
// }) => {
//   return new RegExp(`^${timeRegexSource(args)}$`);
// };

// Adapted from https://stackoverflow.com/a/3143231
export function datetimeRegex(args: {
  precision?: number | null;
  offset?: boolean;
  local?: boolean;
}) {
  let regex = `${dateRegexSource}T${timeRegexSource(args)}`;

  const opts: string[] = [];
  opts.push(args.local ? `Z?` : `Z`);
  if (args.offset) opts.push(`([+-]\\d{2}:?\\d{2})`);
  regex = `${regex}(${opts.join('|')})`;
  return new RegExp(`^${regex}$`);
}

// end-region: regex

const telephoneRegex =
  /^(\+?\d{1,3}[- ]?)?\(?\d{2,3}\)?[- ]?\d{3,4}[- ]?\d{4}$/;

const colorRegex = /^#[0-9A-F]{6}$/i;

const isValidEmail = (value: any): boolean => {
  return typeof value === 'string' && emailRegex.test(value);
};

const isValidTelephone = (value: any): boolean => {
  return typeof value === 'string' && telephoneRegex.test(value);
};

const isValidUrl = (value: any): boolean => {
  try {
    new URL(value);
  } catch {
    return false;
  }
  return true;
};

const isValidColor = (value: any): boolean => {
  return typeof value === 'string' && colorRegex.test(value);
};

const isValidDate = (value: any): boolean => {
  return typeof value === 'string' && dateRegex.test(value);
};

const isValidDatetime = (value: any): boolean => {
  return typeof value === 'string' && datetimeRegex({}).test(value);
};

const isValidJson = (value: any): boolean => {
  try {
    JSON.parse(value);
  } catch {
    return false;
  }
  return true;
};
