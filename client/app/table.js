//adapted from: https://stackoverflow.com/questions/39778797/react-editable-table
const onCellChange = (row, column) => {
    //update the cell with this.setState() method
}

const DataTable =(props) => {

    if(props.headers.length === 0){
        return (
            <table className = "dataTable">
               <h3 className = "emptyTable">No Data Yet</h3>
            </table>
        );
    }

    return(
        <table className = "dataTable">
            <thead>
                <tr>
                    { //create the data table headers
                    props.headers.map((header) => {
                        return (
                            <th key = {header}>{header}</th>
                        );
                    })
                    }
                </tr>
            </thead>
            <tbody>
                { //create each of the data table rows
                props.data.map((row, rowIndex) => {
                    return (
                        <tr key={rowIndex}>
                            <td><input type='text' className='form-control' value={row[props.headers[0]]} onChange={() => onCellChange(rowIndex, 0)}/></td>
                            <td><input type='number' className='form-control' step='1' min="1" value={row[props.headers[1]]} onChange={() => onCellChange(rowIndex, 1)}/></td>
                            <td><input type='number' className='form-control' step='1' min="1" value={row[props.headers[2]]} onChange={() => onCellChange(rowIndex, 2)}/></td>
                        
                        </tr>
                    );
                })
                }
            </tbody>


        </table>
    );
}

