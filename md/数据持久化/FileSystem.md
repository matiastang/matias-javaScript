<!--
 * @Author: matiastang
 * @Date: 2022-07-25 11:10:56
 * @LastEditors: matiastang
 * @LastEditTime: 2022-07-25 11:13:56
 * @FilePath: /matias-javaScript/md/数据持久化/FileSystem.md
 * @Description: FileSystem
-->
# FileSystem

[文件系统访问](https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API)

通过 FileSystem API, Web 应用就可以创建、读取、导航用户本地文件系统中的沙盒部分以及向其中写入数据。

API 被分为以下不同的主题：

读取和处理文件：File/Blob、FileList、FileReader
创建和写入：BlobBuilder、FileWriter
目录和文件系统访问：DirectoryReader、FileEntry/DirectoryEntry、LocalFileSystem
FileSystem API 是非标准 API。在发布环境因慎重使用，因为并是所有的浏览器都支持，实现方式可能存在很大的不兼容性，并且在将来可能也会发生变化。