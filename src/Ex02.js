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
                alert("Hi");
            }}>{props.title}</a></h1>
        </header>
    );
}

function Nav(props) {
    const lis = [];
    for(let i=0 ; i<props.topics.length ; i++) {
        let t = props.topics[i];
        lis.push(<li key={t.id}><a href={"/read/" + t.id} onClick={
            (event) => {
                alert(t.id);
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
    return (
        <article>
            <h2>{props.title}</h2>
            {props.content}
        </article>
    );
}

function Ex02() {
    const topics = [
        {id:1, title:"html", content:"html is ..."},
        {id:2, title:"css", content:"css is ..."},
        {id:3, title:"javascript", content:"javascript is ..."},
        {id:4, title:"react", content:"react is ..."}
    ];
    return (
        <div>
            {/*이것은 주석입니다*/}
            <Header title="React"/>
            <Nav topics={topics}/>
            <Article title="Welcome" content="Hello, React"/>
            <Article title="Hi" content="Hello, World!!" />
        </div>
    );
}

export default Ex02;