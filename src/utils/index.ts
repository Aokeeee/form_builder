import axios from "axios";
function addLight(color: string, amount: number) {
  const cc = parseInt(color, 16) + amount;
  const c = cc > 255 ? 255 : cc;
  return c.toString(16).length > 1 ? c.toString(16) : `0${c.toString(16)}`;
}

export function lighten(color: string, amount: number) {
  color = color.indexOf("#") >= 0 ? color.substring(1, color.length) : color;
  amount = Math.trunc((255 * amount) / 100);
  return `#${addLight(color.substring(0, 2), amount)}${addLight(
    color.substring(2, 4),
    amount
  )}${addLight(color.substring(4, 6), amount)}`;
}
type Data = {
  code: number;
  result: any;
  message: string;
};

export async function fetch(params: {
  url: string;
  method: "get" | "post" | "put";
  timeout?: number;
}): Promise<Data> {
  const { status, data } = await await axios.request({
    url: `http://192.168.1.141:5221/api/${params.url}`,
    method: params.method,
    timeout: params.timeout || 2000,
  });

  const { code, result, message }: Data = data;
  return {
    code,
    result,
    message,
  };
}
