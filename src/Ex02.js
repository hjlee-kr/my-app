import React, {useState} from 'react';//state사용하기위한 선언

function Header(props) {
    console.log(props);
    return (
        <header>
            <h1><a href="/" onClick={function(event){
                // a tag는 클릭스 페이지가 이동
                // javascript에서 페이지가 이동안되게 하려면
                // return false;
                // react는 return false; 동작이 없습니다.
                // react에서 페이지 이동이 안되게 하려면
                event.preventDefault();
                //alert("Hi");
                props.onChangeMode();
            }}>{props.title}</a></h1>
        </header>
    );
}

function Nav(props) {
    console.log(props);
    const lis = [];
    for(let i=0 ; i<props.topics.length ; i++) {
        let t = props.topics[i];
        lis.push(<li key={t.id}><a id={t.id} href={"/read/" + t.id} onClick={
            (event) => {
                event.preventDefault();
                props.onChangeMode(Number(event.target.id));
            }
        }>{t.title}</a></li>)
    }
    return (
        <nav>
            <ol>
                {lis}
            </ol>
        </nav>
    );
}

function Article(props) {
    console.log("Article:",props);
    return (
        <article>
            <h2>{props.title}</h2>
            {props.content}
        </article>
    );
}

function Ex02() {
    //let mode = 'WELCOME';
    // useState는 변수값이 변경되었을때 다시랜더링을 해라
    //let _mode = useState('WELCOME');
    //let mode = _mode[0];//변수
    //let setMode = _mode[1];//setter
    // 위의 세줄을 한줄로
    let [mode, setMode] = useState('WELCOME');
    let [id, setId] = useState(null);

    const topics = [
        {id:1, title:"html", content:"html is ..."},
        {id:2, title:"css", content:"css is ..."},
        {id:3, title:"javascript", content:"javascript is ..."},
        {id:4, title:"react", content:"react is ..."}
    ];
    let element = null;
    if (mode === 'WELCOME') {
        element = <Article title="Welcome" content="Hello, React"/>;
    } else if (mode === 'HI' && id !== null) {
        let title, content = null;
        for (let i=0; i<topics.length ; i++) {
            //console.log(typeof topics[i].id, typeof id);
            if (topics[i].id === id) {
                //console.log("topics[i].id == id");
                title = topics[i].title;
                content = topics[i].content;
                //console.log(title, content);
                break;
            }
        }
        console.log("title:", title, "content:", content);
        element = <Article title={title} content={content} />;
        console.log(content);
    }
    return (
        <div>
            {/*이것은 주석입니다*/}
            <Header title="React" onChangeMode={()=>{
                setMode('WELCOME');
            }} />
            <Nav topics={topics} onChangeMode={(_id)=>{
                setMode('HI');
                setId(_id);                
            }} />
            {element}
        </div>
    );
}

export default Ex02;