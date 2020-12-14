/*

MAY BE USED LATER FOR EDITING THE DATA TABLE

const handleData = (e) => {
    e.preventDefault();

    $("#messageBox").animate({width:'hide'},350);

    if($("#dataName").val() == '' || $("#dataAge").val() == '' || $("#dataFriends").val() == '') {
      handleError("Error: All fields are required");
      return false;
    }

    sendAjax('POST', $("#dataForm").attr("action"), $("#dataForm").serialize(), () => {
        loadDataFromServer();
    });

    return false;
}

const DataForm = (props) => {
    return(
      <form id="dataForm" 
          name="dataForm" 
          onSubmit={handleData}
          action="/maker" 
          method="POST" 
          className="dataForm"
      >
        <label htmlFor="name">Name: </label>
        <input id="dataName" type="text" name="name" placeholder="Name"/>
        <label htmlFor="age">Age: </label>
        <input id="dataAge" type="text" name="age" placeholder="Age"/>
        <label htmlFor="friends">Friends: </label>
        <input id="dataFriends" type="text" name="friends" placeholder="Friends"/>

        <input type="hidden" name="_csrf" value={props.csrf} />
        <input className="addDataSubmit" type="submit" value="Add Data" />
      </form>
    );
};*/

const NumericDescriptive = (props) => {
  return(
    <div id="desc">
      <h3>Descriptive Statistics for {props.header}</h3>
      <p>Mean: <strong>{props.mean.toFixed(2)}</strong></p>
      <p>Median: <strong>{props.median.toFixed(2)}</strong></p>
      <p>Mode: <strong>{props.mode.toFixed(2)}</strong></p>
      <p>Range: <strong>{props.range[0].toFixed(2)} - {props.range[1].toFixed(2)}</strong></p>
    </div>
  );
};

const CategoricalDescriptive = (props) => {

  const keys = Object.keys(props.counts);

  return(
    <div id="desc">
      <h3>Descriptive Statistics for {props.header}</h3>
      <table style={{'textAlign': 'center'}}>
        <thead>
          <tr>
            <th></th>
            <th>Count</th>
            <th>Percent</th>
          </tr>
        </thead>
        <tbody>
        {
          keys.map((key) => {
            return(
              <tr key = {key}>
                <td>{key}</td>
                <td>{props.counts[key]}</td>
                <td>{props.percents[key].toFixed(2)}%</td>
              </tr>
            )
          })
        }
        </tbody>
      </table>
    </div>
  );
}


