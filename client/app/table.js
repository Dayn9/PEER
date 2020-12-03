//adapted from: https://stackoverflow.com/questions/39778797/react-editable-table
const onCellChange = (row, column) => {
    //update the cell with this.setState() method
}

const DataTableRowArray = (row, headers) => {
    let arr = [];
    
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
        <div>
            <h3>{props.name}</h3>
            <table className = "dataTable">
                <thead>
                    <tr>
                        <th style={{width: 30}}></th>
                        { 
                        //create the data table headers
                        props.headers.map((header) => {
                            return (
                                <th key = {header}>{header}</th>
                            );
                        })
                        }
                    </tr>
                </thead>
                <tbody>
                    { 
                    //create data rows 
                    props.data.map((row, rowIndex) => {
                        return (
                            <tr key={rowIndex}>
                                <td><strong>{rowIndex}</strong></td>
                                { 
                                    //create data point by looping over headers in row
                                    props.headers.map((header, colIndex) => {
                                        return (
                                            <td key = {colIndex}><input type='text' className='form-control' value={row[header]} onChange={() => onCellChange(rowIndex, colIndex)}/></td>
                                        );
                                    }) 
                                }                           
                            </tr>
                        );
                    })
                    }
                </tbody> 
            </table>
        </div>

        
    );
}
