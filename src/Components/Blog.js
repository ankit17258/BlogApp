import { useState,useEffect,useRef } from "react";
//Blogging App using Hooks
export default function Blog(){
    const [bol,setBol]=useState(false);
    const [list,setList]=useState([]);
    const titleref=useRef(null);
    const [formData,setFormData]=useState({title:"",content:""})
    // const [title,setTitle]=useState("");
    // const [content,setContent]=useState("");

    useEffect(()=>{
        titleref.current.focus();
    },[])
    useEffect(()=>{
        if(list.length)document.title=list[0].title;  
        else   document.title="No Blog!!";  
    },[bol])
    //Passing the synthetic event as argument to stop refreshing the page on submit
    function handleSubmit(e){
        if(formData.title&&formData.content)list.unshift(formData);
        setList(list);
        setFormData({title:"",content:""});
        e.preventDefault();
        setBol(!bol);
        titleref.current.focus();   
    }
     
    function removeBlog(i){
        setList(list.filter((item,index)=>i!==index));
    }

    return(
        <>
        {/* Heading of the page */}
        <h1>Write a Blog!</h1>

        {/* Division created to provide styling of section to the form */}
        <div className="section">

        {/* Form for to write the blog */}
            <form onSubmit={handleSubmit}>

                {/* Row component to create a row for first input field */}
                <Row label="Title">
                        <input className="input"
                                placeholder="Enter the Title of the Blog here.."
                                value={formData.title}
                                ref={titleref}
                                required
                                onChange={(e)=>setFormData({title:e.target.value,content:formData.content})}/>
                </Row >

                {/* Row component to create a row for Text area field */}
                <Row label="Content">
                        <textarea className="input content"
                                placeholder="Content of the Blog goes here.."
                                value={formData.content}
                                onChange={(e)=>setFormData({title:formData.title,content:e.target.value})}/>
                </Row >

                {/* Button to submit the blog */}            
                <button className = "btn">ADD</button>
            </form>
                     
        </div>

        <hr/>

        {/* Section where submitted blogs will be displayed */}
        <h2> Blogs </h2>
        {list.map((ele,index)=>(
            <div className="blog">
                <h3>{ele.title}</h3>
                <p>{ele.content}</p>
                <div className="blog-btn">
                    <button onClick={()=>removeBlog(index)} className="btn remove">Delete</button>
                </div>
            </div>
        ))}
        </>
        )
    }

//Row component to introduce a new row section in the form
function Row(props){
    const{label} = props;
    return(
        <>
        <label>{label}<br/></label>
        {props.children}
        <hr />
        </>
    )
}
