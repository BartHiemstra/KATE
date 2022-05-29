import jsPDF from "jspdf";
import "jspdf-autotable";

import { formatMetricTon, formatEuros } from '../business/format.js';

// Export table data as PDF.
export function exportPDF(t, totalResidualValue, table, tableTitle, fileName) {
    // Setup PDF configuration.
    const orientation = "portrait";
    const unit = "pt";
    const size = "A4";
    const margin = 40;

    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(15);

    const title = tableTitle;
    const headers = [[t('table_constructionElement'), t('table_material'), t('table_mass'), t('table_residualvalue'), t('table_residualvalueRounded')]];
    const data = table.map(item=> [t(item.name), item.material, formatMetricTon(item.total) + ' ' + t('metric_ton'), '€ ' + formatEuros(item.value, 0), '€ ' + formatEuros(item.value, 1000)]);


    const headersTotalValue = [[t('label_residualvalue')]]
    const dataTotalValue = [['€ ' + formatEuros(totalResidualValue, 10000)]]

    let totalValue = {
        startY: 60,
        head: headersTotalValue,
        body: dataTotalValue
      };

    let content = {
      startY: 125,
      head: headers,
      body: data
    };

    // Generate table and save as PDF.
    doc.text(title, margin, margin);
    doc.autoTable(content);
    doc.autoTable(totalValue);
    doc.save(fileName + '.pdf')
}