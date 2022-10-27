import { axiod, parse } from "./deps.ts";

async function main(isbn: string) {
  const res = await axiod.get(
    `https://iss.ndl.go.jp/api/sru?operation=searchRetrieve&query=isbn=${isbn}&maximumRecords=1&recordSchema=dcndl_simple&versions=1.1`,
  );
  // deno-lint-ignore no-explicit-any
  const res_json: any = parse(res.data);
  res_check_null(res_json);
  const res_data = res_json.searchRetrieveResponse.records.record.recordData["dcndl_simple:dc"];
  console.log(res_data["dc:title"]);
  console.log(res_data["dc:creator"][0]);
}

// deno-lint-ignore no-explicit-any
function res_check_null(json: any) {
  if (!json) {
    console.log("No results");
    Deno.exit(1);
  }
}

const input = prompt("ISBNを入力してください");
if (!input) {
  console.log("ISBNを入力してください");
  Deno.exit(1);
}
main(input);
