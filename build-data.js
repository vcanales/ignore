const { readFileSync, promises: fs } = require("fs");
const path = require("path");

async function list() {
  async function getFileContent(filePath) {
    const content = await readFileSync(path.resolve(filePath), "utf8");
    return {
      name: filePath.replace(".gitignore", "").split("/").pop(),
      filePath: filePath.replace(`${__dirname}/`, ""),
      content,
    };
  }
  async function getFiles(dir) {
    const dirents = await fs.readdir(dir, { withFileTypes: true });
    const files = await Promise.all(
      dirents
        .filter((dirent) => !dirent.name.endsWith(".git"))
        .map((dirent) => {
          const res = path.resolve(dir, dirent.name);
          return dirent.isDirectory() ? getFiles(res) : getFileContent(res);
        })
    );
    return Array.prototype
      .concat(...files)
      .filter((file) => file.filePath.endsWith(".gitignore"));
  }

  const data = await getFiles("gitignore");

  // write to file
  await fs.writeFile(path.resolve("data.json"), JSON.stringify(data, null, 2));
}

list();
