//adapted from: https://stackoverflow.com/questions/39778797/react-editable-table
const onCellChange = (row, column) => {
    //update the cell with this.setState() method
}

const DataTable =(props) => {

    if(props.columns.length === 0){
        return (
            <table className = "dataTable">
               <h3 className = "emptyTable">No Data Yet</h3>
            </table>
        );
    }

    console.log(props.columns);
    console.log(props.data);    

    const headers = props.columns.map((header) => {
        return (
            <th key = {header._id}>{header}</th>
        );
    })

    return(
        <table className = "dataTable">
            <thead>
                <tr>Header 1</tr>
                <tr>Header 2</tr>
                <tr>Header 3</tr>
                <tr>Header 4</tr>
                <tr>Header 5</tr>
            </thead>
            <tbody>

                {props.data.map((row, index) => {
                    return (
                        <tr key={index}>
                            
                            <td><input type='text' className='form-control' value={row[0]} onChange={() => onCellChange(index, 0)}/></td>
                            <td><input type='number' className='form-control' step='1' min="1" value={row[1]} onChange={() => onCellChange(index, 1)}/></td>
                            <td><input type='text' className='form-control' value={row[1]} onChange={() => onCellChange(index, 2)}/></td>
                            <td><input type='text' className='form-control' value={row[2]} onChange={() => onCellChange(index, 3)}/></td>
                            <td><input type='text' className='form-control' value={row[3]} onChange={() => onCellChange(index, 4)}/></td>
                        </tr>
                    );
                })}

                
            </tbody>


        </table>
    );
}

