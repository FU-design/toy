// router.beforeEach((_to, _from, next) => {
// if (to.name != "LoginChat") {
//   const auth = localStorage.getItem("auth");
//   if (auth) {
//     const { chatInfo } = JSON.parse(auth);
//     if (chatInfo.chatCode && chatInfo.chatName && chatInfo.token) {
//       next();
//     } else {
//       next({ name: "LoginChat" });
//     }
//   } else {
//     next({ name: "LoginChat" });
//   }
// } else {
//   next();
// }
// next();
// });
