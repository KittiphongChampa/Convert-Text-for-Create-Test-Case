export const Step_GenerateX = (input, useToggle) => {
  const lines = input.split("\n");
  let numbering = 0;
  let output;
  if (useToggle === true) {
    output = lines.map((line) => {
      if (/^\s*\d+(?:\.\d+)*\.?\s+/.test(line)) {
        numbering++;
        const textWithoutNumber = line.replace(/^\s*\d+(?:\.\d+)*\.?\s+/, "");
        return `  <x>.${numbering} ${textWithoutNumber}`;
      } else {
        return line;
      }
    });
  } else if (useToggle === false) {
    output = lines.map((line) => {
      if (/^\s*\d+(?:\.\d+)*\.?\s+/.test(line)) {
        numbering++;
        const textWithoutNumber = line.replace(/^\s*\d+(?:\.\d+)*\.?\s+/, "");
        const indentMatch = line.match(/^(\s*)/);
        const indent = indentMatch ? indentMatch[1] : "";
        return `${indent}<x>.${numbering} ${textWithoutNumber}`;
      } else {
        return line;
      }
    });
  } else {
    throw new Error("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
  }

  return output.join("\n");
};
