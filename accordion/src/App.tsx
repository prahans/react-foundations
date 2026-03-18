import { useState } from 'react';
import './App.css';

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus."
  },
  {
    title: "How long do I have to return my chair?",
    text:
      "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus."
  },
  {
    title: "Do you ship to countries outside the EU?",
    text:
      "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!"
  }
];

function App() {
  return (
    <div>
      <Accordion data={faqs} />
    </div>
  );
}

type FAQ = {
  title: string;
  text: string;
};

type AccordionProps = {
  data: FAQ[];
};

function Accordion({data}: AccordionProps) {
  const [curOpen, setCurOpen] = useState(-1);
  return <div className='accordion'>
    {data.map((el, i) => (
    <AccordionItem 
     curOpen={curOpen}
     onOpen={setCurOpen}
     num={i}
     title={el.title}
     key={el.title} >
      {el.text}
     </AccordionItem>
  ))}

  <AccordionItem 
     curOpen={curOpen}
     onOpen={setCurOpen}
     num={22}
     title="test 1"
     key="test 1" >
      <h4>skills need for web development</h4>
      <ul>
        <li>html</li>
        <li>css</li>
        <li>javascript</li>
        <li>react</li>
      </ul>
     </AccordionItem>
  </div>;
}

type AccordionItemProps = {
  num: number;
  title: string;
  children: React.ReactNode;
  curOpen: number;
  onOpen: React.Dispatch<React.SetStateAction<number>>
}

function AccordionItem({num, title, children, curOpen, onOpen}: AccordionItemProps){
  const isOpen = num === curOpen;
  function handleToggle(){
    onOpen(isOpen ? -1 : num)
  }

  return <div className={`item ${isOpen ? "open" : ""} `} onClick={handleToggle}>
    <p className='number'>{num < 9 ? `0${num + 1}` : num + 1}</p>
    <p className='title'>{title}</p>
    <p className='icon'>{isOpen ? "-" : "+"}</p>
    {isOpen && <div className='content-box'>{children}</div>}
  </div>
}

export default App
