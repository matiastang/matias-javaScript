/*
 * @Author: tangdaoyong
 * @Date: 2021-02-08 10:32:04
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-02-08 13:42:58
 * @Description: 模板生成html
 */
// #include <stdio.h>

// int main(int argc, char ** argv) {
//   printf("Hello WebAssembly");
// }
#include <stdio.h>
#include <emscripten/emscripten.h>

int main(int argc, char ** argv) {
    printf("Hello WebAssembly\n");
}

#ifdef __cplusplus
extern "C" {
#endif

int EMSCRIPTEN_KEEPALIVE myFunction(int argc, char ** argv) {
  printf("我的函数已被调用\n");
}

#ifdef __cplusplus
}
#endif