const DescriptiveDropdown = (headerData) => {
  if(headerData != null){
    return(
      <div className ="dropdown">
        <button className ="dropdownButton">Descriptive</button>
        <div className ="dropdown-content">
          { 
          //create the headers 
          headerData.map((d) => {
              return (
                  <a key = {d.header} onClick = {
                    () => d.isCategorical ? loadDescriptiveCategorical(d.header) : loadDescriptiveNumeric(d.header)
                  }>{d.header}</a>
              );
          })
          }
        </div>
      </div>
    );
  }
}

const ChartDropdown = (headerData) => {
  if(headerData != null){
    return(
      <div className ="dropdown">
        <button className ="dropdownButton">Chart</button>
        <div className ="dropdown-content">
          { 
          //create the headers 
          headerData.map((d) => {
              return (
                  <a key = {d.header} onClick = {
                    () => d.isCategorical ? loadChartCategorical(d.header) : loadChartNumeric(d.header)
                  }>{d.header}</a>
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
    if(props.headers !== undefined && props.data !== undefined){
      let headers = props.headers;
      //let isCategorical = headers.map(h => isNaN(parseFloat(props.data[0][h])));
      let headerData = headers.reduce((acc, cur) => {
        
        acc.push({ //header data -->
          header: cur,
          isCategorical: isNaN(parseFloat(props.data[0][cur]))
        });

        return acc;
      }, []);

      return(
        <div>
            <a href="/login"><img id="logo" src="/assets/img/eyecon2x.png" alt="face logo"/></a>
            { DescriptiveDropdown(headerData) }
            { ChartDropdown(headerData) }
            <div className="navlink"><a href="/logout">Log out</a></div>
        </div>
      );
    }

    //default return logout only
    return(
        <div>
            <a href="/login"><img id="logo" src="/assets/img/eyecon2x.png" alt="face logo"/></a>
            <div className="navlink"><a href="/logout">Log out</a></div>
        </div>
    );
};

const loadDataFromServer = () => {
  sendAjax('GET', '/getRecentData', null, (data) => {
      
    if(data.data[0] != null){
        
      ReactDOM.render(
        <DataTable name = {data.data[0].name} headers = {data.data[0].headers} data = {data.data[0].data} />,
        document.querySelector("#tableSection")
      );
        
      ReactDOM.render(
        <NavigationControls headers = {data.data[0].headers} data = {data.data[0].data} />,
        document.querySelector('nav')
      );
      
    }
  });
}

const loadChartNumeric = (header) => {
  sendAjax('GET', '/getRecentData', null, (data) => {
    ReactDOM.render(
        <NumericChart header = {header} data = {data.data[0].data} />, 
        document.querySelector("#chartProperties")
    );
  });
}
const loadChartCategorical = (header) => {
  sendAjax('GET', '/getDescriptiveCategorical', `param=${header}`, (data) => {
    ReactDOM.render(
      <CategoricalChart header = {header} counts = {data.counts} />,
      document.querySelector("#chartProperties")
    );
  })
}

const loadDescriptiveNumeric = (header) => {
  sendAjax('GET', '/getDescriptiveNumeric', `param=${header}`, (data) => {
    ReactDOM.render(
      <NumericDescriptive header = {header} mean = {data.mean} median = {data.median} mode = {data.mode} range = {data.range} />,
      document.querySelector("#descriptives")
    );
  })
}

const loadDescriptiveCategorical = (header) => {
  sendAjax('GET', '/getDescriptiveCategorical', `param=${header}`, (data) => {
    ReactDOM.render(
      <CategoricalDescriptive header = {header} counts = {data.counts} percents = {data.percents} />,
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