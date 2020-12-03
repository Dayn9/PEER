"use strict";

var handleError = function handleError(message) {
  $("#errorMessage").text(message);
  $("#messageBox").animate({
    width: 'toggle'
  }, 350);
};

var redirect = function redirect(res) {
  $("#messageBox").animate({
    width: 'hide'
  }, 350);
  window.location = res.redirect;
};

var sendAjaxFile = function sendAjaxFile(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    processData: false,
    // tell jQuery not to process the data
    contentType: false,
    // tell jQuery not to set contentType
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};

var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error2) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};

var handleSignup = function handleSignup(e) {
  e.preventDefault();
  $("#messageBox").animate({
    width: 'hide'
  }, 350);

  if ($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
    handleError("Error: All fields are required");
    return false;
  }

  if ($("#pass").val() !== $("#pass2").val()) {
    handleError("Error: Passwords do not match");
    return false;
  }

  sendAjax('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);
  return false;
};

var handleLogin = function handleLogin(e) {
  e.preventDefault();
  $("#messageBox").animate({
    width: 'hide'
  }, 350);

  if ($("#user").val() == '' || $("#pass").val() == '') {
    handleError("Error: Username or password is empty");
    return false;
  }

  sendAjax('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(), redirect);
  return false;
};
"use strict";

/*
Reference:
https://www.d3-graph-gallery.com/graph/barplot_horizontal.html
*/
var margin = {
  top: 20,
  right: 30,
  bottom: 40,
  left: 90
};
var width = 500;
var height = 400;
var svg = d3.select("#chart").append("svg").attr("width", width).attr("height", height);
var xScale = d3.scaleLinear();
var yScale = d3.scaleBand().padding(.1);
var xAxis = svg.append("g").attr("transform", "translate(0,".concat(height - margin.bottom, " )"));
var yAxis = svg.append("g").attr("transform", "translate(".concat(margin.left, ",0)"));
var chartProperty = 'ages';

var NumericChart = function NumericChart(props) {
  var data = props.data;
  chartProperty = props.header;

  var drawChart = function drawChart(property) {
    chartProperty = property; //store for reload on new

    xScale.domain([0, d3.max(data, function (d) {
      return parseFloat(d[property]);
    })]).range([margin.left, width - margin.right]);
    yScale.range([margin.top, height - margin.bottom]).domain(data.map(function (d, i) {
      return i;
    }));
    svg.selectAll("rect").data(data, function (d, i) {
      return i;
    }) //map by index
    .join(function (enter) {
      return enter.append("rect").attr("x", xScale(0)).attr("y", function (d, i) {
        return yScale(i);
      }).attr("width", function (d) {
        return xScale(parseFloat(d[property]) || 0) - xScale(0);
      }).attr("height", yScale.bandwidth()).attr("fill", "#008b8b");
    }, function (update) {
      return update.call(function (update) {
        return update.transition().duration(500).attr("x", xScale(0)).attr("y", function (d, i) {
          return yScale(i);
        }).attr("width", function (d) {
          return xScale(parseFloat(d[property]) || 0) - xScale(0);
        }).attr("height", yScale.bandwidth());
      });
    });
    xAxis.call(d3.axisBottom(xScale)).selectAll("text").attr("transform", "translate(-10,0)rotate(-45)").style("text-anchor", "end");
    yAxis.call(d3.axisLeft(yScale));
  };

  drawChart(chartProperty);
  return /*#__PURE__*/React.createElement("h3", null, "Chart for ", props.header);
};
"use strict";

var handleFileUpload = function handleFileUpload(e) {
  $("#messageBox").animate({
    width: 'hide'
  }, 350);
  window.location = '/maker';
  return false;
};

var UploadForm = function UploadForm(props) {
  return /*#__PURE__*/React.createElement("form", {
    //ref='uploadForm' 
    id: "uploadForm",
    onSubmit: handleFileUpload,
    action: "/upload",
    method: "POST",
    encType: "multipart/form-data"
  }, /*#__PURE__*/React.createElement("input", {
    id: "file",
    type: "file",
    name: "sampleFile"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    type: "submit",
    value: "Upload!"
  }));
}; //MAY BE USED LATER FOR DOWNLOAD CSV FEATURE


var RetrieveForm = function RetrieveForm(props) {
  return /*#__PURE__*/React.createElement("form", {
    ref: "retrieveForm",
    id: "retrieveForm",
    action: "/retrieve",
    method: "get"
  }, /*#__PURE__*/React.createElement("label", {
    "for": "fileName"
  }, "Retrieve File By Name: "), /*#__PURE__*/React.createElement("input", {
    name: "fileName",
    type: "text"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    type: "submit",
    value: "Download!"
  }));
};
"use strict";

var DescriptiveDropdown = function DescriptiveDropdown(headers) {
  if (headers != null) {
    return /*#__PURE__*/React.createElement("div", {
      className: "dropdown"
    }, /*#__PURE__*/React.createElement("button", {
      className: "dropdownButton"
    }, "Descriptive"), /*#__PURE__*/React.createElement("div", {
      className: "dropdown-content"
    }, //create the headers 
    headers.map(function (header) {
      return /*#__PURE__*/React.createElement("a", {
        key: header,
        onClick: function onClick() {
          return loadDescriptive(header);
        }
      }, header);
    })));
  }
};

var ChartDropdown = function ChartDropdown(headers) {
  if (headers != null) {
    return /*#__PURE__*/React.createElement("div", {
      className: "dropdown"
    }, /*#__PURE__*/React.createElement("button", {
      className: "dropdownButton"
    }, "Chart"), /*#__PURE__*/React.createElement("div", {
      className: "dropdown-content"
    }, //create the headers 
    headers.map(function (header) {
      return /*#__PURE__*/React.createElement("a", {
        key: header,
        onClick: function onClick() {
          return loadChart(header);
        }
      }, header);
    })));
  }
};

var NavigationControls = function NavigationControls(props) {
  /*screen out categorical variables*/
  var headers = props.headers;

  if (props.headers !== undefined && props.data !== undefined) {
    headers = props.headers.filter(function (h) {
      return !isNaN(parseFloat(props.data[0][h]));
    });
  }

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("a", {
    href: "/login"
  }, /*#__PURE__*/React.createElement("img", {
    id: "logo",
    src: "/assets/img/eyecon2x.png",
    alt: "face logo"
  })), DescriptiveDropdown(headers), ChartDropdown(headers), /*#__PURE__*/React.createElement("div", {
    className: "navlink"
  }, /*#__PURE__*/React.createElement("a", {
    href: "/logout"
  }, "Log out")));
};

var loadDataFromServer = function loadDataFromServer() {
  sendAjax('GET', '/getRecentData', null, function (data) {
    if (data.data[0] != null) {
      ReactDOM.render( /*#__PURE__*/React.createElement(DataTable, {
        name: data.data[0].name,
        headers: data.data[0].headers,
        data: data.data[0].data
      }), document.querySelector("#tableSection"));
      ReactDOM.render( /*#__PURE__*/React.createElement(NavigationControls, {
        headers: data.data[0].headers,
        data: data.data[0].data
      }), document.querySelector('nav'));
    }
  });
};

var loadChart = function loadChart(header) {
  sendAjax('GET', '/getRecentData', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(NumericChart, {
      header: header,
      data: data.data[0].data
    }), document.querySelector("#chartProperties"));
  });
};

var loadDescriptive = function loadDescriptive(header) {
  sendAjax('GET', '/getDescriptive', "param=".concat(header), function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(NumericDescriptive, {
      header: header,
      mean: data.mean,
      median: data.median,
      mode: data.mode,
      range: data.range
    }), document.querySelector("#descriptives"));
  });
};

var setup = function setup(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(UploadForm, {
    csrf: csrf
  }), document.querySelector("#uploadSection"));
  ReactDOM.render( /*#__PURE__*/React.createElement(NavigationControls, null), document.querySelector('nav'));
  loadDataFromServer();
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
"use strict";

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
var NumericDescriptive = function NumericDescriptive(props) {
  return /*#__PURE__*/React.createElement("div", {
    id: "desc"
  }, /*#__PURE__*/React.createElement("h3", null, "Descriptive Statistics for ", props.header), /*#__PURE__*/React.createElement("p", null, "Mean: ", /*#__PURE__*/React.createElement("strong", null, props.mean)), /*#__PURE__*/React.createElement("p", null, "Median: ", /*#__PURE__*/React.createElement("strong", null, props.median)), /*#__PURE__*/React.createElement("p", null, "Mode: ", /*#__PURE__*/React.createElement("strong", null, props.mode)), /*#__PURE__*/React.createElement("p", null, "Range: ", /*#__PURE__*/React.createElement("strong", null, props.range[0], " - ", props.range[1])));
};

var CategoricalDescriptive = function CategoricalDescriptive(props) {
  return /*#__PURE__*/React.createElement("div", {
    id: "desc"
  }, /*#__PURE__*/React.createElement("h3", null, "Descriptive Statistics for ", props.header));
};
"use strict";

//adapted from: https://stackoverflow.com/questions/39778797/react-editable-table
var onCellChange = function onCellChange(row, column) {//update the cell with this.setState() method
};

var DataTableRowArray = function DataTableRowArray(row, headers) {
  var arr = [];
};

var DataTable = function DataTable(props) {
  if (props.headers.length === 0) {
    return /*#__PURE__*/React.createElement("table", {
      className: "dataTable"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "emptyTable"
    }, "No Data Yet"));
  }

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, props.name), /*#__PURE__*/React.createElement("table", {
    className: "dataTable"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    style: {
      width: 30
    }
  }), //create the data table headers
  props.headers.map(function (header) {
    return /*#__PURE__*/React.createElement("th", {
      key: header
    }, header);
  }))), /*#__PURE__*/React.createElement("tbody", null, //create data rows 
  props.data.map(function (row, rowIndex) {
    return /*#__PURE__*/React.createElement("tr", {
      key: rowIndex
    }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("strong", null, rowIndex)), //create data point by looping over headers in row
    props.headers.map(function (header, colIndex) {
      return /*#__PURE__*/React.createElement("td", {
        key: colIndex
      }, /*#__PURE__*/React.createElement("input", {
        type: "text",
        className: "form-control",
        value: row[header],
        onChange: function onChange() {
          return onCellChange(rowIndex, colIndex);
        }
      }));
    }));
  }))));
};
