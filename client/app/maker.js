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
      <p>Mean: <strong>{props.mean}</strong></p>
      <p>Median: <strong>{props.median}</strong></p>
      <p>Mode: <strong>{props.mode}</strong></p>
      <p>Range: <strong>{props.range[0]} - {props.range[1]}</strong></p>
    </div>
  );
};

const CategoricalDescriptive = (props) => {
  return(
    <div id="desc">
      <h3>Descriptive Statistics for {props.header}</h3>
      {
        //TODO
      }
    </div>
  );
}


