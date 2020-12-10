import React, { useState} from "react";
import {Todo} from './components/todo';
import {Incomplete} from './components/incomplete';
import {Complete} from './components/complete';
import {ButtonAppBar} from './components/header';


import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';


function App() {

  const [todo, setTodo] = useLocalStorage("todo","");//todoって名前でlocalstrageに保存
  const [incomplete, setIncomplete] = useLocalStorage("incomplete",[]);//保存
  const [complete, setComplete] = useLocalStorage("complete", []);//保存

  const onChangeTodo = (event)=>{
    setTodo(event.target.value)
    //このtargetはイベントを発生させたオブジェクトへの参照。
  }

  //追加ボタンを押したときの処理
  const onClickAdd = ()=>{
    if(todo === "") return;
    const newTodo = [...incomplete, todo];
    setIncomplete(newTodo);
    setTodo("");
  }

  //削除ボタンを押したときの処理
  const onClickDelete = (index) => {
    const newInComplete = [...incomplete];
    newInComplete.splice(index, 1);
    setIncomplete(newInComplete);
  }

  //完了ボタンを押したときの処理
  const onClickComplete = (index)=>{
    const newInComplete = [...incomplete];//incompleteを直接いじりたくなってしまうが注意、配列（ステート）の更新は必ずsetStateで行う。
    newInComplete.splice(index,1);//index番目から１つ削除。
    setIncomplete(newInComplete);

    const newComplete = [...complete, incomplete[index]];
    //ここで上でsetIncompleteしているからincomplete配列の中身が減って番号変わっていてダメじゃないか思ったけど、setIncompleteしてもすぐにステートの値は変わらないからok
    setComplete(newComplete);
  }

  //戻すボタンを押したときの処理
  const onClickBack = (index)=>{
    const newComplete = [...complete];
    newComplete.splice(index,1);
    setComplete(newComplete);

    const newInComplete = [...incomplete,complete[index]]
    setIncomplete(newInComplete);
  }


  // useStateの値をlocalstrageに保存
  function useLocalStorage(key, initialValue) {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState(() => {
      try {
        // Get from local storage by key
        const item = window.localStorage.getItem(key);
        // Parse stored json or if none return initialValue
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        // If error also return initialValue
        console.log(error);
        return initialValue;
      }
    });

    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = value => {
      try {
        // Allow value to be a function so we have same API as useState
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        // Save state
        setStoredValue(valueToStore);
        // Save to local storage
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        // A more advanced implementation would handle the error case
        console.log(error);
      }
    };

    return [storedValue, setValue];
  }

  return (
    <div className="App">
      <CssBaseline />
      <ButtonAppBar/>
      <Container maxWidth="sm">
        <Todo onChangeTodo={onChangeTodo} todo={todo} onClickAdd={onClickAdd} />{/*ここvalue={inputとしていてエラーだった・・・}*/}
        <Incomplete incomplete={incomplete} onClickComplete={onClickComplete} onClickDelete={onClickDelete} />
        <Complete onClickBack={onClickBack} complete={complete} />
      </Container>
    </div>
  );
}

export default App;
