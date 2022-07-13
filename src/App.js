import React, { useMemo, useRef, useState } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';


function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user => user.active).length;
}



function App() {
  const [inputs, setInputs] = useState({
    username: '',
    email: ''
  });
  const { username, email } = inputs;
  const onChange = e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };
  const [users, setUsers] = useState([
    {
      id:1,
      username: '김사과',
      email: 'apple@apple.com',
      active: true
    },
    {
      id:2,
      username: '오렌지',
      email: 'orange@apple.com',
      active: false
    },
    {
      id:3,
      username: '바나나',
      email: 'banana@apple.com',
      active: false
    }
  ]);

  const nextId = useRef(4);
  const onCreate = () => {
    const user = {
      id: nextId.current,
      username,
      email
    };
    setUsers(users.concat(user));//추가된 배열요소를 배열 리스트에서 마지막에 추가

   //추가할 배열을 입력한 input태그에 빈공백으로 설정
    setInputs({
      username: '',
      email: ''
    });
    //다음에 추가될 배열요소의 인덱스값을 미리 1증가함.
    nextId.current += 1;
  };

  const onRemove = id => {
    // user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
    // = user.id 가 id 인 것을 제거함
    setUsers(users.filter(user => user.id !== id));4
  };
  const onToggle = id => {
    setUsers(
      users.map(user =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  };

  const count = useMemo(() => countActiveUsers(users), [users]);//연산된 재활용하는 함수
                            //countActiveUser(users) 함수호출하면 해당 배열을 파라미터 전달.
                            //[users] 리턴되는 값이 저장되는 배열


  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />

      <div>선택된 사용자 수:{count}</div>
    </>
  );
}

export default App;