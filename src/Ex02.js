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

function Create(props) {
    return (
        <article>
            <h2>Create</h2>
            <form onSubmit={(event)=>{
                // form의 submit event
                event.preventDefault();
                const title = event.target.title.value;
                const content = event.target.content.value;
                // component의 속성으로 지정한것은
                // props의 key값으로 사용할 수 있다.
                props.onCreate(title, content);
            }}>
                <p><input type="text" name="title" placeholder='title'></input></p>
                <p><textarea name='content' placeholder='content'></textarea></p>
                <p><input type="submit" value='Create'></input></p>
            </form>
        </article>
    );
}

function Update(props) {
    let [title, setTitle] = useState(props.title);
    let [content, setContent] = useState(props.content);
    return (
        <article>
            <h2>Update</h2>
            <form onSubmit={(event)=>{
                // form의 submit event
                event.preventDefault();
                const title = event.target.title.value;
                const content = event.target.content.value;
                // component의 속성으로 지정한것은
                // props의 key값으로 사용할 수 있다.
                props.onUpdate(title, content);
            }}>
                <p><input type="text" name="title" placeholder='title'
                 value={title} onChange={(event)=>{
                    setTitle(event.target.value);
                 }}></input></p>
                <p><textarea name='content' placeholder='content'
                 value={content} onChange={(event)=>{
                    setContent(event.target.value);
                 }}></textarea></p>
                <p><input type="submit" value='Update'></input></p>
            </form>
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
    let [topics, setTopics] = useState([
        {id:1, title:"html", content:"html is ..."},
        {id:2, title:"css", content:"css is ..."},
        {id:3, title:"javascript", content:"javascript is ..."},
        {id:4, title:"react", content:"react is ..."}
    ]);
    let [nextId, setNextId] = useState(5);//기존에 4개가 있어서 5로 초기값설정
    let element = null;
    let elementUpdate = null;
    if (mode === 'WELCOME') {
        element = <Article title="Welcome" content="Hello, React"/>;
    } else if (mode === 'READ' && id !== null) {
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
        elementUpdate = <>
        <li><a href={'/update/'+id} onClick={(event)=>{
            event.preventDefault();
            setMode('UPDATE');
        }}>Update</a></li>
        <li><input type="button" value="Delete" onClick={()=>{
            // Delete Button을 클릭했을때 처리
            let newTopics = [];
            for (let i=0 ; i<topics.length ; i++) {
                if (topics[i].id !== id) {
                    newTopics.push(topics[i]);
                }
            }
            setTopics(newTopics);
            setMode('WELCOME');
        }}></input></li>
        </>;
    } else if (mode === 'CREATE') {
        element = <Create onCreate={(_title, _content)=>{
            console.log("title:", _title);
            console.log("content:", _content);
            const newTopic = {id:nextId, title:_title, content:_content};
            const newTopics = [...topics]; //topics의 기존내용 복제
            newTopics.push(newTopic);
            setTopics(newTopics);
            setMode('READ');
            setId(nextId);
            setNextId(nextId+1);
        }}/>
    } else if (mode === 'UPDATE') {
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
        element = <Update title={title} content={content} onUpdate={(title, content)=>{
            //update button을 누르면 이곳을 실행
            const updateTopic = {id:id, title:title, content:content};
            const newTopics = [...topics];
            for (let i=0 ; i<newTopics.length; i++) {
                if (newTopics[i].id === id) {
                    newTopics[i] = updateTopic;
                    break;
                }
            }
            setTopics(newTopics);
            setMode('READ');
        }}/>
    }
    return (
        <div>
            {/*이것은 주석입니다*/}
            <Header title="React" onChangeMode={()=>{
                setMode('WELCOME');
            }} />
            <Nav topics={topics} onChangeMode={(_id)=>{
                setMode('READ');
                setId(_id);                
            }} />
            {element}
            <ul>
                <li><a href="/create" onClick={(event)=>{
                    event.preventDefault();// javascript의 return false;와 동일기능
                    setMode('CREATE');
                }}>Create</a></li>
                {elementUpdate}
            </ul>
        </div>
    );
}

export default Ex02;