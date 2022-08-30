import React, { useState, useEffect } from "react";
import "./style.scss";
import todoApi from "./api/todoApi";
import ShowList from "./component/ShowList";
import Check from "./component/checkError";
import FormSubmitTodo from "./component/formSubmitTodo";
import Loading from "./component/Loading";
import Paging from "./component/Paging";
import SearchTodo from "./component/SearchTodo";
const LinkImg =
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/756881/laptop.svg";
function TodoApp() {
  const [data, SetData] = useState([]);
  const [input, setInput] = useState([]);
  const [checkError, setCheckError] = useState("");
  const [checkUpdate, StetCheckUpdate] = useState(false);
  const [checkLoadding, SetCheckLoadding] = useState();
  const [pageRes, setPageRes] = useState({
    searchParam: "",
    PageNumber: 1,
    PageSize: 5,
  });
  const [page, setPage] = useState({});
  // đây là phần call api từ server về
  useEffect(() => {
    const fetchTodoApi = async () => {
      try {
        SetCheckLoadding((prev) => false);
        let data = await todoApi.getAll(pageRes);

        SetData(data.todos);
        console.log(data);
        setPage(data.pageRes);
        SetCheckLoadding((prev) => true);
      } catch (error) {
        console.log("Failed to fetch product list: ", error);
        alert("lối kết nối với server");
        SetCheckLoadding((prev) => true);
      }
    };
    fetchTodoApi();
  }, [pageRes]);
  useEffect(() => {
    StetCheckUpdate(false);
  }, [checkUpdate]);
  const changeInput = (event) => {
    setInput((prev) => (prev = event.target.value));
  };
  // thêm mới
  const submitForm = (event) => {
    if (event.preventDefault) event.preventDefault();
    const fetchTodoApi = async () => {
      try {
        SetCheckLoadding((prev) => (prev = false));
        const dataRes = await todoApi.Posttodo({
          nameTodo: input,
          isomplete: false,
        });
        console.log(dataRes);
        SetData((prev) => (prev = [dataRes, ...prev]));
        setInput("");
        SetCheckLoadding((prev) => (prev = true));
      } catch (error) {
        SetCheckLoadding((prev) => (prev = true));
        setCheckError("Thêm thất bại");
        console.log(error);
      }
    };
    fetchTodoApi();
  };

  // xóa bạn ơi
  const DleInput = (id) => {
    let checkDle = window.confirm(
      "bạn có muốn xóa thật không đây là thao tác không thể hoàn tác"
    );
    if (checkDle) {
      const fetchTodoApi = async (id) => {
        try {
          SetCheckLoadding((prev) => (prev = false));
          const data = await todoApi.DleTodo(id);
          SetData((prev) => (prev = prev.filter((x) => x.id !== id)));
          SetCheckLoadding((prev) => (prev = true));
        } catch (error) {
          SetCheckLoadding((prev) => (prev = true));
          console.log(error);
        }
      };
      fetchTodoApi(id);
    }
  };
  // sửa
  const ChangeStatusUpdate = (datas) => {
    const fetchApiTodo = async (datas) => {
      try {
        SetCheckLoadding((prev) => (prev = false));
        const resApiUpdate = await todoApi.updateStatus(datas);
        let index = data.findIndex((x) => x.id === resApiUpdate.id);

        SetData((x) => {
          x[index] = resApiUpdate;
          return x;
        });
        SetCheckLoadding((prev) => (prev = true));
        StetCheckUpdate(true);
      } catch (error) {
        console.log(error);
        SetCheckLoadding((prev) => (prev = true));
      }
    };
    fetchApiTodo(datas);
  };

  return (
    <>
      <section className="container">
        <div className="heading">
          <img className="heading__img" src={LinkImg} />
          <h1 className="heading__title">To-Do List</h1>
        </div>

        <FormSubmitTodo
          inputChange={input}
          onInputChange={changeInput}
          onSubmit={submitForm}
        />
        {checkLoadding ? "" : <Loading />}
        <Check errors={checkError} onSetCheckError={setCheckError} />
        <SearchTodo onPage={setPageRes} pageRes={pageRes} />
        <div>
          <h1>Các công việc cần phải hoàn thành </h1>
          <ul className="toDoList">
            <ShowList
              listTodo={data}
              onDle={DleInput}
              onStatus={(val) => ChangeStatusUpdate(val)}
            />
          </ul>
          <Paging resPage={page} onPage={setPageRes} />
        </div>
      </section>
    </>
  );
}

export default TodoApp;
