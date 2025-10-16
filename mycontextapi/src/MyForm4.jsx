import { useState } from "react"

function MyForm4() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    // 그넫 잘 생각해보면 alert을 띄우는건 학습 상황이라서 그렇지 실제 얘가 하는 역할은 from 태그의 preventDefault()쓰기 위해서에 가깝습니다.
    const handleSubmit = (event) => {
      alert(`Hello, ${firstName} ${lastName}`);
      event.preventDefault();
    }

    // const handleChange = (event) => {
    //   setFirstName(event.target.value)
    //   setLastName(event.target.value)
    //   setEmail(event.target.value)
    // }

  return (
    <form onSubmit={handleSubmit}>
      <label>First Name : </label>
      <input type="text" name='firstName' onChange={event => setFirstName(event.target.value)} value={firstName} />
      <br />
      <label>Last Name : </label>
      <input type="text" name="lastName" onChange={event => setLastName(event.target.value)} value={lastName} />
      <br />
      <label>Email : </label>
      <input type="email" name="email" onChange={event => setEmail(event.target.value)} value={email}/>
      <br />
      <input type="submit" value="제출" />
    </form>
  )
}

export default MyForm4