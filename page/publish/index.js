/**
 * 目标1：设置频道下拉菜单
 *  1.1 获取频道列表数据
 *  1.2 展示到下拉菜单中
 */
(() => {
  axios({
    url: "/v1_0/channels",
    method: "GET",
  }).then((res) => {
    // console.log(res);
    const chna =
      '<option value="" selected="">请选择文章频道</option>' +
      res.channels
        .map((item) => {
          return `<option value=${item.id}>${item.name}</option>`;
        })
        .join("");
    // console.log(chna);
    document.getElementById("channel_id").innerHTML = chna;
    // document.getElementById("channel_id").value = "2";
  });
})();
/**
 * 目标2：文章封面设置
 *  2.1 准备标签结构和样式
 *  2.2 选择文件并保存在 FormData,键值对集合前端处理表单提交、文件上传的常用工具
 *  2.3 单独上传图片并得到图片 URL 网址
 *  2.4 回显并切换 img 标签展示（隐藏 + 号上传标签）
 */
document.querySelector(".img-file").addEventListener("change", (e) => {
  // console.dir(e.target);
  // e.target.files[0];
  const file = e.target.files[0];
  const fd = new FormData();
  //Array: push , object :append
  fd.append("image", file);
  axios({
    url: "/v1_0/upload",
    method: "POST",
    data: fd,
  }).then((res) => {
    const img = document.querySelector(".rounded");
    img.src = res.url;
    img.classList.add("show");
    document.querySelector(".place").classList.add("hide");
  });

  document.querySelector(".rounded").addEventListener("click", () => {
    document.querySelector(".img-file").click();
  });
  // axios({
  //   url: "/v1_0/upload",
  //   method: "POST",
  //   data: {
  //     image:
  //   },
  // });
});

/**
 * 目标3：发布文章保存
 *  3.1 基于 form-serialize 插件收集表单数据对象
 *  3.2 基于 axios 提交到服务器保存
 *  3.3 调用 Alert 警告框反馈结果给用户
 *  3.4 重置表单并跳转到列表页
 */
document.querySelector(".send").addEventListener("click", () => {
  const form = document.querySelector(".art-form");
  let data = serialize(form, { hash: true, empty: true });
  delete data.id;
  data.cover = {
    type: 1,
    images: [document.querySelector(".rounded").src],
  };
  // console.log(data);
  axios({
    url: "/v1_0/mp/articles",
    method: "POST",
    data: data,
  })
    .then((res) => {
      myAlert(true, "发布成功");
      const form = document.querySelector(".art-form");
      form.reset();
      editor.setHtml("");
      const img = document.querySelector(".rounded");
      img.src = "";
      img.classList.remove("show");
      document.querySelector(".place").classList.remove("hide");

      setTimeout(() => {
        location.href = "../content/index.html";
      }, 5000);
    })
    .catch((err) => {
      myAlert(false, err.response.data.message);
    });
});
/**
 * 目标4：编辑-回显文章
 *  4.1 页面跳转传参（URL 查询参数方式）
 *  4.2 发布文章页面接收参数判断（共用同一套表单）
 *  4.3 修改标题和按钮文字
 *  4.4 获取文章详情数据并回显表单
 */

/**
 * 目标5：编辑-保存文章
 *  5.1 判断按钮文字，区分业务（因为共用一套表单）
 *  5.2 调用编辑文章接口，保存信息到服务器
 *  5.3 基于 Alert 反馈结果消息给用户
 */
