/////////////////////////////////////////////////////////////////////////////
//                                                                         //
//                                                                         //
//                           Excel and Json functions                      //
//                                                                         //
//                                                                         //
/////////////////////////////////////////////////////////////////////////////

//utilty creation and reading excel and json files
//------------------------------------------------


const XLSX = require('xlsx');
const fs   = require('fs');
const path = require("path");


exports.writeToJsonFile = function (data, fileName) {
  console.time("write json file")
  fs.writeFileSync(fileName, JSON.stringify(data, null, 4));
  console.timeEnd("write json file");
  console.log("<----- created file named: ",fileName," containing ",data.length," enteries ----->");
};

// returns the content of a file containing JSON array
exports.getJSONFileContent = function (filepath) {
  console.time("read JSON")
  let jsonOfFile = JSON.parse(fs.readFileSync(filepath, 'utf8'));
  console.timeEnd("read JSON");
  console.log("<----- entries in ", filepath, " file: ", jsonOfFile.length," ----->")
  return jsonOfFile
};

//returns content of excel file in JSON format
exports.getExcelFileContent = function (file) {
  console.time("file parsing")
  let workbook = XLSX.readFile(file);
  let sheet_name_list = workbook.SheetNames;
  let jsonOfFile = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
  //console.log(jsonOfFile.length)
  console.timeEnd("file parsing");
  return jsonOfFile
};

exports.writeToExcelFile = function (data,fileName,sheetName) {
  var ws = XLSX.utils.json_to_sheet(data);

  /* add to workbook */
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName);

  /* generate an XLSX file */
  XLSX.writeFile(wb, fileName);
};

exports.cleanZeroesFromString = function (str) {
  str = Number(str).toString();
  return str
};
