export const SortNumber = (input) => {
  const lines = input.split("\n");

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

  return lines.join("\n");
};
