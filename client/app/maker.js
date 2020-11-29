
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
  };

  const Descriptives = (props) => {
    return(
      <div id="desc">
        <h3>Descriptive Statistics for Age</h3>
        <p>Mean: {props.mean}</p>
        <p>Median: {props.median}</p>
        <p>Mode: {props.mode}</p>
        <p>Range: {props.range[0]} - {props.range[1]}</p>
      </div>
    );
  };

const UploadForm = (props) => {
  return(
      <form 
          //ref='uploadForm' 
          id='uploadForm' 
          action='/upload' 
          method='POST' 
          encType="multipart/form-data">
      <input type="file" name="sampleFile" />
      <input type="hidden" name="_csrf" value={props.csrf} />
      <input type='submit' value='Upload!' />
      </form> 
  );
};

//MAY BE USED LATER FOR DOWNLOAD CSV FEATURE
const RetrieveForm = (props) => {
  return(
      <form ref='retrieveForm' 
          id='retrieveForm' 
          action='/retrieve' 
          method='get'>
        <label for='fileName'>Retrieve File By Name: </label>
        <input name='fileName' type='text' />
        <input type="hidden" name="_csrf" value={props.csrf} />
        <input type='submit' value='Download!' />
        
      </form>
  );
};

const loadDataFromServer = () => {
    sendAjax('GET', '/getRecentData', null, (data) => {

        console.log(data);
        
        /*
        ReactDOM.render(
            <DataChart domos={data.data} />, 
            document.querySelector("#dataChartOptions")
        );*/

        ReactDOM.render(
            <DataTable headers = {data.data[0].headers} data = {data.data[0].data} />,
            document.querySelector("#tableSection")
        );
    });
}

const loadDescriptive = () => {
  //test descriptive 
  sendAjax('GET', '/getDescriptive', 'param=age', (data) => {
    console.log(data);
    ReactDOM.render(
      <Descriptives mean = {data.mean} median = {data.median} mode = {data.mode} range = {data.range} />,
      document.querySelector("#descriptives")
    );
  })
}

const setup = (csrf) => {
    ReactDOM.render(
        <DataForm csrf={csrf} />, 
        document.querySelector("#addData")
    );

    ReactDOM.render(
      <UploadForm csrf={csrf} />,
      document.querySelector("#uploadSection")
    );
  
    loadDataFromServer();
}

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
      setup(result.csrfToken);
    });
  }
  
$(document).ready(function(){
  getToken();
});