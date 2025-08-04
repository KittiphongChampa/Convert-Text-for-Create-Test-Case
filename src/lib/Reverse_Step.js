export const Reverse_Step = (input) => {
  const lines = input.split("\n");
  const output = [];

  let counter = 1;

  const headerRegex = /^(\d+)\.\s*(.+?)\s*:?$/; // รองรับมีหรือไม่มีช่องว่าง, และมีหรือไม่มี :
  const subStepRegex = /^\s*\d+\.\d+(?:\.\d+)*\s+(.*)/; // รองรับ 1.1, 1.1.1, ...

  lines.forEach((line) => {
    const headerMatch = line.match(headerRegex);
    const subStepMatch = line.match(subStepRegex);

    if (headerMatch && !subStepMatch) {
      // หัวข้อหลัก เช่น "3.Notification for Card B :" หรือ "3. Notification for Card B"
      const title = headerMatch[2].trim();
      output.push(`${title} :`);
    } else if (subStepMatch) {
      // หัวข้อย่อย เช่น " 1.1 Some step"
      const content = subStepMatch[1].trim();
      output.push(`${counter}. ${content}`);
      counter++;
    } else {
      // อื่นๆ ส่งออกตรง ๆ
      output.push(line);
    }
  });

  return output.join("\n");
};
