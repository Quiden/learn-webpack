import { useState, useTransition } from 'react';
import classes from './app.module.scss';
import { Link, Outlet } from 'react-router-dom';
import avatarPng from "@/assets/loader.png"
import imageJpeg from '@/assets/Hibbing_High_School_2014.jpg';
import Book from '@/assets/book.svg';

const func = (num: number) => {
  console.log(num + 1);
}


const App = () => {
  const [count, setCount] = useState(0);

  const [isPending, startTransition] = useTransition();

  return <div data-testid={'App.DataTestId'}>
    <h1 data-testid={'Platform'}>Paltform={WEBPACK_PLATFORM}</h1>
    <div>
      <img width={100} height={100} src={avatarPng} alt='avatar.png' />
      <img width={100} height={100} src={imageJpeg} alt='avatar.png' />
      <Book width={50} height={50} style={{color: 'green'}} />
    </div>
    <Link to='/about'>about</Link>
    <br />
    <Link to='/shop'>shop</Link>
    <p>{count}</p>
    <p className={classes.title}>Pending: {isPending} hot</p>
    <button className={classes.button} onClick={() => startTransition(() => setCount(count + 1))}>Click</button>
    <Outlet />
  </div>
}

export default App;