export const Reverse_Expect = (input) => {
  const lines = input.split("\n");
  const output = [];
  let currentSectionNumber = "";
  let subItemCounter = 1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // หัวข้อหลัก (ไม่มี indent)
    if (/^\d+\.\s/.test(line)) {
      // ตัดเลขออก เช่น "1. Database" => "Database"
      const text = line.replace(/^\d+\.\s*/, "");
      output.push(text);
      currentSectionNumber = ""; // reset
      subItemCounter = 1;
    }
    // หัวข้อรอง (เว้น 2 space)
    else if (/^  \d+\.\s/.test(line)) {
      // เช่น "  5. Displays ..." => คงไว้เหมือนเดิม
      const match = line.match(/^  (\d+)\./);
      if (match) {
        currentSectionNumber = match[1];
        subItemCounter = 1;
      }
      output.push(line);
    }
    // หัวข้อย่อยลึก (เว้น 4 space)
    else if (/^    \d+(\.\d+)+\s/.test(line)) {
      // เช่น "    1.1.1 test" => "    5.1 test"
      const content = line.replace(/^    \d+(\.\d+)+\s*/, "");
      const newLine = `    ${currentSectionNumber}.${subItemCounter} ${content}`;
      output.push(newLine);
      subItemCounter++;
    }
    // บรรทัดอื่น ๆ คงไว้
    else {
      output.push(line);
    }
  }

  return output.join("\n");
};
