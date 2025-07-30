import { useState } from "react";
import "../styles/StepCreate.css";

function StepCreate() {
  const [mode, setMode] = useState("create-number-step");
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [converted, setConverted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleModeChange = (e) => {
    const newMode = e.target.value;
    setMode(newMode);
    // setInputText("");
    setOutputText("");
    setConverted(false);
  };

  const handleConvertClick = () => {
    if (mode === "create-number-step") {
      createNumber_Step();
    } else if (mode === "sort-number") {
      SortNumber();
    } else if (mode === "step-gen-x") {
      Step_GenerateX();
    } else if (mode === "expect-gen-x") {
      Expect_GenerateX();
    } else {
      // ถ้ามี mode อื่นๆ เพิ่มได้ที่นี่
      setOutputText("โหมดนี้ยังไม่รองรับ");
    }
    setConverted(true);
  };

  const createNumber_Step = () => {
    const lines = inputText.split("\n");

    const filteredLines = lines.filter((line) => line.trim() !== ""); // ตัดบรรทัดว่างทั้งหมด

    const converted = filteredLines
      .map((line, index) => `${index + 1}. ${line.trim()}`) // ลำดับเลข และ trim ช่องว่าง
      .join("\n");

    setOutputText(converted);
  };

  const SortNumber = () => {
    const lines = inputText.split("\n");

    const numberedLines = [];
    const positions = [];

    // เก็บเฉพาะบรรทัดที่มีเลขนำหน้า
    lines.forEach((line, index) => {
      const match = line.match(/^(\d+)\.\s*(.*)$/);
      if (match) {
        numberedLines.push(match[2]); // เฉพาะเนื้อหา ไม่เอาเลขเก่า
        positions.push(index); // จำตำแหน่งไว้
      }
    });

    // สร้างบรรทัดใหม่ด้วยเลขเรียงลำดับ แล้วแทนที่ใน lines
    numberedLines.forEach((text, i) => {
      lines[positions[i]] = `${i + 1}. ${text}`;
    });

    setOutputText(lines.join("\n"));
  };

  const Step_GenerateX = () => {
    const lines = inputText.split("\n");
    let numbering = 0;

    const output = lines.map((line) => {
      // ตรวจสอบบรรทัดที่ขึ้นต้นด้วยเลขลำดับ เช่น 1.  หรือ 1.1.2.
      if (/^\s*\d+(?:\.\d+)*\.?\s+/.test(line)) {
        numbering++;
        // ตัดเลขเดิมออก (เลข + จุด + เว้นวรรค)
        const textWithoutNumber = line.replace(/^\s*\d+(?:\.\d+)*\.?\s+/, "");
        // ดึงช่องว่างต้นบรรทัด (ถ้ามี)
        const indentMatch = line.match(/^(\s*)/);
        const indent = indentMatch ? indentMatch[1] : "";
        // ประกอบบรรทัดใหม่
        return `${indent}<x>.${numbering} ${textWithoutNumber}`;
      } else {
        // บรรทัดไม่ใช่เลขลำดับ ให้คงเดิม
        return line;
      }
    });

    const convertedText = output.join("\n");
    setOutputText(convertedText);
  };

  const Expect_GenerateX = () => {
    const lines = inputText.split("\n");

    const output = lines.map((line) => {
      // แปลงเฉพาะบรรทัดที่ขึ้นต้นด้วยเลขลำดับ เช่น 1., 4.1, 5.2.3
      return line.replace(
        /^(\s*)(\d+(?:\.\d+)*)(\.?)(\s+)/,
        (match, indent, num, dot, space) => {
          return `${indent}<x>.${num}${space}`;
        }
      );
    });

    const convertedText = output.join("\n");
    setOutputText(convertedText);
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

  return (
    <div className="p-6 space-y-4">
      <div>
        <label className="font-semibold mr-2">Select Mode: </label>
        <select
          value={mode}
          onChange={handleModeChange}
          className="border p-2 rounded"
        >
          <option value="create-number-step">Create Number Step</option>
          <option value="sort-number">Sort Number Step</option>
          <option value="step-gen-x">Generate X Step</option>
          <option value="expect-gen-x">Generate X Expect</option>
        </select>
      </div>
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
    </div>
  );
}

export default StepCreate;
