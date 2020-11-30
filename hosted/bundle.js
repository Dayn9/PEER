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

var DataChart = function DataChart(props) {
  var data = props.data;
  var headers = props.headers;
  var floatHeaders = headers.filter(function (h) {
    return !isNaN(parseFloat(data[0][h]));
  });
  chartProperty = floatHeaders[0];

  var drawChart = function drawChart(property) {
    chartProperty = property; //store for reload on new

    xScale.domain([0, d3.max(data, function (d) {
      return parseFloat(d[property]);
    }) + 10]).range([margin.left, width - margin.right]);
    yScale.range([margin.top, height - margin.bottom]).domain(data.map(function (d, i) {
      return i;
    }));
    svg.selectAll("rect").data(data, function (d) {
      return d._id;
    }).join(function (enter) {
      return enter.append("rect").attr("x", xScale(0)).attr("y", function (d, i) {
        return yScale(i);
      }).attr("width", function (d) {
        return xScale(parseFloat(d[property]) || 0) - xScale(0);
      }).attr("height", yScale.bandwidth()).attr("fill", "#338acc");
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
  return /*#__PURE__*/React.createElement("div", null, floatHeaders.map(function (header) {
    return /*#__PURE__*/React.createElement("button", {
      key: header,
      className: "chartButton",
      onClick: function onClick() {
        return drawChart(header);
      }
    }, "Show: ", header);
  }));
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

var LoginImage = function LoginImage(props) {
  return /*#__PURE__*/React.createElement("a", {
    href: "/login"
  }, /*#__PURE__*/React.createElement("img", {
    id: "logo",
    src: "/assets/img/eyecon2x.png",
    alt: "face logo"
  }));
};

var LogoutButton = function LogoutButton(props) {
  return /*#__PURE__*/React.createElement("div", {
    "class": "navlink"
  }, /*#__PURE__*/React.createElement("a", {
    href: "/logout"
  }, "Log out"));
};

var loadDataFromServer = function loadDataFromServer() {
  sendAjax('GET', '/getRecentData', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(DataChart, {
      headers: data.data[0].headers,
      data: data.data[0].data
    }), document.querySelector("#dataChartOptions"));
    ReactDOM.render( /*#__PURE__*/React.createElement(DataTable, {
      headers: data.data[0].headers,
      data: data.data[0].data
    }), document.querySelector("#tableSection"));
  });
};

var loadDescriptive = function loadDescriptive() {
  //test descriptive 
  sendAjax('GET', '/getDescriptive', 'param=age', function (data) {
    console.log(data);
    ReactDOM.render( /*#__PURE__*/React.createElement(Descriptives, {
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
var Descriptives = function Descriptives(props) {
  return /*#__PURE__*/React.createElement("div", {
    id: "desc"
  }, /*#__PURE__*/React.createElement("h3", null, "Descriptive Statistics for Age"), /*#__PURE__*/React.createElement("p", null, "Mean: ", props.mean), /*#__PURE__*/React.createElement("p", null, "Median: ", props.median), /*#__PURE__*/React.createElement("p", null, "Mode: ", props.mode), /*#__PURE__*/React.createElement("p", null, "Range: ", props.range[0], " - ", props.range[1]));
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

  return /*#__PURE__*/React.createElement("table", {
    className: "dataTable"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, //create the data table headers
  props.headers.map(function (header) {
    return /*#__PURE__*/React.createElement("th", {
      key: header
    }, header);
  }))), /*#__PURE__*/React.createElement("tbody", null, //create data rows 
  props.data.map(function (row, rowIndex) {
    return /*#__PURE__*/React.createElement("tr", {
      key: rowIndex
    }, //create data point by looping over headers in row
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
  })));
};
