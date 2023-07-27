import { useState, useEffect } from 'react';

import Todo from './components/Todo';

import { Plus } from 'react-feather';

import { db } from "./firebase";

import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc
} from "firebase/firestore"

const style = {
  bg: `flex h-screen w-screen bg-no-repeat bg-cover bg-center bg-fixed bg-[url("./assets/images/background.png")]`,
  container_parent: `flex m-auto justify-center items-center`,
  container_bg: `absolute flex flex-col m-auto bg-[#393A35] max-w-[90vh] w-full h-[55vh] m-auto text-[#E8E9EA] rounded-3xl shadow-2xl text-center opacity-70`,
  container: `relative flex flex-col m-auto justify-center items-center font-['Inter'] text-[#E8E9EA] text-center`,
  headings: `p-6`,
  title: `text-4xl font-extrabold`,
  subtitle: `text-xl font-medium `,
  form: `flex justify-center items-center w-full mb-4 pb-4`,
  input: `border p-2 h-auto w-9/12 text-xl peer rounded-lg border-blue-gray-200 bg-transparent px-3 py-2.5 text-sm font-normal text-[#E8E9EA] outline outline-1 transition-all placeholder-shown:border placeholder-shown:border-[#E8E9EA] placeholder-shown:border-t-[#E8E9EA] focus:border-2 focus:border-[#FFE768] focus:outline-0 disabled:border-0 disabled:bg-[#E8E9EA]`,
  button: `h-auto border outline-none border-none p-4 ml-2 bg-[#FFE768] rounded-full transition ease-in hover:scale-110 duration-400`,
  count: `text-center font-semibold	 p-2 text-1xl text-[#E8E9EA]`,
  ul: `flex flex-col w-full justify-center items-center`
};

function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('');


  // create to-do
  const createTodo = async (e) => {
    e.preventDefault(e);
    if(input === '') {
      alert('')
      return
    }
    await addDoc(collection(db, 'todos'), {
      text: input,
      completed: false,
    })
    setInput('')
  };


  // read to-do from firebase
  useEffect(() => {
    const q = query(collection(db, 'todos'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = []
      querySnapshot.forEach((doc) => {
        todosArr.push({...doc.data(), id: doc.id})
      });
      setTodos(todosArr)
    })
    return() => unsubscribe()
  }, [])

  // update to do in firebase
  const toggleComplete = async (todo) => {
    await updateDoc (doc(db, 'todos', todo.id), {
      completed: !todo.completed
    })
  }
  // delete to do
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id))
  }

  return (
    <div className={style.bg}>
        <div className={style.container_parent}>
        <div className={style.container_bg}></div>
          <div className={style.container}>
            <div className={style.headings}>
            <h1 className={style.title}>afazinhos! ⭐</h1>
            <h3 className={style.subtitle}>te ajudando a fazer um afazer de cada vez.</h3>
            </div>
            <form onSubmit={createTodo} className={style.form}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
                className={style.input}
                placeholder='adicionar novo afazer'
              />
              <button className={style.button}><Plus size={22} color='#393A35'/></button>
            </form>
            <ul className={style.ul}>
              {todos.map((todo, index) => (
                <Todo
                  key={index}
                  todo={todo}
                  toggleComplete={toggleComplete}
                  deleteTodo={deleteTodo}
                />
              ))}
            </ul>

            {todos.length < 1 ? null : 
            <p className={style.count}>{`você tem ${todos.length} afazer(es).`}</p>
            }
            </div> 
          </div>   
    </div>
  );
}

export default App;