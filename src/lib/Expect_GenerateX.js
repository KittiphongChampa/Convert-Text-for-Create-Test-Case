export const Expect_GenerateX = (input, useToggle) => {
  const lines = input.split("\n");
  let output;

  if (useToggle === true) {
    output = lines.map((line) => {
      const match = line.match(/^(\s*)(\d+(?:\.\d+)*)(\.?)(\s+)/);
      if (match) {
        const [, , number, , space] = match;
        const depth = number.split(".").length;

        // คำนวณระยะ indent: 2 space ต่อระดับ (เริ่มที่ 1 = 2 space)
        const indent = "  ".repeat(depth);

        return line.replace(
          /^(\s*)(\d+(?:\.\d+)*)(\.?)(\s+)/,
          `${indent}<x>.${number}${space}`
        );
      }

      return line; // ไม่ match → คงเดิม
    });
  } else if (useToggle === false) {
    output = lines.map((line) => {
      return line.replace(
        /^(\s*)(\d+(?:\.\d+)*)(\.?)(\s+)/,
        (match, indent, num, dot, space) => {
          return `${indent}<x>.${num}${space}`;
        }
      );
    });
  } else {
    throw new Error("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
  }

  return output.join("\n");
};
