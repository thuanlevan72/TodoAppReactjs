import React, { useState, useEffect } from "react";
import "./style.scss";
import todoApi from "./api/todoApi";
import ShowList from "./component/ShowList";
import Check from "./component/checkError";
import FormSubmitTodo from "./component/formSubmitTodo";
const LinkImg =
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/756881/laptop.svg";
function TodoApp() {
  const [data, SetData] = useState([]);
  const [input, setInput] = useState([]);
  const [checkError, setCheckError] = useState("");
  const [checkUpdate, StetCheckUpdate] = useState(false);
  // đây là phần call api từ server về
  useEffect(() => {
    const fetchTodoApi = async () => {
      try {
        const params = {
          //   PageNumber: 1,
          //   PageSize: 4,
        };

        let data = await todoApi.getAll(params);

        SetData(data.todos);
        console.log(data);
        StetCheckUpdate(false);
      } catch (error) {
        console.log("Failed to fetch product list: ", error);
      }
    };
    fetchTodoApi();
  }, [checkUpdate]);
  // useEffect(() => {
  //   console.log(data);
  // }, [data]);
  const changeInput = (event) => {
    setInput((prev) => (prev = event.target.value));
  };
  // thêm mới
  const submitForm = (event) => {
    if (event.preventDefault) event.preventDefault();
    const fetchTodoApi = async () => {
      try {
        const dataRes = await todoApi.Posttodo({
          nameTodo: input,
          isomplete: false,
        });
        console.log(dataRes);
        SetData((prev) => (prev = [dataRes, ...prev]));
        setInput("");
      } catch (error) {
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
          let data = await todoApi.DleTodo(id);

          alert(data);
          SetData((prev) => (prev = prev.filter((x) => x.id !== id)));
        } catch (error) {
          console.log(error);
        }
      };
      fetchTodoApi(id);
    }
  };
  // sửa
  const ChangeStatusUpdate = (data) => {
    const fetchApiTodo = async (data) => {
      try {
        const resApiUpdate = await todoApi.updateStatus(data);
        console.log(resApiUpdate);
      } catch (error) {
        console.log(error);
      }
    };
    fetchApiTodo(data);
    StetCheckUpdate(true);
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
        <Check errors={checkError} onSetCheckError={setCheckError} />
        <div>
          <h1>Các công việc cần phải hoàn thành </h1>
          <ul className="toDoList">
            <ShowList
              listTodo={data}
              onDle={DleInput}
              onStatus={(val) => ChangeStatusUpdate(val)}
            />
          </ul>
        </div>
      </section>
    </>
  );
}

export default TodoApp;
