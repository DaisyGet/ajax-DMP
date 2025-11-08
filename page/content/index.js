/**
 * 目标1：获取文章列表并展示
 *  1.1 准备查询参数对象
 *  1.2 获取文章列表数据
 *  1.3 展示到指定的标签结构中
 */
const query = {
  status: "",
  channel_id: "",
  page: 1,
  per_page: 2,
};
let pages = 0;

function toggle() {
  axios({
    url: "/v1_0/mp/articles",
    method: "GET",
    params: query,
  })
    .then((res) => {
      // console.log(res);
      const { page, per_page: perp, results, total_count } = res;
      if (perp > 0) {
        pages = Math.ceil(total_count / perp);
      }
      document.querySelector(".page-item.page-now").innerHTML = `第${page}页`;
      document.querySelector(".total-count").innerHTML = `共${pages}页`;
      document.querySelector(".art-list").innerHTML = results
        .map((item) => {
          let state = "";
          if (item.status === "1") {
            state = '<span class="badge text-bg-success">待审核</span>';
          } else {
            state = '<span class="badge text-bg-success">审核通过</span>';
          }
          return `
              <tr>
                <td>
                  <img
                    src= ${item.cover.images}
                    alt="">
                </td>
                <td>${item.title}</td>
                <td>${state}</td>
                <td>
                  <span>${item.pubdate}</span>
                </td>
                <td>
                  <span>${item.read_count}</span>
                </td>
                <td>
                  <span>${item.comment_count}</span>
                </td>
                <td>
                  <span>${item.like_count}</span>
                </td>
                <td data-id=${item.id}>
                  <i class="bi bi-pencil-square edit"></i>
                  <i class="bi bi-trash3 del" ></i>
                </td>
              </tr>
          `;
        })
        .join("");
    })
    .catch((err) => {
      console.log(err.response.data.message);
    });
}
toggle();
/**
 * 目标2：筛选文章列表
 *  2.1 设置频道列表数据
 *  2.2 监听筛选条件改变，保存查询信息到查询参数对象
 *  2.3 点击筛选时，传递查询参数对象到服务器
 *  2.4 获取匹配数据，覆盖到页面展示
 */
(function () {
  axios({
    url: "/v1_0/channels",
    method: "GET",
  })
    .then((res) => {
      // console.log(res);
      document.querySelector(".form-select").innerHTML =
        '<option selected="">请选择文章频道</option>' +
        res.channels
          .map((item) => {
            return `<option value="${item.id}">${item.name}</option>`;
          })
          .join("");
    })
    .catch((err) => {
      console.log(err.response.data.message);
    });
})();

document.querySelector(".sel-btn").addEventListener("click", () => {
  // console.log("11");
  const form = document.querySelector(".sel-form");
  let param = serialize(form, { hash: true, empty: true });
  // console.log(param);
  // if()
  query.channel_id = param.channel_id;
  query.status = param.status;
  query.page = 1;
  toggle();
});
/**
 * 目标3：分页功能
 *  3.1 保存并设置文章总条数
 *  3.2 点击下一页，做临界值判断，并切换页码参数并请求最新数据
 *  3.3 点击上一页，做临界值判断，并切换页码参数并请求最新数据
 */
document.querySelector(".last").addEventListener("click", () => {
  if (query.page - 1 > 0) {
    query.page--;
    toggle();
  }
});
document.querySelector(".next").addEventListener("click", () => {
  if (query.page + 1 <= pages) {
    query.page++;
    toggle();
  }
});
/**
 * 目标4：删除功能
 *  4.1 关联文章 id 到删除图标
 *  4.2 点击删除时，获取文章 id
 *  4.3 调用删除接口，传递文章 id 到服务器
 *  4.4 重新获取文章列表，并覆盖展示
 *  4.5 删除最后一页的最后一条，需要自动向前翻页
 */
document.querySelector(".art-list").addEventListener("click", async (e) => {
  if (e.target.classList.contains("del")) {
    const delid = e.target.parentNode.dataset.id;
    const res = await axios({
      url: `/v1_0/mp/articles/:${delid}`,
      method: "DELETE",
    });
    if (query.page === pages && query.per_page === 1 && pages > 1) {
      document.querySelector(".last").click();
    }

    toggle();
  }
});

// 点击编辑时，获取文章 id，跳转到发布文章页面传递文章 id 过去
