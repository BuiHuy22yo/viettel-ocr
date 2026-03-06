import { HyperFormula } from 'hyperformula';

export function calculateByHyperFormula(params: [], formula: string) {
  const hf = HyperFormula.buildEmpty({ licenseKey: 'gpl-v3' });

  const sheetName = hf.addSheet('Calculator');
  const sheetId = hf.getSheetId(sheetName);

  if (params) {
    params.forEach((item) => hf.addNamedExpression(item.key, item.value));
  }
  hf.setCellContents({ sheet: sheetId, row: 0, col: 0 }, [['Result', `=${formula}`]]);

  return hf.getCellValue({ sheet: sheetId, row: 0, col: 1 });
}

export function calculate(dataSource: any, record: any, rowIndex: any) {
  dataSource = dataSource?.value || dataSource;

  let params = [];

  let objectKeyFormula = [];

  for (const key in record) {
    const object = record[key];
    const objectType = object.type;
    const objectMethod = object.method;
    const objectValue = object.value;
    const objectAliasKey = object.aliasKey;

    if (objectType === 'FIXED') continue;

    if (objectMethod === 'BY_FORMULA') {
      objectKeyFormula = [...objectKeyFormula, key];
    } else if (objectAliasKey && objectAliasKey != '') {
      params = [...params, { key: object.aliasKey, value: objectValue || '' }];
    }
  }

  for (const key of objectKeyFormula) {
    try {
      const object = record[key];
      let formula = object.formula;

      const formulaSumRegex = /SUM\(([^)]*)\)/g;
      const formulaSumRegexRes = [...formula.matchAll(formulaSumRegex)];

      if (formulaSumRegexRes && formulaSumRegexRes.length > 0) {
        formulaSumRegexRes.forEach((item) => {
          const formulaSum = item[0];
          const sumKey = item[1];

          const sumValue = dataSource?.reduce((accumulator, currentItem) => {
            return Number(accumulator) + Number(currentItem[sumKey.toLowerCase()]['value']);
          }, 0);

          formula = formula.replace(formulaSum, sumKey);

          const keyObjectParam = params.filter((item) => item.key == sumKey);
          if (keyObjectParam) {
            keyObjectParam[0].value = sumValue;
          } else {
            params = [...params, { key: sumKey, value: sumValue }];
          }
        });
      }

      let calcValue = calculateByHyperFormula(params, formula);
      if (calcValue == '#NAME?') calcValue = '';
      dataSource[rowIndex][key].value = calcValue;

      params = [...params, { key: record[key].aliasKey, value: calcValue }];
    } catch (e) {
      console.log(e);
    }
  }
}
