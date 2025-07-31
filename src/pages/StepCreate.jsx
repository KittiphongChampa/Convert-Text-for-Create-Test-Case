import { useState } from "react";
import "../styles/StepCreate.css";
import {
  For,
  Portal,
  Select,
  Stack,
  createListCollection,
  Switch,
  Button,
} from "@chakra-ui/react";
import { HiCheck, HiX } from "react-icons/hi";

import { CreateNumber_Step } from "../lib/CreateNumber_Step";
import { SortNumber } from "../lib/SortNumber";
import { Step_GenerateX } from "../lib/Step_GenerateX";
import { Expect_GenerateX } from "../lib/Expect_GenerateX";

function StepCreate() {
  const [mode, setMode] = useState("create-number-step");
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [converted, setConverted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [toggleEnabled, setToggleEnabled] = useState(false);

  const handleModeChange = (e) => {
    const newMode = e.target.value;
    setMode(newMode);
    // setInputText("");
    setOutputText("");
    setConverted(false);
    setToggleEnabled(false);
  };

  const handleConvertClick = () => {
    let result = "";
    if (mode === "create-number-step") {
      result = CreateNumber_Step(inputText);
    } else if (mode === "sort-number") {
      result = SortNumber(inputText);
    } else if (mode === "step-gen-x") {
      try {
        result = Step_GenerateX(inputText, toggleEnabled);
      } catch (err) {
        alert(err.message);
        setOutputText("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
      }
    } else if (mode === "expect-gen-x") {
      try {
        result = Expect_GenerateX(inputText, toggleEnabled);
      } catch (err) {
        alert(err.message);
        setOutputText("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
      }
    } else {
      result = "โหมดนี้ยังไม่รองรับ";
    }
    setOutputText(result);
    setConverted(true);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("ไม่สามารถคัดลอกได้", err);
    }
  };

  const clearText = () => {
    setInputText("");
    setOutputText("");
    setConverted(false);
  };

  return (
    <div className="p-6 space-y-4">
      <div>
        <label className="font-semibold mr-2">Select Mode: </label>
        <select
          value={mode}
          onChange={handleModeChange}
          className="border p-2 rounded selectBtn"
        >
          <option value="create-number-step">Create Number Step</option>
          <option value="sort-number">Sort Number Step</option>
          <option value="step-gen-x">Generate X Step</option>
          <option value="expect-gen-x">Generate X Expect</option>
        </select>
      </div>
      {(mode === "step-gen-x" || mode === "expect-gen-x") && (
        <div className="flex items-center space-x-2 togleButton">
          <Switch.Root
            checked={toggleEnabled}
            onCheckedChange={(e) => setToggleEnabled(e.checked)}
          >
            <Switch.HiddenInput />
            <Switch.Control>
              <Switch.Thumb />
            </Switch.Control>
            <Switch.Label>เคาะ space 2 ครั้ง</Switch.Label>
          </Switch.Root>
        </div>
      )}

      <div className="form-container">
        <div className="input-section">
          <label className="label">Original text</label>
          <textarea
            className="textarea"
            rows={10}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="พิมพ์ข้อความของคุณที่นี่"
          />
          <button className="convert-button" onClick={handleConvertClick}>
            Convert
          </button>
        </div>

        <div className="output-section">
          <label className="label">Changed text</label>
          <textarea
            className="textarea"
            rows={10}
            value={outputText}
            onChange={(e) => setOutputText(e.target.value)}
          />
          <button
            onClick={handleCopy}
            className={`copy-button ${
              converted ? "copy-button-converted" : ""
            }`}
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
      <button className="clear-button" onClick={clearText}>
        Clear Text
      </button>
    </div>
  );
}

export default StepCreate;
