import React, { useState, useEffect, useReducer } from "react";
import {Todo} from './components/todo';
import {Incomplete} from './components/incomplete';
import {Complete} from './components/complete';
import {ButtonAppBar} from './components/header';


import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const APP_KEY = 'sampleApp'

function App() {

  //ローカルストレージ
  const appState = localStorage.getItem(APP_KEY)
  const initialState = appState ? JSON.parse(appState) : {
    events: []
  }

  const [state, dispatch] = useReducer(reducer, initialState)
  useEffect(() => {
    localStorage.setItem(APP_KEY, JSON.stringify(state))
  }, [todo, incomplete, complete])

  const [todo,setTodo] = useState("");
  const [incomplete,setIncomplete] = useState([]);
  const [complete,setComplete] = useState([]);

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
