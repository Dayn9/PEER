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
var chartProperty = 'age';

var DataChart = function DataChart(props) {
  var data = props.domos;

  var drawChart = function drawChart(property) {
    chartProperty = property; //store for reload on new

    xScale.domain([0, d3.max(data, function (d) {
      return d[property];
    }) + 10]).range([margin.left, width - margin.right]);
    yScale.range([margin.top, height - margin.bottom]).domain(data.map(function (d) {
      return d.name;
    }));
    svg.selectAll("rect").data(data, function (d) {
      return d._id;
    }).join(function (enter) {
      return enter.append("rect").attr("x", xScale(0)).attr("y", function (d) {
        return yScale(d.name);
      }).attr("width", function (d) {
        return xScale(d[property] || 0) - xScale(0);
      }).attr("height", yScale.bandwidth()).attr("fill", "#338acc");
    }, function (update) {
      return update.call(function (update) {
        return update.transition().duration(500).attr("x", xScale(0)).attr("y", function (d) {
          return yScale(d.name);
        }).attr("width", function (d) {
          return xScale(d[property] || 0) - xScale(0);
        }).attr("height", yScale.bandwidth());
      });
    });
    xAxis.call(d3.axisBottom(xScale)).selectAll("text").attr("transform", "translate(-10,0)rotate(-45)").style("text-anchor", "end");
    yAxis.call(d3.axisLeft(yScale));
  };

  var drawChartAge = function drawChartAge() {
    return drawChart('age');
  };

  var drawChartFriends = function drawChartFriends() {
    return drawChart('friends');
  };

  drawChart(chartProperty); //return the controls and hook up the onClick functions

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    className: "chartButton",
    onClick: drawChartAge
  }, "Show Ages"), /*#__PURE__*/React.createElement("button", {
    className: "chartButton",
    onClick: drawChartFriends
  }, "Show Friends"));
};
"use strict";

var handleData = function handleData(e) {
  e.preventDefault();
  $("#messageBox").animate({
    width: 'hide'
  }, 350);

  if ($("#dataName").val() == '' || $("#dataAge").val() == '' || $("#dataFriends").val() == '') {
    handleError("Error: All fields are required");
    return false;
  }

  sendAjax('POST', $("#dataForm").attr("action"), $("#dataForm").serialize(), function () {
    loadDataFromServer();
  });
  return false;
};

var DataForm = function DataForm(props) {
  return /*#__PURE__*/React.createElement("form", {
    id: "dataForm",
    name: "dataForm",
    onSubmit: handleData,
    action: "/maker",
    method: "POST",
    className: "dataForm"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "name"
  }, "Name: "), /*#__PURE__*/React.createElement("input", {
    id: "dataName",
    type: "text",
    name: "name",
    placeholder: "Name"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "age"
  }, "Age: "), /*#__PURE__*/React.createElement("input", {
    id: "dataAge",
    type: "text",
    name: "age",
    placeholder: "Age"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "friends"
  }, "Friends: "), /*#__PURE__*/React.createElement("input", {
    id: "dataFriends",
    type: "text",
    name: "friends",
    placeholder: "Friends"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "addDataSubmit",
    type: "submit",
    value: "Add Data"
  }));
};

var Descriptives = function Descriptives(props) {
  return /*#__PURE__*/React.createElement("div", {
    id: "desc"
  }, /*#__PURE__*/React.createElement("h3", null, "Descriptive Statistics for Age"), /*#__PURE__*/React.createElement("p", null, "Mean: ", props.mean), /*#__PURE__*/React.createElement("p", null, "Median: ", props.median), /*#__PURE__*/React.createElement("p", null, "Mode: ", props.mode), /*#__PURE__*/React.createElement("p", null, "Range: ", props.range[0], " - ", props.range[1]));
};

var loadDataFromServer = function loadDataFromServer() {
  sendAjax('GET', '/getData', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(DataChart, {
      domos: data.data
    }), document.querySelector("#dataChartOptions"));
    ReactDOM.render( /*#__PURE__*/React.createElement(DataTable, {
      headers: ['name', 'age', 'friends'],
      data: data.data
    }), document.querySelector("#tableSection"));
  }); //test descriptive 

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
  ReactDOM.render( /*#__PURE__*/React.createElement(DataForm, {
    csrf: csrf
  }), document.querySelector("#addData"));
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

//adapted from: https://stackoverflow.com/questions/39778797/react-editable-table
var onCellChange = function onCellChange(row, column) {//update the cell with this.setState() method
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
  }))), /*#__PURE__*/React.createElement("tbody", null, //create each of the data table rows
  props.data.map(function (row, rowIndex) {
    return /*#__PURE__*/React.createElement("tr", {
      key: rowIndex
    }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("input", {
      type: "text",
      className: "form-control",
      value: row[props.headers[0]],
      onChange: function onChange() {
        return onCellChange(rowIndex, 0);
      }
    })), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("input", {
      type: "number",
      className: "form-control",
      step: "1",
      min: "1",
      value: row[props.headers[1]],
      onChange: function onChange() {
        return onCellChange(rowIndex, 1);
      }
    })), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("input", {
      type: "number",
      className: "form-control",
      step: "1",
      min: "1",
      value: row[props.headers[2]],
      onChange: function onChange() {
        return onCellChange(rowIndex, 2);
      }
    })));
  })));
};
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

var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
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
