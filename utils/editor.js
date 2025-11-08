// 富文本编辑器
// 创建编辑器函数，创建工具栏函数
//解构
const { createEditor, createToolbar } = window.wangEditor;

const editorConfig = {
  placeholder: "Type here...",
  //当内容发生变化，获取对应的html元素，可以form表单提交
  onChange(editor) {
    const html = editor.getHtml();
    // console.log("editor content", html);
    // 也可以同步到 <textarea>
    document.querySelector(".publish-content").innerHTML = html;
    // document.querySelector(".publish-content").style.display = "none";
  },
};

//创建内容对象
const editor = createEditor({
  selector: "#editor-container",
  html: "<p><br></p>",
  config: editorConfig,
  mode: "default", // or 'simple'
});

//创建工具栏对象
const toolbarConfig = {};

//工具栏对象
const toolbar = createToolbar({
  editor,
  selector: "#toolbar-container",
  config: toolbarConfig,
  mode: "default", // or 'simple'
});
