await Deno.writeTextFile(
  "./template.ts",
  `export default \`${await Deno.readTextFile("./template.html")}\``,
)

console.log("Copied template.html to template.ts")
