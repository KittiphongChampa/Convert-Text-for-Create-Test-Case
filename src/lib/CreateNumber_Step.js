export const CreateNumber_Step = (input) => {
  const lines = input.split("\n").filter((line) => line.trim() !== "");
  return lines.map((line, i) => `${i + 1}. ${line.trim()}`).join("\n");
};
