
const handleData = (e) => {
    e.preventDefault();

    $("#messageBox").animate({width:'hide'},350);

    if($("#dataName").val() == '' || $("#dataAge").val() == '' || $("#dataFriends").val() == '') {
      handleError("Error: All fields are required");
      return false;
    }

    sendAjax('POST', $("#dataForm").attr("action"), $("#dataForm").serialize(), () => {
        loadDomosFromServer();
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


const loadDomosFromServer = () => {
    sendAjax('GET', '/getData', null, (data) => {
        ReactDOM.render(
            <DataChart domos={data.data} />, 
            document.querySelector("#dataChartOptions")
        );

        ReactDOM.render(
            <DataTable headers = {['name', 'age', 'friends']} data = {data.data} />,
            document.querySelector("#tableSection")
        )
    });
}

const setup = (csrf) => {
    ReactDOM.render(
        <DataForm csrf={csrf} />, 
        document.querySelector("#addData")
    );

    loadDomosFromServer();
}

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
      setup(result.csrfToken);
    });
  }
  
$(document).ready(function(){
  getToken();
});