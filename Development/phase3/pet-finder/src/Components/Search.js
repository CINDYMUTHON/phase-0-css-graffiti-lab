import default function SearchFunct({searchtext , searchtype}){
    const [p , setp] = useState([]);
    useEffect(()=>{
     const URL= searchtype ==="breed" ?
     axios.get((URL))
     .then((res)=>{
       setp(res.data)
     })
    },[searchtype , searchtext])
       return(
       <div className="Search">
         {p.map((p)=>{
           return(
             <div key={p.id}>
                <SearchData
                 name = {p.name}
                 age = {p.age}
                 species = {p.species}
                 breed = {p.breed}
                 image = {p.image}
                                  description = {p.description}
                />
             </div>
           )
         })}
       </div>
     )
 }