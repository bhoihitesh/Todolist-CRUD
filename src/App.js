import { useEffect, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { AiTwotoneDelete, AiFillEdit, AiFillEye, AiOutlineCheck } from 'react-icons/ai';
import './App.css'
const getLocalitems = () => {
  let list = localStorage.getItem('todoitems')
  if (list) {
    return JSON.parse(localStorage.getItem('todoitems'))
  }
  else {
    return []
  }
}

function App() {
  const [list, setList] = useState(getLocalitems())
  const [todo, setTodo] = useState("")
  const [isEdit, setIsEdit] = useState(null)
  const [toggel, setToggel] = useState(true)
  const [isView, setView] = useState(true)

  // import js from bootstrap
  useEffect(() => {
    import('../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js')
  }, [])


  //add todo
  let savelist = () => {

    if (!todo) {
      alert("Please fillout the form first 😅")
    }
    else if (todo && !toggel) {
      setList(
        list.map((e) => {
          if (e.id === isEdit) {
            return { ...e, name: todo }
          }
          return e
        })
      )
      setTodo('')
      setIsEdit(null)
      setToggel(true)
    }
    // creating id 
    else {
      let allData = { id: new Date().getTime().toString(), name: todo }
      setList([...list, allData])
      setTodo('')
    }
  }

  // delete todo
  const deleteList = (index) => {
    let res = list.filter((result) => index !== result.id)
    setList(res)
  }

  // edit todo
  const editlist = (id) => {
    let newlist = list.find((elem) => {
      return elem.id === id
    })
    setTodo(newlist.name)
    setIsEdit(id)
    setToggel(false)
    setView(true)
  }

  // view todo
  const viewlist = (id) => {
    let newlist = list.find((elem) => {
      return elem.id === id
    })
    setTodo(newlist.name)
    // setIsEdit(id)
    setView(false)
  }

  // setData to the localStorage
  useEffect(() => {
    localStorage.setItem("todoitems", JSON.stringify(list))
  }, [list])
  return (
    <div className="App">
      <div className="container mycontainer">
        <div className="row bg-primary rounded-3 shadow-lg mt-2">
          <div className="col-lg-12 col-md-12 col-sm-12 mt-4">
            <div className="todo-top">

              {/* heading */}
              <div className='Todo-heading text-center text-white'>
                <h1>Simple Todo List</h1>
              </div>

              {/* input box */}
              <div>
                {
                  isView
                    ?
                    <div className=' d-flex flex-row justify-content-center'>
                      <input type="text" className='form-control w-50' value={todo} onChange={(e) => { setTodo(e.target.value) }} placeholder=" 👉 Type Here..." />
                      <button className='btn btn-light ms-1' onClick={savelist}>
                        {toggel
                          ?
                          <AiOutlineCheck className='fs-5 save' />
                          :
                          <AiFillEdit className='fs-5 edit' />}
                      </button>
                    </div>

                    : <div className='d-flex justify-content-center'><input type="text" className='form-control w-25 ' value={todo} readOnly /></div>
                }


              </div>
            </div>
          </div>
          <div className="col-lg-12 mt-5">

            {/* list */}

            <Scrollbars style={{ width: "100%", height: "20em" }}>
              <div className="todo-bottom">
                {
                  list.length < 1
                    ?
                    <ul className='list-group'>
                      <li className='list-group-item rounded-2' >
                        <div><h1 className='text-center'>Empty List!</h1></div>
                      </li>
                    </ul> :
                    <ul className='list-group d-flex flex-column m-auto  mb-5 w-75'>
                      {list.map((e, i) => (


                        <li className='list-group-item d-flex justify-content-between rounded-2' key={e.id} >
                          <div>
                            <span>{i + 1}</span>
                            &nbsp;&nbsp;
                            <span>{e.name}</span>
                          </div>
                          <p className=' fs-4 d-flex align-content-center'><span className='view'><AiFillEye onClick={() => viewlist(e.id)} /> </span>  <span className='edit'><AiFillEdit onClick={() => editlist(e.id)} />  </span> <span className='delete'><AiTwotoneDelete onClick={() => deleteList(e.id)} /></span></p>
                        </li>


                      ))}
                    </ul>}
              </div>
            </Scrollbars>
          </div>
        </div>
      </div>
    </div >
  )
}

export default App;
