const DescriptiveDropdown = (headers) => {
  if(headers != null){
    return(
      <div className ="dropdown">
        <button className ="dropdownButton">Descriptive</button>
        <div className ="dropdown-content">
          { 
          //create the headers 
          headers.map((header) => {
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

const ChartDropdown = (headers) => {
  if(headers != null){
    return(
      <div className ="dropdown">
        <button className ="dropdownButton">Chart</button>
        <div className ="dropdown-content">
          { 
          //create the headers 
          headers.map((header) => {
              return (
                  <a key = {header} onClick = {() => loadChart(header)}>{header}</a>
              );
          })
          }
        </div>
      </div>
    );
  }
}

const NavigationControls = (props) => {
    
    /*screen out categorical variables*/
    let headers = props.headers
    if(props.headers !== undefined && props.data !== undefined){
      headers = props.headers.filter(h => !isNaN(parseFloat(props.data[0][h])));
    }

    return(
        <div>
            <a href="/login"><img id="logo" src="/assets/img/eyecon2x.png" alt="face logo"/></a>
            { DescriptiveDropdown(headers) }
            { ChartDropdown(headers) }
            <div className="navlink"><a href="/logout">Log out</a></div>
        </div>
    );
};

const loadDataFromServer = () => {
    sendAjax('GET', '/getRecentData', null, (data) => {
      
        ReactDOM.render(
            <DataTable name = {data.data[0].name.split('.')[0]} headers = {data.data[0].headers} data = {data.data[0].data} />,
            document.querySelector("#tableSection")
        );

        ReactDOM.render(
            <NavigationControls headers = {data.data[0].headers} data = {data.data[0].data} />,
            document.querySelector('nav')
        );
        
    });
}

const loadChart = (header) => {
  sendAjax('GET', '/getRecentData', null, (data) => {
        
    ReactDOM.render(
        <NumericChart header = {header} data = {data.data[0].data} />, 
        document.querySelector("#chartProperties")
    );
});
}

const loadDescriptive = (header) => {
  sendAjax('GET', '/getDescriptive', `param=${header}`, (data) => {
    ReactDOM.render(
      <NumericDescriptive header = {header} mean = {data.mean} median = {data.median} mode = {data.mode} range = {data.range} />,
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