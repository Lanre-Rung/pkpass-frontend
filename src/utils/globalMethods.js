export default {
  async processPass(file, context) {
    try {
      // 检查是否为 pkpass 文件
      if (!context.isPkpassFile(file)) {
        throw new Error("文件类型无效。期望的是一个 .pkpass 文件。");
      }

      // 提取文件（使用 JSZip 库）
      const pkpassContent = await this.extractZipFile(file);

      // 创建 pkpass 对象并填充内容
      const pkpass = this.createPkpassObject(pkpassContent);

      // 返回 pkpass 对象
      return pkpass;
    } catch (error) {
      // 这里可以处理具体的错误情况，例如打印日志或通知用户
      console.error(error);
      // 根据需要抛出错误或处理错误
      throw error; // 可以选择重新抛出错误，以便调用者可以进一步处理
    }
  },

  isPkpassFile(file) {
    // 实现逻辑以检查文件是否为 .pkpass 文件
    // 这可能基于文件扩展名、MIME 类型或其他特征
    return file.name.endsWith(".pkpass");
  },

  async extractZipFile(zipFile) {
    const JSZip = require("jszip");

    try {
      // Load the zip file
      const zip = await JSZip.loadAsync(zipFile);

      // Create an array to hold all the promises
      const contentPromises = [];

      // Use forEach to iterate over the zip entries and push the promises to the array
      zip.forEach((relativePath, zipEntry) => {
        if (!zipEntry.dir) {
          // Push the promise to the array
          contentPromises.push(
            zipEntry.async("base64").then((base64) => ({
              path: relativePath,
              base64: base64,
            }))
          );
        }
      });

      // Wait for all promises to resolve
      const content = await Promise.all(contentPromises);

      // Convert the array of objects into an object with paths as keys
      const contentObject = content.reduce((acc, file) => {
        acc[file.path] = file.base64;
        return acc;
      }, {});

      return contentObject;
    } catch (error) {
      throw new Error("解压文件失败：" + error.message);
    }
  },

  async createPkpassObject(content) {
    // 实现逻辑以迭代内容并创建 pkpass 对象
    const pkpass = {};
    for (const path in content) {
      if (content.hasOwnProperty(path)) {
        const buffer = Buffer.from(path, "base64");

        if (path.endsWith(".png")) {
          pkpass[path] = content[path];
        } else if (path.endsWith(".json")) {
          let encodedString = content[path];
          let bytes = Uint8Array.from(atob(encodedString), (c) =>
            c.charCodeAt(0)
          ); 
          let decodedString = new TextDecoder("utf-8").decode(bytes); 
          let jsonData = JSON.parse(decodedString);

          pkpass[path] = jsonData;
        }
        // 根据需要添加其他文件类型
      }
    }
    return pkpass;
  },
};
