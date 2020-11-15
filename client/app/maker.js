
const handleDomo = (e) => {
    e.preventDefault();

    $("#domoMessage").animate({width:'hide'},350);

    if($("#domoName").val() == '' || $("#domoAge").val() == '' || $("#domoFriends").val() == '') {
      handleError("Error: All fields are required");
      return false;
    }

    sendAjax('POST', $("#domoForm").attr("action"), $("#domoForm").serialize(), () => {
        loadDomosFromServer();
    });

    return false;
}

const DomoForm = (props) => {
    return(
      <form id="domoForm" 
          name="domoForm" 
          onSubmit={handleDomo}
          action="/maker" 
          method="POST" 
          className="domoForm"
      >
        <label htmlFor="name">Name: </label>
        <input id="domoName" type="text" name="name" placeholder="Domo Name"/>
        <label htmlFor="age">Age: </label>
        <input id="domoAge" type="text" name="age" placeholder="Domo Age"/>
        <label htmlFor="friends">Friends: </label>
        <input id="domoFriends" type="text" name="friends" placeholder="Domo # of Friends"/>
        <input type="hidden" name="_csrf" value={props.csrf} />
        <input className="makeDomoSubmit" type="submit" value="Make Domo" />
      </form>
    );
  };


const loadDomosFromServer = () => {
    sendAjax('GET', '/getDomos', null, (data) => {
        ReactDOM.render(
            <DomoChart domos={data.domos} />, 
            document.querySelector("#domoChartOptions")
        );

        ReactDOM.render(
            <DataTable headers = {['name', 'age', 'friends']} data = {data.domos} />,
            document.querySelector("#tableSection")
        )
    });
}

const setup = (csrf) => {
    ReactDOM.render(
        <DomoForm csrf={csrf} />, 
        document.querySelector("#makeDomo")
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