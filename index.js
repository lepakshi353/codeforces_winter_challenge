document.addEventListener('DOMContentLoaded', function () {
    
        
        const url = 'excel_files/Final.xlsx';
        
        fetch(url)
            .then(response => response.arrayBuffer())
            .then(data => {
                const workbook = XLSX.read(new Uint8Array(data), { type: 'array' });

                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];

                const htmlTable = XLSX.utils.sheet_to_html(sheet, { editable: false});
                document.getElementById('excelData').innerHTML = htmlTable;
                const tableElement = document.getElementById('excelData').getElementsByTagName('table')[0];
                tableElement.style.borderCollapse = 'collapse';
                tableElement.style.width = '100%';
                tableElement.style.border = '1px solid #ddd';
                tableElement.style.alignContent='center'
                removeEmptyRows();
                const cells = tableElement.getElementsByTagName('td');
                cells[1].style.backgroundColor='#808080'
                cells[2].style.backgroundColor='#FFC0CB'
                cells[3].style.backgroundColor='#008000'
                for (let i = 15; i >= 5; i--) {
                    cells[i].style.backgroundColor='#FFB668';
               
            }
            for (let i = 15; i >= 1; i--) {
                
                cells[i].style.fontWeight = 'bold';
                
        }
          
           
})
});

function removeEmptyRows() {
    const tableElement = document.getElementById('excelData').getElementsByTagName('table')[0];
    const rows = tableElement.getElementsByTagName('tr');

    for (let i = rows.length - 1; i >= 0; i--) {
        const cells = rows[i].getElementsByTagName('td');
        let isEmpty = true;

        for (let j = 0; j < cells.length; j++) {
            if (cells[j].textContent.trim() !== '') {
                isEmpty = false;
                break;
            }
        }

        if (isEmpty) {
            tableElement.deleteRow(i);
        }
    }
}