const DescriptiveDropdown = (props) => {
  if(props.headers != null){
    return(
      <div className ="dropdown">
        <button className ="dropdownButton">Descriptive</button>
        <div className ="dropdown-content">
          { 
          //create the headers 
          props.headers.map((header) => {
              return (
                  <a key = {header} onClick = {() => loadDescriptive(header)}>{header}</a>
              );
          })
          }
        </div>
      </div>
    );
  }
}

const ChartDropdown = (props) => {
  if(props.headers != null){
    return(
      <div className ="dropdown">
        <button className ="dropdownButton">Chart</button>
        <div className ="dropdown-content">
          { 
          //create the headers 
          props.headers.map((header) => {
              return (
                  <a key = {header} onClick = {() => loadDescriptive(header)}>{header}</a>
              );
          })
          }
        </div>
      </div>
    );
  }
}



const NavigationControls = (props) => {
    
    return(
        <div>
            <a href="/login"><img id="logo" src="/assets/img/eyecon2x.png" alt="face logo"/></a>
            { DescriptiveDropdown(props) }
            { ChartDropdown(props) }
            <div className="navlink"><a href="/logout">Log out</a></div>
        </div>
    );
};

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

        ReactDOM.render(
            <NavigationControls headers = {data.data[0].headers} />,
            document.querySelector('nav')
        );
        
    });
}

const loadDescriptive = (param) => {
  //test descriptive 
  sendAjax('GET', '/getDescriptive', `param=${param}`, (data) => {
    console.log(data);

    ReactDOM.render(
      <NumericDescriptive mean = {data.mean} median = {data.median} mode = {data.mode} range = {data.range} />,
      document.querySelector("#descriptives")
    );
  })
}

const setup = (csrf) => {

    ReactDOM.render(
      <UploadForm csrf={csrf} />,
      document.querySelector("#uploadSection")
    );

    ReactDOM.render(
        <NavigationControls />,
        document.querySelector('nav')
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