export const Step_GenerateX = (input, useToggle) => {
  const lines = input.split("\n");
  let numbering = 0;
  let output;

  // Updated regex: match "1. test", "1.test", "  1.test", etc.
  const stepRegex = /^\s*\d+(?:\.\d+)*\.?/;

  if (useToggle === true) {
    output = lines.map((line) => {
      if (stepRegex.test(line)) {
        numbering++;
        const textWithoutNumber = line.replace(/^\s*\d+(?:\.\d+)*\.?\s*/, "");
        return `  <x>.${numbering} ${textWithoutNumber}`;
      } else {
        return line;
      }
    });
  }
  // else if (useToggle === false) { //ทุกบรรทัดเริ่มต้นด้วย space แรกเหมือนกันทั้งหมด
  //   output = lines.map((line) => {
  //     if (stepRegex.test(line)) {
  //       numbering++;
  //       const textWithoutNumber = line.replace(/^\s*\d+(?:\.\d+)*\.?\s*/, "");
  //       return `<x>.${numbering} ${textWithoutNumber.trim()}`;
  //     } else {
  //       return line.trim(); // ตัดช่องว่างหน้าหลังสำหรับบรรทัดอื่นด้วย
  //     }
  //   });
  // }
  else if (useToggle === false) { //บรรทัดหัวข้อสามารถชยับ space ได้ตามใจ
    output = lines.map((line) => {
      if (stepRegex.test(line)) {
        numbering++;
        const textWithoutNumber = line.replace(/^\s*\d+(?:\.\d+)*\.?\s*/, "");
        return `<x>.${numbering} ${textWithoutNumber.trim()}`;
      } else {
        // คงช่องว่างหน้าไว้สำหรับข้อความทั่วไป
        return line;
      }
    });
  } else {
    throw new Error("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
  }

  return output.join("\n");
};
