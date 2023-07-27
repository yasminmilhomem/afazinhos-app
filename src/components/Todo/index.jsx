import { Trash } from 'react-feather';

const style = {
  li: `flex w-full justify-center items-center mb-4 capitalize`,
  row: `flex w-9/12 bg-[#E8E9EA] p-4 text-[#393A35] rounded-lg font-semibold cursor-pointer`,
  rowComplete: `flex w-9/12 bg-[#717171] p-4 text-[#393A35] rounded-lg font-semibold cursor-pointer`,
  text: `ml-4 text-lg cursor-pointer`,
  textComplete: `ml-4 text-lg cursor-pointer line-through`,
  button: `h-auto p-4 ml-2 border outline-none border-none bg-[#FFE768] rounded-full transition ease-in hover:opacity-70 duration-400`,
};

const Todo = ({ todo, toggleComplete, deleteTodo }) => {
  return (
    <li className={style.li}>
      <div onClick={() => toggleComplete(todo)} className={todo.completed ? style.rowComplete : style.row}>
        <input onChange={() => toggleComplete(todo)} type="checkbox" checked={todo.completed ? 'checked' : ''} />
        <p className={todo.completed ? style.textComplete : style.text}>{todo.text}</p>
      </div>
      <button onClick={() => deleteTodo(todo.id)} className={style.button} >{<Trash color='#393A35' />}</button>
    </li>
  )
}

export default Todo