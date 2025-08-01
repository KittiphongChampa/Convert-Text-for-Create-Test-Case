export const Expect_GenerateX = (input, useToggle) => {
  const lines = input.split("\n");
  let output;

  if (useToggle === true) {
    const newLines = [...lines];
    const stepRegex = /^(\s*)(\d+(?:\.\d+)*)(\.?)(\s*)(.*)/;

    let currentMainNumber = null;
    let currentMainIndex = -1;
    let subItems = [];

    const reorderSubItems = () => {
      if (currentMainNumber === null) return;

      let subSubCounters = {};

      subItems.forEach((item, idx) => {
        const parts = item.number.split(".");
        const depth = parts.length;
        const indent = "  ".repeat(depth); // <= เดิมผิดตรงนี้

        if (depth === 2) {
          const newNumber = `${currentMainNumber}.${idx + 1}`;
          newLines[item.idx] = `  ${"  ".repeat(
            depth - 1
          )}<x>.${newNumber} ${item.content.trim()}`;
        } else if (depth > 2) {
          const parentNumber = parts.slice(0, parts.length - 1).join(".");
          subSubCounters[parentNumber] = subSubCounters[parentNumber] || 0;
          subSubCounters[parentNumber]++;
          const newNumber = `${parentNumber}.${subSubCounters[parentNumber]}`;
          newLines[item.idx] = `  ${"  ".repeat(
            depth - 1
          )}<x>.${newNumber} ${item.content.trim()}`;
        }
      });

      subItems = [];
    };

    lines.forEach((line, idx) => {
      const match = line.match(stepRegex);
      if (!match) {
        reorderSubItems();
        currentMainNumber = null;
        currentMainIndex = -1;
        return;
      }

      const [, , number, , , content] = match;
      const parts = number.split(".");
      const depth = parts.length;

      if (depth === 1) {
        reorderSubItems();
        currentMainNumber = parts[0];
        currentMainIndex = idx;
        newLines[idx] = `  <x>.${currentMainNumber} ${content.trim()}`;
      } else if (depth > 1 && currentMainNumber === parts[0]) {
        subItems.push({
          idx,
          number,
          content,
        });
      } else {
        reorderSubItems();
        currentMainNumber = parts[0];
        currentMainIndex = idx;
        newLines[idx] = `  <x>.${number} ${content.trim()}`;
      }
    });

    reorderSubItems();

    output = newLines;
  } else if (useToggle === false) {
    const newLines = [...lines];
    const stepRegex = /^(\s*)(\d+(?:\.\d+)*)(\.?)(\s*)(.*)/;

    let currentMainNumber = null;
    let currentMainIndex = -1;
    let subItems = [];

    // รีเลขย่อยระดับ 2 และระดับลึกกว่า (โดยรักษาเลขพาเรนต์)
    const reorderSubItems = () => {
      if (currentMainNumber === null) return;

      // ตัวแปรเก็บลำดับของ sub-sub-items
      let subSubCounters = {};

      subItems.forEach((item, idx) => {
        const parts = item.number.split(".");
        const depth = parts.length;
        const indent = "  ".repeat(depth - 1); // depth=1 → 0 space, depth=2 → 2 space

        if (depth === 2) {
          // รีเลขย่อยระดับ 2 ตาม idx
          const newNumber = `${currentMainNumber}.${idx + 1}`;
          newLines[
            item.idx
          ] = `${indent}<x>.${newNumber} ${item.content.trim()}`;
        } else if (depth > 2) {
          // รักษาเลขพาเรนต์ เช่น 4.3 แล้วเติมเลขใหม่ตาม idx ในระดับสุดท้าย
          const parentNumber = parts.slice(0, parts.length - 1).join(".");
          subSubCounters[parentNumber] = subSubCounters[parentNumber] || 0;
          subSubCounters[parentNumber]++;
          const newNumber = `${parentNumber}.${subSubCounters[parentNumber]}`;
          newLines[
            item.idx
          ] = `${indent}<x>.${newNumber} ${item.content.trim()}`;
        }
      });

      subItems = [];
    };

    lines.forEach((line, idx) => {
      const match = line.match(stepRegex);
      if (!match) {
        reorderSubItems();
        currentMainNumber = null;
        currentMainIndex = -1;
        return;
      }

      const [, , number, , , content] = match;
      const parts = number.split(".");
      const depth = parts.length;

      if (depth === 1) {
        reorderSubItems();
        currentMainNumber = parts[0];
        currentMainIndex = idx;
        newLines[idx] = `<x>.${currentMainNumber} ${content.trim()}`;
      } else if (depth > 1 && currentMainNumber === parts[0]) {
        subItems.push({
          idx,
          number,
          content,
        });
      } else {
        reorderSubItems();
        currentMainNumber = parts[0];
        currentMainIndex = idx;
        newLines[idx] = `<x>.${number} ${content.trim()}`;
      }
    });

    reorderSubItems();

    output = newLines;
  } else {
    throw new Error("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
  }

  return output.join("\n");
};

// export const Expect_GenerateX = (input, useToggle) => {
//   const lines = input.split("\n");
//   let output;

//   if (useToggle === true) {
//     output = lines.map((line) => {
//       const match = line.match(/^(\s*)(\d+(?:\.\d+)*)(\.?)(\s+)/);
//       if (match) {
//         const [, , number, , space] = match;
//         const depth = number.split(".").length;

//         // คำนวณระยะ indent: 2 space ต่อระดับ (เริ่มที่ 1 = 2 space)
//         const indent = "  ".repeat(depth);

//         return line.replace(
//           /^(\s*)(\d+(?:\.\d+)*)(\.?)(\s+)/,
//           `${indent}<x>.${number}${space}`
//         );
//       }

//       return line; // ไม่ match → คงเดิม
//     });
//   } else if (useToggle === false) {
//     output = lines.map((line) => {
//       return line.replace(
//         /^(\s*)(\d+(?:\.\d+)*)(\.?)(\s+)/,
//         (match, indent, num, dot, space) => {
//           return `${indent}<x>.${num}${space}`;
//         }
//       );
//     });
//   } else {
//     throw new Error("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
//   }

//   return output.join("\n");
// };
