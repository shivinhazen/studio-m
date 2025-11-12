import depcheck from "depcheck";

const IGNORE = new Set([
  "@axe-core/cli",
  "@lhci/cli",
  "@squoosh/cli",
  "@tailwindcss/postcss",
  "@types/react-dom",
  "depcheck",
  "tailwindcss",
  "tw-animate-css",
  "sharp",
]);

async function run() {
  const result = await depcheck(process.cwd(), {
    specials: [
      depcheck.special.eslint,
      depcheck.special.bin,
      depcheck.special.typescript,
      depcheck.special.next,
      depcheck.special.postcss,
    ],
  });

  const unused = [...result.dependencies, ...result.devDependencies].filter((dep) => !IGNORE.has(dep));

  if (unused.length) {
    console.error("Dependências possivelmente não utilizadas:", unused.join(", "));
    process.exitCode = 1;
    return;
  }

  console.log("Sem dependências órfãs. ✅");
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
