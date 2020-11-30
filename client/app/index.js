const LoginImage = (props) => {
    return(
        <a href="/login"><img id="logo" src="/assets/img/eyecon2x.png" alt="face logo"/></a>
    );
};

const LogoutButton = (props) => {
    return (
        <div class="navlink"><a href="/logout">Log out</a></div>
    );
}

const loadDataFromServer = () => {
    sendAjax('GET', '/getRecentData', null, (data) => {
        
        ReactDOM.render(
            <DataChart headers = {data.data[0].headers} data = {data.data[0].data} />, 
            document.querySelector("#dataChartOptions")
        );

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