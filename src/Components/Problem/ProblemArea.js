import Axios from "axios";
import React from "react";
import "./ProblemArea.css";
import Iframe from "react-iframe";

function ProblemArea(props) {
  const endpoint = "https://judgeserver.herokuapp.com/problem/";

  const data = {
    type: "problem",
    id: props.id,
  };
  const showTCIn = (tc) => {
    var inps = new Array();
    for (var i = 1; i <= tc; i++) {
      inps.push(
        endpoint +
          "media/TestCases/" +
          data.id.toString() +
          "/sc-input" +
          i.toString() +
          ".txt"
      );
    }
    const renderinp = inps.map((item, index) => {
      return (
        <>
          <pre>#TestCase {index}</pre>
          <Iframe id="frmFile" src={item}></Iframe>
        </>
      );
    });
    return renderinp;
  };

  const showTCOt = (tc) => {
    var ops = new Array();
    for (var i = 1; i <= tc; i++) {
      ops.push(
        endpoint +
          "media/TestCases/" +
          data.id.toString() +
          "/sc-output" +
          i.toString() +
          ".txt"
      );
    }
    const renderout = ops.map((item, index) => {
      return (
        <>
          <pre>#TestCase {index}</pre>
          <Iframe id="frmFile" src={item}></Iframe>
        </>
      );
    });
    return renderout;
  };

  var sampleTestCases;

  const getData = async (data) => {
    const response = await Axios.post(endpoint + "get/", data);
    const out = response.data;
    document.querySelector(".problemTitle").innerHTML = out["title"];
    document.querySelector(".problemStatement").innerHTML = out["description"];
    document.querySelector(".timelimit").innerHTML =
      "Time Limit : " + out["timeLimit"];
    document.querySelector(".memorylimit").innerHTML =
      "Memory Limit : " + out["memoryLimit"];

    sampleTestCases = out["sampleTc"];
    console.log(sampleTestCases);
  };

  getData(data);

  return (
    <div>
      <h1 className="problemTitle"></h1>
      <br></br>
      <p className="problemStatement"></p>
      <br></br>
      <h3 className="TestCaseHeading">Sample Test Cases</h3>
      <div className="ui segment" id="testCases">
        <div className="ui two column very relaxed grid">
          <div className="column" id="testCasesColumn">
            <h3>Input</h3>
            {showTCIn(2)}
          </div>
          <div className="column" id="testCasesColumn">
            <h3>Output</h3>
            <pre>{showTCOt(2)}</pre>
          </div>
        </div>
        <div className="ui vertical divider"></div>
      </div>
      <p className="timelimit"></p>
      <p className="memorylimit"></p>
    </div>
  );
}

export default ProblemArea;
