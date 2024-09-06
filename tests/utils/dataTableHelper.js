/**
 * Utility function to extract data from Cucumber data table.
 * @param {DataTable} dataTable - The Cucumber DataTable object
 * @returns {Array} - Array of objects representing each row of data
 */
export function parseDataTableIfHeadet(dataTable) {
    const data = dataTable.hashes(); 
    return data;
}
  
export function parseDataTableIfNotHeader(dataTable) {
    const data = dataTable.raw(); 
    return data;
  }